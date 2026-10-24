"""Genera la captura estática (PNG) de cada ejemplo interactivo de `temas/` para el PDF y para navegadores sin WebGL.

Para cada <figure class="interactivo" data-escena=… data-params=…> de los temas:
  1. abre la escena sola, en su estado inicial (tema claro), con un Chromium sin interfaz,
  2. guarda `assets/img/int_<escena>[_<modo>].png` (900×440, solo el lienzo),
  3. añade (si falta) dentro de la figura `<img class="int-static" src="../assets/img/int_….png" …>`, que
     `assets/interactivos.css` muestra al imprimir y cuando no hay WebGL.

Uso:   python herramientas/capturar_interactivos.py [filtro…] [--chrome RUTA] [--sin-html]
Sin --chrome busca el Chromium de Playwright (~/.cache/ms-playwright o %LOCALAPPDATA%\\ms-playwright) o chrome/chromium del sistema.
Requisitos: solo un Chromium/Chrome. Si una captura sale en blanco, se reintenta.
"""
import argparse
import html
import json
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

RAIZ = pathlib.Path(__file__).resolve().parent.parent
TEMAS = RAIZ / "temas"
IMG = RAIZ / "assets" / "img"
ANCHO, ALTO = 900, 440
FIG = re.compile(r'<figure class="interactivo" data-escena="([\w-]+)" data-params=\'([^\']*)\'([^>]*)>')


def buscar_chrome(indicado=None):
    if indicado:
        return indicado
    for patron in ("chrome-headless-shell", "chrome-headless-shell.exe"):
        for base in (pathlib.Path.home() / ".cache" / "ms-playwright", pathlib.Path.home() / "AppData" / "Local" / "ms-playwright"):
            r = sorted(base.glob(f"chromium_headless_shell-*/**/{patron}")) if base.exists() else []
            if r:
                return str(r[-1])
    for n in ("chromium", "chromium-browser", "google-chrome", "chrome"):
        if shutil.which(n):
            return shutil.which(n)
    sys.exit("No encuentro un Chromium: usa --chrome RUTA")


def nombre(escena, params):
    modo = json.loads(params).get("modo")
    return f"int_{escena}" + (f"_{modo}" if modo else "")


def pagina(escena, params, tmp):
    css = RAIZ / "assets" / "interactivos.css"
    js = RAIZ / "assets" / "interactivos.js"
    res = RAIZ / "assets" / "resumen.css"
    p = tmp / f"{escena}.html"
    p.write_text(f"""<!doctype html><meta charset="utf-8">
<link rel="stylesheet" href="{res.as_uri()}"><link rel="stylesheet" href="{css.as_uri()}">
<style>body{{margin:0;background:#fbfaf6;overflow:hidden}}
figure.interactivo{{margin:0;border:0;border-radius:0;width:{ANCHO}px}}
figure.interactivo .int-stage{{aspect-ratio:auto;height:{ALTO}px;max-height:none}}
figure.interactivo .int-ctl,figure.interactivo .int-ro,figure.interactivo .int-leg,figure.interactivo figcaption,.int-hint,.int-reset,.int-static{{display:none!important}}</style>
<script src="{js.as_uri()}"></script>
<figure class="interactivo" data-escena="{escena}" data-params='{params}'><figcaption>x</figcaption></figure>
<script>setInterval(function(){{document.title=Date.now()}},100)</script>""", encoding="utf8")
    return p


def captura_cruda(chrome, pag, destino):
    subprocess.run([chrome, "--no-sandbox", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader",
                    "--allow-file-access-from-files", f"--window-size={ANCHO},{ALTO}", "--virtual-time-budget=15000",
                    "--run-all-compositor-stages-before-draw", f"--screenshot={destino}", pag.as_uri()],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def capturar(chrome, pag, destino, blanco, intentos=6):
    """Reintenta hasta que la imagen no sea idéntica a la de la página vacía (Chromium sin interfaz a veces captura antes de pintar)."""
    for _ in range(intentos):
        captura_cruda(chrome, pag, destino)
        if destino.exists() and destino.read_bytes() != blanco:
            return True
    return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("filtro", nargs="*")
    ap.add_argument("--chrome")
    ap.add_argument("--sin-html", action="store_true", help="no tocar los HTML")
    ap.add_argument("--forzar", action="store_true", help="rehacer también las capturas que ya existen")
    a = ap.parse_args()
    chrome = buscar_chrome(a.chrome)
    IMG.mkdir(exist_ok=True)
    hechos, fallos = {}, []
    with tempfile.TemporaryDirectory() as t:
        tmp = pathlib.Path(t)
        vacia = tmp / "vacia.html"
        vacia.write_text('<!doctype html><meta charset="utf-8"><body style="margin:0;background:#fbfaf6">', encoding="utf8")
        captura_cruda(chrome, vacia, tmp / "vacia.png")
        # la página vacía de referencia lleva el mismo fondo; las capturas reales llevan además el lienzo
        blanco = (tmp / "vacia.png").read_bytes()
        for ruta in sorted(TEMAS.glob("tema_*.html")):
            txt = ruta.read_text(encoding="utf8")
            nuevo = txt
            for m in FIG.finditer(txt):
                escena, params, resto = m.groups()
                nom = nombre(escena, params)
                if a.filtro and not any(f in nom or f in ruta.name for f in a.filtro):
                    continue
                if nom not in hechos:
                    destino = IMG / f"{nom}.png"
                    if destino.exists() and not a.forzar and destino.read_bytes() != blanco:
                        ok = True
                    else:
                        ok = capturar(chrome, pagina(escena, params, tmp), destino, blanco)
                    hechos[nom] = ok
                    print(("ok    " if ok else "FALLO ") + nom)
                    if not ok:
                        fallos.append(nom)
                if hechos[nom] and not a.sin_html:
                    alt = re.search(r'aria-label="([^"]*)"', resto)
                    etiqueta = f'<img class="int-static" src="../assets/img/{nom}.png" alt="{alt.group(1) if alt else "Captura del ejemplo interactivo"}">'
                    if f"assets/img/{nom}.png" not in nuevo:
                        nuevo = nuevo.replace(m.group(0), m.group(0) + "\n  " + etiqueta, 1)
            if nuevo != txt:
                ruta.write_text(nuevo, encoding="utf8")
                print("  html:", ruta.name)
    if fallos:
        sys.exit("Sin captura: " + ", ".join(fallos))


if __name__ == "__main__":
    main()
