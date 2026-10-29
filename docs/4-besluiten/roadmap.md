# Roadmap

Eén lijst met wat er nog moet. Antwoorden komen uit het Beslisbord (overzicht-artifact, collectie `antwoorden`). Besluiten staan in `docs/4-besluiten/besluiten.md`. Open vragen voor de eigenaar staan óók op het
**Beslisbord** (tab in het overzicht-artifact, zie `docs/README.md`), met hetzelfde nummer (V-xxx).
Spelregel: alles wat hier af is, gaat eruit (het besluit staat dan in `docs/4-besluiten/besluiten.md`).

## Nu
**Volgende stap: PR #1 samenvoegen, daarna fase 0 volgens het MVP-contract (`2-plan/mvp.md`), te beginnen met het 3MF-bewijs (B-145).** Tempo: rustig aan, eerst alles af (B-013). Ronde 3 (GPT, Gemini, Claude) verwerkt en alle vragen beantwoord op 29-10 (B-147 t/m B-155). Richting: eerst de beste generator (B-149).

## Fase 0 is een experiment
Fase 0 test A-01 t/m A-03 (zie `2-plan/grill.md` §C) met de harde lat uit `2-plan/mvp.md` (M-1 t/m M-8). A-04 (willen mensen het) wordt gemeten tijdens de stille lancering (B-142). Slaagt een aanname niet, dan eerst oplossen vóór fase 1.

## Open vragen voor de eigenaar
| Nr | Vraag | Advies | Blokkeert |
|---|---|---|---|
| — | Geen open vragen | | |

## Taken eigenaar
- [ ] Ontwerper zoeken die het logo natekent als SVG (B-085).
(Ook op het Beslisbord als T-01 t/m T-08.)
- [ ] PR #1 samenvoegen (alleen documenten).
- [ ] Merk Tinkpop/Pinkpop uitzoeken (B-073), vóór de aankondiging.
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
- [ ] Fase 1 bevriezen op een korte lijst (blauwdruk I14), volgens B-149.
- [ ] Clicker: eigen ontwerp uitwerken vanuit algemene onderdelen, proces gedateerd (B-147), fase 2.
- [ ] three-3mf-exporter nalopen op overlap met AGPL-code van Bambu Studio, vóór hergebruik.
- [ ] Na PR #1: script voor 5 test-3MF's (eerste stap fase 0, B-145) en de 3MF-matrix invullen met de eigenaar.
- [ ] Vaste testset van 20 namen in de repo zetten, met verwacht resultaat (`2-plan/mvp.md`).
- [ ] Slicer-check in CI (Bambu Studio / OrcaSlicer CLI, alleen als tool).

## Fasen
Eén definitie, gebruikt in alle documenten:
| Fase | Wat |
|---|---|
| 0 · proefweek | MVP-contract (`2-plan/mvp.md`): 25 namen → één plaat A1 mini, 3 fonts, 2 kleuren, 3MF + STL, proeflink; eerst 3MF-bewijs; klaar bij M-1 t/m M-8 |
| 1 · lancering | Sleutelhanger met alles erop en eraan, plaat vullen, batch, meldknop, veiligheidsregel bij download; geen inloggen (B-149); 2 weken stil live, dan aankondigen; meten (B-150) |
| 2 · beheer & groei | Inloggen met AVG-pakket (als fase 1 slaagt), modulebord, live schakelaars, clicker, catalogus, gelegenheden |
| 3 · community | OpenSCAD-spoor, meebouwen (na 3 maanden live), profielen, remix, picks |
| 4 · uitbreiden | Makes-foto's, Nederlands, Open in Bambu Studio |
| 5 · lab | AI, klasmodus, NotMadeYet-brug: alleen als het gedragen wordt |

## Niet doen (bewust)
Zie `2-plan/grill.md` §D: geen eigen login/database-server/analytics bouwen, geen verkoop, advertenties of trackers, geen community vóór 3 maanden live, geen AI tot donaties het dragen, geen Nederlandse versie in fase 1, geen app.

## Later / ideeën (nog niet gepland)
- Sleutelhanger-varianten later: scharnierende naam, spinner, flesopener, AirTag-houder, NFC-houder, QR, lithofaan, keycap, braille, glow-in-the-dark, koppelbare letters.
- AI: tekst/foto → 3D, daglimiet, pas als donaties het dragen.
- NotMadeYet: blijft apart (B-052); notmadeyet.com niet opzeggen; later eventueel een eigen plek op de site.
