/* Simulación Tema 3 — punto de entrada: UI, pestañas, bucle, controles, reto y pregunta de rumbo.
 * Spec: ESPECIFICACION_sim_tema03.md §2, §6, §7, §8. Depende de SIM3.fisica, SIM3.formulas, SIM3.render.
 * crearReto(rng, modo) es pura (§7.2) y se exporta también en Node para poder testearla.
 */
(function (raiz) {
  'use strict';

  /* ======================================================================
   * Reto (§7.2) — puro, con generador inyectable
   * ====================================================================== */
  function fisica() {
    if (typeof module === 'object' && module.exports) return require('./sim_tema03_fisica.js');
    return raiz.SIM3.fisica;
  }
  /** modo: 'diana' | 'predice'. rng: () => [0,1). */
  function crearReto(rng, modo) {
    rng = rng || Math.random;
    const FIS = fisica();
    const idx = (n) => Math.min(n - 1, Math.floor(rng() * n));
    const v0 = 10 + idx(21);
    const y0 = [0, 0, 0, 5, 10, 20][idx(6)];
    const r = rng();
    const planeta = r < 0.6 ? 'tierra' : r < 0.8 ? 'luna' : 'marte';
    const g = FIS.G[planeta];
    if (modo === 'predice') {
      const alfa0Deg = 15 + 5 * idx(13);
      const pregunta = ['R', 'yMax', 'tv', 'vImpacto'][idx(4)];
      return { modo: 'predice', v0, y0, planeta, g, alfa0Deg, pregunta };
    }
    const Rmax = FIS.alcanceMaximo({ v0, y0, g }).R;
    let D = Math.round((0.3 + 0.65 * rng()) * Rmax * 2) / 2;
    D = Math.min(D, Math.floor(0.95 * Rmax * 2) / 2);
    D = Math.max(D, Math.ceil(0.3 * Rmax * 2) / 2);
    return { modo: 'diana', v0, y0, planeta, g, D, tol: Math.max(0.5, 0.02 * D) };
  }

  if (typeof module === 'object' && module.exports) { module.exports = { crearReto }; return; }
  if (typeof document === 'undefined') return;

  /* ======================================================================
   * Arranque en el navegador
   * ====================================================================== */
  const SIM = raiz.SIM3 || {};
  const FIS = SIM.fisica, FX = SIM.formulas, RN = SIM.render;
  const d = document;
  const $ = (s, c) => (c || d).querySelector(s);
  const fmt = FX.fmtR;
  const DT = FIS.DT;
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  let reduce = mqReduce.matches;
  const ahoraS = () => performance.now() / 1000;
  const NOMBRE_PLANETA = { tierra: 'la Tierra', luna: 'la Luna', marte: 'Marte' };
  const lsGet = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* bloqueado */ } };

  /* ---------------------------------------------------------------- estado */
  function nuevo(params, opciones) {
    return { params, opciones, t: 0, reproduciendo: false, velocidad: reduce ? 0.25 : 1, acum: 0,
      precalc: null, escalas: null, tMax: 1, evento: null, ultimoCambio: null, forzar: new Set(),
      avisoDin: '', trazaCompleta: false };
  }
  const App = {
    pestana: 1, porPestana: {
      1: nuevo({ trayectoria: 'parabola', dt: 1 }, { r: true, v: true, a: true, comp: false, vmed: true, estela: true }),
      2: nuevo({ v0: 20, alfa0Deg: 35, y0: 0, planeta: 'tierra', g: FIS.G.tierra },
        { teorica: true, estrobo: false, vectores: true, aceleracion: true, marcadores: true, fantasmas: true, pausaVertice: false }),
      3: nuevo({ modo: 'uniforme', R: 5.0, T: 4.0, v0: 2.0, aTan: 0.5 },
        { v: true, aRad: true, aTan: true, aTotal: false, radio: true, estela: true }),
      4: nuevo({ escenario: 'barca', vBR: 4.0, vRE: 2.0, betaDeg: 0, d: 60, vPA: 240, vAE: 100, vientoHaciaDeg: 90, rumboDeg: 0, derrotaDeg: 0 }, {})
    },
    paleta: null, ctx: null, w: 0, h: 0, raf: null, ultimoTs: null, arrastrando: false,
    paneles: {}, ctl: { 1: {}, 2: {}, 3: {}, 4: {} }, ultimaLectura: 0, ultimoFx: 0, imprimiendo: false
  };
  App.porPestana[2].fantasmas = [];
  App.porPestana[2].reto = null;
  App.porPestana[4].pregunta = false;
  const actual = () => App.porPestana[App.pestana];

  /* ---------------------------------------------------------------- física por pestaña */
  function precalcular(n) {
    const S = App.porPestana[n], p = S.params;
    if (n === 1) {
      const tray = FIS.trayectorias[p.trayectoria];
      S.precalc = { tray };
      S.tMax = tray.tMax;
    } else if (n === 2) {
      p.g = FIS.G[p.planeta];
      S.precalc = FIS.proyectil({ v0: p.v0, alfa0Deg: p.alfa0Deg, y0: p.y0, g: p.g });
      S.alcMax = FIS.alcanceMaximo({ v0: p.v0, y0: p.y0, g: p.g });
      S.tMax = S.precalc.tv;
    } else if (n === 3) {
      S.precalc = FIS.circular({ modo: p.modo, R: p.R, T: p.T, v0: p.v0, aTan: p.aTan });
      if (p.modo === 'uniforme') {
        S.tMax = Math.max(3 * p.T, 8);
        S.refs = { v: S.precalc.v, a: S.precalc.aRad };
      } else {
        const ts = S.precalc.tStop;
        S.tMax = isFinite(ts) ? Math.max(ts + 2, 6) : 20;
        const vr = Math.max(p.v0, p.v0 + p.aTan * 5, 1);
        S.refs = { v: vr, a: Math.max(vr * vr / p.R, Math.abs(p.aTan), 0.1) };
      }
    } else {
      if (p.escenario === 'barca') {
        S.precalc = FIS.barca({ vBR: p.vBR, vRE: p.vRE, betaDeg: p.betaDeg, d: p.d });
        S.precalc.rumboRecto = FIS.rumboRecto({ vBR: p.vBR, vRE: p.vRE, d: p.d });
        S.tMax = isFinite(S.precalc.tCruce) ? S.precalc.tCruce : 10;
      } else {
        S.precalc = FIS.avion({ vPA: p.vPA, rumboDeg: p.rumboDeg, vAE: p.vAE, vientoHaciaDeg: p.vientoHaciaDeg });
        S.tMax = 60; // min (1 s real = 1 min simulado)
      }
    }
    if (S.t > S.tMax) S.t = S.tMax;
    calcularEscalas(n);
  }

  function estadoEn(n, t) {
    const S = App.porPestana[n], pc = S.precalc;
    if (n === 1) {
      const tr = pc.tray, r = tr.r(t), v = tr.v(t), a = tr.a(t);
      return Object.assign({ t, r, v, a }, FIS.descomponerAceleracion(v, a));
    }
    if (n === 2 || n === 3) return pc.estado(t);
    if (S.params.escenario === 'barca') return { t, pos: pc.posicion(t), llegada: isFinite(pc.tCruce) && t >= pc.tCruce - 1e-9 };
    return { t, pos: { x: pc.vPEvec.x * t / 60, y: pc.vPEvec.y * t / 60 } };
  }

  function muestrear(f, t0, t1, maxPts) {
    const pts = [];
    if (t1 <= t0) return [f(t0)];
    const n = Math.max(1, Math.min(maxPts, Math.ceil((t1 - t0) / DT)));
    for (let i = 0; i <= n; i++) pts.push(f(t0 + (t1 - t0) * i / n));
    return pts;
  }
  function traza(n) {
    const S = App.porPestana[n], pc = S.precalc, t = S.t;
    if (n === 1) return muestrear((s) => pc.tray.r(s), 0, t, 2000);
    if (n === 2) {
      if (S.trazaCompleta) return pc.trayectoria(200);
      return muestrear((s) => { const e = pc.estado(s); return { x: e.x, y: e.y }; }, 0, t, 2000);
    }
    if (n === 3) {
      const e = pc.estado(t);
      const tw = S.params.modo === 'uniforme' ? 0.9 * S.params.T : Math.min(t, 0.9 * 2 * Math.PI * S.params.R / Math.max(e.v, 0.05));
      return muestrear((s) => pc.estado(s).pos, Math.max(0, t - tw), t, 160);
    }
    return [estadoEn(4, 0).pos, estadoEn(4, t).pos];
  }

  function escena(n, sinEscalas) {
    const S = App.porPestana[n], p = S.params;
    const estado = estadoEn(n, S.t);
    const e = { pestana: n, params: p, estado, precalc: S.precalc, opciones: S.opciones, traza: traza(n), evento: S.evento };
    if (n === 1) {
      e.params = { tray: S.precalc.tray, dt: p.dt, trayectoria: p.trayectoria };
      e.precalc = { tray: S.precalc.tray, vmed: FIS.velocidadMedia(S.precalc.tray, S.t, p.dt) };
    } else if (n === 2) {
      e.fase = S.precalc.fase(S.t);
      e.fantasmas = S.fantasmas;
      e.diana = (S.reto && S.reto.modo === 'diana') ? { D: S.reto.D, tol: S.reto.tol } : null;
    } else if (n === 3) {
      e.refs = S.refs;
    }
    if (!sinEscalas) e.escalas = S.escalas;
    return e;
  }

  function calcularEscalas(n) {
    if (!App.w) return;
    const S = App.porPestana[n];
    S.escalas = null;
    S.escalas = RN.escalas(escena(n, true), App.w, App.h);
  }

  function contexto(n) {
    const S = App.porPestana[n], p = S.params, e = escena(n);
    const op = Object.assign({}, S.opciones, {
      aParPerp: !!S.opciones.comp, curvaTeorica: !!S.opciones.teorica, pausa: !S.reproduciendo,
      reproduciendo: S.reproduciendo, preguntaRumbo: !!S.pregunta
    });
    const ctx = { params: p, estado: e.estado, precalc: S.precalc, fase: e.fase, evento: S.evento, opciones: op,
      ultimoCambio: S.ultimoCambio, ahora: ahoraS() };
    if (n === 1) { ctx.params = { dt: p.dt, trayectoria: p.trayectoria }; ctx.precalc = e.precalc; }
    if (n === 3) {
      ctx.precalc = { tStop: isFinite(S.precalc.tStop) ? S.precalc.tStop : undefined };
      if (e.estado.detenido) ctx.evento = 'detenido';
    }
    if (n === 4 && e.estado.llegada) ctx.evento = 'llegada';
    return ctx;
  }

  /* ---------------------------------------------------------------- dibujo y textos */
  function dibujar() {
    if (!App.ctx || !App.w) return;
    RN.dibujar(App.ctx, escena(App.pestana), App.paleta, App.w, App.h);
  }

  function actualizarTextos(animando) {
    const n = App.pestana, S = actual();
    const ahora = performance.now();
    if (animando && ahora - App.ultimoFx < 100) return;
    App.ultimoFx = ahora;
    const lista = FX.construir(n, contexto(n));
    if (S.forzar.size) lista.forEach((f) => { if (S.forzar.has(f.id) && f.estado !== 'noAplica') f.estado = 'resaltada'; });
    // no robar el scroll: el panel solo se desplaza a la fórmula resaltada si ya está a la vista y no se arrastra un control
    const cont = $('#fx-p' + n).getBoundingClientRect();
    const aLaVista = cont.bottom > 0 && cont.top < innerHeight;
    App.paneles[n].actualizar(lista, { animando, arrastrando: App.arrastrando || !aLaVista });
    pintarLectura(n);
    actualizarBarra();
  }

  function tick(ts) {
    App.raf = null;
    const S = actual();
    let animando = false;
    if (S.reproduciendo) { avanzar(S, ts); animando = S.reproduciendo; }
    if (S.animDt) { animarDt(S, ts); animando = animando || !!S.animDt; }
    dibujar();
    actualizarTextos(animando);
    if ((S.reproduciendo || S.animDt) && !d.hidden) App.raf = requestAnimationFrame(tick);
    else if (S.animDt && !S.animDt.discreto) App.raf = setTimeout(() => tick(performance.now()), 16);
    else App.ultimoTs = null;
  }
  function pedirDibujo() {
    if (App.raf) return;
    // en segundo plano no hay rAF: el redibujado único (en pausa) se hace con un temporizador
    if (d.hidden) { App.raf = setTimeout(() => tick(performance.now()), 0); return; }
    App.raf = requestAnimationFrame(tick);
  }

  function avanzar(S, ts) {
    const n = App.pestana;
    const dtReal = App.ultimoTs === null ? 0 : (ts - App.ultimoTs) / 1000;
    App.ultimoTs = ts;
    S.acum += Math.min(dtReal, 0.1) * S.velocidad;
    let pasos = 0;
    while (S.acum >= DT && pasos < 8 && S.reproduciendo) {
      const tPrev = S.t;
      S.t = Math.min(S.t + DT, S.tMax);
      S.acum -= DT; pasos++;
      eventos(n, S, tPrev);
    }
    if (pasos >= 8) S.acum = 0;
  }

  function parar(S, describir) {
    S.reproduciendo = false; S.acum = 0; App.ultimoTs = null;
    if (describir !== false) describirLienzo();
  }

  function eventos(n, S, tPrev) {
    const pc = S.precalc, t = S.t;
    if (n === 2) {
      if (pc.tieneVertice && tPrev < pc.t1 && t >= pc.t1 && pc.t1 < pc.tv) {
        const e = pc.estado(pc.t1);
        anunciar('Vértice: x = ' + fmt(e.x) + ' m, y = ' + fmt(e.y) + ' m; v_y = 0 y v = v_x = ' + fmt(e.v) + ' m/s.');
        if (S.opciones.pausaVertice) { S.t = pc.t1; parar(S); return; }
      }
      if (t >= pc.tv - 1e-12) {
        S.t = pc.tv; parar(S);
        anunciar('Impacto en el suelo: R = ' + fmt(pc.R) + ' m, t_v = ' + fmt(pc.tv) + ' s, v = ' + fmt(pc.impacto.v) + ' m/s.');
        if (S.reto && S.reto.modo === 'diana' && S.reto.esperando) evaluarDiana();
      }
      return;
    }
    if (n === 3) {
      const ts = pc.tStop;
      if (S.params.modo !== 'uniforme' && isFinite(ts) && ts > 0 && tPrev < ts && t >= ts) {
        S.t = ts; parar(S);
        anunciar('La partícula se ha detenido en t = ' + fmt(ts) + ' s: v = 0, sin aceleración radial ni tangencial.');
        return;
      }
      if (S.params.modo !== 'uniforme' && pc.estado(t).v > 50) {
        parar(S);
        S.avisoDin = 'La rapidez se dispara (más de 50 m/s): reinicia o reduce a_tan.';
        actualizarAvisos(3);
        anunciar(S.avisoDin);
        return;
      }
    }
    if (n === 4 && S.params.escenario === 'barca' && isFinite(pc.tCruce) && tPrev < pc.tCruce && t >= pc.tCruce - 1e-12) {
      S.t = pc.tCruce; parar(S);
      anunciar('Cruce completado en ' + fmt(pc.tCruce) + ' s; deriva = ' + fmt(pc.deriva) + ' m aguas abajo.');
      return;
    }
    if (t >= S.tMax - 1e-12) { S.t = S.tMax; parar(S); }
  }

  /* Δt → 0 (pestaña 1) */
  function animarDt(S, ts) {
    const a = S.animDt;
    if (a.discreto) return;
    if (a.t0 === null) a.t0 = ts;
    const f = Math.min(1, (ts - a.t0) / 3000);
    S.params.dt = Math.pow(10, Math.log10(2) + (Math.log10(0.001) - Math.log10(2)) * f);
    S.ultimoCambio = { control: 'dt', instante: ahoraS() };
    App.ctl[1].dt.sync();
    if (f >= 1) { S.params.dt = 0.001; App.ctl[1].dt.sync(); S.animDt = null; S.evento = null; finCambio(1); }
  }
  function dtACero() {
    const S = App.porPestana[1];
    parar(S, false); actualizarBarra();
    S.evento = 'dtCero';
    if (reduce) {
      const pasos = [2, 0.3, 0.05, 0.01, 0.001];
      S.animDt = { discreto: true };
      pasos.forEach((v, i) => setTimeout(() => {
        S.params.dt = v; S.ultimoCambio = { control: 'dt', instante: ahoraS() }; App.ctl[1].dt.sync();
        if (i === pasos.length - 1) { S.animDt = null; S.evento = null; finCambio(1); }
        pedirDibujo();
      }, i * 700));
      return;
    }
    S.animDt = { t0: null };
    pedirDibujo();
  }

  /* ---------------------------------------------------------------- reproducción */
  function reproducir() {
    const n = App.pestana, S = actual();
    if (S.animDt) return;
    if (n === 2 && S.precalc.sinVuelo) { actualizarAvisos(2); anunciar('Con y₀ = 0 y α₀ ≤ 0 el proyectil no despega.'); return; }
    if (S.t >= S.tMax - 1e-9) { S.t = 0; S.avisoDin = ''; actualizarAvisos(n); }
    if (n === 2 && reduce) {
      // movimiento reducido: trayectoria completa al instante y scrubber en t = 0
      S.trazaCompleta = true; S.t = 0;
      anunciar('Trayectoria dibujada completa. Usa el deslizador t para recorrerla.');
      if (S.reto && S.reto.modo === 'diana' && S.reto.esperando) evaluarDiana();
      pedirDibujo(); return;
    }
    S.reproduciendo = true; S.acum = 0; App.ultimoTs = null;
    pedirDibujo();
  }
  function pausar() { parar(actual()); pedirDibujo(); }
  function alternar() { if (actual().reproduciendo) pausar(); else reproducir(); }
  function reiniciar() {
    const n = App.pestana, S = actual();
    parar(S, false); S.t = 0; S.evento = null; S.avisoDin = ''; S.trazaCompleta = false;
    actualizarAvisos(n); describirLienzo(); pedirDibujo();
  }
  function paso(signo) {
    const S = actual();
    if (S.reproduciendo) return;
    S.t = Math.max(0, Math.min(S.tMax, S.t + signo * 0.05));
    describirLienzo(); pedirDibujo();
  }

  /* ---------------------------------------------------------------- barra */
  const B = {};
  function unidadT() { return App.pestana === 4 && actual().params.escenario === 'avion' ? 'min' : 's'; }
  function actualizarBarra() {
    const n = App.pestana, S = actual();
    const etiq = n === 2 ? 'Lanzar' : 'Reproducir';
    B.play.textContent = S.reproduciendo ? '⏸ Pausa' : '▶ ' + etiq;
    B.play.setAttribute('aria-pressed', S.reproduciendo ? 'true' : 'false');
    B.play.disabled = n === 2 && S.precalc.sinVuelo;
    B.atras.disabled = B.adel.disabled = S.reproduciendo;
    const max = Math.max(S.tMax, 0.01);
    if (+B.t.max !== max) B.t.max = String(max);
    B.t.step = '0.01';
    if (!B.tActivo) B.t.value = String(S.t);
    const u = unidadT();
    B.tOut.value = S.t.toFixed(2) + ' ' + u;
    B.t.setAttribute('aria-valuetext', S.t.toFixed(2) + (u === 's' ? ' segundos' : ' minutos'));
    if (B.vel.value !== String(S.velocidad)) B.vel.value = String(S.velocidad);
  }
  function iniciarBarra() {
    B.play = $('#b-play'); B.reset = $('#b-reset'); B.atras = $('#b-atras'); B.adel = $('#b-adelante');
    B.t = $('#b-t'); B.tOut = $('#b-t-out'); B.vel = $('#b-vel');
    B.play.addEventListener('click', alternar);
    B.reset.addEventListener('click', reiniciar);
    B.atras.addEventListener('click', () => paso(-1));
    B.adel.addEventListener('click', () => paso(1));
    B.t.addEventListener('input', () => {
      const S = actual();
      if (S.reproduciendo) parar(S, false);
      // el paso 0.01 del deslizador no llega exactamente a tMax (p. ej. t_v = 2.3411 s): el final se ajusta a tMax
      const v = +B.t.value;
      S.t = v >= S.tMax - 0.0051 ? S.tMax : Math.min(v, S.tMax);
      pedirDibujo();
    });
    B.t.addEventListener('pointerdown', () => { B.tActivo = true; });
    B.t.addEventListener('change', () => { B.tActivo = false; describirLienzo(); pedirDibujo(); });
    B.vel.addEventListener('change', () => { actual().velocidad = +B.vel.value; });
  }

  /* ---------------------------------------------------------------- lectura en vivo */
  const u = (x, un) => fmt(x) + (un ? ' ' + un : '');
  function filas(n) {
    const S = App.porPestana[n], e = estadoEn(n, S.t), p = S.params, pc = S.precalc;
    if (n === 1) {
      const vm = FIS.velocidadMedia(pc.tray, S.t, p.dt);
      const vmod = Math.hypot(e.v.x, e.v.y);
      return [['t', S.t.toFixed(2) + ' s'], ['x', u(e.r.x, 'm')], ['y', u(e.r.y, 'm')],
        ['v<sub>x</sub>', u(e.v.x, 'm/s')], ['v<sub>y</sub>', u(e.v.y, 'm/s')], ['|v|', u(vmod, 'm/s')],
        ['α (de v)', u(FIS.anguloDeg(e.v), '°')], ['a<sub>x</sub>', u(e.a.x, 'm/s²')], ['a<sub>y</sub>', u(e.a.y, 'm/s²')],
        ['a<sub>∥</sub>', e.vNula ? '—' : u(e.aPar, 'm/s²')], ['a<sub>⊥</sub>', u(e.aPerp, 'm/s²')],
        ['Δt', u(vm.dtEf, 's') + (vm.haciaAtras ? ' (atrás)' : '') + (vm.recortado ? ' (recortado)' : '')],
        ['v<sub>med</sub>', '(' + fmt(vm.vmed.x) + ', ' + fmt(vm.vmed.y) + ') m/s']];
    }
    if (n === 2) {
      const fase = { inicio: 'en la salida', subida: 'subiendo', vertice: 'en el vértice', bajada: 'bajando', impacto: 'en el suelo' }[pc.fase(S.t)];
      return [['t', S.t.toFixed(2) + ' s'], ['x', u(e.x, 'm')], ['y', u(e.y, 'm')], ['v<sub>x</sub>', u(e.vx, 'm/s')],
        ['v<sub>y</sub>', u(e.vy, 'm/s')], ['v', u(e.v, 'm/s')], ['ángulo de v', u(e.angDeg, '°')], ['fase', fase],
        ['t<sub>1</sub>', pc.tieneVertice ? u(pc.t1, 's') : '—', 1], ['y<sub>máx</sub>', u(pc.yMax, 'm'), 1],
        ['t<sub>v</sub>', u(pc.tv, 's'), 1], ['R', u(pc.R, 'm'), 1],
        ['R<sub>máx</sub>', u(S.alcMax.R, 'm') + ' (α₀ = ' + fmt(S.alcMax.alfaDeg) + '°)', 1]];
    }
    if (n === 3) {
      return [['t', S.t.toFixed(2) + ' s'], ['θ', u(e.thetaDeg, '°') + ' = ' + u(e.theta, 'rad')], ['vueltas', fmt(e.vueltas)],
        ['v', u(e.v, 'm/s')], ['ω', u(e.omega, 'rad/s')], ['a<sub>rad</sub>', u(e.aRad, 'm/s²')],
        ['a<sub>tan</sub>', u(e.aTan, 'm/s²')], ['a', u(e.a, 'm/s²')], ['a<sub>rad</sub>/g', fmt(e.aRad / FIS.G.tierra) + ' g']];
    }
    if (p.escenario === 'barca') {
      return [['t', S.t.toFixed(2) + ' s'], ['x (río abajo)', u(e.pos.x, 'm')], ['y (cruce)', u(e.pos.y, 'm')],
        ['v<sub>B/E</sub>', u(pc.vBE, 'm/s')], ['desviación', u(pc.desviacionDeg, '°')],
        ['t de cruce', isFinite(pc.tCruce) ? u(pc.tCruce, 's') : 'no cruza', 1],
        ['deriva', isFinite(pc.deriva) ? u(pc.deriva, 'm') : '—', 1],
        ['β recto', pc.rumboRecto ? u(pc.rumboRecto.betaDeg, '°') : 'imposible', 1]];
    }
    return [['t', S.t.toFixed(1) + ' min'], ['x (este)', u(e.pos.x, 'km')], ['y (norte)', u(e.pos.y, 'km')],
      ['v<sub>P/E</sub>', u(pc.vPE, 'km/h')], ['rumbo (suelo)', u(pc.rumboSueloDeg, '°')], ['rumbo (proa)', u(p.rumboDeg, '°')]];
  }
  function pintarLectura(n) {
    const panel = $('#p' + n), dl = $('.sim-lectura', panel);
    dl.innerHTML = filas(n).map((f) => '<div' + (f[2] ? ' class="fija"' : '') + '><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>').join('');
  }

  /* ---------------------------------------------------------------- avisos, anuncios, descripción */
  function actualizarAvisos(n) {
    const S = App.porPestana[n], p = S.params, pc = S.precalc;
    const el = $('#p' + n + ' .sim-aviso');
    let txt = '', nota = false;
    if (n === 2 && pc.sinVuelo) txt = 'Con y₀ = 0 y α₀ ≤ 0 el proyectil no despega (tᵥ = 0): R = 0.';
    if (n === 3 && p.modo !== 'uniforme' && p.v0 <= 0 && p.aTan <= 0) txt = 'Con v₀ = 0 y a_tan ≤ 0 la partícula está parada desde el principio.';
    if (n === 3 && S.avisoDin) txt = S.avisoDin;
    if (n === 4 && p.escenario === 'barca' && !isFinite(pc.tCruce)) txt = 'La proa apunta paralela a la orilla (o hacia atrás): la barca no avanza hacia la otra orilla y no cruza. Se anima 10 s.';
    if (n === 4 && p.escenario === 'avion') {
      const r = FIS.rumboParaDerrota({ vPA: p.vPA, vAE: p.vAE, vientoHaciaDeg: p.vientoHaciaDeg, derrotaDeg: 0 });
      txt = 'Tiempo escalado: 1 s real = 1 min simulado.' + (r ? '' : ' Con ese viento no se puede mantener la derrota hacia el norte.');
      nota = !!r;
    }
    el.hidden = !txt; el.textContent = txt; el.classList.toggle('nota', nota);
  }
  let tAnuncio = null;
  function anunciar(msg) {
    const el = $('#anuncios');
    el.textContent = '';
    clearTimeout(tAnuncio);
    tAnuncio = setTimeout(() => { el.textContent = msg; }, 40);
  }
  function describirLienzo() {
    const n = App.pestana, S = actual(), e = estadoEn(n, S.t), p = S.params;
    let s;
    if (n === 1) {
      s = 'Trayectoria «' + S.precalc.tray.nombre + '» en t = ' + S.t.toFixed(2) + ' s: r = (' + fmt(e.r.x) + ', ' + fmt(e.r.y) +
        ') m, v = ' + fmt(Math.hypot(e.v.x, e.v.y)) + ' m/s, a = ' + fmt(Math.hypot(e.a.x, e.a.y)) + ' m/s².';
    } else if (n === 2) {
      const f = S.precalc.fase(S.t);
      const lugar = { inicio: 'en la salida', subida: 'subiendo', vertice: 'en el vértice', bajada: 'bajando', impacto: 'en el suelo' }[f];
      s = 'Proyectil ' + lugar + ': x = ' + fmt(e.x) + ' m, y = ' + fmt(e.y) + ' m, v = ' + fmt(e.v) + ' m/s' +
        (Math.abs(e.vy) < 0.05 * e.v ? ' horizontal' : ' a ' + fmt(e.angDeg) + '°') + '.';
    } else if (n === 3) {
      s = 'Partícula en θ = ' + fmt(e.thetaDeg) + '° de una circunferencia de R = ' + p.R.toFixed(1) + ' m: v = ' + fmt(e.v) +
        ' m/s, a_rad = ' + fmt(e.aRad) + ' m/s² hacia el centro' + (e.detenido ? ' (detenida)' : '') + '.';
    } else if (p.escenario === 'barca') {
      s = 'Barca en x = ' + fmt(e.pos.x) + ' m aguas abajo, y = ' + fmt(e.pos.y) + ' m de ' + p.d + ' m; v respecto a la orilla = ' + fmt(S.precalc.vBE) + ' m/s.';
    } else {
      s = 'Avión a ' + fmt(e.pos.x) + ' km al este y ' + fmt(e.pos.y) + ' km al norte; v respecto al suelo = ' + fmt(S.precalc.vPE) + ' km/h con rumbo ' + fmt(S.precalc.rumboSueloDeg) + '°.';
    }
    $('#lienzo').setAttribute('aria-label', s);
  }

  /* ---------------------------------------------------------------- constructores de controles */
  function el(tag, attrs, html) {
    const n = d.createElement(tag);
    if (attrs) for (const k in attrs) { if (attrs[k] !== undefined && attrs[k] !== null) n.setAttribute(k, attrs[k]); }
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  function campo(padre, legend) {
    const f = el('fieldset'); f.appendChild(el('legend', null, legend)); padre.appendChild(f); return f;
  }
  const textoPlano = (html) => html.replace(/<[^>]+>/g, '');
  /** cfg: {n, id, label(html), un, unTxt, min, max, step, dec, get, set, nombre, log:{toVal,toPos,min,max,step}} */
  function slider(padre, cfg) {
    const id = 'c' + cfg.n + '-' + cfg.id;
    const caja = el('div', { class: 'ctl' });
    const lab = el('label', { for: id }, '<span>' + cfg.label + (cfg.un ? ' <span class="u">(' + cfg.un + ')</span>' : '') + '</span>');
    const out = el('output', { for: id, class: cfg.log ? '' : 'sr-only' });
    lab.appendChild(out);
    const fila = el('div', { class: 'ctl-fila' });
    const rng = cfg.log
      ? el('input', { type: 'range', id, min: 0, max: 100, step: 0.1 })
      : el('input', { type: 'range', id, min: cfg.min, max: cfg.max, step: cfg.step });
    const num = el('input', { type: 'number', id: id + '-n', min: cfg.min, max: cfg.max, step: cfg.log ? 'any' : cfg.step, inputmode: 'decimal',
      'aria-label': textoPlano(cfg.label) + (cfg.un ? ' en ' + cfg.unTxt : '') + ', valor exacto' });
    const fijado = el('span', { class: 'fijado', hidden: '' }, 'fijado por el reto');
    fila.appendChild(rng); fila.appendChild(num);
    caja.appendChild(lab); caja.appendChild(fila); caja.appendChild(fijado);
    padre.appendChild(caja);
    const texto = (v) => (cfg.dec !== undefined ? v.toFixed(cfg.dec) : (cfg.log ? fmt(v) : String(+v.toFixed(6))));
    const api = {
      caja, rng, num,
      sync() {
        const v = cfg.get();
        rng.value = String(cfg.log ? cfg.log.toPos(v) : v);
        if (d.activeElement !== num) num.value = texto(v);
        out.value = texto(v) + (cfg.un ? ' ' + cfg.un : '');
        rng.setAttribute('aria-valuetext', texto(v) + ' ' + cfg.unTxt);
      },
      bloquear(b) {
        rng.disabled = num.disabled = b; caja.classList.toggle('bloq', b); fijado.hidden = !b;
      }
    };
    rng.addEventListener('input', () => {
      let v = cfg.log ? cfg.log.toVal(+rng.value) : +rng.value;
      cfg.set(v); api.sync(); cambio(cfg.n, cfg.nombre || cfg.id);
    });
    num.addEventListener('change', () => {
      let v = parseFloat(String(num.value).replace(',', '.'));
      if (!isFinite(v)) { api.sync(); return; }
      v = Math.max(cfg.min, Math.min(cfg.max, v));
      if (!cfg.log) v = +(Math.round((v - cfg.min) / cfg.step) * cfg.step + cfg.min).toFixed(6);
      cfg.set(v); num.value = texto(v); api.sync(); cambio(cfg.n, cfg.nombre || cfg.id); finCambio(cfg.n);
    });
    rng.addEventListener('pointerdown', () => { App.arrastrando = true; });
    rng.addEventListener('change', () => { App.arrastrando = false; finCambio(cfg.n); });
    App.ctl[cfg.n][cfg.id] = api;
    api.sync();
    return api;
  }
  function check(padre, n, id, label) {
    const S = App.porPestana[n];
    const lab = el('label', { class: 'chk' });
    const inp = el('input', { type: 'checkbox', id: 'c' + n + '-o-' + id });
    inp.checked = !!S.opciones[id];
    inp.addEventListener('change', () => { S.opciones[id] = inp.checked; S.ultimoCambio = { control: id, instante: ahoraS() }; pedirDibujo(); });
    lab.appendChild(inp); lab.appendChild(el('span', null, label));
    padre.appendChild(lab);
    return inp;
  }
  function radios(padre, n, nombre, legend, ops, get, set) {
    const f = campo(padre, legend);
    const caja = el('div', { class: 'radios' });
    const inputs = ops.map((o) => {
      const lab = el('label', { class: 'rad' });
      const inp = el('input', { type: 'radio', name: 'c' + n + '-' + nombre, value: o[0] });
      inp.checked = get() === o[0];
      inp.addEventListener('change', () => { if (inp.checked) { set(o[0]); cambio(n, nombre); finCambio(n); } });
      lab.appendChild(inp); lab.appendChild(el('span', null, o[1]));
      caja.appendChild(lab);
      return inp;
    });
    f.appendChild(caja);
    return { f, inputs, sync() { inputs.forEach((i) => { i.checked = i.value === get(); }); }, bloquear(b) { inputs.forEach((i) => { i.disabled = b; }); f.classList.toggle('bloq', b); } };
  }

  /** Cambio de un parámetro (durante el arrastre). */
  function cambio(n, control) {
    const S = App.porPestana[n];
    S.ultimoCambio = { control, instante: ahoraS() };
    S.avisoDin = '';
    if (n === 2) {
      const pc = S.precalc;
      if (pc && pc.tv > 0 && S.t >= pc.tv - 1e-9 && !S.trazaCompleta) {
        S.fantasmas.push({ alfaDeg: S.params.alfa0Deg, puntos: pc.trayectoria(80) });
        if (S.fantasmas.length > 3) S.fantasmas.shift();
      }
      parar(S, false); S.t = 0; S.trazaCompleta = false;
    } else if (n === 4) {
      parar(S, false); S.t = 0;
    } else if (n === 1 && control === 'trayectoria') {
      parar(S, false); S.t = 0;
    } else if (n === 3 && control === 'modo') {
      parar(S, false); S.t = 0;
    }
    precalcular(n);
    actualizarAvisos(n);
    if (n === 4) actualizarGruposP4();
    if (n === App.pestana && B.t) actualizarBarra();
    pedirDibujo();
    clearTimeout(S.tRefresco);
    S.tRefresco = setTimeout(pedirDibujo, 1600);
  }
  function finCambio(n) { if (n === App.pestana) { describirLienzo(); pedirDibujo(); } }

  function renderTex(raizEl) {
    raizEl.querySelectorAll('[data-tex]').forEach((s) => {
      if (window.katex) { try { window.katex.render(s.getAttribute('data-tex'), s, { throwOnError: false }); } catch (e) { /* texto */ } }
    });
  }
  const tx = (tex, plano) => '<span data-tex="' + tex.replace(/"/g, '&quot;') + '">' + plano + '</span>';

  /* ---------------------------------------------------------------- controles P1 */
  const LOG = { toVal: (p) => Math.pow(10, -3 + 3.301 * p / 100), toPos: (v) => (Math.log10(v) + 3) / 3.301 * 100 };
  function controlesP1() {
    const n = 1, S = App.porPestana[n], p = S.params, c = $('#ctrl-p1');
    const f = campo(c, 'Trayectoria');
    const caja = el('div', { class: 'ctl' });
    const sel = el('select', { id: 'c1-tray' });
    Object.keys(FIS.trayectorias).forEach((k) => {
      const o = el('option', { value: k }, FIS.trayectorias[k].nombre); sel.appendChild(o);
    });
    sel.value = p.trayectoria;
    sel.addEventListener('change', () => { p.trayectoria = sel.value; cambio(1, 'trayectoria'); finCambio(1); });
    caja.appendChild(el('label', { for: 'c1-tray', class: 'ctl-lab' }, 'Curva'));
    caja.appendChild(sel);
    f.appendChild(caja);
    f.appendChild(el('p', { class: 'ctl-nota' }, 'El instante <i>t</i> se elige con el deslizador de la barra de reproducción.'));

    const f2 = campo(c, 'Velocidad media');
    slider(f2, { n, id: 'dt', label: 'Δ<i>t</i> (escala logarítmica)', un: 's', unTxt: 'segundos', min: 0.001, max: 2,
      log: LOG, get: () => p.dt, set: (v) => { p.dt = v; } });
    const bot = el('div', { class: 'botones' });
    const b = el('button', { type: 'button', id: 'c1-dt0' }, 'Δ<i>t</i> → 0');
    b.addEventListener('click', dtACero);
    bot.appendChild(b); f2.appendChild(bot);
    f2.appendChild(el('p', { class: 'ctl-nota' }, 'Al encoger Δt, la cuerda Δr se pega a la curva y v<sub>med</sub> se convierte en v (tangente).'));

    const f3 = campo(c, 'Mostrar');
    const g = el('div', { class: 'checks' }); f3.appendChild(g);
    check(g, n, 'r', 'vector ' + tx('\\vec r', 'r'));
    check(g, n, 'v', 'velocidad ' + tx('\\vec v', 'v'));
    check(g, n, 'a', 'aceleración ' + tx('\\vec a', 'a'));
    check(g, n, 'comp', tx('a_\\parallel / a_\\perp', 'a∥ / a⊥'));
    check(g, n, 'vmed', tx('\\vec v_{\\text{med}}', 'v med') + ' y cuerda');
    check(g, n, 'estela', 'estela');
  }

  /* ---------------------------------------------------------------- controles P2 */
  function controlesP2() {
    const n = 2, S = App.porPestana[n], p = S.params, c = $('#ctrl-p2');
    const f = campo(c, 'Lanzamiento');
    slider(f, { n, id: 'v0', label: '<i>v</i><sub>0</sub>', un: 'm/s', unTxt: 'metros por segundo', min: 1, max: 50, step: 0.5, get: () => p.v0, set: (v) => { p.v0 = v; } });
    slider(f, { n, id: 'alfa0', label: '<i>α</i><sub>0</sub>', un: '°', unTxt: 'grados', min: -90, max: 90, step: 1, get: () => p.alfa0Deg, set: (v) => { p.alfa0Deg = v; } });
    slider(f, { n, id: 'y0', label: '<i>y</i><sub>0</sub> (altura de lanzamiento)', un: 'm', unTxt: 'metros', min: 0, max: 50, step: 0.5, get: () => p.y0, set: (v) => { p.y0 = v; } });
    App.ctl[2].planeta = radios(c, n, 'planeta', 'Gravedad <i>g</i>', [['tierra', 'Tierra 9.80 m/s²'], ['luna', 'Luna 1.62 m/s²'], ['marte', 'Marte 3.71 m/s²']],
      () => p.planeta, (v) => { p.planeta = v; });
    const f3 = campo(c, 'Mostrar');
    const g = el('div', { class: 'checks' }); f3.appendChild(g);
    check(g, n, 'teorica', 'curva teórica');
    check(g, n, 'estrobo', 'vista estroboscópica');
    check(g, n, 'vectores', tx('\\vec v', 'v') + ' y componentes');
    check(g, n, 'aceleracion', tx('\\vec a', 'a'));
    check(g, n, 'marcadores', 'marcadores <i>h</i>, <i>R</i>, <i>t</i><sub>v</sub>');
    check(g, n, 'fantasmas', 'lanzamientos anteriores');
    check(g, n, 'pausaVertice', 'pausar en el vértice');
    construirReto(c);
  }

  /* ---------------------------------------------------------------- reto (§7.2) */
  const R2 = {};
  const PREG = {
    R: { txt: 'el alcance <i>R</i> (distancia horizontal hasta que toca el suelo)', un: 'm', fx: 'F2.10' },
    yMax: { txt: 'la altura máxima sobre el suelo <i>y</i><sub>máx</sub>', un: 'm', fx: 'F2.8' },
    tv: { txt: 'el tiempo de vuelo <i>t</i><sub>v</sub>', un: 's', fx: 'F2.9' },
    vImpacto: { txt: 'la rapidez con que llega al suelo', un: 'm/s', fx: 'F2.6' }
  };
  function construirReto(c) {
    const S = App.porPestana[2];
    const bot = el('div', { class: 'botones' });
    R2.abrir = el('button', { type: 'button', id: 'c2-reto', 'aria-expanded': 'false', 'aria-controls': 'c2-reto-panel' }, '🎯 Modo reto');
    bot.appendChild(R2.abrir); c.appendChild(bot);
    const pan = el('div', { class: 'reto', id: 'c2-reto-panel', hidden: '' });
    pan.innerHTML =
      '<h3>Reto</h3>' +
      '<div class="radios" role="radiogroup" aria-label="Tipo de reto">' +
      '<label class="rad"><input type="radio" name="c2-reto-modo" value="diana"> <span>Diana: elige el ángulo</span></label>' +
      '<label class="rad"><input type="radio" name="c2-reto-modo" value="predice"> <span>Predice el resultado</span></label></div>' +
      '<p class="reto-enun"></p>' +
      '<div class="reto-diana botones"><button type="button" class="b-prim" data-a="disparar">Disparar</button><button type="button" data-a="sol">Ver solución</button></div>' +
      '<div class="reto-predice"><label for="c2-resp" class="reto-lab"></label><div class="botones"><input type="text" id="c2-resp" inputmode="decimal" autocomplete="off"><button type="button" class="b-prim" data-a="comprobar">Comprobar</button></div></div>' +
      '<div class="feedback"></div>' +
      '<div class="botones"><button type="button" data-a="nuevo">Nuevo reto</button><button type="button" data-a="salir">Salir del reto</button></div>' +
      '<p class="marcador"></p>';
    c.appendChild(pan);
    R2.pan = pan;
    R2.marc = { aciertos: 0, intentos: 0 };
    const modoGuardado = lsGet('sim3-reto-modo') === 'predice' ? 'predice' : 'diana';
    pan.querySelectorAll('input[name=c2-reto-modo]').forEach((i) => {
      i.checked = i.value === modoGuardado;
      i.addEventListener('change', () => { if (i.checked) { lsSet('sim3-reto-modo', i.value); nuevoReto(); } });
    });
    R2.abrir.addEventListener('click', () => {
      if (S.reto) salirReto(); else { pan.hidden = false; R2.abrir.setAttribute('aria-expanded', 'true'); R2.abrir.textContent = 'Cerrar el reto'; nuevoReto(); }
    });
    pan.addEventListener('click', (e) => {
      const a = e.target.closest('button') && e.target.closest('button').getAttribute('data-a');
      if (a === 'disparar') disparar();
      else if (a === 'sol') solucionDiana();
      else if (a === 'comprobar') comprobarPrediccion();
      else if (a === 'nuevo') nuevoReto();
      else if (a === 'salir') salirReto();
    });
    $('#c2-resp', pan).addEventListener('keydown', (e) => { if (e.key === 'Enter') comprobarPrediccion(); });
  }
  function modoReto() { const i = R2.pan.querySelector('input[name=c2-reto-modo]:checked'); return i ? i.value : 'diana'; }
  function feedback(clase, cabecera, html, anadir) {
    const caja = '<div class="box ' + clase + '"><span class="h">' + cabecera + '</span>' + html + '</div>';
    if (anadir) $('.feedback', R2.pan).insertAdjacentHTML('beforeend', caja); else $('.feedback', R2.pan).innerHTML = caja;
  }
  function pintarMarcador() { $('.marcador', R2.pan).textContent = 'Marcador de la sesión: ' + R2.marc.aciertos + ' aciertos de ' + R2.marc.intentos + ' intentos.'; }
  function bloquearP2(b, alfaTambien) {
    const c = App.ctl[2];
    c.v0.bloquear(b); c.y0.bloquear(b); c.planeta.bloquear(b); c.alfa0.bloquear(b && !!alfaTambien);
  }
  function aplicarParamsP2() {
    const c = App.ctl[2];
    c.v0.sync(); c.y0.sync(); c.alfa0.sync(); c.planeta.sync();
    precalcular(2); actualizarAvisos(2); describirLienzo(); pedirDibujo();
  }
  function nuevoReto() {
    const S = App.porPestana[2], p = S.params, modo = modoReto();
    const r = crearReto(Math.random, modo);
    parar(S, false); S.t = 0; S.trazaCompleta = false; S.fantasmas = []; S.forzar = new Set();
    p.v0 = r.v0; p.y0 = r.y0; p.planeta = r.planeta;
    r.fallos = 0; r.esperando = false; r.resuelto = false;
    S.reto = r;
    $('.feedback', R2.pan).innerHTML = '';
    const datos = '<i>v</i><sub>0</sub> = ' + r.v0 + ' m/s, <i>y</i><sub>0</sub> = ' + r.y0 + ' m, en ' + NOMBRE_PLANETA[r.planeta] + ' (<i>g</i> = ' + r.g.toFixed(2) + ' m/s²)';
    $('.reto-diana', R2.pan).hidden = modo !== 'diana';
    $('.reto-predice', R2.pan).hidden = modo !== 'predice';
    if (modo === 'diana') {
      bloquearP2(true, false);
      $('.reto-enun', R2.pan).innerHTML = 'Con ' + datos + ', elige <i>α</i><sub>0</sub> para que el proyectil caiga en la diana a <b>D = ' + r.D + ' m</b> (tolerancia ±' + fmt(r.tol) + ' m) y pulsa «Disparar».';
    } else {
      p.alfa0Deg = r.alfa0Deg;
      bloquearP2(true, true);
      const q = PREG[r.pregunta];
      $('.reto-enun', R2.pan).innerHTML = 'Con ' + datos + ' y <i>α</i><sub>0</sub> = ' + r.alfa0Deg + '°, calcula ' + q.txt + '.';
      $('.reto-lab', R2.pan).textContent = 'Tu respuesta (' + q.un + '):';
      $('#c2-resp', R2.pan).value = '';
    }
    aplicarParamsP2();
    pintarMarcador();
  }
  function salirReto() {
    const S = App.porPestana[2];
    S.reto = null; S.forzar = new Set();
    bloquearP2(false);
    R2.pan.hidden = true; R2.abrir.setAttribute('aria-expanded', 'false'); R2.abrir.textContent = '🎯 Modo reto';
    pedirDibujo();
  }
  function disparar() {
    const S = App.porPestana[2];
    if (!S.reto || S.reto.modo !== 'diana') return;
    S.reto.esperando = true;
    S.t = 0; S.trazaCompleta = false;
    if (App.pestana !== 2) return;
    reproducir();
  }
  function evaluarDiana() {
    const S = App.porPestana[2], r = S.reto, pc = S.precalc;
    r.esperando = false;
    const dif = pc.R - r.D;
    R2.marc.intentos++;
    if (Math.abs(dif) <= r.tol) {
      R2.marc.aciertos++; r.resuelto = true;
      feedback('ex', '¡Diana!', 'Con <i>α</i><sub>0</sub> = ' + S.params.alfa0Deg + '° el alcance es <i>R</i> = ' + fmt(pc.R) + ' m (diana a ' + r.D + ' m).');
      anunciar('¡Diana! R = ' + fmt(pc.R) + ' metros.');
    } else {
      r.fallos++;
      const txt = (dif > 0 ? 'Te has pasado por ' : 'Te has quedado corto por ') + fmt(Math.abs(dif)) + ' m (R = ' + fmt(pc.R) + ' m).';
      let extra = '';
      if (r.fallos === 2) {
        S.forzar = new Set(['F2.9', 'F2.10']);
        extra = ' <b>Pista:</b> escribe <i>R</i>(<i>α</i><sub>0</sub>) = <i>D</i> con las fórmulas resaltadas (tiempo de vuelo y alcance).';
      }
      feedback('warn', 'Fallo ' + r.fallos, txt + extra);
      anunciar('Fallo: ' + txt);
      if (r.fallos >= 3) solucionDiana(true);
    }
    pintarMarcador();
  }
  function solucionDiana(anadir) {
    const S = App.porPestana[2], r = S.reto, p = S.params;
    if (!r || r.modo !== 'diana') return;
    const angs = FIS.angulosParaDiana({ v0: p.v0, y0: p.y0, g: p.g, D: r.D });
    let html;
    if (!angs.length) html = 'Con esta <i>v</i><sub>0</sub> la diana es inalcanzable (<i>D</i> &gt; <i>R</i><sub>máx</sub> = ' + fmt(S.alcMax.R) + ' m).';
    else {
      html = (angs.length === 2 ? 'Hay dos ángulos que dan en la diana: <b>' + fmt(angs[0]) + '°</b> y <b>' + fmt(angs[1]) + '°</b>.'
        : 'El ángulo que da en la diana es <b>' + fmt(angs[0]) + '°</b>.');
      if (p.y0 === 0 && angs.length === 2) html += ' Son complementarios: <i>α</i> y 90° − <i>α</i> (U Ej. 3.8).';
    }
    feedback('tip', 'Solución', html, anadir === true);
    anunciar('Solución: ' + textoPlano(html));
  }
  function comprobarPrediccion() {
    const S = App.porPestana[2], r = S.reto, p = S.params;
    if (!r || r.modo !== 'predice') return;
    const raw = $('#c2-resp', R2.pan).value.trim().replace(',', '.');
    const v = parseFloat(raw);
    if (!isFinite(v)) { feedback('warn', 'Falta la respuesta', 'Escribe un número (vale coma o punto decimal).'); return; }
    const q = PREG[r.pregunta];
    const res = FIS.diagnosticar({ pregunta: r.pregunta, respuesta: v, params: { v0: p.v0, alfa0Deg: p.alfa0Deg, y0: p.y0, g: p.g } });
    R2.marc.intentos++;
    S.forzar = new Set([q.fx]);
    if (res.correcto) {
      R2.marc.aciertos++;
      feedback('ex', 'Correcto', 'El valor es ' + fmt(res.valorCorrecto) + ' ' + q.un + '. Mira la fórmula resaltada y el lanzamiento.');
      anunciar('Correcto: ' + fmt(res.valorCorrecto) + ' ' + q.un);
    } else {
      feedback('warn', res.codigo === 'OTRO' ? 'No es correcto' : 'Error típico detectado', res.mensaje + ' Valor correcto: <b>' + fmt(res.valorCorrecto) + ' ' + q.un + '</b>.');
      anunciar('No es correcto. ' + res.mensaje + ' Valor correcto: ' + fmt(res.valorCorrecto) + ' ' + q.un);
    }
    pintarMarcador();
    S.t = 0; S.trazaCompleta = false;
    if (App.pestana === 2) reproducir();
  }

  /* ---------------------------------------------------------------- controles P3 */
  function controlesP3() {
    const n = 3, S = App.porPestana[n], p = S.params, c = $('#ctrl-p3');
    App.ctl[3].modo = radios(c, n, 'modo', 'Modo', [['uniforme', 'uniforme (MCU)'], ['noUniforme', 'no uniforme']], () => p.modo, (v) => { p.modo = v; actualizarGruposP3(); });
    const f = campo(c, 'Parámetros');
    slider(f, { n, id: 'R', label: '<i>R</i> (radio)', un: 'm', unTxt: 'metros', min: 0.5, max: 10, step: 0.1, dec: 1, get: () => p.R, set: (v) => { p.R = v; } });
    slider(f, { n, id: 'T', label: '<i>T</i> (periodo)', un: 's', unTxt: 'segundos', min: 0.5, max: 20, step: 0.1, dec: 1, get: () => p.T, set: (v) => { p.T = v; } });
    slider(f, { n, id: 'v0', label: '<i>v</i><sub>0</sub> (rapidez inicial)', un: 'm/s', unTxt: 'metros por segundo', min: 0, max: 20, step: 0.1, dec: 1, get: () => p.v0, set: (v) => { p.v0 = v; } });
    slider(f, { n, id: 'aTan', label: tx('a_{\\text{tan}}', 'a tan'), un: 'm/s²', unTxt: 'metros por segundo al cuadrado', min: -5, max: 5, step: 0.1, dec: 1, get: () => p.aTan, set: (v) => { p.aTan = v; } });
    f.appendChild(el('p', { class: 'ctl-nota' }, 'Valores iniciales: juego mecánico del Ejemplo 3.12 de U (R = 5.0 m, T = 4.0 s).'));
    const f3 = campo(c, 'Mostrar');
    const g = el('div', { class: 'checks' }); f3.appendChild(g);
    check(g, n, 'v', tx('\\vec v', 'v'));
    check(g, n, 'aRad', tx('\\vec a_{\\text{rad}}', 'a rad'));
    check(g, n, 'aTan', tx('\\vec a_{\\text{tan}}', 'a tan'));
    check(g, n, 'aTotal', tx('\\vec a', 'a') + ' total');
    check(g, n, 'radio', 'radio y ángulo');
    check(g, n, 'estela', 'estela');
    actualizarGruposP3();
  }
  function actualizarGruposP3() {
    const c = App.ctl[3], uni = App.porPestana[3].params.modo === 'uniforme';
    if (!c.T) return;
    c.T.caja.hidden = !uni; c.v0.caja.hidden = uni; c.aTan.caja.hidden = uni;
  }

  /* ---------------------------------------------------------------- controles P4 */
  const P4 = {};
  function controlesP4() {
    const n = 4, S = App.porPestana[n], p = S.params, c = $('#ctrl-p4');
    App.ctl[4].escenario = radios(c, n, 'escenario', 'Escenario', [['barca', 'barca y río'], ['avion', 'avión y viento']], () => p.escenario,
      (v) => { p.escenario = v; cerrarPregunta(); });
    P4.barca = campo(c, 'Barca (B), río (R), orilla (E)');
    slider(P4.barca, { n, id: 'vBR', label: tx('v_{B/R}', 'v B/R') + ' (barca respecto al agua)', un: 'm/s', unTxt: 'metros por segundo', min: 0.5, max: 10, step: 0.1, dec: 1, get: () => p.vBR, set: (v) => { p.vBR = v; } });
    slider(P4.barca, { n, id: 'vRE', label: tx('v_{R/E}', 'v R/E') + ' (corriente)', un: 'm/s', unTxt: 'metros por segundo', min: 0, max: 8, step: 0.1, dec: 1, get: () => p.vRE, set: (v) => { p.vRE = v; } });
    slider(P4.barca, { n, id: 'beta', label: '<i>β</i> (proa; + aguas arriba)', un: '°', unTxt: 'grados', min: -90, max: 90, step: 1, get: () => p.betaDeg, set: (v) => { p.betaDeg = v; } });
    slider(P4.barca, { n, id: 'd', label: '<i>d</i> (anchura)', un: 'm', unTxt: 'metros', min: 10, max: 200, step: 5, get: () => p.d, set: (v) => { p.d = v; } });
    P4.avion = campo(c, 'Avión (P), aire (A), suelo (E)');
    slider(P4.avion, { n, id: 'vPA', label: tx('v_{P/A}', 'v P/A') + ' (respecto al aire)', un: 'km/h', unTxt: 'kilómetros por hora', min: 50, max: 400, step: 5, get: () => p.vPA, set: (v) => { p.vPA = v; } });
    slider(P4.avion, { n, id: 'vAE', label: 'Viento ' + tx('v_{A/E}', 'v A/E'), un: 'km/h', unTxt: 'kilómetros por hora', min: 0, max: 200, step: 5, get: () => p.vAE, set: (v) => { p.vAE = v; } });
    slider(P4.avion, { n, id: 'viento', label: 'El viento sopla hacia', un: '°', unTxt: 'grados desde el norte', min: 0, max: 359, step: 1, get: () => p.vientoHaciaDeg, set: (v) => { p.vientoHaciaDeg = v; } });
    slider(P4.avion, { n, id: 'rumbo', label: 'Rumbo del avión (proa)', un: '°', unTxt: 'grados desde el norte', min: 0, max: 359, step: 1, get: () => p.rumboDeg, set: (v) => { p.rumboDeg = v; } });
    P4.avion.appendChild(el('p', { class: 'ctl-nota' }, 'Rumbos: 0° = norte, 90° = este. Valores iniciales: Ejemplo 3.14 de U.'));
    construirPregunta(c);
    actualizarGruposP4();
  }
  function actualizarGruposP4() {
    const barca = App.porPestana[4].params.escenario === 'barca';
    if (!P4.barca) return;
    P4.barca.hidden = !barca; P4.avion.hidden = barca;
    P4.boton.textContent = barca ? '¿Qué rumbo para cruzar en línea recta?' : '¿Qué rumbo para volar hacia el norte?';
    $('label[for=c4-resp]', P4.pan).textContent = barca ? 'Rumbo β (grados, + aguas arriba):' : 'Rumbo de la proa (grados desde el norte):';
  }

  /* ---------------------------------------------------------------- pregunta de rumbo (§7.3) */
  function construirPregunta(c) {
    const bot = el('div', { class: 'botones' });
    P4.boton = el('button', { type: 'button', id: 'c4-preg', 'aria-expanded': 'false', 'aria-controls': 'c4-preg-panel' });
    bot.appendChild(P4.boton); c.appendChild(bot);
    const pan = el('div', { class: 'pregunta', id: 'c4-preg-panel', hidden: '' });
    pan.innerHTML = '<h3>Pregunta</h3><label for="c4-resp"></label>' +
      '<div class="botones"><input type="text" id="c4-resp" inputmode="decimal" autocomplete="off">' +
      '<button type="button" class="b-prim" data-a="comprobar">Comprobar</button></div>' +
      '<div class="botones"><button type="button" data-a="imposible">No se puede</button><button type="button" data-a="sol">Ver solución</button></div>' +
      '<div class="feedback"></div>';
    c.appendChild(pan);
    P4.pan = pan;
    P4.boton.addEventListener('click', () => { if (App.porPestana[4].pregunta) cerrarPregunta(); else abrirPregunta(); });
    pan.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      const a = b.getAttribute('data-a');
      if (a === 'comprobar') comprobarRumbo(false);
      else if (a === 'imposible') comprobarRumbo(true);
      else if (a === 'sol') solucionRumbo();
    });
    $('#c4-resp', pan).addEventListener('keydown', (e) => { if (e.key === 'Enter') comprobarRumbo(false); });
  }
  function abrirPregunta() {
    const S = App.porPestana[4];
    S.pregunta = true; P4.pan.hidden = false; P4.boton.setAttribute('aria-expanded', 'true');
    $('.feedback', P4.pan).innerHTML = ''; $('#c4-resp', P4.pan).value = '';
    S.ultimoCambio = { control: 'pregunta', instante: ahoraS() };
    pedirDibujo();
  }
  function cerrarPregunta() {
    const S = App.porPestana[4];
    S.pregunta = false;
    if (P4.pan) { P4.pan.hidden = true; P4.boton.setAttribute('aria-expanded', 'false'); }
    pedirDibujo();
  }
  function fbRumbo(clase, cab, html) {
    const caja = '<div class="box ' + clase + '"><span class="h">' + cab + '</span>' + html + '</div>';
    if (P4.anadir) $('.feedback', P4.pan).insertAdjacentHTML('beforeend', caja); else $('.feedback', P4.pan).innerHTML = caja;
    anunciar(cab + ': ' + textoPlano(html));
  }
  const difAng = (a, b) => { let x = ((a - b) % 360 + 540) % 360 - 180; return x; };
  function solucionP4() {
    const p = App.porPestana[4].params;
    if (p.escenario === 'barca') {
      const rr = FIS.rumboRecto({ vBR: p.vBR, vRE: p.vRE, d: p.d });
      if (rr) return { posible: true, valor: rr.betaDeg, tan: Math.atan(p.vRE / p.vBR) * 180 / Math.PI, espejo: -rr.betaDeg };
      const md = FIS.rumboMinimaDeriva({ vBR: p.vBR, vRE: p.vRE, d: p.d });
      return { posible: false, minima: md };
    }
    const r = FIS.rumboParaDerrota({ vPA: p.vPA, vAE: p.vAE, vientoHaciaDeg: p.vientoHaciaDeg, derrotaDeg: 0 });
    if (!r) return { posible: false };
    const wx = p.vAE * Math.sin(p.vientoHaciaDeg * Math.PI / 180);       // componente del viento perpendicular a la derrota (este)
    return { posible: true, valor: r.rumboDeg, tan: -Math.atan(wx / p.vPA) * 180 / Math.PI, espejo: -difAng(r.rumboDeg, 0), r };
  }
  function comprobarRumbo(dijoImposible) {
    const S = App.porPestana[4], p = S.params, barca = p.escenario === 'barca';
    const sol = solucionP4();
    if (dijoImposible) {
      if (!sol.posible) { fbRumbo('ex', 'Correcto', barca ? 'Con <i>v</i><sub>B/R</sub> ≤ <i>v</i><sub>R/E</sub> el seno saldría mayor que 1: no se puede cruzar en línea recta.' : 'El viento perpendicular a la derrota supera la velocidad del avión: no se puede mantener la derrota.'); P4.anadir = true; solucionRumbo(); P4.anadir = false; }
      else fbRumbo('warn', 'Sí se puede', 'Aquí ' + (barca ? '<i>v</i><sub>B/R</sub> &gt; <i>v</i><sub>R/E</sub>' : 'el avión es más rápido que la componente lateral del viento') + ': existe un rumbo. Inténtalo.');
      return;
    }
    const v = parseFloat($('#c4-resp', P4.pan).value.trim().replace(',', '.'));
    if (!isFinite(v)) { fbRumbo('warn', 'Falta la respuesta', 'Escribe un ángulo en grados.'); return; }
    if (!sol.posible) { fbRumbo('warn', 'No existe ese rumbo', barca ? 'Con <i>v</i><sub>B/R</sub> ≤ <i>v</i><sub>R/E</sub> no hay rumbo para cruzar recto: pulsa «No se puede».' : 'Con ese viento no se puede mantener la derrota: pulsa «No se puede».'); return; }
    const d0 = barca ? v - sol.valor : difAng(v, sol.valor);
    if (Math.abs(d0) <= 1) { fbRumbo('ex', 'Correcto', 'El rumbo es ' + fmt(barca ? sol.valor : sol.valor) + '°. Mira el cruce.'); aplicarRumbo(sol.valor); return; }
    const dTan = barca ? v - sol.tan : difAng(v, sol.tan);
    if (Math.abs(dTan) <= 1) { fbRumbo('warn', 'Has usado la tangente', 'El lado conocido ' + (barca ? '<i>v</i><sub>B/R</sub>' : '<i>v</i><sub>P/A</sub>') + ' es la <b>hipotenusa</b> del triángulo, así que es arcsen, no arctan (U Ej. 3.15).'); return; }
    const dEsp = barca ? v - sol.espejo : difAng(v, sol.espejo);
    if (Math.abs(dEsp) <= 1) { fbRumbo('warn', 'Sentido contrario', barca ? 'Ese rumbo es aguas abajo: hay que apuntar contra la corriente (β positivo).' : 'Ese rumbo va a favor del viento: hay que apuntar la proa hacia el lado del que viene el viento.'); return; }
    fbRumbo('warn', 'No es ese', 'Dibuja el triángulo de velocidades: la velocidad resultante debe apuntar ' + (barca ? 'perpendicular a la orilla' : 'al norte') + ' y la del ' + (barca ? 'agua' : 'viento') + ' es un cateto.');
  }
  function solucionRumbo() {
    const p = App.porPestana[4].params, barca = p.escenario === 'barca';
    const sol = solucionP4();
    if (sol.posible) {
      fbRumbo('tip', 'Solución', barca
        ? 'sen β = v<sub>R/E</sub>/v<sub>B/R</sub> = ' + p.vRE.toFixed(1) + '/' + p.vBR.toFixed(1) + ' ⇒ β = <b>' + fmt(sol.valor) + '°</b> aguas arriba.'
        : 'Rumbo de la proa = <b>' + fmt(sol.valor) + '°</b> (v<sub>P/E</sub> = ' + fmt(sol.r.vPE) + ' km/h hacia el norte).');
      aplicarRumbo(sol.valor);
    } else if (barca) {
      const md = sol.minima;
      fbRumbo('tip', 'Solución', 'No se puede cruzar recto. El rumbo de <b>mínima deriva</b> es sen β = v<sub>B/R</sub>/v<sub>R/E</sub> ⇒ β = <b>' + fmt(md.betaDeg) + '°</b>, con deriva ' + fmt(md.deriva) + ' m.');
      aplicarRumbo(md.betaDeg);
    } else {
      fbRumbo('tip', 'Solución', 'Con ese viento no se puede mantener la derrota hacia el norte: la componente del viento perpendicular a la derrota supera v<sub>P/A</sub>.');
    }
  }
  function aplicarRumbo(valor) {
    const S = App.porPestana[4], p = S.params;
    if (p.escenario === 'barca') { p.betaDeg = valor; App.ctl[4].beta.sync(); }
    else { p.rumboDeg = ((valor % 360) + 360) % 360; App.ctl[4].rumbo.sync(); }
    cambio(4, 'rumbo');
    if (App.pestana === 4) reproducir();
  }

  /* ---------------------------------------------------------------- pestañas */
  const tabs = () => Array.from(d.querySelectorAll('[role=tab]'));
  function activar(n, foco) {
    const prev = App.pestana;
    if (prev !== n) { parar(App.porPestana[prev], false); }
    App.pestana = n;
    tabs().forEach((t, i) => {
      const sel = i + 1 === n;
      t.setAttribute('aria-selected', sel ? 'true' : 'false');
      t.tabIndex = sel ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).hidden = !sel;
    });
    if (foco) tabs()[n - 1].focus();
    $('#p' + n + ' .slot').appendChild($('#escenario'));
    try { history.replaceState(null, '', '#p' + n); } catch (e) { /* file:// u otros */ }
    $('#b-t-lab').innerHTML = '<i>t</i>' + (n === 4 && App.porPestana[4].params.escenario === 'avion' ? ' (min)' : '');
    medir();
    calcularEscalas(n);
    actualizarAvisos(n);
    describirLienzo();
    App.ultimoFx = 0;
    pedirDibujo();
  }
  function iniciarTabs() {
    tabs().forEach((t, i) => {
      t.addEventListener('click', () => activar(i + 1, false));
      t.addEventListener('keydown', (e) => {
        let k = null;
        if (e.key === 'ArrowRight') k = App.pestana % 4 + 1;
        else if (e.key === 'ArrowLeft') k = (App.pestana + 2) % 4 + 1;
        else if (e.key === 'Home') k = 1;
        else if (e.key === 'End') k = 4;
        if (k) { e.preventDefault(); activar(k, true); }
      });
    });
  }

  /* ---------------------------------------------------------------- lienzo, tamaño y paleta */
  function medir() {
    const caja = $('.lienzo-caja');
    const w = Math.round(caja.clientWidth);
    if (!w) return;
    const h = RN.Lienzo.altoPara(w);
    if (w === App.w && h === App.h && App.ctx) return;
    App.w = w; App.h = h;
    App.ctx = RN.Lienzo.ajustar($('#lienzo'), w, h);
    calcularEscalas(App.pestana);
  }
  function leerPaleta() { if (!App.imprimiendo) { App.paleta = RN.Paleta.leer(); pedirDibujo(); } }

  function reglasImpresion(color) {
    const sel = color ? 'html.print-color' : ':root:not(.print-color)';
    const out = {};
    try {
      for (const sh of Array.from(d.styleSheets)) {
        let reglas; try { reglas = sh.cssRules; } catch (e) { continue; }
        for (const r of Array.from(reglas || [])) {
          if (!r.media || !/print/.test(r.media.mediaText)) continue;
          for (const q of Array.from(r.cssRules || [])) {
            if (q.selectorText && q.selectorText.indexOf(sel) >= 0 && q.style && q.style.getPropertyValue('--fg')) {
              for (let i = 0; i < q.style.length; i++) {
                const k = q.style[i];
                if (k.indexOf('--') === 0) out[k] = q.style.getPropertyValue(k).trim();
              }
            }
          }
        }
      }
    } catch (e) { return null; }
    return Object.keys(out).length ? out : null;
  }
  function paletaImpresion() {
    const r = d.documentElement, prev = r.getAttribute('data-theme');
    r.setAttribute('data-theme', 'light');
    const base = RN.Paleta.leer();
    if (prev === null) r.removeAttribute('data-theme'); else r.setAttribute('data-theme', prev);
    const v = reglasImpresion(r.classList.contains('print-color'));
    if (v) {
      const mapa = { bg: '--bg', fg: '--fg', mut: '--mut', card: '--card', bd: '--bd', acc: '--acc', A: '--A', X: '--X', E: '--E', P: '--P',
        thm: '--thm', thmB: '--thm-b', warnB: '--warn-b', intu: '--intu', intuB: '--intu-b' };
      for (const k in mapa) if (v[mapa[k]]) base[k] = v[mapa[k]];
    }
    return base;
  }
  function antesDeImprimir() {
    App.imprimiendo = true;
    d.querySelectorAll('details.sim-fx').forEach((x) => { x.open = true; });
    const S = actual(); parar(S, false);
    App.paleta = paletaImpresion();
    actualizarTextos(false);
    dibujar();
    try { $('#lienzo-print').src = $('#lienzo').toDataURL('image/png'); } catch (e) { /* lienzo no exportable */ }
    $('#lienzo-print').alt = $('#lienzo').getAttribute('aria-label');
  }
  function despuesDeImprimir() {
    App.imprimiendo = false;
    $('#lienzo-print').removeAttribute('src');
    App.paleta = RN.Paleta.leer();
    dibujar();
  }

  /* ---------------------------------------------------------------- teclado global */
  function teclado(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target, tag = (t.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'select' || tag === 'textarea' || t.isContentEditable) return;
    const esTab = t.getAttribute && t.getAttribute('role') === 'tab';
    if (e.key === ' ' || e.code === 'Space') {
      if ((tag === 'button' && !esTab) || tag === 'summary' || tag === 'a') return;
      e.preventDefault(); alternar();
    } else if (e.key === 'r' || e.key === 'R') { reiniciar(); }
    else if (e.key === ',') { paso(-1); }
    else if (e.key === '.') { paso(1); }
  }

  /* ---------------------------------------------------------------- inicio */
  function iniciar() {
    App.paleta = RN.Paleta.leer();
    [1, 2, 3, 4].forEach((n) => { precalcular(n); App.paneles[n] = FX.Panel($('#fx-p' + n)); });
    controlesP1(); controlesP2(); controlesP3(); controlesP4();
    renderTex(d.querySelector('main'));
    iniciarBarra(); iniciarTabs();
    d.querySelectorAll('.fx-errores .src').forEach((s) => { s.tabIndex = 0; s.setAttribute('aria-label', s.dataset.ref); });
    window.addEventListener('pointerup', () => { App.arrastrando = false; });
    window.addEventListener('pointercancel', () => { App.arrastrando = false; });
    d.addEventListener('keydown', teclado);
    d.addEventListener('visibilitychange', () => { if (d.hidden) { parar(actual(), false); pedirDibujo(); } });
    new MutationObserver(leerPaleta).observe(d.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const mqDark = matchMedia('(prefers-color-scheme: dark)');
    (mqDark.addEventListener ? mqDark.addEventListener('change', leerPaleta) : mqDark.addListener(leerPaleta));
    const onReduce = () => { reduce = mqReduce.matches; };
    (mqReduce.addEventListener ? mqReduce.addEventListener('change', onReduce) : mqReduce.addListener(onReduce));
    window.addEventListener('beforeprint', antesDeImprimir);
    window.addEventListener('afterprint', despuesDeImprimir);
    if ('ResizeObserver' in window) new ResizeObserver(() => { const w0 = App.w; medir(); if (App.w !== w0) pedirDibujo(); }).observe($('.lienzo-caja'));
    else window.addEventListener('resize', () => { medir(); pedirDibujo(); });
    window.addEventListener('hashchange', () => { const m = /^#p([1-4])$/.exec(location.hash); if (m && +m[1] !== App.pestana) activar(+m[1], false); });
    const m = /^#p([1-4])$/.exec(location.hash);
    activar(m ? +m[1] : 1, false);
    [1, 2, 3, 4].forEach(actualizarAvisos);
    // #p2 apunta a un tabpanel: evitar que el navegador salte por debajo de la cabecera al cargar
    if (m) { window.scrollTo(0, 0); window.addEventListener('load', () => setTimeout(() => window.scrollTo(0, 0), 0), { once: true }); }
  }

  SIM.ui = { App, crearReto, activar, reproducir, pausar, reiniciar, _tick: tick }; // _tick: solo para pruebas
  raiz.SIM3 = SIM;
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})(typeof window !== 'undefined' ? window : globalThis);
