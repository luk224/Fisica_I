/* Oscilaciones amortiguadas y forzadas (tema 14; U §14.7-14.8, ec. 14.40-14.46, figs. 14.26 y 14.28). params: {"dim":2,"marcas":false}.
   Datos: m (kg), k (N/m), β = b/b_crít con b_crít = 2√(km) (14.44), ω_d/ω₀ (frecuencia impulsora). Siempre ω₀ = √(k/m), γ = b/2m.
   Panel izquierdo: x(t)/x₀ soltando desde el reposo en x₀ (v₀ = 0), t en unidades de T₀ = 2π/ω₀:
     β < 1  : x = A e^{−γt} cos(ω′t + φ),  ω′ = √(k/m − b²/4m²) (14.42-14.43),  φ = −arctan(γ/ω′),  A = x₀√(1+(γ/ω′)²)   (envolvente ±A e^{−γt})
     β = 1  : x = x₀ (1 + γt) e^{−γt}                       (amortiguamiento crítico)
     β > 1  : x = x₀ (r₂e^{r₁t} − r₁e^{r₂t})/(r₂ − r₁),  r₁,₂ = −γ ± √(γ² − ω₀²)   (sobreamortiguado)
     Energía: E/E₀ = (½mv² + ½kx²)/(½kx₀²); dE/dt = −bv² (14.45).
   Panel derecho (14.46): A·k/F_máx = 1/√((1 − r²)² + 4β²r²) con r = ω_d/ω₀ (equivale a A = F_máx/√((k−mω_d²)² + b²ω_d²)).
     Pico en r = √(1−2β²) con altura 1/(2β√(1−β²)) si β < 1/√2 (b < √(2km): el pico desaparece si b ≥ √(2km)).
   Control: m = 0,300 kg, k = 2,50 N/m, b = 0,900 kg/s (β = 0,520) ⇒ ω′ = 2,47 rad/s, f′ = 0,393 Hz, b_crít = 1,73 kg/s. */
