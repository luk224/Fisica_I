# Especificación — Simulación interactiva del Tema 3 (Movimiento en dos o tres dimensiones)

Documento para los agentes que implementen la simulación. **No contiene código de la simulación**: define qué hay que construir, con qué interfaces y cómo se comprueba. Todo lo que no esté aquí decidido, lo decide el coordinador (no el implementador por su cuenta).

Alcance físico = **U cap. 3** (Sears-Zemansky, 14ª ed., pp. 67-101), con la misma notación que `temas/tema_03_movimiento_2d_3d.html`. Única excepción: $\omega$ y $v=\omega R$ (pestaña 3), que el usuario pidió y que U define en el cap. 9; se marcan como «adelanto del tema 9».

---

## 0. Decisiones cerradas (resumen)

| Tema | Decisión |
|---|---|
| Ficheros | `simulaciones/sim_tema03.html` (página), `simulaciones/sim_tema03.css`, `simulaciones/sim_tema03.js` (punto de entrada: UI, pestañas, bucle). Para poder repartir el trabajo y testear en Node, la lógica va en 3 scripts auxiliares en la misma carpeta: `sim_tema03_fisica.js`, `sim_tema03_formulas.js`, `sim_tema03_render.js`. Son IIFE clásicos (sin `import`/`export`, sin bundler): si el usuario exige un único `.js`, se concatenan en el orden fisica → formulas → render → sim_tema03 y funciona igual. **Esta división es una propuesta del especificador: el coordinador debe confirmarla.** |
| Tests | `simulaciones/test/fisica03.test.cjs` y `simulaciones/test/formulas03.test.cjs`, ejecutables con `node --test simulaciones/test/` (Node ≥ 18; en el equipo hay Node 24). Nada de npm/dependencias. |
| Dependencias | Solo KaTeX local (`../assets/katex/katex.min.css`, `katex.min.js`). No hace falta `auto-render`: el panel usa `katex.render` directamente. Se reutilizan `../assets/resumen.css` (tokens de color, `.topbar`, `.src`, `.box`) y `../assets/resumen.js` (botón claro/oscuro con `localStorage('tema')`, botones de imprimir). |
| Motor | Canvas 2D. **Solución analítica en todas las pestañas** (todas las trayectorias tienen forma cerrada). El integrador semi-implícito existe en el núcleo solo como verificación cruzada en los tests (ver §3.6). |
| Bucle | `requestAnimationFrame` + acumulador con paso fijo `DT = 1/120 s` de tiempo simulado; el estado se evalúa analíticamente en `t`; el paso fijo solo sirve para muestrear la estela, la vista estroboscópica y detectar eventos de forma determinista. |
| Números | Punto decimal (como U y como el tema 3). Resultados con 3 cifras significativas; datos de entrada tal como se introducen. Ver §5.2. |
| Integración | Botón «Simulación» **solo** en la tarjeta del tema 3 de `index.html`. El tema 3 **no** enlaza ni menciona la simulación. Ver §9. |

---

## 1. Fuentes verificadas (página impresa = página PDF − 28, comprobado en `fuentes_txt/sears.txt`)

Cada fórmula del panel lleva una pastilla `<span class="src" data-l="…" data-ref="…">` (mismo componente que los temas). Referencias que se pueden usar (todas verificadas al redactar este documento):

| Clave | Contenido | Ref. exacta para `data-ref` |
|---|---|---|
| U1 | $\vec r=x\hat\imath+y\hat\jmath+z\hat k$ (3.1) | `U §3.1 ec. (3.1), p. 67` |
| U2 | $\vec v_{\text{med}}=\Delta\vec r/\Delta t$ (3.2) | `U §3.1 ec. (3.2), p. 68` |
| U3 | $\vec v=d\vec r/dt$, $v_x=dx/dt$… (3.3)-(3.4); $v=\sqrt{v_x^2+v_y^2+v_z^2}$ (3.6) | `U §3.1 ec. (3.3)-(3.6), p. 68` |
| U4 | $\tan\alpha=v_y/v_x$ (3.7) | `U §3.1 ec. (3.7), p. 69` |
| U5 | $\vec a_{\text{med}}$ (3.8), $\vec a=d\vec v/dt$ (3.9), $a_x=dv_x/dt$ (3.10) | `U §3.2 ec. (3.8)-(3.10), p. 71` |
| U6 | Componentes paralela y perpendicular de $\vec a$ | `U §3.2 p. 73-74, Ejemplo 3.3 p. 74` |
| U7 | Vehículo robot $x(t),y(t)$ | `U Ejemplos 3.1-3.3, p. 69-74` |
| U8 | $a_x=0,\ a_y=-g$ (3.13); (3.14)-(3.17) | `U §3.3 ec. (3.13)-(3.17), p. 75` |
| U9 | $v_{0x}=v_0\cos\alpha_0$, $v_{0y}=v_0\sin\alpha_0$ (3.18) | `U §3.3 ec. (3.18), p. 76` |
| U10 | $x=(v_0\cos\alpha_0)t$ (3.19), $y=(v_0\sin\alpha_0)t-\tfrac12gt^2$ (3.20), $v_x$ (3.21), $v_y$ (3.22) | `U §3.3 ec. (3.19)-(3.22), p. 76` |
| U11 | $r$, $v=\sqrt{v_x^2+v_y^2}$, $\tan\alpha=v_y/v_x$ (3.23)-(3.25); trayectoria (3.26) | `U §3.3 ec. (3.23)-(3.26), p. 77` |
| U12 | «Si necesita valores numéricos, utilice g = 9.8 m/s²» | `U §3.3 Estrategia 3.1, p. 78` |
| U13 | Ej. 3.6 moto que sale horizontal (9.0 m/s) | `U Ejemplo 3.6, p. 78-79` |
| U14 | Ej. 3.7 béisbol ($t_1$, $h$, $t_2=2t_1$, $R$) | `U Ejemplo 3.7, p. 79-80` |
| U15 | $h=v_0^2\sin^2\alpha_0/2g$, $R=v_0^2\sin2\alpha_0/g$, 45°, ángulos complementarios; CUIDADO: solo si salida y llegada a la misma altura | `U Ejemplo 3.8 y CUIDADO, p. 80` |
| U16 | Alturas inicial y final distintas (ecuación cuadrática en $t$) | `U Ejemplo 3.9, p. 81` |
| U17 | $a_{\text{rad}}=v^2/R$ (3.27) | `U §3.4 ec. (3.27), p. 83` |
| U18 | $v=2\pi R/T$ (3.28), $a_{\text{rad}}=4\pi^2R/T^2$ (3.29) | `U §3.4 ec. (3.28)-(3.29), p. 84` |
| U19 | Ej. 3.11 (curva, R mín.) y Ej. 3.12 (juego mecánico R = 5.0 m, T = 4.0 s) | `U Ejemplos 3.11-3.12, p. 84-85` |
| U20 | $a_{\text{tan}}=d\lvert\vec v\rvert/dt$ (3.30); $\lvert d\vec v/dt\rvert=\sqrt{a_{\text{rad}}^2+a_{\text{tan}}^2}$ | `U §3.4 ec. (3.30) y CUIDADO, p. 85` |
| U21 | $v_{P/A,x}=v_{P/B,x}+v_{B/A,x}$ (3.32); $v_{A/B,x}=-v_{B/A,x}$ (3.33) | `U §3.5 ec. (3.32)-(3.33), p. 86-87` |
| U22 | $\vec v_{P/A}=\vec v_{P/B}+\vec v_{B/A}$ (3.35); $\vec v_{A/B}=-\vec v_{B/A}$ (3.36) | `U §3.5 ec. (3.35)-(3.36), p. 88-89` |
| U23 | Ej. 3.14 avión con viento cruzado (260 km/h, 23° E de N) | `U Ejemplo 3.14, p. 89` |
| U24 | Ej. 3.15 corrección por viento ($\beta=\arcsin(100/240)=25°$, 218 km/h) | `U Ejemplo 3.15, p. 90` |
| U25 | $s=R\theta$ ($\theta$ en rad) (9.1) | `U §9.1 ec. (9.1), p. 274 (adelanto del tema 9)` |
| U26 | $v=R\omega$ (9.13); $a_{\text{rad}}=v^2/R=\omega^2R$ (9.15) | `U §9.3 ec. (9.13) y (9.15), p. 281 (adelanto del tema 9)` |
| U27 | $\omega=2\pi f=2\pi/T$ (14.1)-(14.2) | `U §14.1 ec. (14.1)-(14.2), p. 435 (adelanto)` |
| U28 | $g_{\text{Luna}}=1.62$ m/s² | `U §4.4, p. 115` |
| U29 | $g_{\text{Marte}}=3.71$ m/s² | `U Problemas cap. 2, p. 63` |
| P | Desarrollo propio (generalizaciones con $y_0$, rumbo de mínima deriva, alcance máximo con $y_0$, Lissajous, espiral) | `data-l="P"`, `data-ref="Desarrollo propio a partir de …"` |

Convención en las ecuaciones del proyectil: el lanzamiento es siempre en $x_0=0$ y la altura de lanzamiento $y_0\ge0$ se mide desde el suelo. Con $y_0=0$ las ecuaciones del panel son literalmente (3.19)-(3.22); con $y_0\ne0$ son (3.15)/(3.17) con (3.18). Se etiquetan igual que en el tema 3 («ec. 3.19», «ec. 3.20»).

No usar otras páginas sin verificarlas antes en `fuentes_txt/sears.txt`.

---

## 2. Página: estructura, layout y estilo

### 2.1 Esqueleto de `sim_tema03.html`
```
<html lang="es">  (sin data-theme fijo; resumen.js aplica el guardado en localStorage)
<head> meta charset, viewport, <title>Física I · Simulación Tema 3</title>
       ../assets/katex/katex.min.css, ../assets/resumen.css, sim_tema03.css
       defer: ../assets/katex/katex.min.js, ../assets/resumen.js,
              sim_tema03_fisica.js, sim_tema03_formulas.js, sim_tema03_render.js, sim_tema03.js
<body>
  div.topbar > div.in : <a href="../index.html">← Volver al índice</a>
                        <span><button id="btn-tema" type="button">Claro / oscuro</button></span>
  (resumen.js inyecta solos «Imprimir / PDF» e «Imprimir en color» delante de #btn-tema)
  <main class="sim">
    <header class="sim-hero"> kick «Bloque Mecánica · Tema 3 · Simulación»
       <h1>Movimiento en dos o tres dimensiones</h1>  + 1 frase de qué se puede hacer
    <div role="tablist" aria-label="Partes de la simulación"> 4 <button role="tab"> 
    <section role="tabpanel" id="p1|p2|p3|p4"> (uno visible cada vez) con:
       .sim-stage   → <canvas> + barra de reproducción + lectura en vivo (<dl>)
       .sim-ctrl    → controles de la pestaña (fieldset/legend)
       .sim-fx      → panel «Fórmulas en uso»
    <div id="anuncios" class="sr-only" aria-live="polite"></div>
    <noscript> aviso: la simulación necesita JavaScript.
```
Un único `<canvas id="lienzo">` que se mueve (appendChild) al panel activo; así hay un solo contexto, un solo `ResizeObserver` y un solo bucle.

