/* Calorimetría y cambios de fase del agua (tema 17, §17.5-17.6; ec. 17.13 y 17.20 de U). params: {"dim":2,"marcas":false}.
   Datos de U: c_hielo = 2100, c_agua = 4190 J/(kg·K); L_f = 3,34e5 J/kg, L_v = 2,256e6 J/kg (agua, 1 atm).
   Modo 0 «Curva de calentamiento»: m kg de hielo a T₀ < 0 °C reciben calor Q (potencia constante P ⇒ t = Q/P):
        tramo 1 hielo T₀→0 °C: Q₁ = m c_h |T₀|;  tramo 2 fusión: m L_f;  tramo 3 agua 0→100 °C: m c_a 100;  tramo 4 ebullición: m L_v.
   Modo 1 «Mezcla de agua e hielo» (aislada): se representan en el MISMO eje Q la temperatura del agua que cede calor (baja) y la del hielo que lo
        absorbe (sube); el equilibrio es el primer Q en que la temperatura del hielo alcanza a la del agua (ΣQ = 0).
        Agua: T_w(Q) = T_w0 − Q/(m_w c_a) hasta 0 °C; meseta m_w L_f (se congela); después baja con c_h.
        Hielo: T_h(Q) = T_h0 + Q/(m_h c_h) hasta 0 °C; meseta m_h L_f (se funde); después sube con c_a (se corta en 100 °C). */
