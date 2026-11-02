/* Ondas sonoras estacionarias en un tubo abierto o cerrado (tema 16; U §16.4-16.5, ec. 16.16-16.23, figs. 16.13, 16.17 y 16.18). params: {"dim":2,"marcas":false}.
   Datos que se mueven: tipo de tubo (abierto-abierto / abierto-cerrado), modo (1.º a 4.º de los posibles), longitud L, gas (aire o helio) y temperatura.
   Fórmulas del tema (las mismas que en el texto):
     tubo abierto:  λₙ = 2L/n,  fₙ = n·v/2L = n·f₁,  n = 1, 2, 3, …          (16.17-16.19)
     tubo cerrado:  λₙ = 4L/n,  fₙ = n·v/4L = n·f₁,  n = 1, 3, 5, …          (16.21-16.23)
     rapidez: v = 344 m/s en aire y 999 m/s en helio a 20 °C (tabla 16.1) y v ∝ √T (16.10):  v(T) = v₂₀ · √(T/293,15 K).
   Desplazamiento de las partículas: ξ(x,t) = a·cos(kx)·cos(ωt) con x medido desde la boca (antinodo de desplazamiento); k = nπ/L (abierto) o nπ/2L (cerrado); amplitud de presión ∝ |sen kx|.
   Valores de control (aire, 20 °C, L = 0,50 m): abierto f₁ = 344 Hz, f₂ = 688 Hz; cerrado f₁ = 172 Hz, f₃ = 516 Hz;  con helio a 20 °C: abierto f₁ = 999 Hz (cuestión C1);
                       L = 0,328 m, abierto, aire ⇒ f₁ ≈ 524 Hz (problema 16.26);  cerrado L = 0,392 m, v = 345 m/s ⇒ f₁ ≈ 220 Hz (ejemplo 16.11).
   Dibujo: el tubo mide siempre 12 unidades (la longitud real L solo se escribe); la amplitud de las partículas está muy exagerada. */
