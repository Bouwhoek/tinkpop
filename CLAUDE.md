# Tinkpop — open generators voor 3D-print

Website (tinkpop.com) waar bezoekers zelf printklare modellen maken (naambordje, sleutelhanger,
clicker, ...) door tekst en aantallen in te vullen, en STL/3MF downloaden.
Open source, zodat andere ontwerpers generators kunnen toevoegen.

Eigenaar codeert niet en werkt via de chat: leg keuzes uit in gewone taal, in het Nederlands.

## Status
Nog geen code. Fase: bouwplan (bible v0.3) + blauwdruk klaar; wacht op goedkeuring blauwdruk (76 punten, 14 vragen); daarna fase 1 bevriezen en fase 0 (proef). Docs komen uit de eerdere werkrepo `Bouwhoek/mwbl` (werknaam, niet meer in gebruik).

## Waar staat wat
- `docs/bible.md` — **het bouwplan** (architectuur, modules, contract, fasen); klikbaar: `docs/bible.html`
- `docs/blauwdruk.md` — het beste van 50 sites + eigen ideeën + lanceervoorwaarden, ter goedkeuring; klikbaar: `docs/blauwdruk.html`
- `docs/audit-breed-2026-10-29.md` — brede audit op 16 gebieden
- `docs/audit-2026-10-29.md` — kritische audit van het plan + samenvatting van de onderzoeken
- `docs/juridisch.md` — mag het? (generator, clicker, licenties, checklist); klikbaar: `docs/mag-het.html`
- `docs/risicos.md` — risicoregister (41 risico's)
- `docs/brief.md` — wat de eigenaar wil (antwoorden uit de vragenlijst, 28-10-2026)
- `docs/markt.md` — bestaat dit al, concurrenten, positionering
- `docs/besluiten.md` — genomen besluiten met reden
- `docs/roadmap.md` — open vragen en volgende stappen
- `docs/naam.md` — naamonderzoek dat tot Tinkpop leidde
- `docs/brand/` — logo en merkregels

## Vaste afspraken
- Site in het Engels; docs en overleg in het Nederlands.
- Gebruik "Bambu" niet in de naam van de site (merknaam van Bambu Lab).
- Ontwerpen van anderen alleen opnemen met schriftelijke toestemming en duidelijke licentie per generator.
- Nooit een bestaand model (bestand of foto) aan AI geven om het om te bouwen. Eigen ontwerpen vanuit algemene onderdelen en openbare maten, met het proces gedateerd in de repo (zie `docs/juridisch.md`).
- Geen code uit Bambu Studio of OrcaSlicer overnemen (AGPL).
- Domein tinkpop.com staat bij Cloudflare, op naam van de eigenaar. Niets live zetten of DNS wijzigen zonder akkoord van de eigenaar.
