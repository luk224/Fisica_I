# Soluciones Tema 14 — Movimiento periódico

Material para el redactor del tema 14. Todos los números se han comprobado con sympy (script propio de verificación, un bloque por ejercicio; resultados en la tabla final). Los enunciados de E se han tomado de U (`sears.txt`, págs. impresas 458–466; la figura E14.50 se ha comprobado sobre la imagen del PDF, pág. PDF 490) y las soluciones de `solman.txt` (la página 14-N del solucionario está en el PDF 476+N). Cada etiqueta 14.N se ha confirmado comparando el enunciado de U con el contenido de la solución de E. Los exámenes se han comprobado sobre la imagen de cada PDF (18F1, 19F2, 20F1, 20F2, 22F1, y la pág. 27 del recopilatorio `FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf`) y, para Feb 2025, sobre `fuentes_txt/examenes/E689010160-25F1.txt`. Los problemas E están traducidos y ampliados, no copiados.

Convenciones: $g=9{,}80\ \text{m/s}^2$ (como U y E). «U p. NN» = página impresa del Sears-Zemansky. En el MAS horizontal, $x$ se mide desde el equilibrio y $+x$ a la derecha; en el MAS vertical, $x$ se mide desde la posición de equilibrio **con la carga** y $+x$ hacia arriba (como U p. 446). Ángulos de fase en radianes.

## Herramientas de teoría que se usan

| Herramienta | Dónde |
|---|---|
| Periodo, frecuencia, frecuencia angular: $f=1/T$ (14.1), $\omega=2\pi f=2\pi/T$ (14.2); amplitud $A$ | U §14.1 p. 435 |
| Ley de Hooke / fuerza de restitución $F_x=-kx$ (14.3); definición de MAS | U §14.2 p. 435 |
| Ecuación del MAS $a_x=d^2x/dt^2=-(k/m)x$ (14.4) | U §14.2 p. 436 |
| Círculo de referencia (14.5)–(14.9): el MAS es la proyección de un movimiento circular uniforme | U §14.2 pp. 436–437 |
| $\omega=\sqrt{k/m}$ (14.10), $f=\frac1{2\pi}\sqrt{k/m}$ (14.11), $T=2\pi\sqrt{m/k}$ (14.12); $T$ no depende de $A$ | U §14.2 p. 438 |
| $x=A\cos(\omega t+\phi)$ (14.13); $x_0=A\cos\phi$ (14.14); $v_x=-\omega A\sin(\omega t+\phi)$ (14.15); $a_x=-\omega^2A\cos(\omega t+\phi)$ (14.16) | U §14.2 pp. 439–440 |
| Condiciones iniciales: $v_{0x}=-\omega A\sin\phi$ (14.17); $\phi=\arctan(-v_{0x}/\omega x_0)$ (14.18); $A=\sqrt{x_0^2+v_{0x}^2/\omega^2}$ (14.19); Estrategia 14.1 | U §14.2 p. 441 |
| Energía: $E=\tfrac12mv_x^2+\tfrac12kx^2=\tfrac12kA^2=$ cte (14.20)–(14.21) | U §14.3 p. 442 |
| $v_x=\pm\sqrt{k/m}\sqrt{A^2-x^2}$ (14.22); $v_{máx}=\sqrt{k/m}\,A=\omega A$ (14.23); figs. 14.14–14.15 (E, K, U frente a $x$); Estrategia 14.2 | U §14.3 pp. 443–444 |
| Ejemplo 14.5: choque inelástico con un oscilador ($A_2=A_1\sqrt{M/(M+m)}$) | U §14.3 p. 445 |
| MAS vertical: misma $\omega=\sqrt{k/m}$; el equilibrio está donde $k\,\Delta l=mg$ | U §14.4 p. 446 |
| MAS angular $\tau_z=-\kappa\theta$, $\omega=\sqrt{\kappa/I}$ (14.24) | U §14.4 p. 447 |
| Péndulo simple: $\omega=\sqrt{g/L}$, $f$, $T=2\pi\sqrt{L/g}$ (14.32)–(14.34); no depende de $m$ ni (para ángulo pequeño) de la amplitud | U §14.5 p. 450 |
| Péndulo físico: $\omega=\sqrt{mgd/I}$ (14.38), $T=2\pi\sqrt{I/mgd}$ (14.39) | U §14.6 pp. 451–452 |
| Oscilaciones amortiguadas: $F=-bv$ (14.40); $x=Ae^{-(b/2m)t}\cos(\omega' t+\phi)$ (14.42); $\omega'$ (14.43); amortiguamiento crítico $b=2\sqrt{km}$ (14.44); $dE/dt=-bv_x^2$ (14.45) | U §14.7 pp. 453–455 |
| Oscilación forzada y resonancia (14.46) | U §14.8 pp. 455–456 |
| Caída libre $v^2=v_0^2+2a(y-y_0)$ (2.13) | U §2.4 p. 47 |
| Choque totalmente inelástico $m_Av_{A1}=(m_A+m_B)v_2$ (8.16)–(8.17) | U §8.3 p. 248 |
| Momentos de inercia: cilindro macizo $\tfrac12MR^2$, esfera maciza $\tfrac25MR^2$ (tabla 9.2) | U §9.4 p. 286 |
| Rodar sin resbalar $v_{cm}=R\omega$ (10.11); $\sum F=Ma_{cm}$ (10.12), $\sum\tau_z=I_{cm}\alpha_z$ (10.13) | U §10.3 pp. 311–313 |

---

## PARTE A — Problemas y teoría de examen (X)

**Qué ha caído del tema 14.** Un problema numérico en el que el MAS es la parte final (Feb 2022, 1ª sem., P-1) y **seis preguntas de teoría** (todas «El MAS» o «Energía del MAS»). Todas comprobadas sobre la imagen del examen:

| Id | Cita exacta (`data-ref`) | Tipo |
|---|---|---|
| X1 | Examen Febrero 2022 (1ª semana) P-1 | problema (3 p.): choque + MAS vertical (también en el Tema 8, X3) |
| X2 | Examen Febrero 2018 (1ª semana) P-3 Teoría Opción 3.2 | teoría «Energía del movimiento armónico simple» (sin cuestiones) |
| X3 | Examen Febrero 2019 (2ª semana) P-3 Teoría Opción 3.1 | teoría «Energía del movimiento armónico simple» (sin cuestiones) |
| X4 | Examen Febrero 2020 (1ª semana) P-3 Teoría Opción 3.1 | teoría «Energía del movimiento armónico simple» (sin cuestiones) |
| X5 | Examen Febrero 2020 (2ª semana) P-3 Teoría Opción 3.2 | teoría «Movimiento armónico simple» (sin cuestiones) |
| X6 | Examen Septiembre 2019 (Reserva) P-3 Teoría Opción 3.1 | teoría «El movimiento armónico simple. Energía del M.A.S.» (sin cuestiones). Solo en el recopilatorio `FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf`, p. 27 |
| X7 | Examen Febrero 2025 (1ª semana) P-4 Teoría Opción B | teoría «Energía en el movimiento armónico simple (MAS)» + 2 cuestiones |

Lectura del examen: el MAS (y en especial su energía) es **el tema de teoría más repetido de toda la asignatura** (6 convocatorias). Merece llevar el desarrollo modelo memorizado.

Orden didáctico propuesto en el HTML: el desarrollo modelo de teoría tras §14.3 (energía); X7 tras §14.5 (péndulo, por la cuestión b); X1 tras §14.4 (MAS vertical).

---

### X1. Examen Febrero 2022 (1ª semana) P-1 — masa que cae sobre una bandeja colgada de un resorte (enfoque MAS)

**Enunciado (literal).** Un resorte con masa despreciable y constante elástica $k=500$ N/m cuelga verticalmente y de su extremo inferior cuelga una bandeja de 0,5 kg. Se deja caer sobre la bandeja una masa deformable de 1 kg desde una altura de 0,5 m. Suponiendo que el impacto de la masa sobre la bandeja es perfectamente inelástico y que el sistema queda en movimiento armónico simple vertical, calcula a) la velocidad de la bandeja y la masa justo después del impacto. b) la amplitud del movimiento posterior y c) el periodo de ese movimiento. (3 puntos)

Datos: $k=500$ N/m; bandeja $M=0{,}5$ kg; masa $m=1$ kg; $h=0{,}5$ m; $g=9{,}8$ m/s².

(En el Tema 8 se resolvió con energía, resorte + gravedad. Aquí se resuelve con las herramientas del Tema 14, que es más corto; los resultados coinciden.)

**Solución.**

1. **Tres etapas, tres leyes.** (i) Caída libre de $m$ → cinemática o energía; (ii) choque instantáneo → solo se conserva la cantidad de movimiento; (iii) después → MAS del conjunto. No se puede usar la energía a través del choque: un choque totalmente inelástico pierde energía cinética (U p. 248).
2. **Caída libre.** $v_0^2=0+2gh$ (2.13, U p. 47) ⇒ $v_0=\sqrt{2(9{,}8)(0{,}5)}=3{,}13$ m/s hacia abajo.
3. **a) Choque.** Dura tan poco que el impulso del peso y del resorte (fuerzas finitas) es despreciable frente al de las fuerzas internas ⇒ se conserva $P_y$. Totalmente inelástico (8.17, U p. 248): $mv_0=(m+M)V$ ⇒ $V=\dfrac{1\cdot3{,}13}{1{,}5}=$ **2,09 m/s hacia abajo**.
4. **¿Dónde está el nuevo equilibrio?** En el MAS vertical la gravedad solo **desplaza** el equilibrio: el conjunto oscila con $\omega=\sqrt{k/(m+M)}$ alrededor del punto donde $k\,\Delta l=(m+M)g$ (U p. 446). Antes del choque la bandeja sola estaba en equilibrio con $\Delta l_1=Mg/k$; el conjunto lo tiene con $\Delta l_2=(m+M)g/k$. El nuevo equilibrio está más abajo, a $\Delta l_2-\Delta l_1=mg/k=\dfrac{1\cdot9{,}8}{500}=0{,}0196$ m.
5. **Condiciones iniciales del MAS** ($t=0$ justo tras el choque, $+x$ hacia arriba, $x$ desde el nuevo equilibrio): $x_0=+0{,}0196$ m (el choque ocurre **por encima** del nuevo equilibrio) y $v_{0x}=-2{,}09$ m/s.
6. **Frecuencia angular.** $\omega=\sqrt{k/(m+M)}=\sqrt{500/1{,}5}=18{,}26$ rad/s (14.10, U p. 438). La masa que oscila es la del **conjunto**.
7. **b) Amplitud** con (14.19) (U p. 441), que es la conservación de la energía del MAS (14.21) en el instante inicial: $A=\sqrt{x_0^2+\dfrac{v_{0x}^2}{\omega^2}}=\sqrt{0{,}0196^2+\left(\dfrac{2{,}087}{18{,}26}\right)^2}=\sqrt{0{,}0196^2+0{,}1143^2}=$ **0,116 m**.
8. **c) Periodo.** $T=2\pi\sqrt{\dfrac{m+M}{k}}=2\pi\sqrt{\dfrac{1{,}5}{500}}=$ **0,344 s** (14.12, U p. 438). No depende de $g$ ni de $A$.
9. **(Ampliación) Ecuación completa.** $\phi=\arctan\!\left(-\dfrac{v_{0x}}{\omega x_0}\right)=\arctan(5{,}83)=1{,}40$ rad (80,3°) (14.18); el cuadrante es correcto porque $x_0>0$ ⇒ $\cos\phi>0$. Así $x(t)=(0{,}116\ \text{m})\cos[(18{,}26\ \text{rad/s})t+1{,}40]$; el punto más bajo se alcanza cuando $\omega t+\phi=\pi$, en $t=0{,}095$ s.
10. **Comprobación física.** Si se olvida que el choque ocurre fuera del nuevo equilibrio, sale $A=V/\omega=0{,}114$ m (error del 2 %): pequeño aquí, pero es un error de planteamiento. La aceleración máxima es $\omega^2A=38{,}7$ m/s² > $g$: si la masa no estuviera pegada, se separaría en la parte alta.

