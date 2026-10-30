# Lessen van 100 platforms (29-10-2026)

Vijf onderzoeken van elk 20 platforms. Klikbaar: overzicht-artifact, tab "100 platforms".

## Front-end en snelheid
*Bekeken:* Linear, Figma, Excalidraw, tldraw, Photopea, Squoosh, Google Docs/Sheets, Notion, GitHub, Stripe, Shopify, Airbnb, Spotify, Discord, Canva, Framer, Lichess, OpenStreetMap, Wikipedia, Onshape

| Les | Hoe | Van | Hoofdmodule | Status |
|---|---|---|---|---|
| Zware rekencode laadt pas na de eerste weergave | Formulier en voorbeeldplaatje staan er meteen; manifold laadt in de worker zodra iemand het formulier aanraakt. | Notion, Google Sheets, Squoosh | Studio | plan aangescherpt |
| Groottegrens die de bouw laat falen | ≤ 50 kB start-JS per pagina (WASM en three.js apart), bewaakt met size-limit in CI; prestatietests met echte presets. | Wikipedia, Shopify, Figma | Fundament | nieuw |
| Generatorpagina's als gewone HTML, alleen de werkbank interactief | Pagina vooraf gemaakt met uitleg en plaatje; alleen de werkbank is een React-eiland; werkt ook zonder JS als formulier. | GitHub, Framer, Airbnb | Bibliotheek | plan aangescherpt |
| Lui laden met nieuwe pogingen | three.js en export pas laden als nodig; bij mislukken 3× opnieuw, daarna 'Reload'. Vangt fouten net na een update. | Discord | Fundament | nieuw |
| Browsercheck met terugval | Zonder WebGL: plat voorbeeldplaatje en toch downloaden; /check-pagina voor hulpvragen; WebGL-verlies opvangen. | Figma, Onshape | Studio | nieuw |
| Ontwerp in de link, versie erbij | Alle instellingen gecomprimeerd in het #-deel: delen zonder server; de server ziet niets. | Excalidraw | Studio | stond al in plan |
| Fijnmazige state, grof tijdens slepen | Tijdens schuiven lage resolutie, bij loslaten de nette vorm; verouderde berekening wordt afgebroken. | tldraw, Canva | Studio | plan aangescherpt |
| Klaar voor vertalen, ook al start de site in het Engels | Teksten als ICU-berichten in JSON; neptaal-test op afgekapte tekst; logische CSS voor rechts-naar-links. | Canva, Discord, Lichess | Fundament | nieuw |
| Meten bij echte bezoekers + één vraag | Cloudflare-cijfers (LCP, INP, CLS) plus 'eerste model klaar' en 'download klaar'; soms 'Voelde dit snel?' 👍/👎 (zonder tracking). | Airbnb, Wikipedia | Beheer | nieuw |
| Stapsgewijs uitrollen per apparaat | Live schakelaars met percentage; nieuwe generators eerst in lab, dan bibliotheek. | Figma, GitHub | Beheer | plan aangescherpt |
| Offline na eerste bezoek (PWA) | Werkbank, WASM en fonts bewaard voor offline gebruik. | Excalidraw, Photopea | Fundament | botst met eerder advies |

## Back-end, veiligheid en beheer
*Bekeken:* Cloudflare, GitHub, Stripe, Shopify, 37signals, Lichess, Wikimedia, Discourse, Mastodon, Ghost, Plausible, Sentry, Supabase, PocketBase, Fly.io, Tailscale, 1Password, Proton, Signal, Let's Encrypt

