/* Giróscopo de la PEC 2 (pregunta 5), en 3D con vectores finos. Datos: m = 0,5 kg, r = 0,20 m, I = 0,002 kg·m², ω = 100 rad/s, g = 9,8 m/s².
   Escala del dibujo: 1 unidad = 1 dm (r = 2 u). Volante macizo con I = ½ m R²  ->  R = sqrt(2·0,002/0,5) = 0,089 m ≈ 0,9 u.
   Ω = m g r / (I ω) = 0,5·9,8·0,20/(0,002·100) = 4,9 rad/s (una vuelta cada 1,28 s). El giro propio se dibuja a 6 vueltas por vuelta de precesión (el real es mucho más rápido);
   las flechas L, P, τ y Ω tienen longitud fija (no están a escala entre sí): τ ⟂ L, horizontal; L se mueve en el sentido de τ. El cuadradito marca el ángulo recto entre r y el peso (θ = 90°). */
Interactivos.registrar('precesion-pec', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), g = 9.8, rad = Math.PI / 180, m = 0.5, I = 0.002, rm = 0.20;
  var om = 100, rcm = 2.0, Rcm = 0.9, psi = 0, listo = false, esp = 0.3, fino = 0.025, dz = -2.4;
  var eje, rueda, marcas = [], gSpin, pivote, columna, base, suelo, trayec, fL, fW, fT, fO, grupoRueda, cuadro;
  var lO = c.lectura('Ω = m g r / (I ω)'), lT = c.lectura('Una vuelta de precesión cada'), lR = c.lectura('Velocidad de giro ω');
  var fm = function (t, d) { var k = Math.pow(10, d == null ? 2 : d); return (Math.round(t * k) / k).toString().replace('-', '−').replace('.', ','); };
  function Om() { return m * g * rm / (I * om); }
  function nuevo() {
    suelo = new T.GridHelper(10, 10, P.mut, P.bd); suelo.rotation.x = Math.PI / 2; suelo.position.z = dz; c.scene.add(suelo);
    columna = H.tubo(T, [[0, 0, 0], [0, 0, dz]], 0.07, P.mut); c.scene.add(columna);
    base = new T.Mesh(new T.CylinderGeometry(1.1, 1.3, 0.2, 28), new T.MeshStandardMaterial({ color: P.mut })); base.rotation.x = Math.PI / 2; base.position.z = dz + 0.1; c.scene.add(base);
    pivote = new T.Mesh(new T.SphereGeometry(0.2, 20, 14), new T.MeshStandardMaterial({ color: P.fg })); c.scene.add(pivote);
    eje = H.tubo(T, [[0, 0, 0], [1, 0, 0]], 0.06, P.fg); c.scene.add(eje);
    grupoRueda = new T.Group(); c.scene.add(grupoRueda);
    gSpin = new T.Group(); grupoRueda.add(gSpin);
    rueda = new T.Mesh(new T.CylinderGeometry(1, 1, 1, 48), new T.MeshStandardMaterial({ color: P.acc, transparent: true, opacity: 0.55 }));
    rueda.rotation.z = Math.PI / 2; gSpin.add(rueda);
    var k; for (k = 0; k < 4; k++) { var mk = new T.Mesh(new T.BoxGeometry(0.16, 0.1, 0.26), new T.MeshBasicMaterial({ color: P.A })); marcas.push(mk); gSpin.add(mk); }
    trayec = H.tubo(T, [], 0.025, P.mut); c.scene.add(trayec);
    cuadro = H.tubo(T, [], 0.02, P.fg); c.scene.add(cuadro);
    fL = H.flecha(T, P.L, fino); fW = H.flecha(T, P.W, fino); fT = H.flecha(T, P.E, fino); fO = H.flecha(T, P.A, fino); c.scene.add(fL, fW, fT, fO);
    c.camera.position.set(6.5, -7.5, 4.2); c.controls.target.set(0, 0, -0.4); c.controls.update();
  }
  function calc() {
    if (!listo) return;
    var r = rcm, R = Rcm, f = psi * rad, d = [Math.cos(f), Math.sin(f), 0], tg = [-Math.sin(f), Math.cos(f), 0];
    var cx = r * d[0], cy = r * d[1];
    eje.set([[0, 0, 0], [(r + 0.6) * d[0], (r + 0.6) * d[1], 0]]);
    grupoRueda.position.set(cx, cy, 0); grupoRueda.rotation.set(0, 0, f);
    rueda.scale.set(R, esp, R);
    gSpin.rotation.x = psi * 6 * rad;
    marcas.forEach(function (mk, i) { var a = i * Math.PI / 2; mk.position.set(esp / 2 + 0.01, R * Math.cos(a) * 0.9, R * Math.sin(a) * 0.9); mk.rotation.x = a; });
    var pts = [], k; for (k = 0; k <= 60; k++) pts.push([r * Math.cos(2 * Math.PI * k / 60), r * Math.sin(2 * Math.PI * k / 60), 0]);
    trayec.set(pts);
    var q = 0.3;
    cuadro.set([[cx - q * d[0], cy - q * d[1], 0], [cx - q * d[0], cy - q * d[1], -q], [cx, cy, -q]]);
    fL.poner([cx, cy, 0], [cx + 2.2 * d[0], cy + 2.2 * d[1], 0]);
    fW.poner([cx, cy, 0], [cx, cy, -2.0]);
    fT.poner([cx, cy, 0], [cx + 2.2 * tg[0], cy + 2.2 * tg[1], 0]);
    fO.poner([0, 0, 0], [0, 0, 3.4]);
    var o = Om();
    lO(fm(o, 2) + ' rad/s');
    lT(fm(2 * Math.PI / o, 2) + ' s');
    lR(fm(om, 0) + ' rad/s');
  }
  c.slider('Velocidad de giro ω (rad/s)', 50, 300, 1, om, function (v) { om = v; calc(); }, function (v) { return fm(v, 0) + ' rad/s'; });
  c.reproductor({ max: 360, valor: 0, paso: 1, vel: function () { return Om() / rad; }, ciclico: true, etiqueta: 'Ángulo de precesión φ', fmt: function (v) { return Math.round(v) + '°'; }, cb: function (v) { psi = v; calc(); } });
  c.leyenda([['var(--X)', 'momento angular L = I ω (a lo largo del eje)', 'linea'], ['var(--warn-b)', 'peso P = m g (en el centro de masas, r = 0,20 m)', 'linea'], ['var(--E)', 'momento del peso τ = r × P (horizontal, ⟂ L y ⟂ P)', 'linea'], ['var(--A)', 'velocidad de precesión Ω (vertical)', 'linea']]);
  nuevo(); listo = true;
  c.alCambiarTema(function (qq) {
    P = qq; c.renderer.setClearColor(qq.bg);
    if (!listo) return;
    c.scene.remove(suelo); suelo.geometry.dispose(); suelo = new T.GridHelper(10, 10, qq.mut, qq.bd); suelo.rotation.x = Math.PI / 2; suelo.position.z = dz; c.scene.add(suelo);
    columna.material.color.set(qq.mut); base.material.color.set(qq.mut); pivote.material.color.set(qq.fg); eje.material.color.set(qq.fg); rueda.material.color.set(qq.acc); trayec.material.color.set(qq.mut); cuadro.material.color.set(qq.fg);
    marcas.forEach(function (mk) { mk.material.color.set(qq.A); });
    [[fL, qq.L], [fW, qq.W], [fT, qq.E], [fO, qq.A]].forEach(function (e) { e[0].userData.eje.material.color.set(e[1]); e[0].userData.cono.material.color.set(e[1]); });
  });
  calc();
});
