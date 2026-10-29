# Roadmap

Eén lijst met wat er nog moet. Besluiten staan in `docs/4-besluiten/besluiten.md`. Open vragen voor de eigenaar staan óók op het
**Beslisbord** (https://claude.ai/artifact/… zie `docs/README.md`), met hetzelfde nummer (V-xxx).
Spelregel: alles wat hier af is, gaat eruit (het besluit staat dan in `docs/4-besluiten/besluiten.md`).

## Nu
**Volgende stap: PR #1 samenvoegen, daarna fase 0 (proefweek).** Fase 0 start pas na V-001 (indeling) en de clicker-route hoeft daarvoor niet.

## Fase 0 is een experiment
Fase 0 test vier aannames (A-01 t/m A-04, zie `2-plan/grill.md` §C). Slaagt een aanname niet, dan eerst oplossen vóór fase 1.

## Open vragen voor de eigenaar
| Nr | Vraag | Advies | Blokkeert |
|---|---|---|---|
| V-001 | Indeling in tien hoofdmodules akkoord? (`2-plan/modules.md`) | ja | mappen in de code |
| V-002 | Welke route voor de clicker? | eigen ontwerp met standaardonderdelen | fase 2 |
| V-003 | Welke clicker was het op de foto? | link geven | licentiecheck |
| V-004 | Waarmee maken we de eerste indruk? | hele plaat met namen | homepage |
| V-005 | Tempo i.v.m. KeychainGEN | fase 0 nu starten | – |
| V-006 | Meldknop en contactpunt al in fase 1? | ja | lancering |
| V-007 | Hoe testen we op een iPhone? | iPhone lenen | fase 0 |
| V-008 | Waarschuwing "Not a toy" bij elke download? | ja | lancering |
| V-009 | Verkoop helemaal buiten Tinkpop houden? | ja | juridisch |
| V-010 | Welke merkbelofte? | "Type it. Tink it. Print it. Free forever, no ads, no account needed." | homepage |
| V-011 | Hoe uitbundig mag de pop zijn? | zoals de speeltuin | – |
| V-012 | Plop-geluid? | standaard uit, knop om aan te zetten | – |
| V-013 | Druppeltjes bij wegploppen? | ja | – |
| V-014 | Codelicentie MIT of AGPL? | AGPL | LICENSE-bestand |
| V-015 | Kosten en donaties openbaar? | ja | – |
| V-016 | Eerste gelegenheid? | Sinterklaas en Kerst | fase 2 |
| V-017 | Zelf vertellen op r/BambuLab? | ja, na stille lancering | – |
| V-018 | Hoe linken vanaf MakerWorld? | alleen in de modelbeschrijving, eerst proef | fase 3 |
| V-019 | Twemoji-vermelding ook in het bestand? | ja | fase 1 |
| V-021 | Contactadres hello@tinkpop.com via Cloudflare Email Routing (gratis)? | ja | meldknop, privacy |
| V-022 | URL-structuur zoals voorgesteld (`2-plan/grill.md` §E8)? | ja | pagina's, deel-links |
| V-023 | Logo laten natekenen als SVG (of Claude maakt een voorstel)? | Claude maakt eerst een voorstel | site |
| V-024 | Plaat vullen + batch al minimaal in fase 0? | ja | fase 0 |
| V-025 | Proeflink van fase 0 delen met 5–10 mensen uit eigen kring? | ja | aanname A-04 |
| V-020 | Inlogmails via Resend (gratis, 100/dag) of Cloudflare ($5/mnd)? | Resend achter eigen `sendMail()` | fase 1 |

## Taken eigenaar
- [ ] Merk Tinkpop/Pinkpop uitzoeken (B-073), vóór de aankondiging.
- [ ] Clicker-maker om schriftelijke toestemming vragen (B-074); brief staat in `docs/pages/mag-het.html`.
- [ ] Voorwaarden van MakerWorld openen en schermafdruk in `docs/3-juridisch/voorwaarden/` (automatisch openen gaf 403).
- [ ] tinkpop.app en tinkpop.org vastleggen (nu nog vrij).
- [ ] Beschrijven hoe 3d-prints.bouwhoek.app nu werkt (site vraagt om inlog).
- [ ] Sparren: Gemini → GPT in het overzicht (B-047), dan "reflecties klaar" zeggen.
- [ ] GitHub-repo `Bouwhoek/mwbl` archiveren (instellingen → Archive), werknaam, niet meer in gebruik.

## Taken Claude
- [ ] Plaatmaten van Bambu-printers nalopen (A1 mini, A1, P1, X1, H2D) voor plaat vullen.
- [ ] Risicoregister: elke regel een hoofdmodule geven.
- [ ] Logo-voorstel als SVG (na V-023).
- [ ] Fase 1 bevriezen op een korte lijst (blauwdruk I14), na V-001.
- [ ] three-3mf-exporter nalopen op overlap met AGPL-code van Bambu Studio, vóór hergebruik.
- [ ] Reflecties van Gemini en GPT verwerken (ronde 3).

## Fasen
Eén definitie, gebruikt in alle documenten:
| Fase | Wat |
|---|---|
| 0 · proefweek | Naam op een plaat, 3 fonts, kleuren-3MF, proeflink; getest op Android, iPhone en in Bambu Studio |
| 1 · lancering | Alles erop en eraan, plaat vullen, batch, inloggen met AVG-pakket, meldknop; 2 weken stil live, dan aankondigen; meten (B-010) |
| 2 · beheer & groei | Modulebord, live schakelaars, clicker, catalogus, gelegenheden |
| 3 · community | OpenSCAD-spoor, meebouwen (na 3 maanden live), profielen, remix, picks |
| 4 · uitbreiden | Makes-foto's, Nederlands, Open in Bambu Studio |
| 5 · lab | AI, klasmodus, NotMadeYet-brug: alleen als het gedragen wordt |

## Niet doen (bewust)
Zie `2-plan/grill.md` §D: geen eigen login/database-server/analytics bouwen, geen verkoop, advertenties of trackers, geen community vóór 3 maanden live, geen AI tot donaties het dragen, geen Nederlandse versie in fase 1, geen app.

## Later / ideeën (nog niet gepland)
- Sleutelhanger-varianten later: scharnierende naam, spinner, flesopener, AirTag-houder, NFC-houder, QR, lithofaan, keycap, braille, glow-in-the-dark, koppelbare letters.
- AI: tekst/foto → 3D, daglimiet, pas als donaties het dragen.
- NotMadeYet: blijft apart (B-052); notmadeyet.com niet opzeggen; later eventueel een eigen plek op de site.
