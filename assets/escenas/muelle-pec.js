/* Muelle de la PEC 2 (pregunta 9): k = 200 N/m, compresión x = 10 cm. U = ½ k x² = ½·200·0,1² = 1 J. Escala: 1 unidad = 5 cm; longitud natural dibujada = 5 u. */
Interactivos.registrar('muelle-pec', function (c) {
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
  var x = 10, k = 200, g, pared, bloque, muelle, fF, fX, marcaEq, tK, tX, tF, tEq, tU, listo = false;
  var lU = c.lectura('U = ½ k x²'), lFk = c.lectura('F = k x');
  g = suelo(-0.5, 12);
  pared = malla(new T.BoxGeometry(0.4, 2.4, 2.4), 'mut', 0.8); pared.position.set(-3.2, 0, 0.9);
  bloque = malla(new T.BoxGeometry(1, 1.4, 1.4), 'acc', 0.85);
  muelle = tubo([], 0.03, 'fg'); marcaEq = tubo([[1.8, 0, -0.6], [1.8, 0, 2.4]], 0.02, 'mut');
  fF = flecha('L', 0.03); fX = flecha('E', 0.025);
  tK = rotulo('k = 200 N/m', 'fg', 0.45); tX = rotulo('x = 10 cm (compresión)', 'E', 0.4); tF = rotulo('F = k·x = 20 N (del muelle sobre el bloque)', 'L', 0.4); tEq = rotulo('posición de equilibrio', 'mut', 0.4); tU = rotulo('', 'W', 0.4);
  c.camera.position.set(0.5, -9, 4); c.controls.target.set(0, 0, 0.8); c.controls.update();
  function calc() {
    if (!listo) return;
    var u = x / 5, xb = 1.8 - u - 0.5, pts = [], n = 56, j;
    bloque.position.set(xb, 0, 0.9);
    var largo = (xb - 0.5) - (-3.0);
    for (j = 0; j <= n; j++) { var s = j / n, px = -3.0 + largo * s, a = s * 2 * Math.PI * 9; pts.push([px, j > 3 && j < n - 3 ? 0.55 * Math.cos(a) : 0, 0.9 + (j > 3 && j < n - 3 ? 0.55 * Math.sin(a) : 0)]); }
    muelle.set(pts);
    fF.poner([xb + 0.5, 0, 0.9], [xb + 2.5, 0, 0.9]); tF.position.set(xb + 2.2, 0, 1.6); tF.visible = u > 0.3;
    fX.poner([1.8, 0, 2.0], [1.8 - u, 0, 2.0]); tX.position.set(1.8 - u / 2, 0, 2.6); tX.visible = u > 0.3;
    tK.position.set(-1.5, 0, -0.4); tEq.position.set(1.8, 0, 2.95);
    lU(fm(0.5 * k * Math.pow(x / 100, 2)) + ' J   (½·200·' + fm(x / 100) + '²)'); lFk(fm(k * x / 100, 1) + ' N');
  }
  c.slider('Compresión x (cm)', 0, 20, 1, x, function (v) { x = v; if (listo) calc(); }, function (v) { return fm(v, 0) + ' cm'; });
  listo = true; calc();
  c.alCambiarTema(function (q) { P = q; c.renderer.setClearColor(q.bg); pintados.forEach(function (e) { e[0].color.set(q[e[1]]); }); rotulos.forEach(function (r) { r.pintar(); }); c.scene.remove(g); g.geometry.dispose(); g = suelo(-0.5, 12); });
});
