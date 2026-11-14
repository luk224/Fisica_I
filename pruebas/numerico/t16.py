"""Tema 16: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp

pi = sp.pi
v = 344.0


def comprobaciones(c):
    # ---- c1
    L = 0.500
    c('c1', 'f1 abierto', v / (2 * L), 0)
    c('c1', 'f1 cerrado', v / (4 * L), 0)
    c('c1', 'lambda1', 2 * L, 2)
    c('c1', 'factor He', 999 / 344, 2)
    # ---- c2
    I = 2 * 1e-12 * 10**6
    c('c2', 'I total (1e-6)', I / 1e-6, 0)
    c('c2', 'beta', 10 * sp.log(I / 1e-12, 10), 1)
    c('c2', 'dB por duplicar', 10 * sp.log(2, 10), 1)
    # ---- 16.1
    lam = v / 1000
    c('p161', 'lambda', lam, 3)
    c('p161', 'A2 (1e-5)', 1.2e-8 * 30 / 3.0e-2 / 1e-5, 1)
    lam2 = lam * 3.0e-2 / 1.5e-3
    c('p161', 'lambda2', lam2, 1)
    c('p161', 'lambda2 (3 c)', lam2, 2)
    c('p161', 'f2', v / lam2, 0)
    # ---- 16.3
    B, A = 1.42e5, 2.00e-5
    for f, d in ((150, 2), (1500, 1), (15000, 0)):
        pass
    k = 2 * pi * 150 / v
    c('p163', 'k', k, 2)
    c('p163', 'p150', B * k * A, 2)
    c('p163', 'p1500', B * 2 * pi * 1500 / v * A, 1)
    c('p163', 'p15000', B * 2 * pi * 15000 / v * A, 0)
    # ---- 16.14
    c('p1614', 'cociente', 10**1.30, 1)
    c('p1614', 'exponente', 10**1.30, 0)
    # ---- 16.15
    r2 = 15.0 * sp.sqrt(1 / 10**4)
    c('p1615', 'r2 m', r2, 3)
    c('p1615', 'r2 cm', r2 * 100, 1)
    c('p1615', 'cociente r', 10**(40 / 20), 0)
    # ---- 16.20
    c('p1620', 'a) dB', 10 * sp.log(4, 10), 1)
    c('p1620', 'n bebes', 4 * 4, 0)
    c('p1620', 'mas bebes', 4 * 4 - 4, 0)
    # ---- 16.26
    L = v / (2 * 1048 / 2)
    L = v / (2 * 524)
    c('p1626', 'L', L, 3)
    c('p1626', 'lambda cerrado', 4 * L, 2)
    c('p1626', 'f cerrado', v / (4 * L), 0)
    c('p1626', '2f', 2 * 524, 0)
    # ---- 16.29
    c('p1629', 'abierto', v / (2 * 4.88), 1)
    c('p1629', 'cerrado', v / (4 * 4.88), 1)
    # ---- 16.31
    lam = 4 * 0.140
    c('p1631', 'lambda a', lam, 3)
    c('p1631', 'f a', v / lam, 0)
    c('p1631', 'lambda b', 4 * 0.070, 3)
    c('p1631', 'f b', v / (4 * 0.070) / 1000, 2)
    # ---- 16.33
    mu = 5.625e-3 / 0.750
    vw = sp.sqrt(35.0 / mu)
    c('p1633', 'mu (1e-3)', mu / 1e-3, 2)
    c('p1633', 'v', vw, 1)
    c('p1633', 'lambda3', 2 * 0.750 / 3, 3)
    c('p1633', 'f3', 3 * vw / (2 * 0.750), 0)
    c('p1633', 'f3 (1)', 3 * vw / (2 * 0.750), 1)
    c('p1633', 'lambda aire', v / (3 * vw / 1.5), 2)
    # ---- 16.35
    dl = abs(3.00 - 1.00)
    c('p1635', 'delta', dl, 2)
    c('p1635', 'f constructiva', v / dl, 0)
    c('p1635', 'f destructiva', v / (2 * dl), 0)
    c('p1635', 'lambda dest', 2 * dl, 2)
    # ---- 16.40
    fa, fb = v / 0.648, v / 0.652
    c('p1640', 'fa', fa, 1)
    c('p1640', 'fb', fb, 1)
    c('p1640', 'pulso', fa - fb, 1)
    c('p1640', 'pulso (2)', v * 0.004 / (0.648 * 0.652), 2)
    # ---- 16.46
    c('p1646', 'lambda0', v / 400, 3)
    la, lb = (v - 25) / 400, (v + 25) / 400
    c('p1646', 'lambda delante', la, 3)
    c('p1646', 'lambda detras', lb, 3)
    c('p1646', 'f delante', v / la, 0)
    c('p1646', 'f detras', v / lb, 0)
    # ---- 16.48
    c('p1648', 'a', v / (v / 2) * 1000, 0)
    c('p1648', 'b', 1.5 * 1000, 0)
    # ---- 16.50
    c('p1650', 'a', (v + 18) / (v - 30) * 352, 0)
    c('p1650', 'b', (v - 18) / (v + 30) * 352, 0)
    # ---- 16.52
    fL = 260 + 6.0
    vs = v * (1 - 260 / fL)
    c('p1652', 'fL', fL, 0)
    c('p1652', 'vs', vs, 1)
    c('p1652', 'km/h', vs * 3.6, 0)
    # ---- 16.54
    fp = (v - 20) / (v - 30) * 2000
    c('p1654', 'f1', fp, 0)
    c('p1654', 'f', (v + 30) / (v + 20) * fp, 0)
    c('p1654', 'lambda', (v + 20) / fp, 3)
    c('p1654', 'lambda comp', (v + 30) / ((v + 30) / (v + 20) * fp), 3)
    c('p1654', 'lambda reposo', v / 2000, 3)
    # ---- 16.55
    vc = sp.Rational(50, 2450) * v
    c('p1655', 'vc', vc, 2)
    c('p1655', 'vc mal', 2 * vc, 0)
    f1 = (v + vc) / (v - 20) * 1200
    c('p1655', 'f1', f1, 0)
    c('p1655', 'f', (v + 20) / (v - vc) * f1, 0)
    c('p1655', 'dif 204', (v + 20) / (v - vc) * f1 - 1200, 0)
    # ---- 16.57
    al = sp.asin(1 / 1.70)
    c('p1657', 'sin', 1 / 1.70, 3)
    c('p1657', 'alpha', sp.deg(al), 1)
    t = 1250 / (1.70 * v * sp.tan(al))
    c('p1657', 't', t, 2)
    c('p1657', 't2', 1250 * sp.sqrt(1.70**2 - 1) / (1.70 * v), 2)
    # ---- 16.6
    vl = 8.00 * 400
    c('p166', 'v liq', vl, 0)
    c('p166', 'B (1e10)', 1300 * vl**2 / 1e10, 2)
    vb = 1.50 / 3.90e-4
    c('p166', 'v barra', vb, 0)
    c('p166', 'Y (1e10)', 6400 * vb**2 / 1e10, 2)
    # ---- 16.63
    f1 = (1764 - 1372) / 2
    c('p1663', 'diff', 1764 - 1372, 0)
    c('p1663', 'n abierto', 1372 / (1764 - 1372), 1)
    c('p1663', 'f1', f1, 0)
    c('p1663', 'n', 1372 / f1, 0)
    c('p1663', 'n2', 1764 / f1, 0)
    c('p1663', 'L', v / (4 * f1), 3)
    # ---- 16.64
    c('p1664', 'L', v / (4 * 349), 3)
    T2 = 293.15 * (370 / 349)**2
    c('p1664', 'T2', T2, 1)
    c('p1664', 'T2 C', T2 - 273.15, 1)
    c('p1664', 'subida', T2 - 273.15 - 20, 0)
    # ---- 16.7
    t = 22.0 / 344
    h = (22.0 - 1.2) * 1482 / 344
    c('p167', 't', t, 4)
    c('p167', 'h', h, 1)
    c('p167', 'd', 1.2 + h, 1)
    c('p167', 'dist 22.03', sp.sqrt(22.0**2 + 1.2**2), 2)
    c('p167', 'comprob', 1.2 / 344, 4)
    c('p167', 'comprob2', 89.6 / 1482, 4)
    c('p167', 'razon', 1482 / 344, 1)
    # ---- 16.8
    R, T = 8.3145, 27 + 273.15
    c('p168', 'T', T, 2)
    vH = sp.sqrt(1.41 * R * T / 2.02e-3)
    vHe = sp.sqrt(1.67 * R * T / 4.00e-3)
    vAr = sp.sqrt(1.67 * R * T / 39.9e-3)
    va = sp.sqrt(1.40 * R * T / 28.8e-3)
    c('p168', 'H2 (1e3)', vH / 1e3, 2)
    c('p168', 'He (1e3)', vHe / 1e3, 2)
    c('p168', 'Ar', vAr, 0)
    c('p168', 'aire', va, 0)
    c('p168', 'H2/aire', vH / va, 2)
    c('p168', 'He/aire', vHe / va, 2)
    c('p168', 'Ar/aire', vAr / va, 3)
    # ---- practico
    lam = v / 172
    c('ppractico', 'lambda', lam, 2)
    c('ppractico', 'delta', 1.00, 2)
    IA = 8.00e-4 / (4 * pi * 4.00**2)
    IB = 6.00e-5 / (4 * pi * 3.00**2)
    c('ppractico', 'IA (1e-6)', IA / 1e-6, 2)
    c('ppractico', 'betaA', 10 * sp.log(IA / 1e-12, 10), 1)
    c('ppractico', 'IB (1e-7)', IB / 1e-7, 2)
    c('ppractico', 'betaB', 10 * sp.log(IB / 1e-12, 10), 1)
    pA = sp.sqrt(2 * 1.20 * v * IA)
    pB = sp.sqrt(2 * 1.20 * v * IB)
    c('ppractico', 'pA', pA, 4)
    c('ppractico', 'pB', pB, 4)
    c('ppractico', 'p', pA - pB, 4)
    It = (sp.sqrt(IA) - sp.sqrt(IB))**2
    c('ppractico', 'I (1e-6)', It / 1e-6, 2)
    c('ppractico', 'beta', 10 * sp.log(It / 1e-12, 10), 1)
    c('ppractico', 'I mal (1e-6)', (IA + IB) / 1e-6, 2)
    c('ppractico', 'beta mal', 10 * sp.log((IA + IB) / 1e-12, 10), 1)
    # ---- teoría en formato estudio: ejemplos mínimos de las cajas y mini-tests (pagina)
    Ba, rho = 1.42e5, 1.20
    k1 = 2 * pi * 1000 / v
    c('pagina', 'ej 16.1: k', k1, 1)
    c('pagina', 'ej 16.1: A (1e-8)', 3.0e-2 / (Ba * k1) / 1e-8, 1)
    c('pagina', 'ej 16.2: factor', 43 / 3.2, 0)
    k5 = 2 * pi * 500 / v
    c('pagina', 'test s1: k', k5, 2)
    c('pagina', 'test s1: pmax', Ba * k5 * 1.0e-8, 3)
    c('pagina', 'ej 16.4: v', sp.sqrt(1.40 * 8.314 * 293 / 28.8e-3), 0)
    c('pagina', 'ej 16.4: lambda 20 Hz', v / 20, 0)
    c('pagina', 'ej 16.4: lambda 20 kHz (cm)', 100 * v / 20000, 1)
    c('pagina', 'ej 16.3: v agua', sp.sqrt(2.18e9 / 1.00e3), -1)
    c('pagina', 'ej 16.3: lambda', 1480 / 262, 2)
    c('pagina', 'test s2: v 0 C', sp.sqrt(1.40 * 8.314 * 273.15 / 28.8e-3), 0)
    c('pagina', 'test s2: B Hg/agua', 13.6 * (1451 / 1482)**2, 1)
    c('pagina', 'ej 16.5: I (1e-6)', (3.0e-2)**2 / (2 * rho * v) / 1e-6, 1)
    c('pagina', 'ej 16.9: dB', 10 * sp.log(sp.Rational(1, 4), 10), 1)
    c('pagina', 'ej 16.8: I92 (1e-3)', 1e-12 * 10**9.2 / 1e-3, 1)
    c('pagina', 'test s3: +3 dB', 10 * sp.log(2, 10), 1)
    c('pagina', 'test s3: I80 (1e-4)', 1e-12 * 10**8 / 1e-4, 1)
    c('pagina', 'test s3: -20 dB', 10 * sp.log(sp.Rational(1, 100), 10), 0)
    c('pagina', 'Kundt 1000 Hz: v', 2 * 0.172 * 1000, 0)
    c('pagina', 'ej 16.11: L cerrado', 345 / (4 * 220), 3)
    c('pagina', 'ej 16.11: L abierto', 3 * 345 / (2 * 1100), 3)
    c('pagina', 'test s4: f1', v / (4 * 0.25), 0)
    c('pagina', 'test s4: f3', 3 * v / (4 * 0.25), 0)
    c('pagina', 'test s4: f5', 5 * v / (4 * 0.25), 0)
    c('pagina', 'test s4: Kundt', 2 * 0.050 * 3440, 0)
    c('pagina', 'canal auditivo f1', v / (4 * 0.025), 0)
    c('pagina', 'ej 16.12: vs/va', 2 * 0.80 / 4, 2)
    c('pagina', 'test s5: lambda aire', v / 137, 1)
    c('pagina', 'ej 16.13: dA', sp.sqrt(20), 2)
    c('pagina', 'ej 16.13: dB', sp.sqrt(17), 2)
    c('pagina', 'ej 16.13: delta', sp.sqrt(20) - sp.sqrt(17), 2)
    c('pagina', 'ej 16.13: f constructiva', 350 / 0.35, 0)
    c('pagina', 'ej 16.13: f destructiva', 350 / 0.70, 0)
    c('pagina', 'test s6: destructiva', v / 1.0, 0)
    c('pagina', 'test s6: constructiva', v / 0.50, 0)
    c('pagina', 'test s6: 60 dB coherentes', 60 + 10 * sp.log(4, 10), 1)
    c('pagina', 'test s7: tono medio', (256 + 260) / 2, 0)
    c('pagina', 'ej 16.16: fL', sp.Rational(310, 340) * 300, 0)
    c('pagina', 'ej 16.14: lambda reposo', sp.Rational(340, 300), 2)
    c('pagina', 'ej 16.14: lambda enfrente', sp.Rational(310, 300), 2)
    c('pagina', 'ej 16.14: lambda atras', sp.Rational(370, 300), 2)
    c('pagina', 'ej 16.15: fL', sp.Rational(340, 370) * 300, 0)
    c('pagina', 'ej 16.17: fL', sp.Rational(355, 385) * 300, 0)
    fW = sp.Rational(340, 310) * 300
    c('pagina', 'ej 16.18: fW', fW, 0)
    c('pagina', 'ej 16.18: fL', sp.Rational(370, 340) * fW, 0)
    c('pagina', 'test s8: receptor', sp.Rational(360, 340) * 500, 0)
    c('pagina', 'test s8: ambulancia', sp.Rational(340, 370) * 1000, 0)
    al = sp.asin(1 / 1.75)
    c('pagina', 'ej 16.19: alpha', sp.deg(al), 1)
    c('pagina', 'ej 16.19: vS', 1.75 * 320, 0)
    c('pagina', 'ej 16.19: t', 8000 / (1.75 * 320 * sp.tan(al)), 1)
    c('pagina', 'test s9: alpha Mach 2', sp.deg(sp.asin(sp.Rational(1, 2))), 0)
    c('pagina', 'test s9: Mach', 1 / sp.sin(pi / 4), 2)
