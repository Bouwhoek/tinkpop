import { unzipSync, strFromU8 } from 'fflate';
import { loadFonts, loadWasm } from './helpers';
import { PlateEngine, DEFAULT_FILAMENTS, credits } from '../src/modules/studio/workbench/engine';
import { packOnPlate } from '../src/modules/print/plate-fill/pack';
import { writeThreeMf, writeStlZip } from '../src/modules/print/color-3mf/threemf';
import { parseNames } from '../src/modules/studio/batch/names';

const CLASS = 'Emma\nNoah\nJulia\nLiam\nSophie\nLucas\nMila\nSem\nTess\nFinn\nZoë\nDaan\nSara\nLevi\nNora\nBram\nEvi\nLuuk\nLotte\nMees\nFenna\nJesse\nIsa\nThijs\nAnna';
const wasm = await loadWasm();
const engine = new PlateEngine(wasm, loadFonts());

test('M-1/M-2: 25 namen passen op een A1 mini, niets overlapt of steekt uit', () => {
  const { names } = parseNames(CLASS);
  expect(names).toHaveLength(25);
  const r = engine.plate({ names, fontId: 'titan-one', printerId: 'a1-mini', capHeight: 7 });
  expect(r.overflow).toEqual([]);
  expect(r.items).toHaveLength(25);
  const boxes = r.items.map((it) => {
    const k = engine.keychain(it.name, 'titan-one', 7);
    return { x0: it.x - k.width / 2, x1: it.x + k.width / 2, y0: it.y - k.height / 2, y1: it.y + k.height / 2 };
  });
  for (const b of boxes) {
    expect(b.x0).toBeGreaterThanOrEqual(0); expect(b.y0).toBeGreaterThanOrEqual(0);
    expect(b.x1).toBeLessThanOrEqual(180); expect(b.y1).toBeLessThanOrEqual(180);
  }
  for (let i = 0; i < boxes.length; i++)
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      const overlap = a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
      expect(overlap).toBe(false);
    }
});

test('te veel namen: wat niet past wordt gemeld, niet weggegooid', () => {
  const names = Array.from({ length: 40 }, (_, i) => `Name ${i + 1}`);
  const r = engine.plate({ names, fontId: 'titan-one', printerId: 'a1-mini', capHeight: 7 });
  expect(r.items.length + r.overflow.length).toBe(40);
  expect(r.overflow.length).toBeGreaterThan(0);
});

test('pakken is stabiel en blijft binnen de rand', () => {
  const r = packOnPlate([{ w: 200, h: 10 }, { w: 50, h: 15 }], [180, 180]);
  expect(r.overflow).toEqual([0]);
  expect(r.placed).toHaveLength(1);
});

test('M-3 voorbereiding: 3MF heeft per sleutelhanger twee onderdelen op filament 1 en 2', () => {
  const r = engine.plate({ names: ['Tinkpop', 'Zoë'], fontId: 'titan-one', printerId: 'a1-mini', capHeight: 7 });
  const files = unzipSync(writeThreeMf(r.items, { title: 'test', filaments: DEFAULT_FILAMENTS, credits: credits('Titan One') }));
  const cfg = strFromU8(files['Metadata/model_settings.config']);
  expect(cfg.match(/key="extruder" value="2"/g)).toHaveLength(2);
  const model = strFromU8(files['3D/3dmodel.model']);
  expect(model).toContain('<components>');
  expect(model).toContain('name="Zoë"');
  const alt = unzipSync(writeThreeMf(r.items, { title: 'test', filaments: DEFAULT_FILAMENTS, method: 'colorgroup', credits: '' }));
  expect(strFromU8(alt['3D/3dmodel.model'])).toContain('<m:colorgroup id="10">');
  expect(alt['Metadata/Slic3r_PE_model.config']).toBeDefined();
});

test('M-6: 10 exports achter elkaar zonder fout', () => {
  const { names } = parseNames(CLASS);
  for (let i = 0; i < 10; i++) {
    const r = engine.plate({ names, fontId: i % 2 ? 'archivo-black' : 'titan-one', printerId: 'a1-mini', capHeight: 7 });
    expect(writeThreeMf(r.items, { title: 't', filaments: DEFAULT_FILAMENTS, credits: '' }).byteLength).toBeGreaterThan(1000);
    expect(Object.keys(unzipSync(writeStlZip(r.items, DEFAULT_FILAMENTS, '')))).toHaveLength(3);
  }
});

test('lijst plakken: komma\'s en regels, spaties weg, maximum', () => {
  expect(parseNames(' Emma ,  Noah\n\nJulia  Jansen ').names).toEqual(['Emma', 'Noah', 'Julia Jansen']);
  expect(parseNames(Array(70).fill('A').join('\n')).dropped).toBe(10);
});
