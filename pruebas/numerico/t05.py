"""Tema 5: resultados recalculados con sympy a partir de los datos del enunciado, y dónde deben aparecer en la página."""
import sympy as sp

sin = lambda g: sp.sin(sp.rad(g))
cos = lambda g: sp.cos(sp.rad(g))
tan = lambda g: sp.tan(sp.rad(g))


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales[, mant_exp]) registra una comprobación."""
    # ---- X1 (Febrero 2022): dos bloques en planos de 25° y 60°, sin fricción
    for g, da, dT in ((9.80, 2, 0), (9.81, 3, 1)):
        m1, m2 = 80, 20
        a = (m1 * sin(25) - m2 * sin(60)) / (m1 + m2) * g
        c('x1', f'a (g={g})', a, da)
        c('x1', f'T (g={g})', m2 * (a + g * sin(60)), dT)
    # ---- X2 (Febrero 2025): dos paquetes en rampa con fricción
    g, al, m1, m2, u1, u2 = 9.81, 16, 5.5, 8.5, 0.2, 0.25
    a = g * sin(al) - (u1 * m1 + u2 * m2) * g * cos(al) / (m1 + m2)
    c('x2', 'a común', a, 3)
    c('x2', 'T', m1 * (g * (sin(al) - u1 * cos(al)) - a), 2)
    c('x2', 'a suelto de μ=0,2', g * (sin(al) - u1 * cos(al)), 3)
    c('x2', 'a suelto de μ=0,25', g * (sin(al) - u2 * cos(al)), 3)
    # ---- X3 (Febrero 2023): bloque contra una pared con fuerza oblicua
    g, m, F, th, mu, d = 9.81, 5, 96.0, 60, 0.3, 0.4
    n = F * cos(th)
    a = (F * sin(th) - m * g - mu * n) / m
    c('x3', 'a', a, 2)
    c('x3', 'v', sp.sqrt(2 * a * d), 2)
    c('x3', 'W de F', F * sin(th) * d, 1)
    c('x3', 'W total', m * a * d, 2)
    # ---- X4 (Febrero 2020): polea móvil
    g, mA, mB, mu = 9.80, 1.5, 1.0, 0.1
    aA, T = sp.symbols('aA T')
    s = sp.solve([sp.Eq(mA * g * sin(30) - mu * mA * g * cos(30) - T, mA * aA), sp.Eq(2 * T - mB * g, mB * aA / 2)], [aA, T])
    c('x4', 'a_A', s[aA], 3); c('x4', 'a_B', s[aA] / 2, 3); c('x4', 'T', s[T], 2); c('x4', '2T', 2 * s[T], 1)
    c('x4', 'v_A', sp.sqrt(2 * s[aA] * 1), 2)
    # ---- X5 (Febrero 2018): cono giratorio
    g, m, L, w = 9.80, 2, 4, sp.pi / 2
    r = L * sin(30)
    n_, T_ = sp.symbols('n T')
    s = sp.solve([sp.Eq(T_ * sin(30) - n_ * cos(30), m * w ** 2 * r), sp.Eq(T_ * cos(30) + n_ * sin(30), m * g)], [n_, T_])
    c('x5', 'v', w * r, 2); c('x5', 'n', s[n_], 2); c('x5', 'T', s[T_], 1)
    w0 = sp.sqrt(g * tan(30) / r)
    c('x5', 'ω0', w0, 2); c('x5', 'ω0 en rpm', w0 * 60 / (2 * sp.pi), 1)
    # ---- E1: bola de demolición
    g, m = 9.80, 3620
    c('e1', 'T_B (×10^4)', m * g / cos(40) / 1e4, 2); c('e1', 'T_A (×10^4)', m * g * tan(40) / 1e4, 2)
    # ---- E2: coche en rampa de 25° con cable a 31°
    w = 1130 * 9.80
    T = w * sin(25) / cos(31)
    c('e2', 'T', T, 0); c('e2', 'n (3 cifras significativas)', w * cos(25) - T * sin(31), -1)
    # ---- E3: Atwood 15 kg / 28 kg
    a = (28 - 15) / (28 + 15) * 9.80
    c('e3', 'a', a, 2); c('e3', 'T', 15 * (9.80 + a), 0)
    # ---- E4: báscula en el elevador
    m = 550 / 9.80
    c('e4', 'a con 450 N', (450 - 550) / m, 2); c('e4', 'a con 670 N', (670 - 550) / m, 2)
    # ---- E5: caja de 10 kg en rampa de 55° con F=120 N
    g = 9.80; mu = 0.3
    c('e5', 'a bajando', (120 + 10 * g * sin(55) - mu * 10 * g * cos(55)) / 10, 1)
    c('e5', 'a subiendo', (120 - 10 * g * sin(55) - mu * 10 * g * cos(55)) / 10, 2)
    # ---- E6: umbral de deslizamiento
    al = sp.atan(0.35)
    a = g * (sp.sin(al) - 0.25 * sp.cos(al))
    c('e6', 'ángulo crítico', sp.deg(al), 1); c('e6', 'a', a, 2); c('e6', 'v tras 5 m', sp.sqrt(2 * a * 5.0), 2)
    # ---- E7: tirón oblicuo
    c('e7', 'F paciente', 0.35 * 90 * g / (cos(25) + 0.35 * sin(25)), 0)
    # ---- E8: curva peraltada
    v = 65.0 * 0.44704
    be = sp.atan(v ** 2 / (g * 225))
    c('e8', 'ángulo', sp.deg(be), 1)
    c('e8', 'n coche (×10^4)', 1125 * g / sp.cos(be) / 1e4, 2); c('e8', 'n camión (×10^4)', 2250 * g / sp.cos(be) / 1e4, 2)
    # ---- E9: columpio gigante
    R = 3.00 + 5.00 * sin(30)
    v = sp.sqrt(g * R * tan(30))
    c('e9', 'R', R, 2); c('e9', 'v', v, 2); c('e9', 'T_per', 2 * sp.pi * R / v, 2)
    # ---- teoría y mini-tests (se buscan en toda la página)
    g = 9.80
    c('pagina', 'ej. 5.9: mujer de 50 kg, a=+2', 50 * (g + 2), 0); c('pagina', 'ej. 5.9: a=-2', 50 * (g - 2), 0)
    c('pagina', 'ej. 5.12 mini-test: Atwood 3 y 5 kg, a', (5 - 3) / 8 * g, 2); c('pagina', 'T', 3 * (g + (5 - 3) / 8 * g), 1)
    c('pagina', 'ej. 5.13: μs', 230 / 500, 2); c('pagina', 'ej. 5.14: μk', 200 / 500, 2)
    c('pagina', 'ej. 5.15: T', 0.4 * 500 / (cos(30) + 0.4 * sin(30)), 0); c('pagina', 'ej. 5.15: n', 500 - 0.4 * 500 / (cos(30) + 0.4 * sin(30)) * 0.5, 0)
    c('pagina', 'ej. 5.18: velocidad terminal', sp.sqrt(50 * g / 0.25), 0)
    c('pagina', 'ej. 5.21: v máx', sp.sqrt(0.96 * g * 230), 0)
    c('pagina', 'ej. 5.22: ángulo de peralte', sp.deg(sp.atan(25 ** 2 / (g * 230))), 1)
    c('pagina', 'mini-test: μs con α=30°', tan(30), 2)
    c('pagina', 'mini-test: curva plana', sp.sqrt(0.5 * g * 50), 1)
    c('pagina', 'mini-test: lámpara, normal en rampa', 20 * g * cos(30), 0)
    c('pagina', 'mini-test: ascensor 70 kg', 70 * (g + 2), 0)