| Les | Hoe | Van | Hoofdmodule | Status |
|---|---|---|---|---|
| Eén simpele motor, geen microservices | Eén Worker, één database; KV alleen voor schakelaars en cache. | 37signals, PocketBase | Fundament | stond al in plan |
| Noodstop per module; schakelaars zijn onbetrouwbare invoer | Schakelbestand controleren tegen schema; bij fout: laatst goede waarde, nieuwe functie standaard uit. | Cloudflare (storing nov 2025) | Beheer | plan aangescherpt |
| Geleidelijk uitrollen, snel terugdraaien | Cloudflare Gradual Deployments 10% → 100%; terugdraaien in het dashboard; één keer geoefend. | Cloudflare 2019, 37signals | Fundament | nieuw |
| Limieten en misbruikrem | Rate limiting op inloggen, magic link en opslaan; Turnstile; nieuwe accounts lagere limieten; eerst in kijkmodus. | Stripe, Discourse | Account | plan aangescherpt |
| Zo weinig mogelijk bewaren | Geen ruwe IP-adressen, alleen hash met dagzout; alleen e-mail en passkey. | Signal, Plausible, Let's Encrypt | Vertrouwen | stond al in plan |
| Automatisch opruimen | Logs na 30–90 dagen weg; oude linktokens en onbevestigde accounts automatisch verwijderd. | Wikimedia | Account | nieuw |
| Back-up met hersteltest | D1 Time Travel + wekelijkse export naar R2; elk kwartaal een proefherstel. | PocketBase | Fundament | plan aangescherpt |
| Strikte CSP en beveiligingsheaders | Geen inline scripts; alleen 'wasm-unsafe-eval' voor WASM; frame-ancestors none. | Discourse | Fundament | plan aangescherpt |
| Meldpunt voor lekken | /.well-known/security.txt en SECURITY.md met scope; GitHub private reporting aan; eerst bedanken in een Hall of Fame. | RFC 9116, Ghost, Mastodon | Vertrouwen | nieuw |
| Statuspagina buiten de eigen site + nabesprekingen | Statuspagina elders gehost; na elke storing een korte nabespreking zonder schuldvraag. | Cloudflare, GitHub, Wikimedia, Fly | Vertrouwen | nieuw |
| Test dat elke vraag aan de database op de gebruiker filtert | CI-check: data van gebruiker A is nooit zichtbaar voor B (belangrijk bij AI-gebouwde code). | Supabase | Account | nieuw |

## UI, UX en designsysteem
*Bekeken:* Material 3, Apple HIG, Shopify Polaris, GOV.UK, IBM Carbon, Atlassian, GitHub Primer, Mailchimp, Duolingo, Headspace, Airbnb, Stripe, Linear, Arc, Notion, Figma, Canva, Raycast, Teenage Engineering, Nintendo/LEGO

| Les | Hoe | Van | Hoofdmodule | Status |
|---|---|---|---|---|
| Generators bouwen géén eigen scherm | Een generator levert alleen een parameterschema; de werkbank maakt het formulier met de gedeelde onderdelen; CI weigert eigen CSS. | Raycast, Shopify | Studio | plan aangescherpt |
| Designsysteem 'Tinkpop Kit' met drie lagen kleuren | Palet → rollen → onderdelen; alleen rollen gebruiken; licht, donker, hoog contrast en 'rustig'; kleuren uit 3 waarden in OKLCH. | Material 3, Primer, Linear | Fundament | nieuw |
| Nooit een leeg begin | Werkbank opent met een ingevuld voorbeeld dat al draait; catalogus begint met 'Wat wil je maken?'. | Canva, Notion | Studio | stond al in plan |
| Foutteksten in GOV.UK-stijl + foutoverzicht bij batches | 'Enter a name of 12 characters or less'; '3 names need a fix' bovenaan, met links naar de namen. | GOV.UK | Studio | nieuw |
| Speels bij succes, duidelijk bij fouten | Grapjes en feest alleen bij model klaar en downloaden; fouten, juridisch en melden zakelijk. | Atlassian, Mailchimp | Fundament | plan aangescherpt |
| Productieve en expressieve beweging scheiden | press/toggle/count ≤ 200 ms (mogen overal); render-pop en burst alleen op grote momenten; generators alleen de kleine. | IBM Carbon, Duolingo | Fundament | plan aangescherpt |
| Samenvatting vóór downloaden | '12 keychains · 2 colours · ~38 g · ~1 h 20 min · fits A1 mini' met per regel 'Change'. | GOV.UK | Print | plan aangescherpt |
| Mobiel: voorbeeld boven, sheet met twee standen | Sheet met greep (half/vol), vaste downloadbalk die nooit focus verbergt. | Apple HIG, Material 3 | Studio | stond al in plan |
| Rijpheidslabel per generator | Experimental → Beta → Stable met checklist (toegankelijk, printtest, juridisch); 'Stable' = 'printbaar getest'. | Primer, Polaris | Bibliotheek | plan aangescherpt |
| Gezinsveilig | Geen echte namen of foto's van kinderen in de community; geluid uit; geen laadrondjes. | LEGO, Nintendo | Community | plan aangescherpt |