Etiquetas de las pestañas: «1 · Vectores r, v, a», «2 · Tiro parabólico», «3 · Movimiento circular», «4 · Velocidad relativa».

### 2.2 Layout
- **Escritorio ≥ 1000 px**: rejilla `grid-template-columns: minmax(0,1fr) 380px; gap 20px; max-width 1340px`. Columna izquierda: lienzo, barra de reproducción, lectura en vivo. Columna derecha: controles arriba y «Fórmulas en uso» debajo, con `position: sticky; top: 64px; max-height: calc(100vh - 80px); overflow: auto` para la columna.
- **≥ 1400 px**: tres columnas `300px minmax(0,1fr) 400px` (controles | lienzo | fórmulas).
- **< 1000 px (tablet/móvil)**: una columna en este orden: pestañas (scroll horizontal si no caben, sin envolver), lienzo, barra de reproducción (sticky abajo de la pantalla con `position: sticky; bottom: 0` y fondo `var(--bg)`), lectura en vivo, controles (en `<details open>` plegable, «Controles»), fórmulas (`<details open>`, «Fórmulas en uso»).
- **330 px**: ningún scroll horizontal de página; márgenes laterales 12 px; KaTeX en display con `overflow-x: auto` dentro de su caja (ya lo da `.katex-display` de resumen.css); sliders a ancho 100 %; números en `font-variant-numeric: tabular-nums`.
- Lienzo: ancho = 100 % de su contenedor; alto = `clamp(240px, ancho × 0.62, 70vh)`. Escalado por `devicePixelRatio` (máx. 2). Redimensionado con `ResizeObserver` (recalcula cámara y redibuja aunque esté en pausa).

### 2.3 Estilo y temas
- Colores **solo** con las variables de `resumen.css`: `--bg --fg --mut --card --bd --acc --A --X --E --P --thm --thm-b --warn-b --tip-b --intu-b`. Nada de hex en `sim_tema03.css` ni en el JS.
- Asignación fija de colores (coherente con las figuras del tema 3): $\vec v$ → `--acc` (azul); $\vec a$ → `--A` (naranja); componentes $x$ y $a_\parallel$ → `--X` (verde); componentes $y$ y $a_\perp$ → `--E` (morado); $\vec r$ → `--fg` (línea 2 px); $\vec v_{\text{med}}$ y cuerda $\Delta\vec r$ → `--thm-b` discontinuo; trayectoria teórica → `--mut` discontinua; estela → `--acc` al 50 %; diana → `--warn-b`; agua/río → `--intu` relleno; ejes y rejilla → `--mut`/`--bd`.
- El canvas lee los colores con `getComputedStyle(document.documentElement).getPropertyValue('--x').trim()` y los cachea en un objeto `Paleta`. Se recalcula: al cargar, al cambiar el atributo `data-theme` de `<html>` (`MutationObserver`), al cambiar `matchMedia('(prefers-color-scheme: dark)')`, y en `beforeprint`/`afterprint`.
- Componentes visuales: botones y fieldsets con `--card`/`--bd`, radio 10 px, tipografía `var(--sans)` para controles y `var(--serif)` para títulos (como los temas). Caja de feedback del reto con las clases `.box.tip` / `.box.warn` / `.box.ex` existentes.

### 2.4 Impresión (razonable, una página A4 por pestaña activa)
- `@media print`: ocultar `.topbar`, `[role=tablist]`, `.sim-ctrl`, barra de reproducción, `details > summary`; mostrar solo el panel activo; lienzo al 100 % de ancho (máx. 120 mm de alto); fórmulas todas visibles (también las inactivas, sin atenuar); lectura en vivo como tabla.
- En `beforeprint`: recargar la `Paleta` (resumen.css pone la paleta B/N salvo `html.print-color`) y redibujar; copiar el lienzo a un `<img>` (`toDataURL`) que se muestra solo en impresión, para que el navegador no imprima un canvas en blanco. En `afterprint`: retirar la imagen y volver a la paleta de pantalla.
- Las pastillas `.src` desaparecen al imprimir (lo hace resumen.css): es lo esperado.

---

## 3. Núcleo físico — `sim_tema03_fisica.js` (puro, sin DOM, testeable en Node)

Patrón de módulo (obligatorio para todos los auxiliares):
```
(function (raiz) {
  'use strict';
  const API = { … };
  if (typeof module === 'object' && module.exports) module.exports = API;
  else (raiz.SIM3 = raiz.SIM3 || {}).fisica = API;
})(typeof window !== 'undefined' ? window : globalThis);
```
Unidades SI internas (m, s, m/s, m/s², rad). Las funciones públicas reciben ángulos **en grados** (sufijo `Deg`) y devuelven ángulos en grados con sufijo `Deg`. Vectores como `{x, y}`. Ninguna función lanza excepciones con datos del rango de la UI; los casos imposibles devuelven `null`/`Infinity` documentados.

### 3.1 Constantes
`G = { tierra: 9.80, luna: 1.62, marte: 3.71 }` (U12/U28/U29; U recomienda 9.8 y sus ejemplos usan 9.80).
`DT = 1/120` (s, paso fijo del bucle).

### 3.2 Utilidades vectoriales
`suma(a,b)`, `resta(a,b)`, `escala(a,k)`, `modulo(a)`, `dot(a,b)`, `cruz(a,b)` (escalar z), `anguloDeg(a)` = `atan2(y,x)` en grados (−180, 180], `desdeAnguloDeg(mod, angDeg)`.
`descomponerAceleracion(v, a)` → `{ aPar, aPerp, aParVec, aPerpVec }` con `aPar = dot(a,v)/|v|` (con signo), `aPerp = |cruz(a,v)|/|v|` (≥ 0), `aParVec = v̂·aPar`, `aPerpVec = a − aParVec`. Si `|v| < 1e-9`: `aPar = 0`, `aPerp = |a|`, `aParVec = {0,0}`, `aPerpVec = a` y flag `vNula: true` (no hay dirección de referencia).

### 3.3 Pestaña 1 — trayectorias predefinidas
`trayectorias` = objeto con 5 entradas; cada una `{ id, nombre, tMax, r(t), v(t), a(t), ecuacionTex, src }` con derivadas **analíticas** escritas a mano:

| id | Nombre en UI | Definición | tMax | Fuente |
|---|---|---|---|---|
| `parabola` | Parábola (proyectil) | $v_0=10$ m/s, $\alpha_0=60°$, $g=9.80$: $x=(v_0\cos\alpha_0)t$, $y=(v_0\sin\alpha_0)t-\tfrac12gt^2$ | $t_v=1.767$ s | U10 |
| `circulo` | Círculo (uniforme) | $R=2.0$ m, $T=4.0$ s: $x=R\cos(2\pi t/T)$, $y=R\sin(2\pi t/T)$ | 8 s (2 vueltas) | U17/U18 |
| `lissajous` | Lissajous | $x=A\sin\omega t$, $y=B\sin2\omega t$, $A=3.0$ m, $B=2.0$ m, $\omega=1.0$ rad/s | $2\pi$ s | P |
| `espiral` | Espiral | $r=r_0+bt$, $\theta=\omega t$: $x=r\cos\theta$, $y=r\sin\theta$, $r_0=0.5$ m, $b=0.5$ m/s, $\omega=1.0$ rad/s | $4\pi$ s | P |
| `robot` | Vehículo robot (Ej. 3.1 de U) | $x=2.0-0.25t^2$, $y=1.0t+0.025t^3$ (SI) | 4 s | U7 |

`velocidadMedia(tray, t, dt)` → `{ r1, r2, dr, vmed }` con `vmed = (r(t+dt) − r(t))/dt`; si `t+dt > tMax` se usa el intervalo `[t−dt, t]` (y se devuelve `haciaAtras: true`).

### 3.4 Pestaña 2 — proyectil
`proyectil({ v0, alfa0Deg, y0, g })` devuelve un objeto **precalculado** (no recalcular por frame):
- `v0x = v0 cosα0`, `v0y = v0 sinα0` (U9).
- `t1` (instante del vértice) = `v0y/g` si `v0y > 0`; si no, `0` (el punto más alto es el de salida). `tieneVertice = v0y > 0`.
- `yMax = y0 + v0y²/(2g)` si `v0y > 0`; si no, `y0`.
- `tv` (tiempo de vuelo, llegada a `y = 0`) = `(v0y + sqrt(v0y² + 2 g y0))/g`. Con `y0 = 0` y `v0y ≤ 0`: `tv = 0` y flag `sinVuelo: true`.
- `R` (alcance, $x$ en el impacto) = `v0x·tv`.
- `simetrico = (y0 === 0)`; si es simétrico, `Rformula = v0²·sin(2α0)/g` y `hFormula = v0²·sin²α0/(2g)` (deben coincidir con `R` y `yMax` a 1e-9; es un test).
- `impacto = { vx, vy, v, angDeg }` evaluado en `tv`.
- `estado(t)` (con `t` recortado a `[0, tv]`) → `{ t, x, y, vx, vy, v, angDeg, ax: 0, ay: -g, aPar, aPerp, fase }`.
- `fase(t)`: `'inicio'` si `t === 0`; `'impacto'` si `t >= tv`; `'vertice'` si `tieneVertice && |t − t1| ≤ 0.02·tv`; `'subida'` si `vy > 0`; `'bajada'` en otro caso. (Si `α0 = 0` y `y0 > 0` no hay subida: fase `'bajada'` desde el principio, y en `t = 0` `'inicio'`.)
- `trayectoria(n = 200)` → `n+1` puntos de `t = 0` a `tv` (curva teórica; en pantalla se dibuja también como ec. 3.26 por coherencia, son la misma curva).
- `estroboscopio()` → instantes múltiplos de `Δt_e` hasta `tv`, con `Δt_e` el primer valor de `[0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 5]` que deje entre 8 y 20 marcas (si ninguno, el que más se acerque a 12).
- `alcanceMaximo({ v0, y0, g })` → `{ alfaDeg, R }` con $\alpha^*=\arctan\!\big(v_0/\sqrt{v_0^2+2gy_0}\big)$ y $R_{\max}=v_0\sqrt{v_0^2+2gy_0}/g$ (P; con $y_0=0$ da 45° y $v_0^2/g$, U15).
- `angulosParaDiana({ v0, y0, g, D })` → array ordenado de 0, 1 o 2 ángulos (grados, en (−90°, 90°)) con `R(α) = D`, por bisección en `[−89.9°, α*]` y `[α*, 89.9°]` (tolerancia 1e-6°). `[]` si `D > Rmax` (diana inalcanzable).

