/* Órbitas y leyes de Kepler (tema 13; U §13.4-13.5, ejemplos 13.5, 13.6 y 13.9, fig. 13.14). params: {"dim":2,"marcas":false}.
   Una nave sale del punto de lanzamiento (r0 = 6670 km = RT + 300 km, ejemplo 13.6) con velocidad TANGENTE y rapidez v0 = k·vc, vc = √(GM/r0).
   Unidades reducidas: GM = 1, r0 = 1, tiempo en √(r0³/GM) (= 863 s). Con L = r0·v0 = k:
     r(θ) = k²/(1 + (k² − 1)·cos θ),  e = |k² − 1|,  E/m = k²/2 − 1,  dθ/dt = k/r²  (2.ª ley: dA/dt = k/2 = L/2m = cte),
     órbita ligada si k² < 2:  a = 1/(2 − k²),  T = 2π a^{3/2};  los dos ápsides son r = 1 (lanzamiento) y r = k²/(2 − k²);  escape si k ≥ √2.
   El tiempo se obtiene integrando dt = r²/k dθ (trapecios) y se invierte por bisección. Si el perigeo cae dentro de la Tierra (RT/r0 = 0,955) la nave se estrella. */
Interactivos.registrar('orbitas-kepler', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var G = 6.67e-11, MT = 5.97e24, GM = G * MT, R0 = 6.67e6, RT = 6.37e6, RE = RT / R0;
  var VC = Math.sqrt(GM / R0), T0 = Math.sqrt(R0 * R0 * R0 / GM), EN = GM / R0;
  var k = 1.2, verSec = 0, s = 0.35, listo = false, S = 3, w = 0.02, clave = '', sucio = true, kTab = -1;
  var tierra, borde, orbita, nave, vflecha, fflecha, sectA, sectB, barK, barU, barE, zeroE, panel = [], etL, etK, etU, etE, etTierra, etLanz;
  var th = [], tt = [], thEnd = 2 * Math.PI, tmax = 1, d = 0.44, k2 = 1.44, crash = false, bound = true;
  var lV = c.lectura('Rapidez de lanzamiento v₀ y energía por kilogramo E/m'), lO = c.lectura('Órbita: excentricidad e, semieje mayor a, periodo T'),
      lA = c.lectura('Distancias extremas rₚ, rₐ y rapideces vₚ, vₐ'), lN = c.lectura('Nave en el instante elegido'), lS = c.lectura('Áreas barridas en tiempos iguales (2.ª ley)');
  var fm = function (t, n) { var f = Math.pow(10, n === undefined ? 2 : n); return (Math.round(t * f) / f).toString().replace('-', '−').replace('.', ','); };
  var rOf = function (q) { return k2 / (1 + d * Math.cos(q)); };

  function tabla() {
    var N = 2600, i, a = 0;
    k2 = k * k; d = k2 - 1; bound = k2 < 2 - 1e-9; crash = false;
    var RM = 9;
    if (bound) {
      thEnd = 2 * Math.PI;
      if (k < 1 - 1e-9) {
        var rp = k2 / (2 - k2);
        if (rp < RE) { crash = true; thEnd = Math.acos(Math.max(-1, Math.min(1, (k2 / RE - 1) / d))); }
      }
    } else {
      var cc = (k2 / RM - 1) / d; thEnd = Math.acos(Math.max(-1, Math.min(1, cc)));
    }
    th = []; tt = [0]; th.push(0);
    for (i = 1; i <= N; i++) {
      var q0 = thEnd * (i - 1) / N, q1 = thEnd * i / N, r0 = rOf(q0), r1 = rOf(q1);
      a += 0.5 * (r0 * r0 + r1 * r1) / k * (q1 - q0); tt.push(a); th.push(q1);
    }
    tmax = a;
  }
  function angEn(t) {
    var lo = 0, hi = tt.length - 1, m;
    if (t <= 0) return 0; if (t >= tmax) return thEnd;
    while (hi - lo > 1) { m = (lo + hi) >> 1; if (tt[m] <= t) lo = m; else hi = m; }
    var f = (t - tt[lo]) / (tt[hi] - tt[lo]); return th[lo] + f * (th[hi] - th[lo]);
  }
  var pos = function (q) { var r = rOf(q); return [r * Math.cos(q), r * Math.sin(q)]; };

  function nuevo() {
    if (k !== kTab) { tabla(); kTab = k; sucio = true; }
    var ra = bound ? Math.max(1, k2 / (2 - k2), 1) : 6; if (k < 1) ra = 1;
    var S2 = Math.max(1.5, Math.min(9, 1.12 * ra)); if (!bound) S2 = 6.2;
    var kk = k.toFixed(3) + '|' + P.fg + '|' + S2; if (kk === clave && tierra) return false; clave = kk; S = S2;
    [tierra, borde, orbita, nave, vflecha, fflecha, sectA, sectB, zeroE, barK, barU, barE, etLanz].forEach(function (o) { if (o) { if (o.quitar) o.quitar(); else c.scene.remove(o); } });
    panel.forEach(function (o) { c.scene.remove(o); }); panel = [];
    w = 0.0055 * 2 * S; c.vista(-1.6 * S, 1.6 * S, -S, S);
    var pts = [], i; for (i = 0; i <= 64; i++) pts.push([RE * Math.cos(2 * Math.PI * i / 64), RE * Math.sin(2 * Math.PI * i / 64)]);
    tierra = new T.Mesh(new T.CircleGeometry(RE, 48), new T.MeshBasicMaterial({ color: P.acc, transparent: true, opacity: 0.22 })); tierra.position.z = -0.1; c.scene.add(tierra);
    borde = H.cinta(T, [pts], P.acc, w * 1.4); borde.position.z = 0.05; c.scene.add(borde);
    orbita = H.cinta(T, [], P.mut, w * 1.6); orbita.position.z = 0.1; c.scene.add(orbita);
    sectA = nuevoSector(P.L); sectB = nuevoSector(P.A);
    fflecha = H.flecha2D(T, P.L, w * 1.8); fflecha.position.z = 0.4; c.scene.add(fflecha);
    vflecha = H.flecha2D(T, P.A, w * 1.8); vflecha.position.z = 0.45; c.scene.add(vflecha);
    nave = H.punto(T, 1, 0, w * 4.2, P.fg); nave.position.z = 0.6; c.scene.add(nave);
    zeroE = H.cinta(T, [], P.mut, w * 0.9); zeroE.position.z = 0.1; c.scene.add(zeroE);
    barK = H.cinta(T, [], P.L, w * 3.2); barK.position.z = 0.2; c.scene.add(barK);
    barU = H.cinta(T, [], P.acc, w * 3.2); barU.position.z = 0.2; c.scene.add(barU);
    barE = H.cinta(T, [], P.fg, w * 1.6); barE.position.z = 0.3; c.scene.add(barE);
    if (!etTierra) {
      etTierra = c.etiqueta('Tierra', 0, 0, 'c'); etK = c.etiqueta('K', 0, 0, 'c'); etU = c.etiqueta('U', 0, 0, 'c'); etE = c.etiqueta('E', 0, 0, 'l'); etL = c.etiqueta('0', 0, 0, 'r');
    }
    etLanz = c.etiqueta('lanzamiento', 1 + 0.05 * S, 0.1 * S, 'l');
    var xb = -1.35 * S; etK.mover(xb - 0.16 * S, 0.8 * S); etU.mover(xb + 0.16 * S, 0.8 * S); etE.mover(xb + 0.3 * S, 0.25 * S); etL.mover(xb - 0.36 * S, 0);
    etTierra.mover(0, -0.35 * RE);
    return true;
  }
  function nuevoSector(col) {
    var m = new T.Mesh(new T.BufferGeometry(), new T.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.4, side: T.DoubleSide }));
    m.position.z = 0.02; c.scene.add(m); return m;
  }
  function puntosSector(t0, t1) {
    var n = 40, out = [[0, 0]], i; for (i = 0; i <= n; i++) out.push(pos(angEn(t0 + (t1 - t0) * i / n))); return out;
  }
  function areaPol(p) { var A = 0, i; for (i = 0; i < p.length; i++) { var q = p[(i + 1) % p.length]; A += p[i][0] * q[1] - q[0] * p[i][1]; } return Math.abs(A) / 2; }
  function ponSector(m, p) {
    var arr = [], i; for (i = 1; i + 1 < p.length; i++) arr.push(0, 0, 0, p[i][0], p[i][1], 0, p[i + 1][0], p[i + 1][1], 0);
    m.geometry.dispose(); m.geometry = new T.BufferGeometry(); m.geometry.setAttribute('position', new T.Float32BufferAttribute(arr, 3)); m.visible = p.length > 2;
  }

  function calc() {
    if (!listo) return;
    var nueva = nuevo(), E = k2 / 2 - 1, i, dt = tmax / 12;
    if (nueva) sucio = true;
    if (sucio) {
      var curva = [], n = 360; for (i = 0; i <= n; i++) curva.push(pos(angEn(tmax * i / n)));
      orbita.set([curva]);
      if (verSec === 0) { ponSector(sectA, puntosSector(0, dt)); ponSector(sectB, puntosSector(tmax / 2, tmax / 2 + dt)); } else { sectA.visible = false; sectB.visible = false; }
      sucio = false;
    }
    /* sectores (2.ª ley) */
    if (verSec === 0) {
      var pa = puntosSector(0, dt), pb = puntosSector(tmax / 2, tmax / 2 + dt);
      lS('A₁ = ' + fm(areaPol(pa), 3) + '   y   A₂ = ' + fm(areaPol(pb), 3) + '   (unidades r₀²; ½·L·Δt = ' + fm(k * dt / 2, 3) + '): iguales aunque la forma sea muy distinta');
    } else { lS('(sectores ocultos)'); }
    /* nave en el instante elegido */
    var t = s * tmax, q = angEn(t), pp = pos(q), r = rOf(q), v = Math.sqrt(Math.max(0, 2 * (E + 1 / r)));
    nave.mover(pp[0], pp[1]);
    /* velocidad: componente radial vr = e·sinθ·(k.../...) ; v = (vr, vθ) con vθ = k/r y vr = d·sin θ / k */
    var vr = d * Math.sin(q) / k, vt = k / r, ur = [Math.cos(q), Math.sin(q)], ut = [-Math.sin(q), Math.cos(q)];
    var vx = vr * ur[0] + vt * ut[0], vy = vr * ur[1] + vt * ut[1], Lv = 0.45 * S;
    vflecha.poner([pp[0], pp[1]], [pp[0] + Lv * vx, pp[1] + Lv * vy]);
    var Lf = Math.min(0.55 * S, 0.5 * S / (r * r));
    fflecha.poner([pp[0], pp[1]], [pp[0] - Lf * ur[0], pp[1] - Lf * ur[1]]);
    /* barras de energía: escala 0,55·S por unidad (GM/r0 por unidad de masa) */
    var xb = -1.35 * S, sc = 0.55 * S, U = -1 / r, K = E - U, cl = function (h) { return Math.max(-0.9 * S, Math.min(0.9 * S, h)); };
    zeroE.set([[[xb - 0.32 * S, 0], [xb + 0.32 * S, 0]]]);
    barK.set([[[xb - 0.16 * S, 0], [xb - 0.16 * S, cl(sc * K)]]]);
    barU.set([[[xb + 0.16 * S, 0], [xb + 0.16 * S, cl(sc * U)]]]);
    barE.set([[[xb - 0.28 * S, cl(sc * E)], [xb + 0.28 * S, cl(sc * E)]]]);
    etE.mover(xb + 0.3 * S, cl(sc * E) + (E >= 0 ? 0.07 * S : 0.07 * S));
    /* lecturas */
    lV(fm(k * VC / 1000) + ' km/s  (k = ' + fm(k) + ' vc, vc = ' + fm(VC / 1000) + ' km/s)   ·   E/m = ' + fm(E * EN / 1e6) + ' MJ/kg' + (E >= 0 ? '   ≥ 0: la nave escapa' : '   < 0: órbita ligada'));
    var e = Math.abs(d);
    if (bound) {
      var a = 1 / (2 - k2), rp = k < 1 ? k2 / (2 - k2) : 1, ra = k < 1 ? 1 : k2 / (2 - k2);
      lO('e = ' + fm(e) + '   ·   a = ' + fm(a * R0 / 1e6) + '×10⁶ m  (' + fm(a) + ' r₀)   ·   T = ' + fm(2 * Math.PI * Math.pow(a, 1.5) * T0 / 60, 1) + ' min' + (crash ? '   (pero choca con la Tierra)' : ''));
      var vp = k / rp * VC / 1000, va = k / ra * VC / 1000; lA('rₚ = ' + fm(rp * R0 / 1e6) + '×10⁶ m   ·   rₐ = ' + fm(ra * R0 / 1e6) + '×10⁶ m   ·   vₚ = ' + fm(vp) + ' km/s   ·   vₐ = ' + fm(va) + ' km/s   (v·r = cte)');
    } else {
      var rpp = k2 / (1 + d);
      lO('e = ' + fm(e) + (Math.abs(e - 1) < 1e-3 ? '  (parábola)' : '  (hipérbola)') + '   ·   no hay semieje finito ni periodo: la nave no vuelve');
      lA('rₚ = ' + fm(rpp * R0 / 1e6) + '×10⁶ m   ·   vₚ = ' + fm(k * VC / 1000) + ' km/s   ·   rapidez residual en el infinito: ' + fm(Math.sqrt(Math.max(0, 2 * E)) * VC / 1000) + ' km/s');
    }
    var minutos = t * T0 / 60;
    lN(fm(minutos, 1) + ' min   ·   r = ' + fm(r * R0 / 1e6) + '×10⁶ m (' + fm(r) + ' r₀)   ·   v = ' + fm(v * VC / 1000) + ' km/s   ·   K/|U| = ' + fm(K / Math.abs(U)) + (crash && s >= 1 - 1e-9 ? '   ·   ¡se estrella!' : ''));
  }
  c.slider('Rapidez de lanzamiento v₀ / vc  (tangente a la superficie)', 0.7, 1.5, 0.01, k, function (v) { k = v; if (listo) calc(); }, function (v) { return fm(v) + ' vc  (' + fm(v * VC / 1000) + ' km/s)' + (v * v >= 2 - 1e-9 ? '  ≥ v_esc' : ''); });
  c.selector('Sectores de igual tiempo (2.ª ley)', ['Mostrar', 'Ocultar'], 0, function (i) { verSec = i; sucio = true; if (listo) calc(); });
  nuevo(); listo = true;
  c.reproductor({ max: 1, valor: s, paso: 0.001, vel: function () { return 1 / 10; }, pausaFin: 1.2, etiqueta: 'Instante del movimiento',
    fmt: function (v) { return 't = ' + fm(v * tmax * T0 / 60, 1) + ' min'; }, cb: function (v) { s = v; calc(); } });
  c.leyenda([['var(--acc)', 'Tierra (RT = 6370 km)', 'linea'], ['var(--mut)', 'trayectoria', 'linea'], ['var(--fg)', 'nave', 'punto'], ['var(--A)', 'velocidad (proporcional a v)', 'linea'],
    ['var(--X)', 'fuerza gravitatoria hacia el centro (proporcional a 1/r²)', 'linea'], ['var(--X)', 'primer sector barrido en el intervalo de tiempo', 'area'], ['var(--A)', 'segundo sector (mismo intervalo, misma área)', 'area'], ['var(--acc)', 'barras de la izquierda: K (arriba, verde), U (abajo, azul) y E (raya fina)', 'area']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!listo) return; clave = ''; sucio = true; calc();
  });
  calc();
});
