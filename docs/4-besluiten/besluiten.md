# Besluitenregister

Eén plek voor alle geldende besluiten, per onderwerp. Elk besluit heeft een vast nummer (B-xxx).
Een besluit wijzigen = nieuw nummer, en het oude naar "Vervallen" met verwijzing. Bron = waar de eigenaar het koos.
Open vragen staan **niet** hier maar in `docs/4-besluiten/roadmap.md` en op het Beslisbord.

## Product
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-001 | 28-10 | Gratis website die 3D-printbare dingen maakt in de browser; eerst sleutelhangers in alle soorten | Wens eigenaar (vragenlijst) |
| B-002 | 29-10 | Eerste generator: sleutelhanger met naam, met alles erop en eraan (lat: keychaingenerator.tech) | Bible-vraag `eerste` |
| B-003 | 29-10 | Onderscheidend in fase 1: plaat vullen en batch van namen, gratis | Blauwdruk H1, H2 |
| B-004 | 29-10 | Instellingen allemaal zichtbaar in groepen; tik op een getal voor exacte mm | Blauwdruk-vraag `instellingen` |
| B-005 | 29-10 | Download alleen blokkeren bij een kapot model; printpunten zijn vriendelijke waarschuwingen | Bible-vraag `blokkeren` |
| B-006 | 29-10 | Fonts: vaste OFL-set; bezoekers mogen een eigen font gebruiken, alleen in hun eigen browser, nooit bewaard of gedeeld | `fonts`, `font` |
| B-007 | 29-10 | Emoji via Twemoji | `emoji` |
| B-008 | 29-10 | "Open in Bambu Studio" later; eerst gewone 3MF-download | `bambu` |
| B-009 | 29-10 | Blauwdruk goedgekeurd: 62 punten ja, 14 later (A14, B4, C9, D8, D11, E1, F3, F4, G3, H3, H9, H10) | Blauwdruk-artifact |
| B-010 | 29-10 | Doorgaan/stoppen-meting 4 weken na aankondiging: ≥ 500 downloads, ≥ 20% batch/plaat, ≥ 10% komt binnen 30 dagen terug | Overzicht-vraag `gonogo` |

## Account en privacy
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-020 | 29-10 | Inloggen vanaf fase 1, alleen om ontwerpen te bewaren; downloaden nooit achter inloggen | `login` (tegen advies), `download`, `loginwat` |
| B-021 | 29-10 | Inloggen met e-maillink + passkey; accounts 16+ met vinkje | `loginhoe`, `leeftijd` |
| B-022 | 29-10 | Foutmeldingen via een eigen kleine teller bij Cloudflare, zonder ingetypte tekst | `fouten` |

## Techniek en hosting
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-030 | 29-10 | Hosting: Cloudflare Workers (static assets) | `hosting`; zelfde als NotMadeYet |
| B-031 | 29-10 | Eigen generators in TypeScript (manifold); community-generators alleen in OpenSCAD | `taal` |
| B-032 | 29-10 | Modulair: tien hoofdmodules, codes `hoofdmodule/onderdeel` (voorstel, zie `2-plan/modules.md`) | wacht op akkoord (`indeling`) |
| B-033 | 29-10 | Eerst hergebruiken: zoveel mogelijk open source, alleen met nette licenties | Overzicht-vraag `oss` |
| B-034 | 29-10 | Testtelefoon: Android | `telefoon` |

## Beheer en werkwijze
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-040 | 28-10 | Eigenaar is oprichter en beheerder: keurt alles goed, bezit repo, domein, hosting en doneeraccount | Wens eigenaar |
| B-041 | 29-10 | Samenvoegen = akkoord om live te zetten, nadat de eigenaar de proeflink zelf heeft geprobeerd | `live` |
| B-042 | 29-10 | Modulebord: alleen geteste modules aan/uit (2× bevestigen, logboek, ongedaan maken); nieuwe code via voorstel + proeflink | `bordlive` (vervangt B-901) |
| B-043 | 29-10 | Stille lancering: 2 weken live zonder aankondiging, dan aankondigen | `lancering` (vervangt B-902) |
| B-044 | 29-10 | Herstelcodes in een envelop bij een vertrouwd persoon | `uitval` |
| B-045 | 29-10 | Eén project tegelijk in de bouw | `focus` |
| B-046 | 29-10 | Plan staat nu als privé-artifact; later op tinkpop.com/plan achter Cloudflare Access (e-mailcode) | `hosting`, `inlog` (overzicht) |
| B-047 | 29-10 | Sparren: Gemini → GPT (reageert op Gemini) → Claude, via kopiëren en plakken | `aischrijven`, `volgorde` |

## Community
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-050 | 28-10 | Anderen kunnen meebouwen; elke generator toont de maker met diens doneerlink | Wens eigenaar |
| B-051 | 29-10 | Bijdragen van anderen pas na 3 maanden live, alleen .scad | `bijdragen` |
| B-052 | 29-10 | NotMadeYet blijft apart; ideeën worden later .scad-generators op Tinkpop | `nmy` |
| B-053 | 29-10 | Generators ook op MakerWorld zetten waar het kan, met link (alleen in de modelbeschrijving) | `makerworld`; regels MakerWorld in `3-juridisch/juridisch.md` |

## Geld
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-060 | 28-10 | Alles gratis, ook latere AI; inkomsten alleen via Buy Me a Coffee (gewone donaties, geen memberships of extras) | Keuze eigenaar |
| B-061 | 28-10 | Donaties moeten minstens hosting en domein dekken | Wens eigenaar |

## Juridisch en licenties
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-070 | 29-10 | Legaal by design: verplicht juridisch blok per module; bouw faalt en bord weigert aanzetten als het niet klopt | Wens eigenaar; `2-plan/bible.md` §16 |
| B-071 | 29-10 | Ontwerp van generators CC BY 4.0; gemaakte bestanden vrij, zonder naamsvermelding | `licentie`, `outputlicentie` |
| B-072 | 29-10 | Code MIT (AGPL in overweging, zie roadmap) | 28-10; open vraag `codelicentie` |
| B-073 | 29-10 | Merkbescherming Tinkpop/Pinkpop: eigenaar zoekt het zelf uit, vóór de aankondiging | `merk`, `merkjurist` |
| B-074 | 29-10 | Clicker-maker deze week om schriftelijke toestemming vragen | `clicker` |

## Merk
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-080 | 28-10 | Naam Tinkpop; tinkpop.com bij Cloudflare; repo `Bouwhoek/tinkpop`; slogan "Type it. Tink it. Print it." | `1-product/naam.md` |
| B-081 | 28-10 | Social: @tink_pop, op Instagram @tink.pop | Beschikbaarheid |
| B-082 | 28-10 | Site in het Engels; docs en overleg in het Nederlands | Keuze eigenaar |
| B-083 | 28-10 | Eigen merk, naast 3d-prints.bouwhoek.app | Keuze eigenaar |

## Vervallen
| Nr | Was | Vervangen door |
|---|---|---|
| B-900 | Hosting bij voorkeur Cloudflare Pages (28-10) | B-030 |
| B-901 | Modulebord waarin de eigenaar klikt en het meteen live gaat (29-10) | B-042 |
| B-902 | Geen testgroep: direct lanceren (29-10) | B-043 (stille lancering) |
| B-903 | Repo-naam `mwbl` als werknaam (28-10) | B-080 |
| B-904 | Eén generator, verder niets in fase 1 (28-10) | B-002, B-003 |
