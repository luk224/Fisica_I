/* Onda sinusoidal viajera en una cuerda (tema 15; U §15.2-15.3, ec. 15.1, 15.5-15.10, figs. 15.9 y 15.10). params: {"dim":2,"marcas":false}.
   Datos: amplitud A (cm), longitud de onda λ (m), frecuencia f (Hz), sentido (+x / −x) y posición x_p de la partícula marcada.
   Fórmulas del tema (las mismas que en el texto):
     k = 2π/λ;  ω = 2πf;  v = λf = ω/k;  T = 1/f;
     y(x,t) = A cos(kx − ωt) hacia +x;  y(x,t) = A cos(kx + ωt) hacia −x   (con s = ±1:  y = A cos(kx − sωt));
     vᵧ = ∂y/∂t = s·ωA sen(kx − sωt) (15.9);  a_y = −ω²y (15.10).
   Valores de control: λ = 2,00 m, f = 1,00 Hz ⇒ v = 2,00 m/s, k = 3,142 rad/m, ω = 6,283 rad/s, T = 1,00 s;
                       U Ej. 15.2 (f = 2,00 Hz, A = 7,5 cm, v = 12,0 m/s ⇒ λ = 6,00 m, k = 1,05 rad/m, ω = 12,6 rad/s): λ = 6,0 m, f = 2,00 Hz, A = 7,5 cm.
   Dibujo: arriba la forma de la cuerda en el instante t (eje y ampliado ×4); abajo y(t) de la partícula marcada (t de 0 a 2 s). */
