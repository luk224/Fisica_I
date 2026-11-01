# Soluciones Tema 13 — Gravitación

Material para el redactor del tema 13. No hay `dossier_tema13.md`: este fichero incluye al principio el **mapa de U** (secciones, ecuaciones, ejemplos y datos), verificado página a página en `sears.txt` (PDF 426–451 = impresas 398–423) y en la imagen del PDF cuando el texto extraído era dudoso (figura E13.6, PDF 453). Los enunciados de los exámenes se han leído **en la imagen** de los PDF (22F1, 23F2, 24F1, 24F2 y los recopilatorios, págs. 15-16, 20-21 y 5, 11). Las soluciones de E vienen de `solman.txt` (la página 13-N del solucionario está en el PDF 440+N); cada etiqueta 13.N se ha asignado comparando el contenido con el enunciado de U (en `solman.txt` el rótulo «13.N.» aparece a veces unas líneas antes o después de su solución). Todos los números se han comprobado con Python/sympy (scripts propios, un bloque por ejercicio). Los problemas E están traducidos y ampliados, no copiados.

Convenciones: «U p. NN» = página impresa del Sears-Zemansky. Datos de U (si el enunciado no da otros): $G=6{,}67\times10^{-11}\ \text{N·m}^2/\text{kg}^2$ (U p. 400), $m_T=5{,}97\times10^{24}$ kg, $R_T=6{,}37\times10^{6}$ m, $m_S=1{,}99\times10^{30}$ kg, $c=3{,}00\times10^8$ m/s, 1 año $=3{,}156\times10^7$ s, datos de planetas del **Apéndice G, p. A-8** (masa, radio, radio y periodo de la órbita). En los exámenes se usa el $G$ que da el enunciado (Feb 2024: $6{,}672\times10^{-11}$). $r$ = distancia **al centro** del cuerpo atractor; $h$ = altura sobre la superficie ($r=R+h$).

---

## 0. Mapa de U, capítulo 13 (verificado en `sears.txt`)

### 0.1 Secciones (páginas impresas)

| Sección | Título en U | Páginas | Contenido clave |
|---|---|---|---|
| Portadilla | 13 Gravitación (objetivos, «repase lo estudiado») | 398 | Remite a 3.3, 4.4, 5.2, 5.4, 5.5, 7.1, 7.4 |
| §13.1 | Ley de Newton de la gravitación | 398–402 | Enunciado (p. 398), ec. 13.1 y fig. 13.1 (p. 399), «CUIDADO: no confunda $g$ con $G$» (p. 399), cuerpos esféricos ec. 13.2 (p. 399), dentro de la Tierra la fuerza disminuye (p. 400), balanza de Cavendish y valor de $G$ (p. 400), superposición (p. 400), por qué importa la gravitación (p. 402) |
| §13.2 | Peso | 402–404 | Peso = fuerza gravitacional total (p. 402); ecs. 13.3–13.5, masa de la Tierra $gR_T^2/G=5{,}96\times10^{24}$ kg, fig. 13.8 (p. 403); densidad media 5500 kg/m³ y fig. 13.9 (p. 404) |
| §13.3 | Energía potencial gravitacional | 405–407 | Trabajo radial ecs. 13.6–13.8, $U=-Gm_Tm/r$ ec. 13.9, fig. 13.11 (p. 405); «CUIDADO: fuerza contra energía potencial» y Ej. 13.5 (p. 406); límite $U=mgy$ cerca de la superficie (pp. 406–407) |
| §13.4 | Movimiento de satélites | 407–410 | Fig. 13.14 de Newton (p. 407); órbita circular ec. 13.10, ingravidez aparente, ec. 13.11 (p. 408); ec. 13.12, $v_{esc}=\sqrt2\,v_{circ}$, ec. 13.13 (p. 409); Ej. 13.6 (p. 410) |
| §13.5 | Las leyes de Kepler y el movimiento de los planetas | 410–414 | Tres leyes y elipse, fig. 13.18 (p. 411); 2.ª ley ecs. 13.14–13.15 (p. 411), 13.16 y momento angular (p. 412); 3.ª ley ec. 13.17 (p. 412); Ejs. 13.7 (p. 412), 13.8 y 13.9 (p. 413); centro de masa estrella-planeta (p. 414) |
| §13.6 | Distribuciones esféricas de masa | 414–417 | Cascarón y masa exterior ecs. 13.18–13.24 (pp. 414–415); entre distribuciones esféricas (p. 416); masa dentro de un cascarón ecs. 13.25–13.26, regla «solo cuenta la masa interior» (p. 416); Ej. 13.10 (pp. 416–417) |
| §13.7 | Peso aparente y rotación terrestre | 417–419 | Fig. 13.26 (p. 417); ecs. 13.27 y 13.28, $v=465$ m/s y $v^2/R_T=0{,}0339$ m/s² con el día sidéreo 86 164 s, tabla 13.1 (p. 418) |
| §13.8 | Agujeros negros | 419–422 | Densidad media del Sol, ec. 13.29 (p. 419); radio de Schwarzschild ec. 13.30, horizonte de eventos (p. 420); Ej. 13.11 (p. 421); Sgr A* con la 3.ª ley de Kepler (p. 422) |
| Resumen | Capítulo 13 resumen | 423 | |
| Problema práctico | Rapideces en una órbita elíptica (Halley) | 424 | |
| Preguntas | P13.1–P13.21 | 424–425 | P13.2, P13.5, P13.10, P13.11, P13.13, P13.15 y P13.20 son, casi palabra por palabra, las cuestiones de examen de la Parte A |
| Ejercicios | 13.1–13.40 | 425–427 | Figura E13.6 en p. 425 |
| Problemas | 13.41–13.84 | 427–431 | |
| Respuestas impares | «Capítulo 13» | A-12 | 13.11: $1{,}38\times10^7$ m; 13.13: 0,37 m/s², 1700 kg/m³; 13.17: 5030 y 60 200 m/s; 13.19: 9,03 m/s²; 13.21: 7410 m/s, 1,71 h; 13.29: $7{,}84\times10^9$ s = 248 años; 13.49: $3{,}59\times10^7$ m; 13.71: 9,34 m/s² |
| Apéndice G | Datos astronómicos y prefijos | A-8 | Sol, Luna, planetas y Plutón: masa, radio, radio y periodo de la órbita |

### 0.2 Ecuaciones (página impresa donde aparecen)

| Ec. | Contenido | p. |
|---|---|---|
| 13.1 | $F_g=\dfrac{Gm_1m_2}{r^2}$ (ley de la gravitación) | 399 |
| 13.2 | $F_g=\dfrac{Gm_Tm}{r^2}$ (Tierra esférica, cuerpo exterior) | 399 |
| 13.3 | $w=F_g=\dfrac{Gm_Tm}{R_T^2}$ (peso en la superficie) | 403 |
| 13.4 | $g=\dfrac{Gm_T}{R_T^2}$ | 403 |
| 13.5 | $w=\dfrac{Gm_Tm}{r^2}$ (por encima de la superficie) | 403 |
| 13.6 | $W_{grav}=\int_{r_1}^{r_2}F_r\,dr$ | 405 |
| 13.7 | $F_r=-\dfrac{Gm_Tm}{r^2}$ | 405 |
| 13.8 | $W_{grav}=\dfrac{Gm_Tm}{r_2}-\dfrac{Gm_Tm}{r_1}$ | 405 |
| 13.9 | $U=-\dfrac{Gm_Tm}{r}$ (expresión general, $U=0$ en $r=\infty$) | 405 |
| 13.10 | $v=\sqrt{Gm_T/r}$ (órbita circular) | 408 |
| 13.11 | $v=2\pi r/T$ | 408 |
| 13.12 | $T=\dfrac{2\pi r}{v}=\dfrac{2\pi r^{3/2}}{\sqrt{Gm_T}}$ | 409 |
| 13.13 | $E=K+U=-\dfrac{Gm_Tm}{2r}$ (órbita circular) | 409 |
| 13.14 | $\dfrac{dA}{dt}=\tfrac12 r^2\dfrac{d\theta}{dt}$ (velocidad areolar) | 411 |
| 13.15 | $\dfrac{dA}{dt}=\tfrac12 rv\sin\phi$ | 411 |
| 13.16 | $\dfrac{dA}{dt}=\dfrac{\lvert\vec r\times m\vec v\rvert}{2m}=\dfrac{L}{2m}$ | 412 |
| 13.17 | $T^2=\dfrac{4\pi^2}{Gm_S}a^3$ (3.ª ley de Kepler, órbita elíptica alrededor del Sol); equivalente a $T=2\pi a^{3/2}/\sqrt{Gm_S}$ | 412 |
| 13.18–13.24 | Cascarón esférico y masa puntual exterior: $dU=-Gm\,dM/s$ … $U=-GMm/r$ (13.24) | 415 |
| 13.25–13.26 | Masa puntual dentro de un cascarón: $U=-GMm/R$ constante ⇒ $F=0$ | 416 |
| 13.27 | $w=w_0-\dfrac{mv^2}{R_T}$ (peso aparente en el ecuador) | 418 |
| 13.28 | $\vec w=\vec w_0-m\vec a_{rad}$, $\vec g=\vec g_0-\vec a_{rad}$ (latitud cualquiera) | 418 |
| 13.29 | $v_{esc}=\sqrt{\dfrac{2GM}{R}}=\sqrt{\dfrac{8\pi G\rho}{3}}\,R$ | 419 |
| 13.30 | $R_S=\dfrac{2GM}{c^2}$ (radio de Schwarzschild) | 420 |

Sin número de ecuación, pero en el texto: $g=g_0-v^2/R_T$ en el ecuador (p. 418); $v_{esc}=\sqrt{2GM/R}$ (Ej. 13.5, p. 406); perihelio $a(1-e)$ y afelio $a(1+e)$ (fig. 13.18, Ej. 13.9, pp. 411 y 413); dentro de una esfera uniforme $F_g=Gm_Tm\,r/R_T^3$ (Ej. 13.10, p. 417); $m_X=4\pi^2a^3/(GT^2)$ (p. 422).

### 0.3 Ejemplos de U (todos verificados con Python)

| Ejemplo | Página | Resultado de control | Método |
|---|---|---|---|
| 13.1 Cálculo de la fuerza gravitacional (Cavendish) | 401 | $1{,}33\times10^{-10}$ N | ec. 13.1 |
| 13.2 Aceleración debida a la atracción gravitacional | 401 | $1{,}33\times10^{-8}$ y $2{,}66\times10^{-10}$ m/s² | 2.ª ley; misma fuerza, distinta masa |
| 13.3 Superposición de fuerzas gravitacionales (tres estrellas) | 401–402 | $1{,}87\times10^{26}$ N, $\theta=14{,}6°$ | suma vectorial por componentes |
| 13.4 Gravedad en Marte | 404 | $m=350$ kg, $F_g=1{,}30\times10^3$ N, $g_M=3{,}7$ m/s² | 13.3 con datos de Marte |
| 13.5 «De la Tierra a la Luna» | 406 | a) 7910 m/s (hasta $r=2R_T$); b) $v_{esc}=1{,}12\times10^4$ m/s | conservación de $E$ con 13.9 |
| 13.6 Una órbita de satélite (300 km) | 410 | $v=7730$ m/s, $T=5420$ s = 90,4 min, $a_{rad}=8{,}96$ m/s²; $E_2=-2{,}98\times10^{10}$ J, $E_1=-6{,}25\times10^{10}$ J, $W=3{,}27\times10^{10}$ J; para escapar, $2{,}98\times10^{10}$ J más | 13.10, 13.12, 13.13 |
| 13.7 Rapideces orbitales (conceptual) | 412 | máxima en el perihelio, mínima en el afelio | $E$ constante |
| 13.8 Tercera ley de Kepler (Palas) | 413 | $a=4{,}15\times10^{11}$ m | 13.17 despejando $a$ |
| 13.9 El cometa Halley | 413 | $a=2{,}67\times10^9$ km, $e=0{,}967$, $T=75{,}5$ años | perihelio/afelio + 13.17 |
| 13.10 «Viaje al centro de la Tierra» | 416–417 | $F_g=\dfrac{Gm_Tm}{R_T^3}\,r$ | solo la masa interior; $M\propto r^3$ |
| 13.11 Cálculos sobre agujeros negros | 421 | $R_S=8{,}9$ km, $\rho=2{,}0\times10^{18}$ kg/m³ | 13.30 |
| Problema práctico (Halley) | 424 | $v_p=5{,}46\times10^4$ m/s, $v_a=909$ m/s; $E=-5{,}46\times10^{21}$ J igual en perihelio y afelio ($K_p=3{,}28\times10^{23}$ J, $U_p=-3{,}34\times10^{23}$ J; $K_a=9{,}08\times10^{19}$ J, $U_a=-5{,}55\times10^{21}$ J) | conservación de $E$ y de $L$ |

---

