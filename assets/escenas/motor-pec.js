/* Motor de la PEC 2 (pregunta 4): carga de 20 kg subiendo a v constante (1 unidad = 1 m). a = 0 → F = m g = 196 N; P = F v = 294 W con v = 1,5 m/s. El rótulo de v es el dato del enunciado; la lectura de P sigue al deslizador. */
Interactivos.registrar('motor-pec', function (c) {
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
  var m = 20, v = 1.5, z = 0.6, g, tambor, caja, cuerda, fF, fW, fV, tF, tW, tV, tM, tMo, listo = false, gt;
  var lF = c.lectura('F = m g'), lP = c.lectura('P = F v');
  g = suelo(-0.4, 12);
  gt = new T.Group(); c.scene.add(gt); gt.position.set(0, 0, 5.2);
  tambor = malla(new T.CylinderGeometry(0.5, 0.5, 1.2, 36), 'mut', 0.9); gt.add(tambor);
  var mk = new T.Mesh(new T.BoxGeometry(0.12, 0.3, 0.12), pinta(new T.MeshBasicMaterial({ color: P.A }), 'A')); mk.position.set(0.5, 0, 0); gt.add(mk);
  tubo([[-0.9, 0, 5.2], [-0.9, 0, -0.4]], 0.05, 'mut'); tubo([[0.9, 0, 5.2], [0.9, 0, -0.4]], 0.05, 'mut');
  caja = malla(new T.BoxGeometry(1, 0.8, 0.8), 'acc', 0.8); cuerda = tubo([], 0.025, 'fg');
  fF = flecha('L', 0.025); fW = flecha('W', 0.025); fV = flecha('A', 0.025);
  tF = rotulo('F = T = m·g', 'L', 0.4); tW = rotulo('m·g', 'W', 0.45); tV = rotulo('v = 1,5 m/s (constante)', 'A', 0.4); tM = rotulo('m = 20 kg', 'fg', 0.4); tMo = rotulo('motor', 'fg', 0.45);
  c.camera.position.set(5, -9, 4.2); c.controls.target.set(0.3, 0, 2.6); c.controls.update();
  function calc() {
    if (!listo) return;
    caja.position.set(0.5, 0, z); cuerda.set([[0.5, 0, z + 0.4], [0.5, 0, 5.2]]); gt.rotation.y = -z / 0.5;
    fF.poner([0.5, 0, z], [0.5, 0, z + 1.8]); fW.poner([0.5, 0, z], [0.5, 0, z - 1.8]); fV.poner([1.6, 0, z], [1.6, 0, z + 1.4]);
    tF.position.set(-1.8, 0, z + 1.3); tW.position.set(0.5, 0, z - 2.2); tV.position.set(3.2, 0, z + 0.9); tM.position.set(-1.7, 0, z - 0.1); tMo.position.set(0, 0, 6.0);
    lF(fm(m * 9.8, 0) + ' N   (a = 0 → F = m g = 20·9,8)'); lP(fm(m * 9.8 * v, 0) + ' W   (v = ' + fm(v, 1) + ' m/s)');
  }
  c.slider('Velocidad de subida v (m/s)', 0.5, 3, 0.1, v, function (a) { v = a; if (listo) calc(); }, function (a) { return fm(a, 1) + ' m/s'; });
  c.reproductor({ max: 2.6, valor: 0, paso: 0.01, vel: function () { return v; }, ciclico: true, etiqueta: 'Altura de la carga', fmt: function (a) { return fm(a, 1) + ' m'; }, cb: function (a) { z = 0.6 + a; calc(); } });
  listo = true; calc();
  c.alCambiarTema(function (q) { P = q; c.renderer.setClearColor(q.bg); pintados.forEach(function (e) { e[0].color.set(q[e[1]]); }); rotulos.forEach(function (r) { r.pintar(); }); c.scene.remove(g); g.geometry.dispose(); g = suelo(-0.4, 12); });
});
