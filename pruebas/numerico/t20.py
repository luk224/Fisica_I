"""Tema 20: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp

R = 8.314
atm = 1.013e5
ln = sp.log
Lf = 3.34e5


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- E1
    QH = 2200 + 4300
    c('e1', 'QH', QH, 0)
    c('e1', 'e', 2200 / QH, 2)
    # ---- E2
    c('e2', 'W', 9000 - 6400, 0)
    c('e2', 'e', 2600 / 9000, 2)
    # ---- E3
    W = 3.10e4 / 2.10
    c('e3', 'W', W / 1e4, 2)
    c('e3', 'QH', (W + 3.10e4) / 1e4, 2)
    # ---- E4
    e = 1 - 9.5**(-0.4)
    c('e4', 'e', e, 3)
    c('e4', 'QC', (1 - round(e, 3)) * 10000, -1)
    c('e4', 'W', round(e, 3) * 10000, -1)
    # ---- E5
    e1, e2 = 1 - 8.8**(-0.4), 1 - 9.6**(-0.4)
    c('e5', 'e1', e1, 3)
    c('e5', 'e2', e2, 3)
    c('e5', 'aumento pp', 100 * (e2 - e1), 1)
    # ---- E6
    QC = 6450 * 300 / 520
    c('e6', 'QC', QC / 1e3, 2)
    c('e6', 'W', (6450 - QC) / 1e3, 2)
    c('e6', 'e', (6450 - QC) / 6450, 3)
    # ---- E7
    QH = 2.5e4 / 0.66
    c('e7', 'QH', QH / 1e4, 1)
    TH = 293.15 / 0.34
    c('e7', 'TH', TH, 0)
    c('e7', 'TH C', TH - 273.15, 0)
    c('e7', 'QC', (QH - 2.5e4) / 1e4, 2)
    # ---- E8
    QH = 415 * 320 / 270
    c('e8', 'QH', QH, 0)
    Wc = QH - 415
    c('e8', 'W ciclo', Wc, 0)
    c('e8', 'P', 165 * Wc / 60, 0)
    c('e8', 'K', 415 / Wc, 1)
    c('e8', 'K Carnot', 270 / 50, 1)
    # ---- E9
    QC = 85.0 * Lf
    QH = QC * 297.15 / 273.15
    c('e9', 'QC', QC / 1e7, 2)
    c('e9', 'QH', QH / 1e7, 2)
    c('e9', 'W', (QH - QC) / 1e6, 1)
    c('e9', 'K', 273.15 / 24, 1)
    # ---- E10
    QC = 0.0400 * Lf
    QH = QC * 373.15 / 273.15
    c('e10', 'QC', QC / 1e4, 3)
    c('e10', 'QH', QH / 1e4, 3)
    c('e10', 'W', (QH - QC) / 1e3, 2)
    c('e10', 'P', (QH - QC) / 300, 0)
    # ---- E11
    W = 15.0 * 9.80 * 2.00
    QC = 500 - W
    TC = 773.15 * QC / 500
    c('e11', 'W', W, 0)
    c('e11', 'QC', QC, 0)
    c('e11', 'TC', TC, 1)
    c('e11', 'TC C', TC - 273.15, 0)
    c('e11', 'e %', W / 5, 1)
    c('e11', 'pa', 2.00 * R * 773.15 / 5.00e-3 / 1e6, 2)
    c('e11', 'pa atm', 2.00 * R * 773.15 / 5.00e-3 / atm, 0)
    # ---- E12
    c('e12', 'DS', -1850 / 293.15, 2)
    # ---- E13
    Q = 0.350 * Lf
    c('e13', 'Q', Q / 1e5, 3)
    dS1 = Q / 273.15
    dS2 = -Q / 298.15
    c('e13', 'dS agua', dS1, 0)
    c('e13', 'dS fuente', dS2, 0)
    c('e13', 'dS total', dS1 + dS2, 0)
    # ---- E14
    dS = 0.100 * R * ln(425 / 2.40e-3)
    c('e14', 'ln', ln(425 / 2.40e-3), 2)
    c('e14', 'nR', 0.100 * R, 4)
    c('e14', 'dS', dS, 1)
    # ---- E15
    dS1 = 0.250 * 4190 * ln(293.15 / 358.15)
    Q = 0.250 * 4190 * 65
    dS2 = Q / 293.15
    c('e15', 'dS agua', dS1, 0)
    c('e15', 'Q', Q / 1e4, 2)
    c('e15', 'dS aire', dS2, 0)
    c('e15', 'total', dS1 + dS2, 0)
    # ---- E16
    T = (195 * 30 + 5 * 100) / 200
    c('e16', 'T', T, 2)
    c('e16', 'T K', T + 273.15, 2)
    s1 = 195 * 4190 * ln(304.90 / 303.15)
    s2 = 5 * 4190 * ln(304.90 / 373.15)
    c('e16', 'dS bano', s1, 0)
    c('e16', 'dS hirviendo', s2, 0)
    c('e16', 'total', s1 + s2, 0)
    # ---- E17
    c('e17', 'TC', 300 * 0.935, 1)
    c('e17', 'TC C', 300 * 0.935 - 273.15, 1)
    # ---- E18
    P = 10e6 / 0.065
    c('e18', 'PH', P / 1e8, 2)
    c('e18', 'dS/t', P / 300 / 1e5, 1)
    # ---- E19: simbólico
    QH, TH, TC = sp.symbols('QH TH TC', positive=True)
    assert sp.simplify((QH * TC / TH) / TC - QH / TH) == 0
    # ---- E20
    c('e20', 'PH', 10 + 165, 0)
    c('e20', 'e', 10 / 175 * 100, 1)
    c('e20', 'e mal', 10 / 165 * 100, 1)
    # ---- E21
    n = 0.350
    g = 1.40
    CV = round(R / (g - 1), 2)
    Cp = round(CV + R, 2)
    T1, T2 = 300.0, 600.0
    T3 = 492.0
    V1 = n * R * T1 / atm
    c('e21', 'CV', CV, 2)
    c('e21', 'Cp', Cp, 2)
    c('e21', 'V1', V1 * 1e3, 2)
    c('e21', 'p2', atm * T2 / T1 / 1e5, 2)
    c('e21', 'V3', V1 * T3 / T1 * 1e3, 1)
    c('e21', 'T3 adiabatica', 600 * 0.5**(0.4 / 1.4), 1)
    Q12 = n * CV * (T2 - T1)
    dU23 = n * CV * (T3 - T2)
    c('e21', 'Q12', Q12, 0)
    c('e21', 'dU23', dU23, 0)
    W31 = n * R * (T1 - T3)
    Q31 = n * (R / (g - 1) + R) * (T1 - T3)
    c('e21', 'W31', W31, 0)
    c('e21', 'Q31', Q31, 0)
    c('e21', 'dU31', n * CV * (T1 - T3), 0)
    Wn = -dU23 + W31
    c('e21', 'Wnet', Wn, 0)
    c('e21', 'Qnet', Q12 + Q31, 0)
    c('e21', 'e', Wn / Q12 * 100, 1)
    # ---- E22
    Rq = 8.3145
    n = 2.00
    Tb = 600.15
    Ta = Tb / 3
    Va = n * Rq * Tb / 3.00e5
    Vc = 3 * Va
    CVh, Cph = 1.5 * Rq, 2.5 * Rq
    Qab = n * CVh * (Tb - Ta)
    Qbc = n * Rq * Tb * ln(3)
    Qca = n * Cph * (Ta - Tb)
    c('e22', 'Ta', Ta, 2)
    c('e22', 'Va', Va, 4)
    c('e22', 'Vc', Vc, 4)
    c('e22', 'Qab', Qab, 0)
    c('e22', 'Qbc', Qbc, 0)
    c('e22', 'QH', (Qab + Qbc) / 1e4, 2)
    c('e22', 'Qca', Qca, 0)
    c('e22', 'W', (Qab + Qbc + Qca) / 1e3, 2)
    c('e22', 'e', (Qab + Qbc + Qca) / (Qab + Qbc) * 100, 0)
    c('e22', 'eC', (1 - 200 / 600) * 100, 0)
    # ---- E23
    pa, pb, pc = 3e5, 3e5, 1e5
    Va, Vb, Vc = 0.5, 0.8, 0.8
    pV = {k: p * V for k, (p, V) in dict(a=(pa, Va), b=(pb, Vb), c=(pc, Vc)).items()}
    c('e23', 'pVb', pV['b'], 0)
    c('e23', 'pVc', pV['c'], 0)
    Wab = pa * (Vb - Va)
    dUab = 1.5 * (pV['b'] - pV['a'])
    c('e23', 'Wab', Wab, 0)
    c('e23', 'dUab', dUab, 0)
    c('e23', 'Qab', Wab + dUab, 0)
    c('e23', 'Qbc', 1.5 * (pV['c'] - pV['b']), 0)
    Wca = -0.5 * (pa + pc) * (Vb - Va)
    dUca = 1.5 * (pV['a'] - pV['c'])
    c('e23', 'Wca', Wca, 0)
    c('e23', 'dUca', dUca, 0)
    c('e23', 'Qca', Wca + dUca, 0)
    Wcic = Wab + Wca
    c('e23', 'Wciclo', Wcic, 0)
    # recta c->a: p = pc + s (V - Vc), dQ = (5/2 p + 3/2 s V) dV
    V, s = sp.symbols('V s')
    sv = (pa - pc) / (Va - Vc)
    p = pc + sv * (V - Vc)
    dQ = sp.Rational(5, 2) * p + sp.Rational(3, 2) * sv * V
    Vs = float(sp.solve(dQ, V)[0])
    def Qtr(v1, v2):
        return float(sp.integrate(dQ, (V, v1, v2)))
    c('e23', 's', sv / 1e5, 2)
    c('e23', 'V*', Vs, 3)
    Qin = Qtr(Vc, Vs)
    Qout = Qtr(Vs, Va)
    c('e23', 'Q c->V*', Qin, 0)
    QH = Wab + dUab + Qin
    c('e23', 'QH', QH, 0)
    c('e23', 'e', Wcic / QH * 100, 1)
    c('e23', 'e neto', Wcic / 270000 * 100, 1)
    c('e23', 'eC', (1 - pV['c'] / pV['b']) * 100, 0)
    # ---- E24
    r, g = 10.6, 1.40
    e = 1 - r**-0.4
    c('e24', 'e', e, 3)
    c('e24', 'QC', -(1 - e) * 200, 0)
    c('e24', 'W', e * 200, 0)
    Vmin = 0.0864 * sp.pi * 0.04125**2 / (r - 1)
    Va = r * Vmin
    c('e24', 'Vmin', Vmin * 1e5, 2)
    c('e24', 'Va', Va * 1e4, 2)
    Ta, pa = 300.0, 8.50e4
    Tb = Ta * r**0.4
    pb = pa * r * Tb / Ta
    c('e24', 'Tb', Tb, 0)
    c('e24', 'pb', pb / 1e6, 2)
    n = pa * Va / (R * Ta)
    c('e24', 'n', n, 5)
    Tc = Tb + 200 / (n * 20.5)
    pc = pb * Tc / Tb
    c('e24', 'Tc', Tc, 0)
    c('e24', 'pc', pc / 1e6, 2)
    Td = Tc / r**0.4
    pd = pa * Td / Ta
    c('e24', 'Td', Td, 0)
    c('e24', 'pd', pd / 1e5, 2)
    c('e24', 'Qda', n * 20.5 * (Ta - Td), 0)
    c('e24', 'eC', (1 - Ta / Tc) * 100, 1)
    # ---- PP
    ma, mh = 0.600, 0.0500
    ca, ch = 4190, 2100
    T = (ma * ca * 45 + 0) / 1  # placeholder
    T = sp.symbols('T')
    sol = sp.solve(ma * ca * (45 - T) - (mh * ch * 15 + mh * Lf + mh * ca * T), T)[0]
    c('pp', 'T', sol, 1)
    c('pp', 'calor hielo', mh * ch * 15, 0)
    c('pp', 'fusion', mh * Lf, 0)
    c('pp', 'lado izq', ma * ca * 45, 0)
    c('pp', 'coef T', ma * ca, 0)
    c('pp', 'coef T2', mh * ca, 1)
    Tk = float(sol) + 273.15
    c('pp', 'T K', Tk, 2)
    s1 = mh * ch * ln(273.15 / 258.15)
    s2 = mh * Lf / 273.15
    s3 = mh * ca * ln(Tk / 273.15)
    s4 = ma * ca * ln(Tk / 318.15)
    c('pp', 's1', s1, 2)
    c('pp', 's2', s2, 2)
    c('pp', 's3', s3, 2)
    c('pp', 's4', s4, 2)
    c('pp', 'total', s1 + s2 + s3 + s4, 1)
    # ---- X1
    TH, TC = 450, 150
    c('x1', 'K', TC / (TH - TC), 2)
    Wc = 60000 * 2
    c('x1', 'W', Wc / 1e5, 1)
    c('x1', 'QC', 0.5 * Wc / 1e4, 1)
    c('x1', 'QH', 1.5 * Wc / 1e5, 1)
    n = 18
    Ww = n * 1.5 * R * 300
    c('x1', 'Wadiab', Ww / 1e4, 2)
    lnr = 1.8e5 / (n * R * 450)
    c('x1', 'ln', lnr, 3)
    c('x1', 'razon', sp.exp(lnr), 1)
    c('x1', 'inversa', sp.exp(-lnr), 3)
    Vc = 0.5
    pc = n * R * TC / Vc
    c('x1', 'pc', pc / 1e4, 2)
    Vb = Vc * (TC / TH)**1.5
    pb = n * R * TH / Vb
    c('x1', 'Vb', Vb, 4)
    c('x1', 'pb', pb / 1e5, 1)
    c('x1', 'pb atm', pb / atm, 1)
    c('x1', 'pb adiab', pc * (Vc / Vb)**(5 / 3) / 1e5, 2)
    # vertices a, d: V_a = V_b/ratio, V_d = V_c*ratio
    ra = float(sp.exp(lnr))
    Va = Vb / ra
    Vd = Vc / ra
    c('x1', 'Va', Va * 1e3, 2)
    c('x1', 'pa', n * R * TH / Va / 1e7, 2)
    c('x1', 'Vd', Vd, 4)
    c('x1', 'pd', n * R * TC / Vd / 1e5, 2)
    c('x1', 'dS', 6e4 / 150, 0)
    # ---- X2
    n, T1, V1, p2, V3 = 1, 500.0, 5e-3, 4 * atm, 20e-3
    nRT = n * R * T1
    p1 = nRT / V1
    c('x2', 'p1', p1 / 1e5, 2)
    c('x2', 'p1 atm', p1 / atm, 2)
    c('x2', 'nRT', nRT, 0)
    V2 = p1 * V1 / p2
    c('x2', 'V2', V2 * 1e3, 2)
    T3 = T1 * (V2 / V3)**0.4
    c('x2', 'T3', T3, 1)
    p3 = n * R * T3 / V3
    c('x2', 'p3', p3 / 1e5, 2)
    c('x2', 'p3 atm', p3 / atm, 2)
    V4 = V1 * V3 / V2
    c('x2', 'V4', V4 * 1e3, 2)
    p4 = n * R * T3 / V4
    c('x2', 'p4', p4 / 1e5, 2)
    c('x2', 'p4 atm', p4 / atm, 2)
    Q12 = nRT * ln(V2 / V1)
    c('x2', 'ratio', V2 / V1, 3)
    c('x2', 'Q12', Q12, 0)
    W23 = 2.5 * R * (T1 - T3)
    c('x2', 'dT', T1 - T3, 1)
    c('x2', 'W23', W23, 0)
    Q34 = -n * R * T3 * ln(V2 / V1)
    c('x2', 'Q34', Q34, 0)
    W = Q12 + Q34
    c('x2', 'W', W, 0)
    c('x2', 'e', W / Q12, 3)
    c('x2', 'e Carnot', 1 - T3 / T1, 3)
    c('x2', 'P', W * 30 / 1e4, 1)
    c('x2', 'dS', Q12 / T1, 2)
    c('x2', 'dS34', Q34 / T3, 2)
    # monoatomico
    T3m = T1 * (V2 / V3)**(2 / 3)
    c('x2', 'T3 mono', T3m, 1)
    c('x2', 'p3 mono atm', n * R * T3m / V3 / atm, 2)
    W23m = 1.5 * R * (T1 - T3m)
    Q34m = -n * R * T3m * ln(V2 / V1)
    c('x2', 'W23 mono', W23m, 0)
    c('x2', 'Q34 mono', Q34m, 0)
    Wm = Q12 + Q34m
    c('x2', 'W mono', Wm, 0)
    c('x2', 'e mono', Wm / Q12 * 100, 1)
    c('x2', 'P mono', Wm * 30 / 1e3, 1)
    # ---- X3
    n = 1
    pa, Va, Vb = 70e3, 0.03, 0.1
    Ta = pa * Va / (n * R)
    c('x3', 'Ta', Ta, 1)
    c('x3', 'pb', pa * Va / Vb / 1e3, 0)
    Tc = pa * Vb / (n * R)
    c('x3', 'Tc', Tc, 1)
    Qab = pa * Va * ln(Vb / Va)
    Qbc = 2.5 * (pa * Vb - pa * Va * 1)  # nCV(Tc-Tb)
    Qca = 3.5 * pa * (Va - Vb)
    c('x3', 'Qab', Qab, 0)
    c('x3', 'Qbc', Qbc, 0)
    c('x3', 'Qca', Qca, 0)
    c('x3', 'Wca', pa * (Va - Vb), 0)
    Wn = Qab + Qbc + Qca
    c('x3', 'W', Wn, 0)
    QC = Qab + Qbc
    c('x3', 'QC', QC, 0)
    c('x3', 'K', QC / abs(Wn), 2)
    c('x3', 'K mal', abs(Qca) / abs(Wn), 2)
    CVm, Cpm = 2.5 * R, 3.5 * R
    Tb = Ta
    c('x3', 'dSab', R * ln(Vb / Va), 2)
    c('x3', 'dSbc', CVm * ln(Tc / Tb), 2)
    c('x3', 'dSca', Cpm * ln(Ta / Tc), 2)
    c('x3', 'KC', Ta / (Tc - Ta), 2)
    # ---- X4
    p1, p2, Vv = 2 * atm, 1 * atm, 1e-3
    c('x4', 'pf atm', (2 + 1) / 2, 1)
    c('x4', 'pf Pa', 1.5 * atm / 1e5, 2)
    d1 = p1 * Vv / 300 * ln(sp.Rational(4, 3))
    d2 = p2 * Vv / 300 * ln(sp.Rational(2, 3))
    c('x4', 'dS1', d1, 4)
    c('x4', 'dS2', d2, 4)
    c('x4', 'dS', d1 + d2, 3)
    # ---- X5
    n = 1
    Rg = 8.314
    pA, VA = atm, 0.5e-3
    TA = pA * VA / (n * Rg)
    c('x5', 'TA', TA, 2)
    c('x5', 'TB', 4 * TA, 1)
    c('x5', 'TC', TA, 2)
    WAB = pA * 3 * VA
    dUAB = 1.5 * Rg * 3 * TA
    c('x5', 'WAB', WAB, 2)
    c('x5', 'dUAB', dUAB, 1)
    c('x5', 'QAB', WAB + dUAB, 1)
    WCA = Rg * TA * ln(sp.Rational(1, 4))
    c('x5', 'WCA', WCA, 1)
    c('x5', 'dSAB', 2.5 * Rg * ln(4), 1)
    c('x5', 'dSBC', 1.5 * Rg * ln(sp.Rational(1, 4)), 1)
    c('x5', 'dSCA', Rg * ln(sp.Rational(1, 4)), 1)
    W = WAB + WCA
    c('x5', 'W', W, 1)
    c('x5', 'e', W / (WAB + dUAB), 3)
    c('x5', 'eC', (1 - TA / (4 * TA)) * 100, 0)
    # ---- X6
    n, Rg = 3, 8.31
    TB = 573.15
    TA = TB / 4
    VB = n * Rg * TB / 4e5
    c('x6', 'TA', TA, 2)
    c('x6', 'VA', VB, 4)
    c('x6', 'VC', 4 * VB, 4)
    QAB = n * 1.5 * Rg * (TB - TA)
    QBC = n * Rg * TB * ln(4)
    QCA = n * 2.5 * Rg * (TA - TB)
    c('x6', 'QAB', QAB, 0)
    c('x6', 'QBC', QBC, 0)
    c('x6', 'QCA', QCA, 0)
    QH = QAB + QBC
    c('x6', 'QH', QH, 0)
    W = QH + QCA
    c('x6', 'W', W, 0)
    c('x6', 'e', W / QH * 100, 1)
    c('x6', 'eC', (1 - TA / TB) * 100, 0)
    c('x6', 'dSAB', n * 1.5 * Rg * ln(4), 2)
    c('x6', 'dSBC', n * Rg * ln(4), 2)
    c('x6', 'dSCA', -n * 2.5 * Rg * ln(4), 2)
    # ---- X7
    n, Rg = 1.5, 8.314
    Tb = 573.2
    Ta = Tb * 1.5 / 4
    Vb = n * Rg * Tb / 4e5
    Vc = n * Rg * Tb / 1.5e5
    c('x7', 'Ta', Ta, 2)
    c('x7', 'Va', Vb, 5)
    c('x7', 'Vc', Vc, 5)
    Qab = n * 1.5 * Rg * (Tb - Ta)
    Qbc = n * Rg * Tb * ln(sp.Rational(4, 1.5).limit_denominator(100))
    Qca = n * 2.5 * Rg * (Ta - Tb)
    c('x7', 'Qab', Qab, 0)
    c('x7', 'Qbc', Qbc, 0)
    c('x7', 'QH', Qab + Qbc, 0)
    c('x7', 'Qca', Qca, 0)
    W = Qab + Qbc + Qca
    c('x7', 'W', W, 0)
    c('x7', 'e', W / (Qab + Qbc) * 100, 1)
    c('x7', 'eC', (1 - Ta / Tb) * 100, 1)
    c('x7', 'ratio', W / (Qab + Qbc) / (1 - Ta / Tb), 2)
    lr = ln(sp.Rational(8, 3))
    c('x7', 'dSab', n * 1.5 * Rg * lr, 2)
    c('x7', 'dSbc', n * Rg * lr, 2)
    c('x7', 'dSca', -n * 2.5 * Rg * lr, 2)
    # ---- X8
    Rg = 8.314
    pa, pc, Va, Vb = 4e5, 2e5, 0.55, 0.82
    pb = pa
    Qab = 2.5 * pa * (Vb - Va)
    Wab = pa * (Vb - Va)
    c('x8', 'Qab', Qab, 0)
    c('x8', 'Wab', Wab, 0)
    Qbc = 1.5 * (pc * Vb - pb * Vb)
    c('x8', 'Qbc', Qbc, 0)
    Wca = -0.5 * (pa + pc) * (Vb - Va)
    dUca = 1.5 * (pa * Va - pc * Vb)
    c('x8', 'Wca', Wca, 0)
    c('x8', 'dUca', dUca, 0)
    c('x8', 'Qca', Wca + dUca, 0)
    Wc = Wab + Wca
    c('x8', 'Wciclo', Wc, 0)
    V = sp.symbols('V')
    s = (pa - pc) / (Va - Vb)
    p = pc + s * (V - Vb)
    dQ = sp.Rational(5, 2) * p + sp.Rational(3, 2) * s * V
    Vs = float(sp.solve(dQ, V)[0])
    c('x8', 's', s / 1e5, 2)
    c('x8', 'V*', Vs, 3)
    Qin = float(sp.integrate(dQ, (V, Vb, Vs)))
    Qout = float(sp.integrate(dQ, (V, Vs, Va)))
    c('x8', 'Qin', Qin, 0)
    QH = Qab + Qin
    c('x8', 'QH', QH, 0)
    c('x8', 'e', Wc / QH * 100, 1)
    c('x8', 'QH neto', Qab + Wca + dUca, 0)
    c('x8', 'e neto', Wc / (Qab + Wca + dUca) * 100, 1)
    c('x8', 'eC', (1 - pc * Vb / (pa * Vb)) * 100, 0)
    # ---- X9
    m, cp = 1000.0, 0.25 * 4.18  # J/(g K)
    cv = cp / 1.4
    T1 = 288.15
    T2 = T1 * 30**(2 / 7)
    Q23 = 300e3 * 4.18
    T3 = T2 + Q23 / (m * cp)
    V1 = (m / 28.96) * 0  # no usado
    # V1 con R_aire = cp-cv
    Rair = (cp - cv) * 1000  # J/(kg K)
    V1 = 1.0 * Rair * T1 / atm
    V2 = V1 * (T2 / T1) ** (-2.5) if False else 1.0 * Rair * T2 / (30 * atm)
    V3 = 1.0 * Rair * T3 / (30 * atm)
    T4 = T3 * (V3 / V1)**0.4
    p4 = 1.0 * Rair * T4 / V1 / atm
    c('x9', 'T2', T2, 1)
    c('x9', 'T3', T3, 1)
    c('x9', 'T4', T4, 1)
    c('x9', 'p4', p4, 2)
    c('x9', 'V1', V1, 3)
    c('x9', 'V2', V2, 4)
    c('x9', 'V3', V3, 4)
    Q41 = m * cv * (T1 - T4)
    c('x9', 'Q23', Q23 / 1e6, 3)
    c('x9', 'Q41', Q41 / 1e5, 2)
    e = 1 - abs(Q41) / Q23
    c('x9', 'e', e, 3)
    c('x9', 'W', e * Q23 / 1e5, 2)
    c('x9', 'eC', (1 - T1 / T3) * 100, 1)
    # ---- teoría en formato estudio: ejemplos mínimos de las cajas y mini-tests (pagina)
    c('pagina', 'ej 20.1 e', sp.Rational(2000, 10000), 2)
    c('pagina', 'ej 20.1 P', 2000 * 25, 0)
    c('pagina', 'ej 20.1 m', 10000 / 5.0e4, 2)
    c('pagina', 'ej 20.1 kg/h', 0.20 * 25 * 3600 / 1000, 0)
    c('pagina', 'otto r=8', 1 - 8 ** -0.4, 2)
    c('pagina', 'propio aire K', sp.Rational(2400, 800), 1)
    c('pagina', 'propio aire J/h', 800 * 3600 / 1e6, 2)
    c('pagina', 'propio aire K Carnot', 295.15 / 13, 1)
    c('pagina', 'ej 20.2 W', 2000 - 2000 * sp.Rational(350, 500), 0)
    c('pagina', 'ej 20.2 e', 1 - sp.Rational(350, 500), 2)
    c('pagina', 'error C', 1 - sp.Rational(27, 227), 2)
    c('pagina', 'ej 20.5 dS', Lf / 273.15 / 1e3, 2)
    c('pagina', 'ej 20.8 Rln2', R * ln(2), 2)
    c('pagina', 'ej 20.6 dS', 4190 * ln(373.15 / 273.15) / 1e3, 2)
    c('pagina', 'ej 20.10 dS cal', 4190 * ln(323.15 / 373.15), 0)
    c('pagina', 'ej 20.10 dS fr', 4190 * ln(323.15 / 273.15), 0)
    c('pagina', 'ej 20.10 total', 4190 * (ln(323.15 / 373.15) + ln(323.15 / 273.15)), 0)
    c('pagina', 'test s2 e', sp.Rational(300, 800), 3)
    c('pagina', 'test s2 QH', 150 / 0.25, 0)
    c('pagina', 'test s2 P', 400 * 20, 0)
    c('pagina', 'test s3 e', 1 - 10 ** -0.4, 3)
    c('pagina', 'test s3 W', 1000 * (1 - 10 ** -0.4), 0)
    c('pagina', 'test s3 QC', 1000 * 10 ** -0.4, 0)
    c('pagina', 'test s4 QH', 900 + 900 / 3, 0)
    c('pagina', 'test s4 calor cedido', 450 + 150, 0)
    c('pagina', 'test s6 e', 1 - sp.Rational(300, 600), 2)
    c('pagina', 'test s6 K', sp.Rational(268, 30), 2)
    c('pagina', 'test s6 eC', 1 - 300.15 / 500.15, 3)
    c('pagina', 'test s7 fusion', 2 * Lf / 273.15 / 1e3, 2)
    c('pagina', 'test s7 isoterma', 2 * R * ln(3), 1)
    c('pagina', 'test s7 focos', -sp.Rational(1000, 400) + sp.Rational(1000, 300), 2)
    c('pagina', 'test s8 Rln2', R * ln(2), 2)
    # ---- D9: errores
    c('pagina', 'error 1: del fallo', 2200 / 4300, 2)
    c('pagina', 'error 2: del fallo (1e4)', 6450 * 520 / 300 / 1e4, 2); c('pagina', 'error 2: Q_C (1e3)', 6450 * 300 / 520 / 1e3, 2)
    c('pagina', 'error 3: ΔS', 0.100 * 8.314 * sp.log(425 / 2.40e-3), 1)
    c('pagina', 'error 4: del fallo (1e4)', 165 * 76.85 / 1e4, 2); c('pagina', 'error 4: P', 165 * 76.85 / 60, 0)