**Resultado:** a) 2,09 m/s hacia abajo; b) 0,116 m; c) 0,344 s.

**Receta.** «Cae–choca–oscila»: cinemática/energía hasta el choque; cantidad de movimiento en el choque; después, MAS con la masa total, midiendo $x_0$ desde el **nuevo** equilibrio ($x_0=m_{añadida}\,g/k$) y $A=\sqrt{x_0^2+v_0^2/\omega^2}$.

**Error típico.** (1) Conservar la energía a través del choque. (2) Tomar $A=V/\omega$ (como si el choque fuera en el equilibrio). (3) Usar solo $M$ o solo $m$ en $T$.

**Figura SVG sugerida.** Eje vertical con tres marcas: «equilibrio bandeja sola», «choque ($x_0=+1{,}96$ cm)», «nuevo equilibrio ($x=0$)»; y debajo «punto más bajo ($x=-A=-11{,}6$ cm)»; flecha $V=2{,}09$ m/s hacia abajo en el choque. Al lado, la gráfica $x(t)=0{,}116\cos(18{,}26t+1{,}40)$ con $T=0{,}344$ s y el punto inicial marcado.

Teoría: U §2.4 p. 47; §8.3 p. 248; §14.2 pp. 438–441 (14.12, 14.18, 14.19); §14.4 p. 446.

---

### Desarrollo modelo «El movimiento armónico simple. Energía del MAS» (vale para X2–X7)

Extensión orientativa: una cara. Lo que **no** puede faltar, en negrita. Si el título es solo «Energía del MAS» (X2, X3, X4, X7), se resumen los puntos 1–3 en cuatro líneas y se desarrollan a fondo los 4–8; si es «Movimiento armónico simple» (X5), al revés (1–4 a fondo, 5–8 resumidos); X6 pide las dos cosas.

1. **Movimiento periódico y magnitudes** (U pp. 434–435). Movimiento que se repite en ciclos alrededor de una posición de **equilibrio estable**, gracias a una **fuerza de restitución** que siempre apunta hacia el equilibrio. **Amplitud $A$** = desplazamiento máximo (siempre positiva); **periodo $T$** = tiempo de un ciclo; **frecuencia $f=1/T$** (Hz); **frecuencia angular $\omega=2\pi f$** (rad/s) (14.1–14.2).
2. **Definición de MAS** (U p. 435). **Si la fuerza de restitución es directamente proporcional al desplazamiento, $F_x=-kx$ (ley de Hooke, 14.3), el movimiento es armónico simple.** Por la 2.ª ley: **$a_x=\dfrac{d^2x}{dt^2}=-\dfrac{k}{m}x$** (14.4): la aceleración es proporcional y **de signo opuesto** al desplazamiento; no es constante (no valen las fórmulas de aceleración constante). Muchos sistemas son MAS para pequeñas oscilaciones (fig. 14.4).
3. **Solución** (U pp. 436–440). La proyección sobre un diámetro de un **movimiento circular uniforme** de radio $A$ y rapidez angular $\omega$ cumple justo esa ecuación (círculo de referencia, fig. 14.5). Por eso **$x=A\cos(\omega t+\phi)$** (14.13), con **$\omega=\sqrt{k/m}$**, $T=2\pi\sqrt{m/k}$ (14.10–14.12). **$T$ y $f$ no dependen de la amplitud** (más masa ⇒ más lento; resorte más rígido ⇒ más rápido). Derivando: $v_x=-\omega A\sin(\omega t+\phi)$, $a_x=-\omega^2A\cos(\omega t+\phi)=-\omega^2x$ (14.15–14.16); $v_{máx}=\omega A$ en el equilibrio; $a_{máx}=\omega^2A$ en los extremos. $A$ y $\phi$ los fijan $x_0$ y $v_{0x}$ (14.18–14.19).
4. **Ejemplos** (U §14.4–14.6). Resorte vertical (misma $\omega$; el equilibrio se desplaza a $k\Delta l=mg$); MAS angular $\omega=\sqrt{\kappa/I}$; **péndulo simple** con ángulos pequeños ($\sin\theta\approx\theta$) $T=2\pi\sqrt{L/g}$, sin depender de la masa; **péndulo físico** $T=2\pi\sqrt{I/mgd}$.
5. **Energía mecánica** (U p. 442). La única fuerza que trabaja es la del resorte, que es **conservativa** ⇒ se conserva $E=K+U$, con $K=\tfrac12mv_x^2$ y $U=\tfrac12kx^2$ (14.20). En los extremos ($x=\pm A$) $v_x=0$ ⇒ **$E=\tfrac12mv_x^2+\tfrac12kx^2=\tfrac12kA^2=$ constante** (14.21). **La energía es proporcional al cuadrado de la amplitud** (y no depende de $m$): doblar $A$ cuadruplica $E$. Equivalente, $E=\tfrac12m\omega^2A^2=2\pi^2mf^2A^2$.
6. **Comprobación con $x(t)$** (U p. 443). Sustituyendo (14.13) y (14.15) y usando $k=m\omega^2$: $K=\tfrac12kA^2\sin^2(\omega t+\phi)$, $U=\tfrac12kA^2\cos^2(\omega t+\phi)$ ⇒ $K+U=\tfrac12kA^2$. **K y U se intercambian dos veces por ciclo**; en promedio cada una vale $E/2$ (propio, verificado).
7. **Consecuencias** (U p. 443). Despejando de (14.21): **$v_x=\pm\sqrt{k/m}\sqrt{A^2-x^2}$** (14.22) ⇒ $v_{máx}=\omega A$ en $x=0$ (14.23). Diagrama de energía (figs. 14.14–14.15): **parábola $U=\tfrac12kx^2$**, recta horizontal $E$; la distancia entre ambas es $K$; los **puntos de retorno** son $x=\pm A$. En $x=\pm A/\sqrt2$, $K=U=E/2$; en $x=\pm A/2$, $U=E/4$ y $K=3E/4$ (Ej. 14.4).
8. **Casos que se suelen preguntar.** (a) **Resorte vertical**: con $x$ medido desde el nuevo equilibrio, $U_{el}+U_{grav}=\tfrac12kx^2+$ cte, así que vale la misma fórmula (propio, verificado). (b) **Péndulo**: $E=mgL(1-\cos\theta)+\tfrac12mv^2\approx\tfrac12mgL\theta^2+\dots$, que tiene la misma forma con «$k$»$=mg/L$. (c) **Amortiguamiento**: con $F=-bv$, $dE/dt=-bv_x^2<0$ (14.45): la energía se disipa y la amplitud decae como $e^{-(b/2m)t}$ (U pp. 453–455). (d) **Choques** con un oscilador: el choque inelástico conserva $P$, no $E$ (Ej. 14.5).
9. **Fórmulas para la cuartilla:** (14.4), (14.10)–(14.13), (14.19), (14.21), (14.22)–(14.23), (14.34), (14.39). **Gráfica obligatoria:** $U(x)$ parabólica con la recta $E$ y las barras $K$, $U$ en $x=0$, $A/2$, $A$.

---

### X7. Examen Febrero 2025 (1ª semana) P-4 Teoría Opción B — cuestiones

**Enunciado (literal).** Desarrolle el tema: *Energía en el movimiento armónico simple (MAS)*. Además, responda a las siguientes cuestiones: (a) Si un resorte uniforme se corta a la mitad, ¿qué constante de fuerza tendrá cada mitad? Justifique su respuesta. ¿Cómo diferiría la frecuencia del MAS usando la mitad del resorte en comparación con la frecuencia producida usando la misma masa y el resorte completo? (b) Si un reloj de péndulo se sube a la cima de una montaña, ¿se adelanta o se atrasa? Suponga que marca la hora correcta a menor altitud. Explique su respuesta.

(Las dos cuestiones son, palabra por palabra, las preguntas para análisis P14.5 y P14.13 de U, p. 459.)

