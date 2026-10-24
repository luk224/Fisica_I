/* Segunda ley de Newton en 2D (tema 4): dos fuerzas sobre un cuerpo, ΣF y a = ΣF/m. params: {"dim":2}. */
Interactivos.registrar('fuerzas', function (c) {
  var T = c.THREE, H = c.H, rad = Math.PI / 180;
  var F1 = 10, a1 = 0, F2 = 8, a2 = 90, m = 2, P = c.colores(), w;
  var ejes, f1, f2, fs, p1, p2, bloque;
  var ls = c.lectura('ΣF (componentes)'), lm = c.lectura('|ΣF| y dirección'), la = c.lectura('a = ΣF/m');
  var fm = function (t) { return (Math.round(t * 100) / 100).toString().replace('-', '−').replace('.', ','); };
  function nuevo() {
    var v = [-16, 16, -16, 16]; w = 0.0055 * 32; c.vista(v[0], v[1], v[2], v[3]);
    ejes = H.ejes2D(T, [-64, 64, -64, 64], w, P.fg, P.bd, 2, 2); c.scene.add(ejes);
    p1 = H.cinta(T, [], P.mut, w * 0.8, [w * 5, w * 3]); p2 = H.cinta(T, [], P.mut, w * 0.8, [w * 5, w * 3]); c.scene.add(p1, p2);
    f1 = H.flecha2D(T, P.S, w * 1.8); f2 = H.flecha2D(T, P.A, w * 1.8); fs = H.flecha2D(T, P.W, w * 2.2);
    f1.position.z = 0.3; f2.position.z = 0.31; fs.position.z = 0.32; c.scene.add(f1, f2, fs);
    bloque = H.punto(T, 0, 0, w * 4.5, P.fg); bloque.position.z = 0.6; c.scene.add(bloque);
  }
  function calc() {
    var x1 = F1 * Math.cos(a1 * rad), y1 = F1 * Math.sin(a1 * rad), x2 = F2 * Math.cos(a2 * rad), y2 = F2 * Math.sin(a2 * rad), sx = x1 + x2, sy = y1 + y2, mod = Math.hypot(sx, sy);
    f1.poner([0, 0], [x1, y1]); f2.poner([0, 0], [x2, y2]); fs.poner([0, 0], [sx, sy]);
    p1.set([[[x1, y1], [sx, sy]]]); p2.set([[[x2, y2], [sx, sy]]]);
    ls('(' + fm(sx) + ' , ' + fm(sy) + ') N'); lm(fm(mod) + ' N' + (mod > 1e-6 ? ', ' + fm(Math.atan2(sy, sx) / rad) + '°' : '  (equilibrio: ΣF = 0, a = 0)'));
    la(fm(mod / m) + ' m/s²' + (mod > 1e-6 ? ' en la misma dirección que ΣF' : ''));
  }
  c.slider('F₁ (N)', 0, 15, 0.5, F1, function (s) { F1 = s; if (fs) calc(); });
  c.slider('Ángulo de F₁ (°)', -180, 180, 1, a1, function (s) { a1 = s; if (fs) calc(); });
  c.slider('F₂ (N)', 0, 15, 0.5, F2, function (s) { F2 = s; if (fs) calc(); });
  c.slider('Ángulo de F₂ (°)', -180, 180, 1, a2, function (s) { a2 = s; if (fs) calc(); });
  c.slider('Masa m (kg)', 0.5, 10, 0.5, m, function (s) { m = s; if (fs) calc(); });
  c.leyenda([['var(--U)', 'F₁', 'linea'], ['var(--A)', 'F₂', 'linea'], ['var(--warn-b)', 'ΣF = F₁ + F₂', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!ejes) return;
    ejes.userData.eje.color.set(p.fg); ejes.userData.rejilla.color.set(p.bd); p1.material.color.set(p.mut); p2.material.color.set(p.mut);
    f1.material.color.set(p.S); f2.material.color.set(p.A); fs.material.color.set(p.W); bloque.material.color.set(p.fg);
  });
  nuevo(); calc();
});
