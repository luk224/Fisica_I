/* Resorte + rampa con fricción (tema 7; problemas E 7.73, Examen Feb 2022 2ª P-1 y Sept 2024 P-1). params: {"dim":2,"marcas":false}.
   Un bloque se suelta desde el reposo contra un resorte comprimido (k = 2000 N/m, masa despreciable, no unido al bloque) en la base de una rampa.
   s = distancia recorrida por la rampa desde A. K(s) = U0 − Uel(s) − m·g·s·sen θ − μk·m·g·cos θ·s. Las cuatro «cuentas» (Uel, K, Ugrav y la energía interna ganada por fricción) suman siempre U0. */
Interactivos.registrar('energia-rampa', function (c) {
  var T = c.THREE, H = c.H, rad = Math.PI / 180, kres = 2000, LR = 15, CC = 1.2, D = 1.3;
  var m = 1.5, th = 30, mu = 0.5, U0 = 119, s = 6, g = 9.8, P = c.colores(), w;
  var ejes, suelo, pared, muelle, blq, barras = [], marco, pA;
  var lS = c.lectura('Recorrido s por la rampa desde A'), lX = c.lectura('Compresión del resorte'), lUe = c.lectura('Energía potencial elástica'),
      lK = c.lectura('Energía cinética K (rapidez v)'), lUg = c.lectura('Energía potencial gravitatoria = m·g·s·sen θ'),
      lQ = c.lectura('Energía interna ganada por fricción ΔU int = μk·m·g·cos θ·s'), lT = c.lectura('Suma: elástica + cinética + gravitatoria + interna'), lE = c.lectura('Estado');
  var fm = function (t) { return (Math.round(t * 100) / 100).toString().replace('-', '−').replace('.', ','); };
  var f1 = function (t) { return (Math.round(t * 10) / 10).toString().replace('-', '−').replace('.', ','); };

  function nuevo() {
    var v = [-1.5, 16.5, -5.2, 14.4]; w = 0.0055 * 19.6; c.vista(v[0], v[1], v[2], v[3]);
    ejes = H.ejes2D(T, [-40, 40, -40, 40], w, P.fg, P.bd, 2, 2); ejes.visible = false; c.scene.add(ejes);
    suelo = H.cinta(T, [], P.fg, w * 1.6); pared = H.cinta(T, [], P.fg, w * 1.6); muelle = H.cinta(T, [], P.mut, w * 1.5); blq = H.cinta(T, [], P.fg, w * 1.4);
    marco = H.cinta(T, [], P.mut, w * 1.0);
    c.scene.add(suelo, pared, muelle, blq, marco);
    pA = H.punto(T, 0, 0, w * 2.2, P.mut); pA.position.z = 0.2; c.scene.add(pA);
    [P.acc, P.L, P.A, P.W].forEach(function (col, i) { var b = H.cinta(T, [], col, 0.2); b.position.z = 0.1 + i * 0.01; barras.push(b); c.scene.add(b); });
  }
  /* energía cinética K(s) para el modelo actual */
  function Kde(q, x0) {
    var t = th * rad, Ue = q < x0 ? 0.5 * kres * (x0 - q) * (x0 - q) : 0;
    return U0 - Ue - m * g * q * Math.sin(t) - mu * m * g * Math.cos(t) * q;
  }
  function calc() {
    if (!blq) return;
    var t = th * rad, sn = Math.sin(t), cs = Math.cos(t), x0 = Math.sqrt(2 * U0 / kres), u = [cs, sn], n = [-sn, cs], i;
    /* distancia de parada: primer s > 0 con K < 0 (si la fuerza inicial del resorte no vence a peso + fricción, no se mueve) */
    var stop = LR - CC - D, mueve = kres * x0 > m * g * (sn + mu * cs) + 1e-9;
    if (!mueve) stop = 0;
    else { for (i = 1; i <= 7000; i++) { var q = i * 0.002; if (q > stop) break; if (Kde(q, x0) < 0) { var a = q - 0.002, b = q, it; for (it = 0; it < 40; it++) { var mm = (a + b) / 2; if (Kde(mm, x0) < 0) b = mm; else a = mm; } stop = (a + b) / 2; break; } } }
    var se = Math.min(s, stop), parado = s > stop + 1e-9 || !mueve;
    var Ue = se < x0 ? 0.5 * kres * (x0 - se) * (x0 - se) : 0, Ug = m * g * se * sn, Q = mu * m * g * cs * se, K = Math.max(0, U0 - Ue - Ug - Q);
    /* geometría */
    var pt = function (q, h) { return [q * u[0] + h * n[0], q * u[1] + h * n[1]]; };
    suelo.set([[pt(0, 0), pt(LR, 0), [LR * cs, 0], [0, 0]]]);
    pared.set([[pt(0, 0), pt(0, 2.4)]]);
    var qb = CC + se, qm = Math.min(qb, CC + x0), zz = [pt(0, 0.65)], N = 12;
    for (i = 1; i < N; i++) zz.push(pt(qm * i / N, 0.65 + (i % 2 ? 0.4 : -0.4))); zz.push(pt(qm, 0.65));
    muelle.set([zz]);
    blq.set([[pt(qb, 0), pt(qb + D, 0), pt(qb + D, D), pt(qb, D), pt(qb, 0)]]);
    pA.mover(pt(CC, 0)[0] - 0.0, pt(CC, 0)[1] - 0.5);
    /* barra apilada de energía: longitud total LB = energía elástica inicial */
    var X0 = 0.3, LB = 14.4, yB = -2.9, acc = 0, vals = [Ue, K, Ug, Q], ten = U0 > 1e-9;
    barras.forEach(function (b, j) {
      var w1 = ten ? LB * vals[j] / U0 : 0, ls = [], yy;
      if (w1 > 0.25) for (yy = yB - 1.0; yy <= yB + 1.01; yy += 0.18) ls.push([[X0 + acc + 0.1, yy], [X0 + acc + w1 - 0.1, yy]]);
      b.set(ls); acc += w1;
    });
    marco.set([[[X0, yB - 1.3], [X0, yB + 1.3]], [[X0 + LB, yB - 1.3], [X0 + LB, yB + 1.3]], [[X0, yB + 1.3], [X0 + LB, yB + 1.3]], [[X0, yB - 1.3], [X0 + LB, yB - 1.3]]]);
    /* lecturas */
    lS(fm(se) + ' m' + (parado ? '  (el bloque se detiene aquí)' : ''));
    lX(se < x0 ? fm(x0 - se) + ' m  (inicial ' + fm(x0) + ' m, k = 2000 N/m)' : '0  (resorte en su longitud natural; el bloque ya no lo toca)');
    lUe(fm(Ue) + ' J'); lK(fm(K) + ' J   (v = ' + fm(Math.sqrt(2 * K / m)) + ' m/s)'); lUg(fm(Ug) + ' J'); lQ(fm(Q) + ' J');
    lT(fm(Ue + K + Ug + Q) + ' J  =  energía elástica inicial ' + fm(U0) + ' J  (la energía total se conserva)');
    lE(!mueve ? 'La fuerza del resorte no vence a mg·sen θ + fricción: el bloque no se mueve.' : parado ? 'K = 0: se detiene (aquí acaba el modelo).' : se < x0 ? 'El resorte aún empuja al bloque.' : 'Resorte relajado: solo actúan peso y fricción.');
  }
  c.slider('Masa m (kg)', 0.5, 5, 0.1, m, function (v) { m = v; calc(); }, function (v) { return f1(v) + ' kg'; });
  c.slider('Ángulo de la rampa θ (°)', 10, 60, 1, th, function (v) { th = v; calc(); }, function (v) { return v + '°'; });
  c.slider('Fricción cinética μk', 0, 1, 0.05, mu, function (v) { mu = v; calc(); }, fm);
  c.slider('Energía elástica inicial del resorte (J)', 0, 200, 0.1, U0, function (v) { U0 = v; calc(); }, function (v) { return f1(v) + ' J'; });
  c.slider('Recorrido s desde A (m)', 0, 12, 0.05, s, function (v) { s = v; calc(); }, function (v) { return fm(v) + ' m'; });
  c.selector('Valor de g', ['9,80 m/s²', '9,81 m/s²'], 0, function (i) { g = i ? 9.81 : 9.8; calc(); });
  c.leyenda([['var(--acc)', 'energía elástica del resorte', 'area'], ['var(--X)', 'energía cinética K', 'area'], ['var(--A)', 'energía potencial gravitatoria (altura ganada)', 'area'], ['var(--warn-b)', 'energía interna ganada por fricción (−W de la fricción)', 'area'],
    ['var(--mut)', 'barra completa = energía elástica inicial', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!blq) return;
    ejes.userData.eje.color.set(p.fg); ejes.userData.rejilla.color.set(p.bd); suelo.material.color.set(p.fg); pared.material.color.set(p.fg); blq.material.color.set(p.fg);
    muelle.material.color.set(p.mut); marco.material.color.set(p.mut); pA.material.color.set(p.mut);
    [p.acc, p.L, p.A, p.W].forEach(function (col, i) { barras[i].material.color.set(col); });
  });
  nuevo(); calc();
});
