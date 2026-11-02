# Soluciones Tema 16 — Sonido y oído

Material para el redactor del tema 16. Todos los números se han comprobado con sympy (script propio, un bloque por ejercicio; resultados en la tabla final). Los enunciados se han tomado de U (`sears.txt`, págs. impresas 537–542, PDF 565–570) y las soluciones de `solman.txt` (la página 16-N del solucionario está en el PDF 535+N). En las páginas 16-1, 16-2, 16-4, 16-6, 16-8, 16-9, 16-10 y 16-11 las etiquetas «16.N.» del texto extraído están corridas respecto al bloque de solución; cada problema se ha asignado **por contenido** comparándolo con el enunciado de U (abajo se cita la página donde está realmente su desarrollo). Las ecuaciones con radicales se han comprobado sobre la imagen del PDF de U: (16.7) $v=\sqrt{B/\rho}$ y (16.8) $v=\sqrt{Y/\rho}$ (ambas p. 511), (16.10) $v=\sqrt{\gamma RT/M}$ (p. 513), (16.12) $I=\tfrac12\sqrt{\rho B}\,\omega^2A^2$ y (16.14) $I=\dfrac{p_{máx}^2}{2\rho v}=\dfrac{p_{máx}^2}{2\sqrt{\rho B}}$ (ambas p. 514), (16.30) $f_R=\sqrt{\dfrac{c-v}{c+v}}\,f_S$ (p. 532). Los problemas E están traducidos y ampliados, no copiados.

Convenciones (las de U): salvo indicación, rapidez del sonido en el aire $v=344$ m/s (U p. 538, cabecera de los ejercicios); aire a 20 °C: $B=1{,}42\times10^5$ Pa (ejemplo 16.1), $\rho=1{,}20$ kg/m³ (ejemplo 16.5); $I_0=10^{-12}$ W/m². Subíndices: $S$ = fuente (*source*), $L$ = receptor (*listener*). **Convenio de signos Doppler de U:** el sentido positivo es el que va **del receptor a la fuente** ($L\to S$), para $v_L$ y para $v_S$; $v$ (sonido) siempre positiva; todas las velocidades se miden **respecto al aire**. «U p. NN» = página impresa del Sears-Zemansky.

## Herramientas de teoría que se usan

| Herramienta | Dónde |
|---|---|
| Onda sonora longitudinal; $y=A\cos(kx-\omega t)$ (16.1); fluctuación de presión $p=-B\,\partial y/\partial x$ (16.3); **amplitud de presión $p_{máx}=BkA$** (16.5), $k=2\pi/\lambda=2\pi f/v$ | U §16.1 pp. 506–508 |
| Rapidez del sonido: fluido $v=\sqrt{B/\rho}$ (16.7); varilla sólida $v=\sqrt{Y/\rho}$ (16.8); tabla 16.1 (agua 20 °C: 1482 m/s; helio 20 °C: 999 m/s) | U §16.2 p. 511 |
| Gas ideal $v=\sqrt{\gamma RT/M}$ (16.10), $T$ en kelvin, $R=8{,}314$ J/(mol·K); aire $\gamma=1{,}40$, $M=28{,}8\times10^{-3}$ kg/mol (ejemplo 16.4) | U §16.2 p. 513 |
| Intensidad $I=\tfrac12\sqrt{\rho B}\,\omega^2A^2$ (16.12); $I=\dfrac{p_{máx}^2}{2\rho v}$ (16.14) | U §16.3 p. 514 |
| Fuente puntual: $I=P/4\pi r^2$, ley del inverso del cuadrado $I_1/I_2=r_2^2/r_1^2$ (15.26) | U §15.5 p. 484; §16.3 p. 515 |
| **Nivel de intensidad** $\beta=(10\ \text{dB})\log(I/I_0)$ (16.15); diferencia de niveles $\beta_2-\beta_1=(10\ \text{dB})\log(I_2/I_1)$ (ejemplo 16.9) | U §16.3 pp. 516–518 |
| **Tubo abierto**: $f_1=v/2L$ (16.16), $\lambda_n=2L/n$, $f_n=nf_1$, $n=1,2,3,\dots$ (16.17–16.19). Extremo abierto = antinodo de desplazamiento (nodo de presión) | U §16.4 p. 520 |
| **Tubo cerrado**: $f_1=v/4L$ (16.20), $\lambda_n=4L/n$, $f_n=nf_1$, **solo $n$ impar** (16.21–16.23). Extremo cerrado = nodo de desplazamiento | U §16.4 p. 521 |
| Resonancia: un sistema responde con gran amplitud si se le excita a una de sus frecuencias de modo normal | U §16.5 pp. 522–524 |
| Cuerda fija en ambos extremos $f_n=n\,v/2L$, $v=\sqrt{F/\mu}$ (15.14, 15.33, 15.35) | U §15.4 p. 480; §15.8 pp. 491–493 |
| **Interferencia** de dos fuentes en fase: constructiva si la diferencia de trayectorias es $0,\lambda,2\lambda,\dots$; destructiva si es $\lambda/2,\,3\lambda/2,\dots$ | U §16.6 pp. 524–525 |
| **Pulsos** $f_{pulso}=f_a-f_b$ (16.24) | U §16.7 p. 527 |
| **Doppler**: receptor móvil $f_L=\dfrac{v+v_L}{\lambda}$ (16.25), $f_L=(1+v_L/v)f_S$ (16.26); fuente móvil $\lambda_{enfrente}=\dfrac{v-v_S}{f_S}$ (16.27), $\lambda_{atrás}=\dfrac{v+v_S}{f_S}$ (16.28); **general $f_L=\dfrac{v+v_L}{v+v_S}f_S$** (16.29); Estrategia 16.2 (reflexión en dos pasos); Doppler doble (ejemplo 16.18) | U §16.8 pp. 528–532 |
| Doppler de la luz (16.30) | U §16.8 p. 532 |
| **Onda de choque** $\sin\alpha=v/v_S$ (16.31); número Mach $v_S/v$; ejemplo 16.19 | U §16.9 pp. 533–535 |
| $d=vt$ a rapidez constante; energía cinética $K=\tfrac12mv^2$ | U §2.1; §6.2 |

---

## PARTE A — Exámenes (X)

**Qué ha caído del tema 16: nada.** En las convocatorias disponibles (2018–2025) **no hay ningún problema ni ninguna pregunta de teoría** sobre sonido, tubos sonoros, decibelios o efecto Doppler (`examenes_por_tema.md`: «Tema 16 — Ningún ejercicio de examen encontrado»; comprobado también con una búsqueda de «Doppler», «sonido», «decibel» y «tubo» en `fuentes_txt/examenes/*.txt`, sin resultados). En el HTML hay que decirlo así, sin simular ningún ejercicio de examen.

Como el examen tiene una pregunta de teoría (4 puntos, con dos cuestiones cortas), se añade abajo una **pregunta de teoría propia** con su desarrollo modelo y dos **cuestiones cortas propias** del estilo de las que acompañan a la teoría. **No son de examen**: van marcadas «propia» y con fuente `P`.

### Pregunta de teoría PROPIA (estilo examen; NO es de examen): «Efecto Doppler para el sonido»

Extensión orientativa: una cara. Lo que **no** puede faltar, en negrita.

