/* Disco con fuerza tangencial (PEC 2, pregunta 8): F = 10 N a r = 0,4 m, I = 2 kg·m². τ = F r = 4 N·m; α = τ/I = 2 rad/s². Escala: 1 unidad = 0,2 m (r = 2 u). */
Interactivos.registrar('disco-torque-pec', function (c) {
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
  var F = 10, I = 2, r = 0.4, t = 0, g, disco, ejeT, fF, fR, fT, sq, anillo, gs, marca, tF, tR, tT, tA, tI, tE, listo = false;
  var lT = c.lectura('τ = F r'), lA = c.lectura('α = τ / I'), lO = c.lectura('ω = α t (en el instante mostrado)');
  g = suelo(-0.5, 12);
  gs = new T.Group(); c.scene.add(gs);
  disco = malla(new T.CylinderGeometry(2.6, 2.6, 0.2, 56), 'acc', 0.55); disco.rotation.x = Math.PI / 2; gs.add(disco); c.scene.remove(disco); gs.add(disco);
  marca = new T.Mesh(new T.BoxGeometry(0.5, 0.15, 0.1), pinta(new T.MeshBasicMaterial({ color: P.A }), 'A')); marca.position.set(2.2, 0, 0.14); gs.add(marca);
  ejeT = tubo([[0, 0, -1.2], [0, 0, 2.4]], 0.04, 'fg');
  fF = flecha('W', 0.03); fR = flecha('E', 0.02); fT = flecha('L', 0.03); sq = tubo([[0.35, 0, 0.12], [0.35, 0.35, 0.12], [0, 0.35, 0.12]], 0.015, 'fg'); anillo = tubo([], 0.02, 'A');
  tF = rotulo('F = 10 N (tangente)', 'W', 0.45); tR = rotulo('r = 0,4 m', 'E', 0.45); tT = rotulo('τ = F·r = 4 N·m', 'L', 0.45); tA = rotulo('α', 'A', 0.6); tI = rotulo('I = 2 kg·m²', 'fg', 0.45); tE = rotulo('eje fijo', 'fg', 0.4);
  c.camera.position.set(5.5, -7, 5); c.controls.target.set(0, 0, 0.6); c.controls.update();
  function calc() {
    if (!listo) return;
    var al = F * r / I, ang = 0.5 * al * t * t;
    gs.rotation.z = ang;
    fR.poner([0, 0, 0.15], [2, 0, 0.15]); tR.position.set(1.0, -0.6, 0.55);
    fF.poner([2, 0, 0.15], [2, 2.4, 0.15]); tF.position.set(3.2, 2.2, 0.5);
    fT.poner([0, 0, 0.15], [0, 0, 2.2]); tT.position.set(0, 0, 2.9);
    var pts = [], k; for (k = 0; k <= 40; k++) pts.push([0.9 * Math.cos(k / 40 * 4.8), 0.9 * Math.sin(k / 40 * 4.8), 1.1]);
    anillo.set(pts); tA.position.set(-1.1, 0.4, 1.1); tI.position.set(-2.6, -2.2, 0.4); tE.position.set(-0.9, 0, -1.4);
    lT(fm(F * r) + ' N·m   (10·0,4)'); lA(fm(al) + ' rad/s²   (4 / 2)'); lO(fm(al * t) + ' rad/s   (t = ' + fm(t, 1) + ' s)');
  }
  c.slider('Fuerza tangencial F (N)', 2, 20, 1, F, function (v) { F = v; if (listo) calc(); }, function (v) { return fm(v, 0) + ' N'; });
  c.reproductor({ max: 4, valor: 0, paso: 0.01, vel: function () { return 1; }, ciclico: true, etiqueta: 'Tiempo t (s)', fmt: function (v) { return fm(v, 1) + ' s'; }, cb: function (v) { t = v; calc(); } });
  listo = true; calc();
  c.alCambiarTema(function (q) { P = q; c.renderer.setClearColor(q.bg); pintados.forEach(function (e) { e[0].color.set(q[e[1]]); }); rotulos.forEach(function (r) { r.pintar(); }); c.scene.remove(g); g.geometry.dispose(); g = suelo(-0.5, 12); });
});
