/* Ciclos de gas ideal en el diagrama pV (tema 19; ec. 19.2, 19.4, 19.7, 19.13 de U; eficiencia 20.4 y Carnot 20.14 como complemento). params: {"dim":2,"marcas":false}.
   Modo 0 «Recta del examen de Feb. 2025 (2ª) P-2»: a(0,55 m³; 4·10⁵ Pa) → b(0,82; 4·10⁵) isóbaro; b → c(0,82; 2·10⁵) isócoro; c → a recta.
        Sobre la recta p(V) = p_c + s(V − V_c), s = −7,407·10⁵ Pa/m³: Q(c→V) = (3/2)(pV − p_cV_c) + ∫p dV; dQ = (5p/2 + 3sV/2) dV se anula en V* = 109/160 = 0,681 m³ (Q máx. = 28 521 J).
   Modo 1 «Ciclo isócora–isoterma–isóbara» (Feb. 2023 (2ª) P-2 y Sept. 2024 P-2): A→B isócora (p×r), B→C isoterma hasta p_A, C→A isóbara; gas monoatómico, n = 3 mol, TB = 573,15 K.
        e = W/QH con QH = Q(AB) + Q(BC); Carnot e_C = 1 − 1/r. */
Interactivos.registrar('ciclo-pv', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), listo = false, modo = 0, clave = '';
  var R = 8.314, Vs = 109 / 160, Vc = 0.82, Va = 0.55, pc = 2e5, pa = 4e5, sl_ = (pa - pc) / (Va - Vc);
  var Vp = 0.7, rr = 4;
  var ejes, tri, cam, sombra, pto, marcaV, ticks = [], eX, eY, eA, eB, eC, eD, sl = [], mapa;
  var l1 = c.lectura(''), l2 = c.lectura(''), l3 = c.lectura(''), l4 = c.lectura('');
  var fm = function (x, d) { return x.toFixed(d).replace('.', ',').replace(/^-/, '−'); };
  function gx(V) { return (V - mapa.x0) / (mapa.x1 - mapa.x0) * mapa.w; }
  function gy(p) { return (p - mapa.y0) / (mapa.y1 - mapa.y0) * mapa.h; }
  function construir() {
    var k = modo + '|' + P.fg + P.bg + P.S + P.W + P.L + P.A; if (k === clave && ejes) return; clave = k;
    [ejes, tri, cam, sombra, pto, marcaV].forEach(function (o) { if (o) c.scene.remove(o); });
    mapa = modo === 0 ? { x0: 0.4, x1: 0.95, y0: 0, y1: 4.8, w: 7.4, h: 4.6, tx: [0.55, 0.68, 0.82], ty: [2, 4] } : { x0: 0, x1: 9, y0: 0, y1: 9, w: 7.4, h: 4.6, tx: [1, 3, 5, 7], ty: [1, 3, 5, 7] };
    c.vista(-1.1, 9.0, -0.8, 5.3); var w = 0.03, i;
    var rej = [];
    mapa.tx.forEach(function (v) { rej.push([[gx(v), 0], [gx(v), mapa.h]]); }); mapa.ty.forEach(function (v) { rej.push([[0, gy(v)], [mapa.w, gy(v)]]); });
    ejes = new T.Group(); var a = H.cinta(T, rej, P.bd, w * 0.5); a.position.z = -0.3;
    var b = H.cinta(T, [[[0, 0], [mapa.w, 0]], [[0, 0], [0, mapa.h]]], P.fg, w); b.position.z = -0.2; ejes.add(a, b); c.scene.add(ejes);
    sombra = H.cinta(T, [], P.L, w * 0.8); sombra.position.z = 0.02; c.scene.add(sombra);
    tri = H.cinta(T, [], P.fg, w * 1.7); tri.position.z = 0.1; c.scene.add(tri);
    cam = H.cinta(T, [], P.S, w * 2.2); cam.position.z = 0.13; c.scene.add(cam);
    pto = H.punto(T, 0, 0, w * 4, P.W); pto.position.z = 0.5; c.scene.add(pto);
    ticks.forEach(function (e) { e.ver(false); }); var j = 0, tx;
    mapa.tx.forEach(function (v) { tx = ticks[j] || (ticks[j] = c.etiqueta('', 0, 0, 'c')); j++; tx.poner(fm(v, modo === 0 ? 2 : 0)); tx.mover(gx(v), -0.3); tx.ver(true); });
    mapa.ty.forEach(function (v) { tx = ticks[j] || (ticks[j] = c.etiqueta('', 0, 0, 'r')); j++; tx.poner(fm(v, 0)); tx.mover(-0.12, gy(v)); tx.ver(true); });
    eX.poner(modo === 0 ? 'V (m³)' : 'V / VB'); eX.mover(mapa.w, -0.62); eY.poner(modo === 0 ? 'p (10⁵ Pa)' : 'p / pA'); eY.mover(0.1, mapa.h + 0.4);
  }
  function calc() {
    if (!listo) return; construir(); var i;
    if (modo === 0) {
      var pl = function (V) { return pc + sl_ * (V - Vc); };
      var Q = function (V) { var dU = 1.5 * (pl(V) * V - pc * Vc), W = pc * (V - Vc) + sl_ / 2 * (V - Vc) * (V - Vc); return dU + W; };
      var A = [gx(Va), gy(4)], B = [gx(Vc), gy(4)], C = [gx(Vc), gy(2)];
      tri.set([[A, B], [B, C], [C, A]]);
      var hs = []; for (i = 0; i <= 40; i++) { var p = 2 + 2 * i / 40, Vv = Vc + (p * 1e5 - pc) / sl_; hs.push([[gx(Vv), gy(p)], [gx(Vc), gy(p)]]); } sombra.set(hs);
      var V = Vp, pp = pl(V); cam.set([[[gx(Vc), gy(pc / 1e5)], [gx(V), gy(pp / 1e5)]]]); pto.mover(gx(V), gy(pp / 1e5));
      var d = 2.5 * pp + 1.5 * sl_ * V, Qv = Q(V), dQ = d < 0 ? 'dQ > 0  (entra calor)' : d > 0 ? 'dQ < 0  (sale calor)' : 'dQ = 0  (máximo de Q)';
      eA.poner('a'); eA.mover(gx(Va) - 0.2, gy(4) + 0.15); eB.poner('b'); eB.mover(gx(Vc) + 0.15, gy(4) + 0.15); eC.poner('c'); eC.mover(gx(Vc) + 0.18, gy(2) - 0.2);
      eD.poner('V* = 0,681 m³'); eD.mover(gx(Vs), gy(pl(Vs) / 1e5) - 0.55); eD.ver(true); eA.ver(true); eB.ver(true); eC.ver(true);
      l1('Posición en la recta c→a:  V = ' + fm(V, 3) + ' m³   p = ' + fm(pp / 1e5, 3) + '×10⁵ Pa   ·   ' + dQ);
      l2('Calor acumulado desde c:  Q(c→V) = ' + fm(Qv, 0) + ' J   (máximo 28 521 J en V* = 0,681 m³; en a vale +3000 J)');
      l3('Trabajo del ciclo  W = 27 000 J (área del triángulo)  ·  calor en a→b: +270 000 J  ·  en b→c: −246 000 J');
      l4('QH = 270 000 + 28 521 = 298 521 J  ⇒  e = 27 000 / 298 521 = 9,0 %   (si solo se contase el neto de la recta, 9,9 %)');
    } else {
      var n = 3, Rx = 8.31, TB = 573.15, r = rr, TA = TB / r, CVn = 1.5 * Rx * n, CPn = 2.5 * Rx * n;
      var QAB = CVn * (TB - TA), QBC = n * Rx * TB * Math.log(r), QCA = -CPn * (TB - TA), Wn = QAB + QBC + QCA, QH = QAB + QBC, e = Wn / QH, eCar = 1 - 1 / r;
      var pA = [gx(1), gy(1)], pB = [gx(1), gy(r)], pC = [gx(r), gy(1)], iso = [], hs2 = [];
      for (i = 0; i <= 80; i++) { var x = 1 + (r - 1) * i / 80; iso.push([gx(x), gy(r / x)]); if (i % 2 === 0) hs2.push([[gx(x), gy(1)], [gx(x), gy(r / x)]]); }
      tri.set([[pA, pB], iso, [pC, pA]]); cam.set([]); sombra.set(hs2); pto.mover(gx(1), gy(1));
      eA.poner('A'); eA.mover(gx(1) - 0.2, gy(1) - 0.25); eB.poner('B'); eB.mover(gx(1) - 0.2, gy(r) + 0.2); eC.poner('C'); eC.mover(gx(r) + 0.15, gy(1) - 0.25);
      eD.poner('isoterma ' + fm(TB, 0) + ' K'); eD.mover(gx(1 + (r - 1) * 0.5) + 0.2, gy(r / (1 + (r - 1) * 0.5)) + 0.45); eD.ancla('l'); eD.ver(true); eA.ver(true); eB.ver(true); eC.ver(true);
      l1('pB/pA = r = ' + fm(r, 1) + '   ⇒   TA = TB/r = ' + fm(TA, 1) + ' K   ·   V_C = r·V_B   (3 mol de gas monoatómico, TB = T_C = 573,15 K)');
      l2('Calor que entra:  Q(AB) = ' + fm(QAB, 0) + ' J (isócora)  +  Q(BC) = ' + fm(QBC, 0) + ' J (isoterma)  =  QH = ' + fm(QH, 0) + ' J');
      l3('Calor que sale:  Q(CA) = ' + fm(QCA, 0) + ' J (isóbara)   ·   Trabajo del ciclo  W = ' + fm(Wn, 0) + ' J (área encerrada)');
      l4('Eficiencia  e = W/QH = ' + fm(100 * e, 1) + ' %   frente a Carnot  1 − 1/r = ' + fm(100 * eCar, 1) + ' %   (con r = 4: 25,3 % y 75 %, el examen)');
    }
  }
  c.selector('Qué se muestra', ['Recta c→a del examen de Feb. 2025 (2ª): ¿dónde entra y dónde sale calor?', 'Ciclo isócora–isoterma–isóbara (Feb. 2023 y Sept. 2024): eficiencia'], 0, function (i) { modo = i; if (listo) { clave = ''; mostrar(); calc(); c.pedir(); } });
  sl.push([0, c.slider('Posición V sobre la recta c→a (m³)', 0.55, 0.82, 0.005, Vp, function (v) { Vp = v; calc(); }, function (v) { return fm(v, 3) + ' m³'; })]);
  sl.push([1, c.slider('Razón de presiones r = pB/pA', 1.5, 8, 0.1, rr, function (v) { rr = v; calc(); }, function (v) { return fm(v, 1); })]);
  function mostrar() { sl.forEach(function (q) { q[1].parentNode.style.display = q[0] === modo ? '' : 'none'; }); }
  eX = c.etiqueta('', 0, 0, 'r'); eY = c.etiqueta('', 0, 0, 'l'); eA = c.etiqueta('', 0, 0, 'c'); eB = c.etiqueta('', 0, 0, 'c'); eC = c.etiqueta('', 0, 0, 'c'); eD = c.etiqueta('', 0, 0, 'c');
  c.leyenda([['var(--fg)', 'ciclo', 'linea'], ['var(--U)', 'tramo recorrido de c a la posición elegida (modo de la recta)', 'linea'], ['var(--X)', 'área = trabajo neto', 'area'], ['var(--warn-b)', 'posición actual', 'punto']]);
  c.alCambiarTema(function (p) { P = p; c.renderer.setClearColor(p.bg); if (!listo) return; clave = ''; calc(); });
  listo = true; mostrar(); calc();
});
