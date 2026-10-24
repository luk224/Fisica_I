/* Carrera de cuerpos que ruedan por una rampa (tema 10; ejemplos 10.5 y 10.7 de U y examen Febrero 2023 P-2). params: {"dim":2,"marcas":false}.
   Cinco «carriles», todos con la misma rampa (ángulo θ, longitud L) y la misma altura de salida: bloque sin fricción (c = 0), esfera sólida (c = 2/5),
   cilindro sólido (c = 1/2), esfera hueca de pared delgada (c = 2/3) y aro o cilindro hueco (c = 1). I_cm = c·M·R².
   Si la fricción alcanza para rodar sin resbalar (μ ≥ μ_min = c/(1+c)·tan θ):  a_cm = g sen θ/(1+c),  f = c/(1+c)·M g sen θ,  φ = s/R.
   Si no alcanza (se usa μ_s = μ_k = μ): resbala con a_cm = g (sen θ − μ cos θ) y α = μ g cos θ/(c R);  φ = ½ α t².
   Se dibuja R = 10 cm (solo afecta al número de vueltas). La cámara es lenta (0,35×): el tiempo mostrado es el real. */
Interactivos.registrar('rodadura-rampa', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), g = 9.8, rad = Math.PI / 180, Rr = 0.10;
  var th = 30, Ls = 3, mu = 0.6, t = 0.6, listo = false;
  var X0 = 5.0, X1 = 15.2, RB = 0.46, w = 0.0055 * 16.5, YL = [4.0, 2.2, 0.4, -1.4, -3.2];
  var cuerpos = [
    { nom: 'bloque liso (c = 0)', c: 0, col: 'mut' },
    { nom: 'esfera sólida (c = 2/5)', c: 0.4, col: 'S' },
    { nom: 'cilindro macizo (c = 1/2)', c: 0.5, col: 'L' },
    { nom: 'esfera hueca (c = 2/3)', c: 2 / 3, col: 'E' },
    { nom: 'aro (c = 1)', c: 1, col: 'A' }
  ];
  var pista = [], meta, rampa, ang, etAng, lect = [], lMu;
  var f2 = function (x) { var q = Math.round(x * 100) / 100; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  var f3 = function (x) { var q = Math.round(x * 1000) / 1000; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };

  /* modelo de un cuerpo: devuelve {a, rueda, alfa, muMin} */
  function modelo(cu) {
    var s = Math.sin(th * rad), co = Math.cos(th * rad);
    if (cu.c === 0) return { a: g * s, rueda: true, alfa: 0, muMin: 0 };
    var muMin = cu.c / (1 + cu.c) * Math.tan(th * rad);
    if (mu >= muMin - 1e-12) return { a: g * s / (1 + cu.c), rueda: true, alfa: g * s / (1 + cu.c) / Rr, muMin: muMin };
    return { a: g * (s - mu * co), rueda: false, alfa: mu * g * co / (cu.c * Rr), muMin: muMin };
  }
  function tFin(cu) { var m = modelo(cu); return Math.sqrt(2 * Ls / m.a); }
  function tMax() { var q = 0; cuerpos.forEach(function (cu) { q = Math.max(q, tFin(cu)); }); return q; }

  function nuevo() {
    c.vista(-0.2, 16.2, -6.6, 5.6);
    cuerpos.forEach(function (cu, i) {
      var y = YL[i], col = P[cu.col];
      var linea = H.cinta(T, [[[X0, y], [X1, y]]], P.mut, w); c.scene.add(linea);
      var gr = new T.Group();
      var pts = [], k; for (k = 0; k <= 48; k++) pts.push([RB * Math.cos(2 * Math.PI * k / 48), RB * Math.sin(2 * Math.PI * k / 48)]);
      var rell = new T.Mesh(new T.CircleGeometry(RB, 40), new T.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.22 }));
      var cont = H.cinta(T, [pts], col, w * 1.5);
      var r1 = H.cinta(T, [[[0, 0], [RB, 0]]], P.fg, w * 1.4), r2 = H.cinta(T, [[[0, 0], [-RB, 0]]], P.fg, w * 1.4);
      var pc = H.punto(T, RB, 0, w * 2.4, P.fg);
      rell.position.z = -0.02; r1.position.z = 0.05; r2.position.z = 0.05; pc.position.z = 0.08; cont.position.z = 0.03;
      gr.add(rell, cont, r1, r2, pc); gr.position.set(X0, y + RB, 0); c.scene.add(gr);
      var et = c.etiqueta(cu.nom, 0.0, y + RB, 'l');
      pista.push({ linea: linea, gr: gr, rell: rell, cont: cont, r1: r1, r2: r2, pc: pc, et: et });
    });
    meta = H.cinta(T, [[[X1, -4.2], [X1, 5.0]]], P.fg, w, [w * 6, w * 4]); c.scene.add(meta);
    c.etiqueta('meta', X1, 5.35, 'c');
    rampa = H.cinta(T, [], P.fg, w * 1.3); c.scene.add(rampa);
    ang = H.cinta(T, [], P.mut, w * 0.9); c.scene.add(ang);
    etAng = c.etiqueta('θ', 0, 0, 'l');
  }
  function dibujaRampa() {
    var bx = 3.6, hh = Math.min(Math.tan(th * rad) * bx, 2.6), bx2 = hh / Math.tan(th * rad), x0 = 0.4, y0 = -6.1;
    rampa.set([[[x0, y0], [x0 + bx2, y0], [x0 + bx2, y0 + hh], [x0, y0]]]);
    var arc = [], k; for (k = 0; k <= 12; k++) { var q2 = (th * rad) * k / 12; arc.push([x0 + 0.9 * Math.cos(q2), y0 + 0.9 * Math.sin(q2)]); }
    ang.set([arc]); etAng.mover(x0 + 1.05, y0 + 0.28); etAng.poner('θ = ' + th + '°');
  }
  function calc() {
    if (!listo) return;
    var tm = tMax(), tt = t * tm;
    cuerpos.forEach(function (cu, i) {
      var m = modelo(cu), p = pista[i], s = Math.min(Ls, 0.5 * m.a * tt * tt), ph = cu.c === 0 ? 0 : 0.5 * m.alfa * tt * tt;
      if (m.rueda && cu.c > 0) ph = s / Rr;
      if (s >= Ls && cu.c > 0) { if (m.rueda) ph = Ls / Rr; else ph = 0.5 * m.alfa * (Math.sqrt(2 * Ls / m.a)) * (Math.sqrt(2 * Ls / m.a)); }
      p.gr.position.x = X0 + (X1 - X0 - RB) * (s / Ls) + 0;
      p.gr.rotation.z = -ph;
      var col = m.rueda ? P.fg : P.W; p.r1.material.color.set(col); p.r2.material.color.set(col); p.pc.material.color.set(col);
      var tf = Math.sqrt(2 * Ls / m.a), vf = m.a * tf;
      lect[i](f3(m.a / g / Math.sin(th * rad)) + '·g·sen θ = ' + f2(m.a) + ' m/s²  ·  llega en ' + f2(tf) + ' s con ' + f2(vf) + ' m/s  ·  ' +
        (cu.c === 0 ? 'sin fricción' : m.rueda ? 'rueda (μ mín = ' + f2(m.muMin) + ')' : 'RESBALA (necesita μ ≥ ' + f2(m.muMin) + ')'));
    });
    dibujaRampa();
  }
  c.slider('Ángulo de la rampa θ (°)', 5, 60, 1, th, function (v) { th = v; calc(); }, function (v) { return v + '°'; });
  c.slider('Longitud de la rampa L (m)', 1, 5, 0.1, Ls, function (v) { Ls = v; calc(); }, function (v) { return f2(v) + ' m'; });
  c.slider('Fricción de la rampa μ (μs = μk)', 0, 1, 0.01, mu, function (v) { mu = v; calc(); }, f2);
  cuerpos.forEach(function (cu) { lect.push(c.lectura(cu.nom)); });
  nuevo(); listo = true;
  c.reproductor({ max: 1, valor: 0.6, paso: 0.002, vel: function () { return 0.35 / tMax(); }, pausaFin: 1.0, etiqueta: 'Instante de la carrera',
    fmt: function (v) { return 't = ' + f2(v * tMax()) + ' s'; }, cb: function (v) { t = v; calc(); } });
  c.leyenda([['var(--fg)', 'marca de giro (roja si el cuerpo resbala)', 'linea'], ['var(--mut)', 'cada carril = distancia recorrida a lo largo de la rampa; gana el de menor c', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!listo) return;
    cuerpos.forEach(function (cu, i) {
      var q = pista[i], col = p[cu.col];
      q.linea.material.color.set(p.mut); q.rell.material.color.set(col); q.cont.material.color.set(col);
    });
    meta.material.color.set(p.fg); rampa.material.color.set(p.fg); ang.material.color.set(p.mut);
    calc();
  });
  calc();
});
