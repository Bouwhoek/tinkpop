# MVP-contract fase 0 (Tinkpop 0.1)

Sinds 29-10-2026 (B-144), na ronde 3 met GPT, Gemini en Claude. Dit is de grens van fase 0.
Kwam er een nieuw idee bij? Dan gaat het naar fase 1 of later, ook als het technisch leuk is.

## Doel in één zin
25 verschillende namen worden op een telefoon één printklare plaat voor een Bambu A1 mini, met de goede kleuren.

## Wel
- Namen typen of plakken (één per regel), 1 tot 25 namen.
- 3 lettertypen (OFL), 2 kleuren (plaatje + tekst).
- Plaat vullen: automatisch plaatsen op A1 mini en A1.
- 3D-voorbeeld. Het rekenen gebeurt los van het beeld (in een Web Worker), dus downloaden werkt ook zonder 3D-beeld.
- Download: 3MF met kleuren en STL als terugval.
- Proeflink (alleen voor de eigenaar, zie B-142).

## Niet in fase 0
Accounts, database, modulebord, schakelaars, pop-feestjes (alleen de basis pop), community, clicker, donaties, uitgebreide statistiek, emoji, Nederlands.

## Volgorde van bouwen
1. **3MF-bewijs eerst (B-145).** Een klein script maakt 5 test-3MF's (1 naam, 25 namen, 2 kleuren, smalle letters, accenten). De eigenaar opent ze in Bambu Studio en Bambu Handy en print er 1. Werkt de kleur niet meteen goed, dan lossen we dat op vóór er een scherm komt.
2. Rekenen: tekst → vorm → plaat (worker), met de vaste testset hieronder.
3. Scherm: invoer, voorbeeld, downloadbalk.
4. Proeflink en de bewijsronde hieronder.

## Bewijsprotocol (klaar als alles groen is)
| Nr | Wat | Geslaagd als |
|---|---|---|
| M-1 | Batch | 25 verschillende namen goed verwerkt (ook accenten, lange en korte namen) |
| M-2 | Plaat vullen | Niets buiten de plaat, niets overlapt, op A1 mini en A1 |
| M-3 | Kleur | Na openen in Bambu Studio staat tekst en plaatje op het juiste AMS-slot, zonder 'split to parts' of handwerk; ook na opslaan en opnieuw openen |
| M-4 | Model heel | Geen open of kapotte vormen (manifold-check en slicer zonder waarschuwing) |
| M-5 | Mobiel | Hele route op Android (eigen) en een geleende iPhone |
| M-6 | Betrouwbaar | 10 exports achter elkaar zonder fout |
| M-7 | Echt geprint | Minstens 3 verschillende platen geprint, met foto in de PR |
| M-8 | Snel | Doel: < 300 ms per toets (A-01) en < 30 s van 25 namen plakken tot download op een middenklasse telefoon. Doel, geen belofte |

## 3MF-matrix
Elke test-3MF gaat door deze rij. Wat niet werkt, staat er eerlijk bij; de site belooft alleen wat groen is.
| Programma | Openen | Kleuren op AMS | Slicen | Print |
|---|---|---|---|---|
| Bambu Studio (desktop, nieuwste) | | | | |
| Bambu Handy (telefoon) | | | | |
| OrcaSlicer (tweede controle) | | | | |
| PrusaSlicer (STL-terugval) | | | | |

Bambu Studio en OrcaSlicer zijn alleen **testgereedschap**: we lezen hun documentatie en gebruiken ze om bestanden te openen of te slicen (ook in CI, via de command line). We nemen geen code over (AGPL, zie CLAUDE.md).

