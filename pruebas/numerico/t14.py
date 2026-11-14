"""Tema 14: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp

pi = sp.pi
g = 9.80


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- E14.13
    m, k, v0 = 2.00, 300.0, 12.0
    w = sp.sqrt(k / m)
    c('e1413', 'omega', w, 2)
    c('e1413', 'A', v0 / w, 3)
    c('e1413', 'omega (3 cifras)', w, 1)
    # ---- E14.14
    x0, v0 = 0.200, -4.00
    A = sp.sqrt(x0**2 + v0**2 / w**2)
    ph = sp.atan(-v0 / (w * x0))
    c('e1414', 'x0^2', x0**2, 4)
    c('e1414', 'v0^2/w^2', v0**2 / w**2, 4)
    c('e1414', 'A', A, 3)
    c('e1414', 'tan phi', -v0 / (w * x0), 3)
    c('e1414', 'phi rad', ph, 2)
    c('e1414', 'phi grados', sp.deg(ph), 1)
    c('e1414', 'x(0)', A * sp.cos(ph), 3)
    c('e1414', 'v(0)', w * A * sp.sin(ph), 2)
    # ---- E14.17
    m1, T1, T2 = 42.5, 1.30, 2.54
    kk = 4 * pi**2 * m1 / T1**2
    mt = T2**2 * kk / (4 * pi**2)
    c('e1417', 'k', kk, 0)
    c('e1417', 'm total', mt, 0)
    c('e1417', 'm astronauta', mt - m1, 0)
    c('e1417', 'atajo', m1 * ((T2 / T1)**2 - 1), 1)
    # ---- E14.28
    c('e1428', 'x/A', 1 / sp.sqrt(2), 3)
    c('e1428', 'instantes pi/4 -> cos', sp.cos(pi / 4), 3)
    # ---- E14.31
    M, mm = sp.symbols('M mm', positive=True)
    sol = sp.solve(sp.Eq(M / (M + mm), sp.Rational(1, 4)), mm)[0]
    assert sp.simplify(sol - 3 * M) == 0
    assert sp.simplify(sp.sqrt(M / (M + M)) - 1 / sp.sqrt(2)) == 0
    # ---- E14.37
    m, k, v, x = 0.175, 155.0, 0.815, 0.0300
    K = 0.5 * m * v**2; U = 0.5 * k * x**2; E = K + U
    c('e1437', 'K', K, 4)
    c('e1437', 'U', sp.Rational(1, 2) * 155 * sp.Rational(3, 100)**2, 4)
    c('e1437', 'E', E, 3)
    c('e1437', 'A', sp.sqrt(2 * E / k), 4)
    c('e1437', 'A cm', sp.sqrt(2 * E / k) * 100, 2)
    c('e1437', 'vmax', sp.sqrt(2 * E / m), 2)
    c('e1437', 'omega', sp.sqrt(k / m), 1)
    c('e1437', 'omega 4cs', sp.sqrt(k / m), 2)
    c('e1437', 'vmax=wA', sp.sqrt(k / m) * sp.sqrt(2 * E / k), 2)
    # ---- E14.38
    m, dl = 65.0, 0.180
    k = m * g / dl
    T = 2 * pi * sp.sqrt(m / k)
    c('e1438', 'k (1e3)', k / 1e3, 2)
    c('e1438', 'k', k, 0)
    c('e1438', 'T', T, 3)
    c('e1438', 'vmax', 2 * pi * 0.05 / T, 3)
    c('e1438', 'T=2pi sqrt(dl/g)', 2 * pi * sp.sqrt(dl / g), 3)
    # ---- E14.50
    T = 1.60
    c('e1450', 'f', 1 / T, 3)
    c('e1450', 'omega', 2 * pi / T, 2)
    c('e1450', 'A rad', sp.rad(6), 3)
    c('e1450', 'L', g * (T / (2 * pi))**2, 3)
    # ---- E14.55
    m, d, T = 1.80, 0.200, 120 / 100
    I = m * g * d * (T / (2 * pi))**2
    c('e1455', 'T', T, 2)
    c('e1455', 'I', I, 3)
    c('e1455', 'varilla', m * 0.400**2 / 3, 3)
    c('e1455', '% mayor', (I / (m * 0.4**2 / 3) - 1) * 100, 0)
    # ---- E14.59
    k, A1, A2 = 250.0, 0.060, 0.035
    E1, E2 = k * A1**2 / 2, k * A2**2 / 2
    c('e1459', 'E1', E1, 3)
    c('e1459', 'E2', E2, 3)
    c('e1459', 'dE', E1 - E2, 2)
    c('e1459', 'dE 3 cifras', E1 - E2, 3)
    # ---- E14.66
    mp, dx, TL = 250.0, 0.0400, 1.92
    k = mp * g / dx
    Mc = (TL / (2 * pi))**2 * k - mp
    c('e1466', 'k (1e4)', k / 1e4, 3)
    c('e1466', 'M (1e3)', Mc / 1e3, 2)
    c('e1466', 'M', Mc, 0)
    c('e1466', 'TE', 2 * pi * sp.sqrt(Mc / k), 2)
    c('e1466', 'TE atajo', sp.sqrt(TL**2 - 4 * pi**2 * dx / g), 2)
    # ---- E14.79
    k, mb, mf, h = 400.0, 0.200, 2.2, 0.40
    v1 = sp.sqrt(2 * g * h)
    v2 = mf / (mf + mb) * v1
    d = mf * g / k
    mtot = mf + mb
    A = sp.sqrt(d**2 + mtot * v2**2 / k)
    c('e1479', 'v1', v1, 2)
    c('e1479', 'v2', v2, 2)
    c('e1479', 'd', d, 4)
    c('e1479', 'A', A, 3)
    c('e1479', 'A 2 cifras', A, 2)
    c('e1479', 'T', 2 * pi * sp.sqrt(mtot / k), 3)
    c('e1479', 'T 2 cifras', 2 * pi * sp.sqrt(mtot / k), 2)
    c('e1479', 'K1', mf * v1**2 / 2, 1)
    c('e1479', 'K2', mtot * v2**2 / 2, 1)
    c('e1479', 'K2/K1', mf / mtot, 3)
    # ---- E14.80
    F, dl, T = 40.0, 0.250, 1.00
    k = F / dl
    m = k * (T / (2 * pi))**2
    c('e1480', 'k', k, 0)
    c('e1480', 'm', m, 2)
    w = 2 * pi / T
    t = 0.35
    xx = -0.050 * sp.sin(w * t)
    vv = -0.050 * w * sp.cos(w * t)
    c('e1480', 'x', abs(xx), 4)
    c('e1480', 'x cm', abs(xx) * 100, 1)
    c('e1480', 'v', vv, 3)
    c('e1480', 'mg', m * g, 1)
    c('e1480', 'F res', m * g + k * 0.030, 1)
    c('e1480', 'kx', k * 0.030, 1)
    # ---- E14.84
    M, k = 0.800, 160.0
    w = sp.sqrt(5 * k / (14 * M))
    c('e1484', 'omega', w, 2)
    c('e1484', 'T', 2 * pi / w, 3)
    c('e1484', 'T0', 2 * pi * sp.sqrt(2 * M / k), 3)
    c('e1484', 'sqrt(7/5)', sp.sqrt(sp.Rational(7, 5)), 2)
    # ---- E14.86
    m, d, I = 34.0, 0.60, 18.0
    T = 2 * pi * sp.sqrt(I / (m * g * d))
    c('e1486', 'T', T, 3)
    c('e1486', 'L', g * (T / (2 * pi))**2, 2)
    c('e1486', 'L=I/(md)', I / (m * d), 3)
    # ---- E14.96
    c('e1496', 'f/f0', sp.sqrt(1005 / 1000), 4)
    c('e1496', '% cambio', (sp.sqrt(1005 / 1000) - 1) * 100, 2)
    # ---- PP
    c('pp', 'sqrt(3/2)', sp.sqrt(sp.Rational(3, 2)), 2)
    # ---- X1
    k, Mb, m, h = 500.0, 0.5, 1.0, 0.5
    v0 = sp.sqrt(2 * g * h)
    V = m * v0 / (m + Mb)
    x0 = m * g / k
    w = sp.sqrt(k / (m + Mb))
    A = sp.sqrt(x0**2 + V**2 / w**2)
    ph = sp.atan(V / (w * x0))
    c('x1', 'v0', v0, 2)
    c('x1', 'V', V, 2)
    c('x1', 'V 3 cifras', V, 3)
    c('x1', 'x0', x0, 4)
    c('x1', 'omega', w, 2)
    c('x1', 'V/w', V / w, 4)
    c('x1', 'A', A, 3)
    c('x1', 'T', 2 * pi / w, 3)
    c('x1', 'phi', ph, 2)
    c('x1', 'phi grados', sp.deg(ph), 1)
    c('x1', 'tan phi', V / (w * x0), 2)
    c('x1', 't punto bajo', (pi - ph) / w, 3)
    # ---- X7
    c('x7', 'f/f', sp.sqrt(2), 2)
    RT, hh = 6.37e6, 1000.0
    c('x7', 'T ratio', (RT + hh) / RT, 5)
    c('x7', 'atraso s/dia', 86400 * (1 - RT / (RT + hh)), 0)
    # ---- teoría (pagina)
    m, k, x0, v0 = 0.5, 200.0, 0.015, 0.40
    w = sp.sqrt(k / m)
    c('pagina', 'ej 14.3: A', sp.sqrt(x0**2 + v0**2 / w**2), 4)
    c('pagina', 'ej 14.3: phi', sp.atan(-v0 / (w * x0)), 3)
    m, k = 2.0, 300.0
    c('pagina', 'ej 14.14: T', 2 * pi * sp.sqrt(m / k), 3)
    m, k, b = 0.30, 2.5, 0.90
    bc = 2 * sp.sqrt(k * m)
    wp = sp.sqrt(k / m - b**2 / (4 * m**2))
    c('pagina', 'b crit', bc, 2)
    c('pagina', "omega'", wp, 2)
    c('pagina', "f'", wp / (2 * pi), 3)
    c('pagina', 'b/bcrit', b / bc, 2)
