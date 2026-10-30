// studio/workbench — de werkbank: namen in, plaat eruit (fase 0, docs/2-plan/mvp.md).
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { EngineClient } from './client';
import { saveFile } from './save';
import { DEFAULT_FILAMENTS, SAFETY_LINE, type PlateResult } from './engine';
import { FONTS, DEFAULT_FONT, fontById } from '../fonts/fonts';
import { parseNames, MAX_NAMES } from '../batch/names';
import { PRINTERS } from '../../print/plate-fill/pack';
import type { ColorMethod, Filament } from '../../print/color-3mf/threemf';
import type { Warning } from '../../library/name-keychain/generator';

const Viewer = lazy(() => import('./Viewer'));

const EXAMPLE = ['Emma', 'Noah', 'Julia', 'Liam', 'Sophie', 'Lucas', 'Mila', 'Sem', 'Tess', 'Finn', 'Zoë', 'Daan'].join('\n');

// Kleuren die lijken op gangbaar PLA; de echte kleur hangt af van je filament (A7).
const SWATCHES: Filament[] = [
  { name: 'White', color: '#FFFFFF' }, { name: 'Black', color: '#1B1D2E' }, { name: 'Pink', color: '#E23D8E' },
  { name: 'Cyan', color: '#0AA5C9' }, { name: 'Yellow', color: '#FFC93C' }, { name: 'Red', color: '#D7263D' },
  { name: 'Blue', color: '#2E5AAC' }, { name: 'Green', color: '#2E9E5B' }, { name: 'Orange', color: '#F28C28' },
  { name: 'Purple', color: '#7B4FB8' }, { name: 'Gray', color: '#8C8F99' },
];

const SIZES = [
  { id: 'small', label: 'Small', cap: 6 },
  { id: 'normal', label: 'Normal', cap: 7 },
  { id: 'large', label: 'Large', cap: 8.5 },
];

function warningText(w: Warning, fontName: string): string {
  if (w.code === 'missing-glyph') return `${w.name}: ${w.chars.join(' ')} is not in ${fontName}. Try another font.`;
  if (w.code === 'long') return `${w.name} is ${w.widthMm} mm long. Fine to print, or choose a smaller size.`;
  return `${w.name}: empty name skipped.`;
}

