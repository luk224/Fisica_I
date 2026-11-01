# Soluciones Tema 15 — Ondas mecánicas

Material para el redactor del tema 15. Todos los números se han comprobado con sympy (script propio de verificación, un bloque por ejercicio; resultados en la tabla final). Los enunciados se han tomado de U (`sears.txt`, págs. impresas 496–502; la figura E15.32 y el enunciado de 15.25 se han comprobado sobre la imagen del PDF, págs. PDF 526–527) y las soluciones de `solman.txt` (la página 15-N del solucionario está en el PDF 507+N). Cada etiqueta 15.N se ha confirmado comparando el enunciado de U con el contenido de la solución de E (no hay desplazamientos). El examen Feb 2019 (1ª sem.) se ha comprobado sobre la imagen del PDF `E689010160-19F1.pdf`. Los problemas E están traducidos y ampliados, no copiados.

Convenciones: $g=9{,}80\ \text{m/s}^2$ (como U y E). «U p. NN» = página impresa del Sears-Zemansky. Notación de U: $\mu$ = masa por unidad de longitud, $F$ = tensión, $A$ = amplitud de cada onda viajera, $A_{OE}$ = amplitud de la onda estacionaria, $k=2\pi/\lambda$ (rad/m), $\omega=2\pi f$ (rad/s). Fases en radianes.

## Herramientas de teoría que se usan

| Herramienta | Dónde |
|---|---|
| Onda transversal / longitudinal; la onda transporta energía, no materia | U §15.1 pp. 469–470 |
| Onda periódica: $v=\lambda f$ (15.1); $T=1/f$ | U §15.2 p. 471 |
| Función de onda $y=A\cos[\omega(x/v-t)]$ (15.3), $y=A\cos 2\pi(x/\lambda-t/T)$ (15.4); $k=2\pi/\lambda$ (15.5); $\omega=vk$ (15.6); $y=A\cos(kx-\omega t)$ hacia $+x$ (15.7); $y=A\cos(kx+\omega t)$ hacia $-x$ (15.8) | U §15.3 pp. 473–475 |
| Velocidad y aceleración transversales: $v_y=\partial y/\partial t=\omega A\sin(kx-\omega t)$ (15.9), $a_y=-\omega^2 y$ (15.10); ecuación de onda (15.12) | U §15.3 pp. 476–477 |
| Rapidez de una onda transversal en una cuerda $v=\sqrt{F/\mu}$ (15.14) | U §15.4 p. 480 |
| Potencia instantánea (15.23), $P_{máx}=\sqrt{\mu F}\,\omega^2A^2$ (15.24), $P_{med}=\tfrac12\sqrt{\mu F}\,\omega^2A^2$ (15.25) | U §15.5 p. 483 |
| Intensidad de fuente puntual $I=P/4\pi r^2$; ley del inverso del cuadrado $I_1/I_2=r_2^2/r_1^2$ (15.26) | U §15.5 p. 484 |
| Reflexión: extremo fijo invierte el pulso, extremo libre no; principio de superposición $y=y_1+y_2$ (15.27) | U §15.6 pp. 485–486 |
| Onda estacionaria $y=(A_{OE}\sin kx)\sin\omega t$, $A_{OE}=2A$ (15.28); nodos en $x=0,\lambda/2,\lambda,\dots$ (15.29); antinodos a $\lambda/4$ de los nodos | U §15.7 pp. 487–490 |
| Cuerda fija en ambos extremos: $L=n\lambda/2$ (15.30), $\lambda_n=2L/n$ (15.31), $f_1=v/2L$ (15.32), $f_n=nf_1$ (15.33), $y_n$ (15.34), $f_1=\frac1{2L}\sqrt{F/\mu}$ (15.35); armónicos y sobretonos | U §15.8 pp. 491–494 |
| MAS: $v_{máx}=\omega A$, $a_{máx}=\omega^2A$ (14.23, 14.16) | U §14.2–14.3 pp. 440, 443 |
| Fuerza centrípeta $\sum F=ma_{rad}=m\omega^2 r$ (y §9.3) y centro de masa | U §5.4 pp. 150–151; §8.5 pp. 254–255 |
| Peso $w=mg$ | U §4.4 pp. 114–115 |

---

## PARTE A — Exámenes (X)

**Qué ha caído del tema 15.** **Ningún problema numérico** (P-1/P-2) en las convocatorias disponibles (2018–2025). Una sola pregunta de **teoría**:

| Id | Cita exacta (`data-ref`) | Tipo |
|---|---|---|
| X1 | Examen Febrero 2019 (1ª semana) P-3 Teoría Opción 3.1 | teoría «Ondas estacionarias en una cuerda» (sin cuestiones cortas; la opción 3.2 era «Momento angular. Conservación») |

Por eso los ejercicios numéricos del tema se toman de E (Parte B) y en el HTML hay que decirlo: «no ha caído ningún problema de ondas mecánicas; sí la teoría de ondas estacionarias». Abajo, un desarrollo modelo de X1 y dos cuestiones cortas **propias** del estilo de las que acompañan a las preguntas de teoría desde 2025 (no son de examen).

### Desarrollo modelo «Ondas estacionarias en una cuerda» (X1)

Extensión orientativa: una cara. Lo que **no** puede faltar, en negrita.

