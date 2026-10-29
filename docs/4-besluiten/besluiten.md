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
| B-011 | 29-10 | Eerste indruk (homepage): een hele plaat met namen in één keer, gratis, op je telefoon | V-004 |
| B-012 | 29-10 | Plaat vullen en batch al minimaal in fase 0 | V-024 |
| B-013 | 29-10 | Tempo: rustig aan, eerst alles af (ondanks KeychainGEN) | V-005, tegen advies |
| B-014 | 29-10 | Eerste gelegenheid: Sinterklaas en Kerst | V-016 |
| B-015 | 29-10 | Pop-taal zoals de speeltuin; geluid standaard uit; druppeltjes bij wegploppen. Eerst verder uitwerken in artifacts tot het resultaat goed is | V-011, V-012, V-013 |
| B-016 | 29-10 | Offline werken (PWA) later, fase 2 | V-033 |
| B-149 | 29-10 | **Richting: eerst de beste generator.** Inloggen, modulebord en community pas als bewezen is dat mensen het gebruiken en makers willen meedoen. Fase 1 = sleutelhanger met alles erop en eraan, plaat vullen, batch, meldknop; geen inloggen | V-036 (vervangt B-020) |
| B-150 | 29-10 | Doorgaan/stoppen-meting 4 weken na aankondiging: ≥ 500 downloads, ≥ 30% van de bezoekers downloadt, mediaan < 2 min tot download, < 2% slicer-meldingen; terugkomen meten rond Sinterklaas en Kerst | V-037 (vervangt B-010) |
| B-144 | 29-10 | Fase 0 = MVP-contract van één pagina (`2-plan/mvp.md`): 25 namen → één plaat A1 mini, 3 fonts, 2 kleuren, 3MF + STL; klaar als het bewijsprotocol M-1 t/m M-8 groen is. Nieuwe ideeën gaan naar later | Ronde 3: GPT, Gemini en Claude eens; past binnen B-012 |
| B-145 | 29-10 | Eerste bouwstap: 3MF-bewijs vóór er een scherm komt (5 test-3MF's in Bambu Studio, Handy en OrcaSlicer; 1 print). De site belooft alleen wat in de 3MF-matrix groen is | Ronde 3: grootste risico volgens GPT en Gemini |

## Account en privacy
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-020a | 29-10 | Downloaden nooit achter inloggen; inloggen (later) alleen om ontwerpen te bewaren | `download`, `loginwat`; moment van inloggen: B-149 |
| B-021 | 29-10 | Inloggen (vanaf fase 2, B-149) met e-maillink + passkey; accounts 16+ met vinkje | `loginhoe`, `leeftijd` |
| B-022 | 29-10 | Foutmeldingen via een eigen kleine teller bij Cloudflare, zonder ingetypte tekst | `fouten` |
| B-023 | 29-10 | Inlogmails via Resend (gratis tot 100/dag) achter eigen `sendMail()` | V-020 |
| B-024 | 29-10 | Contactadres hello@tinkpop.com via Cloudflare Email Routing | V-021 |

## Techniek en hosting
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-030 | 29-10 | Hosting: Cloudflare Workers (static assets) | `hosting`; zelfde als NotMadeYet |
| B-031 | 29-10 | Eigen generators in TypeScript (manifold); community-generators alleen in OpenSCAD | `taal` |
| B-032 | 29-10 | Modulair: tien hoofdmodules, codes `hoofdmodule/onderdeel` (zie `2-plan/modules.md`) | goedgekeurd: B-035 |
| B-033 | 29-10 | Eerst hergebruiken: zoveel mogelijk open source, alleen met nette licenties | Overzicht-vraag `oss` |
| B-034 | 29-10 | Testtelefoon: Android | `telefoon` |
| B-035 | 29-10 | Indeling in tien hoofdmodules met codes `hoofdmodule/onderdeel` goedgekeurd | V-001 (vervangt voorstel in B-032) |
| B-036 | 29-10 | Designsysteem Tinkpop Kit als `core/ui-kit` | V-028 |
| B-037 | 29-10 | Cloudflare: AI-zoekbots toestaan, AI-trainingsbots blokkeren | V-029 |
| B-038 | 29-10 | Statuspagina buiten de eigen site | V-032 |

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
| B-048 | 29-10 | AGENTS.md is de hoofdbron voor alle AI's; CLAUDE.md verwijst ernaar | V-026 |
| B-049 | 29-10 | Harde regels automatisch afdwingen: in CI én in de projectinstellingen voor AI | V-027 |
| B-140 | 29-10 | Live zetten via een release-PR met wijzigingslijst in gewone taal; samenvoegen daarvan = akkoord voor live | V-030 (verfijnt B-041) |
| B-142 | 29-10 | Fase 0 niet delen met een eigen kring; aanname A-04 wordt getest tijdens de stille lancering | V-025 en V-038 (bevestigd), tegen advies |
| B-151 | 29-10 | Tweede AI-review alleen bij PR's die rekenen, export, inloggen of opslag raken: een andere AI leest de wijziging na, en de eigenaar krijgt een testuitslag in gewone taal (wat getest, wat ging fout, waarom veilig) | V-039 (vervangt B-141) |

## Community
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-050 | 28-10 | Anderen kunnen meebouwen; elke generator toont de maker met diens doneerlink | Wens eigenaar |
| B-051 | 29-10 | Bijdragen van anderen pas na 3 maanden live, alleen .scad | `bijdragen` |
| B-052 | 29-10 | NotMadeYet blijft apart; ideeën worden later .scad-generators op Tinkpop | `nmy` |
| B-054 | 29-10 | **Niet op MakerWorld publiceren** | V-018 (vervangt B-053) |
| B-154 | 29-10 | Herkenbaar als maker: voornaam + "maker uit Nederland" op de About-pagina en bij de aankondiging; geen foto of adres | V-042 (vervangt B-055) |

## Geld
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-060 | 28-10 | Alles gratis, ook latere AI; inkomsten alleen via Buy Me a Coffee (gewone donaties, geen memberships of extras) | Keuze eigenaar |
| B-061 | 28-10 | Donaties moeten minstens hosting en domein dekken | Wens eigenaar |
| B-062 | 29-10 | Openbare pagina met kosten en donaties per maand, na het vaststellen van de echte kosten | V-015 |
| B-155 | 29-10 | Op de open pagina eerlijk over geld: donaties dekken eerst de kosten; wat erboven komt is een vergoeding voor de uren van de maker | V-043 (vult B-062 aan) |
| B-063 | 29-10 | Verkoop (prints of extra's) helemaal buiten Tinkpop: alleen via NotMadeYet of Bouwhoek | V-009 |

## Juridisch en licenties
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-070 | 29-10 | Legaal by design: verplicht juridisch blok per module; bouw faalt en bord weigert aanzetten als het niet klopt | Wens eigenaar; `2-plan/bible.md` §16 |
| B-148 | 29-10 | URL-structuur volgens voorstel E8 (`2-plan/grill.md`): `/make/<generator>`, `/ideas/<gelegenheid>`, deel-link met `#d=` | V-035 |
| B-143 | 29-10 | Licentie per soort: alle code AGPL-3.0, ook generatorcode (TypeScript en .scad); foto's, tekeningen en docs CC BY 4.0; gemaakte bestanden vrij, zonder naamsvermelding (behalve wat Twemoji vraagt, V-041). Licentie voor community-generators: vraag voor fase 3 | Correctie na ronde 3: Creative Commons is niet bedoeld voor software (vervangt B-071) |
| B-146 | 29-10 | De juridische poort controleert gegevens, geen juridisch oordeel; twijfel = niet bouwen en melden | Ronde 3 (GPT); `2-plan/bible.md` §16 |
| B-073 | 29-10 | Merkbescherming Tinkpop/Pinkpop: eigenaar zoekt het zelf uit, vóór de aankondiging | `merk`, `merkjurist` |
| B-075 | 29-10 | **Codelicentie AGPL-3.0** (kopiëren mag, maar dan ook open) | V-014 (vervangt B-072) |
| B-076 | 29-10 | Meldknop en contactpunt al in fase 1 | V-006 |
| B-152 | 29-10 | Eén veiligheidsregel bij de downloadknop: "Not a toy. Small parts. Test your print." (plus in de voorwaarden) | V-040 (vervangt B-077) |
| B-153 | 29-10 | Twemoji-vermelding in de footer, in het downloadscherm en in de 3MF-gegevens als er een emoji in zit | V-041 (vervangt B-078) |
| B-147 | 29-10 | Clicker: alleen een eigen ontwerp vanuit algemene onderdelen en openbare maten; het origineel is onbekend, dus toestemming vragen vervalt | V-034 ("weet ik niet meer"; vervangt B-074, B-079) |

## Merk
| Nr | Datum | Besluit | Reden / bron |
|---|---|---|---|
| B-080 | 28-10 | Naam Tinkpop; tinkpop.com bij Cloudflare; repo `Bouwhoek/tinkpop`; slogan "Type it. Tink it. Print it." | `1-product/naam.md` |
| B-081 | 28-10 | Social: @tink_pop, op Instagram @tink.pop | Beschikbaarheid |
| B-082 | 28-10 | Site in het Engels; docs en overleg in het Nederlands | Keuze eigenaar |
| B-083 | 28-10 | Eigen merk, naast 3d-prints.bouwhoek.app | Keuze eigenaar |
| B-084 | 29-10 | Merkbelofte: "Make something with your name on it. Fast, free and open, the way making should be." | V-010 |
| B-085 | 29-10 | Logo laten natekenen als SVG door een ontwerper | V-023 |
| B-086 | 29-10 | Logo: variant 2 "Layer T" (T uit gekleurde printlagen, zwart woordmerk met hartje); printkop-poppetje als mascotte, niet in het logo | V-044; pakket in `brand/logo-v3/` |

## Vervallen
| Nr | Was | Vervangen door |
|---|---|---|
| B-900 | Hosting bij voorkeur Cloudflare Pages (28-10) | B-030 |
| B-901 | Modulebord waarin de eigenaar klikt en het meteen live gaat (29-10) | B-042 |
| B-902 | Geen testgroep: direct lanceren (29-10) | B-043 (stille lancering) |
| B-903 | Repo-naam `mwbl` als werknaam (28-10) | B-080 |
| B-905 | Code MIT (B-072) | B-075 (AGPL) |
| B-906 | Generators ook op MakerWorld (B-053) | B-054 |
| B-908 | Doorgaan/stoppen: 500 downloads, 20% batch, 10% terugkomers (B-010) | B-150 |
| B-909 | Inloggen vanaf fase 1 (B-020) | B-149, B-020a |
| B-910 | Geen tweede AI-review (B-141) | B-151 |
| B-911 | Eigenaar anoniem (B-055) | B-154 |
| B-912 | Clicker-maker om toestemming vragen; beide routes (B-074, B-079) | B-147 |
| B-913 | Veiligheidsregel alleen in voorwaarden (B-077) | B-152 |
| B-914 | Twemoji alleen in de footer (B-078) | B-153 |
| B-907 | Generators CC BY 4.0 (B-071) | B-143 |
| B-904 | Eén generator, verder niets in fase 1 (28-10) | B-002, B-003 |
