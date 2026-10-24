/* Choque de dos discos lisos en el plano (tema 8). params: {"dim":2,"marcas":false}.
   El disco 1 (incidente, radio 0,5 m) llega con velocidad v₀ en +x y su trayectoria pasa a una distancia b (parámetro de impacto) del centro del disco 2 (en reposo, radio 0,5 m).
   Al ser lisos, la fuerza de contacto va según la recta de los centros (normal n, con sen α = b/(r₁ + r₂)): solo cambia la componente normal de la velocidad relativa u = v₀ cos α,
   y la tangencial se mantiene. Con el coeficiente de restitución e: impulso J = (1 + e) μ u (μ = m₁ m₂ /(m₁ + m₂)), v₁′ = v₁ − (J/m₁) n, v₂′ = (J/m₂) n.
   ΔK = −½ μ (1 − e²) u². Con masas iguales y e = 1 las velocidades finales son perpendiculares (cuando b > 0). */
Interactivos.registrar('choque-2d', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var m1 = 1, m2 = 1, v0 = 5, b = 0.5, e = 1, fs = 0.5, anim = 0, R = 1.0;
  var d1, d2, o1, o2, p1a, p2a, pCM, traza, normal, tri0, tri1, tri2, sep, rSl = null, ya = false, ult = 0, pausa = 0, vis = true, tCM, t1, t2, tP, cmLin;
  var f2 = function (t) { var r = Math.round(t * 100) / 100; return String(r === 0 ? 0 : r).replace('-', '−').replace('.', ','); };
  var f1 = function (t) { var r = Math.round(t * 10) / 10; return String(r === 0 ? 0 : r).replace('-', '−').replace('.', ','); };
  var lA = c.lectura('Parámetro de impacto b y ángulo α de la recta de los centros'), lV1 = c.lectura('Velocidad final del disco 1'), lV2 = c.lectura('Velocidad final del disco 2'),
      lG = c.lectura('Ángulo entre las dos velocidades finales'), lP = c.lectura('Cantidad de movimiento total (x ; y): antes → después'),
      lK = c.lectura('Energía cinética total: antes → después'), lC = c.lectura('Velocidad del centro de masa (constante)'), lE = c.lectura('Tipo de choque');

  function disco(col) {
    var m = new T.Mesh(new T.CircleGeometry(1, 40), new T.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5, side: T.DoubleSide }));
    m.position.z = 0.05; m.poner = function (x, y, r) { m.position.x = x; m.position.y = y; m.scale.set(r, r, 1); }; c.scene.add(m); return m;
  }
  function circ(x, y, r) { var q = [], i; for (i = 0; i <= 40; i++) q.push([x + r * Math.cos(2 * Math.PI * i / 40), y + r * Math.sin(2 * Math.PI * i / 40)]); return q; }
  function nuevo() {
    c.vista(-3.7, 9.2, -3.2, 3.2); var w = 0.0055 * 6.4;
    d1 = disco(P.acc); d2 = disco(P.A);
    o1 = H.cinta(T, [], P.acc, w * 1.5); o2 = H.cinta(T, [], P.A, w * 1.5); o1.position.z = 0.1; o2.position.z = 0.1; c.scene.add(o1, o2);
    normal = H.cinta(T, [], P.mut, w, [w * 4, w * 3]); normal.position.z = 0.02; traza = H.cinta(T, [], P.mut, w, [w * 4, w * 3]); traza.position.z = 0.02; c.scene.add(normal, traza);
    p1a = H.flecha2D(T, P.acc, w * 1.8); p2a = H.flecha2D(T, P.A, w * 1.8); p1a.position.z = 0.3; p2a.position.z = 0.3; c.scene.add(p1a, p2a);
    pCM = H.punto(T, 0, 0, w * 3.4, P.fg); pCM.position.z = 0.4; c.scene.add(pCM);
    sep = H.cinta(T, [[[3.75, -3.0], [3.75, 3.0]]], P.bd, w); c.scene.add(sep);
    tri0 = H.flecha2D(T, P.fg, w * 1.6); tri1 = H.flecha2D(T, P.acc, w * 1.8); tri2 = H.flecha2D(T, P.A, w * 1.8); [tri0, tri1, tri2].forEach(function (f, i) { f.position.z = 0.3 + i * 0.01; c.scene.add(f); });
    c.etiqueta('Vista desde arriba', -0.1, 2.9); c.etiqueta('Cantidad de movimiento', 6.5, 2.9);
    tCM = c.etiqueta('CM', 0, 0, 'l'); t1 = c.etiqueta('p₁′', 0, 0); t2 = c.etiqueta('p₂′', 0, 0); tP = c.etiqueta('P', 0, 0);
  }
  function calc() {
    if (!d1) return;
    var M = m1 + m2, al = Math.asin(Math.min(0.999, b / R)), ca = Math.cos(al), sa = Math.sin(al), nx = ca, ny = -sa, mu = m1 * m2 / M, u = v0 * ca, J = (1 + e) * mu * u;
    var a1x = v0 - J / m1 * nx, a1y = -J / m1 * ny, a2x = J / m2 * nx, a2y = J / m2 * ny;
    if (Math.abs(a1x) < 1e-9) a1x = 0; if (Math.abs(a1y) < 1e-9) a1y = 0; if (Math.abs(a2y) < 1e-9) a2y = 0; if (Math.abs(a2x) < 1e-9) a2x = 0;
    var s1 = Math.hypot(a1x, a1y), s2 = Math.hypot(a2x, a2y), vmax = Math.max(v0, s1, s2, 0.5), Tt = 2.2 / vmax, t = fs * Tt;
    var cx = -Math.sqrt(R * R - b * b), cy = b;
    var x1, y1, x2, y2;
    if (t < 0) { x1 = cx + v0 * t; y1 = cy; x2 = 0; y2 = 0; } else { x1 = cx + a1x * t; y1 = cy + a1y * t; x2 = a2x * t; y2 = a2y * t; }
    d1.poner(x1, y1, 0.5); d2.poner(x2, y2, 0.5); o1.set([circ(x1, y1, 0.5)]); o2.set([circ(x2, y2, 0.5)]);
    var ux1 = t < 0 ? v0 : a1x, uy1 = t < 0 ? 0 : a1y, ux2 = t < 0 ? 0 : a2x, uy2 = t < 0 ? 0 : a2y;
    var pm = Math.max(m1 * v0, m1 * s1, m2 * s2, 1e-9), kp = 1.5 / pm;
    p1a.poner([x1, y1], [x1 + m1 * ux1 * kp, y1 + m1 * uy1 * kp]); p2a.poner([x2, y2], [x2 + m2 * ux2 * kp, y2 + m2 * uy2 * kp]);
    /* centro de masa */
    var vcx = m1 * v0 / M, ycm = m1 * cy / M, xcm = (m1 * x1 + m2 * x2) / M, yc = (m1 * y1 + m2 * y2) / M;
    pCM.mover(xcm, yc); tCM.mover(xcm + 0.2, yc + 0.22);
    traza.set([[[-Tt * vcx + (m1 * cx) / M, ycm], [Tt * vcx + (m1 * cx) / M, ycm]]]);
    normal.set(b < R - 1e-6 ? [[[cx - nx * 1.3, cy - ny * 1.3], [nx * 1.3, ny * 1.3]]] : []);
    /* triángulo de cantidad de movimiento */
    var kt = 2.4 / Math.max(m1 * v0, 1e-9), O = [6.2, -0.7], Pt = [O[0] + m1 * v0 * kt, O[1]], Q = [O[0] + m1 * a1x * kt, O[1] + m1 * a1y * kt];
    tri0.poner(O, Pt); tri1.poner(O, Q); tri2.poner(Q, Pt);
    t1.mover((O[0] + Q[0]) / 2 - 0.3, (O[1] + Q[1]) / 2 + 0.2); t2.mover((Q[0] + Pt[0]) / 2 + 0.35, (Q[1] + Pt[1]) / 2 + 0.05); tP.mover((O[0] + Pt[0]) / 2, O[1] - 0.4);
    t1.ver(m1 * s1 * kt > 0.5); t2.ver(m2 * s2 * kt > 0.5);
    /* lecturas */
    var th1 = Math.atan2(a1y, a1x) * 180 / Math.PI, th2 = Math.atan2(a2y, a2x) * 180 / Math.PI, K0 = 0.5 * m1 * v0 * v0, Kf = 0.5 * m1 * s1 * s1 + 0.5 * m2 * s2 * s2;
    lA('b = ' + f2(b) + ' m  →  α = ' + f1(al * 180 / Math.PI) + '°  (radio de cada disco: 0,5 m)');
    lV1(s1 > 1e-6 ? f2(s1) + ' m/s a ' + f1(th1) + '° respecto a +x' : 'queda en reposo'); lV2(s2 > 1e-6 ? f2(s2) + ' m/s a ' + f1(th2) + '° respecto a +x' : 'queda en reposo');
    var cosg = (a1x * a2x + a1y * a2y) / (s1 * s2 || 1), gam = Math.acos(Math.max(-1, Math.min(1, cosg))) * 180 / Math.PI;
    lG(s1 > 1e-6 && s2 > 1e-6 ? f1(gam) + '°' + (Math.abs(gam - 90) < 0.05 && e > 0.995 ? '  (¡90°: masas iguales y choque elástico!)' : '') : 'no definido (un disco queda en reposo)');
    lP('(' + f2(m1 * v0) + ' ; 0) → (' + f2(m1 * a1x + m2 * a2x) + ' ; ' + f2(m1 * a1y + m2 * a2y) + ') kg·m/s'); lK(f2(K0) + ' → ' + f2(Kf) + ' J  (pérdida ' + f2(K0 - Kf) + ' J)'); lC(f2(vcx) + ' m/s, siempre en +x');
    lE(b >= R - 0.011 ? 'Roce casi tangente: casi no hay interacción.' : e >= 0.995 ? 'Choque elástico: se conservan P y K.' : 'Choque inelástico (solo se pierde la componente normal): se conserva P, no K.');
  }
  c.slider('Masa del disco 1 (incidente), m₁ (kg)', 0.1, 5, 0.1, m1, function (v) { m1 = v; calc(); }, function (v) { return f2(v) + ' kg'; });
  c.slider('Masa del disco 2 (en reposo), m₂ (kg)', 0.1, 5, 0.1, m2, function (v) { m2 = v; calc(); }, function (v) { return f2(v) + ' kg'; });
  c.slider('Rapidez inicial v₀ del disco 1 (m/s)', 1, 10, 0.5, v0, function (v) { v0 = v; calc(); }, function (v) { return f1(v) + ' m/s'; });
  c.slider('Parámetro de impacto b (m)', 0, 0.99, 0.01, b, function (v) { b = v; calc(); }, function (v) { return f2(v) + ' m'; });
  c.slider('Coeficiente de restitución e (0 = inelástico, 1 = elástico)', 0, 1, 0.05, e, function (v) { e = v; calc(); }, f2);
  c.reproductor({ max: 2, valor: fs + 1, paso: 0.01, vel: 2 / 3.2, pausaFin: 0.9, etiqueta: 'Instante del choque',
    fmt: function (v) { return v < 0.995 ? 'antes del choque' : v > 1.005 ? 'después del choque' : 'justo en el choque'; }, cb: function (v) { fs = v - 1; calc(); } });
  c.leyenda([['var(--acc)', 'disco 1 y su cantidad de movimiento', 'area'], ['var(--A)', 'disco 2 y su cantidad de movimiento', 'area'], ['var(--fg)', 'P total, que no cambia (triángulo de la derecha)', 'linea'], ['var(--mut)', 'recta de los centros (línea de la fuerza) y trayectoria del centro de masa', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!d1) return;
    d1.material.color.set(p.acc); o1.material.color.set(p.acc); p1a.material.color.set(p.acc); tri1.material.color.set(p.acc);
    d2.material.color.set(p.A); o2.material.color.set(p.A); p2a.material.color.set(p.A); tri2.material.color.set(p.A);
    normal.material.color.set(p.mut); traza.material.color.set(p.mut); pCM.material.color.set(p.fg); tri0.material.color.set(p.fg); sep.material.color.set(p.bd);
  });
  nuevo(); calc();
});
