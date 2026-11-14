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
    # ---- teoría, ejemplos del libro y mini-tests (se buscan en toda la página)
    g = sp.Rational(98, 10)
    c('pagina', 'coches: suma (1e4)', sp.sqrt(2) * 2, 1)
    c('pagina', 'ej. 8.2: J', sp.Rational(4, 10) * 20 - sp.Rational(4, 10) * (-30), 0)
    c('pagina', 'ej. 8.2: F', 20 / sp.Rational(1, 100), 0)
    c('pagina', 'ej. 8.2: peso', sp.Rational(4, 10) * g, 1)
    v2 = 30 * cos(45)
    Jx, Jy = sp.Rational(4, 10) * (v2 + 20), sp.Rational(4, 10) * v2
    c('pagina', 'ej. 8.3: v2x', v2, 1); c('pagina', 'ej. 8.3: Jx', Jx, 1); c('pagina', 'ej. 8.3: Jy', Jy, 1)
    c('pagina', 'ej. 8.3: F (1e3)', sp.sqrt(Jx**2 + Jy**2) / sp.Rational(1, 100) / 1000, 1)
    c('pagina', 'ej. 8.3: ángulo', sp.deg(sp.atan(Jy / Jx)), 0)
    c('pagina', 'pelotas: K rápida', sp.Rational(1, 2) * sp.Rational(1, 10) * 20**2, 0)
    c('pagina', 'ej. 8.4: vR', sp.Rational(5, 1000) * 300 / 3, 3)
    c('pagina', 'ej. 8.4: KB', sp.Rational(1, 2) * sp.Rational(5, 1000) * 300**2, 0)
    c('pagina', 'ej. 8.4: KR', sp.Rational(1, 2) * 3 * sp.Rational(1, 2)**2, 3)
    vA = (sp.Rational(4, 10) - sp.Rational(3, 10) * 2) / sp.Rational(5, 10)
    c('pagina', 'ej. 8.5: vA2', vA, 2)
    c('pagina', 'ej. 8.7: v2', sp.Rational(4, 10) / sp.Rational(8, 10), 2)
    c('pagina', 'ej. 8.7: K2', sp.Rational(1, 2) * sp.Rational(8, 10) * sp.Rational(1, 2)**2, 2)
    v2 = sp.sqrt(2 * g * sp.Rational(3, 100)); v1 = sp.Rational(2005, 5) * v2
    c('pagina', 'ej. 8.8: v2', v2, 3); c('pagina', 'ej. 8.8: v1', v1, 0)
    c('pagina', 'ej. 8.8: K bala', sp.Rational(5, 2000) * v1**2, 0)
    c('pagina', 'ej. 8.8: K conjunto', sp.Rational(2005, 2000) * v2**2, 3)
    c('pagina', 'ej. 8.11: fracción', sp.Rational(121, 169), 2)
    s = sp.solve([sp.Symbol('a') * sp.Rational(5, 10) + sp.Symbol('b') * sp.Rational(3, 10) - sp.Rational(4, 10),
                  sp.Symbol('b') - sp.Symbol('a') - 4], ['a', 'b'])
    c('pagina', 'ej. 8.10: vA2', list(s.values())[0], 1)
    c('pagina', 'ej. 8.12: vB2', sp.sqrt(sp.Rational(5, 10) * 12 / sp.Rational(3, 10)), 2)
    c('pagina', 'ej. 8.13: x_cm/d', 2 * cos(sp.Rational(105, 2)) / 18, 3)
    c('pagina', 'ej. 8.13: x_cm (1e-12)', 2 * cos(sp.Rational(105, 2)) / 18 * sp.Rational(957, 100), 1)
    c('pagina', 'ej. 8.14: Ramón', sp.Rational(90 * 6, 60), 1)
    c('pagina', 'ej. 8.15: a', sp.Rational(2400, 120), 0)
    c('pagina', 'ej. 8.16: v', 2400 * sp.log(4), 0)
    # mini-tests
    c('pagina', 'test 1: J', sp.Rational(6, 100) * 70, 1); c('pagina', 'test 1: F', sp.Rational(6, 100) * 70 / sp.Rational(4, 1000), 0)
    c('pagina', 'test 1: frenado', 1200 * 20 / 8, 0)
    c('pagina', 'test 1: p 1 kg', sp.sqrt(2 * 1 * 50), 0); c('pagina', 'test 1: p 4 kg', sp.sqrt(2 * 4 * 50), 0)
    c('pagina', 'test 2: patinador', sp.Rational(40 * 3, 60), 1)
    c('pagina', 'test 2: cañón', sp.Rational(10 * 400, 800), 1)
    c('pagina', 'test 2: |vB|', sp.sqrt(6**2 + 2**2), 2); c('pagina', 'test 2: ángulo', sp.deg(sp.atan(sp.Rational(2, 6))), 1)
    V = sp.Rational(2000 * 3 * 2 + 1000 * 3, 2 * 3000)
    Ki = sp.Rational(1, 2) * 2000 * 9 + sp.Rational(1, 2) * 1000 * sp.Rational(3, 2)**2
    c('pagina', 'test 3: V', V, 1); c('pagina', 'test 3: Ki', Ki, 0)
    c('pagina', 'test 3: Kf', sp.Rational(1, 2) * 3000 * V**2, 0); c('pagina', 'test 3: perdida', Ki - sp.Rational(1, 2) * 3000 * V**2, 0)
    c('pagina', 'test 3: V bala', sp.Rational(1, 100) * 400 / 2, 1); c('pagina', 'test 3: fracción', sp.Rational(1, 200), 3)
    v2 = sp.sqrt(2 * g * sp.Rational(5, 100))
    c('pagina', 'test 3: v2 péndulo', v2, 3); c('pagina', 'test 3: v1 péndulo', sp.Rational(2010, 10) * v2, 0)
    c('pagina', 'test 4: vA2', sp.Rational(1 - 2, 3) * 6, 1); c('pagina', 'test 4: vB2', sp.Rational(2, 3) * 6, 1)
    a, b = sp.symbols('a b')
    s = sp.solve([2 * a + b - 3, b - a - 6], [a, b])
    c('pagina', 'test 4: vA2 (2)', s[a], 1); c('pagina', 'test 4: vB2 (2)', s[b], 1)
    c('pagina', 'test 4: K', sp.Rational(1, 2) * 2 * 9 + sp.Rational(1, 2) * 9, 1)
    c('pagina', 'test 4: K después', sp.Rational(1, 2) * 2 * s[a]**2 + sp.Rational(1, 2) * s[b]**2, 1)
    c('pagina', 'test 4: neutrón %', 100 * (1 - sp.Rational(1, 9)), 1)
    c('pagina', 'test 5: x_cm', sp.Rational(3 * 5, 5), 1)
    c('pagina', 'test 5: balsa', sp.solve(80 * (5 - a) - 120 * a, a)[0], 1)
    c('pagina', 'test 6: F (1e4)', sp.Rational(2000 * 5, 10**4), 1); c('pagina', 'test 6: a', sp.Rational(10**4, 500), 0)
    c('pagina', 'test 6: a con g', 20 - g, 1); c('pagina', 'test 6: v', 2500 * sp.log(3), 0)
