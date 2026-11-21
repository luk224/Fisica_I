"""Tema 6: resultados recalculados con sympy a partir de los datos del enunciado (se comparan en valor absoluto)."""
import sympy as sp

sin = lambda g: sp.sin(sp.rad(g))
cos = lambda g: sp.cos(sp.rad(g))


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- E1: camión que remolca un coche
    T, s = 1350, 5000
    c('e1', 'W horizontal (MJ)', T * s / 1e6, 2)
    c('e1', 'W a 35° (MJ)', T * s * cos(35) / 1e6, 2)
    c('e1', 'T cos35', T * cos(35), 0)
    c('e1', 'W camión a 35° (MJ)', abs(T * s * cos(145)) / 1e6, 2)
    # ---- E2: maleta en rampa
    m, F, th, mu, d, g = 20.0, 160, 32.0, 0.300, 3.80, 9.80
    w = m * g
    Ww = w * d * cos(122)
    n = w * cos(th); f = mu * n; Wf = -f * d
    Wt = F * d + Ww + Wf
    c('e2', 'W_F', F * d, 0)
    c('e2', 'W_peso', abs(Ww), 0)
    c('e2', 'w sin32', w * sin(th), 1)
    c('e2', 'h', d * sin(th), 2)
    c('e2', 'n', n, 1)
    c('e2', 'f_k', f, 1)
    c('e2', 'W_f', abs(Wf), 0)
    c('e2', 'W_tot', Wt, 1)
    c('e2', 'v2', sp.sqrt(2 * Wt / m), 2)
    # ---- E3: frenado
    v0, mu = 25, 0.8
    c('e3', 's a 25 m/s', v0**2 / (2 * mu * g), 1)
    c('e3', 's a 50 m/s', (2 * v0)**2 / (2 * mu * g), 0)
    # ---- E4: resorte
    W, X = 12.0, 0.0300
    k = 2 * W / X**2
    c('e4', 'k (1e4)', k / 1e4, 2)
    c('e4', 'F', k * X, 0)
    c('e4', 'W comprimir', k * sp.Rational(4, 100)**2 / 2, 1)
    c('e4', 'F comprimir (1e3)', k * 0.04 / 1e3, 2)
    # ---- E5: bloque contra resorte
    m, v0, k = 5.0, 6.00, 500
    c('e5', 'X', v0 * sp.sqrt(m / k), 3)
    c('e5', 'v0 max', 0.150 * sp.sqrt(k / m), 2)
    # ---- E6: gráfica F-x
    W3 = sp.Rational(1, 2) * 2 * 2 + 1 * 2
    W47 = sp.Rational(1, 2) * 2 * (-1)
    c('e6', 'W 0-3', W3, 1)
    c('e6', 'W 4-7', abs(W47), 1)
    c('e6', 'W 0-7', W3 + W47, 1)
    c('e6', 'W 7-2', abs(1.0 - 2.0), 1)
    c('e6', 'v a 3 m', sp.sqrt(2 * W3 / 2), 2)
    c('e6', 'v a 7 m', sp.sqrt(2 * (W3 + W47) / 2), 2)
    # ---- E7: fuerza lineal
    x = sp.symbols('x')
    W = sp.integrate(18.0 - 0.530 * x, (x, 0, 14))
    c('e7', 'W', W, 0)
    c('e7', '18*14', 18 * 14, 1)
    c('e7', '0.265*196', 0.265 * 196, 1)
    c('e7', 'F(14)', 18 - 0.530 * 14, 2)
    c('e7', 'v', sp.sqrt(2 * W / 6.0), 2)
    # ---- E8: elevador
    P = 40 * 746
    M = P * 16.0 / (9.80 * 20.0)
    c('e8', 'P (1e4)', P / 1e4, 3)
    c('e8', 'M', M, 0)
    c('e8', 'v', 20 / 16.0, 2)
    c('e8', 'pasajeros', (M - 600) / 65.0, 1)
    c('e8', 'P tándem', 165 * 9.00, 0)
    c('e8', 'P por ciclista', 165 * 9.00 / 2, 1)
    # ---- E9: libro y resorte con fricción
    m, k, x1, mu = 2.50, 250, 0.250, 0.30
    f = mu * m * 9.80
    c('e9', 'W_res', k * x1**2 / 2, 2)
    c('e9', 'f', f, 2)
    c('e9', 'd', k * x1**2 / (2 * f), 2)
    xm = f / k
    c('e9', 'x vmax', xm, 4)
    c('e9', 'recorrido', x1 - xm, 3)
    c('e9', 'vmax', sp.sqrt((k * (x1**2 - xm**2) - 2 * f * (x1 - xm)) / m), 2)
    # ---- E10: resorte con fuerza constante y fricción
    k, m, mu, Fc, x = 130.0, 4.00, 0.400, 82.0, 0.800
    WF = Fc * x; Wr = k * x**2 / 2; Wf = mu * m * 9.80 * x
    Wt = WF - Wr - Wf
    c('e10', 'W_F', WF, 1)
    c('e10', 'W_res', Wr, 1)
    c('e10', 'W_f', Wf, 1)
    c('e10', 'W_tot', Wt, 1)
    c('e10', 'v', sp.sqrt(2 * Wt / m), 2)
    c('e10', 'f', mu * m * 9.80, 1)
    c('e10', 'kx', k * x, 1)
    c('e10', 'a', (Fc - mu * m * 9.80 - k * x) / m, 2)
    # ---- X1: ejemplo numérico del 
    c('x1', 's = K1/f', 9 / sp.Integer(4), 2)
    # ---- X5: bala
    m, v1, d, g = 0.010, 100, 2, 9.81
    K1 = m * v1**2 / 2
    F = K1 / d + m * g
    c('x5', 'K1', K1, 1)
    c('x5', 'W_peso', m * g * d, 3)
    c('x5', 'F', F, 1)
    c('x5', 'F sin peso', K1 / d, 1)
    c('x5', 'a (1e3)', v1**2 / (2 * d) / 1e3, 2)
    c('x5', 't', 2 * d / v1, 3)
    # ---- X6: satélite
    m, d = 210, 0.81
    v1 = 311 / 3.6
    K1 = m * v1**2 / 2
    F = m * g + K1 / d
    c('x6', 'v1', v1, 1)
    c('x6', 'K1 (1e5)', K1 / 1e5, 2)
    c('x6', 'mg', m * g, 0)
    c('x6', 'W_peso', m * g * d, 0)
    c('x6', 'F (1e5)', F / 1e5, 2)
    c('x6', 'F/mg (aprox.)', F / (m * g), -1)
    c('x6', 'a (1e3)', v1**2 / (2 * d) / 1e3, 2)
    c('x6', 't', 2 * d / v1, 4)
    c('x6', 'ma (1e5)', m * v1**2 / (2 * d) / 1e5, 2)
    # ---- X7: bloque contra la pared
    m, Fm, mu, s = 5, 96.0, 0.300, 0.400
    n = Fm * cos(60); f = mu * n
    WF = Fm * s * cos(30); Wp = m * g * s; Wf = f * s
    Wt = WF - Wp - Wf
    c('x7', 'n', n, 1)
    c('x7', 'f_k', f, 1)
    c('x7', 'W_F', WF, 1)
    c('x7', 'W_peso', Wp, 1)
    c('x7', 'W_f', Wf, 2)
    c('x7', 'W_tot', Wt, 2)
    c('x7', 'v', sp.sqrt(2 * Wt / m), 2)
    a = (Fm * sin(60) - m * g - f) / m
    c('x7', 'a', a, 2)
    g2 = 9.80
    c('x7', 'v g=9,80', sp.sqrt(2 * (WF - m * g2 * s - Wf) / m), 2)
    # ---- X8: poleas, energía
    mA, mB, mu, g8, s = 1.5, 1.0, 0.1, 9.80, 1
    WpA = mA * g8 * sin(30) * s
    Wf = mu * mA * g8 * cos(30) * s
    WpB = mB * g8 * 0.5
    Wt = WpA - Wf - WpB
    c('x8', 'W_peso A', WpA, 2)
    c('x8', 'W_f', Wf, 2)
    c('x8', 'W_peso B', WpB, 2)
    c('x8', 'W_tot', Wt, 2)
    vA = sp.sqrt(2 * Wt / (mA + mB / 4))
    c('x8', 'vA', vA, 2)
    c('x8', 'vB', vA / 2, 3)
    # T a partir de la dinámica
    aA, Tt = sp.symbols('aA Tt')
    sol = sp.solve([sp.Eq(mA * g8 * sin(30) - mu * mA * g8 * cos(30) - Tt, mA * aA), sp.Eq(2 * Tt - mB * g8, mB * aA / 2)], [aA, Tt])
    c('x8', 'T', sol[Tt], 2)
    # ---- X9: Carnot y bomba
    W = 0.23 * 400
    c('x9', 'W', W, 0)
    c('x9', 'm', W / (9.81 * 20), 3)
    # ---- X10: sin números
    # ---- X11: partícula en cuarto de círculo
    m, vB, s, R = 0.5, 5.2, 5, 2.1
    c('x11', 'mu', vB**2 / (2 * 9.81 * s), 3)
    c('x11', 'mu g=9,80', vB**2 / (2 * 9.80 * s), 3)
    Wp = m * 9.81 * R
    Wf = m * vB**2 / 2 - Wp
    c('x11', 'W_peso', Wp, 2)
    c('x11', 'K_B', m * vB**2 / 2, 2)
    c('x11', 'W_f', abs(Wf), 2)
    c('x11', 'W_f g=9,80', abs(m * vB**2 / 2 - m * 9.80 * R), 2)
    c('x11', 'v sin fricción', sp.sqrt(2 * 9.81 * R), 2)
    # ---- teoría, ejemplos del libro y mini-tests (se buscan en toda la página)
    g = 9.80
    c('pagina', 'ej. 6.1: W (1e3)', 210 * 18 * cos(30) / 1e3, 1)
    c('pagina', 'ej. 6.1: W por componentes (1e3)', (160 * 14 - 40 * 11) / 1e3, 1)
    c('pagina', 'ej. 6.2: W tractor (kJ)', 5000 * 20 * cos(36.9) / 1e3, 0)
    c('pagina', 'ej. 6.2: fuerza neta', 5000 * cos(36.9) - 3500, -1)
    m = 14700 / g
    c('pagina', 'ej. 6.3: masa', m, 0)
    c('pagina', 'ej. 6.3: v2', sp.sqrt(2 * (m * 2.0**2 / 2 + 10000) / m), 1)
    c('pagina', 'ej. 6.6: W báscula', 6.0e4 * 0.010**2 / 2, 1)
    k, m, v1, mu = 20.0, 0.100, 1.50, 0.47
    d = sp.symbols('d', positive=True)
    c('pagina', 'ej. 6.9: P (1e7)', 3.22e5 * 250 / 1e7, 2)
    W = 50.0 * g * 443
    c('pagina', 'ej. 6.10: W (1e5)', W / 1e5, 2)
    c('pagina', 'ej. 6.10: P', W / 900, 0)
    c('pagina', 'ej. 6.10: v', 443 / 900, 3)
    c('pagina', 'interactivo: W resorte', 200 * 0.3**2 / 2, 0)
    c('pagina', 'interactivo: v', sp.sqrt(2 * 9 / 0.5), 0)
    c('pagina', 'mini-test: maleta', 50 * 10 * cos(60), 0)
    c('pagina', 'mini-test: caja subida', 2 * g * 1.5, 1)
    c('pagina', 'mini-test: coche ΔK (1e5)', 1000 * (20**2 - 10**2) / 2 / 1e5, 1)
    c('pagina', 'mini-test: bala K1', 0.020 * 300**2 / 2, 0)
    c('pagina', 'mini-test: bala F (1e4)', 0.020 * 300**2 / 2 / 0.050 / 1e4, 1)
    c('pagina', 'mini-test: resorte 10-20 cm', 200 * (0.20**2 - 0.10**2) / 2, 1)
    c('pagina', 'mini-test: compresión máx', 2 * sp.sqrt(0.5 / 50), 2)
    x = sp.symbols('x')
    c('pagina', 'mini-test: ∫3x²', sp.integrate(3 * x**2, (x, 0, 2)), 1)
    c('pagina', 'mini-test: motor', 100 * g * 0.5, 0)
    c('pagina', 'mini-test: bombilla (1e6 J)', 0.060 * 5 * 3.6e6 / 1e6, 2)
    c('pagina', 'mini-test: coche hp', 2000 * 25 / 746, 0)
    # ---- D9: errores, previas y respuestas modelo
    c('pagina', 'error 1: W oblicua', 40 * 2 * cos(30), 1)
    c('pagina', 'error 2: K1 (1e5)', 0.5 * 1000 * 20**2 / 1e5, 2); c('pagina', 'error 2: d', 0.5 * 1000 * 20**2 / 5000, 1)
    c('pagina', 'error 3: W resorte', 200 * (0.20**2 - 0.10**2) / 2, 1)
    c('pagina', 'error 4: W (1e5)', 1000 * (20**2 - 10**2) / 2 / 1e5, 1)
    c('pagina', 'modelo: resorte 0 a 10 cm', 200 * 0.10**2 / 2, 1)
