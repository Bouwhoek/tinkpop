# Tinkpop Bible — hoe we het platform bouwen

Versie 0.2 (29-10-2026): na vier onderzoeken en een kritische audit (`docs/audit-2026-10-29.md`). Concept: nog geen code.
Klikbare versie met modulebord en 17 vragen: https://claude.ai/artifact/M8YLZ6cdYexqkqc1MfUx2s (antwoorden komen in de database van die pagina, document `bible/answers`).
Wat hieronder staat is **advies tot de eigenaar de vragen heeft beantwoord**.
Bronnen en metingen: zie de onderzoeken onderaan.

## 1. In één alinea
Tinkpop is een snelle, gratis website waar je 3D-printbare dingen maakt door in te vullen, te kijken en te downloaden.
Alles rekent in de browser van de bezoeker. Het platform bestaat uit losse **modules** die je aan en uit zet
in één schakelbord. **Generators** (sleutelhanger, clicker, bordje, ...) zijn ook modules en kunnen door de
community worden toegevoegd. De eigenaar keurt alles goed voordat het live gaat.

## 2. Ontwerpprincipes
1. **Rekenen bij de bezoeker.** Geen server voor het maken van modellen: snel, gratis, privé.
2. **Alles is een module.** Kern zo klein mogelijk; elke functie heeft een manifest, kan uit, en zegt wat hij nodig heeft.
3. **De repo is het geheugen en het schakelbord.** Eén bestand `tinkpop.config.json` bepaalt wat aan staat.
4. **Uit = weg.** Wat uit staat, wordt niet meegebouwd en kost de bezoeker niets.
5. **Eerst één generator perfect**, dan verbreden.
6. **Veilig standaard.** Community-code draait zonder netwerk, met tijdslimiet, na automatische controles en goedkeuring.
7. **Gratis te draaien.** Doel: €0 hosting tot ver boven 100.000 bezoekers per maand.

## 3. Lagen
```
┌───────────────────────────── Bezoeker (browser) ─────────────────────────────┐
│  Pagina's (Astro, statisch)  →  Generator-eiland (React)                        │
│        catalogus, uitleg            formulier · 3D-voorbeeld · download         │
│                                         │                                       │
│                                  Rekenwerker (Web Worker)                       │
│                                  manifold-3d · fonts · cache · export          │
│                                  (+ OpenSCAD-wasm voor .scad-generators)        │
└────────────────────────────────────────────────────────────────────────────────┘
┌───────────────────────── Cloudflare (gratis laag) ───────────────────────────┐
│  Workers static assets (site)  ·  optioneel: KV (noodschakelaar), D1 (stemmen),  │
│  R2 (tijdelijke bestanden voor "Open in Bambu Studio"), Turnstile, Access (/admin)│
└────────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────── GitHub ───────────────────────────────────────┐
│  Monorepo · tinkpop.config.json · PR-controles (render, printbaar, licentie)      │
│  · eigenaar keurt goed · automatisch uitrollen na merge                           │
└────────────────────────────────────────────────────────────────────────────────┘
```

