// Series de práctica con problemas generados al azar, corrección con tolerancia y diagnóstico del error típico.
// Uso: <div class="drill" data-tipo="t5_plano" data-titulo="Plano inclinado con fricción" data-n="5"></div>
// Los generadores son puros (semilla -> problema) y están expuestos en window.FisPractica para recalcularlos desde Python
// (pruebas/test_practica.py). Cada problema lleva `data` (los datos de entrada) y `ans` (resultado esperado).
(function () {
  var d = document, g = 9.81, G0 = 6.674e-11, MT = 5.972e24, RT = 6.371e6, RG = 8.314;

  /* ---------- utilidades ---------- */
  function mulberry32(a) {
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function Rnd(seed) {
    var r = mulberry32(seed);
    return {
      ri: function (a, b) { return a + Math.floor(r() * (b - a + 1)); },
      pick: function (x) { return x[Math.floor(r() * x.length)]; },
      shuf: function (x) { x = x.slice(); for (var i = x.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = x[i]; x[i] = x[j]; x[j] = t; } return x; }
    };
  }
  var rad = Math.PI / 180;
  /* número para dentro de $…$: coma decimal y notación científica */
  function L(x, s) {
    s = s || 3; if (x === 0) return '0';
    var a = Math.abs(x), t;
    if (a >= 1e5 || a < 1e-3) { var e = Math.floor(Math.log10(a)), m = Number((x / Math.pow(10, e)).toPrecision(s)); t = String(m) + '\\times10^{' + e + '}'; }
    else t = String(Number(x.toPrecision(s)));
    return t.replace('.', '{,}');
  }
  function q(x, u, s) { return '$' + L(x, s || 4) + (u ? '\\,\\mathrm{' + u + '}' : '') + '$'; }
  function ok(a, v) { return Math.abs(a - v) <= 0.02 * Math.abs(v) + 1e-12; }
  function parseNum(str) {
    var t = String(str).replace(/−/g, '-').replace(/\s+/g, '').replace(/(?:×|x|\*|·)10\^?\(?(-?\d+)\)?/i, 'e$1').replace(',', '.');
    return /^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t) ? Number(t) : NaN;
  }

  var G = {};

  /* ---------- Tema 1 ---------- */
  G.t1_unidades = function (seed) {
    var R = Rnd(seed), v = R.ri(30, 130), a = v / 3.6;
    return { data: { v: v }, ans: a, u: 'm/s', enun: 'Un coche circula a ' + q(v, 'km/h') + '. Exprésalo en m/s.',
      sol: '$1\\,\\mathrm{km/h}=\\dfrac{1000\\,\\mathrm m}{3600\\,\\mathrm s}$, así que $v=\\dfrac{' + v + '}{3{,}6}=' + L(a) + '\\,\\mathrm{m/s}$.',
      diag: [[v * 3.6, 'Has multiplicado por 3,6. Para pasar de km/h a m/s se <b>divide</b> entre 3,6.']] };
  };
  G.t1_suma = function (seed) {
    var R = Rnd(seed), ax = R.ri(-6, 6), ay = R.ri(1, 7), bx = R.ri(-6, 6), by = R.ri(-7, -1), sx = ax + bx, sy = ay + by;
    if (sx === 0 && sy === 0) return G.t1_suma(seed + 1);
    var a = Math.hypot(sx, sy), ma = Math.hypot(ax, ay), mb = Math.hypot(bx, by);
    if (Math.abs(ma + mb - a) < 0.06 * a) return G.t1_suma(seed + 1);
    return { data: { ax: ax, ay: ay, bx: bx, by: by }, ans: a, u: '', enun: 'Dados $\\vec A=(' + ax + ',' + ay + ')$ y $\\vec B=(' + bx + ',' + by + ')$, calcula el módulo de $\\vec A+\\vec B$.',
      sol: '$\\vec A+\\vec B=(' + sx + ',' + sy + ')$ y $|\\vec A+\\vec B|=\\sqrt{' + sx + '^2+' + sy + '^2}=' + L(a) + '$.',
      diag: [[ma + mb, 'Has sumado los módulos. Los vectores se suman por componentes y luego se calcula el módulo del resultado.']] };
  };

  /* ---------- Tema 2 ---------- */
  G.t2_mua = function (seed) {
    var R = Rnd(seed), a = R.pick([1.5, 2, 2.5, 3, 4]), t = R.ri(4, 12), x = 0.5 * a * t * t;
    return { data: { a: a, t: t }, ans: x, u: 'm', enun: 'Un coche parte del reposo con aceleración constante ' + q(a, 'm/s^2') + '. ¿Qué distancia recorre en ' + q(t, 's') + '?',
      sol: '$x=v_0t+\\tfrac12at^2=\\tfrac12(' + L(a) + ')(' + t + ')^2=' + L(x) + '\\,\\mathrm m$.',
      diag: [[a * t * t, 'Te falta el factor $\\tfrac12$ de $x=\\tfrac12at^2$.'], [a * t, 'Eso es la rapidez final $v=at$, no la distancia.']] };
  };
  G.t2_frenado = function (seed) {
    var R = Rnd(seed), v = R.pick([10, 15, 20, 25, 30]), a = R.pick([2, 2.5, 4, 5, 6]), x = v * v / (2 * a);
    return { data: { v0: v, a: a }, ans: x, u: 'm', enun: 'Un coche que va a ' + q(v, 'm/s') + ' frena con deceleración constante de ' + q(a, 'm/s^2') + '. ¿Qué distancia recorre hasta detenerse?',
      sol: 'De $v^2=v_0^2-2ax$ con $v=0$: $x=\\dfrac{v_0^2}{2a}=\\dfrac{' + v + '^2}{2(' + L(a) + ')}=' + L(x) + '\\,\\mathrm m$.',
      diag: [[v * v / a, 'Te falta el 2 del denominador: $v^2=v_0^2-2a\\,\\Delta x$.'], [v / a, 'Eso es el tiempo de frenado $v_0/a$, no la distancia.']] };
  };
  G.t2_caida = function (seed) {
    var R = Rnd(seed), h = R.pick([5, 8, 10, 15, 20, 30, 45]), t = Math.sqrt(2 * h / g);
    return { data: { h: h }, ans: t, u: 's', enun: 'Se suelta una piedra desde ' + q(h, 'm') + ' de altura (sin rozamiento, $g=9{,}81\\,\\mathrm{m/s^2}$). ¿Cuánto tarda en llegar al suelo?',
      sol: '$h=\\tfrac12gt^2\\Rightarrow t=\\sqrt{2h/g}=\\sqrt{2(' + h + ')/9{,}81}=' + L(t) + '\\,\\mathrm s$.',
      diag: [[Math.sqrt(h / g), 'Te falta el 2: $t=\\sqrt{2h/g}$.']] };
  };

  /* ---------- Tema 3 ---------- */
  G.t3_alcance = function (seed) {
    var R = Rnd(seed), v = R.pick([12, 15, 20, 25, 30]), th = R.pick([20, 25, 35, 40, 50, 55, 65]), r = v * v * Math.sin(2 * th * rad) / g;
    return { data: { v0: v, th: th }, ans: r, u: 'm', enun: 'Un proyectil sale del suelo con ' + q(v, 'm/s') + ' formando ' + q(th, '^\\circ') + ' con la horizontal. Sin rozamiento, ¿cuál es su alcance horizontal? ($g=9{,}81\\,\\mathrm{m/s^2}$)',
      sol: '$R=\\dfrac{v_0^2\\sin2\\theta}{g}=\\dfrac{' + v + '^2\\sin(' + 2 * th + '^\\circ)}{9{,}81}=' + L(r) + '\\,\\mathrm m$.',
      diag: [[v * v * Math.sin(th * rad) / g, 'Has usado $\\sin\\theta$ en vez de $\\sin2\\theta$.'], [v * v * Math.sin(2 * th * rad) / (2 * g), 'Te sobra el 2: el alcance es $v_0^2\\sin2\\theta/g$ (la altura máxima es la que lleva el $2g$).']] };
  };
  G.t3_altura = function (seed) {
    var R = Rnd(seed), v = R.pick([12, 15, 20, 25, 30]), th = R.pick([30, 40, 50, 60, 70]), h = Math.pow(v * Math.sin(th * rad), 2) / (2 * g);
    return { data: { v0: v, th: th }, ans: h, u: 'm', enun: 'Se lanza una pelota con ' + q(v, 'm/s') + ' a ' + q(th, '^\\circ') + ' sobre la horizontal. ¿Qué altura máxima alcanza sobre el punto de lanzamiento? ($g=9{,}81\\,\\mathrm{m/s^2}$)',
      sol: 'En el punto más alto $v_y=0$: $h=\\dfrac{(v_0\\sin\\theta)^2}{2g}=\\dfrac{(' + v + '\\sin' + th + '^\\circ)^2}{2(9{,}81)}=' + L(h) + '\\,\\mathrm m$.',
      diag: [[v * v / (2 * g), 'Has usado toda la rapidez. Solo la componente vertical $v_0\\sin\\theta$ sube la pelota.'], [Math.pow(v * Math.cos(th * rad), 2) / (2 * g), 'Has usado la componente horizontal ($\\cos\\theta$); la que sube es $v_0\\sin\\theta$.']] };
  };
  G.t3_centripeta = function (seed) {
    var R = Rnd(seed), v = R.pick([8, 10, 12, 15, 20]), r = R.pick([20, 25, 40, 50, 80]), a = v * v / r;
    return { data: { v: v, r: r }, ans: a, u: 'm/s²', enun: 'Un coche toma una curva de radio ' + q(r, 'm') + ' a ' + q(v, 'm/s') + ' (rapidez constante). ¿Cuánto vale su aceleración centrípeta?',
      sol: '$a_c=\\dfrac{v^2}{r}=\\dfrac{' + v + '^2}{' + r + '}=' + L(a) + '\\,\\mathrm{m/s^2}$.',
      diag: [[v / r, 'Has dividido $v$ entre $r$ (eso es $\\omega$). La aceleración centrípeta es $v^2/r$.'], [v * v * r, 'La $r$ va dividiendo: $a_c=v^2/r$.']] };
  };

  /* ---------- Tema 5 (leyes de Newton) ---------- */
  G.t5_plano = function (seed) {
    var R = Rnd(seed), th = R.pick([25, 30, 35, 40]), mu = R.pick([0.1, 0.15, 0.2, 0.25]), a = g * (Math.sin(th * rad) - mu * Math.cos(th * rad));
    return { data: { th: th, mu: mu }, ans: a, u: 'm/s²', enun: 'Un bloque baja deslizando por un plano inclinado ' + q(th, '^\\circ') + ' con coeficiente de rozamiento cinético $\\mu_k=' + L(mu) + '$. ¿Cuál es su aceleración? ($g=9{,}81\\,\\mathrm{m/s^2}$)',
      sol: 'Eje paralelo al plano: $mg\\sin\\theta-\\mu_kN=ma$ con $N=mg\\cos\\theta$, luego $a=g(\\sin\\theta-\\mu_k\\cos\\theta)=9{,}81(\\sin' + th + '^\\circ-' + L(mu) + '\\cos' + th + '^\\circ)=' + L(a) + '\\,\\mathrm{m/s^2}$.',
      diag: [[g * Math.sin(th * rad), 'Has ignorado el rozamiento.'], [g * (Math.sin(th * rad) + mu * Math.cos(th * rad)), 'El rozamiento se opone al movimiento (hacia arriba del plano): va restando.'], [g * (Math.cos(th * rad) - mu * Math.sin(th * rad)), 'Has intercambiado seno y coseno: a lo largo del plano está $mg\\sin\\theta$ y la normal es $mg\\cos\\theta$.']] };
  };
  G.t5_atwood = function (seed) {
    var R = Rnd(seed), m1 = R.pick([1, 2, 3, 4]), m2 = m1 + R.pick([1, 2, 3]), a = (m2 - m1) * g / (m1 + m2);
    return { data: { m1: m1, m2: m2 }, ans: a, u: 'm/s²', enun: 'Dos masas, ' + q(m1, 'kg') + ' y ' + q(m2, 'kg') + ', cuelgan de los extremos de una cuerda ligera que pasa por una polea sin rozamiento. ¿Cuánto vale la aceleración del sistema? ($g=9{,}81\\,\\mathrm{m/s^2}$)',
      sol: 'Para cada masa: $m_2g-T=m_2a$ y $T-m_1g=m_1a$. Sumando: $a=\\dfrac{(m_2-m_1)g}{m_1+m_2}=\\dfrac{(' + (m2 - m1) + ')(9{,}81)}{' + (m1 + m2) + '}=' + L(a) + '\\,\\mathrm{m/s^2}$.',
      diag: [[(m2 - m1) * g / m1, 'Has dividido solo entre $m_1$: la masa que acelera es la total $m_1+m_2$ (van unidas por la cuerda).'], [(m2 - m1) * g / m2, 'Has dividido solo entre $m_2$: la masa que acelera es la total $m_1+m_2$.'], [g, 'Eso es la caída libre: la tensión frena a $m_2$.']] };
  };
  G.t5_ascensor = function (seed) {
    var R = Rnd(seed), m = R.pick([55, 60, 65, 70, 80]), a = R.pick([1, 1.5, 2, 2.5]), n = m * (g + a);
    return { data: { m: m, a: a }, ans: n, u: 'N', enun: 'Una persona de ' + q(m, 'kg') + ' está en un ascensor que <b>sube acelerando</b> a ' + q(a, 'm/s^2') + '. ¿Qué fuerza normal ejerce el suelo sobre ella? ($g=9{,}81\\,\\mathrm{m/s^2}$)',
      sol: 'Eje vertical hacia arriba: $N-mg=ma\\Rightarrow N=m(g+a)=' + m + '(9{,}81+' + L(a) + ')=' + L(n) + '\\,\\mathrm N$.',
      diag: [[m * (g - a), 'Has restado la aceleración. Si el ascensor sube acelerando, la normal es mayor que el peso: $N=m(g+a)$.'], [m * g, 'Eso es el peso real; con aceleración hacia arriba la normal es mayor.']] };
  };
  G.t5_curva = function (seed) {
    var R = Rnd(seed), v = R.pick([10, 12, 15, 20]), r = R.pick([40, 50, 60, 80, 100]), mu = v * v / (g * r);
    return { data: { v: v, r: r }, ans: mu, u: '', enun: 'Un coche toma una curva plana de radio ' + q(r, 'm') + ' a ' + q(v, 'm/s') + '. ¿Qué coeficiente de rozamiento estático mínimo hace falta para que no derrape? ($g=9{,}81\\,\\mathrm{m/s^2}$)',
      sol: 'La fricción estática es la fuerza centrípeta: $\\mu_smg=mv^2/r\\Rightarrow\\mu_s=\\dfrac{v^2}{gr}=\\dfrac{' + v + '^2}{9{,}81\\cdot' + r + '}=' + L(mu) + '$.',
      diag: [[v * v / r, 'Te ha quedado $v^2/r$ (la aceleración): falta dividir entre $g$.'], [v / (g * r), 'Falta el cuadrado de la rapidez: $\\mu_s=v^2/(gr)$.']] };
  };

  /* ---------- Tema 6 ---------- */
  G.t6_trabajo = function (seed) {
    var R = Rnd(seed), F = R.pick([20, 30, 40, 50, 60]), dd = R.pick([3, 4, 5, 8, 10]), ph = R.pick([25, 30, 40, 50, 60]), w = F * dd * Math.cos(ph * rad);
    return { data: { F: F, d: dd, ph: ph }, ans: w, u: 'J', enun: 'Se arrastra una caja ' + q(dd, 'm') + ' tirando con una fuerza de ' + q(F, 'N') + ' que forma ' + q(ph, '^\\circ') + ' con el desplazamiento. ¿Qué trabajo hace esa fuerza?',
      sol: '$W=Fd\\cos\\phi=(' + F + ')(' + dd + ')\\cos' + ph + '^\\circ=' + L(w) + '\\,\\mathrm J$.',
      diag: [[F * dd, 'Has ignorado el ángulo: solo la componente de la fuerza a lo largo del desplazamiento trabaja ($\\cos\\phi$).'], [F * dd * Math.sin(ph * rad), 'Has usado $\\sin\\phi$; el trabajo lleva $\\cos\\phi$ (ángulo entre fuerza y desplazamiento).']] };
  };
  G.t6_resorte = function (seed) {
    var R = Rnd(seed), k = R.pick([100, 200, 250, 400, 500]), x = R.pick([0.05, 0.08, 0.1, 0.15, 0.2]), w = 0.5 * k * x * x;
    return { data: { k: k, x: x }, ans: w, u: 'J', enun: 'Un resorte de constante ' + q(k, 'N/m') + ' se comprime ' + q(x * 100, 'cm') + ' desde su longitud natural. ¿Qué trabajo hay que hacer?',
      sol: '$W=\\tfrac12kx^2=\\tfrac12(' + k + ')(' + L(x) + ')^2=' + L(w) + '\\,\\mathrm J$.',
      diag: [[k * x * x, 'Te falta el $\\tfrac12$: $W=\\tfrac12kx^2$.'], [0.5 * k * x, 'Has usado $x$ en vez de $x^2$ (y $\\tfrac12kx$ no tiene unidades de energía).'], [k * x, 'Eso es la fuerza máxima $kx$, no el trabajo.']] };
  };
  G.t6_teorema = function (seed) {
    var R = Rnd(seed), m = R.pick([2, 4, 5, 10]), F = R.pick([10, 20, 30, 50]), dd = R.pick([2, 3, 5, 8]), v = Math.sqrt(2 * F * dd / m);
    return { data: { m: m, F: F, d: dd }, ans: v, u: 'm/s', enun: 'Un bloque de ' + q(m, 'kg') + ' parte del reposo sobre una superficie sin rozamiento y recibe una fuerza neta horizontal de ' + q(F, 'N') + ' a lo largo de ' + q(dd, 'm') + '. ¿Con qué rapidez termina?',
      sol: 'Teorema trabajo-energía: $Fd=\\tfrac12mv^2\\Rightarrow v=\\sqrt{2Fd/m}=\\sqrt{2(' + F + ')(' + dd + ')/' + m + '}=' + L(v) + '\\,\\mathrm{m/s}$.',
      diag: [[Math.sqrt(F * dd / m), 'Te falta el 2: de $Fd=\\tfrac12mv^2$ sale $v=\\sqrt{2Fd/m}$.']] };
  };
  G.t6_potencia = function (seed) {
    var R = Rnd(seed), m = R.pick([200, 300, 500, 800, 1000]), v = R.pick([0.5, 1.5, 2, 2.5]), p = m * g * v;
    return { data: { m: m, v: v }, ans: p, u: 'W', enun: 'Un motor eleva una carga de ' + q(m, 'kg') + ' a velocidad constante de ' + q(v, 'm/s') + '. ¿Qué potencia útil desarrolla? ($g=9{,}81\\,\\mathrm{m/s^2}$)',
      sol: 'A velocidad constante la fuerza iguala al peso: $P=Fv=mgv=(' + m + ')(9{,}81)(' + L(v) + ')=' + L(p) + '\\,\\mathrm W$.',
      diag: [[m * v, 'Has usado la masa en vez del peso: $F=mg$.'], [m * g, 'Falta multiplicar por la velocidad: $P=Fv$.']] };
  };

  /* ---------- Tema 7 ---------- */
  G.t7_caida = function (seed) {
    var R = Rnd(seed), h = R.pick([3, 5, 8, 10]), v0 = R.pick([6, 8, 10, 12]), v = Math.sqrt(v0 * v0 + 2 * g * h);
    return { data: { h: h, v0: v0 }, ans: v, u: 'm/s', enun: 'Se lanza una piedra hacia abajo desde ' + q(h, 'm') + ' de altura con ' + q(v0, 'm/s') + '. Sin rozamiento, ¿con qué rapidez llega al suelo? ($g=9{,}81\\,\\mathrm{m/s^2}$)',
      sol: 'Conservación de la energía: $\\tfrac12mv_0^2+mgh=\\tfrac12mv^2\\Rightarrow v=\\sqrt{v_0^2+2gh}=\\sqrt{' + v0 + '^2+2(9{,}81)(' + h + ')}=' + L(v) + '\\,\\mathrm{m/s}$.',
      diag: [[Math.sqrt(2 * g * h), 'Has olvidado la energía cinética inicial: $v^2=v_0^2+2gh$.'], [v0 + Math.sqrt(2 * g * h), 'Las rapideces no se suman; se suman las energías (o los cuadrados): $v^2=v_0^2+2gh$.']] };
  };
  G.t7_resorte = function (seed) {
    var R = Rnd(seed), m = R.pick([0.2, 0.5, 1, 2]), k = R.pick([100, 200, 400, 800]), x = R.pick([0.05, 0.1, 0.15, 0.2]), v = x * Math.sqrt(k / m);
    return { data: { m: m, k: k, x: x }, ans: v, u: 'm/s', enun: 'Un resorte de constante ' + q(k, 'N/m') + ' comprimido ' + q(x * 100, 'cm') + ' lanza un bloque de ' + q(m, 'kg') + ' sobre una superficie horizontal sin rozamiento. ¿Qué rapidez lleva al soltarse del resorte?',
      sol: '$\\tfrac12kx^2=\\tfrac12mv^2\\Rightarrow v=x\\sqrt{k/m}=' + L(x) + '\\sqrt{' + k + '/' + L(m) + '}=' + L(v) + '\\,\\mathrm{m/s}$.',
      diag: [[x * Math.sqrt(k / (2 * m)), 'Has puesto el $\\tfrac12$ solo en un lado: la energía cinética también lleva $\\tfrac12$ y se cancela.'], [x * k / m, 'Olvidaste la raíz: $v^2=kx^2/m$.']] };
  };
  G.t7_friccion = function (seed) {
    var R = Rnd(seed), h = R.pick([1, 1.5, 2, 3, 4]), mu = R.pick([0.1, 0.2, 0.25, 0.4, 0.5]), x = h / mu;
    return { data: { h: h, mu: mu }, ans: x, u: 'm', enun: 'Un bloque se suelta desde el reposo a ' + q(h, 'm') + ' de altura en una rampa sin rozamiento y sigue por un suelo horizontal con $\\mu_k=' + L(mu) + '$. ¿Qué distancia recorre sobre el suelo hasta detenerse?',
      sol: 'Toda la energía potencial se disipa en el rozamiento: $mgh=\\mu_kmg\\,x\\Rightarrow x=\\dfrac{h}{\\mu_k}=\\dfrac{' + L(h) + '}{' + L(mu) + '}=' + L(x) + '\\,\\mathrm m$.',
      diag: [[h * mu, 'Has multiplicado en vez de dividir: $x=h/\\mu_k$.'], [h / (2 * mu), 'No hay ningún $\\tfrac12$: la energía inicial es $mgh$ y el trabajo de la fricción $\\mu_kmg\\,x$.']] };
  };

  /* ---------- Tema 8 ---------- */
  G.t8_inelastico = function (seed) {
    var R = Rnd(seed), m1 = R.pick([2, 3, 4, 5]), m2 = R.pick([1, 2, 6, 8]), v1 = R.pick([4, 6, 8, 10]), v = m1 * v1 / (m1 + m2);
    if (m1 === m2) return G.t8_inelastico(seed + 1);
    return { data: { m1: m1, m2: m2, v1: v1 }, ans: v, u: 'm/s', enun: 'Un carro de ' + q(m1, 'kg') + ' que va a ' + q(v1, 'm/s') + ' choca con otro de ' + q(m2, 'kg') + ' en reposo y quedan <b>unidos</b>. ¿Con qué rapidez se mueven después?',
      sol: 'Se conserva el momento lineal: $m_1v_1=(m_1+m_2)v\\Rightarrow v=\\dfrac{(' + m1 + ')(' + v1 + ')}{' + (m1 + m2) + '}=' + L(v) + '\\,\\mathrm{m/s}$.',
      diag: [[v1 / 2, 'Has repartido por igual; eso solo vale con masas iguales. Divide entre la masa total $m_1+m_2$.'], [m1 * v1 / m2, 'Has dividido solo entre $m_2$: después del choque se mueve toda la masa $m_1+m_2$.']] };
  };
  G.t8_elastico = function (seed) {
    var R = Rnd(seed), m1 = R.pick([2, 3, 4, 6]), m2 = R.pick([1, 2, 3, 5]), v1 = R.pick([3, 4, 5, 6, 8]), v2 = 2 * m1 * v1 / (m1 + m2);
    if (m1 === m2) return G.t8_elastico(seed + 1);
    return { data: { m1: m1, m2: m2, v1: v1 }, ans: v2, u: 'm/s', enun: 'Una bola de ' + q(m1, 'kg') + ' con ' + q(v1, 'm/s') + ' choca de frente y <b>elásticamente</b> con otra de ' + q(m2, 'kg') + ' en reposo. ¿Qué rapidez tiene la segunda justo después?',
      sol: 'Choque elástico 1D con la segunda en reposo: $v_2\'=\\dfrac{2m_1}{m_1+m_2}v_1=\\dfrac{2(' + m1 + ')(' + v1 + ')}{' + (m1 + m2) + '}=' + L(v2) + '\\,\\mathrm{m/s}$.',
      diag: [[m1 * v1 / (m1 + m2), 'Eso es el resultado si quedaran pegadas (inelástico). En el elástico también se conserva la energía cinética: sale el factor 2.'], [(m1 - m2) * v1 / (m1 + m2), 'Esa es la velocidad de la <b>primera</b> bola tras el choque, no la de la segunda.']] };
  };
  G.t8_impulso = function (seed) {
    var R = Rnd(seed), m = R.pick([0.15, 0.2, 0.4, 0.5]), v1 = R.pick([10, 15, 20, 25]), v2 = R.pick([8, 12, 16]), dt = R.pick([0.005, 0.01, 0.02]), f = m * (v1 + v2) / dt;
    return { data: { m: m, v1: v1, v2: v2, dt: dt }, ans: f, u: 'N', enun: 'Una pelota de ' + q(m, 'kg') + ' llega a una pared a ' + q(v1, 'm/s') + ' y rebota en sentido contrario a ' + q(v2, 'm/s') + '. El contacto dura ' + q(dt * 1000, 'ms') + '. ¿Cuál es la fuerza media sobre la pelota?',
      sol: 'Con signo: $v_i=-' + v1 + '$ y $v_f=+' + v2 + '$ (sentidos opuestos). $F\\,\\Delta t=m(v_f-v_i)\\Rightarrow F=\\dfrac{' + L(m) + '(' + v2 + '+' + v1 + ')}{' + L(dt) + '}=' + L(f) + '\\,\\mathrm N$.',
      diag: [[m * (v1 - v2) / dt, 'Has restado las rapideces: al rebotar, las velocidades tienen signo opuesto y el cambio es $v_1+v_2$.'], [m * (v1 + v2), 'Falta dividir entre el tiempo de contacto: $F=\\Delta p/\\Delta t$.']] };
  };

  /* ---------- Tema 9 y 10 ---------- */
  G.t9_alfa = function (seed) {
    var R = Rnd(seed), M = R.pick([2, 4, 5, 10]), r = R.pick([0.1, 0.2, 0.25, 0.5]), F = R.pick([5, 10, 20, 30]), a = 2 * F / (M * r);
    return { data: { M: M, R: r, F: F }, ans: a, u: 'rad/s²', enun: 'Un disco macizo de ' + q(M, 'kg') + ' y radio ' + q(r, 'm') + ' puede girar libremente alrededor de su eje. Se tira de una cuerda enrollada en su borde con ' + q(F, 'N') + '. ¿Cuál es su aceleración angular?',
      sol: '$\\tau=FR=I\\alpha$ con $I=\\tfrac12MR^2$: $\\alpha=\\dfrac{2F}{MR}=\\dfrac{2(' + F + ')}{(' + M + ')(' + L(r) + ')}=' + L(a) + '\\,\\mathrm{rad/s^2}$.',
      diag: [[F / (M * r), 'Has usado $I=MR^2$ (un aro). El disco macizo tiene $I=\\tfrac12MR^2$.']] };
  };
  G.t9_cinematica = function (seed) {
    var R = Rnd(seed), rpm = R.pick([60, 90, 120, 180, 300]), t = R.pick([4, 5, 6, 8, 10]), w0 = rpm * 2 * Math.PI / 60, n = w0 * t / (4 * Math.PI);
    return { data: { rpm: rpm, t: t }, ans: n, u: 'vueltas', enun: 'Una rueda gira a ' + q(rpm, 'rpm') + ' y se frena con aceleración angular constante hasta pararse en ' + q(t, 's') + '. ¿Cuántas vueltas da mientras frena?',
      sol: '$\\omega_0=' + rpm + '\\cdot2\\pi/60=' + L(w0) + '\\,\\mathrm{rad/s}$. Con $\\omega_f=0$: $\\theta=\\tfrac12\\omega_0t=' + L(w0 * t / 2) + '\\,\\mathrm{rad}$, es decir $\\theta/2\\pi=' + L(n) + '$ vueltas.',
      diag: [[w0 * t / (2 * Math.PI), 'Has usado $\\theta=\\omega_0t$ (velocidad constante). Al frenar uniformemente la velocidad media es $\\omega_0/2$.'], [w0 * t / 2, 'Eso son radianes; divide entre $2\\pi$ para pasar a vueltas.']] };
  };
  G.t10_rodadura = function (seed) {
    var R = Rnd(seed), f = R.pick([['un cilindro macizo', 0.5], ['una esfera maciza', 0.4], ['un aro', 1], ['una esfera hueca de pared delgada', 2 / 3]]), h = R.pick([0.5, 1, 1.5, 2, 3]), k = f[1], v = Math.sqrt(2 * g * h / (1 + k));
    return { data: { k: k, h: h }, ans: v, u: 'm/s', enun: 'Rueda sin deslizar, desde el reposo, ' + f[0] + ' por un plano que desciende ' + q(h, 'm') + ' en vertical. ¿Con qué rapidez del centro llega abajo? ($g=9{,}81\\,\\mathrm{m/s^2}$)',
      sol: 'Con $I=k\\,mR^2$ ($k=' + L(k) + '$) y $\\omega=v/R$: $mgh=\\tfrac12mv^2(1+k)\\Rightarrow v=\\sqrt{\\dfrac{2gh}{1+k}}=\\sqrt{\\dfrac{2(9{,}81)(' + L(h) + ')}{' + L(1 + k) + '}}=' + L(v) + '\\,\\mathrm{m/s}$.',
      diag: [[Math.sqrt(2 * g * h), 'Eso es deslizar sin rotar. Al rodar parte de la energía se va en rotación: divide entre $1+I/(mR^2)$.']] };
  };
  G.t10_momento = function (seed) {
    var R = Rnd(seed), i1 = R.pick([3, 4, 5, 6]), i2 = R.pick([1, 1.5, 2]), w1 = R.pick([1, 1.5, 2, 3]), w2 = i1 * w1 / i2;
    return { data: { I1: i1, I2: i2, w1: w1 }, ans: w2, u: 'rad/s', enun: 'Una patinadora gira a ' + q(w1, 'rad/s') + ' con momento de inercia ' + q(i1, 'kg\\,m^2') + '. Encoge los brazos y su momento de inercia pasa a ' + q(i2, 'kg\\,m^2') + '. ¿Cuál es su nueva velocidad angular?',
      sol: 'No hay torque externo, luego $L=I\\omega$ se conserva: $\\omega_2=\\dfrac{I_1\\omega_1}{I_2}=\\dfrac{(' + L(i1) + ')(' + L(w1) + ')}{' + L(i2) + '}=' + L(w2) + '\\,\\mathrm{rad/s}$.',
      diag: [[w1 * i2 / i1, 'Has invertido el cociente: si $I$ disminuye, $\\omega$ <b>aumenta</b> ($I_1\\omega_1=I_2\\omega_2$).']] };
  };
  G.t10_torque = function (seed) {
    var R = Rnd(seed), F = R.pick([20, 40, 50, 80]), l = R.pick([0.2, 0.3, 0.4, 0.5]), ph = R.pick([30, 40, 50, 60, 70]), t = F * l * Math.sin(ph * rad);
    return { data: { F: F, l: l, ph: ph }, ans: t, u: 'N·m', enun: 'Se empuja una llave de ' + q(l * 100, 'cm') + ' con una fuerza de ' + q(F, 'N') + ' que forma ' + q(ph, '^\\circ') + ' con la llave (medido desde la propia llave). ¿Qué torque ejerce respecto al tornillo?',
      sol: '$\\tau=rF\\sin\\phi=(' + L(l) + ')(' + F + ')\\sin' + ph + '^\\circ=' + L(t) + '\\,\\mathrm{N\\cdot m}$.',
      diag: [[F * l * Math.cos(ph * rad), 'Has usado $\\cos\\phi$. El ángulo es entre $\\vec r$ y $\\vec F$ y el torque lleva $\\sin\\phi$.'], [F * l, 'Has supuesto la fuerza perpendicular; hay que multiplicar por $\\sin\\phi$.']] };
  };

  /* ---------- Tema 11 y 12 ---------- */
  G.t11_alargamiento = function (seed) {
    var R = Rnd(seed), F = R.pick([500, 1000, 2000, 3000]), l = R.pick([1, 1.5, 2, 3]), dm = R.pick([1, 2, 3]), Y = 2.0e11, A = Math.PI * Math.pow(dm * 1e-3, 2) / 4, dl = F * l / (A * Y) * 1000;
    return { data: { F: F, L: l, d_mm: dm }, ans: dl, u: 'mm', enun: 'Un hilo de acero ($Y=2{,}0\\times10^{11}\\,\\mathrm{Pa}$) de ' + q(l, 'm') + ' y ' + q(dm, 'mm') + ' de <b>diámetro</b> soporta una carga de ' + q(F, 'N') + '. ¿Cuánto se alarga?',
      sol: '$A=\\pi d^2/4=' + L(A) + '\\,\\mathrm{m^2}$ y $\\Delta L=\\dfrac{FL}{AY}=\\dfrac{(' + F + ')(' + L(l) + ')}{(' + L(A) + ')(2{,}0\\times10^{11})}=' + L(dl) + '\\,\\mathrm{mm}$.',
      diag: [[dl / 4, 'Has usado el diámetro como si fuera el radio ($A=\\pi d^2$). El área es $\\pi d^2/4$.'], [dl / 1000, 'Revisa las unidades: la respuesta se pide en milímetros.']] };
  };
  G.t11_palanca = function (seed) {
    var R = Rnd(seed), m1 = R.pick([30, 40, 50, 60]), d1 = R.pick([1, 1.5, 2]), m2 = R.pick([20, 25, 75, 80]), d2 = m1 * d1 / m2;
    if (m1 === m2) return G.t11_palanca(seed + 1);
    return { data: { m1: m1, d1: d1, m2: m2 }, ans: d2, u: 'm', enun: 'En un balancín ligero en equilibrio horizontal, un niño de ' + q(m1, 'kg') + ' se sienta a ' + q(d1, 'm') + ' del pivote. ¿A qué distancia del pivote, en el otro lado, debe sentarse otro de ' + q(m2, 'kg') + '?',
      sol: 'Torques respecto al pivote: $m_1g\\,d_1=m_2g\\,d_2\\Rightarrow d_2=\\dfrac{m_1d_1}{m_2}=\\dfrac{(' + m1 + ')(' + L(d1) + ')}{' + m2 + '}=' + L(d2) + '\\,\\mathrm m$.',
      diag: [[m2 * d1 / m1, 'Has invertido las masas: el que pesa más debe sentarse <b>más cerca</b> del pivote ($m_1d_1=m_2d_2$).']] };
  };
  G.t12_presion = function (seed) {
    var R = Rnd(seed), h = R.pick([5, 10, 15, 20, 30]), p = (101300 + 1000 * g * h) / 1000;
    return { data: { h: h }, ans: p, u: 'kPa', enun: 'Un buceador está a ' + q(h, 'm') + ' de profundidad en agua dulce ($\\rho=1000\\,\\mathrm{kg/m^3}$). ¿Cuál es la presión <b>absoluta</b> en kPa? ($p_0=1{,}013\\times10^5\\,\\mathrm{Pa}$, $g=9{,}81\\,\\mathrm{m/s^2}$)',
      sol: '$p=p_0+\\rho gh=1{,}013\\times10^5+(1000)(9{,}81)(' + h + ')=' + L(p * 1000) + '\\,\\mathrm{Pa}=' + L(p) + '\\,\\mathrm{kPa}$.',
      diag: [[1000 * g * h / 1000, 'Esa es la presión manométrica. La absoluta suma la presión atmosférica $p_0$.'], [p * 1000, 'Revisa las unidades: la respuesta se pide en kPa, no en Pa.']] };
  };
  G.t12_continuidad = function (seed) {
    var R = Rnd(seed), d1 = R.pick([4, 6, 8]), d2 = R.pick([2, 3, 4]), v1 = R.pick([1, 1.5, 2, 3]), v2 = v1 * d1 * d1 / (d2 * d2);
    if (d1 <= d2) return G.t12_continuidad(seed + 1);
    return { data: { d1: d1, d2: d2, v1: v1 }, ans: v2, u: 'm/s', enun: 'Por una tubería de ' + q(d1, 'cm') + ' de diámetro el agua circula a ' + q(v1, 'm/s') + '. La tubería se estrecha hasta ' + q(d2, 'cm') + ' de diámetro. ¿Con qué rapidez circula en el tramo estrecho?',
      sol: 'Continuidad: $A_1v_1=A_2v_2$ y $A\\propto d^2$: $v_2=v_1\\left(\\dfrac{d_1}{d_2}\\right)^2=' + L(v1) + '\\left(\\dfrac{' + d1 + '}{' + d2 + '}\\right)^2=' + L(v2) + '\\,\\mathrm{m/s}$.',
      diag: [[v1 * d1 / d2, 'Has comparado diámetros en vez de áreas: el cociente va <b>al cuadrado</b>.']] };
  };
  G.t12_empuje = function (seed) {
    var R = Rnd(seed), V = R.pick([2, 3, 5, 8]), rho = R.pick([600, 700, 800, 900]), e = 1000 * g * V * 1e-3;
    return { data: { V_L: V, rho: rho }, ans: e, u: 'N', enun: 'Un bloque de madera de ' + q(V, 'L') + ' y densidad ' + q(rho, 'kg/m^3') + ' se sumerge completamente en agua ($\\rho=1000\\,\\mathrm{kg/m^3}$) sujeto con una cuerda. ¿Qué empuje recibe? ($g=9{,}81\\,\\mathrm{m/s^2}$)',
      sol: 'Arquímedes: $E=\\rho_{agua}\\,g\\,V_{sumergido}=(1000)(9{,}81)(' + V + '\\times10^{-3})=' + L(e) + '\\,\\mathrm N$.',
      diag: [[rho * g * V * 1e-3, 'Has usado la densidad de la madera: el empuje es el peso del <b>agua</b> desalojada.']] };
  };

  /* ---------- Tema 13 ---------- */
  G.t13_gplaneta = function (seed) {
    var R = Rnd(seed), m = R.pick([0.5, 2, 5, 10]), r = R.pick([0.5, 1.5, 2, 3]), gp = g * m / (r * r);
    return { data: { m: m, r: r }, ans: gp, u: 'm/s²', enun: 'Un planeta tiene ' + q(m, '') + ' veces la masa de la Tierra y ' + q(r, '') + ' veces su radio. ¿Cuánto vale la gravedad en su superficie? ($g_T=9{,}81\\,\\mathrm{m/s^2}$)',
      sol: '$g=\\dfrac{GM}{R^2}$ escala como $\\dfrac{M/M_T}{(R/R_T)^2}$: $g=9{,}81\\cdot\\dfrac{' + L(m) + '}{' + L(r) + '^2}=' + L(gp) + '\\,\\mathrm{m/s^2}$.',
      diag: [[g * m / r, 'Has dividido entre $R/R_T$: la gravedad depende de $1/R^2$.'], [g * m * r * r, 'La relación con el radio es inversa: $g\\propto1/R^2$.']] };
  };
  G.t13_orbita = function (seed) {
    var R = Rnd(seed), h = R.pick([1000, 2000, 3000, 5000, 8000]), r = RT + h * 1000, v = Math.sqrt(G0 * MT / r) / 1000;
    return { data: { h_km: h }, ans: v, u: 'km/s', enun: 'Un satélite describe una órbita circular a ' + q(h, 'km') + ' sobre la superficie terrestre. ¿Cuál es su rapidez orbital? ($G=6{,}674\\times10^{-11}$, $M_T=5{,}972\\times10^{24}\\,\\mathrm{kg}$, $R_T=6371\\,\\mathrm{km}$)',
      sol: 'La gravedad es la fuerza centrípeta: $v=\\sqrt{\\dfrac{GM_T}{r}}$ con $r=R_T+h=' + L(r) + '\\,\\mathrm m$: $v=' + L(v) + '\\,\\mathrm{km/s}$.',
      diag: [[Math.sqrt(G0 * MT / RT) / 1000, 'Has usado el radio de la Tierra: $r$ se mide desde el <b>centro</b>, $r=R_T+h$.'], [Math.sqrt(2 * G0 * MT / r) / 1000, 'Eso es la velocidad de escape; la órbita circular es $\\sqrt{GM/r}$.']] };
  };
  G.t13_kepler = function (seed) {
    var R = Rnd(seed), a1 = R.pick([1, 1.5, 2]), a2 = R.pick([4, 6, 8, 9]) * a1 / 1, t1 = R.pick([1, 2, 3]), t2 = t1 * Math.pow(a2 / a1, 1.5);
    return { data: { a1: a1, a2: a2, T1: t1 }, ans: t2, u: 'años', enun: 'Un planeta con semieje mayor de ' + q(a1, 'UA') + ' tiene un período de ' + q(t1, 'años') + '. ¿Cuál es el período de otro cuerpo, alrededor de la misma estrella, con semieje mayor ' + q(a2, 'UA') + '?',
      sol: 'Tercera ley de Kepler: $T^2\\propto a^3\\Rightarrow T_2=T_1\\left(\\dfrac{a_2}{a_1}\\right)^{3/2}=' + t1 + '\\left(\\dfrac{' + L(a2) + '}{' + L(a1) + '}\\right)^{3/2}=' + L(t2) + '\\,\\mathrm{años}$.',
      diag: [[t1 * Math.pow(a2 / a1, 2), 'Has usado $a^2$; la ley es $T^2\\propto a^3$, es decir $T\\propto a^{3/2}$.'], [t1 * Math.pow(a2 / a1, 2 / 3), 'Has invertido los exponentes: $T\\propto a^{3/2}$.']] };
  };

  /* ---------- Tema 14 ---------- */
  G.t14_resorte = function (seed) {
    var R = Rnd(seed), m = R.pick([0.2, 0.5, 1, 2, 4]), k = R.pick([50, 100, 200, 400]), t = 2 * Math.PI * Math.sqrt(m / k);
    return { data: { m: m, k: k }, ans: t, u: 's', enun: 'Un bloque de ' + q(m, 'kg') + ' unido a un resorte de ' + q(k, 'N/m') + ' oscila libremente. ¿Cuál es su período?',
      sol: '$T=2\\pi\\sqrt{m/k}=2\\pi\\sqrt{' + L(m) + '/' + k + '}=' + L(t) + '\\,\\mathrm s$.',
      diag: [[2 * Math.PI * Math.sqrt(k / m), 'Has invertido el cociente: $T=2\\pi\\sqrt{m/k}$ (más masa, más lento).'], [Math.sqrt(m / k), 'Falta el factor $2\\pi$.'], [1 / t, 'Eso es la frecuencia $f=1/T$.']] };
  };
  G.t14_pendulo = function (seed) {
    var R = Rnd(seed), l = R.pick([0.25, 0.5, 1, 1.5, 2]), t = 2 * Math.PI * Math.sqrt(l / g);
    return { data: { L: l }, ans: t, u: 's', enun: 'Un péndulo simple de ' + q(l, 'm') + ' de longitud oscila con ángulos pequeños. ¿Cuál es su período? ($g=9{,}81\\,\\mathrm{m/s^2}$)',
      sol: '$T=2\\pi\\sqrt{L/g}=2\\pi\\sqrt{' + L(l) + '/9{,}81}=' + L(t) + '\\,\\mathrm s$.',
      diag: [[2 * Math.PI * Math.sqrt(g / l), 'Has invertido el cociente: $T=2\\pi\\sqrt{L/g}$.'], [Math.sqrt(l / g), 'Falta el factor $2\\pi$.']] };
  };
  G.t14_vmax = function (seed) {
    var R = Rnd(seed), m = R.pick([0.5, 1, 2]), k = R.pick([50, 200, 800]), a = R.pick([0.05, 0.1, 0.2]), v = a * Math.sqrt(k / m);
    return { data: { m: m, k: k, A: a }, ans: v, u: 'm/s', enun: 'Un bloque de ' + q(m, 'kg') + ' en un resorte de ' + q(k, 'N/m') + ' oscila con amplitud ' + q(a * 100, 'cm') + '. ¿Cuál es su rapidez máxima?',
      sol: 'La rapidez máxima es $v_{max}=A\\omega=A\\sqrt{k/m}=' + L(a) + '\\sqrt{' + k + '/' + L(m) + '}=' + L(v) + '\\,\\mathrm{m/s}$ (al pasar por el equilibrio).',
      diag: [[a * k / m, 'Olvidaste la raíz: $\\omega=\\sqrt{k/m}$.'], [a * Math.sqrt(m / k), 'Has invertido el cociente: $\\omega=\\sqrt{k/m}$.']] };
  };

  /* ---------- Tema 15 y 16 ---------- */
  G.t15_cuerda = function (seed) {
    var R = Rnd(seed), t = R.pick([50, 80, 100, 200, 320]), mu = R.pick([0.005, 0.01, 0.02, 0.05]), v = Math.sqrt(t / mu);
    return { data: { T: t, mu: mu }, ans: v, u: 'm/s', enun: 'Una cuerda con tensión de ' + q(t, 'N') + ' y densidad lineal ' + q(mu * 1000, 'g/m') + ' transporta una onda transversal. ¿Cuál es la rapidez de la onda?',
      sol: '$\\mu=' + L(mu) + '\\,\\mathrm{kg/m}$ y $v=\\sqrt{T/\\mu}=\\sqrt{' + t + '/' + L(mu) + '}=' + L(v) + '\\,\\mathrm{m/s}$.',
      diag: [[t / mu, 'Olvidaste la raíz: $v=\\sqrt{T/\\mu}$.'], [Math.sqrt(t / (mu * 1000)), 'Revisa las unidades: $\\mu$ debe estar en kg/m, no en g/m.']] };
  };
  G.t15_fundamental = function (seed) {
    var R = Rnd(seed), v = R.pick([100, 150, 200, 300]), l = R.pick([0.4, 0.5, 0.6, 0.8]), f = v / (2 * l);
    return { data: { v: v, L: l }, ans: f, u: 'Hz', enun: 'En una cuerda de ' + q(l, 'm') + ' fija por los dos extremos las ondas viajan a ' + q(v, 'm/s') + '. ¿Cuál es la frecuencia fundamental?',
      sol: 'En el modo fundamental $L=\\lambda/2$, así que $f_1=\\dfrac{v}{2L}=\\dfrac{' + v + '}{2(' + L(l) + ')}=' + L(f) + '\\,\\mathrm{Hz}$.',
      diag: [[v / l, 'Has puesto $\\lambda=L$; en el fundamental cabe media longitud de onda: $\\lambda=2L$.'], [v / (4 * l), 'Esa es la fórmula del tubo cerrado por un extremo; en la cuerda fija en ambos $f_1=v/2L$.']] };
  };
  G.t16_nivel = function (seed) {
    var R = Rnd(seed), e = R.ri(-9, -3), m = R.pick([1, 2, 3, 5, 8]), i = m * Math.pow(10, e), b = 10 * Math.log10(i / 1e-12);
    return { data: { I: i }, ans: b, u: 'dB', enun: 'La intensidad de un sonido es ' + q(i, 'W/m^2', 2) + '. ¿Cuál es su nivel de intensidad? ($I_0=10^{-12}\\,\\mathrm{W/m^2}$)',
      sol: '$\\beta=10\\log_{10}\\dfrac{I}{I_0}=10\\log_{10}\\dfrac{' + L(i, 2) + '}{10^{-12}}=' + L(b) + '\\,\\mathrm{dB}$.',
      diag: [[Math.log10(i / 1e-12), 'Falta el factor 10 de la definición en decibelios: $\\beta=10\\log_{10}(I/I_0)$.'], [10 * Math.log(i / 1e-12), 'Has usado el logaritmo natural; es decimal ($\\log_{10}$).']] };
  };
  G.t16_doppler = function (seed) {
    var R = Rnd(seed), f = R.pick([400, 500, 800, 1000]), vs = R.pick([15, 20, 25, 30]), fp = f * 343 / (343 - vs);
    return { data: { f: f, vs: vs }, ans: fp, u: 'Hz', enun: 'Una ambulancia emite ' + q(f, 'Hz') + ' y <b>se acerca</b> a ' + q(vs, 'm/s') + ' a un observador en reposo (velocidad del sonido $343\\,\\mathrm{m/s}$). ¿Qué frecuencia oye?',
      sol: '$f\'=f\\dfrac{v}{v-v_s}=' + f + '\\cdot\\dfrac{343}{343-' + vs + '}=' + L(fp) + '\\,\\mathrm{Hz}$ (mayor que $f$: se acerca).',
      diag: [[f * 343 / (343 + vs), 'Has puesto $v+v_s$, que corresponde a una fuente que se <b>aleja</b>. Al acercarse la frecuencia sube: $v-v_s$.']] };
  };
  G.t16_tubo = function (seed) {
    var R = Rnd(seed), l = R.pick([0.2, 0.25, 0.4, 0.5, 0.85]), f = 343 / (4 * l);
    return { data: { L: l }, ans: f, u: 'Hz', enun: 'Un tubo de órgano <b>cerrado por un extremo</b> mide ' + q(l, 'm') + '. ¿Cuál es su frecuencia fundamental? (velocidad del sonido $343\\,\\mathrm{m/s}$)',
      sol: 'Cerrado en un extremo: nodo de desplazamiento en el cerrado y vientre en el abierto, $L=\\lambda/4$. $f_1=\\dfrac{v}{4L}=\\dfrac{343}{4(' + L(l) + ')}=' + L(f) + '\\,\\mathrm{Hz}$.',
      diag: [[343 / (2 * l), 'Esa es la del tubo abierto por los dos extremos. Con un extremo cerrado $L=\\lambda/4$: $f_1=v/4L$.']] };
  };

  /* ---------- Tema 17 y 18 ---------- */
  G.t17_mezcla = function (seed) {
    var R = Rnd(seed), m1 = R.pick([0.2, 0.5]), t1 = R.pick([80, 90, 100]), m2 = R.pick([1, 1.5, 2, 3]), t2 = R.pick([10, 15, 20]), tf = (m1 * t1 + m2 * t2) / (m1 + m2);
    return { data: { m1: m1, T1: t1, m2: m2, T2: t2 }, ans: tf, u: '°C', enun: 'Se mezclan ' + q(m1, 'kg') + ' de agua a ' + q(t1, '^\\circ C') + ' con ' + q(m2, 'kg') + ' de agua a ' + q(t2, '^\\circ C') + ' en un recipiente aislado. ¿Cuál es la temperatura final de equilibrio?',
      sol: 'El calor que cede uno lo gana el otro: $m_1c(T_1-T_f)=m_2c(T_f-T_2)\\Rightarrow T_f=\\dfrac{m_1T_1+m_2T_2}{m_1+m_2}=\\dfrac{(' + L(m1) + ')(' + t1 + ')+(' + L(m2) + ')(' + t2 + ')}{' + L(m1 + m2) + '}=' + L(tf) + '\\,^\\circ\\mathrm C$.',
      diag: [[(t1 + t2) / 2, 'Has hecho la media simple; solo sería correcta con masas iguales. Pondera por las masas.']] };
  };
  G.t17_dilatacion = function (seed) {
    var R = Rnd(seed), l = R.pick([10, 20, 50, 100]), dt = R.pick([20, 30, 40, 50]), dl = 1.2e-5 * l * dt * 1000;
    return { data: { L: l, dT: dt }, ans: dl, u: 'mm', enun: 'Un puente de acero ($\\alpha=1{,}2\\times10^{-5}\\,\\mathrm{K^{-1}}$) mide ' + q(l, 'm') + ' a baja temperatura y se calienta ' + q(dt, 'K') + '. ¿Cuánto se alarga, en mm?',
      sol: '$\\Delta L=\\alpha L_0\\Delta T=(1{,}2\\times10^{-5})(' + l + ')(' + dt + ')=' + L(dl / 1000) + '\\,\\mathrm m=' + L(dl) + '\\,\\mathrm{mm}$.',
      diag: [[dl / 1000, 'Revisa las unidades: se pide en milímetros.'], [1.2e-5 * dt * 1000, 'Falta multiplicar por la longitud inicial: $\\Delta L=\\alpha L_0\\Delta T$.']] };
  };
  G.t18_gas = function (seed) {
    var R = Rnd(seed), n = R.pick([0.5, 1, 2, 3]), tc = R.pick([0, 20, 27, 50, 100]), v = R.pick([10, 20, 25, 50]), p = n * RG * (tc + 273.15) / (v * 1e-3) / 1000;
    return { data: { n: n, Tc: tc, V_L: v }, ans: p, u: 'kPa', enun: 'Hay ' + q(n, 'mol') + ' de gas ideal a ' + q(tc, '^\\circ C') + ' en un recipiente de ' + q(v, 'L') + '. ¿Qué presión ejerce, en kPa? ($R=8{,}314\\,\\mathrm{J/(mol\\cdot K)}$)',
      sol: '$T=' + L(tc + 273.15) + '\\,\\mathrm K$ y $V=' + L(v / 1000) + '\\,\\mathrm{m^3}$: $p=\\dfrac{nRT}{V}=\\dfrac{(' + L(n) + ')(8{,}314)(' + L(tc + 273.15) + ')}{' + L(v / 1000) + '}=' + L(p) + '\\,\\mathrm{kPa}$.',
      diag: [[n * RG * tc / (v * 1e-3) / 1000, 'La temperatura debe estar en <b>kelvin</b> ($T=t+273{,}15$).'], [p * 1000, 'Revisa las unidades: la respuesta se pide en kPa.']] };
  };
  G.t18_vrms = function (seed) {
    var R = Rnd(seed), tc = R.pick([0, 20, 27, 100, 200]), v = Math.sqrt(3 * RG * (tc + 273.15) / 0.028);
    return { data: { Tc: tc }, ans: v, u: 'm/s', enun: '¿Cuál es la rapidez cuadrática media de las moléculas de nitrógeno ($M=28\\,\\mathrm{g/mol}$) a ' + q(tc, '^\\circ C') + '? ($R=8{,}314\\,\\mathrm{J/(mol\\cdot K)}$)',
      sol: '$v_{rms}=\\sqrt{\\dfrac{3RT}{M}}=\\sqrt{\\dfrac{3(8{,}314)(' + L(tc + 273.15) + ')}{0{,}028}}=' + L(v) + '\\,\\mathrm{m/s}$ (con $M$ en kg/mol y $T$ en K).',
      diag: [[Math.sqrt(3 * RG * (tc + 273.15) / 28), 'La masa molar debe ir en kg/mol: $0{,}028$.'], [Math.sqrt(RG * (tc + 273.15) / 0.028), 'Falta el 3: $v_{rms}=\\sqrt{3RT/M}$.']] };
  };

  /* ---------- Tema 19 y 20 ---------- */
  G.t19_isotermo = function (seed) {
    var R = Rnd(seed), n = R.pick([0.5, 1, 2]), t = R.pick([300, 350, 400, 500]), r = R.pick([2, 3, 4, 5]), w = n * RG * t * Math.log(r);
    return { data: { n: n, T: t, r: r }, ans: w, u: 'J', enun: 'Un gas ideal (' + q(n, 'mol') + ') se expande isotérmicamente a ' + q(t, 'K') + ' hasta ' + q(r, '') + ' veces su volumen inicial. ¿Qué trabajo realiza el gas? ($R=8{,}314\\,\\mathrm{J/(mol\\cdot K)}$)',
      sol: 'Isoterma: $W=nRT\\ln\\dfrac{V_2}{V_1}=(' + L(n) + ')(8{,}314)(' + t + ')\\ln' + r + '=' + L(w) + '\\,\\mathrm J$.',
      diag: [[n * RG * t * Math.log10(r), 'Has usado el logaritmo decimal; es el natural, $\\ln$.'], [n * RG * t * (r - 1), 'La presión no es constante: no vale $p\\Delta V$. En la isoterma $W=nRT\\ln(V_2/V_1)$.']] };
  };
  G.t19_adiabatico = function (seed) {
    var R = Rnd(seed), t1 = R.pick([290, 300, 310]), r = R.pick([4, 6, 8, 10]), ga = R.pick([1.4, 5 / 3]), t2 = t1 * Math.pow(r, ga - 1);
    return { data: { T1: t1, r: r, gamma: ga }, ans: t2, u: 'K', enun: 'Un gas ideal con $\\gamma=' + L(ga, 3) + '$ a ' + q(t1, 'K') + ' se comprime <b>adiabáticamente</b> hasta ' + q(1 / r, '', 3) + ' de su volumen (relación de compresión ' + q(r, '') + '). ¿Qué temperatura alcanza?',
      sol: 'Adiabático: $TV^{\\gamma-1}=\\text{cte}\\Rightarrow T_2=T_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma-1}=' + t1 + '\\cdot' + r + '^{' + L(ga - 1) + '}=' + L(t2) + '\\,\\mathrm K$.',
      diag: [[t1 * Math.pow(r, ga), 'El exponente es $\\gamma-1$, no $\\gamma$ (eso es para $pV^\\gamma$).'], [t1, 'En una compresión adiabática la temperatura <b>sube</b>: no hay calor, y el trabajo recibido aumenta la energía interna.']] };
  };
  G.t19_isobaro = function (seed) {
    var R = Rnd(seed), n = R.pick([1, 2, 3]), dt = R.pick([20, 40, 50, 100]), q_ = 2.5 * n * RG * dt;
    return { data: { n: n, dT: dt }, ans: q_, u: 'J', enun: 'Se calientan ' + q(n, 'mol') + ' de un gas ideal <b>monoatómico</b> a presión constante, subiendo su temperatura ' + q(dt, 'K') + '. ¿Cuánto calor absorbe? ($R=8{,}314\\,\\mathrm{J/(mol\\cdot K)}$)',
      sol: 'A presión constante $Q=nC_p\\Delta T$ con $C_p=\\tfrac52R$ (monoatómico): $Q=(' + n + ')(2{,}5)(8{,}314)(' + dt + ')=' + L(q_) + '\\,\\mathrm J$.',
      diag: [[1.5 * n * RG * dt, 'Has usado $C_V=\\tfrac32R$ (volumen constante). A presión constante el calor es $nC_p\\Delta T$ con $C_p=\\tfrac52R$.'], [n * RG * dt, 'Eso es el trabajo $W=nR\\Delta T$; el calor es $nC_p\\Delta T$.']] };
  };
  G.t20_carnot = function (seed) {
    var R = Rnd(seed), th = R.pick([300, 400, 500, 600, 800]), tc = R.pick([20, 27, 50, 100]), e = 100 * (1 - (tc + 273.15) / (th + 273.15));
    return { data: { Th_C: th, Tc_C: tc }, ans: e, u: '%', enun: 'Una máquina de Carnot trabaja entre un foco a ' + q(th, '^\\circ C') + ' y otro a ' + q(tc, '^\\circ C') + '. ¿Cuál es su eficiencia, en %?',
      sol: 'Con temperaturas absolutas: $e=1-\\dfrac{T_C}{T_H}=1-\\dfrac{' + L(tc + 273.15) + '}{' + L(th + 273.15) + '}=' + L(e / 100) + '=' + L(e) + '\\,\\%$.',
      diag: [[100 * (1 - tc / th), 'Las temperaturas deben estar en <b>kelvin</b>: suma 273,15 a cada una.'], [e / 100, 'Se pide en porcentaje.']] };
  };
  G.t20_calor = function (seed) {
    var R = Rnd(seed), qh = R.pick([500, 800, 1000, 2000]), e = R.pick([0.2, 0.25, 0.3, 0.4]), qc = qh * (1 - e);
    return { data: { QH: qh, e: e }, ans: qc, u: 'J', enun: 'Una máquina térmica con eficiencia de ' + q(e * 100, '\\%') + ' absorbe ' + q(qh, 'J') + ' del foco caliente por ciclo. ¿Cuánto calor cede al foco frío?',
      sol: '$W=eQ_H=' + L(e * qh) + '\\,\\mathrm J$ y $|Q_C|=Q_H-W=' + qh + '-' + L(e * qh) + '=' + L(qc) + '\\,\\mathrm J$.',
      diag: [[qh * e, 'Eso es el trabajo útil $W=eQ_H$; el calor cedido es lo que sobra: $Q_H-W$.']] };
  };
  G.t20_entropia = function (seed) {
    var R = Rnd(seed), m = R.pick([0.1, 0.2, 0.5, 1]), ds = m * 3.34e5 / 273.15;
    return { data: { m: m }, ans: ds, u: 'J/K', enun: 'Se funden ' + q(m, 'kg') + ' de hielo a ' + q(0, '^\\circ C') + ' (calor latente de fusión $3{,}34\\times10^5\\,\\mathrm{J/kg}$). ¿Cuánto cambia la entropía del hielo?',
      sol: 'Proceso isotermo y reversible a $T=273{,}15\\,\\mathrm K$: $\\Delta S=\\dfrac{Q}{T}=\\dfrac{mL_f}{T}=\\dfrac{(' + L(m) + ')(3{,}34\\times10^5)}{273{,}15}=' + L(ds) + '\\,\\mathrm{J/K}$.',
      diag: [[m * 3.34e5, 'Eso es el calor $Q$; falta dividir entre la temperatura absoluta: $\\Delta S=Q/T$.']] };
  };

  /* ---------- Cuestiones conceptuales (tipo test) ---------- */
  function Cues(bank) {
    return function (seed) {
      var R = Rnd(seed), it = bank[Math.abs(seed) % bank.length];
      var opts = R.shuf([{ t: it.ok, ok: true, why: '' }].concat(it.mal.map(function (m) { return { t: m[0], ok: false, why: m[1] }; })));
      return { tipo: 'choice', data: { i: Math.abs(seed) % bank.length }, enun: it.q, opts: opts, sol: it.sol };
    };
  }
  G.c_m1 = Cues([
    { q: 'Una pelota lanzada en tiro parabólico (sin rozamiento) está en el punto más alto de su trayectoria. ¿Cuál es su aceleración?', ok: '$g$ hacia abajo ($9{,}81\\,\\mathrm{m/s^2}$)', mal: [['Cero, porque se detiene un instante', 'Solo $v_y=0$ ahí; la aceleración sigue siendo $g$ (si fuera cero, no caería después).'], ['$g$ hacia arriba', 'La gravedad siempre apunta hacia abajo.'], ['Depende del ángulo de lanzamiento', 'Sin rozamiento la aceleración es $g$ en toda la trayectoria, sea cual sea el ángulo.']], sol: 'La única fuerza es el peso, así que $\\vec a=-g\\,\\hat\\jmath$ durante todo el vuelo.' },
    { q: 'Un bloque de 5 kg está en reposo sobre un suelo rugoso y se le empuja con 10 N horizontales sin que se mueva. ¿Cuánto vale la fuerza de rozamiento?', ok: '$10\\,\\mathrm N$ (la estática se iguala a la fuerza aplicada)', mal: [['$\\mu_smg$ siempre', 'Ese es el valor <b>máximo</b> posible; mientras no se mueva, el rozamiento solo iguala lo que haga falta.'], ['$0\\,\\mathrm N$', 'Si fuera cero, los 10 N lo moverían.'], ['$\\mu_kmg$', 'El rozamiento cinético solo actúa cuando hay deslizamiento.']], sol: 'Equilibrio: $f_s=F=10\\,\\mathrm N$, siempre que $F\\le\\mu_sN$.' },
    { q: 'Un ascensor sube con velocidad <b>constante</b>. Una persona de masa $m$ sobre una báscula lee…', ok: '$mg$, su peso real', mal: [['Más que $mg$, porque el ascensor sube', 'Lo que cambia la lectura es la <b>aceleración</b>, no la velocidad.'], ['Menos que $mg$, porque se aleja del suelo', 'La báscula mide la normal, que depende de $a$, no de la velocidad.']], sol: 'Con $a=0$: $N-mg=0\\Rightarrow N=mg$.' },
    { q: 'En un movimiento circular uniforme, la fuerza neta sobre el cuerpo…', ok: 'apunta al centro y no cambia el módulo de la velocidad', mal: [['apunta en la dirección de la velocidad', 'Entonces cambiaría la rapidez; en el MCU es perpendicular a la velocidad.'], ['es nula, porque la rapidez es constante', 'La velocidad cambia de dirección, luego hay aceleración centrípeta y fuerza neta $mv^2/r$.']], sol: 'Fuerza centrípeta $mv^2/r$ hacia el centro, perpendicular a $\\vec v$: cambia la dirección, no el módulo.' },
    { q: 'Se lanza una piedra verticalmente hacia arriba (eje $y$ positivo hacia arriba). Mientras sube, su aceleración es…', ok: '$-g$ (negativa)', mal: [['$+g$, porque va hacia arriba', 'El signo de la aceleración lo da la fuerza (el peso, hacia abajo), no el sentido del movimiento.'], ['Cero en el punto más alto', 'Ahí $v=0$ pero $a=-g$ sigue actuando.']], sol: 'La aceleración es $-g$ durante todo el vuelo, tanto al subir como al bajar.' }
  ]);
  G.c_m2 = Cues([
    { q: 'Un cuerpo describe una circunferencia con rapidez constante. El trabajo de la fuerza centrípeta en una vuelta completa es…', ok: 'cero, porque la fuerza es perpendicular al desplazamiento en todo instante', mal: [['$F\\cdot2\\pi r$', 'Solo vale si la fuerza fuera paralela al desplazamiento; aquí forman $90^\\circ$ y $\\cos90^\\circ=0$.'], ['$\\tfrac12mv^2$', 'La energía cinética no cambia (rapidez constante), así que el trabajo neto es cero.']], sol: '$W=\\int\\vec F\\cdot d\\vec l=0$ porque $\\vec F\\perp d\\vec l$; coherente con $\\Delta K=0$.' },
    { q: 'La energía mecánica $K+U$ de un sistema se conserva cuando…', ok: 'solo realizan trabajo fuerzas conservativas', mal: [['no actúan fuerzas externas', 'Pueden actuar (la normal, por ejemplo) si no hacen trabajo.'], ['la rapidez es constante', 'Puede variar $K$ y $U$ manteniéndose su suma; y con rapidez constante podría haber fricción y empuje.']], sol: '$W_{otras}=\\Delta(K+U)$: si las fuerzas no conservativas no trabajan, $K+U$ es constante.' },
    { q: 'Dos cuerpos aislados chocan de forma perfectamente inelástica. ¿Qué se conserva?', ok: 'el momento lineal, pero no la energía cinética', mal: [['la energía cinética, pero no el momento lineal', 'Al revés: sin fuerzas externas el momento siempre se conserva; la cinética se pierde al quedar unidos.'], ['ambos', 'La energía cinética disminuye (se disipa en deformación y calor).']], sol: 'Sistema aislado ⇒ $\\vec p$ se conserva en cualquier choque; solo en el elástico se conserva también $K$.' },
    { q: 'Un cilindro macizo y una esfera maciza, de igual masa y radio, ruedan sin deslizar desde la misma altura en el mismo plano. Llega antes abajo…', ok: 'la esfera, porque $I/(mR^2)$ es menor', mal: [['el cilindro', 'Tiene mayor $I/(mR^2)$ ($\\tfrac12$ frente a $\\tfrac25$), luego se reparte más energía en rotación y va más despacio.'], ['llegan a la vez, la masa no influye', 'La masa se cancela, pero no la forma: depende de $I/(mR^2)$.']], sol: '$v=\\sqrt{2gh/(1+I/mR^2)}$: la esfera ($0{,}4$) supera al cilindro ($0{,}5$).' },
    { q: 'Una patinadora que gira recoge los brazos. Como no hay torque externo…', ok: 'su momento angular se conserva y su velocidad angular aumenta', mal: [['su momento angular aumenta, porque gira más deprisa', 'Con $\\tau_{ext}=0$ el momento angular es constante; lo que sube es $\\omega$ porque baja $I$.'], ['su velocidad angular disminuye, porque baja el momento de inercia', '$L=I\\omega$ constante: si $I$ baja, $\\omega$ sube.']], sol: '$I_1\\omega_1=I_2\\omega_2$; con $I_2\\lt I_1$ resulta $\\omega_2\\gt\\omega_1$ (la energía cinética aumenta: la patinadora hace trabajo).' },
    { q: 'Una viga está en equilibrio estático. Eso exige que…', ok: 'la suma de fuerzas sea cero y la suma de torques, respecto a cualquier punto, también', mal: [['solo la suma de fuerzas sea cero', 'Podría girar: hace falta también torque neto nulo.'], ['solo el torque respecto al centro sea cero', 'Falta la condición de fuerzas; con fuerza neta no nula se trasladaría.']], sol: '$\\sum\\vec F=0$ y $\\sum\\vec\\tau=0$ (respecto a cualquier punto; se elige el que elimine incógnitas).' }
  ]);
  G.c_m3 = Cues([
    { q: 'Un bloque de hielo flota en un vaso lleno de agua hasta el borde. Cuando se funde, el nivel del agua…', ok: 'no cambia (no rebosa)', mal: [['sube y rebosa', 'El hielo flotando desplaza una masa de agua igual a la suya; fundido ocupa exactamente ese volumen.'], ['baja', 'Se compensa exactamente: el volumen desplazado coincide con el del agua de fusión.']], sol: 'Flotando: $E=m_{hielo}g\\Rightarrow V_{desp}=m/\\rho_{agua}$, que es el volumen del agua líquida resultante.' },
    { q: 'El agua circula por una tubería horizontal que se estrecha. En la parte estrecha…', ok: 'la velocidad es mayor y la presión menor', mal: [['la velocidad es mayor y la presión también', 'Bernoulli: si $v$ sube, $p$ baja (en horizontal, $p+\\tfrac12\\rho v^2$ constante).'], ['la velocidad es menor y la presión mayor', 'La continuidad exige mayor velocidad donde el área es menor.']], sol: 'Continuidad: $A_1v_1=A_2v_2$; Bernoulli: $p_1+\\tfrac12\\rho v_1^2=p_2+\\tfrac12\\rho v_2^2$.' },
    { q: 'Un satélite describe una órbita circular. Si se duplica el radio de la órbita, su período se multiplica por…', ok: '$2^{3/2}\\approx2{,}83$', mal: [['$2$', 'La relación no es lineal: $T^2\\propto r^3$.'], ['$4$', 'Eso sería $T\\propto r^2$; la ley es $T^2\\propto r^3$.'], ['$\\sqrt2$', 'Eso sería $T\\propto r^{1/2}$; es $r^{3/2}$.']], sol: 'Tercera ley de Kepler: $T\\propto r^{3/2}$, y $2^{3/2}=2{,}83$.' },
    { q: 'En un movimiento armónico simple, ¿dónde es máxima la aceleración?', ok: 'en los extremos ($x=\\pm A$), donde la velocidad es nula', mal: [['en la posición de equilibrio', 'Ahí la fuerza recuperadora es cero y la rapidez es máxima.'], ['es constante en todo el movimiento', 'Es $a=-\\omega^2x$: varía con la posición.']], sol: '$a=-\\omega^2x$, máxima en módulo en $x=\\pm A$.' },
    { q: 'Se duplica la tensión de una cuerda (misma densidad lineal). La rapidez de las ondas transversales se multiplica por…', ok: '$\\sqrt2$', mal: [['$2$', '$v=\\sqrt{T/\\mu}$: va con la raíz.'], ['$4$', '$v=\\sqrt{T/\\mu}$, no es cuadrática en $T$.']], sol: '$v=\\sqrt{T/\\mu}\\Rightarrow v\'/v=\\sqrt{2}$.' },
    { q: 'Una fuente sonora se <b>aleja</b> de un observador en reposo. La frecuencia que percibe es…', ok: 'menor que la emitida', mal: [['mayor que la emitida', 'Eso ocurre cuando se acerca.'], ['igual, porque el medio no cambia', 'El movimiento relativo fuente-observador sí cambia la frecuencia percibida (efecto Doppler).']], sol: '$f\'=fv/(v+v_s)\\lt f$ al alejarse.' },
    { q: 'La intensidad de un sonido se multiplica por 10. Su nivel de intensidad aumenta en…', ok: '$10\\,\\mathrm{dB}$', mal: [['$1\\,\\mathrm{dB}$', 'Con $\\beta=10\\log(I/I_0)$, un factor 10 en $I$ suma 10 dB.'], ['$100\\,\\mathrm{dB}$', 'Es una escala logarítmica: el nivel no se multiplica.']], sol: '$\\Delta\\beta=10\\log_{10}10=10\\,\\mathrm{dB}$.' }
  ]);
  G.c_m4 = Cues([
    { q: 'Dos gases ideales distintos están a la misma temperatura. Tienen igual…', ok: 'energía cinética de traslación media por molécula', mal: [['rapidez media de las moléculas', 'Depende de la masa molar: $v_{rms}=\\sqrt{3RT/M}$.'], ['energía interna total', 'Depende también del número de moles y de los grados de libertad.']], sol: '$\\bar K=\\tfrac32k_BT$ solo depende de $T$.' },
    { q: 'Un gas ideal se expande isotérmicamente. ¿Qué ocurre con el calor?', ok: '$Q=W\\gt0$: absorbe calor y lo convierte en trabajo', mal: [['$Q=0$', 'Eso es el adiabático. En el isotermo $\\Delta U=0$ y por tanto $Q=W$.'], ['$Q=\\Delta U$', 'Aquí $\\Delta U=0$ (solo depende de $T$) y $Q=W\\neq0$.']], sol: '$\\Delta U=0\\Rightarrow Q=W=nRT\\ln(V_2/V_1)\\gt0$.' },
    { q: 'En una expansión adiabática de un gas ideal, la temperatura…', ok: 'disminuye', mal: [['aumenta', 'El gas hace trabajo sin recibir calor: pierde energía interna.'], ['se mantiene', 'Eso es la isoterma; en la adiabática $Q=0$ y $\\Delta U=-W\\lt0$.']], sol: '$Q=0\\Rightarrow\\Delta U=-W\\lt0\\Rightarrow T$ baja ($TV^{\\gamma-1}$ constante).' },
    { q: 'En un ciclo completo de un gas, la variación de energía interna es…', ok: 'cero, porque $U$ es función de estado', mal: [['igual al calor neto', 'Se cumple $Q=W$, no $Q=\\Delta U$.'], ['igual al trabajo neto', 'Ese es el calor neto; $\\Delta U=0$.']], sol: 'Vuelve al estado inicial ⇒ $\\Delta U=0$ ⇒ $Q_{neto}=W_{neto}$.' },
    { q: 'Para aumentar la eficiencia de una máquina de Carnot conviene…', ok: 'subir la temperatura del foco caliente o bajar la del frío', mal: [['hacer los ciclos más despacio', 'La eficiencia de Carnot no depende de la velocidad: $e=1-T_C/T_H$.'], ['cambiar el gas por otro', 'No depende de la sustancia de trabajo.']], sol: '$e=1-T_C/T_H$ aumenta al subir $T_H$ o bajar $T_C$.' },
    { q: 'En un proceso real (irreversible) la entropía del universo…', ok: 'aumenta', mal: [['se conserva', 'Solo se conserva en procesos reversibles ideales.'], ['disminuye', 'La segunda ley lo prohíbe: $\\Delta S_{universo}\\ge0$.']], sol: '$\\Delta S_{universo}\\gt0$ en un proceso irreversible.' },
    { q: 'Una máquina térmica toma 500 J del foco caliente y cede 300 J al frío por ciclo. Su eficiencia es…', ok: '$40\\,\\%$', mal: [['$60\\,\\%$', 'Eso es $Q_C/Q_H$; la eficiencia es $W/Q_H=(500-300)/500$.'], ['$167\\,\\%$', 'Una máquina nunca supera el 100 %: $e=W/Q_H$.']], sol: '$W=500-300=200\\,\\mathrm J$ y $e=200/500=0{,}40$.' }
  ]);

  /* ---------- interfaz ---------- */
  var DELIM = [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }];
  function math(el) { try { if (window.renderMathInElement) renderMathInElement(el, { delimiters: DELIM, throwOnError: false }); } catch (e) {} }

  function init(box) {
    var tipo = box.dataset.tipo, gen = G[tipo];
    if (!gen) return;
    var N = parseInt(box.dataset.n || '5', 10), titulo = box.dataset.titulo || 'Serie de práctica', KEY = 'prac:' + tipo;
    var seed, i, aciertos, hechos, prob, resp, mejor = null;
    try { mejor = localStorage.getItem(KEY); } catch (e) {}
    box.innerHTML = '<div class="dr-head"><b></b><span class="dr-prog" aria-live="polite"></span></div><div class="dr-body"></div>';
    box.querySelector('b').textContent = '🏋️ ' + titulo;
    var prog = box.querySelector('.dr-prog'), body = box.querySelector('.dr-body');

    function nueva() { seed = (Date.now() + Math.floor(Math.random() * 1e6)) | 0; i = 0; aciertos = 0; hechos = []; pinta(); }
    function puntos() {
      var s = ''; for (var k = 0; k < N; k++) s += (k < hechos.length ? (hechos[k] ? '<span class="pt ok">●</span>' : '<span class="pt mal">●</span>') : '<span class="pt">○</span>');
      prog.innerHTML = (mejor !== null ? '<small>mejor: ' + mejor + '/' + N + '</small> ' : '') + s;
    }
    function pinta() {
      puntos();
      if (i >= N) {
        if (mejor === null || aciertos > +mejor) { mejor = aciertos; try { localStorage.setItem(KEY, aciertos); } catch (e) {} puntos(); }
        body.innerHTML = '<p class="dr-fin"><b>Serie terminada: ' + aciertos + ' de ' + N + '.</b> ' +
          (aciertos === N ? 'Perfecto: pasa al siguiente tipo.' : aciertos >= N - 1 ? 'Muy bien. Repasa el fallo y sigue.' : 'Relee el tema y repite la serie: salen problemas distintos.') + '</p><button type="button" class="dr-btn">Otra serie</button>';
        body.querySelector('button').addEventListener('click', nueva); return;
      }
      prob = gen(seed + i * 7919); resp = false;
      if (!prob.tipo) prob.tipo = 'num';
      body.innerHTML = '<p class="dr-enun"><span class="dr-n">' + (i + 1) + '/' + N + '</span> ' + prob.enun + '</p><div class="dr-ans"></div><div class="dr-fb" hidden></div>';
      var ans = body.querySelector('.dr-ans');
      if (prob.tipo === 'choice') {
        prob.opts.forEach(function (o, k) {
          var b = d.createElement('button'); b.type = 'button'; b.className = 'dr-opt'; b.innerHTML = o.t;
          b.addEventListener('click', function () { responder(o.ok, o.ok ? '' : o.why, b); }); ans.appendChild(b);
        });
      } else {
        ans.innerHTML = '<input type="text" inputmode="decimal" autocomplete="off" aria-label="Tu respuesta" placeholder="tu resultado"> ' + (prob.u ? '<span class="dr-u"></span> ' : '') + '<button type="button" class="dr-btn">Comprobar</button>';
        if (prob.u) ans.querySelector('.dr-u').textContent = prob.u;
        var inp = ans.querySelector('input'), bt = ans.querySelector('button');
        function comprobar() {
          if (resp) return; var a = parseNum(inp.value);
          if (isNaN(a)) { inp.classList.add('err'); inp.placeholder = 'escribe un número (admite coma y 1,5e3)'; return; }
          var good = ok(a, prob.ans), msg = '';
          if (!good) {
            msg = 'Revisa los pasos de la solución.';
            for (var k = 0; k < prob.diag.length; k++) if (ok(a, prob.diag[k][0])) { msg = prob.diag[k][1]; break; }
          }
          responder(good, good ? 'Resultado: <b>' + String(Number(prob.ans.toPrecision(4))).replace('.', ',') + (prob.u ? ' ' + prob.u : '') + '</b>.' : msg + ' (El resultado era <b>' + String(Number(prob.ans.toPrecision(4))).replace('.', ',') + (prob.u ? ' ' + prob.u : '') + '</b>.)');
          inp.disabled = true; bt.disabled = true;
        }
        bt.addEventListener('click', comprobar); inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') comprobar(); });
      }
      math(body);
    }
    function responder(good, msg, btn) {
      if (resp) return; resp = true; hechos.push(good); if (good) aciertos++; puntos();
      if (prob.tipo === 'choice') {
        [].forEach.call(body.querySelectorAll('.dr-opt'), function (b, j) { b.disabled = true; if (prob.opts[j].ok) b.classList.add('ok'); });
        if (!good && btn) btn.classList.add('mal');
      }
      var fb = body.querySelector('.dr-fb'); fb.hidden = false; fb.className = 'dr-fb ' + (good ? 'ok' : 'mal');
      fb.innerHTML = '<p><b>' + (good ? '✓ Correcto.' : '✗ No es correcto.') + '</b> ' + msg + '</p><details' + (good ? '' : ' open') + '><summary>Solución</summary><p>' + prob.sol + '</p></details>' +
        '<button type="button" class="dr-btn dr-next">' + (i + 1 < N ? 'Siguiente' : 'Ver resultado') + '</button>';
      fb.querySelector('.dr-next').addEventListener('click', function () { i++; pinta(); });
      math(fb); fb.querySelector('.dr-next').focus({ preventScroll: true });
    }
    nueva();
  }

  window.FisPractica = { gens: G, parseNum: parseNum, ok: ok };
  function ready(f) { d.readyState !== 'loading' ? f() : d.addEventListener('DOMContentLoaded', f); }
  ready(function () {
    var cajas = [].slice.call(d.querySelectorAll('.drill'));
    if (!('IntersectionObserver' in window)) { cajas.forEach(init); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); init(e.target); } }); }, { rootMargin: '300px' });
    cajas.forEach(function (c) { io.observe(c); });
  });
})();
