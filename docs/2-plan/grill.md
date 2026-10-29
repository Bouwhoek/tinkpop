# Zelfvragen en grill-sessie (29-10-2026)

Claude grilt zichzelf over het plan, tak voor tak, met per vraag een aanbevolen antwoord.
Waar het antwoord al in de docs staat: verwijzing. Waar een nieuwe actie nodig is: **actie**. Waar de eigenaar moet kiezen: **V-nummer** (staat ook op het Beslisbord).

## A. Zelfvragen: hoe kan het georganiseerder? (zoals de vraag over hoofdmodules)
| # | Vraag die ik mezelf had moeten stellen | Antwoord | Status |
|---|---|---|---|
| Z1 | Heeft alles een vast nummer, zodat we er in elk gesprek naar kunnen verwijzen? | Ja nu: B (besluit), V (vraag), risico-ID's, modulecodes. Nog niet: aannames en taken. | **actie**: aannames A-xx (zie C) |
| Z2 | Is er één plek per onderwerp? | Ja sinds de herindeling (`docs/README.md`). Artifacts waren verspreid → alles in één overzicht met Beslisbord. | gedaan |
| Z3 | Krijgen GPT, Gemini en Codex dezelfde spelregels als Claude? | Nee: alleen `CLAUDE.md`. | **actie**: `AGENTS.md` die naar dezelfde regels verwijst |
| Z4 | Is fase 0 een echt experiment met slagen/zakken? | Nee, alleen een takenlijst. | **actie**: fase 0 = test van 4 aannames met harde drempels (zie C) |
| Z5 | Staat er wat we bewust níet doen? | Verspreid (rode lijnen, later-lijst). | **actie**: "Niet-doen-lijst" in roadmap |
| Z6 | Weet iedereen wat de woorden betekenen (Werkbank, Studio, plaat vullen, generator, preset, ontwerp)? | Nee. | **actie**: woordenlijst in `docs/README.md` |
| Z7 | Zijn risico's gekoppeld aan modules? | Nee, het register heeft geen modulekolom. | **actie**: elk risico krijgt een hoofdmodule |
| Z8 | Ligt de URL-structuur vast? Die is lastig te veranderen (SEO, deel-links). | Nee. | **actie**: voorstel in E8, **V-022** |
| Z9 | Is het datamodel bekend (wat bewaren we precies)? | Nee. | **actie**: voorstel in E6 |
| Z10 | Wie doet wat: eigenaar, Claude of automatisch? | Deels (taken in roadmap). | gedaan in roadmap; per module in het kaartje |
| Z11 | Is er een definitie van klaar per onderdeel? | Ja: `docs/templates/module.md`. | gedaan |
| Z12 | Is er een contactadres voor de meldknop, privacy en makers? | Nee. | **V-021**: hello@tinkpop.com via Cloudflare Email Routing (gratis) |
| Z13 | Is PR #1 niet te groot geworden om nog te beoordelen? | Ja: 30+ commits, alleen docs. | **advies**: nu samenvoegen; daarna kleine PR's per onderdeel (zie F) |
| Z14 | Hebben we een vast ritme? | Nee. | **actie**: elke sessie begint bij `docs/README.md` en eindigt met "Vastgelegd"; elke vrijdag status bijwerken |
| Z15 | Is het logo bruikbaar voor de site? | Nee: bitmap, AI-gemaakt. | **V-023**: logo laten natekenen als SVG (of door mij als voorstel) |

## B. Grill-boom (tak voor tak, met afhankelijkheden)

### 1. Doel en succes
1. **Welk probleem lossen we op?** → Groepen die veel namen willen printen, snel en goed, gratis, op hun telefoon. *Bron: `1-product/markt.md`, positionering.*
2. **Hoe weten we dat het werkt?** → B-150: ≥ 500 downloads, ≥ 30% van de bezoekers downloadt, mediaan < 2 min, < 2% slicer-meldingen; terugkomen rond gelegenheden. *Beantwoord.*
3. **Wat is de held van de homepage?** → Hele plaat met namen. *Hangt af van 2; V-004 (open).*