## 4. Techniekkeuzes (advies)
| Onderdeel | Keuze | Waarom | Viel af |
|---|---|---|---|
| Hosting | Cloudflare **Workers static assets** | Cloudflare zet nieuwe functies in Workers; NotMadeYet draait ook zo | Pages (besluit 28-10, vraag `hosting`) |
| Framework | **Astro** met React-eilanden, **één app op npm** (`ignore-scripts=true`) | Nul JS op gewone pagina's; weinig breekpunten | SvelteKit, Next.js, pnpm-monorepo |
| Rekenmotor eigen generators | **manifold-3d** in een Web Worker, TypeScript | 29 ms/toets ("Mark"), 117 ms (18 tekens) op laptop; altijd waterdicht; 204 KB | OpenSCAD-wasm, JSCAD, replicad |
| Rekenmotor community (fase 2) | **OpenSCAD-wasm**, vaste versie, rekent na pauze | MakerWorld-.scad werkt ongewijzigd; geen netwerk/DOM = veilig | TypeScript van derden |
| Tekst | **harfbuzzjs** + zelf gehoste OFL-fonts zonder Reserved Font Name, lazy | Echte tekstvorming; opentype.js crashte en leest geen WOFF2 | opentype.js |
| Emoji/logo | SVG (Twemoji/OpenMoji/eigen), lokaal in de browser, minimale lijndikte | Kleurfonts niet printbaar | – |
| 3D-beeld | three.js, met herstel bij WebGL-verlies | Standaard | – |
| Export | STL + **minimale 3MF** (objecten + filament per onderdeel + kleur, geen printerprofiel) + Prusa-config | Werkt in Bambu, Orca, Prusa zonder meldingen; CI-test tegen vaste én nieuwste slicer | volledig Bambu-projectformaat |
| Open in Bambu Studio | fase 3: R2 tijdelijk + `bambustudio://open?file=`, met Turnstile, limiet, TTL | Vraagt server, misbruikrisico, waarschuwing, niet op mobiel | fase 1 |
| Schakelbord | `tinkpop.config.json` (bouwtijd); KV-noodschakelaar pas bij serverfuncties | Simpel, terug te draaien | GrowthBook/OpenFeature |
| Visueel bord | fase 2 automatisch uit manifests (bekijken), fase 3 React Flow (klikken → PR) | Eerst zicht, dan pas schakelen | Rete.js, LiteGraph, Drawflow |
| Fouten | eigen kleine teller via Worker + Analytics Engine, zonder gebruikerstekst; knop "Meld een probleem" | Eigenaar moet fouten zien | geen monitoring |
| Statistiek | Cloudflare Web Analytics + cookieloze events (download, fout, tijd tot eerste voorbeeld) | Geen cookiebanner; meet wat telt | Google Analytics |

## 5. Mappen (één app)
```
src/core/            contract (types, JSON-schema's), register, afhankelijkheden-check, schakelbord lezen
src/geometry/        manifold-wrapper (SDK met eigen opruimen), tekst, SVG, export STL/3MF, rekenwerker
src/scad/            OpenSCAD-spoor + Customizer-parser (fase 2)
src/ui/              knoppen, formulieren uit schema + ui-schema
src/modules/<id>/    platformmodules (contract 0.x, intern)
src/generators/<id>/ manifest.json, generator.ts óf model.scad, preview.png, LICENSE, README, testsets
src/pages/           Astro-pagina's (één per generator en sterk voorbeeld)
tinkpop.config.json  schakelbord
docs/                bible, besluiten, roadmap, draaiboek
```
Opsplitsen in pakketten pas als er insluiten of externe SDK-gebruikers komen.

## 6. Het modulecontract
Elke module en elke generator heeft een `manifest.json`. Regels:
- **id** verandert nooit. **version** volgt semver. **contract** zegt met welke kernversie hij werkt (`^1.0`).
- **requires** (hard) en **optional** (zacht): bij het bouwen faalt het als iets aan staat wat een uitgezette module nodig heeft.
- **settings/params** als JSON-schema: daaruit komen het formulier, de controles en de grenzen (min/max).
- **permissions**: generators hebben altijd `network: false`.
- **defaultEnabled**: nieuwe modules staan uit.
- Alleen het **generator-contract v1** ligt vast. Platformmodules blijven `0.x` en intern tot er drie echte zijn.
- Extra velden (uit de audit): vertaalbare `title`/`description` per parameter; `ui` (groepen, volgorde, widget: slider/kleur/font, `showIf`);
  `validate(params)` voor fouten en waarschuwingen over meerdere velden; toegestane tekens en wat er gebeurt bij ontbrekende glyphs;
  **kleurrollen** (`base`, `text`, `border`) met standaardfilament; `migrate(fromVersion, params)`; `deprecated`/`replacedBy`;
  vindbaarheid (beschrijving, deelplaatje per preset); `embeddable`; licentie per asset (font, SVG).
- **Deel-links** bevatten `id@major` + parameters in `#hash`, met nette canonieke URL. Cache-sleutel = parameters + font + engine- en kernversie.
- `enabled` (meegebouwd), `hidden` (wel gebouwd, niet in catalogus), `status` (label). Uitgezette generator → pagina "met pensioen" met opvolger, nooit een 404.
- Afhankelijkheden met versiebereik; controle op kringen en op dubbele routes/menu-items.