### 3.5 Pestaña 3 — circular
`circular({ modo: 'uniforme'|'noUniforme', R, T, v0, aTan })` → objeto con `estado(t)` → `{ t, theta (rad, acumulado), thetaDeg (mod 360), pos, v, vVec, omega, aRad, aTan, a, aVec, aRadVec, aTanVec, vueltas, detenido }`.
- Uniforme (entrada R, T): `v = 2πR/T` (U18), `omega = 2π/T` (U27), `aRad = v²/R = 4π²R/T²` (U17/U18), `aTan = 0`, `theta = omega·t`.
- No uniforme (entrada R, v0, aTan constante): `v(t) = v0 + aTan·t`, `s(t) = v0 t + ½ aTan t²` (ecs. 2.8 y 2.12 de U aplicadas a lo largo del arco: P), `theta = s/R` (U25), `omega = v/R` (U26), `aRad = v²/R` (U17, con la rapidez instantánea, U20), `a = sqrt(aRad² + aTan²)` (U20).
- Frenada: si `aTan < 0` y `v0 > 0`, en `tStop = v0/|aTan|` la partícula se detiene: para `t ≥ tStop`, `v = 0`, `aTan = 0`, `aRad = 0`, `theta = s(tStop)/R`, `detenido = true` (no invierte el sentido). Si `v0 = 0` y `aTan ≤ 0`: `detenido` desde el inicio.
- Límite: si `v > 50 m/s` el bucle pausa y la UI avisa («La rapidez se dispara: reinicia o reduce a_tan»).
- Sentido de giro: antihorario, $\theta$ desde el eje $+x$. $\vec v$ tangente ($\hat\theta$), $\vec a_{\text{rad}}$ hacia el centro, $\vec a_{\text{tan}}$ a lo largo de $\pm\hat\theta$.
- Auxiliar: `aRadDesde({ v, R })` y `radioDesde({ v, aRad })` (para tests con el Ej. 3.11).

### 3.6 Integrador de verificación
`integrarSemiImplicito(estado0, aceleracionFn, dt, tFinal)` (Euler semi-implícito: `v += a·dt; r += v·dt`). **No se usa en la UI**; existe para el test que compara la solución analítica del proyectil con la numérica (dt = 1e-4 s, error < 5e-3 m en `x` e `y` a `t = 1 s` con el caso A de §10).

### 3.7 Pestaña 4 — velocidad relativa
Convenciones (letras de U: P/A/E en el avión como en los Ej. 3.14-3.15; en la barca se usa B = barca, R = río/agua, E = Tierra/orilla, para que la Tierra sea E en ambos escenarios):
- **Barca**: eje $x$ a lo largo del río (sentido de la corriente, hacia la derecha), eje $y$ de una orilla ($y=0$) a la otra ($y=d$). Rumbo $\beta$ = ángulo de la proa respecto a la perpendicular a la orilla, **positivo aguas arriba**.
  `barca({ vBR, vRE, betaDeg, d })` → `vBRvec = vBR·(−sinβ, cosβ)`, `vREvec = (vRE, 0)`, `vBEvec = vBRvec + vREvec` (U22), `vBE = |vBEvec|`, `desviacionDeg = atan2(vBE_x, vBE_y)` en grados (positivo = aguas abajo), `tCruce = d / vBE_y` (Infinity si `vBE_y ≤ 0`), `deriva = vBE_x · tCruce`, `posicion(t)`.
  `rumboRecto({ vBR, vRE })` → `{ betaDeg = asin(vRE/vBR), vBE = sqrt(vBR² − vRE²) }` (U24 aplicado al río) o `null` si `vBR ≤ vRE`.
  `rumboMinimaDeriva({ vBR, vRE })` → si `vBR ≤ vRE`: `betaDeg = asin(vBR/vRE)` con su deriva (P); si no, igual que `rumboRecto` (deriva 0).
- **Avión**: $x$ = este, $y$ = norte. Rumbos geográficos (0° = N, 90° = E): vector = `mod·(sin θ, cos θ)`.
  `avion({ vPA, rumboDeg, vAE, vientoHaciaDeg })` → `vPAvec`, `vAEvec`, `vPEvec = vPAvec + vAEvec` (U22), `vPE`, `rumboSueloDeg` (0-360).
  `rumboParaDerrota({ vPA, vAE, vientoHaciaDeg, derrotaDeg })` → rumbo de la proa para que `vPE` apunte a `derrotaDeg`, con `vPE` resultante; `null` si la componente del viento perpendicular a la derrota supera `vPA` o si la velocidad resultante a lo largo de la derrota es ≤ 0. Método: `u` unitario de la derrota, `w⊥ = w − (w·u)u`, `p⊥ = −w⊥`, `p∥ = sqrt(vPA² − |w⊥|²)`, `p = p∥u + p⊥`, `vPE = p∥ + w·u`.

### 3.8 Diagnóstico de errores del reto (pestaña 2)
`diagnosticar({ pregunta, respuesta, params })` con `pregunta ∈ {'R','yMax','tv','vImpacto'}` → `{ correcto, valorCorrecto, codigo, mensaje }`.
- Correcto si `|resp − correcto| ≤ max(0.02·|correcto|, 0.05)`.
- Si no, se comparan con estos candidatos (en este orden; el primero que cumpla `|resp − cand| ≤ max(0.015·|cand|, 0.05)` y que **no** coincida con el correcto dentro de la misma tolerancia gana). Solo se evalúan los candidatos aplicables (columna «Aplica»):

| Código | Error típico | Cálculo del candidato | Aplica | Mensaje (resumen) |
|---|---|---|---|---|
| `RAD` | Calculadora en radianes | mismo cálculo correcto pero `sin/cos` del número de grados interpretado como radianes; descartar si sale ≤ 0 | R, yMax, tv | «Tu calculadora está en RAD: pon DEG.» |
| `SIM` | Usar las fórmulas «de examen» con $y_0\ne0$ | R: $v_0^2\sin2\alpha_0/g$; tv: $2v_0\sin\alpha_0/g$; yMax: $v_0^2\sin^2\alpha_0/2g$ (sin sumar $y_0$) | solo si $y_0>0$ | «$R=v_0^2\sin2\alpha_0/g$ solo vale si sale y llega a la misma altura (U, CUIDADO p. 80). Resuelve $y(t)=0$ (Ej. 3.9).» |
| `T1` | Tomar el tiempo de subida como tiempo de vuelo | tv: $t_1$; R: $v_{0x}t_1$ | tv, R (si `tieneVertice`) | «$v_y=0$ es el vértice, no el suelo.» |
| `SEN` | $\sin\alpha_0$ en vez de $\sin2\alpha_0$ | R: $v_0^2\sin\alpha_0/g$ | R, si $y_0=0$ | «El alcance lleva $\sin 2\alpha_0$.» |
| `SINCOS` | Intercambiar seno y coseno en (3.18) | recalcular todo con $v_{0x}=v_0\sin\alpha_0$, $v_{0y}=v_0\cos\alpha_0$ | yMax, tv (y R si $y_0>0$) | «$v_{0y}=v_0\sin\alpha_0$ con $\alpha_0$ medido desde la horizontal.» |
| `DOS` | Olvidar el 2 de $2g$ | yMax: $y_0+v_{0y}^2/g$ | yMax | «$h=v_{0y}^2/(2g)$.» |
| `V0Y` | Usar $v_0$ en vez de $v_{0y}$ para la altura | yMax: $y_0+v_0^2/2g$ | yMax | «En el vértice solo se anula $v_y$; $v_x$ sigue.» |
| `GT` | Usar $g$ de la Tierra en la Luna/Marte | recalcular con $g=9.80$ | todas, si planeta ≠ Tierra | «Estás en la Luna/Marte: $g$ = 1.62/3.71 m/s².» |
| `VIMP` | Rapidez de impacto: dar $v_0$ o solo $\lvert v_y\rvert$ | $v_0$ (si $y_0>0$); $\lvert v_y(t_v)\rvert$ | vImpacto | «$v=\sqrt{v_x^2+v_y^2}$ (ec. 3.24) y $v_x$ no cambia.» |

Si ningún candidato encaja: `codigo: 'OTRO'`, mensaje genérico con la receta (descomponer → $y(t)=0$ → $x(t_v)$).

---

## 4. Render — `sim_tema03_render.js`

Expone `SIM3.render` con:
- `Paleta.leer()` → objeto con los colores de §2.3 (strings CSS ya resueltos).
- `Camara` (mundo ↔ pantalla, **misma escala en x e y**, imprescindible para que los ángulos se vean bien): `ajustar(limitesMundo, anchoPx, altoPx, margenPx = 36)`, `aPantalla({x,y})`, `aMundo(px,py)`, `escala` (px/m). Eje $y$ hacia arriba.
- Primitivas: `ejes(ctx, cam, opts)` (rejilla 1-2-5 con etiquetas en m; origen marcado), `vector(ctx, cam, origen, vecPx, color, etiqueta, opts)` (punta de tamaño fijo 10 px; ancho 3 px; `opts.discontinuo`), `etiqueta(ctx, base, sub, pos, color)` (subíndice real: texto base + subíndice a 70 % de tamaño desplazado 4 px abajo; nunca «v_x» con guion bajo), `polilinea`, `punto`, `marcador(ctx, pos, texto)` (línea guía discontinua + rótulo), `textoConHalo` (trazo `--bg` de 3 px detrás, como `svg.fig text`).
- Escalas de vectores (no son longitudes reales; poner el rótulo «vectores no a escala de posición» en una esquina): `kV` tal que la velocidad de referencia de la pestaña (p. ej. $v_0$) mida 18 % de `min(ancho, alto)` px; `kA` tal que la aceleración de referencia ($g$, o la $a$ máxima de la trayectoria en la pestaña 1) mida 12 %. Se fijan al cambiar parámetros, **no** cada frame (para que las flechas crezcan/encojan de verdad).
- Funciones de dibujo por pestaña, todas `dibujarPestanaN(ctx, cam, escena, paleta)` sin estado propio. Contrato `escena` en §6.2.
- Texto del lienzo con `var(--sans)` 13 px (12 px si el ancho < 420 px). Ningún rótulo puede salir del lienzo: si no cabe a la derecha del punto, se coloca a la izquierda.

