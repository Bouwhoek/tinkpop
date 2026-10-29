# 3MF-proef (B-145)

Testgereedschap, nog geen onderdeel van de site. Maakt 5 test-3MF's om te bewijzen dat de kleuren in Bambu Studio op het juiste AMS-slot komen (`docs/2-plan/mvp.md`).

```bash
apt-get install -y openscad && pip install trimesh numpy shapely scipy matplotlib
mkdir -p fonts && for f in titanone/TitanOne-Regular.ttf pacifico/Pacifico-Regular.ttf; do curl -sSfL -o fonts/$(basename $f) https://raw.githubusercontent.com/google/fonts/main/ofl/$f; done
python3 maak_proef.py out && python3 preview.py out/plaat-25-namen.png
```

Juridisch: eigen ontwerp uit algemene vormen (omtrek van de tekst + ring). Lettertypen OFL 1.1 (Titan One, Pacifico), niet in de repo. Idee voor methode A (kleurgroep + Prusa-gegevens) uit Open Keychain (MIT, capynq); geen code overgenomen. Geen code uit Bambu Studio of OrcaSlicer. Geen persoonsgegevens: de testnamen zijn voorbeelden.
