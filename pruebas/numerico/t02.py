"""Tema 2: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- E1: velocidad y rapidez media
    c('e1', 'v media', 20.0 / 64.0, 3); c('e1', 'rapidez media', 100 / 64.0, 2)
    # ---- E2: x = b t² − c t³
    t = sp.symbols('t'); b, k = 2.40, 0.120
    x = b * t ** 2 - k * t ** 3; v = sp.diff(x, t)
    c('e2', 'x(10)', x.subs(t, 10), 0); c('e2', 'v media', x.subs(t, 10) / 10, 1)
    c('e2', 'v(5)', v.subs(t, 5), 1); c('e2', 'v(10)', v.subs(t, 10), 1)
    c('e2', 't parada', sp.solve(v, t)[1], 1)
    # ---- E3: Bugatti
    mph = 0.44704
    c('e3', '60 mph', 60 * mph, 2); c('e3', '200 mph', 200 * mph, 2); c('e3', '253 mph', 253 * mph, 2)
    c('e3', 'tramo 1', 60 * mph / 2.1, 1); c('e3', 'tramo 2', (200 - 60) * mph / 17.9, 2)
    c('e3', 'tramo 3', (253 - 200) * mph / 33, 3)
    # ---- E4: antílope
    v0 = 2 * 70.0 / 6.00 - 15.0
    c('e4', 'v0', v0, 2); c('e4', 'a', (15.0 - v0) / 6.00, 2); c('e4', 'v media', 70.0 / 6.00, 1)
    # ---- E5: coche y camión
    tt = 20.0 / 1.40
    c('e5', 't', tt, 2); c('e5', 'x', 20.0 * tt, 0); c('e5', 'v coche', 2.80 * tt, 1); c('e5', 't misma v', 20.0 / 2.80, 2)
    # ---- E6: bola de masilla
    g = 9.80
    c('e6', 'h max', 9.50 ** 2 / (2 * g), 2); c('e6', 'v²', 9.50 ** 2 - 2 * g * 3.60, 2)
    vf = sp.sqrt(9.50 ** 2 - 2 * g * 3.60)
    c('e6', 'v', vf, 2); c('e6', 't', (9.50 - vf) / g, 3)
    # ---- X2: satélite
    g = 9.81; v0 = 311 / 3.6; d = 0.81; m = 210
    a = v0 ** 2 / (2 * d)
    c('x2', 'v0', v0, 2); c('x2', 'a (×10^3)', a / 1e3, 2); c('x2', 'a/g', a / g, 0)
    c('x2', 'N (×10^5)', m * (a + g) / 1e5, 2); c('x2', 'F neta (×10^5)', m * a / 1e5, 2)
    c('x2', 't (×10^-2)', 2 * d / v0 * 100, 2)
    # ---- X3: bala
    g = 9.81; a = 100.0 ** 2 / (2 * 2)
    c('x3', 'a', a, 0); c('x3', 'a/g', a / g, 0); c('x3', 'F', 0.010 * (g + a), 1); c('x3', 'F sin peso', 0.010 * a, 1)
    c('x3', 't', 2 * 2 / 100.0, 3)
    # ---- X4: cohete con g(t) decreciente
    t = sp.symbols('t'); g0, k3 = 10, sp.Rational(1, 10)
    a1 = 20 - g0 + k3 * t; v1 = sp.integrate(a1, (t, 0, t)); y1 = sp.integrate(v1, (t, 0, t))
    c('x4', 'v1(10)', v1.subs(t, 10), 0); c('x4', 'y1(10)', y1.subs(t, 10), 1)
    s = sp.symbols('s')
    a2 = 15 - g0 + k3 * s
    v2 = v1.subs(t, 10) + sp.integrate(a2, (s, 10, t)); y2 = y1.subs(t, 10) + sp.integrate(v2.subs(t, s), (s, 10, t))
    c('x4', 'v2(60)', v2.subs(t, 60), 0); c('x4', 'y2(60)', y2.subs(t, 60), 0)
    # ---- teoría y mini-tests (página)
    g = 9.80
    c('pagina', 'fig. 2.1: v media arrancones', (277 - 19) / 3.0, 0); c('pagina', 'fig. 2.2: v media camioneta', (19 - 277) / 9.0, 0)
    c('pagina', 'nadador: rapidez media', 100.0 / 46.91, 3)
    c('pagina', 'test: v media corredor', (-20 - 10) / (8.0 - 2.0), 1); c('pagina', 'test: rapidez pista', 400 / 80, 1)
    x = 20 + 5 * t ** 2
    c('pagina', 'ej. 2.1: Δx 1-2 s', x.subs(t, 2) - x.subs(t, 1), 0); c('pagina', 'ej. 2.1: v(1)', sp.diff(x, t).subs(t, 1), 0)
    c('pagina', 'ej. 2.1: v(2)', sp.diff(x, t).subs(t, 2), 0)
    x = 3 * t ** 2 - 12 * t
    c('pagina', 'test: v(1)', sp.diff(x, t).subs(t, 1), 0); c('pagina', 'test: t parada', sp.solve(sp.diff(x, t), t)[0], 0)
    vx = 60 + sp.Rational(1, 2) * t ** 2
    c('pagina', 'ej. 2.3: a(1)', sp.diff(vx, t).subs(t, 1), 1); c('pagina', 'ej. 2.3: a(3)', sp.diff(vx, t).subs(t, 3), 1)
    c('pagina', 'test: a media', (5.0 - 20) / 3.0, 1); c('pagina', 'test: a(2) de 2t³', sp.diff(2 * t ** 3, t, 2).subs(t, 2), 0)
    c('pagina', 'ej. 2.4: x(2)', 5.0 + 15 * 2.0 + 0.5 * 4.0 * 2.0 ** 2, 0); c('pagina', 'ej. 2.4: v(2)', 15 + 4.0 * 2.0, 0)
    c('pagina', 'ej. 2.4: x a 25 m/s', 5.0 + (25 ** 2 - 15 ** 2) / (2 * 4.0), 0)
    c('pagina', 'test: d frenado', 25 ** 2 / (2 * 5.0), 1); c('pagina', 'test: t frenado', 25 / 5.0, 1)
    c('pagina', 'test: x reposo', 0.5 * 2.0 * 4.0 ** 2, 0); c('pagina', 'test: v reposo', 2.0 * 4.0, 1)
    c('pagina', 'test: a sin t', (30 ** 2 - 10 ** 2) / (2 * 100), 1)
    c('pagina', 'ej. 2.7: y(1)', 15.0 - 0.5 * g, 1); c('pagina', 'ej. 2.7: v(1)', 15.0 - g, 1)
    c('pagina', 'ej. 2.7: h max', 15.0 ** 2 / (2 * g), 1); c('pagina', 'ej. 2.7: v a 5 m', sp.sqrt(15.0 ** 2 - 2 * g * 5.00), 1)
    r = sorted(sp.solve(g / 2 * t ** 2 - 15.0 * t - 5.00, t))
    c('pagina', 'ej. 2.8: t ficticia', r[0], 2); c('pagina', 'ej. 2.8: t', r[1], 2)
    r = sorted(sp.solve(g / 2 * t ** 2 - 15.0 * t + 5.00, t))
    c('pagina', 'ej. 2.8: t subiendo', r[0], 2); c('pagina', 'ej. 2.8: t bajando', r[1], 2)
    c('pagina', 'test: t caída 20 m', sp.sqrt(2 * 20.0 / g), 2); c('pagina', 'test: v caída 20 m', sp.sqrt(2 * g * 20.0), 1)
    c('pagina', 'test: t subida', 19.6 / g, 2); c('pagina', 'test: h subida', 19.6 ** 2 / (2 * g), 1)
    vx = 10 + sp.integrate(sp.Rational(2) - sp.Rational(1, 10) * t, (t, 0, t)); xx = 50 + sp.integrate(vx, (t, 0, t))
    tm = sp.solve(sp.Rational(2) - sp.Rational(1, 10) * t, t)[0]
    c('pagina', 'ej. 2.9: t vmax', tm, 0); c('pagina', 'ej. 2.9: vmax', vx.subs(t, tm), 0); c('pagina', 'ej. 2.9: x', xx.subs(t, tm), 0)
    v6 = sp.integrate(6 * t, (t, 0, t))
    c('pagina', 'test: v(2) con a=6t', v6.subs(t, 2), 0); c('pagina', 'test: x(2) con a=6t', sp.integrate(v6, (t, 0, t)).subs(t, 2), 0)
    c('pagina', 'test: Δv tramo', 3 * 4, 0)