Contenido mínimo de cada dibujo:
1. **P1**: ejes; trayectoria completa en `--mut` discontinua; estela recorrida; partícula; $\vec r$ desde el origen; $\vec v$ y $\vec a$ desde la partícula; si «a∥/a⊥» está activo, las dos componentes discontinuas con su rectángulo de proyección; si «v_med» está activo, los puntos $\vec r(t)$ y $\vec r(t+\Delta t)$, la cuerda $\Delta\vec r$ y la flecha $\vec v_{\text{med}}$ (misma escala `kV` que $\vec v$, para que se vea cómo converge).
2. **P2**: suelo ($y=0$) con línea gruesa; plataforma de altura $y_0$ si $y_0>0$; curva teórica (ec. 3.26, discontinua); hasta 3 trayectorias «fantasma» de lanzamientos anteriores (`--mut` al 40 %, rotuladas con su $\alpha_0$); estela; marcas estroboscópicas (círculos huecos, con sus $\vec v$ pequeñas opcionales); proyectil; $\vec v$ con componentes $v_x$ (verde) y $v_y$ (morado); $\vec a=-g\hat\jmath$; marcadores «$h$ = … m» (horizontal discontinua en $y_{\max}$ + vertical en $x(t_1)$), «$R$ = … m» (cota en el suelo), «$t_v$ = … s» (junto al punto de impacto); diana del reto (rectángulo de ancho ±tolerancia en el suelo + rótulo «D = … m»).
3. **P3**: circunferencia de radio $R$ con el centro marcado y el radio a la partícula; ángulo $\theta$ como arco; $\vec v$ tangente; $\vec a_{\text{rad}}$ hacia el centro; $\vec a_{\text{tan}}$ (si ≠ 0); $\vec a$ total (si «a total» activo); contador de vueltas.
4. **P4 barca**: río como banda `--intu` entre las dos orillas, flechitas de corriente; barca orientada según la **proa** ($\vec v_{B/R}$) pero desplazándose según $\vec v_{B/E}$; estela; triángulo de vectores en un recuadro fijo (esquina superior izquierda, escala propia): $\vec v_{B/R}$ + $\vec v_{R/E}$ = $\vec v_{B/E}$, punta con cola; punto de destino «enfrente» marcado y la deriva acotada al llegar. **P4 avión**: rosa de los vientos (N arriba), rejilla de «suelo», avión orientado según el rumbo con su estela según $\vec v_{P/E}$, triángulo de vectores igual que en la barca.

---

## 5. Panel «Fórmulas en uso» — `sim_tema03_formulas.js`

### 5.1 Modelo
Parte pura (testeable en Node): `SIM3.formulas.construir(pestana, contexto)` → array ordenado de
```
{ id, titulo, texGeneral, texSust | null, txt (respaldo sin KaTeX), estado: 'resaltada'|'activa'|'inactiva'|'noAplica', nota | null, src: { l, ref } }
```
`contexto` = `{ params, estado, fase, evento, opciones, ultimoCambio }` (lo arma la UI; ver §6.2).
Parte DOM: `SIM3.formulas.Panel(contenedor)` con `actualizar(lista)`:
- Cada fórmula es `<div class="fx" data-id data-estado>` con: título (sans 13 px), `<div class="fx-gen">` (KaTeX display), `<div class="fx-sus">` (KaTeX display, solo si `texSust`), nota opcional (`<p class="fx-nota">`) y la pastilla `.src` (con `tabindex=0` y `aria-label=ref`, igual que hace resumen.js con las demás; como el panel se crea después de que corra resumen.js, lo hace el propio Panel).
- Estilos: `resaltada` → fondo `--thm`, borde izquierdo 5 px `--thm-b`, y se hace `scrollIntoView({block:'nearest'})` **solo** si el panel no está en el viewport del usuario moviendo un control (no robar scroll mientras se arrastra un slider); `activa` → `--card`; `inactiva` → opacidad 0.55; `noAplica` → opacidad 0.55, fórmula tachada con `text-decoration: line-through` sobre el contenedor y la nota en `--warn-b`.
- Rendimiento: `katex.render(tex, el, { displayMode: true, throwOnError: false })` **solo si el string cambió** respecto al último renderizado de ese nodo; actualizaciones del panel limitadas a 10 Hz durante la animación (en pausa, inmediatas). Si `window.katex` no existe, se escribe `txt` como texto.
- Orden: las fórmulas mantienen su orden fijo (no se reordenan al resaltarse) para que el estudiante sepa dónde está cada una.
- Un pie del panel indica: «Resaltada = la que manda en este momento. Valores redondeados a 3 cifras.»

### 5.2 Formato de números en las sustituciones
- `fmtR(x)` (resultados): 3 cifras significativas sin notación científica (`toPrecision(3)` y, si `|x| ≥ 1000`, redondeo a entero); `-0` → `0`.
- Datos de entrada: tal como se fijaron (`v0` = `20` o `20.5`; ángulos enteros con `^\circ`; `y0` como entrada; `g` con 2 decimales `9.80`, `1.62`, `3.71`).
- Tiempo actual `t` con 2 decimales (`1.20`).
- Un valor negativo que va detrás de un operador se escribe entre paréntesis: `-\,9.80\cdot(-0.288)`.
- Unidades con `\ \text{m}`, `\ \text{m/s}`, `\ \text{m/s}^2`, `\ \text{s}`, `\ \text{rad/s}`, `\ \text{km/h}`.
- Ejemplo obligatorio (test): caso A de §10 en `t = 1.20` → `texSust` de F2.2 = `x = (20\cdot\cos 35^\circ)\cdot 1.20 = 19.7\ \text{m}`.

### 5.3 Pestaña 1 — fórmulas
| id | Título | `texGeneral` | Sustitución | Fuente | Visible / resaltado |
|---|---|---|---|---|---|
| F1.0 | Ecuación de la trayectoria | la de la trayectoria elegida (tabla §3.3) | — | según §3.3 | siempre; activa |
| F1.1 | Vector de posición | `\vec r = x\hat\imath + y\hat\jmath` | `\vec r = ({x})\hat\imath + ({y})\hat\jmath\ \text{m}` | U1 | siempre; activa |
| F1.2 | Velocidad media | `\vec v_{\text{med}} = \dfrac{\Delta\vec r}{\Delta t} = \dfrac{\vec r_2-\vec r_1}{t_2-t_1}` | `\vec v_{\text{med}} = \dfrac{({dx})\hat\imath + ({dy})\hat\jmath}{ {dt} } = ({vmx})\hat\imath + ({vmy})\hat\jmath\ \text{m/s}` | U2 | si «v_med» activo; **resaltada** mientras se mueve el slider Δt o se ejecuta «Δt → 0» |
| F1.3 | Velocidad instantánea | `\vec v=\dfrac{d\vec r}{dt},\quad v_x=\dfrac{dx}{dt},\ v_y=\dfrac{dy}{dt}` | `\vec v = ({vx})\hat\imath + ({vy})\hat\jmath\ \text{m/s}` | U3 | siempre; **resaltada** si «v_med» activo y Δt ≤ 0.01 s, con nota «Δt → 0: la cuerda se vuelve tangente; \|v_med − v\| = … m/s» |
| F1.4 | Rapidez y dirección | `v=\sqrt{v_x^2+v_y^2},\quad \tan\alpha=\dfrac{v_y}{v_x}` | `v = \sqrt{({vx})^2+({vy})^2} = {v}\ \text{m/s},\ \alpha = {ang}^\circ` | U3/U4 | siempre; activa (nota de cuadrante si `vx < 0`: «se ha sumado 180° al arctan») |
| F1.5 | Aceleración | `\vec a=\dfrac{d\vec v}{dt},\quad a_x=\dfrac{dv_x}{dt},\ a_y=\dfrac{dv_y}{dt}` | `\vec a = ({ax})\hat\imath + ({ay})\hat\jmath\ \text{m/s}^2` | U5 | siempre; activa |
| F1.6 | Componentes paralela y perpendicular | `a_\parallel=\dfrac{\vec a\cdot\vec v}{v},\quad a_\perp=\sqrt{a^2-a_\parallel^2}` | `a_\parallel = {apar}\ \text{m/s}^2,\ a_\perp = {aperp}\ \text{m/s}^2` | U6 | si «a∥/a⊥» activo; **resaltada** siempre que esté visible, con nota: `apar > 0.02·a` → «la rapidez aumenta»; `< −0.02·a` → «la rapidez disminuye»; si `|apar| ≤ 0.02·a` → «solo cambia la dirección»; si `aperp ≤ 0.02·a` → «en este instante la trayectoria es recta» |

(Las barras verticales de las notas se escriben `\lvert … \rvert` en KaTeX.)

### 5.4 Pestaña 2 — fórmulas
Variables de la sustitución: `{v0} {a0} {y0} {g} {t}` (entradas) y resultados de `estado(t)`/`proyectil`.

