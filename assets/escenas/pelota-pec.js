/* Pelota contra la pared (PEC 2, pregunta 7): m = 0,15 kg, v1 = +20 m/s, v2 = −10 m/s (sentido positivo = el inicial). J = Δp = m (v2 − v1) = 0,15·(−30) = −4,5 N·s. 1 unidad = 1 m del dibujo (no a escala). El rebote dura el doble que la ida porque la rapidez es la mitad. */
Interactivos.registrar('pelota-pec', function (c) {
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
  var xb = -4, fase = 0, g, pared, bola, fV, fJ, fX, tV1, tV2, tJ, tX, tP, listo = false, t = 0;
  var lP1 = c.lectura('p₁ = m v₁'), lP2 = c.lectura('p₂ = m v₂'), lJ = c.lectura('J = Δp = p₂ − p₁');
  g = suelo(-0.5, 12);
  pared = malla(new T.BoxGeometry(0.4, 5, 3.4), 'mut', 0.7); pared.position.set(4.2, 0, 1.2);
  bola = malla(new T.SphereGeometry(0.4, 24, 16), 'W'); 
  fV = flecha('L', 0.025); fJ = flecha('E', 0.03); fX = flecha('fg', 0.02);
  tV1 = rotulo('v₁ = +20 m/s (antes del choque)', 'L', 0.4); tV2 = rotulo('v₂ = −10 m/s (rebote)', 'A', 0.4); tJ = rotulo('J = Δp = m(v₂ − v₁) = −4,5 N·s', 'E', 0.45); tX = rotulo('+  (sentido inicial)', 'fg', 0.4); tP = rotulo('pared', 'mut', 0.45);
  c.camera.position.set(0, -11, 4.2); c.controls.target.set(0, 0, 0.9); c.controls.update();
  function calc() {
    if (!listo) return;
    var dir = t < 1 ? 1 : -1;
    xb = t < 1 ? -4 + 7.6 * t : 3.6 - 7.6 * (t - 1) / 2;
    bola.position.set(xb, 0, 0);
    fV.poner([xb, 0, 0.9], [xb + dir * 2.2, 0, 0.9]);
    tV1.visible = t < 1; tV2.visible = t >= 1; tV1.position.set(xb, 0, 1.5); tV2.position.set(xb, 0, 1.5);
    fJ.poner([3.8, 0, 2.4], [1.6, 0, 2.4]); tJ.position.set(1.0, 0, 3.0); tP.position.set(4.2, 0, 3.2);
    fX.poner([-4.5, 0, -0.2], [-2.5, 0, -0.2]); tX.position.set(-3.3, 0, -0.75);
    lP1('0,15·(+20) = +3,0 N·s'); lP2('0,15·(−10) = −1,5 N·s'); lJ('−1,5 − (+3,0) = −4,5 N·s');
  }
  c.reproductor({ max: 3, valor: 0, paso: 0.01, vel: function () { return 0.7; }, ciclico: true, etiqueta: 'Tiempo (ida 1 u, rebote 2 u)', fmt: function (v) { return fm(v, 1); }, cb: function (v) { t = v; calc(); } });
  listo = true; calc();
  c.alCambiarTema(function (q) { P = q; c.renderer.setClearColor(q.bg); pintados.forEach(function (e) { e[0].color.set(q[e[1]]); }); rotulos.forEach(function (r) { r.pintar(); }); c.scene.remove(g); g.geometry.dispose(); g = suelo(-0.5, 12); });
});