## Herramientas de teoría que se usan

| Herramienta | Dónde |
|---|---|
| Ley de la gravitación $F_g=Gm_1m_2/r^2$, par acción-reacción, a lo largo de la recta que une las partículas | U §13.1 pp. 398–399 (13.1) |
| Cuerpos con simetría esférica = masa concentrada en el centro (13.2) | U §13.1 p. 399; demostración §13.6 pp. 414–416 |
| Superposición de fuerzas gravitacionales | U §13.1 p. 400 (Ej. 13.3) |
| Peso y $g$: $w=Gm_Tm/R_T^2$, $g=Gm_T/R_T^2$, $w\propto1/r^2$ fuera (13.3–13.5) | U §13.2 p. 403 |
| Densidad media $\rho=M/(\tfrac43\pi R^3)$ | U §13.2 p. 404 |
| Trabajo de la gravedad y $U=-GMm/r$ (13.6–13.9); límite $mgy$ | U §13.3 pp. 405–407 |
| Conservación de la energía mecánica $K_1+U_1(+W_{otras})=K_2+U_2$ | U §7.1–7.2 (cap. 7) y §13.3 p. 406 |
| Rapidez de escape $\sqrt{2GM/R}$ | U Ej. 13.5 p. 406; ec. 13.29 p. 419 |
| Órbita circular: $v=\sqrt{GM/r}$, $T=2\pi r^{3/2}/\sqrt{GM}$, $E=-GMm/2r$ (13.10–13.13) | U §13.4 pp. 408–409 |
| Segunda ley de Newton en el MCU: $\sum F=mv^2/r$ | U §5.4 |
| Kepler: elipse, perihelio $a(1-e)$, afelio $a(1+e)$, áreas iguales ⇔ $L$ constante, $T^2=4\pi^2a^3/(Gm_S)$ (13.14–13.17) | U §13.5 pp. 411–413 |
| Dentro de una distribución esférica solo cuenta la masa interior; cascarón: $F=0$ dentro (13.25–13.26) | U §13.6 p. 416 |
| Peso aparente con rotación: $g=g_0-\omega^2R$ en el ecuador (13.27–13.28), $g$ real = $g_0$ en el polo | U §13.7 pp. 417–418 |
| Radio de Schwarzschild $R_S=2GM/c^2$ (13.30) | U §13.8 p. 420 |
| Momento angular $\vec L=\vec r\times m\vec v$ y $d\vec L/dt=\vec\tau$ (10.26) | U §10.5 (cap. 10); usado en U p. 412 |
| Teorema trabajo-energía $W_{tot}=\Delta K$; trabajo de una fuerza perpendicular al desplazamiento = 0 | U §6.1–6.2 (cap. 6) |

---

## PARTE A — Problemas y teoría de examen (X)

**Etiquetas de cita (tal como quedan en `fuentes_txt/examenes_por_tema.md`, ya corregido).** En los exámenes de formato de 4 preguntas la teoría Opción B es **P-4** (comprobado en la imagen de 23F2 y 24F1); el índice decía «P-3» para las dos de «Ley de Newton de la gravitación» y se ha corregido. La de Febrero 2022 es de formato antiguo (pregunta 3 con opciones 3.1/3.2): «P-3 Teoría Opción 3.2» es correcto. Se han añadido al índice dos teorías de septiembre que no estaban catalogadas en el Tema 13 (Sept 2022 P-4, ya usada en los temas 6 y 7, y Sept 2023 P-4, Kepler, nueva).

| Id | Cita exacta (`data-ref`) | Tipo |
|---|---|---|
| X1 | Examen Febrero 2024 (1ª semana) P-2 | problema (3 p.) |
| X2 | Examen Febrero 2024 (1ª semana) P-4 Teoría Opción B | teoría + 2 cuestiones |
| X3 | Examen Febrero 2023 (2ª semana) P-4 Teoría Opción B | teoría + 2 cuestiones (mismo tema que X2) |
| X4 | Examen Febrero 2022 (1ª semana) P-3 Teoría Opción 3.2 | teoría + 2 cuestiones |
| X5 | Examen Septiembre 2022 P-4 Teoría Opción B | teoría + 2 cuestiones (referencia cruzada; resuelto también en el Tema 7, X8) |
| X6 | Examen Septiembre 2023 P-4 Teoría Opción B | teoría + 2 cuestiones |

Orden didáctico propuesto en el HTML: X1 (el único problema numérico; va después de §13.7) y luego las teorías en el orden de las secciones: X2/X3 (§13.1–13.2 y trabajo), X4/X5 (§13.3), X6 (§13.5).

---

### X1. Examen Febrero 2024 (1ª semana) P-2 — gravedad en el polo y en el ecuador de Titán y de Marte

**Enunciado (literal).** Titán, la mayor luna de Saturno, tiene una masa de $1{,}35\times10^{23}$ kg y un radio medio de $2{,}57\times10^{3}$ km. Titán tiene un periodo de giro sobre sí mismo síncrono, esto es, el periodo orbital y de rotación es el mismo como ocurre con nuestra Luna, y su valor es 15 días, 22 horas y 41 minutos. Por otro lado, el planeta Marte tiene una masa de $6{,}42\times10^{23}$ kg, un radio medio de $3{,}39\times10^{3}$ km y su periodo de rotación es 24,6 horas. Conocidos estos datos:
(a) Calcular la aceleración de la gravedad en el polo norte de Titán.
(b) Calcular la aceleración de la gravedad en el ecuador de Titán.
(c) Calcular la aceleración de la gravedad en el polo norte y en el ecuador de Marte.
(d) Comentar por qué en un caso las diferencias de gravedad entre el polo norte y el ecuador son apreciables y en el otro no.
Considere: $G=6{,}672\times10^{-11}\ \text{m}^3\text{kg}^{-1}\text{s}^{-2}$.

**Solución.**

1. **Qué se pide de verdad.** «Aceleración de la gravedad» en un punto de la superficie de un cuerpo que gira = la aceleración con la que cae un objeto soltado allí, **vista por un observador que gira con el cuerpo** ($g=w/m$, U p. 418). No es lo mismo que $g_0=GM/R^2$ salvo en los polos: es el peso **aparente** por unidad de masa de §13.7.
2. **Modelo.** Titán y Marte se tratan como esferas con simetría esférica ⇒ la atracción sobre un objeto en la superficie es la de toda la masa concentrada en el centro (ec. 13.2, U p. 399): $w_0=GMm/R^2$ (peso verdadero), $g_0=GM/R^2$ (13.4, U p. 403).
3. **Polo norte.** El objeto está sobre el eje de giro: no describe ningún círculo ⇒ aceleración nula ⇒ la báscula (o el dinamómetro) equilibra todo el peso verdadero: $g_{polo}=g_0=\dfrac{GM}{R^2}$ (U p. 418, «en el polo… el peso aparente es igual al peso verdadero»).
4. **Ecuador.** El objeto gira con el cuerpo en un círculo de radio $R$ con periodo $T$ ⇒ tiene aceleración centrípeta $a_{rad}=\omega^2R=\dfrac{4\pi^2R}{T^2}$ hacia el centro (U §3.4/§5.4). Segunda ley en la dirección radial (hacia dentro +): $w_0-F=ma_{rad}$, con $F$ la fuerza del soporte = peso aparente ⇒ $w=w_0-m\omega^2R$ (13.27, U p. 418) ⇒ $g_{ec}=g_0-\omega^2R$. En el ecuador $\vec w_0$ y $\vec a_{rad}$ son paralelos, así que la resta es escalar (en latitudes intermedias sería vectorial, 13.28).
5. **Datos en SI.** Titán: $R=2{,}57\times10^6$ m; $T=15\cdot86\,400+22\cdot3600+41\cdot60=1\,377\,660$ s (rotación síncrona ⇒ el periodo de rotación respecto a las estrellas es el orbital). Marte: $R=3{,}39\times10^6$ m; $T=24{,}6\cdot3600=88\,560$ s. ¡Kilómetros a metros!
6. **(a) Polo de Titán.** $g_0=\dfrac{(6{,}672\times10^{-11})(1{,}35\times10^{23})}{(2{,}57\times10^6)^2}=\dfrac{9{,}007\times10^{12}}{6{,}605\times10^{12}}=$ **1,364 m/s²** (sympy: 1,36371).
7. **(b) Ecuador de Titán.** $\omega=2\pi/T=4{,}561\times10^{-6}$ rad/s; $v=\omega R=11{,}7$ m/s; $\omega^2R=5{,}35\times10^{-5}$ m/s². $g_{ec}=1{,}36371-0{,}00005=$ **1,3637 m/s²** (sympy: 1,36366). Con tres cifras, **igual** que en el polo (1,36 m/s²): la diferencia es el 0,004 %.
8. **(c) Marte.** Polo: $g_0=\dfrac{(6{,}672\times10^{-11})(6{,}42\times10^{23})}{(3{,}39\times10^6)^2}=$ **3,727 m/s²**. Ecuador: $\omega=7{,}095\times10^{-5}$ rad/s, $v=240{,}5$ m/s, $\omega^2R=0{,}01706$ m/s² ⇒ $g_{ec}=3{,}7273-0{,}0171=$ **3,710 m/s²**. Diferencia 0,46 %, visible ya en la tercera cifra (3,73 frente a 3,71).
9. **(d) Comentario.** La diferencia polo-ecuador es exactamente la aceleración centrípeta del ecuador, $\Delta g=\omega^2R=4\pi^2R/T^2$. Depende del **cuadrado** de la velocidad de giro: Titán tarda $1\,377\,660/88\,560=15{,}6$ veces más que Marte en dar una vuelta ⇒ su $\omega^2$ es $15{,}6^2\approx242$ veces menor; además su radio es menor (0,76 veces). En total $\Delta g$ es $\approx319$ veces menor en Titán ($5{,}3\times10^{-5}$ frente a $1{,}7\times10^{-2}$ m/s²). Lo que decide si se «nota» es la fracción $\Delta g/g_0=\omega^2R^3/(GM)$: $3{,}9\times10^{-5}$ en Titán (inapreciable) y $4{,}6\times10^{-3}$ en Marte (apreciable, del orden del de la Tierra, 0,0339/9,8 = 0,35 %, U p. 418). Titán gira tan despacio porque su rotación está sincronizada con su órbita de casi 16 días alrededor de Saturno.
10. **Comprobación de órdenes de magnitud.** $g_{Marte}=3{,}7$ m/s² coincide con U Ej. 13.4 (p. 404, mismo $M$ y $R$). Para la Tierra, U da $\Delta g=0{,}0339$ m/s² (p. 418): Marte (0,017) gira casi igual de rápido pero es más pequeño ⇒ $\Delta g$ algo menor que el terrestre, coherente.

**Receta.** Gravedad en un cuerpo que gira: polo ⇒ $g=GM/R^2$; ecuador ⇒ $g=GM/R^2-4\pi^2R/T^2$. Pasar todo a SI (km → m, días/horas → s) y comparar $\omega^2R$ con $g_0$.

**Error típico.** (i) Dejar $R$ en km (sale $g$ un millón de veces mayor). (ii) Sumar la centrípeta en lugar de restarla (en el ecuador el suelo empuja **menos** porque parte de la atracción se «gasta» en hacer girar al objeto). (iii) Usar el periodo orbital de Saturno o la distancia Titán-Saturno: no intervienen. (iv) Dar $g_{ec}$ con 3 cifras y concluir «no hay diferencia» sin calcular $\Delta g$: hay que dar el valor de $\omega^2R$.

**Figura SVG sugerida.** Dos esferas a escala relativa (Titán $R=2570$ km, Marte $R=3390$ km) con su eje de giro; en el polo una flecha $g_0$; en el ecuador $g_0$ hacia el centro y una flecha corta $\omega^2R$ hacia fuera (rótulo «no a escala, ×100» en Titán). Tabla incrustada: Titán 1,3637 / 1,3637 m/s², $\Delta g=5{,}3\times10^{-5}$; Marte 3,727 / 3,710 m/s², $\Delta g=0{,}017$. Opcional: barras de $\Delta g/g_0$ (0,004 % frente a 0,46 %, escala logarítmica).

Teoría: U §13.2 p. 403 (13.4); §13.7 pp. 417–418 (13.27, 13.28).

---

### Desarrollo modelo del tema «Ley de Newton de la gravitación» (vale para X2 y X3)

Extensión orientativa: una cara. Lo que **no** puede faltar está en negrita.

