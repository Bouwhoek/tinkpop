// studio/fonts — vaste set OFL-lettertypen (B-006). Gekozen op tekens, niet alleen op uiterlijk (mvp.md).
export type FontInfo = { id: string; name: string; file: string; license: string; licenseFile: string; note: string };

export const FONTS: FontInfo[] = [
  { id: 'titan-one', name: 'Titan One', file: 'TitanOne-Regular.ttf', license: 'OFL-1.1', licenseFile: 'OFL-titanone.txt', note: 'Round and bold. Missing: İ.' },
  { id: 'archivo-black', name: 'Archivo Black', file: 'ArchivoBlack-Regular.ttf', license: 'OFL-1.1', licenseFile: 'OFL-archivoblack.txt', note: 'Clean and heavy.' },
  { id: 'pacifico', name: 'Pacifico', file: 'Pacifico-Regular.ttf', license: 'OFL-1.1', licenseFile: 'OFL-pacifico.txt', note: 'Handwritten. Thin parts: print a test.' },
];

export const DEFAULT_FONT = FONTS[0].id;

export function fontById(id: string): FontInfo {
  return FONTS.find((f) => f.id === id) ?? FONTS[0];
}
