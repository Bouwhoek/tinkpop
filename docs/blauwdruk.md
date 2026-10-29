# Blauwdruk: het beste van 50 sites (29-10-2026)

Aanvulling op `bible.md`. Vijf onderzoeken, elk 10 sites:
1. **3D-modelplatforms**: MakerWorld (+MakerLab/PMM), Printables, Thingiverse, Thangs, Cults3D, MyMiniFactory, Sketchfab, Shapeways, Tinkercad, Creality Cloud/Nexprint.
2. **Browsergenerators**: keychaingenerator.tech, Tagify3D, Open Keychain, 3D Tag Maker, PrintPal, Bekuto3D, OpenSCAD Playground, Gridfinity (Perplexing Labs), boxes.py/MakerCase, ItsLitho.
3. **Personaliseren/templates**: Canva, Kittl, Figma Community, Cricut Design Space, Zazzle, Etsy, Printful/Printify, Placeit, CustomInk, Glowforge/xTool Atomm.
4. **Plugin-ecosystemen**: VS Code, Obsidian, WordPress.org, Home Assistant/HACS, Shopify, Figma plugins, Raycast, Grafana, Backstage, Homebrew (+ Strapi/Payload, Discourse/Ghost).
5. **Creatieve communities**: Scratch, p5.js/OpenProcessing, Shadertoy, CodePen, Observable, Hugging Face Spaces, Instructables, Hackaday/Hackster, Product Hunt, Wikipedia/Commons.

Kernles: **MakerWorld heeft al bijna wat Tinkpop wil** (`.scad` + Customize-knop + 3MF met kleur). Tinkpop wint alleen met
(1) echt open, (2) rekenen in de browser (snel, mobiel, gratis), (3) automatisch getest en eerlijk beoordeeld, (4) modulair, (5) de beste generator-UX.

Status per punt: wacht op goedkeuring van de eigenaar in het artifact (tab "Goedkeuren"). Advies: ✔ = goedkeuren, ◷ = later, ✕ = niet.

## A. Generatorpagina
| # | Punt | Van | Fase | Advies |
|---|---|---|---|---|
| A1 | Mobiel: voorbeeld vast bovenaan (±40%), instellingen in uitklapblokken, vaste downloadbalk onderaan | keychaingenerator | 1 | ✔ |
| A2 | Voorbeeldengalerij als eerste blok (6–9 kaarten); getypte naam blijft staan | Tagify3D, Open Keychain | 1 | ✔ |
| A3 | Printfeiten-kaart: maat, dikte, kleuren, gram, tijd, kosten in €, past op plaat ✓/✗, "klaar om te printen" | Open Keychain, PrintPal, Gridfinity | 1 | ✔ |
| A4 | Live rekenen; vorig model blijft staan met "rekenen…" | (tegenovergestelde van Gridfinity) | 1 | ✔ |
| A5 | Simpel/Pro: simpel met woorden (klein/normaal/groot), Pro met exacte mm | Open Keychain | 1 | vraag (botst met "alles direct zichtbaar") |
| A6 | Hele ontwerp in de link + QR-code | OpenSCAD Playground, boxes.py | 1 | ✔ |
| A7 | Kleur per onderdeel = één AMS-slot; melding "echte kleur hangt af van je filament" | keychaingenerator, 3D Tag Maker | 1 | ✔ |
| A8 | Export: 3MF met kleuren standaard; STL los of per kleur (ZIP); .scad voor remixers | Open Keychain, PrintPal | 1 | ✔ |
| A9 | Printtip naast de optie die hem nodig heeft (bv. "print op de voorkant") | Tagify3D, PrintPal | 1 | ✔ |
| A10 | Willekeurig-knop + ongedaan maken (Ctrl+Z, 20 stappen); nergens gezien = kans | eigen | 1 | ✔ |
| A11 | "Even nalopen"-lijst vóór download (waarschuwingen, alleen kapot blokkeert) | Zazzle | 1 | ✔ |
| A12 | Lege staat voor logo/SVG: slepen, plakken of "probeer voorbeeld" | Bekuto3D | 1 | ✔ |
| A13 | Live afmeting bovenaan, mm standaard, mm/inch-knop | keychaingenerator | 1 | ✔ |
| A14 | Punt op i/j vervangen door icoon (hartje, ster, pootje) | Tagify3D | 1 | ✔ |
| A15 | Downloaden zonder account; inloggen voor bewaren, remixen, indienen | Canva, Tinkercad, Printables | 1 | vraag (je koos "inloggen vanaf het begin") |
| A16 | Eén vraag bij eerste bezoek: "Wat wil je maken?" | Canva | 2 | ◷ |