1. **Enunciado** (U p. 398). **Toda partícula de materia del universo atrae a todas las demás con una fuerza directamente proporcional al producto de sus masas e inversamente proporcional al cuadrado de la distancia que las separa:** $F_g=\dfrac{Gm_1m_2}{r^2}$ (13.1, U p. 399).
2. **Dirección y tercera ley.** La fuerza actúa **a lo largo de la recta que une las partículas**, siempre **atractiva**; las fuerzas de 1 sobre 2 y de 2 sobre 1 forman un **par acción-reacción**: misma magnitud aunque las masas sean distintas (U p. 399; fig. 13.1). Forma vectorial (propia): $\vec F_{2\,\text{sobre}\,1}=-\dfrac{Gm_1m_2}{r^2}\hat r_{21}$, con $\hat r_{21}$ unitario de 2 hacia 1. Consecuencia: al caer una persona, la Tierra también «sube» hacia ella, pero con aceleración $\sim10^{-23}$ veces menor (U p. 399).
3. **La constante $G$.** **Universal**, la misma para cualquier par de cuerpos: $G=6{,}67\times10^{-11}$ N·m²/kg² (U p. 400). Se midió con la **balanza de torsión de Cavendish** (1798; fig. 13.4). No confundir con $g$, que es una aceleración y cambia de un lugar a otro (U p. 399). Lo pequeño de $G$ explica que entre objetos cotidianos la fuerza sea insignificante ($1{,}33\times10^{-10}$ N entre esferas de 10 g y 0,5 kg a 5 cm, Ej. 13.1) y que solo se note cuando una de las masas es astronómica.
4. **Superposición.** Si varios cuerpos atraen a uno, la fuerza total es la **suma vectorial** de las fuerzas de cada uno (U p. 400; Ej. 13.3).
5. **Cuerpos esféricos.** Un cuerpo con **distribución de masa esféricamente simétrica** atrae a los exteriores **como si toda su masa estuviera en su centro** ($F_g=Gm_Tm/r^2$, 13.2, U p. 399; demostración en §13.6). Dentro de él solo cuenta la masa más cercana al centro que el punto (U p. 416): en el centro de la Tierra la fuerza es nula, y en una Tierra uniforme crece linealmente con $r$ (Ej. 13.10).
6. **Peso y $g$.** El peso es la fuerza gravitacional total sobre un cuerpo (U p. 402). En la superficie: $w=\dfrac{Gm_Tm}{R_T^2}$ (13.3) ⇒ **$g=\dfrac{Gm_T}{R_T^2}$** (13.4): no depende de la masa del cuerpo; despejando, $m_T=gR_T^2/G=5{,}96\times10^{24}$ kg (así «pesó» Cavendish la Tierra, U p. 403). Por encima de la superficie $w=Gm_Tm/r^2$ (13.5): el peso disminuye con el **cuadrado de la distancia al centro** (fig. 13.8).
7. **Alcance y aplicaciones.** La gravitación es la interacción dominante a escala astronómica porque actúa a distancia y no se neutraliza (la materia es eléctricamente neutra, U p. 402). De ella salen: la energía potencial $U=-Gm_Tm/r$ (13.9), las órbitas de satélites $v=\sqrt{Gm_T/r}$ (13.10) y las leyes de Kepler (§13.5).
8. **Fórmulas para la cuartilla:** (13.1), (13.4), (13.5), (13.9), (13.10), (13.12).

---

### X2. Examen Febrero 2024 (1ª semana) P-4 Teoría Opción B — cuestiones

**Enunciado (literal).** Desarrolle el tema: *Ley de Newton de la gravitación*. Además, responda a las siguientes cuestiones: (a) ¿Cuándo atraigo más al sol, a mediodía o a medianoche? Razone la respuesta. (b) Si todos los planetas tuvieran la misma densidad, ¿cómo dependería la gravedad en su superficie del radio del planeta?

**Respuesta (a).**
1. Por la **tercera ley** (U p. 399), la fuerza con la que yo atraigo al Sol tiene la misma magnitud que la fuerza con la que el Sol me atrae: basta ver cuándo es mayor $F=\dfrac{Gm_Sm}{d^2}$.
2. A **mediodía** estoy en la cara de la Tierra que mira al Sol: $d\approx d_{TS}-R_T$. A **medianoche**, en la cara opuesta: $d\approx d_{TS}+R_T$. $F$ decrece con $d$ ⇒ **atraigo más al Sol a mediodía**.
3. Cuánto: $\dfrac{F_{día}}{F_{noche}}=\left(\dfrac{d_{TS}+R_T}{d_{TS}-R_T}\right)^2\approx1+\dfrac{4R_T}{d_{TS}}=1{,}00017$ (con $d_{TS}=1{,}50\times10^{11}$ m, $R_T=6{,}37\times10^6$ m): una diferencia del 0,017 %.
4. (Para redondear.) No lo notamos: la atracción del Sol sobre una persona da $Gm_S/d_{TS}^2=5{,}9\times10^{-3}$ m/s², y la Tierra entera cae hacia el Sol con prácticamente esa misma aceleración, así que respecto a la Tierra solo queda la pequeñísima diferencia entre ambas caras (misma idea que la ingravidez aparente de U p. 408).

**Respuesta (b).**
1. $g=\dfrac{GM}{R^2}$ (13.4, aplicada al planeta) y $M=\rho V=\rho\,\tfrac43\pi R^3$ (densidad media, U p. 404).
2. Sustituyendo: $g=\dfrac{G\rho\,\tfrac43\pi R^3}{R^2}=$ **$\tfrac43\pi G\rho R$** ⇒ con la misma densidad, **$g$ es proporcional al radio**: un planeta de doble radio tendría doble gravedad superficial (aunque su masa sería 8 veces mayor, el $R^2$ del denominador se «come» un factor 4).
3. Comprobación con la Tierra ($\rho=5500$ kg/m³): $\tfrac43\pi(6{,}67\times10^{-11})(5500)(6{,}37\times10^6)=9{,}79$ m/s² ✓. (La rapidez de escape también es $\propto R$ a densidad fija, 13.29, U p. 419.)

**Receta.** Cuestiones de «cuándo atrae más»: escribir $F=GMm/d^2$ y comparar distancias al **centro** del otro cuerpo. Dependencias con $R$ a densidad fija: sustituir $M=\rho\frac43\pi R^3$ en la fórmula.

**Error típico.** (a) Pensar que la respuesta depende de la masa (la mía es la misma) o del «sentido» de la atracción; olvidar la tercera ley (la pregunta es cuánto atraigo **yo** al Sol). (b) Decir que $g\propto M$ «luego $\propto R^3$», olvidando el $1/R^2$.

**Figura SVG sugerida.** Sol a la izquierda, Tierra (no a escala) con dos personas: «mediodía» en la cara iluminada ($d_{TS}-R_T$) y «medianoche» en la opuesta ($d_{TS}+R_T$), flechas de fuerza hacia el Sol con rótulo «diferencia 0,017 %, no a escala». Para (b): recta $g=\tfrac43\pi G\rho R$ con el punto de la Tierra (6370 km, 9,79 m/s²).

Teoría: U §13.1 p. 399 (tercera ley, 13.1); §13.2 pp. 403–404 (13.4, densidad media). Cuestiones idénticas en U P13.5 y P13.2 (p. 424).

---

### X3. Examen Febrero 2023 (2ª semana) P-4 Teoría Opción B — cuestiones

**Enunciado (literal).** Desarrolle el tema: *Ley de Newton de la gravitación*. Además, responda a las siguientes cuestiones: (a) Un planeta se mueve con velocidad constante en una órbita circular alrededor de su estrella. ¿Cuál es el trabajo neto que ejerce su estrella sobre el planeta al describir una órbita completa? Razone la respuesta. (b) En el caso anterior si la órbita fuera elíptica en lugar de circular, la velocidad no podría ser constante en cada momento. ¿Cuál es el trabajo neto que ejerce su estrella sobre el planeta al describir una órbita completa? ¿Qué diferencia habría en relación con el caso de la órbita circular? Razone la respuesta.

(Nota: «velocidad constante» en el enunciado significa rapidez constante; el vector velocidad cambia de dirección.)

**Respuesta (a).**
1. La única fuerza es la gravitacional de la estrella, dirigida hacia el centro de la órbita (radial); la velocidad es tangente al círculo ⇒ **$\vec F\perp\vec v$ en todo instante** (U p. 408, fig. 13.15).
2. Trabajo elemental $dW=\vec F\cdot d\vec s=F\,ds\cos90°=0$ (U §6.1): la fuerza no hace trabajo **en ningún tramo** ⇒ **$W_{órbita}=0$**.
3. Coherente con el teorema trabajo-energía: $W_{tot}=\Delta K=0$ porque la rapidez no cambia. Y con la energía potencial: $r$ no cambia ⇒ $U=-GMm/r$ no cambia ⇒ $W=U_1-U_2=0$ (13.8).

**Respuesta (b).**
1. **Trabajo neto en una vuelta = 0 también.** La gravedad es **conservativa**: su trabajo entre dos puntos solo depende de $r$ inicial y final, $W=Gm_Sm\left(\dfrac1{r_2}-\dfrac1{r_1}\right)$ (13.8, U p. 405). En una órbita completa el planeta vuelve al mismo punto ($r_2=r_1$) ⇒ $W=0$. Equivalentemente: vuelve con la misma rapidez ⇒ $\Delta K=0$.
2. **La diferencia está en los tramos.** En la elipse la fuerza (hacia el Sol, en un foco) **no** es perpendicular a la velocidad salvo en el perihelio y el afelio. Del afelio al perihelio ($r$ disminuye) la fuerza tiene componente a favor de la velocidad ⇒ **trabajo positivo**, $W=Gm_Sm(1/r_p-1/r_a)>0$, y el planeta acelera; del perihelio al afelio el trabajo es **negativo** e igual en valor absoluto, y el planeta frena (U Ej. 13.7, p. 412). Se compensan exactamente.
3. **Resumen de la diferencia:** en el círculo $W=0$ instante a instante (y $K$ constante); en la elipse $W\neq0$ en cada media órbita y solo es cero en la vuelta completa (la energía va de cinética a potencial y vuelve, $E$ constante).
4. Número de ejemplo (U Problema práctico p. 424, Halley): del afelio al perihelio la gravedad del Sol hace $W=K_p-K_a=3{,}28\times10^{23}$ J, y lo mismo con signo menos a la vuelta.

**Receta.** Trabajo de la gravedad en una órbita: (i) mirar el ángulo entre $\vec F$ y $\vec v$ (círculo: 90° siempre); (ii) para un ciclo completo, fuerza conservativa ⇒ $W=0$; (iii) para un tramo, $W=-\Delta U=GMm(1/r_f-1/r_i)$.

**Error típico.** Responder «$W=F\cdot2\pi r$» (la fuerza no tiene la dirección del desplazamiento) o «$W\neq0$ en la elipse porque la velocidad cambia» (cambia dentro de la vuelta, pero vuelve al valor inicial).

**Figura SVG sugerida.** Dos paneles: círculo con $\vec F$ radial y $\vec v$ tangente en 3 puntos (ángulo 90° marcado); elipse con el Sol en un foco y $\vec F$, $\vec v$ en cuatro puntos, coloreando la mitad «afelio→perihelio: $W>0$» (`--A`) y «perihelio→afelio: $W<0$» (`--X`).

Teoría: U §13.3 p. 405 (13.8, gravedad conservativa); §13.4 p. 408; §13.5 p. 412 (Ej. 13.7); U §6.1–6.2 (trabajo y $\Delta K$). Cuestión idéntica en U P13.11 (p. 424). Esta cuestión también se resolvió en el Tema 6 (X3).

---

### Desarrollo modelo del tema «Energía potencial gravitatoria» (vale para X4 y X5)

1. **Por qué hace falta una expresión nueva** (U p. 405). $U=mgy$ supone fuerza gravitatoria constante, pero $F_g=Gm_Tm/r^2$ depende de $r$: lejos de la superficie hay que rehacer la cuenta.
2. **Trabajo de la gravedad** al pasar de $r_1$ a $r_2$ (U p. 405): componente radial $F_r=-Gm_Tm/r^2$ (13.7) ⇒ $W_{grav}=\displaystyle\int_{r_1}^{r_2}F_r\,dr=Gm_Tm\left(\frac1{r_2}-\frac1{r_1}\right)$ (13.8). **Solo depende de $r_1$ y $r_2$, no del camino** (fig. 13.10) ⇒ la fuerza gravitacional es **conservativa**.
3. **Definición.** Se define $U$ con $W_{grav}=U_1-U_2$ (como en 7.3) ⇒ **$U=-\dfrac{Gm_Tm}{r}$** (13.9), tomando **$U=0$ en $r=\infty$**. Es la energía potencial del **sistema** Tierra-cuerpo.
4. **Signo y forma** (fig. 13.11, U p. 405). $U$ es **siempre negativa** y **aumenta (se hace menos negativa) al alejarse**: si el cuerpo sube, la gravedad hace trabajo negativo y $U$ crece; si cae, trabajo positivo y $U$ disminuye. La elección del cero es libre (solo importan diferencias, U p. 406). **Cuidado:** $F\propto1/r^2$ pero $U\propto1/r$ (U p. 406).
5. **Relación con $mgy$** (U pp. 406–407). Cerca de la superficie, $r_1\approx r_2\approx R_T$ ⇒ $W_{grav}\approx\dfrac{Gm_Tm}{R_T^2}(r_1-r_2)=mg(r_1-r_2)$: $U=mgy$ es el caso particular de (13.9) para alturas pequeñas.
6. **Conservación de la energía y escape.** Si solo actúa la gravedad, $K+U$ se conserva. Rapidez de escape (Ej. 13.5, U p. 406): $\tfrac12mv^2-\dfrac{GMm}{R}=0$ ⇒ $v_{esc}=\sqrt{2GM/R}=1{,}12\times10^4$ m/s en la Tierra, sin depender de la masa del cuerpo ni de la dirección de lanzamiento.
7. **Órbitas.** En órbita circular $E=-\dfrac{Gm_Tm}{2r}$ (13.13, U p. 409): energía negativa = **sistema ligado**. $E<0$ ⇒ el cuerpo no puede alejarse indefinidamente; $E\ge0$ ⇒ puede llegar al infinito.

