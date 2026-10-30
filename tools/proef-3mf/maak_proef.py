"""Tinkpop 3MF-proef (B-145): maakt test-3MF's voor Bambu Studio.

Eigen ontwerp uit algemene onderdelen: plaatje = verdikte omtrek van de tekst + ring met gat.
Twee manieren om de kleur mee te geven, om te testen welke Bambu Studio goed leest:
  A  kleurgroep per driehoek (3MF Materials Extension), idee uit Open Keychain (MIT)
  B  losse onderdelen met filamentnummer per onderdeel (Bambu-projectgegevens)
"""
import io, json, os, subprocess, sys, tempfile, zipfile
import numpy as np, trimesh

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "fonts")
BASE_H, TEXT_H = 2.4, 1.2          # mm: 12 + 6 lagen van 0,2 mm
PAD, RING_R, HOLE_R = 2.5, 2.5, 1.9
COLORS = {"base": "#FFFFFF", "text": "#E23D8E"}   # wit plaatje, roze tekst
BEDS = {"A1 mini": (180, 180), "A1": (256, 256)}

SCAD = r'''
use <{font_file}>
$fn = 40;
module t() text("{name}", size={size}, font="{font}", halign="left", valign="center");
ring_x = -({pad} + {ring_r});
module base2d() difference() {{
  offset(r=-1.5) offset(r={pad} + 1.5) union() {{ t(); translate([ring_x, 0]) circle(r={ring_r}); }}
  translate([ring_x, 0]) circle(r={hole_r});
}}
if (PART == "base") linear_extrude({base_h}) base2d();
else translate([0, 0, {base_h}]) linear_extrude({text_h}) offset(r=-0.05) offset(r=0.05) t();  // sluit punten waar lijnen elkaar raken (bijv. Ç)
'''

def scad_mesh(name, font, font_file, size, part):
    src = SCAD.format(font_file=os.path.join(FONTS, font_file), name=name.replace('"', '\\"'),
                      size=size, font=font, pad=PAD, ring_r=RING_R, hole_r=HOLE_R,
                      base_h=BASE_H, text_h=TEXT_H)
    with tempfile.TemporaryDirectory() as d:
        scad, stl = os.path.join(d, "k.scad"), os.path.join(d, "k.stl")
        open(scad, "w").write(src)
        r = subprocess.run(["openscad", "-q", "-D", f'PART="{part}"', "-o", stl, scad],
                           capture_output=True, text=True)
        if r.returncode or not os.path.exists(stl):
            raise RuntimeError(f"openscad faalde voor {name}/{part}: {r.stderr}")
        m = trimesh.load(stl)
    m.merge_vertices()
    return m

def keychain(name, font, font_file, size):
    base = scad_mesh(name, font, font_file, size, "base")
    text = scad_mesh(name, font, font_file, size, "text")
    lo, hi = base.bounds
    shift = [-(lo[0] + hi[0]) / 2, -(lo[1] + hi[1]) / 2, 0]   # midden op (0,0), onderkant z = 0
    base.apply_translation(shift); text.apply_translation(shift)
    return {"name": name, "base": base, "text": text, "w": hi[0] - lo[0], "h": hi[1] - lo[1]}

def pack(items, bed, margin=8, gap=4):
    """Eenvoudige plankverdeling: rijen van links naar rechts, hoogste eerst."""
    bw, bh = bed
    order = sorted(items, key=lambda k: (-k["h"], -k["w"]))
    x, y, row_h, placed = margin, margin, 0, []
    for k in order:
        if x + k["w"] > bw - margin:
            x, y, row_h = margin, y + row_h + gap, 0
        if y + k["h"] > bh - margin:
            raise RuntimeError(f"past niet op de plaat: {k['name']}")
        k["pos"] = (x + k["w"] / 2, y + k["h"] / 2)
        x += k["w"] + gap; row_h = max(row_h, k["h"])
        placed.append(k)
    # hele groep midden op de plaat
    xs = [k["pos"][0] + s * k["w"] / 2 for k in placed for s in (-1, 1)]
    ys = [k["pos"][1] + s * k["h"] / 2 for k in placed for s in (-1, 1)]
    dx, dy = bw / 2 - (min(xs) + max(xs)) / 2, bh / 2 - (min(ys) + max(ys)) / 2
    for k in placed:
        k["pos"] = (k["pos"][0] + dx, k["pos"][1] + dy)
    return placed

