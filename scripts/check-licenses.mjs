// Licenties van alle pakketten (B-075): MIT/ISC/BSD/Apache/Unlicense en GPL-3.0(-or-later) mogen; GPL-2.0-only, NC en onbekend niet.
import { readFileSync } from 'node:fs';

const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
const OK = new Set(['MIT', 'ISC', 'BSD-2-Clause', 'BSD-3-Clause', '0BSD', 'Apache-2.0', 'Unlicense', 'CC0-1.0', 'CC-BY-4.0', 'BlueOak-1.0.0', 'MPL-2.0', 'Python-2.0', 'Zlib', 'GPL-3.0', 'GPL-3.0-or-later', 'LGPL-3.0', 'LGPL-3.0-or-later', 'AGPL-3.0', 'AGPL-3.0-only', 'AGPL-3.0-or-later', 'MIT-0', 'WTFPL']);
const bad = [];
const ok = (expr) => expr.replace(/[()]/g, '').split(/ OR /).some((alt) => alt.split(/ AND /).every((l) => OK.has(l.trim())));
for (const [path, pkg] of Object.entries(lock.packages ?? {})) {
  if (!path || pkg.link) continue;
  const lic = typeof pkg.license === 'string' ? pkg.license : '';
  if (!lic || !ok(lic)) bad.push(`${path.replace(/^.*node_modules\//, '')}@${pkg.version}: ${lic || 'onbekend'}`);
}
if (bad.length) { for (const b of bad) console.error('LICENTIE:', b); process.exit(1); }
console.log(`licenties: ${Object.keys(lock.packages).length - 1} pakketten in orde`);
