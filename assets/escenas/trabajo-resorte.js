/* Trabajo de un resorte (tema 6): área bajo F_x(x) = −kx entre x₁ y x₂ y teorema trabajo-energía. params: {"dim":2}. */
Interactivos.registrar('trabajo-resorte', function (c) {
  var T = c.THREE, H = c.H;
  var k = 200, x1 = 0.3, x2 = 0, m = 0.5, v1 = 0, P = c.colores(), w, clave = '', kx = 1;
  var ejes, curva, sombra, p1, p2;
  var lw = c.lectura('Trabajo del resorte  W = ½k(x₁² − x₂²)'), lk = c.lectura('Variación de energía cinética'), lv = c.lectura('Rapidez en x₂'), lf = c.lectura('Fuerza del resorte en x₁  ,  en x₂');
  var fm = function (t, d) { return (Math.round(t * 100) / 100).toString().replace('-', '−').replace('.', ','); };
  function nuevo() {
    var Y = H.techo(k * 0.4 * 1.15), kk = Y + '|' + P.fg; if (kk === clave && ejes) return; clave = kk;
    [ejes, curva, sombra, p1, p2].forEach(function (o) { if (o) c.scene.remove(o); });
    kx = 1.7 * 2 * Y / 1.0; c.escalaX(kx); var v = [-0.5 * kx, 0.5 * kx, -Y, Y]; w = 0.0055 * 2 * Y; c.vista(v[0], v[1], v[2], v[3]);
    var vw = [-2 * kx, 2 * kx, -4 * Y, 4 * Y]; ejes = H.ejes2D(T, vw, w, P.fg, P.bd, 0.1 * kx, H.paso(2 * Y, 8)); c.scene.add(ejes);
    curva = H.cinta(T, [], P.acc, w * 1.5); curva.position.z = 0.1; c.scene.add(curva);
    sombra = H.cinta(T, [], P.L, w * 0.9); sombra.position.z = 0.05; c.scene.add(sombra);
    p1 = H.punto(T, 0, 0, w * 2.8, P.fg); p2 = H.punto(T, 0, 0, w * 2.8, P.W); p1.position.z = 0.6; p2.position.z = 0.61; c.scene.add(p1, p2);
  }
  function calc() {
    nuevo(); curva.set([[[-2 * kx, 2 * k], [2 * kx, -2 * k]]]); var W = 0.5 * k * (x1 * x1 - x2 * x2), hs = [], i, s, n = 60;
    for (i = 0; i <= n; i++) { s = x1 + (x2 - x1) * i / n; hs.push([[s * kx, 0], [s * kx, -k * s]]); }
    sombra.set(hs); sombra.material.color.set(W >= 0 ? P.L : P.W); p1.mover(x1 * kx, -k * x1); p2.mover(x2 * kx, -k * x2);
    var v2c = v1 * v1 + 2 * W / m;
    lw(fm(W) + ' J' + (W > 0 ? '  (positivo: el resorte empuja en el sentido del movimiento)' : W < 0 ? '  (negativo: el resorte frena)' : ''));
    lk(fm(W) + ' J  (teorema trabajo-energía, solo actúa el resorte)');
    lv(v2c >= 0 ? fm(Math.sqrt(v2c)) + ' m/s' : 'no llega a x₂ (se detiene antes y vuelve)');
    lf(fm(-k * x1) + ' N  ,  ' + fm(-k * x2) + ' N');
  }
  c.slider('Constante k (N/m)', 50, 500, 50, k, function (s) { k = s; if (sombra) calc(); });
  c.slider('Posición inicial x₁ (m)', -0.4, 0.4, 0.05, x1, function (s) { x1 = s; if (sombra) calc(); });
  c.slider('Posición final x₂ (m)', -0.4, 0.4, 0.05, x2, function (s) { x2 = s; if (sombra) calc(); });
  c.slider('Masa m (kg)', 0.1, 2, 0.1, m, function (s) { m = s; if (sombra) calc(); });
  c.slider('Rapidez inicial v₁ (m/s)', 0, 10, 0.5, v1, function (s) { v1 = s; if (sombra) calc(); });
  c.leyenda([['var(--acc)', 'F_x = −kx (fuerza del resorte, N)', 'linea'], ['var(--X)', 'área = trabajo (signo según el sentido)', 'area']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!ejes) return; clave = ''; calc();
  });
  nuevo(); calc();
});
