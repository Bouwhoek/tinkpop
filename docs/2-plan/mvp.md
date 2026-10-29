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

## Vaste testset (golden tests)
20 lastige namen, vooraf vastgelegd in de repo met het verwachte resultaat. Elke wijziging aan de rekenmotor draait hiertegen.
Voorbeelden: `Zoë`, `Ålesund`, `Ömer`, `Iiiiii` (dun), `WWWWWW` (breed), `Li`, `Maximiliaan-Alexander`, `O'Brien`, `ÇAĞLA`, `ijsje`, cijfers `2026`, één letter `A`, twee spaties, alleen hoofdletters, alleen kleine letters, en per font één ronde (`Bobbi`).

## Contract tussen generator en export
Elke generator levert hetzelfde: maten in mm, onderdelen met naam en kleurnummer, onderkant op z = 0, en een duidelijke foutmelding. De export test niet alleen dát er een bestand komt, maar ook dat de slicer het goed leest (M-3, M-4).

## Vergelijkingstest (T-09)
Zelfde opdracht bij Tinkpop en 3 concurrenten (KeychainGEN, keychaingenerator.tech, MakerWorld PMM): 25 namen, 2 kleuren, A1 mini, op de telefoon.
Meten: tijd, aantal tikken, aantal correcties tot een printklaar bestand. Eén keer vóór de bouw (nulmeting), één keer na fase 0.
Is Tinkpop niet duidelijk sneller of makkelijker, dan eerst dat oplossen vóór fase 1.