1. **Punto de partida: onda viajera sinusoidal** (U pp. 473–475). Una perturbación que se propaga por una cuerda tensa con rapidez **$v=\sqrt{F/\mu}$** (15.14) (depende solo del medio). Si es sinusoidal: **$y(x,t)=A\cos(kx-\omega t)$** hacia $+x$ y $A\cos(kx+\omega t)$ hacia $-x$, con $k=2\pi/\lambda$, $\omega=2\pi f$, **$v=\lambda f=\omega/k$** (15.1, 15.6).
2. **Superposición y reflexión** (U pp. 485–486). La ecuación de onda es lineal ⇒ **el desplazamiento total es la suma $y=y_1+y_2$** (15.27). En un **extremo fijo** la onda reflejada vuelve **invertida** (desfase de $\pi$), porque la pared ejerce sobre la cuerda una fuerza que anula el desplazamiento allí; en un extremo libre vuelve sin invertir.
3. **Deducción** (U p. 489). Cuerda fija en $x=0$; onda incidente hacia la izquierda y reflejada hacia la derecha, misma $A$, $k$, $\omega$:
$$y_1=-A\cos(kx+\omega t),\qquad y_2=A\cos(kx-\omega t).$$
Con $\cos(a\pm b)=\cos a\cos b\mp\sin a\sin b$:
$$y=y_1+y_2=A[-\cos kx\cos\omega t+\sin kx\sin\omega t+\cos kx\cos\omega t+\sin kx\sin\omega t]=\boxed{(2A\sin kx)\sin\omega t}$$
**$y(x,t)=(A_{OE}\sin kx)\sin\omega t$, $A_{OE}=2A$** (15.28). (Comprobado con sympy.) Comprobación: en $x=0$, $y=0$ para todo $t$ ✓.
4. **Interpretación.** La función se **separa** en un factor de posición por uno de tiempo: la forma $A_{OE}\sin kx$ **no se desplaza**, solo «respira» arriba y abajo. **Cada punto hace un MAS** de frecuencia $\omega$ y amplitud $|A_{OE}\sin kx|$, que depende de la posición. Todos los puntos entre dos nodos consecutivos oscilan **en fase**; a un lado y otro de un nodo, en **oposición**. Contraste con la onda viajera: allí todos tienen la misma amplitud y la fase cambia de punto a punto.
5. **Nodos y antinodos** (U p. 489). **Nodos**: $\sin kx=0$ ⇒ $kx=0,\pi,2\pi,\dots$ ⇒ **$x=0,\ \lambda/2,\ \lambda,\ 3\lambda/2,\dots$** (15.29): separados **$\lambda/2$**. **Antinodos** (amplitud máxima $2A$): $\sin kx=\pm1$ ⇒ $x=\lambda/4,\ 3\lambda/4,\dots$: también separados $\lambda/2$ y a **$\lambda/4$ de cada nodo**.
6. **Energía** (U p. 489). Las dos ondas llevan la misma potencia en sentidos opuestos ⇒ **la potencia media transmitida es cero**: la onda estacionaria **no transporta energía** a lo largo de la cuerda; solo hay un flujo de ida y vuelta entre nodos y antinodos (en un nodo nunca pasa energía, porque $v_y=0$ siempre).
7. **Modos normales: cuerda fija en ambos extremos** (U pp. 491–492). Ahora debe haber nodo también en $x=L$: $\sin kL=0$ ⇒ $kL=n\pi$ ⇒ **$L=n\dfrac{\lambda}{2}$** (15.30): la longitud contiene un número entero de medias longitudes de onda. Por tanto
$$\lambda_n=\frac{2L}{n},\qquad f_n=\frac{v}{\lambda_n}=n\frac{v}{2L}=nf_1\quad(n=1,2,3,\dots)\qquad(15.31\text{–}15.33)$$
y, con $v=\sqrt{F/\mu}$, **$f_1=\dfrac1{2L}\sqrt{\dfrac F\mu}$** (15.35). **Solo esas frecuencias** producen onda estacionaria (cuantización por las condiciones de contorno).
8. **Nomenclatura** (U p. 491). $f_1$ = **fundamental** (= 1.er armónico); $f_n$ = **$n$-ésimo armónico** = $(n-1)$-ésimo sobretono. El modo $n$ tiene $n+1$ nodos (contando los extremos) y $n$ antinodos. Cada modo: $y_n=A_{OE}\sin k_nx\sin\omega_nt$ (15.34). Un movimiento cualquiera de la cuerda (p. ej. pulsada) es una **superposición de modos normales** (serie de Fourier, U p. 493).
9. **Consecuencias prácticas** (U p. 493). $f_1$ crece con $F$ (afinar = tensar), disminuye con $L$ (trastes, dedo) y con $\mu$ (cuerdas graves más gruesas o entorchadas). La cuerda produce en el aire sonido **de la misma frecuencia** (no de la misma $\lambda$).
10. **Figuras obligatorias:** (a) envolvente de la onda estacionaria con N y A marcados y $\lambda/2$ entre nodos; (b) los cuatro primeros modos ($n=1..4$) en una cuerda de longitud $L$ con $\lambda_n$ y $f_n$. **Fórmulas para la cuartilla:** (15.14), (15.27), (15.28), (15.29), (15.30)–(15.33), (15.35).

**Receta.** Pregunta de teoría de ondas estacionarias: «suma de dos viajeras opuestas (con el signo de la reflexión) → identidad trigonométrica → factor espacial × factor temporal → nodos → condición de contorno en $L$ → $\lambda_n$, $f_n$».

**Error típico.** (1) Decir que los nodos están separados $\lambda$ (son $\lambda/2$). (2) Confundir «segundo sobretono» con «segundo armónico» ($n=3$ frente a $n=2$). (3) Tomar como amplitud de las ondas viajeras la de la estacionaria ($A=A_{OE}/2$). (4) Decir que la onda estacionaria transporta energía.

### Cuestiones cortas propias (estilo examen; NO son de examen)

**C1 (propia).** Una cuerda de guitarra fija en ambos extremos vibra en su modo fundamental. a) Si se cuadruplica la tensión, ¿qué les ocurre a la frecuencia fundamental y a la longitud de onda del modo fundamental? b) ¿Y a la longitud de onda del sonido que emite en el aire?

*Respuesta.* a) $\lambda_1=2L$ depende **solo de la geometría**: **no cambia**. $v=\sqrt{F/\mu}$ se duplica ⇒ $f_1=v/2L$ **se duplica** (sube una octava) (15.35). b) El sonido tiene la frecuencia de la cuerda; en el aire su rapidez (344 m/s) no cambia ⇒ $\lambda_{aire}=v_{aire}/f$ **se reduce a la mitad**.

**C2 (propia).** Si se toca ligeramente una cuerda tensa (fija en ambos extremos) en el punto $x=L/3$ mientras se la excita, ¿qué armónicos pueden sonar? ¿Cuál es la frecuencia más baja?

*Respuesta.* El dedo impone un **nodo** en $x=L/3$. En el modo $n$ los nodos están en $x=mL/n$ ($m=0,1,\dots,n$), porque $L=n\lambda_n/2$ y los nodos distan $\lambda_n/2$ (15.29–15.30). Debe existir $m$ con $m/n=1/3$ ⇒ $n=3m$: **solo pueden sonar $n=3,6,9,\dots$**. La más baja es $f_3=3f_1$. Comprobación: cada tercio de cuerda vibra como una cuerda fija de longitud $L/3$, cuya fundamental es $v/[2(L/3)]=3f_1$ ✓.

**Receta (C1–C2).** En cuestiones de «qué pasa si…» con cuerdas: $\lambda_n=2L/n$ solo depende de la geometría; $v=\sqrt{F/\mu}$ solo del medio; $f_n=v/\lambda_n$. Un dedo apoyado impone un nodo.

---

## PARTE B — Problemas del solucionario (E)

Orden: el del libro (coincide con dificultad creciente dentro de cada sección).

### E1. Problema 15.1 (U p. 497; Solucionario 15-1) — longitud de onda y periodo de un sonido

**Enunciado (traducido de U).** La rapidez del sonido en el aire a 20 °C es 344 m/s. a) Calcule la longitud de onda de una onda sonora de frecuencia 784 Hz (nota sol de la segunda octava, G5, de un piano) y cuántos milisegundos dura cada vibración. b) Calcule la longitud de onda de una onda sonora una octava más alta (frecuencia doble).

**Solución.**
1. **Idea.** En una onda periódica, en un periodo $T$ la cresta avanza exactamente una longitud de onda ⇒ $v=\lambda/T=\lambda f$ (15.1, U p. 471). Conocidas $v$ y $f$, sale $\lambda$.
2. **a)** $\lambda=\dfrac vf=\dfrac{344}{784}=$ **0,439 m**. Duración de una vibración = periodo: $T=1/f=1/784=1{,}28\times10^{-3}$ s = **1,28 ms**.
3. **b)** Misma $v$ (la rapidez depende del medio, no de la frecuencia), $f'=1568$ Hz ⇒ $\lambda'=344/1568=$ **0,219 m** = $\lambda/2$.

**Receta.** $v$ la fija el medio; $f$, la fuente; $\lambda=v/f$ es la consecuencia.
**Error típico.** Pensar que al doblar $f$ se dobla $v$.
Teoría: U §15.2 p. 471 (15.1).

---