1. **Fenómeno** (U p. 528). Cuando la fuente y/o el receptor se mueven **respecto al medio** (aire), la frecuencia que oye el receptor $f_L$ **es distinta** de la que emite la fuente $f_S$: más aguda al acercarse, más grave al alejarse (la sirena que pasa).
2. **Convenio** (U p. 528). Movimientos a lo largo de la recta fuente–receptor. **Sentido positivo: del receptor $L$ a la fuente $S$**, para $v_L$ y $v_S$. $v$ = rapidez del sonido respecto al aire, siempre positiva. Las velocidades se miden respecto al aire.
3. **Receptor móvil, fuente en reposo** (U p. 528, fig. 16.27). La fuente en reposo produce crestas separadas $\lambda=v/f_S$. Si el receptor va hacia la fuente con $v_L$, las crestas le llegan con rapidez relativa $v+v_L$; la frecuencia con que las recibe es (rapidez relativa)/(separación):
$$f_L=\frac{v+v_L}{\lambda}=\frac{v+v_L}{v/f_S}\ \Rightarrow\ \boxed{f_L=\Big(1+\frac{v_L}{v}\Big)f_S}\qquad(16.25),(16.26)$$
Si se aleja, $v_L<0$ y $f_L<f_S$. **Aquí $\lambda$ no cambia**: cambia la rapidez con que el receptor «barre» las crestas.
4. **Fuente móvil: cambia la longitud de onda** (U p. 529, fig. 16.28). En un periodo $T_S=1/f_S$ la cresta recién emitida avanza $vT_S$ y la fuente avanza $v_ST_S$ detrás de ella. Delante de la fuente las crestas quedan separadas $vT_S-|v_S|T_S$ y detrás $vT_S+|v_S|T_S$:
$$\lambda_{enfrente}=\frac{v-v_S}{f_S}\ (16.27),\qquad \lambda_{atrás}=\frac{v+v_S}{f_S}\ (16.28)$$
(en estas dos fórmulas $v_S$ es la rapidez de la fuente). **La rapidez de la onda sigue siendo $v$**: la fija el medio, no la fuente.
5. **Caso general** (U p. 529). Con el convenio de signos, el receptor que queda «detrás» de una fuente que se aleja ($v_S>0$) ve $\lambda=(v+v_S)/f_S$, y la misma expresión vale para una fuente que se acerca ($v_S<0$ da $\lambda_{enfrente}$). Sustituyendo en (16.25):
$$\boxed{f_L=\frac{v+v_L}{v+v_S}\,f_S}\qquad(16.29)$$
(comprobado con sympy). **Comprobaciones**: $v_L=v_S=0\Rightarrow f_L=f_S$; si $v_L=v_S$ (mismo movimiento respecto al aire, p. ej. ambos quietos con viento) no hay efecto (U p. 530).
6. **No es simétrico** (U p. 530 y problema 16.48). El resultado no depende solo de la velocidad relativa, porque el medio es una referencia física: fuente acercándose a $v/2$ ⇒ $f_L=2f_S$; receptor acercándose a $v/2$ ⇒ $f_L=1{,}5f_S$.
7. **Reflexión** (Estrategia 16.2, U p. 530; ejemplo 16.18, p. 532). En dos pasos: (1) el obstáculo es el **receptor** y recibe $f'$; (2) el obstáculo es una **fuente** que emite $f'$ y el receptor final oye $f$. Así funcionan el radar acústico, el sonar y la ecografía Doppler.
8. **Luz** (U p. 532). Sin medio: solo importa la velocidad relativa $v$ (positiva si se alejan): $f_R=\sqrt{\dfrac{c-v}{c+v}}\,f_S$ (16.30). Corrimiento al rojo si se alejan.
9. **Límite $|v_S|\to v$ y onda de choque** (U pp. 533–534). Si la fuente se acerca con $|v_S|\to v$, $\lambda_{enfrente}\to0$ y (16.29) diverge: las crestas se amontonan («barrera del sonido»). Si $v_S>v$, las crestas forman un cono de semiángulo $\sin\alpha=v/v_S$ (16.31); $v_S/v$ = número Mach.
10. **Figuras obligatorias:** (a) receptor que avanza hacia crestas equiespaciadas (con $v$ y $v_L$, eje $+$ de $L$ a $S$); (b) crestas circulares de una fuente móvil, apretadas delante y separadas detrás, con $\lambda_{enfrente}$ y $\lambda_{atrás}$. **Fórmulas para la cuartilla:** (16.25)–(16.29) y el convenio de signos.

**Receta.** Pregunta de teoría de Doppler: «convenio de signos → receptor móvil (cambia la rapidez relativa, no $\lambda$) → fuente móvil (cambia $\lambda$, no $v$) → combinar en (16.29) → comprobaciones y límites (reflexión, luz, Mach)».

**Error típico.** (1) Decir que la fuente móvil cambia la rapidez del sonido. (2) Usar el signo «natural» (acercarse = +) en lugar del convenio $L\to S$, lo que invierte el resultado. (3) Creer que solo cuenta la velocidad relativa (eso solo vale para la luz). (4) En una reflexión, aplicar la fórmula una sola vez.

### Cuestiones cortas PROPIAS (estilo examen; NO son de examen)

**C1 (propia).** Un tubo de órgano de 0,500 m de longitud contiene aire a 20 °C ($v=344$ m/s). a) ¿Cuál es su frecuencia fundamental si está abierto en ambos extremos? ¿Y si se tapa un extremo? b) Si el tubo abierto se llena de helio a 20 °C (rapidez del sonido 999 m/s, tabla 16.1), ¿qué les pasa a la longitud de onda y a la frecuencia del modo fundamental?

*Respuesta.* a) Abierto: antinodo de desplazamiento en cada extremo ⇒ $L=\lambda_1/2$, $f_1=v/2L=344/1{,}00=$ **344 Hz** (16.16). Cerrado: nodo en el extremo tapado y antinodo en el abierto ⇒ $L=\lambda_1/4$, $f_1=v/4L=$ **172 Hz** (16.20): una octava más grave. b) $\lambda_1=2L=1{,}00$ m **no cambia** (solo depende de la geometría y de las condiciones en los extremos); $v$ pasa de 344 a 999 m/s, así que $f_1=v/\lambda_1$ sube a **999 Hz** (factor 2,90). Por eso la voz con helio suena aguda (U p. 544, Evalúe 16.4).

**C2 (propia).** En un punto llega el sonido de una máquina con un nivel de 60 dB. Se pone en marcha una segunda máquina idéntica, independiente, que produce allí también 60 dB. ¿Cuál es el nivel total? ¿Por qué no 120 dB?

*Respuesta.* Para fuentes independientes (no coherentes) se **suman intensidades**, no decibelios. Cada una: $I=I_0\,10^{6}=10^{-6}$ W/m² (16.15). Total $2\times10^{-6}$ W/m² ⇒ $\beta=(10\ \text{dB})\log(2\times10^{6})=$ **63,0 dB**. Equivalentemente, duplicar $I$ suma $(10\ \text{dB})\log2=3{,}0$ dB (U p. 544, Evalúe 16.3). 120 dB correspondería a multiplicar la intensidad por $10^6$.

**Receta (C1–C2).** Tubos: dibuja nodos/antinodos en los extremos → $\lambda_n$ (solo geometría) → $f_n=v/\lambda_n$ (aquí entra el gas). Decibelios: pasa a intensidades, opera (suma, inverso del cuadrado) y vuelve a dB.

---

## PARTE B — Problemas del solucionario (E) y problema práctico de U

Orden: el del libro, que coincide con el del temario y con dificultad creciente dentro de cada sección (§16.1 amplitudes → §16.2 rapidez → §16.3 decibelios → §16.4–16.5 tubos → §16.6–16.7 interferencia y pulsos → §16.8 Doppler → §16.9 ondas de choque → problemas). Al final, el problema práctico de U (el más completo).

### E1. Problema 16.1 (U p. 538; Solucionario 16-1) — amplitud de presión y de desplazamiento

**Enunciado (de U).** El ejemplo 16.1 mostró que, para ondas sonoras en el aire con frecuencia de 1000 Hz, una amplitud de desplazamiento de $1{,}2\times10^{-8}$ m produce una amplitud de presión de $3{,}0\times10^{-2}$ Pa. a) ¿Qué longitud de onda tienen esas ondas? b) Para ondas de 1000 Hz en aire, ¿qué amplitud de desplazamiento se requeriría para que la amplitud de presión esté en el umbral de dolor, que es de 30 Pa? c) ¿Qué longitud de onda y frecuencia deben tener ondas con amplitud de desplazamiento de $1{,}2\times10^{-8}$ m para producir una amplitud de presión de $1{,}5\times10^{-3}$ Pa?

