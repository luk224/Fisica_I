/* Bloque de la PEC 2 (pregunta 3): peso (gravitatorio), normal y rozamiento (electromagnéticos: repulsión entre los átomos de las superficies en contacto). Las flechas no están a escala. */
Interactivos.registrar('bloque-pec', function (c) {
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
  var xb = 0, g, mesa, bloque, fP, fN, fF, fV, tP, tN, tF, tV, tB, listo = false, zc = 0.5;
  g = suelo(-0.2, 10);
  mesa = malla(new T.BoxGeometry(9, 5, 0.2), 'mut', 0.45); mesa.position.set(0, 0, -0.1);
  bloque = malla(new T.BoxGeometry(1.6, 1.2, 1), 'acc', 0.8);
  fP = flecha('W', 0.025); fN = flecha('E', 0.025); fF = flecha('L', 0.025); fV = flecha('A', 0.025);
  tP = rotulo('P = m·g  (origen gravitatorio)', 'W', 0.4); tN = rotulo('N  (origen electromagnético)', 'E', 0.4); tF = rotulo('f  (origen electromagnético)', 'L', 0.4); tV = rotulo('v', 'A', 0.45); tB = rotulo('bloque', 'fg', 0.4);
  c.camera.position.set(1.5, -8.5, 4.2); c.controls.target.set(0, 0, 0.8); c.controls.update();
  function calc() {
    if (!listo) return;
    bloque.position.set(xb, 0, zc);
    fP.poner([xb, 0, zc], [xb, 0, zc - 2.0]); fN.poner([xb, 0, zc], [xb, 0, zc + 2.0]);
    fF.poner([xb - 0.8, 0, zc], [xb - 2.5, 0, zc]); fV.poner([xb + 0.8, 0, zc], [xb + 2.5, 0, zc]);
    tP.position.set(xb, 0, zc - 2.4); tN.position.set(xb, 0, zc + 2.4); tF.position.set(xb - 2.0, 0, zc + 0.35); tV.position.set(xb + 2.8, 0, zc); tB.position.set(xb, 0, zc - 0.05); tB.visible = false;
  }
  c.reproductor({ max: 3, valor: 0, paso: 0.01, vel: function () { return 0.8; }, ciclico: true, etiqueta: 'Posición del bloque (se desliza hacia +x)', fmt: function (v) { return fm(v, 1) + ' u'; }, cb: function (v) { xb = v - 1.5; calc(); } });
  listo = true; calc();
  c.alCambiarTema(function (q) { P = q; c.renderer.setClearColor(q.bg); pintados.forEach(function (e) { e[0].color.set(q[e[1]]); }); rotulos.forEach(function (r) { r.pintar(); }); c.scene.remove(g); g.geometry.dispose(); g = suelo(-0.2, 10); });
});
