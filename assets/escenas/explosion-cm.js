/* Explosión de un obús en el vértice de su trayectoria (tema 8; examen Feb 2020 1ª P-2 y problemas 8.97 y 8.98). params: {"dim":2}.
   El obús (masa total M, 12 kg en el estado inicial) sale con v₀ y ángulo α; en el vértice (t = v₀ sen α / g, y = H) estalla en dos fragmentos que salen en horizontal (los dos caen a la vez).
   Fragmento A (pesado, mA = r·mB con r = mA/mB): vA = vₓ − uA, con uA la velocidad hacia atrás respecto al obús; fragmento B (ligero): vB = vₓ + r·uA (conservación de la cantidad de movimiento horizontal).
   El centro de masa sigue la parábola del obús entero (fuerzas internas): (mA·xA + mB·xB)/M = alcance sin explosión R. Energía liberada = ΔK. g = 9,8 m/s². */
Interactivos.registrar('explosion-cm', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), g = 9.8, rad = Math.PI / 180;
  var v0 = 150, al = 55, rm = 3, M = 12, uA = 172.07, fs = 0.8, anim = 0, clave = '', w, ejes, par, trA, trB, ptA, ptB, ptC, ptX, uni, fvA, fvB, rSl = null, ya = false, ult = 0, pausa = 0, vis = true;
  var eA, eB, eC, ground, YH = 1, XR = 1, KX = 1;
  var f2 = function (t) { var r = Math.round(t * 100) / 100; return String(r === 0 ? 0 : r).replace('-', '−').replace('.', ','); };
  var f1 = function (t) { var r = Math.round(t * 10) / 10; return String(r === 0 ? 0 : r).replace('-', '−').replace('.', ','); };
  var f0 = function (t) { var r = Math.round(t); return String(r === 0 ? 0 : r).replace('-', '−'); };
  var lH = c.lectura('Altura del vértice (donde estalla) y velocidad horizontal vₓ'), lV = c.lectura('Velocidades justo tras la explosión (A pesado ; B ligero)'),
      lT = c.lectura('Tiempo de vuelo total (los dos caen a la vez) e instante elegido'), lX = c.lectura('Puntos de caída medidos desde el lanzamiento (A ; B)'),
      lR = c.lectura('Alcance del obús sin explosión = caída del centro de masa'), lM = c.lectura('Comprobación: (mA·xA + mB·xB) / M'), lK = c.lectura('Energía liberada en la explosión'), lC = c.lectura('Centro de masa ahora (x ; y)');
  function datos() {
    var vx = v0 * Math.cos(al * rad), vy = v0 * Math.sin(al * rad), ts = vy / g, Hh = vy * vy / (2 * g), xa = vx * ts, vA = vx - uA, vB = vx + rm * uA;
    var mA = M * rm / (1 + rm), mB = M / (1 + rm);
    return { vx: vx, vy: vy, ts: ts, H: Hh, xa: xa, R: 2 * xa, vA: vA, vB: vB, xA: xa + vA * ts, xB: xa + vB * ts, mA: mA, mB: mB,
      dK: 0.5 * mA * vA * vA + 0.5 * mB * vB * vB - 0.5 * M * vx * vx };
  }
  function nuevo(d) {
    var xmin = Math.min(0, d.xA, d.xB), xmax = Math.max(d.R, d.xA, d.xB, 1), xr1 = H.techo(xmax * 1.08), xr0 = xmin < 0 ? -H.techo(-xmin * 1.08) : -0.04 * xr1, yh = H.techo(Math.max(d.H * 1.3, 1)), kx = Math.min(1, 2.0 * 1.12 * yh / (xr1 - xr0));
    YH = yh; XR = xr1 - xr0; KX = kx;
    var k = [xr0, xr1, yh, kx, P.fg].join('|'); if (k === clave && ejes) return; clave = k;
    [ejes, par, trA, trB, ptA, ptB, ptC, ptX, uni, fvA, fvB, ground].forEach(function (o) { if (o) c.scene.remove(o); });
    var Wd = xr1 - xr0, y0 = -0.12 * yh; w = 0.0055 * Math.max(yh * 1.12, Wd * kx * 0.5); c.escalaX(kx); c.vista(xr0 * kx, xr1 * kx, y0, yh);
    var dx = 1.5 * Wd * kx, dy = 1.5 * (yh - y0), vw = [xr0 * kx - dx, xr1 * kx + dx, y0 - dy, yh + dy], pa = H.paso(Wd, 8);
    ejes = H.ejes2D(T, vw, w, P.fg, P.bd, pa * kx, H.paso(yh - y0, 5)); c.scene.add(ejes);
    ground = H.cinta(T, [[[vw[0], 0], [vw[1], 0]]], P.fg, w * 1.4); ground.position.z = 0.05; c.scene.add(ground);
    par = H.cinta(T, [], P.mut, w * 1.2, [w * 6, w * 4]); par.position.z = 0.08; trA = H.cinta(T, [], P.acc, w * 1.6); trA.position.z = 0.1; trB = H.cinta(T, [], P.A, w * 1.6); trB.position.z = 0.1;
    uni = H.cinta(T, [], P.mut, w); uni.position.z = 0.12; c.scene.add(par, trA, trB, uni);
    fvA = H.flecha2D(T, P.acc, w * 1.7); fvB = H.flecha2D(T, P.A, w * 1.7); fvA.position.z = 0.3; fvB.position.z = 0.3; c.scene.add(fvA, fvB);
    ptX = H.punto(T, 0, 0, w * 2.6, P.W); ptX.position.z = 0.35; ptA = H.punto(T, 0, 0, w * 3.4, P.acc); ptB = H.punto(T, 0, 0, w * 3.4, P.A); ptC = H.punto(T, 0, 0, w * 2.8, P.fg);
    ptA.position.z = 0.5; ptB.position.z = 0.5; ptC.position.z = 0.6; c.scene.add(ptX, ptA, ptB, ptC);
    if (!eA) { eA = c.etiqueta('cae A', 0, 0); eB = c.etiqueta('cae B', 0, 0); eC = c.etiqueta('CM', 0, 0, 'l'); }
  }
  function calc() {
    var d = datos(); if (!(d.ts > 0) || !isFinite(d.xA) || !isFinite(d.xB)) return; nuevo(d);
    var kx = KX, X = function (x) { return x * kx; }, Tt = 2 * d.ts, t = fs * Tt, i, pa = [], sa = [], sb = [];
    for (i = 0; i <= 80; i++) { var q = Tt * i / 80; pa.push([X(d.vx * q), d.vy * q - 0.5 * g * q * q]); }
    for (i = 0; i <= 40; i++) { var r = d.ts * i / 40, yy = d.H - 0.5 * g * r * r; sa.push([X(d.xa + d.vA * r), yy]); sb.push([X(d.xa + d.vB * r), yy]); }
    par.set([pa]); trA.set([sa]); trB.set([sb]);
    var cmx = d.vx * t, cmy = d.vy * t - 0.5 * g * t * t, ax, ay, bx, by, ex = t >= d.ts;
    if (!ex) { ax = cmx; ay = cmy; bx = cmx; by = cmy; } else { var r2 = t - d.ts, yy2 = Math.max(0, d.H - 0.5 * g * r2 * r2); ax = d.xa + d.vA * r2; bx = d.xa + d.vB * r2; ay = yy2; by = yy2; }
    ptA.mover(X(ax), ay); ptB.mover(X(bx), by); ptC.mover(X(cmx), Math.max(0, cmy)); ptX.mover(X(d.xa), d.H);
    uni.set(ex ? [[[X(ax), ay], [X(bx), by]]] : []);
    var Xr = XR, Yr = YH, kv = 0.17 * Xr / Math.max(Math.abs(d.vA), Math.abs(d.vB), Math.abs(d.vx), 1);
    fvA.poner([X(d.xa), d.H + 0.07 * Yr], [X(d.xa + d.vA * kv), d.H + 0.07 * Yr]); fvB.poner([X(d.xa), d.H + 0.12 * Yr], [X(d.xa + d.vB * kv), d.H + 0.12 * Yr]);
    var gap = 0.012 * Xr * kx, lejos = Math.abs(d.xA - d.xB) > 0.25 * Xr;
    if (lejos) { eA.ancla(d.xA <= d.xB ? 'l' : 'r'); eB.ancla(d.xA <= d.xB ? 'r' : 'l'); eA.mover(X(d.xA) + (d.xA <= d.xB ? gap : -gap), 0.06 * Yr); eB.mover(X(d.xB) + (d.xA <= d.xB ? -gap : gap), 0.06 * Yr); }
    else { eA.ancla('c'); eB.ancla('c'); eA.mover(X(d.xA), 0.14 * Yr); eB.mover(X(d.xB), 0.06 * Yr); }
    eC.mover(X(cmx) + gap, Math.max(0, cmy) + 0.05 * Yr);
    lH(f1(d.H) + ' m  ;  vₓ = ' + f1(d.vx) + ' m/s'); lV(f1(d.vA) + ' ; ' + f1(d.vB) + ' m/s (horizontales)');
    lT(f2(Tt) + ' s  ;  t = ' + f2(t) + ' s' + (ex ? ' (después de estallar)' : ' (antes de estallar)')); lX(f0(d.xA) + ' ; ' + f0(d.xB) + ' m');
    lR(f0(d.R) + ' m'); lM(f0((d.mA * d.xA + d.mB * d.xB) / M) + ' m  (coincide con R)'); lK(f0(d.dK) + ' J'); lC(f0(cmx) + ' ; ' + f0(Math.max(0, cmy)) + ' m');
  }
  c.slider('Rapidez inicial del obús, v₀ (m/s)', 10, 160, 0.1, v0, function (v) { v0 = v; calc(); }, function (v) { return f1(v) + ' m/s'; });
  c.slider('Ángulo de disparo α (°)', 10, 90, 1, al, function (v) { al = v; calc(); }, function (v) { return v + '°'; });
  c.slider('Razón de masas mA / mB (A es el fragmento pesado)', 1, 10, 0.1, rm, function (v) { rm = v; calc(); }, f1);
  c.slider('Masa total del obús, M (kg)', 1, 20, 0.01, M, function (v) { M = v; calc(); }, function (v) { return f2(v) + ' kg'; });
  c.slider('Velocidad de A hacia atrás respecto al obús, uA (m/s)', -100, 300, 0.01, uA, function (v) { uA = v; calc(); }, function (v) { return f2(v) + ' m/s'; });
  c.reproductor({ max: 1, valor: fs, paso: 0.002, vel: 1 / 5, pausaFin: 0.9, etiqueta: 'Instante del vuelo', fmt: function (v) { return Math.round(v * 100) + ' % del vuelo'; }, cb: function (v) { fs = v; calc(); } });
  c.leyenda([['var(--acc)', 'fragmento A (pesado)', 'punto'], ['var(--A)', 'fragmento B (ligero)', 'punto'], ['var(--fg)', 'centro de masa: sigue la parábola del obús entero (trazo discontinuo)', 'punto'], ['var(--warn-b)', 'punto de la explosión (vértice)', 'punto'], ['var(--mut)', 'eje horizontal comprimido respecto al vertical (los números de los ejes son metros reales)', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!ejes) return; clave = ''; calc();
  });
  calc();
});
