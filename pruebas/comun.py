"""Utilidades comunes de las pruebas."""
import contextlib
import functools
import http.server
import os
import pathlib
import re
import shutil
import subprocess
import threading

RAIZ = pathlib.Path(__file__).resolve().parent.parent
TEMAS = RAIZ / 'temas'
CONTENIDO = RAIZ / 'contenido'

# Páginas de inicio de cada tema en U (página impresa; CLAUDE.md §2). El capítulo 20 llega hasta la 682 con sus problemas (comprobado en sears.txt).
INICIO_U = {1: 2, 2: 36, 3: 68, 4: 102, 5: 130, 6: 172, 7: 204, 8: 238, 9: 274, 10: 304, 11: 340, 12: 370, 13: 400, 14: 434,
            15: 470, 16: 506, 17: 546, 18: 584, 19: 618, 20: 647}
FIN_U = {n: (INICIO_U[n + 1] - 1 if n < 20 else 682) for n in INICIO_U}


def paginas_tema():
    """Páginas de temas numerados: [(num, ruta)]."""
    out = []
    for p in sorted(TEMAS.glob('tema_*.html')):
        m = re.match(r'tema_(\d+)_', p.name)
        if m:
            out.append((int(m.group(1)), p))
    return out


def leer(p):
    return pathlib.Path(p).read_text(encoding='utf8').replace('\r\n', '\n')


def chrome():
    if os.environ.get('CHROME'):
        return os.environ['CHROME']
    for g in ('~/.cache/ms-playwright/chromium-*/chrome-linux*/chrome', '~/.cache/ms-playwright/chromium-*/chrome-win*/chrome.exe'):
        c = sorted(pathlib.Path('~').expanduser().glob(g.replace('~/', '')))
        if c:
            return str(c[-1])
    for n in ('google-chrome', 'chromium', 'chromium-browser', 'chrome'):
        w = shutil.which(n)
        if w:
            return w
    return None


@contextlib.contextmanager
def servidor():
    h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(RAIZ))
    h.log_message = lambda *a, **k: None
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    try:
        yield f'http://127.0.0.1:{srv.server_address[1]}/'
    finally:
        srv.shutdown()


def volcar_dom(url, alto=60000, ms=9000):
    """DOM final de la página tras ejecutar su JavaScript (Chrome sin interfaz)."""
    c = chrome()
    r = subprocess.run([c, '--headless=new', '--no-sandbox', '--disable-gpu', f'--virtual-time-budget={ms}', f'--window-size=1100,{alto}',
                        '--dump-dom', url], capture_output=True, text=True, encoding='utf8', timeout=180)
    return r.stdout
