# Tinkpop docs: begin hier

**Status (29-10-2026):** fase 0 in aanbouw. Werkbank, rekenmotor en export werken; proefversie (privé): https://claude.ai/artifact/Y7xcdUzVk4Brat51ZSwfaw. Stand: `2-plan/mvp.md`.
**Open vragen:** `docs/4-besluiten/roadmap.md` (V-nummers) en het Beslisbord (eerste tab van het overzicht-artifact). Antwoorden staan in de database van dat artifact (`antwoorden/V-xxx`).
**Alles op één pagina:** https://claude.ai/artifact/SvncP5H8edGJj65ZqECMdU (kopie: `docs/pages/overzicht.html`).
**Siteconcept (9 schermen, alle modules):** https://claude.ai/artifact/2vdQeEW4hbjzPodJegAoe6
**Roadmap visueel:** https://claude.ai/artifact/9NZqKLUAw1kqZdSQCdQDVm (kopie: `docs/pages/roadmap.html`; bron blijft `4-besluiten/roadmap.md`, bij elke wijziging daar ook deze pagina bijwerken).

## Indeling
| Map | Wat | Belangrijkste bestanden |
|---|---|---|
| `1-product/` | wat we maken en voor wie | `brief.md`, `markt.md`, `naam.md`, `gevoel.md` |
| `2-plan/` | hoe we het bouwen | `bible.md` (architectuur), `modules.md` (indeling en codes), `blauwdruk.md` (50 sites), `platforms-100.md` (100 platforms), `hergebruik.md` (open source), `grill.md` (zelfvragen, aannames), `mvp.md` (MVP-contract fase 0, bewijsprotocol), `kosten.md` (kosten en donaties) |
| `3-juridisch/` | mag het, en wat kan misgaan | `juridisch.md`, `risicos.md`, `voorwaarden/` (schermafdrukken) |
| `4-besluiten/` | wat besloten is en wat nog open staat | `besluiten.md` (B-nummers), `roadmap.md` (V-nummers, taken, fasen) |
| `brand/` | logo, merk, pop-taal | `pop.md`, `pop-prototype.js` |
| `pages/` | kopieën van de klikbare pagina's | `overzicht.html`, `roadmap.html` e.a. |
| `templates/` | sjablonen | `module.md` |
| `archief/` | oude audits, alleen naslag | |

## Spelregels voor documenten
- **Eén onderwerp = één plek.** Besluiten alleen in `besluiten.md`, open punten alleen in `roadmap.md`, modules alleen in `modules.md`, fasen alleen in `roadmap.md`. Andere documenten verwijzen ernaar.
- **Nummers veranderen nooit.** B-xxx (besluit), V-xxx (vraag), risico-ID's (J1, T1, …), modulecodes (`print/plate-fill`).
- **Wijziging = nieuw nummer**; het oude besluit gaat naar "Vervallen" met verwijzing.
- **Af = weg uit de roadmap**, het besluit staat dan in het register.
- Na elke sessie: status hierboven en in `CLAUDE.md` bijwerken.

## Woordenlijst
| Woord | Betekenis |
|---|---|
| Generator | Een maakbaar ding met instellingen, bijv. de naamsleutelhanger (`library/name-keychain`) |
| Preset | Een kant-en-klare set instellingen van een generator (bijv. "team") |
| Ontwerp | Wat een bezoeker maakt: generator + versie + instellingen |
| Werkbank | De generatorpagina: formulier, 3D-voorbeeld, download (`studio/workbench`) |
| Plaat vullen | Zoveel stuks als passen op je printplaat in één 3MF (`print/plate-fill`) |
| Batch | Veel namen tegelijk invoeren (`studio/batch`) |
| Hoofdmodule / onderdeel | Indeling van de site, zie `2-plan/modules.md` |
| Kaartje (manifest) | Beschrijving van een onderdeel, met juridisch blok |
| Schakelbord / live schakelaars | `tinkpop.config.json` (bouwtijd) en `flags.json` (live) |
| Proeflink | Testversie van een wijziging, die de eigenaar zelf probeert vóór het samenvoegen |
| Pop-taal | De vaste animaties en geluiden (`brand/pop.md`) |
| B-/V-/A-nummer | Besluit / open vraag / aanname die getest wordt |