## B. Ontdekken
| # | Punt | Van | Fase | Advies |
|---|---|---|---|---|
| B1 | Kaarten met "1.240× gemaakt", zoeken op naam/tag/@maker, filter per printer | Figma Community, Thangs | 2 | ✔ |
| B2 | Collecties ("bewaar in collectie") | Printables, OpenProcessing | 3 | ◷ |
| B3 | Pick van de week (handmatig) + bericht aan de maker | CodePen, Hugging Face, Shadertoy | 2 | ✔ |
| B4 | Maandelijkse challenge met thema en badge | CodePen, Printables, Instructables | 3 | ✔ |
| B5 | Makes: foto's van echte prints met printer en filament | Printables, MakerWorld | 4 | ◷ |
| B6 | Stempel "printbaar getest" | MyMiniFactory | 1 | ✔ |

## C. Community en credit
| # | Punt | Van | Fase | Advies |
|---|---|---|---|---|
| C1 | Remix met één klik, "gebaseerd op X door Y", remixketen bewaren | Scratch, Figma, Thingiverse | 3 | ✔ |
| C2 | Vrij bedankveld naast de automatische credit | onderzoek Scratch | 3 | ✔ |
| C3 | Makerprofiel met openbare cijfers + eigen doneerlink | Kittl, Figma | 2 | ✔ |
| C4 | Vriendelijke eerste review; automatische checks eerst als waarschuwing | Wikipedia-onderzoek | 2 | ✔ |
| C5 | Openbare regels; altijd een reden bij afwijzen | les MakerWorld/Cults3D | 2 | ✔ |
| C6 | AI-vinkje bij indienen | MakerWorld, Thingiverse | 2 | ✔ |
| C7 | MakerWorld-compatibele `.scad` (`// font`, `// color`, `mw_plate_N`) | MakerWorld PMM | 2 | ✔ |
| C8 | Printadvies als tekst (fase 1); printprofiel in 3MF pas na slicertests | MakerWorld, Printables | 1/3 | ✔ |
| C9 | Partners geven filament in plaats van geld | Hackster | 5 | ◷ |

## D. Modulesysteem en bord
| # | Punt | Van | Fase | Advies |
|---|---|---|---|---|
| D1 | Strikt kaartje (manifest) met schemacheck in CI | VS Code, Obsidian | 1 | ✔ |
| D2 | Alles standaard uit; één `enabled` per module | Backstage, Discourse | 1 | ✔ |
| D3 | Noodknop: blokkeerlijst + "veilige stand" (alles uit behalve kern) | VS Code, Discourse | 1 | ✔ |
| D4 | Render-test in CI met standaard- en randwaarden, plaatje in de PR | Homebrew | 2 | ✔ |
| D5 | Kwaliteitslijst per generator (gedaan/te doen/uitzondering) + badge | Home Assistant | 2 | ✔ |
| D6 | Vertrouwensniveaus: kern / gecontroleerd / experimenteel | Grafana, VS Code | 2 | ✔ |
| D7 | Contractversie: past een module niet, dan laadt hij niet | VS Code, Obsidian | 1 | ✔ |
| D8 | Uitfaseren met datum, reden en opvolger | Homebrew | 2 | ✔ |
| D9 | Vaste plekken (slots) waar modules mogen verschijnen | Shopify, Backstage | 1 | ✔ |
| D10 | CODEOWNERS + changelog per module | Home Assistant, Raycast | 1 | ✔ |
| D11 | "Eenrichtingsdeur" markeren (kan niet terug, zware bevestiging) | Ghost | 3 | ✔ |
| D12 | **Bord-flow**: bestaande module aan/uit = live in ±1 min, met logboek en ongedaan maken; nieuwe code = voorstel + proeflink | VS Code, Discourse, Cloudflare KV | 2 | ✔ (lost "klik = live" én "eerst proeflink" op) |
| D13 | Nederlandse AI-samenvatting bij elk voorstel: wat doet het, risico, licentie | eigen | 1 | ✔ |

