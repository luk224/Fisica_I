"""Librería para generar las figuras SVG propias de los resúmenes (ver CLAUDE.md §3 regla 12).

Uso típico (en un script temporal que luego se descarta):
    import sys; sys.path.insert(0, 'herramientas')
    from figuras_svg import *
    s = load('temas/tema_NN_slug.html')
    k = 'x1'                                   # id único por figura (evita choques de marcadores)
    p = Plot(0, 10, 0, 50)                     # ejes de datos -> píxeles (y hacia arriba)
    b = p.axes('t (s)', 'x (m)', [(0, '0'), (5, '5')], [(25, '25')])
    b += [p.curve(lambda t: 5*t, 0, 10), ar(k, 40, 100, 120, 60, 'b'), t(60, 20, 'v_{x} = 3', 'sm bd')]
    F = fig(k, p.vb, 'texto alternativo', b, 'pie de figura (admite v_{x})', 'Diagrama propio de ...')
    s = after_div(s, 'data-ref="U Ejemplo 2.1, p. 38-39"', F)   # o after_ol / after_tag
    open('temas/tema_NN_slug.html', 'w', encoding='utf8').write(s)

Colores (siempre variables CSS, válidos en claro y oscuro): a=azul, b=naranja, g=verde, p=morado, m=gris, f=texto.
Subíndices en etiquetas SVG: escribir v_{x}; ar() dibuja flechas con punta de tamaño fijo.
"""
import math, re

COL = {'a': '--acc', 'b': '--A', 'm': '--mut', 'g': '--X', 'p': '--E', 'f': '--fg'}


def defs(k):
    return '<defs>' + ''.join(
        f'<marker id="m{c}{k}" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" refX="9" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="var({v})"/></marker>'
        for c, v in COL.items()) + '</defs>'


def sub(txt):
    """'v_{x} = 3' -> tspans con subindice real"""
    parts = re.split(r'_\{([^}]*)\}', txt)
    out = parts[0]
    for i in range(1, len(parts), 2):
        out += f'<tspan dy="3" font-size="9">{parts[i]}</tspan>'
        if i + 1 < len(parts) and parts[i + 1]:
            out += f'<tspan dy="-3">{parts[i + 1]}</tspan>'
        elif i + 1 < len(parts):
            out += '<tspan dy="-3"></tspan>'
    return out


def ar(k, x1, y1, x2, y2, c='a', dash=False, w=3):
    d = ' stroke-dasharray="5 4"' if dash else ''
    r = lambda v: round(v, 1)
    return (f'<line x1="{r(x1)}" y1="{r(y1)}" x2="{r(x2)}" y2="{r(y2)}" stroke="var({COL[c]})" stroke-width="{w}" fill="none"{d}'
            f' marker-end="url(#m{c}{k})"/>')


def ln(x1, y1, x2, y2, c='m', dash=True, w=1.3):
    d = ' stroke-dasharray="4 3"' if dash else ''
    r = lambda v: round(v, 1)
    return f'<line x1="{r(x1)}" y1="{r(y1)}" x2="{r(x2)}" y2="{r(y2)}" stroke="var({COL[c]})" stroke-width="{w}"{d}/>'


def ax(x1, y1, x2, y2):
    return f'<line class="ax" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}"/>'


def t(x, y, txt, cl='sm bd', anchor=None, fill=None):
    a = f' text-anchor="{anchor}"' if anchor else ''
    f = f' style="fill:var({COL[fill]})"' if fill else ''
    return f'<text x="{round(x,1)}" y="{round(y,1)}" class="{cl}"{a}{f}>{sub(txt)}</text>'


def dot(x, y, c='a', r=3.5):
    return f'<circle cx="{round(x,1)}" cy="{round(y,1)}" r="{r}" fill="var({COL[c]})"/>'


def path(pts, c='a', w=2.5, dash=False, close=False):
    d = 'M ' + ' L '.join(f'{round(x,1)} {round(y,1)}' for x, y in pts) + (' Z' if close else '')
    da = ' stroke-dasharray="5 4"' if dash else ''
    return f'<path d="{d}" fill="none" stroke="var({COL[c]})" stroke-width="{w}"{da}/>'


def poly_fill(pts, c='a', op=0.14):
    d = 'M ' + ' L '.join(f'{round(x,1)} {round(y,1)}' for x, y in pts) + ' Z'
    return f'<path d="{d}" fill="var({COL[c]})" fill-opacity="{op}" stroke="none"/>'


def rect(x, y, w, h, c='m', op=0.15, stroke=True):
    s = f' stroke="var({COL[c]})" stroke-width="1.5"' if stroke else ' stroke="none"'
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="2" fill="var({COL[c]})" fill-opacity="{op}"{s}/>'


def circ(x, y, r, c='m', op=0.15):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="var({COL[c]})" fill-opacity="{op}" stroke="var({COL[c]})" stroke-width="1.5"/>'