---

### X4. Examen Febrero 2022 (1ª semana) P-3 Teoría Opción 3.2 — cuestiones

**Enunciado (literal).** 3.2.- Energía potencial gravitatoria. 3.2a) ¿Es cierto que un astronauta en órbita está fuera del alcance de la gravedad terrestre? ¿A qué distancia tendría que viajar una nave para estar fuera del alcance de la gravedad terrestre? Explique ambas respuestas. 3.2b) Si se lanza un proyectil verticalmente hacia arriba desde la superficie terrestre, ¿Qué pasa si la energía mecánica total es menor o mayor que cero? Desprecie la resistencia del aire y los efectos gravitacionales del Sol, la Luna y resto de planetas.

**Respuesta 3.2a).**
1. **No es cierto.** La Estación Espacial está a unos 400 km de altura, $r=6770$ km del centro (U p. 409): allí $g=g_0\left(\dfrac{R_T}{r}\right)^2=9{,}81\times\left(\dfrac{6370}{6770}\right)^2=8{,}7$ m/s², un **89 %** del valor en el suelo (13.5).
2. **Por qué flotan.** Están en **caída libre**: la gravedad es la única fuerza y les da a la nave y al astronauta la misma aceleración centrípeta, así que nada empuja al astronauta contra el piso: **ingravidez aparente** (U p. 408). Sin gravedad no habría órbita: la nave seguiría en línea recta (primera ley) y se alejaría.
3. **¿A qué distancia desaparece?** A **ninguna distancia finita**: $F_g=Gm_Tm/r^2$ disminuye con $r$ pero solo se anula cuando $r\to\infty$ (U p. 408: la ingravidez «verdadera» solo se lograría infinitamente lejos de toda masa). Ejemplo: a la distancia de la Luna (384 000 km), $g_T=2{,}6\times10^{-3}$ m/s², pequeñísima pero suficiente para mantener a la Luna en órbita.

**Respuesta 3.2b).**
1. **Planteamiento.** Solo actúa la gravedad (conservativa) ⇒ $E=\tfrac12mv^2-\dfrac{GMm}{r}$ se conserva (U p. 406). Al subir, $r$ aumenta, $U$ aumenta y $K$ disminuye.
2. **$E<0$:** como $K\ge0$, siempre debe ser $-GMm/r\le E<0$, es decir, $r\le r_{máx}=\dfrac{GMm}{|E|}$. El proyectil sube hasta $r_{máx}$ (donde $K=0$), se para y **vuelve a caer**: queda **ligado** a la Tierra. Ejemplo (Ej. 13.5a): con $v_0=7910$ m/s, $E=-\dfrac{GMm}{2R_T}$ y $r_{máx}=2R_T$.
3. **$E>0$:** al crecer $r$, $U\to0^-$ y $K=E-U$ nunca llega a cero: el proyectil **escapa** y llega «al infinito» con rapidez residual $v_\infty=\sqrt{2E/m}>0$.
4. **Caso límite $E=0$:** lanzamiento justo con la rapidez de escape $v_0=\sqrt{2GM/R_T}=11{,}2$ km/s (Ej. 13.5b); llega al infinito con $v\to0$.

**Receta.** Signo de $E=K+U$ (con $U=0$ en el infinito): $E<0$ ligado (sube hasta $r_{máx}=GMm/|E|$ y vuelve), $E\ge0$ escapa.

**Error típico.** (a) Decir que en órbita «no hay gravedad» o que basta salir de la atmósfera. (b) Usar $U=mgh$ para estas preguntas: con $mgh$ siempre habría una altura máxima finita y no existiría la rapidez de escape.

**Figura SVG sugerida.** Gráfica $U(r)=-GMm/r$ desde $R_T$ con dos rectas horizontales de energía: $E_1<0$ (corta a $U(r)$ en $r_{máx}=2R_T$, marcar «vuelve») y $E_2>0$ (por encima del eje, «escapa»); en el eje $r$ marcar 400 km (ISS) con «$g=8{,}7$ m/s²».

Teoría: U §13.2 p. 403 (13.5); §13.3 pp. 405–406 (13.9, Ej. 13.5); §13.4 pp. 408–409 (ingravidez aparente). Cuestiones idénticas en U P13.20 y P13.13 (pp. 424–425). Esta pregunta también está en el Tema 7 (X7).

---

### X5. Examen Septiembre 2022 P-4 Teoría Opción B — cuestiones

**Enunciado (literal, leído en la imagen del recopilatorio, p. 21).** Desarrolle el tema: *Energía potencial gravitacional*. Además, responda a las siguientes cuestiones: (a) Explique la relación que hay entre las siguientes expresiones de la energía potencial ($U$), aplicadas al planeta tierra (masa $M$) y a un objeto (masa $m$) y el motivo por el que en la primera expresión $U$ crece con la altura ($h$) mientras que en la segunda disminuye con la distancia del objeto al centro de la Tierra ($r$): $U=mgh$ (1); $U=G\dfrac{Mm}{r}$ (2). Siendo $G$ la constante de gravitación universal. (b) Explique cuál sería el trabajo resultante para ir desde la playa de la Malvarrosa en Valencia a la Barceloneta en Barcelona. No considere la acción de fuerzas no conservativas.

**Respuesta (a).**
1. **La expresión general es $U=-\dfrac{GMm}{r}$** (13.9), con el cero en el infinito. El valor $GMm/r$ que aparece en (2) es su **valor absoluto**, que efectivamente disminuye con $r$; pero como $U$ es negativa, **$U$ aumenta con $r$** (se hace menos negativa, fig. 13.11). Las dos expresiones dicen lo mismo: alejarse de la Tierra **aumenta** la energía potencial (la gravedad hace trabajo negativo).
2. **Relación.** (1) es la aproximación de (2) para alturas pequeñas, con otro cero: $\Delta U=U(R_T+h)-U(R_T)=GMm\left(\dfrac1{R_T}-\dfrac1{R_T+h}\right)=\dfrac{GMm\,h}{R_T(R_T+h)}\approx\dfrac{GM}{R_T^2}m\,h=mgh$ si $h\ll R_T$ (U pp. 406–407).
3. **Diferencias.** (1) toma $U=0$ en la superficie ($h=0$) y supone $g$ constante; (2) toma $U=0$ en el infinito y vale a cualquier distancia. El error de $mgh$ es el factor $R_T/(R_T+h)$: un 0,16 % a 10 km de altura, pero un 50 % a $h=R_T$ (sympy).

**Respuesta (b).**
1. Ambas playas están **a nivel del mar**: en el modelo de Tierra esférica de U, a la misma distancia $r=R_T$ del centro.
2. La gravedad es conservativa ⇒ su trabajo solo depende de los puntos inicial y final: $W_{grav}=U_1-U_2=-\dfrac{GMm}{R_T}+\dfrac{GMm}{R_T}=$ **0**, sea cual sea el camino (por la costa, por el interior, subiendo puertos…).
3. Sin fuerzas no conservativas, el trabajo resultante es el de la gravedad (la normal del suelo es perpendicular al desplazamiento sobre una superficie equipotencial) ⇒ **$W_{tot}=0$**, coherente con $W_{tot}=\Delta K=0$ si se sale y se llega en reposo.

**Receta.** $mgh$ = versión «de cerca» de $-GMm/r$ con cero en el suelo. Trabajo de la gravedad entre dos puntos a la misma distancia del centro = 0 (fuerza conservativa).

**Error típico.** Decir que las dos expresiones son contradictorias («una crece y otra decrece»); olvidar el signo menos de la energía potencial general.

**Figura SVG sugerida.** La misma gráfica de $U(r)$ de X4 con una recta tangente en $r=R_T$ de pendiente $mg$ (la aproximación $mgh$) y el rótulo «coinciden cerca de la superficie».

Teoría: U §13.3 pp. 405–407 (13.8, 13.9, límite $mgy$). Resuelto también en el Tema 7 (X8) y la cuestión (b) en el Tema 6 (X4).

---

### Desarrollo modelo del tema «Las leyes de Kepler y el movimiento de los planetas» (X6)

1. **Las tres leyes** (U p. 411), empíricas, obtenidas por Kepler con los datos de Tycho Brahe: **(1)** cada planeta describe una **elipse con el Sol en uno de sus focos**; **(2)** la recta Sol-planeta **barre áreas iguales en tiempos iguales**; **(3)** el **cuadrado del periodo es proporcional al cubo del semieje mayor**. Newton demostró que son consecuencia de sus leyes del movimiento y de la gravitación.
2. **Primera ley.** Elipse de semieje mayor $a$ y excentricidad $e$ ($0\le e<1$; $e=0$ círculo); focos a distancia $ea$ del centro; **perihelio** $r_p=a(1-e)$, **afelio** $r_a=a(1+e)$ (fig. 13.18; Ej. 13.9). Las órbitas planetarias son casi circulares (Tierra $e=0{,}017$). Para una fuerza $\propto1/r^2$ las órbitas cerradas son elipses y las abiertas parábolas o hipérbolas (U p. 411).
3. **Segunda ley = conservación del momento angular** (U pp. 411–412). Área barrida en $dt$: $dA=\tfrac12r^2d\theta$ ⇒ $\dfrac{dA}{dt}=\tfrac12rv\sin\phi=\dfrac{L}{2m}$ (13.14–13.16). La fuerza gravitacional es **central** (apunta al Sol) ⇒ torca $\vec r\times\vec F=0$ ⇒ $\vec L$ constante ⇒ velocidad areolar constante. Además, $\vec L$ fijo en dirección ⇒ **la órbita es plana**. Consecuencia: el planeta va **más rápido en el perihelio** y más lento en el afelio (Ej. 13.7; también por energía: $U$ mínima ⇒ $K$ máxima).
4. **Tercera ley.** Para una órbita circular: $\dfrac{GMm}{r^2}=\dfrac{mv^2}{r}$ y $v=\dfrac{2\pi r}{T}$ ⇒ $T=\dfrac{2\pi r^{3/2}}{\sqrt{GM}}$ (13.10–13.12). Newton la extendió a la elipse cambiando $r$ por $a$: **$T^2=\dfrac{4\pi^2}{Gm_S}a^3$** (13.17, U p. 412), es decir, $T=2\pi a^{3/2}/\sqrt{Gm_S}$. No depende de la excentricidad ni de la masa del planeta, solo de la del Sol. Ejemplos: Palas $a=4{,}15\times10^{11}$ m (Ej. 13.8); Halley $a=2{,}67\times10^{12}$ m, $e=0{,}967$, $T=75{,}5$ años (Ej. 13.9).
5. **Usos.** Medir masas: con $T$ y $a$ de un satélite, $M=4\pi^2a^3/(GT^2)$ (masa del objeto central de la Vía Láctea, U p. 422). El Sol y el planeta giran ambos alrededor de su **centro de masa** (U p. 414; detección de exoplanetas).

### X6. Examen Septiembre 2023 P-4 Teoría Opción B — cuestiones

**Enunciado (literal, leído en la imagen del recopilatorio, p. 16).** Desarrolle el tema: *Las leyes de Kepler y el movimiento de los planetas*. Además, responda a las siguientes cuestiones: (a) ¿Qué viaje requiere más combustible, de la Tierra a la Luna o de la Luna a la Tierra, o es el mismo consumo en los do[s] trayectos? Explique su respuesta. (b) La Tierra está más cerca del Sol en noviembre que en mayo. ¿En cuál de estos dos meses es mayor su velocidad orbital? Explique su respuesta.

