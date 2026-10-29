# Hergebruik van open source (29-10-2026)

Ongeveer 40–50% van fase 0–1 kan uit bestaande open source komen; voor de technische basis (rekenen, 3D, tekst, export, controles, inloggen) zelfs 60–70%. Alles wat in de site terechtkomt is MIT, ISC of Apache: dat past bij elke licentie die we kiezen. Zelf bouwen blijft: de generators, de clicker, de plaatlogica, de pop-taal, het modulebord-gedrag, de meldknop en de juridische poort.

Klikbaar overzicht met alle modules: `docs/pages/overzicht.html` / https://claude.ai/artifact/SvncP5H8edGJj65ZqECMdU

| Wat we nodig hebben | Project | Licentie | Hoe | Bespaart |
|---|---|---|---|---|
| Rekenkern (vormen, tekst-contour, gram) | manifold-3d | Apache-2.0 | zoals het is | maanden |
| Rekenwerker + cache | open-keychain (worker, cache) | MIT | ombouwen | 1–2 weken |
| OpenSCAD in de browser | openscad-wasm (los, geïsoleerd) | GPL-2.0+ | zoals het is | maanden |
| Customizer-paneel | openscad-playground | GPL-3.0 | alleen inspiratie | 1 week |
| 3D-voorbeeld | three + react-three-fiber + drei | MIT | zoals het is | 2–3 weken |
| Wanddikte-check | three-mesh-bvh | MIT | zoals het is | 1 week |
| Tekst naar vorm | harfbuzzjs + outline.ts (open-keychain) | MIT | ombouwen | 2–3 weken |
| Fonts | google/fonts | OFL / Apache | zoals het is | — |
| SVG naar vorm | three SVGLoader | MIT | zoals het is | 1 week |
| Foto naar vector (later) | imagetracerjs | Unlicense | zoals het is | 1 week |
| Emoji | Twemoji (jdecked) | MIT + CC BY 4.0 | zoals het is | 1 week |
| 3MF voor Bambu (AMS) | three-3mf-exporter (bekuto3d) | MIT | ombouwen | 1–2 weken |
| Plaat vullen | maxrects-packer | MIT | zoals het is | 1 week |
| Slicer-test in CI | PrusaSlicer CLI + open-keychain-scripts | AGPL (alleen tool) / MIT | ombouwen | 1 week |
| OpenSCAD-bibliotheek | BOSL2 | BSD-2-Clause | zoals het is | — |
| Inloggen (e-maillink + passkey) | Better Auth + passkey-plugin | MIT | zoals het is | weken |
| Beheer-slot | Cloudflare Access | dienst | zoals het is | groot |
| Inlogmails | Resend (gratis 100/dag) of Cloudflare Email ($5/mnd) | MIT (SDK) | zoals het is | middel |
| Database | Drizzle ORM op D1 | Apache-2.0 | zoals het is | middel |
| Live schakelaars | eigen flags.json in OpenFeature-vorm | Apache-2.0 (vorm) | zelf bouwen | — |
| Modulebord | React Flow + dagre | MIT | zoals het is | groot |
| Formulieren uit schema | rjsf + @cfworker/json-schema | Apache-2.0 / MIT | zoals het is | groot |
| Meertalig | Astro i18n + Paraglide | MIT | zoals het is | middel |
| Statistiek | Cloudflare Web Analytics + Analytics Engine | dienst | zoals het is | groot |
| Foutmeldingen | @sentry/cloudflare → GlitchTip | MIT | zoals het is | groot |
| Scheldwoordfilter (openbare delen) | obscenity | MIT | zoals het is | klein |
| Robotcheck | Turnstile + react-turnstile | MIT | zoals het is | klein |
| Docs, logboek, transparantie | Astro Starlight + Changesets | MIT | zoals het is | groot |
| CI-controles | ajv, dependency-review, license-checker, REUSE, Playwright + axe, Renovate | diverse (alleen tools) | zoals het is | groot |
| Feestje bij download | canvas-confetti (of eigen canvas) | ISC | zoals het is | klein |
| Meldknop + takedown (DSA) | niets geschikt | — | zelf bouwen | — |
| Pop-taal | eigen (CSS + WAAPI) | — | zelf bouwen | — |

## Licentieregels
- MIT, BSD, ISC, Apache, Unlicense: altijd mee, licentietekst meeleveren (pagina 'third-party licenses').
- GPL (openscad-wasm): alleen als los programma met bronverwijzing; nooit in onze eigen bundel zolang wij MIT zijn.
- Kiezen we AGPL, dan mag GPL-3-code wél mee; dat maakt KeyV2 en andere GPL-bibliotheken bruikbaar.
- Tools in CI (PrusaSlicer, Renovate, REUSE) verspreiden we niet: geen gevolgen voor onze licentie.
- OFL-fonts: meeleveren met licentie; wat je print is vrij.
- CC BY (Twemoji): vermelding op de site én in het gedownloade bestand.
- Nooit CC BY-NC of 'TBD'-licenties (bijv. void_switch-clicker).

## Pas op
- Lucia (deprecated) en OpenAuth (staat stil): niet gebruiken voor inloggen.
- Better Auth is sinds juli 2026 van Vercel: licentie blijft MIT, versie vastzetten.
- Ajv werkt niet op Cloudflare Workers: op de server @cfworker/json-schema gebruiken.
- elkjs, deepnest, potrace-wasm, KeyV2: GPL-varianten, niet zolang we MIT zijn.
- Open Keychain: één maker, twee maanden oud; hun naam en logo nooit gebruiken (TRADEMARKS.md).
- three-3mf-exporter: claimt eigen code, toch nalopen op AGPL-overlap met Bambu Studio.
- Inlogmails via Cloudflare kosten $5/mnd; Resend is gratis tot 100 per dag.

## Zelf bouwen
- Kaartjes, tinkpop.config.json, flags.json (met veilige stand en terugdraaien)
- Gedrag van het modulebord: 2× bevestigen, logboek, ongedaan maken
- Meldknop en takedown-flow (DSA)
- De generators zelf en de clicker (eigen ontwerp)
- Plaat vullen met Bambu-plaatmaten
- Pop-taal en de formulier-onderdelen in Tinkpop-stijl
- Juridische poort in CI
- Kleine eigen laag voor mail, flags en opslag (niet vastzitten aan één leverancier)

## Startpakket (advies)
Astro + @astrojs/cloudflare + React · manifold-3d · three + react-three-fiber + drei · harfbuzzjs · three-3mf-exporter (ombouwen) · maxrects-packer · Twemoji · Better Auth + passkey · Drizzle op D1 · Resend (of Cloudflare Email) achter eigen `sendMail()` · eigen flags.json in OpenFeature-vorm · React Flow + dagre · rjsf + @cfworker/json-schema · Paraglide · Starlight · obscenity · react-turnstile · @sentry/cloudflare → GlitchTip · Cloudflare Web Analytics · CI: ajv, dependency-review, license-checker-rseidelsohn, REUSE, Playwright + axe, Renovate.

Belangrijkste bronnen: github.com/elalish/manifold, github.com/capynq/open-keychain, github.com/LittleSound/bekuto3d, github.com/harfbuzz/harfbuzzjs, github.com/openscad/openscad-wasm, github.com/better-auth/better-auth, github.com/xyflow/xyflow, github.com/rjsf-team/react-jsonschema-form, github.com/cfworker/cfworker, npm-register (versies en licenties, stand 29-10-2026).