def arc(cx, cy, r, a0, a1, c='m'):
    """arco antihorario en pantalla de a0 a a1 (rad, y hacia arriba)"""
    x0, y0 = cx + r * math.cos(a0), cy - r * math.sin(a0)
    x1, y1 = cx + r * math.cos(a1), cy - r * math.sin(a1)
    return f'<path d="M {x0:.1f} {y0:.1f} A {r} {r} 0 0 0 {x1:.1f} {y1:.1f}" fill="none" stroke="var({COL[c]})" stroke-width="1.3"/>'


def sym(x, y, kind):
    o = f'<circle cx="{x}" cy="{y}" r="7" fill="var(--bg)" stroke="var(--fg)" stroke-width="1.5"/>'
    if kind == 'dot':
        return o + f'<circle cx="{x}" cy="{y}" r="2" fill="var(--fg)"/>'
    a, b = x - 4.5, x + 4.5
    return o + (f'<line x1="{a}" y1="{y-4.5}" x2="{b}" y2="{y+4.5}" stroke="var(--fg)" stroke-width="1.5"/>'
                f'<line x1="{a}" y1="{y+4.5}" x2="{b}" y2="{y-4.5}" stroke="var(--fg)" stroke-width="1.5"/>')


def fig(k, vb, label, body, cap, src):
    cap = re.sub(r'_\{([^}]*)\}', r'<sub>\1</sub>', cap)
    return (f'<figure class="fig">\n<svg class="fig" viewBox="{vb}" width="100%" role="img" aria-label="{label}">\n  {defs(k)}\n  '
            + '\n  '.join(body) + f'\n</svg>\n<figcaption>{cap} <span class="src" data-l="P" data-ref="{src}">P</span></figcaption>\n</figure>\n')


class Plot:
    """ejes de datos -> pixeles. y hacia arriba."""

    def __init__(s, x0, x1, y0, y1, left=45, right=15, top=15, bottom=35, W=320, H=200):
        s.x0, s.x1, s.y0, s.y1 = x0, x1, y0, y1
        s.L, s.R, s.T, s.B, s.W, s.H = left, right, top, bottom, W, H
        s.vb = f'0 0 {W} {H}'

    def X(s, v):
        return s.L + (v - s.x0) / (s.x1 - s.x0) * (s.W - s.L - s.R)

    def Y(s, v):
        return s.H - s.B - (v - s.y0) / (s.y1 - s.y0) * (s.H - s.B - s.T)

    def P(s, x, y):
        return (s.X(x), s.Y(y))

    def axes(s, xl, yl, xt=(), yt=()):
        o = [ax(s.L, s.H - s.B, s.W - s.R + 5, s.H - s.B), ax(s.L, s.H - s.B + 0, s.L, s.T - 5)]
        o.append(t(s.W - s.R, s.H - s.B + 28, xl, 'sm', 'end'))
        o.append(t(s.L + 6, s.T + 2, yl, 'sm'))
        for v, lab in xt:
            o.append(ln(s.X(v), s.H - s.B, s.X(v), s.H - s.B + 4, 'f', False, 1.2))
            o.append(t(s.X(v), s.H - s.B + 16, lab, 'sm', 'middle'))
        for v, lab in yt:
            o.append(ln(s.L - 4, s.Y(v), s.L, s.Y(v), 'f', False, 1.2))
            o.append(t(s.L - 7, s.Y(v) + 4, lab, 'sm', 'end'))
        return o

    def curve(s, f, a, b, n=80, c='a', w=2.5, dash=False):
        pts = [s.P(a + (b - a) * i / n, f(a + (b - a) * i / n)) for i in range(n + 1)]
        return path(pts, c, w, dash)

    def seg(s, xa, ya, xb, yb, c='a', w=2.5, dash=False):
        return path([s.P(xa, ya), s.P(xb, yb)], c, w, dash)


# ---------- insercion en el HTML ----------
def load(p):
    return open(p, encoding='utf8').read()


def after_div(s, snippet, fig_html):
    assert s.count(snippet) == 1, ('snippet no unico/ausente', snippet, s.count(snippet))
    i = s.index(snippet)
    j = s.index('</div>', i) + len('</div>')
    return s[:j] + '\n' + fig_html + s[j:]


def after_tag(s, snippet, tag, fig_html):
    assert s.count(snippet) == 1, ('snippet no unico/ausente', snippet, s.count(snippet))
    i = s.index(snippet)
    j = s.index(tag, i) + len(tag)
    return s[:j] + '\n' + fig_html + s[j:]


def after_ol(s, summary_snippet, fig_html):
    assert s.count(summary_snippet) == 1, ('summary no unico/ausente', summary_snippet, s.count(summary_snippet))
    i = s.index(summary_snippet)
    j = s.index('</ol>', i) + len('</ol>')
    return s[:j] + '\n  ' + fig_html + s[j:]
