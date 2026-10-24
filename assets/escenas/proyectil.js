/* Movimiento de proyectiles (tema 3): trayectoria, v con sus componentes y a = −g ĵ. params: {"dim":2}. g = 9,8 m/s². */
Interactivos.registrar('proyectil', function (c) {
  var T = c.THREE, H = c.H, g = 9.8, rad = Math.PI / 180;
  var v0 = 20, th = 40, h0 = 0, fr = 0.5, P = c.colores(), clave = '', w, S;
  var ejes, tray, pb, fv, fvx, fvy, fa, suelo;
  var lT = c.lectura('Tiempo de vuelo'), lR = c.lectura('Alcance'), lH = c.lectura('Altura máxima'), lt = c.lectura('Instante t'), lvv = c.lectura('v en ese instante'), lc = c.lectura('v_x  ,  v_y');
  var fm = function (t) { return (Math.round(t * 100) / 100).toString().replace('-', '−').replace('.', ','); };
  function dat() {
    var vx = v0 * Math.cos(th * rad), vy = v0 * Math.sin(th * rad), Tv = (vy + Math.sqrt(vy * vy + 2 * g * h0)) / g;
    return { vx: vx, vy: vy, T: Tv, R: vx * Tv, H: h0 + (vy > 0 ? vy * vy / (2 * g) : 0) };
  }
  function nuevo() {
    var d = dat(), L = H.techo(Math.max(d.R, d.H, 6) * 1.1), k = L + '|' + P.fg; if (k === clave && ejes) return; clave = k; S = L;
    [ejes, tray, pb, fv, fvx, fvy, fa].forEach(function (o) { if (o) c.scene.remove(o); });
    var v = [-0.05 * L, L, -0.12 * L, 0.75 * L]; w = 0.0055 * (v[3] - v[2]); c.vista(v[0], v[1], v[2], v[3]);
    var dx = 1.5 * (v[1] - v[0]), dy = 1.5 * (v[3] - v[2]), vw = [v[0] - dx, v[1] + dx, v[2] - dy, v[3] + dy], pa = H.paso(L, 8);
    ejes = H.ejes2D(T, vw, w, P.fg, P.bd, pa, pa); c.scene.add(ejes);
    tray = H.cinta(T, [], P.acc, w * 1.4, [w * 6, w * 3]); tray.position.z = 0.1; c.scene.add(tray);
    fvx = H.flecha2D(T, P.L, w * 1.3); fvy = H.flecha2D(T, P.A, w * 1.3); fv = H.flecha2D(T, P.S, w * 1.6); fa = H.flecha2D(T, P.W, w * 1.6);
    [fvx, fvy, fv, fa].forEach(function (f, i) { f.position.z = 0.3 + i * 0.01; c.scene.add(f); });
    pb = H.punto(T, 0, h0, w * 3.2, P.fg); pb.position.z = 0.6; c.scene.add(pb);
  }
  function calc() {
    nuevo(); var d = dat(), pts = [], i, t = d.T * fr;
    for (i = 0; i <= 120; i++) { var s = d.T * i / 120; pts.push([d.vx * s, h0 + d.vy * s - 0.5 * g * s * s]); }
    tray.set([pts]);
    var x = d.vx * t, y = h0 + d.vy * t - 0.5 * g * t * t, vy = d.vy - g * t, k = 0.22 * S / Math.max(v0, 1);
    pb.mover(x, y); fv.poner([x, y], [x + d.vx * k, y + vy * k]);
    fvx.poner([x, y], [x + d.vx * k, y]); fvy.poner([x, y], [x, y + vy * k]); fa.poner([x, y], [x, y - 0.14 * S]);
    lT(fm(d.T) + ' s'); lR(fm(d.R) + ' m'); lH(fm(d.H) + ' m'); lt(fm(t) + ' s');
    lvv(fm(Math.hypot(d.vx, vy)) + ' m/s, ' + fm(Math.atan2(vy, d.vx) / rad) + '° respecto a la horizontal'); lc(fm(d.vx) + ' , ' + fm(vy) + ' m/s');
  }
  c.slider('Rapidez inicial v₀ (m/s)', 5, 40, 1, v0, function (s) { v0 = s; if (tray) calc(); });
  c.slider('Ángulo inicial α₀ (°)', 0, 90, 1, th, function (s) { th = s; if (tray) calc(); });
  c.slider('Altura inicial y₀ (m)', 0, 30, 1, h0, function (s) { h0 = s; if (tray) calc(); });
  c.slider('Instante (fracción del vuelo)', 0, 1, 0.01, fr, function (s) { fr = s; if (tray) calc(); }, function (s) { return Math.round(s * 100) + ' %'; });
  c.leyenda([['var(--U)', 'v', 'linea'], ['var(--X)', 'vₓ (constante)', 'linea'], ['var(--A)', 'v_y', 'linea'], ['var(--warn-b)', 'a = −g ĵ (longitud fija, no a escala)', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!ejes) return; clave = ''; calc();
  });
  calc();
});
