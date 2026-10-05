'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const F = require('../sim_tema03_fisica.js');

function cerca(real, esp, rel = 1e-3, abs = 1e-9, msg = '') {
  const tol = Math.max(Math.abs(esp) * rel, abs);
  assert.ok(Math.abs(real - esp) <= tol, `${msg} real=${real} esperado=${esp} tol=${tol}`);
}
const A = { v0: 20, alfa0Deg: 35, y0: 0, g: 9.80 };

test('constantes', () => {
  assert.deepEqual(F.G, { tierra: 9.80, luna: 1.62, marte: 3.71 });
  cerca(F.DT, 1 / 120);
});

test('10.1 caso A', () => {
  const p = F.proyectil(A);
  cerca(p.v0x, 16.383); cerca(p.v0y, 11.472); cerca(p.t1, 1.1706); cerca(p.yMax, 6.7141);
  cerca(p.tv, 2.3411); cerca(p.R, 38.355);
  cerca(p.impacto.v, 20.000); cerca(p.impacto.angDeg, -35.0);
  assert.equal(p.simetrico, true);
  assert.equal(p.tieneVertice, true);
});

test('10.1 caso A(t)', () => {
  const p = F.proyectil(A);
  const e = p.estado(1.20);
  cerca(e.x, 19.660); cerca(e.y, 6.7098); cerca(e.vx, 16.383); cerca(e.vy, -0.28847);
  cerca(e.v, 16.386); cerca(e.angDeg, -1.009); cerca(e.aPar, 0.17253); cerca(e.aPerp, 9.7985);
  assert.equal(e.ax, 0); assert.equal(e.ay, -9.80);
  assert.equal(e.fase, 'vertice');
  assert.equal(p.estado(1.25).fase, 'bajada');
  assert.equal(p.estado(1.00).fase, 'subida');
  assert.equal(p.estado(0).fase, 'inicio');
  assert.equal(p.estado(99).fase, 'impacto');
  assert.equal(p.estado(99).t, p.tv);
  cerca(p.estado(99).y, 0, 1e-3, 1e-9);
});

test('10.1 caso B (Ej. 3.7)', () => {
  const p = F.proyectil({ v0: 37.0, alfa0Deg: 53.1, y0: 0, g: 9.80 });
  cerca(p.t1, 3.0192); cerca(p.yMax, 44.667); cerca(p.tv, 6.0384); cerca(p.R, 134.15);
  const e = p.estado(2.0);
  cerca(e.x, 44.431); cerca(e.y, 39.577); cerca(e.v, 24.358); cerca(e.angDeg, 24.21);
});

test('10.1 caso C (Ej. 3.9)', () => {
  const p = F.proyectil({ v0: 10.0, alfa0Deg: -20, y0: 8.0, g: 9.80 });
  assert.equal(p.tieneVertice, false);
  assert.equal(p.t1, 0); assert.equal(p.yMax, 8.0);
  cerca(p.tv, 0.97556); cerca(p.R, 9.1672); cerca(p.impacto.v, 16.025); cerca(p.impacto.angDeg, -54.10);
});

test('10.1 casos D (Luna) y E (Marte)', () => {
  const d = F.proyectil({ ...A, g: 1.62 });
  cerca(d.t1, 7.0812); cerca(d.yMax, 40.616); cerca(d.tv, 14.162); cerca(d.R, 232.02);
  const m = F.proyectil({ ...A, g: 3.71 });
  cerca(m.t1, 3.0921); cerca(m.yMax, 17.735); cerca(m.tv, 6.1841); cerca(m.R, 101.31);
});

test('10.1 caso F (vertical)', () => {
  const p = F.proyectil({ v0: 20, alfa0Deg: 90, y0: 0, g: 9.80 });
  assert.ok(Math.abs(p.R) < 1e-9);
  cerca(p.t1, 2.0408); cerca(p.yMax, 20.408); cerca(p.tv, 4.0816);
});

