/* Cable que se desenrolla (tema 9; ejemplo 9.8 de U y problemas E 9.44-9.45). params: {"dim":2,"marcas":false}.
   Un bloque de masa m cuelga de un cable enrollado en una rueda (disco o aro) de masa M y radio R, con I = c·M·R². Se suelta del reposo y desciende una altura h.
   Cable que no resbala: v = Rω.  Energía: m g s = ½ m v² + ½ I ω² = ½ (m + c M) v².
   v² = 2 m g h / (m + c M) al llegar abajo; a = m g / (m + c M) (constante); t_caída = √(2h/a). Con c = ½ da v = √(2gh/(1 + M/2m)) (U, ej. 9.8).
   Las barras de la derecha muestran la energía potencial perdida m g s y cómo se reparte entre bloque y rueda (la barra apilada siempre alcanza la altura de la primera). */
Interactivos.registrar('polea-masa', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), g = 9.8;
  var M = 46.5, m = 4.2, R = 0.28, h = 3, cc = 0.5, fr = 0.6, anim = false, ult = 0, pausa = 0, sl, listo = false, w = 0.0575;
  var WX = -3.2, WY = 1.0, WR = 1.2, YB = -3.1, BH = 4.2;
  var disco, aro, spokeA, cuerda, caja, cajaB, cabo, marca, marcaP, base, barra1, barra2a, barra2b, marco, eP, eB, e1, e2;
  var lt = c.lectura('Tiempo t (de 0 a la llegada abajo)'), ls = c.lectura('Descenso s'), lv = c.lectura('Rapidez del bloque v = a·t (= Rω)'), lo = c.lectura('Velocidad angular de la rueda ω = v/R'),
      lKb = c.lectura('Energía cinética del bloque ½mv²'), lKw = c.lectura('Energía cinética de la rueda ½Iω²'), lU = c.lectura('Energía potencial perdida m·g·s'), lF = c.lectura('Al llegar abajo (s = h)');
  var f2 = function (x) { var q = Math.round(x * 100) / 100; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  var f1 = function (x) { var q = Math.round(x * 10) / 10; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };

  function nuevo() {
    c.vista(-6, 6, -3.9, 2.9); w = 0.0055 * 6.8;
    var pts = [], i; for (i = 0; i <= 80; i++) pts.push([WX + WR * Math.cos(2 * Math.PI * i / 80), WY + WR * Math.sin(2 * Math.PI * i / 80)]);
    disco = new T.Mesh(new T.CircleGeometry(WR, 64), new T.MeshBasicMaterial({ color: P.acc, transparent: true, opacity: 0.16 })); disco.position.set(WX, WY, -0.1); c.scene.add(disco);
    aro = H.cinta(T, [pts], P.acc, w * 1.5); aro.position.z = 0.05; c.scene.add(aro);
    cabo = H.cinta(T, [[[WX - 0.6, WY + WR + 0.05], [WX + 0.6, WY + WR + 0.05]]], P.mut, w * 0.9); cabo.visible = false; c.scene.add(cabo);
    marca = H.cinta(T, [], P.fg, w * 1.3); marca.position.z = 0.2; c.scene.add(marca); marcaP = H.punto(T, WX, WY, w * 3, P.fg); marcaP.position.z = 0.3; c.scene.add(marcaP);
    var eje = H.punto(T, WX, WY, w * 2.2, P.fg); eje.position.z = 0.35; c.scene.add(eje);
    cuerda = H.cinta(T, [], P.fg, w * 1.1); cuerda.position.z = 0.1; c.scene.add(cuerda);
    caja = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ color: P.A, transparent: true, opacity: 0.5 })); caja.position.z = 0.05; c.scene.add(caja);
    cajaB = H.cinta(T, [], P.A, w * 1.3); cajaB.position.z = 0.1; c.scene.add(cajaB);
    marco = H.cinta(T, [[[WX + WR, WY], [WX + WR, YB + 0.0]]], P.mut, w * 0.7, [w * 5, w * 3]); marco.position.z = -0.05; c.scene.add(marco);
    base = H.cinta(T, [[[1.2, YB], [5.8, YB]]], P.mut, w); c.scene.add(base);
    function rect(col, op) { var q = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ color: col, transparent: true, opacity: op })); q.position.z = 0.2; q.poner = function (x0, y0, x1, y1) { q.position.x = (x0 + x1) / 2; q.position.y = (y0 + y1) / 2; q.scale.set(Math.max(1e-6, x1 - x0), Math.max(1e-6, y1 - y0), 1); }; c.scene.add(q); return q; }
    barra1 = rect(P.fg, 0.55); barra2a = rect(P.A, 0.7); barra2b = rect(P.acc, 0.7);
    eP = c.etiqueta('m·g·s', 2.2, YB - 0.38, 'c'); eB = c.etiqueta('K bloque + K rueda', 4.8, YB - 0.38, 'c');
    e1 = c.etiqueta('bloque', 0, 0, 'l'); e2 = c.etiqueta('rueda', WX, WY + WR + 0.28, 'c');
  }
  function calc() {
    if (!listo) return;
    var a = m * g / (m + cc * M), Tt = Math.sqrt(2 * h / a), t = fr * Tt, s = 0.5 * a * t * t, v = a * t, om = v / R, I = cc * M * R * R;
    var Kb = 0.5 * m * v * v, Kw = 0.5 * I * om * om, U = m * g * s, vf = Math.sqrt(2 * m * g * h / (m + cc * M)), Et = m * g * h;
    var y0 = WY - 1.2, ks = (y0 - YB - 0.9) / h, yt = y0 - s * ks, bw = 0.45 + 0.1 * Math.sqrt(m), bh = 0.4 + 0.1 * Math.sqrt(m), th = s / R, ph = Math.PI / 2 - th;
    cuerda.set([[[WX + WR, WY], [WX + WR, yt]]]);
    caja.position.x = WX + WR; caja.position.y = yt - bh / 2; caja.scale.set(bw, bh, 1);
    cajaB.set([[[WX + WR - bw / 2, yt], [WX + WR + bw / 2, yt], [WX + WR + bw / 2, yt - bh], [WX + WR - bw / 2, yt - bh], [WX + WR - bw / 2, yt]]]);
    var mx = WX + (WR - 0.05) * Math.cos(ph), my = WY + (WR - 0.05) * Math.sin(ph);
    marca.set([[[WX, WY], [mx, my]]]); marcaP.mover(mx, my);
    e1.mover(WX + WR + bw / 2 + 0.12, yt - bh / 2);
    var sc = BH / Et, x1 = 1.7, x2 = 3.9;
    barra1.poner(x1 - 0.55, YB, x1 + 0.55, YB + U * sc);
    barra2a.poner(x2 - 0.55, YB, x2 + 0.55, YB + Kb * sc); barra2b.poner(x2 - 0.55, YB + Kb * sc, x2 + 0.55, YB + (Kb + Kw) * sc);
    eP.mover(x1, YB - 0.38); eB.mover(x2 + 0.7, YB - 0.38);
    lt(f2(t) + ' s  (de ' + f2(Tt) + ' s en total)'); ls(f2(s) + ' m  (de ' + f2(h) + ' m)'); lv(f2(v) + ' m/s'); lo(f2(om) + ' rad/s');
    lKb(f2(Kb) + ' J'); lKw(f2(Kw) + ' J  (' + f1(Et > 0 && U > 0 ? 100 * Kw / U : 100 * cc * M / (m + cc * M)) + ' % de la energía)'); lU(f2(U) + ' J  =  ' + f2(Kb) + ' + ' + f2(Kw) + ' J');
    lF('v = ' + f2(vf) + ' m/s ,  a = ' + f2(a) + ' m/s² ,  I = ' + f2(I) + ' kg·m² ,  la rueda se lleva el ' + f1(100 * cc * M / (m + cc * M)) + ' % de la energía');
  }
  var rs;
  c.slider('Masa de la rueda M (kg)', 1, 100, 0.5, M, function (v) { M = v; calc(); });
  c.slider('Masa del bloque m (kg)', 0.5, 20, 0.1, m, function (v) { m = v; calc(); });
  c.slider('Radio de la rueda R (m)', 0.1, 0.6, 0.01, R, function (v) { R = v; calc(); });
  c.slider('Altura de caída h (m)', 1, 5, 0.5, h, function (v) { h = v; calc(); });
  c.slider('Factor c de I = c·M·R²  (½ disco macizo, 1 aro)', 0.1, 1, 0.05, cc, function (v) { cc = v; calc(); }, f2);
  c.reproductor({ max: 1, valor: fr, paso: 0.002, vel: 1 / 3, pausaFin: 0.9, etiqueta: 'Instante de la caída',
    fmt: function (v) { return 't = ' + f2(v * Math.sqrt(2 * h / (m * g / (m + cc * M)))) + ' s'; }, cb: function (v) { fr = v; calc(); } });
  c.leyenda([['var(--A)', 'bloque (m) y su energía cinética', 'area'], ['var(--acc)', 'rueda (M, R) y su energía cinética de rotación', 'area'], ['var(--fg)', 'energía potencial perdida m·g·s', 'area']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!listo) return;
    disco.material.color.set(p.acc); aro.material.color.set(p.acc); marca.material.color.set(p.fg); marcaP.material.color.set(p.fg); cuerda.material.color.set(p.fg);
    caja.material.color.set(p.A); cajaB.material.color.set(p.A); marco.material.color.set(p.mut); base.material.color.set(p.mut);
    barra1.material.color.set(p.fg); barra2a.material.color.set(p.A); barra2b.material.color.set(p.acc);
  });
  nuevo(); listo = true; calc();
});
