"""Exporta los resúmenes HTML de `temas/` a PDF (A4, blanco y negro, listo para imprimir).

Usa la hoja de impresión de assets/resumen.css (@media print): sin fuentes, sin «fuera de examen»,
soluciones desplegadas y saltos de página ordenados. Los PDF van a `pdf/` (ignorado por git: *.pdf).

Uso (desde la carpeta del proyecto o desde cualquier sitio):
  python herramientas/exportar_pdf.py                  # todos los temas
  python herramientas/exportar_pdf.py 1_2 2_1          # solo los temas cuyo nombre contenga esos textos
  python herramientas/exportar_pdf.py --unir todo.pdf  # además, un PDF único con marcadores por tema

Requisitos: `pip install playwright pymupdf` y un Chromium de Playwright (`playwright install chromium`).
"""
import argparse
import html
import pathlib
import re
import sys

from playwright.sync_api import sync_playwright

RAIZ = pathlib.Path(__file__).resolve().parent.parent
TEMAS = RAIZ / "temas"
SALIDA = RAIZ / "pdf"


def titulo(ruta: pathlib.Path) -> str:
    m = re.search(r"<title>(.*?)</title>", ruta.read_text(encoding="utf8"), re.S)
    return html.unescape(m.group(1).strip()) if m else ruta.stem


def exportar(paginas, destinos):
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        for ruta, pdf in zip(paginas, destinos):
            pg.goto(ruta.as_uri())
            pg.wait_for_function("document.querySelector('.katex') !== null", timeout=30000)
            pg.evaluate("document.fonts.ready")
            pg.emulate_media(media="print")
            pg.evaluate("document.querySelectorAll('details.sol').forEach(x => x.open = true)")
            pg.wait_for_timeout(400)
            cab = ('<div style="font:8px system-ui,sans-serif;color:#555;width:100%;padding:0 15mm;text-align:right">'
                   + html.escape(titulo(ruta)) + '</div>')
            pg.pdf(path=str(pdf), prefer_css_page_size=True, print_background=True,
                   display_header_footer=True, header_template=cab, footer_template="<span></span>")
            print("OK ", pdf.relative_to(RAIZ))
        b.close()


def unir(pdfs, titulos, destino):
    import pymupdf
    doc = pymupdf.open()
    toc = []
    for pdf, t in zip(pdfs, titulos):
        toc.append([1, t, len(doc) + 1])
        doc.insert_pdf(pymupdf.open(str(pdf)))
    doc.set_toc(toc)
    doc.save(str(destino), garbage=3, deflate=True)
    print("OK ", destino.relative_to(RAIZ), "(%d páginas)" % len(doc))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("filtro", nargs="*", help="textos que debe contener el nombre del tema")
    ap.add_argument("--unir", metavar="ARCHIVO.pdf", help="crear también un PDF único con todos los temas exportados")
    a = ap.parse_args()

    paginas = sorted(TEMAS.glob("*.html"))
    if a.filtro:
        paginas = [x for x in paginas if any(f in x.name for f in a.filtro)]
    if not paginas:
        sys.exit("No hay temas que coincidan.")
    SALIDA.mkdir(exist_ok=True)
    destinos = [SALIDA / (x.stem + ".pdf") for x in paginas]
    exportar(paginas, destinos)
    if a.unir:
        unir(destinos, [titulo(x) for x in paginas], SALIDA / a.unir)


if __name__ == "__main__":
    main()