Interactivos.registrar('onda-viajera', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var A = 12, lam = 2, f = 1, sg = 1, xp = 1.2, s = 0;           /* A en cm; s = tiempo en s */
  var LX = 6, KY = 4, Y1 = 1.7, Y2 = -1.5, TW = 2, KT = LX / TW, w = 0.016, listo = false, col = [];
  var fm = function (v, d) { var q = Math.pow(10, d); return (Math.round(v * q) / q).toFixed(d).replace('-', '−').replace('.', ','); };
  var cuerda, ejes1, ejes2, marca, flechaV, cresta, dcresta, parti, gra, pt, cursor, bl, bT, tk;
  var lw = c.lectura('Parámetros de la onda'), lt = c.lectura('En este instante'), lp = c.lectura('Partícula marcada');
  var eL, eT, eV, ex, et, ey, eyt, eP, eC;

  function reg(m, k) { col.push([m, k]); return m; }
  function nuevo() {
    ejes1 = reg(H.cinta(T, [[[0, Y1], [LX + 0.1, Y1]]], P.mut, w * 0.9, [w * 4, w * 3]), 'mut'); ejes1.position.z = 0.05; c.scene.add(ejes1);
    ejes2 = reg(H.cinta(T, [[[0, Y2], [LX + 0.1, Y2]], [[0, Y2 - 1.25], [0, Y2 + 1.25]]], P.fg, w), 'fg'); ejes2.position.z = 0.05; c.scene.add(ejes2);
    tk = reg(H.cinta(T, [], P.fg, w), 'fg'); tk.position.z = 0.05; c.scene.add(tk);
    cuerda = reg(H.cinta(T, [], P.acc, w * 1.8), 'acc'); cuerda.position.z = 0.2; c.scene.add(cuerda);
    gra = reg(H.cinta(T, [], P.acc, w * 1.6), 'acc'); gra.position.z = 0.2; c.scene.add(gra);
    marca = reg(H.cinta(T, [], P.mut, w * 0.8, [w * 4, w * 3]), 'mut'); marca.position.z = 0.1; c.scene.add(marca);
    dcresta = reg(H.cinta(T, [], P.mut, w * 0.8, [w * 4, w * 3]), 'mut'); dcresta.position.z = 0.1; c.scene.add(dcresta);
    bl = reg(H.cinta(T, [], P.fg, w * 1.1), 'fg'); bl.position.z = 0.25; c.scene.add(bl);
    bT = reg(H.cinta(T, [], P.fg, w * 1.1), 'fg'); bT.position.z = 0.25; c.scene.add(bT);
    flechaV = H.flecha2D(T, P.A, w * 1.8); flechaV.position.z = 0.4; c.scene.add(flechaV); col.push([flechaV, 'A']);
    cresta = reg(H.punto(T, 0, 0, w * 3.2, P.E), 'S'); cresta.position.z = 0.6; c.scene.add(cresta);
    parti = reg(H.punto(T, 0, 0, w * 3.2, P.W), 'W'); parti.position.z = 0.6; c.scene.add(parti);
    pt = reg(H.punto(T, 0, 0, w * 3.2, P.W), 'W'); pt.position.z = 0.6; c.scene.add(pt);
    cursor = reg(H.cinta(T, [], P.W, w * 0.8, [w * 4, w * 3]), 'W'); cursor.position.z = 0.1; c.scene.add(cursor);
    eL = c.etiqueta('λ', 0, 0, 'l'); eT = c.etiqueta('T', 0, 0, 'l'); eV = c.etiqueta('v', 0, 0, 'l'); eC = c.etiqueta('cresta', 0, 0, 'c');
    ex = c.etiqueta('x (m)', LX + 0.1, Y1 + 0.12, 'l'); et = c.etiqueta('t (s)', LX + 0.1, Y2 + 0.12, 'l'); ey = c.etiqueta('y', 0.06, Y1 + 1.3, 'l'); eyt = c.etiqueta('y de la partícula', 0.08, Y2 + 1.35, 'l');
    eP = c.etiqueta('P', 0, 0, 'c');
  }
  function calc() {
    if (!listo) return;
    var k = 2 * Math.PI / lam, om = 2 * Math.PI * f, v = lam * f, Tp = 1 / f, a = A / 100, i, pts = [], gp = [];
    var Y = function (x, tt) { return a * Math.cos(k * x - sg * om * tt); };
    for (i = 0; i <= 300; i++) { var x = LX * i / 300; pts.push([x, Y1 + KY * Y(x, s)]); }
    cuerda.set([pts]);
    for (i = 0; i <= 300; i++) { var tt = TW * i / 300; gp.push([KT * tt, Y2 + KY * Y(xp, tt)]); }
    gra.set([gp]);
    var yp = Y(xp, s), vy = sg * om * a * Math.sin(k * xp - sg * om * s), ay = -om * om * yp;
    parti.mover(xp, Y1 + KY * yp); marca.set([[[xp, Y1 - KY * a - 0.08], [xp, Y1 + KY * a + 0.08]]]);
    var rel = a > 0 ? vy / (om * a) : 0; flechaV.poner([xp, Y1 + KY * yp], [xp, Y1 + KY * yp + 0.8 * rel]);
    var xc = (((sg * v * s) % lam) + lam) % lam;                       /* primera cresta con x ≥ 0 */
    cresta.mover(xc, Y1 + KY * a); dcresta.set([[[xc, Y1], [xc, Y1 + KY * a]]]); eC.mover(xc, Y1 + KY * a + 0.3);
    var yb = Y1 - 1.35; bl.set([[[0, yb], [lam, yb]], [[0, yb - 0.08], [0, yb + 0.08]], [[lam, yb - 0.08], [lam, yb + 0.08]]]); eL.mover(lam + 0.1, yb);
    var tT = Math.min(Tp, TW), yb2 = Y2 - 1.5;
    bT.set([[[0, yb2], [KT * tT, yb2]], [[0, yb2 - 0.08], [0, yb2 + 0.08]], [[KT * tT, yb2 - 0.08], [KT * tT, yb2 + 0.08]]]); eT.mover(KT * tT + 0.1, yb2);
    pt.mover(KT * s, Y2 + KY * yp); cursor.set([[[KT * s, Y2 - 1.25], [KT * s, Y2 + 1.25]]]);
    var tt2 = []; for (i = 0; i <= 4; i++) tt2.push([[KT * i * 0.5, Y2 - 0.07], [KT * i * 0.5, Y2 + 0.07]]); tk.set(tt2);
    eV.mover(xc + 0.2, Y1 + KY * a + 0.0); eV.poner(sg > 0 ? 'v →' : '← v'); eV.ancla(sg > 0 ? 'l' : 'r'); eV.mover(sg > 0 ? xc + 0.2 : xc - 0.2, Y1 + KY * a + 0.0);
    eP.mover(xp, Y1 + KY * a + 0.3);
    lw('k = ' + fm(k, 3) + ' rad/m   ·   ω = ' + fm(om, 2) + ' rad/s   ·   v = λf = ' + fm(v, 2) + ' m/s = ω/k   ·   T = ' + fm(Tp, 3) + ' s');
    lt('t = ' + fm(s, 2) + ' s:   la cresta marcada (azul) está en x = ' + fm(xc, 2) + ' m y avanza ' + (sg > 0 ? 'hacia +x' : 'hacia −x') + ' con rapidez ' + fm(v, 2) + ' m/s');
    lp('x = ' + fm(xp, 2) + ' m:   y = ' + fm(yp * 100, 2) + ' cm   ·   vᵧ = ' + fm(vy, 3) + ' m/s   ·   a_y = ' + fm(ay, 2) + ' m/s²   (vᵧ máx = ωA = ' + fm(om * a, 3) + ' m/s; no confundir con v)');
  }
  c.slider('Amplitud A (cm)', 2, 30, 0.5, A, function (v) { A = v; calc(); }, function (v) { return fm(v, 1) + ' cm'; });
  c.slider('Longitud de onda λ (m)', 0.5, 6, 0.1, lam, function (v) { lam = v; calc(); }, function (v) { return fm(v, 1) + ' m'; });
  c.slider('Frecuencia f (Hz)', 0.5, 4, 0.25, f, function (v) { f = v; calc(); }, function (v) { return fm(v, 2) + ' Hz'; });
  c.slider('Posición de la partícula marcada x (m)', 0, 6, 0.1, xp, function (v) { xp = v; calc(); }, function (v) { return fm(v, 1) + ' m'; });
  c.selector('Sentido de propagación', ['hacia +x:  y = A cos(kx − ωt)', 'hacia −x:  y = A cos(kx + ωt)'], 0, function (i) { sg = i === 0 ? 1 : -1; calc(); });
  c.reproductor({ max: TW, valor: 0, paso: 0.01, vel: 0.5, ciclico: true, etiqueta: 'Tiempo (s)',
    fmt: function (v) { return 't = ' + fm(v, 2) + ' s'; }, cb: function (v) { s = v; calc(); } });
  c.leyenda([['var(--acc)', 'forma de la cuerda y(x) / gráfica y(t) de la partícula', 'linea'], ['var(--warn-b)', 'partícula marcada (sube y baja, no avanza)', 'punto'], ['var(--E)', 'una cresta (avanza con v)', 'punto'], ['var(--A)', 'vᵧ de la partícula (longitud ∝ vᵧ/ωA, no a escala)', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    col.forEach(function (q) { var m = q[0].material; if (m && m.color) m.color.set(p[q[1]]); });
  });
  c.vista(-0.4, LX + 0.9, Y2 - 1.85, Y1 + 1.35);
  nuevo(); listo = true; calc();
});