### Generator-manifest (voorbeeld)
```json
{
  "id": "keychain-name", "kind": "generator", "version": "1.0.0", "contract": "^1.0",
  "name": {"en": "Name keychain"}, "category": "keychain", "tags": ["text", "multicolor"],
  "author": {"name": "Mark", "github": "Hultink5611", "donateUrl": "https://buymeacoffee.com/..."},
  "license": {"code": "MIT", "model": "CC-BY-4.0", "printsMaySell": true},
  "engine": "manifold", "entry": "./generator.ts",
  "params": {"type": "object", "properties": {
    "text": {"type": "string", "default": "Tink", "maxLength": 20},
    "height": {"type": "number", "minimum": 1, "maximum": 10, "default": 3, "unit": "mm"}}},
  "presets": [{"id": "classic", "params": {"height": 3}}],
  "outputs": ["stl", "3mf"], "colors": {"max": 4},
  "print": {"maxSizeMm": [80, 40, 10], "needsSupports": false, "maxRenderMs": 3000},
  "requires": {"modules": ["fonts"]}, "permissions": {"network": false},
  "status": "beta", "defaultEnabled": true
}
```
Voor `.scad`-generators is `engine: "openscad"` en komen de parameters uit de Customizer-opmerkingen in het bestand
(ook MakerWorld-uitbreidingen als `// color`, `// font`, `mw_plate_N`). Het manifest bevat dan alleen wat OpenSCAD niet kan zeggen.

### De generator-interface (TypeScript)
`async build(params, sdk, { signal, quality: 'draft'|'final' }) → parts[]`, elk onderdeel `{ name, role, mesh }`.
SDK: `text()`, `svg()`, `outline()`, `ring()`, `plate()`, `part(role)`. Zuivere functie. **De SDK beheert het geheugen** (alles van één build wordt daarna automatisch opgeruimd), zodat makers niets hoeven op te ruimen.

### Platformmodule-manifest (voorbeeld)
```json
{
  "id": "not-made-yet", "kind": "feature", "version": "0.1.0", "contract": "^1.0",
  "name": {"en": "Not Made Yet"}, "tier": "optional", "defaultEnabled": false,
  "requires": ["storage-d1", "turnstile"], "optional": ["auth"],
  "contributes": {"routes": ["/not-made-yet"], "nav": [{"label": "Not Made Yet", "order": 40}],
                  "slots": {"home.sections": "./HomeTeaser.astro"}, "api": ["/api/votes"]},
  "settings": {"type": "object", "properties": {"votesPerDay": {"type": "integer", "default": 5}}},
  "bindings": {"d1": ["DB"]}, "secrets": ["TURNSTILE_SECRET"], "runtimeToggle": true
}
```

### Schakelbord
```json
{ "modules": { "donate-bmc": {"enabled": true}, "share-link": {"enabled": true},
               "open-in-bambu": {"enabled": false}, "not-made-yet": {"enabled": false} },
  "generators": { "keychain-name": {"enabled": true}, "clicker": {"enabled": false} } }
```
Uitrollen duurt 1–2 minuten na een wijziging. Serverfuncties hebben daarnaast een directe noodschakelaar in KV.

## 7. Modulelijst
| Module | Soort | Fase | Nodig |
|---|---|---|---|
| kern, generator-runtime, maker-credit, juridisch, **foutmeldingen** | kern | 1 | – |
| fonts, **eigen logo/SVG (lokaal)**, ams-kleuren, printschatting, deel-link, **bewaren (lokaal)**, **vindbaar (SEO)**, Buy Me a Coffee, statistiek | optioneel | 1 | runtime/kern |
| sleutelhanger met naam | generator | 1 | runtime, fonts, svg |
| catalogus, clicker, OpenSCAD-spoor, moduleoverzicht (bekijken), beheer-slot (Access) | optioneel | 2 | – |
| R2, D1, Turnstile, open-in-Bambu, bord met schakelaars, Nederlands, Not Made Yet | optioneel | 3 | zie bord |
| inloggen, uploads (online delen), galerij met moderatie | optioneel | 4 | D1, R2 |
| AI-modellen, winkel | optioneel, **kost geld** | 5 | inloggen |
Een klikbare versie met afhankelijkheden staat in het artifact (tab Modulebord).

