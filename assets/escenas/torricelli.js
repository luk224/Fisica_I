/* Tanque con un orificio: teorema de Torricelli y Bernoulli (tema 12, §12.5 de U; ejemplo 12.8, ejercicios 12.41 y 12.44). params: {"dim":2}.
   Tanque grande (el nivel casi no baja, v₁ ≈ 0) de agua hasta una altura H sobre el suelo; orificio lateral a profundidad h bajo la superficie
   (a una altura y₀ = H − h sobre el suelo); aire sobre el líquido a presión manométrica p (0 ⇒ tanque abierto).
   Bernoulli entre la superficie y el chorro (presiones manométricas, referencia en el orificio):  p + ρ g h = ½ ρ v²  ⇒  v = √(2p/ρ + 2gh).
   Con p = 0 es el teorema de Torricelli  v = √(2gh).  El chorro es un tiro horizontal (tema 3):  alcance  x = v √(2 y₀ / g)  desde la pared.
   Caudal  Q = A v  con A = π d²/4 (d = diámetro del orificio, deslizador).  Tanque abierto: x = 2√(h(H−h)), máximo x = H cuando h = H/2.
   Dibujo en metros; el ancho del tanque es 0,6 H solo para dibujar. 1 atm = 1,013×10⁵ Pa, g = 9,8 m/s². */
