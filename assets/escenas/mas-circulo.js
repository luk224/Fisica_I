/* MAS: círculo de referencia, gráfica x(t) y energías (tema 14; U §14.2-14.3, ec. 14.10-14.21, figs. 14.5 y 14.14). params: {"dim":2,"marcas":false}.
   Datos: m (kg), k (N/m), x₀ (cm) y v₀ₓ (m/s) en t = 0.  Fórmulas del tema (las mismas que en el texto):
     ω = √(k/m);  T = 2π/ω;  A = √(x₀² + (v₀ₓ/ω)²) (14.19);  φ con x₀ = A cos φ y v₀ₓ = −ωA sen φ ⇒ φ = atan2(−v₀ₓ/ω, x₀);
     x = A cos(ωt+φ);  v = −ωA sen(ωt+φ);  a = −ω²x;  E = ½kA²;  U = ½kx²;  K = ½mv².
   Valores de control: U Ej. 14.3 (m=0,50; k=200; x₀=1,5 cm; v₀=0,40) ⇒ A=0,0250 m, φ=−0,927 rad, T=0,314 s;
                       E 14.14 (m=2,00; k=300; x₀=20 cm; v₀=−4,00) ⇒ A=0,383 m, φ=1,021 rad, T=0,513 s.
   Dibujo: el eje del desplazamiento x es VERTICAL (figura girada 90° respecto a la 14.5 de U) para que el bloque, el fasor y la curva x(t)
   queden a la misma altura. Fasor: Q = A·(sen θ, cos θ) con θ = ωt+φ; la altura de Q es x. */
