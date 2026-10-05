'use strict';
// node --test simulaciones/test/
// Los datos de física están mockeados con los números de la spec §10 (no se importa sim_tema03_fisica.js).
const test = require('node:test');
const assert = require('node:assert');
const FX = require('../sim_tema03_formulas.js');

const porId = (lista, id) => lista.find((f) => f.id === id);
const estados = (lista) => Object.fromEntries(lista.map((f) => [f.id, f.estado]));

/* ---------- mocks §10.1 ---------- */
const preA = { v0x: 16.383, v0y: 11.472, t1: 1.1706, yMax: 6.7141, tv: 2.3411, R: 38.355, tieneVertice: true, simetrico: true, sinVuelo: false };
const paramsA = { v0: 20, alfa0Deg: 35, y0: 0, g: 9.8 };
const estA120 = { t: 1.2, x: 19.660, y: 6.7098, vx: 16.383, vy: -0.28847, v: 16.386, angDeg: -1.009 };
const ctxA = (fase, estado, extra) => Object.assign({ params: paramsA, estado, precalc: preA, fase, opciones: { curvaTeorica: true, pausa: true } }, extra || {});

const preJ = { v0x: 16.383, v0y: 11.472, t1: 1.1706, yMax: 16.714, tv: 3.0175, R: 49.435, tieneVertice: true, simetrico: false };
const paramsJ = { v0: 20, alfa0Deg: 35, y0: 10, g: 9.8 };
const preC = { v0x: 9.3969, v0y: -3.4202, t1: 0, yMax: 8.0, tv: 0.97556, R: 9.1672, tieneVertice: false, simetrico: false };
const preK = { v0x: 20, v0y: 0, t1: 0, yMax: 0, tv: 0, R: 0, tieneVertice: false, simetrico: true, sinVuelo: true };

test('fmtR: 3 cifras, sin notación científica, -0 -> 0', () => {
  assert.strictEqual(FX.fmtR(19.66), '19.7');
  assert.strictEqual(FX.fmtR(6.7098), '6.71');
  assert.strictEqual(FX.fmtR(-0.28847), '-0.288');
  assert.strictEqual(FX.fmtR(20), '20.0');
  assert.strictEqual(FX.fmtR(1234.56), '1235');
  assert.strictEqual(FX.fmtR(-0), '0');
  assert.strictEqual(FX.fmtR(-1e-12), '0');
  assert.ok(!/e/.test(FX.fmtR(0.0000123)));
  assert.strictEqual(FX.fmtT(1.2), '1.20');
  assert.strictEqual(FX.fmtG(9.8), '9.80');
});

test('F2.2 caso A en t = 1.20 (texto obligatorio de §5.2)', () => {
  const l = FX.construir(2, ctxA('vertice', estA120));
  const f = porId(l, 'F2.2');
  assert.strictEqual(f.texSust, 'x = (20\\cdot\\cos 35^\\circ)\\cdot 1.20 = 19.7\\ \\text{m}');
  assert.match(porId(l, 'F2.3').texSust, /= 6\.71\\ \\text\{m\}$/);
  assert.match(porId(l, 'F2.5').texSust, /= -0\.288\\ \\text\{m\/s\}$/);
  assert.match(porId(l, 'F2.5').texSust, /^v_y = 11\.5 - 9\.80\\cdot 1\.20/);
});