test('10.1 casos G/H/I (Ej. 3.8)', () => {
  const g = (a) => F.proyectil({ v0: 20, alfa0Deg: a, y0: 0, g: 9.80 });
  cerca(g(45).R, 40.816);
  cerca(g(30).R, 35.348); cerca(g(60).R, 35.348);
  cerca(g(30).yMax, 5.1020); cerca(g(60).yMax, 15.306);
  assert.ok(g(45).R > g(30).R && g(45).R > g(60).R);
});

test('10.1 caso J (y0 distinto de 0)', () => {
  const p = F.proyectil({ v0: 20, alfa0Deg: 35, y0: 10, g: 9.80 });
  cerca(p.t1, 1.1706); cerca(p.yMax, 16.714); cerca(p.tv, 3.0175); cerca(p.R, 49.435);
  cerca(p.impacto.v, 24.413); cerca(p.impacto.angDeg, -47.85);
  assert.equal(p.simetrico, false);
});

test('10.1 caso K (sin vuelo)', () => {
  const p = F.proyectil({ v0: 20, alfa0Deg: 0, y0: 0, g: 9.80 });
  assert.equal(p.sinVuelo, true); assert.equal(p.tv, 0); assert.equal(p.R, 0);
  assert.equal(p.estado(1).fase, 'inicio');
});

test('10.1 caso L (Ej. 3.6, moto)', () => {
  const p = F.proyectil({ v0: 9.0, alfa0Deg: 0, y0: 20, g: 9.80 });
  const e = p.estado(0.50);
  cerca(e.x, 4.50); cerca(e.y - 20, -1.225); cerca(e.vy, -4.90); cerca(e.v, 10.247); cerca(e.angDeg, -28.57);
  cerca(p.tv, 2.0203); cerca(p.R, 18.183);
  assert.equal(p.tieneVertice, false);
  assert.equal(p.estado(0).fase, 'inicio');
  assert.equal(p.estado(0.5).fase, 'bajada');
});

test('10.1 simétrico: Rformula y hFormula', () => {
  const p = F.proyectil(A);
  assert.ok(Math.abs(p.Rformula - p.R) < 1e-9);
  assert.ok(Math.abs(p.hFormula - p.yMax) < 1e-9);
  assert.equal(F.proyectil({ ...A, y0: 10 }).Rformula, null);
});

test('10.1 integrador semi-implícito vs analítico', () => {
  const p = F.proyectil(A);
  const r = F.integrarSemiImplicito(
    { x: 0, y: 0, vx: p.v0x, vy: p.v0y }, () => ({ x: 0, y: -9.80 }), 1e-4, 1);
  const e = p.estado(1);
  assert.ok(Math.abs(r.x - e.x) < 5e-3);
  assert.ok(Math.abs(r.y - e.y) < 5e-3);
  cerca(e.x, 16.383); cerca(e.y, 6.5715);
});

test('10.1 estroboscopio caso A', () => {
  const p = F.proyectil(A);
  const s = p.estroboscopio();
  assert.equal(s.dt, 0.2);
  assert.equal(s.length, 12);
  cerca(s[1], 0.2); cerca(s[11], 2.2);
  assert.equal(s[0], 0);
});

test('trayectoria teórica', () => {
  const p = F.proyectil(A);
  const tr = p.trayectoria();
  assert.equal(tr.length, 201);
  assert.equal(tr[0].t, 0);
  cerca(tr[200].x, p.R); assert.ok(Math.abs(tr[200].y) < 1e-9);
  assert.equal(p.trayectoria(10).length, 11);
});

test('10.2 alcance máximo', () => {
  let m = F.alcanceMaximo({ v0: 20, y0: 0, g: 9.80 });
  cerca(m.alfaDeg, 45.000); cerca(m.R, 40.816);
  m = F.alcanceMaximo({ v0: 20, y0: 10, g: 9.80 });
  cerca(m.alfaDeg, 39.325); cerca(m.R, 49.823);
});