**Respuesta (a).**
1. El combustible se gasta en dar a la nave la energía necesaria para «subir» por el pozo de potencial del cuerpo del que parte, hasta el punto entre la Tierra y la Luna donde las dos atracciones se igualan; a partir de ahí cae hacia el destino.
2. El pozo de la Tierra es mucho más profundo: rapidez de escape $\sqrt{2GM/R}$ = 11,2 km/s en la Tierra frente a 2,4 km/s en la Luna (Ej. 13.5; datos de la Luna del Apéndice G).
3. Cálculo (propio, superposición de 13.9 para la Tierra y la Luna, $d=3{,}84\times10^8$ m): el punto de equilibrio está a $3{,}46\times10^8$ m de la Tierra (a 38 000 km de la Luna). Energía por kg para llegar a él: **61 MJ/kg desde la Tierra** frente a **2,6 MJ/kg desde la Luna**: unas 24 veces más.
4. ⇒ **Requiere más combustible el viaje de la Tierra a la Luna.** (Además, al llegar a la Tierra la atmósfera puede frenar la nave; en la Luna, sin atmósfera, hay que frenar con motores.)

**Respuesta (b).**
1. Por la **segunda ley de Kepler** (conservación de $L=mrv\sin\phi$, U p. 412): cuando $r$ es menor, la recta Sol-Tierra debe barrer la misma área por unidad de tiempo ⇒ la Tierra va **más rápida**.
2. Por energía (Ej. 13.7): más cerca del Sol, $U=-Gm_Sm/r$ es más negativa ⇒ $K=E-U$ es mayor.
3. ⇒ **La rapidez orbital es mayor en noviembre.** El efecto es pequeño porque la órbita terrestre es casi circular: entre perihelio y afelio $v_p/v_a=(1+e)/(1-e)=1{,}035$ (un 3,5 %).

**Receta.** «¿Dónde va más rápido?» ⇒ más cerca del Sol (áreas iguales / $L$ constante / $E$ constante). «¿Qué viaje cuesta más?» ⇒ comparar la profundidad de los pozos de potencial ($GM/R$) de origen y destino.

**Error típico.** (a) «Es el mismo consumo porque la distancia es la misma»: la energía depende de $U$, no de la distancia recorrida. (b) Confundir «más cerca» con «más lento» o creer que la rapidez orbital es constante.

**Figura SVG sugerida.** (a) Perfil $U(x)/m$ a lo largo de la recta Tierra-Luna con el máximo en $x=3{,}46\times10^8$ m, cotas «61 MJ/kg» (desde la Tierra) y «2,6 MJ/kg» (desde la Luna) — escala vertical no lineal, decirlo. (b) Elipse exagerada con el Sol en un foco y dos sectores de igual área (estrecho y largo cerca del Sol, ancho y corto lejos), rótulos «noviembre (más cerca, más rápida)» y «mayo».

Teoría: U §13.3 p. 406 (Ej. 13.5); §13.5 pp. 411–413 (13.14–13.17, Ej. 13.7). Cuestiones idénticas en U P13.10 y P13.15 (p. 424).

---

## PARTE B — Ejemplos del libro U

Los once ejemplos de U están verificados (tabla 0.3). Para el HTML conviene ampliar como ejemplos resueltos de teoría, con su método: **13.4** (g en Marte: modelo de X1), **13.5** (escape: modelo de E4, E5, E6 y de X4), **13.6** (satélite: modelo de E7 y E9; trabajo = $E_2-E_1$), **13.9** (Halley: perihelio/afelio + tercera ley, modelo de E10) y **13.10** (dentro de la Tierra: modelo de E13 y del interactivo 2). El 13.3 (superposición en 2D) complementa a E1 (superposición en 1D). El Problema práctico (p. 424) sirve de ejemplo de conservación simultánea de $E$ y $L$ en una elipse (valores en la tabla 0.3).

---

## PARTE C — Problemas del solucionario (E), traducidos y ampliados, por secciones y de menos a más

### E1. Ejercicio 13.6 — fuerza neta de dos masas sobre una tercera, en línea (Solucionario 13-3 y 13-4)

**Enunciado (traducido de U p. 425).** Obtenga la magnitud y la dirección de la fuerza gravitacional neta que las masas $B$ y $C$ ejercen sobre la masa $A$ en la figura E13.6. Cada masa es de 2,00 kg. (Figura comprobada en la imagen del PDF: **a)** en línea, de izquierda a derecha, $A$ — 10 cm — $C$ — 40 cm — $B$; **b)** $C$ — 10 cm — $A$ — 40 cm — $B$.)

**Solución.**

1. **Modelo.** Esferas uniformes ⇒ cada una atrae como una partícula situada en su centro (13.2, U p. 399). Cada fuerza es **atractiva**: apunta desde $A$ hacia la masa que la ejerce. Por **superposición** (U p. 400), la fuerza neta es la suma vectorial; al estar todo en una recta, basta un eje $x$ (+ a la derecha) y sumar con signo.
2. **Fuerza de $C$ en los dos casos** (distancia 0,10 m): $F_C=\dfrac{(6{,}67\times10^{-11})(2{,}00)(2{,}00)}{(0{,}10)^2}=2{,}67\times10^{-8}$ N.
3. **a)** $C$ y $B$ están las dos a la derecha de $A$ ⇒ las dos fuerzas van hacia $+x$. $r_{AB}=0{,}10+0{,}40=0{,}50$ m ⇒ $F_B=\dfrac{G(4{,}00)}{0{,}50^2}=1{,}07\times10^{-9}$ N. Neta: $2{,}67\times10^{-8}+0{,}107\times10^{-8}=$ **$2{,}8\times10^{-8}$ N hacia la derecha** (hacia $C$ y $B$).
4. **b)** Ahora $C$ está a la izquierda ($-x$) y $B$ a la derecha a $r_{AB}=0{,}40$ m: $F_B=\dfrac{G(4{,}00)}{0{,}40^2}=1{,}67\times10^{-9}$ N. Neta: $-2{,}67\times10^{-8}+0{,}167\times10^{-8}=-2{,}50\times10^{-8}$ N ⇒ **$2{,}5\times10^{-8}$ N hacia la izquierda** (hacia $C$).
5. **Interpretación.** Domina siempre la masa cercana: a distancia 4-5 veces mayor, la fuerza es 16-25 veces menor ($1/r^2$).

**Receta.** Varias masas en línea: calcular cada módulo con $Gm_1m_2/r^2$ (distancias entre **centros**), dar signo según hacia dónde está cada masa atractora y sumar.

**Error típico.** Sumar módulos sin mirar el sentido (en b) se restan); medir $r_{AB}$ como 0,40 m en el caso a) (son 0,50 m).

**Figura SVG sugerida.** Los dos montajes en línea con las cotas 10 cm y 40 cm, flechas sobre $A$: en a) dos flechas a la derecha ($2{,}67\times10^{-8}$ y $1{,}07\times10^{-9}$ N) y la neta $2{,}8\times10^{-8}$ N; en b) flecha larga a la izquierda y corta a la derecha, neta $2{,}5\times10^{-8}$ N a la izquierda (longitudes proporcionales o «no a escala»).

Teoría: U §13.1 pp. 399–400 (13.1, 13.2, superposición).

---

### E2. Ejercicio 13.11 — altura a la que $g$ se reduce a la décima parte (Solucionario 13-6)

**Enunciado (traducido de U p. 425).** ¿A qué distancia sobre la superficie terrestre la aceleración debida a la gravedad es de 0,980 m/s², si en la superficie tiene una magnitud de 9,80 m/s²?

**Solución.**

1. **Idea.** Fuera de la Tierra $g(r)=\dfrac{Gm_T}{r^2}$ con $r$ medido **desde el centro** (13.5 dividida entre $m$, U p. 403).
2. **Cociente** (así no hacen falta ni $G$ ni $m_T$): $\dfrac{g(r)}{g(R_T)}=\left(\dfrac{R_T}{r}\right)^2=\dfrac{0{,}980}{9{,}80}=\dfrac1{10}$ ⇒ $r=\sqrt{10}\,R_T=3{,}16R_T$.
3. **Altura sobre la superficie:** $h=r-R_T=(\sqrt{10}-1)R_T=2{,}162\times6{,}37\times10^6=$ **$1{,}38\times10^7$ m** (13 800 km, unas dos veces el radio terrestre).

**Receta.** «¿A qué altura $g$ vale una fracción $f$ de la superficie?» ⇒ $r=R_T/\sqrt f$, $h=r-R_T$.

**Error típico.** Usar $h$ en lugar de $r$ en $Gm_T/r^2$, o creer que $g$ se divide entre 10 a 10 veces el radio (es $\sqrt{10}$ veces).

**Figura SVG sugerida.** Curva $g(r)$ para $r\ge R_T$ (9,80 en $R_T$, 2,45 en $2R_T$, 0,98 en $3{,}16R_T$) con el punto marcado y la cota $h=1{,}38\times10^7$ m entre $R_T$ y $3{,}16R_T$.

Teoría: U §13.2 p. 403 (13.4, 13.5; fig. 13.8).

---

### E3. Ejercicio 13.13 — Titania: gravedad y densidad media (Solucionario 13-6 y 13-7)

**Enunciado (traducido de U p. 425).** Titania, la luna más grande de Urano, tiene $\tfrac18$ del radio terrestre y $\tfrac1{1700}$ de la masa de la Tierra. a) Calcule la aceleración debida a la gravedad en su superficie. b) Obtenga la densidad media de Titania (es menor que la densidad de las rocas, lo cual es evidencia de que Titania está constituida principalmente por hielo).

**Solución.**

1. **a) Escalado.** $g=GM/R^2$ (13.4). Con $M=m_T/1700$ y $R=R_T/8$: $g_{Ti}=\dfrac{G(m_T/1700)}{(R_T/8)^2}=\dfrac{64}{1700}\dfrac{Gm_T}{R_T^2}=0{,}0376\,g_T$.
2. **Número:** $g_{Ti}=0{,}0376\times9{,}80=$ **0,37 m/s²**. Dos efectos opuestos: menos masa (÷1700) baja $g$; menor radio (×64 por el cuadrado) la sube; gana la masa.
3. **b) Densidad media** (U p. 404): $\rho=\dfrac{M}{\tfrac43\pi R^3}$ ⇒ $\dfrac{\rho_{Ti}}{\rho_T}=\dfrac{1/1700}{(1/8)^3}=\dfrac{512}{1700}=0{,}301$ ⇒ $\rho_{Ti}=0{,}301\times5500=$ **$1{,}7\times10^3$ kg/m³** (densidad media terrestre 5500 kg/m³, U p. 404).
4. **Interpretación.** Las rocas tienen 2000–3300 kg/m³ (U p. 404) y el hielo ≈ 920 kg/m³: Titania es en buena parte hielo.

**Receta.** Si te dan masa y radio **en proporción a la Tierra**: $g/g_T=(M/m_T)/(R/R_T)^2$ y $\rho/\rho_T=(M/m_T)/(R/R_T)^3$.

**Error típico.** Elevar al cuadrado la razón de masas, o usar $(1/8)$ sin elevar al cuadrado (o al cubo para la densidad).

**Figura SVG sugerida.** Dos círculos (Tierra y Titania, radio 1/8) con barras de $g$ (9,80 frente a 0,37 m/s²) y de $\rho$ (5500 frente a 1700 kg/m³).

Teoría: U §13.2 pp. 403–404 (13.4, densidad media).

---

### E4. Ejercicio 13.17 — rapidez de escape de Marte y de Júpiter (Solucionario 13-7)

**Enunciado (traducido de U p. 426).** Use los resultados del ejemplo 13.5 para calcular la rapidez de escape de una nave a) desde la superficie de Marte y b) desde la superficie de Júpiter. Use los datos del apéndice (G). c) ¿Por qué la rapidez de escape de la nave es independiente de su masa?

**Solución.**

1. **Fórmula** (Ej. 13.5, U p. 406): conservación de la energía entre la superficie ($K_1=\tfrac12mv^2$, $U_1=-GMm/R$) y el infinito con rapidez nula ($K_2=U_2=0$) ⇒ $v_{esc}=\sqrt{2GM/R}$.
2. **Datos** (Apéndice G, p. A-8): Marte $M=6{,}42\times10^{23}$ kg, $R=3{,}39\times10^6$ m; Júpiter $M=1{,}90\times10^{27}$ kg, $R=6{,}99\times10^7$ m.
3. **a)** $v=\sqrt{2(6{,}67\times10^{-11})(6{,}42\times10^{23})/(3{,}39\times10^6)}=$ **$5{,}03\times10^3$ m/s**.
4. **b)** $v=\sqrt{2(6{,}67\times10^{-11})(1{,}90\times10^{27})/(6{,}99\times10^7)}=$ **$6{,}02\times10^4$ m/s**.
5. **c)** $K$ y $U$ son ambas proporcionales a la masa $m$ de la nave: en $\tfrac12mv^2=GMm/R$ la $m$ se simplifica. Solo importan $M$ y $R$ del planeta.
6. **Comparación.** Tierra: $1{,}12\times10^4$ m/s (Ej. 13.5). Marte < Tierra < Júpiter.

**Receta.** $v_{esc}=\sqrt{2GM/R}$; no depende de la masa ni de la dirección de lanzamiento (sin aire).

