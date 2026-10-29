import sys, os, maak_proef as m
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
from shapely.ops import unary_union
fname, names, (font, ffile), size, bed, method = m.TESTS[2]
placed = m.pack([m.keychain(n, font, ffile, size) for n in names], m.BEDS[bed])
fig, ax = plt.subplots(figsize=(6, 6), dpi=160)
bw, bh = m.BEDS[bed]
ax.add_patch(plt.Rectangle((0, 0), bw, bh, fc="#2b2d3a", ec="#555"))
def draw(mesh, dx, dy, fc, z, hole="#2b2d3a"):
    poly = unary_union([p for p in mesh.section(plane_origin=[0, 0, z], plane_normal=[0, 0, 1]).to_2D(to_2D=__import__("numpy").eye(4))[0].polygons_full])
    for g in getattr(poly, "geoms", [poly]):
        x, y = g.exterior.xy; ax.fill([a + dx for a in x], [b + dy for b in y], fc=fc, lw=0)
        for h in g.interiors:
            x, y = h.xy; ax.fill([a + dx for a in x], [b + dy for b in y], fc=hole, lw=0)
for k in placed:
    dx, dy = k["pos"]
    draw(k["base"], dx, dy, "#ffffff", 1.0)
    draw(k["text"], dx, dy, "#e23d8e", m.BASE_H + 0.6, hole="#ffffff")
ax.set_xlim(-2, bw + 2); ax.set_ylim(-2, bh + 2); ax.set_aspect("equal"); ax.axis("off")
ax.set_title(f"25 namen op een {bed} ({bw}×{bh} mm)", fontsize=11)
plt.savefig(sys.argv[1], bbox_inches="tight", facecolor="white")
