"""Genera `temas/practica.html`: series de problemas al azar (assets/practica.js) agrupadas por tema y por módulo.

  python herramientas/practica.py

Cada serie es un `<div class="drill" data-tipo="…">`; el generador de problemas está en `assets/practica.js` (G.<tipo>) y
`pruebas/test_practica.py` recalcula sus resultados con Python. Para añadir una serie: escribir G.<tipo> en el JS, su comprobación en
el test y una línea en `SERIES`.
"""
import json
import pathlib

from pagina_extra import pagina

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CONT = RAIZ / 'contenido'

# (tema, [(tipo, título)])
SERIES = [
    (1, [('t1_unidades', 'Unidades: de km/h a m/s'), ('t1_suma', 'Suma de vectores por componentes')]),
    (2, [('t2_mua', 'Movimiento uniformemente acelerado'), ('t2_frenado', 'Distancia de frenado'), ('t2_caida', 'Caída libre')]),
    (3, [('t3_alcance', 'Alcance de un proyectil'), ('t3_altura', 'Altura máxima'), ('t3_centripeta', 'Aceleración centrípeta')]),
    (5, [('t5_plano', 'Plano inclinado con fricción'), ('t5_atwood', 'Máquina de Atwood'), ('t5_ascensor', 'Peso aparente en un ascensor'), ('t5_curva', 'Curva plana y rozamiento')]),
    (6, [('t6_trabajo', 'Trabajo de una fuerza constante'), ('t6_resorte', 'Trabajo sobre un resorte'), ('t6_teorema', 'Teorema trabajo-energía'), ('t6_potencia', 'Potencia al elevar una carga')]),
    (7, [('t7_caida', 'Conservación de la energía en una caída'), ('t7_resorte', 'Bloque lanzado por un resorte'), ('t7_friccion', 'Rampa y suelo con fricción')]),
    (8, [('t8_inelastico', 'Choque perfectamente inelástico'), ('t8_elastico', 'Choque elástico en una dimensión'), ('t8_impulso', 'Impulso y fuerza media')]),
    (9, [('t9_alfa', 'Aceleración angular de un disco'), ('t9_cinematica', 'Rotación frenada: nº de vueltas')]),
    (10, [('t10_rodadura', 'Rodadura por un plano'), ('t10_momento', 'Conservación del momento angular'), ('t10_torque', 'Torque de una fuerza')]),
    (11, [('t11_alargamiento', 'Alargamiento de un hilo'), ('t11_palanca', 'Equilibrio de un balancín')]),
    (12, [('t12_presion', 'Presión a una profundidad'), ('t12_continuidad', 'Ecuación de continuidad'), ('t12_empuje', 'Empuje de Arquímedes')]),
    (13, [('t13_gplaneta', 'Gravedad en otro planeta'), ('t13_orbita', 'Rapidez orbital'), ('t13_kepler', 'Tercera ley de Kepler')]),
    (14, [('t14_resorte', 'Período de un sistema masa-resorte'), ('t14_pendulo', 'Período de un péndulo'), ('t14_vmax', 'Rapidez máxima en un MAS')]),
    (15, [('t15_cuerda', 'Rapidez de una onda en una cuerda'), ('t15_fundamental', 'Frecuencia fundamental de una cuerda')]),
    (16, [('t16_nivel', 'Nivel de intensidad en decibelios'), ('t16_doppler', 'Efecto Doppler'), ('t16_tubo', 'Tubo cerrado por un extremo')]),
    (17, [('t17_mezcla', 'Mezcla de aguas'), ('t17_dilatacion', 'Dilatación lineal')]),
    (18, [('t18_gas', 'Gas ideal: presión'), ('t18_vrms', 'Rapidez cuadrática media')]),
    (19, [('t19_isotermo', 'Trabajo en una expansión isotérmica'), ('t19_adiabatico', 'Compresión adiabática'), ('t19_isobaro', 'Calor a presión constante')]),
    (20, [('t20_carnot', 'Eficiencia de Carnot'), ('t20_calor', 'Calor cedido por una máquina'), ('t20_entropia', 'Entropía en una fusión')]),
]
MODULOS = [('Módulo 1 · temas 1-5', range(1, 6), 'c_m1'), ('Módulo 2 · temas 6-11', range(6, 12), 'c_m2'),
           ('Módulo 3 · temas 12-16', range(12, 17), 'c_m3'), ('Módulo 4 · temas 17-20', range(17, 21), 'c_m4')]


def generar():
    temas = {n: json.loads((CONT / f'tema_{n:02d}' / 'tema.json').read_text(encoding='utf8')) for n in range(1, 21)}
    por_tema = dict(SERIES)
    cuerpo = []
    for nombre, rango, cues in MODULOS:
        cuerpo.append(f'<p class="pr-mod" id="m{nombre[7]}">{nombre}</p>\n')
        cuerpo.append(f'<div class="drill" data-tipo="{cues}" data-n="5" data-titulo="Cuestiones del módulo (tipo test)"></div>\n')
        for n in rango:
            if n not in por_tema:
                continue
            t = temas[n]
            cuerpo.append(f'<section class="pr-tema" id="t{n}">\n<h2 id="t{n}-t"><span class="n">{n}</span> {t["titulo"]}</h2>\n'
                          f'<p class="ir"><a href="{pathlib.Path(t["archivo"]).name}">→ Repasar el tema {n}</a></p>\n')
            for tipo, titulo in por_tema[n]:
                cuerpo.append(f'<div class="drill" data-tipo="{tipo}" data-n="5" data-titulo="{titulo}"></div>\n')
            cuerpo.append('</section>\n')
    chips = ''.join(f'<span><a href="#m{nombre[7]}">{nombre}</a></span>' for nombre, _, _ in MODULOS)
    hero = ('<header class="hero">\n  <div class="kick">Práctica</div>\n  <h1>🏋️ Práctica con problemas al azar</h1>\n'
            '  <p>Series de cinco problemas con datos distintos cada vez. Escribes el resultado (admite coma decimal y <code>1,5e3</code>; se acepta un 2 % de margen) y, si fallas, '
            'te dice <b>qué error típico</b> has cometido. Al final de cada serie sale la solución paso a paso. Usa $g=9{,}81\\ \\mathrm{m/s^2}$. '
            'Cada módulo empieza con cuestiones conceptuales tipo test. Antes de practicar, repasa el tema con el enlace de cada bloque.</p>\n'
            f'  <div class="chips">{chips}</div>\n</header>\n')
    cuerpo.append('<script defer src="../assets/practica.js"></script>\n')
    return pagina('Física I · Práctica al azar', hero, ''.join(cuerpo),
                  'Problemas generados al azar por assets/practica.js; resultados comprobados con Python (pruebas/test_practica.py). Es práctica propia, no son enunciados de examen.',
                  'practica.html')


if __name__ == '__main__':
    print('OK', generar().relative_to(RAIZ))