| id | Título | `texGeneral` | Fuente | Resaltada cuando |
|---|---|---|---|---|
| F2.1 | Componentes iniciales | `v_{0x}=v_0\cos\alpha_0,\quad v_{0y}=v_0\sin\alpha_0` | U9 | fase `inicio` y durante 1.5 s tras cambiar `v0` o `α0` |
| F2.2 | Posición horizontal | `x=(v_0\cos\alpha_0)\,t` | U10 (ec. 3.19) | `subida` y `bajada` (junto con F2.3) |
| F2.3 | Posición vertical | `y=y_0+(v_0\sin\alpha_0)\,t-\tfrac12 g t^2` | U8+U9 (ec. 3.17/3.20) | `subida`, `bajada` |
| F2.4 | Velocidad horizontal (constante) | `v_x=v_0\cos\alpha_0` | U10 (ec. 3.21) | nunca resaltada; activa (nota fija: «no cambia en todo el vuelo») |
| F2.5 | Velocidad vertical | `v_y=v_0\sin\alpha_0-g\,t` | U10 (ec. 3.22) | `subida` (nota «$v_y>0$: sube»), `vertice` (nota «$v_y=0$: punto más alto»), `bajada` («$v_y<0$: baja») |
| F2.6 | Rapidez y dirección | `v=\sqrt{v_x^2+v_y^2},\quad\tan\alpha=\dfrac{v_y}{v_x}` | U11 (3.24-3.25) | `impacto` (rapidez y ángulo de llegada) |
| F2.7 | Aceleración | `a_x=0,\quad a_y=-g` | U8 (3.13) | `vertice` (nota: «en el vértice $\vec v\perp\vec a$, pero $\vec a$ sigue siendo $-g\hat\jmath$») |
| F2.8 | Vértice | `t_1=\dfrac{v_0\sin\alpha_0}{g},\quad y_{\max}=y_0+\dfrac{v_0^2\sin^2\alpha_0}{2g}` | U14/U15 (con $y_0$: P) | `vertice`; `noAplica` si `!tieneVertice` (nota «se lanza hacia abajo u horizontal: el punto más alto es el de salida») |
| F2.9 | Tiempo de vuelo (llegada a $y=0$) | `0=y_0+(v_0\sin\alpha_0)t_v-\tfrac12gt_v^2\ \Rightarrow\ t_v=\dfrac{v_0\sin\alpha_0+\sqrt{v_0^2\sin^2\alpha_0+2gy_0}}{g}` | U16 | `impacto` |
| F2.10 | Alcance | `R=x(t_v)=(v_0\cos\alpha_0)\,t_v` | U10/U16 | `impacto` |
| F2.11 | Fórmulas del caso simétrico | `h=\dfrac{v_0^2\sin^2\alpha_0}{2g},\quad R=\dfrac{v_0^2\sin2\alpha_0}{g}` | U15 | `impacto` si $y_0=0$ (nota «coincide con F2.10 porque sale y llega a la misma altura»); **`noAplica` si $y_0>0$** con nota «Solo válida si salida y llegada están a la misma altura (U, CUIDADO p. 80)». |
| F2.12 | Ecuación de la trayectoria | `y=y_0+(\tan\alpha_0)\,x-\dfrac{g}{2v_0^2\cos^2\alpha_0}\,x^2` | U11 (3.26, con $y_0$) | cuando «curva teórica» está activa y en pausa; `noAplica` si $\alpha_0=\pm90°$ (nota «tiro vertical: $x=0$ siempre») |

Sustituciones (plantillas; `{…}` = valor formateado según §5.2):
- F2.1: `v_{0x}={v0}\cos{a0}^\circ={v0x}\ \text{m/s},\quad v_{0y}={v0}\sin{a0}^\circ={v0y}\ \text{m/s}`
- F2.2: `x=({v0}\cdot\cos{a0}^\circ)\cdot{t}={x}\ \text{m}`
- F2.3: `y={y0}+({v0}\cdot\sin{a0}^\circ)\cdot{t}-\tfrac12\cdot{g}\cdot{t}^2={y}\ \text{m}`
- F2.4: `v_x={v0x}\ \text{m/s}`
- F2.5: `v_y={v0y}-{g}\cdot{t}={vy}\ \text{m/s}`
- F2.6: `v=\sqrt{({vx})^2+({vy})^2}={v}\ \text{m/s},\ \alpha={ang}^\circ`
- F2.7: `a_y=-{g}\ \text{m/s}^2`
- F2.8: `t_1=\dfrac{{v0y}}{{g}}={t1}\ \text{s},\quad y_{\max}={y0}+\dfrac{({v0y})^2}{2\cdot{g}}={ymax}\ \text{m}`
- F2.9: `t_v=\dfrac{{v0y}+\sqrt{({v0y})^2+2\cdot{g}\cdot{y0}}}{{g}}={tv}\ \text{s}`
- F2.10: `R={v0x}\cdot{tv}={R}\ \text{m}`
- F2.11 (solo $y_0=0$): `R=\dfrac{{v0}^2\sin(2\cdot{a0}^\circ)}{{g}}={R}\ \text{m}`
- F2.12: sin sustitución (se muestra con $\tan\alpha_0$ y el coeficiente numérico: `y={y0}+{tan}\,x-{c}\,x^2`).

En fase `inicio` (antes de lanzar) F2.2-F2.6 muestran la sustitución con `t = 0.00`.

Panel adicional de la pestaña 2 (no forma parte de la lista de fórmulas, va debajo): «Errores típicos» con 3 avisos fijos tipo `.box.warn` (fórmulas de R/h solo con alturas iguales; en el vértice $v_y=0$, no $v=0$; calculadora en DEG).

### 5.5 Pestaña 3 — fórmulas
| id | Título | `texGeneral` | Sustitución | Fuente | Resaltado |
|---|---|---|---|---|---|
| F3.1 | Rapidez en el MCU | `v=\dfrac{2\pi R}{T}` | `v=\dfrac{2\pi\cdot{R}}{{T}}={v}\ \text{m/s}` | U18 (3.28) | uniforme: 1.5 s tras cambiar R o T. No uniforme: `noAplica` (nota «la rapidez cambia; no hay periodo fijo») |
| F3.2 | Aceleración radial | `a_{\text{rad}}=\dfrac{v^2}{R}` | `a_{\text{rad}}=\dfrac{({v})^2}{{R}}={arad}\ \text{m/s}^2` | U17 (3.27) | **por defecto resaltada** en ambos modos (es la clave del tema) |
| F3.3 | Aceleración radial con el periodo | `a_{\text{rad}}=\dfrac{4\pi^2R}{T^2}` | `a_{\text{rad}}=\dfrac{4\pi^2\cdot{R}}{{T}^2}={arad}\ \text{m/s}^2` | U18 (3.29) | uniforme: 1.5 s tras cambiar T. No uniforme: `noAplica` |
| F3.4 | Velocidad angular (adelanto tema 9) | `\omega=\dfrac{2\pi}{T}=\dfrac{v}{R},\qquad v=\omega R` | `\omega=\dfrac{{v}}{{R}}={w}\ \text{rad/s}` | U26/U27 | activa |
| F3.5 | Ángulo recorrido (adelanto tema 9) | `\theta=\dfrac{s}{R}` (rad) | `\theta=\dfrac{{s}}{{R}}={th}\ \text{rad}={thdeg}^\circ` | U25 | activa |
| F3.6 | Aceleración tangencial | `a_{\text{tan}}=\dfrac{d\lvert\vec v\rvert}{dt}` | `a_{\text{tan}}={atan}\ \text{m/s}^2` | U20 (3.30) | uniforme: activa con nota «= 0: la rapidez no cambia». No uniforme: **resaltada** si `aTan ≠ 0` (nota «acelera»/«frena» según signo) |
| F3.7 | Rapidez a lo largo del arco (aceleración tangencial constante) | `v=v_0+a_{\text{tan}}\,t,\quad s=v_0t+\tfrac12a_{\text{tan}}t^2` | `v={v0}+({atan})\cdot{t}={v}\ \text{m/s}` | P (ecs. 2.8 y 2.12 de U aplicadas al arco) | solo no uniforme; activa |
| F3.8 | Módulo de la aceleración total | `a=\sqrt{a_{\text{rad}}^2+a_{\text{tan}}^2}` | `a=\sqrt{({arad})^2+({atan})^2}={a}\ \text{m/s}^2` | U20 | no uniforme; resaltada si «a total» activo |

Evento `detenido` (frenada): F3.7 resaltada con nota «se ha parado en $t$ = {tStop} s: $v=0$, ya no hay $a_{\text{rad}}$ ni $a_{\text{tan}}$».

### 5.6 Pestaña 4 — fórmulas
Barca (en avión se cambian las letras B→P, R→A y los nombres; las fórmulas son las mismas):

| id | Título | `texGeneral` | Sustitución | Fuente | Resaltado |
|---|---|---|---|---|---|
| F4.1 | Suma de velocidades relativas | `\vec v_{B/E}=\vec v_{B/R}+\vec v_{R/E}` | — | U22 (3.35) | durante la animación |
| F4.2 | Por componentes | `v_{B/E,x}=v_{R/E}-v_{B/R}\sin\beta,\quad v_{B/E,y}=v_{B/R}\cos\beta` | `v_{B/E,x}={vRE}-{vBR}\sin{b}^\circ={vx}\ \text{m/s},\ v_{B/E,y}={vBR}\cos{b}^\circ={vy}\ \text{m/s}` | P (3.35 por componentes) | 1.5 s tras cambiar cualquier control |
| F4.3 | Módulo y dirección | `v_{B/E}=\sqrt{v_{B/E,x}^2+v_{B/E,y}^2},\quad\tan\phi=\dfrac{v_{B/E,x}}{v_{B/E,y}}` | valores | U23 | activa |
| F4.4 | Tiempo de cruce y deriva | `t=\dfrac{d}{v_{B/E,y}},\qquad x_{\text{deriva}}=v_{B/E,x}\,t` | valores | P | evento `llegada` |
| F4.5 | Rumbo para cruzar en línea recta | `\sin\beta=\dfrac{v_{R/E}}{v_{B/R}},\quad v_{B/E}=\sqrt{v_{B/R}^2-v_{R/E}^2}` | `\beta=\arcsin\dfrac{{vRE}}{{vBR}}={bR}^\circ` | U24 (mismo triángulo que el Ej. 3.15) | cuando se abre la pregunta del rumbo, y cuando `|vBE_x| < 0.01` (nota «¡cruce recto!»); `noAplica` si `vBR ≤ vRE` (nota «$\sin\beta>1$: imposible; el mejor rumbo es $\sin\beta=v_{B/R}/v_{R/E}$») |
| F4.6 | Invertir el orden | `\vec v_{R/B}=-\vec v_{B/R}` | — | U22 (3.36) | inactiva salvo que se active «ver desde la barca» (opcional, §7.4) |

Avión: F4.1 `\vec v_{P/E}=\vec v_{P/A}+\vec v_{A/E}` (U22, Ej. 3.14); F4.2 por componentes este/norte con rumbos; F4.3 módulo y rumbo sobre el suelo (U23); F4.5 corrección por viento (U24): con viento perpendicular a la derrota, `\sin\beta=v_{A/E}/v_{P/A}`; en el caso general la nota remite a «componente del viento perpendicular a la derrota» (P). F4.4 no aplica (se oculta).

---

## 6. UI, pestañas y bucle — `sim_tema03.js`