**Respuesta (a).**
1. Colgamos un peso $F$ del resorte entero: se estira $\Delta l$, y $k=F/\Delta l$ (14.3). Un resorte **uniforme** es como dos mitades iguales en serie: **cada mitad soporta la misma fuerza $F$** (la tensión es la misma en todo el resorte de masa despreciable) y cada una se estira **la mitad**, $\Delta l/2$.
2. Para una mitad: $k'=\dfrac{F}{\Delta l/2}=$ **$2k$**. Más corto ⇒ más rígido.
3. Frecuencia: $f=\dfrac1{2\pi}\sqrt{k/m}$ (14.11) ⇒ $\dfrac{f'}{f}=\sqrt{\dfrac{2k}{k}}=$ **$\sqrt2\approx1{,}41$**: con la misma masa, la mitad del resorte oscila un 41 % más rápido (periodo $T/\sqrt2$). (Mismo resultado en U P14.92 d, p. 466.)

**Respuesta (b).**
1. El reloj cuenta oscilaciones; cada una «vale» el periodo de calibración. El periodo del péndulo es $T=2\pi\sqrt{L/g}$ (14.34, U p. 450): no depende de la masa, sí de $g$.
2. En la cima estamos más lejos del centro de la Tierra: $g=Gm_T/r^2$ disminuye (U §13.2 p. 403) ⇒ **$T$ aumenta** ⇒ el péndulo da menos oscilaciones por hora real ⇒ **el reloj se atrasa**.
3. Cuánto (ejemplo propio): $T\propto1/\sqrt g\propto r$ ⇒ $T_{cima}/T_0=(R_T+h)/R_T$. Con $h=1000$ m y $R_T=6{,}37\times10^6$ m: $1{,}00016$ ⇒ atraso de $86\,400\,(1-R_T/(R_T+h))\approx$ **14 s al día**.
4. (Matiz) La dilatación por el frío de la montaña acortaría $L$ y compensaría algo; si se pregunta solo por la gravedad, la respuesta es «se atrasa».

**Receta.** Cuestiones de «qué pasa con $f$ o $T$ si…»: escribir la fórmula ($\sqrt{k/m}$ o $\sqrt{g/L}$) y ver qué magnitud cambia y en qué factor; la amplitud nunca interviene.

**Error típico.** (a) Decir que la mitad tiene $k/2$ («la mitad de resorte, la mitad de fuerza»). (b) Pensar que el péndulo «pesa menos y va más rápido», o que el periodo depende de la masa.

**Figura SVG sugerida.** (a) Resorte entero con $F$ estirado $\Delta l$ y media pieza con la misma $F$ estirada $\Delta l/2$ ⇒ $k'=2k$. (b) Tierra con el péndulo a nivel del mar ($g_0$, $T_0$) y en la cima ($g<g_0$, $T>T_0$); rótulo «−14 s/día a 1000 m».

Teoría: U §14.2 p. 438 (14.11); §14.5 p. 450 (14.34); §13.2 p. 403.

---

### Cuestiones cortas típicas para preparar (de U, preguntas para análisis p. 459 y «Evalúe su comprensión»; **no** son de examen)

El examen de 2025 tomó sus dos cuestiones de esta lista de U; conviene llevar preparadas las demás. Respuestas breves:

| Pregunta (U) | Respuesta |
|---|---|
| P14.1: si $A$ se duplica, ¿qué pasa con la distancia recorrida en un periodo, con $T$ y con $v_{máx}$? | Distancia $4A$ ⇒ se duplica; $T$ igual (no depende de $A$); $v_{máx}=\omega A$ ⇒ se duplica (recorre el doble en el mismo tiempo). |
| §14.3 Evalúe: para duplicar $E$, ¿en qué factor cambia $A$? ¿y $f$? (p. 445) | $E\propto A^2$ ⇒ $A\times\sqrt2$; $f$ no cambia. |
| P14.4: en el extremo se retira verticalmente un guijarro de la caja | Menos masa ⇒ $f$ aumenta, $T$ disminuye; $A$ igual (estaba en reposo en $x=A$); $K_{máx}=\tfrac12kA^2$ igual; $v_{máx}=\omega A$ aumenta. |
| P14.6: moneda sobre un deslizador que oscila: ¿dónde es máxima la fricción? | La fricción es la única fuerza horizontal sobre la moneda ⇒ $f=ma$: máxima en los extremos ($a_{máx}=\omega^2A$), nula en el equilibrio. |
| P14.9 / Evalúe §14.4: resorte vertical en un ascensor que acelera, o llevado a Marte | $T=2\pi\sqrt{m/k}$ no depende de $g$ ⇒ no cambia; solo cambia dónde está el equilibrio. |
| P14.11: péndulo en un ascensor que acelera hacia arriba / velocidad constante / hacia abajo / caída libre | $g_{ef}=g+a$ (hacia arriba +): sube acelerando ⇒ $T$ menor; velocidad constante ⇒ igual; baja acelerando ⇒ $T$ mayor; caída libre ($g_{ef}=0$) ⇒ no oscila. |
| P14.10: péndulo y masa-resorte en una estación espacial en órbita | Péndulo: no oscila (ingravidez aparente, $g_{ef}=0$); resorte: mismo periodo (5,0 s). |
| P14.12: ¿qué hacer con $L$ para duplicar $f$, duplicar $T$, duplicar $\omega$? | $f\propto1/\sqrt L$: $L/4$; $T\propto\sqrt L$: $4L$; $\omega$ como $f$: $L/4$. |
| P14.16: ¿dónde es máxima la tensión del hilo de un péndulo? | En el punto más bajo: allí $v$ es máxima y hace falta la mayor fuerza centrípeta, $T_{hilo}=mg+mv^2/L$; mínima en los extremos ($T_{hilo}=mg\cos\theta_{máx}$). |
| Evalúe §14.6: varilla de longitud $2L$ frente a péndulo simple de longitud $L$ (p. 452) | Mismo $d=L$ pero $I_{varilla}=\tfrac43mL^2>mL^2$ ⇒ la varilla tiene periodo mayor. |

Teoría: U pp. 438, 443–446, 450–452, 459.

---

## PARTE B — Ejemplos y problema práctico de U

### B0. Ejemplos 14.1–14.10 de U: verificación numérica (todos coinciden con U)

| Ejemplo (U p.) | Datos | Resultado de U | Verificado (sympy) |
|---|---|---|---|
| 14.1 (p. 435) | $f=6{,}7$ MHz | $T=1{,}5\times10^{-7}$ s; $\omega=4{,}2\times10^7$ rad/s | $1{,}49\times10^{-7}$ s; $4{,}21\times10^7$ rad/s ✓ |
| 14.2 (p. 439) | 6,0 N estira 0,030 m; $m=0{,}50$ kg | $k=200$ N/m; $\omega=20$ rad/s; $f=3{,}2$ Hz; $T=0{,}31$ s | 200; 20,0; 3,18; 0,314 ✓ |
| 14.3 (p. 442) | $x_0=0{,}015$ m, $v_{0x}=0{,}40$ m/s, $\omega=20$ rad/s | $A=0{,}025$ m; $\phi=-0{,}93$ rad ($-53°$) | 0,0250 m; −0,927 rad (−53,1°) ✓ |
| 14.4 (p. 444) | $A=0{,}020$ m, $\omega=20$ rad/s, $k=200$ N/m | $v_{máx}=0{,}40$ m/s; $a_{máx}=8{,}0$ m/s²; en $A/2$: $v=-0{,}35$ m/s, $a=-4{,}0$ m/s²; $E=0{,}040$ J, $U=0{,}010$ J, $K=0{,}030$ J | 0,400; 8,00; −0,346; −4,00; 0,0400; 0,0100; 0,0300 ✓ |
| 14.5 (p. 445) | masilla $m$ sobre bloque $M$ | a) en el equilibrio: $A_2=A_1\sqrt{M/(M+m)}$; b) en un extremo: $A_2=A_1$; en ambos $T_2=2\pi\sqrt{(M+m)/k}$ | simbólico ✓ (usado en E 14.31) |
| 14.6 (p. 447) | persona 980 N baja el coche 0,028 m; coche 1000 kg | $k=3{,}5\times10^4$ N/m; $T=1{,}11$ s; $f=0{,}90$ Hz | $m=1100$ kg; 1,114 s; 0,898 Hz ✓ |
| 14.7 (p. 449) | $U_0=1{,}68\times10^{-21}$ J, $R_0=3{,}82\times10^{-10}$ m, $m=6{,}63\times10^{-26}$ kg | $k=0{,}829$ N/m; $f=5{,}63\times10^{11}$ Hz; corregido $7{,}96\times10^{11}$ Hz | 0,8289; $5{,}628\times10^{11}$; $7{,}959\times10^{11}$ ✓ |
| 14.8 (p. 451) | $L=1{,}000$ m, $g=9{,}800$ m/s² | $T=2{,}007$ s; $f=0{,}4983$ Hz | 2,0071 s; 0,49823 Hz ✓ |
| 14.9 (p. 452) | varilla, pivote en un extremo, $L=1{,}00$ m | $T=2\pi\sqrt{2L/3g}=1{,}64$ s; factor $\sqrt{2/3}=0{,}816$ | 1,6388 s; 0,8165 ✓ |
| 14.10 (pp. 452–453) | T. rex: $L=3{,}1$ m, $S=4{,}0$ m | $T=2{,}9$ s; $v=1{,}4$ m/s = 5,0 km/h | 2,885 s; 1,386 m/s = 4,99 km/h ✓ |

Nota para el redactor: el Ej. 14.8 empieza en p. 450 (§14.5) pero su desarrollo y resultado están en p. 451; citar «U Ej. 14.8 p. 451».

---

### P1. Problema práctico «Oscilar y rodar» (U p. 458; respuesta en U p. 467)

**Enunciado (U, literal).** Dos cilindros sólidos uniformes, de radio $R$ y masa total $M$, están conectados a lo largo de su eje común mediante una varilla corta y ligera, y descansan sobre una mesa horizontal (figura 14.29). Un anillo sin fricción en el centro de la varilla está unido a un resorte con constante de fuerza $k$; el otro extremo del resorte está fijo. Se tira de los cilindros hacia la izquierda una distancia $x$, estirando el resorte, y luego se suelta el sistema a partir del reposo. Debido a la fricción entre la mesa y los cilindros, estos últimos ruedan sin resbalar, conforme oscilan. Demuestre que el movimiento del centro de masa de los cilindros es armónico simple, y encuentre su periodo.

**Solución** (siguiendo los 7 pasos de la guía de U).

1. **Qué hay que demostrar** (paso 1). El movimiento del centro de masa es MAS si su aceleración cumple $a_{cm,x}=-\omega^2x$ con $\omega$ constante (14.4/14.8, U pp. 436–437): proporcional y opuesta al desplazamiento. Entonces $T=2\pi/\omega$.
2. **Ecuaciones** (paso 2). El cuerpo se traslada y gira: traslación del CM $\sum F_x=Ma_{cm,x}$ (10.12) y rotación alrededor del eje que pasa por el CM $\sum\tau_z=I_{cm}\alpha_z$ (10.13), U p. 313. Rodar sin resbalar: $v_{cm}=R\omega_{rot}$ (10.11, U p. 311) ⇒ derivando, $a_{cm}=R\alpha$. Los dos cilindros macizos juntos: $I_{cm}=\tfrac12MR^2$ (tabla 9.2, U p. 286; la varilla es ligera).
3. **Coordenadas y fuerzas** (pasos 3–4). $x$ = posición del CM medida desde el equilibrio (resorte sin estirar), $+x$ hacia la derecha (hacia el resorte, véase la figura 14.29: se tira hacia la izquierda, $x<0$ al principio). Fuerzas horizontales: resorte $-kx$ (actúa en el anillo, sobre el eje: **no hace torque** respecto al CM) y fricción estática $f$ en los puntos de contacto con la mesa (en el borde, a distancia $R$ del eje: **es la única que hace girar**). Verticales (peso y normal) se anulan y no hacen torque.
4. **Traslación.** $-kx+f=Ma_{cm}$. (Signo de $f$ a priori desconocido; el álgebra lo dirá.)
5. **Rotación.** Tomando como positivo el giro que corresponde a avanzar hacia $+x$ (para que $a_{cm}=+R\alpha$), la fricción en el suelo dirigida hacia $+x$ produce un torque en sentido contrario: $-fR=\tfrac12MR^2\alpha$ ⇒ con $\alpha=a_{cm}/R$: $f=-\tfrac12Ma_{cm}$.
6. **Combinar** (paso 5). $-kx-\tfrac12Ma_{cm}=Ma_{cm}$ ⇒ $\tfrac32Ma_{cm}=-kx$ ⇒ **$a_{cm}=-\dfrac{2k}{3M}x$**. Es de la forma $a=-\omega^2x$ con $\omega^2=\dfrac{2k}{3M}$ constante ⇒ **el CM hace un MAS**. (Además $f=+\tfrac13kx$: la fricción vale un tercio de la fuerza del resorte y se le opone.)
7. **Periodo** (paso 6). $T=\dfrac{2\pi}{\omega}=$ **$2\pi\sqrt{\dfrac{3M}{2k}}$** (coincide con la respuesta de U p. 467).
8. **Evaluar** (paso 7). Sin fricción no habría torque: los cilindros resbalarían sin girar y oscilarían como un bloque, $T_0=2\pi\sqrt{M/k}$. El periodo con rodadura es mayor en un factor $\sqrt{3/2}=1{,}22$. Es razonable: la misma fuerza del resorte tiene que acelerar la traslación **y** la rotación; es como si la masa fuera $M+I/R^2=\tfrac32M$ («masa efectiva»).
9. **Comprobación por energía (alternativa).** $E=\tfrac12Mv^2+\tfrac12I\omega_{rot}^2+\tfrac12kx^2=\tfrac12\left(\tfrac32M\right)v^2+\tfrac12kx^2$: tiene la forma de (14.21) con $m\to\tfrac32M$ ⇒ $\omega=\sqrt{2k/3M}$. La fricción estática no trabaja (no hay deslizamiento), por eso se conserva $E$.

