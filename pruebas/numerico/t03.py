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
