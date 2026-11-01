/* Onda estacionaria en una cuerda fija por los dos extremos: suma de dos ondas viajeras opuestas y modos normales (tema 15; U §15.6-15.8, ec. 15.27-15.35, figs. 15.23-15.26).
   params: {"dim":2,"marcas":false}.  Cuerda fija: L = 0,800 m y μ = 7,50 g/m (como en el ejercicio 15.58); datos que se mueven: modo n, tensión F (N) y amplitud A de cada onda viajera (cm).
   Fórmulas del tema (las mismas que en el texto):
     v = √(F/μ) (15.14);  λₙ = 2L/n (15.31);  fₙ = n·v/2L = n·f₁ (15.32-15.33);  kₙ = 2π/λₙ = nπ/L;  ωₙ = 2πfₙ;
     onda incidente (hacia −x, invertida al reflejarse en x = 0)  y₁ = −A cos(kx + ωt);  onda reflejada (hacia +x)  y₂ = A cos(kx − ωt);
     suma  y = y₁ + y₂ = (2A sen kx) sen ωt  (15.28, con A estacionaria = 2A);  nodos en x = mL/n, m = 0…n (15.29);  antinodos en x = (2m+1)L/2n.
   Valores de control: F = 467 N ⇒ v = 249,6 m/s, f₁ = 156 Hz (ejercicio 15.58: 624 Hz = 4f₁ y 780 Hz = 5f₁); F = 1600 N con L = 5 m y μ = 40 g/m daría f₁ = 20 Hz (Ej. 15.7; aquí L y μ son fijos).
   Dibujo: el eje y está ampliado (A_OE = 4 cm ocupa 1,4 unidades); la longitud L = 0,800 m ocupa 4 unidades. */
