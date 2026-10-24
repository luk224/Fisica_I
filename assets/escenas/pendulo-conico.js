/* Péndulo cónico (tema 5, Ej. 5.20): tensión F, a_rad = g tan β, periodo. 3D. m = 1 kg, g = 9,8 m/s². */
Interactivos.registrar('pendulo-conico', function (c) {
  var T = c.THREE, H = c.H, g = 9.8, Zc = 3.4, K = 0.09, rad = Math.PI / 180;
  var L = 2, be = 30, ph = 0, on = false, tok = 0, P = c.colores(), sl;
  var techo, eje, hilo, trayec, bola, fW, fF, fR, suelo;
  var lR = c.lectura('Radio R = L sen β'), lF = c.lectura('Tensión F = mg / cos β (m = 1 kg)'), la = c.lectura('a_rad = g tan β'), lv = c.lectura('Rapidez v = √(g R tan β)'), lp = c.lectura('Periodo T = 2π√(L cos β / g)');
  var fm = function (t) { return (Math.round(t * 100) / 100).toString().replace('-', '−').replace('.', ','); };
  function nuevo() {
    suelo = new T.GridHelper(8, 8, P.mut, P.bd); suelo.rotation.x = Math.PI / 2; suelo.position.z = 0; c.scene.add(suelo);
    techo = new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 0.06, 24), new T.MeshBasicMaterial({ color: P.mut })); techo.rotation.x = Math.PI / 2; techo.position.set(0, 0, Zc + 0.03); c.scene.add(techo);
    eje = H.tubo(T, [[0, 0, 0], [0, 0, Zc]], 0.012, P.mut); c.scene.add(eje);
    hilo = H.tubo(T, [], 0.02, P.fg); trayec = H.tubo(T, [], 0.015, P.acc); c.scene.add(hilo, trayec);
    bola = new T.Mesh(new T.SphereGeometry(0.16, 20, 14), new T.MeshStandardMaterial({ color: P.fg })); c.scene.add(bola);
    fW = H.flecha(T, P.fg, 0.03); fF = H.flecha(T, P.S, 0.03); fR = H.flecha(T, P.W, 0.03); c.scene.add(fW, fF, fR);
    c.camera.position.set(4.2, -4.6, 3.2); c.controls.target.set(0, 0, 1.9); c.controls.update();
  }
  function calc() {
    var b = be * rad, R = L * Math.sin(b), z = Zc - L * Math.cos(b), f = ph * rad, bx = R * Math.cos(f), by = R * Math.sin(f), pts = [], i;
    for (i = 0; i <= 48; i++) pts.push([R * Math.cos(2 * Math.PI * i / 48), R * Math.sin(2 * Math.PI * i / 48), z]);
    trayec.set(pts); hilo.set([[0, 0, Zc], [bx, by, z]]); bola.position.set(bx, by, z);
    var F = g / Math.cos(b), ar = g * Math.tan(b), ex = -Math.cos(f), ey = -Math.sin(f), dx = -bx / L, dy = -by / L, dz = (Zc - z) / L;
    fW.poner([bx, by, z], [bx, by, z - K * g]); fF.poner([bx, by, z], [bx + K * F * dx, by + K * F * dy, z + K * F * dz]);
    fR.poner([bx, by, z], [bx + K * ar * ex, by + K * ar * ey, z]);
    lR(fm(R) + ' m'); lF(fm(F) + ' N'); la(fm(ar) + ' m/s²'); lv(fm(Math.sqrt(g * R * Math.tan(b))) + ' m/s'); lp(fm(2 * Math.PI * Math.sqrt(L * Math.cos(b) / g)) + ' s');
  }
  nuevo();
  c.slider('Longitud L (m)', 0.5, 3, 0.1, L, function (s) { L = s; if (fR) calc(); });
  c.slider('Ángulo β con la vertical (°)', 5, 70, 1, be, function (s) { be = s; if (fR) calc(); });
  sl = c.slider('Posición (°)', 0, 360, 1, ph, function (s) { ph = s; if (fR) calc(); });
  if (!c.reducirMovimiento) c.selector('Animación ', ['Parada', 'En marcha'], 0, function (i) {
    on = i === 1; if (!on) return; var t0 = performance.now(), id = ++tok;
    (function tick() { if (!on || id !== tok) return; var t = performance.now(), Tp = 2 * Math.PI * Math.sqrt(L * Math.cos(be * rad) / g); sl.value = ((parseFloat(sl.value) + 360 * (t - t0) / 1000 / Tp * 0.5) % 360).toFixed(2); sl.dispatchEvent(new Event('input')); t0 = t; requestAnimationFrame(tick); })();
  });
  c.leyenda([['var(--fg)', 'peso mg', 'linea'], ['var(--U)', 'tensión F', 'linea'], ['var(--warn-b)', 'F sen β = m·a_rad (hacia el eje)', 'linea']]);
  c.alCambiarTema(function (q) {
    P = q; c.renderer.setClearColor(q.bg);
    if (!fR) return;
    c.scene.remove(suelo); suelo.geometry.dispose(); suelo = new T.GridHelper(8, 8, q.mut, q.bd); suelo.rotation.x = Math.PI / 2; c.scene.add(suelo);
    techo.material.color.set(q.mut); eje.material.color.set(q.mut); hilo.material.color.set(q.fg); trayec.material.color.set(q.acc); bola.material.color.set(q.fg);
    [[fW, q.fg], [fF, q.S], [fR, q.W]].forEach(function (e) { e[0].userData.eje.material.color.set(e[1]); e[0].userData.cono.material.color.set(e[1]); });
  });
  calc();
});
