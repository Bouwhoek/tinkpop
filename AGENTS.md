# AGENTS.md

Hoofdbron voor elke AI-assistent die in deze repo werkt (Claude, GPT/Codex, Gemini, andere). Sinds B-048.
`CLAUDE.md` verwijst hiernaar en bevat alleen wat specifiek voor Claude is. Begin bij `docs/README.md`.

# Tinkpop: open generators voor 3D-print

Website (tinkpop.com) waar bezoekers zelf printklare modellen maken (naambordje, sleutelhanger,
clicker, ...) door tekst en aantallen in te vullen, en STL/3MF downloaden.
Open source (AGPL-3.0, zie `LICENSE`), zodat andere ontwerpers generators kunnen toevoegen.

De eigenaar codeert niet en werkt via de chat: leg keuzes uit in gewone taal, in het Nederlands, de oplossing eerst.

## Status
Nog geen code. Fase: plan klaar, alle beslisbord-vragen beantwoord, ronde 3 met GPT en Gemini verwerkt (29-10). Richting: eerst de beste generator, inloggen pas in fase 2 (B-149). Fase 0 = MVP-contract `docs/2-plan/mvp.md`. Code is AGPL-3.0 (B-075, `LICENSE`). Volgende stap: PR #1 samenvoegen, fase 1 bevriezen, fase 0 (proefweek) bouwen. Open vragen: zie `docs/4-besluiten/roadmap.md`. Docs komen uit de eerdere werkrepo `Bouwhoek/mwbl` (werknaam, niet meer in gebruik).

## Waar staat wat
Begin bij **`docs/README.md`**: indeling in mappen (1-product, 2-plan, 3-juridisch, 4-besluiten, brand, pages, templates, archief) en de spelregels.
- Besluiten: `docs/4-besluiten/besluiten.md` (B-nummers). Open vragen, taken en fasen: `docs/4-besluiten/roadmap.md` (V-nummers).
- Zelfvragen, grill-sessie, aannames voor fase 0: `docs/2-plan/grill.md`.
- Bouwplan: `docs/2-plan/bible.md`; modules en codes: `docs/2-plan/modules.md`; open source: `docs/2-plan/hergebruik.md`.
- Juridisch en risico's: `docs/3-juridisch/`. Merk en pop-taal: `docs/brand/`.
- Alles op één pagina: overzicht-artifact (link in `docs/README.md`).

## Vaste afspraken
- **Eén onderwerp = één plek** (zie `docs/README.md`). Nieuw onderdeel? Begin met `docs/templates/module.md`.
- **Legaal by design** (bible §16): bij élke module, generator of functie eerst het juridische blok invullen, risico's koppelen uit `docs/3-juridisch/risicos.md` en in de PR in gewone taal uitleggen wat er juridisch speelt. Twijfel = niet bouwen en eerst melden aan de eigenaar.
- Site in het Engels; docs en overleg in het Nederlands.
- Gebruik "Bambu" niet in de naam van de site (merknaam van Bambu Lab).
- Ontwerpen van anderen alleen opnemen met schriftelijke toestemming en duidelijke licentie per generator.
- Nooit een bestaand model (bestand of foto) aan AI geven om het om te bouwen. Eigen ontwerpen vanuit algemene onderdelen en openbare maten, met het proces gedateerd in de repo (zie `docs/3-juridisch/juridisch.md`).
- Geen code uit Bambu Studio of OrcaSlicer overnemen (AGPL).
- Eerst hergebruiken, dan pas bouwen: kijk in `docs/2-plan/hergebruik.md`. Code is AGPL-3.0 (B-075): MIT/ISC/BSD/Apache/Unlicense en GPL-3.0(-or-later) mogen erin, met licentietekst; GPL-2.0-only niet; nooit NC of onduidelijke licenties.
- Rode lijnen en dark patterns die we nooit doen staan in `docs/1-product/gevoel.md`. Alle animaties via de pop-taal (`docs/brand/pop.md`).
- Domein tinkpop.com staat bij Cloudflare, op naam van de eigenaar. Niets live zetten of DNS wijzigen zonder akkoord van de eigenaar.

## Werkwijze
- Kleine PR's, één onderdeel per PR (`<hoofdmodule>/<onderdeel>`), met proeflink, tests en uitleg in gewone taal.
- PR's die rekenen, export, inloggen of opslag raken: tweede AI-review en een testuitslag in gewone taal voor de eigenaar (B-151).
- Besluiten met reden in `docs/4-besluiten/besluiten.md`; open punten in `docs/4-besluiten/roadmap.md`. Verandert de roadmap, werk dan ook `docs/pages/roadmap.html` bij.
- Nooit geheimen in code of chat. Niets live, geen DNS en geen migratie zonder akkoord van de eigenaar (live = release-PR samenvoegen, B-140).
