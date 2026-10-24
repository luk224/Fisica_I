/* Conservación del momento angular: el profesor con mancuernas en la mesa giratoria (tema 10; ejemplo 10.10 de U). params: {"dim":2,"marcas":false}.
   Vista desde arriba. Sin torca externa L = I ω es constante. Estado inicial: mancuernas a r₁ = 1,0 m girando a ω₁ (rev/s).
   I(r) = I_cuerpo(r) + 2 m r², con I_cuerpo(r) = 2,0 + 1,0·r kg·m² (interpolación lineal entre los 3,0 con los brazos extendidos, r = 1,0 m,
   y los 2,2 con las manos en el abdomen, r = 0,20 m; son los dos datos del ejemplo 10.10). Con m = 5,0 kg: I(1,0) = 13 kg·m² e I(0,20) = 2,6 kg·m² → ω pasa de 0,50 a 2,5 rev/s.
   ω(r) = L/I(r),  K = ½ I ω² = L²/(2I),  trabajo de los brazos = K − K₁.  El giro se dibuja a cámara lenta (0,35×). */
Interactivos.registrar('momento-angular', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), rad = Math.PI / 180;
  var r = 0.5, m = 5.0, w1 = 0.5, ph = 35, listo = false;
  var RP = 2.4, sx = 2.0, w = 0.0055 * 11.5, CX = -2.2;
  var plat, platB, cuerpo, brazos, ma, mb, mca, mcb, grp, marca, ejes;
  var BX = 4.4, BH = 4.3, BY = -2.7, bL, bK, bK1, lL, lK;
  var lI = c.lectura('Momento de inercia I = I_cuerpo + 2 m r²'), lw = c.lectura('Velocidad angular ω = L / I'), lLz = c.lectura('Momento angular L = I ω (constante)'),
      lKk = c.lectura('Energía cinética K = ½ I ω²'), lW = c.lectura('Trabajo hecho por los brazos = K − K₁');
  var f2 = function (x) { var q = Math.round(x * 100) / 100; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  var f1 = function (x) { var q = Math.round(x * 10) / 10; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  function Icu(rr) { return 2.0 + 1.0 * rr; }
  function I(rr) { return Icu(rr) + 2 * m * rr * rr; }
  function L() { return I(1.0) * w1 * 2 * Math.PI; }
  function om(rr) { return L() / I(rr); }
  function K(rr) { var o = om(rr); return 0.5 * I(rr) * o * o; }

  function rect(col, op) {
    var q = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ color: col, transparent: true, opacity: op })); q.position.z = 0.2;
    q.poner = function (x0, y0, x1, y1) { q.position.x = (x0 + x1) / 2; q.position.y = (y0 + y1) / 2; q.scale.set(Math.max(1e-6, x1 - x0), Math.max(1e-6, y1 - y0), 1); }; c.scene.add(q); return q;
  }
  function nuevo() {
    c.vista(-5.2, 8.6, -3.7, 3.3);
    grp = new T.Group(); grp.position.set(CX, 0.1, 0); c.scene.add(grp);
    var pts = [], k; for (k = 0; k <= 72; k++) pts.push([RP * Math.cos(2 * Math.PI * k / 72), RP * Math.sin(2 * Math.PI * k / 72)]);
    plat = new T.Mesh(new T.CircleGeometry(RP, 64), new T.MeshBasicMaterial({ color: P.mut, transparent: true, opacity: 0.1 })); plat.position.z = -0.1; grp.add(plat);
    platB = H.cinta(T, [pts], P.mut, w * 1.2); grp.add(platB);
    var pc = []; for (k = 0; k <= 32; k++) pc.push([0.42 * Math.cos(2 * Math.PI * k / 32), 0.42 * Math.sin(2 * Math.PI * k / 32)]);
    cuerpo = H.cinta(T, [pc], P.fg, w * 1.4); grp.add(cuerpo);
    brazos = H.cinta(T, [], P.fg, w * 1.8); grp.add(brazos);
    ma = H.punto(T, 0, 0, 0.2, P.A); mb = H.punto(T, 0, 0, 0.2, P.A); ma.position.z = 0.1; mb.position.z = 0.1; grp.add(ma, mb);
    marca = H.cinta(T, [[[0, 0], [RP * 0.97, 0]]], P.S, w * 1.1, [w * 4, w * 3]); marca.position.z = -0.05; grp.add(marca);
    bL = rect(P.S, 0.7); bK = rect(P.A, 0.7); bK1 = H.cinta(T, [], P.fg, w * 0.9, [w * 5, w * 3]); bK1.position.z = 0.3; c.scene.add(bK1);
    c.etiqueta('vista desde arriba', CX, 3.05, 'c'); lL = c.etiqueta('L (constante)', BX + 0.55, BY - 0.35, 'c'); lK = c.etiqueta('K', BX + 2.5, BY - 0.35, 'c');
    ejes = H.cinta(T, [[[BX - 0.4, BY], [BX + 3.6, BY]]], P.fg, w); c.scene.add(ejes);
  }
  function calc() {
    if (!listo) return;
    var o = om(r), Iw = I(r), Kc = K(r), K1 = K(1.0), x = r * sx;
    brazos.set([[[-x, 0], [x, 0]]]); ma.mover(x, 0); mb.mover(-x, 0); grp.rotation.z = ph * rad;
    var Lm = L(), Kmax = Math.max(K(0.2), K1, Kc) * 1.05, Hl = BH * 0.92, Hk = BH * 0.92;
    bL.poner(BX, BY, BX + 1.1, BY + Hl); bK.poner(BX + 1.95, BY, BX + 3.05, BY + Hk * Kc / Kmax);
    bK1.set([[[BX + 1.7, BY + Hk * K1 / Kmax], [BX + 3.3, BY + Hk * K1 / Kmax]]]);
    lK.mover(BX + 2.5, BY - 0.35);
    lI(f2(Iw) + ' kg·m²  (cuerpo ' + f2(Icu(r)) + ' + mancuernas ' + f2(2 * m * r * r) + ')');
    lw(f2(o / (2 * Math.PI)) + ' rev/s  =  ' + f2(o) + ' rad/s');
    lLz(f2(Lm) + ' kg·m²/s  (siempre el mismo)');
    lKk(f1(Kc) + ' J   (inicial ' + f1(K1) + ' J)');
    lW(f1(Kc - K1) + ' J   (la energía no se conserva: L sí)');
  }
  c.slider('Distancia de las mancuernas al eje r (m)', 0.2, 1.0, 0.01, r, function (v) { r = v; calc(); }, function (v) { return f2(v) + ' m'; });
  c.slider('Masa de cada mancuerna m (kg)', 0, 10, 0.5, m, function (v) { m = v; calc(); }, function (v) { return f1(v) + ' kg'; });
  c.slider('Giro inicial ω₁ con r = 1,0 m (rev/s)', 0.2, 1.0, 0.05, w1, function (v) { w1 = v; calc(); }, function (v) { return f2(v) + ' rev/s'; });
  c.reproductor({ max: 360, valor: 35, paso: 1, vel: function () { return om(r) / rad * 0.35; }, ciclico: true, etiqueta: 'Giro de la mesa', fmt: function (v) { return Math.round(v) + '°'; }, cb: function (v) { ph = v; calc(); } });
  c.leyenda([['var(--A)', 'mancuernas (masa m)', 'punto'], ['var(--U)', 'barra azul: L = I ω (constante)', 'area'], ['var(--A)', 'barra naranja: K (la línea discontinua marca K₁)', 'area']]);
  nuevo(); listo = true;
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!listo) return;
    plat.material.color.set(p.mut); platB.material.color.set(p.mut); cuerpo.material.color.set(p.fg); brazos.material.color.set(p.fg);
    ma.material.color.set(p.A); mb.material.color.set(p.A); marca.material.color.set(p.S); bL.material.color.set(p.S); bK.material.color.set(p.A); bK1.material.color.set(p.fg); ejes.material.color.set(p.fg);
  });
  calc();
});