**Solución.**
1. **Idea.** Una onda sonora se puede describir por el desplazamiento de las moléculas (amplitud $A$) o por la fluctuación de presión (amplitud $p_{máx}$). Están ligadas por **$p_{máx}=BkA$** (16.5, U p. 507), con $k=2\pi/\lambda$: la presión es grande cuando el desplazamiento cambia mucho de un punto a otro (compresiones), y eso ocurre más cuanto más corta es $\lambda$.
2. **a)** $\lambda=v/f=344/1000=$ **0,344 m** (15.1).
3. **b)** Misma frecuencia y mismo medio ⇒ $B$ y $k$ iguales ⇒ $p_{máx}\propto A$:
$$A_2=A_1\frac{p_{máx,2}}{p_{máx,1}}=(1{,}2\times10^{-8})\frac{30}{3{,}0\times10^{-2}}=\mathbf{1{,}2\times10^{-5}\ m}.$$
Aun en el umbral de dolor, las moléculas se desplazan solo ~0,01 mm.
4. **c)** Ahora $A$ fija: $p_{máx}=B\,(2\pi/\lambda)A$ ⇒ $p_{máx}\lambda=2\pi BA=$ constante ⇒
$$\lambda_2=\lambda_1\frac{p_{máx,1}}{p_{máx,2}}=0{,}344\cdot\frac{3{,}0\times10^{-2}}{1{,}5\times10^{-3}}=\mathbf{6{,}9\ m},\qquad f_2=\frac{v}{\lambda_2}=\frac{344}{6{,}88}=\mathbf{50\ Hz}.$$
5. **Comprobación.** Presión 20 veces menor con la misma $A$ ⇒ $k$ 20 veces menor ⇒ $f$ 20 veces menor: $1000/20=50$ Hz ✓.

**Receta.** Relaciona $p_{máx}$ y $A$ con $p_{máx}=BkA=2\pi fBA/v$ y razona por proporciones con lo que se mantiene constante.
**Error típico.** Pensar que la misma amplitud de desplazamiento da la misma presión a cualquier frecuencia.
Teoría: U §16.1 p. 507 (16.5); ejemplo 16.1 p. 508.

---

### E2. Problema 16.3 (U p. 538; Solucionario 16-1) — ¿cuándo duele un sonido?

**Enunciado (de U).** Considere una onda sonora en el aire con amplitud de desplazamiento de 0,0200 mm. Calcule la amplitud de presión para frecuencias de a) 150 Hz; b) 1500 Hz; c) 15 000 Hz. En cada caso, compare el resultado con el umbral de dolor, que es de 30 Pa.

**Solución.**
1. **Datos del medio.** Aire: $B=1{,}42\times10^5$ Pa (ejemplo 16.1), $v=344$ m/s.
2. **a)** $k=2\pi f/v=2\pi(150)/344=2{,}74$ rad/m ⇒ $p_{máx}=BkA=(1{,}42\times10^5)(2{,}74)(2{,}00\times10^{-5})=$ **7,78 Pa**, por debajo de 30 Pa.
3. **b)** $f\times10$ ⇒ $k\times10$ ⇒ $p_{máx}\times10$: **77,8 Pa**, por encima del umbral de dolor.
4. **c)** Otra vez ×10: **778 Pa**, muy por encima (es ultrasonido apenas audible, pero la presión sería enorme).

**Receta.** Con $A$ fija, $p_{máx}\propto f$.
**Error típico.** Usar $k=f/v$ (falta el $2\pi$) o la $A$ en mm sin pasar a metros.
Teoría: U §16.1 p. 507 (16.5).

---

### E3. Problema 16.6 (U p. 538; Solucionario 16-2) — módulo volumétrico y módulo de Young a partir de la rapidez

**Enunciado (de U).** a) En un líquido con densidad de 1300 kg/m³, se determina que ondas longitudinales con frecuencia de 400 Hz tienen una longitud de onda de 8,00 m. Calcule el módulo volumétrico del líquido. b) Una barra metálica de 1,50 m de longitud tiene una densidad de 6400 kg/m³. Las ondas sonoras longitudinales tardan $3{,}90\times10^{-4}$ s en llegar de un extremo de la barra al otro. Calcule el módulo de Young del metal.

**Solución.**
1. **Idea.** La rapidez de una onda mecánica es $\sqrt{\text{(propiedad elástica)}/\text{(propiedad inercial)}}$. En un fluido la elástica es el módulo volumétrico, **$v=\sqrt{B/\rho}$** (16.7); en una varilla sólida delgada, el módulo de Young, **$v=\sqrt{Y/\rho}$** (16.8) (U p. 511). Medida $v$, se despeja el módulo.
2. **a)** $v=\lambda f=(8{,}00)(400)=3200$ m/s ⇒ $B=\rho v^2=(1300)(3200)^2=$ **1,33 × 10¹⁰ Pa**.
3. **b)** $v=L/t=1{,}50/3{,}90\times10^{-4}=3846$ m/s ⇒ $Y=\rho v^2=(6400)(3846)^2=$ **9,47 × 10¹⁰ Pa**.
4. **Evaluación.** Ambas rapideces son unas 10 veces la del aire; los órdenes de magnitud ($10^{10}$–$10^{11}$ Pa) son los de las tablas 11.1 de U.

**Receta.** $v$ (de $\lambda f$ o de $L/t$) → módulo $=\rho v^2$.
**Error típico.** Usar (16.7) en la barra: en una varilla manda $Y$, no $B$.
Teoría: U §16.2 p. 511 (16.7), (16.8).

---

### E4. Problema 16.7 (U p. 539, fig. E16.7; Solucionario 16-2) — el buzo y la sirena

**Enunciado (de U).** Un buzo bajo la superficie de un lago escucha el sonido de la sirena de un bote en la superficie directamente arriba de él; al mismo tiempo, un amigo que se encuentra en tierra firme a 22,0 m del bote también lo escucha (figura E16.7). La sirena está 1,2 m arriba de la superficie del agua. ¿A qué distancia (marcada con «?») de la sirena está el buzo? Tanto el aire como el agua están a 20 °C.

**Solución.**
1. **Idea.** Ambos oyen el sonido **en el mismo instante**: los tiempos de viaje son iguales. A rapidez constante $t=d/v$.
2. **Datos.** Aire $v_{aire}=344$ m/s; agua a 20 °C $v_{agua}=1482$ m/s (tabla 16.1, U p. 511). Se toma 22,0 m como camino en el aire hasta el amigo (la sirena está solo 1,2 m por encima; $\sqrt{22{,}0^2+1{,}2^2}=22{,}03$ m, diferencia despreciable).
3. **Tiempo hasta el amigo:** $t=22{,}0/344=0{,}0640$ s.
4. **Tiempo hasta el buzo:** 1,2 m en aire + profundidad $h$ en agua:
$$\frac{1{,}2}{344}+\frac{h}{1482}=\frac{22{,}0}{344}\ \Rightarrow\ h=(22{,}0-1{,}2)\frac{1482}{344}=\mathbf{89{,}6\ m}.$$
5. **Distancia sirena–buzo** $=1{,}2+89{,}6=$ **90,8 m**.
6. **Comprobación.** $1{,}2/344+89{,}6/1482=0{,}0035+0{,}0605=0{,}0640$ s ✓. En el mismo tiempo el sonido recorre en el agua unas 4,3 veces más distancia.

**Receta.** «Llegan a la vez» ⇒ igualar $\sum d_i/v_i$ de cada camino.
**Error típico.** Olvidar el tramo de 1,2 m en el aire o usar la misma $v$ en ambos medios.
Teoría: U §16.2 p. 511 (tabla 16.1).

---

### E5. Problema 16.8 (U p. 539; Solucionario 16-3) — rapidez del sonido en H₂, He y Ar

**Enunciado (de U).** A 27 °C, ¿qué rapidez tienen las ondas longitudinales en a) hidrógeno (masa molar 2,02 g/mol); b) helio (masa molar 4,00 g/mol); y c) argón (masa molar 39,9 g/mol)? Tome los valores de $\gamma$ de la tabla 19.1. d) Compare sus respuestas de los incisos a), b) y c) con la rapidez en el aire a la misma temperatura.

