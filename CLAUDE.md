# Tinkpop — open generators voor 3D-print

Website (tinkpop.com) waar bezoekers zelf printklare modellen maken (naambordje, sleutelhanger,
clicker, ...) door tekst en aantallen in te vullen, en STL/3MF downloaden.
Open source, zodat andere ontwerpers generators kunnen toevoegen.

Eigenaar codeert niet en werkt via de chat: leg keuzes uit in gewone taal, in het Nederlands.

## Status
Nog geen code. Fase: plan klaar (bible, blauwdruk goedgekeurd 29-10, juridisch, risico's, gevoel). Volgende stap: fase 1 bevriezen en fase 0 (proefweek) bouwen. Open vragen: zie `docs/roadmap.md`. Docs komen uit de eerdere werkrepo `Bouwhoek/mwbl` (werknaam, niet meer in gebruik).

## Waar staat wat
Begin bij **`docs/README.md`**: indeling in mappen (1-product, 2-plan, 3-juridisch, 4-besluiten, brand, pages, templates, archief) en de spelregels.
- Besluiten: `docs/4-besluiten/besluiten.md` (B-nummers). Open vragen, taken en fasen: `docs/4-besluiten/roadmap.md` (V-nummers).
- Bouwplan: `docs/2-plan/bible.md`; modules en codes: `docs/2-plan/modules.md`; open source: `docs/2-plan/hergebruik.md`.
- Juridisch en risico's: `docs/3-juridisch/`. Merk en pop-taal: `docs/brand/`.
- Alles op één pagina: overzicht-artifact (link in `docs/README.md`).

## Vaste afspraken
- **Eén onderwerp = één plek** (zie `docs/README.md`). Nieuw onderdeel? Begin met `docs/templates/module.md`.
- **Legaal by design** (bible §16): bij élke module, generator of functie eerst het juridische blok invullen, risico's koppelen uit `docs/risicos.md` en in de PR in gewone taal uitleggen wat er juridisch speelt. Twijfel = niet bouwen en eerst melden aan de eigenaar.
- Site in het Engels; docs en overleg in het Nederlands.
- Gebruik "Bambu" niet in de naam van de site (merknaam van Bambu Lab).
- Ontwerpen van anderen alleen opnemen met schriftelijke toestemming en duidelijke licentie per generator.
- Nooit een bestaand model (bestand of foto) aan AI geven om het om te bouwen. Eigen ontwerpen vanuit algemene onderdelen en openbare maten, met het proces gedateerd in de repo (zie `docs/juridisch.md`).
- Geen code uit Bambu Studio of OrcaSlicer overnemen (AGPL).
- Eerst hergebruiken, dan pas bouwen: kijk in `docs/hergebruik.md`. Alleen licenties MIT/ISC/BSD/Apache/Unlicense in de site; GPL alleen als los programma (openscad-wasm); nooit NC of onduidelijke licenties.
- Rode lijnen en dark patterns die we nooit doen staan in `docs/gevoel.md`. Alle animaties via de pop-taal (`docs/brand/pop.md`).
- Domein tinkpop.com staat bij Cloudflare, op naam van de eigenaar. Niets live zetten of DNS wijzigen zonder akkoord van de eigenaar.