export default function App() {
  const client = useMemo(() => (typeof window === 'undefined' ? null : new EngineClient()), []);
  const [text, setText] = useState(EXAMPLE);
  const [fontId, setFontId] = useState(DEFAULT_FONT);
  const [printerId, setPrinterId] = useState(PRINTERS[0].id);
  const [sizeId, setSizeId] = useState('normal');
  const [filaments, setFilaments] = useState<Filament[]>(DEFAULT_FILAMENTS);
  const [method, setMethod] = useState<ColorMethod>('parts');
  const [result, setResult] = useState<PlateResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');
  const seq = useRef(0);

  const { names, dropped } = parseNames(text);
  const cap = SIZES.find((s) => s.id === sizeId)!.cap;
  const req = useMemo(() => ({ names, fontId, printerId, capHeight: cap }), [names.join('\n'), fontId, printerId, cap]);
  const font = fontById(fontId);

  useEffect(() => {
    if (!client) return;
    const mine = ++seq.current;
    setBusy(true);
    const t = setTimeout(async () => {
      const r = await client.send({ type: 'plate', req });
      if (mine !== seq.current) return; // nieuwere invoer wint; vorig model blijft staan
      setBusy(false);
      if (r.ok && r.type === 'plate') { setResult(r.result); setError(''); }
      else if (!r.ok) setError(r.error);
    }, 120);
    return () => clearTimeout(t);
  }, [client, req]);

  async function exportFile(format: '3mf' | 'stl') {
    if (!client) return;
    setSaved('');
    const r = await client.send({ type: 'export', req, format, filaments, method });
    if (r.ok && r.type === 'export') {
      try { setSaved(await saveFile(r.bytes, r.filename)); } catch { setError('Download was not saved.'); }
    }
    else if (!r.ok) setError(r.error);
  }

  const setFilament = (i: number, f: Filament) => setFilaments((fs) => fs.map((x, k) => (k === i ? f : x)));
  const printer = PRINTERS.find((p) => p.id === printerId)!;
  const count = result?.items.length ?? 0;

  return (
    <div className="bench">
      <section className="stage" aria-live="polite">
        <Suspense fallback={<div className="viewer" />}>
          <Viewer result={result} filaments={filaments} />
        </Suspense>
        <div className="stage-bar">
          <span className={`chip ${busy ? 'chip-busy' : ''}`}>{busy ? 'Calculating…' : `${count} keychain${count === 1 ? '' : 's'} · ${printer.name}`}</span>
          {result && <span className="chip chip-quiet">{result.bed[0]} × {result.bed[1]} mm</span>}
        </div>
      </section>

      <section className="controls">
        <div className="field">
          <label htmlFor="names">Names <span className="hint">one per line, up to {MAX_NAMES}</span></label>
          <textarea id="names" rows={7} value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} />
          <p className="hint">Example names. Replace them with yours.</p>
        </div>

        <fieldset className="field">
          <legend>Font</legend>
          <div className="options">
            {FONTS.map((f) => (
              <button key={f.id} type="button" data-pop="press" className={`opt font-${f.id}`} aria-pressed={f.id === fontId} onClick={() => setFontId(f.id)}>
                {f.name}
              </button>
            ))}
          </div>
          <p className="hint">{font.note}</p>
        </fieldset>

        {(['Plate', 'Letters'] as const).map((label, i) => (
          <fieldset className="field" key={label}>
            <legend>{label} color <span className="hint">AMS slot {i + 1}</span></legend>
            <div className="swatches">
              {SWATCHES.map((sw) => (
                <button key={sw.name} type="button" data-pop="press" className="swatch" style={{ background: sw.color }}
                  aria-label={sw.name} title={sw.name} aria-pressed={filaments[i].color === sw.color} onClick={() => setFilament(i, sw)} />
              ))}
            </div>
          </fieldset>
        ))}
        <p className="hint">Colors on screen are close, not exact. The real color comes from your filament.</p>

        <div className="row">
          <fieldset className="field">
            <legend>Size</legend>
            <div className="options">
              {SIZES.map((s) => (
                <button key={s.id} type="button" data-pop="press" className="opt" aria-pressed={s.id === sizeId} onClick={() => setSizeId(s.id)}>{s.label}</button>
              ))}
            </div>
          </fieldset>
          <fieldset className="field">
            <legend>Printer</legend>
            <div className="options">
              {PRINTERS.map((p) => (
                <button key={p.id} type="button" data-pop="press" className="opt" aria-pressed={p.id === printerId} onClick={() => setPrinterId(p.id)}>{p.name}</button>
              ))}
            </div>
          </fieldset>
        </div>

        {(result?.warnings.length || result?.overflow.length || dropped || error) ? (
          <div className="notes" role="status">
            <h2>Check before printing</h2>
            <ul>
              {error && <li className="bad">{error}</li>}
              {dropped > 0 && <li>{dropped} names over the limit of {MAX_NAMES} were left out.</li>}
              {result && result.overflow.length > 0 && (
                <li>{result.overflow.length} name{result.overflow.length === 1 ? '' : 's'} did not fit: {result.overflow.join(', ')}. Choose a bigger printer or a smaller size.</li>
              )}
              {result?.warnings.map((w, i) => <li key={i}>{warningText(w, font.name)}</li>)}
            </ul>
          </div>
        ) : null}

        <details className="field tester">
          <summary>For testers: 3MF color method</summary>
          <div className="options">
            <button type="button" className="opt" aria-pressed={method === 'parts'} onClick={() => setMethod('parts')}>B · parts (default)</button>
            <button type="button" className="opt" aria-pressed={method === 'colorgroup'} onClick={() => setMethod('colorgroup')}>A · color group</button>
          </div>
        </details>
      </section>

      <div className="dl-bar">
        <div className="dl-inner">
          <button type="button" className="btn-primary" data-pop="press" disabled={!count} onClick={() => exportFile('3mf')}>Download 3MF</button>
          <button type="button" className="btn-secondary" data-pop="press" disabled={!count} onClick={() => exportFile('stl')}>STL (ZIP)</button>
          <p className="safety">{saved ? <span className="burst-check" key={saved}>✓ Saved {saved}. </span> : null}{SAFETY_LINE}</p>
        </div>
      </div>
    </div>
  );
}
