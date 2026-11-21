"""Tema 19: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp

R = sp.Float(8.314)
atm = sp.Float(1.013e5)
ln = sp.log


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- E1
    c('e1', 'W isobarico', 2 * R * 80, 0)
    c('e1', 'dT', 107 - 27, 0)
    # ---- E2, E3
    c('e2', 'W=Q', -410, 0)
    c('e3', 'dV', sp.Float(0.320 - 0.110), 3)
    W = sp.Float(1.65e5) * (0.320 - 0.110)
    c('e3', 'W', W / 1e4 + 1e-9, 2)  # 3,465 -> 3,47
    c('e3', 'dU', (sp.Float(1.15e5) - W) / 1e4, 2)
    # ---- E4
    c('e4', 'Ub-Ua', 700, 0)
    # ---- E5
    dU = 1500 - 2100
    dT = dU / (5 * sp.Rational(3, 2) * R)
    c('e5', 'dU', dU, 0)
    c('e5', 'dT', dT, 2)
    c('e5', 'T2 C', 127 + dT, 0)
    # ---- E6
    T = 65 + sp.Float(273.15)
    c('e6', 'T K', T, 2)
    c('e6', 'W', abs(2 * R * T * ln(sp.Rational(1, 3))), -1)  # 6180 (3 cifras)
    # ---- E7
    T = 77 + sp.Float(273.15)
    W = 0.150 * R * T * ln(sp.Rational(1, 4))
    c('e7', 'T K', T, 2)
    c('e7', 'W', W, 0)
    # ---- E9
    nn = sp.Float(0.0175)
    Ta = 0.20 * atm * 2.0e-3 / (nn * R)
    c('e9', 'Ta', Ta, 1)
    c('e9', 'pV a (L atm)', 0.20 * 2.0, 1)
    c('e9', 'pV b', 0.50 * 2.0, 1)
    c('e9', 'pV c', 0.30 * 6.0, 1)
    Wbc = sp.Rational(1, 2) * (0.50 + 0.30) * 4.0
    c('e9', 'Wbc L atm', Wbc, 1)
    c('e9', 'Wbc J', Wbc * 101.3, 0)
    c('e9', 'dU', 215 - Wbc * 101.3, 0)
    # ---- E10
    n = sp.Float(0.0100)
    c('e10', 'Qv', n * 12.47 * 40.0, 2)
    c('e10', 'Qp', n * 20.78 * 40.0, 2)
    c('e10', 'W', n * R * 40.0, 2)
    c('e10', 'Cp-Cv', 20.78 - 12.47, 2)
    # ---- E11
    n = sp.Float(0.250)
    c('e11', 'W', n * R * 100, 0)
    c('e11', 'dU', n * 28.46 * 100, 0)
    c('e11', 'Q', n * 28.46 * 100 + n * R * 100, -1)  # 920 (suma de redondeos)
    c('e11', 'nCpdT', n * 36.94 * 100 - 0.5 + 1e-9, 0)  # Cp=36,94 -> 923,5
    # ---- E12
    c('e12', 'W/Q', sp.Rational(2, 5) * 100, 0)
    # ---- E13
    n = 3
    p = 2.50 * atm
    V1, V2 = 3.20e-2, 4.50e-2
    c('e13', 'p', p / 1e5, 3)
    c('e13', 'T1', p * V1 / (n * R), 0)
    c('e13', 'T2', p * V2 / (n * R), 0)
    c('e13', 'W', p * (V2 - V1) / 1e3, 2)
    c('e13', 'Q', sp.Rational(5, 2) * p * (V2 - V1) / 1e3, 2)
    c('e13', 'dU', sp.Rational(3, 2) * p * (V2 - V1) / 1e3, 2)
    # ---- E14
    g = sp.Float(1.127)
    CV = R / (g - 1)
    c('e14', 'CV', CV, 1)
    c('e14', 'Cp', CV + R, 1)
    c('e14', 'g-1', g - 1, 3)
    # ---- E15
    n = sp.Float(0.185)
    dTv = 645 / (n * 20.76)
    dTp = 645 / (n * 29.07)
    c('e15', 'dTv', dTv, 1)
    c('e15', 'Tv', 780 + dTv, 0)
    c('e15', 'dTp', dTp, 1)
    c('e15', 'Tp', 780 + dTp, 0)
    # ---- E16
    n = sp.Float(0.100)
    T1 = 1.00e5 * 2.50e-3 / (n * R)
    c('e16', 'T1', T1, 0)
    c('e16', 'p isot', 1.00e5 / 2 / 1e4, 2)
    c('e16', 'T isob', 2 * T1, 0)
    c('e16', 'T adiab', T1 * sp.Float(2) ** sp.Rational(-2, 3), 0)
    c('e16', 'p adiab', 1.00e5 * sp.Float(2) ** sp.Rational(-5, 3) / 1e4, 2)
    c('e16', 'pV', 250, 0)
    # ---- E17
    r = 1 / sp.Float(0.0900)
    T2 = 293.15 * r ** sp.Float(0.40)
    c('e17', 'r', r, 1)
    c('e17', 'T2', T2, 0)
    c('e17', 'T2 C', T2 - 273.15, 0)
    c('e17', 'p2', r ** sp.Float(1.40), 1)
    c('e17', 'p2 check', r * T2 / 293.15, 1)
    # ---- E18
    T2 = 299.15 * (0.850 / 1.01) ** (0.4 / 1.4)
    c('e18', 'T2', T2, 1)
    c('e18', 'T2 C', T2 - 273.15, 1)
    c('e18', 'exponente', 0.4 / 1.4, 4)
    c('e18', 'enfria', 299.15 - T2, 0)
    # ---- E19
    n = 5
    p1, V1, W = 2.50e3, 2.10, 1480
    T1 = p1 * V1 / (n * R)
    dTw = W / (n * 1.5 * R)
    T2 = T1 - dTw
    pf = p1 * (T2 / T1) ** sp.Rational(5, 2)
    V2 = V1 * (T1 / T2) ** sp.Rational(3, 2)
    c('e19', 'p1V1', p1 * V1, 0)
    c('e19', 'nR', n * R, 2)
    c('e19', 'T1', T1, 1)
    c('e19', 'dT', dTw, 1)
    c('e19', 'T2', T2, 1)
    c('e19', 'T2/T1', T2 / T1, 4)
    c('e19', 'p2', pf / 1e3, 2)
    c('e19', 'V2', V2, 3)
    c('e19', 'p2 check', p1 * (V1 / V2) ** sp.Rational(5, 3), 0)
    # ---- E20
    r = 1 / sp.Float(0.8)
    T2 = 293.15 * r ** sp.Float(0.40)
    V1 = sp.Rational(4, 3) * sp.pi * sp.Float(0.1195) ** 3
    n = 2.026e5 * V1 / (R * 293.15)
    c('e20', 'T2', T2, 1)
    c('e20', 'T2 C', T2 - 273.15, 1)
    c('e20', 'V1', V1 * 1e3, 2)
    c('e20', 'n', n, 3)
    c('e20', 'dT', T2 - 293.15, 1)
    c('e20', 'dU', n * 20.76 * (T2 - 293.15), 0)
    # ---- E21
    dUab = 90 - 60
    c('e21', 'dUab', dUab, 0)
    c('e21', 'Qadb', dUab + 15, 0)
    c('e21', 'Qba', -dUab - 35, 0)
    c('e21', 'Wad', 15, 0)
    c('e21', 'Qad', 8 - 0 + 15, 0)
    c('e21', 'Qdb', dUab - 8, 0)
    # ---- E22
    c('e22', 'Tc/Ta', (1.0e5 * 0.06) / (3.0e5 * 0.02), 0)
    c('e22', 'Wbc', 1.0e5 * 0.040, 0)
    c('e22', 'Wtrapecio', 0.5 * (3.0e5 + 1.0e5) * 0.040, 0)
    # ---- E23
    n = sp.Float(3.25)
    pc, Vc, Va, pa = 2.0e5, 0.040, 0.010, None
    pa = pc * Vc / Va
    Ta = pa * Va / (n * R)
    c('e23', 'pa', pa / 1e5, 1)
    c('e23', 'Ta', Ta, 0)
    c('e23', 'Tb', 4 * Ta, 0)
    Qab = sp.Rational(5, 2) * pa * (Vc - Va)
    Qbc = sp.Rational(3, 2) * Vc * (pc - pa)
    Qca = n * R * Ta * ln(sp.Rational(1, 4))
    c('e23', 'Qab', Qab / 1e4, 2)
    c('e23', 'Qbc', abs(Qbc) / 1e4, 2)
    c('e23', 'Qca', abs(Qca) / 1e4, 2)
    c('e23', 'nRTa', n * R * Ta, 0)
    c('e23', 'dUab', sp.Rational(3, 2) * pa * (Vc - Va) / 1e4, 2)
    c('e23', 'Wciclo', (Qab + Qbc + Qca) / 1e4, 2)
    # ---- E24
    n = 3
    CV = 29.1 - R
    Wac = n * R * 192
    Wcb = -n * CV * 108
    c('e24', 'Wac', Wac, 0)
    c('e24', 'CV', CV, 2)
    c('e24', 'Wcb', abs(Wcb), 0)
    c('e24', 'W', (Wac + Wcb) / 1e3, 2)
    # ---- E8
    p1, p2, V1, V2 = sp.symbols('p1 p2 V1 V2')
    Wt = p1 * (V2 - V1) + 0 + p2 * (V1 - V2) + 0
    assert sp.simplify(Wt - (p1 - p2) * (V2 - V1)) == 0
    # ---- VDW
    n, a, b, T = 1.80, 0.554, 6.38e-5, 300
    V1, V2 = 2.00e-3, 4.00e-3
    t1 = n * R * T * ln((V2 - n * b) / (V1 - n * b))
    t2 = a * n**2 * (1 / V2 - 1 / V1)
    c('vdw', 'nb', n * b * 1e4, 3)
    c('vdw', 't1', t1, 0)
    c('vdw', 't2', abs(t2), 0)
    c('vdw', 'W vdw', (t1 + t2) / 1e3, 2)
    c('vdw', 'W ideal', n * R * T * ln(2) / 1e3, 2)
    # ---- X1
    Ua, Ub, Uc, Ud = 150, 240, 680, 330
    Wabc, Wadc = 450, 120
    c('x1', 'dUab', Ub - Ua, 0)
    c('x1', 'dUbc', Uc - Ub, 0)
    c('x1', 'dUad', Ud - Ua, 0)
    c('x1', 'dUdc', Uc - Ud, 0)
    c('x1', 'Qab', Ub - Ua, 0)
    c('x1', 'Qbc', Uc - Ub + Wabc, 0)
    c('x1', 'Qad', Ud - Ua + Wadc, 0)
    c('x1', 'Qdc', Uc - Ud, 0)
    c('x1', 'Qabc', (Ub - Ua) + (Uc - Ub) + Wabc, 0)
    c('x1', 'Qadc', (Ud - Ua) + (Uc - Ud) + Wadc, 0)
    # ---- X2
    p1, V1, V2, g = 3e5, 0.10, 0.05, sp.Rational(5, 3)
    p2 = p1 * (V1 / V2) ** g
    W = (p1 * V1 - p2 * V2) / (g - 1)
    c('x2', 'p2', p2 / 1e5, 2)
    c('x2', 'p1V1', p1 * V1, 0)
    c('x2', 'p2V2', p2 * V2, 0)
    c('x2', 'W', W / 1e4, 2)
    c('x2', 'T2/T1', 2 ** sp.Rational(2, 3), 3)
    c('x2', 'dU', -W, 0)
    c('x2', 'isot', p1 * 2 / 1e5, 0)
    # ---- X3
    p1V1 = 1.013e5 * 3e-3
    g = sp.Rational(5, 3)
    p2 = 1.013e5 * 3 ** (-g)
    c('x3', 'p1V1', p1V1, 1)
    c('x3', 'p2 atm', 3 ** (-g), 3)
    c('x3', 'p2 Pa', p2 / 1e4, 2)
    W = p1V1 / (g - 1) * (1 - 3 ** (-sp.Rational(2, 3)))
    c('x3', 'W', W, 0)
    c('x3', 'T2/T1', 3 ** (-sp.Rational(2, 3)), 3)
    c('x3', 'isot', p1V1 * ln(3), 0)
    # ---- X4
    V = 1e-3
    n1 = 2 * 1.013e5 * V / (R * 300)
    n2 = 1.013e5 * V / (R * 300)
    c('x4', 'n1', n1, 4)
    c('x4', 'n2', n2, 4)
    c('x4', 'pf', (2 + 1) / 2, 1)
    c('x4', 'pf Pa', 1.5 * 1.013e5 / 1e5, 2)
    # c('x4', 'V1f', n1 * R * 300 / (1.5 * 1.013e5) * 1e3, 3)
    t1 = 2 * 1.013e5 * V / 300 * ln(sp.Rational(4, 3))
    t2 = 1.013e5 * V / 300 * ln(sp.Rational(2, 3))
    c('x4', 't1', t1, 4)
    c('x4', 't2', abs(t2), 4)
    c('x4', 'dS', t1 + t2, 3)
    # ---- X5
    VA, pA = 5e-4, 1.013e5
    VB = 4 * VA
    pC = pA / 4
    pVA, pVB, pVC = pA * VA, pA * VB, pC * VB
    TA, TB, TC = pVA / R, pVB / R, pVC / R
    c('x5', 'pVA', pVA, 2)
    c('x5', 'pVB', pVB, 1)
    c('x5', 'pC', pC / 1e4, 3)
    c('x5', 'TA', TA, 2)
    c('x5', 'TB', TB, 1)
    c('x5', 'TC', TC, 2)
    Wab = pA * (VB - VA)
    dUab = sp.Rational(3, 2) * (pVB - pVA)
    Qab = dUab + Wab
    Wca = pVA * ln(sp.Rational(1, 4))
    c('x5', 'Wab', Wab, 2)
    c('x5', 'dUab', dUab, 1)
    c('x5', 'Qab', Qab, 1)
    c('x5', 'dUbc', abs(sp.Rational(3, 2) * (pVC - pVB)), 1)
    c('x5', 'Wca', abs(Wca), 1)
    Wc = Wab + Wca
    c('x5', 'Wciclo', Wc, 1)
    c('x5', 'dSab', sp.Rational(5, 2) * R * ln(4), 1)
    c('x5', 'dSbc', abs(sp.Rational(3, 2) * R * ln(sp.Rational(1, 4))), 1)
    c('x5', 'dSca', abs(R * ln(sp.Rational(1, 4))), 1)
    c('x5', 'e', Wc / Qab, 3)
    # ---- X6
    n, Rr = 3, sp.Float(8.31)
    TB = 300 + sp.Float(273.15)
    TA = TB * 1 / 4
    VB = n * Rr * TB / 4e5
    VC = 4 * VB
    Qab = n * sp.Rational(3, 2) * Rr * (TB - TA)
    Qbc = n * Rr * TB * ln(4)
    Qca = n * sp.Rational(5, 2) * Rr * (TA - TB)
    Wca = 1e5 * (VB - VC)
    QH = Qab + Qbc
    W = QH + Qca
    c('x6', 'TA', TA, 2)
    c('x6', 'VB', VB, 5)
    c('x6', 'VC', VC, 5)
    c('x6', 'dT', TB - TA, 2)
    c('x6', 'Qab', Qab, 0)
    c('x6', 'Qbc', Qbc, 0)
    c('x6', 'Qca', abs(Qca), 0)
    c('x6', 'Wca', 1e5 * (0.14289 - 0.03572), 0)
    c('x6', 'dUca', abs(Qca - Wca), 0)
    c('x6', 'QH', QH, 0)
    c('x6', 'W', W, 0)
    c('x6', 'e', W / QH, 3)
    c('x6', 'eC', 1 - TA / TB, 2)
    # ---- X7
    n, Tb = sp.Float(1.5), sp.Float(573.2)
    Ta = Tb * 1.5 / 4
    Vb = n * R * Tb / 4e5
    Vc = Vb * 4 / 1.5
    Qab = n * 1.5 * R * (Tb - Ta)
    Wbc = n * R * Tb * ln(sp.Float(4) / 1.5)
    Wca = 1.5e5 * (Vb - Vc)
    Qca = n * 2.5 * R * (Ta - Tb)
    QH = Qab + Wbc
    W = QH + Qca
    c('x7', 'Ta', Ta, 2)
    c('x7', 'Va', Vb, 5)
    c('x7', 'Vc', Vc, 5)
    c('x7', 'Qab', Qab, 0)
    c('x7', 'Wbc', Wbc, 0)
    c('x7', 'Wca', abs(Wca), 0)
    c('x7', 'Qca', abs(Qca), 0)
    c('x7', 'QH', QH, 0)
    c('x7', 'W', W, 0)
    c('x7', 'e', W / QH * 100, 1)
    c('x7', 'eC', (1 - Ta / Tb) * 100, 1)
    # ---- X8
    pa, pc, Va, Vb = 4e5, 2e5, 0.55, 0.82
    pVa, pVb, pVc = pa * Va, pa * Vb, pc * Vb
    c('x8', 'pVa', pVa / 1e3, 0)
    c('x8', 'pVb', pVb / 1e3, 0)
    c('x8', 'pVc', pVc / 1e3, 0)
    Wab = pa * (Vb - Va)
    dUab = 1.5 * (pVb - pVa)
    dUbc = 1.5 * (pVc - pVb)
    Wca = (pc + pa) / 2 * (Va - Vb)
    dUca = 1.5 * (pVa - pVc)
    c('x8', 'Wab', Wab / 1e3, 0)
    c('x8', 'dUab', dUab / 1e3, 0)
    c('x8', 'Qab', Wab + dUab, 0)
    c('x8', 'dUbc', abs(dUbc) / 1e3, 0)
    c('x8', 'Wca', abs(Wca) / 1e3, 0)
    c('x8', 'dUca', dUca / 1e3, 0)
    c('x8', 'Qca', dUca + Wca, 0)
    c('x8', 'Wciclo', Wab + Wca, 0)
    c('x8', 'triangulo', 0.5 * (Vb - Va) * (pa - pc), 0)
    # dQ = (5/2 p + 3/2 s V) dV
    s = (pa - pc) / (Va - Vb)
    V = sp.symbols('V')
    pr = pc + s * (V - Vb)
    Vs = sp.solve(sp.Rational(5, 2) * pr + sp.Rational(3, 2) * s * V, V)[0]
    pVf = lambda Vx: pc + s * (Vx - Vb)
    Qcs = sp.integrate(sp.Rational(5, 2) * pr + sp.Rational(3, 2) * s * V, (V, Vb, Vs))
    Qsa = sp.integrate(sp.Rational(5, 2) * pr + sp.Rational(3, 2) * s * V, (V, Vs, Va))
    c('x8', 's', abs(s) / 1e5, 2)
    c('x8', 'V*', Vs, 3)
    c('x8', 'Qcs', Qcs, 0)
    c('x8', 'Qsa (centenas, texto 25 521)', abs(Qsa) - 25000, 0)
    c('x8', 'QH', Wab + dUab + Qcs, 0)
    c('x8', 'e', (Wab + Wca) / (Wab + dUab + Qcs) * 100, 1)
    c('x8', 'e alt', (Wab + Wca) / (Wab + dUab + dUca + Wca) * 100, 1)
    # ---- X9
    pa, Va, Vb = 70e3, 0.03, 0.1
    Ta = pa * Va / R
    pb = pa * Va / Vb
    Tc = pa * Vb / R
    Wab = pa * Va * ln(Vb / Va)
    dUbc = 2.5 * (pa * Vb - pb * Vb)
    Wca = pa * (Va - Vb)
    Qca = 3.5 * (pa * Va - pa * Vb)
    Wn = Wab + Wca
    Qc = Wab + dUbc
    c('x9', 'Ta', Ta, 1)
    c('x9', 'pb', pb / 1e3, 0)
    c('x9', 'Tc', Tc, 1)
    c('x9', 'Wab', Wab, 0)
    c('x9', 'dUbc', dUbc, 0)
    c('x9', 'Wca', abs(Wca), 0)
    c('x9', 'Qca (texto 17 150)', abs(Qca) - 17000, 0)
    c('x9', 'Wneto', abs(Wn), 0)
    c('x9', 'Qc', Qc, 0)
    c('x9', 'K', Qc / abs(Wn), 2)
    # ---- X10
    m = 1000.0
    cp = 0.25 * 4.18 * 1000
    cv = cp / 1.4
    r = cp - cv
    p1, T1 = 1.013e5, 288.15
    V1 = m / 1000 * r * T1 / p1
    p2 = 30 * p1
    T2 = T1 * 30 ** (0.4 / 1.4)
    V2 = V1 * (1 / 30) ** (1 / 1.4)
    Q23 = 300e3 * 4.18
    dT = Q23 / (m / 1000 * cp)
    T3 = T2 + dT
    V3 = V2 * T3 / T2
    T4 = T3 * (V3 / V1) ** 0.4
    p4 = 30 * p1 * (V3 / V1) ** 1.4
    Q41 = m / 1000 * cv * (T1 - T4)
    W12 = m / 1000 * cv * (T1 - T2)
    W23 = p2 * (V3 - V2)
    W34 = m / 1000 * cv * (T3 - T4)
    W = W12 + W23 + W34
    e = W / Q23
    c('x10', 'cp', cp, 0)
    c('x10', 'cv', cv, 1)
    c('x10', 'r', r, 1)
    c('x10', 'V1', V1, 3)
    c('x10', 'T2', T2, 1)
    c('x10', 'V2', V2, 4)
    c('x10', 'p2 Pa', p2 / 1e6, 2)
    c('x10', 'Q', Q23 / 1e6, 3)
    c('x10', 'dT', dT, 0)
    c('x10', 'T3', T3, 1)
    c('x10', 'V3', V3, 4)
    c('x10', 'T4', T4, 1)
    c('x10', 'p4 atm', p4 / p1, 2)
    c('x10', 'p4 Pa', p4 / 1e5, 2)
    c('x10', 'p4 isocora', p1 * T4 / T1 / p1, 2)
    c('x10', 'Q41', abs(Q41) / 1e5, 2)
    c('x10', 'W12', abs(W12) / 1e5, 2)
    c('x10', 'W23', W23 / 1e5, 2)
    c('x10', 'W34', W34 / 1e5, 2)
    c('x10', 'W', W / 1e5, 2)
    c('x10', 'e', e, 3)
    c('x10', 'e formula', 1 - (T4 - T1) / (T3 - T2) / 1.4, 3)
    # ---- Teoria: ejemplo 19.5 (agua hirviendo)
    c('pagina', 'dU agua', 2256 - 169, 0)
    # ---- teoría en formato estudio: ejemplos mínimos de las cajas y mini-tests (pagina)
    c('pagina', 'ej. propio isoterma W', R * 300 * ln(2), 0)
    c('pagina', 'ej. propio isobara p1V1', R * 300, 0)
    c('pagina', 'ej 19.5 W', atm * 1670e-6, 0)
    c('pagina', 'ej 19.5 Q', 1e-3 * 2.256e6, 0)
    Cv = R / sp.Float(0.400)
    c('pagina', 'ej 19.6 Cv', Cv, 2)
    c('pagina', 'ej 19.6 dU mant', -2500 * Cv * (-9.0) / 1e5, 2)
    c('pagina', 'ej 19.7 T2', 300 * sp.Float(15) ** sp.Float(0.4), 0)
    c('pagina', 'ej 19.7 p2', 1.01e5 * sp.Float(15) ** sp.Float(1.4) / 1e5, 1)
    c('pagina', 'test s1 W isobara', 1.5e5 * 3.0e-3, 0)
    c('pagina', 'test s1 W isoterma', 2 * R * 400 * ln(sp.Rational(1, 3)), 0)
    c('pagina', 'test s2 dU', 500 - 200, 0)
    c('pagina', 'test s2 Q2', (80 - 30) + 10, 0)
    c('pagina', 'test s4 Q', 2 * sp.Rational(5, 2) * R * 40, 0)
    c('pagina', 'test s4 dU', 2 * sp.Rational(3, 2) * R * 40, 0)
    c('pagina', 'test s4 W', 2 * R * 40, 0)
    c('pagina', 'test s4 Cv', R / sp.Float(0.30), 2)
    c('pagina', 'test s4 Cp', R / sp.Float(0.30) + R, 2)
    c('pagina', 'test s5 T2', 300 * sp.Float(10) ** sp.Float(0.4), 0)
    c('pagina', 'test s5 p2/p1', sp.Integer(2) ** sp.Rational(-5, 3), 3)
    c('pagina', 'test s5 T2/T1', sp.Integer(2) ** sp.Rational(-2, 3), 3)
    c('pagina', 'test s5 W', (600 - 400) / sp.Rational(2, 3), 0)
    c('pagina', 'test s6 W', 500 - 200 + 100 - 250, 0)
    c('pagina', 'test s6 e', sp.Rational(150, 600), 2)
    c('pagina', 'test s6 dU diat', sp.Rational(5, 2) * (500 - 200), 0)
    c('pagina', 'test s6 e2', sp.Rational(900 + 300 - 1000, 1200), 3)
    # ---- D9: errores
    c('pagina', 'error 1: T del fallo', 127 + 3600 / (5 * 1.5 * 8.314), 0); c('pagina', 'error 1: T', 127 + (1500 - 2100) / (5 * 1.5 * 8.314), 0)
    c('pagina', 'error 2: del fallo', 0.0100 * 12.47 * 40.0, 2); c('pagina', 'error 2: Q', 0.0100 * 20.78 * 40.0, 2)
    c('pagina', 'error 3: del fallo (1e5)', 3e5 * 2**1.4 / 1e5, 2); c('pagina', 'error 3: p (1e5)', 3e5 * 2**(sp.Rational(5, 3)) / 1e5, 2)
    c('pagina', 'error 4: Q (1e3)', 0.5 * (3.0 + 1.0) * 1e5 * 0.040 / 1e3, 1)
