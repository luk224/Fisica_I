/* Diagrama esfuerzo-deformación de un metal dúctil (tema 11, §11.5; fig. 11.19 de U). params: {"dim":2}.
   Unidades: ε en %, σ en 10⁸ Pa, Y en 10¹⁰ Pa  ⇒  en el tramo recto  ε[%] = σ / Y  (σ = Y·ε).
   Curva (modelo didáctico, NO a escala real de un material concreto):
     0 ≤ ε ≤ ε_p        recta σ = Y ε   (límite proporcional a: σ_p = 0,9 σ_y, ε_p = σ_p / Y; vale la ley de Hooke)
     ε_p ≤ ε ≤ ε_y      sigue siendo elástico, pero la curva se aplana hasta el punto de rendimiento b (σ_y, ε_y = ε_p + 2(σ_y − σ_p)/Y)
     ε_y ≤ ε ≤ ε_u      zona plástica, el esfuerzo sube hasta la resistencia σ_m en ε_u = 0,6 ε_f
     ε_u ≤ ε ≤ ε_f      el esfuerzo baja hasta σ_f = 0,8 σ_m en la fractura d (ε_f)
   Si se descarga desde un punto (ε, σ) pasado el límite elástico, el material vuelve por una recta de pendiente Y y queda ε_perm = ε − σ/Y.
   El eje ε de la vista completa va de 0 a ε_f; la vista ampliada va de 0 a 3 ε_y. */