**Receta.** Oscilador que rueda: (i) $\sum F=Ma_{cm}$, (ii) $\sum\tau=I_{cm}\alpha$, (iii) $a_{cm}=R\alpha$; eliminar $f$ y $\alpha$ hasta llegar a $a_{cm}=-(\text{cte})x$; o, más rápido, energía con masa efectiva $M+I_{cm}/R^2$.

**Error típico.** (1) Usar $T=2\pi\sqrt{M/k}$ olvidando la rotación. (2) Poner el torque del resorte respecto al CM (actúa sobre el eje: brazo nulo). (3) Pensar que la fricción «roba energía»: es estática y no trabaja.

**Figura SVG sugerida.** Vista lateral de un cilindro sobre la mesa con el resorte unido al eje: flechas $-kx$ en el eje, $f=\tfrac13kx$ en el contacto (sentido opuesto), $Mg$ y $n$; flecha curva de $\alpha$. Recuadro: «$M_{ef}=\tfrac32M$ ⇒ $T=2\pi\sqrt{3M/2k}$; sin fricción $T_0=2\pi\sqrt{M/k}$ (×1,22)».

Teoría: U §9.4 p. 286; §10.3 pp. 311–313; §14.2 pp. 436–438; Problema práctico p. 458.

---

## PARTE C — Problemas del solucionario (E), traducidos y ampliados, de más fácil a más difícil

### E1. Ejercicio 14.17 — «pesar» a un astronauta (Solucionario 14-4 y 14-5)

**Enunciado (U p. 460).** Para «pesar» a los astronautas en el espacio se une una silla de 42,5 kg a un resorte y se deja oscilar. Vacía, tarda 1,30 s en una vibración completa; con un astronauta sentado (sin tocar el suelo) tarda 2,54 s. ¿Qué masa tiene el astronauta?

**Solución.**

1. **Por qué funciona en ingravidez.** Una balanza mide peso, que en órbita «desaparece» (ingravidez aparente). El periodo de un sistema masa-resorte $T=2\pi\sqrt{m/k}$ (14.12, U p. 438) **no depende de $g$**: depende de la **masa** (inercia). Así se mide masa sin gravedad.
2. **Calibrar el resorte con la silla vacía.** $k=\dfrac{4\pi^2m}{T^2}=\dfrac{4\pi^2(42{,}5)}{(1{,}30)^2}=993$ N/m.
3. **Con el astronauta.** $m_{tot}=\dfrac{T^2k}{4\pi^2}=\dfrac{(2{,}54)^2(993)}{4\pi^2}=162$ kg.
4. **Restar la silla.** $m_{astr}=162-42{,}5=$ **120 kg** (sympy: 119,7 kg; el astronauta lleva traje).
5. **Atajo sin calcular $k$.** Para el mismo resorte $m\propto T^2$: $m_{tot}=42{,}5\,(2{,}54/1{,}30)^2$ ⇒ $m_{astr}=42{,}5[(2{,}54/1{,}30)^2-1]=119{,}7$ kg.

**Receta.** Mismo resorte, dos masas: $\dfrac{m_2}{m_1}=\left(\dfrac{T_2}{T_1}\right)^2$.

**Error típico.** Usar $T$ en lugar de $T^2$ (proporcionalidad lineal) o olvidar restar la masa de la silla.

**Figura SVG sugerida.** Silla unida a un resorte horizontal en una nave; dos gráficas $x(t)$ superpuestas con $T=1{,}30$ s y $T=2{,}54$ s.

Teoría: U §14.2 p. 438.

---

### E2. Ejercicio 14.38 — pescado colgado de un resorte (Solucionario 14-11)

**Enunciado (U p. 461).** Un pescador cuelga un pescado de 65,0 kg de un resorte ideal de masa despreciable; el pescado estira el resorte 0,180 m. a) Calcule la constante de fuerza. Ahora se tira del pescado 5,00 cm hacia abajo y se suelta. b) ¿Qué periodo de oscilación tiene? c) ¿Qué rapidez máxima alcanzará?

**Solución.**

1. **a) Equilibrio.** Colgado en reposo, $\sum F_y=0$: la fuerza del resorte $k\,\Delta l$ equilibra el peso (U p. 446) ⇒ $k=\dfrac{mg}{\Delta l}=\dfrac{(65{,}0)(9{,}80)}{0{,}180}=$ **3,54×10³ N/m**.
2. **El MAS vertical es como el horizontal.** Medido desde el equilibrio, la fuerza neta es $-kx$ (U p. 446) ⇒ $\omega=\sqrt{k/m}$, igual que en horizontal; el peso solo fija dónde está el centro de la oscilación.
3. **b)** $T=2\pi\sqrt{m/k}=2\pi\sqrt{65{,}0/3539}=$ **0,852 s** (sympy: 0,8515 s). Dato curioso: $T=2\pi\sqrt{\Delta l/g}$, solo depende del estiramiento estático.
4. **c) Amplitud y rapidez máxima.** Se suelta desde el reposo a 5,00 cm del equilibrio ⇒ $A=0{,}0500$ m. $v_{máx}=\omega A=\dfrac{2\pi A}{T}=\dfrac{2\pi(0{,}0500)}{0{,}8515}=$ **0,369 m/s** (14.23, U p. 443), al pasar por el equilibrio.

**Receta.** Resorte vertical: $k=mg/\Delta l$ con el estiramiento estático; luego todo como en horizontal, con $x$ desde el equilibrio cargado y $A$ = desplazamiento desde el que se suelta en reposo.

**Error típico.** Tomar como amplitud $0{,}180+0{,}050$ m (el estiramiento total) en lugar de 0,050 m.

**Figura SVG sugerida.** Resorte sin carga, con el pescado en equilibrio ($\Delta l=18{,}0$ cm) y estirado 5,00 cm más; banda «$A=5{,}00$ cm» centrada en el equilibrio.

Teoría: U §14.2 p. 438; §14.3 p. 443; §14.4 p. 446.

---

### E3. Ejercicio 14.66 — periodo de un coche vacío (Solucionario 14-18)

**Enunciado (U p. 463).** Cuatro pasajeros de 250 kg en total comprimen 4,00 cm los resortes de un coche con amortiguadores muy gastados al subir. Modele el coche y los pasajeros como un solo cuerpo sobre un único resorte ideal. Si el coche cargado tiene un periodo de vibración de 1,92 s, ¿qué periodo tiene vacío?

**Solución.**

1. **Constante del resorte con el dato de los pasajeros.** Su peso añadido comprime 4,00 cm más: $k=\dfrac{(250)(9{,}80)}{0{,}0400}=6{,}125\times10^4$ N/m (ley de Hooke, 14.3; como en U Ej. 14.6, p. 447).
2. **Masa del coche (incógnita $M$) con el periodo cargado.** $T_L=2\pi\sqrt{\dfrac{M+250}{k}}$ (14.12) ⇒ $M=\left(\dfrac{T_L}{2\pi}\right)^2k-250=\left(\dfrac{1{,}92}{2\pi}\right)^2(6{,}125\times10^4)-250=5{,}72\times10^3-250=5{,}47\times10^3$ kg.
3. **Periodo vacío.** $T_E=2\pi\sqrt{M/k}=2\pi\sqrt{5469/61250}=$ **1,88 s**.
4. **Atajo.** $T_E^2=T_L^2-4\pi^2\dfrac{250}{k}=T_L^2-\dfrac{4\pi^2\,\Delta x}{g}$ ⇒ $T_E=\sqrt{1{,}92^2-4\pi^2(0{,}0400)/9{,}80}=1{,}88$ s (sympy: 1,8776 s).
5. **Sentido físico.** Menos masa ⇒ periodo algo menor. La masa de 5,5 t es la de un vehículo muy pesado; es la consecuencia del modelo (un solo resorte) con estos datos.

**Receta.** Si te dan cuánto baja el sistema al añadir una masa conocida, eso da $k$; el periodo con carga da la masa total; restar.

**Error típico.** Calcular $k$ con la masa total del coche, o suponer $T_E=T_L$.

**Figura SVG sugerida.** Bloque «coche» sobre un resorte: vacío ($T_E=1{,}88$ s) y con pasajeros, 4,00 cm más abajo ($T_L=1{,}92$ s).

Teoría: U §14.2 p. 438; §14.4 pp. 446–447.

---

### E4. Ejercicio 14.37 — amplitud por conservación de la energía (Solucionario 14-11)

**Enunciado (U p. 461).** Un deslizador de 175 g en una pista de aire horizontal sin fricción está unido a un resorte ideal de constante 155 N/m. En el momento en que se mide, se mueve a 0,815 m/s y está a 3,00 cm del equilibrio. Use la conservación de la energía para calcular a) la amplitud y b) la rapidez máxima. c) ¿Cuál es la frecuencia angular?

**Solución.**

