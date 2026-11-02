/* Distribución de rapideces de Maxwell-Boltzmann (tema 18, §18.5; ec. 18.32-18.36 de U). params: {"dim":2,"marcas":false}.
   f(v) = 4π (m/2πkT)^{3/2} v² e^{−mv²/2kT}   (18.32),   m = M/N_A,  k = R/N_A.
   v_mp = √(2kT/m) (18.34),  v_med = √(8kT/πm) (18.35),  v_rms = √(3kT/m) (18.36);  K_med = (3/2)kT (18.16).
   Fracción de moléculas con v > v_A:  F = erfc(x) + 2x e^{−x²}/√π,  x = v_A/v_mp  (integral de f desde v_A; con x = 1,2247 da 0,392 = 1 − 0,608 de la tabla 18.2).
   Dos gases (A y B) con su temperatura; eje vertical lineal o logarítmico (el log enseña la cola). */
Interactivos.registrar('maxwell', function (c) {
  var T3 = c.THREE, H = c.H, P = c.colores(), listo = false, clave = '';
  var R = 8.314, NA = 6.022e23, kB = 1.381e-23;
  var GAS = [['H₂', 2.016], ['He', 4.00], ['Ne', 20.18], ['N₂', 28.00], ['O₂', 32.00], ['Ar', 39.95], ['CO₂', 44.00]];
  var gA = 3, gB = 6, TA = 298.15, TB = 298.15, vA = 2025, log = 0;
  var ejes, cA, cB, mk, relleno, guiaA, X0 = 1.6, W = 21.5, Y0 = 0.2, HH = 6, XM = 1000, ticksX = [], eX, eY, eNA, eNB, eMP, eMD, eRM, eVA;
  var fm = function (x, d) { return x.toFixed(d).replace('.', ',').replace(/^-/, '−'); };
  var fe = function (x) { if (x === 0) return '0'; var e = Math.floor(Math.log(x) / Math.LN10 + 1e-12), m = x / Math.pow(10, e); return fm(m, 2) + '×10' + String(e).replace('-', '⁻').replace(/\d/g, function (d) { return '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]; }); };
  var lA = c.lectura(''), lB = c.lectura(''), lK = c.lectura(''), lF = c.lectura('');
  function erfc(x) {
    var s, k, t;
    if (x < 2) { var term = x, sum = x, n; for (n = 1; n < 80; n++) { term *= -x * x / n; sum += term / (2 * n + 1); } return 1 - 2 / Math.sqrt(Math.PI) * sum; }
    t = x; for (k = 80; k >= 1; k--) t = x + (k / 2) / t; return Math.exp(-x * x) / Math.sqrt(Math.PI) / t;
  }
  function frac(v, vmp) { var x = v / vmp; return erfc(x) + 2 * x * Math.exp(-x * x) / Math.sqrt(Math.PI); }
  function vel(g, T) { var M = GAS[g][1] / 1000; return { mp: Math.sqrt(2 * R * T / M), med: Math.sqrt(8 * R * T / (Math.PI * M)), rms: Math.sqrt(3 * R * T / M), m: M / NA }; }
  function fdist(g, T) { var m = GAS[g][1] / 1000 / NA, a = m / (2 * kB * T), c0 = 4 * Math.PI * Math.pow(a / Math.PI, 1.5); return function (v) { return c0 * v * v * Math.exp(-a * v * v); }; }
  function mapY(f, fref) { if (!log) return Y0 + HH * Math.min(1, f / fref); var q = Math.log(f / fref) / Math.LN10; return Y0 + HH * Math.max(0, (q + 12) / 12); }
  function curva(f, fref, N) { var out = [], cur = [], i, v, y; for (i = 0; i <= N; i++) { v = XM * i / N; y = mapY(f(v), fref); if (log && y <= Y0 + 1e-6) { if (cur.length > 1) out.push(cur); cur = []; continue; } cur.push([X0 + W * v / XM, y]); } if (cur.length > 1) out.push(cur); return out; }
  function construir(vmax) {
    var k = P.fg + P.bg + P.S + P.W + XM; if (k === clave && ejes) return; clave = k;
    [ejes, cA, cB, mk, relleno, guiaA].forEach(function (o) { if (o) c.scene.remove(o); });
    c.vista(0, 24.2, -1.4, 7.4); var w = 0.05, rej = [], v, sx = H.paso(XM, 6);
    for (v = sx; v <= XM + 1e-9; v += sx) rej.push([[X0 + W * v / XM, Y0], [X0 + W * v / XM, Y0 + HH]]);
    ejes = new T3.Group();
    var a = H.cinta(T3, rej, P.bd, w * 0.5); a.position.z = -0.3;
    var b = H.cinta(T3, [[[X0, Y0], [X0 + W, Y0]], [[X0, Y0], [X0, Y0 + HH]]], P.fg, w); b.position.z = -0.2; ejes.add(a, b); c.scene.add(ejes);
    cB = H.cinta(T3, [], P.A, w * 1.7); cB.position.z = 0.1; c.scene.add(cB);
    cA = H.cinta(T3, [], P.S, w * 1.9); cA.position.z = 0.12; c.scene.add(cA);
    mk = H.cinta(T3, [], P.fg, w * 1.0, [w * 5, w * 3.5]); mk.position.z = 0.2; c.scene.add(mk);
    guiaA = H.cinta(T3, [], P.W, w * 1.6); guiaA.position.z = 0.3; c.scene.add(guiaA);
    relleno = new T3.Mesh(new T3.BufferGeometry(), new T3.MeshBasicMaterial({ color: P.W, transparent: true, opacity: 0.55, side: T3.DoubleSide })); relleno.position.z = 0.05; c.scene.add(relleno);
    ticksX.forEach(function (e) { e.ver(false); }); var ix = 0, t;
    for (v = 0; v <= XM + 1e-9; v += sx) { t = ticksX[ix] || (ticksX[ix] = c.etiqueta('', 0, 0, 'c')); ix++; t.poner(fm(v, 0)); t.mover(X0 + W * v / XM, Y0 - 0.35); t.ver(true); }
  }
  function calc() {
    if (!listo) return;
    var VA = vel(gA, TA), VB = vel(gB, TB), vm = Math.max(VA.rms, VB.rms);
    var nXM = H.techo(Math.max(3.2 * vm, 1.08 * vA)); if (nXM !== XM) { XM = nXM; clave = ''; }
    construir(); var fa = fdist(gA, TA), fb = fdist(gB, TB), fref = Math.max(fa(VA.mp), fb(VB.mp)) * (log ? 1 : 1.12);
    cA.set(curva(fa, fref, 400)); cB.set(curva(fb, fref, 400));
    var ya = function (v) { return mapY(fa(v), fref); }, xp = function (v) { return X0 + W * v / XM; };
    mk.set([[[xp(VA.mp), Y0], [xp(VA.mp), ya(VA.mp)]], [[xp(VA.med), Y0], [xp(VA.med), ya(VA.med)]], [[xp(VA.rms), Y0], [xp(VA.rms), ya(VA.rms)]]]);
    /* relleno bajo la curva de A para v > vA */
    var pos = [], N = 300, i, v0, v1, y0, y1;
    if (vA < XM) for (i = 0; i < N; i++) {
      v0 = vA + (XM - vA) * i / N; v1 = vA + (XM - vA) * (i + 1) / N; y0 = ya(v0); y1 = ya(v1);
      pos.push(xp(v0), Y0, 0, xp(v1), Y0, 0, xp(v0), y0, 0, xp(v1), Y0, 0, xp(v1), y1, 0, xp(v0), y0, 0);
    }
    relleno.geometry.dispose(); relleno.geometry = new T3.BufferGeometry(); relleno.geometry.setAttribute('position', new T3.Float32BufferAttribute(pos, 3));
    guiaA.set([[[xp(vA), Y0 - 0.1], [xp(vA), Y0 + HH * 0.5]]]);
    eX.poner('rapidez v (m/s)'); eX.mover(X0 + W, Y0 - 0.95); eY.poner(log ? 'f(v)  (escala logarítmica: 12 decenas)' : 'f(v)'); eY.mover(X0 + 0.1, Y0 + HH + 0.45);
    eNA.poner(GAS[gA][0] + ' a ' + fm(TA, 1) + ' K'); eNA.mover(X0 + W - 0.2, Y0 + HH - 0.2); eNA.ancla('r');
    eNB.poner(GAS[gB][0] + ' a ' + fm(TB, 1) + ' K'); eNB.mover(X0 + W - 0.2, Y0 + HH - 0.85); eNB.ancla('r');
    eMP.poner('v_mp'); eMP.mover(xp(VA.mp) - 0.12, Y0 + 0.45); eMP.ancla('r');
    eMD.poner('v_med'); eMD.mover(xp(VA.med) + 0.0, Y0 + 1.05); eMD.ancla('c');
    eRM.poner('v_rms'); eRM.mover(xp(VA.rms) + 0.12, Y0 + 0.45); eRM.ancla('l');
    eVA.poner('v_A = ' + fm(vA, 0) + ' m/s'); eVA.mover(xp(vA) + 0.12, Y0 + HH * 0.5); eVA.ancla('l');
    var F = frac(vA, VA.mp), KA = 1.5 * kB * TA, KB = 1.5 * kB * TB;
    lA(GAS[gA][0] + ' (A) a ' + fm(TA, 1) + ' K:   v_mp = ' + fm(VA.mp, 0) + '   ·   v_med = ' + fm(VA.med, 0) + '   ·   v_rms = ' + fm(VA.rms, 0) + ' m/s   (cociente 1 : 1,128 : 1,225)');
    lB(GAS[gB][0] + ' (B) a ' + fm(TB, 1) + ' K:   v_mp = ' + fm(VB.mp, 0) + '   ·   v_med = ' + fm(VB.med, 0) + '   ·   v_rms = ' + fm(VB.rms, 0) + ' m/s');
    lK('Energía cinética media por molécula (3/2)kT:  A = ' + fm(KA * 1e21, 2) + '×10⁻²¹ J,  B = ' + fm(KB * 1e21, 2) + '×10⁻²¹ J   (iguales si T_A = T_B, sea cual sea la masa)');
    lF('Fracción de moléculas de A con v > v_A = ' + fm(vA, 0) + ' m/s:  ' + (F > 1e-3 ? fm(F, 4) : fe(F)) + '   ·   por mol: ' + fe(F * NA) + ' moléculas');
  }
  var sels = [];
  c.selector('Gas A (curva azul)', GAS.map(function (g) { return g[0] + ' (' + fm(g[1], 2) + ' g/mol)'; }), gA, function (i) { gA = i; calc(); });
  c.slider('Temperatura de A (K)', 50, 1000, 0.05, TA, function (v) { TA = v; calc(); }, function (v) { return fm(v, 2) + ' K'; });
  c.selector('Gas B (curva naranja, para comparar)', GAS.map(function (g) { return g[0] + ' (' + fm(g[1], 2) + ' g/mol)'; }), gB, function (i) { gB = i; calc(); });
  c.slider('Temperatura de B (K)', 50, 1000, 0.05, TB, function (v) { TB = v; calc(); }, function (v) { return fm(v, 2) + ' K'; });
  c.slider('Rapidez v_A para la «cola» sombreada (m/s)', 100, 4000, 25, vA, function (v) { vA = v; calc(); }, function (v) { return fm(v, 0) + ' m/s'; });
  c.selector('Eje vertical', ['Lineal', 'Logarítmico (se ve la cola)'], 0, function (i) { log = i; calc(); });
  eX = c.etiqueta('', 0, 0, 'r'); eY = c.etiqueta('', 0, 0, 'l'); eNA = c.etiqueta('', 0, 0, 'r'); eNB = c.etiqueta('', 0, 0, 'r');
  eMP = c.etiqueta('', 0, 0, 'r'); eMD = c.etiqueta('', 0, 0, 'c'); eRM = c.etiqueta('', 0, 0, 'l'); eVA = c.etiqueta('', 0, 0, 'l');
  c.leyenda([['var(--U)', 'gas A', 'linea'], ['var(--A)', 'gas B', 'linea'], ['var(--warn-b)', 'moléculas de A con v > v_A (área sombreada)', 'area'], ['var(--fg)', 'v_mp, v_med, v_rms de A (trazos)', 'linea']]);
  c.alCambiarTema(function (p) { P = p; c.renderer.setClearColor(p.bg); if (!listo) return; clave = ''; calc(); });
  listo = true; calc();
});
