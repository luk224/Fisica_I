"""Genera `temas/formulario.html`: formulario de los 20 temas y, debajo, un resumen de una página.

  python herramientas/formulario.py

No se edita a mano: las fórmulas salen de cada tema (`partes/en5.html`, tabla «Las 6 fórmulas», y `partes/chuleta-tabla.html`)
y los textos del resumen de `contenido/formulario.json`. Así el formulario nunca se desincroniza de los temas.
"""
import json
import pathlib
import re

from pagina_extra import pagina

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CONT = RAIZ / 'contenido'
BLOQUES = [('Mecánica', range(1, 14), 'Temas 1-13'), ('Oscilaciones y ondas', range(14, 17), 'Temas 14-16'),
           ('Termodinámica', range(17, 21), 'Temas 17-20')]

CSS = """
.form-bloque{margin:2.2em 0 .2em;font:600 12.5px var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--acc)}
.form-tema h2{margin-top:.4em}
.form-tema .lema{margin:-.3em 0 .6em;color:var(--mut)}
.form-tema h3{font:600 .95rem var(--sans);margin:1.1em 0 .2em}
.form-tema,.form-cte{--w1:46%}
@media(min-width:720px){.form-tema table td:first-child{width:var(--w1)}}
details.chul{border:1px solid var(--bd);border-radius:10px;background:var(--card);margin:.9em 0;padding:0 16px}
details.chul>summary{cursor:pointer;font:600 15px var(--sans);padding:11px 0;color:var(--acc)}
details.chul[open]>summary{border-bottom:1px solid var(--bd);margin-bottom:8px}
.form-tema .ir{font:14px var(--sans);margin:.4em 0 0}
.resumen-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px;margin:1em 0}
.rcard{border:1px solid var(--bd);border-radius:12px;background:var(--card);padding:14px 16px;font:14px/1.45 var(--sans)}
.rcard h3{margin:0 0 .3em;font:600 1rem/1.3 var(--sans)}
.rcard h3 a{text-decoration:none;color:inherit}
.rcard h3 span{color:var(--acc);margin-right:.35em}
.rcard p{margin:.35em 0}
.rcard .ojo{color:var(--mut);font-size:13.5px}
@media print{.form-tema{break-inside:auto}.rcard{break-inside:avoid}details.chul>summary{list-style:none}}
"""


def leer(p):
    return p.read_text(encoding='utf8')


def tabla_6(en5):
    """Tabla «Las 6 fórmulas que hay que saber» del apartado «El tema en 5 minutos»."""
    m = re.search(r'<h3>Las 6[^<]*</h3>\s*(<table>.*?</table>)', en5, re.S)
    return re.sub(r'<span class="src".*?</span>', '', m.group(1), flags=re.S)


def seccion_tema(n, t, meta):
    d = CONT / f'tema_{n:02d}' / 'partes'
    una = tabla_6(leer(d / 'en5.html'))
    chul = leer(d / 'chuleta-tabla.html').strip()
    return (f'<section class="form-tema" id="f{n}">\n<h2 id="f{n}-t"><span class="n">{n}</span> {t["titulo"]}</h2>\n'
            f'<p class="lema">{meta["lema"]}</p>\n'
            f'<h3>Lo imprescindible y cuándo se usa</h3>\n{una}\n'
            f'<details class="chul" open><summary>Chuleta completa del tema {n}</summary>\n{chul}\n</details>\n'
            f'<p class="ir"><a href="{t["archivo"]}">→ Abrir el tema {n} completo</a></p>\n</section>\n')


def generar():
    datos = json.loads(leer(CONT / 'formulario.json'))
    temas = {n: json.loads(leer(CONT / f'tema_{n:02d}' / 'tema.json')) for n in range(1, 21)}
    cuerpo = ['<h2 id="cte">Constantes, unidades y prefijos</h2>\n<table>\n<tr><th>Dato</th><th>Valor</th></tr>\n'
              + ''.join(f'<tr><td>{a}</td><td>{b}</td></tr>\n' for a, b in datos['constantes']) + '</table>\n']
    for nombre, rango, rotulo in BLOQUES:
        cuerpo.append(f'<p class="form-bloque">{nombre} · {rotulo}</p>\n')
        for n in rango:
            cuerpo.append(seccion_tema(n, temas[n], datos['temas'][str(n)]))
    cuerpo.append('<h2 id="resumen">Resumen de los 20 temas</h2>\n<p>Una idea y un error típico por tema. El detalle está en cada tema («El tema en 5 minutos»).</p>\n<div class="resumen-grid">\n')
    for n in range(1, 21):
        m, t = datos['temas'][str(n)], temas[n]
        cuerpo.append(f'<div class="rcard"><h3><a href="{t["archivo"]}"><span>{n}</span>{t["titulo"]}</a></h3>\n'
                      f'<p>{m["idea"]}</p>\n<p class="ojo"><b>Ojo:</b> {m["ojo"]}</p></div>\n')
    cuerpo.append('</div>\n')
    chips = ''.join(f'<span><a href="#f{r[0]}">{nombre}</a></span>' for nombre, r, _ in BLOQUES for r in [list(r)])
    hero = ('<header class="hero">\n  <div class="kick">Formulario y resumen</div>\n  <h1>Fórmulas y resumen de los 20 temas</h1>\n'
            '  <p>Todas las fórmulas del curso organizadas por tema: primero lo imprescindible con <b>cuándo se usa</b> cada una, y debajo la chuleta completa. '
            'Al final, un resumen de una página con la idea de cada tema.</p>\n'
            f'  <div class="chips">{chips}<span><a href="#cte">Constantes</a></span><span><a href="#resumen">Resumen final</a></span></div>\n</header>\n')
    return pagina('Física I · Formulario y resumen', hero, ''.join(cuerpo),
                  'Fórmulas tomadas de la chuleta de cada tema (fuente principal: U, Sears-Zemansky vol. 1). Página generada: se edita en cada tema.',
                  'formulario.html', CSS)



if __name__ == '__main__':
    print('OK', generar().relative_to(RAIZ))