## Groei, SEO en vertrouwen
*Bekeken:* Canva, Zapier, Wise, Notion, Figma Community, Product Hunt, Reddit, Discord, Printables, MakerWorld, Etsy, Pinterest, Wordle, Duolingo, Lichess, Wikipedia, Open Collective, Mozilla, DuckDuckGo, Hacker News

| Les | Hoe | Van | Hoofdmodule | Status |
|---|---|---|---|---|
| Generator = landingspagina | Eigen URL, kop in kopertaal ('Custom name sign 3D print'), generator boven de vouw, echte printfoto's, tips. | Canva | Groei | stond al in plan |
| Veel pagina's alleen met echte waarde | Gelegenheidspagina's alleen met eigen preset, foto en tips; geen pagina's per naam of stad (Google: scaled content abuse). | Zapier, Google-richtlijnen | Groei | plan aangescherpt |
| Cloudflare: AI-zoekbots niet blokkeren | Sinds juli 2025 blokkeert Cloudflare AI-bots standaard op nieuwe domeinen. Zoekbots (Google, Bing, OAI-SearchBot, Claude-SearchBot, Perplexity) toestaan; trainingsbots: jouw keuze. | Cloudflare | Groei | nieuw |
| Deelkaartje zoals Wordle | Per ontwerp een deelplaatje met render (zonder vrije tekst voor privacy) en 'Make your own'. | Wordle, Duolingo | Groei | plan aangescherpt |
| Schema.org eerlijk, geen nep-sterren | WebApplication met prijs 0, Organization, Breadcrumb; FAQ/HowTo leveren geen rich results meer. | Google | Groei | nieuw |
| Technische basis | Sitemap met juiste lastmod, IndexNow aan, Search Console en Bing Webmaster. | Google, Cloudflare | Groei | nieuw |
| Donatie concreet en ná de download | '€3 = één nieuwe generator testen'; supporters krijgen hetzelfde plus een badge; nooit valse urgentie. | Lichess, Wikipedia-les | Vertrouwen | plan aangescherpt |
| Lancering per community, zelf aanwezig | Show HN, Product Hunt, Reddit (regels per sub lezen), één per dag; nooit om stemmen vragen. | HN, Product Hunt, Reddit | Groei | nieuw |
| Gelegenheden 6–8 weken vooruit | Cadeaulijstjes beginnen in oktober; Pinterest-borden per gelegenheid. | Pinterest | Groei | plan aangescherpt |

## Open source en werkwijze
*Bekeken:* VS Code, Home Assistant, Grafana, Backstage, Strapi, Directus, Payload, Medusa, Saleor, Odoo, Drupal, Moodle, Godot, Blender, Obsidian, Penpot, Excalidraw, Cal.com, Supabase, PostHog

