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
