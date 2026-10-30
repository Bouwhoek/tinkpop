# Markt — bestaat dit al? (onderzoek 28-10-2026)

## Conclusie
Ja, het bestaat al, en de grootste speler is Bambu Lab zelf. Een groot algemeen
platform bouwen tegen MakerWorld is niet realistisch. Er is wel een open plek:
**een snelle, open generator-site die in de browser draait, zonder login, ook op mobiel,
en die dezelfde OpenSCAD-bestanden gebruikt die ontwerpers al voor MakerWorld maken.**

## Wat er is
- **MakerWorld Parametric Model Maker (Bambu Lab)**: ontwerpers uploaden OpenSCAD (of Fusion 360),
  bezoekers klikken "Customize". Gratis, enorm bereik. Ook "Make My Sign" voor bordjes.
  Klachten: timeouts, onderhoud van dagen, niet bruikbaar op mobiel, rekenen gebeurt op hun server,
  onduidelijke download- en puntentelling, AI-functies kosten credits.
  - https://makerworld.com/en/collections/32691553-parametric-model-maker
  - https://forum.bambulab.com/t/parametric-model-maker-request-timeout/244142
  - https://forum.bambulab.com/t/parametric-model-maker-review-and-feedback/75758/40
  - https://3printr.com/create-models-for-3d-printed-signs-free-of-charge-with-online-tool-1569644
- **Open source, losse generators**: Open Keychain (MIT, sleutelhangers/naambordjes/plantlabels, draait in de browser),
  Tagify3D (MIT, naambordjes en tags).
  - https://github.com/capynq/open-keychain
  - https://tagify3d.com/
  - Leeftijd (git-historie, gecontroleerd 28-10-2026):
    - Tagify3D (repo doccaz/nameplate-generator): eerste commit 15-06-2026, laatste 17-09-2026, 57 commits, één maker.
    - Open Keychain: eerste commit 09-08-2026, laatste 25-10-2026, 243 commits, vooral één maker, 0 sterren.
    - Beide zijn dus maanden oud, hobbyprojecten van één persoon, zonder gemeenschap van ontwerpers.
  - Ter vergelijking: MakerLab (met Parametric Model Maker) bestaat sinds april 2024, Fusion 360-ondersteuning sinds juni 2025.
    Het idee zelf is oud: de Thingiverse Customizer bestaat sinds 2013.
- **keychaingenerator.tech**: één sleutelhanger-generator, gratis, gesloten code, maker onbekend (handle "devsg24", Discord, Buy me a coffee, aparte commerciële licentie).
  Live in 2026: eerste HTTPS-certificaat 10-10-2026, dus enkele weken oud. Geen uploads of bijdragen van anderen.
  Instellingen: lettertype, tekstgrootte, dikte, letterafstand, regelhoogte, marge, hoekafronding, vorm, ringgat (maat, wand, positie), kleur en dikte apart voor plaat en letters, 3D- en 2D-weergave, export 3MF en STL.
  **Dit is de lat voor onze eerste generator** (eigenaar: "zoiets, met alles erop en eraan").
- **3dtagmaker.com**: gesloten, eerste certificaat 07-05-2026.
- **Gesloten losse sites**: 3dtagmaker.com, 3dprint.name, meshcast.app, plainmesh.com.
- **Printables (Prusa)**: veel OpenSCAD-modellen, geen eigen customizer gevonden.
- **Bouwstenen**: OpenSCAD draait in de browser via WebAssembly (openscad-playground, openscad-wasm).
  - https://github.com/openscad/openscad-playground

## Positionering (voorstel)
1. Ontwerpers hoeven niets nieuws te leren: hun bestaande MakerWorld-`.scad`-bestand werkt ook hier.
2. Rekenen in de browser van de bezoeker: direct resultaat, geen servers, geen wachtrij, bijna geen kosten.
3. Werkt op mobiel, zonder account.
4. Extra wat MakerWorld niet doet: printtijd, grammen en kosten vooraf, 3MF met kleuren per laag.
5. Insluitbaar: een ontwerper kan de generator op de eigen site zetten.