def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;").replace("'", "&apos;")

def mesh_xml(parts):
    """parts: [(mesh, colorindex or None)] -> één <mesh> (A) of los per onderdeel (B)."""
    v, t, off = [], [], 0
    for mesh, ci in parts:
        v += [f'<vertex x="{a:.4f}" y="{b:.4f}" z="{c:.4f}"/>' for a, b, c in mesh.vertices]
        prop = "" if ci is None else f' pid="10" p1="{ci}" p2="{ci}" p3="{ci}"'
        t += [f'<triangle v1="{a+off}" v2="{b+off}" v3="{c+off}"{prop}/>' for a, b, c in mesh.faces]
        off += len(mesh.vertices)
    return f'<mesh><vertices>{"".join(v)}</vertices><triangles>{"".join(t)}</triangles></mesh>'

CT = '''<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
 <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
 <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>
 <Default Extension="config" ContentType="text/xml"/>
 <Default Extension="txt" ContentType="text/plain"/>
</Types>'''
RELS = '''<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
 <Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>
</Relationships>'''

def write_3mf(path, placed, method, title, credits):
    files = {"[Content_Types].xml": CT, "_rels/.rels": RELS, "Metadata/credits.txt": credits}
    head = ('<?xml version="1.0" encoding="UTF-8"?>\n<model unit="millimeter" xml:lang="en-US" '
            'xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" '
            'xmlns:m="http://schemas.microsoft.com/3dmanufacturing/material/2015/02">\n')
    meta = f' <metadata name="Title">{esc(title)}</metadata>\n <metadata name="Designer">Tinkpop</metadata>\n'
    res, build = [], []
    if method == "A":
        res.append(f'<basematerials id="11"><base name="Base" displaycolor="{COLORS["base"]}"/>'
                   f'<base name="Text" displaycolor="{COLORS["text"]}"/></basematerials>')
        res.append(f'<m:colorgroup id="10"><m:color color="{COLORS["base"]}"/><m:color color="{COLORS["text"]}"/></m:colorgroup>')
        prusa = []
        for i, k in enumerate(placed, 1):
            res.append(f'<object id="{i}" type="model" name="{esc(k["name"])}" pid="10" pindex="0">'
                       f'{mesh_xml([(k["base"], 0), (k["text"], 1)])}</object>')
            build.append(f'<item objectid="{i}" transform="1 0 0 0 1 0 0 0 1 {k["pos"][0]:.3f} {k["pos"][1]:.3f} 0"/>')
            nb = len(k["base"].faces); nt = len(k["text"].faces)
            prusa.append(f'<object id="{i}" instances_count="1"><metadata type="object" key="name" value="{esc(k["name"])}"/>'
                         f'<volume firstid="0" lastid="{nb-1}"><metadata type="volume" key="name" value="Base"/><metadata type="volume" key="extruder" value="1"/></volume>'
                         f'<volume firstid="{nb}" lastid="{nb+nt-1}"><metadata type="volume" key="name" value="Text"/><metadata type="volume" key="extruder" value="2"/></volume></object>')
        files["Metadata/Slic3r_PE_model.config"] = '<?xml version="1.0" encoding="UTF-8"?>\n<config>' + "".join(prusa) + "</config>"
    else:
        meta += ' <metadata name="Application">BambuStudio-02.00.00.00</metadata>\n <metadata name="BambuStudio:3mfVersion">1</metadata>\n'
        cfg, inst = [], []
        nid = 1
        for i, k in enumerate(placed):
            bid, tid, oid = nid, nid + 1, nid + 2; nid += 3
            res.append(f'<object id="{bid}" type="model">{mesh_xml([(k["base"], None)])}</object>')
            res.append(f'<object id="{tid}" type="model">{mesh_xml([(k["text"], None)])}</object>')
            res.append(f'<object id="{oid}" type="model" name="{esc(k["name"])}"><components>'
                       f'<component objectid="{bid}"/><component objectid="{tid}"/></components></object>')
            build.append(f'<item objectid="{oid}" transform="1 0 0 0 1 0 0 0 1 {k["pos"][0]:.3f} {k["pos"][1]:.3f} 0" printable="1"/>')
            cfg.append(f'<object id="{oid}"><metadata key="name" value="{esc(k["name"])}"/><metadata key="extruder" value="1"/>'
                       f'<part id="{bid}" subtype="normal_part"><metadata key="name" value="Base"/><metadata key="extruder" value="1"/></part>'
                       f'<part id="{tid}" subtype="normal_part"><metadata key="name" value="Text"/><metadata key="extruder" value="2"/></part></object>')
            inst.append(f'<model_instance><metadata key="object_id" value="{oid}"/><metadata key="instance_id" value="0"/>'
                        f'<metadata key="identify_id" value="{100 + i}"/></model_instance>')
        files["Metadata/model_settings.config"] = ('<?xml version="1.0" encoding="UTF-8"?>\n<config>' + "".join(cfg) +
            '<plate><metadata key="plater_id" value="1"/><metadata key="plater_name" value=""/><metadata key="locked" value="false"/>'
            + "".join(inst) + "</plate></config>")
    files["3D/3dmodel.model"] = head + meta + " <resources>" + "".join(res) + "</resources>\n <build>" + "".join(build) + "</build>\n</model>"
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
        for n, s in files.items():
            z.writestr(n, s)