test('P2 caso A: orden fijo, estados por fase', () => {
  const ids = FX.construir(2, ctxA('subida', { t: 1.0, x: 16.4, y: 6.57, vx: 16.383, vy: 1.67, v: 16.5, angDeg: 5.8 })).map((f) => f.id);
  assert.deepStrictEqual(ids, ['F2.1', 'F2.2', 'F2.3', 'F2.4', 'F2.5', 'F2.6', 'F2.7', 'F2.8', 'F2.9', 'F2.10', 'F2.11', 'F2.12']);
  let s = estados(FX.construir(2, ctxA('subida', { t: 1.0, x: 16.4, y: 6.57, vx: 16.383, vy: 1.67, v: 16.5, angDeg: 5.8 })));
  assert.strictEqual(s['F2.2'], 'resaltada'); assert.strictEqual(s['F2.3'], 'resaltada');
  assert.strictEqual(s['F2.5'], 'resaltada'); assert.strictEqual(s['F2.8'], 'activa');
  assert.strictEqual(s['F2.12'], 'resaltada'); // curva teórica + pausa
  s = estados(FX.construir(2, ctxA('vertice', estA120)));
  assert.strictEqual(s['F2.8'], 'resaltada'); assert.strictEqual(s['F2.7'], 'resaltada');
  assert.strictEqual(s['F2.2'], 'activa');
  const n5 = porId(FX.construir(2, ctxA('vertice', estA120)), 'F2.5').nota;
  assert.match(n5, /punto más alto/);
  assert.match(porId(FX.construir(2, ctxA('vertice', estA120)), 'F2.7').nota, /sigue siendo/);
  const imp = { t: 2.3411, x: 38.355, y: 0, vx: 16.383, vy: -11.472, v: 20, angDeg: -35 };
  const li = FX.construir(2, ctxA('impacto', imp));
  s = estados(li);
  ['F2.6', 'F2.9', 'F2.10', 'F2.11'].forEach((id) => assert.strictEqual(s[id], 'resaltada', id));
  assert.match(porId(li, 'F2.11').nota, /Coincide con F2\.10/);
  assert.match(porId(li, 'F2.6').texSust, /\\alpha = -35\.0\^\\circ/);
  assert.match(porId(li, 'F2.10').texSust, /= 38\.4\\ \\text\{m\}/);
  assert.match(porId(li, 'F2.9').texSust, /= 2\.34\\ \\text\{s\}/);
});

test('P2 fase inicio: F2.1 resaltada y F2.2-F2.6 con t = 0.00', () => {
  const l = FX.construir(2, ctxA('inicio', { t: 0, x: 0, y: 0, vx: 16.383, vy: 11.472, v: 20, angDeg: 35 }));
  assert.strictEqual(porId(l, 'F2.1').estado, 'resaltada');
  assert.match(porId(l, 'F2.2').texSust, /\\cdot 0\.00 = 0\.00\\ \\text\{m\}|\\cdot 0\.00 = 0\\ \\text\{m\}/);
  assert.match(porId(l, 'F2.1').texSust, /v_\{0x\} = 20\\cos 35\^\\circ = 16\.4/);
});

test('P2: cambio reciente de v0 resalta F2.1 solo dentro de 1.5 s', () => {
  const base = { t: 1.0, x: 16.4, y: 6.57, vx: 16.383, vy: 1.67, v: 16.5, angDeg: 5.8 };
  let l = FX.construir(2, ctxA('subida', base, { ultimoCambio: { control: 'v0', instante: 10 }, ahora: 11 }));
  assert.strictEqual(porId(l, 'F2.1').estado, 'resaltada');
  l = FX.construir(2, ctxA('subida', base, { ultimoCambio: { control: 'v0', instante: 10 }, ahora: 12 }));
  assert.strictEqual(porId(l, 'F2.1').estado, 'activa');
});

test('P2 caso J (y0 = 10): F2.11 noAplica con el CUIDADO de U p. 80', () => {
  const imp = { t: 3.0175, x: 49.435, y: 0, vx: 16.383, vy: -18.1, v: 24.413, angDeg: -47.85 };
  const l = FX.construir(2, { params: paramsJ, estado: imp, precalc: preJ, fase: 'impacto', opciones: {} });
  const f = porId(l, 'F2.11');
  assert.strictEqual(f.estado, 'noAplica');
  assert.strictEqual(f.texSust, null);
  assert.match(f.nota, /misma altura/);
  assert.match(f.nota, /p\. 80/);
  assert.strictEqual(f.src.ref, 'U Ejemplo 3.8 y CUIDADO, p. 80');
  assert.match(porId(l, 'F2.8').texSust, /y_\{\\max\} = 10 \+ /);
  assert.strictEqual(porId(l, 'F2.9').estado, 'resaltada');
});

