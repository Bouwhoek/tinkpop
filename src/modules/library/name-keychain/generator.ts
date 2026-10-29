// library/name-keychain — sleutelhanger met naam.
// Eigen ontwerp uit algemene vormen: plaatje = verdikte omtrek van de tekst + ring met gat,
// tekst steekt erbovenuit (docs/2-plan/mvp.md). Rekent zonder 3D-beeld, zodat downloaden altijd werkt.
import type { Font } from 'opentype.js';
import type { CrossSection, Manifold, ManifoldToplevel } from 'manifold-3d/manifold';

export type KeychainParams = {
  name: string;
  /** Hoogte van een hoofdletter in mm. */
  capHeight: number;
  baseThickness: number;
  textThickness: number;
  /** Rand van het plaatje rond de tekst in mm. */
  padding: number;
  ringRadius: number;
  holeRadius: number;
};

export const KEYCHAIN_DEFAULTS: Omit<KeychainParams, 'name'> = {
  capHeight: 7,
  baseThickness: 2.4, // 12 lagen van 0,2 mm
  textThickness: 1.2, // 6 lagen
  padding: 2.5,
  ringRadius: 2.5,
  holeRadius: 1.9,
};

/** Waarschuwing vanaf deze lengte: past nog wel, maar wordt een lange sleutelhanger. */
export const LONG_NAME_MM = 100;

export type MeshPart = {
  label: 'Base' | 'Text';
  /** Filamentnummer (AMS-slot), begint bij 1. */
  filament: number;
  positions: Float32Array;
  indices: Uint32Array;
};

export type Warning =
  | { code: 'missing-glyph'; name: string; chars: string[] }
  | { code: 'long'; name: string; widthMm: number }
  | { code: 'empty'; name: string };

export type Keychain = {
  name: string;
  width: number;
  height: number;
  parts: MeshPart[];
  warnings: Warning[];
};

type Point = [number, number];

