// Rekenwerker: draait de motor buiten de pagina, zodat typen soepel blijft (A4).
import Module from 'manifold-3d/manifold';
import wasmUrl from 'manifold-3d/manifold.wasm?url';
import opentype, { type Font } from 'opentype.js';
import { FONTS, fontById } from '../fonts/fonts';
import { PlateEngine, credits } from './engine';
import { writeStlZip, writeThreeMf } from '../../print/color-3mf/threemf';
import type { FromWorker, ToWorker } from './protocol';

let enginePromise: Promise<PlateEngine> | undefined;
const fonts = new Map<string, Font>();

async function loadFont(id: string) {
  if (fonts.has(id)) return;
  const f = fontById(id);
  // Relatief aan de werker (/_astro/), zodat de site ook in een submap werkt. Niet via import.meta.url:
  // dan maakt Vite er een bronbestand-patroon van.
  const res = await fetch(import.meta.env.DEV ? `/fonts/${f.file}` : new URL('../fonts/' + f.file, self.location.href));
  if (!res.ok) throw new Error(`Could not load font ${f.name}`);
  fonts.set(f.id, opentype.parse(await res.arrayBuffer()));
}

function engine(): Promise<PlateEngine> {
  enginePromise ??= (async () => {
    const wasm = await Module({ locateFile: () => wasmUrl });
    wasm.setup();
    return new PlateEngine(wasm, fonts);
  })();
  return enginePromise;
}

const post = (msg: FromWorker, transfer: Transferable[] = []) => (self as unknown as Worker).postMessage(msg, transfer);

self.onmessage = async (e: MessageEvent<ToWorker>) => {
  const msg = e.data;
  try {
    const [eng] = await Promise.all([engine(), loadFont(msg.req.fontId)]);
    const result = eng.plate(msg.req);
    if (msg.type === 'plate') return post({ id: msg.id, ok: true, type: 'plate', result });
    const font = fontById(msg.req.fontId).name;
    const stamp = new Date().toISOString().slice(0, 10);
    if (msg.format === '3mf') {
      const bytes = writeThreeMf(result.items, { title: `Tinkpop ${stamp}`, filaments: msg.filaments, method: msg.method, credits: credits(font) });
      return post({ id: msg.id, ok: true, type: 'export', bytes, filename: `tinkpop-${result.items.length}-keychains.3mf` }, [bytes.buffer]);
    }
    const bytes = writeStlZip(result.items, msg.filaments, credits(font));
    return post({ id: msg.id, ok: true, type: 'export', bytes, filename: `tinkpop-${result.items.length}-keychains-stl.zip` }, [bytes.buffer]);
  } catch (err) {
    post({ id: msg.id, ok: false, error: err instanceof Error ? err.message : String(err) });
  }
};

// Eerste lettertype alvast laden.
void loadFont(FONTS[0].id);
