"""Tema 15: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp

pi = sp.pi
g = 9.80


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- c1
    c('c1', 'sqrt4', sp.sqrt(4), 0)
    # ---- E15.1
    v, f = 344, 784
    c('e151', 'lambda', v / f, 3)
    c('e151', 'T (ms)', 1000 / f, 2)
    c('e151', "lambda'", v / (2 * f), 3)
    c('e151', "f'", 2 * f, 0)
    # ---- E15.15
    m, mu, f = 1.50, 0.0480, 120
    F = m * g
    v = sp.sqrt(F / mu)
    c('e1515', 'F', F, 1)
    c('e1515', 'v', v, 1)
    c('e1515', 'lambda', v / f, 3)
    c('e1515', 'F doble', 2 * F, 1)
    c('e1515', 'v2', v * sp.sqrt(2), 1)
    c('e1515', 'lambda2', v * sp.sqrt(2) / f, 3)
    # ---- E15.16
    mu = 0.120 / 2.50
    v = 0.750 * 40.0
    c('e1516', 'mu', mu, 4)
    c('e1516', 'v', v, 1)
    c('e1516', 'F', mu * v**2, 1)
    # ---- E15.18
    A, k, w, L, Wc = 8.50, 172, 4830, 1.50, 0.0125
    v = sp.Rational(w) / k
    c('e1518', 'v', v, 1)
    c('e1518', 't', L / v, 4)
    c('e1518', 't ms', 1000 * L / v, 1)
    mc = Wc / g
    mu = mc / L
    c('e1518', 'm cuerda', mc * 1e3, 2)
    c('e1518', 'mu', mu * 1e4, 2)
    c('e1518', 'W (mu redondeada 8,50e-4)', 8.50e-4 * v**2, 3)
    c('e1518', 'W', mu * v**2, 2)
    lam = 2 * pi / k
    c('e1518', 'lambda', lam, 4)
    c('e1518', 'N', L / lam, 1)
    # ---- E15.20
    mu = (29.4 / g) / 6.00
    c('e1520', 'mu', mu, 3)
    Fa = 0.500 * g
    c('e1520', 'F abajo', Fa, 2)
    c('e1520', 'va', sp.sqrt(Fa / mu), 2)
    Fb = Fa + 14.7
    c('e1520', 'Fb', Fb, 1)
    c('e1520', 'vb', sp.sqrt(Fb / mu), 2)
    Fc = Fa + 29.4
    c('e1520', 'Fc', Fc, 1)
    c('e1520', 'vc', sp.sqrt(Fc / mu), 2)
    c('e1520', 'promedio v', (sp.sqrt(Fa / mu) + sp.sqrt(Fc / mu)) / 2, 2)
    # ---- E15.22
    mu = 3.00e-3 / 0.800
    w = 2 * pi * 120.0
    P = sp.Rational(1, 2) * sp.sqrt(mu * 25.0) * w**2 * (1.6e-3)**2
    c('e1522', 'mu*1e3', mu * 1e3, 2)
    c('e1522', 'omega', w, 0)
    c('e1522', 'P', P, 2)
    c('e1522', 'P', P, 3)
    c('e1522', 'P/4', P / 4, 3)
    # ---- E15.25
    r2 = 30.0 * sp.sqrt(10.0 / 1e-6)
    c('e1525', 'raiz', sp.sqrt(10.0 / 1e-6), 0)
    c('e1525', 'r2 (1e4 m)', r2 / 1e4, 1)
    c('e1525', 'I3 (uW)', 1.0 / 4, 2)
    c('e1525', 'P', 4 * pi * 30.0**2 * 10.0 / 1e5, 1)
    # ---- E15.28
    A, k, w = 2.30, 6.98, 742
    f = w / (2 * pi)
    lam = 2 * pi / k
    v = sp.Rational(w) / k
    mu = 0.00338 / 1.35
    F = mu * v**2
    P = sp.Rational(1, 2) * sp.sqrt(mu * F) * w**2 * (A * 1e-3)**2
    c('e1528', 'f', f, 0)
    c('e1528', 'lambda', lam, 3)
    c('e1528', 'v', v, 0)
    c('e1528', 'mu*1e3', mu * 1e3, 2)
    c('e1528', 'v', v, 1)
    c('e1528', 'F', F, 1)
    c('e1528', 'mu*1e3', mu * 1e3, 3)
    c('e1528', 'P', P, 3)
    c('e1528', 'P', P, 2)
    # ---- E15.32 (geometria de pulsos)
    for t in (0.25, 0.5, 0.75, 1.0):
        pass
    c('e1532', 'avance t=0.25', 2.00 * 0.250, 2)
    c('e1532', 'altura total', 1.00 + 1.00, 2)
    c('e1532', 'punto medio', 0.5, 1)
    # ---- E15.36
    lam = 2 * 15.0
    T = 0.0750
    w = 2 * pi / T
    c('e1536', 'lambda cm', lam, 1)
    c('e1536', 'A', 0.850 / 2, 3)
    c('e1536', 'v', lam / 100 / T, 2)
    c('e1536', 'omega', w, 1)
    c('e1536', 'vmax', 0.00850 * w, 3)
    c('e1536', 'N-A', lam / 4, 2)
    # ---- E15.40
    mu = 3.00e-3 / 0.400
    v = sp.sqrt(800 / mu)
    f1 = v / 0.800
    c('e1540', 'mu*1e3', mu * 1e3, 2)
    c('e1540', 'v', v, 0)
    c('e1540', 'v', v, 1)
    c('e1540', 'f1', f1, 0)
    c('e1540', 'n max', 10000 / f1, 1)
    c('e1540', 'floor', sp.floor(10000 / f1), 0)
    c('e1540', 'f24 kHz', 24 * f1 / 1000, 2)
    c('e1540', 'f25 kHz', 25 * f1 / 1000, 1)
    # ---- E15.44
    f = 344 / 0.765
    lam3 = 2 * 0.750 / 3
    vc = f * lam3
    mu = 8.75e-3 / 0.750
    c('e1544', 'f', f, 1)
    c('e1544', 'lambda3', lam3, 3)
    c('e1544', 'v', vc, 1)
    c('e1544', 'mu*1e2', mu * 1e2, 3)
    c('e1544', 'F', mu * vc**2, 0)
    c('e1544', 'f1', f / 3, 0)
    # ---- E15.45
    v = 440 * 2 * 0.600
    c('e1545', 'v', v, 0)
    c('e1545', 'lambda', v / 587, 2)
    c('e1545', "L'", v / 587 / 2, 3)
    c('e1545', "L''", v / (2 * 392), 3)
    c('e1545', 'atajo', 0.600 * 440 / 587, 3)
    # ---- E15.47
    v = 2 * 0.635 * 245
    c('e1547', 'v', v, 0)
    c('e1547', "f'", 245 * sp.sqrt(1.010), 1)
    c('e1547', "f' 0", 245 * sp.sqrt(1.010), 0)
    c('e1547', 'lambda aire', 344 / 245, 2)
    c('e1547', '2L', 2 * 0.635, 2)
    c('e1547', 'lineal', 245 * 1.01, 0)
    # ---- E15.48
    k = 0.400 * pi * 100
    w = 250 * pi
    lam = 2 * pi / (0.400 * pi)
    f = w / (2 * pi)
    v = lam * f / 100
    mu = 0.0500
    F = mu * v**2
    P = sp.Rational(1, 2) * sp.sqrt(mu * F) * w**2 * (7.50e-3)**2
    c('e1548', 'k/pi', k / pi, 1)
    c('e1548', 'omega', w, 0)
    c('e1548', 'omega', w, 1)
    c('e1548', 'lambda', lam, 2)
    c('e1548', 'f', f, 0)
    c('e1548', 'T ms', 1000 / f, 2)
    c('e1548', 'v', v, 2)
    c('e1548', 'desplaz', v * 100 * 0.0005, 4)
    c('e1548', 'cresta 1', 5 - v * 100 * 0.0005, 2)
    c('e1548', 'cresta 2', 5 - v * 100 * 0.0010, 2)
    c('e1548', 'y 0.0005', 0.750 * sp.cos(pi * 250 * 0.0005), 3)
    c('e1548', 'y 0.0010', 0.750 * sp.cos(pi * 250 * 0.0010), 3)
    c('e1548', 'F', F, 2)
    c('e1548', 'F', F, 3)
    c('e1548', 'P', P, 2)
    # ---- E15.58
    f1 = 780 - 624
    c('e1558', 'f1', f1, 0)
    c('e1558', 'n', sp.Rational(624, f1), 0)
    c('e1558', 'cociente', 780 / 624, 2)
    c('e1558', 'lambda1', 2 * 0.800, 2)
    v = f1 * 1.60
    c('e1558', 'v', v, 1)
    c('e1558', 'F', 7.50e-3 * v**2, 0)
    # ---- E15.66
    mu = 0.00300 / 2.20
    v = sp.sqrt(330 / mu)
    f1 = v / (2 * 2.20)
    w = 2 * pi * f1
    c('e1566', 'mu*1e3', mu * 1e3, 3)
    c('e1566', 'v', v, 0)
    c('e1566', 'f1', f1, 1)
    c('e1566', 'omega', w, 0)
    c('e1566', 'omega', w, 1)
    c('e1566', 'A cm', 9.00 / w * 100, 2)
    c('e1566', 'a max', w * 9.00 / 1e3, 2)
    c('e1566', 'a/g', w * 9.00 / g, 0)
    # ---- E15.7
    lam, v, A = 0.320, 8.00, 0.0700
    f = v / lam
    T = 1 / f
    k = 2 * pi / lam
    w = 2 * pi * f
    c('e157', 'f', f, 1)
    c('e157', 'T', T, 4)
    c('e157', 'k', k, 1)
    c('e157', 'omega', w, 0)
    fase = 0.360 / lam + 0.150 / T
    c('e157', 'fase', fase, 3)
    y = A * sp.cos(2 * pi * fase)
    c('e157', 'cos 315', sp.cos(2 * pi * 0.875), 3)
    c('e157', 'y', y, 4)
    c('e157', 'y cm', y * 100, 2)
    c('e157', 'vy', -A * w * sp.sin(2 * pi * fase), 2)
    c('e157', 't n=5', T * (5 - 0.360 / lam), 3)
    c('e157', 'dt', T * (5 - 0.360 / lam) - 0.150, 3)
    # ---- E15.19 (simbolico)
    m_, L_, w_, r_ = sp.symbols('m L omega r', positive=True)
    F_ = m_ * (L_ - r_) / L_ * w_**2 * (L_ + r_) / 2
    assert sp.simplify(F_ - m_ * w_**2 / (2 * L_) * (L_**2 - r_**2)) == 0
    v_ = sp.sqrt(F_ / (m_ / L_))
    assert sp.simplify(v_ - w_ * sp.sqrt((L_**2 - r_**2) / 2)) == 0
    import mpmath
    tn = mpmath.quad(lambda r: 1 / (2.3 * mpmath.sqrt((1.7**2 - r**2) / 2)), [0, 1.7])
    assert abs(tn - float(pi / (sp.sqrt(2) * 2.3))) < 1e-6
    wv = 2 * 2 * pi
    c('e19p', 'omega', wv, 1)
    c('e19p', 't', pi / (sp.sqrt(2) * wv), 3)