**Solución.**
1. **Idea.** En un gas ideal **$v=\sqrt{\gamma RT/M}$** (16.10, U p. 513): crece con $T$ (moléculas más rápidas) y decrece con la masa molar (más inercia). **$T$ en kelvin, $M$ en kg/mol.**
2. **Datos.** $T=27+273{,}15=300{,}15$ K; $R=8{,}3145$ J/(mol·K). Tabla 19.1 (U p. 632): H₂ $\gamma=1{,}41$; He y Ar (monoatómicos) $\gamma=1{,}67$; aire $\gamma=1{,}40$, $M=28{,}8\times10^{-3}$ kg/mol (ejemplo 16.4).
3. **a)** $v_{H_2}=\sqrt{(1{,}41)(8{,}3145)(300{,}15)/(2{,}02\times10^{-3})}=$ **1,32 × 10³ m/s**.
4. **b)** $v_{He}=\sqrt{(1{,}67)(8{,}3145)(300{,}15)/(4{,}00\times10^{-3})}=$ **1,02 × 10³ m/s**.
5. **c)** $v_{Ar}=\sqrt{(1{,}67)(8{,}3145)(300{,}15)/(39{,}9\times10^{-3})}=$ **323 m/s**.
6. **d)** Aire a 300,15 K: $v=348$ m/s. Cocientes: $v_{H_2}=3{,}79\,v_{aire}$, $v_{He}=2{,}93\,v_{aire}$, $v_{Ar}=0{,}928\,v_{aire}$.

**Receta.** $v=\sqrt{\gamma RT/M}$ con $T$ en K y $M$ en kg/mol; para comparar gases a igual $T$, $v\propto\sqrt{\gamma/M}$.
**Error típico.** Poner $T$ en °C o $M$ en g/mol (error de factor $\sqrt{1000}\approx32$).
Teoría: U §16.2 p. 513 (16.10); tabla 19.1 p. 632.

---

### E6. Problema 16.14 (U p. 539; Solucionario 16-4) — ¿cuánto es «+13 dB»?

**Enunciado (de U).** a) ¿En qué factor se debe incrementar la intensidad del sonido para elevar el nivel de intensidad del sonido en 13,0 dB? b) Explique por qué usted no necesita conocer la intensidad original de sonido.

**Solución.**
1. **Idea.** El oído responde de forma aproximadamente logarítmica; por eso se usa $\beta=(10\ \text{dB})\log(I/I_0)$ (16.15, U p. 516).
2. Restando los niveles de dos sonidos (ejemplo 16.9, U p. 517): $\beta_2-\beta_1=(10\ \text{dB})[\log(I_2/I_0)-\log(I_1/I_0)]=(10\ \text{dB})\log(I_2/I_1)$.
3. **a)** $13{,}0=10\log(I_2/I_1)$ ⇒ $I_2/I_1=10^{1{,}30}=$ **20,0**.
4. **b)** La diferencia de niveles depende solo del **cociente** de intensidades ($I_0$ se cancela), no de su valor.

**Receta.** $\Delta\beta\ (\text{dB})=10\log(I_2/I_1)$ ⇔ $I_2/I_1=10^{\Delta\beta/10}$. Útiles de memoria: ×2 ↔ +3 dB; ×10 ↔ +10 dB.
**Error típico.** Pensar que +13 dB es multiplicar por 13 o por 1,3.
Teoría: U §16.3 pp. 516–517 (16.15), ejemplo 16.9.

---

### E7. Problema 16.15 (U p. 539; Solucionario 16-4) — escuchar a escondidas

**Enunciado (de U).** Usted intenta oír una conversación interesante, pero se encuentra a una distancia de 15,0 m y la escucha como un murmullo promedio de 20,0 dB. ¿Qué tan cerca de los parlantes debería colocarse para que el nivel sonoro fuera de 60,0 dB?

**Solución.**
1. **Modelo.** Los que hablan se tratan como una fuente puntual que emite igual en todas direcciones ⇒ ley del inverso del cuadrado $I_2/I_1=r_1^2/r_2^2$ (15.26, U p. 484).
2. **De dB a cociente de intensidades** (ejemplo 16.9): $\Delta\beta=+40{,}0$ dB ⇒ $I_2/I_1=10^{4{,}00}$.
3. **De intensidades a distancias:** $r_2=r_1\sqrt{I_1/I_2}=15{,}0\cdot10^{-2}=$ **0,150 m = 15,0 cm**.
4. **Atajo.** Combinando: $\Delta\beta=(20\ \text{dB})\log(r_1/r_2)$: 40 dB ⇒ $r_1/r_2=100$ ✓.

**Receta.** dB → cociente de $I$ → inverso del cuadrado → cociente de $r$. (Cada factor 10 en la distancia son 20 dB.)
**Error típico.** Suponer $\beta\propto1/r^2$ (el nivel en dB **no** cumple el inverso del cuadrado; la intensidad sí).
Teoría: U §16.3 pp. 515–518; §15.5 p. 484.

---

### E8. Problema 16.20 (U p. 539; Solucionario 16-6) — cuatrillizos llorando

**Enunciado (de U).** La intensidad debida a varias fuentes de sonido independientes es la suma de las intensidades individuales. a) Cuando unos cuatrillizos lloran simultáneamente, ¿por cuántos decibeles es mayor el nivel de intensidad de sonido en comparación con el caso en que llora uno solo? b) Para aumentar el nivel de intensidad de sonido, otra vez en el mismo número de decibeles que en a), ¿cuántos bebés más necesitan llorar?

**Solución.**
1. **a)** Cuatro fuentes iguales e independientes ⇒ $I_2=4I_1$ ⇒ $\Delta\beta=10\log4=$ **6,0 dB** (ejemplo 16.9).
2. **b)** Otros +6,0 dB exigen multiplicar de nuevo la intensidad por 4: hacen falta $4\times4=16$ bebés, es decir **12 bebés más**.

**Receta.** $N$ fuentes iguales e independientes: $\Delta\beta=10\log N$.
**Error típico.** Contestar «4 bebés más» (sumar en lugar de multiplicar la intensidad).
Teoría: U §16.3 pp. 516–518.

---

### E9. Problema 16.26 (U p. 539; Solucionario 16-7 y 16-8) — tubo abierto que se tapa

**Enunciado (de U).** La frecuencia fundamental de un tubo abierto en ambos extremos es de 524 Hz. a) ¿Qué longitud tiene ese tubo? Si se tapa uno de los extremos del tubo, calcule b) la longitud de onda y c) la frecuencia de la nueva fundamental.

**Solución.**
1. **Condiciones en los extremos** (U pp. 520–521). Un extremo **abierto** está a presión atmosférica: es nodo de presión = **antinodo de desplazamiento**. Un extremo **cerrado** impide el movimiento del aire: **nodo de desplazamiento**.
2. **a)** Abierto–abierto: entre dos antinodos contiguos hay $\lambda/2$ ⇒ fundamental $L=\lambda_1/2$, $f_1=v/2L$ (16.16) ⇒ $L=v/2f_1=344/1048=$ **0,328 m**.
3. **b)** Cerrado–abierto: de nodo a antinodo hay $\lambda/4$ ⇒ $L=\lambda_1/4$ ⇒ $\lambda_1=4L=$ **1,31 m**.
4. **c)** $f_1=v/\lambda_1=v/4L=\tfrac12(524)=$ **262 Hz** (16.20): una octava más grave.

**Receta.** Dibuja nodos (N) en extremos cerrados y antinodos (A) en abiertos; cuenta cuartos de onda: abierto $L=n\lambda/2$, cerrado $L=n\lambda/4$ ($n$ impar).
**Error típico.** Poner nodo de desplazamiento en el extremo abierto (es nodo de **presión**).
Teoría: U §16.4 pp. 520–521 (16.16), (16.20).

---

### E10. Problema 16.29 (U p. 540; Solucionario 16-8) — el tubo más grande del órgano

**Enunciado (de U).** En órganos de tubo de tamaño mediano, el tubo más grande mide 4,88 m (16 ft). ¿Cuál es la frecuencia de la nota que corresponde al modo fundamental si el tubo está a) abierto en ambos extremos, b) abierto en un extremo y cerrado en el otro?

**Solución.**
1. **a)** $f_1=v/2L=344/(2\cdot4{,}88)=$ **35,2 Hz** (16.16).
2. **b)** $f_1=v/4L=$ **17,6 Hz** (16.20), por debajo del umbral audible de ~20 Hz: se percibe más como vibración.

**Receta.** Misma longitud: el cerrado suena a la mitad de frecuencia que el abierto.
**Error típico.** Intercambiar $2L$ y $4L$.
Teoría: U §16.4 pp. 520–521.

