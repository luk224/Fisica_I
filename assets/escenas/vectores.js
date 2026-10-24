/* Producto escalar y vectorial en R³ (tema 1): dos vectores con sliders, ángulo, proyección y A×B. */
Interactivos.registrar('vectores', function (c) {
  var T = c.THREE, H = c.H;
  var u = [2, 1, 1], v = [1, 2, 0], P = c.colores(), r = 0.07;
  var rejilla, ejes, fu, fv, fx, proy, arco;
  var l1 = c.lectura('A · B'), l2 = c.lectura('|A|  ,  |B|'), l3 = c.lectura('Ángulo φ entre A y B'), l4 = c.lectura('A × B'), l5 = c.lectura('|A × B| = área del paralelogramo'), l6 = c.lectura('');
  function fm(t) { return (Math.round(t * 100) / 100).toString().replace('-', '−').replace('.', ','); }
  function limpia(o) { if (o) { c.scene.remove(o); if (o.geometry) o.geometry.dispose(); } }
  function nuevo() {
    rejilla = new T.GridHelper(8, 8, P.mut, P.bd); rejilla.rotation.x = Math.PI / 2; c.scene.add(rejilla);
    ejes = H.ejes(T, 4, P.mut); c.scene.add(ejes);
    fu = H.flecha(T, P.S, r); fv = H.flecha(T, P.A, r); fx = H.flecha(T, P.W, r); c.scene.add(fu, fv, fx);
    proy = H.tubo(T, [], r * 0.7, P.L); arco = H.tubo(T, [], r * 0.5, P.fg); c.scene.add(proy, arco);
    c.camera.position.set(-3, -7, 5.5); c.controls.target.set(0, 0, 0); c.controls.update();
  }
  function calc() {
    var uv = u[0] * v[0] + u[1] * v[1] + u[2] * v[2], nu = Math.hypot(u[0], u[1], u[2]), nv = Math.hypot(v[0], v[1], v[2]);
    var cx = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]], nc = Math.hypot(cx[0], cx[1], cx[2]);
    fu.poner([0, 0, 0], u); fv.poner([0, 0, 0], v); fx.poner([0, 0, 0], cx);
    if (nv > 1e-9) { var k = uv / (nv * nv); proy.set(Math.abs(k) * nv > 1e-6 ? [[0, 0, 0], [k * v[0], k * v[1], k * v[2]]] : []); } else proy.set([]);
    var pts = [];
    if (nu > 1e-9 && nv > 1e-9) {
      var cs = Math.max(-1, Math.min(1, uv / (nu * nv))), al = Math.acos(cs), eu = u.map(function (x) { return x / nu; });
      var w = [v[0] / nv - cs * eu[0], v[1] / nv - cs * eu[1], v[2] / nv - cs * eu[2]], nw = Math.hypot(w[0], w[1], w[2]);
      if (nw > 1e-9) { w = w.map(function (x) { return x / nw; }); for (var i = 0; i <= 24; i++) { var t = al * i / 24; pts.push([0.8 * (Math.cos(t) * eu[0] + Math.sin(t) * w[0]), 0.8 * (Math.cos(t) * eu[1] + Math.sin(t) * w[1]), 0.8 * (Math.cos(t) * eu[2] + Math.sin(t) * w[2])]); } }
      l3(fm(al * 180 / Math.PI) + '°   (cos φ = ' + fm(cs) + ')');
    } else l3('no definido (algún vector es nulo)');
    arco.set(pts);
    l1(fm(uv)); l2(fm(nu) + '  ,  ' + fm(nv)); l4('(' + fm(cx[0]) + ' , ' + fm(cx[1]) + ' , ' + fm(cx[2]) + ')'); l5(fm(nc));
    l6(Math.abs(uv) < 0.03 && nu > 1e-9 && nv > 1e-9 ? 'A · B ≈ 0: perpendiculares (φ = 90°), |A × B| es máximo' : (nc < 0.03 && nu > 1e-9 && nv > 1e-9 ? 'A × B ≈ 0: paralelos o antiparalelos' : ''));
  }
  nuevo();
  ['x', 'y', 'z'].forEach(function (nom, i) { c.slider('A' + nom, -3, 3, 0.1, u[i], function (a) { u[i] = a; if (arco) calc(); }); });
  ['x', 'y', 'z'].forEach(function (nom, i) { c.slider('B' + nom, -3, 3, 0.1, v[i], function (a) { v[i] = a; if (arco) calc(); }); });
  c.leyenda([['var(--U)', 'A', 'linea'], ['var(--A)', 'B', 'linea'], ['var(--warn-b)', 'A × B', 'linea'], ['var(--X)', 'proyección de A sobre B', 'linea']]);
  c.alCambiarTema(function (q) {
    P = q; c.renderer.setClearColor(q.bg);
    if (!arco) return;
    limpia(rejilla); rejilla = new T.GridHelper(8, 8, q.mut, q.bd); rejilla.rotation.x = Math.PI / 2; c.scene.add(rejilla);
    ejes.userData.mat.color.set(q.mut); proy.material.color.set(q.L); arco.material.color.set(q.fg);
    [[fu, q.S], [fv, q.A], [fx, q.W]].forEach(function (e) { e[0].userData.eje.material.color.set(e[1]); e[0].userData.cono.material.color.set(e[1]); });
  });
  calc();
});
