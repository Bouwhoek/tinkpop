// Juridische poort (bible §16, B-070, B-146): controleert het kaartje van elke module.
// Dit is een controle op gegevens, geen juridisch oordeel. Bij twijfel: niet bouwen, melden aan de eigenaar.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const codes = new Set([...readFileSync(join(root, 'docs/2-plan/modules.md'), 'utf8').matchAll(/`([a-z]+\/[a-z0-9-]+)`/g)].map((m) => m[1]));
const ALLOWED_ASSET = /^(OFL-1\.1|Apache-2\.0|MIT|CC0-1\.0|CC-BY-4\.0|own \(B-\d+\))$/;
const errors = [], notes = [];
const dir = join(root, 'src/modules');
for (const main of readdirSync(dir)) {
  for (const part of readdirSync(join(dir, main))) {
    const folder = join(dir, main, part);
    if (!statSync(folder).isDirectory()) continue;
    const file = join(folder, 'module.json');
    const id = `${main}/${part}`;
    if (!existsSync(file)) { errors.push(`${id}: module.json ontbreekt`); continue; }
    const m = JSON.parse(readFileSync(file, 'utf8'));
    const L = m.legal;
    if (m.id !== id) errors.push(`${id}: id in kaartje is ${m.id}`);
    if (!codes.has(id)) errors.push(`${id}: code staat niet in docs/2-plan/modules.md`);
    if (!L) { errors.push(`${id}: juridisch blok ontbreekt`); continue; }
    for (const k of ['origin', 'codeLicense', 'outputLicense', 'personalData', 'storesUserContent', 'public', 'commercial', 'risks', 'reviewedBy'])
      if (L[k] === undefined) errors.push(`${id}: legal.${k} ontbreekt`);
    if (L.commercial) errors.push(`${id}: commercial = true (Tinkpop verkoopt niets, B-063)`);
    if (L.codeLicense !== 'AGPL-3.0') errors.push(`${id}: codeLicense moet AGPL-3.0 zijn (B-075)`);
    if (L.origin === 'permission' && !(L.originProof && existsSync(join(root, L.originProof)))) errors.push(`${id}: toestemming zonder bewijsbestand`);
    if (L.storesUserContent || L.public) notes.push(`${id}: bewaart of toont inhoud → meldknop en voorwaarden nodig (DSA)`);
    if (L.personalData !== 'none') notes.push(`${id}: persoonsgegevens → privacyverklaring bijwerken (AVG)`);
    for (const a of L.assets ?? []) {
      if (!existsSync(join(root, a.file))) errors.push(`${id}: bestand ontbreekt: ${a.file}`);
      if (!ALLOWED_ASSET.test(a.license)) errors.push(`${id}: licentie niet toegestaan: ${a.license} (${a.file})`);
      if (a.licenseFile && !existsSync(join(root, a.licenseFile))) errors.push(`${id}: licentietekst ontbreekt: ${a.licenseFile}`);
    }
    if (!L.approvedBy) notes.push(`${id}: nog niet goedgekeurd door de eigenaar`);
  }
}
for (const n of notes) console.log('let op:', n);
if (errors.length) { for (const e of errors) console.error('FOUT:', e); process.exit(1); }
console.log('modules: juridisch blok in orde');