test('P2 caso C (sin vértice): F2.8 noAplica; alfa negativo con paréntesis', () => {
  const l = FX.construir(2, { params: { v0: 10, alfa0Deg: -20, y0: 8, g: 9.8 }, estado: { t: 0.5, x: 4.7, y: 5.3, vx: 9.4, vy: -8.3, v: 12.6, angDeg: -41 }, precalc: preC, fase: 'bajada', opciones: {} });
  const f = porId(l, 'F2.8');
  assert.strictEqual(f.estado, 'noAplica');
  assert.match(f.nota, /punto más alto es el de salida/);
  assert.match(porId(l, 'F2.1').texSust, /\\sin\(-20\^\\circ\)/);
  assert.match(porId(l, 'F2.9').texSust, /^t_v = \\dfrac\{-3\.42 \+ \\sqrt\{\(-3\.42\)\^2/);
});

test('P2 caso K (sin vuelo): no lanza y avisa', () => {
  const l = FX.construir(2, { params: { v0: 20, alfa0Deg: 0, y0: 0, g: 9.8 }, estado: { t: 0, x: 0, y: 0, vx: 20, vy: 0, v: 20, angDeg: 0 }, precalc: preK, fase: 'inicio', opciones: {} });
  assert.strictEqual(porId(l, 'F2.8').estado, 'noAplica');
  assert.match(porId(l, 'F2.9').nota, /no despega/);
  assert.match(porId(l, 'F2.10').texSust, /= 0\\ \\text\{m\}/);
});

test('P2 tiro vertical: F2.12 noAplica', () => {
  const l = FX.construir(2, { params: { v0: 20, alfa0Deg: 90, y0: 0, g: 9.8 }, estado: { t: 1, x: 0, y: 15, vx: 0, vy: 10, v: 10, angDeg: 90 }, precalc: { v0x: 0, v0y: 20, t1: 2.04, yMax: 20.4, tv: 4.08, R: 0, tieneVertice: true, simetrico: true }, fase: 'subida', opciones: { curvaTeorica: true, pausa: true } });
  assert.strictEqual(porId(l, 'F2.12').estado, 'noAplica');
});

/* ---------- P1 ---------- */
const robot2 = { t: 2, r: { x: 1.0, y: 2.2 }, v: { x: -1.0, y: 1.3 }, a: { x: -0.5, y: 0.3 } };
test('P1 robot t = 2: componentes y notas de a∥/a⊥', () => {
  const ctx = { params: { trayectoria: 'robot', dt: 1.0 }, estado: robot2, precalc: { vmed: { dr: { x: -1.25, y: 1.475 }, vmed: { x: -1.25, y: 1.475 }, haciaAtras: false } }, opciones: { vmed: true, aParPerp: true } };
  const l = FX.construir(1, ctx);
  assert.deepStrictEqual(l.map((f) => f.id), ['F1.0', 'F1.1', 'F1.2', 'F1.3', 'F1.4', 'F1.5', 'F1.6']);
  const f6 = porId(l, 'F1.6');
  assert.match(f6.texSust, /a_\\parallel = 0\.543/);
  assert.match(f6.texSust, /a_\\perp = 0\.213/);
  assert.match(f6.nota, /aumenta/);
  assert.strictEqual(f6.estado, 'resaltada');
  assert.match(porId(l, 'F1.4').texSust, /= 1\.64\\ \\text\{m\/s\},\\ \\alpha = 128\^\\circ/);
  assert.ok(porId(l, 'F1.4').nota); // vx < 0
  assert.strictEqual(porId(l, 'F1.3').estado, 'activa'); // dt = 1.0 > 0.01
  assert.match(porId(l, 'F1.0').texGeneral, /0\.025/);
  assert.strictEqual(porId(l, 'F1.0').src.l, 'U');
});

test('P1: F1.3 resaltada con Δt <= 0.01 y nota con |v_med − v|; F1.2 por Δt', () => {
  const ctx = { params: { trayectoria: 'robot', dt: 0.01 }, estado: robot2, precalc: { vmed: { dr: { x: -0.010025, y: 0.013015 }, vmed: { x: -1.0025, y: 1.3015025 }, haciaAtras: false } }, opciones: { vmed: true }, ultimoCambio: { control: 'dt', instante: 5 }, ahora: 5.2 };
  const l = FX.construir(1, ctx);
  assert.strictEqual(porId(l, 'F1.3').estado, 'resaltada');
  assert.match(porId(l, 'F1.3').nota, /Δt → 0/);
  assert.match(porId(l, 'F1.3').nota, /0\.00292/);
  assert.strictEqual(porId(l, 'F1.2').estado, 'resaltada');
  assert.strictEqual(porId(l, 'F1.6'), undefined); // aParPerp apagado
});

test('P1: círculo -> solo cambia la dirección; v ≈ 0 -> a∥ no definida; hacia atrás', () => {
  const c = { t: 1, r: { x: 0, y: 2 }, v: { x: -3.1416, y: 0 }, a: { x: 0, y: -4.9348 } };
  let l = FX.construir(1, { params: { trayectoria: 'circulo', dt: 1 }, estado: c, precalc: {}, opciones: { aParPerp: true } });
  assert.match(porId(l, 'F1.6').nota, /Solo cambia la dirección/);
  l = FX.construir(1, { params: { trayectoria: 'robot', dt: 1 }, estado: { t: 0, r: { x: 0, y: 0 }, v: { x: 0, y: 0 }, a: { x: 1, y: 0 } }, precalc: {}, opciones: { aParPerp: true } });
  assert.match(porId(l, 'F1.6').nota, /no definida/);
  l = FX.construir(1, { params: { trayectoria: 'robot', dt: 1 }, estado: robot2, precalc: { vmed: { dr: { x: 0, y: 0 }, vmed: { x: 0, y: 0 }, haciaAtras: true } }, opciones: { vmed: true } });
  assert.match(porId(l, 'F1.2').nota, /hacia atrás/);
});

/* ---------- P3 ---------- */
test('P3 uniforme R = 5, T = 4 (Ej. 3.12)', () => {
  const e = { t: 1, theta: Math.PI / 2, thetaDeg: 90, v: 7.854, omega: 1.5708, aRad: 12.337, aTan: 0, a: 12.337, detenido: false };
  const l = FX.construir(3, { params: { modo: 'uniforme', R: 5, T: 4 }, estado: e, precalc: {}, opciones: {} });
  assert.deepStrictEqual(l.map((f) => f.id), ['F3.1', 'F3.2', 'F3.3', 'F3.4', 'F3.5', 'F3.6']);
  assert.strictEqual(porId(l, 'F3.2').estado, 'resaltada');
  assert.strictEqual(porId(l, 'F3.1').texSust, 'v = \\dfrac{2\\pi\\cdot 5.0}{4.0} = 7.85\\ \\text{m/s}');
  assert.match(porId(l, 'F3.2').texSust, /= 12\.3\\ \\text\{m\/s\}\^2$/);
  assert.match(porId(l, 'F3.5').texSust, /= 1\.57\\ \\text\{rad\} = 90\.0\^\\circ/);
  assert.match(porId(l, 'F3.6').nota, /no cambia/);
  const l2 = FX.construir(3, { params: { modo: 'uniforme', R: 5, T: 4 }, estado: e, precalc: {}, opciones: {}, ultimoCambio: { control: 'T', instante: 0 }, ahora: 1 });
  assert.strictEqual(porId(l2, 'F3.1').estado, 'resaltada');
  assert.strictEqual(porId(l2, 'F3.3').estado, 'resaltada');
});

test('P3 no uniforme: F3.1/F3.3 noAplica, F3.6 resaltada, F3.8 según opción', () => {
  const e = { t: 2, theta: 1.5, thetaDeg: 85.94, v: 2.0, omega: 1.0, aRad: 2.0, aTan: 0.5, a: 2.0616, detenido: false };
  const p = { modo: 'noUniforme', R: 2, v0: 1, aTan: 0.5 };
  let l = FX.construir(3, { params: p, estado: e, precalc: {}, opciones: { aTotal: true } });
  assert.strictEqual(porId(l, 'F3.1').estado, 'noAplica');
  assert.strictEqual(porId(l, 'F3.3').estado, 'noAplica');
  assert.strictEqual(porId(l, 'F3.6').estado, 'resaltada');
  assert.match(porId(l, 'F3.6').nota, /Acelera/);
  assert.strictEqual(porId(l, 'F3.8').estado, 'resaltada');
  assert.match(porId(l, 'F3.8').texSust, /= 2\.06\\ \\text\{m\/s\}\^2/);
  assert.match(porId(l, 'F3.7').texSust, /^v = 1\.0 \+ \(0\.5\)\\cdot 2\.00 = 2\.00/);
  l = FX.construir(3, { params: p, estado: e, precalc: {}, opciones: {} });
  assert.strictEqual(porId(l, 'F3.8').estado, 'activa');
});

test('P3 frenada: evento detenido resalta F3.7 con tStop', () => {
  const e = { t: 5, theta: 2.25, thetaDeg: 128.92, v: 0, omega: 0, aRad: 0, aTan: 0, a: 0, detenido: true };
  const l = FX.construir(3, { params: { modo: 'noUniforme', R: 2, v0: 3, aTan: -1 }, estado: e, precalc: { tStop: 3 }, evento: 'detenido', opciones: {} });
  const f = porId(l, 'F3.7');
  assert.strictEqual(f.estado, 'resaltada');
  assert.match(f.nota, /Se ha parado en \$t\$ = 3\.00 s/);
  assert.match(f.texSust, /= 0\.00\\ \\text\{m\/s\}|= 0\\ \\text\{m\/s\}/);
  assert.notStrictEqual(porId(l, 'F3.6').estado, 'resaltada');
});

/* ---------- P4 ---------- */
test('P4 barca 4.0/2.0 β = 0 y β = 20°', () => {
  const pre = { vBEvec: { x: 2, y: 4 }, vBE: 4.4721, desviacionDeg: 26.565, tCruce: 15, deriva: 30, rumboRecto: { betaDeg: 30, vBE: 3.4641 } };
  const p = { escenario: 'barca', vBR: 4, vRE: 2, betaDeg: 0, d: 60 };
  let l = FX.construir(4, { params: p, estado: {}, precalc: pre, opciones: {} });
  assert.deepStrictEqual(l.map((f) => f.id), ['F4.1', 'F4.2', 'F4.3', 'F4.4', 'F4.5', 'F4.6']);
  assert.match(porId(l, 'F4.3').texSust, /= 4\.47\\ \\text\{m\/s\},\\ \\phi = 26\.6\^\\circ/);
  assert.match(porId(l, 'F4.4').texSust, /= 15\.0\\ \\text\{s\}.*= 30\.0\\ \\text\{m\}/);
  assert.match(porId(l, 'F4.5').texSust, /= 30\.0\^\\circ/);
  assert.strictEqual(porId(l, 'F4.6').estado, 'inactiva');
  assert.strictEqual(porId(l, 'F4.4').estado, 'activa');
  l = FX.construir(4, { params: p, estado: {}, precalc: pre, evento: 'llegada', opciones: { preguntaRumbo: true } });
  assert.strictEqual(porId(l, 'F4.4').estado, 'resaltada');
  assert.strictEqual(porId(l, 'F4.5').estado, 'resaltada');
  // cruce recto
  l = FX.construir(4, { params: { ...p, betaDeg: 30 }, estado: {}, precalc: { ...pre, vBEvec: { x: 0, y: 3.4641 }, vBE: 3.4641, desviacionDeg: 0, tCruce: 17.32, deriva: 0 }, opciones: {} });
  assert.strictEqual(porId(l, 'F4.5').estado, 'resaltada');
  assert.match(porId(l, 'F4.5').nota, /Cruce recto/);
});

test('P4 barca imposible (vBR <= vRE) y β negativo', () => {
  const pre = { vBEvec: { x: 3, y: 0 }, vBE: 3, desviacionDeg: 90, tCruce: Infinity, deriva: Infinity, rumboRecto: null };
  const l = FX.construir(4, { params: { escenario: 'barca', vBR: 2, vRE: 3, betaDeg: -90, d: 60 }, estado: {}, precalc: pre, opciones: {} });
  const f5 = porId(l, 'F4.5');
  assert.strictEqual(f5.estado, 'noAplica');
  assert.match(f5.nota, /imposible/);
  assert.strictEqual(porId(l, 'F4.4').texSust, null);
  assert.match(porId(l, 'F4.2').texSust, /\\sin\(-90\^\\circ\)/);
});

test('P4 avión Ej. 3.14 / 3.15: sin F4.4', () => {
  const pre = { vPEvec: { x: 100, y: 240 }, vPE: 260, rumboSueloDeg: 22.62 };
  const l = FX.construir(4, { params: { escenario: 'avion', vPA: 240, vAE: 100, vientoHaciaDeg: 90, rumboDeg: 0 }, estado: {}, precalc: pre, opciones: { preguntaRumbo: true } });
  assert.deepStrictEqual(l.map((f) => f.id), ['F4.1', 'F4.2', 'F4.3', 'F4.5', 'F4.6']);
  assert.match(porId(l, 'F4.3').texSust, /= 260\\ \\text\{km\/h\},\\ \\phi = 22\.6\^\\circ/);
  assert.match(porId(l, 'F4.5').texSust, /\\arcsin\\dfrac\{100\}\{240\} = 24\.6\^\\circ/);
  assert.strictEqual(porId(l, 'F4.5').estado, 'resaltada');
  assert.strictEqual(porId(l, 'F4.5').src.ref, 'U Ejemplo 3.15, p. 90');
  const l2 = FX.construir(4, { params: { escenario: 'avion', vPA: 80, vAE: 100, vientoHaciaDeg: 90, rumboDeg: 0 }, estado: {}, precalc: pre, opciones: {} });
  assert.strictEqual(porId(l2, 'F4.5').estado, 'noAplica');
});

/* ---------- invariantes generales ---------- */
test('todas las fórmulas tienen forma válida y fuente', () => {
  const ESTADOS = ['resaltada', 'activa', 'inactiva', 'noAplica'];
  const listas = [
    FX.construir(2, ctxA('vertice', estA120)),
    FX.construir(1, { params: { trayectoria: 'robot', dt: 1 }, estado: robot2, precalc: { vmed: { dr: { x: 0, y: 0 }, vmed: { x: 0, y: 0 } } }, opciones: { vmed: true, aParPerp: true } }),
    FX.construir(3, { params: { modo: 'uniforme', R: 5, T: 4 }, estado: { t: 0, theta: 0, v: 7.85, omega: 1.57, aRad: 12.3, aTan: 0, a: 12.3 }, precalc: {}, opciones: {} }),
    FX.construir(4, { params: { escenario: 'barca', vBR: 4, vRE: 2, betaDeg: 0, d: 60 }, estado: {}, precalc: { vBEvec: { x: 2, y: 4 }, vBE: 4.47, desviacionDeg: 26.6, tCruce: 15, deriva: 30 }, opciones: {} })
  ];
  for (const l of listas) {
    for (const f of l) {
      assert.ok(f.id && f.titulo && f.texGeneral && f.txt, f.id);
      assert.ok(ESTADOS.includes(f.estado), f.id + ' estado ' + f.estado);
      assert.ok(f.src && f.src.l && f.src.ref, f.id + ' src');
      assert.ok(!/NaN|undefined/.test(f.texSust || '') && !/NaN|undefined/.test(f.texGeneral), f.id + ' NaN/undefined');
    }
  }
  assert.deepStrictEqual(FX.construir(9, {}), []);
});

test('partirNota / texAPlano', () => {
  assert.deepStrictEqual(FX.partirNota('a $b$ c'), [{ math: false, s: 'a ' }, { math: true, s: 'b' }, { math: false, s: ' c' }]);
  assert.strictEqual(FX.notaPlana('$v_y=0$: punto'), 'v_y=0: punto');
  assert.match(FX.texAPlano('x = (20\\cdot\\cos 35^\\circ)\\cdot 1.20 = 19.7\\ \\text{m}'), /20·cos 35°/);
});

/* ---------- Panel con DOM falso ---------- */
function crearDocFalso() {
  class Nodo {
    constructor(tag) { this.tag = tag; this.children = []; this.attrs = {}; this.parentNode = null; this._text = ''; this.className = ''; this.style = {}; this.hidden = false; }
    appendChild(n) { if (n.parentNode) n.parentNode.removeChild(n); n.parentNode = this; this.children.push(n); return n; }
    removeChild(n) { const i = this.children.indexOf(n); if (i >= 0) this.children.splice(i, 1); n.parentNode = null; return n; }
    setAttribute(k, v) { this.attrs[k] = String(v); }
    getAttribute(k) { return this.attrs[k]; }
    get textContent() { return this._text + this.children.map((c) => c.textContent).join(''); }
    set textContent(v) { this._text = String(v); this.children.forEach((c) => { c.parentNode = null; }); this.children = []; }
  }
  return { createElement: (t) => new Nodo(t), createTextNode: (s) => { const n = new Nodo('#text'); n._text = s; return n; }, Nodo };
}

test('Panel: crea nodos con KaTeX, solo re-renderiza si cambió el string, y mantiene el orden', () => {
  const doc = crearDocFalso();
  const llamadas = [];
  const katex = { render: (tex, el, o) => { llamadas.push(tex); el.textContent = '[k]' + tex; assert.strictEqual(o.throwOnError, false); } };
  const cont = doc.createElement('div');
  const panel = FX.Panel(cont, { documento: doc, katex });
  const lista = FX.construir(2, ctxA('subida', { t: 1.0, x: 16.4, y: 6.57, vx: 16.383, vy: 1.67, v: 16.5, angDeg: 5.8 }));
  panel.actualizar(lista);
  const fxs = cont.children.filter((c) => c.className === 'fx');
  assert.strictEqual(fxs.length, 12);
  assert.strictEqual(fxs[1].getAttribute('data-id'), 'F2.2');
  assert.strictEqual(fxs[1].getAttribute('data-estado'), 'resaltada');
  const src = fxs[1].children.find((c) => c.className === 'src');
  assert.strictEqual(src.getAttribute('tabindex'), '0');
  assert.strictEqual(src.getAttribute('aria-label'), src.getAttribute('data-ref'));
  assert.ok(cont.children[cont.children.length - 1].textContent.includes('Resaltada = la que manda'));
  const n1 = llamadas.length;
  panel.actualizar(lista); // idéntico: ningún render
  assert.strictEqual(llamadas.length, n1);
  const lista2 = FX.construir(2, ctxA('subida', { t: 1.05, x: 17.2, y: 6.6, vx: 16.383, vy: 1.18, v: 16.4, angDeg: 4.1 }));
  panel.actualizar(lista2);
  assert.ok(llamadas.length > n1 && llamadas.length < n1 + 12, 'solo renderiza lo que cambió');
  assert.deepStrictEqual(cont.children.filter((c) => c.className === 'fx').map((c) => c.getAttribute('data-id')), lista2.map((f) => f.id));
  // cambio de pestaña: se retiran los nodos que sobran
  panel.actualizar(FX.construir(3, { params: { modo: 'uniforme', R: 5, T: 4 }, estado: { t: 0, theta: 0, v: 7.85, omega: 1.57, aRad: 12.3, aTan: 0, a: 12.3 }, precalc: {}, opciones: {} }));
  assert.strictEqual(cont.children.filter((c) => c.className === 'fx').length, 6);
  assert.ok(cont.children.filter((c) => c.className === 'fx').every((c) => /^F3\./.test(c.getAttribute('data-id'))));
});

test('Panel: sin KaTeX degrada a texto plano', () => {
  const doc = crearDocFalso();
  const cont = doc.createElement('div');
  const panel = FX.Panel(cont, { documento: doc, katex: null });
  panel.actualizar(FX.construir(2, ctxA('vertice', estA120)));
  const f22 = cont.children.find((c) => c.getAttribute && c.getAttribute('data-id') === 'F2.2');
  const sus = f22.children.find((c) => c.className === 'fx-sus');
  assert.match(sus.textContent, /20·cos 35°/);
  assert.ok(!/\\/.test(f22.textContent.replace(/\s/g, '')), 'sin barras invertidas TeX');
});

test('Panel: throttle a 10 Hz durante la animación; en pausa inmediato', () => {
  const doc = crearDocFalso();
  const cont = doc.createElement('div');
  let ahora = 1000;
  const timers = [];
  const panel = FX.Panel(cont, { documento: doc, katex: null, reloj: () => ahora, setTimeout: (f, ms) => { timers.push({ f, ms }); return timers.length; }, clearTimeout: () => {} });
  const mk = (t) => FX.construir(2, ctxA('subida', { t, x: 16 * t, y: 5, vx: 16.383, vy: 1, v: 16.4, angDeg: 3 }));
  assert.strictEqual(panel.actualizar(mk(0.5), { animando: true }), true);
  ahora += 30;
  assert.strictEqual(panel.actualizar(mk(0.6), { animando: true }), false); // diferida
  assert.strictEqual(timers.length, 1);
  assert.ok(timers[0].ms <= FX.INTERVALO_MS && timers[0].ms > 0);
  const f22 = () => cont.children.find((c) => c.getAttribute('data-id') === 'F2.2').children.find((c) => c.className === 'fx-sus').textContent;
  assert.match(f22(), /0\.50/);
  ahora += 80; timers[0].f();           // vence el temporizador
  assert.match(f22(), /0\.60/);
  ahora += 10;
  assert.strictEqual(panel.actualizar(mk(0.7), { animando: false }), true); // en pausa: inmediato
  assert.match(f22(), /0\.70/);
});