---

### E11. Problema 16.31 (U p. 540; Solucionario 16-8 y 16-9) — soplar en un tubo de ensayo

**Enunciado (de U).** Usted sopla a través de la boca de un tubo de ensayo vacío y produce la onda estacionaria fundamental de la columna de aire en su interior. La rapidez del sonido en el aire es de 344 m/s y el tubo de ensayo actúa como un tubo cerrado. a) Si la longitud de la columna de aire es de 14,0 cm, ¿qué frecuencia tiene esa onda estacionaria? b) Determine la frecuencia de la onda estacionaria fundamental en la columna de aire, si el tubo de ensayo se llena hasta la mitad con agua.

**Solución.**
1. **Por qué suena** (U §16.5 p. 522). El chorro de aire contiene muchas frecuencias; la columna **resuena** con la de su modo normal y la amplifica.
2. **a)** Fondo cerrado (nodo) y boca abierta (antinodo) ⇒ $L=\lambda/4$ ⇒ $\lambda=0{,}560$ m ⇒ $f=v/\lambda=$ **614 Hz** (16.20).
3. **b)** El agua actúa como nuevo fondo cerrado: $L=0{,}070$ m ⇒ $\lambda=0{,}280$ m ⇒ $f=$ **1,23 kHz** (el doble).

**Receta.** Lo que cuenta es la longitud de **la columna de aire**, no la del recipiente.
**Error típico.** Usar la longitud total del tubo en b).
Teoría: U §16.4 p. 521; §16.5 p. 522.

---

### E12. Problema 16.33 (U p. 540; Solucionario 16-9) — alambre que vibra y sonido que emite

**Enunciado (de U).** Un alambre de 75,0 cm de longitud y 5,625 g de masa se sujeta en sus dos extremos con una tensión de 35,0 N. Cuando vibra en su segundo sobretono, calcule a) la frecuencia y la longitud de onda a la cual vibra y b) la frecuencia y la longitud de onda de las ondas sonoras que produce.

**Solución.**
1. **Segundo sobretono = tercer armónico** ($n=3$): el fundamental es el 1.er armónico y el 1.er sobretono es el 2.º armónico (U p. 491).
2. **Onda en el alambre:** $\mu=m/L=5{,}625\times10^{-3}/0{,}750=7{,}50\times10^{-3}$ kg/m; $v=\sqrt{F/\mu}=\sqrt{35{,}0/7{,}50\times10^{-3}}=68{,}3$ m/s (15.14).
3. **a)** $\lambda_3=2L/3=$ **0,500 m**; $f_3=3v/2L=3(68{,}3)/1{,}50=$ **137 Hz** (15.31, 15.33).
4. **b)** El alambre empuja el aire con su misma frecuencia: $f=$ **137 Hz**. Pero en el aire la rapidez es 344 m/s: $\lambda_{aire}=344/136{,}6=$ **2,52 m**.

**Receta.** Al pasar de un medio a otro se conserva la **frecuencia** (la impone la fuente) y cambia $\lambda=v/f$ (U p. 524, ejemplo 16.12).
**Error típico.** Tomar el «segundo sobretono» como $n=2$, o dar al sonido la $\lambda$ del alambre.
Teoría: U §15.8 pp. 491–492; §16.5 pp. 523–524.

---

### E13. Problema 16.35 (U p. 540, fig. E16.35; Solucionario 16-10) — interferencia en la prolongación de dos altavoces

**Enunciado (de U).** Dos altavoces, A y B, son alimentados por el mismo amplificador y emiten ondas sinusoidales en fase. El altavoz B está 2,00 m a la derecha de A. Considere el punto Q a lo largo de la extensión de la línea que une los altavoces, 1,00 m a la derecha del altavoz B. Ambos altavoces emiten ondas sonoras que viajan directamente del altavoz a Q. Determine la frecuencia más baja con la que habrá a) interferencia constructiva en el punto Q y b) interferencia destructiva en el punto Q.

**Solución.**
1. **Idea** (U §16.6 p. 525). Emisión en fase ⇒ la diferencia de fase en Q se debe solo a la **diferencia de caminos** $\Delta=|r_A-r_B|$. Constructiva si $\Delta=n\lambda$; destructiva si $\Delta=(n+\tfrac12)\lambda$.
2. **Caminos:** $r_A=3{,}00$ m, $r_B=1{,}00$ m ⇒ $\Delta=2{,}00$ m (fija, no depende de la frecuencia).
3. **a)** $2{,}00=n\lambda$ ⇒ $f=v/\lambda=n(344)/2{,}00=n\cdot172$ Hz. La más baja ($n=1$, la mayor $\lambda$): **172 Hz**. ($n=0$ exigiría $\Delta=0$.)
4. **b)** $2{,}00=(n+\tfrac12)\lambda$ ⇒ $f=(2n+1)\cdot86$ Hz. La más baja: **86 Hz** ($\lambda=4{,}00$ m, $\Delta=\lambda/2$).

**Receta.** Calcula $\Delta$; constructiva $\Delta=n\lambda$, destructiva $\Delta=(n+\tfrac12)\lambda$; «frecuencia más baja» = mayor $\lambda$ = $n$ más pequeño.
**Error típico.** Usar la distancia entre altavoces o a uno solo en lugar de la diferencia de caminos.
Teoría: U §16.6 pp. 524–525.

---

### E14. Problema 16.40 (U p. 540; Solucionario 16-11) — pulsos entre dos guitarras

**Enunciado (de U).** Dos guitarristas intentan tocar la misma nota con longitud de onda de 64,8 cm al mismo tiempo, pero uno de los instrumentos está ligeramente desafinado y, en lugar de ello, toca una nota cuya longitud de onda es de 65,2 cm. ¿Cuál es la frecuencia de los pulsos que estos músicos escuchan cuando tocan juntos?

**Solución.**
1. **Idea** (U §16.7 pp. 526–527). Dos sonidos de frecuencias próximas se refuerzan y se cancelan alternativamente; la sonoridad sube y baja con **$f_{pulso}=f_a-f_b$** (16.24).
2. **Frecuencias** (longitudes de onda en el aire): $f_a=344/0{,}648=530{,}9$ Hz; $f_b=344/0{,}652=527{,}6$ Hz.
3. **Restando sin perder cifras:**
$$f_{pulso}=v\Big(\frac1{\lambda_a}-\frac1{\lambda_b}\Big)=\frac{v(\lambda_b-\lambda_a)}{\lambda_a\lambda_b}=\frac{(344)(0{,}004\ \text{m})}{(0{,}648)(0{,}652)}=\mathbf{3{,}3\ Hz}\ (3{,}26).$$
4. **Evaluación.** Unas tres oscilaciones de volumen por segundo, fácil de oír (como en Evalúe 16.7 de U). Ojo: $65{,}2-64{,}8=0{,}4$ cm $=0{,}004$ m.

**Receta.** Pulsos: $f_{pulso}=|f_a-f_b|$; si te dan $\lambda$, usa $v(\lambda_b-\lambda_a)/(\lambda_a\lambda_b)$ para no perder precisión al restar.
**Error típico.** Restar frecuencias redondeadas (530 − 528) o equivocarse al pasar 0,4 cm a metros.
Teoría: U §16.7 p. 527 (16.24).

---

### E15. Problema 16.46 (U p. 541; Solucionario 16-12) — longitudes de onda delante y detrás de un tren

**Enunciado (de U).** Un tren viaja a 25,0 m/s en aire tranquilo. La frecuencia de la nota emitida por el silbato de la locomotora es de 400 Hz. Calcule la longitud de las ondas sonoras a) enfrente de la locomotora; b) detrás de la locomotora. Calcule la frecuencia del sonido que oye un receptor estacionario c) enfrente de la locomotora y d) detrás de la locomotora.