### 2. Fase 0 (hangt af van 1.3)
4. **Wat moet fase 0 bewijzen?** → De vier riskantste aannames (C): snelheid op Android/iPhone, 3MF klopt in Bambu Studio, plaat vullen werkt, mensen willen het. *Nieuw: **actie** (roadmap).*
5. **Hoort plaat vullen + batch al in fase 0?** → Ja, minimaal: het is de held en de grootste aanname. *Besloten: B-012.*
6. **Hoe testen we "willen mensen het" zonder lancering?** → Proeflink delen met 5–10 mensen uit je eigen kring (geen testgroep-lancering, wel een proef). *Past bij B-043; **V-025**.*

### 3. Architectuur (hangt af van 2)
7. **Eén app of meerdere?** → Eén Astro-app, mappen per hoofdmodule. *Beantwoord: `2-plan/bible.md` §5.*
8. **Is het modulesysteem in fase 0 niet te zwaar?** → Fase 0: alleen mappen + minimaal kaartje (id, hoofdmodule, versie, juridisch blok). Schakelbord en live schakelaars pas fase 1–2. *Nieuw advies, geen vraag.*
9. **Wat als Astro of Cloudflare verandert?** → Kleine eigen lagen (`sendMail()`, `getFlags()`, opslag). *Beantwoord: `2-plan/hergebruik.md`.*

### 4. Generators (hangt af van 3)
10. **Eén parameterformaat voor TypeScript- én .scad-generators?** → Ja: één intern schema; .scad-parameters worden daarnaar omgezet (`--export-format=param`). *Beantwoord: audit + hergebruik.*
11. **Waar komen presets vandaan?** → Uit het kaartje van de generator; per gelegenheid extra presets. *Beantwoord: bible §6.*
12. **Hoe voorkomen we dat oude deel-links breken?** → `id@major` in de link + `migrate()`. *Beantwoord: bible §6.*

### 5. Printen (hangt af van 4)
13. **Welke printers en platen ondersteunen we?** → Bambu A1 mini, A1, P1, X1 (en H2D?) bij plaat vullen; anderen via STL. *Nieuw: plaatmaten nalopen bij Bambu; **actie**.*
14. **Hoe zeker zijn de printschattingen?** → Schatting, geijkt op 5–10 eigen prints; altijd "± " erbij. *Beantwoord: bible §9.*
15. **Wat als Bambu het 3MF-formaat verandert?** → Minimale 3MF, CI-test tegen nieuwste slicer, STL als terugval. *Beantwoord: risico P1.*

### 6. Data en account (hangt af van 4)
16. **Wat bewaren we in een account?** → Alleen: e-mailadres, en per ontwerp `generator@versie + parameters + naam + datum`. Geen modellen, geen foto's, geen eigen fonts. *Nieuw voorstel (E6).*
17. **Hoe lang bewaren we?** → Account 24 maanden na laatste login, daarna mail en verwijderen. *Beantwoord in audit; **actie**: in privacyverklaring.*
18. **Back-up?** → D1 dagelijks exporteren naar R2 (gratis laag). *Nieuw: **actie**.*

### 7. Veiligheid (hangt af van 6)
19. **Wat is het minimum bij lancering?** → Security-baseline (wacht op onderzoek 100 platforms) + `security.txt`. *Wordt aangevuld.*
20. **Wie mag wat in GitHub?** → Alleen de eigenaar keurt; branch-bescherming; CODEOWNERS. *Beantwoord.*

### 8. Juridisch (raakt alles)
21. **Is alles wat in fase 0 zit legaal?** → Ja: eigen code, MIT/Apache-onderdelen, OFL-fonts, geen persoonsgegevens (fase 0 heeft geen login). *Beantwoord.*
22. **Wat moet er vóór fase 1?** → AVG-pakket, meldknop, contactadres (V-021), merkcheck (B-073). *Beantwoord.*

