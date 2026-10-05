/* Núcleo físico de la simulación del Tema 3 (puro, sin DOM).
   Unidades SI; ángulos públicos en grados (sufijo Deg). Ver ESPECIFICACION_sim_tema03.md §3 y §8. */
(function (raiz) {
  'use strict';

  const RAD = Math.PI / 180;
  const DEG = 180 / Math.PI;
  const G = { tierra: 9.80, luna: 1.62, marte: 3.71 };
  const DT = 1 / 120;

  /* ---------- 3.2 Utilidades vectoriales ---------- */
  const suma = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
  const resta = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
  const escala = (a, k) => ({ x: a.x * k, y: a.y * k });
  const modulo = (a) => Math.hypot(a.x, a.y);
  const dot = (a, b) => a.x * b.x + a.y * b.y;
  const cruz = (a, b) => a.x * b.y - a.y * b.x;
  const anguloDeg = (a) => Math.atan2(a.y, a.x) * DEG;
  const desdeAnguloDeg = (mod, angDeg) => ({ x: mod * Math.cos(angDeg * RAD), y: mod * Math.sin(angDeg * RAD) });

  function descomponerAceleracion(v, a) {
    const vm = modulo(v);
    if (vm < 1e-9) {
      return { aPar: 0, aPerp: modulo(a), aParVec: { x: 0, y: 0 }, aPerpVec: { x: a.x, y: a.y }, vNula: true };
    }
    const aPar = dot(a, v) / vm;
    const aPerp = Math.abs(cruz(a, v)) / vm;
    const aParVec = escala(v, aPar / vm);
    return { aPar, aPerp, aParVec, aPerpVec: resta(a, aParVec), vNula: false };
  }

  /* ---------- 3.3 Pestaña 1: trayectorias ---------- */
  const V0P = 10, A0P = 60 * RAD, GP = 9.80;
  const tvParabola = 2 * V0P * Math.sin(A0P) / GP;
  const RC = 2.0, TC = 4.0, WC = 2 * Math.PI / TC;
  const AL = 3.0, BL = 2.0, WL = 1.0;
  const R0E = 0.5, BE = 0.5, WE = 1.0;

  const trayectorias = {
    parabola: {
      id: 'parabola', nombre: 'Parábola (proyectil)', tMax: tvParabola,
      r: (t) => ({ x: V0P * Math.cos(A0P) * t, y: V0P * Math.sin(A0P) * t - 0.5 * GP * t * t }),
      v: (t) => ({ x: V0P * Math.cos(A0P), y: V0P * Math.sin(A0P) - GP * t }),
      a: () => ({ x: 0, y: -GP }),
      ecuacionTex: 'x=(v_0\\cos\\alpha_0)\\,t,\\quad y=(v_0\\sin\\alpha_0)\\,t-\\tfrac12 g t^2\\quad(v_0=10\\ \\text{m/s},\\ \\alpha_0=60^\\circ)',
      src: { l: 'U', ref: 'U §3.3 ec. (3.19)-(3.20), p. 76' }
    },
    circulo: {
      id: 'circulo', nombre: 'Círculo (uniforme)', tMax: 8,
      r: (t) => ({ x: RC * Math.cos(WC * t), y: RC * Math.sin(WC * t) }),
      v: (t) => ({ x: -RC * WC * Math.sin(WC * t), y: RC * WC * Math.cos(WC * t) }),
      a: (t) => ({ x: -RC * WC * WC * Math.cos(WC * t), y: -RC * WC * WC * Math.sin(WC * t) }),
      ecuacionTex: 'x=R\\cos\\dfrac{2\\pi t}{T},\\quad y=R\\sin\\dfrac{2\\pi t}{T}\\quad(R=2.0\\ \\text{m},\\ T=4.0\\ \\text{s})',
      src: { l: 'U', ref: 'U §3.4 ec. (3.27)-(3.29), p. 83-84' }
    },
    lissajous: {
      id: 'lissajous', nombre: 'Lissajous', tMax: 2 * Math.PI,
      r: (t) => ({ x: AL * Math.sin(WL * t), y: BL * Math.sin(2 * WL * t) }),
      v: (t) => ({ x: AL * WL * Math.cos(WL * t), y: 2 * BL * WL * Math.cos(2 * WL * t) }),
      a: (t) => ({ x: -AL * WL * WL * Math.sin(WL * t), y: -4 * BL * WL * WL * Math.sin(2 * WL * t) }),
      ecuacionTex: 'x=A\\sin\\omega t,\\quad y=B\\sin 2\\omega t\\quad(A=3.0\\ \\text{m},\\ B=2.0\\ \\text{m},\\ \\omega=1.0\\ \\text{rad/s})',
      src: { l: 'P', ref: 'Desarrollo propio a partir de U §3.1-3.2 (curva de Lissajous)' }
    },
    espiral: {
      id: 'espiral', nombre: 'Espiral', tMax: 4 * Math.PI,
      r: (t) => {
        const r = R0E + BE * t, th = WE * t;
        return { x: r * Math.cos(th), y: r * Math.sin(th) };
      },
      v: (t) => {
        const r = R0E + BE * t, th = WE * t;
        return { x: BE * Math.cos(th) - r * WE * Math.sin(th), y: BE * Math.sin(th) + r * WE * Math.cos(th) };
      },
      a: (t) => {
        const r = R0E + BE * t, th = WE * t;
        return {
          x: -2 * BE * WE * Math.sin(th) - r * WE * WE * Math.cos(th),
          y: 2 * BE * WE * Math.cos(th) - r * WE * WE * Math.sin(th)
        };
      },
      ecuacionTex: 'r=r_0+bt,\\ \\theta=\\omega t:\\ x=r\\cos\\theta,\\ y=r\\sin\\theta\\quad(r_0=0.5\\ \\text{m},\\ b=0.5\\ \\text{m/s},\\ \\omega=1.0\\ \\text{rad/s})',
      src: { l: 'P', ref: 'Desarrollo propio a partir de U §3.1-3.2 (espiral)' }
    },
    robot: {
      id: 'robot', nombre: 'Vehículo robot (Ej. 3.1)', tMax: 4,
      r: (t) => ({ x: 2.0 - 0.25 * t * t, y: 1.0 * t + 0.025 * t * t * t }),
      v: (t) => ({ x: -0.5 * t, y: 1.0 + 0.075 * t * t }),
      a: (t) => ({ x: -0.5, y: 0.15 * t }),
      ecuacionTex: 'x=2.0-0.25\\,t^2,\\quad y=1.0\\,t+0.025\\,t^3\\quad(\\text{SI})',
      src: { l: 'U', ref: 'U Ejemplos 3.1-3.3, p. 69-74' }
    }
  };

  function velocidadMedia(tray, t, dt) {
    const T = typeof tray === 'string' ? trayectorias[tray] : tray;
    let haciaAtras = false, t1 = t, t2 = t + dt;
    if (t + dt > T.tMax + 1e-12) { haciaAtras = true; t1 = t - dt; t2 = t; }
    const r1 = T.r(t1), r2 = T.r(t2);
    const dr = resta(r2, r1);
    return { r1, r2, dr, vmed: escala(dr, 1 / dt), t1, t2, haciaAtras };
  }

  /* ---------- 3.4 Pestaña 2: proyectil ---------- */
  function calcular(v0x, v0y, y0, g) {
    const tieneVertice = v0y > 0;
    const t1 = tieneVertice ? v0y / g : 0;
    const yMax = tieneVertice ? y0 + v0y * v0y / (2 * g) : y0;
    let tv, sinVuelo = false;
    if (y0 === 0 && v0y <= 0) { tv = 0; sinVuelo = true; }
    else tv = (v0y + Math.sqrt(v0y * v0y + 2 * g * y0)) / g;
    return { tieneVertice, t1, yMax, tv, R: v0x * tv, sinVuelo };
  }

  function proyectil(params) {
    const v0 = params.v0, alfa0Deg = params.alfa0Deg, g = params.g;
    const y0 = params.y0 || 0;
    const v0x = v0 * Math.cos(alfa0Deg * RAD);
    const v0y = v0 * Math.sin(alfa0Deg * RAD);
    const c = calcular(v0x, v0y, y0, g);
    const { tieneVertice, t1, yMax, tv, sinVuelo, R } = c;
    const simetrico = (y0 === 0);
    const Rformula = simetrico ? v0 * v0 * Math.sin(2 * alfa0Deg * RAD) / g : null;
    const hFormula = simetrico ? v0 * v0 * Math.pow(Math.sin(alfa0Deg * RAD), 2) / (2 * g) : null;

    function fase(t) {
      const tt = Math.min(Math.max(t, 0), tv);
      if (tt === 0) return 'inicio';
      if (tt >= tv) return 'impacto';
      if (tieneVertice && Math.abs(tt - t1) <= 0.02 * tv) return 'vertice';
      return (v0y - g * tt) > 0 ? 'subida' : 'bajada';
    }

    function estado(t) {
      const tt = Math.min(Math.max(t, 0), tv);
      const x = v0x * tt;
      const y = y0 + v0y * tt - 0.5 * g * tt * tt;
      const vx = v0x, vy = v0y - g * tt;
      const vv = { x: vx, y: vy };
      const dc = descomponerAceleracion(vv, { x: 0, y: -g });
      return {
        t: tt, x, y, vx, vy, v: Math.hypot(vx, vy), angDeg: Math.atan2(vy, vx) * DEG,
        ax: 0, ay: -g, aPar: dc.aPar, aPerp: dc.aPerp, fase: fase(tt)
      };
    }

    const imp = estado(tv);
    const impacto = { vx: imp.vx, vy: imp.vy, v: imp.v, angDeg: imp.angDeg };

    function trayectoria(n) {
      n = n || 200;
      const pts = [];
      for (let i = 0; i <= n; i++) {
        const t = tv * i / n;
        pts.push({ t, x: v0x * t, y: y0 + v0y * t - 0.5 * g * t * t });
      }
      return pts;
    }

    function estroboscopio() {
      if (tv <= 0) { const r0 = [0]; r0.dt = 0.05; return r0; }
      const cand = [0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 5];
      const cuenta = (d) => Math.floor(tv / d + 1e-9) + 1;
      let dte = cand.find((d) => { const n = cuenta(d); return n >= 8 && n <= 20; });
      if (dte === undefined) {
        dte = cand.reduce((m, d) => (Math.abs(cuenta(d) - 12) < Math.abs(cuenta(m) - 12) ? d : m), cand[0]);
      }
      const n = cuenta(dte);
      const out = [];
      for (let k = 0; k < n; k++) out.push(k * dte);
      out.dt = dte;
      return out;
    }

    return {
      v0, alfa0Deg, y0, g, v0x, v0y, t1, tieneVertice, yMax, tv, R, sinVuelo,
      simetrico, Rformula, hFormula, impacto, estado, fase, trayectoria, estroboscopio
    };
  }

  function alcanceMaximo(p) {
    const y0 = p.y0 || 0;
    const s = Math.sqrt(p.v0 * p.v0 + 2 * p.g * y0);
    return { alfaDeg: Math.atan(p.v0 / s) * DEG, R: p.v0 * s / p.g };
  }

  function alcanceDe(v0, alfaDeg, y0, g) {
    const c = calcular(v0 * Math.cos(alfaDeg * RAD), v0 * Math.sin(alfaDeg * RAD), y0, g);
    return c.R;
  }

  function angulosParaDiana(p) {
    const v0 = p.v0, g = p.g, D = p.D, y0 = p.y0 || 0;
    const max = alcanceMaximo({ v0, y0, g });
    if (D > max.R + 1e-12) return [];
    const f = (a) => alcanceDe(v0, a, y0, g) - D;
    const LO = -89.9, HI = 89.9, tol = 1e-6;
    const res = [];
    const aStar = max.alfaDeg;
    // Rama creciente [LO, α*]
    if (f(LO) <= 0) {
      let a = LO, b = aStar;
      while (b - a > tol) { const m = (a + b) / 2; if (f(m) < 0) a = m; else b = m; }
      res.push((a + b) / 2);
    }
    // Rama decreciente [α*, HI]
    if (f(HI) <= 0) {
      let a = aStar, b = HI;
      while (b - a > tol) { const m = (a + b) / 2; if (f(m) > 0) a = m; else b = m; }
      res.push((a + b) / 2);
    }
    res.sort((x, y) => x - y);
    if (res.length === 2 && Math.abs(res[1] - res[0]) < 1e-4) res.pop();
    return res;
  }

  /* ---------- 3.5 Pestaña 3: circular ---------- */
  function circular(p) {
    const modo = p.modo || 'uniforme';
    const R = p.R;
    const uniforme = modo === 'uniforme';
    let vU = 0, omegaU = 0, aRadU = 0, tStop = Infinity;
    if (uniforme) {
      vU = 2 * Math.PI * R / p.T;
      omegaU = 2 * Math.PI / p.T;
      aRadU = vU * vU / R;
    } else {
      if (p.aTan < 0 && p.v0 > 0) tStop = p.v0 / Math.abs(p.aTan);
      else if (p.v0 <= 0 && p.aTan <= 0) tStop = 0;
    }
    const sDe = (t) => p.v0 * t + 0.5 * p.aTan * t * t;

    function estado(t) {
      let v, s, aTan, detenido = false;
      if (uniforme) {
        v = vU; s = vU * t; aTan = 0;
      } else if (t >= tStop) {
        v = 0; aTan = 0; s = sDe(tStop); detenido = true;
      } else {
        v = p.v0 + p.aTan * t; s = sDe(t); aTan = p.aTan;
      }
      const theta = s / R;
      const thetaDeg = (((theta * DEG) % 360) + 360) % 360;
      const c = Math.cos(theta), sn = Math.sin(theta);
      const aRad = v * v / R;
      const a = Math.sqrt(aRad * aRad + aTan * aTan);
      const aRadVec = { x: -aRad * c, y: -aRad * sn };
      const aTanVec = { x: -aTan * sn, y: aTan * c };
      return {
        t, s, theta, thetaDeg,
        pos: { x: R * c, y: R * sn },
        v, vVec: { x: -v * sn, y: v * c },
        omega: v / R, aRad, aTan, a,
        aVec: suma(aRadVec, aTanVec), aRadVec, aTanVec,
        vueltas: theta / (2 * Math.PI), detenido
      };
    }
    return { modo, R, T: p.T, v0: p.v0, aTan: p.aTan, v: vU, omega: omegaU, aRad: aRadU, tStop, estado };
  }

  const aRadDesde = (p) => p.v * p.v / p.R;
  const radioDesde = (p) => p.v * p.v / p.aRad;

  /* ---------- 3.6 Integrador de verificación ---------- */
  function integrarSemiImplicito(estado0, aceleracionFn, dt, tFinal) {
    let x = estado0.x, y = estado0.y, vx = estado0.vx, vy = estado0.vy, t = 0;
    const n = Math.floor(tFinal / dt + 1e-9);
    const paso = (h) => {
      const a = aceleracionFn({ t, x, y, vx, vy }, t);
      const ax = a.x !== undefined ? a.x : a.ax, ay = a.y !== undefined ? a.y : a.ay;
      vx += ax * h; vy += ay * h;
      x += vx * h; y += vy * h;
      t += h;
    };
    for (let i = 0; i < n; i++) paso(dt);
    const resto = tFinal - t;
    if (resto > 1e-12) paso(resto);
    return { t, x, y, vx, vy };
  }

  /* ---------- 3.7 Pestaña 4: velocidad relativa ---------- */
  function barca(p) {
    const b = p.betaDeg * RAD;
    const vBRvec = { x: -p.vBR * Math.sin(b), y: p.vBR * Math.cos(b) };
    const vREvec = { x: p.vRE, y: 0 };
    const vBEvec = suma(vBRvec, vREvec);
    const vBE = modulo(vBEvec);
    const desviacionDeg = Math.atan2(vBEvec.x, vBEvec.y) * DEG;
    const tCruce = vBEvec.y > 1e-9 ? p.d / vBEvec.y : Infinity;
    const deriva = isFinite(tCruce) ? vBEvec.x * tCruce : (vBEvec.x > 1e-9 ? Infinity : (vBEvec.x < -1e-9 ? -Infinity : 0));
    // posición respecto al punto de salida (0,0); se detiene al llegar a la otra orilla
    function posicion(t) {
      const tt = isFinite(tCruce) ? Math.min(Math.max(t, 0), tCruce) : Math.max(t, 0);
      return { x: vBEvec.x * tt, y: vBEvec.y * tt };
    }
    return { vBRvec, vREvec, vBEvec, vBE, desviacionDeg, tCruce, deriva, posicion };
  }

  function rumboRecto(p) {
    if (p.vBR <= p.vRE) return null;
    const out = {
      betaDeg: Math.asin(p.vRE / p.vBR) * DEG,
      vBE: Math.sqrt(p.vBR * p.vBR - p.vRE * p.vRE)
    };
    if (p.d !== undefined) { out.tCruce = p.d / out.vBE; out.deriva = 0; }
    return out;
  }

  function rumboMinimaDeriva(p) {
    if (p.vBR > p.vRE) {
      const r = rumboRecto(p);
      r.deriva = 0; r.derivaPorAncho = 0; r.recto = true;
      if (p.d !== undefined) { r.tCruce = p.d / r.vBE; }
      return r;
    }
    const betaDeg = Math.asin(p.vBR / p.vRE) * DEG;
    const b = barca({ vBR: p.vBR, vRE: p.vRE, betaDeg, d: p.d !== undefined ? p.d : 1 });
    const out = {
      betaDeg, vBE: b.vBE, recto: false,
      derivaPorAncho: b.vBEvec.x / b.vBEvec.y // m de deriva por m de anchura
    };
    if (p.d !== undefined) { out.tCruce = b.tCruce; out.deriva = b.deriva; }
    return out;
  }

  const rumboGeo = (v) => ((Math.atan2(v.x, v.y) * DEG) + 360) % 360;
  const vecGeo = (mod, rumboDeg) => ({ x: mod * Math.sin(rumboDeg * RAD), y: mod * Math.cos(rumboDeg * RAD) });

  function avion(p) {
    const vPAvec = vecGeo(p.vPA, p.rumboDeg);
    const vAEvec = vecGeo(p.vAE, p.vientoHaciaDeg);
    const vPEvec = suma(vPAvec, vAEvec);
    return { vPAvec, vAEvec, vPEvec, vPE: modulo(vPEvec), rumboSueloDeg: rumboGeo(vPEvec) };
  }

  function rumboParaDerrota(p) {
    const u = vecGeo(1, p.derrotaDeg);
    const w = vecGeo(p.vAE, p.vientoHaciaDeg);
    const wPar = dot(w, u);
    const wPerp = resta(w, escala(u, wPar));
    const wPerpMod = modulo(wPerp);
    if (wPerpMod > p.vPA) return null;
    const pPar = Math.sqrt(p.vPA * p.vPA - wPerpMod * wPerpMod);
    const pVec = suma(escala(u, pPar), escala(wPerp, -1));
    const vPE = pPar + wPar;
    if (vPE <= 0) return null;
    return { rumboDeg: rumboGeo(pVec), vPE, vPEvec: escala(u, vPE), vPAvec: pVec };
  }

  /* ---------- 3.8 Diagnóstico de errores del reto ---------- */
  const NOMBRE_PLANETA = (g) => (Math.abs(g - G.luna) < 1e-6 ? 'la Luna' : Math.abs(g - G.marte) < 1e-6 ? 'Marte' : 'otro cuerpo');

  function diagnosticar(arg) {
    const pregunta = arg.pregunta, resp = arg.respuesta, p = arg.params;
    const y0 = p.y0 || 0, g = p.g, v0 = p.v0;
    const a = p.alfa0Deg * RAD;
    const pr = proyectil({ v0, alfa0Deg: p.alfa0Deg, y0, g });
    const correctos = { R: pr.R, yMax: pr.yMax, tv: pr.tv, vImpacto: pr.impacto.v };
    const valorCorrecto = correctos[pregunta];
    const tolOK = Math.max(0.02 * Math.abs(valorCorrecto), 0.05);
    if (Math.abs(resp - valorCorrecto) <= tolOK) {
      return { correcto: true, valorCorrecto, codigo: 'OK', mensaje: 'Correcto.' };
    }

    const cands = [];
    const add = (codigo, valor, mensaje) => {
      if (typeof valor === 'number' && isFinite(valor)) cands.push({ codigo, valor, mensaje });
    };
    const generico = (v0y, v0x) => {
      // fórmulas «de examen» evaluadas con v0x, v0y dados (sin condiciones de vértice)
      const tvx = y0 === 0 ? 2 * v0y / g : (v0y + Math.sqrt(v0y * v0y + 2 * g * y0)) / g;
      return { tv: tvx, R: v0x * tvx, yMax: y0 + v0y * v0y / (2 * g) };
    };

    // RAD
    if (pregunta === 'R' || pregunta === 'yMax' || pregunta === 'tv') {
      const ar = p.alfa0Deg; // el número de grados leído como radianes
      let val;
      if (pregunta === 'R') {
        val = y0 === 0 ? v0 * v0 * Math.sin(2 * ar) / g : generico(v0 * Math.sin(ar), v0 * Math.cos(ar)).R;
      } else if (pregunta === 'yMax') {
        val = generico(v0 * Math.sin(ar), v0 * Math.cos(ar)).yMax;
      } else {
        val = generico(v0 * Math.sin(ar), v0 * Math.cos(ar)).tv;
      }
      if (pregunta !== 'yMax' && !(val > 0)) val = NaN;
      add('RAD', val, 'Tu calculadora está en RAD: pon DEG (los ángulos del enunciado están en grados).');
    }
    // SIM
    if (y0 > 0) {
      if (pregunta === 'R') add('SIM', v0 * v0 * Math.sin(2 * a) / g, 'R = v0² sen 2α0 / g solo vale si sale y llega a la misma altura (U, CUIDADO p. 80). Resuelve y(t) = 0 (Ej. 3.9).');
      if (pregunta === 'tv') add('SIM', 2 * v0 * Math.sin(a) / g, 'El tiempo 2 v0 sen α0 / g solo vale si sale y llega a la misma altura (U, CUIDADO p. 80). Resuelve y(t) = 0 (Ej. 3.9).');
      if (pregunta === 'yMax') add('SIM', v0 * v0 * Math.pow(Math.sin(a), 2) / (2 * g), 'Falta sumar la altura de salida: y<sub>max</sub> = y0 + v0y² / 2g.');
    }
    // T1
    if ((pregunta === 'tv' || pregunta === 'R') && pr.tieneVertice) {
      add('T1', pregunta === 'tv' ? pr.t1 : pr.v0x * pr.t1, 'v<sub>y</sub> = 0 es el vértice, no el suelo: el tiempo de vuelo es mayor que el de subida.');
    }
    // SEN
    if (pregunta === 'R' && y0 === 0) add('SEN', v0 * v0 * Math.sin(a) / g, 'El alcance lleva sen 2α0, no sen α0.');
    // SINCOS
    if (pregunta === 'yMax' || pregunta === 'tv' || (pregunta === 'R' && y0 > 0)) {
      const c = calcular(v0 * Math.sin(a), v0 * Math.cos(a), y0, g);
      const val = pregunta === 'R' ? c.R : pregunta === 'tv' ? c.tv : c.yMax;
      add('SINCOS', val, 'v0y = v0 sen α0 y v0x = v0 cos α0, con α0 medido desde la horizontal.');
    }
    // DOS
    if (pregunta === 'yMax') add('DOS', y0 + pr.v0y * pr.v0y / g, 'Falta el 2 de 2g: h = v0y² / (2g).');
    // V0Y
    if (pregunta === 'yMax') add('V0Y', y0 + v0 * v0 / (2 * g), 'En el vértice solo se anula v<sub>y</sub>; v<sub>x</sub> sigue valiendo v0 cos α0.');
    // GT
    if (Math.abs(g - G.tierra) > 1e-9) {
      const pt = proyectil({ v0, alfa0Deg: p.alfa0Deg, y0, g: G.tierra });
      const valT = { R: pt.R, yMax: pt.yMax, tv: pt.tv, vImpacto: pt.impacto.v }[pregunta];
      add('GT', valT, 'Estás en ' + NOMBRE_PLANETA(g) + ': g = ' + g.toFixed(2) + ' m/s², no 9.80.');
    }
    // VIMP
    if (pregunta === 'vImpacto') {
      if (y0 > 0) add('VIMP', v0, 'v = √(v<sub>x</sub>² + v<sub>y</sub>²) (ec. 3.24): con altura de salida la rapidez de llegada no es v0, y v<sub>x</sub> no cambia.');
      add('VIMP', Math.abs(pr.impacto.vy), 'v = √(v<sub>x</sub>² + v<sub>y</sub>²) (ec. 3.24): v<sub>x</sub> no cambia y hay que sumarlo.');
    }

    for (const c of cands) {
      const encaja = Math.abs(resp - c.valor) <= Math.max(0.015 * Math.abs(c.valor), 0.05);
      const igualCorrecto = Math.abs(c.valor - valorCorrecto) <= Math.max(0.015 * Math.abs(c.valor), 0.05);
      if (encaja && !igualCorrecto) {
        return { correcto: false, valorCorrecto, codigo: c.codigo, mensaje: c.mensaje };
      }
    }
    return {
      correcto: false, valorCorrecto, codigo: 'OTRO',
      mensaje: 'Receta: descompón v0 en v0x y v0y; resuelve y(t) = 0 para el tiempo de vuelo; después x(t_v) da el alcance.'
    };
  }

  const API = {
    G, DT,
    suma, resta, escala, modulo, dot, cruz, anguloDeg, desdeAnguloDeg, descomponerAceleracion,
    trayectorias, velocidadMedia,
    proyectil, alcanceMaximo, angulosParaDiana,
    circular, aRadDesde, radioDesde,
    integrarSemiImplicito,
    barca, rumboRecto, rumboMinimaDeriva, avion, rumboParaDerrota,
    diagnosticar
  };

  if (typeof module === 'object' && module.exports) module.exports = API;
  else (raiz.SIM3 = raiz.SIM3 || {}).fisica = API;
})(typeof window !== 'undefined' ? window : globalThis);
