/* Dilatación térmica y esfuerzo térmico de una barra (tema 17, §17.4; ec. 17.6, 17.7 y 17.12 de U). params: {"dim":2,"marcas":false}.
   Datos de U: α (tabla 17.1, K⁻¹) y módulo de Young Y (tabla 11.1):
     acero 1,2e-5 y 20e10 Pa; aluminio 2,4e-5 y 7,0e10; latón 2,0e-5 y 9,0e10; cobre 1,7e-5 y 11e10.
   Modelo:  ε_T = α (T_f − T_i);  ΔL_libre = ε_T L₀  (17.6).
     Sujeción 0 (hueco h entre la barra y la pared derecha): si ΔL_libre ≤ h no hay esfuerzo; si ΔL_libre > h la barra toca y se comprime
        con  F/A = −Y (ΔL_libre − h)/L₀   (caso h = 0: F/A = −Y α ΔT, ec. 17.12).
     Sujeción 1 (barra soldada a las dos paredes, h = 0): F/A = −Y α ΔT  (compresión si se calienta, tracción si se enfría).
   La dilatación DIBUJADA está multiplicada por 100 (la real es del orden de 1/1000); la barra mide 9 unidades de dibujo. */
Interactivos.registrar('dilatacion-termica', function (c) {
  var T = c.THREE, H = c.H, P = c.colores(), listo = false;
  var MAT = [['Acero', 1.2e-5, 20e10], ['Aluminio', 2.4e-5, 7.0e10], ['Latón', 2.0e-5, 9.0e10], ['Cobre', 1.7e-5, 11e10]];
  var mat = 0, L0 = 12, Ti = -9, Tf = 33, hueco = 0, suj = 0, EXAG = 100, LD = 9, X0 = 1.5, w = 0.05;
  var cuerpo, pared1, pared2, contorno, ref, marco, barraD, f1, f2, clave = '';
  var eL0, eH, eT, eW1, eW2, eDL, eSg;
  var lE = c.lectura('Deformación térmica libre  α ΔT'), lD = c.lectura('Alargamiento libre  ΔL = α L₀ ΔT'), lL = c.lectura('Longitud final si pudiera dilatarse'),
      lS = c.lectura('Esfuerzo  F/A'), lF = c.lectura('Fuerza sobre cada cm² de sección'), lR = c.lectura('Qué ocurre');
  var fm = function (x, d) { var q = x.toFixed(d).replace('.', ','); return q.replace(/^-/, '−'); };
  function rect(col, op, z) {
    var m = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ color: col, transparent: op < 1, opacity: op })); m.position.z = z; c.scene.add(m); return m;
  }
  function poner(m, xa, xb, ya, yb) { m.position.x = (xa + xb) / 2; m.position.y = (ya + yb) / 2; m.scale.set(Math.max(1e-6, xb - xa), yb - ya, 1); }
  function caja(xa, xb, ya, yb) { return [[[xa, ya], [xb, ya], [xb, yb], [xa, yb], [xa, ya]]]; }
  function construir() {
    var k = P.fg + P.bg + P.S + P.W + P.mut; if (k === clave && cuerpo) return; clave = k;
    [cuerpo, pared1, pared2, contorno, ref, f1, f2, barraD].forEach(function (o) { if (o) c.scene.remove(o); });
    c.escalaX(1); c.vista(0.2, 15.8, -3.3, 2.6); w = 0.05;
    pared1 = rect(P.mut, 0.35, -0.2); pared2 = rect(P.mut, 0.35, -0.2);
    cuerpo = rect(P.S, 0.62, 0);
    contorno = H.cinta(T, [], P.fg, w * 1.1); contorno.position.z = 0.1; c.scene.add(contorno);
    ref = H.cinta(T, caja(X0, X0 + LD, -0.55, 0.55), P.fg, w * 0.8, [0.18, 0.14]); ref.position.z = 0.2; c.scene.add(ref);
    barraD = H.cinta(T, [], P.W, w * 1.3); barraD.position.z = 0.3; c.scene.add(barraD);
    f1 = H.flecha2D(T, P.fg, w * 1.8); f2 = H.flecha2D(T, P.fg, w * 1.8); f1.position.z = 0.4; f2.position.z = 0.4; c.scene.add(f1, f2);
  }
  function calc() {
    if (!listo) return; construir();
    var m = MAT[mat], al = m[1], Y = m[2], dT = Tf - Ti, eps = al * dT, dLl = eps * L0, h = suj === 1 ? 0 : hueco / 1000;
    var dLr = 0, sg = 0, estado;
    if (suj === 1) {
      sg = -Y * eps; dLr = 0;
      estado = Math.abs(dT) < 1e-9 ? 'sin cambio de temperatura: nada que contar'
        : dT > 0 ? 'soldada a las dos paredes, quiere alargarse y no puede: queda COMPRIMIDA' : 'soldada a las dos paredes, quiere acortarse y no puede: queda ESTIRADA (tracción)';
    } else if (dLl <= h) {
      dLr = dLl; sg = 0;
      estado = dLl >= 0 ? 'se dilata libremente sin llegar a la pared: ' + (h > 0 ? 'sobra hueco' : 'no hay dilatación') + ', esfuerzo nulo' : 'se contrae libremente, esfuerzo nulo';
    } else {
      dLr = h; sg = -Y * (dLl - h) / L0;
      estado = 'cierra el hueco y sigue empujando: comprimida con ' + fm((dLl - h) * 1000, 2) + ' mm de dilatación impedida';
    }
    var s = LD / L0, dD = dLr * s * EXAG, hD = h * s * EXAG, dLD = dLl * s * EXAG, xr = X0 + LD + dD, xw = X0 + LD + hD, fr = Math.max(0, Math.min(1, (Tf + 10) / 120));
    var col = new T.Color(P.S).lerp(new T.Color(P.W), fr); cuerpo.material.color.copy(col);
    poner(pared1, 0.45, X0, -1.5, 1.5); poner(pared2, xw, xw + 1.3, -1.5, 1.5);
    poner(cuerpo, X0, xr, -0.55, 0.55); contorno.set(caja(X0, xr, -0.55, 0.55));
    /* cota del alargamiento libre (no dibujado más allá de la pared) */
    var xl = X0 + LD + dLD, lim = Math.min(xl, 15.6);
    barraD.set(Math.abs(dLD) > 0.02 ? [[[X0 + LD, -0.95], [Math.min(X0 + LD + dLD, lim), -0.95]], [[X0 + LD, -0.8], [X0 + LD, -1.1]], [[Math.min(X0 + LD + dLD, lim), -0.8], [Math.min(X0 + LD + dLD, lim), -1.1]]] : []);
    var fl = Math.abs(sg) > 1e3 ? Math.max(0.35, Math.min(2.4, 2.4 * Math.abs(sg) / 7e8)) : 0;
    if (fl > 0 && sg < 0) { f1.poner([X0 + 0.15, 0], [X0 + 0.15 + fl, 0]); f2.poner([xr - 0.15, 0], [xr - 0.15 - fl, 0]); }
    else if (fl > 0) { f1.poner([X0 + fl + 0.15, 0], [X0 + 0.15, 0]); f2.poner([xr - fl - 0.15, 0], [xr - 0.15, 0]); }
    else { f1.poner([0, 0], [0, 0]); f2.poner([0, 0], [0, 0]); }
    eL0.mover(X0 + LD / 2, 1.05); eL0.poner('L₀ = ' + fm(L0, 0) + ' m a ' + fm(Ti, 0) + ' °C   (contorno a trazos)');
    eT.mover(X0 + LD / 2, 0); eT.poner(fm(Tf, 0) + ' °C');
    eW1.mover(0.9, 1.85); eW2.mover(xw + 0.65, 1.85);
    eH.ver(suj === 0 && hueco > 0 && hD > 0.05); eH.mover((X0 + LD + xw) / 2 + 0.02, -1.9); eH.poner(suj === 0 ? 'hueco ' + fm(hueco, 1) + ' mm' : '');
    eDL.ver(Math.abs(dLD) > 0.05); eDL.mover(Math.min(X0 + LD + dLD / 2, 14.6), -2.3); eDL.poner('ΔL libre = ' + fm(dLl * 1000, 2) + ' mm (×100)');
    eSg.ver(fl > 0); eSg.mover(X0 + LD / 2, -2.85); eSg.poner(sg < 0 ? 'compresión: las paredes empujan hacia dentro' : 'tracción: las paredes tiran hacia fuera');
    lE(fm(eps * 100, 4) + ' %   (α = ' + fm(al * 1e5, 1) + '×10⁻⁵ K⁻¹, ΔT = ' + fm(dT, 0) + ' C°)');
    lD(fm(dLl * 1000, 2) + ' mm' + (suj === 0 && h > 0 ? '   frente a un hueco de ' + fm(hueco, 1) + ' mm' : ''));
    lL(fm(L0 + dLl, 4) + ' m   (L = L₀(1 + αΔT), ec. 17.7)');
    lS(fm(sg / 1e6, 1) + ' MPa   =  ' + fm(sg / 1e8, 3) + '×10⁸ Pa   (Y = ' + fm(Y / 1e10, 1) + '×10¹⁰ Pa)');
    lF(fm(sg * 1e-4 / 1e3, 2) + ' kN   (' + (sg < 0 ? 'compresión' : sg > 0 ? 'tracción' : 'ninguna') + ')');
    lR(estado);
  }
  c.selector('Material', MAT.map(function (q) { return q[0] + ' (α = ' + fm(q[1] * 1e5, 1) + '×10⁻⁵ K⁻¹)'; }), mat, function (i) { mat = i; calc(); });
  c.selector('Sujeción', ['Con hueco ajustable', 'Soldada a las dos paredes'], suj, function (i) { suj = i; calc(); });
  c.slider('Longitud inicial L₀ (m)', 3, 30, 1, L0, function (v) { L0 = v; calc(); }, function (v) { return fm(v, 0) + ' m'; });
  c.slider('Temperatura inicial (°C)', -20, 40, 1, Ti, function (v) { Ti = v; calc(); }, function (v) { return fm(v, 0) + ' °C'; });
  c.slider('Temperatura final (°C)', -20, 120, 1, Tf, function (v) { Tf = v; calc(); }, function (v) { return fm(v, 0) + ' °C'; });
  c.slider('Hueco (mm) — solo con hueco ajustable', 0, 12, 0.5, hueco, function (v) { hueco = v; calc(); }, function (v) { return fm(v, 1) + ' mm'; });
  eL0 = c.etiqueta('', 0, 0, 'c'); eH = c.etiqueta('', 0, 0, 'c'); eT = c.etiqueta('', 0, 0, 'c'); eW1 = c.etiqueta('pared', 0, 0, 'c'); eW2 = c.etiqueta('pared', 0, 0, 'c');
  eDL = c.etiqueta('', 0, 0, 'c'); eSg = c.etiqueta('', 0, 0, 'c');
  c.leyenda([['var(--U)', 'barra a la temperatura final (azul frío → rojo caliente); contorno a trazos: tamaño inicial', 'area'], ['var(--warn-b)', 'cota del alargamiento libre', 'linea']]);
  c.alCambiarTema(function (p) { P = p; c.renderer.setClearColor(p.bg); if (!listo) return; clave = ''; calc(); });
  listo = true; calc();
});
