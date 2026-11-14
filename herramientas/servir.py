"""Sirve la carpeta del proyecto en http://localhost:8000 (hace falta para ver las figuras SVG de carga perezosa).

  python herramientas/servir.py [puerto]
"""
import functools
import http.server
import pathlib
import sys
import webbrowser

RAIZ = pathlib.Path(__file__).resolve().parent.parent
puerto = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(RAIZ))
print(f"Sirviendo {RAIZ} en http://localhost:{puerto}/index.html (Ctrl+C para parar)")
try:
    webbrowser.open(f"http://localhost:{puerto}/index.html")
except Exception:
    pass
http.server.ThreadingHTTPServer(("127.0.0.1", puerto), h).serve_forever()