**Error típico.** Olvidar el 2 (eso da la rapidez de órbita rasante, $\sqrt{GM/R}$), o usar el diámetro en lugar del radio.

**Figura SVG sugerida.** Barras horizontales de $v_{esc}$: Marte 5,03 km/s, Tierra 11,2 km/s, Júpiter 60,2 km/s.

Teoría: U §13.3 p. 406 (Ej. 13.5); 13.29 p. 419.

---

### E5. Ejercicio 13.19 — $g$ a partir de la rapidez de escape (Solucionario 13-8)

**Enunciado (traducido de U p. 426).** Un planeta que orbita una estrella distante tiene un radio de $3{,}24\times10^6$ m. La rapidez de escape de un objeto lanzado desde la superficie de este planeta es de $7{,}65\times10^3$ m/s. ¿Cuál es la aceleración debida a la gravedad en la superficie del planeta?

**Solución.**

1. **Dos ecuaciones, una incógnita auxiliar ($M$).** Escape: $\tfrac12mv^2-\dfrac{GMm}{R}=0$ ⇒ $GM=\tfrac12Rv^2$. Gravedad superficial: $g=\dfrac{GM}{R^2}$ (13.4).
2. **Eliminar $GM$** (no hace falta conocer $G$ ni $M$ por separado): $g=\dfrac{\tfrac12Rv^2}{R^2}=\dfrac{v^2}{2R}$.
3. **Número:** $g=\dfrac{(7{,}65\times10^3)^2}{2(3{,}24\times10^6)}=$ **9,03 m/s²** (parecida a la terrestre: razonable para un planeta rocoso).
4. **Extra:** $M=\dfrac{Rv^2}{2G}=1{,}42\times10^{24}$ kg.

**Receta.** $v_{esc}^2=2gR$: conocidos dos de $\{v_{esc},g,R\}$, sale el tercero sin pasar por $G$ ni $M$.

**Error típico.** Calcular primero $M$ con muchos decimales y arrastrar errores, o confundir $v^2/(2R)$ con $v^2/R$.

**Figura SVG sugerida.** No imprescindible; si acaso, el «puente» $v_{esc}=\sqrt{2GM/R}$ y $g=GM/R^2$ ⇒ $g=v^2/2R$ en dos cajas unidas por $GM$.

Teoría: U §13.2 p. 403 (13.4); §13.3 p. 406 (Ej. 13.5).

---

### E6. Problema 13.61 — martillo que cae desde una altura no pequeña (Solucionario 13-25)

**Enunciado (traducido de U p. 428).** Un martillo de masa $m$ se deja caer del reposo desde una altura $h$ arriba de la superficie terrestre, no necesariamente pequeña en comparación con el radio $R_T$ de la Tierra. Despreciando la resistencia del aire, deduzca una expresión para la rapidez $v$ del martillo cuando llega a la superficie terrestre. Su expresión deberá incluir $h$, $R_T$ y $m_T$.

**Solución.**

1. **Por qué no vale $v=\sqrt{2gh}$:** supone $g$ constante; si $h$ no es pequeña, $g$ disminuye con la altura ⇒ hay que usar $U=-Gm_Tm/r$ (13.9, U p. 405).
2. **Conservación de la energía** (solo trabaja la gravedad): punto 1, $r_1=R_T+h$, $K_1=0$; punto 2, $r_2=R_T$, $K_2=\tfrac12mv^2$.
3. $0-\dfrac{Gm_Tm}{R_T+h}=\tfrac12mv^2-\dfrac{Gm_Tm}{R_T}$ ⇒ $v^2=2Gm_T\left(\dfrac1{R_T}-\dfrac1{R_T+h}\right)=\dfrac{2Gm_Th}{R_T(R_T+h)}$.
4. **Resultado:** $v=\sqrt{\dfrac{2Gm_Th}{R_T(R_T+h)}}$ (sympy).
5. **Comprobaciones de límites.** $h\ll R_T$ ⇒ $v^2\approx2(Gm_T/R_T^2)h=2gh$ ✓ (con $h=1$ km: 140,08 m/s frente a 140,07 m/s). $h\to\infty$ ⇒ $v\to\sqrt{2Gm_T/R_T}=1{,}12\times10^4$ m/s, la rapidez de escape (es el proceso inverso de escapar). Con $h=R_T$: $v=\sqrt{Gm_T/R_T}=7{,}91$ km/s, mientras que $\sqrt{2gh}$ daría 11,2 km/s (¡un 41 % más!).

**Receta.** Caídas o lanzamientos con alturas comparables a $R$: $K_1-\dfrac{GMm}{r_1}=K_2-\dfrac{GMm}{r_2}$ con $r$ desde el **centro**.

**Error típico.** Poner $r_1=h$ (falta sumar $R_T$), o usar $mgh$ cuando $h$ es grande.

**Figura SVG sugerida.** Gráfica $v(h)$ (en km/s, $h$ de 0 a $3R_T$): curva exacta frente a $\sqrt{2gh}$ (que crece sin límite), con la asíntota $v_{esc}=11{,}2$ km/s y el punto $h=R_T$: 7,91 frente a 11,2 km/s.

Teoría: U §13.3 pp. 405–407 (13.9, conservación, límite $mgy$).

---

### E7. Ejercicio 13.21 — satélite a 890 km de altura (Solucionario 13-9)

**Enunciado (traducido de U p. 426).** Para que un satélite tenga una órbita circular de 890 km arriba de la superficie terrestre, a) ¿qué rapidez orbital debe tener? y b) ¿cuál es el periodo de la órbita (en horas)?

**Solución.**

1. **Radio de la órbita** (desde el centro): $r=R_T+h=6{,}37\times10^6+0{,}89\times10^6=7{,}26\times10^6$ m.
2. **Por qué $v=\sqrt{Gm_T/r}$.** La única fuerza es la gravedad y hace de fuerza centrípeta: $\dfrac{Gm_Tm}{r^2}=\dfrac{mv^2}{r}$ (2.ª ley en el MCU) ⇒ (13.10, U p. 408).
3. **a)** $v=\sqrt{\dfrac{(6{,}67\times10^{-11})(5{,}97\times10^{24})}{7{,}26\times10^6}}=$ **$7{,}41\times10^3$ m/s**.
4. **b)** $T=\dfrac{2\pi r}{v}=\dfrac{2\pi(7{,}26\times10^6)}{7406}=6{,}16\times10^3$ s = **1,71 h** (13.12).
5. **Coherencia.** Más alto que el satélite del Ej. 13.6 (300 km: 7730 m/s, 90,4 min) ⇒ más lento y con más periodo ✓. La aceleración $v^2/r=7{,}55$ m/s² es el valor de $g$ a esa altura.

**Receta.** Órbita circular: $r=R+h$ → $v=\sqrt{GM/r}$ → $T=2\pi r/v$.

**Error típico.** Usar $h$ como radio de la órbita.

**Figura SVG sugerida.** Tierra con la órbita a escala ($r/R_T=1{,}14$), vector $\vec v$ tangente (7,41 km/s) y $\vec F_g$ radial; rótulo $T=1{,}71$ h.

Teoría: U §13.4 pp. 408–409 (13.10–13.12).

---

### E8. Problema 13.49 — satélites geosíncronos (Solucionario 13-20 y 13-21)

**Enunciado (traducido de U p. 428).** Muchos satélites se mueven en un círculo en el plano ecuatorial de la Tierra y están a tal altura que siempre permanecen sobre el mismo punto. a) Determine la altitud de estos satélites sobre la superficie terrestre (una órbita así se llama geosíncrona o geoestacionaria). b) Explique, con un dibujo, por qué las señales de radio de esos satélites no pueden llegar directamente a receptores terrestres situados a más de 81,3° de latitud norte.

**Solución.**

1. **Condición.** Para estar siempre sobre el mismo punto, el satélite debe dar una vuelta en el mismo tiempo que la Tierra gira sobre sí misma: $T\approx1$ día $=8{,}64\times10^4$ s (y moverse en el plano del ecuador, en el mismo sentido).
2. **Despejar $r$ de la 3.ª ley para órbita circular** (13.12): $T^2=\dfrac{4\pi^2r^3}{Gm_T}$ ⇒ $r=\left(\dfrac{Gm_TT^2}{4\pi^2}\right)^{1/3}=4{,}22\times10^7$ m.
3. **Altitud:** $h=r-R_T=4{,}22\times10^7-0{,}637\times10^7=$ **$3{,}59\times10^7$ m** (≈ 36 000 km; unos 5,6 radios terrestres). Rapidez $v=2\pi r/T=3{,}07$ km/s.
4. **Afinando (opcional).** La Tierra da una vuelta respecto a las estrellas en 86 164 s (día sidéreo, U p. 418); con ese $T$ sale $r=4{,}21\times10^7$ m y $h=3{,}58\times10^7$ m: la diferencia es menor del 0,3 %.
5. **b) Geometría.** La señal viaja en línea recta; el satélite solo «ve» los puntos de la Tierra por debajo de la recta tangente trazada desde él. En el triángulo rectángulo centro-punto de tangencia-satélite: $\cos\theta=\dfrac{R_T}{r}=\dfrac{6{,}37\times10^6}{4{,}22\times10^7}=0{,}151$ ⇒ **$\theta=81{,}3°$**. Los puntos de latitud mayor que 81,3° quedan «detrás del horizonte» del satélite.

**Receta.** Órbita con periodo impuesto ⇒ $r=(GMT^2/4\pi^2)^{1/3}$, $h=r-R$. Visibilidad desde una órbita de radio $r$: latitud límite $\arccos(R/r)$.

**Error típico.** Usar $T$ en horas; olvidar restar $R_T$; confundir latitud con el ángulo medido desde el polo.

**Figura SVG sugerida.** Tierra (círculo) y el satélite a $r=6{,}6R_T$ en el plano del ecuador; recta tangente del satélite a la Tierra, ángulo $\theta=81{,}3°$ en el centro entre el ecuador y el radio al punto de tangencia; zona polar sombreada «sin señal directa».

Teoría: U §13.4 p. 409 (13.12); U p. 418 (día sidéreo). Respuesta de U (impares, p. A-12): $3{,}59\times10^7$ m.

---

### E9. Problema 13.68 — trabajo de los motores para subir de órbita circular (Solucionario 13-28 y 13-29)

**Enunciado (traducido de U p. 429).** Un cohete de masa $5{,}00\times10^3$ kg está en una órbita circular de radio $7{,}20\times10^6$ m alrededor de la Tierra. Los motores se encienden durante un tiempo para aumentar ese radio a $8{,}80\times10^6$ m, con la órbita otra vez circular. a) ¿Cuál es el cambio en la energía cinética del cohete? ¿Aumenta o disminuye? b) ¿Cuál es el cambio en la energía potencial gravitacional? ¿Aumenta o disminuye? c) ¿Cuánto trabajo realizan los motores para cambiar el radio orbital?

**Solución.**

1. **Energías en órbita circular.** De (13.10), $K=\tfrac12mv^2=\dfrac{Gm_Tm}{2r}$; $U=-\dfrac{Gm_Tm}{r}$ (13.9) ⇒ $U=-2K$ y $E=K+U=-\dfrac{Gm_Tm}{2r}$ (13.13, U p. 409).
2. **Valores** ($Gm_Tm=1{,}991\times10^{18}$ J·m): $K_1=1{,}383\times10^{11}$ J ($v_1=7{,}44$ km/s), $K_2=1{,}131\times10^{11}$ J ($v_2=6{,}73$ km/s).
3. **a)** $\Delta K=\dfrac{Gm_Tm}{2}\left(\dfrac1{r_2}-\dfrac1{r_1}\right)=$ **$-2{,}51\times10^{10}$ J**: la energía cinética **disminuye** (más lejos, órbita más lenta).
4. **b)** $\Delta U=Gm_Tm\left(\dfrac1{r_1}-\dfrac1{r_2}\right)=-2\Delta K=$ **$+5{,}03\times10^{10}$ J**: **aumenta** (se hace menos negativa).
5. **c)** Energía con trabajo de otras fuerzas: $K_1+U_1+W_{mot}=K_2+U_2$ ⇒ $W_{mot}=\Delta K+\Delta U=\Delta E=$ **$+2{,}51\times10^{10}$ J** (exactamente $-\Delta K$).
6. **Paradoja aparente.** Los motores hacen trabajo positivo… y el cohete termina **más lento**: el trabajo de los motores más el que «devuelve» la cinética se invierte en energía potencial.

**Receta.** Cambio entre órbitas circulares: $W_{otras}=\Delta E=\dfrac{GMm}{2}\left(\dfrac1{r_1}-\dfrac1{r_2}\right)$, con $\Delta U=-2\Delta K$ y $W=-\Delta K$.

**Error típico.** Calcular solo $\Delta U$ como trabajo (olvidar que $K$ baja), o pensar que subir de órbita aumenta la rapidez.

