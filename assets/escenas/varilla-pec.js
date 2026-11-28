/* Varilla de la PEC 2 (pregunta 1): M = 3 kg, L = 2 m (1 unidad = 0,5 m). Eje vertical (perpendicular a la varilla) a una distancia d del centro; con d = L/2 = 1 m es el extremo: I = ⅓ M L² = 4 kg·m².
   Steiner: I = I_cm + M d², I_cm = M L²/12 = 1 kg·m². */
Interactivos.registrar('varilla-pec', function (c) {
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
  var M = 3, d = 1.0, g, rod, cm, ej, pv, fL1, fL2, fD1, fD2, tE, tC, tL, tD, tM, listo = false;
  var lI = c.lectura('I respecto al eje  =  I_cm + M d²'), lF = c.lectura('Con el eje en el extremo (d = 1 m)');
  g = suelo(-1.7, 10);
  rod = malla(new T.CylinderGeometry(0.11, 0.11, 4, 28), 'acc', 0.75); rod.rotation.z = Math.PI / 2; rod.position.set(2, 0, 0);
  cm = malla(new T.SphereGeometry(0.15, 18, 12), 'W'); cm.position.set(2, 0, 0);
  pv = malla(new T.SphereGeometry(0.15, 18, 12), 'fg');
  ej = tubo([[0, 0, -1.6], [0, 0, 1.6]], 0.03, 'fg');
  fL1 = flecha('mut', 0.02); fL2 = flecha('mut', 0.02); fD1 = flecha('E', 0.02); fD2 = flecha('E', 0.02);
  tE = rotulo('eje de giro O (perpendicular a la varilla)', 'fg', 0.4); tC = rotulo('CM', 'W', 0.4); tL = rotulo('L = 2 m', 'mut', 0.4); tD = rotulo('d = 1,00 m', 'E', 0.4); tM = rotulo('M = 3 kg', 'fg', 0.4);
  c.camera.position.set(2.2, -8, 3.6); c.controls.target.set(2, 0, 0); c.controls.update();
  function calc() {
    var xe = 2 - 2 * d;
    ej.set([[xe, 0, -1.5], [xe, 0, 1.5]]); pv.position.set(xe, 0, 0);
    fL1.poner([2, 0, -1.0], [0, 0, -1.0]); fL2.poner([2, 0, -1.0], [4, 0, -1.0]);
    fD1.poner([(xe + 2) / 2, 0, 0.8], [xe, 0, 0.8]); fD2.poner([(xe + 2) / 2, 0, 0.8], [2, 0, 0.8]);
    tE.position.set(xe + 1.6, 0, 1.9); tC.position.set(2, 0, -0.5); tL.position.set(2, 0, -1.4); tD.position.set((xe + 2) / 2, 0, 1.2); tD.visible = d > 0.05; tM.position.set(3.2, 0, 0.45);
    lI(fm(1) + ' + ' + fm(3 * d * d) + '  =  ' + fm(1 + 3 * d * d) + ' kg·m²   (d = ' + fm(d) + ' m)');
    lF('I = ⅓ M L² = ⅓·3·2² = 4 kg·m²');
  }
  c.slider('Distancia d del eje al centro (m)', 0, 1, 0.05, d, function (v) { d = v; if (listo) calc(); }, function (v) { return fm(v) + ' m'; });
  listo = true; calc();
  c.alCambiarTema(function (q) { P = q; c.renderer.setClearColor(q.bg); pintados.forEach(function (e) { e[0].color.set(q[e[1]]); }); rotulos.forEach(function (r) { r.pintar(); }); c.scene.remove(g); g.geometry.dispose(); g = suelo(-1.7, 10); });
});
