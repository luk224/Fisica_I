/* Simulación Tema 3 — render sobre canvas 2D (sin estado propio, sin leer el DOM de controles).
 *
 * API (SIM3.render):
 *   Paleta.leer()                      colores de resumen.css ya resueltos (getComputedStyle)
 *   Camara                              mundo <-> pantalla, misma escala en x e y, y hacia arriba
 *   Lienzo.ajustar(canvas, w, h)        HiDPI (dpr máx. 2); devuelve ctx con transform en px CSS
 *   Lienzo.altoPara(ancho)              clamp(240, ancho*0.62, 70vh)
 *   preparar(escena, w, h)              -> { cam, escalas }  (encuadre y escalas de vectores)
 *   escalas(escena, w, h)               -> { kV, kA } en px por (m/s) y px por (m/s^2); la UI puede fijarlas
 *                                          en escena.escalas al cambiar parámetros (si no, se calculan aquí)
 *   dibujar(ctx, escena, paleta, w, h)  limpia y dibuja la pestaña escena.pestana (1..4)
 *   dibujarPestana1..4(ctx, cam, escena, paleta)
 *   primitivas: ejes, vector, etiqueta, polilinea, punto, marcador, textoConHalo, trianguloVectores
 *
 * Contrato `escena` (§6.2; campos concretados por el render, todo en SI salvo avión en km/h y km):
 *  P1: params {tray (de fisica.trayectorias: r(t) v(t) a(t) tMax id), dt},
 *      estado {t, r, v, a, aPar, aPerp, aParVec, aPerpVec, vNula},
 *      precalc {vmed:{r1,r2,dr,vmed,haciaAtras}}, opciones {r,v,a,comp,vmed,estela}, traza [{x,y}]
 *  P2: params {v0, alfa0Deg, y0, g}, precalc (objeto de proyectil(): v0x,v0y,t1,tieneVertice,yMax,tv,R,
 *      estado(t), trayectoria(n), estroboscopio()), estado, fase, opciones {teorica,estrobo,vectores,
 *      aceleracion,marcadores,fantasmas}, traza, estrobo (opc: [instantes]), fantasmas [{alfaDeg,puntos}],
 *      diana {D,tol}|null
 *  P3: params {R, modo}, estado (circular().estado: theta,thetaDeg,pos,vVec,aRadVec,aTanVec,aVec,v,vueltas,
 *      detenido), opciones {v,aRad,aTan,aTotal,radio,estela}, traza, refs {v,a} (opc., referencias de escala)
 *  P4: params {escenario:'barca'|'avion', ...}, precalc (barca(): vBRvec vREvec vBEvec deriva tCruce | avion():
 *      vPAvec vAEvec vPEvec), estado {t, pos:{x,y}, llegada?}, traza, vista {xmin,xmax,ymin,ymax} (opc., avión)
 *  Común: escena.escalas {kV,kA} opcional (px por unidad), escena.fase, escena.evento.
 */