### E2. Problema 15.7 (U p. 497; Solucionario 15-2 y 15-3) — escribir la función de onda hacia $-x$

**Enunciado (traducido de U).** Ciertas ondas transversales en una cuerda tienen rapidez 8,00 m/s, amplitud 0,0700 m y longitud de onda 0,320 m. Viajan en la dirección $-x$ y en $t=0$ el extremo $x=0$ tiene su desplazamiento máximo hacia arriba. a) Calcule frecuencia, periodo y número de onda. b) Escriba una función de onda que describa la onda. c) Calcule el desplazamiento transversal de la partícula en $x=0{,}360$ m en $t=0{,}150$ s. d) ¿Cuánto tiempo debe pasar después de $t=0{,}150$ s para que esa partícula vuelva a tener su desplazamiento máximo hacia arriba?

**Solución.**
1. **a)** $f=v/\lambda=8{,}00/0{,}320=$ **25,0 Hz** (15.1); $T=1/f=$ **0,0400 s**; $k=2\pi/\lambda=2\pi/0{,}320=$ **19,6 rad/m** (15.5); y además $\omega=2\pi f=157$ rad/s (lo necesitaremos).
2. **b) Elegir la forma.** Hacia $-x$ ⇒ fase $kx+\omega t$ (15.8, U p. 475): para seguir una cresta (fase constante) al crecer $t$ debe disminuir $x$. ¿Coseno o seno? En $x=0$: $y(0,t)=A\cos\omega t$, que en $t=0$ vale $+A$ (máximo hacia arriba) ✓. Por tanto
$$y(x,t)=(0{,}0700\ \text{m})\cos[(19{,}6\ \text{rad/m})x+(157\ \text{rad/s})t]=A\cos 2\pi\left(\frac{x}{0{,}320\ \text{m}}+\frac{t}{0{,}0400\ \text{s}}\right).$$
3. **c)** La forma con $\lambda$ y $T$ evita redondeos: fase $=2\pi(0{,}360/0{,}320+0{,}150/0{,}0400)=2\pi(1{,}125+3{,}75)=2\pi(4{,}875)$. Como el coseno tiene periodo $2\pi$, solo importa la parte fraccionaria: $\cos(2\pi\cdot0{,}875)=\cos 315°=0{,}707$ ⇒ $y=$ **+0,0495 m = 4,95 cm**.
4. **d) ¿Sube o baja?** $v_y=\partial y/\partial t=-A\omega\sin(\text{fase})=-(0{,}07)(157)\sin315°=+7{,}78$ m/s > 0: está **subiendo** hacia el máximo.
5. El máximo ($y=A$) exige fase $=2\pi n$: $x/\lambda+t/T=n$ ⇒ $t=T(n-1{,}125)$. Para $n=5$: $t=0{,}0400(3{,}875)=0{,}155$ s (el primero posterior a 0,150 s; $n=4$ da 0,115 s, anterior). **$\Delta t=0{,}0050$ s = 5,0 ms**.
6. **Comprobación.** Le faltaba $1-0{,}875=0{,}125$ ciclo ⇒ $\Delta t=T/8=0{,}005$ s ✓ (coherente con estar a $45°$ del máximo, subiendo).

**Receta.** Función de onda: sentido → signo de $\omega t$; condición en $x=0,t=0$ → seno o coseno (o fase inicial); números con $2\pi(x/\lambda\pm t/T)$.
**Error típico.** Usar $kx-\omega t$ para una onda hacia $-x$; o calcular la fase con $k$ y $\omega$ redondeados (el error se amplifica cuando la fase vale varios ciclos).
Teoría: U §15.3 pp. 474–476 (15.4)–(15.9).

---

### E3. Problema 15.15 (U p. 498; Solucionario 15-6) — cuerda tensada por una masa colgante

**Enunciado (traducido de U).** El extremo de una cuerda horizontal se conecta a la punta de un diapasón eléctrico que la hace vibrar transversalmente a 120 Hz. El otro extremo pasa por una polea y sostiene una masa de 1,50 kg. La densidad lineal de masa de la cuerda es 0,0480 kg/m. a) ¿Qué rapidez tiene una onda transversal en la cuerda? b) ¿Cuál es su longitud de onda? c) ¿Cómo cambian a) y b) si la masa aumenta a 3,00 kg?

**Solución.**
1. **Tensión.** La masa cuelga en equilibrio ⇒ la cuerda tira de ella con $F=mg$ (1.ª ley; polea ideal, la tensión es la misma a ambos lados): $F=(1{,}50)(9{,}80)=14{,}7$ N.
2. **a)** $v=\sqrt{F/\mu}=\sqrt{14{,}7/0{,}0480}=$ **17,5 m/s** (15.14, U p. 480).
3. **b)** La frecuencia la impone el diapasón: $\lambda=v/f=17{,}5/120=$ **0,146 m**.
4. **c)** $F=29{,}4$ N (doble) ⇒ $v\propto\sqrt F$ se multiplica por $\sqrt2$: **24,7 m/s**; $f$ sigue siendo 120 Hz ⇒ $\lambda$ también ×$\sqrt2$: **0,206 m**.

**Receta.** Cuerda + polea + masa: $F=mg$ → $v=\sqrt{F/\mu}$ → $\lambda=v/f$ con la $f$ de la fuente.
**Error típico.** Pensar que al doblar la masa se dobla $v$ (solo ×$\sqrt2$), o que cambia $f$.
Teoría: U §15.4 p. 480; §15.2 p. 471.

---

### E4. Problema 15.16 (U p. 498; Solucionario 15-6) — tensión necesaria

**Enunciado (traducido de U).** ¿Con qué tensión debe estirarse una cuerda de 2,50 m de longitud y masa 0,120 kg para que ondas transversales de frecuencia 40,0 Hz tengan una longitud de onda de 0,750 m?

**Solución.**
1. $\mu=m/L=0{,}120/2{,}50=0{,}0480$ kg/m (masa por unidad de longitud, cuerda uniforme).
2. $v=\lambda f=(0{,}750)(40{,}0)=30{,}0$ m/s (15.1).
3. De $v=\sqrt{F/\mu}$ (15.14): $F=\mu v^2=(0{,}0480)(30{,}0)^2=$ **43,2 N**.

**Receta.** «Cinemática» ($v=\lambda f$) + «dinámica» ($v=\sqrt{F/\mu}$) se igualan por $v$.
**Error típico.** Usar la masa total $m$ en lugar de $\mu$.
Teoría: U §15.4 p. 480.

---

### E5. Problema 15.18 (U p. 498; Solucionario 15-7) — leer una función de onda y obtener la tensión

**Enunciado (traducido de U).** Una cuerda de 1,50 m que pesa 0,0125 N está atada al techo por su extremo superior; el inferior sostiene un peso $W$. Desprecie la variación de la tensión a lo largo de la cuerda debida a su propio peso. Al dar un leve pulso, las ondas que suben por ella obedecen $y(x,t)=(8{,}50\ \text{mm})\cos(172\ \text{rad/m}\ x-4830\ \text{rad/s}\ t)$. Suponga que la tensión es constante e igual a $W$. a) ¿Cuánto tarda un pulso en recorrer toda la cuerda? b) ¿Cuál es el peso $W$? c) ¿Cuántas longitudes de onda hay en la cuerda en cualquier instante? d) ¿Cuál es la ecuación de las ondas que bajan por la cuerda?

