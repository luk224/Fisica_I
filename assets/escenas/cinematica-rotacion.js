/* Cinemática de la rotación (tema 9): un punto P del borde de un disco que gira con aceleración angular constante. params: {"dim":2,"marcas":false}.
   θ(t) = ω₀ t + ½ α t²,  ω(t) = ω₀ + α t.
   v = r ω (tangente),  a_tan = r α (tangente),  a_rad = r ω² (hacia el eje),  a = √(a_tan² + a_rad²)  (U ecs. 9.13–9.15).
   El disco se dibuja siempre con el mismo tamaño (el radio r solo cambia las cifras). La flecha de velocidad v tiene escala fija para unos r, ω₀ y α dados (la mayor entre t = 0 y 4 s mide 2,4).
   Las flechas de aceleración (a_tan, a_rad, a) comparten una escala que se ajusta en cada instante para que la total mida siempre 2,4: sus proporciones son las reales, no su longitud absoluta. */
Interactivos.registrar('cinematica-rotacion', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var r = 0.3, w0 = 0, al = 0.6, t = 1.87, TM = 4, RV = 2, on = false, ult = 0, anim = false, sl, w = 0.035, kv = 1, ka = 1, listo = false;
  var fill, aro, rayo, ref, arco, pt, fv, ft, fr, fa, eV, eT, eR, eA;
  var lth = c.lectura('Ángulo girado θ'), lw = c.lectura('Velocidad angular ω = ω₀ + αt'), lv = c.lectura('Rapidez v = rω'), lt = c.lectura('Aceleración tangencial a tan = rα'),
      lr = c.lectura('Aceleración radial a rad = rω² (hacia el eje)'), la = c.lectura('Aceleración total a = √(a tan² + a rad²)'), lg = c.lectura('Ángulo de a respecto a la dirección hacia el eje');
  var f2 = function (x) { var q = Math.round(x * 100) / 100; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  var f1 = function (x) { var q = Math.round(x * 10) / 10; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };

  function nuevo() {
    c.vista(-5, 5, -3.2, 3.2); w = 0.0055 * 6.4;
    fill = new T.Mesh(new T.CircleGeometry(RV, 72), new T.MeshBasicMaterial({ color: P.acc, transparent: true, opacity: 0.1 })); fill.position.z = -0.1; c.scene.add(fill);
    var pts = [], i; for (i = 0; i <= 90; i++) pts.push([RV * Math.cos(2 * Math.PI * i / 90), RV * Math.sin(2 * Math.PI * i / 90)]);
    aro = H.cinta(T, [pts], P.acc, w * 1.4); aro.position.z = 0.05; c.scene.add(aro);
    ref = H.cinta(T, [[[0, 0], [RV, 0]]], P.mut, w * 0.9, [w * 5, w * 3]); ref.position.z = 0.06; c.scene.add(ref);
    rayo = H.cinta(T, [], P.fg, w * 1.1); rayo.position.z = 0.1; c.scene.add(rayo);
    arco = H.cinta(T, [], P.mut, w * 0.9); arco.position.z = 0.1; c.scene.add(arco);
    fv = H.flecha2D(T, P.S, w * 1.7); fa = H.flecha2D(T, P.fg, w * 1.2); ft = H.flecha2D(T, P.L, w * 1.7); fr = H.flecha2D(T, P.A, w * 1.7);
    fv.position.z = 0.3; fa.position.z = 0.28; ft.position.z = 0.31; fr.position.z = 0.32; c.scene.add(fv, fa, ft, fr);
    pt = H.punto(T, RV, 0, w * 3.4, P.fg); pt.position.z = 0.6; c.scene.add(pt);
    eV = c.etiqueta('v', 0, 0, 'c'); eT = c.etiqueta('a tan', 0, 0, 'c'); eR = c.etiqueta('a rad', 0, 0, 'c'); eA = c.etiqueta('a', 0, 0, 'c');
    c.etiqueta('eje', 0, -0.35, 'c'); c.etiqueta('θ = 0', RV + 0.55, 0, 'l');
  }
  function escalas() {
    var vm = 0, i, tt, om;
    for (i = 0; i <= 40; i++) { tt = TM * i / 40; om = w0 + al * tt; vm = Math.max(vm, r * Math.abs(om)); }
    kv = vm > 1e-9 ? 2.4 / vm : 0;
  }
  function calc() {
    if (!listo) return;
    var th = w0 * t + 0.5 * al * t * t, om = w0 + al * t, co = Math.cos(th), si = Math.sin(th), px = RV * co, py = RV * si, tx = -si, ty = co;
    var v = r * om, at = r * al, ar = r * om * om, a = Math.sqrt(at * at + ar * ar), i, n, arc = [];
    ka = a > 1e-9 ? 2.4 / a : 0;
    var ox = px + 0.22 * co, oy = py + 0.22 * si;
    rayo.set([[[0, 0], [px, py]]]); pt.mover(px, py);
    n = Math.min(240, Math.ceil(Math.abs(th) / 0.05) + 2); for (i = 0; i <= n; i++) arc.push([0.8 * Math.cos(th * i / n), 0.8 * Math.sin(th * i / n)]); arco.set([arc]);
    fv.poner([ox, oy], [ox + tx * v * kv, oy + ty * v * kv]);
    ft.poner([px, py], [px + tx * at * ka, py + ty * at * ka]);
    fr.poner([px, py], [px - co * ar * ka, py - si * ar * ka]);
    fa.poner([px, py], [px + tx * at * ka - co * ar * ka, py + ty * at * ka - si * ar * ka]);
    eV.mover(ox + tx * v * kv * 1.0 + 0.3 * (v >= 0 ? tx : -tx), oy + ty * v * kv + 0.3 * (v >= 0 ? ty : -ty)); eV.ver(Math.abs(v * kv) > 0.4);
    eT.mover(px + tx * at * ka * 0.5 - 0.35 * co * (ar * ka > 0.2 ? 0 : 1), py + ty * at * ka * 0.5 - 0.35 * si * (ar * ka > 0.2 ? 0 : 1)); eT.ver(Math.abs(at * ka) > 0.4);
    eR.mover(px - co * ar * ka * 0.5 - 0.4 * tx * Math.sign(at || 1), py - si * ar * ka * 0.5 - 0.4 * ty * Math.sign(at || 1)); eR.ver(ar * ka > 0.4);
    eA.mover(px + (tx * at - co * ar) * ka + 0.28 * (tx * at - co * ar >= 0 ? 1 : -1), py + (ty * at - si * ar) * ka + 0.28 * (ty * at - si * ar >= 0 ? 1 : -1)); eA.ver(a * ka > 0.5);
    lth(f2(th) + ' rad = ' + f2(th / (2 * Math.PI)) + ' rev = ' + f1(th * 180 / Math.PI) + '°');
    lw(f2(om) + ' rad/s'); lv(f2(v) + ' m/s'); lt(f2(at) + ' m/s²'); lr(f2(ar) + ' m/s²'); la(f2(a) + ' m/s²');
    lg(a > 1e-9 ? f1(Math.atan2(Math.abs(at), ar) * 180 / Math.PI) + '°  (tan = a tan / a rad = α / ω²)' : 'sin aceleración');
  }
  function cambia() { if (!listo) return; escalas(); calc(); }
  c.slider('Radio r del punto (m)', 0.1, 1, 0.05, r, function (s) { r = s; cambia(); });
  c.slider('Velocidad angular inicial ω₀ (rad/s)', -2, 2, 0.1, w0, function (s) { w0 = s; cambia(); });
  c.slider('Aceleración angular α (rad/s²)', -1, 1, 0.1, al, function (s) { al = s; cambia(); });
  sl = c.slider('Instante t (s)', 0, TM, 0.01, t, function (s) { t = s; calc(); });
  if (!c.reducirMovimiento) c.selector('Animación ', ['Parada', 'En marcha'], 0, function (i) {
    anim = i === 1; ult = 0; if (anim) requestAnimationFrame(bucle);
  });
  function bucle(ts) {
    if (!anim) return; var dt = Math.min(0.06, ult ? (ts - ult) / 1000 : 0.016); ult = ts;
    var nv = parseFloat(sl.value) + dt * 0.6; if (nv > TM) nv = 0;
    sl.value = nv.toFixed(3); sl.dispatchEvent(new Event('input', { bubbles: true })); requestAnimationFrame(bucle);
  }
  c.leyenda([['var(--U)', 'v (tangente; escala fija)', 'linea'], ['var(--X)', 'a tan (tangente)', 'linea'], ['var(--A)', 'a rad (hacia el eje)', 'linea'], ['var(--fg)', 'a total (las tres, a escala común que se reajusta en cada instante)', 'linea'],
             ['var(--mut)', 'ángulo girado θ desde la posición inicial (línea discontinua)', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!listo) return;
    fill.material.color.set(p.acc); aro.material.color.set(p.acc); ref.material.color.set(p.mut); rayo.material.color.set(p.fg); arco.material.color.set(p.mut);
    fv.material.color.set(p.S); ft.material.color.set(p.L); fr.material.color.set(p.A); fa.material.color.set(p.fg); pt.material.color.set(p.fg);
  });
  nuevo(); listo = true; escalas(); calc();
});