test('10.2 ángulos para diana', () => {
  let a = F.angulosParaDiana({ v0: 20, y0: 0, g: 9.80, D: 35 });
  assert.equal(a.length, 2);
  cerca(a[0], 29.519); cerca(a[1], 60.481); cerca(a[0] + a[1], 90, 1e-6);
  a = F.angulosParaDiana({ v0: 20, y0: 10, g: 9.80, D: 45 });
  assert.equal(a.length, 2);
  cerca(a[0], 23.356); cerca(a[1], 54.116);
  assert.deepEqual(F.angulosParaDiana({ v0: 20, y0: 10, g: 9.80, D: 50 }), []);
});

test('10.3 diagnóstico caso A', () => {
  const params = A;
  const d = (pregunta, respuesta) => F.diagnosticar({ pregunta, respuesta, params });
  assert.equal(d('R', 38.4).correcto, true);
  assert.equal(d('R', 31.6).codigo, 'RAD');
  assert.equal(d('R', 23.4).codigo, 'SEN');
  assert.equal(d('R', 19.2).codigo, 'T1');
  assert.equal(d('yMax', 3.74).codigo, 'RAD');
  assert.equal(d('yMax', 13.7).codigo, 'SINCOS');
  assert.equal(d('yMax', 13.4).codigo, 'DOS');
  assert.equal(d('yMax', 20.4).codigo, 'V0Y');
  assert.equal(d('tv', 1.17).codigo, 'T1');
  assert.equal(d('tv', 3.34).codigo, 'SINCOS');
  assert.equal(d('R', 999).codigo, 'OTRO');
  const ok = d('R', 38.4);
  cerca(ok.valorCorrecto, 38.355);
  assert.ok(typeof d('R', 31.6).mensaje === 'string' && d('R', 31.6).mensaje.length > 0);
});

test('10.3 diagnóstico caso J', () => {
  const params = { v0: 20, alfa0Deg: 35, y0: 10, g: 9.80 };
  const d = (pregunta, respuesta) => F.diagnosticar({ pregunta, respuesta, params });
  assert.equal(d('R', 38.4).codigo, 'SIM');
  assert.equal(d('tv', 2.34).codigo, 'SIM');
  assert.equal(d('yMax', 6.71).codigo, 'SIM');
  assert.equal(d('vImpacto', 20.0).codigo, 'VIMP');
  assert.equal(d('vImpacto', 18.1).codigo, 'VIMP');
  assert.equal(d('R', 49.4).correcto, true);
});

test('10.3 diagnóstico caso D (Luna)', () => {
  const params = { v0: 20, alfa0Deg: 35, y0: 0, g: 1.62 };
  assert.equal(F.diagnosticar({ pregunta: 'R', respuesta: 38.4, params }).codigo, 'GT');
  assert.equal(F.diagnosticar({ pregunta: 'R', respuesta: 232, params }).correcto, true);
});

test('10.4 robot t = 2', () => {
  const T = F.trayectorias.robot;
  const r = T.r(2), v = T.v(2), a = T.a(2);
  cerca(r.x, 1.0); cerca(r.y, 2.2);
  cerca(v.x, -1.0); cerca(v.y, 1.3); cerca(F.modulo(v), 1.6401); cerca(F.anguloDeg(v), 127.57);
  cerca(a.x, -0.50); cerca(a.y, 0.30); cerca(F.modulo(a), 0.58310); cerca(F.anguloDeg(a), 149.04);
  const d = F.descomponerAceleracion(v, a);
  cerca(d.aPar, 0.54264); cerca(d.aPerp, 0.21340);
  assert.equal(d.vNula, false);
  cerca(d.aParVec.x + d.aPerpVec.x, a.x, 1e-9, 1e-12);
  cerca(d.aParVec.y + d.aPerpVec.y, a.y, 1e-9, 1e-12);
  assert.equal(T.tMax, 4);
});

