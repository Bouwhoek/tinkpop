// Vaste testset (tests/golden/namen.json, mvp.md). Elke wijziging aan de rekenmotor draait hiertegen.
import { readFileSync } from 'node:fs';
import { loadFonts, loadWasm } from './helpers';
import { buildKeychain, KEYCHAIN_DEFAULTS } from '../src/modules/library/name-keychain/generator';
import { normalizeName } from '../src/modules/studio/batch/names';

type Case = { naam: string; verwacht: string; wordt?: string };
const spec = JSON.parse(readFileSync(new URL('./golden/namen.json', import.meta.url), 'utf8')) as { namen: Case[] };

const wasm = await loadWasm();
const font = loadFonts().get('titan-one')!;

describe('vaste testset (Titan One)', () => {
  for (const c of spec.namen) {
    test(`${JSON.stringify(c.naam)} → ${c.verwacht}`, () => {
      const name = normalizeName(c.naam);
      if (c.wordt) expect(name).toBe(c.wordt);
      const k = buildKeychain(wasm, font, { ...KEYCHAIN_DEFAULTS, name, capHeight: 7 });
      const codes = k.warnings.map((w) => w.code);
      if (c.verwacht === 'ok') expect(codes).toEqual([]);
      if (c.verwacht === 'waarschuwing:teken-ontbreekt') expect(codes).toContain('missing-glyph');
      if (c.verwacht === 'waarschuwing:lang') expect(codes).toContain('long');
      for (const part of k.parts) {
        const m = new wasm.Manifold({ numProp: 3, vertProperties: part.positions, triVerts: part.indices } as never);
        expect(m.status()).toBe('NoError');
        expect(m.volume()).toBeGreaterThan(0);
        m.delete();
      }
    });
  }
});