**Solución.**
1. **Lectura.** Comparando con $A\cos(kx-\omega t)$ (15.7): $A=8{,}50$ mm, $k=172$ rad/m, $\omega=4830$ rad/s. Como la onda «sube» y es de la forma $kx-\omega t$ (hacia $+x$), el eje $x$ apunta **hacia arriba**.
2. **a)** $v=\omega/k=4830/172=28{,}1$ m/s (15.6). $t=L/v=1{,}50/28{,}08=$ **0,0534 s = 53,4 ms**.
3. **b)** Masa de la cuerda $m=0{,}0125/9{,}80=1{,}28\times10^{-3}$ kg ⇒ $\mu=m/L=8{,}50\times10^{-4}$ kg/m. Tensión $F=W$ y $v=\sqrt{F/\mu}$ ⇒ $W=\mu v^2=(8{,}50\times10^{-4})(28{,}08)^2=$ **0,670 N**.
4. **Comprobación de la hipótesis.** $W=0{,}670$ N ≫ peso de la cuerda 0,0125 N (≈2 %): despreciar el peso propio es razonable.
5. **c)** $\lambda=2\pi/k=0{,}0365$ m ⇒ $N=L/\lambda=1{,}50/0{,}0365=$ **41,1 longitudes de onda**.
6. **d)** Misma $A$, $k$, $\omega$ (mismo medio y misma fuente), sentido $-x$ (hacia abajo) ⇒ $y=(8{,}50\ \text{mm})\cos(172x+4830t)$ (15.8).

**Receta.** De $y=A\cos(kx\mp\omega t)$ se leen $A,k,\omega$; $v=\omega/k$; y con $v=\sqrt{F/\mu}$ se pasa a la dinámica ($F$ o $\mu$).
**Error típico.** Tomar $v=k/\omega$ o confundir $k$ con $\lambda$.
Teoría: U §15.3 pp. 474–475; §15.4 p. 480.

---

### E6. Problema 15.20 (U p. 498; Solucionario 15-7) — cuerda pesada: tensión variable

**Enunciado (traducido de U).** Una cuerda pesada de 6,00 m de longitud pesa 29,4 N; uno de sus extremos está fijo al techo y cuelga verticalmente. Del extremo inferior se suspende una masa de 0,500 kg. Calcule la rapidez de las ondas transversales en la cuerda a) en la parte inferior, b) en la parte media y c) en la parte superior. d) ¿La tensión en la parte media es el promedio de las tensiones en las partes superior e inferior? ¿La rapidez de onda en la parte media es el promedio de las rapideces arriba y abajo? Explique.

**Solución.**
1. **Idea clave.** Ahora la cuerda es pesada: en cada punto, la tensión sostiene **la masa colgada más el trozo de cuerda que hay por debajo** de ese punto (DCL del trozo inferior en equilibrio). La tensión aumenta hacia arriba ⇒ $v$ también.
2. $\mu=\dfrac{29{,}4/9{,}80}{6{,}00}=\dfrac{3{,}00}{6{,}00}=0{,}500$ kg/m.
3. **a) Abajo:** solo la masa: $F=(0{,}500)(9{,}80)=4{,}90$ N ⇒ $v=\sqrt{4{,}90/0{,}500}=$ **3,13 m/s**.
4. **b) En medio:** masa + media cuerda: $F=4{,}90+14{,}7=19{,}6$ N ⇒ $v=\sqrt{19{,}6/0{,}5}=$ **6,26 m/s**.
5. **c) Arriba:** masa + cuerda entera: $F=4{,}90+29{,}4=34{,}3$ N ⇒ $v=$ **8,28 m/s**.
6. **d)** $F(y)$ crece **linealmente** con la longitud de cuerda que cuelga ⇒ en el centro $F=(4{,}90+34{,}3)/2=19{,}6$ N: **sí** es el promedio. Pero $v=\sqrt{F/\mu}$ no es lineal en $F$: $(3{,}13+8{,}28)/2=5{,}71$ m/s ≠ 6,26 m/s: **no** (la raíz es cóncava, el valor central supera al promedio).

**Receta.** Cuerda que cuelga con peso propio: $F(\text{punto})=$ peso de todo lo que hay por debajo; luego $v=\sqrt{F/\mu}$ punto a punto.
**Error típico.** Usar la misma tensión en toda la cuerda; o promediar raíces como si fueran lineales.
Teoría: U §15.4 pp. 480–482 (Ej. 15.3); §5.1 (equilibrio).

---

### E7. Problema 15.22 (U p. 498; Solucionario 15-8) — potencia media en una cuerda de piano

**Enunciado (traducido de U).** La cuerda de un piano, de masa 3,00 g y longitud 80,0 cm, se estira con una tensión de 25,0 N. Una onda de frecuencia 120,0 Hz y amplitud 1,6 mm viaja por la cuerda. a) Calcule la potencia media que transporta. b) ¿Qué sucede con la potencia media si la amplitud se reduce a la mitad?

**Solución.**
1. **Por qué hay potencia.** Cada trozo de cuerda tira del siguiente (tensión) y este se mueve transversalmente ⇒ realiza trabajo sobre él: la energía avanza con la onda (U p. 482).
2. $\mu=3{,}00\times10^{-3}/0{,}800=3{,}75\times10^{-3}$ kg/m; $\omega=2\pi(120{,}0)=754$ rad/s.
3. **a)** (15.25, U p. 483): $P_{med}=\tfrac12\sqrt{\mu F}\,\omega^2A^2=\tfrac12\sqrt{(3{,}75\times10^{-3})(25{,}0)}\,(754)^2(1{,}6\times10^{-3})^2=$ **0,22 W** (0,223 W).
4. **b)** $P_{med}\propto A^2$ ⇒ con $A/2$, $P_{med}/4=$ **0,056 W**.

**Receta.** $P_{med}=\tfrac12\sqrt{\mu F}\,\omega^2A^2$: cuadrática en $\omega$ y en $A$.
**Error típico.** Olvidar el ½ (eso es $P_{máx}$, 15.24) o usar $f$ en lugar de $\omega$.
Teoría: U §15.5 pp. 482–483.

---

### E8. Problema 15.25 (U p. 498; Solucionario 15-9) — intensidad y ley del inverso del cuadrado

**Enunciado (traducido de U).** Cuando despega un avión a reacción produce un sonido de intensidad 10,0 W/m² a 30,0 m de distancia. Usted prefiere el sonido tranquilo de una conversación normal, 1,0 μW/m². Suponga que el avión se comporta como una fuente puntual. a) ¿Cuál es la distancia mínima a la pista a la que podría vivir para conservar la paz? b) ¿Qué intensidad percibe un amigo que vive al doble de esa distancia? c) ¿Qué potencia sonora produce el avión al despegar?

**Solución.**
1. **Idea.** Una fuente puntual reparte su potencia $P$ uniformemente sobre esferas de área $4\pi r^2$; sin pérdidas, $P$ atraviesa todas las esferas ⇒ $I=P/4\pi r^2$ y $I_1r_1^2=I_2r_2^2$ (15.26, U p. 484).
2. **a)** $r_2=r_1\sqrt{I_1/I_2}=30{,}0\sqrt{10{,}0/1{,}0\times10^{-6}}=30{,}0\times3162=9{,}5\times10^4$ m ≈ **95 km**.
3. **b)** $r_3=2r_2$ ⇒ $I_3=I_2(r_2/r_3)^2=I_2/4=$ **0,25 μW/m²**.
4. **c)** $P=4\pi r_1^2I_1=4\pi(30{,}0)^2(10{,}0)=$ **1,1 × 10⁵ W**.
5. **Comentario.** 95 km es enorme porque la intensidad cae solo como $1/r^2$; en la realidad la absorción del aire y los obstáculos la reducen mucho antes.

