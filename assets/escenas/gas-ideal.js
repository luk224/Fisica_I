/* Gas ideal y gas de van der Waals (tema 18, §18.1; ec. 18.3 y 18.7 de U). params: {"dim":2,"marcas":false}.
   Modo 0 «Partículas en un cilindro»: n moles a temperatura T en un volumen V (el pistón sube y baja con V).
        p = nRT/V  (18.3), con R = 0,08206 L·atm/(mol·K); energía cinética media por molécula (3/2)kT (18.16); v_rms = √(3RT/M) (18.19, N₂).
        A la derecha, la isoterma pV del gas ideal con el estado actual. Las partículas rebotan elásticamente contra las paredes (dibujo ilustrativo:
        N dibujado = 12 por mol, no son las N = n·N_A reales); la rapidez dibujada es proporcional a √T.
   Modo 1 «Isotermas del CO₂»: 1 mol, ec. de van der Waals (p + a n²/V²)(V − nb) = nRT con a = 0,364 J·m³/mol², b = 4,27·10⁻⁵ m³/mol.
        Punto crítico (propio): Tc = 8a/(27Rb) = 303,8 K, pc = a/(27b²) = 7,39 MPa, Vc = 3b = 0,128 L. */
Interactivos.registrar('gas-ideal', function (c) {
  var T3 = c.THREE, H = c.H, P = c.colores(), listo = false;
  var R = 8.314, RL = 0.08206, NA = 6.022e23, kB = 1.381e-23, A_ = 0.364, B_ = 4.27e-5;
  var TC = 8 * A_ / (27 * R * B_), PC = A_ / (27 * B_ * B_) / 1e6, VC = 3 * B_ * 1000;
  var modo = 0, n = 1, Tk = 300, V = 24, Tv = 350, Vv = 0.2, tt = 0, clave = '';
  var NMAX = 30, HB = 6, ymaxA = 12, ymaxV = 14;
  var fm = function (x, d) { return x.toFixed(d).replace('.', ',').replace(/^-/, '−'); };
  var seed = []; (function () { var i, s = 12345; function r() { s = (s * 16807) % 2147483647; return s / 2147483647; } for (i = 0; i < NMAX; i++) seed.push([r(), r(), r() * 6.2832]); })();
  var grupo = new T3.Group(), ejes, curvaI, curvaV, curvaC, guia, pt, pieza, caja, fl = [], parts = [], pPunto, ticksX = [], ticksY = [];
  var eX, eY, eA, eB, eC, eD;
  var lP = c.lectura(''), lE = c.lectura(''), lV = c.lectura(''), lN = c.lectura('');
  var sl = [], mapa = null;
  function rect(col, op, z) {
    var m = new T3.Mesh(new T3.PlaneGeometry(1, 1), new T3.MeshBasicMaterial({ color: col, transparent: op < 1, opacity: op })); m.position.z = z; c.scene.add(m); return m;
  }
  function poner(m, xa, xb, ya, yb) { m.position.x = (xa + xb) / 2; m.position.y = (ya + yb) / 2; m.scale.set(Math.max(1e-6, xb - xa), yb - ya, 1); }
  function tri(a, L) { var q = ((a % (2 * L)) + 2 * L) % (2 * L); return L - Math.abs(q - L); }
  function vdw(T, Vl) { return (R * T / (Vl / 1000 - B_) - A_ / Math.pow(Vl / 1000, 2)) / 1e6; }
  function nice(v) { return H.paso(v, 1) ; }
  function construir() {
    var k = modo + '|' + P.fg + P.bg + P.S + P.W;
    if (k === clave && ejes) return; clave = k;
    [ejes, curvaI, curvaV, curvaC, guia, pt, pieza, caja].forEach(function (o) { if (o) c.scene.remove(o); });
    parts.forEach(function (o) { c.scene.remove(o); }); parts = []; fl.forEach(function (o) { c.scene.remove(o); }); fl = [];
    var w = 0.05;
    if (modo === 0) {
      c.vista(-0.6, 25, -1.6, 7.4);
      mapa = { x0: 13.5, w: 10.5, y0: 0, h: 6, X0: 0, X1: 60, Y0: 0, Y1: ymaxA };
    } else {
      c.vista(-0.4, 24.8, -1.4, 7.6);
      mapa = { x0: 2, w: 21.5, y0: 0, h: 6.4, X0: 0, X1: 0.5, Y0: 0, Y1: ymaxV };
    }
    var rej = [], i, sx = modo === 0 ? 20 : 0.1, sy = modo === 0 ? 4 : 2, v;
    for (v = sx; v <= mapa.X1 + 1e-9; v += sx) rej.push([[gx(v), mapa.y0], [gx(v), mapa.y0 + mapa.h]]);
    for (v = sy; v <= mapa.Y1 + 1e-9; v += sy) rej.push([[mapa.x0, gy(v)], [mapa.x0 + mapa.w, gy(v)]]);
    ejes = new T3.Group();
    var a = H.cinta(T3, rej, P.bd, w * 0.5); a.position.z = -0.3;
    var b = H.cinta(T3, [[[mapa.x0, mapa.y0], [mapa.x0 + mapa.w, mapa.y0]], [[mapa.x0, mapa.y0], [mapa.x0, mapa.y0 + mapa.h]]], P.fg, w); b.position.z = -0.2;
    ejes.add(a, b); c.scene.add(ejes);
    curvaI = H.cinta(T3, [], P.fg, w * 1.1, [w * 4, w * 3]); curvaI.position.z = 0.1; c.scene.add(curvaI);
    curvaV = H.cinta(T3, [], P.S, w * 1.8); curvaV.position.z = 0.12; c.scene.add(curvaV);
    curvaC = H.cinta(T3, [], P.E, w * 1.1, [w * 5, w * 3]); curvaC.position.z = 0.1; c.scene.add(curvaC);
    guia = H.cinta(T3, [], P.mut, w * 0.9, [w * 5, w * 3.5]); guia.position.z = 0.2; c.scene.add(guia);
    pt = H.punto(T3, 0, 0, w * 3.4, P.W); pt.position.z = 0.5; c.scene.add(pt);
    if (modo === 0) {
      caja = H.cinta(T3, [], P.fg, w * 1.4); caja.position.z = 0.2; c.scene.add(caja);
      pieza = rect(P.mut, 0.6, 0.15);
      for (i = 0; i < NMAX; i++) { var d = H.punto(T3, 0, 0, 0.13, P.S); d.position.z = 0.3; c.scene.add(d); parts.push(d); }
      for (i = 0; i < 3; i++) { var f = H.flecha2D(T3, P.W, w * 1.8); f.position.z = 0.4; c.scene.add(f); fl.push(f); }
    } else {
      pt.material.color.set(P.E); var d2 = H.punto(T3, 0, 0, w * 3.4, P.W); d2.position.z = 0.45; c.scene.add(d2); parts.push(d2); pPunto = d2;
    }
    ticksX.concat(ticksY).forEach(function (e) { e.ver(false); });
    var ix = 0, iy = 0, tx;
    for (v = (modo === 0 ? 0 : 0.1); v <= mapa.X1 + 1e-9; v += sx) { tx = ticksX[ix] || (ticksX[ix] = c.etiqueta('', 0, 0, 'c')); ix++; tx.poner(fm(v, modo === 0 ? 0 : 1)); tx.mover(gx(v), -0.3); tx.ver(true); }
    for (v = 0; v <= mapa.Y1 + 1e-9; v += sy) { tx = ticksY[iy] || (ticksY[iy] = c.etiqueta('', 0, 0, 'r')); iy++; tx.poner(fm(v, 0)); tx.mover(mapa.x0 - 0.15, gy(v)); tx.ver(true); }
    eX.poner(modo === 0 ? 'V (L)' : 'V (L)'); eX.mover(mapa.x0 + mapa.w, -0.95);
    eY.poner(modo === 0 ? 'p (atm)' : 'p (MPa)'); eY.mover(mapa.x0 + 0.1, mapa.y0 + mapa.h + 0.45);
  }
  function gx(v) { return mapa.x0 + (v - mapa.X0) / (mapa.X1 - mapa.X0) * mapa.w; }
  function gy(p) { return mapa.y0 + (p - mapa.Y0) / (mapa.Y1 - mapa.Y0) * mapa.h; }
  function cortar(f, a, b, N, y1) {
    var out = [], cur = [], i, x, y;
    for (i = 0; i <= N; i++) { x = a + (b - a) * i / N; y = f(x); if (isFinite(y) && y >= 0 && y <= y1) cur.push([gx(x), gy(y)]); else { if (cur.length > 1) out.push(cur); cur = []; } }
    if (cur.length > 1) out.push(cur); return out;
  }
  function calc() {
    if (!listo) return; construir(); var i;
    if (modo === 0) {
      var p = n * RL * Tk / V, wb = V / 6, vs = 0.65 * Math.sqrt(Tk / 300), nd = Math.max(1, Math.round(12 * n)), r = 0.13;
      poner(pieza, wb, wb + 0.28, 0, HB);
      caja.set([[[0, 0], [wb, 0]], [[0, HB], [wb, HB]], [[0, 0], [0, HB]], [[wb + 0.28, 0], [wb + 0.28, HB]]]);
      for (i = 0; i < NMAX; i++) {
        var s = seed[i], ang = s[2], X = r + (wb - 2 * r) * 0, px, py;
        if (i < nd) {
          px = r + tri(s[0] * (wb - 2 * r) + vs * Math.cos(ang) * tt, wb - 2 * r); py = r + tri(s[1] * (HB - 2 * r) + vs * Math.sin(ang) * tt, HB - 2 * r);
          parts[i].visible = true; parts[i].mover(px, py);
        } else parts[i].visible = false;
      }
      var len = Math.min(2.2, 0.35 + 2.2 * p / ymaxA), ys = [1.2, 3, 4.8];
      for (i = 0; i < 3; i++) fl[i].poner([wb + 0.32, ys[i]], [wb + 0.32 + len, ys[i]]);
      curvaI.set(cortar(function (v) { return n * RL * Tk / v; }, 10, 60, 120, ymaxA)); curvaV.set([]); curvaC.set([]);
      var pg = Math.min(p, ymaxA);
      guia.set([[[gx(V), gy(0)], [gx(V), gy(pg)]], [[gx(0), gy(pg)], [gx(V), gy(pg)]]]); pt.mover(gx(V), gy(pg));
      eA.poner('T = ' + fm(Tk, 0) + ' K'); eA.mover(gx(60) - 0.1, gy(Math.min(n * RL * Tk / 60, ymaxA)) + 0.45); eA.ancla('r'); eA.ver(true);
      eB.poner('cilindro con pistón'); eB.mover(wb / 2, HB + 0.5); eB.ancla('c'); eB.ver(true);
      eC.poner('empuje del gas: p'); eC.mover(wb + 0.28 + len + 0.2, 6.6 - 0.55 - 0.1); eC.ancla('l'); eC.ver(false); eD.ver(false);
      lP('Presión p = nRT/V:  ' + fm(p, 3) + ' atm   =  ' + fm(p * 101325 / 1000, 1) + ' kPa' + (p > ymaxA ? '   (fuera de la gráfica)' : ''));
      lE('Energía cinética media por molécula (3/2)kT:  ' + fm(1.5 * kB * Tk * 1e21, 2) + '×10⁻²¹ J   ·   v_rms (N₂):  ' + fm(Math.sqrt(3 * R * Tk / 0.028013), 0) + ' m/s');
      lV('Volumen V = ' + fm(V, 0) + ' L;  producto pV = ' + fm(p * V, 2) + ' L·atm  =  nRT = ' + fm(n * RL * Tk, 2) + ' L·atm   (se conserva a T constante)');
      lN('Moléculas reales N = n·N_A = ' + fm(n * NA / 1e23, 2) + '×10²³  (en el dibujo, ' + nd + ' puntos ilustrativos)');
    } else {
      var Vm = Math.max(Vv, B_ * 1000 * 1.05), pv = vdw(Tv, Vm), pi = R * Tv / (Vm / 1000) / 1e6;
      curvaI.set(cortar(function (v) { return R * Tv / (v / 1000) / 1e6; }, 0.045, 0.5, 200, ymaxV));
      curvaV.set(cortar(function (v) { return vdw(Tv, v); }, B_ * 1000 * 1.0005, 0.5, 400, ymaxV));
      curvaC.set(Math.abs(Tv - TC) > 3 ? cortar(function (v) { return vdw(TC, v); }, B_ * 1000 * 1.0005, 0.5, 400, ymaxV) : []);
      var py2 = Math.max(0, Math.min(pv, ymaxV));
      guia.set([[[gx(Vm), gy(0)], [gx(Vm), gy(py2)]]]); pPunto.mover(gx(Vm), gy(py2)); pt.mover(gx(VC), gy(PC));
      eA.poner('punto crítico (' + fm(TC, 0) + ' K)'); eA.mover(gx(VC) + 0.3, gy(PC) + 0.45); eA.ancla('l'); eA.ver(true);
      eB.poner('T = ' + fm(Tv, 0) + ' K: ' + (Tv > TC + 1 ? 'por encima de T_c, sin cambio de fase' : Tv < TC - 1 ? 'por debajo de T_c, la isoterma tiene un lazo' : 'temperatura crítica'));
      eB.mover(mapa.x0 + mapa.w, mapa.y0 + mapa.h + 0.45); eB.ancla('r'); eB.ver(true); eC.ver(false); eD.ver(false);
      lP('Gas ideal  p = RT/V:  ' + fm(pi, 2) + ' MPa   ·   van der Waals:  ' + (pv > 0 ? fm(pv, 2) + ' MPa' : 'p < 0 (zona no física del modelo)'));
      lE('Diferencia respecto al ideal:  ' + (pv > 0 ? fm(100 * (pi - pv) / pi, 1) + ' %' : '—') + '   (a V grande tiende a 0; cerca de b = 0,0427 L el ideal falla del todo)');
      lV('Constantes del CO₂ (U p. 589): a = 0,364 J·m³/mol², b = 4,27×10⁻⁵ m³/mol   ⇒   T_c = 8a/27Rb = ' + fm(TC, 1) + ' K,  p_c = ' + fm(PC, 2) + ' MPa,  V_c = 3b = ' + fm(VC, 3) + ' L');
      lN('Punto crítico = punto de inflexión de la isoterma T_c (la púrpura a trazos); por encima de T_c no hay líquido y vapor distintos');
    }
  }
  var sel = c.selector('Qué se muestra', ['Partículas en un cilindro y su isoterma pV (gas ideal)', 'Isotermas del CO₂: gas ideal frente a van der Waals'], 0, function (i) { modo = i; if (listo) { clave = ''; mostrar(); calc(); c.pedir(); } });
  sl.push([0, c.slider('Moles n', 0.5, 2.5, 0.1, n, function (v) { n = v; calc(); }, function (v) { return fm(v, 1) + ' mol'; })]);
  sl.push([0, c.slider('Temperatura T (K)', 100, 500, 10, Tk, function (v) { Tk = v; calc(); }, function (v) { return fm(v, 0) + ' K'; })]);
  sl.push([0, c.slider('Volumen V (L)', 10, 60, 1, V, function (v) { V = v; calc(); }, function (v) { return fm(v, 0) + ' L'; })]);
  sl.push([1, c.slider('Temperatura T (K)', 240, 450, 2, Tv, function (v) { Tv = v; calc(); }, function (v) { return fm(v, 0) + ' K'; })]);
  sl.push([1, c.slider('Volumen V (L)', 0.05, 0.5, 0.005, Vv, function (v) { Vv = v; calc(); }, function (v) { return fm(v, 3) + ' L'; })]);
  function mostrar() { sl.forEach(function (q) { q[1].parentNode.style.display = q[0] === modo ? '' : 'none'; }); }
  c.reproductor({ max: 600, valor: 0, paso: 0.05, vel: 1, ciclico: true, etiqueta: 'Tiempo (la animación solo afecta al modo de partículas)', fmt: function (v) { return fm(v, 1) + ' s'; }, cb: function (v) { tt = v; calc(); } });
  eX = c.etiqueta('', 0, 0, 'r'); eY = c.etiqueta('', 0, 0, 'l'); eA = c.etiqueta('', 0, 0, 'c'); eB = c.etiqueta('', 0, 0, 'c'); eC = c.etiqueta('', 0, 0, 'c'); eD = c.etiqueta('', 0, 0, 'c');
  c.leyenda([['var(--fg)', 'gas ideal (isoterma, trazos)', 'linea'], ['var(--U)', 'van der Waals (CO₂) / partículas', 'linea'], ['var(--E)', 'isoterma crítica', 'linea'], ['var(--warn-b)', 'estado actual', 'punto'], ['var(--E)', 'punto crítico (modo CO₂)', 'punto']]);
  c.alCambiarTema(function (p) { P = p; c.renderer.setClearColor(p.bg); if (!listo) return; clave = ''; calc(); });
  listo = true; mostrar(); calc();
});