### 6.1 Bucle
- Estado global `App = { pestana, porPestana: {1..4: { params, t, reproduciendo, velocidad, opciones, traza, eventos, … }}, paleta, camara }`. Cambiar de pestaña pausa la anterior y conserva su estado.
- `requestAnimationFrame(tick)`: `acum += min(dtReal, 0.1) · velocidad`; mientras `acum ≥ DT` y pasos < 8: `t += DT`, muestrear traza (máx. 2000 puntos; descartar los más antiguos), detectar eventos por cruce (`tPrev < t1 ≤ t` → `vertice`; `t ≥ tv` → `impacto` con `t = tv` y parada). Después, un `render()` y, como mucho cada 100 ms, la actualización del panel de fórmulas y de la lectura en vivo.
- Si no se reproduce y nada cambió, **no** se dibuja (sin rAF activo). Cualquier cambio de control/tema/tamaño pide un redibujado único.
- Controles de reproducción comunes: ▶/⏸ (`aria-pressed`), ⟲ Reiniciar, paso atrás/adelante (±0.05 s, solo en pausa), velocidad `[0.1, 0.25, 0.5, 1]` (por defecto 1; 0.25 con reduced motion), y un slider de tiempo `t` (0…tMax) que sirve de «scrubber» y se mueve solo durante la reproducción.
- `visibilitychange` oculto → pausa.
- Opción «Pausar en el vértice» (P2, por defecto **desactivada**): al cruzar $t_1$ se fija `t = t1` exacto y se pausa.

### 6.2 Contrato con render y fórmulas
La UI construye en cada frame `escena = { pestana, params, estado, precalc (objeto de §3.4/3.5/3.7), opciones, traza, estrobo, fantasmas, diana, fase, evento, escalas: { kV, kA } }` y `contexto` para fórmulas = `{ params, estado, precalc, fase, evento, opciones, ultimoCambio: { control, instante } }`. Render y fórmulas **no** guardan estado ni leen el DOM de controles.

### 6.3 Controles por pestaña (todos `<input type=range>` con `<output>` enlazado y, al lado, `<input type=number>` sincronizado del mismo rango; etiqueta con unidades)

**P1 · Vectores**
| Control | Tipo | Rango / opciones | Defecto |
|---|---|---|---|
| Trayectoria | select | parábola, círculo, Lissajous, espiral, robot (Ej. 3.1) | parábola |
| t | slider | 0 … tMax, paso 0.01 s | 0 |
| Δt | slider **logarítmico** | 0.001 … 2 s (posiciones 0-100 → 10^(−3 + 3.301·p/100)); se muestra con 3 cifras | 1.00 s |
| Mostrar | checkboxes | $\vec r$ (on), $\vec v$ (on), $\vec a$ (on), $a_\parallel/a_\perp$ (off), $\vec v_{\text{med}}$ y cuerda (on), estela (on) | — |
| «Δt → 0» | botón | anima Δt de 2 s a 0.001 s en 3 s reales (log), en pausa | — |

**P2 · Tiro parabólico**
| Control | Tipo | Rango / opciones | Defecto |
|---|---|---|---|
| $v_0$ | slider | 1 … 50 m/s, paso 0.5 | 20 |
| $\alpha_0$ | slider | −90 … 90°, paso 1 | 35 |
| $y_0$ (altura de lanzamiento) | slider | 0 … 50 m, paso 0.5 | 0 |
| $g$ | radio | Tierra 9.80 / Luna 1.62 / Marte 3.71 m/s² | Tierra |
| Lanzar / Pausa / Reiniciar | botones | — | — |
| Mostrar | checkboxes | curva teórica (on), estroboscópica (off), vectores $\vec v$ y componentes (on), $\vec a$ (on), marcadores h/R/t_v (on), fantasmas (on), pausar en el vértice (off) | — |
| Reto | botón «Modo reto» | abre el subpanel de §7.2 | — |

Cambiar cualquier parámetro con el proyectil en vuelo → reinicia a `t = 0` en pausa (la trayectoria anterior pasa a fantasma solo si había llegado al suelo).

Lectura en vivo P2 (`<dl>`): $t$, $x$, $y$, $v_x$, $v_y$, $v$, ángulo de $\vec v$, fase en palabras («subiendo», «en el vértice», «bajando», «en el suelo»); y fija: $t_1$, $y_{\max}$, $t_v$, $R$, $R_{\max}$ (con su ángulo).

**P3 · Circular**
| Control | Tipo | Rango | Defecto |
|---|---|---|---|
| Modo | radio | uniforme / no uniforme | uniforme |
| $R$ | slider | 0.5 … 10 m, paso 0.1 | 5.0 (Ej. 3.12) |
| $T$ (uniforme) | slider | 0.5 … 20 s, paso 0.1 | 4.0 (Ej. 3.12) |
| $v_0$ (no uniforme) | slider | 0 … 20 m/s, paso 0.1 | 2.0 |
| $a_{\text{tan}}$ (no uniforme) | slider | −5 … 5 m/s², paso 0.1 | 0.5 |
| Mostrar | checkboxes | $\vec v$ (on), $\vec a_{\text{rad}}$ (on), $\vec a_{\text{tan}}$ (on), $\vec a$ total (off), radio y ángulo (on), estela (on) | — |

Lectura P3: $t$, $\theta$ (° y rad), vueltas, $v$, $\omega$, $a_{\text{rad}}$, $a_{\text{tan}}$, $a$, $a_{\text{rad}}/g$.

**P4 · Velocidad relativa**
| Control | Tipo | Rango | Defecto |
|---|---|---|---|
| Escenario | radio | barca y río / avión y viento | barca |
| $v_{B/R}$ (barca respecto al agua) | slider | 0.5 … 10 m/s, paso 0.1 | 4.0 |
| $v_{R/E}$ (corriente) | slider | 0 … 8 m/s, paso 0.1 | 2.0 |
| $\beta$ (proa; + aguas arriba) | slider | −90 … 90°, paso 1 | 0 |
| $d$ (anchura) | slider | 10 … 200 m, paso 5 | 60 |
| $v_{P/A}$ (avión respecto al aire) | slider | 50 … 400 km/h, paso 5 | 240 (Ej. 3.14) |
| Viento $v_{A/E}$ | slider | 0 … 200 km/h, paso 5 | 100 (Ej. 3.14) |
| Viento sopla hacia | slider | 0 … 359°, paso 1 | 90 (hacia el este) |
| Rumbo del avión | slider | 0 … 359°, paso 1 | 0 (norte) |
| Pregunta | botón «¿Qué rumbo…?» | §7.3 | — |

En avión, unidades en km/h en UI y fórmulas; tiempo de animación escalado (1 s real = 1 min simulado, indicado en pantalla).

### 6.4 Accesibilidad
- Pestañas con el patrón WAI-ARIA *tabs*: `role=tablist/tab/tabpanel`, `aria-selected`, `aria-controls`, `tabindex` itinerante, ←/→/Inicio/Fin para moverse, activación automática. La pestaña activa se refleja en el hash (`#p2`) para poder recargar en la misma.
- Todos los controles con `<label for>`; sliders con `aria-valuetext` que incluya unidades («35 grados»). Grupos en `<fieldset><legend>`.
- Atajos solo cuando el foco **no** está en un input/select: Espacio = reproducir/pausar, `R` = reiniciar, `,`/`.` = paso atrás/adelante. Se listan en un `<details>` «Atajos de teclado».
- Lienzo: `role="img"` y `aria-label` resumen actualizado al pausar o en eventos (no cada frame), p. ej. «Proyectil en el vértice: x = 13.4 m, y = 6.71 m, v = 16.4 m/s horizontal». Debajo, la lectura en vivo `<dl>` es el equivalente textual completo.
- `#anuncios` (`aria-live="polite"`) solo para eventos: vértice, impacto, cruce completado, resultado del reto. El panel de fórmulas **no** es live region.
- Foco visible (`outline 2px var(--acc)`), objetivos táctiles ≥ 40 px de alto.
- `prefers-reduced-motion: reduce`: nada se anima solo; velocidad por defecto 0.25; «Lanzar» dibuja la trayectoria completa al instante y deja el scrubber en `t = 0` para recorrerla a mano; «Δt → 0» salta en 5 pasos discretos; sin transiciones CSS.
- Contraste: los colores salen de la paleta del proyecto (ya comprobada en claro/oscuro); además cada vector lleva rótulo de texto (no se depende solo del color).

---

## 7. Comportamientos especiales

### 7.1 Vista estroboscópica (P2)
Marcas en los instantes de `estroboscopio()`, círculos huecos de 4 px; con «vectores» activo, cada marca lleva su $\vec v$ a 50 % de escala con $v_x$ (verde) constante y $v_y$ (morado) decreciendo — es la figura 3.17 de U hecha interactiva. Rótulo «Δt = 0.2 s entre marcas».

### 7.2 Modo reto (P2)
Subpanel con dos modos (radio):
1. **Diana**: el reto fija aleatoriamente $v_0$ (10…30 m/s, paso 1), $y_0$ (∈ {0, 0, 0, 5, 10, 20} m), planeta (Tierra 60 %, Luna 20 %, Marte 20 %) y una distancia $D$ = valor aleatorio en [0.3, 0.95]·$R_{\max}$ redondeado a 0.5 m. Los sliders $v_0$, $y_0$, $g$ quedan bloqueados (`disabled`, con texto «fijado por el reto»); el usuario solo elige $\alpha_0$ y pulsa «Disparar». Tolerancia de acierto: $\lvert R - D\rvert \le \max(0.5\ \text{m},\ 0.02D)$. Respuesta: acierto (`.box.ex`) o fallo (`.box.warn`) con «te has pasado/quedado corto por … m». Tras 2 fallos: pista (F2.9-F2.10 resaltadas y el consejo «escribe $R(\alpha_0)=D$»). Tras 3 fallos o con «Ver solución»: los dos ángulos de `angulosParaDiana` (o el único) y, si $y_0=0$, la nota «complementarios: $\alpha$ y $90°-\alpha$ (U Ej. 3.8)».
2. **Predice**: el reto fija $v_0$ (10…30, paso 1), $\alpha_0$ (15…75°, paso 5), $y_0$ y planeta como arriba, y pregunta al azar una de: alcance $R$, altura máxima sobre el suelo $y_{\max}$, tiempo de vuelo $t_v$, rapidez de impacto. El usuario escribe un número (acepta coma o punto decimal) y pulsa «Comprobar»; se llama a `diagnosticar` y se muestra el mensaje del código de error con la fórmula correcta resaltada en el panel; después se lanza el proyectil para verlo.
- Marcador de sesión (aciertos/intentos) en memoria; el último modo elegido se guarda en `localStorage` dentro de `try/catch` (conveniencia, no crítico).
- Semilla: `Math.random` basta; para tests, `crearReto(rng)` acepta un generador inyectable.