1. **Por qué energía.** Conocemos $x$ y $v$ en un instante, no en un tiempo concreto: la energía relaciona posición y velocidad sin el tiempo (Estrategia 14.2, U p. 444). Sin fricción y con resorte ideal, $E$ se conserva (14.21).
2. **Energía total.** $E=\tfrac12(0{,}175)(0{,}815)^2+\tfrac12(155)(0{,}0300)^2=0{,}0581+0{,}0698=0{,}128$ J.
3. **a)** En el extremo toda la energía es potencial: $\tfrac12kA^2=E$ ⇒ $A=\sqrt{2E/k}=$ **0,0406 m = 4,06 cm**.
4. **b)** En el equilibrio toda es cinética: $\tfrac12mv_{máx}^2=E$ ⇒ $v_{máx}=\sqrt{2E/m}=$ **1,21 m/s**.
5. **c)** $\omega=\sqrt{k/m}=\sqrt{155/0{,}175}=$ **29,8 rad/s**. Comprobación: $v_{máx}=\omega A=29{,}76\times0{,}0406=1{,}21$ m/s ✓.
6. **Observación.** $A$ y $v_{máx}$ dependen de la energía; $\omega$ no (solo de $k$ y $m$).

**Receta.** Dato $(x,v)$ en un instante ⇒ $E=\tfrac12mv^2+\tfrac12kx^2$ ⇒ $A=\sqrt{2E/k}$, $v_{máx}=\sqrt{2E/m}$.

**Error típico.** Olvidar pasar los gramos y los centímetros a kg y m; tomar $A=3{,}00$ cm (no está en reposo, así que $A>|x|$).

**Figura SVG sugerida.** Diagrama de energía: parábola $U=\tfrac12kx^2$, recta $E=0{,}128$ J; en $x=3{,}00$ cm, barras $U=0{,}070$ J y $K=0{,}058$ J; puntos de retorno en $\pm4{,}06$ cm.

Teoría: U §14.3 pp. 442–444.

---

### E5. Ejercicio 14.28 — ¿cuándo $U=K$? (Solucionario 14-7 y 14-8)

**Enunciado (U p. 461).** Un oscilador armónico tiene frecuencia angular $\omega$ y amplitud $A$. a) Calcule la magnitud del desplazamiento y de la velocidad cuando la energía potencial elástica es igual a la cinética ($U=0$ en el equilibrio). b) ¿Cuántas veces sucede eso en cada ciclo? ¿Cada cuánto tiempo? c) Cuando el desplazamiento es $A/2$, ¿qué fracción de la energía total es cinética y qué fracción potencial?

**Solución.**

1. **a) Posición.** $U+K=E$ y $U=K$ ⇒ $2U=E$: $2\cdot\tfrac12kx^2=\tfrac12kA^2$ ⇒ $|x|=$ **$A/\sqrt2\approx0{,}707A$**.
2. **a) Velocidad.** También $2K=E$: $mv^2=\tfrac12kA^2$ ⇒ $|v|=\sqrt{k/m}\,A/\sqrt2=$ **$\omega A/\sqrt2$** (es decir, $v_{máx}/\sqrt2$).
3. **b) Cuántas veces.** En un ciclo $x$ va de $A$ a 0, a $-A$, a 0 y vuelve a $A$: pasa por $+A/\sqrt2$ dos veces y por $-A/\sqrt2$ dos veces ⇒ **4 veces por ciclo**.
4. **b) Cada cuánto.** Con $x=A\cos\omega t$: $\cos\omega t=\pm1/\sqrt2$ ⇒ $\omega t=\pi/4,\ 3\pi/4,\ 5\pi/4,\ 7\pi/4$: separados $\pi/2$ ⇒ $\Delta t=\dfrac{\pi}{2\omega}=$ **$T/4$**. Equiespaciados (aunque no lo estén en $x$), cosa que se ve bien en el círculo de referencia: son los cuatro ángulos a 45° de los ejes.
5. **c)** $U=\tfrac12k(A/2)^2=\tfrac14\cdot\tfrac12kA^2$ ⇒ **$U=E/4$, $K=3E/4$** (como en U Ej. 14.4).
6. **Por qué $U=K$ no ocurre en $A/2$.** $U$ es cuadrática en $x$: a mitad de camino solo hay un cuarto de energía potencial.

**Receta.** Fracciones de energía en el MAS: $U/E=(x/A)^2$, $K/E=1-(x/A)^2$.

**Error típico.** Responder $x=A/2$ para $U=K$ (pensar que $U$ es lineal) o «2 veces por ciclo».

**Figura SVG sugerida.** Círculo de referencia con los cuatro puntos a 45° proyectados sobre $x=\pm A/\sqrt2$; al lado, gráficas de $K(t)$ y $U(t)$ ($\sin^2$ y $\cos^2$) que se cruzan cada $T/4$.

Teoría: U §14.3 pp. 442–444 (14.21, Ej. 14.4); §14.2 p. 437 (círculo de referencia).

---

### E6. Ejercicio 14.59 — energía perdida por amortiguamiento (Solucionario 14-16)

**Enunciado (U p. 463).** Un objeto de 1,35 kg está unido a un resorte horizontal de constante 2,5 N/cm. Se estira 6,0 cm y se suelta sobre un riel de aire horizontal sin fricción. Tras ocho ciclos, su desplazamiento máximo es solo 3,5 cm. a) ¿Cuánta energía ha perdido el sistema en esos ocho ciclos? b) ¿Qué ha pasado con la energía «perdida»? Explique cómo ha podido perderla.

**Solución.**

1. **Unidades.** $k=2{,}5$ N/cm $=250$ N/m.
2. **Por qué basta la amplitud.** En cada extremo $v=0$ y toda la energía mecánica es potencial: $E=\tfrac12kA^2$ (14.21). Si $A$ disminuye, $E$ disminuye (U §14.7, p. 455). La masa no hace falta.
3. **a)** $E_1=\tfrac12(250)(0{,}060)^2=0{,}450$ J; $E_2=\tfrac12(250)(0{,}035)^2=0{,}153$ J ⇒ $\Delta E=$ **0,30 J** (sympy: 0,297 J), dos tercios de la energía inicial.
4. **b)** Hay fuerzas disipativas que el modelo ideal ignora: la resistencia del aire sobre el objeto y la fricción interna del propio resorte al deformarse (y, en menor medida, la del colchón de aire). Hacen trabajo negativo, $dE/dt=-bv_x^2$ (14.45), y la energía mecánica se convierte en **energía interna (térmica)** del aire, del resorte y del objeto.

**Receta.** Energía de un oscilador amortiguado en un instante: medirla en un extremo, $E=\tfrac12kA^2$ con la amplitud de ese ciclo.

**Error típico.** Usar la diferencia de amplitudes $\tfrac12k(A_1-A_2)^2$ en lugar de la diferencia de energías; no pasar N/cm a N/m.

**Figura SVG sugerida.** Gráfica $x(t)$ amortiguada con la envolvente $Ae^{-(b/2m)t}$ de 6,0 cm a 3,5 cm en 8 ciclos; barras de energía 0,45 J → 0,15 J.

Teoría: U §14.3 p. 442; §14.7 pp. 453–455.

---

### E7. Ejercicio 14.13 — amplitud y fase si sale del equilibrio (Solucionario 14-3 y 14-4)

**Enunciado (U p. 460).** Un bloque de 2,00 kg que resbala sin fricción está unido a un resorte ideal de constante 300 N/m. En $t=0$ el resorte no está ni estirado ni comprimido y el bloque se mueve en la dirección negativa a 12,0 m/s. Calcule a) la amplitud y b) el ángulo de fase. c) Escriba la posición en función del tiempo.

**Solución.**

1. **Datos del MAS.** $\omega=\sqrt{k/m}=\sqrt{300/2{,}00}=12{,}2$ rad/s (14.10). Condiciones iniciales: $x_0=0$ (resorte sin deformar = equilibrio), $v_{0x}=-12{,}0$ m/s.
2. **a)** (14.19): $A=\sqrt{x_0^2+v_{0x}^2/\omega^2}=\dfrac{|v_{0x}|}{\omega}=\dfrac{12{,}0}{12{,}25}=$ **0,980 m**. (Es $v_{máx}=\omega A$ al revés: en el equilibrio la rapidez es máxima.)
3. **b) Cuidado con (14.18).** $\phi=\arctan(-v_{0x}/\omega x_0)$ da $\arctan(\pm\infty)$: no sirve directamente. Se usan las dos condiciones por separado (U p. 441): $x_0=A\cos\phi=0$ ⇒ $\phi=\pm\pi/2$; $v_{0x}=-\omega A\sin\phi<0$ ⇒ $\sin\phi>0$ ⇒ **$\phi=+\pi/2$ rad**.
4. **c)** $x=(0{,}980\ \text{m})\cos[(12{,}2\ \text{rad/s})t+\pi/2]=$ **$-(0{,}980\ \text{m})\sin[(12{,}2\ \text{rad/s})t]$**.
5. **Comprobación.** En $t=0$, $x=0$; justo después $x<0$ (se mueve hacia la izquierda) ✓.

**Receta.** Para la fase, usar siempre las dos condiciones: el signo de $\cos\phi$ lo da $x_0$ y el de $\sin\phi$ lo da $-v_{0x}$; la arcotangente sola puede confundir de cuadrante.

**Error típico.** Poner $\phi=-\pi/2$ (sentido de movimiento al revés) o dar $A=12{,}0$ m (confundir velocidad con posición).

**Figura SVG sugerida.** Gráfica $x(t)=-0{,}980\sin(12{,}2t)$ durante un periodo ($T=0{,}513$ s) con la tangente de pendiente negativa en $t=0$; círculo de referencia con el fasor a $\phi=90°$.

Teoría: U §14.2 pp. 438–441 (14.10, 14.13, 14.14, 14.17–14.19).

---

### E8. Ejercicio 14.14 — amplitud y fase con $x_0$ y $v_0$ distintos de cero (Solucionario 14-4)

**Enunciado (U p. 460).** Repita el ejercicio 14.13 (bloque de 2,00 kg, $k=300$ N/m) suponiendo que en $t=0$ el bloque tiene velocidad $-4{,}00$ m/s y desplazamiento $+0{,}200$ m.

**Solución.**

1. **$\omega$** igual que antes: $\omega=12{,}25$ rad/s.
2. **a)** (14.19): $A=\sqrt{0{,}200^2+\dfrac{(-4{,}00)^2}{12{,}25^2}}=\sqrt{0{,}0400+0{,}1067}=$ **0,383 m**. Mayor que 0,200 m porque además de estar desplazado se está moviendo.
3. **b)** (14.18): $\phi=\arctan\!\left(-\dfrac{-4{,}00}{(12{,}25)(0{,}200)}\right)=\arctan(1{,}633)=$ **1,02 rad = 58,5°**.
4. **Comprobar el cuadrante.** $x_0>0$ ⇒ $\cos\phi>0$; $v_{0x}<0$ ⇒ $\sin\phi>0$ ⇒ primer cuadrante ✓ (si hubiera salido en otro, se sumaría $\pi$).
5. **c)** $x=(0{,}383\ \text{m})\cos[(12{,}2\ \text{rad/s})t+1{,}02\ \text{rad}]$.
6. **Comprobación.** $x(0)=0{,}383\cos1{,}02=0{,}200$ m ✓; $v_x(0)=-12{,}25(0{,}383)\sin1{,}02=-4{,}00$ m/s ✓.

