// studio/batch — lijst met namen plakken: één per regel (of gescheiden door komma's).
export const MAX_NAMES = 60;

export function normalizeName(raw: string): string {
  return raw.replace(/\s+/g, ' ').trim();
}

export type ParsedNames = { names: string[]; dropped: number };

export function parseNames(text: string): ParsedNames {
  const parts = text.split(/[\n,;\t]+/).map(normalizeName).filter(Boolean);
  return { names: parts.slice(0, MAX_NAMES), dropped: Math.max(0, parts.length - MAX_NAMES) };
}
