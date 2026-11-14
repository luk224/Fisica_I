"""Tema 10: resultados recalculados con sympy a partir de los datos del enunciado."""
import sympy as sp

sin = lambda g: sp.sin(sp.rad(g))
cos = lambda g: sp.cos(sp.rad(g))
tan = lambda g: sp.tan(sp.rad(g))
pi = sp.pi


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales[, mant_exp]) registra una comprobación."""
    # ---- E1: torcas de una fuerza de 10 N en varilla de 4 m
    F, r = 10, 4
    c('e1', 'a) 90°', F * r * sin(90), 1)
    c('e1', 'b) brazo 120°', r * sin(120), 2)
    c('e1', 'b) torca 120°', F * r * sin(120), 1)
    c('e1', 'c) 30°', F * r * sin(30), 1)
    c('e1', 'd) 60° a 2 m', F * 2 * sin(60), 1)
    c('e1', 'd) brazo', 2 * sin(60), 2)
    # ---- E2: aro rodando
    M, R, w = 2.20, 0.600, 2.60
    v = R * w
    c('e2', 'v_cm', v, 2)
    c('e2', 'K', M * v**2, 2)
    c('e2', 'v arriba', 2 * v, 2)
    c('e2', 'v lado', sp.sqrt(2) * v, 2)
    # ---- E3: rueda con cuerda
    M, R, P, g = 9.20, 0.250, 40.0, 9.8
    I = M * R**2 / 2
    al = P * R / I
    c('e3', 'I', I, 4)
    c('e3', 'alfa', al, 1)
    c('e3', 'a cuerda', R * al, 2)
    c('e3', 'Mg', M * g, 1)
    c('e3', '|F eje|', sp.sqrt(P**2 + (M * g)**2), 1)
    c('e3', 'ángulo', sp.deg(sp.atan((M * g) / P)), 1)
    c('e3', 'F eje vertical', M * g - P, 1)
    # ---- E4: cilindro hueco con cuerda
    M, R1, R2, v, g = 4.75, 0.200, 0.350, 6.66, 9.8
    k = 1 + sp.Rational(1, 2) * (1 + (R1 / R2)**2)
    d = k * v**2 / (2 * g)
    c('e4', 'ratio R1/R2 al cuadrado', (R1 / R2)**2, 4)
    c('e4', 'corchete', k, 3)
    c('e4', 'd', d, 2)
    c('e4', 'v sin cuerda', sp.sqrt(2 * g * d), 2)
    c('e4', 'macizo', sp.Rational(3, 2) * v**2 / (2 * g), 2)
    c('e4', 'delgado', v**2 / g, 2)
    # ---- E5: bola de bolos
    c('e5', 'mu min 30°', sp.Rational(2, 7) * tan(30), 3)
    c('e5', 'a_cm 30°', sp.Rational(5, 7) * 9.8 * sin(30), 2)
    # ---- E6: piedra de afilar
    M, R, N, mu, tf, Rm = 50.0, 0.260, 160, 0.60, 6.50, 0.500
    w = 4 * pi
    I = M * R**2 / 2
    al = w / 9
    f = mu * N
    c('e6', 'omega', w, 2)
    c('e6', 'I', I, 2)
    c('e6', 'alfa', al, 3)
    c('e6', 'tau neta', I * al, 2)
    c('e6', 'torca hacha', f * R, 2)
    c('e6', 'a) F', (I * al + tf + f * R) / Rm, 1)
    c('e6', 'b) F', (tf + f * R) / Rm, 1)
    c('e6', 'c) alfa', tf / I, 2)
    c('e6', 'c) t', w / (tf / I), 2)
    # ---- E7: yoyó con datos de X2
    g = 9.8
    c('e7', 'a yoyó', g / (1 + sp.Rational(40, 25)**2 / 2), 2)
    c('e7', 'denominador', 1 + sp.Rational(40, 25)**2 / 2, 2)
    # ---- E8: bloque con cuerda
    m, r1, v1, Tm = 0.130, 0.800, 4.00, 30.0
    L = m * v1 * r1
    r2 = (L**2 / (m * Tm))**sp.Rational(1, 3)
    c('e8', 'L', L, 3)
    c('e8', 'r rotura', r2, 3)
    c('e8', 'v final', L / (m * r2), 2)
    c('e8', 'T final', m * (L / (m * r2))**2 / r2, 1)
    c('e8', 'T inicial', m * v1**2 / r1, 1)
    c('e8', 'K inicial', m * v1**2 / 2, 2)
    c('e8', 'K final', m * (L / (m * r2))**2 / 2, 2)
    # ---- E9: corredor y tornamesa
    m, Rr, v, I, w1 = 55, 3.0, 2.8, 80, 0.20
    Lh, Lt = m * Rr * v, -I * w1
    It = I + m * Rr**2
    c('e9', 'L corredor', Lh, 0)
    c('e9', 'L tornamesa', Lt, 0)
    c('e9', 'L total', Lh + Lt, 0)
    c('e9', 'I total', It, 0)
    c('e9', 'omega final', (Lh + Lt) / It, 3)
    c('e9', 'sin signo', (Lh - Lt) / It, 2)
    c('e9', 'K inicial', m * v**2 / 2 + I * w1**2 / 2, 0)
    c('e9', 'K final', (Lh + Lt)**2 / (2 * It), 0)
    c('e9', 'pérdida', m * v**2 / 2 + I * w1**2 / 2 - (Lh + Lt)**2 / (2 * It), 0)
    # ---- X1: cilindro en rampa de 50°
    g, th = 9.81, 50
    c('x1', 'mu min', tan(th) / 3, 3)
    c('x1', 'a_cm', sp.Rational(2, 3) * g * sin(th), 2)
    c('x1', 'alfa', sp.Rational(2, 3) * g * sin(th) / 0.5, 1)
    c('x1', 'f', sp.Rational(1, 3) * g * sin(th), 2)
    c('x1', 'n', g * cos(th), 2)
    c('x1', 'mu hueco', tan(th) / 2, 3)
    c('x1', 'f hueco', 0.5 * g * sin(th), 2)
    # ---- X2: yoyó
    M, Rd, b, Lc, g = 0.100, 0.040, 0.025, 1.0, 9.8
    I = 2 * sp.Rational(1, 2) * (M / 2) * Rd**2
    a = g / (1 + I / (M * b**2))
    c('x2', 'I', I * 1e5, 1)
    c('x2', 'I/Mb2', I / (M * b**2), 2)
    c('x2', 'a_cm', a, 2)
    c('x2', 'alfa', a / b, 0)
    c('x2', 'T', M * (g - a), 3)
    c('x2', 'v', sp.sqrt(2 * a * Lc), 2)
    c('x2', 't', sp.sqrt(2 * Lc / a), 2)
    c('x2', 'omega f', sp.sqrt(2 * a * Lc) / b, 0)
    # ---- X3: cilindro que sube
    m, th, mu, Lr, g = 490, 35, 0.12, 6.5, 9.81
    Fmax = m * g * (sin(th) + 3 * mu * cos(th))
    c('x3', 'F max', Fmax, -1) if False else c('x3', 'F max (mant)', Fmax / 1000, 2)
    c('x3', 'F min', m * g * sin(th), 0)
    c('x3', 'f max', mu * m * g * cos(th), 0)
    amax = 2 * mu * g * cos(th)
    c('x3', 'a max', amax, 2)
    c('x3', 't', sp.sqrt(2 * Lr / amax), 2)
    c('x3', 'v', amax * sp.sqrt(2 * Lr / amax), 2)
    c('x3', 'omega', amax * sp.sqrt(2 * Lr / amax) / 0.25, 1)
    c('x3', 'sin35', sin(th), 4)
    c('x3', 'cos35', cos(th), 4)
    # ---- X4: cilindro con fuerza t^2/2
    m, mu, g = 30, 0.3, 9.8
    Fc = 3 * mu * m * g
    c('x4', 'F', Fc, 1)
    c('x4', 't', sp.sqrt(2 * Fc), 1)
    c('x4', 'a_cm', 2 * Fc / (3 * m), 2)
    c('x4', 'alfa', 2 * Fc / (3 * m) / 0.6, 2)
    c('x4', 'a 4 s', 2 * 8 / (3 * m), 3)
    c('x4', 'alfa 4 s', 2 * 8 / (3 * m) / 0.6, 3)
    c('x4', 'f 4 s', 8 / 3, 2)
    c('x4', 'mu m g', mu * m * g, 1)
    # ---- X5: acróbata y barra
    m, v, r, mb = 60, 10, 3, 10
    I = mb * r**2 / 3
    w = m * v * r / I
    c('x5', 'I', I, 0)
    c('x5', 'omega', w, 0)
    c('x5', 'rev/s', w / (2 * pi), 1)
    c('x5', 'K', m * v**2 / 2 + I * w**2 / 2, 0)
    c('x5', 'v extremo', w * r, 0)
    c('x5', 'p barra', mb * w * r / 2, 0)
    c('x5', 'p acróbata', m * v, 0)
    c('x5', 'impulso eje', mb * w * r / 2 - m * v, 0)
    # ---- X6: bala en varilla
    m, v, M, L, a = 0.010, 300, 2, 1, 0.75
    LA = m * v * a
    IA = M * L**2 / 3 + m * a**2
    w = LA / IA
    c('x6', 'L_A', LA, 2)
    c('x6', 'I_A', IA, 4)
    c('x6', 'omega', w, 2)
    c('x6', 'p antes', m * v, 2)
    c('x6', 'p después', (M * L / 2 + m * a) * w, 2)
    c('x6', 'Q', m * v**2 / 2 - LA**2 / (2 * IA), 0)
    c('x6', 'K inicial', m * v**2 / 2, 0)
