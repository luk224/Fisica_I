/* Simulación Tema 3 — panel «Fórmulas en uso» (spec §5).
 * Parte pura: construir(pestana, contexto) -> lista de fórmulas (testeable en Node).
 * Parte DOM:  Panel(contenedor, opciones).actualizar(lista, { animando, arrastrando }).
 * Sin dependencias: usa window.katex si existe; si no, texto plano.
 *
 * contexto (lo arma la UI, spec §6.2; todo lo no indicado es opcional):
 *   params, estado, precalc, fase, evento, opciones,
 *   ultimoCambio: { control, instante }  y  ahora (mismo reloj que instante, en s).
 *   Un cambio es «reciente» si ahora - instante <= 1.5 s (sin `ahora` no hay resaltado por cambio).
 *
 *  P1: params {dt, trayectoria}, estado {t, r, v, a}, precalc {tray?, vmed:{dr,vmed,haciaAtras}},
 *      opciones {vmed, aParPerp}, evento 'dtCero' (animación Δt→0).
 *  P2: params {v0, alfa0Deg, y0, g}, estado de proyectil.estado(t), precalc de proyectil(),
 *      fase, opciones {curvaTeorica, pausa}.
 *  P3: params {modo, R, T, v0, aTan}, estado de circular().estado(t), precalc {tStop?},
 *      evento 'detenido', opciones {aTotal}.
 *  P4: params {escenario:'barca'|'avion', vBR,vRE,betaDeg,d | vPA,vAE,vientoHaciaDeg,rumboDeg[,derrotaDeg]},
 *      precalc = barca(...)|avion(...) con precalc.rumboRecto (barca), evento 'llegada',
 *      opciones {reproduciendo, preguntaRumbo, verDesdeBarca}.
 */
