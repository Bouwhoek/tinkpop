import { loadFonts, loadWasm } from './helpers';
import { buildKeychain, KEYCHAIN_DEFAULTS } from '../src/modules/library/name-keychain/generator';

test('één sleutelhanger heeft twee dichte onderdelen', async () => {
  const wasm = await loadWasm();
  const font = loadFonts().get('titan-one')!;
  const k = buildKeychain(wasm, font, { ...KEYCHAIN_DEFAULTS, name: 'Tinkpop' });
  expect(k.parts.map((p) => p.label)).toEqual(['Base', 'Text']);
  for (const part of k.parts) {
    const m = new wasm.Manifold({ numProp: 3, vertProperties: part.positions, triVerts: part.indices } as never);
    expect(m.status()).toBe('NoError');
    expect(m.volume()).toBeGreaterThan(0);
    m.delete();
  }
  expect(k.width).toBeGreaterThan(40);
});
