/* Patinadora de la PEC 2 (pregunta 6): se conserva L = I ω = 4·2 = 8 kg·m²/s. Brazos extendidos I = 4 kg·m² (ω = 2 rad/s); brazos pegados I = 2 kg·m² (ω = 4 rad/s). I varía linealmente con la posición de los brazos (s) solo para el dibujo; ω = L/I. */
Interactivos.registrar('patinadora-pec', function (c) {
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
  var s = 0, ang = 0, g, cuerpo, cab, brazos = [], manos = [], plat, ring, fL, tL, tO, tI, tB, gs, listo = false;
  var lI = c.lectura('Momento de inercia I'), lO = c.lectura('ω = L / I'), lL = c.lectura('L = I ω');
  function I() { return 4 - 2 * s; }
  g = suelo(-0.2, 8);
  plat = malla(new T.CylinderGeometry(2.2, 2.2, 0.12, 48), 'mut', 0.5); plat.rotation.x = Math.PI / 2; plat.position.z = -0.06;
  gs = new T.Group(); c.scene.add(gs);
  cuerpo = malla(new T.CylinderGeometry(0.35, 0.35, 1.8, 28), 'acc', 0.8); cuerpo.rotation.x = Math.PI / 2; cuerpo.position.z = 0.9; gs.add(cuerpo); c.scene.remove(cuerpo);
  cab = malla(new T.SphereGeometry(0.28, 20, 14), 'acc', 0.9); cab.position.z = 2.05; gs.add(cab); c.scene.remove(cab);
  for (var k = 0; k < 2; k++) {
    var b = malla(new T.CylinderGeometry(0.06, 0.06, 1, 14), 'fg'); b.rotation.z = Math.PI / 2; gs.add(b); c.scene.remove(b); brazos.push(b);
    var mn = malla(new T.SphereGeometry(0.14, 14, 10), 'W'); gs.add(mn); c.scene.remove(mn); manos.push(mn);
  }
  gs.add(cuerpo); gs.add(cab);
  ring = tubo([], 0.02, 'A'); fL = flecha('L', 0.03);
  tL = rotulo('L = I·ω = 8 kg·m²/s (constante)', 'L', 0.4); tO = rotulo('ω', 'A', 0.5); tB = rotulo('brazos', 'W', 0.4);
  c.camera.position.set(5, -6, 3.8); c.controls.target.set(0, 0, 1.9); c.controls.update();
  function calc() {
    if (!listo) return;
    var l = 0.55 + 1.05 * (1 - s), pts = [], k;
    brazos.forEach(function (b, i) { var sg = i ? -1 : 1; b.scale.y = l; b.position.set(sg * (0.2 + l / 2), 0, 1.6); manos[i].position.set(sg * (0.2 + l), 0, 1.6); });
    gs.rotation.z = ang * rad;
    for (k = 0; k <= 48; k++) pts.push([0.9 * Math.cos(2 * Math.PI * k / 48 * 0.85), 0.9 * Math.sin(2 * Math.PI * k / 48 * 0.85), 2.7]);
    ring.set(pts); fL.poner([0, 0, 2.5], [0, 0, 3.9]);
    tL.position.set(0, 0, 4.25); tO.position.set(1.1, 0.5, 2.8); tB.position.set(l + 0.9, 0, 1.95);
    lI(fm(I(), 2) + ' kg·m²'); lO(fm(8 / I(), 2) + ' rad/s'); lL(fm(8, 0) + ' kg·m²/s');
  }
  c.slider('Brazos: 0 = extendidos, 1 = pegados al cuerpo', 0, 1, 0.01, s, function (v) { s = v; if (listo) calc(); }, function (v) { return v < 0.02 ? 'extendidos (I = 4)' : (v > 0.98 ? 'pegados (I = 2)' : fm(v, 2)); });
  c.reproductor({ max: 360, valor: 0, paso: 1, vel: function () { return 8 / I() / rad / 4; }, ciclico: true, etiqueta: 'Giro (a 1/4 de la velocidad real)', fmt: function (v) { return Math.round(v) + '°'; }, cb: function (v) { ang = v; calc(); } });
  listo = true; calc();
  c.alCambiarTema(function (q) { P = q; c.renderer.setClearColor(q.bg); pintados.forEach(function (e) { e[0].color.set(q[e[1]]); }); rotulos.forEach(function (r) { r.pintar(); }); c.scene.remove(g); g.geometry.dispose(); g = suelo(-0.2, 8); });
});
