/* Ciclo de Carnot de un gas ideal en el diagrama pV (tema 20, §20.6; ec. 20.10-20.15 de U). params: {"dim":2,"marcas":false}.
   n = 1 mol de gas diatómico (γ = 1,4); V_a = 5,00 L. Vértices (letras de U fig. 20.13): a→b isoterma T_H, b→c adiabática, c→d isoterma T_C, d→a adiabática.
   Ajustables: T_H, T_C y la razón de expansión isoterma r = V_b/V_a. De las adiabáticas: V_c = V_b·(T_H/T_C)^(1/(γ−1)), V_d = V_a·(T_H/T_C)^(1/(γ−1)), luego V_c/V_d = V_b/V_a.
   Q_H = nRTH ln r;  Q_C = −nRTC ln r;  W = Q_H + Q_C;  e = 1 − T_C/T_H;  K = T_C/(T_H − T_C);  ΔS_ab = Q_H/T_H = nR ln r = −ΔS_cd.
   Modo «refrigerador»: el mismo ciclo recorrido al revés (antihorario): Q_C = +nRTC ln r entra, Q_H = −nRTH ln r sale, W < 0. */
Interactivos.registrar('carnot', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), listo = false, modo = 0, clave = '';
  var R = 8.314, n = 1, g = 1.4, Va = 5e-3;
  var TH = 500, TCsl = 300, rv = 2, eje = 0;
  var ejes, cab, cbc, ccd, cda, sombra, flechas, fl = [], ticks = [], eX, eY, eA, eB, eC, eD, eH, eK, mapa;
  var l1 = c.lectura(''), l2 = c.lectura(''), l3 = c.lectura(''), l4 = c.lectura('');
  var fm = function (x, d) { return x.toFixed(d).replace('.', ',').replace(/^-/, '−'); };
  var sl = [];
  function construir() {
    var k = eje + '|' + P.fg + P.bg + P.S + P.W + P.L + P.A + P.E; if (k === clave && ejes) return; clave = k;
    [ejes, cab, cbc, ccd, cda, sombra, flechas].forEach(function (o) { if (o) c.scene.remove(o); });
    c.vista(-1.1, 9.0, -0.8, 5.3); var w = 0.03;
    ejes = new T.Group(); var b = H.cinta(T, [[[0, 0], [7.4, 0]], [[0, 0], [0, 4.6]]], P.fg, w); b.position.z = -0.2; ejes.add(b); c.scene.add(ejes);
    sombra = H.cinta(T, [], P.L, w * 0.8); sombra.position.z = 0.02; c.scene.add(sombra);
    cab = H.cinta(T, [], P.A, w * 2.4); cab.position.z = 0.13; c.scene.add(cab);
    ccd = H.cinta(T, [], P.S, w * 2.4); ccd.position.z = 0.13; c.scene.add(ccd);
    cbc = H.cinta(T, [], P.fg, w * 1.8, [w * 5, w * 3]); cbc.position.z = 0.12; c.scene.add(cbc);
    cda = H.cinta(T, [], P.fg, w * 1.8, [w * 5, w * 3]); cda.position.z = 0.12; c.scene.add(cda);
    flechas = new T.Group(); c.scene.add(flechas); fl = [];
    [P.A, P.fg, P.S, P.fg].forEach(function (col) { var f = H.flecha2D(T, col, w * 1.6); f.position.z = 0.4; flechas.add(f); fl.push(f); });
    eX.poner(eje === 1 ? 'V (escala log.)' : 'V'); eX.mover(7.4, -0.5); eY.poner(eje === 1 ? 'p (escala log.)' : 'p'); eY.mover(0.1, 4.95);
  }
  function calc() {
    if (!listo) return; construir(); var i, N = 70;
    var TC = Math.min(TCsl, TH - 40);
    var kk = Math.pow(TH / TC, 1 / (g - 1));
    var Vb = rv * Va, Vc = Vb * kk, Vd = Va * kk;
    var pa = n * R * TH / Va, pb = n * R * TH / Vb, pc = n * R * TC / Vc, pd = n * R * TC / Vd;
    var sx = 7.2 / Vc, sy = 4.4 / pa, X = function (V) { return V * sx; }, Y = function (p) { return p * sy; };
    if (eje === 1) {
      var lx0 = Math.log(Va), lx1 = Math.log(Vc), ly0 = Math.log(pc), ly1 = Math.log(pa);
      X = function (V) { return 0.35 + (Math.log(V) - lx0) / (lx1 - lx0) * 6.6; };
      Y = function (p) { return 0.35 + (Math.log(p) - ly0) / (ly1 - ly0) * 3.8; };
    }
    var iH = function (V) { return n * R * TH / V; }, iC = function (V) { return n * R * TC / V; };
    var aB = function (V) { return pb * Math.pow(Vb / V, g); }, aD = function (V) { return pa * Math.pow(Va / V, g); };
    function curva(f, v0, v1) { var pts = []; for (i = 0; i <= N; i++) { var v = v0 + (v1 - v0) * i / N; pts.push([X(v), Y(f(v))]); } return [pts]; }
    cab.set(curva(iH, Va, Vb)); cbc.set(curva(aB, Vb, Vc)); ccd.set(curva(iC, Vd, Vc)); cda.set(curva(aD, Va, Vd));
    var tramos = [[iH, Va, Vb, 1], [aB, Vb, Vc, 1], [iC, Vc, Vd, -1], [aD, Vd, Va, -1]];
    tramos.forEach(function (t, j) {
      var vm = (t[1] + t[2]) / 2, dv = Math.abs(t[2] - t[1]) * 0.02, q0 = [X(vm - dv), Y(t[0](vm - dv))], q1 = [X(vm + dv), Y(t[0](vm + dv))];
      var dx = q1[0] - q0[0], dy = q1[1] - q0[1], d = Math.sqrt(dx * dx + dy * dy) || 1, sg = t[3] * (modo === 0 ? 1 : -1), mx = (q0[0] + q1[0]) / 2, my = (q0[1] + q1[1]) / 2, L = 0.3;
      fl[j].poner([mx - sg * dx / d * L, my - sg * dy / d * L], [mx + sg * dx / d * L, my + sg * dy / d * L]);
    });
    var up = function (V) { return V <= Vb ? iH(V) : aB(V); }, lo = function (V) { return V <= Vd ? aD(V) : iC(V); }, hs = [];
    for (i = 0; i <= 90; i++) { var v = Va + (Vc - Va) * i / 90; hs.push([[X(v), Y(lo(v))], [X(v), Y(up(v))]]); }
    sombra.set(eje === 1 ? [] : hs); sombra.material.color.set(P.L);
    var QH = n * R * TH * Math.log(rv), QC = -n * R * TC * Math.log(rv), W = QH + QC, e = 1 - TC / TH, K = TC / (TH - TC), dS = n * R * Math.log(rv);
    var pos = { a: [X(Va), Y(pa)], b: [X(Vb), Y(pb)], c: [X(Vc), Y(pc)], d: [X(Vd), Y(pd)] };
    eA.poner('a'); eA.mover(pos.a[0] - 0.22, pos.a[1] + 0.12); eB.poner('b'); eB.mover(pos.b[0] + 0.05, pos.b[1] + 0.28);
    eC.poner('c'); eC.mover(pos.c[0] + 0.05, pos.c[1] + 0.3); eD.poner('d'); eD.mover(pos.d[0] - 0.2, pos.d[1] - 0.25);
    eH.poner('TH = ' + fm(TH, 0) + ' K'); eH.mover(pos.b[0] + 0.15, pos.b[1] + 0.75); eH.ancla('l');
    eK.poner('TC = ' + fm(TC, 0) + ' K'); eK.mover(pos.c[0], pos.c[1] + 0.85); eK.ancla('r');
    if (modo === 0) {
      l1('Máquina (sentido horario a→b→c→d):  Va = 5,00 L,  Vb = ' + fm(Vb * 1000, 2) + ' L,  Vc = ' + fm(Vc * 1000, 2) + ' L,  Vd = ' + fm(Vd * 1000, 2) + ' L   ·   Vb/Va = Vc/Vd = ' + fm(rv, 2));
      l2('Calores:  QH = nRTH ln r = ' + fm(QH, 0) + ' J (entra, isoterma ab)   ·   QC = −nRTC ln r = ' + fm(QC, 0) + ' J (sale, isoterma cd)   ·   adiabáticas: Q = 0');
      l3('Trabajo  W = QH + QC = ' + fm(W, 0) + ' J (área encerrada)   ·   eficiencia  e = W/QH = ' + fm(100 * W / QH, 1) + ' %  =  1 − TC/TH = ' + fm(100 * e, 1) + ' %');
    } else {
      l1('Refrigerador (sentido antihorario a→d→c→b):  Va = 5,00 L,  Vb = ' + fm(Vb * 1000, 2) + ' L,  Vc = ' + fm(Vc * 1000, 2) + ' L,  Vd = ' + fm(Vd * 1000, 2) + ' L   ·   Vb/Va = Vc/Vd = ' + fm(rv, 2));
      l2('Calores:  QC = +' + fm(-QC, 0) + ' J (entra desde el foco frío, isoterma dc)   ·   QH = ' + fm(-QH, 0) + ' J (sale al foco caliente, isoterma ba)   ·   adiabáticas: Q = 0');
      l3('Trabajo  W = ' + fm(-W, 0) + ' J (hay que suministrarlo)   ·   coeficiente de rendimiento  K = |QC|/|W| = ' + fm(-QC / W, 2) + '  =  TC/(TH − TC) = ' + fm(K, 2));
    }
    l4('Entropía del gas:  ΔS isoterma caliente = Q/TH = ' + fm(modo === 0 ? dS : -dS, 2) + ' J/K   ·   ΔS isoterma fría = Q/TC = ' + fm(modo === 0 ? -dS : dS, 2) + ' J/K   ·   adiabáticas 0   ⇒   ΔS ciclo = 0  (QH/TH + QC/TC = 0)');
  }
  function mostrar() { }
  c.selector('Sentido del ciclo', ['Máquina térmica (horario)', 'Refrigerador (antihorario)'], 0, function (i) { modo = i; if (listo) { calc(); c.pedir(); } });
  c.selector('Ejes', ['Lineales (el área es el trabajo)', 'Logarítmicos (isotermas y adiabáticas son rectas)'], 0, function (i) { eje = i; if (listo) { calc(); c.pedir(); } });
  sl.push(c.slider('Temperatura del foco caliente TH (K)', 350, 900, 10, TH, function (v) { TH = v; calc(); }, function (v) { return fm(v, 0) + ' K'; }));
  sl.push(c.slider('Temperatura del foco frío TC (K)', 150, 450, 10, TCsl, function (v) { TCsl = v; calc(); }, function (v) { return fm(Math.min(v, TH - 40), 0) + ' K'; }));
  sl.push(c.slider('Razón de expansión isoterma r = Vb / Va', 1.2, 4, 0.1, rv, function (v) { rv = v; calc(); }, function (v) { return fm(v, 1); }));
  eX = c.etiqueta('', 0, 0, 'r'); eY = c.etiqueta('', 0, 0, 'l'); eA = c.etiqueta('', 0, 0, 'c'); eB = c.etiqueta('', 0, 0, 'c'); eC = c.etiqueta('', 0, 0, 'c'); eD = c.etiqueta('', 0, 0, 'c');
  eH = c.etiqueta('', 0, 0, 'l'); eK = c.etiqueta('', 0, 0, 'r');
  c.leyenda([['var(--A)', 'isoterma a TH (foco caliente)', 'linea'], ['var(--U)', 'isoterma a TC (foco frío)', 'linea'], ['var(--fg)', 'adiabáticas (Q = 0)', 'linea'], ['var(--X)', 'área = trabajo neto (ejes lineales)', 'area']]);
  c.alCambiarTema(function (p) { P = p; c.renderer.setClearColor(p.bg); if (!listo) return; clave = ''; calc(); });
  listo = true; calc();
});
