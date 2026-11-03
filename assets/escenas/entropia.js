/* Entropía (tema 20, §20.7-20.8; ec. 20.18, 20.19, 20.22, 20.23 y ejemplos 20.8, 20.10, 20.11 de U). params: {"dim":2,"marcas":false}.
   Modo 0 «Mezcla de dos masas de agua» (ej. 20.10): m1 = m2 = 1,00 kg, c = 4190 J/(kg·K); Tf = (T1 + T2)/2 (calorimetría);
        ΔS_i = m c ln(Tf/T_i);  ΔS_total = m c ln(Tf²/(T1·T2)) ≥ 0, = 0 solo si T1 = T2.
   Modo 1 «Expansión libre y microestados» (ej. 20.8 y 20.11): n = 1 mol de gas ideal pasa de V1 a V2 = r·V1 sin trabajo ni calor;
        ΔS = nR ln r (camino isotermo reversible); w2/w1 = r^N, ΔS = k ln(w2/w1) = N k ln r = nR ln r. */
Interactivos.registrar('entropia', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), listo = false, modo = 0, clave = '';
  var R = 8.314, m = 1, cw = 4190;
  var T1 = 373.15, T2 = 273.15, rr = 2;
  var eV0, eV1, eV2, ejes, barras = [], curva, ref, puntos = [], caja, tabique, pu, ticks = [], eX, eY, eA, eB, eC, eD, sl = [], U0 = [];
  var l1 = c.lectura(''), l2 = c.lectura(''), l3 = c.lectura(''), l4 = c.lectura('');
  var fm = function (x, d) { return x.toFixed(d).replace('.', ',').replace(/^-/, '−'); };
  var NP = 70, ux = [], uy = [], s = 12345, i0;
  function rnd() { s = (s * 16807) % 2147483647; return s / 2147483647; }
  for (i0 = 0; i0 < NP; i0++) { ux.push(rnd()); uy.push(rnd()); }
  function limpiar() {
    [ejes, curva, ref, caja, tabique, pu].forEach(function (o) { if (o) c.scene.remove(o); });
    barras.forEach(function (o) { c.scene.remove(o); }); barras = [];
    puntos.forEach(function (o) { c.scene.remove(o); }); puntos = [];
  }
  function construir() {
    var k = modo + '|' + P.fg + P.bg + P.S + P.W + P.L + P.A + P.E; if (k === clave && ejes) return; clave = k; limpiar();
    c.vista(-1.1, 9.0, -0.8, 5.3); var w = 0.03, i;
    ticks.forEach(function (e) { e.ver(false); }); [eV0, eV1, eV2].forEach(function (e) { e.ver(false); });
    ejes = new T.Group();
    if (modo === 0) {
      var b = H.cinta(T, [[[0, 2.3], [7.4, 2.3]], [[0, 0], [0, 4.6]]], P.fg, w); b.position.z = -0.2; ejes.add(b); c.scene.add(ejes);
      [P.S, P.A, P.fg].forEach(function (col) { var bb = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ color: col })); bb.position.z = 0.1; c.scene.add(bb); barras.push(bb); });
      eX.poner(''); eY.poner('ΔS (J/K)'); eY.mover(0.1, 4.95);
    } else {
      var b2 = H.cinta(T, [[[0, 0], [7.4, 0]], [[0, 0], [0, 2.6]]], P.fg, w); b2.position.z = -0.2; ejes.add(b2); c.scene.add(ejes);
      caja = H.cinta(T, [[[0, 3.3], [7.4, 3.3], [7.4, 4.6], [0, 4.6], [0, 3.3]]], P.fg, w * 1.5); caja.position.z = 0.1; c.scene.add(caja);
      tabique = H.cinta(T, [], P.mut || P.fg, w * 1.4, [w * 4, w * 3]); tabique.position.z = 0.1; c.scene.add(tabique);
      curva = H.cinta(T, [], P.fg, w * 2.2); curva.position.z = 0.12; c.scene.add(curva);
      ref = H.cinta(T, [], P.fg, w * 0.9, [w * 4, w * 3]); ref.position.z = 0.05; c.scene.add(ref);
      pu = H.punto(T, 0, 0, w * 4, P.W); pu.position.z = 0.5; c.scene.add(pu);
      for (i = 0; i < NP; i++) { var p = H.punto(T, 0, 0, w * 2.2, P.acc); p.position.z = 0.3; c.scene.add(p); puntos.push(p); }
      eX.poner('V₂ / V₁ (el mismo eje de la caja)'); eX.mover(7.4, -0.5); eY.poner('ΔS = nR ln r  (J/K)'); eY.mover(0.1, 2.95);
    }
  }
  function calc() {
    if (!listo) return; construir(); var i;
    if (modo === 0) {
      var Tf = (T1 + T2) / 2, S1 = m * cw * Math.log(Tf / T1), S2 = m * cw * Math.log(Tf / T2), St = S1 + S2, sc = 2.1 / 900, y0 = 2.3;
      var xs = [1.2, 3.7, 6.2], vs = [S1, S2, St];
      barras.forEach(function (bb, j) { var h = vs[j] * sc; bb.scale.set(1.2, Math.max(Math.abs(h), 0.004), 1); bb.position.set(xs[j], y0 + h / 2, 0.1); });
      var txs = [eV0, eV1, eV2]; txs.forEach(function (e, j) { e.poner((vs[j] >= 0 ? '+' : '−') + fm(Math.abs(vs[j]), 0) + ' J/K'); e.mover(xs[j], y0 + vs[j] * sc + (vs[j] >= 0 ? 0.28 : -0.28)); e.ver(true); });
      eA.poner('cuerpo caliente'); eA.mover(xs[0], -0.45); eB.poner('cuerpo frío'); eB.mover(xs[1], -0.45);
      eC.poner('total'); eC.mover(xs[2], -0.45); eD.poner(''); eA.ver(true); eB.ver(true); eC.ver(true);
      l1('Dos masas de agua de 1,00 kg a T₁ = ' + fm(T1, 1) + ' K (caliente) y T₂ = ' + fm(T2, 1) + ' K (fría)  ⇒  Tf = (T₁ + T₂)/2 = ' + fm(Tf, 1) + ' K (' + fm(Tf - 273.15, 1) + ' °C)');
      l2('ΔS caliente = m c ln(Tf/T₁) = ' + fm(S1, 1) + ' J/K   (pierde entropía)');
      l3('ΔS fría = m c ln(Tf/T₂) = ' + fm(S2, 1) + ' J/K   (gana más de la que pierde el caliente)');
      l4('ΔS total = ' + fm(St, 1) + ' J/K ' + (St > 0.05 ? '> 0: proceso irreversible (con 100 °C y 0 °C: +102 J/K, ej. 20.10). Acerca T₁ a T₂ y tiende a 0 (límite reversible).' : '≈ 0: casi sin diferencia de temperatura, proceso casi reversible.'));
    } else {
      var L1 = 1.233, S = R * Math.log(rr), ys = 2.5 / 16, pts = [], ps = [];
      tabique.set([[[L1, 3.3], [L1, 4.6]]]);
      for (i = 0; i <= 80; i++) { var r = 1 + 5 * i / 80; pts.push([r * L1, R * Math.log(r) * ys]); }
      curva.set([pts]); ref.set([[[rr * L1, 0], [rr * L1, S * ys]], [[0, S * ys], [rr * L1, S * ys]]]); pu.mover(rr * L1, S * ys);
      for (i = 0; i < NP; i++) puntos[i].mover(0.08 + ux[i] * (rr * L1 - 0.16), 3.38 + uy[i] * 1.14);
      eA.poner('V₁'); eA.mover(L1 * 0.5, 3.0); eB.poner('V₂ = ' + fm(rr, 2) + ' V₁'); eB.mover(rr * L1 * 0.5 + 0.0, 4.9);
      eC.poner('ΔS = ' + fm(S, 2) + ' J/K'); eC.mover(rr * L1 + 0.12, S * ys + 0.3); eC.ancla('l'); eD.poner('1'); eD.mover(L1, -0.3);
      eA.ver(true); eB.ver(true); eC.ver(true); eD.ver(true);
      var lnw = 6.022e23 * Math.log(rr);
      l1('1 mol de gas ideal pasa de V₁ a V₂ = r V₁ con r = ' + fm(rr, 2) + ' (expansión libre: Q = 0, W = 0, ΔU = 0, T no cambia). Es irreversible: ΔS ≠ Q/T = 0.');
      l2('Camino reversible con los mismos extremos (isoterma):  ΔS = nR ln(V₂/V₁) = 8,314 · ln ' + fm(rr, 2) + ' = ' + fm(S, 2) + ' J/K  (con r = 2: 5,76 J/K, ej. 20.8)');
      l3('Microscópico:  w₂/w₁ = r^N ⇒ ln(w₂/w₁) = N ln r = ' + fm(lnw / 1e23, 2) + '·10²³' + '  (N = 6,022·10²³ moléculas)   ⇒   ΔS = k ln(w₂/w₁) = nR ln r');
      l4('Probabilidad de que todas las moléculas vuelvan a V₁: (1/r)^N = e^(−' + fm(lnw / 1e23, 2) + '·10²³): imposible en la práctica, por eso el proceso no se invierte solo. (Los puntos son solo ' + NP + ' moléculas ilustrativas.)');
    }
  }
  function mostrar() { sl[0][1].parentNode.style.display = modo === 0 ? '' : 'none'; sl[1][1].parentNode.style.display = modo === 0 ? '' : 'none'; sl[2][1].parentNode.style.display = modo === 1 ? '' : 'none'; }
  c.selector('Qué se muestra', ['Mezcla de dos masas de agua (ej. 20.10)', 'Expansión libre y microestados (ej. 20.8 y 20.11)'], 0, function (i) { modo = i; if (listo) { clave = ''; mostrar(); calc(); c.pedir(); } });
  sl.push([0, c.slider('Temperatura del cuerpo caliente T₁ (K)', 273.15, 400, 1, T1, function (v) { T1 = v; if (T2 > T1) T2 = T1; calc(); }, function (v) { return fm(v, 0) + ' K'; })]);
  sl.push([0, c.slider('Temperatura del cuerpo frío T₂ (K)', 273.15, 400, 1, T2, function (v) { T2 = Math.min(v, T1); calc(); }, function (v) { return fm(Math.min(v, T1), 0) + ' K'; })]);
  sl.push([1, c.slider('Razón de volúmenes r = V₂ / V₁', 1, 6, 0.05, rr, function (v) { rr = v; calc(); }, function (v) { return fm(v, 2); })]);
  eV0 = c.etiqueta('', 0, 0, 'c'); eV1 = c.etiqueta('', 0, 0, 'c'); eV2 = c.etiqueta('', 0, 0, 'c');
  eX = c.etiqueta('', 0, 0, 'r'); eY = c.etiqueta('', 0, 0, 'l'); eA = c.etiqueta('', 0, 0, 'c'); eB = c.etiqueta('', 0, 0, 'c'); eC = c.etiqueta('', 0, 0, 'c'); eD = c.etiqueta('', 0, 0, 'c');
  c.leyenda([['var(--U)', 'modo 1: ΔS del cuerpo caliente (negativa)', 'area'], ['var(--A)', 'modo 1: ΔS del cuerpo frío (positiva)', 'area'], ['var(--fg)', 'modo 1: ΔS total · modo 2: curva ΔS = nR ln r', 'linea'], ['var(--acc)', 'modo 2: moléculas (ilustrativas)', 'punto'], ['var(--warn-b)', 'modo 2: estado actual', 'punto']]);
  c.alCambiarTema(function (p) { P = p; c.renderer.setClearColor(p.bg); if (!listo) return; clave = ''; calc(); });
  listo = true; mostrar(); calc();
});
