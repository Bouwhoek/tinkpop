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
