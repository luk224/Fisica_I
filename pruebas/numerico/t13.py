"""Tema 13: resultados recalculados con sympy a partir de los datos del enunciado (se comparan en valor absoluto)."""
import sympy as sp

G = 6.67e-11
mT = 5.97e24
RT = 6.37e6
MS = 1.99e30
pi = sp.pi


def comprobaciones(c):
    """c(ejercicio, descripcion, valor, decimales) registra una comprobación."""
    # ---- teoría
    c('pagina', 'F entre 10 g y 0,5 kg a 5 cm (1e-10 N)', G * 0.010 * 0.5 / 0.05**2 / 1e-10, 2)
    c('pagina', 'v_esc Tierra (1e4)', sp.sqrt(2 * G * mT / RT) / 1e4, 2)
    c('pagina', 'T Halley (años)', 2 * pi * sp.sqrt((2.67e12)**3 / (G * MS)) / 3.156e7, 0)
    # ---- E1: tres masas en línea
    m = 2.00
    FC = G * m * m / 0.10**2
    c('e1', 'F_C (1e-8)', FC / 1e-8, 2)
    FB_a = G * m * m / 0.50**2
    c('e1', 'F_B a (1e-9)', FB_a / 1e-9, 2)
    c('e1', 'neta a (1e-8)', (FC + FB_a) / 1e-8, 1)
    FB_b = G * m * m / 0.40**2
    c('e1', 'F_B b (1e-9)', FB_b / 1e-9, 2)
    c('e1', 'neta b (1e-8)', abs(FB_b - FC) / 1e-8, 2)
    # ---- E2: altura con g/10
    r = sp.sqrt(10)
    c('e2', 'r/R', r, 2)
    c('e2', 'h/R', r - 1, 3)
    c('e2', 'h (1e7 m)', (r - 1) * RT / 1e7, 2)
    # ---- E3: Titania
    gT = 9.80
    c('e3', 'g/g_T', 64 / 1700, 4)
    c('e3', 'g Titania', 64 / 1700 * gT, 2)
    c('e3', 'rho/rho_T', 512 / 1700, 3)
    c('e3', 'rho Titania (1e3)', 512 / 1700 * 5500 / 1e3, 1)
    # ---- E4: escape Marte y Júpiter
    vM = sp.sqrt(2 * G * 6.42e23 / 3.39e6)
    vJ = sp.sqrt(2 * G * 1.90e27 / 6.99e7)
    c('e4', 'v Marte (1e3)', vM / 1e3, 2)
    c('e4', 'v Júpiter (1e4)', vJ / 1e4, 2)
    c('e4', 'v Tierra (1e4)', sp.sqrt(2 * G * mT / RT) / 1e4, 2)
    # ---- E5: g desde v_esc
    v, R = 7.65e3, 3.24e6
    c('e5', 'g', v**2 / (2 * R), 2)
    c('e5', 'M (1e24)', R * v**2 / (2 * G) / 1e24, 2)
    # ---- E6: martillo
    Gm = G * mT
    c('e6', 'v con h=R (km/s)', sp.sqrt(Gm / RT) / 1e3, 2)
    c('e6', 'sqrt(2gh) con h=R (km/s)', sp.sqrt(2 * Gm / RT) / 1e3, 1)
    c('e6', 'exceso 41%', (sp.sqrt(2) - 1) * 100, 0)
    h = 1e3
    vexa = sp.sqrt(2 * Gm * h / (RT * (RT + h)))
    vap = sp.sqrt(2 * Gm / RT**2 * h)
    assert abs(vexa / vap - 1) < 1e-3
    # ---- E7: satélite 890 km
    r = RT + 0.89e6
    v = sp.sqrt(Gm / r)
    T = 2 * pi * r / v
    c('e7', 'r (1e6)', r / 1e6, 2)
    c('e7', 'v (1e3)', v / 1e3, 2)
    c('e7', 'T (1e3 s)', T / 1e3, 2)
    c('e7', 'T (h)', T / 3600, 2)
    c('e7', 'v^2/r', v**2 / r, 2)
    r3 = RT + 0.3e6
    c('e7', 'v a 300 km', sp.sqrt(Gm / r3), -1)
    c('e7', 'T a 300 km (min)', 2 * pi * r3 / sp.sqrt(Gm / r3) / 60, 1)
    # ---- E8: geoestacionario
    T = 8.64e4
    r = (Gm * T**2 / (4 * pi**2))**sp.Rational(1, 3)
    c('e8', 'r (1e7)', r / 1e7, 2)
    c('e8', 'h (1e7)', (r - RT) / 1e7, 2)
    c('e8', 'h/R', (r - RT) / RT, 1)
    c('e8', 'v (km/s)', 2 * pi * r / T / 1e3, 2)
    c('e8', 'cos', RT / r, 3)
    c('e8', 'latitud', sp.deg(sp.acos(RT / r)), 1)
    rs = (Gm * 86164**2 / (4 * pi**2))**sp.Rational(1, 3)
    c('e8', 'r sidéreo (1e7)', rs / 1e7, 2)
    c('e8', 'h sidéreo (1e7)', (rs - RT) / 1e7, 2)
    # ---- E9: cohete
    m, r1, r2 = 5.00e3, 7.20e6, 8.80e6
    c('e9', 'G mT m (1e18)', G * mT * m / 1e18, 3)
    K1 = G * mT * m / (2 * r1)
    K2 = G * mT * m / (2 * r2)
    c('e9', 'K1 (1e11)', K1 / 1e11, 3)
    c('e9', 'K2 (1e11)', K2 / 1e11, 3)
    c('e9', 'v1 (km/s)', sp.sqrt(Gm / r1) / 1e3, 2)
    c('e9', 'v2 (km/s)', sp.sqrt(Gm / r2) / 1e3, 2)
    c('e9', 'dK (1e10)', abs(K2 - K1) / 1e10, 2)
    c('e9', 'dU (1e10)', 2 * abs(K2 - K1) / 1e10, 2)
    c('e9', 'W motores (1e10)', abs(K2 - K1) / 1e10, 2)
    # ---- E10: Plutón
    a, e = 5.91e12, 0.249
    T = 2 * pi * sp.sqrt(a**3 / (G * MS))
    c('e10', 'T (1e9 s)', T / 1e9, 2)
    c('e10', 'T (años)', T / 3.156e7, 0)
    c('e10', 'r mín (1e12)', a * (1 - e) / 1e12, 2)
    c('e10', 'r máx (1e12)', a * (1 + e) / 1e12, 2)
    c('e10', 'cociente', (1 + e) / (1 - e), 2)
    # ---- E11: Santa Claus
    w0 = 395.0
    g0 = G * mT / RT**2
    mm = w0 / g0
    c('e11', 'g0', g0, 2)
    c('e11', 'm', mm, 1)
    arad = 4 * pi**2 * RT / 86164**2  # día sidéreo
    c('e11', 'a_rad', arad, 4)
    c('e11', 'v', 2 * pi * RT / 86164, 0)
    c('e11', 'T', w0 - mm * arad, 0)
    c('e11', '% menos', arad / g0 * 100, 2)
    # ---- E12: agujero negro
    v, T = 3.00e7, 27 * 3600
    r = v * T / (2 * pi)
    M = 4 * pi**2 * r**3 / (G * T**2)
    c('e12', 'T (1e4)', T / 1e4, 2)
    c('e12', 'r (1e11)', r / 1e11, 2)
    c('e12', 'M (1e36)', M / 1e36, 2)
    c('e12', 'M/Msol (1e6)', M / MS / 1e6, 2)
    c('e12', 'M=v^2 r/G (1e36)', v**2 * r / G / 1e36, 2)
    Rs = 2 * G * M / (3.00e8)**2
    c('e12', 'R_S (1e9)', Rs / 1e9, 2)
    c('e12', 'R_S/r', Rs / r, 2)
    # ---- E13: planeta no uniforme
    r0, rs_ = 15.0e3, 2.0e3
    R = RT
    rr = sp.symbols('r', positive=True)
    b = (r0 - rs_) / R
    Mint = sp.integrate((r0 - b * rr) * 4 * pi * rr**2, (rr, 0, R))
    Mfor = pi * R**3 * (r0 / 3 + rs_)
    assert abs(float(Mint / Mfor) - 1) < 1e-9
    c('e13', 'M (1e24)', Mint / 1e24, 2)
    c('e13', 'g', G * Mint / R**2, 2)
    rho_m = Mint / (sp.Rational(4, 3) * pi * R**3)
    c('e13', 'rho media', rho_m, 0)
    gin = 4 * pi * G * (r0 * rr / 3 - b * rr**2 / 4)
    rmax = 2 * r0 / (3 * b)
    c('e13', 'g max', gin.subs(rr, rmax), 2)
    c('e13', 'g media aritm.', G * (4 / 3 * pi * R**3 * 8500) / R**2, 1)
    # ---- X1: Titán y Marte
    G1 = 6.672e-11
    RTi, MTi, TTi = 2.57e6, 1.35e23, 15 * 86400 + 22 * 3600 + 41 * 60
    RMa, MMa, TMa = 3.39e6, 6.42e23, 24.6 * 3600
    c('x1', 'T Titán', TTi, 0)
    c('x1', 'T Marte', TMa, 0)
    g0T = G1 * MTi / RTi**2
    wT = 2 * pi / TTi
    c('x1', 'g polo Titán', g0T, 3)
    c('x1', 'omega Titán (1e-6)', wT / 1e-6, 3)
    c('x1', 'v Titán', wT * RTi, 1)
    c('x1', 'w2R Titán (1e-5)', wT**2 * RTi / 1e-5, 2)
    c('x1', 'g ec Titán', g0T - wT**2 * RTi, 4)
    g0M = G1 * MMa / RMa**2
    wM = 2 * pi / TMa
    c('x1', 'g polo Marte', g0M, 3)
    c('x1', 'omega Marte (1e-5)', wM / 1e-5, 3)
    c('x1', 'v Marte', wM * RMa, 1)
    c('x1', 'w2R Marte', wM**2 * RMa, 4)
    c('x1', 'g ec Marte', g0M - wM**2 * RMa, 3)
    c('x1', 'dif Marte %', wM**2 * RMa / g0M * 100, 2)
    c('x1', 'razón T', TTi / TMa, 1)
    c('x1', 'razón omega2', (TTi / TMa)**2, 0)
    c('x1', 'razón R', RTi / RMa, 2)
    c('x1', 'razón dg', wM**2 * RMa / (wT**2 * RTi), 0)
    c('x1', 'dg/g Titán (1e-5)', wT**2 * RTi / g0T / 1e-5, 1)
    c('x1', 'dg/g Marte (1e-3)', wM**2 * RMa / g0M / 1e-3, 1)
    # ---- X2: Sol a mediodía/medianoche
    dTS = 1.50e11
    c('x2', 'cociente F', ((dTS + RT) / (dTS - RT))**2, 5)
    c('x2', 'aceleración Sol (1e-3)', G * MS / dTS**2 / 1e-3, 1)
    c('x2', 'g con densidad', 4 / 3 * pi * G * 5500 * RT, 2)
    # ---- X3: Halley
    # (la ecuación de energía del afelio/perihelio no depende de datos del enunciado;
    #  el valor 3,28e23 J se recalcula con los datos de Halley de la teoría)
    a, e, mH = 2.67e12, 0.967, 1.0
    rp, ra = a * (1 - e), a * (1 + e)
    # ---- X4: ISS y proyectil
    r = 6770e3
    c('x4', 'g ISS', 9.81 * (6370 / 6770)**2, 1)
    c('x4', '% g', (6370 / 6770)**2 * 100, 0)
    c('x4', 'g a la Luna (1e-3)', G * mT / 3.84e8**2 / 1e-3, 1)
    c('x4', 'v escape (km/s)', sp.sqrt(2 * Gm / RT) / 1e3, 1)
    c('x4', 'v circular rasante', sp.sqrt(Gm / RT), -1)
    # ---- X5: mgh vs -GMm/r
    c('x5', 'error 10 km %', 10e3 / (RT + 10e3) * 100, 2)
    c('x5', 'error h=R %', 50.0, 0)
    # ---- X6: Tierra-Luna y Kepler
    ML, RL, d = 7.35e22, 1.74e6, 3.84e8
    c('x6', 'v esc Luna (km/s)', sp.sqrt(2 * G * ML / RL) / 1e3, 1)
    x = sp.symbols('x', positive=True)
    # equilibrio de atracciones: mT/x^2 = ML/(d-x)^2
    xe = d / (1 + sp.sqrt(ML / mT))
    c('x6', 'punto equilibrio (1e8)', xe / 1e8, 2)
    c('x6', 'distancia a Luna (1e3 km)', (d - xe) / 1e6, 0)
    UT = -G * mT / xe - G * ML / (d - xe)
    c('x6', 'E/kg desde Tierra (MJ)', abs(UT - (-G * mT / RT - G * ML / (d - RT))) / 1e6, 0)
    c('x6', 'E/kg desde Luna (MJ)', abs(UT - (-G * ML / RL - G * mT / (d - RL))) / 1e6, 1)
    c('x6', 'v_p/v_a', (1 + 0.017) / (1 - 0.017), 3)
