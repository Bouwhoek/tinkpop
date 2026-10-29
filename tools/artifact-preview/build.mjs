// Bouwt een privé-proefversie als claude.ai-artifact (geen livegang, geen domein).
// Zelfde app; alleen paden relatief en downloaden via de viewer (PUBLIC_ARTIFACT=1, zie save.ts).
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, statSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../..', import.meta.url).pathname;
const out = join(root, 'dist-artifact');
rmSync(out, { recursive: true, force: true });
execSync('npx astro build --outDir dist-artifact', { cwd: root, stdio: 'inherit', env: { ...process.env, PUBLIC_ARTIFACT: '1' } });

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
for (const f of walk(join(out, 'assets'))) {
  if (f.endsWith('.js')) writeFileSync(f, readFileSync(f, 'utf8').replaceAll('"/assets/', '"./'));
  if (f.endsWith('.css')) writeFileSync(f, readFileSync(f, 'utf8').replaceAll('url(/fonts/', 'url(../fonts/').replaceAll("url('/fonts/", "url('../fonts/"));
}
const html = readFileSync(join(out, 'index.html'), 'utf8').replaceAll('"/assets/', '"./assets/').replaceAll('"/brand/', '"./brand/').replaceAll('"/fonts/', '"./fonts/');
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1];
const keep = [...head.matchAll(/<title>[\s\S]*?<\/title>|<link rel="stylesheet"[^>]*>|<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/g)].map((m) => m[0]);
writeFileSync(join(out, 'page.html'), `<title>Tinkpop proefversie</title>\n${keep.filter((k) => !k.startsWith('<title>')).join('\n')}\n${body}`);
const files = walk(out).map((f) => relative(out, f)).filter((f) => f !== 'index.html' && f !== 'page.html');
writeFileSync(join(out, 'files.json'), JSON.stringify(Object.fromEntries(files.map((f) => [f, join(out, f)])), null, 1));
console.log(`page.html + ${files.length} files`);
