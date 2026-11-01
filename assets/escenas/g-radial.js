/* g(r) dentro y fuera de un planeta esférico (tema 13; U §13.6, ejemplos 13.4 y 13.10, ec. 13.2, 13.25-13.26; Prob. 13.71). params: {"dim":2}.
   Eje horizontal: distancia al CENTRO r en radios terrestres (escalaX: unidades distintas en cada eje); eje vertical: g en m/s².
   Con RT = 6,37·10⁶ m y G = 6,67·10⁻¹¹ N·m²/kg²:
     esfera uniforme (masa 5,97·10²⁴ kg):  g = g₀·r/RT (r < RT),  g = g₀·(RT/r)² (r ≥ RT),  g₀ = G·mT/RT² = 9,81 m/s²
     cascarón delgado (misma masa):         g = 0 (r < RT)  y  g = g₀·(RT/r)² fuera
     densidad lineal ρ = ρ₀ − b·r (ρ₀ = 15 000, ρs = 2000 kg/m³ en la superficie; problema 13.71):  M(r) = 4π(ρ₀r³/3 − b r⁴/4),
        g = G·M(r)/r² dentro (máximo 10,27 m/s² en r = 0,769·RT) y g = G·M/r² fuera con M = π·RT³(ρ₀/3 + ρs) = 5,68·10²⁴ kg. */
Interactivos.registrar('g-radial', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var G = 6.67e-11, MT = 5.97e24, RT = 6.37e6, g0 = G * MT / (RT * RT), r0d = 15000, rsd = 2000, bb = (r0d - rsd) / RT;
  var Mlin = Math.PI * RT * RT * RT * (r0d / 3 + rsd);
  var modelos = [
    { n: 'Esfera uniforme (la Tierra con densidad constante)', M: MT, m: function (u) { return u >= 1 ? MT : MT * u * u * u; } },
    { n: 'Cascarón delgado con la misma masa', M: MT, m: function (u) { return u >= 1 ? MT : 0; } },
    { n: 'Planeta con densidad que baja linealmente (problema 13.71)', M: Mlin, m: function (u) {
      if (u >= 1) return Mlin; var r = u * RT; return 4 * Math.PI * (r0d * r * r * r / 3 - bb * r * r * r * r / 4); } }
  ];
  var im = 0, u = 0.5, YL = -1.2, YH = 12, XH = 4.2, kx = 1, w, clave = '', listo = false;
  var ejes, curva, curva2, vert, caida, pt, etR, etG;
  var lG = c.lectura('Aceleración de la gravedad g(r)'), lM = c.lectura('Masa que cuenta M(r)'), lP = c.lectura('Peso de una persona de 70 kg a esa distancia'), lR = c.lectura('Posición');
  var fm = function (t, n) { var f = Math.pow(10, n === undefined ? 2 : n); return (Math.round(t * f) / f).toString().replace('-', '−').replace('.', ','); };
  /* g en m/s² para el modelo i a la distancia u·RT */
  function gDe(i, x) {
    if (x <= 1e-9) return 0;
    var M = modelos[i].m(x), r = x * RT; return G * M / (r * r);
  }
  function nuevo() {
    var k = P.fg + '|' + im; if (k === clave && ejes) return; clave = k;
    [ejes, curva, curva2, vert, caida, pt].forEach(function (o) { if (o) c.scene.remove(o); });
    kx = 1.55 * (YH - YL) / XH; c.escalaX(kx); w = 0.0055 * (YH - YL);
    c.vista(-0.15 * kx, XH * kx, YL, YH);
    var vw = [-0.15 * kx - 1.5 * XH * kx, XH * kx * 2.5, YL - 1.5 * (YH - YL), YH + 1.5 * (YH - YL)];
    ejes = H.ejes2D(T, vw, w, P.fg, P.bd, kx, 2); c.scene.add(ejes);
    curva2 = H.cinta(T, [], P.mut, w * 1.0, [w * 5, w * 3]); curva2.position.z = 0.08; c.scene.add(curva2);
    curva = H.cinta(T, [], P.acc, w * 1.8); curva.position.z = 0.1; c.scene.add(curva);
    vert = H.cinta(T, [[[1 * kx, YL], [1 * kx, YH]]], P.mut, w * 0.9, [w * 5, w * 3]); vert.position.z = 0.05; c.scene.add(vert);
    caida = H.cinta(T, [], P.mut, w * 0.9, [w * 3, w * 3]); caida.position.z = 0.2; c.scene.add(caida);
    pt = H.punto(T, 0, 0, w * 3.8, P.A); pt.position.z = 0.7; c.scene.add(pt);
    if (!etR) { etR = c.etiqueta('superficie, r = Rₜ', 1 * kx, YH * 0.97, 'l'); etG = c.etiqueta('g (m/s²)', 0, YH * 0.98, 'l'); }
    etR.mover(1 * kx + 0.05 * kx, YH * 0.93); etG.mover(0.03 * kx, YH * 0.97);
    var pol = function (i, a, b) { return H.grafica(function (X) { return gDe(i, X / kx); }, a * kx, b * kx, 700, 1e9); };
    curva.set(im === 1 ? pol(1, 0.002, 0.9995).concat(pol(1, 1, XH)) : pol(im, 0.002, XH));
    curva2.set(im === 0 ? [] : pol(0, 0.002, XH));
  }
  function calc() {
    if (!listo) return; nuevo();
    var g = gDe(im, u), M = modelos[im].m(u), r = u * RT;
    pt.mover(u * kx, g); caida.set([[[u * kx, 0], [u * kx, g]]]);
    lG(fm(g) + ' m/s²' + (im === 0 && u > 0.01 ? '   (' + fm(g / g0 * 100, 1) + ' % de g₀ = ' + fm(g0) + ' m/s²)' : ''));
    lM(fm(M / MT * 100, 1) + ' % de la masa de la Tierra' + (u < 1 ? '   (solo cuenta lo que hay a menos de r del centro)' : '   (toda la masa, como si estuviera en el centro)'));
    lP(fm(70 * g, 1) + ' N');
    lR('r = ' + fm(u) + ' RT = ' + fm(r / 1e6) + '×10⁶ m' + (u < 1 ? '   ·   profundidad bajo la superficie: ' + fm((1 - u) * RT / 1e3, 0) + ' km' : '   ·   altura sobre la superficie: ' + fm((u - 1) * RT / 1e3, 0) + ' km'));
  }
  c.selector('Modelo de planeta', modelos.map(function (q) { return q.n; }), im, function (i) { im = i; if (listo) calc(); });
  c.slider('Distancia al centro r (en radios terrestres)', 0, XH, 0.01, u, function (v) { u = Math.max(0.002, v); if (listo) calc(); }, function (v) { return fm(v) + ' RT'; });
  c.leyenda([['var(--acc)', 'g(r) del modelo elegido', 'linea'], ['var(--mut)', 'a trazos: esfera uniforme de la Tierra (comparación)', 'linea'], ['var(--A)', 'punto elegido', 'punto']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!listo) return; clave = ''; calc();
  });
  nuevo(); listo = true; calc();
});
