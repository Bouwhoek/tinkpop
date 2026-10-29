# Roadmap

Eén lijst met wat er nog moet. Antwoorden komen uit het Beslisbord (overzicht-artifact, collectie `antwoorden`). Besluiten staan in `docs/4-besluiten/besluiten.md`. Open vragen voor de eigenaar staan óók op het
**Beslisbord** (tab in het overzicht-artifact, zie `docs/README.md`), met hetzelfde nummer (V-xxx).
Spelregel: alles wat hier af is, gaat eruit (het besluit staat dan in `docs/4-besluiten/besluiten.md`).

## Nu
**Volgende stap: PR #1 samenvoegen, daarna fase 0 volgens het MVP-contract (`2-plan/mvp.md`), te beginnen met het 3MF-bewijs (B-145).** Tempo: rustig aan, eerst alles af (B-013). Ronde 3 (GPT, Gemini, Claude) verwerkt op 29-10; nieuwe vragen V-036 t/m V-043.

## Fase 0 is een experiment
Fase 0 test A-01 t/m A-03 (zie `2-plan/grill.md` §C) met de harde lat uit `2-plan/mvp.md` (M-1 t/m M-8). A-04 (willen mensen het) wordt gemeten tijdens de stille lancering (B-142). Slaagt een aanname niet, dan eerst oplossen vóór fase 1.

## Open vragen voor de eigenaar
| Nr | Vraag | Advies | Blokkeert |
|---|---|---|---|
| V-034 | Welke clicker bedoelde je? Link graag | link | toestemmingsbrief |
| V-035 | Hoe wil je de URL-structuur anders? | voorstel houden | pagina's, deel-links |
| V-036 | Richting: eerst de beste generator, platform pas als makers willen meedoen? | ja, inloggen pas na bewijs | fase 1 bevriezen |
| V-037 | Doorgaan/stoppen-meting aanpassen (B-010)? | ja: % bezoekers met download, tijd tot download, slicer-fouten | meetplan |
| V-038 | Fase 0 laten proberen door 5 mensen die niet meebouwden (B-142)? | ja | einde fase 0 |
| V-039 | Tweede AI-review alleen bij rekenen, export, inloggen en opslag (B-141)? | ja | PR-werkwijze |
| V-040 | Korte veiligheidsregel bij downloaden (B-077)? | ja | downloadscherm |
| V-041 | Twemoji-vermelding ook in de 3MF als er een emoji in zit (B-078)? | ja | emoji (fase 1) |
| V-042 | Herkenbaar als maker in plaats van anoniem (B-055)? | voornaam + "maker uit Nederland" | aankondiging |
| V-043 | Op de open pagina: wat boven de kosten uitkomt is een vergoeding voor je uren? | ja | open-book pagina |

## Taken eigenaar
- [ ] Ontwerper zoeken die het logo natekent als SVG (B-085).
(Ook op het Beslisbord als T-01 t/m T-08.)
- [ ] PR #1 samenvoegen (alleen documenten).
- [ ] Merk Tinkpop/Pinkpop uitzoeken (B-073), vóór de aankondiging.
- [ ] Clicker-maker om schriftelijke toestemming vragen (B-074); brief staat in `docs/pages/mag-het.html`.
- [ ] Voorwaarden van MakerWorld openen en schermafdruk in `docs/3-juridisch/voorwaarden/` (automatisch openen gaf 403).
- [ ] tinkpop.app en tinkpop.org vastleggen (nu nog vrij).
- [ ] Beschrijven hoe 3d-prints.bouwhoek.app nu werkt (site vraagt om inlog).
- [ ] T-09 Nulmeting: 25 namen maken bij KeychainGEN, keychaingenerator.tech en MakerWorld op je telefoon; tijd en tikken noteren (`2-plan/mvp.md`).
- [ ] T-10 Een iPhone kunnen lenen voor de test in fase 0 (M-5).
- [ ] GitHub-repo `Bouwhoek/mwbl` archiveren (instellingen → Archive), werknaam, niet meer in gebruik.

## Taken Claude
- [ ] Na V-029: Cloudflare-instelling AI-bots nalopen samen met de eigenaar (niets wijzigen zonder akkoord).
- [ ] Plaatmaten van Bambu-printers nalopen (A1 mini, A1, P1, X1, H2D) voor plaat vullen.
- [ ] Risicoregister: elke regel een hoofdmodule geven.
- [ ] Pop-taal verder uitwerken in artifacts (pop, geluid, druppels) tot de eigenaar tevreden is (B-015).
- [ ] LICENSE-bestand AGPL-3.0 toevoegen; hergebruiksregels aanpassen (B-075).
- [ ] AGENTS.md hoofdbron maken, CLAUDE.md laten verwijzen (B-048).
- [ ] Harde regels als controles: CI + projectinstellingen voor AI (B-049), bij de opzet van fase 0.
- [ ] Kostenoverzicht opstellen (echte kosten per maand) als basis voor de open pagina (B-062).
- [ ] Fase 1 bevriezen op een korte lijst (blauwdruk I14), na V-001.
- [ ] three-3mf-exporter nalopen op overlap met AGPL-code van Bambu Studio, vóór hergebruik.
- [ ] Na PR #1: script voor 5 test-3MF's (eerste stap fase 0, B-145) en de 3MF-matrix invullen met de eigenaar.
- [ ] Vaste testset van 20 namen in de repo zetten, met verwacht resultaat (`2-plan/mvp.md`).
- [ ] Slicer-check in CI (Bambu Studio / OrcaSlicer CLI, alleen als tool).

## Fasen
Eén definitie, gebruikt in alle documenten:
| Fase | Wat |
|---|---|
| 0 · proefweek | MVP-contract (`2-plan/mvp.md`): 25 namen → één plaat A1 mini, 3 fonts, 2 kleuren, 3MF + STL, proeflink; eerst 3MF-bewijs; klaar bij M-1 t/m M-8 |
| 1 · lancering | (bevriezen na V-036) Alles erop en eraan, plaat vullen, batch, inloggen met AVG-pakket, meldknop; 2 weken stil live, dan aankondigen; meten (B-010) |
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