Interactivos.registrar('calentamiento-fases', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), listo = false, clave = '';
  var CH = 2100, CA = 4190, LF = 3.34e5, LV = 2.256e6;
  var eje = 0, modo = 0, m = 0.018, T0 = -10, pot = 200, u = 35, mw = 1.5, Tw = 28, mi = 0.6, Ti = -22;
  var ejes, cSub, cMes, cAgua, cHielo, guia, pt, pe, w, kx = 1, XM = 1, YL = -40, YH = 110, ticksX = [], ticksY = [];
  var eMarc = [], eX, eY, eA, eB, eC, eD, eEq;
  var lP = c.lectura(''), lQ = c.lectura(''), lT = c.lectura(''), lR = c.lectura(''), lS = c.lectura('');
  var fm = function (x, d) { return x.toFixed(d).replace('.', ',').replace(/^-/, '−'); };
  var fmil = function (x) { var s = Math.round(x).toString(); return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('-', '−'); };
  function cx() { return eje === 0 ? 1 / 1000 : 1 / (pot * 60); }
  function tramos() {
    var q1 = m * CH * (0 - T0), q2 = m * LF, q3 = m * CA * 100, q4 = m * LV;
    return [q1, q2, q3, q4];
  }
  function Tcal(Q) {
    var q = tramos(), a = q[0], b = a + q[1], d = b + q[2];
    if (Q <= a) return T0 + Q / (m * CH);
    if (Q <= b) return 0;
    if (Q <= d) return (Q - b) / (m * CA);
    return 100;
  }
  function Tagua(Q) {
    var a = mw * CA * Tw, b = a + mw * LF;
    if (Q <= a) return Tw - Q / (mw * CA);
    if (Q <= b) return 0;
    return -(Q - b) / (mw * CH);
  }
  function Thielo(Q) {
    var a = mi * CH * (-Ti), b = a + mi * LF;
    if (Q <= a) return Ti + Q / (mi * CH);
    if (Q <= b) return 0;
    return (Q - b) / (mi * CA);
  }
  function equilibrio() {
    var lo = 0, hi = 1e8, i, mid;
    for (i = 0; i < 90; i++) { mid = (lo + hi) / 2; if (Thielo(mid) >= Tagua(mid)) hi = mid; else lo = mid; }
    return hi;
  }
  function limites() {
    if (modo === 0) {
      var q = tramos(), tot = q[0] + q[1] + q[2] + q[3];
      return { xm: tot * cx(), yl: Math.floor(T0 / 10) * 10 - 10, yh: 110 };
    }
    var xm = H.techo(1.12 * Math.max(mw * CA * Tw + mw * LF * 0.25, mi * CH * (-Ti) + mi * LF) / 1000);
    return { xm: xm, yl: Math.floor(Math.min(Ti, -5) / 10) * 10 - 10, yh: Math.max(110, Math.ceil((Tw + 5) / 10) * 10) };
  }
  function poli(f, xm, yl, ylim) {
    /* muestrea f(Q) en kJ, cortando fuera de [yl, ylim] */
    var out = [], cur = [], n = 400, i, Q, y;
    for (i = 0; i <= n; i++) {
      Q = xm * 1000 * i / n; y = f(Q);
      if (y >= yl - 1e-9 && y <= ylim + 1e-9) cur.push([Q * cx() * kx, y]); else { if (cur.length > 1) out.push(cur); cur = []; }
    }
    if (cur.length > 1) out.push(cur); return out;
  }
  function construir() {
    var l = limites(), k = modo + '|' + eje + '|' + pot + '|' + l.xm.toFixed(4) + '|' + l.yl + '|' + l.yh + '|' + P.fg + P.bg;
    if (k === clave && ejes) return false; clave = k;
    [ejes, cSub, cMes, cAgua, cHielo, guia, pt, pe].forEach(function (o) { if (o) c.scene.remove(o); });
    XM = l.xm; YL = l.yl; YH = l.yh; var dy = YH - YL; kx = 1.75 * dy / XM; c.escalaX(kx); w = 0.0055 * dy * 1.3;
    c.vista(-0.11 * XM * kx, XM * kx * 1.03, YL - 0.1 * dy, YH + 0.02 * dy);
    var rej = [], sx = H.paso(XM, 6), sy = H.paso(dy, 6), v, i;
    for (v = Math.ceil(0 / sx) * sx; v <= XM + 1e-9; v += sx) rej.push([[v * kx, YL], [v * kx, YH]]);
    for (v = Math.ceil(YL / sy) * sy; v <= YH + 1e-9; v += sy) rej.push([[0, v], [XM * kx, v]]);
    ejes = new T.Group();
    var a = H.cinta(T, rej, P.bd, w * 0.5); a.position.z = -0.3;
    var b = H.cinta(T, [[[0, YL], [XM * kx, YL]], [[0, YL], [0, YH]]], P.fg, w); b.position.z = -0.2; ejes.add(a, b); c.scene.add(ejes);
    var z0 = H.cinta(T, [[[0, 0], [XM * kx, 0]]], P.mut, w * 0.9, [w * 5, w * 4]); z0.position.z = -0.1; ejes.add(z0);
    cSub = H.cinta(T, [], P.acc, w * 1.7); cSub.position.z = 0.1; c.scene.add(cSub);
    cMes = H.cinta(T, [], P.A, w * 1.7); cMes.position.z = 0.11; c.scene.add(cMes);
    cAgua = H.cinta(T, [], P.S, w * 1.7); cAgua.position.z = 0.1; c.scene.add(cAgua);
    cHielo = H.cinta(T, [], P.L, w * 1.7); cHielo.position.z = 0.1; c.scene.add(cHielo);
    guia = H.cinta(T, [], P.W, w * 0.9, [w * 5, w * 3.5]); guia.position.z = 0.2; c.scene.add(guia);
    pt = H.punto(T, 0, 0, w * 3.6, P.W); pt.position.z = 0.5; c.scene.add(pt);
    pe = H.punto(T, 0, 0, w * 3.6, P.fg); pe.position.z = 0.5; c.scene.add(pe);
    /* números de los ejes */
    ticksX.concat(ticksY).forEach(function (e) { e.ver(false); });
    var ix = 0, iy = 0, t;
    for (v = 0; v <= XM + 1e-9; v += sx) { t = ticksX[ix] || (ticksX[ix] = c.etiqueta('', 0, 0, 'c')); ix++; t.poner(fm(v, sx < 1 ? 1 : 0).replace(',0', '')); t.mover(v * kx, YL - 0.035 * dy); t.ver(true); }
    for (v = Math.ceil(YL / sy) * sy; v <= YH + 1e-9; v += sy) { t = ticksY[iy] || (ticksY[iy] = c.etiqueta('', 0, 0, 'r')); iy++; t.poner(fm(v, 0)); t.mover(-0.012 * XM * kx, v); t.ver(true); }
    eX.mover(XM * kx, YL - 0.085 * dy); eY.mover(0.01 * XM * kx, YH - 0.01 * dy);
    return true;
  }
  function calc() {
    if (!listo) return; var nueva = construir(); var l = YH - YL;
    if (modo === 0) {
      var q = tramos(), tot = q[0] + q[1] + q[2] + q[3], Q = tot * u / 100, a = q[0], b = a + q[1], d = b + q[2];
      var tr = Q <= a ? 0 : Q <= b ? 1 : Q <= d ? 2 : 3, TT = Tcal(Q);
      cSub.set([[[0, T0], [a * cx() * kx, 0]], [[b * cx() * kx, 0], [d * cx() * kx, 100]]]);
      cMes.set([[[a * cx() * kx, 0], [b * cx() * kx, 0]], [[d * cx() * kx, 100], [tot * cx() * kx, 100]]]);
      cAgua.set([]); cHielo.set([]);
      guia.set([[[Q * cx() * kx, YL], [Q * cx() * kx, TT]], [[0, TT], [Q * cx() * kx, TT]]]); pt.mover(Q * cx() * kx, TT); pe.mover(-99, -99);
      eA.poner('hielo'); eA.mover(a * cx() / 2 * kx, T0 / 2 + 6); eA.ver(a * cx() > 0.07 * XM); eA.ancla('c');
      eB.poner('fusión'); eB.mover((a + b) * cx() / 2 * kx, 8); eB.ver(true); eB.ancla('c');
      eC.poner('agua líquida'); eC.mover((b + d) * cx() / 2 * kx - 0.01 * XM * kx, 58); eC.ver(true); eC.ancla('r');
      eD.poner('ebullición'); eD.mover((d + tot) * cx() / 2 * kx, 100 - 0.075 * l); eD.ver(true); eD.ancla('c');
      eEq.ver(false); eX.poner(eje === 0 ? 'Q acumulado (kJ)' : 't = Q/P (min) con P = ' + fm(pot, 0) + ' W'); eY.poner('T (°C)');
      lP('Tramo en que está: ' + ['① hielo: se calienta (Q = mcΔT con c del hielo)', '② fusión a 0 °C: Q = mL, la temperatura NO cambia', '③ agua líquida: se calienta (c del agua)', '④ ebullición a 100 °C: Q = mL, la temperatura NO cambia'][tr]);
      lQ('Calor aportado / total del proceso: ' + fmil(Q) + ' J   /   ' + fmil(tot) + ' J   (' + fm(Q / 1000, 2) + ' kJ de ' + fm(tot / 1000, 2) + ' kJ)');
      lT('Temperatura / tiempo con la potencia elegida: ' + fm(TT, 1) + ' °C   /   ' + (Q / pot < 120 ? fm(Q / pot, 0) + ' s' : fm(Q / pot / 60, 1) + ' min') + '   (P = ' + fm(pot, 0) + ' W)');
      lR('Calor de cada tramo (J) ① | ② | ③ | ④: ' + fmil(q[0]) + '  |  ' + fmil(q[1]) + '  |  ' + fmil(q[2]) + '  |  ' + fmil(q[3]));
      lS('Reparto del total: hielo ' + fm(100 * q[0] / tot, 1) + ' %  ·  fusión ' + fm(100 * q[1] / tot, 1) + ' %  ·  agua ' + fm(100 * q[2] / tot, 1) + ' %  ·  ebullición ' + fm(100 * q[3] / tot, 1) + ' %');
    } else {
      var Qs = equilibrio(), Teq = Thielo(Qs), qa = mw * CA * Tw, qi = mi * CH * (-Ti);
      cSub.set([]); cMes.set([]);
      cAgua.set(poli(Tagua, XM, YL, 100)); cHielo.set(poli(Thielo, XM, YL, 100));
      guia.set([[[Qs / 1000 * kx, YL], [Qs / 1000 * kx, Teq]], [[0, Teq], [Qs / 1000 * kx, Teq]]]); pt.mover(-99, -99); pe.mover(Qs / 1000 * kx, Teq);
      eA.poner('agua que se enfría'); eA.mover(0.02 * XM * kx, Tw + 0.06 * l); eA.ver(true); eA.ancla('l');
      eB.poner('hielo que se calienta'); eB.mover(0.02 * XM * kx, Ti + 0.07 * l); eB.ver(true); eB.ancla('l');
      eC.ver(false); eD.ver(false);
      eEq.ver(true); eEq.poner('equilibrio'); eEq.mover(Qs / 1000 * kx + 0.012 * XM * kx, Teq + 0.07 * l); eEq.ancla('l');
      eX.poner('calor intercambiado Q (kJ)'); eY.poner('T (°C)');
      var cero = Math.abs(Teq) < 1e-3, fund = Math.max(0, Math.min(mi, (Qs - qi) / LF)), cong = Math.max(0, Math.min(mw, (Qs - qa) / LF));
      lP('El agua puede ceder hasta 0 °C / el hielo necesita para llegar a 0 °C y fundirse: ' + fmil(qa) + ' J   /   ' + fmil(qi) + ' J + ' + fmil(mi * LF) + ' J = ' + fmil(qi + mi * LF) + ' J');
      lQ('Calor intercambiado hasta el equilibrio: ' + fmil(Qs) + ' J   (' + fm(Qs / 1000, 2) + ' kJ)');
      lT('Temperatura final: ' + fm(Teq, 1) + ' °C' + (cero ? '   (coexisten hielo y agua)' : Teq > 0 ? '   (todo el hielo se ha fundido)' : '   (toda el agua se ha congelado)'));
      var ef;
      var hf = mi - fund + cong, af = mw + fund - cong;
      ef = (cero ? 'hielo: ' + fm(hf, 3) + ' kg   ·   agua líquida: ' + fm(af, 3) + ' kg   (fundido ' + fm(fund, 3) + ' kg' + (cong > 0 ? ', congelado ' + fm(cong, 3) + ' kg' : '') + ')'
        : Teq > 0 ? 'solo agua líquida: ' + fm(mw + mi, 3) + ' kg' : 'solo hielo: ' + fm(mw + mi, 3) + ' kg');
      lR('Estado final: ' + ef);
      lS('Calor intercambiado: el agua cede ' + fmil(Qs) + ' J y el hielo recibe ' + fmil(Qs) + ' J  (ΣQ = 0)');
    }
  }
  var ss = [];
  ss.push(c.selector('Qué se representa', ['Curva de calentamiento de hielo hasta ebullición', 'Mezcla de agua e hielo en un recipiente aislado'], 0, function (i) { modo = i; if (listo) { clave = ''; calc(); mostrar(); } }));
  var ctl = [];
  ctl.push(c.selector('Eje horizontal (curva de calentamiento)', ['Calor acumulado Q (kJ)', 'Tiempo t = Q/P (min), con la potencia elegida'], 0, function (i) { eje = i; if (listo) { clave = ''; calc(); } }));
  ctl.push(c.slider('Masa de la muestra (g)', 5, 500, 1, m * 1000, function (v) { m = v / 1000; calc(); }, function (v) { return fm(v, 0) + ' g'; }));
  ctl.push(c.slider('Temperatura inicial del hielo (°C)', -40, -1, 1, T0, function (v) { T0 = v; calc(); }, function (v) { return fm(v, 0) + ' °C'; }));
  ctl.push(c.slider('Potencia de calentamiento (W)', 50, 2000, 50, pot, function (v) { pot = v; calc(); }, function (v) { return fm(v, 0) + ' W'; }));
  ctl.push(c.slider('Avance del calentamiento (% del total)', 0, 100, 0.5, u, function (v) { u = v; calc(); }, function (v) { return fm(v, 1) + ' %'; }));
  var ctl2 = [];
  ctl2.push(c.slider('Masa de agua (kg)', 0.1, 3, 0.1, mw, function (v) { mw = v; calc(); }, function (v) { return fm(v, 1) + ' kg'; }));
  ctl2.push(c.slider('Temperatura del agua (°C)', 1, 100, 1, Tw, function (v) { Tw = v; calc(); }, function (v) { return fm(v, 0) + ' °C'; }));
  ctl2.push(c.slider('Masa de hielo (kg)', 0.05, 2, 0.05, mi, function (v) { mi = v; calc(); }, function (v) { return fm(v, 2) + ' kg'; }));
  ctl2.push(c.slider('Temperatura del hielo (°C)', -40, -1, 1, Ti, function (v) { Ti = v; calc(); }, function (v) { return fm(v, 0) + ' °C'; }));
  function mostrar() {
    ctl.forEach(function (s) { s.parentNode.style.display = modo === 0 ? '' : 'none'; });
    ctl2.forEach(function (s) { s.parentNode.style.display = modo === 1 ? '' : 'none'; });
  }
  eX = c.etiqueta('', 0, 0, 'r'); eY = c.etiqueta('', 0, 0, 'l'); eA = c.etiqueta('', 0, 0, 'c'); eB = c.etiqueta('', 0, 0, 'c'); eC = c.etiqueta('', 0, 0, 'c'); eD = c.etiqueta('', 0, 0, 'c'); eEq = c.etiqueta('', 0, 0, 'l');
  c.leyenda([['var(--acc)', 'tramos en que cambia T: Q = mcΔT', 'linea'], ['var(--A)', 'mesetas de cambio de fase: Q = mL', 'linea'], ['var(--U)', 'mezcla: agua que cede calor', 'linea'], ['var(--X)', 'mezcla: hielo que recibe calor', 'linea'], ['var(--warn-b)', 'punto actual y guías', 'punto']]);
  c.alCambiarTema(function (p) { P = p; c.renderer.setClearColor(p.bg); if (!listo) return; clave = ''; calc(); });
  listo = true; mostrar(); calc();
});
