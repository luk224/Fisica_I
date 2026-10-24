/* Giróscopo en precesión (tema 10, §10.7 y ejemplo 10.13 de U). 3D (sin params de dimensión).
   Pivote en el origen; el eje del volante es horizontal y el centro del volante está a una distancia r del pivote. Volante cilíndrico: I = ½ m R².
   Rapidez de precesión (10.33):  Ω = τ/L = (m g r)/(I ω) = 2 g r/(R² ω)  (no depende de la masa m).  Aprox. válida si Ω ≪ ω.
   Con r = 2,0 cm, R = 3,0 cm y ω ≈ 277 rad/s sale Ω = 1,57 rad/s (una vuelta cada 4,0 s), el ejemplo 10.13.
   Escala del dibujo: 1 unidad = 1 cm. El giro propio del volante se dibuja a 6 vueltas por vuelta de precesión (el real es mucho más rápido);
   las flechas L, w, τ y Ω tienen longitud fija (no están a escala entre sí): τ ⟂ L, siempre horizontal; L se mueve en el sentido de τ. */
Interactivos.registrar('precesion', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), g = 9.8, rad = Math.PI / 180;
  var om = 277, rcm = 2.0, Rcm = 3.0, psi = 0, listo = false;
  var eje, rueda, ruedaE, marcas = [], gSpin, pivote, columna, base, suelo, trayec, fL, fW, fT, fO, grupoRueda, dz = -4.2;
  var lO = c.lectura('Rapidez de precesión Ω = 2 g r / (R² ω)'), lT = c.lectura('Una vuelta de precesión cada'), lR = c.lectura('Velocidad de giro ω'), lC = c.lectura('Cociente Ω / ω');
  var fm = function (t, d) { var k = Math.pow(10, d == null ? 2 : d); return (Math.round(t * k) / k).toString().replace('-', '−').replace('.', ','); };
  function Om() { return 2 * g * (rcm / 100) / (Math.pow(Rcm / 100, 2) * om); }

  function nuevo() {
    suelo = new T.GridHelper(16, 16, P.mut, P.bd); suelo.rotation.x = Math.PI / 2; suelo.position.z = dz; c.scene.add(suelo);
    columna = H.tubo(T, [[0, 0, 0], [0, 0, dz]], 0.22, P.mut); c.scene.add(columna);
    base = new T.Mesh(new T.CylinderGeometry(1.8, 2.2, 0.35, 28), new T.MeshStandardMaterial({ color: P.mut })); base.rotation.x = Math.PI / 2; base.position.z = dz + 0.17; c.scene.add(base);
    pivote = new T.Mesh(new T.SphereGeometry(0.38, 20, 14), new T.MeshStandardMaterial({ color: P.fg })); c.scene.add(pivote);
    eje = H.tubo(T, [[0, 0, 0], [1, 0, 0]], 0.12, P.fg); c.scene.add(eje);
    grupoRueda = new T.Group(); c.scene.add(grupoRueda);
    gSpin = new T.Group(); grupoRueda.add(gSpin);
    rueda = new T.Mesh(new T.CylinderGeometry(1, 1, 1, 48), new T.MeshStandardMaterial({ color: P.acc, transparent: true, opacity: 0.55 }));
    rueda.rotation.z = Math.PI / 2; gSpin.add(rueda);          /* eje del cilindro (y) -> x */
    var k; for (k = 0; k < 4; k++) {
      var mk = new T.Mesh(new T.BoxGeometry(0.3, 0.18, 0.5), new T.MeshBasicMaterial({ color: P.A })); marcas.push(mk); gSpin.add(mk);
    }
    trayec = H.tubo(T, [], 0.05, P.mut); c.scene.add(trayec);
    fL = H.flecha(T, P.L, 0.09); fW = H.flecha(T, P.W, 0.09); fT = H.flecha(T, P.E, 0.09); fO = H.flecha(T, P.A, 0.09); c.scene.add(fL, fW, fT, fO);
    c.camera.position.set(9.5, -11, 6.5); c.controls.target.set(0, 0, -0.5); c.controls.update();
  }
  function ubicar() {   /* columna y suelo más abajo cuanto mayor es el volante, para que no lo atraviese */
    dz = -(Rcm + 1.2);
    suelo.position.z = dz; columna.set([[0, 0, 0], [0, 0, dz]]); base.position.z = dz + 0.17;
  }
  function calc() {
    if (!listo) return;
    ubicar();
    var r = rcm, R = Rcm, f = psi * rad, d = [Math.cos(f), Math.sin(f), 0], tg = [-Math.sin(f), Math.cos(f), 0], esp = 0.9;
    var cx = r * d[0], cy = r * d[1];
    eje.set([[0, 0, 0], [(r + 0.9) * d[0], (r + 0.9) * d[1], 0]]);
    grupoRueda.position.set(cx, cy, 0); grupoRueda.rotation.set(0, 0, f);
    rueda.scale.set(R, esp, R);
    var spin = psi * 6 * rad, k;
    gSpin.rotation.x = spin;
    marcas.forEach(function (mk, i) { var a = i * Math.PI / 2; mk.position.set(esp / 2 + 0.02, R * Math.cos(a) * 0.9, R * Math.sin(a) * 0.9); mk.rotation.x = a; });
    var pts = []; for (k = 0; k <= 60; k++) pts.push([r * Math.cos(2 * Math.PI * k / 60), r * Math.sin(2 * Math.PI * k / 60), 0]);
    trayec.set(pts);
    fL.poner([cx, cy, 0], [cx + 3.2 * d[0], cy + 3.2 * d[1], 0]);
    fW.poner([cx, cy, 0], [cx, cy, -3.4]);
    fT.poner([0, 0, 0], [3.2 * tg[0], 3.2 * tg[1], 0]);
    fO.poner([0, 0.0, 0.0], [0, 0, 4.6]);
    var o = Om();
    lO(fm(o) + ' rad/s  (un giro en ' + fm(o > 0 ? 2 * Math.PI / o : 0, 1) + ' s)');
    lT(fm(o > 0 ? 2 * Math.PI / o : 0, 1) + ' s');
    lR(fm(om, 0) + ' rad/s  =  ' + fm(om * 60 / (2 * Math.PI), 0) + ' rpm');
    lC(fm(100 * o / om, 2) + ' %' + (o / om > 0.2 ? '  — ¡no es precesión lenta! la fórmula deja de valer' : '  (precesión lenta: Ω ≪ ω)'));
  }
  c.slider('Velocidad de giro del volante ω (rad/s)', 100, 600, 1, om, function (v) { om = v; calc(); }, function (v) { return fm(v, 0) + ' rad/s'; });
  c.slider('Distancia del centro al pivote r (cm)', 1, 6, 0.1, rcm, function (v) { rcm = v; calc(); }, function (v) { return fm(v, 1) + ' cm'; });
  c.slider('Radio del volante R (cm)', 1.5, 6, 0.1, Rcm, function (v) { Rcm = v; calc(); }, function (v) { return fm(v, 1) + ' cm'; });
  c.reproductor({ max: 360, valor: 0, paso: 1, vel: function () { return Om() / rad; }, ciclico: true, etiqueta: 'Ángulo de precesión φ', fmt: function (v) { return Math.round(v) + '°'; }, cb: function (v) { psi = v; calc(); } });
  c.leyenda([['var(--X)', 'momento angular L (a lo largo del eje)', 'linea'], ['var(--warn-b)', 'peso w = m g (en el centro de masa)', 'linea'], ['var(--E)', 'torca τ = r × w (horizontal, ⟂ L)', 'linea'], ['var(--A)', 'velocidad de precesión Ω (vertical)', 'linea']]);
  nuevo(); listo = true;
  c.alCambiarTema(function (q) {
    P = q; c.renderer.setClearColor(q.bg);
    if (!listo) return;
    c.scene.remove(suelo); suelo.geometry.dispose(); suelo = new T.GridHelper(16, 16, q.mut, q.bd); suelo.rotation.x = Math.PI / 2; suelo.position.z = dz; c.scene.add(suelo);
    columna.material.color.set(q.mut); base.material.color.set(q.mut); pivote.material.color.set(q.fg); eje.material.color.set(q.fg); rueda.material.color.set(q.acc); trayec.material.color.set(q.mut);
    marcas.forEach(function (mk) { mk.material.color.set(q.A); });
    [[fL, q.L], [fW, q.W], [fT, q.E], [fO, q.A]].forEach(function (e) { e[0].userData.eje.material.color.set(e[1]); e[0].userData.cono.material.color.set(e[1]); });
  });
  calc();
});