(function (raiz) {
  'use strict';

  const TAU = Math.PI * 2;
  const D2R = Math.PI / 180;
  let DIM = { w: 300, h: 200 };      // dimensiones CSS del lienzo durante el dibujo (para no recortar rótulos)
  let FS = 13;                        // tamaño de texto actual

  /* ------------------------------------------------------------------ paleta */
  // Los colores de DEF son solo un respaldo (si no se pueden leer las variables CSS); en uso normal manda la hoja de estilos.
  const DEF = {
    bg: '#fbfaf6', fg: '#1c2230', mut: '#5d6675', card: '#fff', bd: '#dfe1e8', acc: '#2a56d3',
    A: '#c9670a', X: '#1f8a4c', E: '#8a3fbf', P: '#6b7280', thm: '#fff4d9', thmB: '#d59a00',
    warnB: '#d24a3b', intu: '#e6f6f8', intuB: '#1a8fa3',
    sans: 'system-ui,-apple-system,"Segoe UI",Roboto,sans-serif'
  };
  const Paleta = {
    leer() {
      const o = Object.assign({}, DEF);
      if (typeof document === 'undefined' || typeof getComputedStyle === 'undefined') return o;
      const cs = getComputedStyle(document.documentElement);
      const mapa = { bg: '--bg', fg: '--fg', mut: '--mut', card: '--card', bd: '--bd', acc: '--acc', A: '--A', X: '--X',
        E: '--E', P: '--P', thm: '--thm', thmB: '--thm-b', warnB: '--warn-b', intu: '--intu', intuB: '--intu-b',
        sans: '--sans' };
      for (const k in mapa) {
        const v = cs.getPropertyValue(mapa[k]).trim();
        if (v) o[k] = v;
      }
      return o;
    }
  };

  /* ------------------------------------------------------------------ cámara */
  class Camara {
    constructor() { this.escala = 1; this.ox = 0; this.oy = 0; this.w = 1; this.h = 1; }
    // lim = {xmin,xmax,ymin,ymax} en metros; misma escala en x e y; encuadre centrado
    ajustar(lim, anchoPx, altoPx, margenPx = 36) {
      const m = Math.max(8, Math.min(margenPx, 0.14 * Math.min(anchoPx, altoPx)));
      const dx = Math.max(lim.xmax - lim.xmin, 1e-9), dy = Math.max(lim.ymax - lim.ymin, 1e-9);
      this.escala = Math.min((anchoPx - 2 * m) / dx, (altoPx - 2 * m) / dy);
      const cx = (lim.xmin + lim.xmax) / 2, cy = (lim.ymin + lim.ymax) / 2;
      this.ox = anchoPx / 2 - cx * this.escala;
      this.oy = altoPx / 2 + cy * this.escala;   // y hacia arriba
      this.w = anchoPx; this.h = altoPx;
      return this;
    }
    aPantalla(p) { return { x: this.ox + p.x * this.escala, y: this.oy - p.y * this.escala }; }
    aMundo(px, py) { return { x: (px - this.ox) / this.escala, y: (this.oy - py) / this.escala }; }
  }

  /* ------------------------------------------------------------------ lienzo HiDPI */
  const Lienzo = {
    altoPara(ancho) {
      const vh = (typeof window !== 'undefined' ? window.innerHeight : 800) * 0.7;
      return Math.round(Math.max(240, Math.min(ancho * 0.62, vh)));
    },
    ajustar(canvas, w, h) {
      const dpr = Math.min((typeof window !== 'undefined' && window.devicePixelRatio) || 1, 2);
      const pw = Math.max(1, Math.round(w * dpr)), ph = Math.max(1, Math.round(h * dpr));
      if (canvas.width !== pw) canvas.width = pw;
      if (canvas.height !== ph) canvas.height = ph;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return ctx;
    }
  };

  /* ------------------------------------------------------------------ utilidades */
  function fmt3d(x) {   // 3 cifras significativas conservando ceros finales (6.70 m)
    if (!isFinite(x)) return '∞';
    if (Math.abs(x) >= 1000) return String(Math.round(x));
    let s = Number(x).toPrecision(3);
    if (s.indexOf('e') >= 0) s = String(Number(s));
    if (/^-0\.?0*$/.test(s)) s = s.slice(1);
    return s;
  }
  function pasoBonito(rango) {
    const e = Math.pow(10, Math.floor(Math.log10(rango)));
    const f = rango / e;
    return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * e;
  }
  function tam(w) { return w < 420 ? 12 : 13; }
  function fuente(p, px, estilo) { return (estilo ? estilo + ' ' : '') + px + 'px ' + p.sans; }
  function numTxt(v, paso) {
    const d = paso >= 1 ? 0 : Math.min(3, Math.ceil(-Math.log10(paso) - 1e-9));
    return (Math.abs(v) < paso * 1e-6 ? 0 : v).toFixed(d);
  }

  /* ------------------------------------------------------------------ texto */
  function textoConHalo(ctx, txt, x, y, color, bg, opts) {
    opts = opts || {};
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = bg;
    ctx.strokeText(txt, x, y);
    ctx.fillStyle = color;
    ctx.fillText(txt, x, y);
    ctx.restore();
  }

  // partes: array de string | {b: base, s: subíndice}. Devuelve ancho.
  function medirPartes(ctx, partes, size, sans) {
    let w = 0;
    for (const p of partes) {
      if (typeof p === 'string') { ctx.font = size + 'px ' + sans; w += ctx.measureText(p).width; }
      else {
        ctx.font = (p.b.length <= 2 ? 'italic ' : '') + size + 'px ' + sans;
        w += ctx.measureText(p.b).width;
        if (p.s) { ctx.font = Math.round(size * 0.7 * 10) / 10 + 'px ' + sans; w += ctx.measureText(p.s).width + 1; }
      }
    }
    return w;
  }
  const _ESTADO = { paleta: DEF };

  // Rótulo con subíndice real (base + subíndice al 70 % desplazado 4 px). pos en px (baseline). Nunca se sale del lienzo.
  function rotulo(ctx, partes, pos, color, opts) {
    opts = opts || {};
    const p = opts.paleta || _ESTADO.paleta;
    const size = opts.size || FS;
    const w = medirPartes(ctx, partes, size, p.sans);
    let x = pos.x;
    if (opts.align === 'center') x -= w / 2; else if (opts.align === 'right') x -= w;
    x = Math.max(3, Math.min(x, DIM.w - 3 - w));
    const y = Math.max(size + 2, Math.min(pos.y, DIM.h - 4 - (opts.sinSub ? 0 : 4)));
    ctx.save();
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    let cx = x;
    for (const parte of partes) {
      if (typeof parte === 'string') {
        ctx.font = size + 'px ' + p.sans;
        textoConHalo(ctx, parte, cx, y, color, p.card);
        cx += ctx.measureText(parte).width;
      } else {
        ctx.font = (parte.b.length <= 2 ? 'italic ' : '') + (opts.negrita ? '600 ' : '') + size + 'px ' + p.sans;
        const wb = ctx.measureText(parte.b).width;
        textoConHalo(ctx, parte.b, cx, y, color, p.card);
        if (opts.vec) {            // flechita sobre la letra: indica magnitud vectorial
          const ya = y - size * 0.95;
          ctx.strokeStyle = color; ctx.lineWidth = 1.2; ctx.beginPath();
          ctx.moveTo(cx + 0.5, ya); ctx.lineTo(cx + wb, ya);
          ctx.moveTo(cx + wb - 3, ya - 2); ctx.lineTo(cx + wb, ya); ctx.lineTo(cx + wb - 3, ya + 2);
          ctx.stroke();
        }
        cx += wb;
        if (parte.s) {
          ctx.font = Math.round(size * 0.7 * 10) / 10 + 'px ' + p.sans;
          textoConHalo(ctx, parte.s, cx + 1, y + 4, color, p.card);
          cx += ctx.measureText(parte.s).width + 1;
        }
      }
    }
    ctx.restore();
    return { x, y, w, h: size };
  }
  // etiqueta(ctx, base, sub, pos, color, opts): opts.despues = texto tras el rótulo (p. ej. ' = 5 m/s')
  function etiqueta(ctx, base, sub, pos, color, opts) {
    const partes = [{ b: base, s: sub || '' }];
    if (opts && opts.despues) partes.push(opts.despues);
    return rotulo(ctx, partes, pos, color, opts);
  }

  /* ------------------------------------------------------------------ primitivas */
  function polilinea(ctx, cam, pts, color, ancho, opts) {
    opts = opts || {};
    if (!pts || pts.length < 2) return;
    ctx.save();
    ctx.strokeStyle = color; ctx.lineWidth = ancho || 2; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    if (opts.discontinuo) ctx.setLineDash(opts.discontinuo === true ? [6, 4] : opts.discontinuo);
    if (opts.alpha != null) ctx.globalAlpha = opts.alpha;
    ctx.beginPath();
    pts.forEach((p, i) => { const q = cam.aPantalla(p); if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); });
    ctx.stroke();
    ctx.restore();
  }
  function punto(ctx, cam, p, color, radio, opts) {
    opts = opts || {};
    const q = cam.aPantalla(p);
    ctx.save();
    ctx.beginPath(); ctx.arc(q.x, q.y, radio || 5, 0, TAU);
    if (opts.hueco) { ctx.lineWidth = opts.ancho || 1.8; ctx.strokeStyle = color; ctx.stroke(); }
    else { ctx.fillStyle = color; ctx.fill(); if (opts.borde) { ctx.lineWidth = 1.5; ctx.strokeStyle = opts.borde; ctx.stroke(); } }
    ctx.restore();
    return q;
  }
  // flecha en píxeles de pantalla (x0,y0)->(x1,y1) con punta de tamaño fijo
  function flechaPx(ctx, x0, y0, x1, y1, color, opts) {
    opts = opts || {};
    const L = Math.hypot(x1 - x0, y1 - y0);
    if (L < 1.5) return { L, ux: 1, uy: 0 };
    const ux = (x1 - x0) / L, uy = (y1 - y0) / L;
    const H = opts.cabeza || 10, W = (opts.cabezaAncho || 4.5);
    const sx = x1 - ux * H * 0.8, sy = y1 - uy * H * 0.8;     // el fuste termina dentro de la punta
    ctx.save();
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = opts.ancho || 3; ctx.lineCap = 'butt';
    if (opts.alpha != null) ctx.globalAlpha = opts.alpha;
    if (opts.discontinuo) ctx.setLineDash(opts.discontinuo === true ? [6, 4] : opts.discontinuo);
    if (L > H * 0.8) { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(sx, sy); ctx.stroke(); }
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - ux * H - uy * W, y1 - uy * H + ux * W);
    ctx.lineTo(x1 - ux * H + uy * W, y1 - uy * H - ux * W);
    ctx.closePath(); ctx.fill();
    ctx.restore();
    return { L, ux, uy };
  }
  // vector(ctx, cam, origen(mundo), vecPx{x,y (y hacia arriba)}, color, etiqueta{base,sub,despues}|null, opts)
  function vector(ctx, cam, origen, vecPx, color, etq, opts) {
    opts = opts || {};
    const o = cam.aPantalla(origen);
    const x1 = o.x + vecPx.x, y1 = o.y - vecPx.y;
    const r = flechaPx(ctx, o.x, o.y, x1, y1, color, { ancho: opts.ancho || 3, discontinuo: opts.discontinuo, alpha: opts.alpha, cabeza: opts.cabeza });
    if (etq && r.L >= 1.5) {
      const off = (opts.offEtq != null ? opts.offEtq : 10);
      const tx = x1 + r.ux * off + (opts.dxEtq || 0), ty = y1 + r.uy * off;
      const align = opts.alignEtq || (r.ux > 0.35 ? 'left' : r.ux < -0.35 ? 'right' : 'center');
      const by = ty + (r.uy > 0.35 ? FS * 0.9 : r.uy < -0.35 ? -2 : FS * 0.35) + (opts.dyEtq || 0);
      const partes = [{ b: etq.base, s: etq.sub || '' }];
      if (etq.despues) partes.push(etq.despues);
      rotulo(ctx, partes, { x: tx, y: by }, color, { align, vec: opts.vec !== false && !etq.sinFlecha });
    }
    return { x: x1, y: y1, L: r.L };
  }
  // marcador: línea guía discontinua (mundo a->b) con rótulo cerca del punto b (o centrado si opts.centro)
  function marcador(ctx, cam, a, b, texto, color, opts) {
    opts = opts || {};
    const p = cam.aPantalla(a), q = cam.aPantalla(b);
    ctx.save();
    ctx.strokeStyle = color; ctx.lineWidth = 1.4; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
    ctx.restore();
    const partes = Array.isArray(texto) ? texto : [texto];
    const px = opts.centro ? (p.x + q.x) / 2 : q.x + (opts.dx != null ? opts.dx : 6);
    const py = opts.centro ? (p.y + q.y) / 2 + (opts.dy || -6) : q.y + (opts.dy != null ? opts.dy : -6);
    rotulo(ctx, partes, { x: px, y: py }, color, { align: opts.align || (opts.centro ? 'center' : 'left') });
  }

  // Ejes con rejilla 1-2-5. opts: unidad, etiquetas, rejilla, nombreX, nombreY
  function ejes(ctx, cam, opts, paleta) {
    opts = opts || {};
    const p = paleta || _ESTADO.paleta;
    const w = cam.w, h = cam.h;
    const a = cam.aMundo(0, h), b = cam.aMundo(w, 0);     // esquina inferior izq / superior der
    const paso = pasoBonito(Math.max(b.x - a.x, b.y - a.y) / 6);
    const o = cam.aPantalla({ x: 0, y: 0 });
    ctx.save();
    ctx.lineWidth = 1;
    if (opts.rejilla !== false) {
      ctx.strokeStyle = p.bd; ctx.globalAlpha = 0.9;
      ctx.beginPath();
      for (let x = Math.ceil(a.x / paso) * paso; x <= b.x + 1e-9; x += paso) { const s = cam.aPantalla({ x, y: 0 }).x; ctx.moveTo(s, 0); ctx.lineTo(s, h); }
      for (let y = Math.ceil(a.y / paso) * paso; y <= b.y + 1e-9; y += paso) { const s = cam.aPantalla({ x: 0, y }).y; ctx.moveTo(0, s); ctx.lineTo(w, s); }
      ctx.stroke(); ctx.globalAlpha = 1;
    }
    ctx.strokeStyle = p.mut; ctx.lineWidth = 1.4;
    ctx.beginPath();
    if (opts.ejeX !== false && o.y >= 0 && o.y <= h) { ctx.moveTo(0, o.y); ctx.lineTo(w, o.y); }
    if (opts.ejeY !== false && o.x >= 0 && o.x <= w) { ctx.moveTo(o.x, 0); ctx.lineTo(o.x, h); }
    ctx.stroke();
    ctx.restore();
    if (opts.etiquetas !== false) {
      const sz = Math.max(10, FS - 2);
      const sep = paso * cam.escala;
      const cada = sep < 34 ? Math.ceil(34 / sep) : 1;
      let i = 0;
      const yEje = Math.max(sz + 8, Math.min(o.y + sz + 4, h - 6));
      const xEje = Math.max(3, Math.min(o.x - 5, w - 3));
      for (let x = Math.ceil(a.x / paso) * paso; x <= b.x + 1e-9; x += paso, i++) {
        if (Math.abs(x) < paso * 1e-6 || Math.round(x / paso) % cada) continue;
        const s = cam.aPantalla({ x, y: 0 }).x;
        if (s < 12 || s > w - 12) continue;
        rotulo(ctx, [numTxt(x, paso)], { x: s, y: yEje }, p.mut, { align: 'center', size: sz });
      }
      for (let y = Math.ceil(a.y / paso) * paso; y <= b.y + 1e-9; y += paso) {
        if (Math.abs(y) < paso * 1e-6 || Math.round(y / paso) % cada || (opts.yMin != null && y < opts.yMin - 1e-9)) continue;
        const s = cam.aPantalla({ x: 0, y }).y;
        if (s < sz + 6 || s > h - 8) continue;
        rotulo(ctx, [numTxt(y, paso)], { x: xEje, y: s + 4, }, p.mut, { align: o.x - 5 < 26 ? 'left' : 'right', size: sz });
      }
      const un = opts.unidad || 'm';
      rotulo(ctx, [{ b: opts.nombreX || 'x' }, ' (' + un + ')'], { x: w - 6, y: Math.max(sz + 4, Math.min(o.y - 6, h - 20)) }, p.mut, { align: 'right', size: sz });
      rotulo(ctx, [{ b: opts.nombreY || 'y' }, ' (' + un + ')'], { x: Math.min(w - 60, Math.max(8, o.x + 6)), y: sz + 10 }, p.mut, { align: 'left', size: sz });
    }
    ctx.save(); ctx.fillStyle = p.mut; ctx.beginPath(); ctx.arc(o.x, o.y, 2.5, 0, TAU); if (o.x > 0 && o.x < w && o.y > 0 && o.y < h) ctx.fill(); ctx.restore();
    return paso;
  }

  function notaEsquina(ctx, texto, p, pos, xMin) {
    const sz = Math.max(10, FS - 2);
    rotulo(ctx, [texto], { x: pos === 'der' ? DIM.w - 6 : Math.max(6, xMin || 0), y: DIM.h - 7 }, p.mut, { align: pos === 'der' ? 'right' : 'left', size: sz });
  }

  // Triángulo de vectores en un recuadro: v1 + v2 = v1 + v2 (punta con cola). vecs=[{v,color,base,sub}] ; el 3.º es la suma.
  function trianguloVectores(ctx, caja, vecs, p, opts) {
    opts = opts || {};
    ctx.save();
    ctx.fillStyle = p.card; ctx.strokeStyle = p.bd; ctx.lineWidth = 1.2;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(caja.x, caja.y, caja.w, caja.h, 8); else ctx.rect(caja.x, caja.y, caja.w, caja.h);
    ctx.globalAlpha = 0.94; ctx.fill(); ctx.globalAlpha = 1; ctx.stroke();
    ctx.restore();
    const a = vecs[0].v, b = vecs[1].v;
    const pts = [{ x: 0, y: 0 }, a, { x: a.x + b.x, y: a.y + b.y }];
    const xs = pts.map(q => q.x), ys = pts.map(q => q.y);
    const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    const padX = 26, padTop = 38, padBot = 22;
    const ancho = Math.max(x1 - x0, 1e-12), alto = Math.max(y1 - y0, 1e-12);
    const s = Math.min((caja.w - 2 * padX) / ancho, (caja.h - padTop - padBot) / alto);
    const ox = caja.x + caja.w / 2 - ((x0 + x1) / 2) * s;
    const oy = caja.y + padTop + (caja.h - padTop - padBot) / 2 + ((y0 + y1) / 2) * s;
    const P = q => ({ x: ox + q.x * s, y: oy - q.y * s });
    const tramos = [[{ x: 0, y: 0 }, a, vecs[0]], [a, pts[2], vecs[1]], [{ x: 0, y: 0 }, pts[2], vecs[2]]];
    const centro = P({ x: (x0 + x1) / 2, y: (y0 + y1) / 2 });
    tramos.forEach((t, i) => {
      const A = P(t[0]), B = P(t[1]);
      const r = flechaPx(ctx, A.x, A.y, B.x, B.y, t[2].color, { ancho: i === 2 ? 3 : 2.4, cabeza: 8, cabezaAncho: 3.6 });
      if (r.L >= 1.5) {
        // rótulo en el punto medio, desplazado hacia el lado alejado del centro del triángulo
        const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
        let nx = -r.uy, ny = r.ux;
        if ((mx + nx - centro.x) * nx + (my + ny - centro.y) * ny < 0) { nx = -nx; ny = -ny; }
        const sz = Math.max(10, FS - 1);
        const al = nx > 0.4 ? 'left' : nx < -0.4 ? 'right' : 'center';
        const q = { x: mx + nx * 7, y: my + ny * 7 + (ny > 0.4 ? sz * 0.8 : ny < -0.4 ? -1 : sz * 0.35) };
        const partes = [{ b: t[2].base, s: t[2].sub || '' }];
        const w = medirPartes(ctx, partes, sz, p.sans);
        let rx = q.x - (al === 'center' ? w / 2 : al === 'right' ? w : 0);
        rx = Math.max(caja.x + 3, Math.min(rx, caja.x + caja.w - 3 - w));
        const ry = Math.max(caja.y + sz + 2, Math.min(q.y, caja.y + caja.h - 5));
        rotulo(ctx, partes, { x: rx, y: ry }, t[2].color, { size: sz, vec: true });
      }
    });
    if (opts.titulo) rotulo(ctx, opts.titulo, { x: caja.x + 6, y: caja.y + 13 }, p.mut, { size: Math.max(10, FS - 2) });
  }

  /* ------------------------------------------------------------------ escalas y encuadre */
  const _cacheTray = new WeakMap();
  function refsTray(tray) {
    if (_cacheTray.has(tray)) return _cacheTray.get(tray);
    let vm = 0, am = 0; const n = 240;
    const pts = [];
    let xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity;
    for (let i = 0; i <= n; i++) {
      const t = tray.tMax * i / n, r = tray.r(t), v = tray.v(t), a = tray.a(t);
      vm = Math.max(vm, Math.hypot(v.x, v.y)); am = Math.max(am, Math.hypot(a.x, a.y));
      xmin = Math.min(xmin, r.x); xmax = Math.max(xmax, r.x); ymin = Math.min(ymin, r.y); ymax = Math.max(ymax, r.y);
      pts.push(r);
    }
    const o = { vm: vm || 1, am: am || 1, pts, lim: { xmin, xmax, ymin, ymax } };
    _cacheTray.set(tray, o);
    return o;
  }

  function limites(escena, w, h) {
    const q = escena.pestana, pr = escena.params || {}, pc = escena.precalc || {};
    if (q === 1) {
      const L = refsTray(pr.tray).lim;
      const x0 = Math.min(L.xmin, 0), x1 = Math.max(L.xmax, 0), y0 = Math.min(L.ymin, 0), y1 = Math.max(L.ymax, 0);
      const pad = 0.1 * Math.max(x1 - x0, y1 - y0, 1e-6);
      return { xmin: x0 - pad, xmax: x1 + pad, ymin: y0 - pad, ymax: y1 + pad };
    }
    if (q === 2) {
      const W = Math.max(pc.R || 0, (escena.diana && escena.diana.D) || 0, 1) * 1.08;
      const H = Math.max(pc.yMax || 0, pr.y0 || 0, 1) * 1.15;
      let xmin = -0.05 * W, xmax = W;
      if ((pc.R || 0) < 1e-6 && (escena.diana == null)) { xmin = -5; xmax = 5; }   // vertical: ancho mínimo 10 m centrado
      return { xmin, xmax, ymin: 0, ymax: H };
    }
    if (q === 3) {
      const R = Math.max(pr.R || 1, 1e-6) * 1.35;
      return { xmin: -R, xmax: R, ymin: -R, ymax: R };
    }
    // pestaña 4
    if (pr.escenario === 'avion') {
      if (escena.vista) return escena.vista;
      let m = 1;
      const e = escena.estado && escena.estado.pos;
      if (e) m = Math.max(m, Math.abs(e.x), Math.abs(e.y));
      (escena.traza || []).forEach(t => { m = Math.max(m, Math.abs(t.x), Math.abs(t.y)); });
      m = pasoBonito(m * 1.25);
      const asp = w / h;
      return { xmin: -m * asp, xmax: m * asp, ymin: -m, ymax: m };
    }
    const d = pr.d || 60;
    const dr = pc.deriva != null && isFinite(pc.deriva) ? Math.max(-3 * d, Math.min(3 * d, pc.deriva)) : 0;
    const ex = escena.estado && escena.estado.pos ? escena.estado.pos.x : 0;
    const xa = Math.min(0, dr, ex), xb = Math.max(0, dr, ex);
    const mg = 0.2 * d;
    return { xmin: xa - mg, xmax: xb + mg, ymin: -0.15 * d, ymax: 1.15 * d };
  }

  function escalas(escena, w, h) {
    const s = Math.min(w, h), q = escena.pestana, pr = escena.params || {};
    let rv = 1, ra = 1;
    if (q === 1) { const r = refsTray(pr.tray); rv = r.vm; ra = r.am; }
    else if (q === 2) { rv = Math.max(pr.v0 || 1, 1e-6); ra = Math.max(pr.g || 9.8, 1e-6); }
    else if (q === 3) {
      const st = escena.estado || {}, rf = escena.refs || {};
      rv = rf.v || Math.max(st.v || 0, pr.v0 || 0, 0.1);
      ra = rf.a || Math.max(st.aRad || 0, Math.abs(st.aTan || 0), st.a || 0, 0.1);
    }
    return { kV: 0.18 * s / rv, kA: 0.12 * s / ra };
  }

  function cajaTriangulo(w, h) {
    return { x: 8, y: 8, w: Math.min(170, Math.max(120, w * 0.46)), h: Math.min(135, Math.max(100, h * 0.42)) };
  }
  function preparar(escena, w, h) {
    let lim = limites(escena, w, h);
    let cam = new Camara().ajustar(lim, w, h, 36);
    if (escena.pestana === 4) {            // deja sitio arriba para el recuadro del triángulo de vectores
      const extra = (cajaTriangulo(w, h).h + 14 + FS + 10) / cam.escala;   // + altura del rótulo «enfrente»
      lim = Object.assign({}, lim, { ymax: lim.ymax + extra });
      cam = new Camara().ajustar(lim, w, h, 36);
    }
    return { cam, escalas: escena.escalas || escalas(escena, w, h) };
  }

  /* ------------------------------------------------------------------ pestaña 1 */
  function dibujarPestana1(ctx, cam, escena, p) {
    const o = escena.opciones || {}, st = escena.estado, tray = escena.params.tray;
    const esc = escena.escalas || escalas(escena, cam.w, cam.h);
    const kV = esc.kV, kA = esc.kA;
    ejes(ctx, cam, { unidad: 'm' }, p);
    polilinea(ctx, cam, refsTray(tray).pts, p.mut, 1.8, { discontinuo: true });
    if (o.estela !== false && escena.traza && escena.traza.length > 1) polilinea(ctx, cam, escena.traza, p.acc, 3, { alpha: 0.5 });
    const P = st.r;
    const Pp = cam.aPantalla(P);
    // r desde el origen
    if (o.r !== false) {
      const O = cam.aPantalla({ x: 0, y: 0 });
      const rr = flechaPx(ctx, O.x, O.y, Pp.x, Pp.y, p.fg, { ancho: 2, cabeza: 9, cabezaAncho: 4 });
      if (rr.L > 28) etiqueta(ctx, 'r', '', { x: (O.x + Pp.x) / 2 - rr.uy * 12 - 4, y: (O.y + Pp.y) / 2 + rr.ux * 12 + 4 }, p.fg, { vec: true });
    }
    // velocidad media y cuerda
    const vm = escena.precalc && escena.precalc.vmed;
    if (o.vmed !== false && vm) {
      polilinea(ctx, cam, [vm.r1, vm.r2], p.thmB, 2.2, { discontinuo: true });
      punto(ctx, cam, vm.r1, p.thmB, 4.5, { hueco: true });
      punto(ctx, cam, vm.r2, p.thmB, 4.5, { hueco: true });
      vector(ctx, cam, vm.r1, { x: vm.vmed.x * kV, y: vm.vmed.y * kV }, p.thmB, { base: 'v', sub: 'med' }, { discontinuo: true, offEtq: 6 });
      const c2 = cam.aPantalla(vm.r2), c1 = cam.aPantalla(vm.r1);
      const dxp = c2.x - c1.x, dyp = c2.y - c1.y, ll = Math.hypot(dxp, dyp);
      if (ll > 40) rotulo(ctx, [{ b: 'Δr' }], { x: (c1.x + c2.x) / 2 + dyp / ll * 14, y: (c1.y + c2.y) / 2 - dxp / ll * 14 + 4 }, p.thmB, { vec: true, align: 'center' });
      if (vm.haciaAtras) rotulo(ctx, ['Δt = ' + fmt3d(vm.dtEf !== undefined ? vm.dtEf : vm.t2 - vm.t1) + ' s, hacia atrás' + (vm.recortado ? ' (recortado)' : '')], { x: DIM.w - 8, y: 2 * FS + 12 }, p.thmB, { align: 'right', size: FS - 1 });
    }
    // aceleración y componentes
    if (o.comp && !st.vNula) {
      const pa = { x: st.aParVec.x * kA, y: st.aParVec.y * kA }, pe = { x: st.aPerpVec.x * kA, y: st.aPerpVec.y * kA };
      ctx.save(); ctx.strokeStyle = p.mut; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.globalAlpha = 0.8;
      ctx.beginPath(); ctx.moveTo(Pp.x, Pp.y); ctx.lineTo(Pp.x + pa.x, Pp.y - pa.y);
      ctx.lineTo(Pp.x + pa.x + pe.x, Pp.y - pa.y - pe.y); ctx.lineTo(Pp.x + pe.x, Pp.y - pe.y); ctx.closePath(); ctx.stroke(); ctx.restore();
      vector(ctx, cam, P, pa, p.X, { base: 'a', sub: '∥' }, { discontinuo: true, ancho: 2.4, offEtq: 6 });
      vector(ctx, cam, P, pe, p.E, { base: 'a', sub: '⊥' }, { discontinuo: true, ancho: 2.4, offEtq: 6 });
    }
    if (o.v !== false) vector(ctx, cam, P, { x: st.v.x * kV, y: st.v.y * kV }, p.acc, { base: 'v' });
    if (o.a !== false) vector(ctx, cam, P, { x: st.a.x * kA, y: st.a.y * kA }, p.A, { base: 'a' });
    punto(ctx, cam, P, p.fg, 5.5, { borde: p.bg });
    rotulo(ctx, ['t = ' + fmt3d(st.t) + ' s'], { x: DIM.w - 8, y: FS + 8 }, p.fg, { negrita: true, align: 'right' });
    notaEsquina(ctx, 'vectores no a escala de posición', p, 'izq', cam.aPantalla({ x: 0, y: 0 }).x + 8);
  }

  /* ------------------------------------------------------------------ pestaña 2 */
  function dibujarPestana2(ctx, cam, escena, p) {
    const o = escena.opciones || {}, st = escena.estado, pc = escena.precalc, pr = escena.params;
    const esc = escena.escalas || escalas(escena, cam.w, cam.h);
    const kV = esc.kV, kA = esc.kA;
    const O = cam.aPantalla({ x: 0, y: 0 });
    // suelo (relleno) y ejes
    ctx.save(); ctx.fillStyle = p.bd; ctx.globalAlpha = 0.55; ctx.fillRect(0, O.y, cam.w, Math.max(0, cam.h - O.y)); ctx.restore();
    ejes(ctx, cam, { unidad: 'm', yMin: 0 }, p);
    ctx.save(); ctx.strokeStyle = p.fg; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(0, O.y); ctx.lineTo(cam.w, O.y); ctx.stroke(); ctx.restore();
    // plataforma
    if (pr.y0 > 0) {
      const a = cam.aPantalla({ x: cam.aMundo(0, 0).x, y: pr.y0 });
      ctx.save(); ctx.fillStyle = p.card; ctx.strokeStyle = p.fg; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.rect(0, a.y, O.x, O.y - a.y); ctx.fill(); ctx.stroke(); ctx.restore();
    }
    // fantasmas
    if (o.fantasmas !== false && escena.fantasmas) {
      escena.fantasmas.slice(-3).forEach(f => {
        polilinea(ctx, cam, f.puntos, p.mut, 1.6, { alpha: 0.4 });
        const u = f.puntos[f.puntos.length - 1];
        if (u) { const q = cam.aPantalla(u); rotulo(ctx, [{ b: 'α', s: '0' }, ' = ' + (Math.round(f.alfaDeg * 10) / 10) + '°'], { x: q.x, y: q.y - 8 }, p.mut, { align: 'center', size: FS - 1 }); }
      });
    }
    if (o.teorica !== false && pc.trayectoria) polilinea(ctx, cam, pc.trayectoria(200), p.mut, 1.8, { discontinuo: true });
    if (escena.traza && escena.traza.length > 1) polilinea(ctx, cam, escena.traza, p.acc, 3, { alpha: 0.5 });
    // diana
    if (escena.diana) {
      const d = escena.diana, a = cam.aPantalla({ x: d.D - d.tol, y: 0 }), b = cam.aPantalla({ x: d.D + d.tol, y: 0 });
      ctx.save(); ctx.fillStyle = p.warnB; ctx.fillRect(a.x, O.y - 7, Math.max(6, b.x - a.x), 7); ctx.restore();
      rotulo(ctx, ['D = ' + fmt3d(d.D) + ' m'], { x: (a.x + b.x) / 2, y: O.y - 12 }, p.warnB, { align: 'center', negrita: true });
    }
    // estroboscopio
    if (o.estrobo) {
      const ts = escena.estrobo || (pc.estroboscopio ? pc.estroboscopio() : []);
      let dt = ts.length > 1 ? ts[1] - ts[0] : 0;
      ts.forEach(t => {
        if (t > st.t + 1e-9) return;
        const e = pc.estado(t);
        punto(ctx, cam, e, p.fg, 4, { hueco: true, ancho: 1.6 });
        if (o.vectores !== false) {
          vector(ctx, cam, e, { x: e.vx * kV * 0.5, y: 0 }, p.X, null, { ancho: 1.8, cabeza: 6 });
          vector(ctx, cam, e, { x: 0, y: e.vy * kV * 0.5 }, p.E, null, { ancho: 1.8, cabeza: 6 });
        }
      });
      if (dt) rotulo(ctx, ['Δt = ' + fmt3d(dt) + ' s entre marcas'], { x: DIM.w - 8, y: 2 * FS + 12 }, p.mut, { align: 'right', size: FS - 1 });
    }
    // marcadores
    if (o.marcadores !== false) {
      if (pc.tieneVertice && st.t >= pc.t1 - 1e-9) {
        const xv = pc.v0x * pc.t1;
        marcador(ctx, cam, { x: 0, y: pc.yMax }, { x: xv, y: pc.yMax }, [{ b: pr.y0 > 0 ? 'y' : 'h', s: pr.y0 > 0 ? 'máx' : '' }, ' = ' + fmt3d(pc.yMax) + ' m'], p.thmB, { dx: 6, dy: -6 });
        marcador(ctx, cam, { x: xv, y: 0 }, { x: xv, y: pc.yMax }, '', p.thmB, {});
      }
      if (st.t >= pc.tv - 1e-9 && pc.tv > 0) {
        const A = cam.aPantalla({ x: 0, y: 0 }), B = cam.aPantalla({ x: pc.R, y: 0 }), yy = A.y + 16;
        ctx.save(); ctx.strokeStyle = p.thmB; ctx.fillStyle = p.thmB; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(A.x, yy); ctx.lineTo(B.x, yy); ctx.moveTo(A.x, yy - 5); ctx.lineTo(A.x, yy + 5); ctx.moveTo(B.x, yy - 5); ctx.lineTo(B.x, yy + 5); ctx.stroke(); ctx.restore();
        rotulo(ctx, [{ b: 'R' }, ' = ' + fmt3d(pc.R) + ' m'], { x: (A.x + B.x) / 2, y: yy + FS + 2 }, p.thmB, { align: 'center', negrita: true });
                rotulo(ctx, [{ b: 't', s: 'v' }, ' = ' + fmt3d(pc.tv) + ' s'], { x: (A.x + B.x) / 2, y: yy + 2 * FS + 6 }, p.thmB, { align: 'center', negrita: true });
      }
    }
    // proyectil y vectores
    const P = { x: st.x, y: st.y };
    if (o.vectores !== false) {
      const Pp2 = cam.aPantalla(P), cae = st.vy < -1e-9;
      const cercaX = Math.abs(Pp2.y - cam.aPantalla({ x: 0, y: 0 }).y) < 26 && Pp2.x + st.vx * kV + 8 > cam.w - 6 - 52;   // evita el rótulo «x (m)» del eje
      vector(ctx, cam, P, { x: st.vx * kV, y: 0 }, p.X, { base: 'v', sub: 'x' }, { ancho: 2.4, offEtq: 6, dyEtq: cercaX ? -(FS + 8) : 0 });
      vector(ctx, cam, P, { x: 0, y: st.vy * kV }, p.E, { base: 'v', sub: 'y' }, Object.assign({ ancho: 2.4, offEtq: 6 }, cae ? { alignEtq: 'right', dxEtq: -10 } : {}));
      vector(ctx, cam, P, { x: st.vx * kV, y: st.vy * kV }, p.acc, { base: 'v' });
    }
    if (o.aceleracion !== false) vector(ctx, cam, P, { x: 0, y: -pr.g * kA }, p.A, { base: 'a' }, (st.vy < -1e-9) ? { alignEtq: 'left', dxEtq: 4 } : {});
    punto(ctx, cam, P, p.fg, 5.5, { borde: p.bg });
    if (pc.sinVuelo) rotulo(ctx, ['Sin vuelo: no despega (', { b: 't', s: 'v' }, ' = 0)'], { x: 8, y: FS + 8 }, p.warnB, {});
    else rotulo(ctx, ['t = ' + fmt3d(st.t) + ' s'], { x: DIM.w - 8, y: FS + 8 }, p.fg, { negrita: true, align: 'right' });
    notaEsquina(ctx, 'vectores no a escala de posición', p, 'izq', cam.aPantalla({ x: 0, y: 0 }).x + 8);
  }

  /* ------------------------------------------------------------------ pestaña 3 */
  function dibujarPestana3(ctx, cam, escena, p) {
    const o = escena.opciones || {}, st = escena.estado, R = escena.params.R;
    const esc = escena.escalas || escalas(escena, cam.w, cam.h);
    const kV = esc.kV, kA = esc.kA;
    ejes(ctx, cam, { unidad: 'm' }, p);
    const C = cam.aPantalla({ x: 0, y: 0 }), rp = R * cam.escala;
    ctx.save(); ctx.strokeStyle = p.mut; ctx.lineWidth = 1.8; ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.arc(C.x, C.y, rp, 0, TAU); ctx.stroke(); ctx.restore();
    if (o.estela !== false && escena.traza && escena.traza.length > 1) polilinea(ctx, cam, escena.traza, p.acc, 3, { alpha: 0.5 });
    const P = st.pos, Pp = cam.aPantalla(P);
    if (o.radio !== false) {
      flechaPx(ctx, C.x, C.y, C.x, C.y, p.fg, {});
      ctx.save(); ctx.strokeStyle = p.fg; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(C.x, C.y); ctx.lineTo(Pp.x, Pp.y); ctx.stroke(); ctx.restore();
      const ux = (Pp.x - C.x) / (rp || 1), uy = (Pp.y - C.y) / (rp || 1);
      // arco del ángulo θ (antihorario desde +x)
      const th = ((st.theta % TAU) + TAU) % TAU;
      const ra = Math.max(20, Math.min(0.3 * rp, 44));
      if (th > 0.01) {
        ctx.save(); ctx.strokeStyle = p.thmB; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(C.x, C.y, ra, 0, -th, true); ctx.stroke(); ctx.restore();
        const mid = th / 2;
        rotulo(ctx, [{ b: 'θ' }, ' = ' + fmt3d(st.thetaDeg) + '°'], { x: C.x + Math.cos(mid) * (ra + 8) + (Math.cos(mid) < -0.3 ? -2 : 4), y: C.y - Math.sin(mid) * (ra + 8) + 4 }, p.thmB, { align: Math.cos(mid) < -0.3 ? 'right' : 'left', negrita: true });
      }
      rotulo(ctx, [{ b: 'R' }, ' = ' + fmt3d(R) + ' m'], { x: 8, y: FS + 8 }, p.fg, { negrita: true });
    }
    punto(ctx, cam, { x: 0, y: 0 }, p.fg, 3.5);
    const v = st.vVec, ar = st.aRadVec, at = st.aTanVec, a = st.aVec;
    if (o.v !== false) vector(ctx, cam, P, { x: v.x * kV, y: v.y * kV }, p.acc, { base: 'v' });
    if (o.aRad !== false && Math.hypot(ar.x, ar.y) > 1e-9) vector(ctx, cam, P, { x: ar.x * kA, y: ar.y * kA }, p.A, { base: 'a', sub: 'rad' });
    if (o.aTan !== false && Math.hypot(at.x, at.y) > 1e-9) vector(ctx, cam, P, { x: at.x * kA, y: at.y * kA }, p.X, { base: 'a', sub: 'tan' }, { offEtq: 6 });
    if (o.aTotal && a) vector(ctx, cam, P, { x: a.x * kA, y: a.y * kA }, p.warnB, { base: 'a' }, { discontinuo: true, ancho: 2.4, offEtq: 6 });
    punto(ctx, cam, P, p.fg, 5.5, { borde: p.bg });
    rotulo(ctx, ['Vueltas: ' + fmt3d(st.vueltas)], { x: DIM.w - 8, y: FS + 8 }, p.fg, { align: 'right', negrita: true });
    if (st.detenido) rotulo(ctx, ['detenido'], { x: DIM.w - 8, y: 2 * FS + 12 }, p.warnB, { align: 'right' });
    notaEsquina(ctx, 'vectores no a escala de posición', p, 'izq');
  }

  /* ------------------------------------------------------------------ pestaña 4 */
  function casco(ctx, pts, x, y, ang, fill, borde) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath();
    ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = borde; ctx.lineWidth = 1.6; ctx.stroke(); ctx.restore();
  }
  const BARCA = [[15, 0], [7, 6], [-11, 6], [-11, -6], [7, -6]];
  const AVION = [[15, 0], [3, 3], [-3, 14], [-7, 14], [-4, 2], [-10, 2], [-12, 6], [-15, 6], [-13, 0], [-15, -6], [-12, -6], [-10, -2], [-4, -2], [-7, -14], [-3, -14], [3, -3]];

  function dibujarPestana4(ctx, cam, escena, p) {
    const pr = escena.params, pc = escena.precalc, st = escena.estado, avion = pr.escenario === 'avion';
    const caja = cajaTriangulo(cam.w, cam.h);
    if (!avion) {
      const d = pr.d, a0 = cam.aPantalla({ x: cam.aMundo(0, 0).x, y: 0 }), a1 = cam.aPantalla({ x: 0, y: d });
      ctx.save(); ctx.fillStyle = p.intu; ctx.fillRect(0, a1.y, cam.w, a0.y - a1.y); ctx.restore();
      // flechas de corriente
      const vre = pc.vREvec.x;
      if (Math.abs(vre) > 1e-6) {
        const sg = Math.sign(vre), len = 14 + 14 * Math.min(1, Math.abs(vre) / 4), n = Math.max(2, Math.floor(cam.w / 110));
        for (let j = 1; j <= 2; j++) for (let i = 0; i < n; i++) {
          const x = (i + (j % 2 ? 0.3 : 0.8)) * cam.w / n, y = a1.y + (a0.y - a1.y) * j / 3;
          flechaPx(ctx, x - sg * len / 2, y, x + sg * len / 2, y, p.intuB, { ancho: 1.8, cabeza: 6, cabezaAncho: 3, alpha: 0.9 });
        }
      }
      ctx.save(); ctx.strokeStyle = p.fg; ctx.lineWidth = 2.6;
      ctx.beginPath(); ctx.moveTo(0, a0.y); ctx.lineTo(cam.w, a0.y); ctx.moveTo(0, a1.y); ctx.lineTo(cam.w, a1.y); ctx.stroke(); ctx.restore();
      ejes(ctx, cam, { unidad: 'm', rejilla: false, ejeY: false, ejeX: false, etiquetas: false }, p);
      const sz = Math.max(10, FS - 1);
      rotulo(ctx, ['orilla de salida'], { x: cam.w - 6, y: a0.y + sz + 4 }, p.mut, { align: 'right', size: sz });
      rotulo(ctx, ['orilla opuesta'], { x: cam.w - 6, y: a1.y - 6 }, p.mut, { align: 'right', size: sz });
      rotulo(ctx, [{ b: 'd' }, ' = ' + fmt3d(d) + ' m'], { x: Math.max(8, a0.x + 6), y: (a0.y + a1.y) / 2 + 4 }, p.mut, { size: sz });
      // destino enfrente
      const dst = punto(ctx, cam, { x: 0, y: d }, p.fg, 5, { hueco: true });
      rotulo(ctx, ['enfrente'], { x: dst.x + (pc.deriva > 0 ? -8 : 8), y: dst.y - 6 }, p.fg, { size: sz, align: pc.deriva > 0 ? 'right' : 'left' });
      punto(ctx, cam, { x: 0, y: 0 }, p.mut, 3.5);
      if (escena.traza && escena.traza.length > 1) polilinea(ctx, cam, escena.traza, p.acc, 3, { alpha: 0.5 });
      const ang = Math.atan2(-pc.vBRvec.y, pc.vBRvec.x);
      const B = cam.aPantalla(st.pos);
      casco(ctx, BARCA, B.x, B.y, ang, p.card, p.fg);
      // deriva al llegar
      const llegado = st.llegada || st.pos.y >= d - 1e-6;
      if (llegado && isFinite(pc.deriva) && Math.abs(pc.deriva) > 1e-6) {
        const A = cam.aPantalla({ x: 0, y: d }), Bq = cam.aPantalla({ x: pc.deriva, y: d }), yy = A.y - 14;
        ctx.save(); ctx.strokeStyle = p.thmB; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(A.x, yy); ctx.lineTo(Bq.x, yy); ctx.moveTo(A.x, yy - 5); ctx.lineTo(A.x, yy + 5); ctx.moveTo(Bq.x, yy - 5); ctx.lineTo(Bq.x, yy + 5); ctx.stroke(); ctx.restore();
        rotulo(ctx, ['deriva = ' + fmt3d(Math.abs(pc.deriva)) + ' m'], { x: (A.x + Bq.x) / 2, y: yy - 6 }, p.thmB, { align: 'center', negrita: true, size: sz });
      }
      trianguloVectores(ctx, caja, [
        { v: pc.vBRvec, color: p.acc, base: 'v', sub: 'B/R' },
        { v: pc.vREvec, color: p.intuB, base: 'v', sub: 'R/E' },
        { v: pc.vBEvec, color: p.fg, base: 'v', sub: 'B/E' }], p, { titulo: [{ b: 'v', s: 'B/E' }, ' = ', { b: 'v', s: 'B/R' }, ' + ', { b: 'v', s: 'R/E' }] });
    } else {
      ejes(ctx, cam, { unidad: 'km', nombreX: 'x', nombreY: 'y' }, p);
      if (escena.traza && escena.traza.length > 1) polilinea(ctx, cam, escena.traza, p.acc, 3, { alpha: 0.5 });
      const A = cam.aPantalla(st.pos);
      const ang = Math.atan2(-pc.vPEvec.y, pc.vPEvec.x);
      const angProa = Math.atan2(-pc.vPAvec.y, pc.vPAvec.x);
      void ang;
      casco(ctx, AVION, A.x, A.y, angProa, p.card, p.fg);
      // rosa de los vientos (N arriba) arriba a la derecha
      const cx = cam.w - 36, cy = 40, r = 22;
      ctx.save(); ctx.fillStyle = p.card; ctx.strokeStyle = p.bd; ctx.lineWidth = 1.2; ctx.globalAlpha = 0.94;
      ctx.beginPath(); ctx.arc(cx, cy, r + 12, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; ctx.stroke();
      ctx.strokeStyle = p.mut; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke(); ctx.restore();
      flechaPx(ctx, cx, cy + 6, cx, cy - r, p.warnB, { ancho: 2, cabeza: 7, cabezaAncho: 3 });
      const sz = 10;
      rotulo(ctx, ['N'], { x: cx, y: cy - r - 14 + sz, }, p.warnB, { align: 'center', size: sz, negrita: true });
      rotulo(ctx, ['E'], { x: cx + r + 3, y: cy + 4 }, p.mut, { size: sz });
      rotulo(ctx, ['O'], { x: cx - r - 3, y: cy + 4 }, p.mut, { size: sz, align: 'right' });
      rotulo(ctx, ['S'], { x: cx, y: cy + r + 12 }, p.mut, { size: sz, align: 'center' });
      trianguloVectores(ctx, caja, [
        { v: pc.vPAvec, color: p.acc, base: 'v', sub: 'P/A' },
        { v: pc.vAEvec, color: p.intuB, base: 'v', sub: 'A/E' },
        { v: pc.vPEvec, color: p.fg, base: 'v', sub: 'P/E' }], p, { titulo: [{ b: 'v', s: 'P/E' }, ' = ', { b: 'v', s: 'P/A' }, ' + ', { b: 'v', s: 'A/E' }] });
    }
  }

  /* ------------------------------------------------------------------ entrada */
  function dibujar(ctx, escena, paleta, w, h) {
    const p = paleta || Paleta.leer();
    _ESTADO.paleta = p;
    DIM = { w, h };
    FS = tam(w);
    ctx.save();
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = p.card; ctx.fillRect(0, 0, w, h);
    const { cam } = preparar(escena, w, h);
    ctx.font = FS + 'px ' + p.sans;
    ({ 1: dibujarPestana1, 2: dibujarPestana2, 3: dibujarPestana3, 4: dibujarPestana4 })[escena.pestana](ctx, cam, escena, p);
    ctx.restore();
  }

  const API = {
    Paleta, Camara, Lienzo, preparar, escalas, dibujar,
    dibujarPestana1, dibujarPestana2, dibujarPestana3, dibujarPestana4,
    ejes, vector, etiqueta, rotulo, polilinea, punto, marcador, textoConHalo, trianguloVectores, flechaPx,
    fmt3d
  };
  if (typeof module === 'object' && module.exports) module.exports = API;
  else (raiz.SIM3 = raiz.SIM3 || {}).render = API;
})(typeof window !== 'undefined' ? window : globalThis);