/** Rond tekst op tot lijnstukjes met een maximale afwijking `tol` (mm). */
function outlinePolygons(font: Font, text: string, fontSize: number, tol: number): Point[][] {
  const path = font.getPath(text, 0, 0, fontSize, { kerning: true });
  const polys: Point[][] = [];
  let cur: Point[] = [];
  let last: Point = [0, 0];
  // opentype.js tekent met y naar beneden; wij willen y omhoog.
  const p = (x: number, y: number): Point => [x, -y];
  const steps = (len: number) => Math.min(32, Math.max(2, Math.ceil(Math.sqrt(len / tol))));
  for (const c of path.commands) {
    if (c.type === 'M') {
      if (cur.length > 2) polys.push(cur);
      last = p(c.x, c.y);
      cur = [last];
    } else if (c.type === 'L') {
      last = p(c.x, c.y);
      cur.push(last);
    } else if (c.type === 'Q') {
      const c1 = p(c.x1, c.y1), end = p(c.x, c.y), start = last;
      const n = steps(Math.hypot(c1[0] - start[0], c1[1] - start[1]) + Math.hypot(end[0] - c1[0], end[1] - c1[1]));
      for (let i = 1; i <= n; i++) {
        const t = i / n, u = 1 - t;
        cur.push([u * u * start[0] + 2 * u * t * c1[0] + t * t * end[0], u * u * start[1] + 2 * u * t * c1[1] + t * t * end[1]]);
      }
      last = end;
    } else if (c.type === 'C') {
      const c1 = p(c.x1, c.y1), c2 = p(c.x2, c.y2), end = p(c.x, c.y), start = last;
      const len = Math.hypot(c1[0] - start[0], c1[1] - start[1]) + Math.hypot(c2[0] - c1[0], c2[1] - c1[1]) + Math.hypot(end[0] - c2[0], end[1] - c2[1]);
      const n = steps(len);
      for (let i = 1; i <= n; i++) {
        const t = i / n, u = 1 - t;
        cur.push([
          u * u * u * start[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * end[0],
          u * u * u * start[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * end[1],
        ]);
      }
      last = end;
    } else if (c.type === 'Z') {
      if (cur.length > 2) polys.push(cur);
      cur = [];
    }
  }
  if (cur.length > 2) polys.push(cur);
  return polys;
}

export function missingGlyphs(font: Font, text: string): string[] {
  const out = new Set<string>();
  for (const ch of text) if (ch.trim() && font.charToGlyphIndex(ch) === 0) out.add(ch);
  return [...out];
}

function capUnits(font: Font): number {
  const os2 = (font.tables as { os2?: { sCapHeight?: number } }).os2;
  if (os2?.sCapHeight) return os2.sCapHeight;
  const bb = font.charToGlyph('H').getBoundingBox();
  return bb.y2 || font.unitsPerEm * 0.7;
}

function toPart(m: Manifold, label: MeshPart['label'], filament: number, dx: number, dy: number): MeshPart {
  const mesh = m.getMesh();
  const n = mesh.numProp;
  const count = mesh.vertProperties.length / n;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = mesh.vertProperties[i * n] + dx;
    positions[i * 3 + 1] = mesh.vertProperties[i * n + 1] + dy;
    positions[i * 3 + 2] = mesh.vertProperties[i * n + 2];
  }
  return { label, filament, positions, indices: new Uint32Array(mesh.triVerts) };
}

/** Bouwt één sleutelhanger, midden op (0,0), onderkant op z = 0. */
export function buildKeychain(wasm: ManifoldToplevel, font: Font, params: KeychainParams): Keychain {
  const { CrossSection } = wasm;
  const p = { ...KEYCHAIN_DEFAULTS, ...params };
  const warnings: Warning[] = [];
  const missing = missingGlyphs(font, p.name);
  if (missing.length) warnings.push({ code: 'missing-glyph', name: p.name, chars: missing });
  if (!p.name.trim()) return { name: p.name, width: 0, height: 0, parts: [], warnings: [{ code: 'empty', name: p.name }] };

  const fontSize = (p.capHeight * font.unitsPerEm) / capUnits(font);
  const trash: (CrossSection | Manifold)[] = [];
  const keep = <T extends CrossSection | Manifold>(x: T): T => (trash.push(x), x);
  try {
    const raw = keep(new CrossSection(outlinePolygons(font, p.name, fontSize, 0.04), 'NonZero'));
    // Kleine sluiting: punten waar lijnen elkaar raken (bijv. de staart van Ç) worden heel.
    const text0 = keep(keep(raw.offset(0.05, 'Square')).offset(-0.05, 'Square'));
    const tb = text0.bounds();
    // Tekst verticaal centreren rond y = 0, links op x = 0.
    const text = keep(text0.translate([-tb.min[0], -(tb.min[1] + tb.max[1]) / 2]));
    const ringX = -(p.padding + p.ringRadius);
    const ring = keep(CrossSection.circle(p.ringRadius, 48).translate([ringX, 0]));
    const both = keep(CrossSection.union([text, ring]));
    const grown = keep(both.offset(p.padding + 1.5, 'Round', 2, 36));
    const base2d = keep(keep(grown.offset(-1.5, 'Round', 2, 36)).subtract(keep(CrossSection.circle(p.holeRadius, 40).translate([ringX, 0]))));

    const base = keep(base2d.extrude(p.baseThickness));
    const relief = keep(keep(text.extrude(p.textThickness)).translate([0, 0, p.baseThickness]));
    const bb = base.boundingBox();
    const width = bb.max[0] - bb.min[0], height = bb.max[1] - bb.min[1];
    const dx = -(bb.min[0] + bb.max[0]) / 2, dy = -(bb.min[1] + bb.max[1]) / 2;
    if (width > LONG_NAME_MM) warnings.push({ code: 'long', name: p.name, widthMm: Math.round(width) });
    return {
      name: p.name,
      width,
      height,
      parts: [toPart(base, 'Base', 1, dx, dy), toPart(relief, 'Text', 2, dx, dy)],
      warnings,
    };
  } finally {
    for (const x of trash) x.delete();
  }
}
