# Roadmap

Eén lijst met wat er nog moet. Antwoorden komen uit het Beslisbord (overzicht-artifact, collectie `antwoorden`). Besluiten staan in `docs/4-besluiten/besluiten.md`. Open vragen voor de eigenaar staan óók op het
**Beslisbord** (tab in het overzicht-artifact, zie `docs/README.md`), met hetzelfde nummer (V-xxx).
Spelregel: alles wat hier af is, gaat eruit (het besluit staat dan in `docs/4-besluiten/besluiten.md`).

## Nu
**Volgende stap: PR #1 samenvoegen, daarna fase 0 (proefweek).** V-001 is goedgekeurd (B-035). Tempo: rustig aan, eerst alles af (B-013). 33 vragen beantwoord op 29-10; nog open: V-034, V-035.

## Fase 0 is een experiment
Fase 0 test A-01 t/m A-03 (zie `2-plan/grill.md` §C). A-04 (willen mensen het) wordt gemeten tijdens de stille lancering (B-142). Slaagt een aanname niet, dan eerst oplossen vóór fase 1.

## Open vragen voor de eigenaar
| Nr | Vraag | Advies | Blokkeert |
|---|---|---|---|
| V-034 | Welke clicker bedoelde je? Link graag | link | toestemmingsbrief |
| V-035 | Hoe wil je de URL-structuur anders? | voorstel houden | pagina's, deel-links |

## Taken eigenaar
- [ ] Ontwerper zoeken die het logo natekent als SVG (B-085).
(Ook op het Beslisbord als T-01 t/m T-08.)
- [ ] PR #1 samenvoegen (alleen documenten).
- [ ] Merk Tinkpop/Pinkpop uitzoeken (B-073), vóór de aankondiging.
- [ ] Clicker-maker om schriftelijke toestemming vragen (B-074); brief staat in `docs/pages/mag-het.html`.
- [ ] Voorwaarden van MakerWorld openen en schermafdruk in `docs/3-juridisch/voorwaarden/` (automatisch openen gaf 403).
- [ ] tinkpop.app en tinkpop.org vastleggen (nu nog vrij).
- [ ] Beschrijven hoe 3d-prints.bouwhoek.app nu werkt (site vraagt om inlog).
- [ ] Sparren met GPT en Gemini (tab Reflecties in het overzicht), dan "reflecties klaar" zeggen.
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