**Solución.**
1. **Idea** (U p. 529). La fuente persigue a las crestas que emite por delante y se aleja de las que deja detrás. En reposo sería $\lambda=344/400=0{,}860$ m.
2. **a)** $\lambda_{enfrente}=(v-v_S)/f_S=(344-25{,}0)/400=$ **0,798 m** (16.27).
3. **b)** $\lambda_{atrás}=(v+v_S)/f_S=369/400=$ **0,922 m** (16.28).
4. **c)** Receptor quieto: las crestas pasan con rapidez $v$ ⇒ $f_L=v/\lambda=344/0{,}7975=$ **431 Hz**.
5. **d)** $f_L=344/0{,}9225=$ **373 Hz**.
6. **Comprobación con (16.29).** c) Positivo de L a S: la fuente va hacia L ⇒ $v_S=-25$: $f_L=\frac{344}{344-25}400=431$ Hz ✓; d) $v_S=+25$: $\frac{344}{369}400=373$ Hz ✓.

**Receta.** Fuente móvil: primero $\lambda$ (16.27)/(16.28); luego $f_L=(v+v_L)/\lambda$.
**Error típico.** Pensar que la onda de delante va a $v+v_S$.
Teoría: U §16.8 pp. 529–530 (16.27)–(16.29); ejemplo 16.14.

---

### E16. Problema 16.48 (U p. 541; Solucionario 16-13) — fuente móvil contra receptor móvil

**Enunciado (de U).** a) Una fuente sonora que produce ondas de 1,00 kHz se mueve hacia un receptor estacionario a la mitad de la rapidez del sonido. ¿Qué frecuencia oirá el receptor? b) Suponga ahora que la fuente se encuentra estacionaria y que el receptor se mueve hacia ella a la mitad de la rapidez del sonido. ¿Qué frecuencia oye el receptor? Compare su respuesta con la del inciso a) y explique la diferencia con base en principios de la física.

**Solución.**
1. **Convenio** (U p. 528): positivo de L a S; aplicamos (16.29) $f_L=\dfrac{v+v_L}{v+v_S}f_S$.
2. **a)** La fuente va hacia el receptor, sentido opuesto a $L\to S$ ⇒ $v_S=-v/2$, $v_L=0$: $f_L=\dfrac{v}{v/2}f_S=$ **2000 Hz**.
3. **b)** El receptor va hacia la fuente, sentido $L\to S$ ⇒ $v_L=+v/2$, $v_S=0$: $f_L=\dfrac{3v/2}{v}f_S=$ **1500 Hz**.
4. **Por qué difieren.** En a) la fuente **comprime $\lambda$** a la mitad ($\lambda_{enfrente}=(v-v/2)/f_S$) y las crestas siguen llegando a $v$ ⇒ $f$ se duplica. En b) $\lambda$ no cambia; solo aumenta la rapidez relativa de las crestas respecto al receptor, de $v$ a $1{,}5v$. El aire es un sistema de referencia físico: no basta la velocidad relativa fuente–receptor.

**Receta.** Sonido: cada velocidad, respecto al aire, con su signo; fuente y receptor no son intercambiables.
**Error típico.** Responder 1500 Hz en ambos casos «porque la velocidad relativa es la misma».
Teoría: U §16.8 pp. 528–530.

---

### E17. Problema 16.50 (U p. 541; Solucionario 16-13 y 16-14) — dos trenes que se cruzan

**Enunciado (de U).** Un tren viaja a 30,0 m/s en aire tranquilo. La frecuencia de la nota emitida por su silbato es de 352 Hz. ¿Qué frecuencia oye un pasajero de un tren que se mueve en dirección opuesta a 18,0 m/s a) cuando se acerca al primer tren y b) cuando se aleja de él?

**Solución.**
1. **Identificar.** Fuente = silbato (30,0 m/s); receptor = pasajero (18,0 m/s). Positivo de L a S.
2. **a) Se acercan.** El pasajero va hacia la fuente ⇒ $v_L=+18{,}0$; la fuente va hacia el pasajero ⇒ $v_S=-30{,}0$:
$$f_L=\frac{344+18{,}0}{344-30{,}0}(352)=\mathbf{406\ Hz}.$$
3. **b) Se alejan.** Ambos sentidos se invierten: $v_L=-18{,}0$, $v_S=+30{,}0$:
$$f_L=\frac{344-18{,}0}{344+30{,}0}(352)=\mathbf{307\ Hz}.$$
4. **Evaluación.** Al acercarse $f_L>f_S$; al alejarse $f_L<f_S$ ✓ (Estrategia 16.2, «Evaluar»). Al cruzarse, el tono cae unos 100 Hz.

**Receta.** Dibuja L y S, una flecha «+» de L a S, y pon a cada velocidad el signo según vaya a favor o en contra de esa flecha.
**Error típico.** Dar signo «+» a la fuente porque «se acerca».
Teoría: U §16.8 pp. 529–530 (16.29); Estrategia 16.2.

---

### E18. Problema 16.52 (U p. 541; Solucionario 16-14) — pulsos entre dos cláxones

**Enunciado (de U).** Mientras usted se encuentra estacionado en su auto a un lado del camino, en un automóvil idéntico se acerca su amigo, y usted hace sonar su claxon, que tiene una frecuencia de 260 Hz. Al mismo tiempo su amigo hace sonar su claxon, que es idéntico, y usted escucha una frecuencia de pulso de 6,0 Hz. ¿Qué tan rápido se acerca su amigo hacia usted?

**Solución.**
1. **Idea.** Usted oye dos sonidos: su claxon (260 Hz, sin Doppler) y el de su amigo, desplazado por Doppler. Sus frecuencias difieren en la de pulso (16.24).
2. **¿Más alta o más baja?** El amigo se acerca ⇒ $f_L>f_S$ ⇒ $f_L=260+6{,}0=266$ Hz (254 Hz correspondería a alejarse).
3. **Doppler** (16.29), receptor (usted) quieto, $v_L=0$; la fuente va hacia usted ⇒ $v_S<0$:
$$266=\frac{344}{344+v_S}(260)\ \Rightarrow\ v_S=344\Big(\frac{260}{266}-1\Big)=-7{,}76\ \text{m/s}.$$
4. Su amigo se acerca a **7,8 m/s** (unos 28 km/h).

**Receta.** Pulsos + Doppler: $f_{pulso}$ da $f_L$ (elige el signo según se acerque o aleje) y (16.29) da la velocidad.
**Error típico.** Igualar 6,0 Hz a $f_L$ o tomar $f_L=254$ Hz.
Teoría: U §16.7 p. 527; §16.8 p. 529.

---

### E19. Problema 16.54 (U p. 541; Solucionario 16-15 y 16-16) — eco de la sirena en un camión

**Enunciado (de U).** La sirena de un camión de bomberos que viaja hacia el norte a 30,0 m/s emite un sonido con una frecuencia de 2000 Hz. Un camión enfrente del carro de bomberos se desplaza hacia el norte a 20 m/s. a) ¿Cuál es la frecuencia del sonido de la sirena que el conductor del carro de bomberos oye reflejado en la parte trasera del camión? b) ¿Cuál sería la longitud de onda medida por el conductor del carro de bomberos para estas ondas sonoras reflejadas?

**Solución.**
1. **Reflexión ⇒ dos pasos** (Estrategia 16.2, U p. 530; como el ejemplo 16.18).
2. **Paso 1: el camión es el receptor.** Positivo de L (camión) a S (bomberos) = **sur**. Ambos van al norte ⇒ $v_L=-20{,}0$, $v_S=-30{,}0$:
$$f'=\frac{344-20{,}0}{344-30{,}0}(2000)=2064\ \text{Hz}.$$
(Se acercan porque los bomberos son más rápidos ⇒ $f'>2000$ ✓.)
3. **Paso 2: el camión es la fuente** que emite $f'$; el conductor de bomberos es el receptor. Positivo de L (bomberos) a S (camión) = **norte** ⇒ $v_L=+30{,}0$, $v_S=+20{,}0$:
$$f=\frac{344+30{,}0}{344+20{,}0}(2064)=\mathbf{2120\ Hz}.$$
4. **b)** La longitud de onda es la separación entre crestas en el aire. El camión (fuente) se aleja del lado sur, hacia donde viajan las ondas reflejadas ⇒ $\lambda_{atrás}=(v+v_S)/f'=(344+20{,}0)/2064=$ **0,176 m** (16.28). Comprobación: el conductor, que va hacia las crestas, las recibe con rapidez relativa $v+30$: $\lambda=(344+30)/2120=0{,}176$ m ✓. (En reposo sería $344/2000=0{,}172$ m.)

