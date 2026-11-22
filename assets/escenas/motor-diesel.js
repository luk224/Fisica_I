/* Motor Diesel de 4 tiempos y su ciclo en el diagrama pV (tema 20; U §20.3, ec. 20.6 y ciclo Diesel). params: {"dim":2,"marcas":false}.
   Aire (gas ideal diatómico, γ = 1,4), cilindrada Vd = 500 cm³, p0 = 101 325 Pa, T0 = 300 K. Razón de compresión r = Va/Vb y razón de corte rc = Vc/Vb.
   Ciclo ideal: a→b compresión adiabática (p = p0 (Va/V)^γ), b→c calentamiento a presión constante (inyección; entra QH = n·Cp·(Tc − Tb), Cp = 7R/2),
   c→d expansión adiabática, d→a enfriamiento a volumen constante (escape; sale |QC| = n·Cv·(Td − T0), Cv = 5R/2). Tb = T0·r^(γ−1), Tc = rc·Tb, Td = T0·rc^γ.
   e = W/QH = 1 − (rc^γ − 1)/(r^(γ−1)·γ·(rc − 1)); con rc → 1 da el Otto 1 − r^(1−γ). Carnot entre T0 y Tc: 1 − T0/Tc.
   El dibujo es un mecanismo biela-manivela real (R = 1, L = 2,6): V se calcula de la posición del pistón, así que dibujo y diagrama van siempre a la par.
   Ángulo del cigüeñal φ (0-720°): 0-180 admisión (p0), 180-360 compresión, 360-540 combustión (p = pb mientras V ≤ rc·Vb) y expansión, 540-560 se abre el escape
   (p cae a volumen casi constante), 560-720 escape (p0). Asas: pasador del cigüeñal (gira el motor), culata (r) y punto c del diagrama (rc). */
