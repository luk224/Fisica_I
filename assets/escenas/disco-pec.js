/* Disco de la PEC 2 (pregunta 2): M = 4 kg, R = 0,5 m (1 unidad = 0,5 m), eje por el centro y perpendicular a la cara. I = ½ M R² = 0,5 kg·m²; K = ½ I ω² = 9 J con ω = 6 rad/s.
   El rótulo de ω y los de v y R no cambian de texto con el deslizador (son los datos del enunciado); las lecturas sí. */
Interactivos.registrar('disco-pec', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var rotulos = [], pintados = [], rad = Math.PI / 180;
  var fm = function (t, d) { var k = Math.pow(10, d == null ? 2 : d); return (Math.round(t * k) / k).toString().replace('-', '\u2212').replace('.', ','); };
  function pinta(mat, clave) { pintados.push([mat, clave]); return mat; }
  function rotulo(texto, clave, alto) {   /* texto 3D (sprite) que siempre mira a la cámara; clave = color de la paleta */
    var cv = document.createElement('canvas'), x = cv.getContext('2d'), fuente = 'bold 52px "Segoe UI", Arial, sans-serif';
    x.font = fuente; cv.width = Math.ceil(x.measureText(texto).width) + 24; cv.height = 96;
    var tex = new T.CanvasTexture(cv), sp = new T.Sprite(new T.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
    sp.renderOrder = 10; sp.scale.set(alto * cv.width / 96, alto, 1);
    var o = { sp: sp };
    o.pintar = function () {
      x.clearRect(0, 0, cv.width, 96); x.font = fuente; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.lineJoin = 'round'; x.lineWidth = 9; x.strokeStyle = P.bg; x.strokeText(texto, cv.width / 2, 50); x.fillStyle = P[clave]; x.fillText(texto, cv.width / 2, 50); tex.needsUpdate = true;
    };
    o.pintar(); rotulos.push(o); c.scene.add(sp); return o.sp;
  }
  function suelo(z, n) { var g = new T.GridHelper(n, n, P.mut, P.bd); g.rotation.x = Math.PI / 2; g.position.z = z; c.scene.add(g); return g; }
  function flecha(clave, r) { var f = H.flecha(T, P[clave], r); pintados.push([f.userData.eje.material, clave], [f.userData.cono.material, clave]); c.scene.add(f); return f; }
  function tubo(pts, r, clave) { var t = H.tubo(T, pts, r, P[clave]); pintados.push([t.material, clave]); c.scene.add(t); return t; }
  function malla(geo, clave, op) { var m = new T.Mesh(geo, new T.MeshStandardMaterial({ color: P[clave], transparent: op != null, opacity: op == null ? 1 : op })); pintados.push([m.material, clave]); c.scene.add(m); return m; }
  var M = 4, R = 0.5, om = 6, I = 0.5 * M * R * R, ang = 0, g, disco, gs, marcas = [], ejeT, fW, fR, fV, sq, listo = false, tO, tE, tR, tV, tM, tA;
  var lI = c.lectura('I = ½ M R²'), lK = c.lectura('K = ½ I ω²'), lV = c.lectura('v = ω R');
  g = suelo(-1.8, 10);
  gs = new T.Group(); c.scene.add(gs);
  disco = malla(new T.CylinderGeometry(1, 1, 0.3, 56), 'acc', 0.6); disco.rotation.z = Math.PI / 2; gs.add(disco);
  for (var k = 0; k < 4; k++) { var mk = new T.Mesh(new T.BoxGeometry(0.1, 0.16, 0.26), pinta(new T.MeshBasicMaterial({ color: P.A }), 'A')); mk.position.set(0.17, 0.85 * Math.cos(k * Math.PI / 2), 0.85 * Math.sin(k * Math.PI / 2)); mk.rotation.x = k * Math.PI / 2; marcas.push(mk); gs.add(mk); }
  ejeT = tubo([[-2.4, 0, 0], [2.4, 0, 0]], 0.03, 'fg');
  fW = flecha('L', 0.03); fR = flecha('E', 0.02); fV = flecha('W', 0.02); sq = tubo([], 0.015, 'fg');
  tE = rotulo('eje por O, perpendicular al disco', 'fg', 0.4); tO = rotulo('ω = 6 rad/s', 'L', 0.45); tR = rotulo('R = 0,5 m', 'E', 0.4); tV = rotulo('v = ω·R = 3 m/s', 'W', 0.4); tM = rotulo('M = 4 kg', 'fg', 0.4); tA = rotulo('90°', 'fg', 0.3);
  c.camera.position.set(5, -5.5, 3.4); c.controls.target.set(0, 0, 0); c.controls.update();
  function calc() {
    if (!listo) return;
    var a = ang * rad, ca = Math.cos(a), sa = Math.sin(a);
    gs.rotation.x = a;
    fW.poner([0.2, 0, 0], [2.4, 0, 0]); tO.position.set(3.4, 0, 0.1); tE.position.set(-2.6, 0, 0.5);
    var p = [0.17, ca, sa], vd = [0, -sa, ca];
    fR.poner([0.17, 0, 0], p); tR.position.set(0.17 + 0.0, 0.5 * ca - 0.0, 0.5 * sa + 0.3);
    fV.poner(p, [p[0], p[1] + 1.6 * vd[1], p[2] + 1.6 * vd[2]]); tV.position.set(p[0], p[1] + 2.1 * vd[1], p[2] + 2.1 * vd[2]);
    sq.set([[0.17 + 0.3, 0, 0], [0.17 + 0.3, 0.3 * ca, 0.3 * sa], [0.17, 0.3 * ca, 0.3 * sa]]); tA.position.set(0.17 + 0.55, 0.3 * ca, 0.3 * sa);
    tM.position.set(0.2, 0, -1.4);
    lI(fm(I) + ' kg·m²'); lK(fm(0.5 * I * om * om) + ' J   (ω = ' + fm(om, 1) + ' rad/s)'); lV(fm(om * R) + ' m/s');
  }
  c.slider('Velocidad angular ω (rad/s)', 1, 12, 0.5, om, function (v) { om = v; tO.visible = true; if (listo) calc(); }, function (v) { return fm(v, 1) + ' rad/s'; });
  c.reproductor({ max: 360, valor: 0, paso: 1, vel: function () { return om / rad / 3; }, ciclico: true, etiqueta: 'Giro del disco (a 1/3 de la velocidad real)', fmt: function (v) { return Math.round(v) + '°'; }, cb: function (v) { ang = v; calc(); } });
  listo = true; calc();
  c.alCambiarTema(function (q) { P = q; c.renderer.setClearColor(q.bg); pintados.forEach(function (e) { e[0].color.set(q[e[1]]); }); rotulos.forEach(function (r) { r.pintar(); }); c.scene.remove(g); g.geometry.dispose(); g = suelo(-1.8, 10); });
});