**Receta.** Fuente puntual: $I\propto1/r^2$; razones de distancias = raíz de razones de intensidades.
**Error típico.** Hacer $I\propto1/r$, o tomar $r_2/r_1=I_1/I_2$ sin la raíz.
Teoría: U §15.5 p. 484.

---

### E9. Problema 15.28 (U p. 499; Solucionario 15-9 y 15-10) — todo a partir de $y(x,t)$

**Enunciado (traducido de U).** Un compañero le dice que la función de onda de una onda en una cuerda delgada es $y(x,t)=(2{,}30\ \text{mm})\cos[(6{,}98\ \text{rad/m})x+(742\ \text{rad/s})t]$. Usted mide que la cuerda tiene 1,35 m de longitud y 0,00338 kg de masa. Determine: a) amplitud, b) frecuencia, c) longitud de onda, d) rapidez de la onda, e) dirección en que viaja, f) tensión de la cuerda y g) potencia media transmitida.

**Solución.**
1. Comparando con $A\cos(kx+\omega t)$: **a)** $A=$ **2,30 mm**; $k=6{,}98$ rad/m; $\omega=742$ rad/s.
2. **b)** $f=\omega/2\pi=$ **118 Hz**. **c)** $\lambda=2\pi/k=$ **0,900 m**. **d)** $v=\omega/k=$ **106 m/s** (o $\lambda f$, igual).
3. **e)** Fase $kx+\omega t$ ⇒ viaja hacia **$-x$** (15.8).
4. **f)** $\mu=0{,}00338/1{,}35=2{,}50\times10^{-3}$ kg/m ⇒ $F=\mu v^2=(2{,}50\times10^{-3})(106{,}3)^2=$ **28,3 N**.
5. **g)** $P_{med}=\tfrac12\sqrt{\mu F}\,\omega^2A^2=\tfrac12\sqrt{(2{,}504\times10^{-3})(28{,}3)}\,(742)^2(2{,}30\times10^{-3})^2=$ **0,388 W** ≈ 0,39 W.

**Receta.** Lectura de $y(x,t)$ ⇒ $A,k,\omega$ ⇒ $f,\lambda,v$ ⇒ (con $\mu$) $F$ ⇒ $P_{med}$.
**Error típico.** Leer $f=742$ Hz (es $\omega$).
Teoría: U §15.3 p. 475; §15.4 p. 480; §15.5 p. 483.

---

### E10. Problema 15.48 (U p. 500; Solucionario 15-17) — onda con $\pi$ factorizado

**Enunciado (traducido de U).** El desplazamiento transversal de una onda en una cuerda está dado por $y(x,t)=(0{,}750\ \text{cm})\cos\pi[(0{,}400\ \text{cm}^{-1})x+(250\ \text{s}^{-1})t]$. a) Calcule la amplitud, el periodo, la frecuencia, la longitud de onda y la rapidez de propagación. b) Dibuje la forma de la cuerda en $t=0$, $0{,}0005$ s y $0{,}0010$ s. c) ¿La onda viaja hacia $+x$ o $-x$? d) La masa por unidad de longitud es 0,0500 kg/m. Calcule la tensión. e) Determine la potencia media.

**Solución.**
1. **Meter el $\pi$ dentro**: $k=0{,}400\pi$ rad/cm $=40{,}0\pi$ rad/m; $\omega=250\pi$ rad/s $=785$ rad/s.
2. **a)** $A=$ **0,750 cm**; $\lambda=2\pi/k=2/0{,}400=$ **5,00 cm**; $f=\omega/2\pi=$ **125 Hz**; $T=$ **8,00 ms**; $v=\lambda f=$ **6,25 m/s**.
3. **b)** En $t=0$: $y=0{,}750\cos(0{,}400\pi x)$, cresta en $x=0$ y en $x=5{,}00$ cm, valle en 2,50 cm. Cada 0,0005 s la forma se desplaza $v\Delta t=0{,}3125$ cm **hacia $-x$** (sin cambiar de forma): crestas en $x=-0{,}3125$ cm (≡ 4,69 cm) en $t=0{,}0005$ s y en $x=-0{,}625$ cm (≡ 4,38 cm) en $t=0{,}0010$ s. Valores: $y(0)=0{,}750;\ 0{,}693;\ 0{,}530$ cm.
4. **c)** Fase $kx+\omega t$: para mantener la fase constante, al crecer $t$ disminuye $x$ ⇒ **$-x$** (lo confirma b).
5. **d)** $F=\mu v^2=(0{,}0500)(6{,}25)^2=$ **1,95 N**.
6. **e)** $P_{med}=\tfrac12\sqrt{(0{,}0500)(1{,}953)}\,(785{,}4)^2(7{,}50\times10^{-3})^2=$ **5,42 W**.

**Receta.** Si la fase viene como $\pi[\dots]$ o $2\pi[\dots]$, multiplicar antes de leer $k$ y $\omega$; trabajar en SI para $F$ y $P$.
**Error típico.** Leer $k=0{,}400$ (olvidando el $\pi$) ⇒ $\lambda$ y $v$ falsas por un factor $\pi$.
Teoría: U §15.3 pp. 474–475; §15.4–15.5 pp. 480, 483.

---

### E11. Problema 15.32 (U p. 499; Solucionario 15-10) — superposición de pulsos triangulares

**Enunciado (traducido de U).** Dos pulsos triangulares idénticos viajan uno hacia el otro por una cuerda estirada, como en la figura E15.32 (cada uno: altura 1,00 cm, subida 1,00 cm y bajada 1,00 cm, es decir base 2,00 cm), con rapidez 2,00 cm/s. Los bordes delanteros están separados 1,00 cm en $t=0$. Dibuje la forma de la cuerda en $t=0{,}250$, $0{,}500$, $0{,}750$, $1{,}000$ y $1{,}250$ s.

**Solución.** (Ejes: $x$ en cm; pulso izquierdo con vértice en $x=-1$, base $[-2,0]$, hacia $+x$; pulso derecho con vértice en $x=2$, base $[1,3]$, hacia $-x$. El punto medio es $x=0{,}5$.)
1. **Principio de superposición** (15.27, U p. 486): cada pulso avanza como si el otro no existiera y el desplazamiento de la cuerda es la **suma algebraica**. En cada instante el pulso izquierdo ocupa $[-2+2t,\,2t]$ y el derecho $[1-2t,\,3-2t]$.
2. **$t=0{,}250$ s.** Cada uno avanzó 0,50 cm: bases $[-1{,}5;0{,}5]$ y $[0{,}5;2{,}5]$: **se tocan** en $x=0{,}5$; aún no se solapan ⇒ dos triángulos que comparten un punto.
3. **$t=0{,}500$ s.** Bases $[-1;1]$ y $[0;2]$, solape $[0;1]$: ahí el izquierdo **baja** ($y=1-x$) y el derecho **sube** ($y=x$) ⇒ suma $=1$ cm constante. Forma: **trapecio** (sube de $x=-1$ a 0, meseta de 1,00 cm entre 0 y 1, baja de 1 a 2).
4. **$t=0{,}750$ s.** Ambos sobre $[-0{,}5;1{,}5]$, vértices coincidentes en $x=0{,}5$ ⇒ **triángulo de altura 2,00 cm** y base 2,00 cm (interferencia constructiva total).
5. **$t=1{,}000$ s.** Simétrico de $t=0{,}5$: de nuevo el trapecio de altura 1,00 cm sobre $[-1;2]$.
6. **$t=1{,}250$ s.** Bases $[0{,}5;2{,}5]$ (el que iba a la derecha) y $[-1{,}5;0{,}5]$ (el que iba a la izquierda): se tocan en $x=0{,}5$ y se separan; **cada pulso conserva su forma original** tras cruzarse. (Tabla de valores comprobada numéricamente cada 0,25 cm.)