## Update 29-10-2026: 23 concurrenten
| Naam | Wat | Prijs | Sinds | Dreiging | Gat voor Tinkpop |
|---|---|---|---|---|---|
| MakerWorld Parametric Model Maker | OpenSCAD-Customize, honderden keychain-generators, sommige met batch | gratis | 2024 | hoog | Rekent op hun server: timeouts, storingen, matig op mobiel |
| KeychainGEN (keychaingen.com) | Batch, plaat vullen, kleuren-3MF, mobiel | gratis tot 11/2026, daarna premium | aug 2026 | hoog | Wordt betaald en is gesloten |
| MakerLab Make My Sign / Image to Keychain | Bordjes; afbeelding wordt sleutelhanger | basis gratis, AI kost credits | 2024 | middel | Geen batch van namen |
| keychaingenerator.tech | Uitgebreide enkele sleutelhanger, 3MF met filamentsloten | gratis + commerciële licentie | okt 2026 | middel | Geen batch, gesloten |
| Keyform.eu | Logo/foto/woord, tot 30 tegelijk, printcheck | 3 gratis, daarna €4,99–9,99 | onbekend | middel | Downloads kosten geld |
| 3dprint.name | Bordjes, keyrings, NFC | gratis 1 kleur; Pro £2,99/mnd | jul 2026 | middel | Kleur en batch achter betaalmuur |
| 3dtagmaker.com | Tags, 30+ fonts, kleuren-3MF | gratis, printservice | mei 2026 | middel | Geen batch |
| Meshcast | Tekst/SVG, 3MF in 2 delen | gratis met weeklimiet | mei 2026 | middel | Downloadlimiet |
| PrintPal | Naambordjes gratis, Fidget Clicker Maker | clicker-export Pro $10/mnd | 2021 | middel | Gratis clicker-generator ontbreekt |
| MakerWorld clicker-generators | Name Fidget Clicker, Parametric Name Clicker | gratis via PMM | 2025-26 | middel | Zelfde PMM-problemen, niet open |
| Meshy / Tripo (AI) | Afbeelding naar 3D, multicolor op MakerWorld | credits | – | middel | Niet exact; tekst blijft parametrisch |
| the3dai.com | 2 kleuren, 4 fonts | gratis, lokt naar AI | 2024 | laag | Beperkt |
| Tagify3D | MIT, veel opties, 2 STL's | gratis | jun 2026 | laag | Eén maker, geen kleur-3MF, geen batch |
| Open Keychain | MIT, in de browser | gratis + Maker-plan | aug 2026 | laag | Geen community |
| 3dkeychain.net | Tekst/SVG/QR, kleur-3MF | onbekend (beta) | dec 2025 | laag | Account verplicht |
| ilove3d.app | Gereedschapskist, keychain STL | gratis | jul 2026 | laag | Geen kleur-3MF |
| Modelab 3D | Rekent lokaal, kleur-3MF | gratis | aug 2026 | laag | Klein, geen batch |
| PlainMesh | 250+ parametrische modellen | Patreon | onbekend | laag | Gesloten, voor leden |
| Printables (Prusa) | Geen web-customizer gevonden | gratis | – | laag | Prusa-gebruikers missen een web-customizer |
| Thingiverse (MyMiniFactory) | Oude Customizer; overgenomen feb 2026 | gratis | 2013 | laag → middel | Herstart onbekend |
| Creality Cloud 6.0 | 4M+ gebruikers, AI-zoeken | credits | 2025 | laag | Geen keychain-generator |
| Elegoo Nexprint | Deelplatform, AI | onbekend | 2025 | laag | Geen parametrische keychain |
| Atomm (xTool) | Gelaagde keychains | gratis | onbekend | laag | Alleen laser |

Markt: MakerWorld ±10M maandelijkse gebruikers eind 2025, 280.000 ontwerpers (Bambu, feb 2026). Minstens 7 nieuwe keychain-sites in mei–okt 2026.

**Positionering (advies):** een hele plaat met namen in één keer, op je telefoon, in tien seconden, gratis en zonder account, met een 3MF die in Bambu Studio meteen de juiste kleuren heeft. Daarachter een open motor die dezelfde `.scad` draait als MakerWorld. Grootste dreigingen: Bambu bouwt batch zelf; KeychainGEN (gratis tot 11/2026).
