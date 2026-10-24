/* Movimiento circular uniforme (tema 3): v tangente, a_rad hacia el centro. params: {"dim":2}. */
Interactivos.registrar('circulo', function (c) {
  var T = c.THREE, H = c.H, R = 2, Tp = 4, ph = 30, on = false, tok = 0, P = c.colores(), w;
  var ejes, circ, rad, pb, fv, fa, sl;
  var lw = c.lectura('ω = 2π/T'), lv = c.lectura('v = ωR = 2πR/T'), la = c.lectura('a_rad = v²/R = ω²R'), lp = c.lectura('Posición (x , y)');
  var fm = function (t) { return (Math.round(t * 100) / 100).toString().replace('-', '−').replace('.', ','); };
  function nuevo() {
    var v = [-6, 6, -6, 6]; w = 0.0055 * 12; c.vista(v[0], v[1], v[2], v[3]);
    ejes = H.ejes2D(T, [-24, 24, -24, 24], w, P.fg, P.bd, 1, 1); c.scene.add(ejes);
    circ = H.cinta(T, [], P.mut, w * 1.2, [w * 5, w * 3]); circ.position.z = 0.1; c.scene.add(circ);
    rad = H.cinta(T, [], P.mut, w * 0.8); rad.position.z = 0.1; c.scene.add(rad);
    fv = H.flecha2D(T, P.S, w * 1.8); fa = H.flecha2D(T, P.W, w * 1.8); fv.position.z = 0.3; fa.position.z = 0.31; c.scene.add(fv, fa);
    pb = H.punto(T, 0, 0, w * 3.4, P.fg); pb.position.z = 0.6; c.scene.add(pb);
  }
  function calc() {
    var f = ph * Math.PI / 180, om = 2 * Math.PI / Tp, vv = om * R, ar = om * om * R, x = R * Math.cos(f), y = R * Math.sin(f), pts = [], i;
    for (i = 0; i <= 90; i++) pts.push([R * Math.cos(2 * Math.PI * i / 90), R * Math.sin(2 * Math.PI * i / 90)]);
    circ.set([pts]); rad.set([[[0, 0], [x, y]]]); pb.mover(x, y);
    fv.poner([x, y], [x - 1.8 * Math.sin(f), y + 1.8 * Math.cos(f)]); fa.poner([x, y], [x - 1.8 * Math.cos(f), y - 1.8 * Math.sin(f)]);
    lw(fm(om) + ' rad/s'); lv(fm(vv) + ' m/s'); la(fm(ar) + ' m/s²'); lp('(' + fm(x) + ' , ' + fm(y) + ') m');
  }
  c.slider('Radio R (m)', 1, 5, 0.5, R, function (s) { R = s; if (circ) calc(); });
  c.slider('Periodo T (s)', 1, 10, 0.5, Tp, function (s) { Tp = s; if (circ) calc(); });
  c.reproductor({ max: 360, valor: ph, paso: 1, vel: function () { return 180 / Tp; }, ciclico: true, etiqueta: 'Posición angular', fmt: function (v) { return Math.round(v) + '°'; }, cb: function (v) { ph = v; if (circ) calc(); } });
  c.leyenda([['var(--U)', 'v (tangente; longitud fija)', 'linea'], ['var(--warn-b)', 'a_rad (hacia el centro; longitud fija)', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!ejes) return;
    ejes.userData.eje.color.set(p.fg); ejes.userData.rejilla.color.set(p.bd); circ.material.color.set(p.mut); rad.material.color.set(p.mut);
    fv.material.color.set(p.S); fa.material.color.set(p.W); pb.material.color.set(p.fg);
  });
  nuevo(); calc();
});