## 8. Snelheid
Budget (te bewaken met automatische tests):
- Gewone pagina: < 50 KB JavaScript, Lighthouse > 95.
- Generator-pagina: eerste 3D-voorbeeld < 3 s desktop, < 5 s mobiel.
- Per toetsaanslag: < 100 ms laptop, < 300 ms gewone telefoon (vaste testtelefoon + CI met 6× CPU-vertraging). Eerst `draft` (ruw), `final` (contour/offset) na 150 ms rust.
- Rekenen altijd in een Web Worker; laatste opdracht wint; meshes zonder kopiëren naar het scherm.
- Cache per onderdeel op hash(parameters + font): kleur wisselen = niets opnieuw rekenen.
- Glyph-vormen cachen per font/teken/grootte. Eerst grof, dan fijn.
- Geheugen: de SDK ruimt op; op iOS `WebAssembly.Memory.buffer.byteLength` bewaken en de werker herstarten boven ~250 MB.
- OpenSCAD-wasm alleen laden op `.scad`-pagina's, en vooraf "opwarmen".

## 9. Kwaliteit en printbaarheid
Dezelfde regels aan twee kanten (afgeleid van NotMadeYet `controleer.py`):
- **In de browser, live:** waterdicht, één geheel (of bewust losse delen per kleur), onderkant op z=0,
  overhang ≤ 45°, geen zwevende eilanden, minimale wanddikte, past op de gekozen plaat. **Alleen een kapot (niet-waterdicht) model blokkeert de download**; de rest is een duidelijke waarschuwing.
- **In CI, per PR:** render elke preset + willekeurige en extreme waarden met tijdslimiet; PrusaSlicer-test voor gram, uren en support;
  limieten voor driehoeken en bestandsgrootte; preview-PNG als PR-opmerking zodat de eigenaar op zicht kan goedkeuren.
- Tests: vaste testmodellen per generator op maat (volume ±0,5%, afmetingen ±0,01 mm, aantal delen), geen vertex-hashes; e2e-test typen → voorbeeld → download → 3MF lezen; slicer-test in CI.
- Gram/tijd in de browser zijn schattingen (volume × dichtheid, flow), geijkt op 5–10 modellen uit Bambu Studio.

## 10. Community en veiligheid
- **Community-generators alleen in `.scad`** (fase 2). TypeScript-generators alleen van de eigenaar/Claude. Eventuele TS van derden later alleen in een sandbox-iframe op een apart domein.
- Generators worden gebouwd in een stap zonder geheimen; de uitrolstap krijgt alleen het resultaat. Actions vastgepind op commit, Cloudflare-sleutel alleen voor deze Worker, tweestapsverificatie (passkey) op GitHub.
- CSP voor de rekenwerker via `_headers` op het werkerbestand (niet geërfd van de pagina) en getest.
- Bijdragen via GitHub-PR. Een generator-PR mag alleen zijn eigen map `generators/<id>/` aanraken; kern via CODEOWNERS = eigenaar.
- Controles draaien op `pull_request` zonder geheimen; nooit `pull_request_target` met community-code.
- pnpm 10: geen installatiescripts van pakketten; generators mogen geen eigen npm-pakketten meenemen.
- Eerste bijdrage van iemand nieuw: altijd handmatig goedkeuren.
- In de browser: elke generator in een werker zonder netwerk (CSP `connect-src 'none'`), harde tijdslimiet, invoer begrensd tot min/max.
- Startpakket voor makers: sjabloon "eerste generator", gids "MakerWorld-model overzetten in 5 minuten", PR-checklist,
  labels `good first generator` en `generator-request`, GitHub Discussions.
- Licenties: code MIT; ontwerp per generator (standaard CC BY 4.0); fonts alleen OFL/Apache, ongewijzigd meegeleverd;
  MakerWorld-modellen alleen met schriftelijke herlicentie van de echte maker.

