"""Tema 9: resultados recalculados con sympy a partir de los datos del enunciado (se comparan en valor absoluto)."""
import sympy as sp


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- E1: aspas de licuadora
    al, w = 1.50, 36.0
    t = w / al
    th = al * t**2 / 2
    c('e1', 't', t, 1)
    c('e1', 'theta (rad)', th, 0)
    c('e1', 'theta por 9.10', (w / 2) * t, 0)
    c('e1', 'rev', th / (2 * sp.pi), 1)
    # ---- E2: rueda con w lineal
    a = sp.Rational(10, 7)
    t0 = 6 / a
    c('e2', 'alfa', a, 2)
    c('e2', 't parada', t0, 2)
    c('e2', 'dtheta', (-6 + 4) / 2 * 7, 2)
    th1 = -6 * t0 + a * t0**2 / 2
    c('e2', 'theta a t parada', abs(th1), 1)
    c('e2', 'vuelta', 4 * (7 - t0) / 2, 1)
    c('e2', 'total recorrido', abs(th1) + 4 * (7 - t0) / 2, 1)
    # ---- E3: rodillo
    tt, g_, b_ = sp.symbols('t gamma beta')
    gam, bet = 3.20, 0.500
    th_t = gam * tt**2 - bet * tt**3
    om = sp.diff(th_t, tt); alf = sp.diff(om, tt)
    ts = sp.solve(alf, tt)[0]
    c('e3', 'coef w lineal', om.coeff(tt, 1), 2)
    c('e3', 'coef w cuadr', abs(om.coeff(tt, 2)), 2)
    c('e3', 'alfa cte', alf.subs(tt, 0), 2)
    c('e3', 'alfa pend', abs(sp.diff(alf, tt)), 2)
    c('e3', 't*', ts, 2)
    c('e3', 'w max', om.subs(tt, ts), 2)
    c('e3', 't w=0', sp.solve(om, tt)[1], 2)
    # ---- E4: centrifugador
    g = 9.8
    wr = 5000 * 2 * sp.pi / 60
    arad = 3000 * g
    r = arad / wr**2
    c('e4', 'omega', wr, 1)
    c('e4', 'a_rad', arad, 0)
    c('e4', 'r', r, 3)
    c('e4', 'diametro', 2 * r, 3)
    c('e4', 'a_rad con 0.0635 (1e4)', wr**2 * 0.0635 / 1e4, 2)
    # ---- E5: volante
    R, al = 0.300, 0.600
    atan = R * al
    c('e5', 'a_tan', atan, 3)
    for ang, key in ((60, 'b'), (120, 'c')):
        d = sp.rad(ang)
        om = sp.sqrt(2 * al * d)
        ar = R * om**2
        c('e5', f'dtheta {key}', d, 3)
        c('e5', f'omega {key}', om, 3)
        c('e5', f'a_rad {key}', ar, 3)
        c('e5', f'a {key}', sp.sqrt(atan**2 + ar**2), 3)
    # ---- E6: momentos de inercia
    m, L = sp.symbols('m L', positive=True)
    Ib = m * ((L / 4)**2 + (L / 4)**2 + (3 * L / 4)**2)
    assert sp.simplify(Ib - sp.Rational(11, 16) * m * L**2) == 0
    M, L2, ms = 4.00, 2.00, 0.300
    c('e6', 'barra centro', M * L2**2 / 12, 3)
    c('e6', 'esferas centro', 2 * ms * (L2 / 2)**2, 3)
    c('e6', 'a)', M * L2**2 / 12 + 2 * ms * (L2 / 2)**2, 2)
    c('e6', 'barra extremo', M * L2**2 / 3, 3)
    c('e6', 'esfera lejana', ms * L2**2, 3)
    c('e6', 'b)', M * L2**2 / 3 + ms * L2**2, 2)
    c('e6', 'd)', (M + 2 * ms) * 0.5**2, 2)
    # ---- E7: disco compuesto
    sd, sa = 30.0, 20.0
    md = sd * sp.pi * 0.5**2
    ma = sa * sp.pi * (0.7**2 - 0.5**2)
    Id = md * 0.5**2 / 2
    Ia = ma * (0.5**2 + 0.7**2) / 2
    c('e7', 'm disco', md, 2)
    c('e7', 'm anillo', ma, 2)
    c('e7', 'I disco', Id, 3)
    c('e7', 'I anillo', Ia, 3)
    c('e7', 'I total', Id + Ia, 2)
    # ---- E8 y E9 (simbólicos): verificación interna
    Ms, Ls, h, x, gm = sp.symbols('M L h x gamma', positive=True)
    ms_, ls_ = Ms / 2, Ls / 2
    assert sp.simplify(2 * ms_ * ls_**2 / 3 - Ms * Ls**2 / 12) == 0
    assert sp.simplify(2 * (ms_ * ls_**2 / 12 + ms_ * (Ls / 4)**2) - Ms * Ls**2 / 12) == 0
    Mtot = sp.integrate(gm * x, (x, 0, Ls))
    Ieq = sp.integrate(x**2 * gm * x, (x, 0, Ls)).subs(gm, 2 * Ms / Ls**2)
    Idr = sp.integrate((Ls - x)**2 * gm * x, (x, 0, Ls)).subs(gm, 2 * Ms / Ls**2)
    assert sp.simplify(Ieq - Ms * Ls**2 / 2) == 0 and sp.simplify(Idr - Ms * Ls**2 / 6) == 0
    # ---- E10: poleas
    m, Rr, y, tm, g = 4.20, 0.280, 3.00, 2.00, 9.80
    v = 2 * y / tm
    w = v / Rr
    I = 2 * (m * g * y - m * v**2 / 2) / w**2
    Mw = 2 * I / Rr**2
    c('e10', 'v', v, 2)
    c('e10', 'omega', w, 2)
    c('e10', 'mgh', m * g * y, 2)
    c('e10', 'K objeto', m * v**2 / 2, 2)
    c('e10', 'omega^2', w**2, 2)
    c('e10', 'I', I, 2)
    c('e10', 'M', Mw, 1)
    c('e10', 'atajo', 2 * m * (2 * g * y / v**2 - 1), 1)
    c('e10', 'a', 2 * y / tm**2, 2)
    # ---- E11: varilla con eje fuera del centro
    M_, L_, h_, al_, t_ = 2.0, 1.2, 0.30, 2.0, 1.5
    I = M_ * (L_**2 / 3 - L_ * h_ + h_**2)
    w = al_ * t_
    r = max(h_, L_ - h_)
    atan = r * al_; arad = w**2 * r
    c('e11', 'I', I, 2)
    c('e11', 'omega', w, 1)
    c('e11', 'W', I * w**2 / 2, 1)
    c('e11', 'r', r, 2)
    c('e11', 'a_tan', atan, 1)
    c('e11', 'a_rad', arad, 1)
    c('e11', 'a', (atan**2 + arad**2)**0.5, 1)
    # ---- teoría, ejemplos del libro y mini-tests (se buscan en toda la página)
    c('pagina', 'arco 60°/r', sp.pi / 3, 2)
    c('pagina', 'ej. 9.1: w media', sp.Rational(250 - 16, 3), 0)
    c('pagina', 'ej. 9.1: w(5)', 6 * 25, 0); c('pagina', 'ej. 9.2: alfa(5)', 12 * 5, 0)
    c('pagina', 'ej. 9.3: w', 27.5 - 10.0 * 0.300, 1)
    c('pagina', 'ej. 9.3: theta', 27.5 * 0.300 - 5.0 * 0.300**2, 2)
    c('pagina', 'ej. 9.3: rev', 7.80 / (2 * sp.pi), 2)
    c('pagina', 'ej. 9.3: 9.12', (24.5**2 - 27.5**2) / (2 * -10.0), 2)
    c('pagina', 'ej. 9.4: a', sp.sqrt(40**2 + 80**2), 1)
    c('pagina', 'ej. 9.4: ángulo', sp.deg(sp.atan(sp.Rational(1, 2))), 1)
    c('pagina', 'ej. 9.6: I1', 0.10 * 0.50**2 + 0.20 * 0.40**2, 3)
    c('pagina', 'ej. 9.6: I2', 0.30 * 0.40**2, 3)
    c('pagina', 'ej. 9.6: K', 0.5 * 0.057 * 4.0**2, 2)
    c('pagina', 'ej. 9.7: I', 0.5 * 50 * 0.060**2, 3)
    c('pagina', 'ej. 9.7: omega', sp.sqrt(2 * 18 / sp.Rational(9, 100)), 0)
    c('pagina', 'ej. 9.9: Icm', 0.132 - 3.6 * 0.15**2, 3)
    x, gm, L = sp.symbols('x gamma L', positive=True)
    Mv = sp.integrate(gm * x**2, (x, 0, L)); Iv = sp.integrate(x**4 * gm, (x, 0, L))
    assert sp.simplify(Iv / (Mv * L**2) - sp.Rational(3, 5)) == 0
    R_ = sp.symbols('R', positive=True)
    assert sp.simplify(sp.integrate((R_**2 - x**2)**2, (x, -R_, R_)) - sp.Rational(16, 15) * R_**5) == 0
    # mini-tests
    c('pagina', 'test 1: 45 rpm', 45 * 2 * sp.pi / 60, 2); c('pagina', 'test 1: 150°', sp.rad(150), 2)
    t_ = sp.symbols('t'); th = 5 * t_ - t_**3 / 2
    c('pagina', 'test 1: w(1)', sp.diff(th, t_).subs(t_, 1), 1); c('pagina', 'test 1: alfa(1)', sp.diff(th, t_, 2).subs(t_, 1), 1)
    c('pagina', 'test 1: parada', sp.Rational(4, 2), 1)
    c('pagina', 'test 2: alfa', sp.Rational(20, 5), 1); c('pagina', 'test 2: rev', 50 / (2 * sp.pi), 2)
    c('pagina', 'test 2: ventilador', -sp.Rational(30**2, 2 * 45), 0); c('pagina', 'test 2: t', sp.Rational(30, 10), 1)
    c('pagina', 'test 2: w final', 10 - 2 * 8, 0); c('pagina', 'test 2: theta', 10 * 8 - 8**2, 0)
    c('pagina', 'test 3: v', 4 * sp.Rational(1, 2), 1); c('pagina', 'test 3: arad', sp.Rational(1, 4) * 4, 1)
    wb = 300 * 2 * sp.pi / 60
    c('pagina', 'test 3: w bici', wb, 1); c('pagina', 'test 3: v bici', wb * 0.35, 1); c('pagina', 'test 3: a bici', wb**2 * 0.35, 0)
    c('pagina', 'test 3: a total', sp.sqrt(0.60**2 + 3.2**2), 2)
    c('pagina', 'test 4: I', 2 * 2.0 * 0.5**2, 1); c('pagina', 'test 4: K', 0.5 * 1.0 * 36, 0)
    c('pagina', 'test 4: K disco', 0.5 * (0.5 * 2 * 0.1**2) * 100**2, 0); c('pagina', 'test 4: K aro', 0.5 * (2 * 0.1**2) * 100**2, 0)
    c('pagina', 'test 4: v polea', sp.sqrt(2 * 9.8 * 1.0 / (1 + 4.0 / (2 * 2.0))), 2); c('pagina', 'test 4: caída libre', sp.sqrt(2 * 9.8), 2)
    c('pagina', 'test 5: varilla cm', 0.50 * 1.2**2 / 12, 3); c('pagina', 'test 5: varilla extremo', 0.50 * 1.2**2 / 12 + 0.50 * 0.60**2, 2)
    c('pagina', 'test 5: disco borde', 1.5 * 2.0 * 0.20**2, 2); c('pagina', 'test 5: esfera', 0.4 * 5.0 * 0.10**2 + 5.0 * 0.10**2, 3)
    # ---- D9: errores y respuestas modelo
    c('pagina', 'error 1: vueltas', 432 / (2 * sp.pi), 1)
    c('pagina', 'error 2: a_rad', 10**2 * 0.30, 0)
    c('pagina', 'error 3: ω', sp.sqrt(2 * 0.600 * sp.pi / 3), 2); c('pagina', 'error 3: ω del fallo', sp.sqrt(2 * 0.600 * 60), 2)
    c('pagina', 'modelo: K disco', 0.5 * 0.010 * 10**2, 2)
