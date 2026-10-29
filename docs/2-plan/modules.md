# Module-indeling (voorstel 29-10-2026)

Tien hoofdmodules in vier lagen. Elk onderdeel hoort bij precies één hoofdmodule en heeft een vaste code `hoofdmodule/onderdeel` (= map in de repo, = id in het kaartje). Klikbaar: `docs/pages/overzicht.html`, tab Indeling. Wacht op akkoord eigenaar (vraag `indeling`).

Nieuw voorgesteld (29-10, na 100 platforms): `core/ui-kit` (Tinkpop Kit, designsysteem, V-028), `trust/security` (beveiligingsbasis), `trust/status` (statuspagina, V-032).

Lagen: **voor bezoekers** (studio, print, library, account, community) · **achter de schermen** (growth, trust, admin) · **onder alles** (core) · **later** (lab).

## Fundament — `core`
De motor onder alles: register, schakelbord, opslag, robotcheck en de pop-taal.

| Onderdeel | Code | Fase | Status |
|---|---|---|---|
| Kern | `core/registry` | 0 | besloten |
| Pop-taal | `core/pop` | 0 | besloten |
| Database | `core/database` | 1 | besloten |
| Robotcheck | `core/bot-check` | 1 | besloten |

## Studio — `studio`
Waar je maakt: formulier, 3D-voorbeeld, tekst, logo's, emoji, delen en bewaren.

| Onderdeel | Code | Fase | Status |
|---|---|---|---|
| Werkbank | `studio/workbench` | 0 | besloten |
| Fonts | `studio/fonts` | 0 | besloten |
| Eigen logo/SVG | `studio/logo-import` | 1 | goedgekeurd |
| Emoji (Twemoji) | `studio/emoji` | 1 | besloten |
| Batch van namen | `studio/batch` | 1 | goedgekeurd |
| Deel-link | `studio/share-link` | 1 | goedgekeurd |
| Bewaren op apparaat | `studio/local-saves` | 1 | goedgekeurd |

## Print — `print`
Van ontwerp naar printer: kleuren-3MF, plaat vullen, printcheck, printfeiten.

| Onderdeel | Code | Fase | Status |
|---|---|---|---|
| AMS-kleuren 3MF | `print/color-3mf` | 0 | besloten |
| Plaat vullen | `print/plate-fill` | 1 | goedgekeurd |
| Printcheck | `print/print-check` | 1 | besloten |
| Printfeiten | `print/print-facts` | 1 | goedgekeurd |
| Open in Bambu Studio | `print/open-in-slicer` | 4 | later |

## Bibliotheek — `library`
Alle generators en hoe je ze vindt.

| Onderdeel | Code | Fase | Status |
|---|---|---|---|
| Sleutelhanger met naam | `library/name-keychain` | 0 | besloten |
| Clicker | `library/clicker` | 2 | open |
| Catalogus | `library/catalog` | 2 | goedgekeurd |
| Gelegenheden | `library/occasions` | 2 | goedgekeurd |
| OpenSCAD-spoor | `library/scad-engine` | 3 | besloten |
| Printbaar getest | `library/print-tested` | 3 | goedgekeurd |

## Account — `account`
Inloggen om ontwerpen te bewaren, en de inlogmails.

| Onderdeel | Code | Fase | Status |
|---|---|---|---|
| Inloggen | `account/sign-in` | 2 | besloten (B-149) |
| Inlogmails | `account/mail` | 2 | besloten (B-149) |

## Community — `community`
Makers, remixen, picks, foto's van prints, meebouwen.

| Onderdeel | Code | Fase | Status |
|---|---|---|---|
| Meebouwen | `community/contribute` | 3 | besloten |
| Makerprofielen | `community/maker-profiles` | 3 | goedgekeurd |
| Remix | `community/remix` | 3 | goedgekeurd |
| Pick van de maand | `community/picks` | 3 | goedgekeurd |
| Makes-foto's | `community/makes` | 4 | goedgekeurd |

## Groei — `growth`
Gevonden worden en gesteund worden.

| Onderdeel | Code | Fase | Status |
|---|---|---|---|
| Vindbaar | `growth/pages` | 1 | goedgekeurd |
| Statistiek | `growth/stats` | 1 | besloten |
| Nederlands | `growth/i18n` | 4 | later |
| Buy Me a Coffee | `growth/donate` | 1 | besloten |

## Vertrouwen — `trust`
Legaal, eerlijk en open: juridische poort, meldknop, open boek.

| Onderdeel | Code | Fase | Status |
|---|---|---|---|
| Juridische poort | `trust/legal-gate` | 0 | besloten |
| Juridische pagina's | `trust/legal-pages` | 1 | besloten |
| Meldknop (DSA) | `trust/report` | 1 | besloten |
| Open boek | `trust/open-book` | 1 | goedgekeurd |

## Beheer — `admin`
Alleen voor jou: modulebord, live schakelaars, beheer-slot, foutmeldingen.

| Onderdeel | Code | Fase | Status |
|---|---|---|---|
| Modulebord | `admin/module-board` | 2 | besloten |
| Live schakelaars | `admin/live-switches` | 2 | goedgekeurd |
| Beheer-slot | `admin/admin-lock` | 2 | goedgekeurd |
| Foutmeldingen | `admin/error-reports` | 1 | besloten |

## Lab — `lab`
Ideeën voor later, pas als het gedragen wordt.

| Onderdeel | Code | Fase | Status |
|---|---|---|---|
| AI-modellen | `lab/ai-models` | 5 | later |
| Klasmodus | `lab/classroom` | 5 | later |
| Not Made Yet | `lab/not-made-yet` | 5 | later |

## Naamregels
- Code = `hoofdmodule/onderdeel`, kleine letters, Engels, met streepjes (bijv. `print/plate-fill`). Ook de map: `src/modules/print/plate-fill/`.
- Een code verandert nooit (links, instellingen en schakelbord hangen eraan). Hernoemen = nieuwe code + oude uitfaseren.
- Op de site Engels; in de docs een Nederlandse naam erbij.
- Een naam zegt wat het doet, niet hoe het gebouwd is (`print/color-3mf`, niet `three-3mf-export`).
- Generators heten naar het ding (`library/name-keychain`, `library/clicker`).
- Nieuw onderdeel: eerst kiezen bij welke hoofdmodule het hoort; pas als het nergens past een nieuwe hoofdmodule.
- Op het modulebord is elke hoofdmodule een groep die in één keer aan of uit kan.

## Waarom zo
- Je ziet meteen wie iets gebruikt: bezoeker, beheerder, of niemand direct.
- Juridisch overzichtelijk: persoonsgegevens vooral in `account`, openbare inhoud in `community`; daar de extra controles.
- `print` los van `studio`: alle Bambu-kennis op één plek, makkelijk aan te passen als Bambu iets verandert.
- `lab` houdt ideeën zichtbaar zonder het plan vol te maken.