## 11. Privacy, recht, toegankelijkheid
- Fase 1 zonder login: bijna geen persoonsgegevens; privacyverklaring + Cloudflare-verwerkersovereenkomst; geen cookiebanner.
- Login (later): alleen e-mail of GitHub, account verwijderen kan, minimumleeftijd 16 (NL).
- Uploads/galerij (later): meld- en verwijderknop en contactpunt (DSA), uitleg bij verwijderen.
- Toegankelijkheid: vrijwillig WCAG 2.2 AA; tekstalternatief bij het 3D-beeld; automatische test (axe) in CI.
- Geen juridisch advies: laat vóór login/uploads iemand meekijken.

## 12. Kosten
| Bezoekers per maand | Hosting | Toelichting |
|---|---|---|
| 10.000 | €0 | alles statisch |
| 100.000 | €0 | API-verzoeken ruim onder 100k per dag |
| AI aan | vanaf $5/mnd + kosten per model | Workers AI heeft geen tekst-naar-3D; externe dienst nodig |
Vast: domeinen (~€40/jaar voor .com/.app/.org).

## 13. Fasen
0. **Proef (± 1 week)**: naam op een plaatje, 3 fonts, STL + kleuren-3MF, proeflink; getest op de telefoon van de eigenaar en in Bambu Studio.
1a. **Alles erop en eraan**: sleutelhanger met alle instellingen van keychaingenerator.tech (afvinklijst in `markt.md`), eigen logo/SVG, bewaren, deel-link.
1b. **Klaar voor bezoekers**: foutmeldingen, cijfers, vindbare pagina's per generator/preset, juridische pagina's, merkcheck Pinkpop, draaiboek terugdraaien. Live na akkoord.
1c. **Testgroep**: 5–10 Bambu-gebruikers, dan officiële lancering.
2. **Community open**: OpenSCAD-spoor, sjabloon en gids, clicker, catalogus, moduleoverzicht.
3. **Groeien**: meer generators, Nederlands, Not Made Yet, Open in Bambu Studio, bord met schakelaars.
4. **Accounts**: inloggen, online delen, galerij met moderatie.
5. **AI en winkel**: alleen als donaties of omzet het dragen.
Nu al starten (kost tijd, geen code): toestemming clicker-maker, testprints voor toleranties, merkcheck.

## 13b. Beheer voor de eigenaar
- Proeflink per PR (`wrangler versions upload`) + render-plaatjes; bij PR's van buiten pas na een label van de eigenaar.
- Samenvoegen = akkoord om live te zetten, ná het proberen van de proeflink (vraag `live`).
- Terugdraaien: Cloudflare "Rollback" of een revert-PR; draaiboek van één pagina in `docs/`.
- Kapotte generator → automatisch verborgen, blokkeert de rest niet.
- Cijfers: downloads per week, bezoek → download, p75 tijd tot eerste voorbeeld op mobiel, foutpercentage, donaties tegen kosten.

## 14. Wat we overnemen en vermijden (van concurrenten)
- Overnemen (Open Keychain, MIT): worker + cache-opzet, 3MF-truc die in Bambu én Prusa werkt, ontwerp-in-de-link,
  printfouten die export blokkeren, prestatiebudget, slicer-test in CI. Met bronvermelding in `THIRD_PARTY_LICENSES`.
- Vermijden: één groot bouwbestand met `if template === ...` (Open Keychain), één HTML-bestand zonder booleans en zonder 3MF (Tagify3D).

## 15. Onderzoeken (29-10-2026)
- Rekenmotor: eigen metingen in headless Chromium (manifold 3.5.4, OpenSCAD 2025.03.25, replicad 1.2, JSCAD 2.13); broncode Bambu Studio `bbs_3mf.cpp`.
- Modules: VS Code-, Grafana-, Home Assistant-, Backstage-, Obsidian-, Figma-manifesten; Cloudflare-limieten; React Flow 12.12.
- Code-analyse: capynq/open-keychain, doccaz/nameplate-generator, notmadeyet `schema/controleer.py`.
- Veiligheid/recht: OpenSCAD Customizer-handleiding, onofficiële MakerWorld PMM-documentatie, OFL-FAQ, EDPB 2/2023, DSA, EAA.
Klikbare versie: `docs/bible.html` (kopie van het artifact).
