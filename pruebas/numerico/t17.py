"""Tema 17: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp

pi = sp.pi
sig = 5.67e-8
cw, ci, cAl, cCu = 4190, 2100, 910, 390
Lf, Lv = 3.34e5, 2.256e6


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- 17.4
    Tc = sp.symbols('Tc')
    c('p174', 'coinciden F y C', sp.solve(sp.Eq(Tc, sp.Rational(9, 5) * Tc + 32), Tc)[0], 0)
    TFK = sp.solve(sp.Eq(Tc, sp.Rational(5, 9) * (Tc - 32) + 273.15), Tc)[0]
    c('p174', 'coinciden F y K', TFK, 1)
    c('p174', '273,15-17,78', 273.15 - 32 * 5 / 9, 2)
    for tc, esp in [(-62.8, 1), (56.7, 1), (31.1, 1)]:
        c('p174', f'{tc} C a F', 9 / 5 * tc + 32, esp)
    # ---- 17.9
    p1, p2, T1, T2 = 4.80e4, 6.50e4, 0.01, 100.0
    g = (p2 - p1) / (T2 - T1)
    c('p179', 'pendiente', g, 1)
    c('p179', 'cero absoluto', T1 - p1 / g, 0)
    c('p179', 'p triple 1e4', p2 * 273.16 / 373.15 / 1e4, 2)
    # ---- 17.4 remache
    d = 4.500 * (1 + 2.4e-5 * 101)
    c('p1714', 'dT', 23.0 + 78.0, 0)
    c('p1714', 'diametro', d, 3)
    c('p1714', 'holgura', d - 4.500, 3)
    # ---- 17.17
    bHg, V0, dT = 18.0e-5, 1000.00, 55.0
    dVHg = bHg * V0 * dT
    dVv = dVHg - 8.95
    c('p1717', 'dV Hg', dVHg, 2)
    c('p1717', 'dV vidrio', dVv, 2)
    c('p1717', 'beta vidrio (1e-5)', dVv / (V0 * dT) * 1e5, 1)
    # ---- 17.21
    al, L0, Y = 1.2e-5, 12.0, 2.0e11
    dT = 33.0 + 9.0
    c('p1721', 'dT', dT, 1)
    c('p1721', 'dL mm', al * L0 * dT * 1e3, 1)
    c('p1721', 'esfuerzo 1e8', Y * al * dT / 1e8, 1)
    c('p1721', 'deformacion %', al * dT * 100, 2)
    # ---- 17.23
    dT = 65.0
    QAl, Qw = 1.10 * cAl * dT, 1.80 * cw * dT
    c('p1723', 'Q Al', QAl / 1e4, 2)
    c('p1723', 'Q agua', Qw / 1e5, 2)
    c('p1723', 'total', (QAl + Qw) / 1e5, 2)
    c('p1723', 'fraccion agua', Qw / (QAl + Qw) * 100, 0)
    c('p1723', 'cw/cAl', cw / cAl, 1)
    # ---- 17.24
    Q = 0.320 * cw * 60.0
    c('p1724', 'Q', Q / 1e4, 2)
    c('p1724', 't s', Q / 200, 0)
    c('p1724', 't min', Q / 200 / 60, 1)
    # ---- 17.31
    K = 0.5 * 1.80 * 7.80**2
    Q = 10 * 0.60 * K
    c('p1731', 'K golpe', K, 1)
    c('p1731', 'Q', Q, 0)
    c('p1731', 'dT', Q / (8.00e-3 * cAl), 1)
    # ---- 17.35
    cm = 1.00 * cw * 2.0 / (0.500 * 78.0)
    c('p1735', 'c metal', cm, 0)
    c('p1735', 'cw/cm', cw / cm, 0)
    # ---- 17.38
    T = sp.symbols('T')
    eq = 0.100 * 390 * T + 0.160 * cw * T + 0.0180 * Lf + 0.0180 * cw * T + 0.750 * 130 * (T - 255)
    c('p1738', 'Qc coef', 0.100 * 390, 1)
    c('p1738', 'Qw coef', 0.160 * cw, 1)
    c('p1738', 'Qi const', 0.0180 * Lf, 0)
    c('p1738', 'Qi coef', 0.0180 * cw, 1)
    c('p1738', 'Pb coef', 0.750 * 130, 1)
    c('p1738', 'Pb const', 0.750 * 130 * 255 + 1e-9, 0)
    c('p1738', 'coef total', 39.0 + 670.4 + 75.42 + 97.5, 1)
    c('p1738', 'T final', sp.solve(eq, T)[0], 1)
    # ---- 17.45
    m = 0.0180
    Qs = [m * ci * 10.0, m * Lf, m * cw * 100, m * Lv]
    c('p1745', 'Q1', Qs[0], 0)
    c('p1745', 'Q2', Qs[1], 0)
    c('p1745', 'Q3', Qs[2], 0)
    c('p1745', 'Q4', Qs[3], 0)
    c('p1745', 'total 1e4', sum(Qs) / 1e4, 2)
    c('p1745', 'cal 1e4', sum(Qs) / 4.186 / 1e4, 2)
    c('p1745', 'Btu', sum(Qs) / 1055, 1)
    c('p1745', 'frac vapor %', Qs[3] / sum(Qs) * 100, 0)
    # ---- 17.46
    m, P = 0.550, 800.0
    Q1 = m * ci * 15.0
    t1 = Q1 / P * 60  # P en J/min -> minutos: Q/P
    t1 = Q1 / P
    Q2 = m * Lf
    t2 = Q2 / P
    c('p1746', 'Q1 1e4', Q1 / 1e4, 2)
    c('p1746', 't1', t1, 1)
    c('p1746', 't2', t2, 1)
    c('p1746', 't1+t2', t1 + t2, 0)
    c('p1746', 'restantes', 500 - (t1 + t2), 1)
    Qr = (500 - t1 - t2) * P
    c('p1746', 'Q agua 1e5', Qr / 1e5, 2)
    c('p1746', 'dT agua', Qr / (m * cw), 1)
    c('p1746', 'pend hielo', P / (m * ci), 2)
    c('p1746', 'pend agua', P / (m * cw), 2)
    # ---- 17.56
    kb, kc = 109.0, 385.0
    T = sp.symbols('T')
    Tj = sp.solve(sp.Eq(kb * (100 - T) / 0.300, kc * T / 0.800), T)[0]
    c('p1756', 'coef latón', kb / 0.300, 1)
    c('p1756', 'coef cobre', kc / 0.800 + 1e-9, 1)
    c('p1756', 'T unión', Tj, 1)
    H = kb * 0.00500 * (100 - Tj) / 0.300
    c('p1756', 'H', H, 1)
    c('p1756', 'Q 1e4', H * 300 / 1e4, 2)
    c('p1756', 'masa kg', H * 300 / Lf, 4)
    c('p1756', 'R latón', 0.300 / kb * 1e3, 2)
    c('p1756', 'R cobre', 0.800 / kc * 1e3, 2)
    # ---- 17.57
    gr = 100.0 / 0.450
    H = 385 * 1.25e-4 * gr
    c('p1757', 'gradiente', gr, 0)
    c('p1757', 'H', H, 1)
    c('p1757', 'caída', H * 0.120 / (385 * 1.25e-4), 1)
    c('p1757', 'T 12 cm', 100 - H * 0.120 / (385 * 1.25e-4), 1)
    # ---- 17.59
    T = sp.symbols('T')
    Tj = sp.solve(sp.Eq(0.080 * (T + 10) / 0.030, 0.027 * (19 - T) / 0.022), T)[0]
    c('p1759', 'T unión', Tj, 2)
    c('p1759', 'coef madera', 0.080 / 0.030, 3)
    c('p1759', 'coef espuma', 0.027 / 0.022, 3)
    c('p1759', 'H/A', 0.080 * (Tj + 10) / 0.030, 0)
    R = 0.030 / 0.080 + 0.022 / 0.027
    c('p1759', 'R madera', 0.030 / 0.080, 3)
    c('p1759', 'R espuma', 0.022 / 0.027, 3)
    c('p1759', 'R total', R, 2)
    c('p1759', 'H/A por R', 29.0 / R, 1)
    c('p1759', 'caída espuma', 29.0 / R * 0.022 / 0.027, 1)
    # ---- 17.63
    Q = 0.390 * Lv
    H = Q / 180
    dTb = H * 8.50e-3 / (50.2 * 0.150)
    c('p1763', 'Q 1e5', Q / 1e5, 2)
    c('p1763', 'H 1e3', H / 1e3, 2)
    c('p1763', 'dT', dTb, 2)
    c('p1763', 'TH', 100.0 + dTb, 1)
    # ---- 17.67
    R = (3 * 7.5e-4 / (4 * pi)) ** sp.Rational(1, 3)
    A = 4 * pi * R**2
    c('p1767', 'R', R, 4)
    c('p1767', 'A', A, 4)
    c('p1767', 'H neta', A * 0.60 * sig * (368**4 - 293**4), 0)
    c('p1767', 'emitida', A * 0.60 * sig * 368**4, 0)
    # ---- 17.93
    c('p1793', 'cede agua 1e5', 1.50 * cw * 28.0 / 1e5, 2)
    a = 0.600 * ci * 22.0
    b = 0.600 * Lf
    c('p1793', 'calentar hielo 1e4', a / 1e4, 2)
    c('p1793', 'fundir 1e5', b / 1e5, 2)
    c('p1793', 'total hielo 1e5', (a + b) / 1e5, 2)
    Tx = sp.symbols('Tx')
    # hipótesis todo fundido
    eq = 1.50 * cw * (Tx - 28) + a + b + 0.600 * cw * Tx
    c('p1793', 'T hipótesis', abs(sp.solve(eq, Tx)[0]), 1)
    mf = (1.50 * cw * 28.0 - a) / Lf
    c('p1793', 'masa fundida', mf, 3)
    c('p1793', 'hielo queda', 0.600 - mf, 3)
    # ---- 17.97
    c('p1797', 'vapor libera 1e4', 0.0400 * Lv / 1e4, 2)
    c('p1797', 'agua absorbe 1e4', 0.200 * cw * 50.0 / 1e4, 2)
    Tx = sp.symbols('Tx')
    eq = 0.0400 * (-Lv) + 0.0400 * cw * (Tx - 100) + 0.200 * cw * (Tx - 50)
    c('p1797', 'T hipótesis', sp.solve(eq, Tx)[0], 0)
    mc = 0.200 * cw * 50.0 / Lv
    c('p1797', 'condensado', mc, 4)
    c('p1797', 'vapor queda', 0.0400 - mc, 4)
    c('p1797', 'agua', 0.200 + mc, 3)
    # ---- 17.101
    Rv = 4.2e-3 / 0.80
    Ra = 7.0e-3 / 0.024
    Rs = Rv + 0.15
    Rd = 2 * Rv + Ra + 0.15
    c('p17101', 'Rv 1e-3', Rv * 1e3, 2)
    c('p17101', 'Ra', Ra, 3)
    c('p17101', 'Rs', Rs, 3)
    c('p17101', 'Rd', Rd, 3)
    c('p17101', 'cociente', Rd / Rs, 1)
    # ---- 17.102
    T0 = sp.symbols('T0')
    kc_, kb_, ka_ = 385 / 0.130, 109 / 0.180, 50.2 / 0.240
    c('p17102', 'suma 2962', kc_, 0)
    c('p17102', 'lat', kb_, 1)
    c('p17102', 'ac', ka_, 1)
    T0v = sp.solve(sp.Eq(kc_ * (100 - T0), (kb_ + ka_) * T0), T0)[0]
    c('p17102', 'T0', T0v, 1)
    A = 2.00e-4
    c('p17102', 'H Cu', kc_ * A * (100 - T0v), 1)
    c('p17102', 'H lat', kb_ * A * T0v, 2)
    c('p17102', 'H ac', ka_ * A * T0v, 2)
    c('p17102', 'suma lat+ac', (kb_ + ka_) * A * T0v, 2)
    # ---- 17.103
    ks = [109.0, 385.0, 205.0]
    Ls = [0.120, 0.180, 0.240]
    Rs_ = [l / k for l, k in zip(Ls, ks)]
    c('p17103', 'R lat 1e-3', Rs_[0] * 1e3, 3)
    c('p17103', 'R Cu 1e-4', Rs_[1] * 1e4, 2)
    c('p17103', 'R Al 1e-3', Rs_[2] * 1e3, 3)
    Rt = sum(Rs_)
    c('p17103', 'R total 1e-3', Rt * 1e3, 3)
    HA = 100.0 / Rt
    c('p17103', 'H/A 1e4', HA / 1e4, 2)
    T1 = 100 - HA * Rs_[0]
    T2 = T1 - HA * Rs_[1]
    c('p17103', 'T1', T1, 1)
    c('p17103', 'T2', T2, 1)
    c('p17103', 'H', HA * 2.30e-4, 2)
    c('p17103', 'H con Al', 205 * 2.30e-4 * T2 / 0.240, 2)
    # ---- 17.108
    A = 4 * pi * 0.0320**2
    T, Ts = 314, 303
    e = 0.660 / (A * sig * (T**4 - Ts**4))
    c('p17108', 'A', A, 5)
    c('p17108', 'e', e, 3)
    P2 = A * 0.700 * sig * (355**4 - Ts**4)
    c('p17108', 'P', P2, 2)
    c('p17108', 'cociente', P2 / 0.660, 2)
    c('p17108', '355/314', 355 / 314, 2)
    # ---- problema práctico
    A = pi * 0.0250**2
    Tx = sp.symbols('Tx', positive=True)
    sol = sp.nsolve(A * sig * (500**4 - Tx**4) - 1670 * A * (Tx - 13.84) / 0.200, Tx, 14.3)
    c('pp', 'A 1e-3', A * 1e3, 2)
    c('pp', 'sigma 500^4', sig * 500**4, 0)
    c('pp', 'k/L', 1670 / 0.200, 0)
    c('pp', 'T-13,84 aprox', sig * 500**4 / (1670 / 0.200), 3)
    c('pp', 'T', sol, 2)
    H = A * sig * (500**4 - sol**4)
    c('pp', 'H', H, 2)
    c('pp', 'dm/dt 1e-4', H / 58.6e3 * 1e4, 2)
    c('pp', 'kg/h', H / 58.6e3 * 3600, 3)
    c('pp', 'radio doble kg/h', 4 * H / 58.6e3 * 3600, 2)
    # ---- teoría (pagina)
    c('pagina', 'dilatación libre acero mm', 1.2e-5 * 12 * 42 * 1e3, 2)
    # ---- teoría en formato estudio: ejemplos mínimos de las cajas y mini-tests (pagina)
    c('pagina', 'ej 17.1: intervalo F', 1.8 * 37.00, 2)
    c('pagina', 'test s2: 25 C a F', 9 / 5 * 25 + 32, 1)
    c('pagina', 'test s2: 25 C a K', 25 + 273.15, 2)
    c('pagina', 'test s2: 15 C a F', 1.8 * 15, 0)
    c('pagina', 'test s2: 451 F a C', sp.Rational(5, 9) * (451 - 32), 1)
    c('pagina', 'ej propio 17.5: T', 273.16 * 5 / 4, 2)
    c('pagina', 'ej propio 17.5: C', 273.16 * 5 / 4 - 273.15, 1)
    c('pagina', 'test s3: p (1e4)', 6.00 * 373.15 / 273.16, 2)
    c('pagina', 'test s3: 2T', 2 * 300.15, 1)
    c('pagina', 'ej 17.2: real', 35.794 * (1 + 1.2e-5 * 15), 3)
    c('pagina', 'ej 17.3: derrame', 200 * 80 * (18 - 1.2) * 1e-5, 1)
    c('pagina', 'ej 17.4: esfuerzo 1e6', 7.0e10 * 2.4e-5 * 5.1 / 1e6, 1)
    c('pagina', 'ej 17.4: F 1e4', 20e-4 * 7.0e10 * 2.4e-5 * 5.1 / 1e4, 1)
    c('pagina', 'test s4: dL mm', 2.4e-5 * 2.00 * 50 * 1e3, 1)
    c('pagina', 'test s4: agujero', 10.000 * (1 + 1.2e-5 * 100), 3)
    c('pagina', 'test s4: traccion 1e7', 2.0e11 * 1.2e-5 * 20 / 1e7, 1)
    c('pagina', 'ej 17.5: Q 1e5', 80 * cw * 2.0 / 1e5, 1)
    c('pagina', 'ej 17.6: dT/dt', 7.4e-3 / (23e-6 * 705), 2)
    c('pagina', 'test s5: Cu', 1000 / (0.10 * cCu), 1)
    c('pagina', 'test s5: agua', 1000 / (0.10 * cw), 2)
    c('pagina', 'test s5: oro', 0.197 * 130, 1)
    c('pagina', 'ej propio fusion 1e5', 0.50 * Lf / 1e5, 2)
    c('pagina', 'ej propio calentar 1e5', 0.50 * cw * 100 / 1e5, 1)
    c('pagina', 'ej 17.7: Tf', (0.300 * cw * 70 + 0.120 * cAl * 20) / (0.300 * cw + 0.120 * cAl), 1)
    c('pagina', 'ej 17.9: nada hierve', (0.10 * cw * 25 + 2.0 * cCu * 150) / (0.10 * cw + 2.0 * cCu), 0)
    c('pagina', 'ej 17.9: x', (2.0 * cCu * 50 - 0.10 * cw * 75) / (0.10 * Lv), 3)
    c('pagina', 'test s6: mezcla', (0.20 * 80 + 0.30 * 20) / 0.50, 0)
    c('pagina', 'test s6: vapor 1e4', (0.010 * Lv + 0.010 * cw * 60) / 1e4, 2)
    c('pagina', 'test s6: agua da 1e4', 1.0 * cw * 20 / 1e4, 1)
    c('pagina', 'test s6: fundido', 1.0 * cw * 20 / Lf, 2)
    c('pagina', 'ej 17.11: H', 0.027 * 0.80 * 30.0 / 0.020, 1)
    c('pagina', 'ej 17.11: m', 0.027 * 0.80 * 30.0 / 0.020 * 3 * 3600 / Lf, 1)
    Tu = (50.2 / 0.100 * 100) / (50.2 / 0.100 + 385 / 0.200)
    c('pagina', 'ej 17.12: T union', Tu, 1)
    c('pagina', 'ej 17.12: H', 50.2 * 4.00e-4 * (100 - Tu) / 0.100, 1)
    c('pagina', 'ej 17.13: H total', 50.2 * 4e-4 * 100 / 0.1 + 385 * 4e-4 * 100 / 0.2, 1)
    c('pagina', 'ej 17.14: H', 0.020 * 0.60 * sig * 1073**4, -2)
    c('pagina', 'ej 17.15: emite', 1.20 * sig * 303**4, 0)
    c('pagina', 'ej 17.15: neta', 1.20 * sig * (303**4 - 293**4), 0)
    c('pagina', 'test s7: H espuma', 0.027 * 2.0 * 20 / 0.050, 1)
    c('pagina', 'test s7: factor', (327.15 / 300.15)**4, 2)
    # ---- D9: errores
    c('pagina', 'error 1: ΔT_F', 10 * 9 / 5, 0); c('pagina', 'error 1: del fallo', 10 * 9 / 5 + 32, 0)
    c('pagina', 'error 2: Q total', 0.0180 * 2100 * 10 + 0.0180 * 3.34e5, 0)
    Ar = 0.0399 * 0.60 * 5.67e-8
    c('pagina', 'error 3: H del fallo', Ar * (95**4 - 20**4), 3); c('pagina', 'error 3: H', Ar * (368**4 - 293**4), 0)
    c('pagina', 'error 4: del fallo', 0.080 * 29.0 / 0.030, 0); c('pagina', 'error 4: H/A', 29.0 / (0.030 / 0.080 + 0.022 / 0.027), 1)