**Receta.** Superposición: desplazar cada pulso $vt$ en su sentido, sin deformarlo, y sumar punto a punto (las zonas de pendientes opuestas se compensan; las iguales se suman).
**Error típico.** Pensar que los pulsos «rebotan» o se destruyen al chocar.
**Figura SVG sugerida.** Cinco franjas horizontales ($t=0{,}25\dots1{,}25$ s) con el eje $x$ de $-2$ a 3 cm, pulsos individuales a trazos y suma en trazo grueso; altura 2,00 cm marcada en $t=0{,}75$ s.
Teoría: U §15.6 pp. 485–486.

---

### E12. Problema 15.36 (U p. 499; Solucionario 15-13) — de una onda estacionaria a sus ondas viajeras

**Enunciado (traducido de U).** Los antinodos adyacentes de una onda estacionaria en una cuerda están separados 15,0 cm. Una partícula en un antinodo oscila con MAS de amplitud 0,850 cm y periodo 0,0750 s. La cuerda está en el eje $+x$, fija en $x=0$. a) ¿Qué separación hay entre nodos adyacentes? b) ¿Cuáles son la longitud de onda, la amplitud y la rapidez de las dos ondas viajeras que forman el patrón? c) Calcule las rapideces transversales máxima y mínima de un punto en un antinodo. d) ¿Cuál es la distancia mínima entre un nodo y un antinodo?

**Solución.**
1. **a)** Nodos y antinodos alternan, ambos separados $\lambda/2$ (15.29) ⇒ nodos adyacentes: **15,0 cm**.
2. **b)** $\lambda/2=15{,}0$ cm ⇒ $\lambda=$ **30,0 cm** (la estacionaria y las viajeras tienen la misma $k$ y $\omega$). La amplitud en el antinodo es $A_{OE}=2A$ (15.28) ⇒ $A=0{,}850/2=$ **0,425 cm**. $v=\lambda/T=0{,}300/0{,}0750=$ **4,00 m/s**.
3. **c)** En el antinodo $y=A_{OE}\sin\omega t$ (MAS) ⇒ $v_y=A_{OE}\omega\cos\omega t$; $\omega=2\pi/T=83{,}8$ rad/s ⇒ $v_{y,máx}=A_{OE}\omega=(0{,}00850)(83{,}8)=$ **0,712 m/s** (al pasar por $y=0$) y $v_{y,mín}=$ **0** (en los extremos de su oscilación).
4. **d)** Nodo–antinodo más cercano: $\lambda/4=$ **7,50 cm**.

**Receta.** Onda estacionaria: distancia N–N = A–A = $\lambda/2$; N–A = $\lambda/4$; $A_{viajera}=A_{OE}/2$; cada punto es un MAS de amplitud $A_{OE}|\sin kx|$.
**Error típico.** Tomar $\lambda=15$ cm o $A=0{,}850$ cm para las ondas viajeras; confundir la rapidez de onda (4,00 m/s) con la transversal (0,712 m/s).
Teoría: U §15.7 pp. 489–490; §14.3 p. 443.

---

### E13. Problema 15.40 (U p. 500; Solucionario 15-14) — fundamental y armónico audible más alto

**Enunciado (traducido de U).** Un afinador estira la cuerda de acero de un piano con una tensión de 800 N. La cuerda mide 0,400 m y tiene una masa de 3,00 g. a) Calcule la frecuencia de su modo fundamental. b) Determine el número del armónico más alto que podría oír una persona que percibe hasta 10 000 Hz.

**Solución.**
1. **a)** $\mu=m/L=7{,}50\times10^{-3}$ kg/m ⇒ $v=\sqrt{F/\mu}=\sqrt{FL/m}=\sqrt{800\cdot0{,}400/0{,}00300}=327$ m/s. Fundamental: $\lambda_1=2L$ ⇒ $f_1=v/2L=326{,}6/0{,}800=$ **408 Hz** (15.35).
2. **b)** $f_n=nf_1\le10\,000$ ⇒ $n\le10\,000/408{,}2=24{,}5$ ⇒ **$n=24$** ($f_{24}=9{,}80$ kHz; $f_{25}=10{,}2$ kHz ya no se oye). El sonido emitido tiene las mismas frecuencias que la cuerda.

**Receta.** $f_1=\frac1{2L}\sqrt{F/\mu}$; armónico máximo = parte entera de $f_{lím}/f_1$.
**Error típico.** Redondear $n$ hacia arriba (25).
Teoría: U §15.8 pp. 491–493.

---

### E14. Problema 15.44 (U p. 500; Solucionario 15-15 y 15-16) — segundo sobretono y sonido en el aire

**Enunciado (traducido de U).** La cuerda de un instrumento musical mide 75,0 cm y tiene una masa de 8,75 g. Se usa en una habitación donde la rapidez del sonido es 344 m/s. a) ¿A qué tensión debe ajustarse para que, al vibrar en su segundo sobretono, produzca un sonido de longitud de onda 0,765 m? (Suponga que no se rebasa el esfuerzo de rotura.) b) ¿Qué frecuencia de sonido produce en su modo fundamental?

**Solución.**
1. **Puente entre cuerda y aire: la frecuencia.** La cuerda empuja el aire al mismo ritmo ⇒ $f_{sonido}=f_{cuerda}$; las longitudes de onda **no** coinciden (rapideces distintas).
2. $f=v_{aire}/\lambda_{aire}=344/0{,}765=449{,}7$ Hz.
3. **Segundo sobretono = tercer armónico** ($n=3$, U p. 491): $\lambda_3=2L/3=0{,}500$ m en la cuerda.
4. $v_{cuerda}=f\lambda_3=(449{,}7)(0{,}500)=224{,}8$ m/s.
5. **a)** $\mu=8{,}75\times10^{-3}/0{,}750=1{,}167\times10^{-2}$ kg/m ⇒ $F=\mu v^2=$ **590 N**.
6. **b)** $f_1=f_3/3=$ **150 Hz**.

**Receta.** Cuerda que suena: $f$ es común; $\lambda$ en la cuerda la da $2L/n$ y en el aire $v_{aire}/f$.
**Error típico.** Tomar $n=2$ para el «segundo sobretono»; usar 0,765 m como longitud de onda en la cuerda.
Teoría: U §15.8 pp. 491–493.

---

### E15. Problema 15.45 (U p. 500; Solucionario 15-16) — dónde pisar la cuerda

