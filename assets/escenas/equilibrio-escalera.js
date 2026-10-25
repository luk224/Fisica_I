/* Escalera apoyada en una pared lisa (tema 11; ejemplo 11.3 de U y Ejercicio 11.10). params: {"dim":2,"marcas":false}.
   Escalera uniforme de longitud L = 5,0 m con el pie en el origen; la pared (sin fricción) está a la derecha, a x = L cos θ.
   Un hombre de peso w_h está a una distancia s a lo largo de la escalera; la escalera pesa w_e (en su centro).
   Equilibrio:  n₂ = w_h + w_e;   torcas respecto al pie:  n₁·L sen θ = w_e·(L/2) cos θ + w_h·s cos θ;   fₛ = n₁;   μ mínimo = fₛ / n₂.
   Posición límite con el μ dado:  s_máx = (μ n₂ L sen θ − w_e (L/2) cos θ) / (w_h cos θ).
   Las flechas de fuerza llevan la misma escala (K metros por newton); el trazo corto marca el máximo μ·n₂ que aguanta la fricción. */
Interactivos.registrar('equilibrio-escalera', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), rad = Math.PI / 180, L = 5.0, K = 0.0022;
  var th = 53.1, s = 1.67, wh = 800, we = 180, mu = 0.40, listo = false, w = 0.0055 * 6.8;
  var suelo, pared, hach, escal, ahom, aW, aH, aN1, aN2, aF, lim, hombre, cm;
  var eN1, eN2, eF, eWh, eWe, eLim;
  var lN2 = c.lectura('Normal del suelo  n₂ = peso del hombre + peso de la escalera'), lN1 = c.lectura('Normal de la pared  n₁  (torcas respecto al pie)'),
      lF = c.lectura('Fricción necesaria  fₛ = n₁'), lMu = c.lectura('μₛ mínimo = fₛ / n₂'), lE = c.lectura('¿Resbala?'), lS = c.lectura('Hasta dónde puede subir sin resbalar');
  var f1 = function (x) { var q = Math.round(x * 10) / 10; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  var f2 = function (x) { var q = Math.round(x * 100) / 100; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  var fm = function (x) { return x.toFixed(2).replace('.', ','); };
  var f0 = function (x) { return String(Math.round(x)).replace('-', '−'); };

  function nuevo() {
    c.vista(-1.2, 7.4, -2.3, 5.7);
    suelo = H.cinta(T, [[[-1.1, 0], [7.2, 0]]], P.mut, w * 1.2); c.scene.add(suelo);
    pared = H.cinta(T, [], P.fg, w * 1.6); c.scene.add(pared);
    hach = H.cinta(T, [], P.mut, w * 0.7); c.scene.add(hach);
    escal = H.cinta(T, [], P.A, w * 2.6); escal.position.z = 0.1; c.scene.add(escal);
    hombre = H.punto(T, 0, 0, w * 5, P.A); hombre.position.z = 0.4; c.scene.add(hombre);
    cm = H.punto(T, 0, 0, w * 1.8, P.fg); cm.position.z = 0.4; c.scene.add(cm);
    aW = H.flecha2D(T, P.fg, w * 1.8); aH = H.flecha2D(T, P.fg, w * 2.2); aN1 = H.flecha2D(T, P.S, w * 1.8);
    aN2 = H.flecha2D(T, P.S, w * 1.8); aF = H.flecha2D(T, P.W, w * 1.8);
    [aW, aH, aN1, aN2, aF].forEach(function (a, i) { a.position.z = 0.3 + i * 0.01; c.scene.add(a); });
    lim = H.cinta(T, [], P.L, w * 1.6); lim.position.z = 0.35; c.scene.add(lim);
    eN1 = c.etiqueta('n₁', 0, 0, 'r'); eN2 = c.etiqueta('n₂', 0, 0, 'r'); eF = c.etiqueta('fₛ', 0, 0, 'l');
    eWh = c.etiqueta('peso hombre', 0, 0, 'l'); eWe = c.etiqueta('peso escalera', 0, 0, 'l'); eLim = c.etiqueta('μ n₂', 0, 0, 'l');
  }
  function calc() {
    if (!listo) return;
    var t = th * rad, co = Math.cos(t), si = Math.sin(t), xw = L * co, h = L * si;
    var n2 = wh + we, n1 = (we * (L / 2) * co + wh * s * co) / h, fs = n1, muMin = fs / n2, fmax = mu * n2, resbala = fs > fmax + 1e-9;
    var smax = wh > 0 ? (fmax * h - we * (L / 2) * co) / (wh * co) : Infinity;
    escal.set([[[0, 0], [xw, h]]]);
    pared.set([[[xw, 0], [xw, 5.7]]]);
    var hs = [], y; for (y = 0.4; y < 5.7; y += 0.45) hs.push([[xw, y], [xw + 0.28, y + 0.28]]); hach.set(hs);
    var hx = s * co, hy = s * si; hombre.mover(hx, hy + 0.0); cm.mover(xw / 2, h / 2);
    aW.poner([hx, hy], [hx, hy - K * wh]); aH.poner([xw / 2, h / 2 - 0.05], [xw / 2, h / 2 - 0.05 - K * we]);
    aN1.poner([xw, h], [xw - K * n1, h]); aN2.poner([0, 0], [0, K * n2]);
    aF.poner([0, 0], [K * fs, 0]);
    lim.set([[[K * fmax, -0.22], [K * fmax, 0.22]]]);
    eN1.mover(xw - K * n1 - 0.1, h + 0.05); eN1.ancla('r'); eN2.mover(-0.12, K * n2 * 0.55); eN2.ancla('r');
    eF.mover(0.14, 0.4); eWh.mover(hx + 0.12, hy - K * wh - 0.22); eWe.mover(xw / 2 + 0.12, h / 2 - K * we - 0.2); eLim.mover(K * fmax + 0.1, -0.4);
    eN1.poner('n₁ = ' + f0(n1) + ' N'); eN2.poner('n₂ = ' + f0(n2) + ' N'); eF.poner('fₛ = ' + f0(fs) + ' N' + (resbala ? '  ¡resbala!' : '')); eLim.poner('μ n₂ = ' + f0(fmax) + ' N');
    lN2(f0(n2) + ' N   (no depende de dónde esté el hombre)');
    lN1(f1(n1) + ' N');
    lF(f1(fs) + ' N   (el suelo solo puede dar hasta μ n₂ = ' + f0(fmax) + ' N)');
    lMu(fm(muMin) + '   (tú tienes μₛ = ' + fm(mu) + ')');
    lE(resbala ? 'SÍ: fₛ necesaria > μ n₂, la escalera desliza' : 'No: fₛ ≤ μ n₂, equilibrio');
    lS(!(wh > 0) ? 'sin hombre no hay límite' : smax >= L ? 'puede llegar arriba (s = ' + f2(L) + ' m)' : smax <= 0 ? 'ni siquiera con el hombre al pie (falta fricción)' : 'hasta s = ' + f2(smax) + ' m a lo largo de la escalera');
  }
  c.slider('Ángulo con el suelo θ (°)', 30, 80, 0.1, th, function (v) { th = v; calc(); }, function (v) { return f1(v) + '°'; });
  c.slider('Posición del hombre s (m a lo largo de la escalera)', 0, 5, 0.01, s, function (v) { s = v; calc(); }, function (v) { return f2(v) + ' m'; });
  c.slider('Peso del hombre (N)', 0, 1000, 10, wh, function (v) { wh = v; calc(); }, function (v) { return f0(v) + ' N'; });
  c.slider('Peso de la escalera (N)', 100, 400, 10, we, function (v) { we = v; calc(); }, function (v) { return f0(v) + ' N'; });
  c.slider('Coeficiente de fricción estática del suelo μₛ', 0.05, 1, 0.01, mu, function (v) { mu = v; calc(); }, function (v) { return fm(v); });
  c.leyenda([['var(--A)', 'escalera y hombre (peso en su punto)', 'linea'], ['var(--fg)', 'pesos', 'linea'], ['var(--U)', 'normales n₁ (pared) y n₂ (suelo)', 'linea'],
             ['var(--warn-b)', 'fricción fₛ en el pie', 'linea'], ['var(--X)', 'trazo verde: máximo que aguanta la fricción', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!listo) return;
    suelo.material.color.set(p.mut); pared.material.color.set(p.fg); hach.material.color.set(p.mut); escal.material.color.set(p.A);
    hombre.material.color.set(p.A); cm.material.color.set(p.fg); aW.material.color.set(p.fg); aH.material.color.set(p.fg); aN1.material.color.set(p.S); aN2.material.color.set(p.S); aF.material.color.set(p.W);
    lim.material.color.set(p.L); calc();
  });
  nuevo(); listo = true; calc();
});