## Stand van de bouw (29-10)
- Gebouwd: `library/name-keychain` (rekenmotor), `studio/batch`, `studio/fonts`, `print/plate-fill`, `print/color-3mf`, `studio/workbench` (pagina), `core/pop`. Elk met kaartje en juridisch blok (`module.json`).
- Getest (`npm run check`): vaste testset 20/20, 25 namen op A1 mini zonder overlap (M-1, M-2), 10 exports foutloos (M-6), licenties van alle pakketten, juridisch blok per module.
- Snelheid op de computer: 25 namen 0,7–1,1 s, één naam ± 0,08 s. Op een telefoon nog meten (M-8).
- Nog open: M-3 (kleur in Bambu Studio: wacht op uitslag), M-4 slicer-check, M-5 echte telefoons, M-7 echte prints.
- Proefversie: privé-artifact, gebouwd met `node tools/artifact-preview/build.mjs`. Daar gaat downloaden via een zip (de viewer staat geen .3mf toe).

## Eerste proef (29-10)
Script: `tools/proef-3mf/` (5 bestanden). Twee manieren om kleur mee te geven, om te zien welke Bambu Studio goed leest:
- **A, kleurgroep** (proef 1A): kleur per driehoek, zoals Open Keychain (MIT). Bambu vraagt dan mogelijk om kleuren aan filament te koppelen.
- **B, onderdelen** (proef 1B, 2, 3, 4): plaatje en tekst als losse onderdelen met filament 1 en 2 vastgezet.
Wint A, dan maken we 2 t/m 4 opnieuw met A. Al gevonden: Lilita One en Fredoka missen Ğ, Ş en İ (Turkse namen); Titan One mist alleen İ. Lettertypen voor fase 0 dus kiezen op tekens, niet alleen op uiterlijk. De Ç gaf een open model doordat de staart de letter raakt; opgelost met een kleine sluiting van de omtrek.

## Plaatmaten (nagelopen 29-10)
Bouwvolume in mm (breedte × diepte × hoogte). Plaat vullen gebruikt breedte × diepte, met 8 mm rand.
| Printer | Volume | Bron |
|---|---|---|
| A1 mini | 180 × 180 × 180 | winkels en gidsen |
| A1 | 256 × 256 × 256 | winkels en gidsen |
| P1P / P1S / P2S | 256 × 256 × 256 | winkels en gidsen |
| X1C / X1E | 256 × 256 × 256 | winkels en gidsen |
| H2S | 340 × 320 × 340 | winkels en gidsen |
| H2D | 325 × 320 × 325 met één spuitkop; 300 × 320 × 325 met twee | Bambu tech specs |
Nog nalopen in Bambu Studio zelf: of er een uitgesloten hoek op de plaat zit (bij X1/P1 mogelijk links voor, voor de kalibratie). Fase 0 ondersteunt A1 mini en A1; de rest volgt in fase 1.

## Vaste testset (golden tests)
20 lastige namen in `tests/golden/namen.json`, met het verwachte resultaat; draaien met `tools/proef-3mf/testset.py` (29-10: 20/20 zoals verwacht). Elke wijziging aan de rekenmotor draait hiertegen.
Regels die erin vastliggen: een ontbrekend teken geeft een waarschuwing en wordt nooit stil weggelaten (bijv. `İlayda` in Titan One); langer dan 100 mm geeft een waarschuwing; dubbele spaties worden één, spaties aan de rand verdwijnen.

## Contract tussen generator en export
Elke generator levert hetzelfde: maten in mm, onderdelen met naam en kleurnummer, onderkant op z = 0, en een duidelijke foutmelding. De export test niet alleen dát er een bestand komt, maar ook dat de slicer het goed leest (M-3, M-4).

## Vergelijkingstest (T-09)
Zelfde opdracht bij Tinkpop en 3 concurrenten (KeychainGEN, keychaingenerator.tech, MakerWorld PMM): 25 namen, 2 kleuren, A1 mini, op de telefoon.
Meten: tijd, aantal tikken, aantal correcties tot een printklaar bestand. Eén keer vóór de bouw (nulmeting), één keer na fase 0.
Is Tinkpop niet duidelijk sneller of makkelijker, dan eerst dat oplossen vóór fase 1.