**Enunciado (traducido de U).** La parte de una cuerda de un instrumento entre el puente y el extremo superior del diapasón (la que vibra libremente) mide 60,0 cm y tiene masa 2,00 g. Al tocarla produce un la (A4, 440 Hz). a) ¿A qué distancia $x$ del puente debe la intérprete poner un dedo para tocar un re (D5, 587 Hz)? (Fig. E15.45.) En ambos casos la cuerda vibra en su modo fundamental. b) Sin volver a afinar, ¿es posible tocar un sol (G4, 392 Hz) en esta cuerda? ¿Por qué?

**Solución.**
1. **Lo que no cambia.** El dedo solo acorta la parte que vibra; $F$ y $\mu$ son las mismas ⇒ **$v$ es la misma**.
2. Con $L=0{,}600$ m, fundamental $\lambda=2L=1{,}20$ m ⇒ $v=f\lambda=(440)(1{,}20)=528$ m/s.
3. **a)** Para 587 Hz: $\lambda=528/587=0{,}900$ m ⇒ $L'=\lambda/2=0{,}450$ m. La parte vibrante va del puente al dedo ⇒ **$x=45{,}0$ cm**.
4. **b)** Para 392 Hz: $L''=v/2f=528/(2\cdot392)=0{,}673$ m > 0,600 m. El dedo solo puede **acortar** la cuerda (subir $f$); bajar de 440 Hz exigiría alargarla ⇒ **no es posible**.
5. Equivalente rápido: $f_1\propto1/L$ ⇒ $L'=L\cdot440/587=0{,}450$ m.

**Receta.** Misma cuerda, misma tensión ⇒ misma $v$ ⇒ $f_1L=$ cte.
**Error típico.** Medir $x$ desde el otro extremo o creer que la masa de 2,00 g hace falta (no hace falta: basta $v$).
Teoría: U §15.8 p. 493.

---

### E16. Problema 15.47 (U p. 500; Solucionario 15-16 y 15-17) — cuerda de guitarra

**Enunciado (traducido de U).** Una de las cuerdas de 63,5 cm de una guitarra se afina para producir la nota si (B3, 245 Hz) vibrando en su modo fundamental. a) Calcule la rapidez de las ondas transversales en la cuerda. b) Si la tensión aumenta un 1,0 %, ¿cuál será la nueva frecuencia fundamental? c) Si la rapidez del sonido en el aire es 344 m/s, calcule la frecuencia y la longitud de onda de la onda sonora producida por la cuerda en el si (B3). Compárelas con las de la onda estacionaria en la cuerda.

**Solución.**
1. **a)** $f_1=v/2L$ ⇒ $v=2Lf_1=2(0{,}635)(245)=$ **311 m/s**.
2. **b)** $f_1\propto v\propto\sqrt F$ ⇒ $f_1'=245\sqrt{1{,}010}=$ **246 Hz** (246,2: un 1 % más de tensión sube $f$ solo ≈0,5 %).
3. **c)** Frecuencia del sonido = **245 Hz**; $\lambda_{aire}=344/245=$ **1,40 m**. En la cuerda: misma $f$ y $\lambda_1=2L=1{,}27$ m. Las $\lambda$ difieren en la razón de rapideces ($344/311$).

**Receta.** Cambios pequeños: $\Delta f/f\approx\tfrac12\,\Delta F/F$.
**Error típico.** Responder 245 × 1,01 = 247 Hz (proporcionalidad lineal con $F$).
Teoría: U §15.8 p. 493 (15.35).

---

### E17. Problema 15.58 (U pp. 501–502; Solucionario 15-21) — dos armónicos consecutivos

**Enunciado (traducido de U).** Una cuerda de 0,800 m con $\mu=7{,}50$ g/m se estira entre dos soportes con tensión $F$ y presenta una onda estacionaria (no la fundamental) de 624 Hz. Con la misma tensión, la siguiente onda estacionaria más alta tiene 780 Hz. a) Determine la frecuencia y la longitud de onda de la fundamental. b) Calcule $F$.

**Solución.**
1. **Idea.** Todas las frecuencias de onda estacionaria son $f_n=nf_1$ (15.33). Dos consecutivas son $nf_1$ y $(n+1)f_1$.
2. **a)** Restando: $f_1=780-624=$ **156 Hz**. (Equivalente: $(n+1)/n=780/624=1{,}25$ ⇒ $n=4$; $f_1=624/4=156$ Hz ✓; y en efecto 624 no es la fundamental, como dice el enunciado.) $\lambda_1=2L=$ **1,60 m**.
3. **b)** $v=f_1\lambda_1=249{,}6$ m/s ⇒ $F=\mu v^2=(7{,}50\times10^{-3})(249{,}6)^2=$ **467 N**.

**Receta.** Frecuencias consecutivas ⇒ su diferencia es $f_1$; el cociente da $n$.
**Error típico.** Suponer que 624 Hz es la fundamental o el 2.º armónico.
Teoría: U §15.8 pp. 491–493.

---

### E18. Problema 15.66 (U p. 502; Solucionario 15-23) — amplitud a partir de la rapidez transversal

**Enunciado (traducido de U).** Una cuerda fuerte de masa 3,00 g y longitud 2,20 m se fija a soportes en ambos extremos y vibra en su modo fundamental. La rapidez transversal máxima de un punto a la mitad de la cuerda es 9,00 m/s. La tensión es 330 N. a) ¿Cuál es la amplitud de la onda estacionaria en su antinodo? b) ¿Cuál es la magnitud de la aceleración transversal máxima de un punto en el antinodo?

**Solución.**
1. **Dos rapideces distintas.** $v=\sqrt{F/\mu}$ es la rapidez **de la onda** (constante); 9,00 m/s es la rapidez **de un punto** de la cuerda, que hace un MAS.
2. $\mu=0{,}00300/2{,}20=1{,}364\times10^{-3}$ kg/m ⇒ $v=\sqrt{330/1{,}364\times10^{-3}}=492$ m/s.
3. Fundamental: $\lambda_1=2L=4{,}40$ m ⇒ $f_1=v/2L=111{,}8$ Hz ⇒ $\omega=2\pi f_1=702$ rad/s.
4. El punto medio es el **antinodo** del fundamental ⇒ hace un MAS de amplitud $A_{OE}$ con $v_{máx}=\omega A_{OE}$ (14.23).
5. **a)** $A_{OE}=v_{máx}/\omega=9{,}00/702{,}5=$ **1,28 cm**.
6. **b)** $a_{máx}=\omega^2A_{OE}=\omega\,v_{máx}=(702{,}5)(9{,}00)=$ **6,32 × 10³ m/s²** (≈ 645 $g$: por eso podemos despreciar la gravedad en la cuerda).

**Receta.** Punto de una onda estacionaria = MAS: $v_{máx}=\omega A_{local}$, $a_{máx}=\omega^2A_{local}$, con $\omega$ del modo ($f_n=nv/2L$).
**Error típico.** Igualar 9,00 m/s a la rapidez de la onda.
Teoría: U §15.8 pp. 491–493; §14.2–14.3 pp. 440, 443.

---

### E19. Problema práctico (U p. 496) — ondas en una cuerda que gira

