"""Draait de vaste testset (tests/golden/namen.json) door de proefmotor en vergelijkt met wat we verwachten."""
import json, os, re, sys
from fontTools.ttLib import TTFont
import maak_proef as m

ROOT = os.path.join(m.HERE, "..", "..")
MAX_W = 100  # mm: langer = waarschuwing

def normalize(name):
    return re.sub(r"\s+", " ", name).strip()

def judge(name, font_file, size):
    cmap = TTFont(os.path.join(m.FONTS, font_file)).getBestCmap()
    missing = [c for c in name if c != " " and ord(c) not in cmap]
    if missing:
        return "waarschuwing:teken-ontbreekt", {"ontbreekt": missing}
    k = m.keychain(name, m.TITAN[0], font_file, size)
    if not (k["base"].is_watertight and k["text"].is_watertight):
        return "fout:niet-dicht", {}
    info = {"mm": [round(float(k["w"]), 1), round(float(k["h"]), 1)]}
    return ("waarschuwing:lang" if k["w"] > MAX_W else "ok"), info

if __name__ == "__main__":
    spec = json.load(open(os.path.join(ROOT, "tests", "golden", "namen.json")))
    fails = 0
    for t in spec["namen"]:
        n = normalize(t["naam"])
        if "wordt" in t and n != t["wordt"]:
            print(f"FOUT  {t['naam']!r}: werd {n!r}, verwacht {t['wordt']!r}"); fails += 1; continue
        got, info = judge(n, m.TITAN[1], spec["grootte_mm"])
        ok = got == t["verwacht"]
        fails += not ok
        print(f"{'ok  ' if ok else 'FOUT'}  {n:24} {got:28} {info}")
    print(f"\n{len(spec['namen']) - fails}/{len(spec['namen'])} zoals verwacht")
    sys.exit(1 if fails else 0)