**Receta.** Eco en un objeto móvil: (1) objeto = receptor ⇒ $f'$; (2) objeto = fuente de $f'$ ⇒ $f$. Cambia el sentido positivo en cada paso.
**Error típico.** Mantener el mismo eje «+» en los dos pasos, o aplicar la fórmula una sola vez con la velocidad relativa.
Teoría: U §16.8 pp. 529–532 (16.28), (16.29); Estrategia 16.2; ejemplo 16.18.

---

### E20. Problema 16.55 (U p. 541; Solucionario 16-16 y 16-17) — radar acústico de la patrulla

**Enunciado (de U).** Una patrulla estacionada a un lado de una autopista emite una frecuencia de sonido de 1200 Hz que rebota en un automóvil en la autopista y regresa con una frecuencia de 1250 Hz. La patrulla está justo al lado de la autopista, de manera que el automóvil se desplaza directamente hacia el vehículo de policía o se aleja de éste. a) ¿Qué tan rápido viajaba el automóvil? b) ¿Qué frecuencia habría recibido la patrulla si hubiera avanzado hacia el otro vehículo a 20,0 m/s?

**Solución.**
1. **Signo físico.** La frecuencia vuelve más alta ⇒ el auto **se acerca**. Llamamos $v_c$ a su rapidez.
2. **Paso 1 (auto = receptor; patrulla quieta = fuente).** Positivo de auto a patrulla; el auto va hacia la patrulla ⇒ $v_L=+v_c$, $v_S=0$: $f'=\dfrac{v+v_c}{v}(1200)$.
3. **Paso 2 (auto = fuente de $f'$; patrulla = receptor).** Positivo de patrulla a auto; el auto va hacia la patrulla, en contra ⇒ $v_S=-v_c$, $v_L=0$: $f=\dfrac{v}{v-v_c}f'$.
4. **Combinando:** $1250=\dfrac{v+v_c}{v-v_c}(1200)$ ⇒ $1250(v-v_c)=1200(v+v_c)$ ⇒ $v_c=\dfrac{50}{2450}v=\dfrac{344}{49}=$ **7,02 m/s**.
5. **b)** Patrulla a 20,0 m/s hacia el auto. Paso 1: positivo de auto a patrulla; auto $v_L=+7{,}02$; la patrulla va hacia el auto, en contra ⇒ $v_S=-20{,}0$: $f'=\dfrac{344+7{,}02}{344-20{,}0}(1200)=1300$ Hz. Paso 2: positivo de patrulla a auto; patrulla $v_L=+20{,}0$; auto $v_S=-7{,}02$: $f=\dfrac{344+20{,}0}{344-7{,}02}(1300)=$ **1404 Hz** ($\approx1{,}40$ kHz).
6. **Evaluación.** Mayor rapidez de acercamiento ⇒ desplazamiento mayor (204 Hz frente a 50 Hz) ✓.

**Receta.** Eco: $f=\dfrac{v+v_{obj}}{v-v_{obj}}f_S$ para un objeto que se acerca a una fuente-receptor quieta; si ésta se mueve, dos pasos con su velocidad en cada uno.
**Error típico.** Despejar $v_c$ de una sola aplicación de (16.29) (sale el doble, 14 m/s).
Teoría: U §16.8 pp. 529–532; Estrategia 16.2; ejemplo 16.18.

---

### E21. Problema 16.57 (U p. 541; Solucionario 16-17) — estruendo sónico

**Enunciado (de U).** Un avión a reacción pasa volando a Mach 1,70 y a una altitud constante de 1250 m. a) ¿Qué ángulo $\alpha$ tiene el cono de la onda de choque? b) ¿Cuánto tiempo después de pasar el avión directamente arriba de nosotros oímos el estruendo sónico? Desprecie la variación de la rapidez del sonido con la altitud.

**Solución.**
1. **Idea** (U pp. 533–534). Una fuente supersónica deja atrás sus crestas, que se superponen en un cono de semiángulo $\sin\alpha=v/v_S$ (16.31). El estruendo se oye cuando el **cono** llega al observador, no cuando el avión pasa por encima.
2. **a)** $\sin\alpha=1/1{,}70=0{,}588$ ⇒ $\alpha=$ **36,0°**.
3. **b)** Geometría del ejemplo 16.19 (U pp. 534–535): cuando el cono nos alcanza, el avión ha recorrido $v_St$ desde la vertical y la generatriz del cono pasa por nosotros ⇒ $\tan\alpha=h/(v_St)$:
$$t=\frac{h}{v_S\tan\alpha}=\frac{1250}{(1{,}70)(344)\tan36{,}0°}=\mathbf{2{,}94\ s}.$$
(Equivalente: $\tan\alpha=1/\sqrt{M^2-1}$ ⇒ $t=h\sqrt{M^2-1}/(Mv)$, mismo valor.)

**Receta.** $\sin\alpha=1/\text{Mach}$; tiempo hasta el estruendo: $\tan\alpha=h/(v_St)$.
**Error típico.** Usar $t=h/v$ (como si el sonido bajara en vertical desde el punto de paso) o $\sin\alpha$ en lugar de $\tan\alpha$.
Teoría: U §16.9 p. 534 (16.31); ejemplo 16.19 pp. 534–535.

---

### E22. Problema 16.63 (U p. 542; Solucionario 16-19 y 16-20) — dos armónicos sucesivos: ¿abierto o cerrado?

**Enunciado (de U).** Un tubo de órgano tiene dos armónicos sucesivos con frecuencias de 1372 y 1764 Hz. a) ¿El tubo está abierto o cerrado? Explique su respuesta. b) ¿De qué armónicos se trata? c) ¿Qué longitud tiene el tubo?

**Solución.**
1. **Idea.** Abierto: existen todos los armónicos $nf_1$ ⇒ dos sucesivos difieren en $f_1$. Cerrado: solo impares ⇒ dos sucesivos difieren en $2f_1$ (U pp. 520–521).
2. **Hipótesis «abierto».** $f_1=1764-1372=392$ Hz ⇒ $n=1372/392=3{,}5$, no entero ⇒ **imposible**.
3. **Hipótesis «cerrado».** $2f_1=392$ ⇒ $f_1=196$ Hz ⇒ $1372=7f_1$ y $1764=9f_1$, impares consecutivos ✓. **a)** Está **cerrado**. **b)** Son el **7.º y el 9.º armónicos**.
4. **c)** $L=v/4f_1=344/(4\cdot196)=$ **0,439 m** (16.20).

**Receta.** Diferencia de dos armónicos sucesivos: $f_1$ (abierto) o $2f_1$ (cerrado); la hipótesis buena es la que da $n$ entero (e impar si es cerrado).
**Error típico.** Tomar 1372 Hz como fundamental o suponer abierto sin comprobar que $n$ sea entero.
Teoría: U §16.4 pp. 520–521.

---

### E23. Problema 16.64 (U p. 542; Solucionario 16-20) — la temperatura desafina el órgano

**Enunciado (de U).** La frecuencia de la nota fa (F4) es de 349 Hz. a) Si un tubo de órgano está abierto en un extremo y cerrado en el otro, ¿qué longitud deberá tener para que su modo fundamental produzca esa nota a 20,0 °C? b) ¿Con qué temperatura del aire la frecuencia será de 370 Hz, correspondiente a un aumento de tono de fa a fa sostenido? (Desprecie el cambio de longitud del tubo debido al cambio de temperatura.)

**Solución.**
1. **a)** Cerrado: $L=v/4f_1=344/(4\cdot349)=$ **0,246 m** (16.20).
2. **b) Qué cambia.** $L$ fija ⇒ $\lambda_1=4L$ fija ⇒ $f_1=v/4L\propto v$. Y $v=\sqrt{\gamma RT/M}\propto\sqrt T$ (16.10, mismo gas). Por tanto $f\propto\sqrt T$:
$$T_2=T_1\Big(\frac{f_2}{f_1}\Big)^2=(293{,}15\ \text{K})\Big(\frac{370}{349}\Big)^2=329{,}5\ \text{K}=\mathbf{56{,}3\ °C}.$$
3. **Evaluación.** Hace falta una subida de 36 °C para un semitono: en la práctica no se llega a tanto, pero unos pocos grados sí desafinan apreciablemente (por eso se «calientan» los instrumentos de viento, P16.5).

