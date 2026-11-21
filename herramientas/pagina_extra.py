"""Plantilla común de las páginas generadas que no son un tema (formulario, prioridades, ruta de estudio).

`pagina(...)` rellena `contenido/plantilla_pagina.html` quitando lo que solo usan los temas (botón de soluciones, figuras e interactivos).
"""
import pathlib

RAIZ = pathlib.Path(__file__).resolve().parent.parent


def pagina(titulo, hero, cuerpo, pie, destino, css=''):
    pl = (RAIZ / 'contenido' / 'plantilla_pagina.html').read_text(encoding='utf8')
    pl = pl.replace('<button id="btn-sol" type="button">Mostrar soluciones</button> ', '')
    pl = pl.replace('<script defer src="../assets/figuras.js"></script>\n', '').replace('<link rel="stylesheet" href="../assets/interactivos.css">\n', '')
    pl = pl.replace('<script defer src="../assets/interactivos.js"></script>\n', '').replace('</head>', f'<style>{css}</style>\n</head>')
    html = pl.replace('{{titulo_pagina}}', titulo).replace('{{hero}}', hero).replace('{{cuerpo}}', cuerpo).replace('{{pie}}', pie)
    (RAIZ / 'temas' / destino).write_text(html, encoding='utf8')
    return RAIZ / 'temas' / destino