### 7.3 Pregunta de rumbo (P4)
Botón «¿Qué rumbo para cruzar en línea recta?» (barca) / «¿Qué rumbo para volar hacia el norte?» (avión; derrota 0°). Abre un campo numérico (grados) + «Comprobar» + «Ver solución». Correcto si `|resp − β*| ≤ 1°`. Si el usuario introduce `arctan(vRE/vBR)` (±1°) → mensaje: «Has usado la tangente: el lado conocido $v_{B/R}$ es la **hipotenusa**, así que es arcsen (U Ej. 3.15).» Si introduce el ángulo con signo contrario → «Ese rumbo es aguas abajo: hay que apuntar contra la corriente». Si `vBR ≤ vRE`: la respuesta esperada es «imposible» (botón «No se puede»), y se muestra el rumbo de mínima deriva. Al acertar o ver la solución, se aplica el rumbo al slider y se anima el cruce.

### 7.4 Opcional (solo si sobra tiempo; no bloquea la aceptación)
«Ver desde la barca» (marco del agua: la orilla se mueve con $-\vec v_{R/E}$, F4.6 resaltada).

---

## 8. Casos límite (comportamiento exigido)
| Caso | Comportamiento |
|---|---|
| P2 $y_0=0$ y $\alpha_0\le0$ | `sinVuelo`: no se anima; aviso «Con $y_0=0$ y $\alpha_0\le0$ el proyectil no despega (t_v = 0)»; R = 0. |
| P2 $\alpha_0=90°$ | $R=0$; trayectoria vertical; F2.12 `noAplica`; cámara con ancho mínimo de 10 m centrado para que se vea algo. |
| P2 $\alpha_0=-90°$, $y_0>0$ | caída vertical lanzada hacia abajo; sin vértice (F2.8 `noAplica`). |
| P2 alcances muy distintos (Luna: R = 232 m; $\alpha_0$ = 89°: R ≈ 1.4 m) | la cámara se reajusta a los límites `[−0.05·W, max(R, D, 1)·1.08] × [0, max(yMax, y0, 1)·1.15]` con escala igual en ambos ejes (si queda muy alargado, se acepta franja vacía arriba). Los fantasmas no fuerzan el encuadre (si no caben, se recortan). |
| P2 diana inalcanzable en «Diana» | no puede ocurrir (D ≤ 0.95 R_max por construcción); `angulosParaDiana` igualmente devuelve `[]` y la UI lo explica. |
| P1 Δt que se sale de tMax | se usa el intervalo hacia atrás (`haciaAtras`), rotulado «Δt hacia atrás». |
| P1 $\lvert\vec v\rvert\approx0$ (Lissajous en extremos no llega a 0; robot y espiral no; pero por seguridad) | `vNula`: F1.6 con nota «sin dirección de referencia: $a_\parallel$ no definida». |
| P3 $v_0=0$, $a_{\text{tan}}\le0$ | `detenido` desde el inicio, nota. |
| P3 frenada hasta pararse | ver §3.5. |
| P3 rapidez > 50 m/s | pausa + aviso. |
| P4 $\beta=\pm90°$ | `tCruce = ∞`: la barca no cruza; se anima 10 s y aviso «la proa apunta paralela a la orilla». |
| P4 $v_{B/R}\le v_{R/E}$ | F4.5 `noAplica`; pregunta espera «imposible». |
| P4 $v_{R/E}=0$ | rumbo recto = 0°; deriva 0. |
| Avión: viento ≥ vPA en contra | `rumboParaDerrota` = `null`, aviso «con ese viento no se puede mantener la derrota». |
| KaTeX no cargado | panel en texto plano (`txt`). |
| `localStorage` bloqueado | todo funciona (try/catch). |
| Pestaña en segundo plano | pausa automática. |

---

## 9. Integración en `index.html` (y nada en el tema 3)

### 9.1 Problema
La tarjeta del tema 3 es `<a class="card" data-u="1" href="temas/tema_03_movimiento_2d_3d.html">…</a>`. Meter otro `<a>` dentro es HTML inválido.

### 9.2 Solución («enlace extendido»)
Sustituir **solo** esa tarjeta por:
```html
<div class="card card--sim" data-u="1">
  <svg class="th" …>(mismo SVG de miniatura, sin cambios)</svg>
  <div class="top"><span class="num">3</span><span class="badge">listo</span></div>
  <b><a class="card-link" href="temas/tema_03_movimiento_2d_3d.html">Movimiento en dos o tres dimensiones</a></b>
  <small>Proyectiles, movimiento circular</small>
  <a class="btn-sim" href="simulaciones/sim_tema03.html"
     aria-label="Simulación interactiva del tema 3: movimiento en dos o tres dimensiones">▶ Simulación</a>
</div>
```
CSS a añadir en el `<style>` de `index.html` (con las variables del índice, sin colores nuevos):
```css
.card{position:relative}                                   /* no cambia nada en las <a class="card"> */
.card-link{color:inherit;text-decoration:none}
.card-link::after{content:"";position:absolute;inset:0;border-radius:12px;z-index:1}  /* toda la tarjeta clicable */
.card--sim:hover{border-color:var(--acc);background:var(--tint);transform:translateY(-2px)}
.card-link:focus-visible{outline:none}
.card-link:focus-visible::after{outline:2px solid var(--acc);outline-offset:2px}
.btn-sim{position:relative;z-index:2;align-self:flex-start;margin-top:10px;min-height:40px;display:inline-flex;align-items:center;gap:6px;
  padding:0 14px;border-radius:99px;border:1px solid var(--acc);color:var(--acc);background:var(--card);font:600 13.5px var(--sans);text-decoration:none}
.btn-sim:hover{background:var(--acc);color:var(--card)}
.btn-sim:focus-visible{outline:2px solid var(--acc);outline-offset:2px}
@media print{.btn-sim{display:none}}
```
Requisitos verificables:
- Clic en cualquier zona de la tarjeta salvo el botón → tema 3; clic en el botón → simulación.
- Teclado: Tab llega primero al enlace del título (anillo de foco alrededor de **toda** la tarjeta) y después al botón (anillo propio). Enter en cada uno navega a su destino.
- Aspecto en reposo y hover idéntico al de las demás tarjetas `listo` (más el botón).
- Progreso: el script usa `.card[data-u]` y `data-p`; el `<div>` conserva `data-u="1"` y no tiene `data-p` → sigue contando como listo («6 de 20 secciones listas» con el índice actual). No tocar el script.
- `temas/tema_03_movimiento_2d_3d.html` **no se modifica**: `grep -ri "simulac\|sim_tema03" temas/` no debe devolver nada.

### 9.3 Otros
- La simulación enlaza de vuelta con «← Volver al índice» (`../index.html`) en la `.topbar`.
- Opcional (decide el coordinador): añadir `simulaciones/` al árbol de ficheros de `CLAUDE.md` §3.
- Publicación según CLAUDE.md §4b (un commit «Tema 3: simulación interactiva», push a `main`). Los tests y esta especificación se suben también.

---

## 10. Pruebas de aceptación numéricas (valores calculados con Python/sympy)

Tolerancia por defecto: relativa 1e-3 en el núcleo (las cifras se dan redondeadas; comparar con al menos 3 cifras significativas). En la UI se comprueba el texto formateado.

### 10.1 Proyectil (`proyectil`, g en m/s²)
| Caso | Entrada | Esperado |
|---|---|---|
| A | v0 = 20, α0 = 35°, y0 = 0, g = 9.80 | v0x = 16.383, v0y = 11.472, t1 = 1.1706 s, yMax = 6.7141 m, tv = 2.3411 s, R = 38.355 m; impacto: v = 20.000, ang = −35.0° |
| A(t) | caso A, t = 1.20 s | x = 19.660, y = 6.7098, vx = 16.383, vy = −0.28847, v = 16.386, ang = −1.009°, aPar = +0.17253, aPerp = 9.7985, fase = `'vertice'` (\|t−t1\| = 0.029 ≤ 0.02·tv = 0.047). Con t = 1.25 → `'bajada'`; t = 1.00 → `'subida'`. Texto F2.2 = `x = (20\cdot\cos 35^\circ)\cdot 1.20 = 19.7\ \text{m}`; F2.3 resultado «6.71 m»; F2.5 resultado «-0.288 m/s» |
| B (U Ej. 3.7) | v0 = 37.0, α0 = 53.1°, y0 = 0, g = 9.80 | t1 = 3.0192 (U: 3.02), yMax = 44.667 (U: 44.7), tv = 6.0384 (U: 6.04), R = 134.15 (U: 134); en t = 2.00: x = 44.431 (U: 44.4), y = 39.577 (U: 39.6), v = 24.358 (U: 24.4), ang = 24.21° (U: 24.2°) |
| C (U Ej. 3.9) | v0 = 10.0, α0 = −20°, y0 = 8.0, g = 9.80 | tieneVertice = false, t1 = 0, yMax = 8.0, tv = 0.97556 (U: 0.98), R = 9.1672 (U: 9.2), v impacto = 16.025, ang = −54.10° |
| D (Luna) | v0 = 20, α0 = 35°, y0 = 0, g = 1.62 | t1 = 7.0812, yMax = 40.616, tv = 14.162, R = 232.02 |
| E (Marte) | idem, g = 3.71 | t1 = 3.0921, yMax = 17.735, tv = 6.1841, R = 101.31 |
| F (vertical) | v0 = 20, α0 = 90°, g = 9.80 | R = 0 (\|R\| < 1e-9), t1 = 2.0408, yMax = 20.408, tv = 4.0816 |
| G/H/I (U Ej. 3.8) | v0 = 20, g = 9.80, α0 = 45°/30°/60° | R(45°) = 40.816 = v0²/g (máximo); R(30°) = R(60°) = 35.348; yMax(30°) = 5.1020, yMax(60°) = 15.306 |
| J (y0 ≠ 0) | v0 = 20, α0 = 35°, y0 = 10, g = 9.80 | t1 = 1.1706, yMax = 16.714, tv = 3.0175, R = 49.435, v impacto = 24.413, ang = −47.85°; `simetrico = false` (F2.11 `noAplica`) |
| K (sin vuelo) | v0 = 20, α0 = 0°, y0 = 0 | `sinVuelo = true`, tv = 0, R = 0 |
| L (U Ej. 3.6, moto) | v0 = 9.0, α0 = 0°, y0 = 20, g = 9.80, t = 0.50 | x = 4.50 (U: 4.5), y − y0 = −1.225 (U: −1.2), vy = −4.90, v = 10.247 (U: 10.2), ang = −28.57° (U: −29°); tv = 2.0203, R = 18.183 |
| Simétrico | caso A | `Rformula` = R y `hFormula` = yMax a 1e-9 |
| Integrador | caso A, `integrarSemiImplicito` dt = 1e-4, t = 1 s | \|x_num − x_an\| < 5e-3 m y \|y_num − y_an\| < 5e-3 m (x_an = 16.383, y_an = 6.5715) |
| Estrobo | caso A (tv = 2.341) | Δt_e = 0.2 s (11 marcas en t = 0, 0.2, …, 2.2 más el impacto dibujado aparte) — primer valor de la lista con 8-20 marcas: 0.05 → 47 (no), 0.1 → 24 (no), 0.2 → 12 (sí) |

