/* Pozo de potencial (tema 7): U(x), energía total E, K = E − U, puntos de retorno, equilibrios y F = −dU/dx. params: {"dim":2}.
   Curvas: resorte U = ½kx² (k = 10 N/m), pozo doble U = U₀[(x/a)⁴ − 2(x/a)²] (U₀ = 10 J, a = 1,2 m) y Lennard-Jones simplificado
   U = U₀[(r₀/x)¹² − 2(r₀/x)⁶] (U₀ = 10 J, r₀ = 1 m). Unidades: x en m, U en J, F en N. */
Interactivos.registrar('pozo-potencial', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var YL = -12, YH = 24;
  var curvas = [
    { n: 'Resorte  U = ½kx²  (k = 10 N/m)', x0: -2.3, x1: 2.3, fd: 0.75, Ed: 10, U: function (x) { return 5 * x * x; }, dU: function (x) { return 10 * x; } },
    { n: 'Pozo doble  U = U₀[(x/a)⁴ − 2(x/a)²]', x0: -2.2, x1: 2.2, fd: 0.75, Ed: -5, U: function (x) { var u = x / 1.2; return 10 * (u * u * u * u - 2 * u * u); }, dU: function (x) { var u = x / 1.2; return 10 * (4 * u * u * u - 4 * u) / 1.2; } },
    { n: 'Lennard-Jones simplificado  U = U₀[(r₀/x)¹² − 2(r₀/x)⁶]', x0: 0.8, x1: 4.5, fd: 0.08, Ed: -5, U: function (x) { var u = 1 / x, u6 = Math.pow(u, 6); return 10 * (u6 * u6 - 2 * u6); }, dU: function (x) { var u = 1 / x; return 10 * (-12 * Math.pow(u, 13) + 12 * Math.pow(u, 7)); } }
  ];
  var ic = 1, cv = curvas[ic], E = cv.Ed, f = cv.fd, kx = 1, w, clave = '', sE = null, sX = null;
  var ejes, curva, lineaE, regiones, caida, segK, flecha, pPart, pRet = [], pEq = [];
  var lU = c.lectura('U(x) en la posición elegida'), lK = c.lectura('Energía cinética K = E − U'), lF = c.lectura('Fuerza F = −dU/dx'),
      lR = c.lectura('Región permitida (puntos de retorno)'), lQ = c.lectura('Puntos de equilibrio');
  var fm = function (t, d) { return (Math.round(t * 100) / 100).toString().replace('-', '−').replace('.', ','); };
  var xr = function () { return cv.x0 + f * (cv.x1 - cv.x0); };

  function pool(arr, n, col, r, z) {
    while (arr.length < n) { var p = H.punto(T, 0, 0, r, col); p.position.z = z; c.scene.add(p); arr.push(p); }
    arr.forEach(function (p, i) { p.visible = i < n; });
  }
  function nuevo() {
    var k = ic + '|' + P.fg; if (k === clave && ejes) return; clave = k;
    [ejes, curva, lineaE, regiones, caida, segK, flecha, pPart].forEach(function (o) { if (o) c.scene.remove(o); });
    pRet.concat(pEq).forEach(function (p) { c.scene.remove(p); }); pRet = []; pEq = [];
    var D = cv.x1 - cv.x0 + 0.3; kx = 1.6 * (YH - YL) / D; c.escalaX(kx);
    var v = [(cv.x0 - 0.15) * kx, (cv.x1 + 0.15) * kx, YL, YH]; w = 0.0055 * (YH - YL); c.vista(v[0], v[1], v[2], v[3]);
    var dx = 1.5 * (v[1] - v[0]), dy = 1.5 * (v[3] - v[2]), vw = [v[0] - dx, v[1] + dx, v[2] - dy, v[3] + dy];
    ejes = H.ejes2D(T, vw, w, P.fg, P.bd, kx, 6); c.scene.add(ejes);
    curva = H.cinta(T, [], P.acc, w * 1.6); curva.position.z = 0.1; c.scene.add(curva);
    lineaE = H.cinta(T, [], P.mut, w * 1.0, [w * 5, w * 3]); lineaE.position.z = 0.12; c.scene.add(lineaE);
    regiones = H.cinta(T, [], P.L, w * 3); regiones.position.z = 0.08; c.scene.add(regiones);
    caida = H.cinta(T, [], P.mut, w * 0.9, [w * 3, w * 3]); caida.position.z = 0.2; c.scene.add(caida);
    segK = H.cinta(T, [], P.L, w * 2.6); segK.position.z = 0.3; c.scene.add(segK);
    flecha = H.flecha2D(T, P.A, w * 2.2); flecha.position.z = 0.5; c.scene.add(flecha);
    pPart = H.punto(T, 0, 0, w * 3.8, P.A); pPart.position.z = 0.7; c.scene.add(pPart);
    curva.set(H.grafica(function (X) { return cv.U(X / kx); }, cv.x0 * kx, cv.x1 * kx, 900, 1e9));
  }
  /* raíces de g(x) = 0 en [x0,x1] por cambios de signo y bisección */
  function raices(g) {
    var n = 3000, out = [], i, a, b, ga, gb, m, gm, it, xa = cv.x0, ga0 = g(xa);
    for (i = 1; i <= n; i++) {
      var xb = cv.x0 + (cv.x1 - cv.x0) * i / n, gb0 = g(xb);
      if (ga0 === 0) out.push(xa); else if (ga0 * gb0 < 0) {
        a = xa; b = xb; ga = ga0; gb = gb0;
        for (it = 0; it < 50; it++) { m = (a + b) / 2; gm = g(m); if (ga * gm <= 0) { b = m; gb = gm; } else { a = m; ga = gm; } }
        out.push((a + b) / 2);
      }
      xa = xb; ga0 = gb0;
    }
    return out;
  }
  function calc() {
    if (!segK) return;
    var x = xr(), U = cv.U(x), K = E - U, F = -cv.dU(x), ok = K >= 0;
    /* puntos de retorno y regiones permitidas */
    var tp = raices(function (X) { return E - cv.U(X); }), ext = [cv.x0].concat(tp, [cv.x1]), reg = [], i;
    for (i = 0; i + 1 < ext.length; i++) { var mid = (ext[i] + ext[i + 1]) / 2; if (E - cv.U(mid) > 0) reg.push([ext[i], ext[i + 1]]); }
    regiones.set(reg.map(function (r) { return [[r[0] * kx, E], [r[1] * kx, E]]; }));
    lineaE.set([[[cv.x0 * kx, E], [cv.x1 * kx, E]]]);
    pool(pRet, tp.length, P.W, w * 3.2, 0.6); tp.forEach(function (t, j) { pRet[j].mover(t * kx, E); pRet[j].material.color.set(P.W); });
    /* equilibrios */
    var eq = raices(function (X) { return cv.dU(X); }), h = 1e-4;
    pool(pEq, eq.length, P.fg, w * 3.2, 0.55);
    var ests = [], inests = [];
    eq.forEach(function (t, j) {
      var est = (cv.dU(t + h) - cv.dU(t - h)) > 0; (est ? ests : inests).push(t);
      pEq[j].mover(t * kx, cv.U(t)); pEq[j].material.color.set(est ? P.fg : P.E);
    });
    /* partícula, caída, segmento K y flecha de fuerza */
    pPart.mover(x * kx, U); pPart.material.color.set(ok ? P.A : P.W);
    caida.set([[[x * kx, 0], [x * kx, U]]]);
    segK.set(ok && K > 1e-9 ? [[[x * kx, U], [x * kx, E]]] : []);
    var W = (cv.x1 - cv.x0) * kx, L = Math.max(-0.3 * W, Math.min(0.3 * W, F * 0.012 * W));
    flecha.poner([x * kx, U], [x * kx + L, U]); flecha.material.color.set(ok ? P.A : P.W);
    lU(fm(U) + ' J   en x = ' + fm(x) + ' m');
    lK(ok ? fm(K) + ' J   (E = ' + fm(E) + ' J;  K + U = E)' : 'negativa: E < U, la partícula no puede estar aquí (región prohibida)');
    lF(fm(F) + ' N' + (Math.abs(F) < 0.005 ? '  (equilibrio)' : F > 0 ? '  (hacia +x: empuja hacia donde U baja)' : '  (hacia −x: empuja hacia donde U baja)'));
    lR(reg.length ? reg.map(function (r) {
      var a = r[0] <= cv.x0 + 1e-9 && ic !== 2 ? 'fuera de la gráfica' : r[0] <= cv.x0 + 1e-9 ? '…' : fm(r[0]), b = r[1] >= cv.x1 - 1e-9 ? (ic === 2 ? '∞ (escapa)' : 'fuera de la gráfica') : fm(r[1]);
      return '[' + a + ' ; ' + b + '] m';
    }).join('  y  ') : 'ninguna: E es menor que el mínimo de U');
    lQ((ests.length ? 'estable (mínimo) en x = ' + ests.map(fm).join(' ; ') + ' m' : 'sin mínimos') + '   |   ' + (inests.length ? 'inestable (máximo) en x = ' + inests.map(fm).join(' ; ') + ' m' : 'sin máximos'));
  }
  c.selector('Curva U(x)', curvas.map(function (q) { return q.n; }), ic, function (i) {
    ic = i; cv = curvas[i]; E = cv.Ed; f = cv.fd;
    if (!sE) return; nuevo();
    sE.value = E; sE.dispatchEvent(new Event('input')); sX.value = f; sX.dispatchEvent(new Event('input')); calc();
  });
  sE = c.slider('Energía total E (J)', YL, YH, 0.5, E, function (s) { E = s; calc(); });
  sX = c.slider('Posición de la partícula (fracción del dominio, 0 → 1)', 0, 1, 0.005, f, function (s) { f = s; calc(); },
    function (s) { return fm(cv.x0 + s * (cv.x1 - cv.x0)) + ' m'; });
  c.leyenda([['var(--acc)', 'U(x)', 'linea'], ['var(--mut)', 'energía total E', 'linea'], ['var(--X)', 'región permitida y K = E − U', 'linea'],
    ['var(--warn-b)', 'puntos de retorno (K = 0)', 'punto'], ['var(--fg)', 'equilibrio estable (mínimo)', 'punto'], ['var(--E)', 'equilibrio inestable (máximo)', 'punto'],
    ['var(--A)', 'partícula y fuerza F = −dU/dx', 'punto']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!ejes) return; clave = ''; nuevo(); calc();
  });
  nuevo(); calc();
});