Interactivos.registrar('mas-circulo', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var m = 0.5, k = 200, x0 = 1.5, v0 = 0.4, s = 0;      /* x0 en cm; s = tiempo en periodos (0 a 2) */
  var om, Tp, A, phi, Av, a, listo = false;
  var w = 0.016, GX = 1.25, GW = 1.4, BY = -1.0, BH = 2.0, BX = [-3.8, -3.4, -3.0], BW = 0.3, XB = -2.05, YW = 1.35;
  var fm = function (v, d) { var f = Math.pow(10, d); return (Math.round(v * f) / f).toFixed(d).replace('-', '−').replace('.', ','); };
  par();
  var sg = function (v, n) { if (Math.abs(v) < 1e-12) return '0'; var d = Math.max(0, Math.min(6, n - 1 - Math.floor(Math.log(Math.abs(v)) / Math.LN10 + 1e-9))); return fm(v, d); };
  var ejes, circ, fasor, conec, curva, guias, muelle, bloque, qp, cp, eq, pared, tcks, barE, barK, barU, ctn = [];
  var lw = c.lectura('Frecuencia angular, frecuencia y periodo'), lA = c.lectura('Amplitud y ángulo de fase (de x₀ y v₀ₓ)'),
      lt = c.lectura('En este instante'), le = c.lectura('Energía');
  var eMas, eMenos, eT, e2T, et, ex, eE, eK, eU, eEq;

  function rect(col, op) {
    var r = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ color: col, transparent: op < 1, opacity: op }));
    r.poner = function (xa, ya, xb, yb) { var q = function (v) { return Math.round(v * 1e6) / 1e6; }; xa = q(xa); ya = q(ya); xb = q(xb); yb = q(yb); r.position.set((xa + xb) / 2, (ya + yb) / 2, 0); r.scale.set(Math.max(1e-6, xb - xa), Math.max(1e-6, yb - ya), 1); };
    return r;
  }
  function par() {
    om = Math.sqrt(k / m); Tp = 2 * Math.PI / om;
    var xm = x0 / 100, q = v0 / om;
    A = Math.sqrt(xm * xm + q * q); phi = A > 1e-12 ? Math.atan2(-q, xm) : 0;
    Av = H.techo(Math.max(A, 1e-3) * 1.05); a = A / Av;
  }
  function nuevo() {
    ejes = H.cinta(T, [[[GX, 0], [GX + 2 * GW + 0.15, 0]], [[GX, -1.2], [GX, 1.2]], [[-0.05, 0], [0.05, 0]], [[0, -0.05], [0, 0.05]]], P.fg, w); ejes.position.z = 0.05; c.scene.add(ejes);
    tcks = H.cinta(T, [[[GX + GW, -0.04], [GX + GW, 0.04]], [[GX + 2 * GW, -0.04], [GX + 2 * GW, 0.04]]], P.fg, w); tcks.position.z = 0.05; c.scene.add(tcks);
    eq = H.cinta(T, [[[XB - 0.3, 0], [XB + 0.3, 0]]], P.mut, w * 0.8, [w * 4, w * 3]); eq.position.z = 0.05; c.scene.add(eq);
    pared = H.cinta(T, [[[XB - 0.3, YW], [XB + 0.3, YW]]], P.fg, w * 1.6); pared.position.z = 0.05; c.scene.add(pared);
    circ = H.cinta(T, [], P.mut, w * 1.1, [w * 5, w * 3]); circ.position.z = 0.1; c.scene.add(circ);
    guias = H.cinta(T, [], P.mut, w * 0.8, [w * 4, w * 3]); guias.position.z = 0.08; c.scene.add(guias);
    conec = H.cinta(T, [], P.mut, w * 0.9, [w * 3, w * 3]); conec.position.z = 0.12; c.scene.add(conec);
    curva = H.cinta(T, [], P.acc, w * 1.6); curva.position.z = 0.2; c.scene.add(curva);
    muelle = H.cinta(T, [], P.fg, w * 1.0); muelle.position.z = 0.15; c.scene.add(muelle);
    fasor = H.flecha2D(T, P.S, w * 1.8); fasor.position.z = 0.3; c.scene.add(fasor);
    bloque = rect(P.acc, 1); bloque.position.z = 0.2; c.scene.add(bloque);
    barE = rect(P.mut, 0.55); barK = rect(P.L, 1); barU = rect(P.A, 1); [barE, barK, barU].forEach(function (b) { b.position.z = 0.1; c.scene.add(b); });
    qp = H.punto(T, 0, 0, w * 3.2, P.W); qp.position.z = 0.6; c.scene.add(qp);
    cp = H.punto(T, 0, 0, w * 3.2, P.W); cp.position.z = 0.6; c.scene.add(cp);
    ctn = [ejes, tcks, eq, pared, circ, guias, conec, curva, muelle];
    eMas = c.etiqueta('+A', GX - 0.06, 0, 'r'); eMenos = c.etiqueta('−A', GX - 0.06, 0, 'r');
    eT = c.etiqueta('T', GX + GW, -0.13, 'c'); e2T = c.etiqueta('2T', GX + 2 * GW, -0.13, 'c'); et = c.etiqueta('t', GX + 2 * GW + 0.2, 0.12, 'c'); ex = c.etiqueta('x', GX + 0.1, 1.2, 'l');
    eE = c.etiqueta('E', BX[0], BY - 0.12, 'c'); eK = c.etiqueta('K', BX[1], BY - 0.12, 'c'); eU = c.etiqueta('U', BX[2], BY - 0.12, 'c'); eEq = c.etiqueta('x = 0', XB - 0.35, 0.0, 'r');
  }
  function calc() {
    if (!listo) return; par();
    var th = 2 * Math.PI * s + phi, xx = A * Math.cos(th), vv = -om * A * Math.sin(th), aa = -om * om * xx, y = a * Math.cos(th), qx = a * Math.sin(th);
    var gc = GX + GW * s, i, pts = [], cp2 = [], E = 0.5 * k * A * A, U = 0.5 * k * xx * xx, K = 0.5 * m * vv * vv;
    for (i = 0; i <= 90; i++) pts.push([a * Math.cos(2 * Math.PI * i / 90), a * Math.sin(2 * Math.PI * i / 90)]);
    circ.set([pts]);
    for (i = 0; i <= 260; i++) { var ss = 2 * i / 260; cp2.push([GX + GW * ss, a * Math.cos(2 * Math.PI * ss + phi)]); }
    curva.set([cp2]);
    guias.set([[[GX - 0.05, a], [GX + 2 * GW, a]], [[GX - 0.05, -a], [GX + 2 * GW, -a]]]);
    fasor.poner([0, 0], [qx, y]); qp.mover(qx, y); cp.mover(gc, y);
    conec.set([[[XB + 0.14, y], [gc, y]]]);
    /* resorte (zigzag vertical) del techo al bloque */
    var top = YW, bot = y + 0.14, n = 10, zz = [[XB, top]];
    for (i = 0; i < n; i++) zz.push([XB + (i % 2 ? -0.1 : 0.1), top + (bot - top) * (i + 0.5) / n]);
    zz.push([XB, bot]); muelle.set([zz]);
    bloque.poner(XB - 0.14, y - 0.14, XB + 0.14, y + 0.14);
    var f = E > 0 ? 1 / E : 0;
    barE.poner(BX[0] - BW / 2, BY, BX[0] + BW / 2, BY + BH); barK.poner(BX[1] - BW / 2, BY, BX[1] + BW / 2, BY + BH * K * f); barU.poner(BX[2] - BW / 2, BY, BX[2] + BW / 2, BY + BH * U * f);
    eMas.mover(GX - 0.06, a); eMenos.mover(GX - 0.06, -a); eMas.poner(a > 0 ? '+A' : ''); eMenos.poner(a > 0 ? '−A' : '');
    lw('ω = ' + fm(om, 2) + ' rad/s   ·   f = ' + fm(om / (2 * Math.PI), 2) + ' Hz   ·   T = ' + fm(Tp, 3) + ' s   (no dependen de x₀ ni de v₀ₓ)');
    lA('A = ' + sg(A, 3) + ' m   ·   φ = ' + fm(phi, 3) + ' rad (' + fm(phi * 180 / Math.PI, 1) + '°)');
    lt('t = ' + fm(s * Tp, 3) + ' s:   x = ' + sg(xx, 3) + ' m   ·   v = ' + sg(vv, 3) + ' m/s   ·   a = ' + sg(aa, 3) + ' m/s²');
    le('E = ½kA² = ' + sg(E, 3) + ' J   ·   K = ' + sg(K, 3) + ' J   ·   U = ' + sg(U, 3) + ' J   (K = U cuando |x| = A/√2 = ' + fm(A / Math.SQRT2 * 100, 2) + ' cm, 4 veces por periodo)');
  }
  c.slider('Masa m (kg)', 0.1, 5, 0.1, m, function (v) { m = v; calc(); }, function (v) { return fm(v, 1) + ' kg'; });
  c.slider('Constante del resorte k (N/m)', 10, 500, 10, k, function (v) { k = v; calc(); }, function (v) { return fm(v, 0) + ' N/m'; });
  c.slider('Posición inicial x₀ (cm)', -20, 20, 0.5, x0, function (v) { x0 = v; calc(); }, function (v) { return fm(v, 1) + ' cm'; });
  c.slider('Velocidad inicial v₀ₓ (m/s)', -5, 5, 0.05, v0, function (v) { v0 = v; calc(); }, function (v) { return fm(v, 2) + ' m/s'; });
  c.reproductor({ max: 2, valor: 0, paso: 0.005, vel: 0.25, ciclico: true, etiqueta: 'Tiempo (en periodos)',
    fmt: function (v) { return 't = ' + fm(v * Tp, 2) + ' s = ' + fm(v, 2) + ' T'; }, cb: function (v) { s = v; calc(); } });
  c.leyenda([['var(--U)', 'fasor de longitud A (gira con ω)', 'linea'], ['var(--acc)', 'x(t) = A cos(ωt+φ)', 'linea'], ['var(--X)', 'barra K', 'area'], ['var(--A)', 'barra U (K+U = E, la barra gris)', 'area'], ['var(--warn-b)', 'Q y su proyección x', 'punto']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!ejes) return;
    ejes.material.color.set(p.fg); tcks.material.color.set(p.fg); pared.material.color.set(p.fg); muelle.material.color.set(p.fg);
    eq.material.color.set(p.mut); circ.material.color.set(p.mut); guias.material.color.set(p.mut); conec.material.color.set(p.mut);
    curva.material.color.set(p.acc); fasor.material.color.set(p.S); bloque.material.color.set(p.acc);
    barE.material.color.set(p.mut); barK.material.color.set(p.L); barU.material.color.set(p.A); qp.material.color.set(p.W); cp.material.color.set(p.W);
  });
  c.vista(-4.2, GX + 2 * GW + 0.45, -1.5, 1.55);
  nuevo(); listo = true; calc();
});