Interactivos.registrar('amortiguado-resonancia', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var m = 0.3, k = 2.5, bt = 0.1, rd = 0.8, s = 0;      /* s = tiempo en unidades de T₀ (0 a 6) */
  var w0, T0, b, bcrit, gam, wp, listo = false, sobre = false, crit = false;
  var w = 0.016, LX = 0, LW = 3.6, TM = 6, RX = 4.95, RW = 3.1, RMAX = 2.5, RB = -1.25, RH = 2.55;
  var fm = function (v, d) { var f = Math.pow(10, d); return (Math.round(v * f) / f).toFixed(d).replace('-', '−').replace('.', ','); };
  var sg = function (v, n) { if (Math.abs(v) < 1e-12) return '0'; var d = Math.max(0, Math.min(6, n - 1 - Math.floor(Math.log(Math.abs(v)) / Math.LN10 + 1e-9))); return fm(v, d); };
  var ejesL, ejesR, ticksL, curvaL, envL, cursL, ptL, curvaR, tenues, unoR, ptR, pico, crsR, ntic = 0, eY = [], eX = [];
  var lr = c.lectura('Régimen (14.44)'), lf = c.lectura('Frecuencias y amortiguamiento'), lt = c.lectura('En el instante elegido (panel izquierdo)'), lq = c.lectura('Fuerza impulsora (panel derecho, 14.46)');
  var eTit1, eTit2, eT0, eXl, eRl, eRx, e1;

  function par() {
    w0 = Math.sqrt(k / m); T0 = 2 * Math.PI / w0; bcrit = 2 * Math.sqrt(k * m); b = bt * bcrit; gam = b / (2 * m);
    crit = Math.abs(bt - 1) < 1e-6; sobre = bt > 1 + 1e-6; wp = bt < 1 - 1e-6 ? Math.sqrt(Math.max(0, w0 * w0 - gam * gam)) : 0;
  }
  function X(t) {                               /* x(t)/x₀ */
    if (wp > 0) { return Math.exp(-gam * t) * (Math.cos(wp * t) + gam / wp * Math.sin(wp * t)); }
    if (crit) { return (1 + gam * t) * Math.exp(-gam * t); }
    var q = Math.sqrt(gam * gam - w0 * w0), r1 = -gam + q, r2 = -gam - q; return (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
  }
  function Amp(r) { return 1 / Math.sqrt(Math.pow(1 - r * r, 2) + 4 * bt * bt * r * r); }
  function tx(t) { return LX + LW * t / (TM * T0); }
  function rx(r) { return RX + RW * r / RMAX; }
  function nuevo() {
    ejesL = H.cinta(T, [[[LX, 0], [LX + LW + 0.12, 0]], [[LX, -1.4], [LX, 1.4]]], P.fg, w); ejesL.position.z = 0.05; c.scene.add(ejesL);
    var tk = [], i; for (i = 1; i <= TM; i++) tk.push([[tx(i * T0), -0.04], [tx(i * T0), 0.04]]);
    ticksL = H.cinta(T, tk, P.fg, w); ticksL.position.z = 0.05; c.scene.add(ticksL);
    ejesR = H.cinta(T, [[[RX, RB], [RX + RW + 0.12, RB]], [[RX, RB], [RX, RB + RH + 0.15]]], P.fg, w); ejesR.position.z = 0.05; c.scene.add(ejesR);
    envL = H.cinta(T, [], P.mut, w * 0.9, [w * 4, w * 3]); envL.position.z = 0.1; c.scene.add(envL);
    unoR = H.cinta(T, [[[rx(1), RB], [rx(1), RB + RH]]], P.mut, w * 0.8, [w * 4, w * 3]); unoR.position.z = 0.08; c.scene.add(unoR);
    tenues = H.cinta(T, [], P.mut, w * 0.7); tenues.position.z = 0.1; c.scene.add(tenues);
    curvaL = H.cinta(T, [], P.acc, w * 1.7); curvaL.position.z = 0.2; c.scene.add(curvaL);
    curvaR = H.cinta(T, [], P.acc, w * 1.7); curvaR.position.z = 0.2; c.scene.add(curvaR);
    cursL = H.cinta(T, [], P.mut, w * 0.8, [w * 3, w * 3]); cursL.position.z = 0.12; c.scene.add(cursL);
    crsR = H.cinta(T, [], P.mut, w * 0.8, [w * 3, w * 3]); crsR.position.z = 0.12; c.scene.add(crsR);
    ptL = H.punto(T, 0, 0, w * 3.2, P.W); ptL.position.z = 0.6; c.scene.add(ptL);
    ptR = H.punto(T, 0, 0, w * 3.2, P.W); ptR.position.z = 0.6; c.scene.add(ptR);
    pico = H.punto(T, 0, 0, w * 2.6, P.L); pico.position.z = 0.55; c.scene.add(pico);
    eTit1 = c.etiqueta('Oscilación amortiguada: x(t)/x₀ (se suelta en reposo)', LX + 0.05, 1.5, 'l');
    eTit2 = c.etiqueta('Forzada: A(ωd) en Fmáx/k', RX + 0.05, RB + RH + 0.3, 'l');
    eT0 = c.etiqueta('t (marcas cada T₀ = 2π/ω₀)', LX + LW, -1.45, 'r');
    eXl = c.etiqueta('x₀', LX - 0.05, 1, 'r'); eRl = c.etiqueta('ωd / ω₀', RX + RW + 0.1, RB - 0.38, 'r');
    eRx = []; [0, 0.5, 1, 1.5, 2, 2.5].forEach(function (r) { eRx.push(c.etiqueta(fm(r, r % 1 ? 1 : 0), rx(r), RB - 0.1, 'c')); });
    eY = []; for (i = 0; i < 8; i++) eY.push(c.etiqueta('', RX - 0.06, 0, 'r'));
    e1 = c.etiqueta('x₀', LX - 0.05, -1, 'r'); e1.poner('−x₀');
  }
  function calc() {
    if (!listo) return; par();
    var i, n = 300, t, A0 = wp > 0 ? Math.sqrt(1 + Math.pow(gam / wp, 2)) : 0;
    curvaL.set(H.grafica(function (xx) { return X((xx - LX) / LW * TM * T0); }, LX, LX + LW, 400, 1.42));
    if (wp > 0) {
      envL.set(H.grafica(function (xx) { return A0 * Math.exp(-gam * (xx - LX) / LW * TM * T0); }, LX, LX + LW, 200, 1.42).concat(
        H.grafica(function (xx) { return -A0 * Math.exp(-gam * (xx - LX) / LW * TM * T0); }, LX, LX + LW, 200, 1.42)));
    } else envL.set([]);
    var tc = s * T0, xc = X(tc), dt = T0 * 1e-4, vc = (X(tc + dt) - X(tc - dt)) / (2 * dt), Ec = 0.5 * m * vc * vc + 0.5 * k * xc * xc;
    ptL.mover(tx(tc), xc); cursL.set([[[tx(tc), 0], [tx(tc), xc]]]);
    /* panel derecho */
    var peakB = bt < Math.SQRT1_2, rp = peakB ? Math.sqrt(1 - 2 * bt * bt) : 0, Ap = peakB ? 1 / (2 * bt * Math.sqrt(1 - bt * bt)) : 1;
    var ymax = Math.min(12, H.techo(Math.max(1.2, Ap * 1.1))), Yv = function (v) { return RB + RH * v / ymax; };
    curvaR.set(H.grafica(function (xx) { return Yv(Amp((xx - RX) / RW * RMAX)); }, RX, RX + RW, 400, RB + RH * 1.05));
    var tn = []; [0.1, 0.2, 0.35, 0.5, 1].forEach(function (bb) {
      var sub = H.grafica(function (xx) { var r = (xx - RX) / RW * RMAX; return Yv(1 / Math.sqrt(Math.pow(1 - r * r, 2) + 4 * bb * bb * r * r)); }, RX, RX + RW, 300, RB + RH * 1.05);
      tn = tn.concat(sub);
    });
    tenues.set(tn);
    var Ar = Amp(rd); ptR.mover(rx(rd), Math.min(RB + RH * 1.04, Yv(Ar))); crsR.set([[[rx(rd), RB], [rx(rd), Math.min(RB + RH * 1.04, Yv(Ar))]]]);
    pico.mover(rx(rp), Yv(Ap)); pico.visible = peakB;
    var st = H.paso(ymax, 5), j = 0, v;
    for (v = st; v <= ymax * 1.0001 && j < eY.length; v += st) { eY[j].mover(RX - 0.06, Yv(v)); eY[j].poner(fm(v, st < 1 ? 1 : 0)); eY[j].ver(true); j++; }
    for (; j < eY.length; j++) eY[j].ver(false);
    eXl.poner('x₀'); e1.mover(LX - 0.05, -1);
    /* lecturas */
    lr(wp > 0 ? 'Subamortiguado: b < 2√(km); oscila con amplitud decreciente A·e^(−bt/2m)' : crit ? 'Amortiguamiento crítico: b = 2√(km); vuelve al equilibrio sin oscilar, lo más deprisa posible' : 'Sobreamortiguado: b > 2√(km); vuelve lentamente al equilibrio sin oscilar');
    lf('ω₀ = ' + fm(w0, 2) + ' rad/s  ·  b = ' + fm(b, 3) + ' kg/s  ·  bcrít = 2√(km) = ' + fm(bcrit, 3) + ' kg/s (β = ' + fm(bt, 2) + ')  ·  ' +
       (wp > 0 ? 'ω′ = √(k/m − b²/4m²) = ' + fm(wp, 2) + ' rad/s (f′ = ' + fm(wp / (2 * Math.PI), 3) + ' Hz, T′ = ' + fm(2 * Math.PI / wp, 3) + ' s)' : 'ω′ no existe (no hay oscilación)'));
    lt('t = ' + fm(tc, 2) + ' s (' + fm(s, 2) + ' T₀):  x/x₀ = ' + sg(xc, 3) + '   ·   energía E/E₀ = ' + sg(Ec / (0.5 * k), 3) + (wp > 0 ? '   ·   envolvente = ' + sg(A0 * Math.exp(-gam * tc), 3) : ''));
    lq('ωd/ω₀ = ' + fm(rd, 2) + ':  A = ' + fm(Ar, 2) + ' Fmáx/k   ·   ' + (peakB ? 'pico en ωd/ω₀ = √(1−2β²) = ' + fm(rp, 2) + ', altura ' + fm(Ap, 2) + ' Fmáx/k' : 'b ≥ √(2km): ya no hay pico, el máximo es A = Fmáx/k en ωd → 0'));
  }
  par();
  c.slider('Masa m (kg)', 0.1, 2, 0.05, m, function (v) { m = v; calc(); }, function (v) { return fm(v, 2) + ' kg'; });
  c.slider('Constante del resorte k (N/m)', 1, 10, 0.5, k, function (v) { k = v; calc(); }, function (v) { return fm(v, 1) + ' N/m'; });
  c.slider('Amortiguamiento b / bcrít  (bcrít = 2√(km))', 0.03, 2, 0.01, bt, function (v) { bt = Math.round(v * 100) / 100; calc(); }, function (v) { return fm(v, 2) + ' bcrít'; });
  c.slider('Frecuencia impulsora ωd / ω₀', 0.05, 2.5, 0.05, rd, function (v) { rd = v; calc(); }, function (v) { return fm(v, 2) + ' ω₀'; });
  c.reproductor({ max: TM, valor: 0, paso: 0.01, vel: 0.5, ciclico: false, pausaFin: 1.5, etiqueta: 'Tiempo (en periodos T₀)',
    fmt: function (v) { return 't = ' + fm(v * T0, 2) + ' s = ' + fm(v, 2) + ' T₀'; }, cb: function (v) { s = v; calc(); } });
  c.leyenda([['var(--acc)', 'x(t) y A(ωd) del b elegido', 'linea'], ['var(--mut)', 'envolvente ±Ae^(−bt/2m) (a trazos)', 'linea'], ['var(--mut)', 'otros b = 0,2 · 0,4 · 0,7 · 1,0 · 2,0 × √(km) (fig. 14.28)', 'linea'], ['var(--X)', 'pico de resonancia', 'punto'], ['var(--warn-b)', 'instante / ωd elegido', 'punto']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!ejesL) return;
    ejesL.material.color.set(p.fg); ticksL.material.color.set(p.fg); ejesR.material.color.set(p.fg); envL.material.color.set(p.mut); unoR.material.color.set(p.mut);
    tenues.material.color.set(p.mut); curvaL.material.color.set(p.acc); curvaR.material.color.set(p.acc); cursL.material.color.set(p.mut); crsR.material.color.set(p.mut);
    ptL.material.color.set(p.W); ptR.material.color.set(p.W); pico.material.color.set(p.L);
  });
  c.vista(-0.55, RX + RW + 0.45, -1.7, 1.75);
  nuevo(); listo = true; calc();
});
