"""Figuras de «planteamiento» de los problemas de examen: el esquema con datos e incógnitas y un diagrama de cuerpo libre (DCL) por cuerpo,
con los ejes elegidos y sin resultados, tal como se dibujaría al empezar el problema en el examen.

Uso (script temporal):
    import sys; sys.path.insert(0, 'herramientas')
    from planteamiento import *
    b = [*dcl('x1', 90, 250, [(270, 'm_{1}g', 'b'), (115, 'n_{1}', 'a'), (25, 'T', 'g')], 'DCL de m_{1}', eje=205), ...]
    registrar(5, 'x1-planteamiento', 'texto alternativo', '0 0 360 400', b, 'pie')
Después, `{{fig:x1-planteamiento}}` en el .html del ejercicio y `python3 herramientas/tema_datos.py generar N`.
Ángulos en grados, antihorarios, con y hacia arriba. Colores como en figuras_svg: a=normal, b=peso, g=tensión, p=fricción, f=otras.
"""
import json
import math
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from figuras_svg import ar, ln, t, dot, path, poly_fill, rect, circ, arc, fig, COL  # noqa: E402,F401

RAIZ = pathlib.Path(__file__).resolve().parent.parent


def pol(cx, cy, ang, r):
    a = math.radians(ang)
    return cx + r * math.cos(a), cy - r * math.sin(a)


def etiqueta(x, y, ang, txt, extra=9, cl='sm bd'):
    """etiqueta junto a un punto, en la dirección ang"""
    c, s = math.cos(math.radians(ang)), math.sin(math.radians(ang))
    px, py = x + extra * c, y - extra * s
    anc = 'start' if c > 0.35 else 'end' if c < -0.35 else 'middle'
    py += 4 if abs(s) < 0.6 else (11 if s < 0 else -1)
    return t(px, py, txt, cl, anc)


def dcl(k, cx, cy, fuerzas, titulo, ejes=(), L=44):
    """DCL: partícula en (cx,cy); fuerzas [(ángulo, nombre, color, longitud, desplazamiento perpendicular)] (los dos últimos opcionales); ejes [(ángulo, nombre)] dibujados a trazos."""
    o = []
    if titulo:
        o.append(t(cx, cy - L - 54, titulo, 'sm bd', 'middle'))
    for a, nom in ejes:
        x2, y2 = pol(cx, cy, a, L + 36)
        o.append(ln(*pol(cx, cy, a + 180, 12), x2, y2, 'm', True, 1))
        o.append(etiqueta(x2, y2, a, nom, 3, 'sm'))
    for f in fuerzas:
        ang, nom, c = f[0], f[1], f[2]
        lg = f[3] if len(f) > 3 else L
        off = f[4] if len(f) > 4 else 0      # desplazamiento perpendicular: separa fuerzas paralelas
        ox, oy = pol(0, 0, ang + 90, off)
        x1, y1 = cx + ox, cy + oy
        x2, y2 = pol(x1, y1, ang, lg)
        o.append(ar(k, x1, y1, x2, y2, c, False, 2.6))
        o.append(etiqueta(x2, y2, ang, nom))
    o.append(dot(cx, cy, 'f', 3.5))
    return o


def bloque(cx, cy, w, h, ang=0, txt='', c='m'):
    """bloque rectangular apoyado (su base en (cx,cy)) en una superficie inclinada ang grados"""
    r = f'<rect x="{cx - w / 2}" y="{cy - h}" width="{w}" height="{h}" rx="2" fill="var({COL[c]})" fill-opacity=".18" stroke="var({COL[c]})" stroke-width="1.5"/>'
    tx = f'<text x="{cx}" y="{cy - h / 2 + 4}" class="sm bd" text-anchor="middle">{txt}</text>' if txt else ''
    return f'<g transform="rotate({-ang} {cx} {cy})">{r}{tx}</g>'


def suelo(x1, y1, x2, y2, n=12, lado=1):
    """línea de suelo con rayado hacia el lado (+1: a la derecha de x1→x2 en pantalla)"""
    o = [f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="var(--fg)" stroke-width="1.8"/>']
    dx, dy = x2 - x1, y2 - y1
    d = math.hypot(dx, dy)
    ux, uy = dx / d, dy / d
    nx, ny = -uy * lado, ux * lado
    for i in range(n + 1):
        px, py = x1 + dx * i / n, y1 + dy * i / n
        o.append(f'<line x1="{px:.1f}" y1="{py:.1f}" x2="{px + 7 * nx - 5 * ux:.1f}" y2="{py + 7 * ny - 5 * uy:.1f}" stroke="var(--mut)" stroke-width="1"/>')
    return o


def registrar(num, nombre, label, vb, cuerpo, pie, src=None, k=None):
    """escribe assets/figs/tNN/nombre.svg y la entrada de `figuras` en contenido/tema_NN/tema.json"""
    k = k or re.sub(r'\W', '', nombre)[:12]
    F = fig(k, vb, label, cuerpo, pie, src or 'Esquema de planteamiento propio, como se haría en el examen')
    svg = re.search(r'<svg.*?</svg>', F, re.S).group(0)
    w, h = vb.split()[2:]
    d = RAIZ / 'assets' / 'figs' / f't{num:02d}'
    d.mkdir(parents=True, exist_ok=True)
    (d / f'{nombre}.svg').write_text(svg + '\n', encoding='utf8')
    f = RAIZ / 'contenido' / f'tema_{num:02d}' / 'tema.json'
    t_ = json.loads(f.read_text(encoding='utf8'))
    t_['figuras'][nombre] = {'w': w, 'h': h, 'label': label, 'pie': re.sub(r'_\{([^}]*)\}', r'<sub>\1</sub>', pie),
                             'src': {'l': 'P', 'ref': src or 'Esquema de planteamiento propio, como se haría en el examen', 'txt': 'P'}}
    f.write_text(json.dumps(t_, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
