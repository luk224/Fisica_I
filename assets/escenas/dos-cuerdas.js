/* Paquete con dos cuerdas en una varilla giratoria (Ejercicios módulo 1): T1 + T2 = mω²L, T1 − T2 = mg/cos φ. 3D. m = 2 kg, L = 1,5 m, g = 9,80 m/s². */
Interactivos.registrar('dos-cuerdas', function (c) {
  var T = c.THREE, H = c.H, g = 9.8, m = 2, L = 1.5, Zm = 2, K = 0.02, rad = Math.PI / 180;
  var d = 1.8, rpm = 51.5, ph = 0, P = c.colores();
  var eje, sup, inf, cu, cl, trayec, bola, suelo, fW, fU, fL, fR;
  var lg = c.lectura('Ángulo φ con la vertical: cos φ = d / 2L'), lr = c.lectura('Radio r = L sen φ'), l1 = c.lectura('Tensión superior T₁ = (mω²L + mg/cos φ)/2'), l2 = c.lectura('Tensión inferior T₂ = (mω²L − mg/cos φ)/2'), lw = c.lectura('Velocidad angular ω');
  var fm = function (t, n) { var f = Math.pow(10, n === undefined ? 2 : n); return (Math.round(t * f) / f).toString().replace('-', '−').replace('.', ','); };
  function nuevo() {
    suelo = new T.GridHelper(8, 8, P.mut, P.bd); suelo.rotation.x = Math.PI / 2; c.scene.add(suelo);
    eje = H.tubo(T, [[0, 0, 0], [0, 0, 4]], 0.03, P.mut); c.scene.add(eje);
    sup = H.tubo(T, [], 0.02, P.fg); inf = H.tubo(T, [], 0.02, P.fg); trayec = H.tubo(T, [], 0.012, P.acc); c.scene.add(sup, inf, trayec);
    cu = new T.Mesh(new T.SphereGeometry(0.07, 12, 8), new T.MeshBasicMaterial({ color: P.mut })); cl = cu.clone(); c.scene.add(cu, cl);
    bola = new T.Mesh(new T.SphereGeometry(0.17, 20, 14), new T.MeshStandardMaterial({ color: P.fg })); c.scene.add(bola);
    fW = H.flecha(T, P.fg, 0.03); fU = H.flecha(T, P.S, 0.03); fL = H.flecha(T, P.A, 0.03); fR = H.flecha(T, P.W, 0.03); c.scene.add(fW, fU, fL, fR);
    c.camera.position.set(3.4, -3.6, 2.9); c.controls.target.set(0, 0, 2); c.controls.update();
  }
  function calc() {
    var cf = d / (2 * L), sf = Math.sqrt(1 - cf * cf), r = L * sf, w = rpm * 2 * Math.PI / 60;
    var T1 = (m * w * w * L + m * g / cf) / 2, T2 = (m * w * w * L - m * g / cf) / 2, flojo = T2 < 0, t2 = flojo ? 0 : T2;
    var f = ph * rad, bx = r * Math.cos(f), by = r * Math.sin(f), zu = Zm + d / 2, zl = Zm - d / 2, pts = [], i;
    for (i = 0; i <= 48; i++) pts.push([r * Math.cos(2 * Math.PI * i / 48), r * Math.sin(2 * Math.PI * i / 48), Zm]);
    trayec.set(pts); sup.set([[0, 0, zu], [bx, by, Zm]]); inf.set([[0, 0, zl], [bx, by, Zm]]);
    inf.material.color.set(flojo ? P.bd : P.fg); cu.position.set(0, 0, zu); cl.position.set(0, 0, zl); bola.position.set(bx, by, Zm);
    var o = [bx, by, Zm], ex = -Math.cos(f), ey = -Math.sin(f), ux = -bx / L, uy = -by / L, uz = (zu - Zm) / L;
    fW.poner(o, [bx, by, Zm - K * m * g]);
    fU.poner(o, [bx + K * T1 * ux, by + K * T1 * uy, Zm + K * T1 * uz]);
    fL.poner(o, [bx + K * t2 * ux, by + K * t2 * uy, Zm - K * t2 * uz]);
    fR.poner([bx, by, Zm + 0.25], [bx + K * (T1 + t2) * sf * ex, by + K * (T1 + t2) * sf * ey, Zm + 0.25]);
    lg(fm(cf, 3) + '  →  φ = ' + fm(Math.acos(cf) / rad, 1) + '°'); lr(fm(r) + ' m'); lw(fm(w) + ' rad/s');
    l1(fm(T1, 1) + ' N'); l2(flojo ? 'cuerda floja: ω debe ser ≥ ' + fm(Math.sqrt(2 * g / d) * 60 / (2 * Math.PI), 1) + ' rpm' : fm(T2, 1) + ' N');
  }
  nuevo();
  c.slider('Velocidad de giro (rpm)', 20, 90, 0.5, rpm, function (s) { rpm = s; if (fR) calc(); });
  c.slider('Separación vertical d (m)', 0.8, 2.8, 0.1, d, function (s) { d = s; if (fR) calc(); });
  c.reproductor({ max: 360, valor: ph, paso: 1, vel: function () { return rpm * 6 * 0.25; }, ciclico: true, etiqueta: 'Posición angular (cámara lenta)', fmt: function (v) { return Math.round(v) + '°'; }, cb: function (v) { ph = v; if (fR) calc(); } });
  c.leyenda([['var(--fg)', 'peso mg', 'linea'], ['var(--U)', 'T₁ (cuerda superior)', 'linea'], ['var(--A)', 'T₂ (cuerda inferior)', 'linea'], ['var(--warn-b)', 'T₁ sen φ + T₂ sen φ = m·a_rad (hacia la varilla; no es otra fuerza)', 'linea']]);
  c.alCambiarTema(function (q) {
    P = q; c.renderer.setClearColor(q.bg);
    if (!fR) return;
    c.scene.remove(suelo); suelo.geometry.dispose(); suelo = new T.GridHelper(8, 8, q.mut, q.bd); suelo.rotation.x = Math.PI / 2; c.scene.add(suelo);
    eje.material.color.set(q.mut); sup.material.color.set(q.fg); trayec.material.color.set(q.acc); bola.material.color.set(q.fg); cu.material.color.set(q.mut); cl.material.color.set(q.mut);
    [[fW, q.fg], [fU, q.S], [fL, q.A], [fR, q.W]].forEach(function (e) { e[0].userData.eje.material.color.set(e[1]); e[0].userData.cono.material.color.set(e[1]); });
    calc();
  });
  calc();
});
