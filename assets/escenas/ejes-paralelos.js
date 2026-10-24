/* Teorema de los ejes paralelos (tema 9): I_P = I_cm + M d² (U ec. 9.19). params: {"dim":2,"marcas":false}.
   Se elige un cuerpo uniforme de la tabla 9.2 y se desplaza el eje (perpendicular al plano del dibujo) una distancia d = f·s del centro de masa (s = L en la varilla, s = R en los demás).
   I_cm = c·M·s² con c = 1/12 (varilla), 1/2 (cilindro macizo), 2/5 (esfera maciza), 1 (aro). Gráfica: I_P/(M s²) = c + f² frente a f; el hueco entre la curva y I_cm es M d².
   El cuerpo se dibuja siempre con el mismo tamaño (varilla de 3,2 unidades de largo, círculo de radio 1,6); los metros solo aparecen en las lecturas. */
Interactivos.registrar('ejes-paralelos', function (c) {
  var T = c.THREE, H = c.H, P = c.colores();
  var cuerpo = 0, M = 4, s = 2, f = 0.5, CO = [1 / 12, 1 / 2, 2 / 5, 1], listo = false, w = 0.0575;
  var NOM = ['varilla delgada', 'cilindro macizo', 'esfera maciza', 'aro (pared delgada)'];
  var CX = -3.9, CY = 0.5, RG = 1.6, GX0 = 2.0, GX1 = 7.4, GY0 = -2.7, GY1 = 3.1, FM = 1.5;
  var fondo = [], cuerpoG = null, relleno, borde, borde2, cm1, cm2, linea, eje1, eje2, eje3, curva, icm, hueco, pgr, ejesG;
  var marcasF = [], eCM, eAx, eD, eI, eIcm, eX, eY, lcm, lMd, lP, lR, lQ;
  lcm = c.lectura('I cm (eje por el centro de masa)'); lMd = c.lectura('M·d²'); lP = c.lectura('I P = I cm + M·d²'); lR = c.lectura('Cociente I P / I cm'); lQ = c.lectura('Observación');
  var f2 = function (x) { var q = Math.round(x * 100) / 100; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  var f3 = function (x) { var q = Math.round(x * 1000) / 1000; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  var gx = function (u) { return GX0 + u / FM * (GX1 - GX0); };

  function limpiar() { fondo.forEach(function (o) { c.scene.remove(o); }); fondo = []; }
  function anade(o, z) { o.position.z = z; c.scene.add(o); fondo.push(o); return o; }
  function circulo(rr) { var pts = [], i; for (i = 0; i <= 80; i++) pts.push([CX + rr * Math.cos(2 * Math.PI * i / 80), CY + rr * Math.sin(2 * Math.PI * i / 80)]); return pts; }
  function dibujaCuerpo() {
    limpiar(); var cc = CO[cuerpo], gmax = cc + FM * FM, i;
    if (cuerpo === 0) {
      relleno = new T.Mesh(new T.PlaneGeometry(2 * RG, 0.32), new T.MeshBasicMaterial({ color: P.acc, transparent: true, opacity: 0.18 })); relleno.position.set(CX, CY, 0); c.scene.add(relleno); fondo.push(relleno);
      borde = anade(H.cinta(T, [[[CX - RG, CY - 0.16], [CX + RG, CY - 0.16], [CX + RG, CY + 0.16], [CX - RG, CY + 0.16], [CX - RG, CY - 0.16]]], P.acc, w * 1.3), 0.05);
    } else {
      relleno = new T.Mesh(new T.CircleGeometry(RG, 64), new T.MeshBasicMaterial({ color: P.acc, transparent: true, opacity: cuerpo === 3 ? 0.06 : 0.18 })); relleno.position.set(CX, CY, 0); c.scene.add(relleno); fondo.push(relleno);
      borde = anade(H.cinta(T, [circulo(RG)], P.acc, w * 1.3), 0.05);
      if (cuerpo === 3) borde2 = anade(H.cinta(T, [circulo(RG * 0.9)], P.acc, w * 1.3), 0.05);
    }
    var cr = 0.13;
    cm1 = anade(H.cinta(T, [[[CX - cr, CY - cr], [CX + cr, CY + cr]]], P.fg, w * 1.2), 0.2); cm2 = anade(H.cinta(T, [[[CX - cr, CY + cr], [CX + cr, CY - cr]]], P.fg, w * 1.2), 0.2);
    linea = anade(H.cinta(T, [], P.W, w * 1.1), 0.12);
    var ax = anade(H.cinta(T, [], P.W, w * 1.3), 0.3); eje1 = ax; eje2 = anade(H.punto(T, CX, CY, 0.2, P.W), 0.4); eje3 = anade(H.punto(T, CX, CY, 0.07, P.bg), 0.45);
    /* gráfica */
    ejesG = anade(H.cinta(T, [[[GX0, GY0], [GX1 + 0.2, GY0]], [[GX0, GY0], [GX0, GY1 + 0.1]]], P.fg, w * 1.1), 0.05);
    var marc = [], k; for (k = 0; k <= 3; k++) { var u = k * 0.5; marc.push([[gx(u), GY0], [gx(u), GY0 - 0.12]]); }
    anade(H.cinta(T, marc, P.fg, w * 0.9), 0.05);
    if (!marcasF.length) [0, 0.5, 1, 1.5].forEach(function (u) { marcasF.push(c.etiqueta(f2(u), gx(u), GY0 - 0.42, 'c')); });
    var pts = []; for (i = 0; i <= 60; i++) { var ff = FM * i / 60; pts.push([gx(ff), GY0 + (cc + ff * ff) / gmax * (GY1 - GY0 - 0.2)]); }
    curva = anade(H.cinta(T, [pts], P.acc, w * 1.5), 0.1);
    var yc = GY0 + cc / gmax * (GY1 - GY0 - 0.2);
    icm = anade(H.cinta(T, [[[GX0, yc], [GX1, yc]]], P.mut, w * 0.9, [w * 5, w * 3]), 0.08);
    hueco = anade(H.cinta(T, [], P.W, w * 1.8), 0.2);
    pgr = anade(H.punto(T, GX0, yc, w * 3.6, P.W), 0.6);
    calc();
  }
  function calc() {
    if (!listo || !curva) return;
    var cc = CO[cuerpo], gmax = cc + FM * FM, ks = (cuerpo === 0 ? 2 * RG : RG) / s, dW = f * s * ks, ax = CX + dW;
    var Icm = cc * M * s * s, Md = M * Math.pow(f * s, 2), IP = Icm + Md;
    linea.set(dW > 0.05 ? [[[CX, CY - 0.55], [ax, CY - 0.55]], [[CX, CY - 0.4], [CX, CY - 0.7]], [[ax, CY - 0.4], [ax, CY - 0.7]]] : []);
    eje1.set([[[ax, CY - RG - 0.35], [ax, CY + RG + 0.35]]]); eje1.visible = false; eje2.mover(ax, CY); eje3.mover(ax, CY);
    var yc = GY0 + cc / gmax * (GY1 - GY0 - 0.2), yp = GY0 + (cc + f * f) / gmax * (GY1 - GY0 - 0.2);
    hueco.set(f > 0.02 ? [[[gx(f), yc], [gx(f), yp]]] : []); pgr.mover(gx(f), yp);
    eCM.mover(CX, CY + 0.42); eAx.mover(ax, CY + 0.45); eD.mover((CX + ax) / 2, CY - 0.95); eD.ver(dW > 0.5);
    eI.mover(GX0 + 0.1, GY1 + 0.25); eIcm.mover(GX1 - 0.1, yc + 0.28); eX.mover(GX1 - 0.3, GY0 - 0.42); eY.mover(gx(f) + 0.15, yp + 0.34);
    lcm(f3(Icm) + ' kg·m²  (' + (cuerpo === 0 ? '1/12·M·L²' : cuerpo === 1 ? '1/2·M·R²' : cuerpo === 2 ? '2/5·M·R²' : 'M·R²') + ')');
    lMd(f3(Md) + ' kg·m²  (d = ' + f2(f * s) + ' m)'); lP(f3(IP) + ' kg·m²'); lR(f2(IP / Icm));
    lQ(f < 0.005 ? 'El eje pasa por el centro de masa: I es el mínimo posible.' : (cuerpo === 0 && Math.abs(f - 0.5) < 1e-6) ? 'Eje en el extremo de la varilla: I = ⅓ML² (tabla 9.2b).' : (cuerpo === 0 && f > 0.5) ? 'El eje está fuera de la varilla (unido a ella de forma rígida).' : 'Cualquier otro eje paralelo da un I mayor que I cm.');
  }
  eCM = c.etiqueta('CM', CX, CY, 'c'); eAx = c.etiqueta('eje', CX, CY, 'c'); eD = c.etiqueta('d', CX, CY, 'c');
  eI = c.etiqueta('I', GX0, GY1, 'l'); eIcm = c.etiqueta('I cm', GX1, 0, 'r'); eX = c.etiqueta('d / (L o R)', GX1 - 0.3, GY0 - 0.42, 'r'); eY = c.etiqueta('I P', GX0, 0, 'l');
  c.selector('Cuerpo uniforme ', ['Varilla delgada (eje ⊥ a ella): ML²/12', 'Cilindro macizo (eje paralelo al de simetría): MR²/2', 'Esfera maciza (eje paralelo a un diámetro): 2MR²/5', 'Aro o cilindro hueco de pared delgada: MR²'], 0, function (i) { cuerpo = i; if (listo) dibujaCuerpo(); });
  c.slider('Masa M (kg)', 1, 20, 0.5, M, function (v) { M = v; calc(); });
  c.slider('Tamaño: L (varilla) o R (resto) (m)', 0.2, 3, 0.1, s, function (v) { s = v; calc(); });
  c.slider('Distancia del eje al CM, d en unidades de L o R', 0, FM, 0.05, f, function (v) { f = v; calc(); }, function (v) { return f2(v); });
  c.leyenda([['var(--acc)', 'I P (curva) frente a d', 'linea'], ['var(--mut)', 'I cm (valor en d = 0)', 'linea'], ['var(--warn-b)', 'M·d² (lo que añade el desplazamiento) y eje de giro', 'linea'], ['var(--fg)', '× centro de masa', 'punto']]);
  c.alCambiarTema(function (p) { P = p; c.renderer.setClearColor(p.bg); if (listo) dibujaCuerpo(); });
  c.vista(-6.4, 8, -3.4, 3.7); w = 0.0055 * 7.1;
  listo = true; dibujaCuerpo();
});
