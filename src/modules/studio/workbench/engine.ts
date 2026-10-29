// studio/workbench — van een lijst namen naar een gevulde plaat. Puur rekenwerk, los van het 3D-beeld.
import type { Font } from 'opentype.js';
import type { ManifoldToplevel } from 'manifold-3d/manifold';
import { buildKeychain, KEYCHAIN_DEFAULTS, type Keychain, type Warning } from '../../library/name-keychain/generator';
import { packOnPlate, PRINTERS } from '../../print/plate-fill/pack';
import type { Filament, PlacedItem } from '../../print/color-3mf/threemf';

export type PlateRequest = { names: string[]; fontId: string; printerId: string; capHeight: number };
export type PlateResult = {
  bed: [number, number];
  items: PlacedItem[];
  overflow: string[];
  warnings: Warning[];
  ms: number;
};

export const DEFAULT_FILAMENTS: Filament[] = [
  { name: 'White', color: '#FFFFFF' },
  { name: 'Pink', color: '#E23D8E' },
];

export const SAFETY_LINE = 'Not a toy. Small parts. Test your print.';

export function credits(fontName: string): string {
  return [
    'Made with Tinkpop (https://tinkpop.com). The files you make are yours to use freely.',
    `Font: ${fontName}, SIL Open Font License 1.1.`,
    SAFETY_LINE,
    'Source code: https://github.com/Bouwhoek/tinkpop (AGPL-3.0).',
    '',
  ].join('\n');
}

export class PlateEngine {
  private cache = new Map<string, Keychain>();
  constructor(private wasm: ManifoldToplevel, private fonts: Map<string, Font>) {}

  keychain(name: string, fontId: string, capHeight: number): Keychain {
    const key = `${fontId}|${capHeight}|${name}`;
    let k = this.cache.get(key);
    if (!k) {
      const font = this.fonts.get(fontId);
      if (!font) throw new Error(`Font not loaded: ${fontId}`);
      k = buildKeychain(this.wasm, font, { ...KEYCHAIN_DEFAULTS, name, capHeight });
      if (this.cache.size > 400) this.cache.clear();
      this.cache.set(key, k);
    }
    return k;
  }

  plate(req: PlateRequest): PlateResult {
    const t0 = performance.now();
    const printer = PRINTERS.find((p) => p.id === req.printerId) ?? PRINTERS[0];
    const kcs = req.names.map((n) => this.keychain(n, req.fontId, req.capHeight)).filter((k) => k.parts.length);
    const { placed, overflow } = packOnPlate(kcs.map((k) => ({ w: k.width, h: k.height })), printer.bed);
    const items = placed.map((pl) => ({ name: kcs[pl.index].name, x: pl.x, y: pl.y, parts: kcs[pl.index].parts }));
    const warnings = kcs.flatMap((k) => k.warnings);
    return { bed: printer.bed, items, overflow: overflow.map((i) => kcs[i].name), warnings, ms: performance.now() - t0 };
  }
}