def check(placed, bed):
    out = []
    for k in placed:
        for part in ("base", "text"):
            m = k[part]
            if not m.is_watertight or m.volume <= 0:
                out.append(f"{k['name']}/{part}: niet dicht")
        x, y = k["pos"]
        if x - k["w"] / 2 < 0 or x + k["w"] / 2 > bed[0] or y - k["h"] / 2 < 0 or y + k["h"] / 2 > bed[1]:
            out.append(f"{k['name']}: buiten de plaat")
    return out

TITAN = ("Titan One", "TitanOne-Regular.ttf")
PACIFICO = ("Pacifico", "Pacifico-Regular.ttf")
CLASS = ["Emma", "Noah", "Julia", "Liam", "Sophie", "Lucas", "Mila", "Sem", "Tess", "Finn", "Zoë", "Daan", "Sara",
         "Levi", "Nora", "Bram", "Evi", "Luuk", "Lotte", "Mees", "Fenna", "Jesse", "Isa", "Thijs", "Anna"]
TESTS = [
    ("proef-1A-een-naam-kleurgroep", ["Tinkpop"], TITAN, 10, "A1 mini", "A"),
    ("proef-1B-een-naam-onderdelen", ["Tinkpop"], TITAN, 10, "A1 mini", "B"),
    ("proef-2-klas-25-namen-A1-mini", CLASS, TITAN, 8, "A1 mini", "B"),
    ("proef-3-accenten", ["Zoë", "Åsa", "Ömer", "Çağla", "O'Brien", "José", "Søren", "Łukasz", "Renée"], TITAN, 9, "A1 mini", "B"),
    ("proef-4-dunne-letters", ["Iiiiii", "Lily", "Jill", "Bill", "Milou"], PACIFICO, 10, "A1 mini", "B"),
]

if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "out")
    os.makedirs(out, exist_ok=True)
    report = {}
    for fname, names, (font, ffile), size, bed, method in TESTS:
        items = [keychain(n, font, ffile, size) for n in names]
        placed = pack(items, BEDS[bed])
        credits = (f"Made with Tinkpop (test). Font: {font}, SIL Open Font License 1.1. "
                   "Printed objects are free to use. Not a toy. Small parts. Test your print.\n")
        write_3mf(os.path.join(out, fname + ".3mf"), placed, method, fname, credits)
        report[fname] = {"namen": len(placed), "methode": method, "plaat": bed,
                         "fouten": check(placed, BEDS[bed]),
                         "maten_mm": {k["name"]: [round(k["w"], 1), round(k["h"], 1)] for k in placed}}
        print(fname, "ok" if not report[fname]["fouten"] else report[fname]["fouten"])
    json.dump(report, open(os.path.join(out, "rapport.json"), "w"), ensure_ascii=False, indent=1)
