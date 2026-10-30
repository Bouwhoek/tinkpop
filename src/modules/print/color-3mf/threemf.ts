// print/color-3mf — 3MF met kleuren voor de AMS, en STL als terugval.
// Twee manieren om kleur mee te geven (3MF-proef, mvp.md):
//   'parts'      losse onderdelen met filamentnummer (Bambu-projectgegevens)  ← standaard
//   'colorgroup' kleur per driehoek (3MF Materials Extension) + PrusaSlicer-gegevens; idee uit Open Keychain (MIT)
// Geen code uit Bambu Studio of OrcaSlicer (AGPL); alleen het openbare bestandsformaat.
import { strToU8, zipSync } from 'fflate';
import type { MeshPart } from '../../library/name-keychain/generator';

export type PlacedItem = { name: string; x: number; y: number; parts: MeshPart[] };
export type ColorMethod = 'parts' | 'colorgroup';
export type Filament = { name: string; color: string };

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]!);

const num = (v: number) => (Math.round(v * 1e4) / 1e4).toString();

function meshXml(parts: { part: MeshPart; color?: number }[]): string {
  const v: string[] = [];
  const t: string[] = [];
  let off = 0;
  for (const { part, color } of parts) {
    const p = part.positions;
    for (let i = 0; i < p.length; i += 3) v.push(`<vertex x="${num(p[i])}" y="${num(p[i + 1])}" z="${num(p[i + 2])}"/>`);
    const prop = color === undefined ? '' : ` pid="10" p1="${color}" p2="${color}" p3="${color}"`;
    const ix = part.indices;
    for (let i = 0; i < ix.length; i += 3) t.push(`<triangle v1="${ix[i] + off}" v2="${ix[i + 1] + off}" v3="${ix[i + 2] + off}"${prop}/>`);
    off += p.length / 3;
  }
  return `<mesh><vertices>${v.join('')}</vertices><triangles>${t.join('')}</triangles></mesh>`;
}

const CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
 <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
 <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>
 <Default Extension="config" ContentType="text/xml"/>
 <Default Extension="txt" ContentType="text/plain"/>
</Types>`;

const RELS = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
 <Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>
</Relationships>`;

export type ThreeMfOptions = { title: string; filaments: Filament[]; method?: ColorMethod; credits: string };

