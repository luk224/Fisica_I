"""Tema 7: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp

sin = lambda g: sp.sin(sp.rad(g))
cos = lambda g: sp.cos(sp.rad(g))


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- X1: carril con rozamiento en BC y resorte
    m, h, L, k, x, g = 5, 4, 5, 400, sp.Rational(25, 100), sp.Rational(98, 10)
    c('x1', 'mgh', m * g * h, 0)
    c('x1', 'U elástica', k * x**2 / 2, 1)
    c('x1', 'mgL', m * g * L, 0)
    c('x1', 'mu', (m * g * h - k * x**2 / 2) / (m * g * L), 3)
    c('x1', 'mu g=9,81', (m * 9.81 * h - k * x**2 / 2) / (m * 9.81 * L), 3)
    c('x1', 'disipada', m * g * h - k * x**2 / 2, 1)
    # ---- X2: rampa 30°, resorte
    m, s, v, mu, g = 1.5, 6.0, 7, 0.5, 9.8
    K = m * v**2 / 2; Ug = m * g * s * sin(30); Wf = mu * m * g * cos(30) * s
    c('x2', 'K_B', K, 2); c('x2', 'U_grav,B', Ug, 2); c('x2', '|W_f|', Wf, 2)
    c('x2', 'U_el,A', K + Ug + Wf, 2)
    c('x2', 'U_el g=9,81', K + m * 9.81 * s * sin(30) + mu * m * 9.81 * cos(30) * s, 1)
    c('x2', '% K', 100 * K / (K + Ug + Wf), 0)
    c('x2', '% Ug', 100 * Ug / (K + Ug + Wf), 0)
    c('x2', '% Wf', 100 * Wf / (K + Ug + Wf), 0)
    # ---- X3
    m, s, v, mu, g = 1.5, 5, 6, 0.4, 9.81
    K = m * v**2 / 2; Ug = m * g * s * sin(25); Wf = mu * m * g * cos(25) * s
    c('x3', 'K', K, 2); c('x3', 'Ug', Ug, 2); c('x3', 'Wf', Wf, 2)
    c('x3', 'U_el', K + Ug + Wf, 2)
    # ---- X4
    m, R, vB, s, g = 0.5, 2.1, 5.2, 5, 9.8
    c('x4', 'vB^2', vB**2, 2)
    c('x4', 'mu', vB**2 / (2 * g * s), 3)
    c('x4', 'K_B', m * vB**2 / 2, 2)
    c('x4', 'mgR', m * g * R, 2)
    c('x4', 'W_f AB', m * vB**2 / 2 - m * g * R, 2)
    c('x4', 'W_f AB g=9,81', m * vB**2 / 2 - m * 9.81 * R, 2)
    c('x4', 'v sin fricción', sp.sqrt(2 * g * R), 2)
    # ---- E2
    m, k, x, g, th = 2.00, 400, 0.220, 9.80, 37.0
    U = k * x**2 / 2
    c('e2', 'U', U, 2); c('e2', 'v', x * sp.sqrt(k / m), 2)
    c('e2', 'h', U / (m * g), 3); c('e2', 'L', U / (m * g * sin(th)), 3)
    c('e2', 'sin37', sin(th), 4)
    # ---- E3
    m, k, x1, x2, mu, g, d = 2.50, 840, 0.0300, 0.0100, 0.40, 9.8, 0.0200
    U1 = k * x1**2 / 2; U2 = k * x2**2 / 2; Wf = mu * m * g * d
    K2 = U1 - Wf - U2
    c('e3', 'U1', U1, 3); c('e3', 'U2', U2, 4); c('e3', 'Wf', Wf, 3)
    c('e3', 'K2', K2, 3); c('e3', 'v', sp.sqrt(2 * K2 / m), 3)
    c('e3', 'v sin fricción', sp.sqrt(2 * (U1 - U2) / m), 3)
    # ---- E4
    m, k, g, y = 3.00, 900, 9.8, 0.0500
    K = m * g * y - k * y**2 / 2
    c('e4', 'mgy', m * g * y, 3); c('e4', 'ky²/2', k * y**2 / 2, 3)
    c('e4', 'K', K, 3); c('e4', 'v', sp.sqrt(2 * K / m), 3)
    ys = m * g / k
    c('e4', 'y*', ys, 4); c('e4', 'Kmax', (m * g)**2 / (2 * k), 3)
    c('e4', 'vmax', sp.sqrt((m * g)**2 / (k * m)), 3); c('e4', '2y*', 2 * ys, 4)
    # ---- E5
    m, k, x0, mu, g = 1.60, 45.0, 0.280, 0.300, 9.8
    U1 = k * x0**2 / 2; Wf = mu * m * g * x0; K = U1 - Wf
    c('e5', 'U1', U1, 3); c('e5', 'Wf', Wf, 3); c('e5', 'K', K, 3)
    c('e5', 'v sep', sp.sqrt(2 * K / m), 3)
    xs = mu * m * g / k
    c('e5', 'x*', xs, 3); c('e5', 'd', x0 - xs, 3)
    vm2 = 2 / m * (k * x0**2 / 2 - k * xs**2 / 2 - mu * m * g * (x0 - xs))
    c('e5', 'vmax', sp.sqrt(vm2), 3)
    # ---- E6
    m, R, W, g = 0.20, 0.50, 0.22, 9.8
    Wg = m * g * R; Wt = Wg - W; v2 = 2 * Wt / m
    c('e6', 'Wg', Wg, 2); c('e6', 'Wtot', Wt, 2); c('e6', 'vB', sp.sqrt(v2), 2)
    c('e6', 'v sin fricción', sp.sqrt(2 * g * R), 2); c('e6', 'vB²', v2, 1)
    n = m * (g + v2 / R)
    c('e6', 'n', n, 1); c('e6', 'n/mg', n / (m * g), 1); c('e6', 'mg', m * g, 2)
    # ---- E7
    m, v1, k, f, g, y2 = 2000, 4.00, 1.06e4, 17000, 9.8, -1.00
    K1 = m * v1**2 / 2; U2 = m * g * y2 + k * y2**2 / 2
    K2 = K1 - f * 1 + (-U2)
    c('e7', 'K1', K1, 0); c('e7', 'mgy', m * g * y2, 0); c('e7', 'ky²/2', k * y2**2 / 2, 0)
    c('e7', 'U2', U2, 0); c('e7', 'K2', K2, 0); c('e7', 'v2', sp.sqrt(2 * K2 / m), 2)
    F = f + k * 1 - m * g
    c('e7', 'F neta', F, 0); c('e7', 'a', F / m, 2); c('e7', 'F resorte', k * 1, 0)
    # ---- E8 (= X2 con otros datos)
    m, s, v, mu, g = 1.50, 6.00, 7.00, 0.50, 9.80
    K = m * v**2 / 2; Ug = m * g * s * sin(30); Wf = mu * m * g * cos(30) * s
    c('e8', 'K_B', K, 2); c('e8', 'Ug', Ug, 2); c('e8', 'Wf', Wf, 2); c('e8', 'U_el', K + Ug + Wf, 0)
    # ---- X8: aproximación mgh de la energía potencial
    c('x7', 'g a 400 km (%)', 100 * (6371 / (6371 + 400))**2, 0)
    # ---- teoría, ejemplos del libro y mini-tests (se buscan en toda la página)
    g = 9.80
    c('pagina', 'mínimo: libro ΔU', 2.0 * g * 1.5, 1)
    m = 0.145
    c('pagina', 'ej. 7.1: altura', 20.0**2 / (2 * g), 1)
    c('pagina', 'ej. 7.1: K1', m * 20.0**2 / 2, 1)
    U1 = m * g * (-0.50)
    c('pagina', 'ej. 7.2: U1', abs(U1), 2)
    c('pagina', 'ej. 7.2: W_otras', m * 20.0**2 / 2 - U1, 1)
    c('pagina', 'ej. 7.2: F', (m * 20.0**2 / 2 - U1) / 0.50, -1)
    c('pagina', 'ej. 7.2: U3', m * g * 15.0, 1)
    K3 = m * 20.0**2 / 2 - m * g * 15.0
    c('pagina', 'ej. 7.2: K3', K3, 1)
    c('pagina', 'ej. 7.2: v3', sp.sqrt(2 * K3 / m), 0)
    c('pagina', 'ej. 7.4: v', sp.sqrt(2 * g * 3.00), 2)
    k, m = 5.00, 0.200
    K = k * (0.100**2 - 0.080**2) / 2
    c('pagina', 'ej. 7.7: K', K, 4); c('pagina', 'ej. 7.7: v', sp.sqrt(2 * K / m), 2)
    c('pagina', 'ej. 7.8: U2', k * 0.100**2 / 2, 4)
    K = 0.610 * 0.100 - k * 0.100**2 / 2
    c('pagina', 'ej. 7.8: K2', K, 4); c('pagina', 'ej. 7.8: v', sp.sqrt(2 * K / m), 2)
    c('pagina', 'ej. 7.8: v sin resorte', sp.sqrt(2 * 0.0610 / m), 2)
    c('pagina', 'ej. 7.9: K1', 2000 * 4.00**2 / 2, 0)
    c('pagina', 'ej. 7.9: mgy2', 2000 * g * 2.00, 0)
    k9 = (2000 * 4.00**2 / 2 - 17000 * 2.00 + 2000 * g * 2.00) / 2
    c('pagina', 'ej. 7.9: k (1e4)', k9 / 1e4, 2)
    c('pagina', 'ej. 7.9: U_el', k9 * 2.00**2 / 2, 0)
    c('pagina', 'ej. 7.10: recto', 0.200 * 40.0 * g * 2.50, 0)
    c('pagina', 'ej. 7.10: dos tramos', 0.200 * 40.0 * g * 3.50, 0)
    c('pagina', 'ej. 7.12: ΔK', 25.0 * 6.00**2 / 2, 0)
    c('pagina', 'ej. 7.12: ΔU', 25.0 * g * 3.00, 0)
    c('pagina', 'ej. 7.12: ΔU_int', 25.0 * g * 3.00 - 25.0 * 6.00**2 / 2, 0)
    # mini-tests
    c('pagina', 'test 1: caída', sp.sqrt(2 * g * 5.0), 2)
    c('pagina', 'test 1: lanzada', sp.sqrt(3.0**2 + 2 * g * 5.0), 2)
    c('pagina', 'test 1: tobogán W_f', 30 * g * 2.5 - 30 * 5.0**2 / 2, 0)
    c('pagina', 'test 1: mochila', 8 * g * 0.75, 1)
    c('pagina', 'test 2: U 4 cm', 500 * 0.040**2 / 2, 2)
    c('pagina', 'test 2: U 8 cm', 500 * 0.080**2 / 2, 1)
    c('pagina', 'test 2: v', sp.sqrt(2 * 0.40 / 0.20), 1)
    x = sp.symbols('x', positive=True)
    c('pagina', 'test 2: compresión', sp.solve(0.50 * g * (0.30 + x) - 200 * x**2 / 2, x)[0], 3)
    c('pagina', 'test 3: fricción ida y vuelta', 0.30 * 10 * g * 8.0, 0)
    c('pagina', 'test 4: F', 10 * 0.30, 1)
    c('pagina', 'test 4: |F| en 2D', sp.sqrt(12**2 + 3**2), 1)
    c('pagina', 'test 4: repulsión', 2.0 / 0.50**2, 1)
    c('pagina', 'test 5: retorno', sp.sqrt(3), 2)
    c('pagina', 'test 5: K max', 5.00 * 0.100**2 / 2, 3)
    c('pagina', 'test 5: v max', sp.sqrt(2 * 0.025 / 0.200), 2)
    # ---- D9: errores y respuestas modelo
    g = 9.8
    c('pagina', 'error 1: v', sp.sqrt(2 * g * 5 * sin(30)), 2)
    c('pagina', 'error 2: s correcto', 64 / (2 * g * (sin(30) + 0.3 * cos(30))), 2); c('pagina', 'error 2: s del fallo', 64 / (2 * g * (sin(30) + 0.3)), 2)
    c('pagina', 'error 4: n', 0.20 * (g + 7.6 / 0.50), 1)
    c('pagina', 'modelo: fricción 2 m', 0.2 * 1 * g * 2, 2); c('pagina', 'modelo: fricción 4 m', 0.2 * 1 * g * 4, 2); c('pagina', 'modelo: peso 2 m', 1 * g * 2, 1)
    c('pagina', 'modelo: ΔU frente a mgh (%)', (1 - 6.37e6 / (6.37e6 + 1000)) * 100, 3)
