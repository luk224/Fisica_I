/* Plano inclinado con fricción (tema 5): DCL, ¿desliza o no? params: {"dim":2}. g = 9,8 m/s².
   Se levanta la rampa arrastrando su vértice superior (o con el deslizador); la línea a trazos marca el ángulo crítico tan θc = μₛ, y el bloque cambia de color al pasarlo. */
Interactivos.registrar('plano-inclinado', function (c) {
  var T = c.THREE, H = c.H, g = 9.8, rad = Math.PI / 180;
  var th = 30, m = 5, mus = 0.5, muk = 0.3, P = c.colores(), w, K = 4.6 / 98;
  var ejes, tri, blq, fW, fN, ff, fS, comp, arco, crit, sTh, eTh = c.etiqueta('θ', 0, 0, 'c'), eCr = c.etiqueta('', 0, 0, 'r');
  var le = c.lectura('Estado'), ln = c.lectura('n = mg cos θ'), lt = c.lectura('mg sen θ  (empuja cuesta abajo)'), lf = c.lectura('Fricción f'), la = c.lectura('Aceleración a');
  var fm = function (t) { return (Math.round(t * 100) / 100).toString().replace('-', '−').replace('.', ','); };
  function nuevo() {
    var v = [-1, 9, -1, 7.2]; w = 0.0055 * 8.2; c.vista(v[0], v[1], v[2], v[3]);
    ejes = H.ejes2D(T, [-40, 40, -40, 40], w, P.fg, P.bd, 2, 2); ejes.children[1].visible = false; c.scene.add(ejes);
    tri = H.cinta(T, [], P.fg, w * 1.6); blq = H.cinta(T, [], P.fg, w * 1.4); comp = H.cinta(T, [], P.mut, w, [w * 5, w * 3]); arco = H.cinta(T, [], P.acc, w * 1.2); crit = H.cinta(T, [], P.W, w * 0.9, [w * 5, w * 3]); c.scene.add(tri, blq, comp, arco, crit);
    fW = H.flecha2D(T, P.fg, w * 1.8); fN = H.flecha2D(T, P.S, w * 1.8); ff = H.flecha2D(T, P.W, w * 1.8); fS = H.flecha2D(T, P.L, w * 2.2);
    [fW, fN, ff, fS].forEach(function (f, i) { f.position.z = 0.3 + i * 0.01; c.scene.add(f); });
  }
  function calc() {
    var t = th * rad, s = Math.sin(t), co = Math.cos(t), W = m * g, N = W * co, emp = W * s, fmax = mus * N, desliza = emp > fmax + 1e-9;
    var fr = desliza ? muk * N : emp, acc = desliza ? g * (s - muk * co) : 0;
    var L = 8, ux = co, uy = s, nx = -s, ny = co, B = [L * co, 0], Tp = [L * co, L * s];
    tri.set([[[0, 0], B, Tp, [0, 0]]]); blq.material.color.set(desliza ? P.W : P.fg);
    var ar = [], i, tc = Math.atan(mus), Lc = 8.6; for (i = 0; i <= 24; i++) ar.push([2.2 * Math.cos(t * i / 24), 2.2 * Math.sin(t * i / 24)]);
    arco.set([ar]); crit.set([[[0, 0], [Lc * Math.cos(tc), Lc * Math.sin(tc)]]]);
    eTh.mover(2.9 * Math.cos(t / 2), 2.9 * Math.sin(t / 2) + 0.05); eTh.poner('θ = ' + th + '°');
    eCr.mover(Lc * Math.cos(tc), Lc * Math.sin(tc) + 0.45); eCr.poner('θ crítico = ' + fm(tc / rad) + '°');
    var q = 4.6, hx = q * ux + 0.5 * nx, hy = q * uy + 0.5 * ny, d = 0.5, cs = [[-d, -d], [d, -d], [d, d], [-d, d], [-d, -d]];
    blq.set([cs.map(function (p) { return [q * ux + p[0] * ux + (p[1] + d) * nx, q * uy + p[0] * uy + (p[1] + d) * ny]; })]);
    var cx = hx, cy = hy;
    fW.poner([cx, cy], [cx, cy - K * W]); fN.poner([cx, cy], [cx + K * N * nx, cy + K * N * ny]);
    ff.poner([cx, cy], [cx + K * fr * ux, cy + K * fr * uy]); var sf = emp - fr;
    fS.poner([cx, cy], [cx - K * sf * ux, cy - K * sf * uy]);
    comp.set([[[cx, cy], [cx - K * emp * ux, cy - K * emp * uy]], [[cx, cy], [cx - K * N * nx, cy - K * N * ny]]]);
    le(desliza ? 'Desliza cuesta abajo (mg sen θ > μₛ·n): f = μₖ·n' : 'Reposo (mg sen θ ≤ μₛ·n): f = mg sen θ, a = 0');
    ln(fm(N) + ' N'); lt(fm(emp) + ' N   (límite μₛ·n = ' + fm(fmax) + ' N)'); lf(fm(fr) + ' N'); la(fm(acc) + ' m/s²' + (desliza ? '  = g(sen θ − μₖ cos θ)' : ''));
  }
  sTh = c.slider('Ángulo θ (°)  — también arrastrando la rampa', 0, 60, 1, th, function (s) { th = s; if (fS) calc(); });
  c.slider('Masa m (kg)', 1, 10, 1, m, function (s) { m = s; if (fS) calc(); });
  c.slider('μₛ', 0.1, 1, 0.05, mus, function (s) { mus = s; if (muk > mus) muk = mus; if (fS) calc(); });
  c.slider('μₖ (≤ μₛ)', 0.05, 1, 0.05, muk, function (s) { muk = Math.min(s, mus); if (fS) calc(); });
  c.agarres([{ titulo: 'Arrastra para inclinar la rampa', x: function () { return [8 * Math.cos(th * rad), 8 * Math.sin(th * rad)]; },
    mover: function (wx, wy) { c.fijar(sTh, Math.max(0, Math.min(60, Math.atan2(wy, Math.max(wx, 1e-6)) / rad))); } }]);
  c.leyenda([['var(--fg)', 'peso mg', 'linea'], ['var(--U)', 'normal n', 'linea'], ['var(--warn-b)', 'fricción f', 'linea'], ['var(--X)', 'ΣF (cuesta abajo)', 'linea'], ['var(--mut)', 'componentes del peso (a trazos)', 'linea'], ['var(--warn-b)', 'ángulo crítico (a trazos): más allá desliza', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!ejes) return;
    ejes.userData.eje.color.set(p.fg); ejes.userData.rejilla.color.set(p.bd); tri.material.color.set(p.fg); blq.material.color.set(p.fg); comp.material.color.set(p.mut);
    arco.material.color.set(p.acc); crit.material.color.set(p.W); fW.material.color.set(p.fg); fN.material.color.set(p.S); ff.material.color.set(p.W); fS.material.color.set(p.L);
  });
  nuevo(); calc();
});