## E. Not Made Yet (stemmen)
| E1 | Stemmen = signaal, jury beslist met openbare reden; gewogen stemmen (nieuwe accounts tellen niet), 10 stemmen per maand, één idee per persoon, telling verborgen tot einde, Turnstile | Product Hunt, Hackaday, Hackster, Wikipedia | 3 | ✔ |

## F. Vindbaarheid en groei
| # | Punt | Van | Fase | Advies |
|---|---|---|---|---|
| F1 | Pagina per generator: tool boven, daaronder uitleg, printinstellingen, FAQ; llms.txt | PrintPal, Open Keychain | 1 | ✔ |
| F2 | Generators ook op MakerWorld met link naar Tinkpop | (besluit eigenaar) | 2 | ✔ |
| F3 | Insluitcode voor makers' eigen sites | Sketchfab | 3 | ◷ |
| F4 | Vertaalde nette URL's | Cults3D | 3 | ◷ |

## G. Eerlijk en betrouwbaar
| # | Punt | Van | Fase | Advies |
|---|---|---|---|---|
| G1 | Belofte: nooit iets gratis afpakken, geen watermerk, geen betaalmuur, downloads blijven van jou | lessen Cricut, Placeit, Glowforge | 1 | ✔ |
| G2 | Alles exporteerbaar; open repo als vangnet als de site verdwijnt | lessen Shapeways, Sketchfab | 1 | ✔ |
| G3 | Handhaving per account + limieten | Thingiverse | 4 | ◷ |

## H. Eigen ideeën (nergens zo gezien)
| # | Punt | Waarom | Fase | Advies |
|---|---|---|---|---|
| H1 | **Plaat vullen**: zoveel stuks als passen op je printplaat (A1 mini, A1, P1, X1) in één 3MF | Bambu-gebruikers printen in series | 2 | ✔ |
| H2 | **Batch**: 25 namen tegelijk (lijst plakken) — gratis (Open Keychain vraagt geld) | Scholen, clubs, feesten | 2 | ✔ |
| H3 | **Klasmodus**: docent maakt een link; leerlingen maken zonder account | Doelgroep scholen; geen 16+-login nodig | 3 | ✔ |
| H4 | **Kosten per stuk in €** met eigen filamentprijs | Clicker-wens: filamentkosten | 1 | ✔ |
| H5 | **Community-ijking**: na printen echte tijd/gram invullen → betere schattingen | Schattingen worden steeds beter | 4 | ◷ |
| H6 | **Printbevestiging met één foto** door de community → "printbaar getest" schaalt | Eigenaar hoeft niet alles zelf te printen | 4 | ◷ |
| H7 | **Openbaar wijzigingslogboek + statuspagina** | Vertrouwen, kost bijna niets | 1 | ✔ |
| H8 | **Privacybelofte zichtbaar** ("je naam verlaat je browser niet") | Onderscheidend t.o.v. MakerWorld (rekent op server) | 1 | ✔ |
| H9 | **Van MakerWorld naar Tinkpop in één stap**: plak een .scad, krijg het kaartje en een PR | Makkelijkste instap voor ontwerpers | 2 | ✔ |
| H10 | **NotMadeYet-brug**: winnend idee → generator, stemmers krijgen credit | Koppelt beide projecten | 3 | ✔ |

## Bronnen
Zie de onderzoeksrapporten (samengevat in `audit-2026-10-29.md` en `audit-breed-2026-10-29.md`). Belangrijkste: makerhacks.com/openscad-makerworld-customizer,
help.prusa3d.com (Prusameters, Clubs), wiki.bambulab.com (print profiles, AI policy), developers.raycast.com, contributors.home-assistant.io/core/quality-scale,
docs.brew.sh/Deprecating-Disabling-and-Removing, code.visualstudio.com/docs/configure/extensions/extension-runtime-security, backstage.io/docs/plugins/feature-flags,
developers.cloudflare.com/kv/concepts/how-kv-works, producthunt.com/p/producthunt/vote-selling-on-product-hunt, hackaday.com (community voting 2015),
arxiv.org/abs/1507.01285 (credit op Scratch), stuartgeiger.com/papers/abs-rise-and-decline-wikipedia.pdf.