test('10.4 velocidad media (robot)', () => {
  const T = F.trayectorias.robot;
  let m = F.velocidadMedia(T, 0, 2);
  cerca(m.vmed.x, -0.50); cerca(m.vmed.y, 1.10); assert.ok(!m.haciaAtras);
  cerca(m.dr.x, -1.0); cerca(m.r1.x, 2.0);
  const casos0 = [[1, -0.25, 1.025], [0.1, -0.025, 1.00025], [0.01, -0.0025, 1.0000025]];
  for (const [dt, ex, ey] of casos0) {
    m = F.velocidadMedia(T, 0, dt); cerca(m.vmed.x, ex, 1e-6, 1e-9); cerca(m.vmed.y, ey, 1e-6);
  }
  const casos2 = [[1, -1.25, 1.475], [0.1, -1.025, 1.31525], [0.01, -1.0025, 1.3015025]];
  for (const [dt, ex, ey] of casos2) {
    m = F.velocidadMedia(T, 2, dt); cerca(m.vmed.x, ex, 1e-6); cerca(m.vmed.y, ey, 1e-6);
  }
  m = F.velocidadMedia(T, 3.5, 1);
  assert.equal(m.haciaAtras, true);
  assert.equal(F.velocidadMedia('robot', 0, 1).haciaAtras, false);
});

test('10.4 parábola, círculo, Lissajous, espiral', () => {
  const P = F.trayectorias.parabola;
  let r = P.r(0.5), v = P.v(0.5), a = P.a(0.5), d = F.descomponerAceleracion(v, a);
  cerca(r.x, 2.5); cerca(r.y, 3.1051); cerca(v.x, 5.0); cerca(v.y, 3.7603); cerca(F.modulo(v), 6.2562);
  cerca(d.aPar, -5.8903); cerca(d.aPerp, 7.8323);
  cerca(P.tMax, 1.7675);

  const C = F.trayectorias.circulo;
  r = C.r(1.0); v = C.v(1.0); a = C.a(1.0); d = F.descomponerAceleracion(v, a);
  assert.ok(Math.abs(r.x) < 1e-9); cerca(r.y, 2.0);
  cerca(v.x, -3.1416); assert.ok(Math.abs(v.y) < 1e-9);
  cerca(F.modulo(a), 4.9348); assert.ok(Math.abs(d.aPar) < 1e-9); cerca(d.aPerp, 4.9348);
  assert.equal(C.tMax, 8);

  const L = F.trayectorias.lissajous;
  r = L.r(0.5); v = L.v(0.5); a = L.a(0.5);
  cerca(r.x, 1.4383); cerca(r.y, 1.6829); cerca(v.x, 2.6327); cerca(v.y, 2.1612);
  cerca(a.x, -1.4383); cerca(a.y, -6.7318);
  cerca(L.tMax, 2 * Math.PI);

  const E = F.trayectorias.espiral;
  r = E.r(2.0); v = E.v(2.0); a = E.a(2.0); d = F.descomponerAceleracion(v, a);
  cerca(r.x, -0.62422); cerca(r.y, 1.3639); cerca(v.x, -1.5720); cerca(v.y, -0.16957);
  cerca(a.x, -0.28508); cerca(a.y, -1.7801); cerca(d.aPar, 0.47434); cerca(d.aPerp, 1.7393);
  cerca(E.tMax, 4 * Math.PI);
});

test('trayectorias: derivadas analíticas coherentes con diferencias finitas', () => {
  const h = 1e-6;
  for (const T of Object.values(F.trayectorias)) {
    assert.ok(T.id && T.nombre && T.tMax > 0 && T.ecuacionTex && T.src && T.src.l && T.src.ref);
    for (const t of [0.3, 0.9 * Math.min(T.tMax, 1.7)]) {
      const vn = F.escala(F.resta(T.r(t + h), T.r(t - h)), 1 / (2 * h));
      const an = F.escala(F.resta(T.v(t + h), T.v(t - h)), 1 / (2 * h));
      cerca(vn.x, T.v(t).x, 1e-5, 1e-6, T.id); cerca(vn.y, T.v(t).y, 1e-5, 1e-6, T.id);
      cerca(an.x, T.a(t).x, 1e-5, 1e-6, T.id); cerca(an.y, T.a(t).y, 1e-5, 1e-6, T.id);
    }
  }
  assert.deepEqual(Object.keys(F.trayectorias).sort(), ['circulo', 'espiral', 'lissajous', 'parabola', 'robot']);
});

