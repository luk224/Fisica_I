"""Construye el índice del buscador global: `assets/busqueda_indice.js` (se carga con <script>, así que también funciona desde file://).

  python herramientas/construir_busqueda.py

Lee todas las páginas de `temas/` y guarda una entrada por tema, apartado (h2/h3), caja (definición, ley, ejemplo, truco…) y
ejercicio. Cada entrada: [tipo, tema, url, título, texto corto, fórmulas]. El navegador normaliza y busca (assets/busqueda.js).
"""
import html
import json
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parent.parent
SALIDA = RAIZ / 'assets' / 'busqueda_indice.js'
SIMBOLOS = {r'\mu': 'μ', r'\alpha': 'α', r'\beta': 'β', r'\gamma': 'γ', r'\theta': 'θ', r'\omega': 'ω', r'\Omega': 'Ω', r'\lambda': 'λ',
            r'\rho': 'ρ', r'\sigma': 'σ', r'\tau': 'τ', r'\phi': 'φ', r'\pi': 'π', r'\epsilon': 'ε', r'\eta': 'η', r'\Delta': 'Δ', r'\delta': 'δ',
            r'\sum': 'Σ', r'\cdot': '·', r'\times': '×', r'\le': '≤', r'\ge': '≥', r'\ne': '≠', r'\approx': '≈', r'\Rightarrow': '⇒',
            r'\rightarrow': '→', r'\to': '→', r'\infty': '∞', r'\sqrt': '√', r'\sin': 'sen', r'\cos': 'cos', r'\tan': 'tan', r'\ln': 'ln',
            r'\pm': '±', r'\vec': '', r'\text': '', r'\mathbf': '', r'\left': '', r'\right': '', r'\,': ' ', r'\;': ' ', r'\ ': ' ', r'\quad': ' '}


def limpiar_latex(s):
    """LaTeX -> texto legible aproximado (solo para mostrar y buscar)."""
    for k in sorted(SIMBOLOS, key=len, reverse=True):
        s = s.replace(k, SIMBOLOS[k])
    s = re.sub(r'([\^_])\{([^{}]*)\}', r'\1\2', s)
    s = re.sub(r'\\frac\{([^{}]*)\}\{([^{}]*)\}', r'(\1)/(\2)', s)
    s = re.sub(r'\\[a-zA-Z]+', '', s)
    return re.sub(r'[{}$]', '', s)


def compactar(s):
    return re.sub(r'\s+', ' ', s).strip()


def texto_plano(h):
    h = re.sub(r'<span class="(?:src|prio)[^"]*"[^>]*>.*?</span>', '', h, flags=re.S)
    return compactar(html.unescape(re.sub(r'<[^>]+>', ' ', h)))


def formulas_de(texto):
    out = []
    for m in re.finditer(r'\$\$(.+?)\$\$|\$([^$\n]{3,80})\$', texto, re.S):
        f = compactar(m.group(1) or m.group(2))
        if '=' in f or '^' in f or '\\' in f:
            out.append(limpiar_latex(f))
    return out


def indexar(ruta):
    txt = ruta.read_text(encoding='utf8')
    txt = re.sub(r'<(svg|script|style)\b.*?</\1>', '', txt, flags=re.S)
    url = 'temas/' + ruta.name
    titulo = compactar(re.sub(r'^Física I\s*·\s*', '', html.unescape(re.search(r'<title>(.*?)</title>', txt, re.S).group(1))))
    main = txt[txt.index('<main>'):] if '<main>' in txt else txt
    desc = re.search(r'<header class="hero">.*?<p>(.*?)</p>', main, re.S)
    ents = [['tema', '', url, titulo, limpiar_latex(texto_plano(desc.group(1)))[:200] if desc else '', '']]
    # apartados: texto hasta el siguiente encabezado
    heads = list(re.finditer(r'<h([23])(?: id="([^"]+)")?[^>]*>(.*?)</h\1>', main, re.S))
    ancla = ''
    for i, m in enumerate(heads):
        if m.group(1) == '2' and m.group(2):
            ancla = m.group(2)
        t = limpiar_latex(re.sub(r'^\S{1,2}\s', '', texto_plano(m.group(3)))) if re.match(r'<span class="n">', m.group(3)) else limpiar_latex(texto_plano(m.group(3)))
        fin = heads[i + 1].start() if i + 1 < len(heads) else len(main)
        cuerpo = limpiar_latex(texto_plano(main[m.end():fin]))[:200]
        if t:
            ents.append(['sec', '', url + ('#' + ancla if ancla else ''), t, cuerpo, ''])
    # cajas
    pos_heads = [(m.start(), m.group(2)) for m in heads if m.group(1) == '2' and m.group(2)]
    def ancla_en(pos):
        a = ''
        for p, i in pos_heads:
            if p < pos:
                a = i
        return a
    for m in re.finditer(r'<div class="box (\w+)"><span class="h">(.*?)</span>(.*?)</div>', main, re.S):
        t = limpiar_latex(texto_plano(m.group(2)))
        a = ancla_en(m.start())
        ents.append(['caja', m.group(1), url + ('#' + a if a else ''), t, limpiar_latex(texto_plano(m.group(3)))[:200],
                     ' '.join(formulas_de(m.group(3)))[:160]])
    # ejercicios
    for m in re.finditer(r'<details class="sol"(?: id="([^"]+)")?><summary>(.*?)</summary>(.*?)</details>', main, re.S):
        a = m.group(1) or ancla_en(m.start())
        enun = re.search(r'<p class="enun">(.*?)</p>', m.group(3), re.S)
        ents.append(['ej', '', url + ('#' + a if a else ''), limpiar_latex(texto_plano(m.group(2))),
                     limpiar_latex(texto_plano(enun.group(1)))[:200] if enun else '', ' '.join(formulas_de(m.group(3)))[:160]])
    return titulo, ents


def generar_texto():
    temas, todo = [], []
    for ruta in sorted((RAIZ / 'temas').glob('tema_*.html')) + sorted((RAIZ / 'temas').glob('ejercicios_*.html')):
        titulo, ents = indexar(ruta)
        temas.append(titulo)
        n = len(temas) - 1
        for e in ents:
            todo.append([e[0], e[1], n, e[2], e[3], e[4], e[5]])
    datos = {'v': 1, 'temas': temas, 'e': todo}
    return 'window.BUSQUEDA=' + json.dumps(datos, ensure_ascii=False, separators=(',', ':')) + ';\n', len(todo)


def main():
    texto, n = generar_texto()
    SALIDA.write_text(texto, encoding='utf8')
    print('OK', SALIDA.relative_to(RAIZ), n, 'entradas,', SALIDA.stat().st_size // 1024, 'KB')


if __name__ == '__main__':
    main()
