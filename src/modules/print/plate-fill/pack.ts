// print/plate-fill — zoveel sleutelhangers als passen op de printplaat.
// Eenvoudige plankverdeling: rijen van links naar rechts, hoogste eerst; daarna de groep in het midden.
export type Printer = { id: string; name: string; bed: [number, number] };

// Maten uit docs/2-plan/mvp.md (plaatmaten). Fase 0: A1 mini en A1.
export const PRINTERS: Printer[] = [
  { id: 'a1-mini', name: 'A1 mini', bed: [180, 180] },
  { id: 'a1', name: 'A1', bed: [256, 256] },
];

export const PLATE_MARGIN = 8;
export const PLATE_GAP = 4;

export type Box = { w: number; h: number };
export type Placement = { index: number; x: number; y: number };
export type PackResult = { placed: Placement[]; overflow: number[] };

export function packOnPlate(items: Box[], bed: [number, number], margin = PLATE_MARGIN, gap = PLATE_GAP): PackResult {
  const [bw, bh] = bed;
  const order = items.map((b, index) => ({ ...b, index })).sort((a, b) => b.h - a.h || b.w - a.w);
  const placed: Placement[] = [];
  const overflow: number[] = [];
  let x = margin, y = margin, rowH = 0;
  for (const it of order) {
    if (it.w > bw - 2 * margin || it.h > bh - 2 * margin) { overflow.push(it.index); continue; }
    if (x + it.w > bw - margin) { x = margin; y += rowH + gap; rowH = 0; }
    if (y + it.h > bh - margin) { overflow.push(it.index); continue; }
    placed.push({ index: it.index, x: x + it.w / 2, y: y + it.h / 2 });
    x += it.w + gap;
    rowH = Math.max(rowH, it.h);
  }
  if (placed.length) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const pl of placed) {
      const b = items[pl.index];
      minX = Math.min(minX, pl.x - b.w / 2); maxX = Math.max(maxX, pl.x + b.w / 2);
      minY = Math.min(minY, pl.y - b.h / 2); maxY = Math.max(maxY, pl.y + b.h / 2);
    }
    const dx = bw / 2 - (minX + maxX) / 2, dy = bh / 2 - (minY + maxY) / 2;
    for (const pl of placed) { pl.x += dx; pl.y += dy; }
  }
  placed.sort((a, b) => a.index - b.index);
  return { placed, overflow: overflow.sort((a, b) => a - b) };
}