**Figura SVG sugerida.** Diagrama de barras de energía en las dos órbitas ($K_1=1{,}38$, $U_1=-2{,}77$, $E_1=-1{,}38$; $K_2=1{,}13$, $U_2=-2{,}26$, $E_2=-1{,}13$, en $10^{11}$ J) con la flecha $W=+0{,}251\times10^{11}$ J entre $E_1$ y $E_2$.

Teoría: U §13.3 p. 405 (13.9); §13.4 pp. 408–409 (13.10, 13.13); U §7.1 (energía con trabajo de otras fuerzas).

---

### E10. Ejercicio 13.29 — la órbita de Plutón (Solucionario 13-11)

**Enunciado (traducido de U p. 426).** El planeta enano Plutón tiene una órbita elíptica con un semieje mayor de $5{,}91\times10^{12}$ m y excentricidad de 0,249. a) Calcule el periodo orbital de Plutón. Exprese su respuesta en segundos y en años terrestres. b) Durante la órbita de Plutón alrededor del Sol, ¿cuál es su distancia más cercana y más lejana del Sol?

**Solución.**

1. **a) Tercera ley de Kepler** (13.17): $T=\dfrac{2\pi a^{3/2}}{\sqrt{Gm_S}}=\dfrac{2\pi(5{,}91\times10^{12})^{3/2}}{\sqrt{(6{,}67\times10^{-11})(1{,}99\times10^{30})}}=$ **$7{,}84\times10^9$ s** $=7{,}84\times10^9/3{,}156\times10^7=$ **248 años**. La excentricidad no interviene (el periodo solo depende de $a$, U p. 412).
2. **b) Perihelio y afelio** (fig. 13.18): el Sol está en un foco, a $ea$ del centro ⇒ $r_{mín}=a(1-e)=5{,}91\times10^{12}(0{,}751)=$ **$4{,}44\times10^{12}$ m**; $r_{máx}=a(1+e)=5{,}91\times10^{12}(1{,}249)=$ **$7{,}38\times10^{12}$ m**. Comprobación: $r_{mín}+r_{máx}=2a$ ✓.
3. **Interpretación.** $r_{máx}/r_{mín}=1{,}66$, mucho más excéntrica que la Tierra ($e=0{,}017$). El periodo coincide con el del Apéndice G (247,9 años) ✓.

**Receta.** Elipse: $T$ con la 3.ª ley usando $a$; distancias extremas $a(1\mp e)$; al revés, $a=(r_p+r_a)/2$ y $e=(r_a-r_p)/(r_a+r_p)$.

**Error típico.** Meter $e$ en la tercera ley o tomar $a$ como la distancia al Sol en todo momento.

**Figura SVG sugerida.** Elipse con $e=0{,}249$ a escala, Sol en el foco, cotas $r_{mín}=4{,}44\times10^{12}$ m y $r_{máx}=7{,}38\times10^{12}$ m, centro y $ea=1{,}47\times10^{12}$ m.

Teoría: U §13.5 pp. 411–413 (fig. 13.18, 13.17, Ej. 13.9).

---

### E11. Ejercicio 13.36 — el elfo en el polo y en el ecuador (Solucionario 13-14 y 13-15)

**Enunciado (traducido de U p. 427).** Usted visita a Santa Claus en el polo norte. Allí observa que el elfo Sneezy, cuando cuelga de una cuerda, produce en ella una tensión de 395,0 N. Si Sneezy cuelga de una cuerda similar mientras reparte regalos en el ecuador, ¿cuál será la tensión? (Recuerde que la Tierra gira alrededor de un eje que pasa por los polos norte y sur.) Use los datos del apéndice y empiece con un diagrama de cuerpo libre de Sneezy en el ecuador.

**Solución.**

1. **Polo.** Sneezy está sobre el eje: no gira, $a=0$ ⇒ $T_{polo}=w_0$ (peso verdadero) $=395{,}0$ N. Masa: $m=w_0/g_0$ con $g_0=Gm_T/R_T^2=9{,}81$ m/s² ⇒ $m=40{,}3$ kg.
2. **Ecuador: DCL.** Peso verdadero $w_0$ hacia el centro, tensión $T$ hacia fuera. Sneezy describe un círculo de radio $R_T$ en un día ⇒ tiene aceleración centrípeta $a_{rad}=v^2/R_T=0{,}0339$ m/s² (U p. 418, con $v=465$ m/s).
3. **2.ª ley** (hacia el centro +): $w_0-T=ma_{rad}$ ⇒ $T=w_0-ma_{rad}=395{,}0-40{,}3\times0{,}0339=395{,}0-1{,}37=$ **394 N** (13.27).
4. **Interpretación.** La cuerda soporta un poco menos (0,35 %) porque parte de la atracción se usa en hacer girar a Sneezy.

**Receta.** Peso aparente en el ecuador $=w_0\left(1-\dfrac{a_{rad}}{g_0}\right)$, con $a_{rad}=4\pi^2R/T^2$; en el polo, $=w_0$.

**Error típico.** Sumar $ma_{rad}$ (la tensión sería mayor), o poner $a_{rad}=g$.

**Figura SVG sugerida.** Corte de la Tierra con Sneezy en el polo ($T=395{,}0$ N = $w_0$) y en el ecuador (DCL: $w_0=395{,}0$ N hacia el centro, $T=394$ N hacia fuera, flecha $a_{rad}=0{,}0339$ m/s² hacia el centro; «diferencia no a escala»).

Teoría: U §13.7 pp. 417–418 (13.27, valor 0,0339 m/s²).

---

### E12. Ejercicio 13.40 — el agujero negro de Markarian 766 (Solucionario 13-16)

**Enunciado (traducido de U p. 427).** En 2005 se anunció el descubrimiento de un enorme agujero negro en la galaxia Markarian 766, con aglomeraciones de materia que lo orbitan una vez cada 27 horas moviéndose a 30 000 km/s. a) ¿A qué distancia están esas aglomeraciones del centro del agujero negro? b) ¿Cuál es la masa del agujero negro, suponiendo órbitas circulares? Exprésela en kilogramos y en masas solares. c) ¿Cuál es el radio de su horizonte de eventos?

**Solución.**

1. **Datos en SI:** $v=3{,}00\times10^7$ m/s, $T=27\cdot3600=9{,}72\times10^4$ s.
2. **a) Cinemática del círculo** (13.11): $v=2\pi r/T$ ⇒ $r=\dfrac{vT}{2\pi}=$ **$4{,}64\times10^{11}$ m** (unas 3 veces la distancia Tierra-Sol).
3. **b) Dinámica:** $T^2=\dfrac{4\pi^2r^3}{GM}$ (13.12 con $M$ del agujero) ⇒ $M=\dfrac{4\pi^2r^3}{GT^2}=$ **$6{,}26\times10^{36}$ kg** $=6{,}26\times10^{36}/1{,}99\times10^{30}=$ **$3{,}15\times10^6$ masas solares**. (Comprobación por otro camino: $M=v^2r/G$ de 13.10, mismo valor.)
4. **c) Horizonte de eventos** (13.30): $R_S=\dfrac{2GM}{c^2}=\dfrac{2(6{,}67\times10^{-11})(6{,}26\times10^{36})}{(3{,}00\times10^8)^2}=$ **$9{,}28\times10^9$ m**.
5. **Coherencia.** $R_S/r=2v^2/c^2=0{,}02$: la materia orbita a 50 radios de Schwarzschild, fuera del horizonte ✓.

**Receta.** Masa de un cuerpo central a partir de una órbita: con $v$ y $T$ ⇒ $r=vT/2\pi$; luego $M=4\pi^2r^3/(GT^2)=v^2r/G$. Horizonte: $R_S=2GM/c^2$.

**Error típico.** No pasar km/s a m/s o horas a segundos; usar la masa del Sol en lugar de despejar $M$.

**Figura SVG sugerida.** Esquema no a escala: punto central con círculo $R_S=9{,}28\times10^9$ m (horizonte) y órbita $r=4{,}64\times10^{11}$ m con $\vec v$ (30 000 km/s) y $T=27$ h; rótulo $M=3{,}15\times10^6M_S$.

Teoría: U §13.4 pp. 408–409 (13.10–13.12); §13.8 p. 420 (13.30) y p. 422 (masa por la 3.ª ley).

---

### E13. Problema 13.71 — planeta con densidad que disminuye linealmente (Solucionario 13-30)

**Enunciado (traducido de U p. 429).** Los planetas no son uniformes en su interior: normalmente son más densos en el centro y su densidad disminuye hacia la superficie. Modele un planeta esféricamente simétrico, del mismo radio que la Tierra, cuya densidad disminuye linealmente con la distancia al centro, de $15{,}0\times10^3$ kg/m³ en el centro a $2{,}0\times10^3$ kg/m³ en la superficie. Determine la aceleración debida a la gravedad en la superficie de ese planeta.

**Solución.**

1. **Idea.** Con simetría esférica, en la superficie el planeta atrae como una partícula con toda su masa en el centro (13.2, §13.6) ⇒ $g=GM/R^2$. El problema se reduce a calcular $M$ cuando la densidad no es constante.
2. **Densidad:** $\rho(r)=\rho_0-br$, con $b=\dfrac{\rho_0-\rho_s}{R}$ (vale $\rho_0$ en $r=0$ y $\rho_s$ en $r=R$).
3. **Masa por capas.** Una capa esférica de radio $r$ y espesor $dr$ tiene volumen $dV=4\pi r^2dr$ y masa $dm=\rho(r)\,4\pi r^2dr$ (la misma descomposición en cascarones de U §13.6). Integrando: $M=\displaystyle\int_0^R(\rho_0-br)4\pi r^2dr=\tfrac43\pi\rho_0R^3-\pi bR^4=\pi R^3\left(\frac{\rho_0}{3}+\rho_s\right)$ (sympy).
4. **Números:** $M=\pi(6{,}37\times10^6)^3(5000+2000)=$ **$5{,}68\times10^{24}$ kg**.
5. **Gravedad:** $g=\dfrac{GM}{R^2}=\pi GR\left(\dfrac{\rho_0}{3}+\rho_s\right)=$ **9,34 m/s²** (respuesta de U, p. A-12).
6. **Comprobaciones.** Densidad media $M/(\tfrac43\pi R^3)=\tfrac14\rho_0+\tfrac34\rho_s=5250$ kg/m³, parecida a la terrestre (5500): por eso $g$ sale parecida a 9,8. Ojo: **no** es la media aritmética $(\rho_0+\rho_s)/2=8500$, porque hay mucho más volumen cerca de la superficie que cerca del centro.
7. **Extra (propio, interesante para el interactivo 2):** dentro del planeta $g(r)=\dfrac{GM(r)}{r^2}=4\pi G\left(\dfrac{\rho_0r}{3}-\dfrac{br^2}{4}\right)$, que tiene un máximo en $r=\dfrac{2\rho_0}{3b}=\dfrac{10}{13}R$ con $g_{máx}=10{,}27$ m/s² > $g$ en la superficie. Con un núcleo denso, la gravedad **aumenta** al bajar un trecho (como en la Tierra real, fig. 13.9).

**Receta.** Densidad variable con $r$: $M=\int_0^R\rho(r)\,4\pi r^2dr$ y después $g=GM/R^2$.

**Error típico.** Tomar $\rho$ media $=(\rho_0+\rho_s)/2$ (da $g=15{,}1$ m/s²), o integrar $\rho\,dr$ sin el factor $4\pi r^2$.

**Figura SVG sugerida.** Dos gráficas apiladas frente a $r/R$: $\rho(r)$ (recta de 15 000 a 2000 kg/m³) y $g(r)$ (curva con máximo 10,27 m/s² en $0{,}77R$ y 9,34 en $R$; a trazos la de una esfera uniforme de igual masa, recta hasta 9,34).

Teoría: U §13.2 p. 403 (13.4); §13.6 pp. 414–416 (cascarones, masa interior).

---

## Resumen de resultados (para la chuleta y las figuras)

