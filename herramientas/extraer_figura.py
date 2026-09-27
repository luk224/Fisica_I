#!/usr/bin/env python
"""Recorta figuras del libro oficial (U) para usarlas en los resúmenes HTML (sin gastar tokens en SVG).

Uso (páginas = número de página del PDF, empieza en 1; impresa U = PDF-28):
  python herramientas/extraer_figura.py list  U 75                 # lista figuras candidatas y pies de figura
  python herramientas/extraer_figura.py auto  U 75 "Figura 11.2" fig_u_11_2   # detecta el dibujo sobre el pie
  python herramientas/extraer_figura.py crop  U 84 "60,80,520,400" fig_u_11_3a # recorte manual x0,y0,x1,y1 (puntos PDF)
  python herramientas/extraer_figura.py page  U 340 pag_u_340       # página completa (para mirarla y decidir el recorte)
Salida: assets/img/<nombre>.png (200 dpi). Usar luego en el HTML:
  <figure class="bookfig"><img src="../assets/img/<nombre>.png" alt="..." loading="lazy"><figcaption>… <span class="src" ...></span></figcaption></figure>
"""
import sys, glob, os
try:
    import pymupdf as fitz
except ImportError:
    import fitz  # PyMuPDF

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOOKS = {"U": lambda p: "fisica_universitara" in p.lower() or "fisica universitaria" in p.lower(),
         "E": lambda p: "instructors_solutions" in p.lower() or "solutions_manual" in p.lower()}
DPI = 200


def open_book(key):
    for p in glob.glob(os.path.join(os.path.dirname(ROOT), "*.pdf")):
        if BOOKS[key](p):
            return fitz.open(p)
    sys.exit(f"No encuentro el PDF del libro {key}")


def clusters(page, gap=14):
    """Rectángulos de dibujos vectoriales/imágenes fusionados por cercanía."""
    rects = [d["rect"] for d in page.get_drawings() if d["rect"].width > 1 or d["rect"].height > 1]
    rects += [fitz.Rect(i["bbox"]) for i in page.get_image_info()]
    rects = [fitz.Rect(r) for r in rects if r.width * r.height > 20]
    merged = True
    while merged:
        merged = False
        out = []
        for r in rects:
            for o in out:
                if (r + (-gap, -gap, gap, gap)).intersects(o):
                    o |= r
                    merged = True
                    break
            else:
                out.append(fitz.Rect(r))
        rects = out
    return [r for r in rects if r.width > 40 and r.height > 25]


def save(page, rect, name, pad=4):
    rect = (rect + (-pad, -pad, pad, pad)) & page.rect
    pix = page.get_pixmap(clip=rect, dpi=DPI)
    os.makedirs(os.path.join(ROOT, "assets", "img"), exist_ok=True)
    out = os.path.join(ROOT, "assets", "img", name + ".png")
    pix.save(out)
    print(f"OK {out}  ({pix.width}x{pix.height}px, {os.path.getsize(out)//1024} KB)  rect={tuple(round(v) for v in rect)}")


def main():
    if len(sys.argv) < 4:
        sys.exit(__doc__)
    cmd, book, pg = sys.argv[1], sys.argv[2].upper(), int(sys.argv[3])
    doc = open_book(book)
    page = doc[pg - 1]
    if cmd == "list":
        print(f"{book} PDF p.{pg}  tamaño página {tuple(round(v) for v in page.rect)}")
        for i, r in enumerate(clusters(page)):
            print(f"  figura candidata {i}: {r.x0:.0f},{r.y0:.0f},{r.x1:.0f},{r.y1:.0f}")
        for b in page.get_text("blocks"):
            t = b[4].strip().replace("\n", " ")
            if t.lower().startswith(("figura", "fig.", "gráfica", "figure")):
                print(f"  pie: {t[:70]!r} en y={b[1]:.0f}..{b[3]:.0f}")
    elif cmd == "auto":
        cap, name = sys.argv[4], sys.argv[5]
        hits = page.search_for(cap)
        if not hits:
            sys.exit(f"No encuentro el pie «{cap}» en la página {pg} (usa list/page y crop)")
        top = hits[0].y0
        cand = [r for r in clusters(page) if r.y1 <= top + 6]
        if not cand:
            sys.exit("No hay dibujo sobre el pie; usa crop con coordenadas")
        save(page, max(cand, key=lambda r: r.y1), name)
    elif cmd == "crop":
        x0, y0, x1, y1 = (float(v) for v in sys.argv[4].split(","))
        save(page, fitz.Rect(x0, y0, x1, y1), sys.argv[5], pad=0)
    elif cmd == "page":
        save(page, page.rect, sys.argv[4], pad=0)
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()
