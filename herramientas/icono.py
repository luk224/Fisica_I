"""Pone el icono de la pestaña (favicon SVG en línea) en todas las páginas públicas. Idempotente: python herramientas/icono.py
Lo llama la construcción al terminar; si una página se regenera sin él, basta volver a ejecutarlo."""
import pathlib
import re
import sys
from urllib.parse import quote

RAIZ = pathlib.Path(__file__).resolve().parent.parent
SVG = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#2f5bd8"/>'
       '<text x="32" y="46" font-family="Georgia,serif" font-size="40" font-weight="700" text-anchor="middle" fill="#fff">F</text></svg>')
LINK = '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,' + quote(SVG) + '">'
EXCLUIR = ('pdf', 'assets', 'contenido', 'datos', 'fuentes_txt', 'pruebas', 'herramientas', 'anki', 'node_modules', '.git', '.github', 'html_fuente')


def paginas():
    for f in RAIZ.rglob('*.html'):
        rel = f.relative_to(RAIZ).parts
        if rel[0] in EXCLUIR or f.name.startswith(('_tmp', 'plantilla')):
            continue
        yield f


def main():
    n = 0
    for f in paginas():
        s = f.read_text(encoding='utf8', newline='')
        if 'rel="icon"' in s or '<head' not in s:
            continue
        t, k = re.subn(r'(<meta[^>]*charset[^>]*>)', lambda m: m.group(1) + LINK, s, count=1, flags=re.I)
        if k == 0:
            t = re.sub(r'(<head[^>]*>)', lambda m: m.group(1) + LINK, s, count=1)
        f.write_text(t, encoding='utf8', newline='')
        n += 1
    print(f'icono: {n} páginas actualizadas')


if __name__ == '__main__':
    sys.exit(main())