Interactivos.registrar('motor-diesel', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), listo = false, clave = '';
  var gam = 1.4, Rg = 8.314, p0 = 101325, T0 = 300, Vd = 5e-4, VMAX = 600, PMAX = 9, TOPE = 2300;
  var r = 18, rc = 2, fi = 400, rep, sR, sRc;
  var CX = -4.3, CY = -2.3, RC = 1.0, LB = 2.6, WL = 1.15, TOPE_P = 0.25, PH = 0.5;
  var PX0 = 1.0, PW = 5.4, PY0 = -2.7, PHH = 5.0;
  var yTDC = CY + RC + LB, crownTDC = yTDC + TOPE_P, carrera = 2 * RC;
  var fijos = [], ticks = [], eEt, eAd, eEs, eIn, eA, eB, eC, eD, eX, eY;
  var NP = 36, parts = [], rnd = [], llamaE, llamaI, brillo, biela, brazo, pin, centro, pistonR, pistonB, gasR, culata, valA, valE, inyec, chorro, ciclo, actual, sombra, pto, ptoC, ptoR;
  var l1 = c.lectura(''), l2 = c.lectura(''), l3 = c.lectura(''), l4 = c.lectura('');
  var fm = function (x, d) { return x.toFixed(d).replace('.', ',').replace(/^-/, '−'); };
  function gx(V) { return PX0 + V / VMAX * PW; }
  function gy(p) { return PY0 + p / PMAX * PHH; }
  function ciclo_() {
    var Vb = Vd / (r - 1), Va = Vb * r, n = p0 * Va / (Rg * T0), pb = p0 * Math.pow(r, gam), Tb = T0 * Math.pow(r, gam - 1), Tc = rc * Tb;
    var pd = pb * Math.pow(rc / r, gam), Td = T0 * Math.pow(rc, gam), Qin = n * 3.5 * Rg * (Tc - Tb), Qout = n * 2.5 * Rg * (T0 - Td), W = Qin + Qout;
    var e = 1 - (Math.pow(rc, gam) - 1) / (Math.pow(r, gam - 1) * gam * (rc - 1));
    return { Vb: Vb, Va: Va, n: n, pb: pb, Tb: Tb, Tc: Tc, pd: pd, Td: Td, Qin: Qin, Qout: Qout, W: W, e: e, eO: 1 - Math.pow(r, 1 - gam), eC: 1 - T0 / Tc, Vc: rc * Vb };
  }
  function hVis(rr) { return 0.5 + 0.04 * (24 - rr); }  /* altura de la cámara con el pistón arriba: exagerada para que se vea (la real sería carrera/(r − 1)) */
  function mecanismo(f) {
    var th = (f % 360) * Math.PI / 180, yp = CY + RC * Math.cos(th) + Math.sqrt(LB * LB - RC * RC * Math.sin(th) * Math.sin(th));
    return { th: th, yp: yp, crown: yp + TOPE_P, xd: crownTDC - (yp + TOPE_P), pin: [CX + RC * Math.sin(th), CY + RC * Math.cos(th)] };
  }
  function estado(f, K) {
    var m = mecanismo(f), V = K.Vb + Vd * m.xd / carrera, p, Tg, et;
    if (f < 180) { et = 0; p = p0; Tg = T0; }
    else if (f < 360) { et = 1; p = p0 * Math.pow(K.Va / V, gam); Tg = p * V / (K.n * Rg); }
    else if (f < 540) { if (V <= K.Vc * 1.0000001) { et = 2; p = K.pb; } else { et = 3; p = K.pb * Math.pow(K.Vc / V, gam); } Tg = p * V / (K.n * Rg); }
    else if (f < 560) { et = 4; p = K.pd + (p0 - K.pd) * (f - 540) / 20; Tg = p * V / (K.n * Rg); }
    else { et = 5; p = p0; Tg = T0; }
    return { m: m, V: V, p: p, T: Tg, et: et };
  }
  function rect(col, op, z) {
    var q = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ color: col, transparent: true, opacity: op })); q.position.z = z;
    q.poner = function (x0, y0, x1, y1) { q.position.x = (x0 + x1) / 2; q.position.y = (y0 + y1) / 2; q.scale.set(Math.max(1e-6, x1 - x0), Math.max(1e-6, y1 - y0), 1); }; c.scene.add(q); fijos.push(q); return q;
  }
  function hs_(x) { var q = Math.sin(x) * 43758.5453; return q - Math.floor(q); }
  for (var ii = 0; ii < NP; ii++) rnd.push([hs_(ii * 12.9 + 1), hs_(ii * 78.2 + 2), hs_(ii * 37.7 + 3)]);
  function tri(col, op, z) {
    var m = new T.Mesh(new T.BufferGeometry(), new T.MeshBasicMaterial({ color: col, transparent: true, opacity: op, side: T.DoubleSide })); m.position.z = z;
    m.set = function (ts) { var a = []; ts.forEach(function (t) { a.push(t[0][0], t[0][1], 0, t[1][0], t[1][1], 0, t[2][0], t[2][1], 0); }); m.geometry.dispose(); m.geometry = new T.BufferGeometry(); m.geometry.setAttribute('position', new T.Float32BufferAttribute(a, 3)); };
    c.scene.add(m); fijos.push(m); return m;
  }
  function add(o) { c.scene.add(o); fijos.push(o); return o; }
  function construir() {
    var k = P.fg + P.bg + P.S + P.W + P.L + P.A + P.acc; if (k === clave && ciclo) return; clave = k;
    fijos.forEach(function (o) { c.scene.remove(o); }); fijos = [];
    c.vista(-6.8, 6.9, -3.75, 4.3); var w = 0.04, i;
    var rej = []; [0, 200, 400, 600].forEach(function (v) { rej.push([[gx(v), PY0], [gx(v), PY0 + PHH]]); }); [0, 2, 4, 6, 8].forEach(function (v) { rej.push([[PX0, gy(v)], [PX0 + PW, gy(v)]]); });
    var a = add(H.cinta(T, rej, P.bd, w * 0.5)); a.position.z = -0.3;
    var b = add(H.cinta(T, [[[PX0, PY0], [PX0 + PW, PY0]], [[PX0, PY0], [PX0, PY0 + PHH]]], P.fg, w)); b.position.z = -0.2;
    var cir = []; for (i = 0; i <= 72; i++) cir.push([CX + RC * Math.sin(2 * Math.PI * i / 72), CY + RC * Math.cos(2 * Math.PI * i / 72)]);
    add(H.cinta(T, [cir], P.mut, w * 0.7, [w * 5, w * 4])).position.z = -0.1;
    gasR = rect(P.S, 0.5, -0.05); brillo = rect(P.W, 0, -0.04); llamaE = tri(P.W, 0.9, 0.0); llamaI = tri(new T.Color('#ffc233'), 0.9, 0.01); pistonR = rect(P.mut, 0.35, 0.02);
    pistonB = add(H.cinta(T, [], P.fg, w * 1.5)); pistonB.position.z = 0.08;
    culata = add(H.cinta(T, [], P.fg, w * 2.2)); culata.position.z = 0.1;
    valA = add(H.cinta(T, [], P.S, w * 1.8)); valA.position.z = 0.12; valE = add(H.cinta(T, [], P.W, w * 1.8)); valE.position.z = 0.12;
    inyec = add(H.cinta(T, [], P.mut, w * 1.4)); inyec.position.z = 0.12; chorro = add(H.cinta(T, [], P.L, w * 1.6)); chorro.position.z = 0.15;
    biela = add(H.cinta(T, [], P.fg, w * 2)); biela.position.z = 0.06; brazo = add(H.cinta(T, [], P.fg, w * 3)); brazo.position.z = 0.07;
    centro = add(H.punto(T, CX, CY, w * 3.2, P.fg)); centro.position.z = 0.2; pin = add(H.punto(T, CX, CY + RC, w * 3.6, P.acc)); pin.position.z = 0.22;
    sombra = add(H.cinta(T, [], P.L, w * 0.8)); sombra.position.z = 0.02;
    ciclo = add(H.cinta(T, [], P.fg, w * 1.4)); ciclo.position.z = 0.1; actual = add(H.cinta(T, [], P.W, w * 2.6)); actual.position.z = 0.14;
    pto = add(H.punto(T, 0, 0, w * 4.2, P.W)); pto.position.z = 0.5;
    parts = []; for (i = 0; i < NP; i++) { var q = add(H.punto(T, 0, 0, w * 2.1, P.S)); q.position.z = 0.3; parts.push(q); }
    ticks.forEach(function (e) { e.ver(false); }); var j = 0, tx;
    [0, 200, 400, 600].forEach(function (v) { tx = ticks[j] || (ticks[j] = c.etiqueta('', 0, 0, 'c')); j++; tx.poner(fm(v, 0)); tx.mover(gx(v), PY0 - 0.25); tx.ver(true); });
    [0, 2, 4, 6, 8].forEach(function (v) { tx = ticks[j] || (ticks[j] = c.etiqueta('', 0, 0, 'r')); j++; tx.poner(fm(v, 0)); tx.mover(PX0 - 0.1, gy(v)); tx.ver(true); });
    eX.poner('V (cm³)'); eX.mover(PX0 + PW, PY0 - 0.55); eY.poner('p (MPa)'); eY.mover(PX0 + 0.1, PY0 + PHH + 0.3);
  }
  function calc() {
    if (!listo) return; construir(); var K = ciclo_(), S = estado(fi, K), m = S.m, i, hmin = hVis(r), headY = crownTDC + hmin;
    var xl = CX - WL, xr = CX + WL, x0 = CX - WL, x1 = CX + WL;
    culata.set([[[xl, -1.55], [xl, headY], [xr, headY], [xr, -1.55]]]);
    pistonR.poner(x0 + 0.03, m.crown - PH, x1 - 0.03, m.crown); pistonB.set([[[x0 + 0.03, m.crown - PH], [x0 + 0.03, m.crown], [x1 - 0.03, m.crown], [x1 - 0.03, m.crown - PH], [x0 + 0.03, m.crown - PH]]]);
    var u = Math.max(0, Math.min(1, (S.T - T0) / (TOPE - T0))), col = new T.Color(P.S).lerp(new T.Color(P.W), u);
    gasR.material.opacity = S.et === 2 || S.et === 3 ? 0.75 : 0.5; gasR.material.color.copy(S.et >= 4 ? new T.Color(P.mut).lerp(new T.Color(P.W), 0.2) : col); gasR.poner(x0 + 0.03, m.crown, x1 - 0.03, headY);
    var abA = S.et === 0 ? 0.16 : 0, abE = S.et === 5 || S.et === 4 ? 0.16 : 0;
    valA.set([[[CX - 0.5, headY + 0.7 - abA], [CX - 0.5, headY - abA]], [[CX - 0.72, headY - abA], [CX - 0.28, headY - abA]]]);
    valE.set([[[CX + 0.5, headY + 0.7 - abE], [CX + 0.5, headY - abE]], [[CX + 0.28, headY - abE], [CX + 0.72, headY - abE]]]);
    inyec.set([[[CX - 0.13, headY + 0.5], [CX + 0.13, headY + 0.5], [CX, headY], [CX - 0.13, headY + 0.5]]]);
    // llama, gases y moléculas dentro de la cámara (todo en función de φ: al girar hacia atrás se deshace)
    var xa = x0 + 0.12, xb = x1 - 0.12, yb = m.crown + 0.08, yt = headY - 0.06, hc = headY - m.crown, fr_ = function (z) { return z - Math.floor(z); };
    var cl = new T.Color(P.W), cf = new T.Color(P.S), cm = new T.Color(P.mut), wh = new T.Color('#ffffff');
    var s0 = S.et === 2 ? (S.V - K.Vb) / (K.Vc - K.Vb) : 1, fade = S.et === 2 ? 1 : S.et === 3 ? Math.max(0, 1 - 1.5 * Math.sqrt((S.V - K.Vc) / (K.Va - K.Vc))) : 0;
    var tong = [], tong2 = [], NT = 7, kk, L = S.et === 2 ? 0.55 + 0.45 * s0 : 1;
    if (fade > 0) for (kk = 0; kk < NT; kk++) {
      var xk = xa + (xb - xa) * (kk + 0.5) / NT, hw = (xb - xa) / NT * 0.75, la = hc * L * (0.6 + 0.4 * rnd[kk][0]) * (1 + 0.12 * Math.sin(fi * 0.9 + kk * 2.1)), ap = Math.max(yb, yt - la);
      tong.push([[xk - hw, yt], [xk + hw, yt], [xk + 0.06 * Math.sin(fi * 0.7 + kk), ap]]);
      tong2.push([[xk - hw * 0.5, yt], [xk + hw * 0.5, yt], [xk, Math.max(yb, yt - la * 0.6)]]);
    }
    llamaE.set(tong); llamaI.set(tong2); llamaE.material.opacity = 0.9 * fade; llamaI.material.opacity = 0.9 * fade;
    brillo.poner(x0 + 0.03, m.crown, x1 - 0.03, headY); brillo.material.opacity = 0.3 * fade * (S.et === 2 || S.et === 3 ? 1 : 0) + (S.et === 2 && fi < 376 ? 0.5 * (1 - (fi - 360) / 16) : 0);
    for (i = 0; i < NP; i++) {
      var rr = rnd[i], bx = xa + (xb - xa) * rr[0], by = yb + (yt - yb) * rr[1], jit = 0.02 + 0.045 * Math.sqrt(S.T / T0) * (S.et === 0 || S.et === 5 ? 0.5 : 1), ph = fi * 0.45 + rr[2] * 6.283, px, py, s1, vis = true, pc;
      px = bx + Math.sin(ph) * jit; py = by + Math.cos(ph * 1.3) * jit;
      if (S.et === 0) { s1 = fr_(i / NP + fi / 75); px = CX - 0.5 + (px - (CX - 0.5)) * s1; py = headY + 0.55 + (py - headY - 0.55) * s1; vis = py < yt + 0.02 || s1 < 0.5; pc = cf.clone(); }
      else if (S.et >= 4) { s1 = fr_(i / NP + (fi - 540) / 80); px = px + (CX + 0.5 - px) * s1; py = py + (headY + 0.9 - py) * s1; vis = s1 < 0.97 && (fi - 540) / 80 + i / NP > 0.2 * 0 ; pc = cl.clone().lerp(cm, Math.min(1, s1 * 1.5)); }
      else pc = u < 0.3 ? cf.clone() : S.et >= 2 ? new T.Color('#ffc233') : cl.clone();
      parts[i].visible = vis; parts[i].mover(px, py); parts[i].material.color.copy(pc);
    }
    chorro.set(S.et === 2 ? [[[CX, headY - 0.02], [CX - 0.3, Math.max(m.crown + 0.05, headY - 0.38)]], [[CX, headY - 0.02], [CX, Math.max(m.crown + 0.05, headY - 0.42)]], [[CX, headY - 0.02], [CX + 0.3, Math.max(m.crown + 0.05, headY - 0.38)]]] : []);
    biela.set([[m.pin, [CX, m.yp]]]); brazo.set([[[CX, CY], m.pin]]); pin.mover(m.pin[0], m.pin[1]);
    eAd.mover(CX - 0.75, headY + 0.5); eEs.mover(CX + 0.75, headY + 0.5); eIn.mover(CX, headY + 0.95);
    var NOM = ['1.er tiempo: ADMISIÓN (entra aire a p₀)', '2.º tiempo: COMPRESIÓN adiabática (a→b)', '3.er tiempo: INYECCIÓN y combustión a p constante (b→c)', '3.er tiempo: EXPANSIÓN adiabática (c→d), carrera de potencia', '4.º tiempo: se abre el ESCAPE (d→a), p baja a V constante', '4.º tiempo: ESCAPE (el pistón expulsa los gases)'];
    eEt.poner(NOM[S.et]); eEt.mover(CX + 1.4, 3.95);
    // diagrama pV: ciclo ideal en MPa y cm³
    var ab = [], cd = [], hs = [], Vb = K.Vb * 1e6, Va = K.Va * 1e6, Vc = K.Vc * 1e6, pb = K.pb / 1e6;
    for (i = 0; i <= 50; i++) { var V1 = Vb + (Va - Vb) * i / 50; ab.push([gx(V1), gy(p0 * Math.pow(Va / V1, gam) / 1e6)]); if (i % 1 === 0) { var top = V1 <= Vc ? pb : pb * Math.pow(Vc / V1, gam); hs.push([[gx(V1), gy(p0 * Math.pow(Va / V1, gam) / 1e6)], [gx(V1), gy(top)]]); } }
    for (i = 0; i <= 50; i++) { var V2 = Vc + (Va - Vc) * i / 50; cd.push([gx(V2), gy(pb * Math.pow(Vc / V2, gam))]); }
    var pbc = [[gx(Vb), gy(pb)], [gx(Vc), gy(pb)]], pda = [[gx(Va), gy(K.pd / 1e6)], [gx(Va), gy(p0 / 1e6)]], pad = [[gx(Vb), gy(p0 / 1e6)], [gx(Va), gy(p0 / 1e6)]];
    ciclo.set([ab, pbc, cd, pda]); sombra.set(hs);
    actual.set(S.et === 1 ? [ab] : S.et === 2 ? [pbc] : S.et === 3 ? [cd] : S.et === 4 ? [pda] : [pad]);
    pto.mover(gx(S.V * 1e6), gy(S.p / 1e6));
    eA.poner('a'); eA.mover(gx(Va) + 0.15, gy(p0 / 1e6) + 0.2); eB.poner('b'); eB.mover(gx(Vb) - 0.05, gy(pb) + 0.28); eC.poner('c'); eC.mover(gx(Vc) + 0.12, gy(pb) + 0.28);
    eD.poner('d'); eD.mover(gx(Va) + 0.17, gy(K.pd / 1e6));
    [eA, eB, eC, eD].forEach(function (e) { e.ver(true); });
    var ang = 0; (function () { var lo = 0, hi = 180, th, V; for (var q = 0; q < 40; q++) { th = (lo + hi) / 2; V = K.Vb + Vd * (crownTDC - (CY + RC * Math.cos(th * Math.PI / 180) + Math.sqrt(LB * LB - RC * RC * Math.pow(Math.sin(th * Math.PI / 180), 2)) + TOPE_P)) / carrera; if (V < K.Vc) lo = th; else hi = th; } ang = (lo + hi) / 2; })();
    l1('Cigüeñal φ = ' + fm(fi, 0) + '° de 720°   ·   p = ' + fm(S.p / 1e6, 2) + ' MPa   ·   V = ' + fm(S.V * 1e6, 0) + ' cm³   ·   T del aire = ' + fm(S.T, 0) + ' K');
    l2('Compresión: V_b = ' + fm(Vb, 1) + ' cm³ (r = ' + fm(r, 1) + '), T_b = ' + fm(K.Tb, 0) + ' K, p_b = ' + fm(pb, 2) + ' MPa  ·  la inyección dura hasta V_c = r_c·V_b = ' + fm(Vc, 1) + ' cm³ (' + fm(ang, 0) + '° tras el punto muerto), T_c = ' + fm(K.Tc, 0) + ' K');
    l3('Calor que entra (b→c, isóbara) Q_H = ' + fm(K.Qin, 0) + ' J  ·  calor que sale (d→a, isócora) |Q_C| = ' + fm(-K.Qout, 0) + ' J  ·  trabajo por ciclo W = ' + fm(K.W, 0) + ' J (el área sombreada)');
    var ok = K.e >= 0.6 && K.Tc <= 2000;
    l4('Eficiencia e = W/Q_H = ' + fm(100 * K.e, 1) + ' %  (Otto con el mismo r: ' + fm(100 * K.eO, 1) + ' %; Carnot entre 300 K y T_c: ' + fm(100 * K.eC, 1) + ' %)   ·   RETO e ≥ 60 % con T_c ≤ 2000 K: ' + (ok ? '✔ conseguido' : e_(K)));
  }
  function e_(K) { return '✘ ' + (K.e < 0.6 ? 'falta eficiencia (sube r o baja r_c)' : 'demasiado caliente (baja r_c o r)'); }
  sR = c.slider('Razón de compresión r = Va/Vb', 10, 24, 0.5, r, function (v) { r = v; calc(); }, function (v) { return fm(v, 1); });
  sRc = c.slider('Razón de corte r_c = Vc/Vb (cuánto dura la inyección)', 1.1, 4, 0.05, rc, function (v) { rc = v; calc(); }, function (v) { return fm(v, 2); });
  rep = c.reproductor({ max: 720, valor: fi, paso: 1, vel: 160, ciclico: true, etiqueta: 'Ángulo del cigüeñal', fmt: function (v) { return 'φ = ' + Math.round(v) + '°'; }, cb: function (v) { fi = v; calc(); } });
  c.agarres([
    { titulo: 'Gira el cigüeñal arrastrando el círculo: mueves el motor a mano', x: function () { return mecanismo(fi).pin; },
      mover: function (wx, wy) { var t = Math.atan2(wx - CX, wy - CY) * 180 / Math.PI; if (t < 0) t += 360; var d = ((t - (fi % 360) + 540) % 360) - 180; rep.pause(); rep.poner((((fi + d) % 720) + 720) % 720); } },
    { titulo: 'Sube o baja la culata: cambia la razón de compresión r', x: function () { return [CX + WL, crownTDC + hVis(r)]; },
      mover: function (wx, wy) { c.fijar(sR, 24 - (wy - crownTDC - 0.5) / 0.04); } },
    { titulo: 'Arrastra c hacia la derecha: la inyección dura más (razón de corte)', x: function () { var K = ciclo_(); return [gx(K.Vc * 1e6), gy(K.pb / 1e6)]; },
      mover: function (wx) { c.fijar(sRc, ((wx - PX0) / PW * VMAX) / (ciclo_().Vb * 1e6)); } }
  ]);
  eEt = c.etiqueta('', 0, 0, 'c'); eAd = c.etiqueta('admisión', 0, 0, 'r'); eEs = c.etiqueta('escape', 0, 0, 'l'); eIn = c.etiqueta('inyector', 0, 0, 'c');
  eX = c.etiqueta('', 0, 0, 'r'); eY = c.etiqueta('', 0, 0, 'l'); eA = c.etiqueta('', 0, 0, 'c'); eB = c.etiqueta('', 0, 0, 'c'); eC = c.etiqueta('', 0, 0, 'c'); eD = c.etiqueta('', 0, 0, 'c');
  c.leyenda([['var(--fg)', 'ciclo Diesel ideal a→b→c→d→a (la línea a p₀ de admisión y escape se anula)', 'linea'], ['var(--warn-b)', 'proceso en curso / estado del aire (más caliente = más naranja)', 'punto'], ['var(--X)', 'área = trabajo neto W', 'area'], ['var(--warn-b)', 'llama de la combustión; puntos = moléculas de aire (azul entra, gris sale)', 'area'], ['var(--U)', 'aire frío y válvula de admisión', 'area']]);
  c.alCambiarTema(function (p) { P = p; c.renderer.setClearColor(p.bg); if (!listo) return; clave = ''; calc(); });
  listo = true; calc();
});
