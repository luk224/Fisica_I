/* Giróscopo de la PEC 2 (pregunta 5), en 3D con vectores finos. Datos: m = 0,5 kg, r = 0,20 m, I = 0,002 kg·m², ω = 100 rad/s, g = 9,8 m/s².
   Escala del dibujo: 1 unidad = 1 dm (r = 2 u). Volante macizo con I = ½ m R²  ->  R = sqrt(2·0,002/0,5) = 0,089 m ≈ 0,9 u.
   Ω = m g r / (I ω) = 0,5·9,8·0,20/(0,002·100) = 4,9 rad/s (una vuelta cada 1,28 s). El giro propio se dibuja a 6 vueltas por vuelta de precesión (el real es mucho más rápido);
   las flechas L, P, τ y Ω tienen longitud fija (no están a escala entre sí): τ ⟂ L, horizontal; L se mueve en el sentido de τ. El cuadradito marca el ángulo recto entre r y el peso (θ = 90°). */
Interactivos.registrar('precesion-pec', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), g = 9.8, rad = Math.PI / 180, m = 0.5, I = 0.002, rm = 0.20;
  var om = 100, rcm = 2.0, Rcm = 0.9, psi = 0, listo = false, esp = 0.3, fino = 0.025, dz = -2.4;
  var tL, tW, tT, tO, tR, tA, tC, tP, eje, rueda, marcas = [], gSpin, pivote, columna, base, suelo, trayec, fL, fW, fT, fO, grupoRueda, cuadro;
  var lO = c.lectura('Ω = m g r / (I ω)'), lT = c.lectura('Una vuelta de precesión cada'), lR = c.lectura('Velocidad de giro ω');
  var fm = function (t, d) { var k = Math.pow(10, d == null ? 2 : d); return (Math.round(t * k) / k).toString().replace('-', '−').replace('.', ','); };
  var rotulos = [];
  function rotulo(texto, clave, alto) {   /* texto 3D (sprite) que siempre mira a la cámara; clave = color de la paleta */
    var cv = document.createElement('canvas'); cv.width = 384; cv.height = 96;
    var tex = new T.CanvasTexture(cv), sp = new T.Sprite(new T.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
    sp.renderOrder = 10; sp.scale.set(alto * 4, alto, 1);
    var o = { sp: sp, clave: clave, texto: texto };
    o.pintar = function () {
      var x = cv.getContext('2d'); x.clearRect(0, 0, 384, 96); x.font = 'bold 52px "Segoe UI", Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.lineJoin = 'round'; x.lineWidth = 9; x.strokeStyle = P.bg; x.strokeText(texto, 192, 50); x.fillStyle = P[clave]; x.fillText(texto, 192, 50); tex.needsUpdate = true;
    };
    o.pintar(); rotulos.push(o); c.scene.add(sp); return o;
  }
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
    tL = rotulo('L = I·ω', 'L', 0.52); tW = rotulo('P = m·g', 'W', 0.52); tT = rotulo('τ = r × P', 'E', 0.52); tO = rotulo('Ω (precesión)', 'A', 0.52);
    tR = rotulo('r = 0,20 m', 'fg', 0.45); tA = rotulo('90°', 'fg', 0.4); tC = rotulo('CM', 'fg', 0.45); tP = rotulo('pivote', 'mut', 0.45);
    c.camera.position.set(7.5, -8.5, 5); c.controls.target.set(0.3, 0, 0.3); c.controls.update();
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
    fO.poner([0, 0, 0], [0, 0, 3.0]);
    tL.sp.position.set(cx + 2.2 * d[0] + 0.75 * d[0], cy + 2.2 * d[1] + 0.75 * d[1], 0.3);
    tW.sp.position.set(cx, cy, -2.4);
    tT.sp.position.set(cx + 2.2 * tg[0] + 0.7 * tg[0], cy + 2.2 * tg[1] + 0.7 * tg[1], 0.3);
    tO.sp.position.set(0, 0, 3.55);
    tR.sp.position.set(0.5 * r * d[0], 0.5 * r * d[1], 0.45);
    tA.sp.position.set(cx - 0.55 * d[0], cy - 0.55 * d[1], -0.55);
    tC.sp.position.set(cx + 0.0, cy + 0.0, 1.15);
    tP.sp.position.set(-0.2, 0, -0.65);
    var o = Om();
    lO(fm(o, 2) + ' rad/s');
    lT(fm(2 * Math.PI / o, 2) + ' s');
    lR(fm(om, 0) + ' rad/s');
  }
  c.slider('Velocidad de giro ω (rad/s)', 50, 300, 1, om, function (v) { om = v; calc(); }, function (v) { return fm(v, 0) + ' rad/s'; });
  c.reproductor({ max: 360, valor: 0, paso: 1, vel: function () { return Om() / rad; }, ciclico: true, etiqueta: 'Ángulo de precesión φ', fmt: function (v) { return Math.round(v) + '°'; }, cb: function (v) { psi = v; calc(); } });
  nuevo(); listo = true;
  c.alCambiarTema(function (qq) {
    P = qq; c.renderer.setClearColor(qq.bg);
    if (!listo) return;
    c.scene.remove(suelo); suelo.geometry.dispose(); suelo = new T.GridHelper(10, 10, qq.mut, qq.bd); suelo.rotation.x = Math.PI / 2; suelo.position.z = dz; c.scene.add(suelo);
    columna.material.color.set(qq.mut); base.material.color.set(qq.mut); pivote.material.color.set(qq.fg); eje.material.color.set(qq.fg); rueda.material.color.set(qq.acc); trayec.material.color.set(qq.mut); cuadro.material.color.set(qq.fg);
    marcas.forEach(function (mk) { mk.material.color.set(qq.A); });
    rotulos.forEach(function (q) { q.pintar(); });
    [[fL, qq.L], [fW, qq.W], [fT, qq.E], [fO, qq.A]].forEach(function (e) { e[0].userData.eje.material.color.set(e[1]); e[0].userData.cono.material.color.set(e[1]); });
  });
  calc();
});
