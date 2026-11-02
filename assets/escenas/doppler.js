/* Efecto Doppler: frentes de onda de una fuente móvil y receptores (tema 16; U §16.8-16.9, ec. 16.25-16.29 y 16.31, figs. 16.27, 16.28 y 16.36). params: {"dim":2,"marcas":false}.
   Datos que se mueven: rapidez de la fuente uₛ (m/s) y velocidad del receptor L1 (m/s, positiva si va hacia la fuente).
   Fijos: v = 340 m/s (como en los ejemplos 16.14-16.18), fₛ = 100 Hz (λ₀ = v/fₛ = 3,40 m), fuente a lo largo del eje +x.
   Fórmulas del tema (las mismas que en el texto), con el sentido positivo de L a S (U p. 528):
     λ delante = (v − uₛ)/fₛ (16.27);  λ detrás = (v + uₛ)/fₛ (16.28);  f_L = (v + vₗ)/(v + vₛ)·fₛ (16.29);
     L1 delante de S (S se acerca): vₛ = −uₛ, vₗ = +vₗ1;  L2 detrás de S (S se aleja): vₛ = +uₛ, vₗ = 0;
     fuente supersónica: sen α = v/uₛ (16.31); número Mach = uₛ/v.
   Valores de control: uₛ = 100 m/s ⇒ λ delante = 2,40 m, λ detrás = 4,40 m, f(L1) = 141,7 Hz, f(L2) = 77,27 Hz;
                       uₛ = 30 m/s ⇒ λ = 3,10 m y 3,70 m, f(L1) = 109,7 Hz, f(L2) = 91,9 Hz (ejemplos 16.14-16.15 con otras fₛ y v);
                       uₛ = 0, vₗ1 = 30 m/s ⇒ f(L1) = 108,8 Hz (ejemplo 16.16, receptor móvil).
   Dibujo: cada frente (círculo azul) está centrado donde estaba la fuente al emitirlo (puntos grises) y crece con rapidez v. Tiempo 0 a 65 ms (6,5 periodos). */