**Receta.** Estrategia 14.1 (U p. 441): $\omega$ de $k$ y $m$; $A$ de (14.19); $\phi$ de (14.18) revisando el cuadrante; sustituir en $x=A\cos(\omega t+\phi)$ y comprobar $x(0)$ y $v(0)$.

**Error típico.** Olvidar el signo menos de (14.18) (sale $\phi=-58{,}5°$, que describe un bloque que se aleja).

**Figura SVG sugerida.** Gráfica $x(t)$ con el punto $(0;\ 0{,}200)$ y la tangente descendente; banda $\pm A=\pm0{,}383$ m.

Teoría: U §14.2 pp. 440–441.

---

### E9. Ejercicio 14.80 — resorte vertical: masa, posición en un instante y fuerza del resorte (Solucionario 14-24)

**Enunciado (U p. 464).** Una fuerza de 40,0 N estira un resorte vertical 0,250 m. a) ¿Qué masa hay que colgar para que el sistema oscile con periodo 1,00 s? b) Si la amplitud es 0,050 m y el periodo el de a), ¿dónde está el objeto y en qué sentido se mueve 0,35 s después de pasar por el equilibrio dirigiéndose hacia abajo? c) ¿Qué fuerza (módulo y sentido) ejerce el resorte sobre el objeto cuando está 0,030 m por debajo del equilibrio, subiendo?

**Solución.**

1. **a)** $k=F/\Delta l=40{,}0/0{,}250=160$ N/m. De (14.12): $m=k\left(\dfrac{T}{2\pi}\right)^2=160\left(\dfrac{1{,}00}{2\pi}\right)^2=$ **4,05 kg**.
2. **b) Elegir el origen de tiempos.** $t=0$ cuando pasa por el equilibrio hacia abajo; $+x$ hacia arriba ⇒ $x_0=0$, $v_{0x}<0$ ⇒ $\phi=+\pi/2$ (como en E7) ⇒ $x=-A\sin\omega t$, $v_x=-A\omega\cos\omega t$, con $\omega=2\pi$ rad/s.
3. **b) Sustituir $t=0{,}35$ s** ($=0{,}35T$): $x=-0{,}050\sin(0{,}70\pi)=$ **−0,0405 m** (4,0 cm **por debajo** del equilibrio); $v_x=-0{,}050(2\pi)\cos(0{,}70\pi)=+0{,}185$ m/s ⇒ **se mueve hacia arriba**.
4. **b) Por qué tiene sentido.** En $T/4=0{,}25$ s llega al punto más bajo; a $0{,}35$ s ya ha rebotado y sube, pero aún no ha llegado al equilibrio (lo haría en $T/2=0{,}50$ s).
5. **c) Fuerza del resorte, no la neta.** La neta es $-kx$ (U p. 446); el resorte además equilibra el peso: $F_{res}-mg=-kx$ ⇒ $F_{res}=mg-kx=(4{,}05)(9{,}80)-160(-0{,}030)=39{,}7+4{,}8=$ **44,5 N hacia arriba**. (Que suba o baje no importa: la fuerza del resorte solo depende de la posición.)

**Receta.** Resorte vertical: fuerza **neta** $=-kx$ (desde el equilibrio); fuerza **del resorte** $=mg-kx$ (hacia arriba +), o directamente $k\times$(estiramiento total), con estiramiento $=mg/k-x$.

**Error típico.** En c), contestar $kx=4{,}8$ N (la fuerza neta) en lugar de la del resorte; en b), equivocar el signo de la fase y colocar el objeto por encima.

**Figura SVG sugerida.** Gráfica $x(t)=-0{,}050\sin(2\pi t)$ de 0 a 1 s con el punto $t=0{,}35$ s, $x=-4{,}05$ cm y la tangente ascendente; DCL del objeto en $x=-0{,}030$ m: $F_{res}=44{,}5$ N arriba, $mg=39{,}7$ N abajo, neta 4,8 N arriba.

Teoría: U §14.2 pp. 438–441; §14.4 p. 446.

---

### E10. Ejercicio 14.31 — masilla sobre un oscilador: amplitud mitad (Solucionario 14-9)

**Enunciado (U p. 461).** En la situación del apartado a) del ejemplo 14.5 (masilla de masa $m$ que cae sobre un bloque $M$ cuando pasa por el equilibrio y se queda pegada), ¿qué masa $m$ debe tener la masilla para que la amplitud tras el choque sea la mitad de la original? Con ese valor, ¿qué fracción de la energía mecánica original se convierte en energía térmica?

**Solución.**

1. **Resultado del Ej. 14.5 (U p. 445), y de dónde sale.** En el equilibrio toda la energía es cinética, $v_1=A_1\sqrt{k/M}$. El choque (horizontalmente) conserva la cantidad de movimiento: $Mv_1=(M+m)v_2$. Justo después sigue en $x=0$, así que $\tfrac12kA_2^2=\tfrac12(M+m)v_2^2=\dfrac{M}{M+m}\cdot\tfrac12kA_1^2$ ⇒ $A_2=A_1\sqrt{\dfrac{M}{M+m}}$.
2. **Imponer $A_2=A_1/2$.** $\tfrac14=\dfrac{M}{M+m}$ ⇒ **$m=3M$**.
3. **Energía.** $E\propto A^2$ ⇒ $E_2=\tfrac14E_1$ ⇒ **se pierden $\tfrac34$ de la energía mecánica**, que se convierten en energía térmica al deformarse y rozar la masilla contra el bloque.
4. **Comprobación con (8.18).** En un choque totalmente inelástico con un cuerpo en reposo, $K_2/K_1=M/(M+m)=1/4$ ✓ (U p. 248).

**Receta.** Choque en el equilibrio: cantidad de movimiento ⇒ nueva $v$; luego $E=\tfrac12(M+m)v^2=\tfrac12kA_2^2$. Choque en un extremo ($v=0$): no se pierde energía y $A$ no cambia.

**Error típico.** Pensar que la energía se conserva en el choque (daría $A_2=A_1$); o que $m=M$ basta (con $m=M$, $A_2=A_1/\sqrt2$).

**Figura SVG sugerida.** Bloque $M$ en $x=0$ con flecha $v_1$ y masilla $3M$ cayendo; debajo, dos sinusoides: antes amplitud $A_1$, después $A_1/2$ y periodo doble ($T_2=2\pi\sqrt{4M/k}=2T_1$).

Teoría: U §14.3 pp. 442–445 (Ej. 14.5); §8.3 p. 248.

---

### E11. Ejercicio 14.79 — báscula de carnicero (Solucionario 14-23 y 14-24)

**Enunciado (U p. 464).** Un resorte de masa despreciable y $k=400$ N/m cuelga verticalmente; de su extremo cuelga una bandeja de 0,200 kg. Un carnicero deja caer un filete de 2,2 kg sobre la bandeja desde 0,40 m de altura. El choque es totalmente inelástico y el sistema queda en MAS vertical. Calcule a) la rapidez de la bandeja y el filete justo después del choque; b) la amplitud del movimiento posterior; c) su periodo.

(Mismo esquema que el examen X1; se puede presentar como «el gemelo de libro».)

**Solución.**

1. **Caída.** $v_1=\sqrt{2gh}=\sqrt{2(9{,}80)(0{,}40)}=2{,}80$ m/s (2.13).
2. **a) Choque.** $P_y$ se conserva (8.17): $v_2=\dfrac{2{,}2}{2{,}2+0{,}200}(2{,}80)=$ **2,57 m/s** hacia abajo.
3. **Nuevo equilibrio.** El filete estira el resorte $d=\dfrac{m_{filete}\,g}{k}=\dfrac{(2{,}2)(9{,}80)}{400}=0{,}0539$ m más: justo tras el choque el conjunto está **0,0539 m por encima** del nuevo equilibrio, bajando a 2,57 m/s.
4. **b) Amplitud.** $\tfrac12m_{tot}v_2^2+\tfrac12kx_0^2=\tfrac12kA^2$ ⇒ $A=\sqrt{x_0^2+\dfrac{m_{tot}v_2^2}{k}}=\sqrt{0{,}0539^2+\dfrac{2{,}4(2{,}567)^2}{400}}=$ **0,206 m ≈ 0,21 m**.
5. **c)** $T=2\pi\sqrt{m_{tot}/k}=2\pi\sqrt{2{,}4/400}=$ **0,49 s** (0,487 s).
6. **Comprobación energética.** $A=0{,}21$ m < 0,40 m de caída: se pierde energía en el choque (de 8,6 J de cinética del filete quedan 7,9 J).

**Receta.** Igual que X1: $x_0=m_{añadida}g/k$ por encima del nuevo equilibrio; $A=\sqrt{x_0^2+v_2^2/\omega^2}$ con $\omega^2=k/m_{tot}$.

**Error típico.** Usar en $d$ la masa total (bandeja + filete): la bandeja ya estaba en equilibrio antes del choque, el desplazamiento del equilibrio lo produce solo el filete.

**Figura SVG sugerida.** Igual que en X1, con los valores 5,39 cm, 2,57 m/s y $A=20{,}6$ cm.

Teoría: U §2.4 p. 47; §8.3 p. 248; §14.2 pp. 438–441; §14.4 p. 446.

---

### E12. Ejercicio 14.50 — leer un péndulo en una gráfica θ(t) (Solucionario 14-14)

**Enunciado (U p. 462).** En el laboratorio, un estudiante representa el ángulo $\theta$ que forma la cuerda de un péndulo con la vertical en función del tiempo y obtiene la gráfica de la figura E14.50 (coseno que empieza en $\theta=6°$ en $t=0$, vuelve a $6°$ en $t=1{,}6$ s, pasa por $-6°$ en 0,8 s y 2,4 s; cuadrícula de 0,2 s). a) Determine el periodo, la frecuencia, la frecuencia angular y la amplitud. b) ¿Cuál es la longitud del péndulo? c) ¿Se puede determinar la masa de la lenteja?

**Solución.**

