"""Tema 3: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp

sin = lambda g: sp.sin(sp.rad(g))
cos = lambda g: sp.cos(sp.rad(g))


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    g = 9.80
    # ---- E1: ave
    al, be = 2.4, 1.2
    vy = -2 * be * 2.0; vx = al
    c('e1', 'x(2)', al * 2.0, 1); c('e1', 'y(2)', 3.0 - be * 4.0, 1)
    c('e1', 'v', sp.sqrt(vx ** 2 + vy ** 2), 2); c('e1', 'ángulo v', sp.deg(sp.atan(vy / vx)), 1)
    ay = -2 * be
    apar = (0 * vx + ay * vy) / sp.sqrt(vx ** 2 + vy ** 2)
    c('e1', 'a paralela', apar, 2); c('e1', 'a perpendicular', sp.sqrt(ay ** 2 - apar ** 2), 2)
    c('e1', 'v×a', vx * ay, 2)
    # ---- E2: balón
    c('e2', 't subida', 12.0 / g, 2); c('e2', 'h', 12.0 ** 2 / (2 * g), 2); c('e2', 't total', 24.0 / g, 2)
    c('e2', 'alcance', 20.0 * 24.0 / g, 1)
    # ---- E3: libro
    c('e3', 'h', 0.5 * g * 0.480 ** 2, 2); c('e3', 'x', 1.10 * 0.480, 3); c('e3', 'v_y', g * 0.480, 2)
    c('e3', 'v', sp.sqrt(1.10 ** 2 + (g * 0.480) ** 2), 2); c('e3', 'ángulo', sp.deg(sp.atan(g * 0.480 / 1.10)), 1)
    # ---- E4: proyectil 40 m/s a 60°
    v0x = 40.0 * cos(60); v0y = 40.0 * sin(60)
    c('e4', 'v0x', v0x, 1); c('e4', 'v0y', v0y, 1); c('e4', 't1', v0y / g, 2); c('e4', 'h', v0y ** 2 / (2 * g), 1)
    c('e4', 'R', 40.0 ** 2 * sin(120) / g, 0)
    # ---- E5: bailarín
    T = 1 / 3.0
    c('e5', 'T', T, 3); c('e5', 'a rad', 4 * sp.pi ** 2 * 0.070 / T ** 2, 1); c('e5', 'a/g', 4 * sp.pi ** 2 * 0.070 / T ** 2 / g, 1)
    # ---- E6: remero y caminante
    c('e6', 't1', 1.50 / 6.80, 3); c('e6', 't2', 1.50 / 1.20, 2); c('e6', 'total', 1.50 / 6.80 + 1.50 / 1.20, 2)
    c('e6', 'total min', (1.50 / 6.80 + 1.50 / 1.20) * 60, 1); c('e6', 'caminante', 3.00 / 4.00, 3)
    # ---- X3: fuegos artificiales (cohete que estalla)
    mA, mB, Ek = 1.40, 0.28, 860.0
    p = sp.sqrt(2 * Ek / (1 / mA + 1 / mB))
    c('x3', 'p', p, 1); c('x3', 'v_A', p / mA, 1); c('x3', 'v_B', p / mB, 1)
    t = sp.sqrt(2 * 80 / g)
    c('x3', 't caída', t, 2); c('x3', 'x_A', p / mA * t, 1); c('x3', 'x_B', p / mB * t, 1); c('x3', 'D', p * (1 / mA + 1 / mB) * t, 0)
    # ---- teoría y mini-tests (página)
    t = sp.symbols('t')
    vv = [sp.diff(q, t).subs(t, 3) for q in (2 * t, t ** 2)]
    c('pagina', '§1 ej. mínimo: vx', vv[0], 0); c('pagina', '§1 ej. mínimo: vy', vv[1], 0)
    c('pagina', '§1 ej. mínimo: v', sp.sqrt(vv[0] ** 2 + vv[1] ** 2), 2); c('pagina', '§1 ej. mínimo: ángulo', sp.deg(sp.atan(vv[1] / vv[0])), 1)
    c('pagina', '§1 ej. 3.1: v', sp.sqrt(1.0 ** 2 + 1.3 ** 2), 1); c('pagina', '§1 ej. 3.1: ángulo', 180 - sp.deg(sp.atan(1.3 / 1.0)), 0)
    c('pagina', '§1 aviso: arctan(4/3)', sp.deg(sp.atan(sp.Rational(4, 3))), 1); c('pagina', '§1 aviso: cuadrante', 180 + sp.deg(sp.atan(sp.Rational(4, 3))), 1)
    c('pagina', '§1 test: |v| (-3,-4)', 5, 0); c('pagina', '§1 test: v media', 3.0, 1)
    ap = (0 * 4 + (-2) * (-3)) / 5.0
    c('pagina', '§2 a paralela', ap, 1); c('pagina', '§2 a perpendicular', sp.sqrt(2.0 ** 2 - ap ** 2), 1)
    v0 = 20.0
    c('pagina', '§3 v0y', v0 * sin(30), 0); c('pagina', '§3 t1', v0 * sin(30) / g, 2); c('pagina', '§3 h', (v0 * sin(30)) ** 2 / (2 * g), 2)
    c('pagina', '§3 R 30°', v0 ** 2 * sin(60) / g, 1); c('pagina', '§3 R 60°', v0 ** 2 * sin(120) / g, 1); c('pagina', '§3 R 45°', v0 ** 2 / g, 1)
    tv = (5 + sp.sqrt(25 + 4 * 4.9 * 15)) / (2 * 4.9)
    c('pagina', '§3 ventana: t', tv, 2); c('pagina', '§3 ventana: x', 10 * cos(30) * tv, 1); c('pagina', '§3 ventana: R fórmula', 100 * sin(60) / g, 1)
    c('pagina', '§4 noria: v', 2 * sp.pi * 10 / 20, 2); c('pagina', '§4 noria: a', 4 * sp.pi ** 2 * 10 / 20 ** 2, 3)
    c('pagina', '§4 test: a rad', 2.0 ** 2 / 0.50, 1); c('pagina', '§4 test: a total', sp.sqrt(4 ** 2 + 3 ** 2), 0)
    c('pagina', '§5 tren: v', -1.0 + 3.0, 1); c('pagina', '§5 bote: v', sp.sqrt(5.0 ** 2 + 3.0 ** 2), 2); c('pagina', '§5 bote: ángulo', sp.deg(sp.atan(3 / 5.0)), 1)
    # ---- D9: errores
    c('pagina', 'error 1: del fallo', 40.0**2 / (2 * 9.80), 1); c('pagina', 'error 1: h', (40.0 * sin(60))**2 / (2 * 9.80), 1)
    c('pagina', 'error 2: del fallo', 1.13 / 1.10, 2); c('pagina', 'error 2: t', sp.sqrt(2 * 1.13 / 9.80), 3)
    c('pagina', 'error 3: del fallo', 4 * sp.pi**2 * 0.070 / 3.0**2, 2); c('pagina', 'error 3: a', 4 * sp.pi**2 * 0.070 / (1 / 3.0)**2, 1)
    c('pagina', 'error 4: t', 1.50 / 6.80 + 1.50 / 1.20, 2)