export function writeThreeMf(items: PlacedItem[], opt: ThreeMfOptions): Uint8Array {
  const method = opt.method ?? 'parts';
  const files: Record<string, Uint8Array> = {
    '[Content_Types].xml': strToU8(CONTENT_TYPES),
    '_rels/.rels': strToU8(RELS),
    'Metadata/credits.txt': strToU8(opt.credits),
  };
  let meta = ` <metadata name="Title">${esc(opt.title)}</metadata>\n <metadata name="Designer">Tinkpop</metadata>\n`;
  const res: string[] = [];
  const build: string[] = [];
  const place = (id: number, it: PlacedItem) =>
    `<item objectid="${id}" transform="1 0 0 0 1 0 0 0 1 ${num(it.x)} ${num(it.y)} 0" printable="1"/>`;

  if (method === 'colorgroup') {
    res.push(`<basematerials id="11">${opt.filaments.map((f) => `<base name="${esc(f.name)}" displaycolor="${f.color}"/>`).join('')}</basematerials>`);
    res.push(`<m:colorgroup id="10">${opt.filaments.map((f) => `<m:color color="${f.color}"/>`).join('')}</m:colorgroup>`);
    const prusa: string[] = [];
    items.forEach((it, i) => {
      const id = i + 1;
      res.push(`<object id="${id}" type="model" name="${esc(it.name)}" pid="10" pindex="0">${meshXml(it.parts.map((part) => ({ part, color: part.filament - 1 })))}</object>`);
      build.push(place(id, it));
      let first = 0;
      const vols = it.parts.map((part) => {
        const n = part.indices.length / 3;
        const s = `<volume firstid="${first}" lastid="${first + n - 1}"><metadata type="volume" key="name" value="${part.label}"/><metadata type="volume" key="extruder" value="${part.filament}"/></volume>`;
        first += n;
        return s;
      });
      prusa.push(`<object id="${id}" instances_count="1"><metadata type="object" key="name" value="${esc(it.name)}"/>${vols.join('')}</object>`);
    });
    files['Metadata/Slic3r_PE_model.config'] = strToU8(`<?xml version="1.0" encoding="UTF-8"?>\n<config>${prusa.join('')}</config>`);
  } else {
    meta += ' <metadata name="Application">BambuStudio-02.00.00.00</metadata>\n <metadata name="BambuStudio:3mfVersion">1</metadata>\n';
    const cfg: string[] = [];
    const inst: string[] = [];
    let nid = 1;
    items.forEach((it, i) => {
      const ids = it.parts.map(() => nid++);
      const oid = nid++;
      it.parts.forEach((part, k) => res.push(`<object id="${ids[k]}" type="model">${meshXml([{ part }])}</object>`));
      res.push(`<object id="${oid}" type="model" name="${esc(it.name)}"><components>${ids.map((id) => `<component objectid="${id}"/>`).join('')}</components></object>`);
      build.push(place(oid, it));
      cfg.push(
        `<object id="${oid}"><metadata key="name" value="${esc(it.name)}"/><metadata key="extruder" value="1"/>` +
          it.parts.map((part, k) => `<part id="${ids[k]}" subtype="normal_part"><metadata key="name" value="${part.label}"/><metadata key="extruder" value="${part.filament}"/></part>`).join('') +
          '</object>',
      );
      inst.push(`<model_instance><metadata key="object_id" value="${oid}"/><metadata key="instance_id" value="0"/><metadata key="identify_id" value="${100 + i}"/></model_instance>`);
    });
    files['Metadata/model_settings.config'] = strToU8(
      `<?xml version="1.0" encoding="UTF-8"?>\n<config>${cfg.join('')}<plate><metadata key="plater_id" value="1"/><metadata key="plater_name" value=""/><metadata key="locked" value="false"/>${inst.join('')}</plate></config>`,
    );
  }
  files['3D/3dmodel.model'] = strToU8(
    '<?xml version="1.0" encoding="UTF-8"?>\n<model unit="millimeter" xml:lang="en-US" ' +
      'xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" ' +
      'xmlns:m="http://schemas.microsoft.com/3dmanufacturing/material/2015/02">\n' +
      meta + ` <resources>${res.join('')}</resources>\n <build>${build.join('')}</build>\n</model>`,
  );
  return zipSync(files, { level: 6 });
}

/** Binaire STL van alle onderdelen met hetzelfde filament, op hun plek op de plaat. */
export function writeStl(items: PlacedItem[], filament: number): Uint8Array {
  const tris: number[][] = [];
  for (const it of items)
    for (const part of it.parts) {
      if (part.filament !== filament) continue;
      const p = part.positions, ix = part.indices;
      for (let i = 0; i < ix.length; i += 3) {
        const a = ix[i] * 3, b = ix[i + 1] * 3, c = ix[i + 2] * 3;
        tris.push([p[a] + it.x, p[a + 1] + it.y, p[a + 2], p[b] + it.x, p[b + 1] + it.y, p[b + 2], p[c] + it.x, p[c + 1] + it.y, p[c + 2]]);
      }
    }
  const buf = new ArrayBuffer(84 + tris.length * 50);
  const dv = new DataView(buf);
  const header = strToU8('Tinkpop STL');
  new Uint8Array(buf, 0, header.length).set(header);
  dv.setUint32(80, tris.length, true);
  let o = 84;
  for (const t of tris) {
    const ux = t[3] - t[0], uy = t[4] - t[1], uz = t[5] - t[2];
    const vx = t[6] - t[0], vy = t[7] - t[1], vz = t[8] - t[2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const l = Math.hypot(nx, ny, nz) || 1;
    nx /= l; ny /= l; nz /= l;
    for (const f of [nx, ny, nz, ...t]) { dv.setFloat32(o, f, true); o += 4; }
    dv.setUint16(o, 0, true); o += 2;
  }
  return new Uint8Array(buf);
}

/** ZIP met één STL per kleur. */
export function writeStlZip(items: PlacedItem[], filaments: Filament[], credits: string): Uint8Array {
  const files: Record<string, Uint8Array> = { 'credits.txt': strToU8(credits) };
  filaments.forEach((f, i) => (files[`tinkpop-${i + 1}-${f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.stl`] = writeStl(items, i + 1)));
  return zipSync(files, { level: 6 });
}