### 10.2 Alcance máximo y diana
| Entrada | Esperado |
|---|---|
| `alcanceMaximo` v0 = 20, y0 = 0, g = 9.80 | α* = 45.000°, Rmax = 40.816 |
| `alcanceMaximo` v0 = 20, y0 = 10, g = 9.80 | α* = 39.325°, Rmax = 49.823 (comprobado por barrido numérico) |
| `angulosParaDiana` v0 = 20, y0 = 0, g = 9.80, D = 35 | [29.519°, 60.481°] (complementarios) |
| `angulosParaDiana` v0 = 20, y0 = 10, g = 9.80, D = 45 | [23.356°, 54.116°] |
| `angulosParaDiana` v0 = 20, y0 = 10, g = 9.80, D = 50 | [] (50 > Rmax = 49.82) |

### 10.3 Diagnóstico (`diagnosticar`)
Caso A (y0 = 0, Tierra):
| Pregunta | Respuesta del usuario | Código esperado |
|---|---|---|
| R | 38.4 | correcto |
| R | 31.6 | `RAD` |
| R | 23.4 | `SEN` |
| R | 19.2 | `T1` |
| yMax | 3.74 | `RAD` |
| yMax | 13.7 | `SINCOS` (h con cos² = 13.694) |
| yMax | 13.4 | `DOS` (13.428) |
| yMax | 20.4 | `V0Y` |
| tv | 1.17 | `T1` |
| tv | 3.34 | `SINCOS` |

Caso J (y0 = 10): R = 38.4 → `SIM`; tv = 2.34 → `SIM`; yMax = 6.71 → `SIM`; vImpacto = 20.0 → `VIMP`; vImpacto = 18.1 → `VIMP`; R = 49.4 → correcto.
Caso D (Luna): R = 38.4 → `GT`; R = 232 → correcto.
(Nota de orden: en el caso A, 13.7 y 13.4 distan 2 %; con la tolerancia de 1.5 % cada uno solo encaja con su candidato.)

### 10.4 Pestaña 1
| Entrada | Esperado |
|---|---|
| robot, t = 2.0 | r = (1.0, 2.2) m; v = (−1.0, 1.3), \|v\| = 1.6401, α = 127.57° (U Ej. 3.1: 1.6 m/s, 128°); a = (−0.50, 0.30), \|a\| = 0.58310, ángulo 149.04° (U Ej. 3.2: 0.58 m/s², 149°); aPar = 0.54264, aPerp = 0.21340 (U Ej. 3.3: 0.54 y 0.21) |
| robot `velocidadMedia` t = 0, Δt = 2 | vmed = (−0.50, 1.10) (U Ej. 3.1) |
| robot t = 0, Δt = 1 / 0.1 / 0.01 | (−0.25, 1.025) / (−0.025, 1.00025) / (−0.0025, 1.0000025) → tiende a v(0) = (0, 1.0) |
| robot t = 2, Δt = 1 / 0.1 / 0.01 | (−1.25, 1.475) / (−1.025, 1.31525) / (−1.0025, 1.3015025) → tiende a v(2) = (−1.0, 1.3) |
| parábola, t = 0.5 | r = (2.5, 3.1051), v = (5.0, 3.7603), \|v\| = 6.2562, aPar = −5.8903, aPerp = 7.8323 |
| círculo, t = 1.0 | r = (0, 2.0), v = (−3.1416, 0), \|a\| = 4.9348, aPar = 0 (\|aPar\| < 1e-9), aPerp = 4.9348 |
| Lissajous, t = 0.5 | r = (1.4383, 1.6829), v = (2.6327, 2.1612), a = (−1.4383, −6.7318) |
| espiral, t = 2.0 | r = (−0.62422, 1.3639), v = (−1.5720, −0.16957), a = (−0.28508, −1.7801), aPar = 0.47434, aPerp = 1.7393 |
| `velocidadMedia` con t + Δt > tMax | `haciaAtras = true` |

### 10.5 Pestaña 3
| Entrada | Esperado |
|---|---|
| uniforme R = 5.0, T = 4.0 (U Ej. 3.12) | v = 7.8540 (U: 7.9), ω = 1.5708 rad/s, aRad = 12.337 (U: 12), aRad/g = 1.2589 (U: 1.3g); en t = 1.0 → θ = 90°, pos = (0, 5.0) |
| `aRadDesde` v = 40, R = 170 / `radioDesde` v = 40, aRad = 9.4 (U Ej. 3.11) | 9.4118 / 170.21 (U: 170 m) |
| no uniforme R = 2.0, v0 = 1.0, aTan = 0.5, t = 2.0 | v = 2.0, s = 3.0 m, θ = 1.5 rad = 85.94°, ω = 1.0 rad/s, aRad = 2.0, a = 2.0616 |
| frenada R = 2.0, v0 = 3.0, aTan = −1.0 | tStop = 3.0 s, s = 4.5 m, θ final = 2.25 rad = 128.92°; en t = 5: v = 0, aRad = 0, aTan = 0, `detenido = true` |
| v0 = 0, aTan = −1 | `detenido = true` en t = 0 |

### 10.6 Pestaña 4
| Entrada | Esperado |
|---|---|
| barca vBR = 4.0, vRE = 2.0, β = 0, d = 60 | vBE = (2.0, 4.0), \|vBE\| = 4.4721, desviación 26.565° aguas abajo, tCruce = 15.000 s, deriva = 30.000 m |
| idem β = 20° | vBE = (0.63192, 3.7588), \|vBE\| = 3.8115, tCruce = 15.963 s, deriva = 10.087 m |
| `rumboRecto` vBR = 4.0, vRE = 2.0 | β = 30.000°, vBE = 3.4641, tCruce (d = 60) = 17.321 s, deriva 0 (\|·\| < 1e-9) |
| `rumboRecto` vBR = 2.0, vRE = 3.0 | `null`; `rumboMinimaDeriva` → β = 41.810°, deriva (d = 60) = 67.082 m (frente a 90.000 m con β = 0) |
| avión vPA = 240, rumbo 0°, viento 100 hacia 90° (U Ej. 3.14) | \|vPE\| = 260.00 km/h, rumbo sobre el suelo = 22.620° (U: 23° E de N) |
| `rumboParaDerrota` vPA = 240, vAE = 100 hacia 90°, derrota 0° (U Ej. 3.15) | rumbo = 335.376° (= 24.624° al oeste del norte; U: 25°), vPE = 218.17 km/h (U: 218) |
| pregunta de rumbo barca (4.0, 2.0) respondiendo 26.6 | mensaje «tangente/arcsen» (arctan(2/4) = 26.565°) |
| Velocidades del tren (fig. 3.34 de U, comprobación de `suma`) | (3.0, 0) + (0, 1.0) → 3.1623 m/s a 18.435° (U: 3.2 m/s, 18°) |

### 10.7 Integración y UI (manual o con navegador)
1. `index.html`: la tarjeta 3 lleva a `temas/tema_03_movimiento_2d_3d.html` al hacer clic en la miniatura, el número o el título; el botón «▶ Simulación» lleva a `simulaciones/sim_tema03.html`; el validador HTML no da error de `<a>` anidado; el progreso sigue diciendo «6 de 20 secciones listas».
2. `grep -ri "sim_tema03\|simulaci" temas/` → vacío.
3. La simulación abre offline (`file://`) sin errores en consola; KaTeX renderiza el panel.
4. Claro/oscuro: al pulsar «Claro / oscuro», el lienzo cambia de colores sin recargar.
5. A 330 px de ancho: sin scroll horizontal de página; todos los controles usables.
6. Con `prefers-reduced-motion` emulado: nada se mueve solo.
7. Teclado: se pueden usar las 4 pestañas y todos los controles sin ratón; Espacio reproduce/pausa.
8. Imprimir (vista previa): una página con el lienzo, la lectura y las fórmulas; sin controles.
9. Caso A en la UI: pausar en t = 1.20 (scrubber) → F2.2 muestra «x = (20·cos 35°)·1.20 = 19.7 m», F2.5 resaltada con «v_y = 0»-nota de vértice; al llegar al suelo, F2.9-F2.11 resaltadas, marcador «R = 38.4 m», «t_v = 2.34 s», «h = 6.71 m».
10. Caso J: F2.11 aparece tachada con la nota del CUIDADO de U p. 80.

---

## 11. Reparto del trabajo (tareas independientes)

| # | Tarea | Ficheros (propiedad exclusiva) | Depende de | Entregable / criterio de hecho |
|---|---|---|---|---|
| T1 | **Núcleo físico** | `sim_tema03_fisica.js`, `test/fisica03.test.cjs` | esta spec (§3) | `node --test simulaciones/test/` en verde con todas las filas de §10.1-10.6. Sin DOM. |
| T2 | **Fórmulas** | `sim_tema03_formulas.js`, `test/formulas03.test.cjs` | interfaz de T1 (puede mockearla con los números de §10) | `construir()` devuelve las listas de §5.3-5.6 con estados correctos para las fases de los casos A, C, J, K; test del texto de F2.2 (§5.2); `Panel` renderiza con KaTeX y respeta el throttle. |
| T3 | **Render canvas** | `sim_tema03_render.js` | contrato `escena` (§6.2) | Página de prueba temporal (no se publica) que dibuja una escena fija por pestaña en claro y oscuro; rótulos sin recortes a 330 px; flechas con punta fija. |
| T4 | **UI, pestañas y bucle** | `sim_tema03.html`, `sim_tema03.css`, `sim_tema03.js` | T1-T3 | Pruebas §10.7 puntos 3-10; casos límite de §8. |
| T5 | **Integración** | `index.html` (solo la tarjeta 3 y el CSS de §9.2); opcional `CLAUDE.md` | T4 terminada (para no publicar un enlace roto) | §10.7 puntos 1-2; commit y push según CLAUDE.md §4b. |
| T6 | **Revisión** (solo lectura) | — | T5 | Rigor físico y de citas (cada `data-ref` del panel existe en §1), accesibilidad, claro/oscuro, móvil. Lista priorizada de correcciones. |

T1, T2 y T3 pueden ir en paralelo (T2 y T3 contra las interfaces de esta spec). T4 integra. Cualquier cambio de interfaz lo aprueba el coordinador y se refleja en este documento antes de implementarlo.
