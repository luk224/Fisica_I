"""Tema 1: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp

sin = lambda g: sp.sin(sp.rad(g))
cos = lambda g: sp.cos(sp.rad(g))


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales[, mant_exp]) registra una comprobación."""
    # ---- 1.10: conversiones
    c('problema-1-10', '60 mi/h en ft/s', sp.Rational(60 * 5280, 3600), 0)
    c('problema-1-10', '32 ft/s² en m/s²', sp.Rational(32) * sp.Rational(3048, 10000), 4)
    c('problema-1-10', '32 ft/s² redondeado', 32 * 0.3048, 1)
    # ---- 1.14: cifras significativas
    c('problema-1-14', 'área', 12 * 5.98, 2); c('problema-1-14', 'razón ancho/largo', 5.98 / 12, 4)
    c('problema-1-14', 'perímetro', 2 * (12 + 5.98), 2); c('problema-1-14', 'diferencia', 12 - 5.98, 2)
    c('problema-1-14', 'razón largo/ancho', 12 / 5.98, 4)
    # ---- 1.18: estimación
    c('problema-1-18', 'mi/día', 10000 / 365, 0); c('problema-1-18', 'gal/día por coche', 10000 / 365 / 20, 1)
    # ---- 1.31: suma y resta de vectores
    By = 15.0 * cos(30); Bx = 15.0 * sin(30)
    c('problema-1-31', 'B_y', By, 2); c('problema-1-31', 'C_y', By - 8, 2)
    c('problema-1-31', '|A+B|', sp.sqrt(Bx ** 2 + (By - 8) ** 2), 2); c('problema-1-31', 'ángulo A+B', sp.deg(sp.atan((By - 8) / Bx)), 1)
    c('problema-1-31', 'D_y', -8 - By, 2); c('problema-1-31', '|A-B|', sp.sqrt(Bx ** 2 + (8 + By) ** 2), 1)
    c('problema-1-31', 'arctan A-B', sp.deg(sp.atan((8 + By) / Bx)), 1); c('problema-1-31', 'ángulo A-B', 180 + sp.deg(sp.atan((8 + By) / Bx)), 1)
    # ---- 1.38 / 1.42 / 1.44: A=(4,7), B=(5,-2)
    A = sp.Matrix([4, 7]); B = sp.Matrix([5, -2])
    c('problema-1-38', '|A|', A.norm(), 2); c('problema-1-38', '|B|', B.norm(), 2)
    c('problema-1-38', '|A-B|', (A - B).norm(), 2); c('problema-1-38', 'ángulo A-B', 180 + sp.deg(sp.atan(sp.Rational(9, -1))), 1)
    c('problema-1-42', 'A·B', A.dot(B), 2); c('problema-1-42', 'cos φ', A.dot(B) / (A.norm() * B.norm()), 3)
    c('problema-1-42', 'φ', sp.deg(sp.acos(A.dot(B) / (A.norm() * B.norm()))), 1)
    c('problema-1-44', 'C_z', A[0] * B[1] - A[1] * B[0], 0)
    # ---- 1.46: producto vectorial
    c('problema-1-46', '|A×B|', 2.80 * 1.90 * sin(120), 2)
    c('problema-1-46', 'A_x', 2.80 * cos(60), 2); c('problema-1-46', 'A_y', 2.80 * sin(60), 2)
    c('problema-1-46', 'B_x', 1.90 * cos(60), 2); c('problema-1-46', 'B_y', -1.90 * sin(60), 2)
    c('problema-1-46', 'C_z', 2.80 * cos(60) * (-1.90 * sin(60)) - 2.80 * sin(60) * 1.90 * cos(60), 2)
    # ---- 1.51: planeta
    m = 5.5 * 5.97e24; rho = 1760.0; V = m / rho; r = (3 * V / (4 * sp.pi)) ** sp.Rational(1, 3)
    c('problema-1-51', 'm (×10^25)', m / 1e25, 2); c('problema-1-51', 'V (×10^22)', V / 1e22, 2)
    c('problema-1-51', 'r (×10^4 km)', r / 1e7, 2); c('problema-1-51', 'r/r_T', r / 6.37e6, 2)
