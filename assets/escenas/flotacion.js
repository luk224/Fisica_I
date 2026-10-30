/* Flotación y principio de Arquímedes (tema 12, §12.3 de U; ejemplo 12.5). params: {"dim":2}.
   Recipiente ancho con un líquido de profundidad D = 50 cm (el nivel no cambia al meter el cuerpo) y un cubo de lado a y densidad ρc.
   Libre:    si ρc ≤ ρf flota con parte sumergida  d = a·ρc/ρf  (de B = mg);  si ρc > ρf se hunde y se apoya en el fondo (N = mg − B).
   Colgado:  totalmente sumergido, cara superior 6 cm bajo la superficie;  T = mg − B  (peso aparente; T < 0 ⇒ el hilo no puede empujar).
   Fuerzas:  mg = ρc a³ g;  B = ρf V_sum g;  presiones manométricas p = ρf g (profundidad) en las caras;  B = (p_inf − p_sup)·a².
   Las flechas de fuerza comparten una misma escala (la mayor mide 10 unidades del dibujo). A la derecha, p(profundidad): recta con pendiente ρf g,
   cuyo extremo (fondo) siempre ocupa el ancho de la gráfica. g = 9,8 m/s². */
Interactivos.registrar('flotacion', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), g = 9.8, D = 50, W = 60, GX = 72, GW = 46, w = 0.5, listo = false, objs = [];
  var FL = [['Etanol (810 kg/m³)', 810], ['Agua (1000 kg/m³)', 1000], ['Agua de mar (1030 kg/m³)', 1030], ['Glicerina (1260 kg/m³)', 1260], ['Mercurio (13600 kg/m³)', 13600]];
  var iF = 1, rc = 600, a = 10, modo = 0;
  var liq, sup, pared, cubo, borde, hilo, aMg, aB, aPt, aPb, aT, curv, guias, dt, db, eje;
  var lPeso = c.lectura('Peso  mg = ρc a³ g'), lEmp = c.lectura('Empuje  B = ρf V sumergido g  (= peso del fluido desplazado)'), lFr = c.lectura('Parte del cuerpo sumergida'),
      lT = c.lectura('Hilo o fondo'), lP = c.lectura('Presión manométrica en la cara superior  |  inferior'), lC = c.lectura('Comprobación: B = (p inf − p sup)·A');
  var f = function (x, d) { var k = Math.pow(10, d), q = Math.round(x * k) / k; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  var eMg = c.etiqueta('mg', 0, 0, 'c'), eB = c.etiqueta('B', 0, 0, 'c'), ePt = c.etiqueta('Fsup', 0, 0, 'r'), ePb = c.etiqueta('Finf', 0, 0, 'r'), eT = c.etiqueta('T', 0, 0, 'l'),
      eG = c.etiqueta('p manométrica', GX, D + 4, 'l'), eF = c.etiqueta('fondo', GX + GW, -3, 'r'), eL = c.etiqueta('líquido', 3, D - 4, 'l');
  function add(o, z) { o.position.z = z; c.scene.add(o); objs.push(o); return o; }
  function plano(col, op) { return new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ color: col, transparent: true, opacity: op })); }
  function nuevo() {
    objs.forEach(function (o) { c.scene.remove(o); }); objs = [];
    c.vista(-4, 124, -6, 66);
    liq = plano(P.S, 0.22); liq.position.set(W / 2, D / 2, 0); liq.scale.set(W, D, 1); add(liq, -0.1);
    sup = add(H.cinta(T, [[[-1, D], [W + 1, D]]], P.acc, w * 1.4), 0.05);
    pared = add(H.cinta(T, [[[0, D + 8], [0, 0], [W, 0], [W, D + 8]]], P.fg, w * 1.5), 0.05);
    cubo = plano(P.A, 0.6); add(cubo, 0.1);
    borde = add(H.cinta(T, [], P.fg, w * 1.1), 0.2);
    hilo = add(H.cinta(T, [], P.mut, w * 0.9), 0.15);
    eje = add(H.cinta(T, [[[GX, D], [GX, 0]], [[GX, 0], [GX + GW, 0]]], P.fg, w * 0.9), 0.05);
    curv = add(H.cinta(T, [[[GX, D], [GX + GW, 0]]], P.acc, w * 1.3), 0.1);
    guias = add(H.cinta(T, [], P.mut, w * 0.7, [w * 2.5, w * 2]), 0.08);
    dt = H.punto(T, 0, 0, w * 1.7, P.A); add(dt, 0.4); db = H.punto(T, 0, 0, w * 1.7, P.A); add(db, 0.4);
    aMg = add(H.flecha2D(T, P.fg, w * 1.8), 0.3); aB = add(H.flecha2D(T, P.L, w * 1.8), 0.31); aPt = add(H.flecha2D(T, P.S, w * 1.8), 0.32);
    aPb = add(H.flecha2D(T, P.S, w * 1.8), 0.33); aT = add(H.flecha2D(T, P.W, w * 1.8), 0.34);
  }
  function calc() {
    if (!listo) return;
    var rf = FL[iF][1], A2 = a / 100 * a / 100, V = A2 * a / 100, mg = rc * V * g, cx = W / 2, cy, yb, yt, dsum, colg = modo === 1, flota = false, apoy = false;
    if (colg) { yt = D - 6; yb = yt - a; dsum = a; }
    else if (rc <= rf) { dsum = a * rc / rf; yb = D - dsum; yt = yb + a; flota = true; }
    else { yb = 0; yt = a; dsum = a; apoy = true; }
    cy = (yb + yt) / 2;
    var B = rf * (A2 * dsum / 100) * g, Tt = mg - B, pt = rf * g * Math.max(0, D - yt) / 100, pb = rf * g * (D - yb) / 100, Bp = (pb - pt) * A2;
    var K = 10 / Math.max(1e-9, mg, B, pb * A2, pt * A2, Math.abs(Tt)), pmax = rf * g * D / 100, sx = GW / pmax;
    cubo.position.set(cx, cy, 0.1); cubo.scale.set(a, a, 1);
    borde.set([[[cx - a / 2, yb], [cx + a / 2, yb], [cx + a / 2, yt], [cx - a / 2, yt], [cx - a / 2, yb]]]);
    hilo.set(colg ? [[[cx, yt], [cx, D + 8]], [[cx - 5, D + 8], [cx + 5, D + 8]]] : []);
    var x1 = cx - 0.3 * a, x2 = cx + 0.12 * a, x3 = cx + 0.36 * a, lPt = K * pt * A2, lPb = K * pb * A2;
    aPt.poner([x1, yt + lPt], [x1, yt]); if (apoy) aPb.poner([x1, yb], [x1, yb]); else aPb.poner([x1, yb - lPb], [x1, yb]);
    aMg.poner([x2, cy], [x2, cy - K * mg]); aB.poner([x3, cy], [x3, cy + K * B]);
    var fz = colg ? Tt : (apoy ? Tt : 0); aT.poner([cx, colg ? yt : yb], [cx, (colg ? yt : yb) + (fz > 0 ? K * fz : 0)]);
    eMg.mover(x2, cy - K * mg - 2.4); eB.mover(x3, cy + K * B + 2.4); ePt.mover(x1 - 0.8, yt + lPt + 0.3); ePb.mover(x1 - 0.8, yb - lPb - 2.2); eT.mover(cx + 1.4, (colg ? yt : yb) + K * fz + 0.8);
    ePt.ver(lPt > 1.2); ePb.ver(lPb > 1.2 && !apoy); eT.ver(fz > 0 && K * fz > 1.2); eT.poner(colg ? 'T' : 'N');
    var ypt = Math.min(yt, D), xpt = GX + sx * pt, xpb = GX + sx * pb;
    dt.mover(xpt, ypt); db.mover(xpb, yb);
    guias.set([[[W + 0.5, ypt], [xpt, ypt]], [[W + 0.5, yb], [xpb, yb]]]);
    eF.poner('fondo: ' + f(pmax / 1000, 2) + ' kPa');
    lPeso(f(mg, 2) + ' N   (m = ' + f(rc * V, 3) + ' kg;  V = ' + f(V * 1e6, 0) + ' cm³)');
    lEmp(f(B, 2) + ' N');
    lFr(f(100 * dsum / a, 1) + ' %' + (flota ? '   (= ρc/ρf = ' + f(100 * rc / rf, 1) + ' %)' : ''));
    lT(colg ? (Tt >= 0 ? 'T = mg − B = ' + f(Tt, 2) + ' N   (peso aparente)' : 'T = ' + f(Tt, 2) + ' N < 0: el hilo no puede empujar; sin hilo el cuerpo subiría y flotaría')
      : flota ? (rc === rf ? 'flota entre dos aguas: B = mg' : 'flota: B = mg (el empuje iguala al peso)')
      : 'se hunde y se apoya en el fondo: N = mg − B = ' + f(Tt, 2) + ' N (con líquido bajo la cara inferior; si no hubiera, B = 0 y N = mg)');
    lP(f(pt, 0) + ' Pa  |  ' + f(pb, 0) + ' Pa');
    lC(f(Bp, 2) + ' N   (igual que ρf V g = ' + f(B, 2) + ' N)');
  }
  c.selector('Líquido (tabla 12.1 de U)', FL.map(function (q) { return q[0]; }), iF, function (i) { iF = i; calc(); });
  c.slider('Densidad del cuerpo ρc (kg/m³)', 100, 20000, 10, rc, function (v) { rc = v; calc(); }, function (v) { return f(v, 0) + ' kg/m³'; });
  c.slider('Lado del cubo a (cm)', 5, 20, 0.1, a, function (v) { a = v; calc(); }, function (v) { return f(v, 1) + ' cm'; });
  c.selector('Cuerpo', ['Libre (se suelta)', 'Colgado de un hilo, totalmente sumergido'], modo, function (i) { modo = i; calc(); });
  c.leyenda([['var(--A)', 'cuerpo', 'area'], ['var(--fg)', 'peso mg', 'linea'], ['var(--X)', 'empuje B', 'linea'], ['var(--U)', 'fuerzas de presión F = pA en las caras', 'linea'],
             ['var(--warn-b)', 'tensión T (colgado) o normal N (en el fondo)', 'linea'], ['var(--acc)', 'p(profundidad) = ρf g h', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!listo) return;
    nuevo(); calc();
  });
  nuevo(); listo = true; calc();
});
