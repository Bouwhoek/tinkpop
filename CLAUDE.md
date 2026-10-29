# Tinkpop — open generators voor 3D-print

Website (tinkpop.com) waar bezoekers zelf printklare modellen maken (naambordje, sleutelhanger,
clicker, ...) door tekst en aantallen in te vullen, en STL/3MF downloaden.
Open source, zodat andere ontwerpers generators kunnen toevoegen.

Eigenaar codeert niet en werkt via de chat: leg keuzes uit in gewone taal, in het Nederlands.

## Status
Nog geen code. Fase: plan klaar (bible, blauwdruk goedgekeurd 29-10, juridisch, risico's, gevoel). Volgende stap: fase 1 bevriezen en fase 0 (proefweek) bouwen. Open vragen: zie `docs/roadmap.md`. Docs komen uit de eerdere werkrepo `Bouwhoek/mwbl` (werknaam, niet meer in gebruik).

## Waar staat wat
- `docs/bible.md` — **het bouwplan** (architectuur, modules, contract, fasen); klikbaar: `docs/bible.html`
- `docs/blauwdruk.md` — het beste van 50 sites + eigen ideeën + lanceervoorwaarden, ter goedkeuring; klikbaar: `docs/blauwdruk.html`
- `docs/audit-breed-2026-10-29.md` — brede audit op 16 gebieden
- `docs/audit-2026-10-29.md` — kritische audit van het plan + samenvatting van de onderzoeken
- `docs/juridisch.md` — mag het? (generator, clicker, licenties, checklist); klikbaar: `docs/mag-het.html`
- `docs/risicos.md` — risicoregister (41 risico's)
- `docs/overzicht.html` — alles op één pagina: modulebord, bouwvolgorde, open source, reflecties Gemini/GPT/Claude
- `docs/hergebruik.md` — welke open source we hergebruiken of ombouwen, met licenties
- `docs/brief.md` — wat de eigenaar wil (antwoorden uit de vragenlijst, 28-10-2026)
- `docs/markt.md` — bestaat dit al, concurrenten, positionering
- `docs/besluiten.md` — genomen besluiten met reden
- `docs/roadmap.md` — open vragen en volgende stappen
- `docs/naam.md` — naamonderzoek dat tot Tinkpop leidde
- `docs/gevoel.md` — onderscheiden, terugkomen, fijn gevoel, iedereen tevreden, rode lijnen; klikbaar met pop-speeltuin: `docs/gevoel.html`
- `docs/brand/` — logo, merkregels en de pop-taal (`pop.md`, prototype `pop-prototype.js`)

## Vaste afspraken
- **Legaal by design** (bible §16): bij élke module, generator of functie eerst het juridische blok invullen, risico's koppelen uit `docs/risicos.md` en in de PR in gewone taal uitleggen wat er juridisch speelt. Twijfel = niet bouwen en eerst melden aan de eigenaar.
- Site in het Engels; docs en overleg in het Nederlands.
- Gebruik "Bambu" niet in de naam van de site (merknaam van Bambu Lab).
- Ontwerpen van anderen alleen opnemen met schriftelijke toestemming en duidelijke licentie per generator.
- Nooit een bestaand model (bestand of foto) aan AI geven om het om te bouwen. Eigen ontwerpen vanuit algemene onderdelen en openbare maten, met het proces gedateerd in de repo (zie `docs/juridisch.md`).
- Geen code uit Bambu Studio of OrcaSlicer overnemen (AGPL).
- Eerst hergebruiken, dan pas bouwen: kijk in `docs/hergebruik.md`. Alleen licenties MIT/ISC/BSD/Apache/Unlicense in de site; GPL alleen als los programma (openscad-wasm); nooit NC of onduidelijke licenties.
- Rode lijnen en dark patterns die we nooit doen staan in `docs/gevoel.md`. Alle animaties via de pop-taal (`docs/brand/pop.md`).
- Domein tinkpop.com staat bij Cloudflare, op naam van de eigenaar. Niets live zetten of DNS wijzigen zonder akkoord van de eigenaar.