**Enunciado (traducido de U).** Una cuerda uniforme de longitud $L$ y masa $m$ se sujeta por un extremo y se hace girar en un círculo horizontal con velocidad angular $\omega$. Desprecie la gravedad. a) En un punto a distancia $r$ del extremo fijo, ¿cuál es la tensión $F$? b) ¿Cuál es la rapidez de las ondas transversales en ese punto? c) Calcule el tiempo que tarda una onda transversal en ir de un extremo de la cuerda al otro. (Esta $\omega$ es la de giro de la cuerda, no la de la onda.)

**Solución.**
1. **Qué esperar** (pasos 1–2 de la guía de U). La tensión en $r$ debe proporcionar la fuerza centrípeta de **todo lo que hay más afuera**; cuanto más cerca del eje, más masa hay fuera ⇒ $F$ máxima en $r=0$ y nula en el extremo libre $r=L$. Igual para $v=\sqrt{F/\mu}$.
2. **DCL del trozo exterior** (de $r$ a $L$). Única fuerza horizontal: la tensión $F(r)$, dirigida hacia el eje. Su masa: $m\,(L-r)/L$. Gira en bloque con $\omega$; la 2.ª ley para un sistema (U §8.5) aplicada al centro de masa, que está en $(L+r)/2$, con aceleración centrípeta $\omega^2r_{cm}$ (U §5.4, §9.3):
$$F(r)=\frac{m(L-r)}{L}\,\omega^2\frac{L+r}{2}=\boxed{\frac{m\omega^2}{2L}\,(L^2-r^2)}$$
Comprobación: $F(L)=0$ ✓; $F(0)=m\omega^2L/2$ (toda la masa con su cm en $L/2$) ✓.
3. **Comprobación con un elemento** (paso 10 de U). Trozo $dr$ de masa $dm=(m/L)dr$: $F(r)-F(r+dr)=dm\,\omega^2r$ ⇒ $dF/dr=-\dfrac mL\omega^2r$ ⇒ integrando con $F(L)=0$ sale la misma expresión (comprobado con sympy).
4. **b)** $\mu=m/L$ ⇒ $v(r)=\sqrt{F/\mu}=\boxed{\omega\sqrt{\dfrac{L^2-r^2}{2}}}$ (15.14). No depende de $m$ (como en el péndulo, la masa se cancela). Máxima en el eje, $\omega L/\sqrt2$, nula en el extremo.
5. **c)** $v=dr/dt$ ⇒ $dt=dr/v$. Como $v$ cambia de punto a punto, se suma (integra):
$$t=\int_0^L\frac{dr}{\omega\sqrt{(L^2-r^2)/2}}=\frac{\sqrt2}{\omega}\int_0^L\frac{dr}{\sqrt{L^2-r^2}}=\frac{\sqrt2}{\omega}\Big[\arcsin\frac rL\Big]_0^L=\frac{\sqrt2}{\omega}\cdot\frac\pi2=\boxed{\frac{\pi}{\sqrt2\,\omega}}$$
(integral del apéndice B de U; comprobada con sympy). La integral converge aunque $v\to0$ en $r=L$.
6. **Evaluación.** Unidades: $[\omega]^{-1}$ = s ✓. Notable: $t$ **no depende de $L$** ni de $m$: una cuerda más larga es también más rápida (mayor tensión) en la misma proporción. Ejemplo: a 2 vueltas/s, $\omega=12{,}6$ rad/s ⇒ $t=0{,}177$ s.

**Receta.** Tensión variable: DCL del trozo «más allá» del punto ⇒ $F(r)$ ⇒ $v(r)=\sqrt{F(r)/\mu}$ ⇒ $t=\int dr/v(r)$.
**Error típico.** Usar $t=L/v$ con una sola $v$; o poner toda la masa en el extremo ($F=m\omega^2L$).
Teoría: U §5.4 pp. 150–151 (dinámica circular); §8.5 pp. 254–255 (centro de masa); §15.4 p. 480 (15.14).

---

## Tabla de verificación (sympy)

| Ejercicio | Resultado verificado |
|---|---|
| 15.1 | $\lambda=0{,}43878$ m; $T=1{,}2755$ ms; $\lambda'=0{,}21939$ m |
| 15.7 | $f=25$ Hz, $T=0{,}04$ s, $k=19{,}635$ rad/m, $\omega=157{,}08$ rad/s; $y=0{,}049497$ m; $v_y=+7{,}775$ m/s; $\Delta t=0{,}00500$ s |
| 15.15 | $F=14{,}7$ N, $v=17{,}500$ m/s, $\lambda=0{,}14583$ m; con 3 kg: $24{,}749$ m/s, $0{,}20624$ m |
| 15.16 | $F=43{,}200$ N |
| 15.18 | $v=28{,}081$ m/s; $t=0{,}053416$ s; $W=0{,}67055$ N; $N=41{,}062$ |
| 15.20 | $v=3{,}1305;\ 6{,}2610;\ 8{,}2825$ m/s; promedio de $v$ = 5,7065 m/s |
| 15.22 | $P_{med}=0{,}22280$ W; con $A/2$: $0{,}055700$ W |
| 15.25 | $r_2=94\,868$ m; $I_3=0{,}25$ μW/m²; $P=1{,}1310\times10^5$ W |
| 15.28 | $f=118{,}09$ Hz; $\lambda=0{,}90017$ m; $v=106{,}30$ m/s; $F=28{,}293$ N; $P_{med}=0{,}38758$ W |
| 15.48 | $\lambda=5{,}00$ cm; $f=125$ Hz; $T=8{,}00$ ms; $v=6{,}25$ m/s; $F=1{,}9531$ N; $P_{med}=5{,}4215$ W; desplazamiento 3,125 mm por 0,5 ms |
| 15.32 | tabla de superposición cada 0,25 cm: máximo 2,00 cm en $t=0{,}75$ s; meseta 1,00 cm en 0,5 y 1,0 s |
| 15.36 | $v=4{,}00$ m/s; $\omega=83{,}776$ rad/s; $v_{y,máx}=0{,}71209$ m/s |
| 15.40 | $v=326{,}60$ m/s; $f_1=408{,}25$ Hz; $10\,000/f_1=24{,}495$ ⇒ $n=24$ |
| 15.44 | $f=449{,}67$ Hz; $v=224{,}84$ m/s; $F=589{,}77$ N; $f_1=149{,}89$ Hz |
| 15.45 | $v=528$ m/s; $L_{D5}=0{,}44974$ m; $L_{G4}=0{,}67347$ m |
| 15.47 | $v=311{,}15$ m/s; $f'=246{,}22$ Hz; $\lambda_{aire}=1{,}4041$ m; $\lambda_{cuerda}=1{,}27$ m |
| 15.58 | $n=4$; $f_1=156$ Hz; $F=467{,}25$ N |
| 15.66 | $v=491{,}94$ m/s; $f_1=111{,}80$ Hz; $A_{OE}=0{,}012812$ m; $a_{máx}=6322{,}3$ m/s² (645 $g$) |
| Probl. práctico | $F=m\omega^2(L^2-r^2)/2L$ (y $dF/dr+\mu\omega^2r=0$ ✓); $v=\omega\sqrt{(L^2-r^2)/2}$; $\int_0^L dr/\sqrt{L^2-r^2}=\pi/2$ ⇒ $t=\pi/(\sqrt2\,\omega)$ |
| Desarrollo X1 | $-A\cos(kx+\omega t)+A\cos(kx-\omega t)=2A\sin kx\sin\omega t$ (identidad comprobada) |