1. **a) Periodo.** Tiempo entre dos máximos consecutivos: $T=$ **1,60 s**. (Mejor leer de máximo a máximo que de cero a cero: más preciso.)
2. **a) Frecuencias.** $f=1/T=$ **0,625 Hz**; $\omega=2\pi f=$ **3,93 rad/s** (14.1–14.2).
3. **a) Amplitud.** Ángulo máximo: $\Theta=$ **6°** (0,105 rad). Es pequeño ⇒ vale el péndulo simple ($\sin\theta\approx\theta$, error < 0,1 %).
4. **b)** $T=2\pi\sqrt{L/g}$ (14.34, U p. 450) ⇒ $L=g\left(\dfrac{T}{2\pi}\right)^2=9{,}80\left(\dfrac{1{,}60}{2\pi}\right)^2=$ **0,635 m**.
5. **c) No.** El periodo (y toda la gráfica) no depende de la masa de la lenteja: la masa aparece a la vez en el peso (fuerza de restitución) y en la inercia y se cancela (U p. 450).
6. **Extra.** La amplitud no disminuye en 3 s ⇒ amortiguamiento despreciable.

**Receta.** Gráfica de un oscilador: $T$ entre máximos, $A$ = altura del máximo; de $T$ sale $L$ (péndulo) o $k/m$ (resorte), nunca la masa del péndulo.

**Error típico.** Leer como periodo el tiempo entre un máximo y un mínimo (0,8 s = $T/2$), o usar 6 en grados dentro de fórmulas en radianes.

**Figura SVG sugerida.** Reproducir la gráfica $\theta(t)=6°\cos(3{,}93t)$ de 0 a 3 s con la flecha «$T=1{,}60$ s» entre máximos y «$\Theta=6°$».

Teoría: U §14.1 p. 435; §14.5 p. 450.

---

### E13. Ejercicio 14.55 — momento de inercia de una biela por su periodo (Solucionario 14-15)

**Enunciado (U p. 462).** Una biela de motor de 1,80 kg pivota sobre el filo de un cuchillo horizontal (figura E14.55). Su centro de gravedad está a 0,200 m del pivote. Con oscilaciones de pequeña amplitud hace 100 oscilaciones completas en 120 s. Calcule el momento de inercia de la biela respecto al eje de rotación que pasa por el pivote.

**Solución.**

1. **Modelo.** Cuerpo rígido que oscila alrededor de un eje que no pasa por su centro de gravedad ⇒ **péndulo físico**: $T=2\pi\sqrt{I/mgd}$ (14.39, U p. 452), con $d$ = distancia pivote–cg e $I$ respecto al pivote. U cita precisamente este método para medir momentos de inercia (p. 452).
2. **Periodo.** Contar muchas oscilaciones reduce el error del cronómetro: $T=120/100=1{,}20$ s.
3. **Despejar.** $I=mgd\left(\dfrac{T}{2\pi}\right)^2=(1{,}80)(9{,}80)(0{,}200)\left(\dfrac{1{,}20}{2\pi}\right)^2=$ **0,129 kg·m²**.
4. **Comprobación de orden de magnitud.** Si fuera una varilla uniforme con el cg a 0,200 m, mediría 0,400 m e $I=\tfrac13ml^2=0{,}096$ kg·m². La biela real tiene $I$ un 34 % mayor: tiene mucha masa en el extremo grande (el ojo de la cabeza), lejos del pivote.

**Receta.** Medir $I$ de una pieza irregular: colgarla de un eje, medir $T$ (muchas oscilaciones), $m$ y $d$ ⇒ $I=mgd\,T^2/4\pi^2$.

**Error típico.** Usar $T=120$ s o $T=100/120$ s; usar $d$ = longitud total de la pieza.

**Figura SVG sugerida.** Silueta de la biela colgada del pivote con la cota $d=0{,}200$ m al cg y el ángulo $\theta$; recuadro $T=1{,}20$ s ⇒ $I=0{,}129$ kg·m².

Teoría: U §14.6 pp. 451–452.

---

### E14. Problema 14.86 — la campana que suena en silencio (Solucionario 14-27)

**Enunciado (U p. 465).** Una campana de 34,0 kg cuelga de una viga y puede oscilar con fricción despreciable. Su centro de masa está 0,60 m por debajo del pivote y su momento de inercia respecto a un eje por el pivote es 18,0 kg·m². El badajo es pequeño, de 1,8 kg, y cuelga del extremo de una varilla delgada de longitud $L$ y masa despreciable cuyo otro extremo está sujeto al interior de la campana, de modo que oscila libremente sobre el mismo eje. ¿Qué longitud $L$ debe tener la varilla para que la campana suene en silencio, es decir, para que el periodo de oscilación de la campana sea igual al del badajo?

**Solución.**

1. **Por qué «en silencio».** Si campana y badajo oscilan con el mismo periodo y parten juntos, se mueven a la par y el badajo nunca golpea.
2. **Campana = péndulo físico** (14.39): $T=2\pi\sqrt{\dfrac{I}{mgd}}=2\pi\sqrt{\dfrac{18{,}0}{(34{,}0)(9{,}80)(0{,}60)}}=1{,}885$ s.
3. **Badajo = péndulo simple** (masa pequeña al final de una varilla sin masa, 14.34): $T=2\pi\sqrt{L/g}$.
4. **Igualar.** $L=g\left(\dfrac{T}{2\pi}\right)^2=9{,}80\left(\dfrac{1{,}885}{2\pi}\right)^2=$ **0,88 m**.
5. **Atajo elegante.** Igualando $\sqrt{L/g}=\sqrt{I/mgd}$ ⇒ $L=\dfrac{I}{md}=\dfrac{18{,}0}{(34{,}0)(0{,}60)}=0{,}882$ m: no hace falta $g$ ni la masa del badajo. $I/(md)$ es la «longitud equivalente» del péndulo físico.
6. **Comprobación.** Si el cm estuviera en el centro geométrico, la campana mediría 1,20 m: el badajo (0,88 m) queda dentro ✓.

**Receta.** Péndulo físico «equivalente» a uno simple: $L_{eq}=I/(md)$.

**Error típico.** Usar la masa del badajo en la fórmula de la campana, o intentar meter el badajo en el $I$ de la campana.

**Figura SVG sugerida.** Campana con pivote arriba, cg a 0,60 m, badajo colgado del mismo eje con $L=0{,}88$ m; dos sinusoides en fase con $T=1{,}885$ s.

Teoría: U §14.5 p. 450; §14.6 pp. 451–452.

---

### E15. Problema 14.96 — cambio de frecuencia de un cantiléver (Solucionario 14-31)

**Enunciado (U p. 466, problemas de transición).** Microscopía de fuerza atómica dinámica: la punta de un cantiléver vibra en MAS; para un cantiléver de constante $k=1000$ N/m, la frecuencia de resonancia es 100 kHz. Cerca de la muestra, la superficie ejerce sobre la punta una fuerza que varía linealmente con el desplazamiento, $|F|=k_{sup}x$, y la fuerza neta es $(k+k_{sup})x$. 14.96: ¿En qué porcentaje cambia la frecuencia de oscilación si $k_{sup}=5$ N/m? a) 0,1 %; b) 0,2 %; c) 0,5 %; d) 1,0 %.

**Solución.**

1. **Modelo.** Masa en un resorte con constante efectiva $k+k_{sup}$; la masa no cambia. $f=\dfrac1{2\pi}\sqrt{k/m}$ (14.11).
2. **Cociente** (la masa y el $2\pi$ se cancelan): $\dfrac{f}{f_0}=\sqrt{\dfrac{k+k_{sup}}{k}}=\sqrt{\dfrac{1005}{1000}}=1{,}0025$.
3. **Porcentaje.** $\dfrac{\Delta f}{f_0}=\sqrt{1{,}005}-1=2{,}5\times10^{-3}=$ **0,25 %** ⇒ la opción más próxima es la **b) 0,2 %**.
4. **Regla rápida.** Para cambios pequeños, $\dfrac{\Delta f}{f}\approx\dfrac12\dfrac{\Delta k}{k}=\tfrac12(0{,}5\ \%)=0{,}25\ \%$: como $f\propto\sqrt k$, el cambio relativo de $f$ es la mitad del de $k$.

**Receta.** Cambios relativos pequeños con una raíz: $\Delta f/f\approx\tfrac12\Delta k/k$ (y $-\tfrac12\Delta m/m$).

**Error típico.** Responder 0,5 % (como si $f\propto k$).

**Figura SVG sugerida.** Opcional: curva $f/f_0=\sqrt{1+k_{sup}/k}$ frente a $k_{sup}$ con su tangente $1+k_{sup}/2k$ en el origen y el punto $k_{sup}=5$ N/m.

Teoría: U §14.2 p. 438 (14.11).

---

### E16. Problema 14.84 — dos esferas que ruedan unidas a un resorte (Solucionario 14-26)

**Enunciado (U p. 465).** Dos esferas sólidas uniformes, cada una de masa $M=0{,}800$ kg y radio $R=0{,}0800$ m, están unidas por una varilla corta y ligera que pasa por un diámetro de cada una, y reposan sobre una mesa horizontal. Un resorte de constante $k=160$ N/m tiene un extremo fijo a la pared y el otro unido a un anillo sin fricción que rodea la varilla en el centro de masa de las esferas (a mitad de camino entre sus centros). Se tira de las esferas la misma distancia desde la pared, estirando el resorte, y se sueltan. Hay fricción suficiente para que rueden sin resbalar. Demuestre que el movimiento del centro de masa es armónico simple y calcule su periodo.

**Solución.** (Mismo método que el problema práctico P1, con esferas en lugar de cilindros.)

1. **Ecuaciones** (U §10.3 pp. 311–313). Para **cada** esfera, rotación alrededor de su centro: solo la fricción $f_s$ del suelo hace torque, $f_sR=I\alpha=\tfrac25MR^2\alpha$ (tabla 9.2); rodar sin resbalar $a_{cm}=R\alpha$ ⇒ $f_s=\tfrac25Ma_{cm}$ (en módulo, opuesta a la fuerza del resorte).
2. **Traslación del sistema** (masa $2M$): $-kx+2f_s=2Ma_{cm}$ con $f_s$ en sentido opuesto a $a_{cm}$ ⇒ $-kx-\tfrac45Ma_{cm}=2Ma_{cm}$.
3. **Despejar.** $\tfrac{14}{5}Ma_{cm}=-kx$ ⇒ $a_{cm}=-\dfrac{5k}{14M}x$: forma $a=-\omega^2x$ ⇒ **MAS** con $\omega=\sqrt{\dfrac{5k}{14M}}=\sqrt{\dfrac{5(160)}{14(0{,}800)}}=8{,}45$ rad/s.
4. **Periodo.** $T=2\pi\sqrt{\dfrac{14M}{5k}}=2\pi\sqrt{\dfrac{14(0{,}800)}{5(160)}}=$ **0,743 s**.
5. **Por energía (comprobación).** Masa efectiva $2\left(M+\dfrac{I}{R^2}\right)=2\cdot\tfrac75M=\tfrac{14}{5}M$ ⇒ $\omega^2=k/(\tfrac{14}{5}M)$ ✓. Sin fricción (sin giro) sería $T_0=2\pi\sqrt{2M/k}=0{,}628$ s: rodando, el periodo es $\sqrt{7/5}=1{,}18$ veces mayor (menos que el 1,22 de los cilindros, porque una esfera maciza tiene menor $I/MR^2$).
6. **Notas.** $R$ no interviene en el resultado. La fricción es estática y no trabaja: la energía mecánica se conserva y la amplitud no decae.