(function (raiz) {
  'use strict';

  const VENTANA_CAMBIO = 1.5; // s

  /* ------------------------------ referencias (spec §1) ------------------------------ */
  const REF = {
    U1: { l: 'U', ref: 'U §3.1 ec. (3.1), p. 67' },
    U2: { l: 'U', ref: 'U §3.1 ec. (3.2), p. 68' },
    U3: { l: 'U', ref: 'U §3.1 ec. (3.3)-(3.6), p. 68' },
    U34: { l: 'U', ref: 'U §3.1 ec. (3.3)-(3.7), p. 68-69' },
    U5: { l: 'U', ref: 'U §3.2 ec. (3.8)-(3.10), p. 71' },
    U6: { l: 'U', ref: 'U §3.2 p. 73-74, Ejemplo 3.3 p. 74' },
    U7: { l: 'U', ref: 'U Ejemplos 3.1-3.3, p. 69-74' },
    U8: { l: 'U', ref: 'U §3.3 ec. (3.13)-(3.17), p. 75' },
    U89: { l: 'U', ref: 'U §3.3 ec. (3.13)-(3.18), p. 75-76' },
    U9: { l: 'U', ref: 'U §3.3 ec. (3.18), p. 76' },
    U10: { l: 'U', ref: 'U §3.3 ec. (3.19)-(3.22), p. 76' },
    U11: { l: 'U', ref: 'U §3.3 ec. (3.23)-(3.26), p. 77' },
    U14: { l: 'U', ref: 'U Ejemplo 3.7, p. 79-80' },
    U15: { l: 'U', ref: 'U Ejemplo 3.8 y CUIDADO, p. 80' },
    U16: { l: 'U', ref: 'U Ejemplo 3.9, p. 81' },
    U17: { l: 'U', ref: 'U §3.4 ec. (3.27), p. 83' },
    U18: { l: 'U', ref: 'U §3.4 ec. (3.28)-(3.29), p. 84' },
    U1718: { l: 'U', ref: 'U §3.4 ec. (3.27)-(3.29), p. 83-84' },
    U20: { l: 'U', ref: 'U §3.4 ec. (3.30) y CUIDADO, p. 85' },
    U22: { l: 'U', ref: 'U §3.5 ec. (3.35)-(3.36), p. 88-89' },
    U23: { l: 'U', ref: 'U Ejemplo 3.14, p. 89' },
    U24: { l: 'U', ref: 'U Ejemplo 3.15, p. 90' },
    U25: { l: 'U', ref: 'U §9.1 ec. (9.1), p. 274 (adelanto del tema 9)' },
    U26: { l: 'U', ref: 'U §9.3 ec. (9.13) y (9.15), p. 281 (adelanto del tema 9)' },
    U2627: { l: 'U', ref: 'U §9.3 ec. (9.13), p. 281 y §14.1 ec. (14.1)-(14.2), p. 435 (adelanto del tema 9)' },
    P: function (de) { return { l: 'P', ref: 'Desarrollo propio a partir de ' + de }; }
  };

  /* ------------------------------ formato numérico (spec §5.2) ------------------------------ */
  function fmtR(x) {
    if (x === null || x === undefined || Number.isNaN(x)) return '?';
    if (!Number.isFinite(x)) return x > 0 ? '\\infty' : '-\\infty';
    if (Math.abs(x) < 1e-9) return '0';
    if (Math.abs(x) >= 1000) return String(Math.round(x));
    let s = x.toPrecision(3);
    if (s.indexOf('e') >= 0) s = x.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
    if (/^-0(\.0+)?$/.test(s)) s = '0';
    return s;
  }
  /** Dato de entrada «tal como se fijó»; dec fuerza decimales (sliders con paso 0.1). */
  function fmtDato(x, dec) {
    if (dec === undefined) return String(Number(x));
    const s = Number(x).toFixed(dec);
    return /^-0(\.0+)?$/.test(s) ? s.slice(1) : s;
  }
  const fmtT = (t) => fmtDato(t, 2);
  const fmtG = (g) => fmtDato(g, 2);
  /** Paréntesis siempre (spec: ({vx})^2). */
  const par = (s) => '(' + s + ')';
  /** Segundo término tras un operador: el negativo va entre paréntesis. */
  const trasOp = (s) => (String(s).charAt(0) === '-' ? '(' + s + ')' : s);
  /** Término con signo explícito: «+ x» / «- x». */
  const conSigno = (s) => (String(s).charAt(0) === '-' ? '- ' + String(s).slice(1) : '+ ' + s);
  /** Argumento angular: «35^\circ» o «(-20^\circ)». */
  const angTex = (a) => (Number(a) < 0 ? '(-' + fmtDato(-a) + '^\\circ)' : ' ' + fmtDato(a) + '^\\circ');
  const U = (v, u) => v + '\\ \\text{' + u + '}';

  /** Respaldo en texto plano de un fragmento TeX sencillo. */
  function texAPlano(tex) {
    if (!tex) return '';
    let s = String(tex);
    for (let i = 0; i < 4; i++) {
      s = s.replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)');
      s = s.replace(/\\sqrt\{([^{}]*)\}/g, '√($1)');
    }
    s = s.replace(/\\text\{([^{}]*)\}/g, '$1')
      .replace(/\\vec\s*\{?([A-Za-z]+)\}?/g, '$1')
      .replace(/\\hat\\imath/g, 'i').replace(/\\hat\\jmath/g, 'j').replace(/\\hat k/g, 'k')
      .replace(/\\lvert|\\rvert/g, '|')
      .replace(/\^\s*\\circ/g, '°').replace(/\\cdot/g, '·').replace(/\\circ/g, '°').replace(/\\pi/g, 'π')
      .replace(/\\alpha/g, 'α').replace(/\\beta/g, 'β').replace(/\\theta/g, 'θ').replace(/\\omega/g, 'ω')
      .replace(/\\varphi/g, 'φ').replace(/\\phi/g, 'φ').replace(/\\Delta/g, 'Δ').replace(/\\perp/g, '⊥')
      .replace(/\\parallel/g, '∥').replace(/\\Rightarrow/g, '⇒').replace(/\\infty/g, '∞')
      .replace(/\\(?:quad|qquad)/g, '  ').replace(/\\[ ,;!]/g, ' ')
      .replace(/\\(sin|cos|tan|arcsin|arctan)/g, '$1')
      .replace(/\\tfrac12/g, '1/2').replace(/\\max/g, 'max')
      .replace(/[{}]/g, '').replace(/\^2/g, '²').replace(/\\/g, '')
      .replace(/\s+/g, ' ').trim();
    return s;
  }

  /** Parte una nota con $…$ en segmentos {math, s}. */
  function partirNota(nota) {
    const out = [];
    const partes = String(nota).split('$');
    for (let i = 0; i < partes.length; i++) {
      if (partes[i] !== '') out.push({ math: i % 2 === 1, s: partes[i] });
    }
    return out;
  }
  const notaPlana = (nota) => partirNota(nota).map((p) => (p.math ? texAPlano(p.s) : p.s)).join('');

  /* ------------------------------ utilidades ------------------------------ */
  function reciente(ctx, controles, ventana) {
    const u = ctx && ctx.ultimoCambio;
    if (!u || ctx.ahora === undefined || ctx.ahora === null) return false;
    if (controles && controles.indexOf(u.control) < 0) return false;
    const dt = ctx.ahora - u.instante;
    return dt >= 0 && dt <= (ventana === undefined ? VENTANA_CAMBIO : ventana);
  }

  function F(id, titulo, texGeneral, texSust, estado, nota, src) {
    return {
      id, titulo, texGeneral, texSust: texSust || null,
      txt: texAPlano(texGeneral) + (texSust ? '   →   ' + texAPlano(texSust) : ''),
      estado: estado || 'activa', nota: nota || null, src
    };
  }

  /* ============================== PESTAÑA 1 ============================== */
  const TRAY_FALLBACK = {
    parabola: {
      tex: 'x=(10\\cos 60^\\circ)\\,t,\\quad y=(10\\sin 60^\\circ)\\,t-\\tfrac12(9.80)\\,t^2',
      src: REF.U10
    },
    circulo: {
      tex: 'x=R\\cos\\dfrac{2\\pi t}{T},\\quad y=R\\sin\\dfrac{2\\pi t}{T},\\quad R=2.0\\ \\text{m},\\ T=4.0\\ \\text{s}',
      src: REF.U1718
    },
    lissajous: {
      tex: 'x=A\\sin\\omega t,\\quad y=B\\sin 2\\omega t,\\quad A=3.0\\ \\text{m},\\ B=2.0\\ \\text{m},\\ \\omega=1.0\\ \\text{rad/s}',
      src: REF.P('U §3.1 ec. (3.1), p. 67')
    },
    espiral: {
      tex: 'r=r_0+bt,\\ \\theta=\\omega t:\\ x=r\\cos\\theta,\\ y=r\\sin\\theta,\\quad r_0=0.5\\ \\text{m},\\ b=0.5\\ \\text{m/s},\\ \\omega=1.0\\ \\text{rad/s}',
      src: REF.P('U §3.1 ec. (3.1), p. 67')
    },
    robot: {
      tex: 'x=2.0-0.25\\,t^2,\\quad y=1.0\\,t+0.025\\,t^3\\quad(\\text{SI})',
      src: REF.U7
    }
  };

  function construirP1(ctx) {
    const p = ctx.params || {}, e = ctx.estado || {}, op = ctx.opciones || {};
    const pre = ctx.precalc || {};
    const r = e.r || { x: 0, y: 0 }, v = e.v || { x: 0, y: 0 }, a = e.a || { x: 0, y: 0 };
    const idTray = p.trayectoria || p.tray || (pre.tray && pre.tray.id) || 'parabola';
    const fb = TRAY_FALLBACK[idTray] || TRAY_FALLBACK.parabola;
    const tex0 = (pre.tray && typeof pre.tray.ecuacionTex === 'string') ? pre.tray.ecuacionTex : fb.tex;
    const src0 = (pre.tray && pre.tray.src && pre.tray.src.l && pre.tray.src.ref) ? pre.tray.src : fb.src;

    const vm = Math.hypot(v.x, v.y);
    const ang = Math.atan2(v.y, v.x) * 180 / Math.PI;
    const am = Math.hypot(a.x, a.y);
    const lista = [];

    lista.push(F('F1.0', 'Ecuación de la trayectoria', tex0, null, 'activa', null, src0));
    lista.push(F('F1.1', 'Vector de posición', '\\vec r = x\\hat\\imath + y\\hat\\jmath',
      '\\vec r = ' + par(fmtR(r.x)) + '\\hat\\imath + ' + par(fmtR(r.y)) + '\\hat\\jmath\\ \\text{m}', 'activa', null, REF.U1));

    if (op.vmed) {
      const vmd = pre.vmed || {};
      const dr = vmd.dr || { x: 0, y: 0 }, vmv = vmd.vmed || { x: 0, y: 0 };
      const dt = p.dt;
      const resalta = ctx.evento === 'dtCero' || reciente(ctx, ['dt']);
      lista.push(F('F1.2', 'Velocidad media',
        '\\vec v_{\\text{med}} = \\dfrac{\\Delta\\vec r}{\\Delta t} = \\dfrac{\\vec r_2-\\vec r_1}{t_2-t_1}',
        '\\vec v_{\\text{med}} = \\dfrac{' + par(fmtR(dr.x)) + '\\hat\\imath + ' + par(fmtR(dr.y)) + '\\hat\\jmath}{' + fmtR(dt) +
        '} = ' + par(fmtR(vmv.x)) + '\\hat\\imath + ' + par(fmtR(vmv.y)) + '\\hat\\jmath\\ \\text{m/s}',
        resalta ? 'resaltada' : 'activa', vmd.haciaAtras ? 'Δt hacia atrás: se usa el intervalo [t − Δt, t].' : null, REF.U2));
    }

    {
      const cerca = !!op.vmed && p.dt !== undefined && p.dt <= 0.01;
      let nota = null;
      if (cerca) {
        const vmv = (pre.vmed && pre.vmed.vmed) || { x: 0, y: 0 };
        const d = Math.hypot(vmv.x - v.x, vmv.y - v.y);
        nota = 'Δt → 0: la cuerda se vuelve tangente; $\\lvert\\vec v_{\\text{med}}-\\vec v\\rvert$ = ' + fmtR(d) + ' m/s';
      }
      lista.push(F('F1.3', 'Velocidad instantánea',
        '\\vec v=\\dfrac{d\\vec r}{dt},\\quad v_x=\\dfrac{dx}{dt},\\ v_y=\\dfrac{dy}{dt}',
        '\\vec v = ' + par(fmtR(v.x)) + '\\hat\\imath + ' + par(fmtR(v.y)) + '\\hat\\jmath\\ \\text{m/s}',
        cerca ? 'resaltada' : 'activa', nota, REF.U3));
    }

    lista.push(F('F1.4', 'Rapidez y dirección',
      'v=\\sqrt{v_x^2+v_y^2},\\quad \\tan\\alpha=\\dfrac{v_y}{v_x}',
      'v = \\sqrt{' + par(fmtR(v.x)) + '^2+' + par(fmtR(v.y)) + '^2} = ' + fmtR(vm) + '\\ \\text{m/s},\\ \\alpha = ' + fmtR(ang) + '^\\circ',
      'activa', v.x < 0 ? 'Como $v_x<0$, el ángulo está en el 2.º o 3.er cuadrante: la calculadora da arctan(v_y/v_x) y hay que sumar 180°.' : null, REF.U34));

    lista.push(F('F1.5', 'Aceleración',
      '\\vec a=\\dfrac{d\\vec v}{dt},\\quad a_x=\\dfrac{dv_x}{dt},\\ a_y=\\dfrac{dv_y}{dt}',
      '\\vec a = ' + par(fmtR(a.x)) + '\\hat\\imath + ' + par(fmtR(a.y)) + '\\hat\\jmath\\ \\text{m/s}^2', 'activa', null, REF.U5));

    if (op.aParPerp) {
      let apar, aperp, nota;
      const vNula = vm < 1e-9;
      if (vNula) {
        apar = 0; aperp = am;
        nota = 'Sin dirección de referencia: $a_\\parallel$ no definida (v ≈ 0).';
      } else {
        apar = (a.x * v.x + a.y * v.y) / vm;
        aperp = Math.abs(a.x * v.y - a.y * v.x) / vm;
        if (am < 1e-9) nota = 'La aceleración es nula en este instante.';
        else {
          const u = 0.02 * am;
          nota = apar > u ? 'La rapidez aumenta.' : (apar < -u ? 'La rapidez disminuye.' : 'Solo cambia la dirección.');
          if (aperp <= u) nota += ' En este instante la trayectoria es recta.';
        }
      }
      lista.push(F('F1.6', 'Componentes paralela y perpendicular',
        'a_\\parallel=\\dfrac{\\vec a\\cdot\\vec v}{v},\\quad a_\\perp=\\sqrt{a^2-a_\\parallel^2}',
        'a_\\parallel = ' + fmtR(apar) + '\\ \\text{m/s}^2,\\ a_\\perp = ' + fmtR(aperp) + '\\ \\text{m/s}^2',
        'resaltada', nota, REF.U6));
    }
    return lista;
  }

  /* ============================== PESTAÑA 2 ============================== */
  function construirP2(ctx) {
    const p = ctx.params || {}, pre = ctx.precalc || {}, op = ctx.opciones || {};
    const fase = ctx.fase || 'inicio';
    const g = p.g, v0 = p.v0, a0 = p.alfa0Deg, y0 = p.y0 || 0;
    const v0x = pre.v0x, v0y = pre.v0y;
    const tieneVertice = !!pre.tieneVertice;
    const simetrico = pre.simetrico !== undefined ? pre.simetrico : (y0 === 0);
    // estado: en 'inicio' siempre t = 0
    const e = (fase === 'inicio')
      ? { t: 0, x: 0, y: y0, vx: v0x, vy: v0y, v: v0, angDeg: a0 }
      : (ctx.estado || {});
    const ts = fmtT(e.t);
    const A = angTex(a0);
    const gs = fmtG(g), y0s = fmtDato(y0), v0s = fmtDato(v0);
    const enVuelo = fase === 'subida' || fase === 'bajada';
    const cambioV = reciente(ctx, ['v0', 'alfa0', 'alfa0Deg', 'a0']);
    const lista = [];

    lista.push(F('F2.1', 'Componentes iniciales',
      'v_{0x}=v_0\\cos\\alpha_0,\\quad v_{0y}=v_0\\sin\\alpha_0',
      'v_{0x} = ' + v0s + '\\cos' + A + ' = ' + U(fmtR(v0x), 'm/s') + ',\\quad v_{0y} = ' + v0s + '\\sin' + A + ' = ' + U(fmtR(v0y), 'm/s'),
      (fase === 'inicio' || cambioV) ? 'resaltada' : 'activa', null, REF.U9));

    lista.push(F('F2.2', 'Posición horizontal', 'x=(v_0\\cos\\alpha_0)\\,t',
      'x = (' + v0s + '\\cdot\\cos' + A + ')\\cdot ' + ts + ' = ' + U(fmtR(e.x), 'm'),
      enVuelo ? 'resaltada' : 'activa', null, { l: 'U', ref: 'U §3.3 ec. (3.19), p. 76' }));

    lista.push(F('F2.3', 'Posición vertical', 'y=y_0+(v_0\\sin\\alpha_0)\\,t-\\tfrac12 g t^2',
      'y = ' + y0s + ' + (' + v0s + '\\cdot\\sin' + A + ')\\cdot ' + ts + ' - \\tfrac12\\cdot ' + gs + '\\cdot ' + ts + '^2 = ' + U(fmtR(e.y), 'm'),
      enVuelo ? 'resaltada' : 'activa', null, REF.U89));

    lista.push(F('F2.4', 'Velocidad horizontal (constante)', 'v_x=v_0\\cos\\alpha_0',
      'v_x = ' + U(fmtR(v0x), 'm/s'), 'activa', 'No cambia en todo el vuelo.', { l: 'U', ref: 'U §3.3 ec. (3.21), p. 76' }));

    {
      let nota = null, est = 'activa';
      if (fase === 'subida') { nota = '$v_y>0$: sube.'; est = 'resaltada'; }
      else if (fase === 'vertice') { nota = '$v_y=0$: punto más alto.'; est = 'resaltada'; }
      else if (fase === 'bajada') { nota = '$v_y<0$: baja.'; est = 'resaltada'; }
      lista.push(F('F2.5', 'Velocidad vertical', 'v_y=v_0\\sin\\alpha_0-g\\,t',
        'v_y = ' + fmtR(v0y) + ' - ' + gs + '\\cdot ' + ts + ' = ' + U(fmtR(e.vy), 'm/s'),
        est, nota, { l: 'U', ref: 'U §3.3 ec. (3.22), p. 76' }));
    }

    lista.push(F('F2.6', 'Rapidez y dirección', 'v=\\sqrt{v_x^2+v_y^2},\\quad\\tan\\alpha=\\dfrac{v_y}{v_x}',
      'v = \\sqrt{' + par(fmtR(e.vx)) + '^2+' + par(fmtR(e.vy)) + '^2} = ' + U(fmtR(e.v), 'm/s') + ',\\ \\alpha = ' + fmtR(e.angDeg) + '^\\circ',
      fase === 'impacto' ? 'resaltada' : 'activa',
      fase === 'impacto' ? 'Rapidez y ángulo de llegada al suelo.' : null,
      { l: 'U', ref: 'U §3.3 ec. (3.24)-(3.25), p. 77' }));

    lista.push(F('F2.7', 'Aceleración', 'a_x=0,\\quad a_y=-g',
      'a_y = -' + gs + '\\ \\text{m/s}^2', 'activa', null, REF.U8));
    if (fase === 'vertice') {
      lista[lista.length - 1].estado = 'resaltada';
      lista[lista.length - 1].nota = 'En el vértice $\\vec v\\perp\\vec a$, pero $\\vec a$ sigue siendo $-g\\hat\\jmath$.';
    }

    {
      const v0ys = fmtR(v0y);
      lista.push(F('F2.8', 'Vértice',
        't_1=\\dfrac{v_0\\sin\\alpha_0}{g},\\quad y_{\\max}=y_0+\\dfrac{v_0^2\\sin^2\\alpha_0}{2g}',
        tieneVertice
          ? 't_1 = \\dfrac{' + v0ys + '}{' + gs + '} = ' + U(fmtR(pre.t1), 's') + ',\\quad y_{\\max} = ' + y0s + ' + \\dfrac{' + par(v0ys) + '^2}{2\\cdot ' + gs + '} = ' + U(fmtR(pre.yMax), 'm')
          : null,
        !tieneVertice ? 'noAplica' : (fase === 'vertice' ? 'resaltada' : 'activa'),
        !tieneVertice ? 'Se lanza hacia abajo u horizontal: el punto más alto es el de salida.' : null,
        y0 === 0 ? REF.U14 : REF.P('U Ejemplo 3.7, p. 79-80 y Ejemplo 3.8, p. 80')));

      const imp = fase === 'impacto';
      lista.push(F('F2.9', 'Tiempo de vuelo (llegada a y = 0)',
        '0=y_0+(v_0\\sin\\alpha_0)t_v-\\tfrac12gt_v^2\\ \\Rightarrow\\ t_v=\\dfrac{v_0\\sin\\alpha_0+\\sqrt{v_0^2\\sin^2\\alpha_0+2gy_0}}{g}',
        't_v = \\dfrac{' + v0ys + ' + \\sqrt{' + par(v0ys) + '^2 + 2\\cdot ' + gs + '\\cdot ' + y0s + '}}{' + gs + '} = ' + U(fmtR(pre.tv), 's'),
        imp ? 'resaltada' : 'activa', pre.sinVuelo ? 'Con y₀ = 0 y α₀ ≤ 0 el proyectil no despega ($t_v = 0$).' : null, REF.U16));

      lista.push(F('F2.10', 'Alcance', 'R=x(t_v)=(v_0\\cos\\alpha_0)\\,t_v',
        'R = ' + fmtR(v0x) + '\\cdot ' + fmtR(pre.tv) + ' = ' + U(fmtR(pre.R), 'm'),
        imp ? 'resaltada' : 'activa', null, { l: 'U', ref: 'U Ejemplos 3.7 y 3.9, p. 79-81' }));

      lista.push(F('F2.11', 'Fórmulas del caso simétrico',
        'h=\\dfrac{v_0^2\\sin^2\\alpha_0}{2g},\\quad R=\\dfrac{v_0^2\\sin 2\\alpha_0}{g}',
        simetrico ? 'R = \\dfrac{' + v0s + '^2\\sin(2\\cdot ' + fmtDato(a0) + '^\\circ)}{' + gs + '} = ' + U(fmtR(pre.R), 'm') : null,
        !simetrico ? 'noAplica' : (imp ? 'resaltada' : 'activa'),
        !simetrico ? 'Solo válida si salida y llegada están a la misma altura (U, CUIDADO p. 80).'
          : (imp ? 'Coincide con F2.10 porque sale y llega a la misma altura.' : null),
        REF.U15));
    }

    {
      const vertical = Math.abs(Math.abs(a0) - 90) < 1e-9;
      let sust = null;
      if (!vertical) {
        const ta = Math.tan(a0 * Math.PI / 180);
        const c = g / (2 * v0 * v0 * Math.pow(Math.cos(a0 * Math.PI / 180), 2));
        sust = 'y = ' + y0s + ' ' + conSigno(fmtR(ta)) + '\\,x - ' + trasOp(fmtR(c)) + '\\,x^2';
      }
      lista.push(F('F2.12', 'Ecuación de la trayectoria',
        'y=y_0+(\\tan\\alpha_0)\\,x-\\dfrac{g}{2v_0^2\\cos^2\\alpha_0}\\,x^2', sust,
        vertical ? 'noAplica' : ((op.curvaTeorica && op.pausa) ? 'resaltada' : 'activa'),
        vertical ? 'Tiro vertical: $x=0$ siempre.' : null,
        { l: 'U', ref: 'U §3.3 ec. (3.26), p. 77 (con y₀: desarrollo propio)' }));
    }
    return lista;
  }

  /* ============================== PESTAÑA 3 ============================== */
  function construirP3(ctx) {
    const p = ctx.params || {}, e = ctx.estado || {}, pre = ctx.precalc || {}, op = ctx.opciones || {};
    const uni = p.modo !== 'noUniforme';
    const Rs = fmtDato(p.R, 1), Ts = fmtDato(p.T, 1);
    const detenido = !!e.detenido || ctx.evento === 'detenido';
    const lista = [];
    const v = e.v, arad = e.aRad;

    lista.push(F('F3.1', 'Rapidez en el MCU', 'v=\\dfrac{2\\pi R}{T}',
      uni ? 'v = \\dfrac{2\\pi\\cdot ' + Rs + '}{' + Ts + '} = ' + U(fmtR(v), 'm/s') : null,
      uni ? (reciente(ctx, ['R', 'T']) ? 'resaltada' : 'activa') : 'noAplica',
      uni ? null : 'La rapidez cambia; no hay periodo fijo.', REF.U18));

    lista.push(F('F3.2', 'Aceleración radial', 'a_{\\text{rad}}=\\dfrac{v^2}{R}',
      'a_{\\text{rad}} = \\dfrac{' + par(fmtR(v)) + '^2}{' + Rs + '} = ' + fmtR(arad) + '\\ \\text{m/s}^2',
      'resaltada', null, REF.U17));

    lista.push(F('F3.3', 'Aceleración radial con el periodo', 'a_{\\text{rad}}=\\dfrac{4\\pi^2R}{T^2}',
      uni ? 'a_{\\text{rad}} = \\dfrac{4\\pi^2\\cdot ' + Rs + '}{' + Ts + '^2} = ' + fmtR(arad) + '\\ \\text{m/s}^2' : null,
      uni ? (reciente(ctx, ['T']) ? 'resaltada' : 'activa') : 'noAplica',
      uni ? null : 'Requiere un periodo fijo (movimiento uniforme).', REF.U18));

    lista.push(F('F3.4', 'Velocidad angular (adelanto tema 9)',
      '\\omega=\\dfrac{2\\pi}{T}=\\dfrac{v}{R},\\qquad v=\\omega R',
      '\\omega = \\dfrac{' + fmtR(v) + '}{' + Rs + '} = ' + U(fmtR(e.omega), 'rad/s'), 'activa', null, REF.U2627));

    {
      const s = e.theta * p.R;
      lista.push(F('F3.5', 'Ángulo recorrido (adelanto tema 9)', '\\theta=\\dfrac{s}{R}\\ (\\text{rad})',
        '\\theta = \\dfrac{' + fmtR(s) + '}{' + Rs + '} = ' + fmtR(e.theta) + '\\ \\text{rad} = ' + fmtR(e.theta * 180 / Math.PI) + '^\\circ',
        'activa', null, REF.U25));
    }

    {
      let est = 'activa', nota = null;
      if (uni) nota = '= 0: la rapidez no cambia.';
      else if (p.aTan !== 0 && p.aTan !== undefined && !detenido) { est = 'resaltada'; nota = p.aTan > 0 ? 'Acelera.' : 'Frena.'; }
      lista.push(F('F3.6', 'Aceleración tangencial', 'a_{\\text{tan}}=\\dfrac{d\\lvert\\vec v\\rvert}{dt}',
        'a_{\\text{tan}} = ' + fmtR(e.aTan) + '\\ \\text{m/s}^2', est, nota, REF.U20));
    }

    if (!uni) {
      const tStop = pre.tStop !== undefined ? pre.tStop : (p.aTan < 0 && p.v0 > 0 ? p.v0 / Math.abs(p.aTan) : undefined);
      const tUsado = (detenido && tStop !== undefined) ? tStop : e.t;
      const vFin = detenido ? 0 : e.v;
      lista.push(F('F3.7', 'Rapidez a lo largo del arco (aceleración tangencial constante)',
        'v=v_0+a_{\\text{tan}}\\,t,\\quad s=v_0t+\\tfrac12a_{\\text{tan}}t^2',
        'v = ' + fmtDato(p.v0, 1) + ' + ' + par(fmtDato(p.aTan, 1)) + '\\cdot ' + fmtT(tUsado) + ' = ' + U(fmtR(vFin), 'm/s'),
        detenido ? 'resaltada' : 'activa',
        detenido ? 'Se ha parado en $t$ = ' + (tStop !== undefined ? fmtR(tStop) : fmtR(e.t)) + ' s: $v=0$, ya no hay $a_{\\text{rad}}$ ni $a_{\\text{tan}}$.' : null,
        REF.P('U ec. (2.8) p. 45 y (2.12) p. 46, §2.4, aplicadas a lo largo del arco')));

      lista.push(F('F3.8', 'Módulo de la aceleración total', 'a=\\sqrt{a_{\\text{rad}}^2+a_{\\text{tan}}^2}',
        'a = \\sqrt{' + par(fmtR(arad)) + '^2+' + par(fmtR(e.aTan)) + '^2} = ' + fmtR(e.a) + '\\ \\text{m/s}^2',
        op.aTotal ? 'resaltada' : 'activa', null, REF.U20));
    }
    return lista;
  }

  /* ============================== PESTAÑA 4 ============================== */
  function construirP4(ctx) {
    const p = ctx.params || {}, pre = ctx.precalc || {}, op = ctx.opciones || {};
    const lista = [];
    const avion = p.escenario === 'avion';
    const rec = reciente(ctx, null);
    const anim = !!op.reproduciendo || ctx.evento === 'animando';

    if (!avion) {
      const vx = pre.vBEvec ? pre.vBEvec.x : 0, vy = pre.vBEvec ? pre.vBEvec.y : 0;
      const b = p.betaDeg;
      const bs = angTex(b);
      const cruza = Number.isFinite(pre.tCruce);
      const rr = pre.rumboRecto;
      const posible = p.vBR > p.vRE;
      lista.push(F('F4.1', 'Suma de velocidades relativas', '\\vec v_{B/E}=\\vec v_{B/R}+\\vec v_{R/E}', null,
        anim ? 'resaltada' : 'activa', null, REF.U22));
      lista.push(F('F4.2', 'Por componentes',
        'v_{B/E,x}=v_{R/E}-v_{B/R}\\sin\\beta,\\quad v_{B/E,y}=v_{B/R}\\cos\\beta',
        'v_{B/E,x} = ' + fmtDato(p.vRE, 1) + ' - ' + fmtDato(p.vBR, 1) + '\\sin' + bs + ' = ' + U(fmtR(vx), 'm/s') +
        ',\\ v_{B/E,y} = ' + fmtDato(p.vBR, 1) + '\\cos' + bs + ' = ' + U(fmtR(vy), 'm/s'),
        rec ? 'resaltada' : 'activa', null, REF.P('U §3.5 ec. (3.35), p. 88-89 (por componentes)')));
      lista.push(F('F4.3', 'Módulo y dirección',
        'v_{B/E}=\\sqrt{v_{B/E,x}^2+v_{B/E,y}^2},\\quad\\tan\\phi=\\dfrac{v_{B/E,x}}{v_{B/E,y}}',
        'v_{B/E} = \\sqrt{' + par(fmtR(vx)) + '^2+' + par(fmtR(vy)) + '^2} = ' + U(fmtR(pre.vBE), 'm/s') + ',\\ \\phi = ' + fmtR(pre.desviacionDeg) + '^\\circ',
        'activa', 'φ es la desviación respecto a la perpendicular a la orilla (positiva aguas abajo).', REF.U23));
      lista.push(F('F4.4', 'Tiempo de cruce y deriva', 't=\\dfrac{d}{v_{B/E,y}},\\qquad x_{\\text{deriva}}=v_{B/E,x}\\,t',
        cruza ? 't = \\dfrac{' + fmtDato(p.d) + '}{' + fmtR(vy) + '} = ' + U(fmtR(pre.tCruce), 's') +
          ',\\quad x_{\\text{deriva}} = ' + fmtR(vx) + '\\cdot ' + fmtR(pre.tCruce) + ' = ' + U(fmtR(pre.deriva), 'm') : null,
        ctx.evento === 'llegada' ? 'resaltada' : 'activa',
        cruza ? null : 'La proa no avanza hacia la otra orilla ($v_{B/E,y}\\le 0$): no cruza.', REF.P('U §3.5 ec. (3.35), p. 88-89')));
      {
        let est, nota = null, sust = null;
        if (!posible) {
          est = 'noAplica';
          nota = '$\\sin\\beta>1$: imposible; el mejor rumbo es $\\sin\\beta=v_{B/R}/v_{R/E}$.';
        } else {
          sust = '\\beta = \\arcsin\\dfrac{' + fmtDato(p.vRE, 1) + '}{' + fmtDato(p.vBR, 1) + '} = ' + fmtR(rr ? rr.betaDeg : Math.asin(p.vRE / p.vBR) * 180 / Math.PI) + '^\\circ';
          est = (op.preguntaRumbo || Math.abs(vx) < 0.01) ? 'resaltada' : 'activa';
          if (Math.abs(vx) < 0.01) nota = '¡Cruce recto!';
        }
        lista.push(F('F4.5', 'Rumbo para cruzar en línea recta',
          '\\sin\\beta=\\dfrac{v_{R/E}}{v_{B/R}},\\quad v_{B/E}=\\sqrt{v_{B/R}^2-v_{R/E}^2}', sust, est, nota,
          { l: 'U', ref: 'U Ejemplo 3.15, p. 90 (mismo triángulo, aplicado al río)' }));
      }
      lista.push(F('F4.6', 'Invertir el orden', '\\vec v_{R/B}=-\\vec v_{B/R}', null,
        op.verDesdeBarca ? 'resaltada' : 'inactiva', null, REF.U22));
      return lista;
    }

    // avión (F4.4 no aplica y se omite)
    const vx = pre.vPEvec ? pre.vPEvec.x : 0, vy = pre.vPEvec ? pre.vPEvec.y : 0;
    const th = p.rumboDeg, ph = p.vientoHaciaDeg;
    const derr = p.derrotaDeg !== undefined ? p.derrotaDeg : 0;
    const rad = Math.PI / 180;
    const wperp = p.vAE * Math.abs(Math.sin((ph - derr) * rad));
    const posible = wperp < p.vPA;
    lista.push(F('F4.1', 'Suma de velocidades relativas', '\\vec v_{P/E}=\\vec v_{P/A}+\\vec v_{A/E}', null,
      anim ? 'resaltada' : 'activa', null, REF.U22));
    lista.push(F('F4.2', 'Por componentes (x = este, y = norte)',
      'v_{P/E,x}=v_{P/A}\\sin\\theta+v_{A/E}\\sin\\varphi,\\quad v_{P/E,y}=v_{P/A}\\cos\\theta+v_{A/E}\\cos\\varphi',
      'v_{P/E,x} = ' + fmtDato(p.vPA) + '\\sin ' + fmtDato(th) + '^\\circ + ' + fmtDato(p.vAE) + '\\sin ' + fmtDato(ph) + '^\\circ = ' + U(fmtR(vx), 'km/h') +
      ',\\ v_{P/E,y} = ' + fmtDato(p.vPA) + '\\cos ' + fmtDato(th) + '^\\circ + ' + fmtDato(p.vAE) + '\\cos ' + fmtDato(ph) + '^\\circ = ' + U(fmtR(vy), 'km/h'),
      rec ? 'resaltada' : 'activa', 'θ = rumbo de la proa, φ = dirección hacia la que sopla el viento (0° = N, 90° = E).',
      REF.P('U §3.5 ec. (3.35), p. 88-89 (por componentes)')));
    lista.push(F('F4.3', 'Módulo y rumbo sobre el suelo',
      'v_{P/E}=\\sqrt{v_{P/E,x}^2+v_{P/E,y}^2},\\quad\\tan\\phi=\\dfrac{v_{P/E,x}}{v_{P/E,y}}',
      'v_{P/E} = \\sqrt{' + par(fmtR(vx)) + '^2+' + par(fmtR(vy)) + '^2} = ' + U(fmtR(pre.vPE), 'km/h') + ',\\ \\phi = ' + fmtR(pre.rumboSueloDeg) + '^\\circ',
      'activa', 'φ se mide desde el norte hacia el este (0°-360°).', REF.U23));
    {
      let est, nota, sust = null;
      if (!posible) {
        est = 'noAplica';
        nota = 'La componente del viento perpendicular a la derrota ($' + fmtR(wperp) + '$ km/h) supera $v_{P/A}$: con ese viento no se puede mantener la derrota.';
      } else {
        sust = '\\beta = \\arcsin\\dfrac{' + fmtR(wperp) + '}{' + fmtDato(p.vPA) + '} = ' + fmtR(Math.asin(wperp / p.vPA) / rad) + '^\\circ';
        est = (op.preguntaRumbo) ? 'resaltada' : 'activa';
        nota = 'Con viento perpendicular a la derrota, $\\sin\\beta=v_{A/E}/v_{P/A}$; en general se usa la componente del viento perpendicular a la derrota.';
      }
      lista.push(F('F4.5', 'Corrección por viento',
        '\\sin\\beta=\\dfrac{v_{A/E}}{v_{P/A}}', sust, est, nota, REF.U24));
    }
    lista.push(F('F4.6', 'Invertir el orden', '\\vec v_{A/P}=-\\vec v_{P/A}', null,
      op.verDesdeBarca ? 'resaltada' : 'inactiva', null, REF.U22));
    return lista;
  }

  function construir(pestana, contexto) {
    const ctx = contexto || {};
    switch (Number(pestana)) {
      case 1: return construirP1(ctx);
      case 2: return construirP2(ctx);
      case 3: return construirP3(ctx);
      case 4: return construirP4(ctx);
      default: return [];
    }
  }

  /* ============================== PANEL (DOM) ============================== */
  function getKatex() {
    if (typeof window !== 'undefined' && window.katex) return window.katex;
    if (typeof globalThis !== 'undefined' && globalThis.katex) return globalThis.katex;
    return null;
  }

  const PIE = 'Resaltada = la que manda en este momento. Valores redondeados a 3 cifras.';
  const INTERVALO_MS = 100; // 10 Hz durante la animación

  /**
   * opciones: { documento, katex, reloj (()=>ms), setTimeout, clearTimeout }  (todo inyectable para tests)
   */
  function Panel(contenedor, opciones) {
    const o = opciones || {};
    const doc = o.documento || (typeof document !== 'undefined' ? document : null);
    const reloj = o.reloj || (() => (typeof performance !== 'undefined' ? performance.now() : Date.now()));
    const setT = o.setTimeout || ((f, ms) => setTimeout(f, ms));
    const clearT = o.clearTimeout || ((h) => clearTimeout(h));
    const nodos = new Map();      // id -> { raiz, titulo, gen, sus, nota, src, ultGen, ultSus, ultNota, ultEstado }
    let ids = [];
    let ultimaAct = -Infinity;
    let pendiente = null, temporizador = null;
    let pie = null;
    const api = { renders: 0, contenedor };

    function el(tag, cls) {
      const n = doc.createElement(tag);
      if (cls) n.className = cls;
      return n;
    }

    function render(nodo, tex, plano, displayMode) {
      const k = o.katex !== undefined ? o.katex : getKatex();
      if (k && typeof k.render === 'function') {
        try { nodo.textContent = ''; k.render(tex, nodo, { displayMode: displayMode, throwOnError: false }); api.renders++; return; } catch (err) { /* cae a texto */ }
      }
      nodo.textContent = plano;
    }

    function pintaNota(nodo, nota) {
      nodo.textContent = '';
      const k = o.katex !== undefined ? o.katex : getKatex();
      partirNota(nota).forEach((seg) => {
        if (seg.math && k && typeof k.render === 'function') {
          const sp = el('span');
          try { k.render(seg.s, sp, { displayMode: false, throwOnError: false }); api.renders++; } catch (err) { sp.textContent = texAPlano(seg.s); }
          nodo.appendChild(sp);
        } else {
          nodo.appendChild(doc.createTextNode(seg.math ? texAPlano(seg.s) : seg.s));
        }
      });
    }

    function crearNodo(f) {
      const raizN = el('div', 'fx');
      raizN.setAttribute('data-id', f.id);
      const titulo = el('div', 'fx-titulo');
      const gen = el('div', 'fx-gen');
      const sus = el('div', 'fx-sus');
      const nota = el('p', 'fx-nota');
      const src = el('span', 'src');
      raizN.appendChild(titulo); raizN.appendChild(gen); raizN.appendChild(sus); raizN.appendChild(nota); raizN.appendChild(src);
      return { raiz: raizN, titulo, gen, sus, nota, src, ultGen: null, ultSus: null, ultNota: null, ultEstado: null, ultSrc: null };
    }

    function aplicar(lista, ops) {
      const nuevosIds = lista.map((f) => f.id);
      const mismo = nuevosIds.length === ids.length && nuevosIds.every((x, i) => x === ids[i]);
      if (!mismo) {
        // recoloca (mantiene los nodos que sobreviven, retira los demás)
        const vivos = new Set(nuevosIds);
        nodos.forEach((n, id) => { if (!vivos.has(id)) { if (n.raiz.parentNode) n.raiz.parentNode.removeChild(n.raiz); nodos.delete(id); } });
        if (pie && pie.parentNode) pie.parentNode.removeChild(pie);
        lista.forEach((f) => {
          let n = nodos.get(f.id);
          if (!n) { n = crearNodo(f); nodos.set(f.id, n); }
          contenedor.appendChild(n.raiz);   // appendChild mueve si ya estaba: respeta el orden
        });
        if (!pie) { pie = el('p', 'fx-pie'); pie.textContent = PIE; }
        contenedor.appendChild(pie);
        ids = nuevosIds;
      }
      lista.forEach((f) => {
        const n = nodos.get(f.id);
        if (n.ultEstado !== f.estado) {
          n.raiz.setAttribute('data-estado', f.estado);
          const antes = n.ultEstado;
          n.ultEstado = f.estado;
          if (f.estado === 'resaltada' && antes !== null && antes !== 'resaltada' && !(ops && ops.arrastrando) &&
              typeof n.raiz.scrollIntoView === 'function') {
            n.raiz.scrollIntoView({ block: 'nearest' });
          }
        }
        if (n.titulo.textContent !== f.titulo) n.titulo.textContent = f.titulo;
        if (n.ultGen !== f.texGeneral) { n.ultGen = f.texGeneral; render(n.gen, f.texGeneral, f.txt && !f.texSust ? f.txt : texAPlano(f.texGeneral), true); }
        if (f.texSust) {
          if (n.ultSus !== f.texSust) { n.ultSus = f.texSust; render(n.sus, f.texSust, texAPlano(f.texSust), true); }
          n.sus.hidden = false; n.sus.style.display = '';
        } else {
          n.ultSus = null; n.sus.textContent = ''; n.sus.hidden = true; n.sus.style.display = 'none';
        }
        if (f.nota) {
          if (n.ultNota !== f.nota) { n.ultNota = f.nota; pintaNota(n.nota, f.nota); }
          n.nota.hidden = false; n.nota.style.display = '';
        } else {
          n.ultNota = null; n.nota.textContent = ''; n.nota.hidden = true; n.nota.style.display = 'none';
        }
        const sk = f.src.l + '|' + f.src.ref;
        if (n.ultSrc !== sk) {
          n.ultSrc = sk;
          n.src.setAttribute('data-l', f.src.l);
          n.src.setAttribute('data-ref', f.src.ref);
          n.src.setAttribute('tabindex', '0');
          n.src.setAttribute('aria-label', f.src.ref);
          n.src.textContent = f.src.l;
        }
      });
    }

    api.actualizar = function (lista, ops) {
      const animando = !!(ops && ops.animando);
      const ahora = reloj();
      if (animando && ahora - ultimaAct < INTERVALO_MS) {
        pendiente = { lista, ops };
        if (temporizador === null) {
          temporizador = setT(() => {
            temporizador = null;
            if (pendiente) { const p = pendiente; pendiente = null; ultimaAct = reloj(); aplicar(p.lista, p.ops); }
          }, Math.max(0, INTERVALO_MS - (ahora - ultimaAct)));
        }
        return false;
      }
      if (temporizador !== null) { clearT(temporizador); temporizador = null; }
      pendiente = null;
      ultimaAct = ahora;
      aplicar(lista, ops);
      return true;
    };
    api.destruir = function () { if (temporizador !== null) clearT(temporizador); temporizador = null; pendiente = null; };
    return api;
  }

  const API = {
    construir, Panel, fmtR, fmtDato, fmtT, fmtG, texAPlano, partirNota, notaPlana, reciente,
    REF, INTERVALO_MS, VENTANA_CAMBIO, PIE
  };
  if (typeof module === 'object' && module.exports) module.exports = API;
  else (raiz.SIM3 = raiz.SIM3 || {}).formulas = API;
})(typeof window !== 'undefined' ? window : globalThis);