### 9. Ervaring (hangt af van 1 en 4)
23. **Hoe past alles op een telefoon?** → Voorbeeld boven, groepen eronder, vaste downloadbalk. *Beantwoord: blauwdruk A1.*
24. **Wat ziet iemand bij het eerste bezoek?** → De held (plaat met namen) met een voorbeeld al ingevuld, niet een leeg formulier. *Nieuw advies.*
25. **Hoe zorgen we dat community-generators er hetzelfde uitzien?** → Designsysteem met tokens en vaste onderdelen; generators leveren alleen parameters en vormen. *Wordt aangevuld (onderzoek).*

### 10. Vindbaarheid (hangt af van 8 en 9)
26. **Welke pagina's maken we?** → Per generator, per sterke toepassing (team, klas), per gelegenheid; geen duizenden lege pagina's (Google: scaled content abuse). *Wordt aangevuld.*

### 11. Werkwijze (raakt alles)
27. **Hoe werken meerdere AI's samen zonder rommel?** → `AGENTS.md` + dezelfde spelregels; Claude bouwt, GPT/Gemini sparren via het overzicht. *Nieuw: **actie** Z3.*
28. **Hoe groot is een PR?** → Eén onderdeel per PR, met proeflink en juridisch blok. *Nieuw: **actie** (F).*

## C. Aannames die fase 0 moet testen
De harde lat per aanname staat sinds ronde 3 in `mvp.md` (bewijsprotocol M-1 t/m M-8).

| Nr | Aanname | Test | Geslaagd als |
|---|---|---|---|
| A-01 | Rekenen is snel genoeg op een gewone telefoon | 18 tekens typen op jouw Android en een geleende iPhone | < 300 ms per toets, geen crash na 5 min |
| A-02 | De 3MF opent goed in Bambu Studio met juiste kleuren | 3 ontwerpen openen en printen | kleuren op juiste AMS-sloten, zonder meldingen |
| A-03 | Plaat vullen werkt voor echte namen | 25 namen op A1 mini en A1 | alles past, niets overlapt, print lukt |
| A-04 | Mensen willen het | Proeflink naar 5–10 mensen | ≥ 5 van hen downloaden en printen iets |

## D. Niet doen (bewust)
- Geen eigen login bouwen (Better Auth), geen eigen database-server, geen eigen analytics.
- Geen verkoop via Tinkpop, geen advertenties, geen trackers.
- Geen community-bijdragen vóór 3 maanden live.
- Geen AI-modellen tot donaties het dragen.
- Geen Nederlandse versie in fase 1.
- Geen app (alleen web).

## E. Voorstellen bij de vragen
- **E6 Datamodel (fase 1):** `user(id, email, created)`, `design(id, user_id, generator, version, params_json, title, updated)`, `report(id, url, reason, created, status)`, `audit_log(id, who, what, before, after, at)`.
- **E8 URL-structuur:** `/` (held), `/make/<generator>` (bijv. `/make/name-keychain`), `/make/<generator>/<preset>` (bijv. `/make/name-keychain/team`), `/ideas/<gelegenheid>` (bijv. `/ideas/sinterklaas`), `/makers/<naam>` (fase 3), `/about`, `/open-book`, `/legal/*`, `/admin` (Access). Deel-link: `/make/<generator>#d=<gecomprimeerd>`.

## F. Werkwijze na PR #1
1. PR #1 samenvoegen (alleen docs).
2. Per onderdeel een branch en een kleine PR: `claude/<hoofdmodule>-<onderdeel>`, bijv. `claude/print-plate-fill`.
3. Elke PR: kaartje met juridisch blok, tests, proeflink, uitleg in gewone taal.
4. Labels per hoofdmodule in GitHub, zodat je ziet waar iets bij hoort.