Interactivos.registrar('doppler', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var v = 340, fS = 100, uS = 100, vL = 0, s = 0.06;                      /* s = tiempo en s */
  var X0 = -9, XA = 16, XB = -22, NF = 10, w = 0.15, listo = false, col = [], TP = 1 / fS, TMAX = 0.065;
  var fm = function (a, d) { var q = Math.pow(10, d), z = Math.round(a * q) / q; if (z === 0) z = 0; return z.toFixed(d).replace('-', '−').replace('.', ','); };
  var frentes, cono, centros, ejeS, fuente, rA, rB, fa, fb, eS, eA, eB, ev;
  var l1 = c.lectura('Fuente y ondas'), l2 = c.lectura('Receptores'), l3 = c.lectura('En este instante');

  function reg(m, k) { col.push([m, k]); return m; }
  function nuevo() {
    ejeS = reg(H.cinta(T, [[[-34, 0], [34, 0]]], P.bd, w * 0.7, [0.5, 0.5]), 'bd'); ejeS.position.z = -0.1; c.scene.add(ejeS);
    centros = reg(H.cinta(T, [], P.mut, w * 0.6), 'mut'); centros.position.z = 0.1; c.scene.add(centros);
    frentes = reg(H.cinta(T, [], P.acc, w * 1.25), 'acc'); frentes.position.z = 0.2; c.scene.add(frentes);
    cono = reg(H.cinta(T, [], P.fg, w * 1.1, [0.8, 0.6]), 'fg'); cono.position.z = 0.25; c.scene.add(cono);
    fuente = reg(H.punto(T, 0, 0, 0.62, P.A), 'A'); fuente.position.z = 0.6; c.scene.add(fuente);
    rA = reg(H.punto(T, 0, 0, 0.62, P.W), 'W'); rA.position.z = 0.6; c.scene.add(rA);
    rB = reg(H.punto(T, 0, 0, 0.62, P.L), 'L'); rB.position.z = 0.6; c.scene.add(rB);
    fa = H.flecha2D(T, P.A, w * 2.0); fa.position.z = 0.5; c.scene.add(fa); col.push([fa, 'A']);
    fb = H.flecha2D(T, P.W, w * 2.0); fb.position.z = 0.5; c.scene.add(fb); col.push([fb, 'W']);
    eS = c.etiqueta('S', 0, 0, 'c'); eA = c.etiqueta('L₁', 0, 0, 'c'); eB = c.etiqueta('L₂', 0, 0, 'c'); ev = c.etiqueta('', 0, 0, 'l');
  }
  function circulo(cx, r) { var p = [], i; for (i = 0; i <= 96; i++) p.push([cx + r * Math.cos(2 * Math.PI * i / 96), r * Math.sin(2 * Math.PI * i / 96)]); return p; }
  function calc() {
    if (!listo) return;
    var xs = X0 + uS * s, i, fr = [], cen = [], tk, lamF = (v - uS) / fS, lamB = (v + uS) / fS;
    for (i = 0; i < NF; i++) {
      tk = i * TP; if (tk > s + 1e-9) break;
      var cx = X0 + uS * tk, r = v * (s - tk);
      cen.push([[cx - 0.18, 0.18], [cx + 0.18, -0.18]]); cen.push([[cx - 0.18, -0.18], [cx + 0.18, 0.18]]);
      if (r > 0.05) fr.push(circulo(cx, r));
    }
    frentes.set(fr); centros.set(cen);
    var xa = XA - vL * s, sup = uS > v, pasada = xs >= xa;
    if (sup) {
      var al = Math.asin(v / uS), len = 70;
      cono.set([[[xs, 0], [xs - len * Math.cos(al), len * Math.sin(al)]], [[xs, 0], [xs - len * Math.cos(al), -len * Math.sin(al)]]]);
    } else cono.set([]);
    fuente.mover(xs, 0); rA.mover(xa, 0); rB.mover(XB, 0);
    eS.mover(xs, 1.7); eA.mover(xa, 1.7); eB.mover(XB, 1.7);
    fa.poner([xs, -1.6], [xs + (uS > 0 ? 4.2 : 0), -1.6]); fb.poner([xa, -1.6], [xa - (vL > 0 ? 4.2 : vL < 0 ? -4.2 : 0), -1.6]);
    if (uS > 0) { ev.poner('uₛ'); ev.mover(xs + 4.6, -1.6); } else { ev.poner(''); }
    var M = uS / v, fA = (v + vL) / (v - uS) * fS, fB = v / (v + uS) * fS;
    l1('v = 340 m/s (la fija el aire)  ·  fₛ = 100 Hz  ·  λ₀ = v/fₛ = 3,40 m  ·  uₛ = ' + fm(uS, 0) + ' m/s  ·  Mach = ' + fm(M, 2));
    if (sup) {
      l2('uₛ > v: ya no valen (16.27) ni (16.29) delante de la fuente. Onda de choque: sen α = v/uₛ = ' + fm(v / uS, 3) + '  ⇒  α = ' + fm(Math.asin(v / uS) * 180 / Math.PI, 1) + '°.  Detrás de S (L₂), cuando llega el sonido: f ≈ ' + fm(fB, 1) + ' Hz');
    } else if (uS >= v) {
      l2((pasada ? 'AVISO: la fuente ya ha rebasado a L₁.  ' : '') + 'uₛ = v (barrera del sonido): λ delante = 0 y f₁ → ∞, las crestas se apilan delante de la fuente (16.27, 16.29).  L₂ detrás de S: λ detrás = ' + fm(lamB, 2) + ' m,  f₂ = ' + fm(fB, 1) + ' Hz');
    } else {
      l2((pasada ? 'AVISO: la fuente ya ha rebasado a L₁ (ahora L₁ queda detrás y (16.29) cambia de signos); baja uₛ o vₗ.  ' : '') + 'L₁ delante de S (vₛ = ' + (uS > 0 ? '−' : '') + fm(uS, 0) + ', vₗ = ' + (vL > 0 ? '+' : vL < 0 ? '−' : '') + fm(Math.abs(vL), 0) + ' m/s):  λ delante = ' + fm(lamF, 2) + ' m,  f₁ = ' + fm(fA, 1) + ' Hz   ·   L₂ detrás de S (vₛ = +' + fm(uS, 0) + ', vₗ = 0):  λ detrás = ' + fm(lamB, 2) + ' m,  f₂ = ' + fm(fB, 1) + ' Hz');
    }
    l3((pasada ? 'AVISO: la fuente (x = ' + fm(xs, 1) + ' m) ha rebasado a L₁ (x = ' + fm(xa, 1) + ' m): lo que ves después ya no corresponde a «L₁ delante».  ' : '') + 't = ' + fm(s * 1000, 0) + ' ms:  la fuente está en x = ' + fm(xs, 1) + ' m; las ' + cen.length / 2 + ' cruces grises marcan dónde estaba al emitir cada frente; L₁ está en x = ' + fm(xa, 1) + ' m');
  }
  c.slider('Rapidez de la fuente uₛ (m/s)', 0, 400, 10, uS, function (a) { uS = a; calc(); }, function (a) { return fm(a, 0) + ' m/s  (Mach ' + fm(a / v, 2) + ')'; });
  c.slider('Velocidad del receptor L₁ hacia la fuente, vₗ (m/s)', -200, 200, 10, vL, function (a) { vL = a; calc(); }, function (a) { return (a > 0 ? '+' : a < 0 ? '−' : '') + fm(Math.abs(a), 0) + ' m/s'; });
  c.reproductor({ max: TMAX, valor: s, paso: 0.0005, vel: 0.03, ciclico: true, etiqueta: 'Tiempo (ms)',
    fmt: function (a) { return 't = ' + fm(a * 1000, 0) + ' ms'; }, cb: function (a) { s = a; calc(); } });
  c.leyenda([['var(--acc)', 'frentes de onda (crestas)', 'linea'], ['var(--A)', 'fuente S y su velocidad uₛ (flecha no a escala)', 'punto'], ['var(--warn-b)', 'receptor L₁ (delante) y su vₗ', 'punto'], ['var(--X)', 'receptor L₂ (detrás, quieto)', 'punto'], ['var(--fg)', 'onda de choque (solo si uₛ > v)', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    col.forEach(function (q) { var m = q[0].material; if (m && m.color) m.color.set(p[q[1]]); });
  });
  c.vista(-34, 34, -23, 23);
  nuevo(); listo = true; calc();
});
