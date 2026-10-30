import { readFileSync } from 'node:fs';
import opentype, { type Font } from 'opentype.js';
import Module from 'manifold-3d/manifold';
import { FONTS } from '../src/modules/studio/fonts/fonts';

export async function loadWasm() {
  const wasm = await Module();
  wasm.setup();
  return wasm;
}

export function loadFonts(): Map<string, Font> {
  const m = new Map<string, Font>();
  for (const f of FONTS) {
    const buf = readFileSync(new URL(`../public/fonts/${f.file}`, import.meta.url));
    m.set(f.id, opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)));
  }
  return m;
}