| Les | Hoe | Van | Hoofdmodule | Status |
|---|---|---|---|---|
| AGENTS.md als hoofdbron, CLAUDE.md importeert | Eén kort, handgeschreven regelbestand voor alle AI's (Codex en Gemini lezen AGENTS.md); CLAUDE.md = @AGENTS.md + Claude-specifiek. | agents.md, Home Assistant, Supabase | Fundament | nieuw |
| Harde regels in controles, niet alleen in tekst | Geen deploy/DNS, geen geheimen, alleen toegestane licenties: afdwingen met hooks en CI. | Claude Code best practices, Grafana | Vertrouwen | nieuw |
| Kaartjes-controleur zoals hassfest | JSON Schema voor elk kaartje; CI faalt bij ontbrekend juridisch blok, licentie, eigenaar of rechten met reden. | Home Assistant, Blender, Directus | Fundament | plan aangescherpt |
| Kwaliteitsladder per generator | quality.yaml met done/todo/exempt; 'brons' is ondergrens om live te gaan. | Home Assistant | Bibliotheek | stond al in plan |
| Vaste testmodellen (golden tests) | Vaste invoer → vaste maten, volume en aantal delen; controles op dicht model en overhang. | Excalidraw, Home Assistant | Print | stond al in plan |
| Harde grenzen tussen modules | Modules praten alleen via contracten in core; lint blokkeert importeren van andermans binnenkant. | Medusa, VS Code | Fundament | nieuw |
| Kleine PR's met harde grens | ± 400 regels, één doel; PR-sjabloon met vaste vakken (wat/waarom, juridisch, risico's, render, proeflink). | Cal.com, PostHog | Fundament | plan aangescherpt |
| Wijzigingsnotitie in gewone taal + release-PR | Per PR een changeset; release-please bundelt tot een changelog; samenvoegen van de release-PR = jouw akkoord voor live. | Backstage | Beheer | nieuw |
| Tweede review door een andere AI | Elke PR beoordeeld door een tweede model of sessie vóór jij kijkt. | Backstage, Claude-docs | Fundament | nieuw |
| Eén commando maakt een nieuwe generator aan | npm run nieuw -- generator naam: map, kaartje, tests en testmodellen klaar. | Cal.com, PostHog | Bibliotheek | nieuw |
| Uitfaseren met beleid | Markeren, waarschuwen, minstens één release laten staan, dan verwijderen, met migratie. | Drupal, Moodle | Fundament | stond al in plan |

## Beveiligingsbasis vóór de lancering
- [ ] HTTPS en HSTS; CSP, X-Content-Type-Options, Referrer-Policy en frame-ancestors gezet en getest
- [ ] /admin achter Cloudflare Access met passkey; sleutel-2FA op GitHub, Cloudflare en npm
- [ ] Limieten op inloggen, magic link en opslaan; Turnstile op magic link
- [ ] Linktokens eenmalig, ± 15 minuten geldig, als hash opgeslagen
- [ ] Geen geheimen in de repo; push protection aan; geheimen via wrangler secret
- [ ] Lockfile, npm ci, Dependabot, Actions vastgezet op commit
- [ ] D1 Time Travel aan, export naar R2, één keer proefhersteld
- [ ] Noodstop per module werkt; een kapotte schakelaar zet uit, niet aan
- [ ] Terugdraaien één keer geoefend
- [ ] Geen ruwe IP-adressen; bewaartermijnen automatisch; exporteren en account verwijderen kan
- [ ] security.txt en SECURITY.md
- [ ] Statuspagina buiten de eigen site; sjabloon voor nabesprekingen
- [ ] Alarm bij kosten en foutpieken naar de eigenaar

## Checklist lanceerweek
- [ ] Cloudflare AI-bots nagelopen: zoekbots toegestaan
- [ ] Search Console en Bing Webmaster, sitemap ingediend, IndexNow aan
- [ ] Elke generatorpagina: unieke titel, beschrijving, canonical, deelplaatje, schema getest
- [ ] Deellink getest in Facebook-, X- en WhatsApp-voorbeelden
- [ ] Lighthouse mobiel; 3D blokkeert de eerste weergave niet
- [ ] @tink_pop: 3–5 korte video's typen → render → printen
- [ ] Show HN, Product Hunt, Reddit: één per dag, zelf aanwezig, nooit om stemmen vragen

## Botst met eerder advies
- Offline (PWA): eerdere audit zei 'geen PWA in fase 1' (oude versies blijven hangen). Voorstel: later, fase 2 (V-033).

## Belangrijke bronnen
Google spam policies en helpful content; Cloudflare managed robots.txt en AI-crawlers (standaard geblokkeerd sinds 1-7-2025); Cloudflare-storing 18-11-2025; RFC 9116 (security.txt); GOV.UK Design System; Material 3; GitHub Primer; Linear UI-redesign; agents.md; Claude Code memory/best practices; ETH Zürich 2026 over contextbestanden. Volledige lijsten in de onderzoeksrapporten van 29-10-2026.
