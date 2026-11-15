"""Tema 4: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- E1, E2, E3
    c('e1', 'masa', 48.0 / 2.20, 1)
    m = 2400 / 9.80
    c('e2', 'masa', m, 1); c('e2', 'F', m * 12.0, -1); c('e2', 'F/w', m * 12.0 / 2400, 2)
    c('e3', 'peso', 45 * 9.8, 0); c('e3', 'a Tierra (×10^-23)', 45 * 9.8 / 6.0e24 * 1e23, 1)
    # ---- E4: patinador
    a = -2.40 / 3.52
    c('e4', 'a', a, 3); c('e4', 'f', 68.5 * a, 1)
    # ---- E5: lanzamiento de béisbol
    a = 46.0 ** 2 / (2 * 1.0)
    c('e5', 'a', a, 0); c('e5', 'F', 0.145 * a, 0); c('e5', 'peso', 0.145 * 9.8, 2); c('e5', 'F/w', 0.145 * a / (0.145 * 9.8), 0)
    # ---- E6: coche y moneda
    v0 = 45.0 / 3.6; a = v0 ** 2 / (2 * 0.018)
    c('e6', 'v0', v0, 1); c('e6', 'a', a, -1); c('e6', 'a/g', a / 9.8, 0); c('e6', 'F (×10^6)', 850 * a / 1e6, 1)
    c('e6', 'peso', 850 * 9.8, 0)
    # ---- E7: ascensor
    m = 625 / 9.80
    c('e7', 'm', m, 1); c('e7', 'n', 625 + m * 2.50, 0); c('e7', 'T', 3.85 * (9.80 + 2.50), 1); c('e7', 'mg', 3.85 * 9.80, 1)
    # ---- E8: dos cajas en contacto
    a = 250 / 25.0
    c('e8', 'a', a, 1); c('e8', 'F contacto', 5.0 * a, 0)
    # ---- teoría y mini-tests (fuera de los ejercicios)
    import math
    g = 9.8
    c('pagina', 'luchadores: R', math.hypot(-100, 80), 0); c('pagina', 'luchadores: theta', 180 - math.degrees(math.atan(80 / 100)), 0)
    c('pagina', 'mini-test s1: R', math.hypot(30, 40), 0); c('pagina', 'mini-test s1: ángulo', math.degrees(math.atan(40 / 30)), 1)
    c('pagina', 'mini-test s1: n caja 5 kg', 5 * g, 0)
    c('pagina', 'ejemplo 4.4: a', 20 / 40, 2)
    c('pagina', 'mini-test s3: a', 12 / 3, 0); c('pagina', 'mini-test s3: a 6-2', (6 - 2) / 4, 0)
    c('pagina', 'mini-test s3: a coche', 25 / 10, 1); c('pagina', 'mini-test s3: F coche', 1200 * 25 / 10, 0)
    c('pagina', 'ejemplo 4.7: m', 2.49e4 / 9.80, -1)
    c('pagina', 'mini-test s4: w Luna', 70 * 1.62, 0); c('pagina', 'mini-test s4: m', 98 / 9.8, 0)
    c('pagina', 'mini-test s4: m paquete', 200 / g, 1); c('pagina', 'mini-test s4: T', 200 + 200 / g * 2, 0)
    c('pagina', 'mini-test s5: F manzana', 1 * g, 1); c('pagina', 'mini-test s5: cociente a (exp)', math.log10(1e4 / 1e-6), 0)
    c('pagina', 'mini-test s6: a', 20 / 4, 0)
    c('pagina', 'teoría: peso 70 kg Tierra', 70 * g, 0)