Interactivos.registrar('onda-estacionaria', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var L = 0.8, mu = 0.0075, n = 2, F = 467, A = 1.0, vista = 0, s = 0;   /* A en cm; s = tiempo en periodos del modo (0 a 2) */
  var LW = 4, KY = 35, w = 0.016, listo = false, col = [], NMAX = 9;
  var fm = function (v, d) { var q = Math.pow(10, d); return (Math.round(v * q) / q).toFixed(d).replace('-', '−').replace('.', ','); };
  var cinta1, cinta2, suma, env1, env2, base, nodos = [], ctn = [], bL, bl2, eN = [], eA = [], eLm, eLl, eFE;
  var lw = c.lectura('Cuerda y modo'), lf = c.lectura('Frecuencias'), lt = c.lectura('En este instante');

  function reg(m, k) { col.push([m, k]); return m; }
  function nuevo() {
    base = reg(H.cinta(T, [[[0, 0], [LW, 0]]], P.fg, w * 0.9), 'fg'); base.position.z = 0.05; c.scene.add(base);
    env1 = reg(H.cinta(T, [], P.mut, w * 0.8, [w * 4, w * 3]), 'mut'); env1.position.z = 0.08; c.scene.add(env1);
    env2 = reg(H.cinta(T, [], P.mut, w * 0.8, [w * 4, w * 3]), 'mut'); env2.position.z = 0.08; c.scene.add(env2);
    cinta1 = reg(H.cinta(T, [], P.A, w * 1.2), 'A'); cinta1.position.z = 0.15; c.scene.add(cinta1);
    cinta2 = reg(H.cinta(T, [], P.L, w * 1.2), 'L'); cinta2.position.z = 0.16; c.scene.add(cinta2);
    suma = reg(H.cinta(T, [], P.acc, w * 2.0), 'acc'); suma.position.z = 0.3; c.scene.add(suma);
    bL = reg(H.cinta(T, [], P.fg, w * 1.1), 'fg'); bL.position.z = 0.25; c.scene.add(bL);
    bl2 = reg(H.cinta(T, [], P.fg, w * 1.1), 'fg'); bl2.position.z = 0.25; c.scene.add(bl2);
    for (var i = 0; i < NMAX; i++) { var d = reg(H.punto(T, 0, 0, w * 2.4, P.W), 'W'); d.position.z = 0.6; c.scene.add(d); nodos.push(d); eN.push(c.etiqueta('N', 0, 0, 'c')); }
    for (i = 0; i < NMAX - 1; i++) eA.push(c.etiqueta('A', 0, 0, 'c'));
    eLm = c.etiqueta('λ/2', 0, 0, 'c'); eLl = c.etiqueta('L = 0,800 m', LW / 2, -1.5, 'c'); eFE = c.etiqueta('', 0, 0, 'c');
  }
  function calc() {
    if (!listo) return;
    var v = Math.sqrt(F / mu), f1 = v / (2 * L), fn = n * f1, lamn = 2 * L / n, k = n * Math.PI / L, a = A / 100, ph = 2 * Math.PI * s, i;
    var X = function (u) { return u * L / LW; };                      /* mundo → metros */
    var P1 = [], P2 = [], PS = [], E1 = [], E2 = [], N = 400;
    for (i = 0; i <= N; i++) {
      var x = L * i / N, u = LW * i / N;
      P1.push([u, -KY * a * Math.cos(k * x + ph)]);
      P2.push([u, KY * a * Math.cos(k * x - ph)]);
      PS.push([u, KY * 2 * a * Math.sin(k * x) * Math.sin(ph)]);
      E1.push([u, KY * 2 * a * Math.abs(Math.sin(k * x))]); E2.push([u, -KY * 2 * a * Math.abs(Math.sin(k * x))]);
    }
    suma.set([PS]); env1.set([E1]); env2.set([E2]);
    if (vista === 0) { cinta1.set([P1]); cinta2.set([P2]); } else { cinta1.set([]); cinta2.set([]); }
    for (i = 0; i < NMAX; i++) {
      var on = i <= n;
      nodos[i].visible = on; eN[i].ver(on);
      if (on) { nodos[i].mover(LW * i / n, 0); eN[i].mover(LW * i / n, 0.2 + 0.0); }
    }
    for (i = 0; i < NMAX - 1; i++) {
      var ona = i < n; eA[i].ver(ona);
      if (ona) eA[i].mover(LW * (2 * i + 1) / (2 * n), KY * 2 * a + 0.2);
    }
    var yb = -1.6, h = LW / n;
    bL.set([[[0, -1.85], [LW, -1.85]], [[0, -1.93], [0, -1.77]], [[LW, -1.93], [LW, -1.77]]]);
    bl2.set([[[0, yb], [h, yb]], [[0, yb - 0.07], [0, yb + 0.07]], [[h, yb - 0.07], [h, yb + 0.07]]]); eLm.mover(h / 2, yb + 0.17);
    eLl.mover(LW / 2, -2.07);
    lw('L = 0,800 m   ·   μ = 7,50 g/m   ·   F = ' + fm(F, 0) + ' N   ⇒   v = √(F/μ) = ' + fm(v, 1) + ' m/s   ·   modo n = ' + n + ': L = n·λ/2');
    lf('λₙ = 2L/n = ' + fm(lamn, 3) + ' m   ·   fₙ = n·f₁ = ' + n + ' × ' + fm(f1, 1) + ' Hz = ' + fm(fn, 1) + ' Hz   ·   periodo Tₙ = ' + fm(1000 / fn, 2) + ' ms   ·   ' + (n + 1) + ' nodos (con los extremos) y ' + n + ' antinodos');
    var ymax = 2 * A * Math.abs(Math.sin(ph)), t2 = s / fn;
    lt('t = ' + fm(t2 * 1000, 2) + ' ms (' + fm(s, 2) + ' Tₙ):   amplitud de la onda estacionaria A_OE = 2A = ' + fm(2 * A, 2) + ' cm;  desplazamiento de un antinodo en este instante: ' + fm(2 * A * Math.sin(ph), 2) + ' cm.  Las formas N–A–N no avanzan: solo suben y bajan.');
  }
  c.selector('Modo normal n', ['n = 1 (fundamental)', 'n = 2', 'n = 3', 'n = 4', 'n = 5', 'n = 6', 'n = 7', 'n = 8'], n - 1, function (i) { n = i + 1; calc(); });
  c.slider('Tensión F (N)', 67, 1867, 50, F, function (v) { F = v; calc(); }, function (v) { return fm(v, 0) + ' N'; });
  c.slider('Amplitud A de cada onda viajera (cm)', 0.2, 2, 0.1, A, function (v) { A = v; calc(); }, function (v) { return fm(v, 1) + ' cm'; });
  c.selector('Mostrar', ['la suma y las dos ondas viajeras', 'solo la suma (onda estacionaria)'], 0, function (i) { vista = i; calc(); });
  c.reproductor({ max: 2, valor: 0.1, paso: 0.005, vel: 0.2, ciclico: true, etiqueta: 'Tiempo (en periodos del modo)',
    fmt: function (v) { return 't = ' + fm(v, 2) + ' T'; }, cb: function (v) { s = v; calc(); } });
  c.leyenda([['var(--acc)', 'suma y = y₁ + y₂ = (2A sen kx) sen ωt', 'linea'], ['var(--A)', 'onda hacia −x (invertida)', 'linea'], ['var(--X)', 'onda hacia +x (reflejada)', 'linea'], ['var(--warn-b)', 'nodos N', 'punto'], ['var(--mut)', 'envolvente ±2A|sen kx| (eje y ampliado)', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    col.forEach(function (q) { var m = q[0].material; if (m && m.color) m.color.set(p[q[1]]); });
  });
  c.vista(-0.3, LW + 0.3, -2.25, 1.85);
  nuevo(); listo = true; calc();
});
