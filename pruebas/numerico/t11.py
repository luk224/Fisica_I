"""Tema 11: resultados recalculados con sympy a partir de los datos del enunciado (se comparan en valor absoluto)."""
import sympy as sp

sin = lambda g: sp.sin(sp.rad(g))
cos = lambda g: sp.cos(sp.rad(g))


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    g = 9.8
    # ---- E1: centro de masas barra + dos masas
    num = 0.120 * 0.250 + 0.055 * 0 + 0.110 * 0.500
    den = 0.120 + 0.055 + 0.110
    c('e1', 'numerador', num, 3)
    c('e1', 'masa total', den, 3)
    c('e1', 'x_cm (m)', num / den, 3)
    c('e1', 'x_cm (cm)', num / den * 100, 1)
    # ---- E2: tabla con dos personas
    w, F1, L = 160, 60, 3.00
    F2 = w - F1
    x = w * L / 2 / F2
    c('e2', 'F2', F2, 0)
    c('e2', 'x', x, 2)
    c('e2', 'torca F1 centro', F1 * L / 2, 0)
    c('e2', 'torca F2 centro', F2 * (x - L / 2), 0)
    # ---- E3: viga con cable y bisagra
    sn, cs = sp.Rational(3, 5), sp.Rational(4, 5)
    T = (190 * 2 + 300 * 4) / (4 * sn)
    Hh = T * cs
    Hv = 190 + 300 - T * sn
    c('e3', 'sen', sn, 3)
    c('e3', 'cos', cs, 3)
    c('e3', 'T', T, 0)
    c('e3', 'H_h', Hh, 0)
    c('e3', 'T sen', T * sn, 0)
    c('e3', 'H_v', Hv, 0)
    c('e3', 'H_v extremo', 190 * 2 / 4, 0)
    c('e3', 'H_h pared', (190 * 2 + 300 * 4) / 3, 0)
    # ---- E4: escalera
    w, W, mu, Lg, d = 160, 740, 0.40, 5.0, 3.0
    h = sp.sqrt(Lg**2 - d**2)
    n2 = w + W
    fmax = mu * n2
    n1 = (w * 1.5 + W * sp.Rational(3, 5) * 1.0) / h
    s = (fmax * h - w * 1.5) / (W * sp.Rational(3, 5))
    c('e4', 'altura pared', h, 1)
    c('e4', 'n2', n2, 0)
    c('e4', 'f max', fmax, 0)
    c('e4', 'torca peso hombre', W * 0.6, 0)
    c('e4', 'suma torcas', w * 1.5 + W * 0.6, 0)
    c('e4', 'n1 = f_s', n1, 0)
    c('e4', 'pendiente f_s(s)', W * 0.6 / h, 0)
    c('e4', 's', s, 1)
    # ---- E5: viga inclinada 30° con cable 40°
    m, Lv = 1150, 8.0
    wv = m * g
    T = wv * 4.0 * cos(30) / (6.0 * sin(40))
    Hh = T * cos(10)
    Hv = wv - T * sin(10)
    c('e5', 'w (1e4 N)', wv / 1e4, 3)
    c('e5', 'brazo T', 6.0 * sin(40), 2)
    c('e5', 'brazo w', 4.0 * cos(30), 2)
    c('e5', 'T (1e4)', T / 1e4, 2)
    c('e5', 'H_h (1e3)', Hh / 1e3, 2)
    c('e5', 'T sen10', T * sin(10), 0)
    c('e5', 'H_v (1e3)', Hv / 1e3, 2)
    # ---- E6: varillas acero y cobre en serie
    F, dd, l0 = 4000, 0.0150, 0.750
    A = sp.pi * dd**2 / 4
    es = F / A
    Ya, Yc = 2.0e11, 1.1e11
    c('e6', 'A (1e-4)', A * 1e4, 3)
    c('e6', 'esfuerzo (1e7)', es / 1e7, 2)
    c('e6', 'def acero (1e-4)', es / Ya * 1e4, 1)
    c('e6', 'def cobre (1e-4)', es / Yc * 1e4, 1)
    c('e6', 'alarg acero (1e-5)', es / Ya * l0 * 1e5, 1)
    c('e6', 'alarg cobre (1e-4)', es / Yc * l0 * 1e4, 1)
    c('e6', 'alarg total (mm)', (es / Ya + es / Yc) * l0 * 1e3, 2)
    # ---- E7: corte en placa de acero
    Fp, lado, esp, S = 9.0e5, 0.100, 0.00500, 7.5e10
    A = lado * esp
    es = Fp / A
    dfm = es / S
    c('e7', 'A (1e-4)', A * 1e4, 2)
    c('e7', 'esfuerzo (1e9)', es / 1e9, 1)
    c('e7', 'deformacion', dfm, 3)
    c('e7', 'x (m, 1e-3)', dfm * lado * 1e3, 1)
    c('e7', 'x (cm)', dfm * lado * 100, 2)
    # ---- E8: Fosa de las Marianas
    p, p0 = 1.16e8, 1.0e5
    dp = p - p0
    k = 46.4e-6 / 1.013e5
    dV = k * dp * 1.00
    rho = 1.03e3 / (1.00 - dV)
    c('e8', 'delta p (1e8)', dp / 1e8, 3)
    c('e8', 'k (1e-10)', k * 1e10, 2)
    c('e8', 'B (1e9)', 1 / k / 1e9, 1)
    c('e8', 'delta V', dV, 3)
    c('e8', 'V final', 1 - dV, 3)
    c('e8', 'rho (1e3)', rho / 1e3, 2)
    c('e8', 'aumento rho (%)', (rho / 1.03e3 - 1) * 100, 1)
    # ---- E9: varilla con dos alambres
    L, AA, AB, YA, YB = 1.05, 2.00, 4.00, 1.80, 1.20
    x = sp.symbols('x')
    xa = sp.solve(sp.Eq(AB / AA * (L - x), x), x)[0]
    xb = sp.solve(sp.Eq(AB * YB / (AA * YA) * (L - x), x), x)[0]
    c('e9', 'x esfuerzos iguales', xa, 2)
    c('e9', 'x deformaciones iguales', xb, 2)
    c('e9', 'centro', L / 2, 3)

    # ---- Teoría (ejemplos de U condensados) y mini-tests «Comprueba»
    c('pagina', 'test s1: par de fuerzas', 10 * 0.40, 1)
    c('pagina', 'test s2: x_cg barra + masa', sp.Rational(4 * 1 + 2 * 2, 6), 2)
    c('pagina', 'ej. 11.1: masa máxima', 90 * 1.5 / (6.0 - 1.5), 0)
    c('pagina', 'test s2: distancia 60 kg', 90 * 0.75 / 60, 3)
    c('pagina', 'test s3: n_D', (200 * 2 + 400 * 1) / 4, 0)
    c('pagina', 'test s3: escalera sola n1', 180 * 1.5 / 4.0, 1)
    c('pagina', 'test s3: escalera sola mu', 180 * 1.5 / 4.0 / 180, 3)
    Tl = 50 * 1.2 / (1.2 * sin(30))
    c('pagina', 'test s3: T letrero', Tl, 0)
    c('pagina', 'test s3: H_h letrero', Tl * cos(30), 1)
    n1 = (180 * 1.5 + 800 * 1.0) / 4.0
    c('pagina', 'ej. 11.3: n2', 980, 0)
    c('pagina', 'ej. 11.3: n1', n1, 0)
    c('pagina', 'ej. 11.3: mu min', n1 / 980, 2)
    c('pagina', 'ej. 11.3: F suelo (1e3)', sp.sqrt(n1**2 + 980**2) / 1e3, 2)
    c('pagina', 'ej. 11.3: angulo', sp.deg(sp.atan(980 / n1)), 0)
    T4 = 0.30 * 200 / (0.050 * sin(80))
    c('pagina', 'ej. 11.4: T', T4, -1)
    c('pagina', 'ej. 11.4: E_x', T4 * cos(80), -1)
    c('pagina', 'ej. 11.4: E_y', abs(200 - T4 * sin(80)), 0)
    sg = 550 * g / 3.0e-5
    c('pagina', 'ej. 11.5: esfuerzo (1e8)', sg / 1e8, 1)
    c('pagina', 'ej. 11.5: deformacion (1e-4)', sg / 2.0e11 * 1e4, 1)
    c('pagina', 'ej. 11.5: alargamiento (mm)', sg / 2.0e11 * 2.0 * 1e3, 1)
    c('pagina', 'ej. 11.6: deformacion (1e-3)', 1.6e7 / 5.0e9 * 1e3, 1)
    c('pagina', 'ej. 11.6: delta V (1e-4)', 1.6e7 / 5.0e9 * 0.25 * 1e4, 1)
    c('pagina', 'ej. 11.7: deformacion (1e-4)', 0.16e-3 / 0.80 * 1e4, 1)
    c('pagina', 'ej. 11.7: esfuerzo (1e6)', 3.5e10 * 0.16e-3 / 0.80 / 1e6, 1)
    c('pagina', 'ej. 11.7: area (1e-3)', 0.80 * 0.0050 * 1e3, 1)
    c('pagina', 'ej. 11.7: F (1e4)', 3.5e10 * 0.16e-3 / 0.80 * 0.80 * 0.0050 / 1e4, 1)
    sa = 20 * g / 1.0e-6
    c('pagina', 'test s4: esfuerzo (1e8)', sa / 1e8, 2)
    c('pagina', 'test s4: alargamiento (1e-3)', sa * 2.0 / 2.0e11 * 1e3, 2)
    c('pagina', 'test s4: agua (1e-3)', 46.4e-6 * 100 * 1e3, 2)
    c('pagina', 'test s4: deformacion corte (1e-5)', 1.0e4 / 0.010 / 2.5e10 * 1e5, 1)
    c('pagina', 'test s4: x corte (1e-6)', 1.0e4 / 0.010 / 2.5e10 * 0.050 * 1e6, 1)
    c('pagina', 'test s5: F ruptura', 5e8 * 1.0e-6, 0)
    c('pagina', 'test s5: masa', 5e8 * 1.0e-6 / g, 0)
