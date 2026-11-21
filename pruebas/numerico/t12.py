"""Tema 12: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp

pi = sp.pi
g = sp.Rational(98, 10)


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- E1: cubo con orificio
    L, r = 5.0, 1.0
    V = L**3 - pi * r**2 * L
    m = 6.30 / 9.8
    rho = m / (V * 1e-6)
    c('e1', 'V cm3', V, 0); c('e1', 'V (1e-4 m3)', V * 1e-6 / 1e-4, 2)
    c('e1', 'm', m, 3); c('e1', 'rho (1e3)', rho / 1e3, 1)
    c('e1', 'fraccion hueco %', pi * r**2 * L / L**3 * 100, 1)
    c('e1', 'w0', rho * (L / 100)**3 * 9.8, 1)
    c('e1', 'w0 atajo', 6.30 / (1 - pi * r**2 * L / L**3), 1)
    # ---- E2: gotero IV
    c('e2', 'h', 5980 / (1050 * 9.8), 3)
    # ---- E3: elevador
    A = pi * 0.15**2
    p = 1200 * 9.8 / A
    c('e3', 'A', A, 4); c('e3', 'p (1e5)', p / 1e5, 2); c('e3', 'p atm', p / 1.013e5, 2)
    c('e3', 'p abs (1e5)', (p + 1.013e5) / 1e5, 1); c('e3', 'p abs atm', (p + 1.013e5) / 1.013e5, 1)
    # ---- E4: Pascal
    F2 = 1520 * 9.8
    c('e4', 'F2 (1e4)', F2 / 1e4, 2); c('e4', 'A2/A1', F2 / 125, 0); c('e4', 'D2/D1', sp.sqrt(F2 / 125), 1)
    # ---- E5: roca
    B = 1.80 * 9.8 - 12.8
    V = B / (1000 * 9.8)
    c('e5', 'mg', 1.80 * 9.8, 2); c('e5', 'B', B, 2); c('e5', 'V (1e-4)', V / 1e-4, 2)
    c('e5', 'rho (1e3)', 1.80 / V / 1e3, 2)
    c('e5', 'rho formula (1e3)', 1000 * 17.64 / (17.64 - 12.8) / 1e3, 2)
    # ---- E6: tres pesadas
    Bw, BL = 39.2 - 28.4, 39.2 - 21.5
    c('e6', 'Bw', Bw, 1); c('e6', 'BL', BL, 1); c('e6', 'V (1e-3)', Bw / (1000 * 9.8) / 1e-3, 2)
    c('e6', 'rho_L/rho_w', BL / Bw, 2); c('e6', 'rho_L (1e3)', BL / Bw, 2)
    c('e6', 'rho roca (1e3)', 39.2 / Bw, 2)
    # ---- E7: bloque entre aceite y agua
    pt = 790 * 9.8 * 0.0150
    pb = 790 * 9.8 * 0.100 + 1000 * 9.8 * 0.0150
    dp = pb - pt
    m = dp * 0.0100 / 9.8
    c('e7', 'p sup', pt, 0); c('e7', 'p aceite 10 cm', 790 * 9.8 * 0.100, 0)
    c('e7', 'p agua 1,5', 1000 * 9.8 * 0.0150, 0); c('e7', 'p inf', pb, 0)
    c('e7', 'dp', dp, 0); c('e7', 'm (4 dec, valor exacto 0,8215)', m, 4); c('e7', 'm aprox', m - 0.0005, 3)
    c('e7', 'arq', 790 * 0.0100 * 0.0850 + 1000 * 0.0100 * 0.0150, 4)
    # ---- E8: continuidad
    Q = 0.070 * 3.50
    c('e8', 'Q', Q, 3); c('e8', 'a', Q / 0.105, 2); c('e8', 'b', Q / 0.047, 2)
    c('e8', 'V hora', Q * 3600, 0); c('e8', 'V hora 1e2', Q * 3600 / 100, 1)
    # ---- E9: Torricelli
    v = sp.sqrt(2 * 9.8 * 14.0)
    Aor = pi * (6.00e-3)**2 / 4
    c('e9', 'v', v, 1); c('e9', 'A (1e-5)', Aor / 1e-5, 2); c('e9', 'Q (1e-4)', Aor * v / 1e-4, 2)
    c('e9', 'Q L/s', Aor * v * 1000, 3)
    c('e9', 'x', v * sp.sqrt(2 * 1.0 / 9.8), 2); c('e9', 'v 4 cifras', v, 2)
    # ---- E10: Bernoulli en tubería
    v2 = 3.00 / 4
    cin = 0.5 * 1000 * (3.00**2 - v2**2)
    alt = 1000 * 9.8 * 11.0
    c('e10', 'v2', v2, 3); c('e10', 'v2^2', v2**2, 4); c('e10', 'cinetico (1e3)', cin / 1e3, 2)
    c('e10', 'altura (1e5)', alt / 1e5, 3); c('e10', 'p2 (1e5)', (5.00e4 + cin + alt) / 1e5, 2)
    c('e10', 'cociente', alt / cin, 0)
    # ---- E11: tanque presurizado
    dp = 3.00 * 1.013e5
    t1 = 2 * dp / 1030; t2 = 2 * 9.8 * 11.0
    c('e11', 'dp (1e5)', dp / 1e5, 2); c('e11', 't1', t1, 0); c('e11', 't2', t2, 0)
    c('e11', 'suma', t1 + t2, 0); c('e11', 'v', sp.sqrt(t1 + t2), 1)
    c('e11', 'Torricelli', sp.sqrt(t2), 1); c('e11', 'columna', dp / (1030 * 9.8), 1)
    # ---- E12: Poiseuille
    c('e12', 'cociente R', 0.210 / 0.0700, 0); c('e12', 'R^4', 3**4, 0)
    c('e12', 'dp2 (1e6)', 81 * 6.00e4 / 1e6, 2); c('e12', 'atm', 81 * 6.00e4 / 1.013e5, 0)
    # ---- EPP: vaciado de depósito
    D, d, H = 2.00, 0.0200, 0.800
    t = (D / d)**2 * sp.sqrt(2 * H / 9.8)
    c('epp', 'D/d', D / d, 0)
    c('epp', 't_vac min', t / 60, 1); c('epp', 'raiz2', sp.sqrt(2), 2)
    c('epp', 't_vac (1e3)', t / 1e3, 2)
    # simbólico: y(t) cumple la ecuación diferencial y t_vac anula y
    T, Dd, dd, Hh, gg, y0 = sp.symbols('T D d H g y0', positive=True)
    y = (sp.sqrt(Hh) - (dd / Dd)**2 * sp.sqrt(gg / 2) * T)**2
    s_ = sp.sqrt(Hh) - (dd / Dd)**2 * sp.sqrt(gg / 2) * T   # = sqrt(y) mientras queda agua
    assert sp.simplify(sp.diff(s_**2, T) + (dd / Dd)**2 * sp.sqrt(2 * gg) * s_) == 0
    tv = (Dd / dd)**2 * sp.sqrt(2 * Hh / gg)
    assert sp.simplify(y.subs(T, tv)) == 0

    # ---- Página: ejemplos mínimos de la teoría y tests «Comprueba»
    c('pagina', 'ej. 12.1: masa aire', 1.20 * 60, 0)
    c('pagina', 'ej. 12.2: F (1e6)', 1.013e5 * 20 / 1e6, 1)
    c('pagina', 'aire 3 m: rho g h', 1.2 * 9.8 * 3.0, 0)
    c('pagina', 'ej. 12.3: man (1e5)', 1000 * 9.8 * 12.0 / 1e5, 2)
    c('pagina', 'ej. 12.3: abs (1e5)', (1.01e5 + 1000 * 9.8 * 12.0) / 1e5, 2)
    c('pagina', 'ej. 12.3: man atm', 1000 * 9.8 * 12.0 / 1.013e5, 2)
    c('pagina', 'ej. 12.3: abs atm', (1.01e5 + 1000 * 9.8 * 12.0) / 1.013e5, 2)
    c('pagina', 'Pascal: A2/A1', (20 / 2.0)**2, 0)
    c('pagina', 'barometro h', 1.013e5 / (13.6e3 * 9.8), 3)
    c('pagina', 'ej. 12.4: h_ac/h_ag', 1000 / 850, 2)
    V = 15.0 / 19.3e3
    c('pagina', 'ej. 12.5: V (1e-4)', V / 1e-4, 2)
    c('pagina', 'ej. 12.5: B (V redondeado)', 1030 * 7.77e-4 * 9.8, 2)
    c('pagina', 'ej. 12.5: T', 15.0 * 9.8 - 1030 * V * 9.8, 0)
    c('pagina', 'ej. 12.5: B aire (1e-3)', 1.2 * V * 9.8 / 1e-3, 1)
    c('pagina', 'hielo en mar', 0.92 / 1.03, 2)
    c('pagina', 'ej. 12.6: v1', 9.5e-3 / (pi * 0.040**2), 1)
    c('pagina', 'ej. 12.6: flujo masa', 850 * 9.5e-3, 1)
    c('pagina', 'ej. 12.6: v2', 9.5e-3 / (pi * 0.040**2) * 4, 1)
    c('pagina', 'ej. 12.7: cinetico (1e4)', 0.5 * 1000 * (6.0**2 - 1.5**2) / 1e4, 2)
    c('pagina', 'ej. 12.7: altura (1e4)', 1000 * 9.8 * 5.0 / 1e4, 2)
    c('pagina', 'ej. 12.7: p2 (1e5)', (4.0e5 - 0.5 * 1000 * (6.0**2 - 1.5**2) - 1000 * 9.8 * 5.0) / 1e5, 1)
    c('pagina', 'ej. 12.7: Q (1e-4)', pi * 0.0050**2 * 6.0 / 1e-4, 1)
    v1 = sp.sqrt(2 * 9.8 * 0.100 / 3)
    c('pagina', 'Venturi v1', v1, 2); c('pagina', 'Venturi v2', 2 * v1, 2)
    c('pagina', 'Venturi dp', 1000 * 9.8 * 0.100, 0); c('pagina', 'Venturi Q (1e-4)', 1.0e-3 * v1 / 1e-4, 1)
    c('pagina', 'viscosidad -10 %', (1 / 0.90)**4, 2)
    # tests «Comprueba»
    c('pagina', 'test s1: rho (1e3)', 5.65 / 0.50e-3 / 1e3, 1)
    c('pagina', 'test s1: V_Al/V_Fe', 7.8 / 2.7, 2)
    c('pagina', 'test s2: h 1 atm', 1.013e5 / (1000 * 9.8), 1)
    c('pagina', 'test s2: man (1e4)', 1000 * 9.8 * 3.0 / 1e4, 2)
    c('pagina', 'test s2: abs (1e5)', (1.013e5 + 1000 * 9.8 * 3.0) / 1e5, 2)
    c('pagina', 'test s2: recorrido', 50 / (20 / 2.0)**2, 2)
    c('pagina', 'test s3: f agua mar', 600 / 1030, 3)
    c('pagina', 'test s3: B', 1000 * 2.0e-3 * 9.8, 1)
    c('pagina', 'test s3: T', 50 - 1000 * 2.0e-3 * 9.8, 1)
    c('pagina', 'test s3: V (1e-4)', (10.0 - 8.0) / (1000 * 9.8) / 1e-4, 2)
    c('pagina', 'test s3: rho (1e3)', 1000 * 10.0 / (10.0 - 8.0) / 1e3, 1)
    c('pagina', 'test s4: boquilla', 1.5 * (2.0 / 0.50)**2, 0)
    c('pagina', 'test s4: Q (1e-4)', 10e-3 / 20 / 1e-4, 1)
    c('pagina', 'test s4: v caño', 10e-3 / 20 / (pi * 0.0050**2), 1)
    c('pagina', 'test s5: dp (1e4)', 0.5 * 1000 * (6.0**2 - 2.0**2) / 1e4, 1)
    c('pagina', 'test s5: v abierto', sp.sqrt(2 * 9.8 * 5.0), 1)
    c('pagina', 'test s5: termino presion', 2 * 1.013e5 / 1000, 1)
    c('pagina', 'test s5: v cerrado', sp.sqrt(2 * 1.013e5 / 1000 + 2 * 9.8 * 5.0), 1)
    c('pagina', 'test s5: Venturi v1', sp.sqrt(2 * 9.8 * 0.050 / (3**2 - 1)), 3)
    c('pagina', 'test s6: -20 %', (1 / 0.80)**4, 2)
    # ---- D9: errores y respuestas modelo
    c('pagina', 'error 1: D2/D1', sp.sqrt(sp.Rational(1520 * 98, 10) / 125), 1)
    c('pagina', 'error 2: p del fallo (1e4)', (5.00e4 + 0.5 * 1000 * (9 - 0.5625) - 1000 * 9.8 * 11) / 1e4, 2); c('pagina', 'error 2: p (1e5)', (5.00e4 + 0.5 * 1000 * (9 - 0.5625) + 1000 * 9.8 * 11) / 1e5, 2)
    c('pagina', 'error 3: p del fallo', 1000 * 9.8 * 0.115, 0); c('pagina', 'error 3: p', 790 * 9.8 * 0.100 + 1000 * 9.8 * 0.0150, 0)
    c('pagina', 'error 4: v', sp.sqrt(2 * 9.8 * 14.0), 1); c('pagina', 'error 4: v del fallo', sp.sqrt(2 * 9.8 * 1.0), 2)
    c('pagina', 'modelo: h bolsa', 5980 / (1050 * 9.8), 3)