| Id | Fuente | Resultado verificado (sympy) | Herramienta |
|---|---|---|---|
| X1 | Examen Febrero 2024 (1ª semana) P-2 | Titán: $g_{polo}=1{,}3637$, $g_{ec}=1{,}3637$ m/s² ($\Delta g=\omega^2R=5{,}35\times10^{-5}$ m/s², 0,004 %); Marte: $g_{polo}=3{,}727$, $g_{ec}=3{,}710$ m/s² ($\Delta g=0{,}0171$ m/s², 0,46 %) | 13.4 y 13.27 |
| X2 | Examen Febrero 2024 (1ª semana) P-4 Teoría Opción B | (a) a mediodía (0,017 % más); (b) $g=\tfrac43\pi G\rho R\propto R$ | 13.1 + 3.ª ley; 13.4 |
| X3 | Examen Febrero 2023 (2ª semana) P-4 Teoría Opción B | $W_{órbita}=0$ en ambos casos; en la elipse $W>0$ afelio→perihelio y $W<0$ al revés | $\vec F\perp\vec v$; 13.8 |
| X4 | Examen Febrero 2022 (1ª semana) P-3 Teoría Opción 3.2 | ISS: $g=8{,}7$ m/s² (89 %); alcance infinito; $E<0$ vuelve ($r_{máx}=GMm/\lvert E\rvert$), $E>0$ escapa | 13.5, 13.9 |
| X5 | Examen Septiembre 2022 P-4 Teoría Opción B | $mgh$ = límite de $-GMm/r$ para $h\ll R_T$; $W$ entre dos playas = 0 | 13.8, 13.9 |
| X6 | Examen Septiembre 2023 P-4 Teoría Opción B | (a) Tierra→Luna: 61 MJ/kg frente a 2,6 MJ/kg; (b) noviembre ($v_p/v_a=1{,}035$) | 13.9; 13.16 |
| E1 | Solucionario 13-3/13-4, Ej. 13.6 | a) $2{,}8\times10^{-8}$ N a la derecha; b) $2{,}5\times10^{-8}$ N a la izquierda | 13.1 + superposición |
| E2 | Solucionario 13-6, Ej. 13.11 | $h=(\sqrt{10}-1)R_T=1{,}38\times10^7$ m | 13.5 |
| E3 | Solucionario 13-6/13-7, Ej. 13.13 | $g=0{,}37$ m/s²; $\rho=1{,}7\times10^3$ kg/m³ | 13.4, densidad |
| E4 | Solucionario 13-7, Ej. 13.17 | Marte $5{,}03\times10^3$ m/s; Júpiter $6{,}02\times10^4$ m/s | Ej. 13.5 |
| E5 | Solucionario 13-8, Ej. 13.19 | $g=v^2/2R=9{,}03$ m/s² | Ej. 13.5 + 13.4 |
| E6 | Solucionario 13-25, Prob. 13.61 | $v=\sqrt{2Gm_Th/[R_T(R_T+h)]}$ | 13.9 + conservación |
| E7 | Solucionario 13-9, Ej. 13.21 | $v=7{,}41\times10^3$ m/s; $T=6{,}16\times10^3$ s = 1,71 h | 13.10, 13.12 |
| E8 | Solucionario 13-20/13-21, Prob. 13.49 | $r=4{,}22\times10^7$ m, $h=3{,}59\times10^7$ m, $v=3{,}07$ km/s; $\theta=81{,}3°$ | 13.12 |
| E9 | Solucionario 13-28/13-29, Prob. 13.68 | $\Delta K=-2{,}51\times10^{10}$ J; $\Delta U=+5{,}03\times10^{10}$ J; $W=+2{,}51\times10^{10}$ J | 13.13 |
| E10 | Solucionario 13-11, Ej. 13.29 | $T=7{,}84\times10^9$ s = 248 años; $4{,}44\times10^{12}$ y $7{,}38\times10^{12}$ m | 13.17 |
| E11 | Solucionario 13-14/13-15, Ej. 13.36 | $T=394$ N | 13.27 |
| E12 | Solucionario 13-16, Ej. 13.40 | $r=4{,}64\times10^{11}$ m; $M=6{,}26\times10^{36}$ kg $=3{,}15\times10^6M_S$; $R_S=9{,}28\times10^9$ m | 13.11, 13.12, 13.30 |
| E13 | Solucionario 13-30, Prob. 13.71 | $M=5{,}68\times10^{24}$ kg; $g=9{,}34$ m/s²; $\rho_{media}=5250$ kg/m³ | $\int\rho\,4\pi r^2dr$ + 13.4 |

**Chuleta (fórmulas clave).** $F_g=Gm_1m_2/r^2$ · $g=GM/R^2$ · $w(r)=GMm/r^2$ · $U=-GMm/r$ · $W_{grav}=GMm(1/r_2-1/r_1)$ · $v_{esc}=\sqrt{2GM/R}$ · $v_{circ}=\sqrt{GM/r}$ · $T=2\pi r^{3/2}/\sqrt{GM}$ · $E_{circ}=-GMm/2r$ ($K=-U/2$) · $T^2=4\pi^2a^3/(Gm_S)$ · $r_{p,a}=a(1\mp e)$ · $dA/dt=L/2m$ · dentro de esfera uniforme $g=g_0\,r/R$ · cascarón: $g=0$ dentro · $g_{ec}=g_0-4\pi^2R/T^2$ · $R_S=2GM/c^2$ · a igual densidad $g\propto R$ y $v_{esc}\propto R$.

**Lista «sé hacer» sugerida.** Sumar fuerzas gravitacionales (en línea y en 2D) · calcular $g$ de un planeta con $M$ y $R$ o por escalado respecto a la Tierra · hallar la altura a la que $g$ vale una fracción · usar $U=-GMm/r$ con conservación de la energía (escape, caídas desde gran altura) · resolver órbitas circulares ($v$, $T$, $E$, trabajo para cambiar de órbita) · aplicar la 3.ª ley de Kepler (periodo, semieje, masa del cuerpo central) · perihelio y afelio · peso aparente en el polo y el ecuador · radio de Schwarzschild · masa de un planeta con densidad variable.

---

## Ideas de interactivos three.js (2D, máx. 2)

### I1. `orbitas-kepler` (2D, `{"dim":2}`) — de la órbita circular al escape

- **Qué se ve.** Masa central (Tierra) y una nave lanzada **horizontalmente** desde $r_0$ con rapidez $v_0=k\,v_{circ}$, $v_{circ}=\sqrt{GM/r_0}$. Deslizador $k\in[0{,}7;\,1{,}5]$. Se dibuja la trayectoria (cónica), la nave moviéndose con el tiempo real escalado, y sectores barridos en intervalos iguales (2.ª ley). Panel: $K$, $U$, $E$ (barras), $e$, $a$, $T$, $r_p$, $r_a$, $v_p$, $v_a$. Para $k\ge\sqrt2$: rótulo «escapa ($E\ge0$)» y sin $T$.
- **Fórmulas** (unidades reducidas $GM=1$, $r_0=1$, $v$ en $v_{circ}$): $E/m=k^2/2-1$; $a=1/(2-k^2)$; el otro ápside $r_2=2a-1$; $e=\lvert k^2-1\rvert$; $T=2\pi a^{3/2}$; $v_2=k/r_2$ ($L$ constante). Integración numérica (Verlet, paso pequeño) o paramétrica $r(\theta)=\dfrac{k^2}{1+(k^2-1)\cos\theta}$.
- **Valores de control (Python).** $k=1$: círculo, $T=2\pi=6{,}283$, $E=-0{,}5$. $k=1{,}2$: $e=0{,}44$, $a=1{,}786$, $r_a=2{,}571$, $T=14{,}99$, $v_a=0{,}467$, $E=-0{,}28$. $k=1{,}3$: $e=0{,}69$, $a=3{,}226$, $r_a=5{,}452$, $T=36{,}40$. $k=0{,}9$: el punto de lanzamiento es el **afelio**, $r_p=0{,}681$, $a=0{,}840$, $T=4{,}84$, $v_p=1{,}322$. $k=\sqrt2=1{,}414$: $E=0$ (escape, Ej. 13.5). En unidades reales con $r_0=6{,}67\times10^6$ m (Ej. 13.6): $v_{circ}=7{,}73$ km/s, $T=90{,}4$ min, $v_{esc}=10{,}93$ km/s; con $k=1{,}2$: $a=1{,}19\times10^7$ m, $r_a=1{,}72\times10^7$ m, $T=216$ min, $v_a=3{,}61$ km/s.
- **Qué enseña que la figura no.** Que una sola condición inicial decide círculo/elipse/escape; que la nave acelera al acercarse y frena al alejarse; que $E$ es constante mientras $K$ y $U$ se intercambian; que $T$ solo depende de $a$.

### I2. `g-radial` (2D, `{"dim":2}`, `escalaX` porque $r$ y $g$ tienen unidades distintas) — $g(r)$ dentro y fuera de un planeta

- **Qué se ve.** Gráfica $g(r)$ de $r=0$ a $4R_T$ con un punto arrastrable; selector de modelo: (i) esfera uniforme: $g=g_0r/R$ dentro, $g_0R^2/r^2$ fuera (Ej. 13.10 y 13.5); (ii) densidad lineal de E13: $g=4\pi G(\rho_0r/3-br^2/4)$ dentro; (iii) cascarón: $g=0$ dentro (13.26). Opcional: segunda curva $U(r)=-GMm/r$ fuera (13.9).
- **Valores de control** ($G=6{,}67\times10^{-11}$, $m_T$, $R_T$ de U ⇒ $g_0=9{,}81$ m/s²): uniforme $g(R/2)=4{,}91$, $g(R)=9{,}81$, $g(2R)=2{,}45$, $g(\sqrt{10}R)=0{,}981$ m/s² (E2); ISS ($r=6770$ km) 8,69 m/s². Densidad lineal: $g(R/4)=5{,}59$, $g(R/2)=9{,}01$, máximo $10{,}27$ m/s² en $r=0{,}769R$, $g(R)=9{,}34$ m/s² (E13).
- **Qué enseña.** Que fuera de la esfera da igual cómo esté repartida la masa (todas las curvas coinciden para $r\ge R$ si la masa es la misma; para comparar, normalizar a igual $M$), y que dentro solo cuenta la masa interior.

---

## Notas internas para el redactor (NO publicar en el HTML; regla 8 bis)

1. **Citas de examen:** usar exactamente las de la tabla de la Parte A. El índice `examenes_por_tema.md` se ha corregido en esta tarea (las dos «Ley de Newton de la gravitación» son **P-4** Opción B; añadidas Sept 2022 P-4 y Sept 2023 P-4). No escribir nada sobre esa corrección en el HTML.
2. **Sept 2022 P-4 (X5):** el enunciado impreso escribe la expresión (2) sin signo menos. En el Tema 7 (X8) se transcribió literal. En el HTML del Tema 13, transcribir el enunciado tal cual y responder como está en X5 (paso 1: «el valor $GMm/r$ … es su valor absoluto; la energía potencial es $U=-GMm/r$»), sin calificar el enunciado.
3. **X2–X6 ya aparecen en los temas 6 y 7** (Tema 6: X3 = cuestiones de Feb 2023 P-4, X4 = Sept 2022 P-4 (b); Tema 7: X7 = Feb 2022 P-3 3.2, X8 = Sept 2022 P-4). En el Tema 13 van completas (desarrollo + cuestiones) porque son de este tema; basta un enlace «véase también el tema 7».
4. **G:** en X1 usar $6{,}672\times10^{-11}$ (lo da el enunciado); en todo lo demás $6{,}67\times10^{-11}$ (U p. 400). Valores de E calculados con 6,67: algunos difieren en la última cifra de los que trae el solucionario (que usa 6,673); los de este fichero son los correctos con los datos de U y coinciden con las respuestas de U p. A-12 cuando las hay (impares; p. ej. E13: 9,34 m/s²). En E9 (par, sin respuesta en U) usar $\Delta K=-2{,}51\times10^{10}$ J, $\Delta U=+5{,}03\times10^{10}$ J y $W=+2{,}51\times10^{10}$ J, coherentes entre sí ($W=-\Delta K$, $\Delta U=-2\Delta K$). No comentar la discrepancia.
5. **E8:** dar $3{,}59\times10^7$ m con $T=24$ h (respuesta de U) y el refinamiento con el día sidéreo como paso opcional, sin presentarlo como corrección de nadie.
6. **E11:** se usa $a_{rad}=0{,}0339$ m/s² de U p. 418 (día sidéreo) y $g_0=9{,}81$; con 24 h y 9,80 sale también 394 N.
7. **Datos astronómicos:** citar «Apéndice G, p. A-8» (es donde están en U). Las respuestas de los impares están en «U p. A-12».
8. **Preguntas P13.x de U** (pp. 424–425) coinciden con las cuestiones de examen: se pueden citar como fuente adicional en el `data-ref` (p. ej. «Examen Febrero 2024 (1ª semana) P-4 Teoría Opción B (a); U P13.5 p. 424»), sin comentario.
9. **Material propio** (marcar `data-l="P"`): forma vectorial de la ley; cálculo Tierra→Luna de 61 frente a 2,6 MJ/kg; $g(r)$ dentro del planeta de densidad lineal; $g$ en la ISS con 9,81; valores de los interactivos.
10. **Recortes del libro sugeridos** (`herramientas/extraer_figura.py`, PDF = impresa + 28): fig. 13.4 Cavendish (p. 400), fig. 13.8 peso del astronauta frente a $r$ (p. 403), fig. 13.11 $U(r)$ (p. 405), fig. 13.14 cañón de Newton (p. 407), fig. 13.18 y 13.19 elipse y áreas (p. 411), fig. 13.26 peso aparente (p. 417), figura E13.6 (p. 425). No duplicarlas con SVG salvo para poner valores de los ejercicios.
