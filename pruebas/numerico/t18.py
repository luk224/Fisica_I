"""Tema 18: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp

pi = sp.pi
R = 8.314
k = 1.381e-23
NA = 6.022e23
patm = 1.013e5
g = 9.80


def mant(x):
    x = float(x)
    return x / 10 ** sp.floor(sp.log(abs(x), 10))


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- e1
    c('e1', 'p2', 0.355 * 0.110 / 0.390, 3)
    c('e1', 'factor', 0.390 / 0.110, 2)
    # ---- e2
    T1 = 19.0 + 273.15
    c('e2', 'V2', 0.600 * 77.3 / T1, 3)
    c('e2', 'V2 erroneo', 0.600 * 77.3 / 19, 1)
    # ---- e3
    r = 3.50 * 296.15 / 277.15
    c('e3', 'V2/V1', r, 2)
    # ---- e4
    c('e4', 'p2', mant(7.50e3 * 0.750 / 0.410 * 430.15 / 300.15), 2)
    c('e4', 'factor V', 0.750 / 0.410, 2)
    c('e4', 'factor T', 430.15 / 300.15, 2)
    c('e4', 'factor total', 0.750 / 0.410 * 430.15 / 300.15, 2)
    # ---- e5
    c('e5', 'V_Venus/V', 273.15 and 1 / 92 * 1276.15 / 273.15, 4)
    c('e5', 'fact T', 1276.15 / 273.15, 1)
    # ---- e6
    n = 4.86e-4 / 4.00e-3
    p = n * R * 291.15 / 0.0200
    c('e6', 'n', n, 3)
    c('e6', 'p Pa', mant(p), 2)
    c('e6', 'p atm', p / patm, 3)
    # ---- e7
    n = patm * 0.900e-3 / (R * 295.15)
    c('e7', 'n', n, 4)
    c('e7', 'm aire g', n * 28.8, 2)
    c('e7', 'm He g', n * 4.00, 3)
    c('e7', 'N', mant(n * NA), 2)
    # ---- e8
    rm = 650 * 0.044 / (R * 253)
    rv = 92 * patm * 0.044 / (R * 730)
    rt = 1.5 * patm * 0.028 / (R * 95.15)
    c('e8', 'Marte', rm, 4)
    c('e8', 'Venus', rv, 1)
    c('e8', 'Titan', rt, 2)
    c('e8', 'Marte/Tierra', rm / 1.20, 3)
    c('e8', 'Venus/Tierra', rv / 1.20, 0)
    c('e8', 'Titan/Tierra', rt / 1.20, 1)
    # ---- e9
    H = R * 273.15 / (0.0288 * g)
    c('e9', 'H', H, 0)
    c('e9', 'y', -H * sp.log(0.90), 0)
    c('e9', 'ln 0.9', -sp.log(0.90), 4)
    # ---- e10
    p1 = 1.30e6 + patm
    p2 = 3.40e5 + patm
    V = pi * 0.060**2 * 1.00
    m1 = p1 * V * 0.0441 / (R * 295.15)
    m2 = m1 * p2 / p1
    c('e10', 'p1', mant(p1), 3)
    c('e10', 'p2', mant(p2), 3)
    c('e10', 'V', V, 5)
    c('e10', 'm1', m1, 4)
    c('e10', 'm2', m2, 4)
    c('e10', 'usada', m1 - m2, 3)
    c('e10', 'erroneo', m1 * (1 - 3.40 / 13.0), 3)
    # ---- e11
    n = 1.00 / 0.0180
    c('e11', 'n', n, 1)
    c('e11', 'N', mant(n * NA), 2)
    c('e11', 'm molecula', mant(0.0180 / NA), 2)
    # ---- e12
    pp = 9.00e-14 * patm
    n = pp * 1e-6 / (R * 300.0)
    c('e12', 'p Pa', mant(pp), 2)
    c('e12', 'n', mant(n), 2)
    c('e12', 'N', mant(n * NA), 2)
    c('e12', 'N 1 atm', mant(n * NA / 9.00e-14), 2)
    # ---- e13
    vN = R * 300.15 / (NA * patm)
    c('e13', 'V/N', mant(vN), 2)
    c('e13', 'l nm', vN ** (sp.Rational(1, 3)) * 1e9, 2)
    c('e13', 'l/0.3', vN ** (sp.Rational(1, 3)) * 1e9 / 0.3, 1)
    # ---- e14
    v = sp.sqrt(3 * k * 300 / 3.00e-16)
    c('e14', 'v_rms', mant(v), 2)
    c('e14', 'v_rms mm/s', v * 1e3, 2)
    c('e14', 'cociente', 510 / v / 1e4, 0)
    # ---- e15
    K = sp.Rational(3, 2) * k * 300
    m = 0.0320 / NA
    v2 = 2 * K / m
    vr = sp.sqrt(v2)
    P = m * vr
    dt = 0.20 / vr
    F = 2 * P / dt
    FA = F / 0.10**2
    Ng = patm / FA
    Nr = patm * 0.10**3 / (k * 300)
    c('e15', 'K', mant(K), 2)
    c('e15', 'm', mant(m), 2)
    c('e15', 'v2', mant(v2), 2)
    c('e15', 'vrms', vr, 0)
    c('e15', 'P', mant(P), 2)
    c('e15', 'dt', mant(dt), 2)
    c('e15', 'dP', mant(2 * P), 2)
    c('e15', 'F', mant(F), 2)
    c('e15', 'F/A', mant(FA), 2)
    c('e15', 'Ng', mant(Ng), 2)
    c('e15', 'Nr', mant(Nr), 2)
    assert abs(Nr / Ng - 3) < 0.01
    # ---- e16
    mA, mB = 3.34e-27, 5.34e-26
    T = 283.15
    c('e16', 'K', mant(sp.Rational(3, 2) * k * T), 2)
    c('e16', 'vA', sp.sqrt(3 * k * T / mA), 0)
    c('e16', 'vB', sp.sqrt(3 * k * T / mB), 0)
    c('e16', 'mB/mA', mB / mA, 2)
    c('e16', 'TB', mant(T * mB / mA), 2)
    c('e16', 'mAN', mA * NA * 1e3, 2)
    c('e16', 'mBN', mB * NA * 1e3, 1)
    # ---- e17
    dT = sp.Rational(5, 3) * 2.50
    c('e17', 'dT Ne', dT, 2)
    c('e17', 'n', 300 / (sp.Rational(5, 2) * R * 2.50), 2)
    c('e17', 'erroneo', sp.Rational(3, 5) * 2.50, 2)
    # ---- e18
    M = 0.0440
    c('e18', 'vmp', sp.sqrt(2 * R * 300 / M), 0)
    c('e18', 'vmed', sp.sqrt(8 * R * 300 / (pi * M)), 0)
    c('e18', 'vrms', sp.sqrt(3 * R * 300 / M), 0)
    c('e18', 'razon med', sp.sqrt(4 / pi), 3)
    c('e18', 'razon rms', sp.sqrt(sp.Rational(3, 2)), 3)
    # ---- e19
    pv = 0.60 * 2.34e3
    mw = pv * 1.00 * 0.0180 / (R * 293.15)
    c('e19', 'pv', pv, 0)
    c('e19', 'm', mw * 1e3, 1)
    c('e19', 'm kg', mw, 4)
    c('e19', '1.4 %', pv / patm * 100, 1)
    c('e19', 'erroneo', patm * 0.0180 / (R * 293.15) * 1e3, -1)
    # ---- e20
    rc = 1.23 - 290 / 500.0
    Tc = 288.15 * 1.23 / rc
    c('e20', 'rho cal', rc, 2)
    c('e20', 'T', Tc, 0)
    c('e20', 'T C', Tc - 273.15, 0)
    # ---- e21
    Ves = 0.00900 / 4.00
    ra = patm * 0.0288 / (R * 278.15)
    B = ra * Ves * g
    Fa = 0.00900 * g - B
    ra2 = patm * 0.0288 / (R * 308.15)
    B2 = ra2 * Ves * g
    F2 = 0.00900 * g - B2
    c('e21', 'V', mant(Ves), 2)
    c('e21', 'rho a', ra, 3)
    c('e21', 'B', B, 4)
    c('e21', 'mg', 0.00900 * g, 4)
    c('e21', 'F', Fa, 4)
    c('e21', 'rho2', ra2, 3)
    c('e21', 'B2', B2, 4)
    c('e21', 'F2', F2, 4)
    c('e21', 'dF', mant(F2 - Fa), 2)
    c('e21', 'dF mN', (F2 - Fa) * 1e3, 2)
    # ---- e22
    p1 = 1.20e6 + 1.01e5
    V2 = 1.90 * p1 / 1.01e5
    c('e22', 'p1', mant(p1), 3)
    c('e22', 'V2', V2, 2)
    c('e22', 'N cil', 750 / V2, 1)
    mH = 1.01e5 * 750 * 0.00202 / (R * 288.15)
    c('e22', 'mH', mH, 1)
    mc = 1.23 * 750 - mH
    c('e22', 'carga H', mc, 1)
    c('e22', 'peso H', mant(mc * g), 2)
    mHe = mH * 4.00 / 2.02
    c('e22', 'mHe', mHe, 1)
    c('e22', 'carga He', 1.23 * 750 - mHe, 0)
    c('e22', 'peso He', mant((1.23 * 750 - mHe) * g), 2)
    c('e22', 'aire desalojado', 1.23 * 750, 0)
    # ---- e23
    p2 = patm + 1030 * g * 73.0
    h2 = 2.30 * patm / p2 * 280.15 / 300.15
    c('e23', 'p2', mant(p2), 2)
    c('e23', 'h2', h2, 3)
    c('e23', 'sube', 2.30 - h2, 2)
    c('e23', 'manom', mant(1030 * g * 73.0), 2)
    # ---- e24
    rho = 1000.0
    p0 = 4.20e5
    pa = 1.00e5

    def v2f(h, p):
        return sp.sqrt(2 / rho * (p - pa) + 2 * g * (h - 1.00))
    c('e24', 'termino p', 2 / rho * (p0 - pa), 0)
    c('e24', 'termino g', 2 * g * 2.50, 0)
    c('e24', 'v a', v2f(3.50, p0), 1)
    c('e24', 'p0 cte', mant(p0 * 0.50), 2)
    c('e24', 'v b1', v2f(3.00, p0 * 0.50 / 1.00), 1)
    c('e24', 'v b2', v2f(2.00, p0 * 0.50 / 2.00), 2)
    h = sp.symbols('h')
    # kPa y m: 210/(4-h) - 100 + 9.8(h-1) = 0
    sol = sp.solve(sp.Eq(210 - 100 * (4 - h) + sp.Float(9.8) * (h - 1) * (4 - h), 0), h)
    sol = sorted(float(s) for s in sol)
    c('e24', 'h1', sol[0], 2)
    c('e24', 'h2', sol[1], 1)
    c('e24', 'p en h1', mant(2.10e5 / (4.00 - sol[0])), 2)
    c('e24', 'agua', mant(rho * g * (sol[0] - 1.00)), 1)
    # ---- e25
    vr = sp.sqrt(3 * R * 298.15 / 0.0280)
    c('e25', 'vrms', vr, 0)
    c('e25', 'hmax', mant(vr**2 / (2 * 1.30)), 2)
    c('e25', 'hmax km', vr**2 / (2 * 1.30) / 1e3, 0)
    c('e25', 'v/vrms', 2025 / vr, 2)
    c('e25', 'N molec', mant(1.20 * NA), 1)
    # ---- x1
    n, Tb, pa_, pb = 1.5, 573.2, 1.5e5, 4e5
    Ta = Tb * pa_ / pb
    Vb = n * R * Tb / pb
    Vc = Vb * pb / pa_
    c('x1', 'Ta', Ta, 2)
    c('x1', 'Vb', Vb, 5)
    c('x1', 'Vc', Vc, 5)
    Qab = n * 1.5 * R * (Tb - Ta)
    Qbc = n * R * Tb * sp.log(Vc / Vb)
    Qca = n * 2.5 * R * (Ta - Tb)
    c('x1', 'Qab', Qab, 0)
    c('x1', 'Qbc', Qbc, 0)
    c('x1', 'Qin', Qab + Qbc, 0)
    c('x1', 'Qout', -Qca, 0)
    W = Qab + Qbc + Qca
    c('x1', 'W', W, 0)
    c('x1', 'Wca', pa_ * (Vb - Vc), 0)
    c('x1', 'e', W / (Qab + Qbc), 3)
    c('x1', 'eC', 1 - Ta / Tb, 3)
    # ---- x2
    pa2, Va, Vb2 = 70000.0, 0.03, 0.1
    Ta2 = pa2 * Va / R
    pb2 = pa2 * Va / Vb2
    Tc2 = pa2 * Vb2 / R
    c('x2', 'Ta', Ta2, 1)
    c('x2', 'pb', pb2 / 1e3, 0)
    c('x2', 'Tc', Tc2, 1)
    Qab2 = pa2 * Va * sp.log(Vb2 / Va)
    Qbc2 = 2.5 * (pa2 * Vb2 - pb2 * Vb2)
    Wca2 = pa2 * (Va - Vb2)
    Qca2 = 3.5 * (pa2 * Va - pa2 * Vb2)
    c('x2', 'Qab', Qab2, 0)
    c('x2', 'Qbc', Qbc2, 0)
    c('x2', 'Wca', Wca2, 0)
    c('x2', 'Qca', Qca2, 0)
    c('x2', 'W', Qab2 + Wca2, 0)
    c('x2', 'sumQ', Qab2 + Qbc2 + Qca2, 0)
    c('x2', 'Qc', Qab2 + Qbc2, 0)
    c('x2', 'K', (Qab2 + Qbc2) / abs(Qab2 + Wca2), 2)
    # ---- x3
    pa3, pc3, Va3, Vb3 = 4e5, 2e5, 0.55, 0.82
    pVa, pVb, pVc = pa3 * Va3, pa3 * Vb3, pc3 * Vb3
    c('x3', 'pVa', pVa, 0)
    c('x3', 'pVb', pVb, 0)
    c('x3', 'pVc', pVc, 0)
    c('x3', 'Tb/Ta', pVb / pVa, 2)
    c('x3', 'Tc/Ta', pVc / pVa, 3)
    Wab = pa3 * (Vb3 - Va3)
    dUab = 1.5 * (pVb - pVa)
    c('x3', 'Wab', Wab, 0)
    c('x3', 'dUab', dUab, 0)
    c('x3', 'Qab', dUab + Wab, 0)
    c('x3', 'Qbc', 1.5 * (pVc - pVb), 0)
    Wca3 = (pc3 + pa3) / 2 * (Va3 - Vb3)
    dUca = 1.5 * (pVa - pVc)
    c('x3', 'Wca', Wca3, 0)
    c('x3', 'dUca', dUca, 0)
    c('x3', 'Qca', dUca + Wca3, 0)
    Wc = Wab + Wca3
    c('x3', 'W ciclo', Wc, 0)
    # recta p(V): p = pc + s (V - Vb); s=(pa-pc)/(Va-Vb)
    V = sp.symbols('V')
    s = (pa3 - pc3) / (Va3 - Vb3)
    pV_ = pc3 + s * (V - Vb3)
    dQ = sp.Rational(3, 2) * (sp.diff(pV_ * V, V)) - sp.Rational(3, 2) * pV_ + pV_
    # dQ/dV = 3/2 V dp/dV + 5/2 p
    dQ = sp.Rational(3, 2) * V * s + sp.Rational(5, 2) * pV_
    Vs = float(sp.solve(dQ, V)[0])
    c('x3', 's', mant(abs(s)), 2)
    c('x3', 'V*', Vs, 3)
    Qe = float(sp.integrate(dQ, (V, Vb3, Vs)))
    Qs = float(sp.integrate(dQ, (V, Vs, Va3)))
    c('x3', 'Qentra', Qe, 0)
    assert abs(Qe + Qs - 3000) < 1
    QH = Qab_3 = (dUab + Wab) + Qe
    c('x3', 'QH', QH, 0)
    c('x3', 'e', Wc / QH, 3)
    c('x3', 'e neto', Wc / 273000 * 100, 1)
