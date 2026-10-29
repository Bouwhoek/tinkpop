# Pop-taal (motion-systeem), 29-10-2026

Signature van Tinkpop: dingen poppen erin, ploppen weg, en bij model klaar en downloaden een klein feestje.
Werkend prototype: `docs/brand/pop-prototype.js` (gebruikt in `docs/pages/gevoel.html`, tab Pop-speeltuin).

## Tokens
```css
:root{
 --pop-d-xs:80ms; --pop-d-sm:120ms; --pop-d-md:200ms; --pop-d-lg:280ms; --pop-d-xl:350ms; --pop-d-fx:600ms;
 --pop-ease-std:cubic-bezier(0.2,0,0,1); --pop-ease-out:cubic-bezier(0.05,0.7,0.1,1);
 --pop-ease-in:cubic-bezier(0.3,0,0.8,0.15); --pop-ease-back:cubic-bezier(0.34,1.56,0.64,1);
 --pop-amp:1;
}
@media (prefers-reduced-motion:reduce){:root{--pop-amp:0}}
:root[data-motion="calm"]{--pop-amp:0}
```

## De tien interacties
| Naam | Wanneer | Beweging | Duur | Extra | Rustig-stand |
|---|---|---|---|---|---|
| pop-in | iets opent | scale .6→1.06→1 + fade in | 280ms | zacht pop-geluid | fade 150ms |
| plop-out | categorie sluit | squash 1.05/.92 → 1.14 + fade uit; buren schuiven dicht | 200ms | 6 druppels, plop-geluid | fade 120ms |
| press | knop indrukken | scale .94→1.03→1 | 180ms | – | kleur |
| toggle | schakelaar | knop schiet 2px door | 200ms | tik | direct |
| render-pop | model klaar | scale .96→1.02→1 + gradiëntrand | 350ms | tink | alleen rand |
| burst | download gelukt | knop press + vinkje + 12 filamentsliertjes | 600ms | twee tonen, trilling (Android) | vinkje fade |
| wobble | fout | translateX ±6px + vriendelijke tekst | 300ms | geen geluid | rand + tekst |
| toast | melding | omhoog + scale .9→1; weg scale .96 + fade | 280/200ms | pop | fade |
| lift | slepen | scale 1.04, rotate 1.5°; landing scaleY .96 | 120ms | – | schaduw |
| count | getal verandert | translateY -4px, scale 1.15→1 | 120ms | tik | geen |

## Regels
- Alleen `transform` en `opacity`; nooit width/height/top/left; geen `transition: all`.
- Eén pop per handeling. Sluiten sneller dan openen. Groot feest alleen bij render-pop en burst.
- Alles werkt meteen; animatie is versiering, nooit wachten. Nieuwe klik breekt lopende animatie af.
- Geluid standaard uit (Web Audio, geen bestanden), knop in de header. Trillen alleen Android.
- `prefers-reduced-motion` en instelling "Rustig" → alleen fades (WCAG 2.3.3).
- Geen draaiende loaders, geen paginagrote zoom/parallax, geen confetti bij kleine dingen.
- Eén module `src/motion/` (tokens.css, pop.css, pop.js, burst.js, sound.js). Elementen krijgen `data-pop="press"` / `data-pop-open` / `data-pop-close`. CI verbiedt animaties buiten deze module, zodat ook community-generators automatisch hetzelfde poppen.
- Demopagina `/motion` als referentie bij reviews.
