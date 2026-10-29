# Tinkpop docs: begin hier

**Status (29-10-2026):** nog geen code. Plan klaar; volgende stap: PR #1 samenvoegen, daarna fase 0 (proefweek).
**Open vragen:** `docs/4-besluiten/roadmap.md` (V-nummers) en het overzicht-artifact (tab Beslisbord).
**Alles op één pagina:** https://claude.ai/artifact/SvncP5H8edGJj65ZqECMdU (kopie: `docs/pages/overzicht.html`).

## Indeling
| Map | Wat | Belangrijkste bestanden |
|---|---|---|
| `1-product/` | wat we maken en voor wie | `brief.md`, `markt.md`, `naam.md`, `gevoel.md` |
| `2-plan/` | hoe we het bouwen | `bible.md` (architectuur), `modules.md` (indeling en codes), `blauwdruk.md` (best practices), `hergebruik.md` (open source) |
| `3-juridisch/` | mag het, en wat kan misgaan | `juridisch.md`, `risicos.md`, `voorwaarden/` (schermafdrukken) |
| `4-besluiten/` | wat besloten is en wat nog open staat | `besluiten.md` (B-nummers), `roadmap.md` (V-nummers, taken, fasen) |
| `brand/` | logo, merk, pop-taal | `pop.md`, `pop-prototype.js` |
| `pages/` | kopieën van de klikbare pagina's | `overzicht.html` e.a. |
| `templates/` | sjablonen | `module.md` |
| `archief/` | oude audits, alleen naslag | |

## Spelregels voor documenten
- **Eén onderwerp = één plek.** Besluiten alleen in `besluiten.md`, open punten alleen in `roadmap.md`, modules alleen in `modules.md`, fasen alleen in `roadmap.md`. Andere documenten verwijzen ernaar.
- **Nummers veranderen nooit.** B-xxx (besluit), V-xxx (vraag), risico-ID's (J1, T1, …), modulecodes (`print/plate-fill`).
- **Wijziging = nieuw nummer**; het oude besluit gaat naar "Vervallen" met verwijzing.
- **Af = weg uit de roadmap**, het besluit staat dan in het register.
- Na elke sessie: status hierboven en in `CLAUDE.md` bijwerken.