**Receta.** Oscilador rodante: $T=2\pi\sqrt{M_{ef}/k}$ con $M_{ef}=\sum(M+I_{cm}/R^2)$; para esfera maciza $\tfrac75M$, para cilindro macizo $\tfrac32M$, para aro $2M$.

**Error típico.** Usar $2M$ como masa que oscila; olvidar que hay **dos** esferas (y dos fricciones).

**Figura SVG sugerida.** Vista lateral: una esfera sobre la mesa con el resorte unido al anillo central; flechas $-kx$ (en el eje), $f_s$ (en el contacto, opuesta), $\alpha$. Tabla mini de $M_{ef}$: aro $2M$, cilindro $\tfrac32M$, esfera $\tfrac75M$.

Teoría: U §9.4 p. 286; §10.3 pp. 311–313; §14.2 pp. 436–438.

---

## Resumen de resultados (para la chuleta y las figuras)

| Ejercicio | Resultados |
|---|---|
| X1 Feb 2022 1ª P-1 | $v_0=3{,}13$ m/s; $V=2{,}09$ m/s; $x_0=1{,}96$ cm; $\omega=18{,}26$ rad/s; $A=0{,}116$ m; $T=0{,}344$ s; $\phi=1{,}40$ rad |
| X7 Feb 2025 1ª P-4 | mitad de resorte: $k'=2k$, $f'=\sqrt2 f$; reloj en la montaña se atrasa (≈14 s/día a 1000 m) |
| P1 «Oscilar y rodar» | $a_{cm}=-\tfrac{2k}{3M}x$; $T=2\pi\sqrt{3M/2k}$; $f=\tfrac13kx$; sin fricción $T_0=2\pi\sqrt{M/k}$ (×1,22) |
| E 14.17 | $k=993$ N/m; $m_{tot}=162$ kg; astronauta 120 kg |
| E 14.38 | $k=3{,}54\times10^3$ N/m; $T=0{,}852$ s; $v_{máx}=0{,}369$ m/s |
| E 14.66 | $k=6{,}125\times10^4$ N/m; $M=5{,}47\times10^3$ kg; $T_E=1{,}88$ s |
| E 14.37 | $E=0{,}128$ J; $A=4{,}06$ cm; $v_{máx}=1{,}21$ m/s; $\omega=29{,}8$ rad/s |
| E 14.28 | $U=K$ en $|x|=A/\sqrt2$, $|v|=\omega A/\sqrt2$; 4 veces por ciclo, cada $T/4$; en $A/2$: $K=3E/4$, $U=E/4$ |
| E 14.59 | $E_1=0{,}450$ J; $E_2=0{,}153$ J; pérdida 0,30 J (2/3) |
| E 14.13 | $\omega=12{,}2$ rad/s; $A=0{,}980$ m; $\phi=+\pi/2$; $x=-0{,}980\sin(12{,}2t)$ |
| E 14.14 | $A=0{,}383$ m; $\phi=1{,}02$ rad (58,5°); $x=0{,}383\cos(12{,}2t+1{,}02)$ |
| E 14.80 | $k=160$ N/m; $m=4{,}05$ kg; en $t=0{,}35$ s: $x=-4{,}05$ cm, sube a 0,185 m/s; $F_{res}=44{,}5$ N arriba |
| E 14.31 | $m=3M$; se pierde 3/4 de $E$ |
| E 14.79 | $v_1=2{,}80$ m/s; $v_2=2{,}57$ m/s; $x_0=5{,}39$ cm; $A=0{,}206$ m ≈ 0,21 m; $T=0{,}487$ s ≈ 0,49 s |
| E 14.50 | $T=1{,}60$ s; $f=0{,}625$ Hz; $\omega=3{,}93$ rad/s; $\Theta=6°$; $L=0{,}635$ m; masa no determinable |
| E 14.55 | $T=1{,}20$ s; $I=0{,}129$ kg·m² (varilla uniforme: 0,096) |
| E 14.86 | $T=1{,}885$ s; $L=I/(md)=0{,}88$ m |
| E 14.96 | $\Delta f/f=0{,}25$ % ⇒ opción b |
| E 14.84 | $\omega=8{,}45$ rad/s; $T=0{,}743$ s; $M_{ef}=\tfrac{14}{5}M$ |

---

## Ideas de interactivos three.js (2D, máx. 2)

### I1. `mas-circulo` (2D, `{"dim":2}`) — círculo de referencia, x(t) y energía

Panel izquierdo: círculo de radio $A$ con el fasor girando a $\omega$ y su proyección $P$ sobre el eje $x$ (un bloque unido a un resorte dibujado con `cinta`/zigzag). Panel derecho: gráficas $x(t)$, $v_x(t)$, $a_x(t)$ con un cursor de tiempo (`escalaX` porque $t$ y $x$ tienen unidades distintas). Debajo, tres barras $E$, $K$, $U$.
- Deslizadores: $m$ (0,1–5 kg), $k$ (10–500 N/m), $x_0$ y $v_{0x}$ (condiciones iniciales). Se calculan $\omega=\sqrt{k/m}$, $A=\sqrt{x_0^2+v_{0x}^2/\omega^2}$ y $\phi$ con las dos condiciones (atan2), y se muestran $T$, $A$, $\phi$.
- Qué enseña: (i) $T$ no cambia al mover $x_0$/$v_{0x}$ (solo $A$ y $\phi$); (ii) $K$ y $U$ se intercambian y suman $\tfrac12kA^2$; (iii) $K=U$ cuatro veces por ciclo.
- Valores de control (verificados): U Ej. 14.3 ($m=0{,}50$, $k=200$, $x_0=0{,}015$, $v_0=0{,}40$) ⇒ $A=0{,}0250$ m, $\phi=-0{,}927$ rad; E 14.14 ($m=2$, $k=300$, $x_0=0{,}200$, $v_0=-4{,}00$) ⇒ $A=0{,}383$ m, $\phi=1{,}02$ rad, $T=0{,}513$ s.

### I2. `amortiguado-resonancia` (2D) — oscilaciones amortiguadas y forzadas

Modo 1 «amortiguado»: $x(t)=Ae^{-(b/2m)t}\cos(\omega't+\phi)$ con deslizador $b/b_{crít}$ de 0 a 1,5; para $b<2\sqrt{km}$ dibujar la envolvente; para $b\ge2\sqrt{km}$, la solución crítica/sobreamortiguada (sin oscilar). Mostrar $\omega'=\sqrt{k/m-b^2/4m^2}$ y $E(t)$.
Modo 2 «resonancia»: curva $A(\omega_d)=F_{máx}/\sqrt{(k-m\omega_d^2)^2+b^2\omega_d^2}$ (14.46) para el $b$ elegido, con un punto móvil en $\omega_d$; reproduce la fig. 14.28 (U p. 456), con $b=0{,}2\sqrt{km}$ … $2{,}0\sqrt{km}$.
- Valores de control: $m=0{,}300$ kg, $k=2{,}50$ N/m, $b=0{,}900$ kg/s (E 14.61) ⇒ $\omega'=\sqrt{8{,}333-2{,}25}=2{,}47$ rad/s, $f'=0{,}393$ Hz, $b_{crít}=1{,}73$ kg/s; E 14.59 (amplitud 6,0 → 3,5 cm en 8 ciclos) como ejemplo de envolvente. (Estos dos números de E 14.61 están verificados en el script: $\sqrt{2{,}5/0{,}3-0{,}81/0{,}36}=2{,}466$; $2\sqrt{0{,}75}=1{,}732$.)

---

## Notas internas para el redactor (NO publicar en el HTML; regla 8 bis)

1. **Exámenes:** X1 (Feb 2022 1ª P-1) también está resuelto en el Tema 8 (X3) por energía; aquí se hace con MAS y mismo resultado. Las teorías X2–X6 son solo el título (sin cuestiones); X7 (Feb 2025) es la única con cuestiones, y son literalmente U P14.5 y P14.13. **X6 (Septiembre 2019 «Reserva», P-3 Opción 3.1)** no estaba en el índice `examenes_por_tema.md`; confirmado sobre la imagen de la pág. 27 del recopilatorio (cabecera «Curso 2018-2019 · RESERVA · Septiembre 2019»; P-1 rodadura, P-2 gas ideal, P-3 3.1 «El movimiento armónico simple. Energía del M.A.S.» / 3.2 «Transformación de Galileo»). Conviene añadirlo al índice. Cita propuesta: «Examen Septiembre 2019 (Reserva) P-3».
2. **Página del MAS vertical:** §14.4 empieza en U p. 446 (el apartado «MAS vertical» y la fig. 14.17 están en p. 446; el Ej. 14.6 en p. 447). Citar p. 446.
3. **Ej. 14.8:** resultado en p. 451 (no 450).
4. **E 14.79:** escribir $A=0{,}206$ m ≈ 0,21 m y $T=0{,}487$ s ≈ 0,49 s.
5. **E 14.59:** $E_2=0{,}153$ J; pérdida 0,297 J ≈ 0,30 J. Escribir así.
6. **E 14.38:** $T=0{,}8515$ s; con tres cifras **0,852 s** (redondeo directo del valor sin truncar). Escribir 0,852 s.
7. **E 14.13:** $\omega=12{,}25$ rad/s ⇒ $A=0{,}980$ m (tres cifras).
8. **E 14.96:** el resultado exacto es 0,25 %, que no coincide con ninguna opción; la más próxima es la b) 0,2 %. Escribir «0,25 % ⇒ opción b)».
9. **E 14.80 b):** el sentido del movimiento (hacia arriba) se justifica con $v_x(0{,}35)=+0{,}185$ m/s (calculado aquí).
10. **E 14.84:** el enunciado completo está en U p. 465 (comprobado en `sears.txt`); $R$ no interviene.
11. **Problema práctico:** sin desarrollo en E; resuelto aquí siguiendo la guía de U y comprobado con la respuesta de U p. 467 ($T=2\pi\sqrt{3M/2k}$).
12. **Figuras de U útiles para recortar** (PDF = impresa + 28): 14.2 modelo (p. 434–435), 14.5 círculo de referencia (p. 436), 14.9/14.12 gráficas x-v-a (pp. 439–440), 14.14–14.15 energías (p. 443), 14.17 resorte colgante (p. 446), 14.21 péndulo simple (p. 450), 14.23 péndulo físico (p. 451), 14.26 amortiguada (p. 454), 14.28 resonancia (p. 456), 14.29 problema práctico (p. 458), E14.50 (p. 462), E14.55 (p. 462).