Interactivos.registrar('tubo-sonoro', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var tipo = 0, modo = 0, L = 0.5, gas = 0, TC = 20, s = 0.15;               /* s = tiempo en periodos del modo */
  var LW = 12, w = 0.05, NP = 72, AMP = 0.45, listo = false, col = [], v20 = [344, 999];
  var fm = function (a, d) { var q = Math.pow(10, d); return (Math.round(a * q) / q).toFixed(d).replace('-', '−').replace('.', ','); };
  var pared, parti, envU, envD, envP, envQ, ejeU, ejeD, bL, eN = [], eA = [], eL, eEU, eED;
  var lw = c.lectura('Tubo y gas'), lf = c.lectura('Modo normal'), lt = c.lectura('Extremos');

  function reg(m, k) { col.push([m, k]); return m; }
  function nuevo() {
    pared = reg(H.cinta(T, [[[0, 0.8], [LW, 0.8]], [[0, -0.8], [LW, -0.8]]], P.fg, w * 1.6), 'fg'); pared.position.z = 0.3; c.scene.add(pared);
    parti = reg(H.cinta(T, [], P.mut, w * 0.8), 'mut'); parti.position.z = 0.1; c.scene.add(parti);
    ejeU = reg(H.cinta(T, [[[0, 2.3], [LW, 2.3]]], P.bd, w * 0.9, [0.2, 0.15]), 'bd'); ejeU.position.z = 0.05; c.scene.add(ejeU);
    ejeD = reg(H.cinta(T, [[[0, -2.6], [LW, -2.6]]], P.bd, w * 0.9, [0.2, 0.15]), 'bd'); ejeD.position.z = 0.05; c.scene.add(ejeD);
    envU = reg(H.cinta(T, [], P.acc, w * 1.7), 'acc'); envU.position.z = 0.2; c.scene.add(envU);
    envP = reg(H.cinta(T, [], P.A, w * 1.7), 'A'); envP.position.z = 0.2; c.scene.add(envP);
    bL = reg(H.cinta(T, [], P.fg, w), 'fg'); bL.position.z = 0.25; c.scene.add(bL);
    for (var i = 0; i < 12; i++) { eN.push(c.etiqueta('N', 0, 0, 'c')); eA.push(c.etiqueta('A', 0, 0, 'c')); }
    eL = c.etiqueta('', LW / 2, -1.6, 'c'); eEU = c.etiqueta('desplazamiento (N nodo, A antinodo)', 0.05, 3.5, 'l'); eED = c.etiqueta('amplitud de presión', 0.05, -3.75, 'l');
  }
  function calc() {
    if (!listo) return;
    var n = tipo === 0 ? modo + 1 : 2 * modo + 1, v = v20[gas] * Math.sqrt((TC + 273.15) / 293.15);
    var lam = (tipo === 0 ? 2 : 4) * L / n, f = v / lam, f1 = v / ((tipo === 0 ? 2 : 4) * L), k = tipo === 0 ? n * Math.PI / LW : n * Math.PI / (2 * LW);
    var ph = 2 * Math.PI * s, i, pts = [], eu = [], ed = [], ep = [], eq = [], x;
    for (i = 0; i < NP; i++) { x = LW * (i + 0.5) / NP; var xd = x + AMP * Math.cos(k * x) * Math.cos(ph); pts.push([[xd, -0.62], [xd, 0.62]]); }
    parti.set(pts);
    for (i = 0; i <= 200; i++) { x = LW * i / 200; eu.push([x, 2.3 + 0.8 * Math.abs(Math.cos(k * x))]); ed.push([x, 2.3 - 0.8 * Math.abs(Math.cos(k * x))]); ep.push([x, -2.6 + 0.8 * Math.abs(Math.sin(k * x))]); eq.push([x, -2.6 - 0.8 * Math.abs(Math.sin(k * x))]); }
    envU.set([eu, ed]); envP.set([ep, eq]);
    var nodos = [], anti = [], j;
    if (tipo === 0) { for (j = 0; j < n; j++) nodos.push(LW * (2 * j + 1) / (2 * n)); for (j = 0; j <= n; j++) anti.push(LW * j / n); }
    else { for (j = 0; j <= (n - 1) / 2; j++) nodos.push(LW * (2 * j + 1) / n); for (j = 0; j <= (n - 1) / 2; j++) anti.push(LW * 2 * j / n); }
    for (i = 0; i < 12; i++) {
      eN[i].ver(i < nodos.length); if (i < nodos.length) eN[i].mover(nodos[i], 1.25);
      eA[i].ver(i < anti.length); if (i < anti.length) eA[i].mover(anti[i], 1.25);
    }
    var yb = -1.15; bL.set([[[0, yb], [LW, yb]], [[0, yb - 0.1], [0, yb + 0.1]], [[LW, yb - 0.1], [LW, yb + 0.1]]]);
    eL.poner('L = ' + fm(L, 2) + ' m'); eL.mover(LW / 2, yb - 0.32);
    pared.set(tipo === 0 ? [[[0, 0.8], [LW, 0.8]], [[0, -0.8], [LW, -0.8]]] : [[[0, 0.8], [LW, 0.8]], [[0, -0.8], [LW, -0.8]], [[LW, 0.8], [LW, -0.8]], [[LW - 0.07, 0.8], [LW - 0.07, -0.8]], [[LW + 0.07, 0.8], [LW + 0.07, -0.8]]]);
    lw((gas === 0 ? 'Aire' : 'Helio') + ' a ' + fm(TC, 0) + ' °C:  v = ' + fm(v20[gas], 0) + ' m/s · √(T/293,15 K) = ' + fm(v, 1) + ' m/s   ·   L = ' + fm(L, 2) + ' m');
    lf((tipo === 0 ? 'Abierto: λ = 2L/n' : 'Cerrado: λ = 4L/n') + ' con n = ' + n + ' ⇒ λ = ' + fm(lam, 3) + ' m   ·   f = v/λ = n·f₁ = ' + n + ' × ' + fm(f1, 1) + ' Hz = ' + fm(f, 1) + ' Hz   ·   ' + (tipo === 0 ? 'todos los armónicos' : 'solo armónicos impares'));
    lt((tipo === 0 ? 'Los dos extremos están abiertos: antinodo de desplazamiento (nodo de presión) en cada uno.' : 'Boca abierta (izquierda): antinodo de desplazamiento; fondo cerrado (derecha): nodo de desplazamiento (antinodo de presión).') + '  Entre nodos de desplazamiento contiguos hay λ/2 = ' + fm(lam * 50, 1) + ' cm.');
  }
  c.selector('Tipo de tubo', ['abierto en los dos extremos (16.16-16.19)', 'abierto en uno y cerrado en el otro (16.20-16.23)'], 0, function (i) { tipo = i; calc(); });
  c.selector('Modo normal', ['1.er modo (fundamental)', '2.º modo posible', '3.er modo posible', '4.º modo posible'], 0, function (i) { modo = i; calc(); });
  c.slider('Longitud del tubo L (m)', 0.2, 2, 0.05, L, function (a) { L = a; calc(); }, function (a) { return fm(a, 2) + ' m'; });
  c.selector('Gas del tubo', ['aire (344 m/s a 20 °C)', 'helio (999 m/s a 20 °C)'], 0, function (i) { gas = i; calc(); });
  c.slider('Temperatura del gas (°C)', -10, 40, 1, TC, function (a) { TC = a; calc(); }, function (a) { return fm(a, 0) + ' °C'; });
  c.reproductor({ max: 2, valor: s, paso: 0.005, vel: 0.25, ciclico: true, etiqueta: 'Tiempo (en periodos del modo)',
    fmt: function (a) { return 't = ' + fm(a, 2) + ' T'; }, cb: function (a) { s = a; calc(); } });
  c.leyenda([['var(--acc)', 'amplitud de desplazamiento |cos kx|', 'linea'], ['var(--A)', 'amplitud de presión |sen kx|', 'linea'], ['var(--mut)', 'partículas de aire (amplitud muy exagerada): se juntan y separan alrededor de los nodos de desplazamiento', 'linea']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    col.forEach(function (q) { var m = q[0].material; if (m && m.color) m.color.set(p[q[1]]); });
  });
  c.vista(-0.4, LW + 0.5, -4.0, 4.0);
  nuevo(); listo = true; calc();
});
