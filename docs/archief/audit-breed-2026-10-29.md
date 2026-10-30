# Brede audit van het concept (29-10-2026)

Een onafhankelijke controleur las alle documenten en de 50-sites-blauwdruk, en keek naar zestien gebieden. Oordeel: het concept staat, maar het is nog niet klaar om te lanceren. Je ging vier keer tegen het advies in (inloggen vanaf dag één, klik = live, geen testgroep, eigen font); dat mag, maar dan moeten de vangnetten erbij. Die staan nu als groep I bij Goedkeuren.

## Klaar om te lanceren (0–5)

| Gebied | Score |
|---|---|
| Product | 2 |
| Gebruiksgemak | 3 |
| Toegankelijkheid | 1 |
| Architectuur | 3 |
| Snelheid | 2 |
| Beveiliging | 1 |
| Privacy en recht | 1 |
| Licenties | 2 |
| Community | 2 |
| Groei en vindbaarheid | 2 |
| Merk | 2 |
| Geld | 3 |
| Beheer en vervanging | 1 |
| Afhankelijkheden | 3 |
| Focus | 1 |
| Risico voor jou als eigenaar | 1 |

## Wat er moet veranderen
- **[blocker] Inloggen vanaf dag één zonder plan.** Er staat nog niets over hoe inloggen veilig wordt: bibliotheek, sessies, limieten. En met inloggen geldt de AVG meteen volledig. *Voorstel:* Onderhouden inlogbibliotheek met e-maillink + passkey, veilige cookies, limieten. Beheer alleen via Cloudflare Access. AVG-pakket klaar vóór livegang (privacyverklaring, register, verwerkersovereenkomsten, bewaartermijn, exporteren/verwijderen, datalek-procedure).
- **[blocker] 'Klik = live' kan de site duur en kwetsbaar maken.** Als elke pagina bij Cloudflare de schakelaars opvraagt, verlies je de gratis statische site en loop je tegen de limiet van 100.000 per dag. En het bord kan iets aanzetten waarvan een onderdeel ontbreekt. *Voorstel:* Schakelaars in één bestand dat de browser elke minuut ophaalt. Het bord zet alleen geteste modules aan/uit, controleert afhankelijkheden, vraagt 2× bevestiging, logt alles, toont 10 minuten een ongedaan-knop en heeft een veilige stand. Nieuwe code blijft via voorstel + proeflink.
- **[blocker] Jij keurt voorstellen goed die je niet kunt lezen.** Een AI-samenvatting kan worden misleid door tekst in het voorstel zelf. *Voorstel:* De samenvatting is alleen advies. De echte poorten zijn automatisch: alleen de eigen map, alleen .scad, geen nieuwe pakketten, render + plaatje, en jij test de proeflink.
- **[blocker] Alles hangt aan jou.** Als jij uitvalt of je account kwijt raakt, ligt alles stil. *Voorstel:* Draaiboek van één pagina, overzicht waar de geheimen staan, domein automatisch verlengen, passkeys op GitHub/Cloudflare/e-mail, herstelcodes in een envelop bij iemand die je vertrouwt.
- **[high] Een naamsleutelhanger alleen onderscheidt niet.** Er zijn er al vijf goede, waaronder MakerWorld zelf. *Voorstel:* Plaat vullen (H1) en 25 namen tegelijk (H2) naar fase 1; de clicker als tweede generator.
- **[high] Inloggen mag downloaden nooit blokkeren.** Een inlogmuur jaagt bijna iedereen weg. *Voorstel:* Downloaden zonder account; inloggen in fase 1 alleen voor bewaren in de cloud.
- **[high] Licentie van gemaakte bestanden.** CC BY op elke gemaakte sleutelhanger betekent dat iedere verkoper credit moet geven. *Voorstel:* Generator CC BY 4.0, gemaakte bestanden vrij. Alleen vrije licenties (geen NC/ND). Twemoji in plaats van OpenMoji.
- **[high] Plakken uit MakerWorld nodigt uit tot licentiewitwassen.** De standaardlicentie op MakerWorld is niet open. *Voorstel:* H9 uitstellen tot er bewijs van de echte maker gevraagd wordt.
- **[high] SVG en eigen fonts zijn onveilige bestanden.** Een SVG kan code bevatten; een font is een binair bestand. *Voorstel:* SVG: alleen de vormen eruit halen. Font: alleen in je browser, max. 8 MB, nooit bewaard of gedeeld.
- **[high] Telefoon is 4–6× trager dan de meting.** 117 ms op een laptop wordt 500–700 ms op een goedkope Android. *Voorstel:* Testtelefoon benoemen en meten in fase 0; eerst een ruwe vorm; .scad-presets max. 2 s.
- **[high] Pinkpop is één letter verschil.** Bekende merken zijn ook buiten hun eigen categorie beschermd. Zelf zoeken in TMview is niet genoeg. *Voorstel:* Een half uur bij een merkenjurist (± €150), daarna registreren bij BOIP (vanaf ± €250).
- **[high] Geen testgroep + inloggen + klik = live stapelt het risico.** Fouten komen dan pas aan het licht als er veel bezoekers zijn. *Voorstel:* Stille lancering: twee weken live zonder aankondiging, met meldingen aan.
- **[high] Toegankelijkheid scoort 1 van 5.** De vaste downloadbalk kan velden verbergen; het 3D-beeld werkt alleen met slepen. *Voorstel:* Focus vrijhouden, draai- en zoomknoppen, gesproken melding 'model bijgewerkt', kleuren met naam.
- **[high] Fase 1 is te vol.** Zo'n 25 punten plus inloggen, fonts en het bord, terwijl NotMadeYet op 25 november gaat posten. *Voorstel:* Fase 1 bevriezen op een korte lijst; de rest wacht.
- **[medium] Documenten spraken elkaar tegen.** Bible en roadmap noemden nog 'geen login', 'testgroep', Pages en pnpm. *Voorstel:* Rechtgezet in bible v0.3, roadmap en blauwdruk.

## Uitstellen of schrappen (blauwdruk)
- **A5**: Geen Simpel/Pro-schakelaar; wel groepen en tik op een getal voor exacte mm (aangepast).
- **A14**: Uitstellen: icoon op de i vraagt werk per font.
- **B1**: Tellers pas als er echte cijfers zijn; lage tellers ogen dood.
- **B3**: Maandelijks in plaats van wekelijks.
- **B4**: Pas vanaf 20 actieve makers.
- **C3**: Pas na de DSA-basis (meldknop, contactpunt).
- **E1**: Niet binnen Tinkpop; NotMadeYet blijft apart.
- **F2**: Eerst de voorwaarden van MakerWorld checken.
- **H3**: Pas na juridische check met scholen.
- **H9**: Uitstellen: risico op licentiewitwassen.
- **H10**: Na fase 2.
- **H1, H2**: Juist naar voren: fase 1, dit is wat ons onderscheidt.

## Oordeel
Fase 0 (de proef) kan vandaag beginnen. Publiek lanceren pas als de voorwaarden in groep I klaar zijn: AVG en inloggen, het bord met vangnetten, harde poorten op voorstellen, veilige SVG en fonts, merkadvies, stille lancering, draaiboek en meldingen.

Vragen aan de eigenaar: zie artifact https://claude.ai/artifact/V5bqeWw88NyNBd9jAKg91q (tab Vragen); antwoorden in document `blauwdruk/answers`.
