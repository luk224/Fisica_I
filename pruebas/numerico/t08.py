"""Tema 8: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp

sin = lambda g: sp.sin(sp.rad(g))
cos = lambda g: sp.cos(sp.rad(g))


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- E1: choque elástico 1D, ambas canicas en movimiento
    mA, mB, vA, vB = sp.Rational(10, 1000), sp.Rational(30, 1000), -sp.Rational(4, 10), sp.Rational(2, 10)
    vA2, vB2 = sp.symbols('vA2 vB2')
    s = sp.solve([mA * vA + mB * vB - mA * vA2 - mB * vB2, vB2 - vA2 + (vB - vA)], [vA2, vB2])
    c('e1', 'vA2', s[vA2], 3); c('e1', 'vB2', s[vB2], 3)
    c('e1', 'Delta pA (1e-3)', mA * (s[vA2] - vA) * 1000, 1)
    c('e1', 'Delta pB (1e-3)', mB * (s[vB2] - vB) * 1000, 1)
    c('e1', 'Delta KA (1e-4)', sp.Rational(1, 2) * mA * (s[vA2]**2 - vA**2) * 1e4, 1)
    c('e1', 'Delta KB (1e-4)', sp.Rational(1, 2) * mB * (s[vB2]**2 - vB**2) * 1e4, 1)
    # ---- E2: piedra + bloque con resorte
    vb = (3.00 * 8.00 + 3.00 * 2.00) / 15.0
    c('e2', 'v bloque', vb, 2)
    c('e2', 'compresión', vb * sp.sqrt(15.0 / 500.0), 3)
    c('e2', 'K antes', 0.5 * 3 * 64, 0); c('e2', 'K piedra', 0.5 * 3 * 4, 0); c('e2', 'K bloque', 0.5 * 15 * vb**2, 0)
    c('e2', 'v si +2', (3 * 8 - 3 * 2) / 15, 2)
    # ---- E3: bala y resorte
    k = 0.750 / 0.00250
    V = 0.150 * sp.sqrt(k / 1.000)
    c('e3', 'k', k, 0); c('e3', 'V', V, 2); c('e3', 'v1', V / 0.008, 0)
    c('e3', 'K bala', 0.5 * 0.008 * (V / 0.008)**2, 0); c('e3', 'U resorte', 0.5 * k * 0.15**2, 2)
    c('e3', 'v erróneo', sp.sqrt(k * 0.15**2 / 0.008), 0)
    # ---- E4: choque en cruce
    Vx, Vy = 16.0 * sin(24), 16.0 * cos(24)
    c('e4', 'Vx', Vx, 2); c('e4', 'Vy', Vy, 2)
    c('e4', 'vA', 2850 * Vx / 950, 1); c('e4', 'vB', 2850 * Vy / 1900, 1)
    # ---- E5: MMU
    m, a, ve = 180, 0.029, 490
    dm = m * a / ve
    c('e5', 'dm/dt', dm, 4); c('e5', 'gas 5 s', dm * 5, 3); c('e5', 'F', m * a, 2)
    # ---- E6: canoa
    xc = sp.symbols('xc')
    sol = sp.solve(sp.Eq(45 * 1 + 60 * 2.5, 45 * (xc + 4) + 60 * (xc + 2.5)), xc)[0]
    c('e6', 'x_c', sol, 2); c('e6', 'mujer', 3 + sol, 2); c('e6', 'p', 45 * (3 + sol), 1)
    c('e6', 'p canoa', -60 * sol, 1)
    # ---- E7: obús
    c('e7', 'K ligero', 100 * 5.0 / 2.0, 0)
    # ---- E8 = X2 (resultados)
    mA, mB, E = 1.40, 0.28, 860
    vBx = sp.sqrt(2 * E / (mB * (1 + mB / mA))); vAx = mB / mA * vBx
    t = sp.sqrt(2 * 80 / 9.8)
    c('e8', 'vA', vAx, 1); c('e8', 'vB', vBx, 1); c('e8', 't', t, 2); c('e8', 'sep', (vAx + vBx) * t, 0)
    c('e8', 'M', mA + mB, 2)
    # ---- E9: obús 55°
    g, v0, th = 9.8, 150, 55
    vx = v0 * cos(th); ts = v0 * sin(th) / g; R = v0**2 * sin(2 * th) / g
    c('e9', 'vx', vx, 1); c('e9', 'ts', ts, 2); c('e9', 'R/2', vx * ts, 0); c('e9', 'R', R, 0)
    vBx = (12 * vx + 9 * vx) / 3
    c('e9', 'vBx', vBx, 0); c('e9', 'avance', vBx * ts, 0)
    c('e9', 'x_B', vx * ts + vBx * ts, 2 if False else 0)
    c('e9', 'x_B km', (vx * ts + vBx * ts) / 1000, 2); c('e9', '4R', 4 * R, 0)
    dK = 0.5 * 9 * vx**2 + 0.5 * 3 * vBx**2 - 0.5 * 12 * vx**2
    c('e9', 'Delta K (1e5)', dK / 1e5, 2)
    # ---- X1: He + O2
    m1, m2, v1 = 4, 32, 1200
    v1f = v1 / 2
    v2x = m1 * v1 / m2; v2y = -m1 * v1f / m2
    c('x1', 'v1f', v1f, 0); c('x1', 'v2x', v2x, 0); c('x1', 'v2y', v2y, 0)
    c('x1', '|v2|', sp.sqrt(v2x**2 + v2y**2), 1); c('x1', 'ángulo', sp.deg(sp.atan(75 / 150)), 1)
    K0 = 0.5 * m1 * v1**2; K2 = 0.5 * m2 * (v2x**2 + v2y**2)
    c('x1', 'K0 (1e6)', K0 / 1e6, 2); c('x1', 'K2 (1e6)', K2 / 1e6, 2)
    c('x1', 'Kf (1e6)', (K0 / 4 + K2) / 1e6, 2)
    c('x1', 'fracción', 1 - (K0 / 4 + K2) / K0, 3); c('x1', 'fracción %', 100 * (1 - (K0 / 4 + K2) / K0), 1)
    u = 1.66e-27
    c('x1', 'K0 J (1e-21)', K0 * u / 1e-21, 2); c('x1', 'perdida J (1e-21)', (K0 * 3 / 4 - K2) * u / 1e-21, 2)
    # ---- X2: cohete
    mA, mB, E = 1.40, 0.28, 860
    vB = sp.sqrt(2 * E / (mB * (1 + mB / mA))); vA = mB / mA * vB
    t = sp.sqrt(2 * 80 / 9.8)
    c('x2', 'vB', vB, 1); c('x2', 'vA', vA, 1)
    c('x2', 'KA', 0.5 * mA * vA**2, 0); c('x2', 'KB', 0.5 * mB * vB**2, 0)
    c('x2', 't', t, 2); c('x2', 'xA', vA * t, 1); c('x2', 'xB', vB * t, 1); c('x2', 'sep', (vA + vB) * t, 0)
    # ---- X3: bandeja
    k, M, m, h, g = 500, 0.5, 1, 0.5, 9.8
    v0 = sp.sqrt(2 * g * h); V = m * v0 / (m + M)
    c('x3', 'v0', v0, 2); c('x3', 'V', V, 2)
    c('x3', 'K antes', 0.5 * m * v0**2, 2); c('x3', 'K después', 0.5 * (m + M) * V**2, 2)
    c('x3', 'perdida', 0.5 * m * v0**2 - 0.5 * (m + M) * V**2, 2)
    y0, ye = M * g / k, (m + M) * g / k
    c('x3', 'y0', y0, 4); c('x3', 'ye', ye, 4); c('x3', 'x0', ye - y0, 4)
    d = sp.symbols('d', positive=True)
    ds = sp.solve(sp.Eq(0.5 * (m + M) * V**2 + (m + M) * g * d, 0.5 * k * ((y0 + d)**2 - y0**2)), d)[0]
    c('x3', 'd', ds, 4); c('x3', 'ymax', y0 + ds, 4)
    A = y0 + ds - ye
    c('x3', 'A', A, 3)
    w = sp.sqrt(k / (m + M))
    c('x3', 'omega', w, 2); c('x3', 'V/omega', V / w, 4); c('x3', 'A MAS', sp.sqrt((ye - y0)**2 + (V / w)**2), 3)
    c('x3', 'T', 2 * sp.pi / w, 3)
    # ---- X4: cohete con g variable
    t, tp = sp.symbols('t tp')
    g0, k1, k2, k3 = 10, 20, 15, sp.Rational(1, 10)
    a1 = k1 - (g0 - k3 * t)
    v1 = sp.integrate(a1, (t, 0, t)); y1 = sp.integrate(v1, (t, 0, t))
    v10, y10 = v1.subs(t, 10), y1.subs(t, 10)
    c('x4', 'v10', v10, 0); c('x4', 'y10', y10, 1)
    a2 = k2 - (g0 - k3 * tp)
    v2 = v10 + sp.integrate(a2, (tp, 10, t)); y2 = y10 + sp.integrate(v2.subs(t, tp), (tp, 10, t))
    c('x4', 'v60', v2.subs(t, 60), 0); c('x4', 'y60', y2.subs(t, 60), 0)
    c('x4', 'g60', g0 - k3 * 60, 0)
    # ---- X9: varilla y bala
    M, L, m, a, v = 2, 1, 0.010, 0.80, 300
    I = M * L**2 / 3 + m * a**2
    w = m * v * a / I
    c('x9', 'I', I, 4); c('x9', 'omega', w, 2)
    c('x9', 'K1', 0.5 * m * v**2, 0); c('x9', 'Q', 0.5 * m * v**2 - 0.5 * I * w**2, 1)
    c('x9', 'Q %', 100 * (1 - 0.5 * I * w**2 / (0.5 * m * v**2)), 0)
    c('x9', 'P antes', m * v, 2); c('x9', 'P después', w * (M * L / 2 + m * a), 2)
    J = m * v * M * L * (3 * a - 2 * L) / (2 * (M * L**2 + 3 * m * a**2))
    c('x9', 'Q fórmula', 0.5 * m * v**2 * M * L**2 / (M * L**2 + 3 * m * a**2), 1)