Interactivos.registrar('esfuerzo-deformacion', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), listo = false, clave = '';
  var Y = 20, sy = 3.0, sm = 5.0, ef = 25, modo = 0, u = 14, w = 1, kx = 1, XM = 1, YM = 1;
  var ejes, curva, elast, plast, pa, pb, pd, pl, desc, ea, eb, ed, eL, ex, ey, eEl, ePl;
  var lS = c.lectura('Esfuerzo σ = F⊥/A en el punto elegido'), lE = c.lectura('Deformación ε = Δl/l₀'), lR = c.lectura('Régimen'),
      lP = c.lectura('Si se descarga: deformación permanente'), lD = c.lectura('Varilla de 2,0 m: alargamiento Δl'), lY = c.lectura('Pendiente del tramo recto = módulo de Young Y');
  var f1 = function (x) { var q = Math.round(x * 10) / 10; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  var f2 = function (x) { var q = Math.round(x * 100) / 100; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  var f3 = function (x) { var q = Math.round(x * 1000) / 1000; return String(q === 0 ? 0 : q).replace('-', '−').replace('.', ','); };
  function par() {
    var smm = Math.max(sm, 1.05 * sy), sp = 0.9 * sy, ep = sp / Y, ey2 = ep + 2 * (sy - sp) / Y, eu = 0.6 * ef;
    return { sm: smm, sp: sp, ep: ep, ey: ey2, eu: Math.max(eu, ey2 * 1.5), sf: 0.8 * smm };
  }
  function sig(e) {
    var q = par(), v, ww;
    if (e <= q.ep) return Y * e;
    if (e <= q.ey) { v = (e - q.ep) / (q.ey - q.ep); return q.sp + (sy - q.sp) * (1 - (1 - v) * (1 - v)); }
    if (e <= q.eu) { v = (e - q.ey) / (q.eu - q.ey); return sy + (q.sm - sy) * (1 - (1 - v) * (1 - v)); }
    ww = Math.min(1, (e - q.eu) / (ef - q.eu)); return q.sm - (q.sm - q.sf) * ww * ww;
  }
  function eFor(v) { return modo === 0 ? ef * Math.pow(v / 100, 3) : Math.min(ef, 3 * par().ey * v / 100); }
  function eLoad() { return eFor(u); }
  var slC = null;
  function nuevo() {
    var q = par(), xm = modo === 0 ? ef * 1.06 : 3 * q.ey, ym = H.techo(q.sm * 1.2), k = xm + '|' + ym + '|' + modo + '|' + P.fg;
    if (k === clave && ejes) return false; clave = k; XM = xm; YM = ym;
    [ejes, curva, elast, plast, pa, pb, pd, pl, desc].forEach(function (o) { if (o) c.scene.remove(o); });
    kx = 1.75 * ym / xm; c.escalaX(kx); w = 0.0055 * ym * 1.2;
    var v = [0, xm * kx, 0, ym]; c.vista(-0.12 * xm * kx, v[1], -0.08 * ym, v[3] * 1.07);
    ejes = H.ejes2D(T, [-2 * xm * kx, 4 * xm * kx, -3 * ym, 4 * ym], w, P.fg, P.bd, kx * H.paso(xm, 7), H.paso(ym, 6)); c.scene.add(ejes);
    elast = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ color: P.S, transparent: true, opacity: 0.13 })); elast.position.z = -0.1; c.scene.add(elast);
    plast = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ color: P.A, transparent: true, opacity: 0.10 })); plast.position.z = -0.1; c.scene.add(plast);
    curva = H.cinta(T, [], P.acc, w * 1.7); curva.position.z = 0.1; c.scene.add(curva);
    desc = H.cinta(T, [], P.W, w * 1.3, [w * 5, w * 3]); desc.position.z = 0.2; c.scene.add(desc);
    pa = H.punto(T, 0, 0, w * 3.2, P.fg); pb = H.punto(T, 0, 0, w * 3.2, P.fg); pd = H.punto(T, 0, 0, w * 3.2, P.fg); pl = H.punto(T, 0, 0, w * 4.2, P.W);
    [pa, pb, pd, pl].forEach(function (o, i) { o.position.z = 0.4 + i * 0.01; c.scene.add(o); });
    return true;
  }
  function calc() {
    if (!listo) return;
    nuevo(); var q = par(), e = eLoad(), x1 = modo === 0 ? ef * 1.06 : 3 * q.ey, n, s, i, pts = [];
    /* muestreo denso cerca del origen para que la zona elástica se vea bien */
    for (i = 0; i <= 600; i++) pts.push(q.ey * 4 * i / 600);
    for (i = 1; i <= 600; i++) pts.push(q.ey * 4 + (ef - q.ey * 4) * i / 600);
    var cur = [], pol = []; pts.forEach(function (x) { if (x <= ef) cur.push([x * kx, sig(x)]); });
    curva.set([cur]);
    elast.position.x = q.ey * kx / 2; elast.position.y = YM / 2; elast.scale.set(Math.max(1e-6, q.ey * kx), YM, 1);
    plast.position.x = (q.ey + ef) * kx / 2; plast.position.y = YM / 2; plast.scale.set((ef - q.ey) * kx, YM, 1);
    pa.mover(q.ep * kx, q.sp); pb.mover(q.ey * kx, sy); pd.mover(ef * kx, q.sf);
    var eps = Math.min(e, ef); s = e >= ef ? q.sf : sig(e); var perm = e > q.ey ? e - s / Y : 0;
    pl.mover(eps * kx, s);
    if (perm > 1e-9) desc.set([[[eps * kx, s], [perm * kx, 0]]]); else desc.set([]);
    ea.mover(q.ep * kx - 0.012 * XM * kx, q.sp - 0.03 * YM); eb.mover(q.ey * kx + 0.014 * XM * kx, sy + 0.07 * YM); ed.mover(ef * kx, q.sf + 0.06 * YM);
    ea.ver(true); eb.ver(true); ed.ver(modo === 0 || ef <= XM);
    eL.mover(eps * kx + 0.014 * XM * kx, s - 0.085 * YM);
    eEl.mover(q.ey * kx / 2, YM * 0.04); ePl.mover(Math.min(XM, ef) * kx * (modo === 0 ? 0.62 : 0.7), YM * 0.07);
    ex.mover(XM * kx, 0.05 * YM); ey.mover(0.012 * XM * kx, YM * 1.04);
    if (slC) slC.parentNode.querySelector('output').textContent = f3(e) + ' %';
    lS(f2(s) + '×10⁸ Pa' + (s > 0 ? '  =  ' + f1(s * 100) + ' MPa' : ''));
    lE(f3(e) + ' %  =  ' + (Math.round(e * 100) / 10000).toString().replace('.', ',') + ' (fracción)');
    lR(e >= ef ? 'FRACTURA (punto d): el material se rompe'
      : e <= q.ep ? 'elástico y lineal: vale la ley de Hooke  σ = Y ε'
      : e <= q.ey ? 'elástico (reversible) pero ya NO proporcional: entre a y b'
      : 'plástico: pasado el límite elástico b, al descargar queda deformación permanente');
    lP(perm > 1e-9 ? f3(perm) + ' %   (se descarga por una recta de pendiente Y, a trazos)' : 'ninguna: al descargar vuelve a ε = 0');
    lD(f2(e * 2.0 / 100 * 1000) + ' mm' + (perm > 1e-9 ? '  (de ellos, ' + f2(perm * 2.0 / 100 * 1000) + ' mm quedan para siempre)' : ''));
    lY(f1(Y) + '×10¹⁰ Pa   (acero ≈ 20; cobre ≈ 11; aluminio ≈ 7)');
  }
  c.selector('Escala de la deformación', ['Toda la curva, hasta la fractura', 'Ampliar la zona elástica (hasta 3 veces la deformación en b)'], 0, function (i) { modo = i; if (listo) { calc(); slC.dispatchEvent(new Event('input')); } });
  c.slider('Módulo de Young Y (×10¹⁰ Pa)', 5, 21, 0.5, Y, function (v) { Y = v; calc(); }, function (v) { return f1(v); });
  c.slider('Límite elástico (esfuerzo en b, ×10⁸ Pa)', 1, 10, 0.5, sy, function (v) { sy = v; calc(); }, function (v) { return f1(v); });
  c.slider('Resistencia máxima (×10⁸ Pa, al menos 1,05 × el límite elástico)', 1.5, 12, 0.5, sm, function (v) { sm = v; calc(); }, function (v) { return f1(Math.max(v, 1.05 * sy)); });
  c.slider('Deformación de fractura (%)', 1, 30, 1, ef, function (v) { ef = v; calc(); }, function (v) { return String(v) + ' %'; });
  slC = c.slider('Carga aplicada (recorre ε en la escala elegida)', 0, 100, 0.5, u, function (v) { u = v; calc(); }, function (v) { return f3(eFor(v)) + ' %'; });
  ea = c.etiqueta('a', 0, 0, 'r'); eb = c.etiqueta('b', 0, 0, 'l'); ed = c.etiqueta('d', 0, 0, 'c'); eL = c.etiqueta('carga', 0, 0, 'l');
  ex = c.etiqueta('ε (%)', 0, 0, 'r'); ey = c.etiqueta('σ (×10⁸ Pa)', 0, 0, 'l'); eEl = c.etiqueta('zona elástica', 0, 0, 'l'); ePl = c.etiqueta('zona plástica', 0, 0, 'c');
  c.leyenda([['var(--acc)', 'curva σ(ε)', 'linea'], ['var(--warn-b)', 'punto de carga y descarga a trazos (pendiente Y)', 'punto'], ['var(--U)', 'zona elástica (hasta b)', 'area'], ['var(--A)', 'zona plástica (b hasta d)', 'area']]);
  c.alCambiarTema(function (p) {
    P = p; c.renderer.setClearColor(p.bg);
    if (!listo) return; clave = ''; calc();
  });
  nuevo(); listo = true; calc();
});
