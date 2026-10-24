/* Choques en una dimensión (tema 8): dos cuerpos, coeficiente de restitución e (0 = totalmente inelástico … 1 = elástico). params: {"dim":2,"marcas":false}.
   Velocidades finales (cantidad de movimiento + definición de e, v2' − v1' = −e (v2 − v1)):
     v1' = [(m1 − e m2) v1 + (1 + e) m2 v2] / (m1 + m2),   v2' = [(m2 − e m1) v2 + (1 + e) m1 v1] / (m1 + m2).
   Pérdida de energía cinética: ΔK = −½ μ (1 − e²) (v1 − v2)², con μ = m1 m2 / (m1 + m2). El centro de masa lleva siempre v_cm = P / M.
   El cuerpo A (antes «1») está a la izquierda y el choque ocurre en t = 0; solo hay choque si vA1 > vB1. */
Interactivos.registrar('choques', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var m1 = 0.5, m2 = 0.3, v1 = 2, v2 = -2, e = 1, fs = -0.55, anim = 0;
  var suelo, traza, pCM, b1, b2, o1, o2, a1, a2, base1, base2, barras = [], rSl = null, etCM, ya = false;
  var YP = -4.8, YK = -7.2, KP = 2.3, KK = 4.7, BW = 0.75;
  var f2 = function (t) { var r = Math.round(t * 100) / 100; return String(r === 0 ? 0 : r).replace('-', '−').replace('.', ','); };
  var lT = c.lectura('Instante t (el choque ocurre en t = 0)'), lV0 = c.lectura('Velocidades antes (vA1 ; vB1)'), lV1 = c.lectura('Velocidades después (vA2 ; vB2)'),
      lP = c.lectura('Cantidad de movimiento total P: antes → después'), lK = c.lectura('Energía cinética total K: antes → después'),
      lD = c.lectura('Energía cinética perdida ΔK'), lC = c.lectura('Velocidad del centro de masa (constante)'), lR = c.lectura('Velocidad relativa vB − vA: antes → después'), lE = c.lectura('Tipo de choque');

  function caja(col, op, z) {
    var m = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ color: col, transparent: true, opacity: op, side: T.DoubleSide }));
    m.position.z = z; m.poner = function (x0, y0, x1, y1) { m.position.x = (x0 + x1) / 2; m.position.y = (y0 + y1) / 2; m.scale.set(Math.max(1e-6, x1 - x0), Math.max(1e-6, y1 - y0), 1); };
    c.scene.add(m); return m;
  }
  function contorno(x0, y0, x1, y1) { return [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]; }

  function nuevo() {
    c.vista(-9.2, 9.2, -9.3, 3.0); var w = 0.0055 * 12.3;
    suelo = H.cinta(T, [[[-9.2, 0], [9.2, 0]]], P.fg, w * 1.6); c.scene.add(suelo);
    traza = H.cinta(T, [[[-9, -0.6], [9, -0.6]]], P.mut, w, [w * 5, w * 3]); traza.position.z = 0.05; c.scene.add(traza);
    pCM = H.punto(T, 0, -0.6, w * 3.4, P.fg); pCM.position.z = 0.4; c.scene.add(pCM);
    b1 = caja(P.acc, 0.55, 0.05); b2 = caja(P.A, 0.55, 0.05);
    o1 = H.cinta(T, [], P.acc, w * 1.4); o2 = H.cinta(T, [], P.A, w * 1.4); o1.position.z = 0.1; o2.position.z = 0.1; c.scene.add(o1, o2);
    a1 = H.flecha2D(T, P.acc, w * 1.6); a2 = H.flecha2D(T, P.A, w * 1.6); a1.position.z = 0.3; a2.position.z = 0.3; c.scene.add(a1, a2);
    base1 = H.cinta(T, [[[-8.8, YP], [-0.4, YP]]], P.mut, w); base2 = H.cinta(T, [[[0.4, YK], [8.8, YK]]], P.mut, w); c.scene.add(base1, base2);
    [P.acc, P.A, P.fg, P.acc, P.A, P.fg, P.acc, P.A, P.fg, P.acc, P.A, P.fg].forEach(function (col, i) { barras.push(caja(col, 0.7, 0.2)); });
    c.etiqueta('Cantidad de movimiento p', -4.6, -2.15); c.etiqueta('Energía cinética K', 4.6, -2.15);
    [['antes', -6.95], ['después', -2.25], ['antes', 2.25], ['después', 6.95]].forEach(function (q) { c.etiqueta(q[0], q[1], -7.95); });
    etCM = c.etiqueta('CM', 0, -0.6, 'l');
  }
  function finales() {
    var M = m1 + m2;
    return [((m1 - e * m2) * v1 + (1 + e) * m2 * v2) / M, ((m2 - e * m1) * v2 + (1 + e) * m1 * v1) / M];
  }
  function calc() {
    if (!b1) return;
    var M = m1 + m2, choque = v1 > v2 + 1e-9, fin = choque ? finales() : [v1, v2], vf1 = fin[0], vf2 = fin[1];
    var p1 = m1 * v1, p2 = m2 * v2, q1 = m1 * vf1, q2 = m2 * vf2, K1 = 0.5 * m1 * v1 * v1, K2 = 0.5 * m2 * v2 * v2, L1 = 0.5 * m1 * vf1 * vf1, L2 = 0.5 * m2 * vf2 * vf2;
    var K0 = K1 + K2, Kf = L1 + L2, vcm = (p1 + p2) / M;
    var vmax = Math.max(Math.abs(v1), Math.abs(v2), Math.abs(vf1), Math.abs(vf2), 0.5), Tt = 4.4 / vmax, t = fs * Tt;
    if (!choque && t < 0) t = 0;
    var w1 = 1.1 + 0.55 * Math.sqrt(m1), w2 = 1.1 + 0.55 * Math.sqrt(m2), h1 = 0.55 * w1 + 0.2, h2 = 0.55 * w2 + 0.2;
    var u1 = t < 0 ? v1 : vf1, u2 = t < 0 ? v2 : vf2, x1 = -w1 / 2 + u1 * t, x2 = w2 / 2 + u2 * t, xc = (m1 * x1 + m2 * x2) / M;
    b1.poner(x1 - w1 / 2, 0, x1 + w1 / 2, h1); b2.poner(x2 - w2 / 2, 0, x2 + w2 / 2, h2);
    o1.set([contorno(x1 - w1 / 2, 0, x1 + w1 / 2, h1)]); o2.set([contorno(x2 - w2 / 2, 0, x2 + w2 / 2, h2)]);
    var kv = 2.6 / vmax;
    a1.poner([x1, h1 + 0.6], [x1 + u1 * kv, h1 + 0.6]); a2.poner([x2, h2 + 0.6], [x2 + u2 * kv, h2 + 0.6]);
    pCM.mover(xc, -0.6); etCM.mover(xc + 0.3, -0.6);
    /* barras de p (signo) y de K */
    var pm = Math.max(Math.abs(p1), Math.abs(p2), Math.abs(q1), Math.abs(q2), Math.abs(p1 + p2), 1e-9), Km = Math.max(K0, Kf, 1e-9);
    var xs = [-7.9, -6.95, -6.0, -3.2, -2.25, -1.3], vp = [p1, p2, p1 + p2, q1, q2, q1 + q2], vk = [K1, K2, K0, L1, L2, Kf];
    xs.forEach(function (x, i) {
      var y = YP + vp[i] / pm * KP; barras[i].poner(x - BW / 2, Math.min(YP, y), x + BW / 2, Math.max(YP, y));
      var z = YK + vk[i] / Km * KK; barras[6 + i].poner(x + 9.2 - BW / 2, YK, x + 9.2 + BW / 2, z);
    });
    lT(f2(t) + ' s');
    lV0(f2(v1) + ' ; ' + f2(v2) + ' m/s'); lV1(f2(vf1) + ' ; ' + f2(vf2) + ' m/s');
    lP(f2(p1 + p2) + ' → ' + f2(q1 + q2) + ' kg·m/s' + (choque ? '  (se conserva)' : '')); lK(f2(K0) + ' → ' + f2(Kf) + ' J');
    var perd = K0 - Kf; lD(f2(perd) + ' J' + (K0 > 1e-9 ? '  (' + f2(100 * perd / K0) + ' % de la inicial)' : ''));
    lC(f2(vcm) + ' m/s'); lR(f2(v2 - v1) + ' → ' + f2(vf2 - vf1) + ' m/s' + (choque ? '  (cociente = −e = ' + f2(-e) + ')' : ''));
    lE(!choque ? 'No hay choque: el cuerpo A no alcanza al cuerpo B (hace falta vA1 > vB1).' : e >= 0.995 ? 'Choque elástico: se conserva K.' : e <= 0.005 ? 'Totalmente inelástico: quedan unidos, misma velocidad final.' : 'Choque inelástico: se pierde parte de K.');
  }
  function arrancar() { if (ya || !rSl) return; ya = true; ult = 0; requestAnimationFrame(bucle); }
  var ult = 0, pausa = 0, vis = true;
  function bucle(ts) {
    ya = false; if (!anim || !vis) return;
    var dt = Math.min(0.06, ult ? (ts - ult) / 1000 : 0.016); ult = ts;
    if (fs >= 1) { pausa += dt; if (pausa > 0.9) { fs = -1; pausa = 0; } } else fs = Math.min(1, fs + dt / 3.2);
    rSl.value = fs; rSl.dispatchEvent(new Event('input', { bubbles: true }));
    ya = true; requestAnimationFrame(bucle);
  }
  c.slider('Masa del cuerpo A, mA (kg)', 0.1, 5, 0.1, m1, function (v) { m1 = v; calc(); }, function (v) { return f2(v) + ' kg'; });
  c.slider('Masa del cuerpo B, mB (kg)', 0.1, 5, 0.1, m2, function (v) { m2 = v; calc(); }, function (v) { return f2(v) + ' kg'; });
  c.slider('Velocidad inicial del cuerpo A, vA1 (m/s)', -6, 6, 0.1, v1, function (v) { v1 = v; calc(); }, function (v) { return f2(v) + ' m/s'; });
  c.slider('Velocidad inicial del cuerpo B, vB1 (m/s)', -6, 6, 0.1, v2, function (v) { v2 = v; calc(); }, function (v) { return f2(v) + ' m/s'; });
  c.slider('Coeficiente de restitución e (0 = inelástico, 1 = elástico)', 0, 1, 0.05, e, function (v) { e = v; calc(); }, f2);
  rSl = c.slider('Tiempo (de antes a después del choque)', -1, 1, 0.01, fs, function (v) { fs = v; if (v < 1) pausa = 0; calc(); }, function (v) { return v < -0.005 ? 'antes' : v > 0.005 ? 'después' : 'justo en el choque'; });
  c.selector('Animación', ['Parada', 'En marcha'], 0, function (i) { anim = i; if (i) { ult = 0; arrancar(); } });
  c.leyenda([['var(--acc)', 'cuerpo A', 'area'], ['var(--A)', 'cuerpo B', 'area'], ['var(--fg)', 'suma de los dos (el sistema)', 'area'], ['var(--mut)', 'centro de masa (punto del CM) y línea de referencia de las barras', 'linea']]);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis && anim) { ult = 0; arrancar(); } }).observe(c.el);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!b1) return;
    suelo.material.color.set(p.fg); traza.material.color.set(p.mut); pCM.material.color.set(p.fg); base1.material.color.set(p.mut); base2.material.color.set(p.mut);
    b1.material.color.set(p.acc); o1.material.color.set(p.acc); a1.material.color.set(p.acc); b2.material.color.set(p.A); o2.material.color.set(p.A); a2.material.color.set(p.A);
    [p.acc, p.A, p.fg, p.acc, p.A, p.fg, p.acc, p.A, p.fg, p.acc, p.A, p.fg].forEach(function (col, i) { barras[i].material.color.set(col); });
  });
  nuevo(); calc();
});