**Receta.** Si solo cambia $T$: $f\propto v\propto\sqrt{T}$ (en kelvin).
**Error típico.** Hacer la proporción con temperaturas en °C ($20\cdot(370/349)^2$).
Teoría: U §16.2 p. 513 (16.10); §16.4 p. 521.

---

### E24. Problema práctico (U p. 537, fig. 16.39; solución numérica en U p. 544) — interferencia de dos altavoces de distinta potencia

**Enunciado (de U).** Dos altavoces, A y B, están separados 7,00 m y vibran en fase a 172 Hz. Los altavoces radian sonido de manera uniforme en todas direcciones. Las potencias de salida acústica son de $8{,}00\times10^{-4}$ W y $6{,}00\times10^{-5}$ W, respectivamente. La temperatura del aire es de 20 °C. a) Determine la diferencia de fase de las dos señales en un punto C sobre la línea que une A y B, a 3,00 m de B y 4,00 m de A (figura 16.39). b) Determine la intensidad y el nivel de intensidad del sonido en C debido solo al altavoz A (B apagado), y haga lo mismo para el altavoz B (A apagado). c) Con ambos altavoces encendidos, determine la intensidad y el nivel de intensidad del sonido en C.

**Solución.**
1. **Plan** (guía de U). Potencia → intensidad (inverso del cuadrado) → amplitud de presión de cada onda → sumar **amplitudes de presión** con la fase correcta → intensidad total → dB.
2. **a)** $\lambda=v/f=344/172=2{,}00$ m. Diferencia de caminos $\Delta=4{,}00-3{,}00=1{,}00$ m $=\lambda/2$. Cada longitud de onda de camino añade $2\pi$ de fase ⇒ $\Delta\phi=2\pi\Delta/\lambda=$ **π rad (180°)**: las ondas llegan en **oposición** (interferencia destructiva, U p. 525).
3. **b) Solo A.** Fuente puntual: $I_A=\dfrac{P_A}{4\pi r_A^2}=\dfrac{8{,}00\times10^{-4}}{4\pi(4{,}00)^2}=$ **3,98 × 10⁻⁶ W/m²** (U pp. 484, 515) ⇒ $\beta_A=10\log(3{,}98\times10^{6})=$ **66,0 dB** (16.15).
   **Solo B.** $I_B=\dfrac{6{,}00\times10^{-5}}{4\pi(3{,}00)^2}=$ **5,31 × 10⁻⁷ W/m²** ⇒ $\beta_B=$ **57,2 dB**.
4. **Amplitudes de presión** de (16.14), $p_{máx}=\sqrt{2\rho vI}$ con $\rho=1{,}20$ kg/m³: $p_A=0{,}0573$ Pa, $p_B=0{,}0209$ Pa.
5. **c) Superposición.** Las fluctuaciones de presión se suman (principio de superposición, U p. 486). Misma frecuencia y desfase $\pi$ ⇒ $p_A\cos(\omega t)+p_B\cos(\omega t+\pi)=(p_A-p_B)\cos\omega t$: amplitud resultante $p=p_A-p_B=0{,}0364$ Pa. Entonces
$$I=\frac{p^2}{2\rho v}=\big(\sqrt{I_A}-\sqrt{I_B}\big)^2=\mathbf{1{,}60\times10^{-6}\ W/m^2},\qquad \beta=\mathbf{62{,}1\ dB}.$$
6. **Evaluación.** La intensidad combinada es **menor** que la de A sola (interferencia destructiva), pero no nula porque las amplitudes son distintas ✓. Si se sumaran (mal) las intensidades: $4{,}51\times10^{-6}$ W/m² y 66,5 dB, mayor que A sola: absurdo para una destructiva. Las intensidades solo se suman para fuentes **independientes** (no coherentes), como en el problema 16.20.

**Receta.** Fuentes coherentes (misma $f$, fase fija): suma amplitudes de presión con su desfase $\Delta\phi=2\pi\Delta/\lambda$ y después pasa a intensidad; fuentes independientes: suma intensidades.
**Error típico.** Sumar intensidades (o decibelios) de dos fuentes coherentes.
Teoría: U §16.3 pp. 514–516 (16.14), (16.15); §16.6 pp. 524–525; §15.5 p. 484; §15.6 p. 486.

---

## Tabla de verificación (sympy)

| Ejercicio | Resultado verificado |
|---|---|
| 16.1 | $\lambda=0{,}344$ m; $A=1{,}20\times10^{-5}$ m; $\lambda_2=6{,}88$ m; $f_2=50{,}0$ Hz |
| 16.3 | $p_{máx}=7{,}781;\ 77{,}81;\ 778{,}1$ Pa |
| 16.6 | $B=1{,}3312\times10^{10}$ Pa; $v=3846{,}2$ m/s; $Y=9{,}4675\times10^{10}$ Pa |
| 16.7 | $h=89{,}609$ m; distancia 90,809 m (camino al amigo $\sqrt{22^2+1{,}2^2}=22{,}03$ m) |
| 16.8 | $v_{H_2}=1319{,}8$; $v_{He}=1020{,}7$; $v_{Ar}=323{,}19$; $v_{aire}=348{,}30$ m/s; cocientes 3,789; 2,931; 0,9279 |
| 16.14 | $10^{1{,}3}=19{,}953$ |
| 16.15 | $r_2=0{,}150$ m |
| 16.20 | $10\log4=6{,}0206$ dB; 16 bebés (12 más) |
| 16.26 | $L=0{,}32824$ m; $\lambda=1{,}3130$ m; $f=262{,}0$ Hz |
| 16.29 | 35,246 Hz; 17,623 Hz |
| 16.31 | 614,29 Hz; 1228,6 Hz |
| 16.33 | $\mu=7{,}5\times10^{-3}$ kg/m; $v=68{,}313$ m/s; $f_3=136{,}63$ Hz; $\lambda=0{,}500$ m; $\lambda_{aire}=2{,}5178$ m |
| 16.35 | constructiva $n\cdot172$ Hz; destructiva $(2n+1)\cdot86$ Hz |
| 16.40 | $f_a=530{,}86$, $f_b=527{,}61$ Hz; $f_{pulso}=3{,}2568$ Hz |
| 16.46 | 0,7975 m; 0,9225 m; 431,35 Hz; 372,90 Hz |
| 16.48 | 2000 Hz; 1500 Hz |
| 16.50 | 405,81 Hz; 306,82 Hz |
| 16.52 | $v_S=-1032/133=-7{,}759$ m/s |
| 16.54 | $f'=2063{,}69$ Hz; $f=2120{,}39$ Hz; $\lambda=0{,}17638$ m (por ambos caminos) |
| 16.55 | $v_c=344/49=7{,}0204$ m/s; b) $f'=1300{,}08$ Hz, $f=1404{,}32$ Hz |
| 16.57 | $\alpha=36{,}032°$; $t=2{,}9386$ s (por las dos fórmulas) |
| 16.63 | $f_1$(abierto)$=392$ ⇒ $n=3{,}5$ ✗; cerrado $f_1=196$ Hz, $n=7,9$; $L=0{,}43878$ m |
| 16.64 | $L=0{,}24642$ m; $T_2=329{,}49$ K $=56{,}34$ °C |
| Probl. práctico | $\lambda=2{,}00$ m, $\Delta\phi=\pi$; $I_A=3{,}9789\times10^{-6}$ W/m², 65,998 dB; $I_B=5{,}3052\times10^{-7}$ W/m², 57,247 dB; $p_A=0{,}057315$, $p_B=0{,}020928$ Pa; $I=1{,}6036\times10^{-6}$ W/m², 62,051 dB; (suma incorrecta: $4{,}509\times10^{-6}$, 66,54 dB) |
| Teoría Doppler | $(v+v_L)/[(v+v_S)/f_S]=f_S(v+v_L)/(v+v_S)$ ✓ |
| C1 | 344 Hz; 172 Hz; con helio 999 Hz |
| C2 | $10\log(2\times10^6)=63{,}010$ dB |