Interactivos.registrar('torricelli', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), g = 9.8, ATM = 1.013e5, listo = false, objs = [], clave = '';
  var FL = [['Agua (1000 kg/m³)', 1000], ['Agua de mar (1030 kg/m³)', 1030], ['Glicerina (1260 kg/m³)', 1260], ['Mercurio (13600 kg/m³)', 13600]];
  var iF = 0, Ht = 4, hh = 2, pm = 0, dd = 6, Hs = 4, tw = 2.4, w = 0.05, XM = 12;
  var liq, aire, sup, pared1, pared2, tapa, suelo, jet, cota, aV;
  var lV = c.lectura('Rapidez de salida  v = √(2p/ρ + 2gh)'), lA = c.lectura('Con el tanque abierto (Torricelli)  v = √(2gh)'), lQ = c.lectura('Caudal  Q = A v'),
      lX = c.lectura('Alcance horizontal hasta el suelo'), lB = c.lectura('Bernoulli (presiones manométricas, referencia en el orificio)'), lM = c.lectura('Tanque abierto: alcance máximo con esta altura H');
  var f = function (x, d) { var k = Math.pow(10, d), q = Math.round(x * k) / k; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  var eH = c.etiqueta('h', 0, 0, 'l'), eV = c.etiqueta('v', 0, 0, 'l'), eX = c.etiqueta('x', 0, 0, 'c'), eP = c.etiqueta('aire a presión', 0, 0, 'c'), eS = c.etiqueta('suelo', 0, 0, 'l');
  function add(o, z) { o.position.z = z; c.scene.add(o); objs.push(o); return o; }
  function plano(col, op) { return new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ color: col, transparent: true, opacity: op })); }
  function vel() { var h = Math.min(hh, Ht); return Math.sqrt(2 * pm * ATM / FL[iF][1] + 2 * g * h); }
  function alc() { var h = Math.min(hh, Ht); return vel() * Math.sqrt(2 * (Ht - h) / g); }
  function nuevo() {
    var Hn = Math.max(Ht, 1.2), xr = alc(), xm = Math.max(3.0 * Hn, 1.12 * (0.6 * Hn + xr)), k = Hn + '|' + Math.ceil(xm / Hn * 2) + '|' + P.fg;
    if (k === clave && suelo) return false; clave = k; Hs = Hn; tw = 0.6 * Hn; xm = Math.ceil(xm / Hn * 2) / 2 * Hn; XM = xm; w = 0.0151 * Hn;
    objs.forEach(function (o) { c.scene.remove(o); }); objs = [];
    c.vista(-0.3 * Hn, xm, -0.12 * Hn, 1.3 * Hn);
    liq = plano(P.S, 0.22); add(liq, -0.1); aire = plano(P.mut, 0.13); add(aire, -0.1);
    sup = add(H.cinta(T, [], P.acc, w * 1.3), 0.05);
    pared1 = add(H.cinta(T, [[[0, 1.2 * Hn], [0, 0], [tw, 0]]], P.fg, w * 1.5), 0.05);
    pared2 = add(H.cinta(T, [], P.fg, w * 1.5), 0.05);
    tapa = add(H.cinta(T, [], P.fg, w * 1.5), 0.05);
    suelo = add(H.cinta(T, [[[-0.3 * Hn, 0], [xm, 0]]], P.mut, w * 1.2), 0.02);
    jet = add(H.cinta(T, [], P.acc, w * 1.6), 0.2);
    cota = add(H.cinta(T, [], P.mut, w * 0.8), 0.1);
    aV = add(H.flecha2D(T, P.L, w * 1.8), 0.3);
    eS.mover(xm - 0.1 * Hn, 0.05 * Hn); eS.ancla('r');
    return true;
  }
  function calc() {
    if (!listo) return;
    nuevo();
    var h = Math.min(hh, Ht), v = vel(), va = Math.sqrt(2 * g * h), y0 = Ht - h, rho = FL[iF][1], x = alc(), Hn = Hs;
    var abierto = pm < 1e-9, top = 1.2 * Hn, g0 = 0.012 * Hn, A = Math.PI * Math.pow(dd / 2000, 2), Q = A * v, xl = tw + x;
    liq.position.set(tw / 2, Ht / 2, -0.1); liq.scale.set(tw, Ht, 1);
    aire.position.set(tw / 2, (Ht + top) / 2, -0.1); aire.scale.set(tw * (abierto ? 1e-6 : 1), top - Ht, 1);
    sup.set([[[-0.02 * Hn, Ht], [tw + 0.02 * Hn, Ht]]]);
    pared2.set([[[tw, 0], [tw, Math.max(0, y0 - g0)]], [[tw, y0 + g0], [tw, top]]]);
    tapa.set(abierto ? [] : [[[0, top], [tw, top]]]);
    var pts = [], i, N = 90, xe = Math.min(x, XM - tw);
    for (i = 0; i <= N; i++) { var u = xe * i / N; pts.push([tw + u, Math.max(0, y0 - g * u * u / (2 * v * v))]); }
    jet.set(y0 > 1e-9 ? [pts] : []);
    cota.set([[[0.1 * tw, Ht], [0.1 * tw, y0]], [[0.06 * tw, Ht], [0.14 * tw, Ht]], [[0.06 * tw, y0], [0.14 * tw, y0]]].concat(y0 > 1e-9 ? [[[tw, -0.03 * Hn], [tw + Math.min(x, xe), -0.03 * Hn]], [[tw, -0.05 * Hn], [tw, -0.01 * Hn]], [[tw + Math.min(x, xe), -0.05 * Hn], [tw + Math.min(x, xe), -0.01 * Hn]]] : []));
    var Lv = Math.min(0.4 * Hn, 0.03 * Hn * v); aV.poner([tw + 0.02 * Hn, y0 + 0.05 * Hn], [tw + 0.02 * Hn + Lv, y0 + 0.05 * Hn]);
    eH.mover(0.1 * tw + 0.03 * Hn, (Ht + y0) / 2); eH.poner('h = ' + f(h, 2) + ' m');
    eV.mover(tw + 0.04 * Hn, y0 + 0.17 * Hn); eV.poner('v = ' + f(v, 1) + ' m/s');
    eX.mover(tw + Math.min(x, xe) * 0.5, -0.09 * Hn); eX.poner(y0 > 1e-9 ? 'x = ' + f(x, 2) + ' m' + (xl > XM ? ' (sale de la vista)' : '') : '');
    eP.mover(tw / 2, Ht + (top - Ht) * 0.45); eP.poner(abierto ? '' : 'aire: ' + f(pm, 2) + ' atm');
    lV(f(v, 2) + ' m/s' + (abierto ? '' : '   (2p/ρ aporta ' + f(2 * pm * ATM / rho, 1) + ' m²/s², la columna ' + f(2 * g * h, 1) + ' m²/s²)'));
    lA(f(va, 2) + ' m/s' + (abierto ? '' : '   (la sobrepresión multiplica por ' + f(v / va, 2) + ')'));
    lQ(f(Q * 1000, 3) + ' L/s   (' + f(Q, 6) + ' m³/s, d = ' + f(dd, 0) + ' mm)');
    lX(y0 > 1e-9 ? 'x = v √(2y₀/g) = ' + f(x, 2) + ' m   (y₀ = ' + f(y0, 2) + ' m sobre el suelo)' : 'el orificio está en el fondo: no hay caída, x = 0');
    lB(f((pm * ATM + rho * g * h) / 1000, 2) + ' kPa  (superficie: p + ρgh)   =   ' + f(0.5 * rho * v * v / 1000, 2) + ' kPa  (chorro: ½ρv²)');
    lM(abierto ? 'x = H = ' + f(Ht, 2) + ' m, con h = H/2 = ' + f(Ht / 2, 2) + ' m' : 'solo con el tanque abierto: x = 2√(h(H−h)) ≤ H');
  }
  c.selector('Líquido', FL.map(function (q) { return q[0]; }), iF, function (i) { iF = i; calc(); });
  c.slider('Altura del líquido H (m)', 0.5, 15, 0.5, Ht, function (v) { Ht = v; calc(); }, function (v) { return f(v, 1) + ' m'; });
  c.slider('Profundidad del orificio h (m)', 0.1, 15, 0.1, hh, function (v) { hh = v; calc(); }, function (v) { return f(Math.min(v, Ht), 1) + ' m'; });
  c.slider('Presión manométrica del aire sobre el líquido (atm; 0 = abierto)', 0, 3, 0.05, pm, function (v) { pm = v; calc(); }, function (v) { return f(v, 2) + ' atm'; });
  c.slider('Diámetro del orificio d (mm)', 1, 50, 1, dd, function (v) { dd = v; calc(); }, function (v) { return f(v, 0) + ' mm'; });
  c.leyenda([['var(--U)', 'líquido', 'area'], ['var(--acc)', 'chorro (tiro horizontal)', 'linea'], ['var(--X)', 'velocidad de salida (proporcional a v, con tope)', 'linea'], ['var(--mut)', 'aire sobre el líquido y cota h', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!listo) return; clave = ''; calc();
  });
  nuevo(); listo = true; calc();
});
