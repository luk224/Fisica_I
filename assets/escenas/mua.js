/* Movimiento con aceleración constante (tema 2). params: {"dim":2,"modo":"xt"|"vt"}.
   xt: x(t) con su tangente (pendiente = v). vt: v(t) con el área sombreada (= desplazamiento). */
Interactivos.registrar('mua', function (c) {
  var T = c.THREE, H = c.H, vt = c.params.modo === 'vt', TM = 6;
  var x0 = 0, v0 = 4, a = 2, t0 = 3, P = c.colores(), w, clave = '', kx = 1, ejes, curva, tg, sombra, pt, vlin;
  var lx = c.lectura('x(t)'), lv = c.lectura('v(t)'), la = c.lectura('a'), ld = c.lectura(vt ? 'Área bajo v(t) de 0 a t = x − x₀' : 'Pendiente de la tangente = v');
  var fm = function (t) { return (Math.round(t * 100) / 100).toString().replace('-', '−').replace('.', ','); };
  var X = function (t) { return x0 + v0 * t + 0.5 * a * t * t; }, V = function (t) { return v0 + a * t; };
  var F = function (t) { return vt ? V(t) : X(t); };
  function nuevo() {
    var mx = 0, mn = 0, i, t; for (i = 0; i <= 60; i++) { t = TM * i / 60; mx = Math.max(mx, F(t)); mn = Math.min(mn, F(t)); }
    var Yh = H.techo(Math.max(mx * 1.1, 1)), Yl = mn < 0 ? H.techo(-mn * 1.1) : Yh * 0.15, Y = Yh + Yl, k = Yh + '|' + Yl + '|' + vt; if (k === clave && ejes) return false; clave = k;
    [ejes, curva, tg, sombra, pt].forEach(function (o) { if (o) c.scene.remove(o); });
    kx = 1.7 * Y / (TM + 1); c.escalaX(kx);
    var v = [-0.6 * kx, (TM + 0.4) * kx, -Yl, Yh]; w = 0.0055 * (v[3] - v[2]); c.vista(v[0], v[1], v[2], v[3]);
    var dx = 1.5 * (v[1] - v[0]), dy = 1.5 * (v[3] - v[2]), vw = [v[0] - dx, v[1] + dx, v[2] - dy, v[3] + dy];
    ejes = H.ejes2D(T, vw, w, P.fg, P.bd, kx, H.paso(Y, 7)); c.scene.add(ejes);
    curva = H.cinta(T, H.grafica(function (X) { return F(X / kx); }, vw[0], vw[1], 800, 1e9), P.acc, w * 1.5); curva.position.z = 0.1; c.scene.add(curva);
    sombra = H.cinta(T, [], P.L, w * 0.9); sombra.position.z = 0.05; c.scene.add(sombra);
    tg = H.cinta(T, [], P.W, w * 1.3); tg.position.z = 0.3; c.scene.add(tg);
    pt = H.punto(T, 0, 0, w * 2.8, P.W); pt.position.z = 0.6; c.scene.add(pt);
    return true;
  }
  function calc() {
    var y = F(t0), n = 70, hs = [], i, s;
    if (vt) { for (i = 0; i <= n; i++) { s = t0 * i / n; hs.push([[s * kx, 0], [s * kx, V(s)]]); } sombra.set(hs); tg.set([]); }
    else { sombra.set([]); var dx = 40; tg.set([[[(t0 - dx) * kx, y - V(t0) * dx], [(t0 + dx) * kx, y + V(t0) * dx]]]); }
    pt.mover(t0 * kx, y);
    lx(fm(X(t0)) + ' m'); lv(fm(V(t0)) + ' m/s'); la(fm(a) + ' m/s²');
    ld(vt ? fm(X(t0) - x0) + ' m  (= v₀t + ½at²)' : fm(V(t0)) + ' m/s');
  }
  function cambia() { if (!tg) return; nuevo(); calc(); }
  c.slider('x₀ (m)', -10, 10, 1, x0, function (s) { x0 = s; cambia(); });
  c.slider('v₀ (m/s)', -10, 10, 1, v0, function (s) { v0 = s; cambia(); });
  c.slider('a (m/s²)', -5, 5, 0.5, a, function (s) { a = s; cambia(); });
  c.slider('Instante t (s)', 0, TM, 0.1, t0, function (s) { t0 = s; if (tg) calc(); });
  c.leyenda(vt ? [['var(--acc)', 'v(t)', 'linea'], ['var(--X)', 'área = desplazamiento', 'area']] : [['var(--acc)', 'x(t)', 'linea'], ['var(--warn-b)', 'tangente (pendiente v)', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!ejes) return;
    ejes.userData.eje.color.set(p.fg); ejes.userData.rejilla.color.set(p.bd); curva.material.color.set(p.acc);
    sombra.material.color.set(p.L); tg.material.color.set(p.W); pt.material.color.set(p.W);
  });
  nuevo(); calc();
});