test('descomponerAceleracion con v nula', () => {
  const d = F.descomponerAceleracion({ x: 0, y: 0 }, { x: 3, y: 4 });
  assert.equal(d.vNula, true); assert.equal(d.aPar, 0); assert.equal(d.aPerp, 5);
  assert.deepEqual(d.aParVec, { x: 0, y: 0 }); assert.deepEqual(d.aPerpVec, { x: 3, y: 4 });
});

test('utilidades vectoriales', () => {
  assert.deepEqual(F.suma({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 });
  assert.deepEqual(F.resta({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: -2, y: -2 });
  assert.deepEqual(F.escala({ x: 1, y: 2 }, 3), { x: 3, y: 6 });
  assert.equal(F.modulo({ x: 3, y: 4 }), 5);
  assert.equal(F.dot({ x: 1, y: 2 }, { x: 3, y: 4 }), 11);
  assert.equal(F.cruz({ x: 1, y: 0 }, { x: 0, y: 1 }), 1);
  cerca(F.anguloDeg({ x: -1, y: 0 }), 180); cerca(F.anguloDeg({ x: 0, y: -1 }), -90);
  const v = F.desdeAnguloDeg(2, 90); cerca(v.y, 2); assert.ok(Math.abs(v.x) < 1e-12);
  // tren de la fig. 3.34 de U
  const s = F.suma({ x: 3.0, y: 0 }, { x: 0, y: 1.0 });
  cerca(F.modulo(s), 3.1623); cerca(F.anguloDeg(s), 18.435);
});

test('10.5 circular uniforme (Ej. 3.12)', () => {
  const c = F.circular({ modo: 'uniforme', R: 5.0, T: 4.0 });
  cerca(c.v, 7.8540); cerca(c.omega, 1.5708);
  const e0 = c.estado(0);
  cerca(e0.aRad, 12.337); cerca(e0.aRad / 9.80, 1.2589); assert.equal(e0.aTan, 0);
  const e = c.estado(1.0);
  cerca(e.thetaDeg, 90); cerca(e.theta, Math.PI / 2);
  assert.ok(Math.abs(e.pos.x) < 1e-9); cerca(e.pos.y, 5.0);
  cerca(e.v, 7.8540); cerca(e.omega, 1.5708); cerca(e.a, e.aRad); cerca(e.vueltas, 0.25);
  // v tangente (antihorario) y a radial hacia el centro
  assert.ok(Math.abs(e.vVec.x + 7.854) < 1e-3 && Math.abs(e.vVec.y) < 1e-9);
  assert.ok(Math.abs(e.aRadVec.x) < 1e-9 && e.aRadVec.y < 0);
  assert.equal(e.detenido, false);
  cerca(c.estado(5).thetaDeg, 90);
});

test('10.5 aRadDesde / radioDesde (Ej. 3.11)', () => {
  cerca(F.aRadDesde({ v: 40, R: 170 }), 9.4118);
  cerca(F.radioDesde({ v: 40, aRad: 9.4 }), 170.21);
});

test('10.5 circular no uniforme', () => {
  const c = F.circular({ modo: 'noUniforme', R: 2.0, v0: 1.0, aTan: 0.5 });
  const e = c.estado(2.0);
  cerca(e.v, 2.0); cerca(e.s, 3.0); cerca(e.theta, 1.5); cerca(e.thetaDeg, 85.94);
  cerca(e.omega, 1.0); cerca(e.aRad, 2.0); cerca(e.a, 2.0616); cerca(e.aTan, 0.5);
  assert.equal(e.detenido, false);
  assert.equal(c.tStop, Infinity);
});

test('10.5 circular frenada', () => {
  const c = F.circular({ modo: 'noUniforme', R: 2.0, v0: 3.0, aTan: -1.0 });
  cerca(c.tStop, 3.0);
  const e = c.estado(5);
  assert.equal(e.v, 0); assert.equal(e.aRad, 0); assert.equal(e.aTan, 0); assert.equal(e.detenido, true);
  cerca(e.s, 4.5); cerca(e.theta, 2.25); cerca(e.thetaDeg, 128.92);
  assert.equal(c.estado(1).detenido, false);
  cerca(c.estado(1).v, 2.0);
  const c0 = F.circular({ modo: 'noUniforme', R: 2.0, v0: 0, aTan: -1 });
  assert.equal(c0.estado(0).detenido, true);
  assert.equal(c0.estado(0).v, 0);
});

test('10.6 barca', () => {
  let b = F.barca({ vBR: 4.0, vRE: 2.0, betaDeg: 0, d: 60 });
  cerca(b.vBEvec.x, 2.0); cerca(b.vBEvec.y, 4.0); cerca(b.vBE, 4.4721);
  cerca(b.desviacionDeg, 26.565); cerca(b.tCruce, 15.000); cerca(b.deriva, 30.000);
  const p = b.posicion(15); cerca(p.x, 30); cerca(p.y, 60);
  cerca(b.posicion(100).y, 60);
  b = F.barca({ vBR: 4.0, vRE: 2.0, betaDeg: 20, d: 60 });
  cerca(b.vBEvec.x, 0.63192); cerca(b.vBEvec.y, 3.7588); cerca(b.vBE, 3.8115);
  cerca(b.tCruce, 15.963); cerca(b.deriva, 10.087);
  b = F.barca({ vBR: 4.0, vRE: 2.0, betaDeg: 90, d: 60 });
  assert.equal(b.tCruce, Infinity);
});

test('10.6 rumbo recto y mínima deriva', () => {
  const r = F.rumboRecto({ vBR: 4.0, vRE: 2.0 });
  cerca(r.betaDeg, 30.000); cerca(r.vBE, 3.4641);
  const b = F.barca({ vBR: 4.0, vRE: 2.0, betaDeg: r.betaDeg, d: 60 });
  cerca(b.tCruce, 17.321); assert.ok(Math.abs(b.deriva) < 1e-9);
  assert.equal(F.rumboRecto({ vBR: 2.0, vRE: 3.0 }), null);
  assert.equal(F.rumboRecto({ vBR: 2.0, vRE: 2.0 }), null);
  const m = F.rumboMinimaDeriva({ vBR: 2.0, vRE: 3.0, d: 60 });
  cerca(m.betaDeg, 41.810); cerca(m.deriva, 67.082);
  cerca(F.barca({ vBR: 2.0, vRE: 3.0, betaDeg: 0, d: 60 }).deriva, 90.000);
  const m2 = F.rumboMinimaDeriva({ vBR: 4.0, vRE: 2.0 });
  cerca(m2.betaDeg, 30.0);
  const r0 = F.rumboRecto({ vBR: 4.0, vRE: 0 }); assert.equal(r0.betaDeg, 0);
});

test('10.6 avión (Ej. 3.14 y 3.15)', () => {
  const a = F.avion({ vPA: 240, rumboDeg: 0, vAE: 100, vientoHaciaDeg: 90 });
  cerca(a.vPE, 260.00); cerca(a.rumboSueloDeg, 22.620);
  cerca(a.vPEvec.x, 100); cerca(a.vPEvec.y, 240);
  const r = F.rumboParaDerrota({ vPA: 240, vAE: 100, vientoHaciaDeg: 90, derrotaDeg: 0 });
  cerca(r.rumboDeg, 335.376); cerca(r.vPE, 218.17);
  // comprobación cruzada: ese rumbo da realmente derrota norte
  const chk = F.avion({ vPA: 240, rumboDeg: r.rumboDeg, vAE: 100, vientoHaciaDeg: 90 });
  assert.ok(Math.abs(chk.vPEvec.x) < 1e-9); cerca(chk.vPEvec.y, r.vPE);
  assert.equal(F.rumboParaDerrota({ vPA: 50, vAE: 100, vientoHaciaDeg: 90, derrotaDeg: 0 }), null);
  assert.equal(F.rumboParaDerrota({ vPA: 100, vAE: 100, vientoHaciaDeg: 180, derrotaDeg: 0 }), null);
});

test('10.6 pregunta de rumbo de la barca: arctan(vRE/vBR) = 26.565', () => {
  cerca(Math.atan(2 / 4) * 180 / Math.PI, 26.565);
});
