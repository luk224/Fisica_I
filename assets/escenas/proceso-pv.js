/* Procesos de un gas ideal en el diagrama pV (tema 19, §19.5, §19.7-19.8; ec. 19.3, 19.4, 19.13, 19.22, 19.24-19.26 de U). params: {"dim":2,"marcas":false}.
   n = 1 mol; estado 1: p1 = 1 atm, T1 ajustable (V1 = nRT1/p1). Ejes normalizados: x = V/V1, y = p/p1.
   Procesos desde el estado 1: isobárico (V2 = r·V1), isocórico (p2 = q·p1), isotérmico (V2 = r·V1) y adiabático (V2 = r·V1, p·V^γ = cte).
   W = ∫p dV; ΔU = n·Cv·ΔT (cualquier proceso de gas ideal); Q = ΔU + W.  Monoatómico Cv = 3R/2, γ = 5/3; diatómico Cv = 5R/2, γ = 7/5. */
Interactivos.registrar('proceso-pv', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), listo = false;
  var R = 8.314, p1 = 101325, n = 1;
  var proc = 0, gas = 0, T1 = 300, r = 2, q = 2, clave = '';
  var ejes, curva, ref, sombra, pu1, pu2, ticks = [], eX, eY, eP;
  var lE1 = c.lectura(''), lE2 = c.lectura(''), lW = c.lectura(''), lQ = c.lectura(''), lU = c.lectura(''), lC = c.lectura('');
  var fm = function (x, d) { return x.toFixed(d).replace('.', ',').replace(/^-/, '−'); };
  var NOM = ['isobárico (p constante)', 'isocórico (V constante)', 'isotérmico (T constante)', 'adiabático (Q = 0)'];
  var sl = [];
  var X0 = 0, X1 = 3.2, Y0 = 0, Y1 = 3.5, kx = 2.2;
  function gam() { return gas === 0 ? 5 / 3 : 7 / 5; }
  function cv() { return gas === 0 ? 1.5 * R : 2.5 * R; }
  function construir() {
    var k = P.fg + P.bg + P.S + P.W + P.L; if (k === clave && ejes) return; clave = k;
    [ejes, curva, ref, sombra, pu1, pu2].forEach(function (o) { if (o) c.scene.remove(o); });
    kx = 2.2; c.escalaX(kx); c.vista(-0.5 * kx, 4.6 * kx, -0.6, 3.9); var w = 0.03;
    ejes = new T.Group();
    var rej = [], v;
    for (v = 1; v <= 3.01; v += 1) { rej.push([[v * kx, 0], [v * kx, Y1]]); rej.push([[0, v], [X1 * kx, v]]); }
    var a = H.cinta(T, rej, P.bd, w * 0.5); a.position.z = -0.3;
    var b = H.cinta(T, [[[0, 0], [X1 * kx, 0]], [[0, 0], [0, Y1]]], P.fg, w); b.position.z = -0.2; ejes.add(a, b); c.scene.add(ejes);
    ref = H.cinta(T, [], P.fg, w * 0.9, [w * 4, w * 3]); ref.position.z = 0.05; c.scene.add(ref);
    sombra = H.cinta(T, [], P.L, w * 1.7); sombra.position.z = 0.02; c.scene.add(sombra);
    curva = H.cinta(T, [], P.S, w * 1.8); curva.position.z = 0.12; c.scene.add(curva);
    pu1 = H.punto(T, kx, 1, w * 3.4, P.fg); pu1.position.z = 0.5; pu2 = H.punto(T, kx, 1, w * 3.4, P.W); pu2.position.z = 0.51; c.scene.add(pu1, pu2);
    ticks.forEach(function (e) { e.ver(false); });
    var i = 0, tx;
    for (v = 1; v <= 3.01; v += 1) {
      tx = ticks[i] || (ticks[i] = c.etiqueta('', 0, 0, 'c')); i++; tx.poner(fm(v, 0)); tx.mover(v * kx, -0.28); tx.ver(true);
      tx = ticks[i] || (ticks[i] = c.etiqueta('', 0, 0, 'r')); i++; tx.poner(fm(v, 0)); tx.mover(-0.1, v); tx.ver(true);
    }
    eX.poner('V / V₁'); eX.mover(X1 * kx, -0.55); eY.poner('p / p₁'); eY.mover(0.1, Y1 + 0.3);
  }
  function calc() {
    if (!listo) return; construir();
    var g = gam(), CV = cv(), V1 = n * R * T1 / p1, x2 = 1, y2 = 1, f, pts = [], i, N = 60;
    if (proc === 0) { x2 = r; y2 = 1; f = function () { return 1; }; }
    else if (proc === 1) { x2 = 1; y2 = q; f = null; }
    else if (proc === 2) { x2 = r; y2 = 1 / r; f = function (x) { return 1 / x; }; }
    else { x2 = r; y2 = Math.pow(r, -g); f = function (x) { return Math.pow(x, -g); }; }
    var T2 = T1 * x2 * y2, V2 = V1 * x2, p2 = p1 * y2;
    var W = proc === 0 ? p1 * (V2 - V1) : proc === 1 ? 0 : proc === 2 ? n * R * T1 * Math.log(r) : -(n * CV * (T2 - T1));
    var dU = n * CV * (T2 - T1), Q = dU + W;
    if (proc === 3) { Q = 0; }
    if (proc === 2) { dU = 0; Q = W; }
    /* curva y sombra */
    if (proc === 1) { curva.set([[[kx, 1], [kx, y2]]]); sombra.set([]); }
    else {
      var xs = [], hs = []; N = 110;
      for (i = 0; i <= N; i++) { var xx = 1 + (x2 - 1) * i / N; xs.push([xx * kx, f(xx)]); hs.push([[xx * kx, 0], [xx * kx, f(xx)]]); }
      curva.set([xs]); sombra.set(hs); sombra.material.color.set(W >= 0 ? P.L : P.W);
    }
    ref.set(proc === 2 ? [] : [H.grafica(function (x) { return 1 / (x / kx); }, 0.35 * kx, 3.2 * kx, 120, Y1)[0] || [[kx, 1], [kx, 1]]]);
    pu1.mover(kx, 1); pu2.mover(x2 * kx, Math.min(y2, Y1));
    eP.poner(NOM[proc] + (proc === 2 ? '' : '   ·   isoterma por 1 (trazos)')); eP.mover(X1 * kx, Y1 + 0.3); eP.ancla('r');
    lE1('Estado 1:  p₁ = 1,00 atm   V₁ = ' + fm(V1 * 1000, 1) + ' L   T₁ = ' + fm(T1, 0) + ' K   (n = 1 mol)');
    lE2('Estado 2:  p₂ = ' + fm(p2 / 101325, 2) + ' atm   V₂ = ' + fm(V2 * 1000, 1) + ' L   T₂ = ' + fm(T2, 1) + ' K');
    lW('Trabajo del gas  W = ∫p dV = ' + fm(W, 0) + ' J' + (W > 0.5 ? '  (expansión: lo hace el gas)' : W < -0.5 ? '  (compresión: lo hace el entorno)' : ''));
    lU('Energía interna  ΔU = nCv ΔT = ' + fm(dU, 0) + ' J' + (proc === 2 ? '  (isoterma de gas ideal: U solo depende de T)' : ''));
    lQ('Calor  Q = ΔU + W = ' + fm(Q, 0) + ' J' + (Q > 0.5 ? '  (entra calor)' : Q < -0.5 ? '  (sale calor)' : '  (no hay intercambio de calor)'));
    lC('Primera ley: Q − W = ' + fm(Q - W, 0) + ' J  =  ΔU = ' + fm(dU, 0) + ' J ✓   ·   γ = ' + fm(g, 3) + '   Cv = ' + fm(CV / R, 1) + ' R');
  }
  function mostrar() { sl.forEach(function (q_) { q_[1].parentNode.style.display = q_[0] ? '' : 'none'; }); sl[0][1].parentNode.style.display = proc === 1 ? 'none' : ''; sl[1][1].parentNode.style.display = proc === 1 ? '' : 'none'; }
  c.selector('Proceso', NOM, 0, function (i) { proc = i; if (listo) { mostrar(); calc(); } });
  c.selector('Gas', ['Monoatómico (Cv = 3R/2, γ = 5/3)', 'Diatómico (Cv = 5R/2, γ = 7/5)'], 0, function (i) { gas = i; if (listo) calc(); });
  sl.push([1, c.slider('Volumen final V₂ / V₁', 0.5, 3, 0.05, r, function (v) { r = v; calc(); }, function (v) { return fm(v, 2); })]);
  sl.push([1, c.slider('Presión final p₂ / p₁ (isocórico)', 0.4, 3, 0.05, q, function (v) { q = v; calc(); }, function (v) { return fm(v, 2); })]);
  sl.push([1, c.slider('Temperatura inicial T₁ (K)', 200, 500, 10, T1, function (v) { T1 = v; calc(); }, function (v) { return fm(v, 0) + ' K'; })]);
  eX = c.etiqueta('', 0, 0, 'r'); eY = c.etiqueta('', 0, 0, 'l'); eP = c.etiqueta('', 0, 0, 'c');
  c.leyenda([['var(--U)', 'proceso (trayectoria)', 'linea'], ['var(--X)', 'área = W (verde: W > 0; naranja: W < 0)', 'area'], ['var(--fg)', 'isoterma por el estado 1', 'linea'], ['var(--warn-b)', 'estado final', 'punto']]);
  c.alCambiarTema(function (p) { P = p; c.renderer.setClearColor(p.bg); if (!listo) return; clave = ''; calc(); });
  listo = true; mostrar(); calc();
});
