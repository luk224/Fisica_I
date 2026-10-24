# Soluciones Tema 8 — Cantidad de movimiento, impulso y colisiones

Material para el redactor del tema 8. Todos los números se han comprobado con sympy (script de verificación propio). Enunciados de examen verificados sobre los PDF originales de `Examanes/` (renderizados a imagen); enunciados de U verificados sobre el PDF del libro (págs. impresas 266, 267, 269 y 270). Los problemas E están traducidos y ampliados (no son copia del solucionario).

Convenciones: $g = 9{,}8\ \text{m/s}^2$ salvo que el enunciado diga otra cosa; «U p. NN» = página impresa del Sears-Zemansky.

Referencias de teoría que se usan (U, cap. 8 salvo indicación):

| Herramienta | Dónde |
|---|---|
| $\vec p = m\vec v$ (8.2) | U §8.1 p. 238 |
| Impulso y teorema impulso–cantidad de movimiento (8.5)–(8.9), fuerza media | U §8.1 pp. 239–240 |
| Conservación de la cantidad de movimiento (8.13)–(8.15), «se conservan las componentes» | U §8.2 pp. 243–244 |
| Choques: elástico, inelástico, totalmente inelástico (8.16) | U §8.3 pp. 247–248 |
| Choque elástico 1D (8.24)–(8.25); velocidad relativa (8.27) | U §8.4 pp. 251–252 |
| Centro de masa (8.28)–(8.30); $\vec P = M\vec v_{cm}$ (8.32); $\sum\vec F_{ext} = M\vec a_{cm}$ (8.34); $d\vec P/dt=\sum \vec F_{ext}$ (8.36) | U §8.5 pp. 255–258 |
| Cohete: (8.37)–(8.40); con gravedad hay que añadir el peso | U §8.6 pp. 259–260 |
| Conservación de la energía mecánica con $U_{grav}$ (7.4) y con $U_{el}$ (7.13)–(7.14) | U §7.1 p. 205; §7.2 pp. 213–215 |
| Movimiento de proyectiles (3.19)–(3.22) | U §3.3 pp. 76–77 |
| MAS: $\omega=\sqrt{k/m}$, $T=2\pi\sqrt{m/k}$ (14.10)–(14.12); MAS vertical | U §14.2 p. 438; §14.4 p. 446 |
| Conservación del momento angular | U §10.6 p. 320 |

---

## PARTE A — Problemas de examen (X), de más fácil a más difícil

### X1. Examen Febrero 2018 (2ª semana), P-1 — Choque helio–oxígeno

Fuente: `Examanes/E689010160-18F2.pdf`, pregunta 1 (3 puntos).

**Enunciado.** Un átomo de helio de masa $m_1 = 4$ u choca con una velocidad de 1200 m/s, en la dirección del eje $x$, con una molécula de oxígeno de masa $m_2 = 32$ u que se encuentra inicialmente en reposo. Como consecuencia del choque, el helio se mueve en la dirección del eje $y$, en sentido positivo, con una cuarta parte de la energía cinética que tenía antes del choque. Calcular: a) la velocidad que adquiere la molécula de oxígeno; b) la fracción de energía cinética total que se pierde en el choque.

**Solución.**

1. **Sistema y fuerzas.** El sistema es {He + O₂}. Durante el choque solo actúan entre ellos fuerzas internas (acción–reacción); no hay fuerza externa neta. Por tanto se conserva la cantidad de movimiento total **vectorial**, es decir, cada componente por separado (U §8.2 pp. 243–244). La energía cinética **no** tiene por qué conservarse: no nos dicen que el choque sea elástico (de hecho, el apartado b pide cuánto se pierde).
2. **Rapidez final del helio.** $K = \tfrac12 m v^2$: si $K'_1 = K_1/4$, entonces $v'^2_1 = v_1^2/4$ y $v'_1 = v_1/2 = 600$ m/s, dirigida según $+y$. Así $\vec v'_1 = (0,\ 600)$ m/s.
3. **Unidades de masa.** Solo intervienen cocientes de masas, así que podemos trabajar en u sin pasar a kg (las u se simplifican).
4. **Componente $x$:** $m_1 v_1 = m_1\cdot 0 + m_2 v'_{2x}$ ⇒ $v'_{2x} = \dfrac{4\cdot1200}{32} = 150$ m/s.
5. **Componente $y$:** antes no hay cantidad de movimiento en $y$: $0 = m_1(600) + m_2 v'_{2y}$ ⇒ $v'_{2y} = -\dfrac{4\cdot600}{32} = -75$ m/s.
6. **Módulo y dirección.** $\vec v'_2 = (150\,\hat\imath - 75\,\hat\jmath)$ m/s; $|\vec v'_2| = \sqrt{150^2+75^2} = 167{,}7$ m/s ≈ **168 m/s**, formando $\theta = \arctan(75/150) = 26{,}6°$ **por debajo** del eje $+x$ (el O₂ «compensa» la cantidad de movimiento del He hacia $+y$ yendo hacia $-y$).
7. **Energías (en u·m²/s²).** $K_0 = \tfrac12(4)(1200)^2 = 2{,}88\times10^6$. Después: $K'_1 = K_0/4 = 0{,}72\times10^6$; $K'_2 = \tfrac12(32)(150^2+75^2) = 0{,}45\times10^6$. Total final $1{,}17\times10^6$.
8. **Fracción perdida.** $\dfrac{K_0-K_f}{K_0} = \dfrac{2{,}88-1{,}17}{2{,}88} = \dfrac{19}{32} = 0{,}594$ ⇒ se pierde el **59,4 %** de la energía cinética (en julios: $K_0 = 4{,}78\times10^{-21}$ J, pérdida $2{,}84\times10^{-21}$ J con 1 u $=1{,}66\times10^{-27}$ kg).

**Resultado:** a) $\vec v'_2 = (150\,\hat\imath - 75\,\hat\jmath)$ m/s, 168 m/s a 26,6° bajo el eje $x$; b) 19/32 ≈ 59 % (choque inelástico).

**Receta.** En un choque 2D: (1) dibuja antes/después con ejes; (2) escribe una ecuación de conservación por componente; (3) la energía solo se iguala si dicen «elástico»; si no, se calcula después para ver cuánto se perdió.

**Error típico.** Sumar módulos de cantidades de movimiento ($4\cdot1200 = 4\cdot600 + 32\,v'_2$) en lugar de componentes; o imponer conservación de energía cinética, que aquí no se cumple. Otro: olvidar que $K/4$ implica $v/2$, no $v/4$.

Teoría: U §8.2 pp. 243–244 (conservación por componentes), §8.3 p. 247 (clasificación de choques).

---

### X2. Examen Febrero 2020 (1ª semana), P-2 — Cohete de fuegos artificiales que estalla (= U Problema 8.97)

Fuente: `Examanes/E689010160-20F1.pdf`, pregunta 2 (3 puntos). Es el mismo enunciado que U 8.97 (p. 270); su desarrollo en el solucionario está en Solucionario 8-35/8-36.

**Enunciado.** Un cohete de fuegos artificiales se dispara verticalmente hacia arriba. En su altura máxima de 80 m estalla y se divide en dos fragmentos, uno con masa de 1,40 kg y otro con masa de 0,28 kg. En la explosión, 860 J de energía química se convierten en energía cinética de los dos fragmentos. a) ¿Qué velocidad tiene cada fragmento inmediatamente después de la explosión? b) Se observa que los dos fragmentos caen al suelo al mismo tiempo. ¿Qué distancia hay entre los puntos en los que caen? Suponga que el suelo es horizontal y que la resistencia del aire es despreciable.

**Solución.**

1. **Estado justo antes.** En la altura máxima de un tiro vertical la velocidad es cero ⇒ cantidad de movimiento total $\vec P = 0$ y energía cinética $K = 0$.
2. **Por qué se conserva $\vec P$ en la explosión.** Las fuerzas de la explosión son internas y enormes; el peso es externo pero finito, y en el brevísimo intervalo de la explosión su impulso $\vec J = m\vec g\,\Delta t$ es despreciable (U §8.1 p. 239 y la regla general de choques, U p. 248). Por tanto $\vec P_{\text{después}} = 0$: $m_A\vec v_A + m_B\vec v_B = 0$.
3. **Por qué las velocidades son horizontales.** Caen a la vez desde la misma altura. Si un fragmento saliera con componente vertical hacia arriba, el otro la tendría hacia abajo (por el paso 2) y llegarían en tiempos distintos. Luego ambas velocidades son horizontales y opuestas: $m_A v_A = m_B v_B$ (módulos).
4. **Energía de la explosión.** La energía química liberada pasa a energía cinética: $\tfrac12 m_A v_A^2 + \tfrac12 m_B v_B^2 = 860$ J.
5. **Resolver.** Con $A = 1{,}40$ kg y $B = 0{,}28$ kg: $v_A = (m_B/m_A)v_B = 0{,}2\,v_B$. Sustituyendo: $\tfrac12 m_B v_B^2\,(1 + m_B/m_A) = 860$ ⇒ $\tfrac12(0{,}28)(1{,}2)\,v_B^2 = 860$ ⇒ $v_B = 71{,}5$ m/s; $v_A = 14{,}3$ m/s (sentidos opuestos).
6. **Comprobación energética.** $K_A = 143$ J, $K_B = 717$ J; suma 860 J. El fragmento ligero se lleva la mayor parte de la energía ($K = p^2/2m$ con el mismo $p$).
7. **Tiempo de caída (b).** Cada fragmento sale horizontal desde 80 m: movimiento de proyectil con $v_{0y}=0$ (U §3.3 pp. 76–77): $80 = \tfrac12(9{,}8)t^2$ ⇒ $t = 4{,}04$ s.
8. **Alcances.** Horizontalmente la velocidad es constante: $x_A = v_A t = 57{,}8$ m; $x_B = v_B t = 289{,}1$ m. Como van en sentidos opuestos, la separación es $x_A + x_B = $ **347 m**.

**Resultado:** a) $v_A = 14{,}3$ m/s (1,40 kg) y $v_B = 71{,}5$ m/s (0,28 kg), horizontales y opuestas; b) 347 m.

**Receta.** Explosión desde el reposo: $\vec P = 0$ antes ⇒ fragmentos con cantidades de movimiento iguales y opuestas; con la energía liberada se cierra el sistema ($K = p^2/2m$). Después, cada fragmento es un proyectil independiente.

**Error típico.** Repartir los 860 J a partes iguales, o poner la misma velocidad a los dos fragmentos. Otro: sumar distancias olvidando que salen en sentidos opuestos (o restarlas).

Teoría: U §8.2 pp. 243–244; §8.3 p. 248; §3.3 pp. 76–77.

---

### X3. Examen Febrero 2022 (1ª semana), P-1 — Masa que cae sobre una bandeja colgada de un resorte

Fuente: `Examanes/E689010160-22F1.pdf`, pregunta 1 (3 puntos). Combina T8 (choque) con T7 (energía) y T14 (MAS).

**Enunciado.** Un resorte de masa despreciable y constante elástica $k = 500$ N/m cuelga verticalmente y de su extremo inferior cuelga una bandeja de 0,5 kg. Se deja caer sobre la bandeja una masa deformable de 1 kg desde una altura de 0,5 m. Suponiendo que el impacto de la masa sobre la bandeja es perfectamente inelástico y que el sistema queda en movimiento armónico simple vertical, calcula: a) la velocidad de la bandeja y la masa justo después del impacto; b) la amplitud del movimiento posterior; c) el periodo de ese movimiento.

Datos: $k=500$ N/m, $M = 0{,}5$ kg (bandeja), $m = 1$ kg, $h = 0{,}5$ m, $g = 9{,}8$ m/s².

**Solución.**

1. **Tres etapas, tres leyes.** (i) caída libre de $m$ → energía; (ii) choque instantáneo → cantidad de movimiento; (iii) oscilación posterior → energía con resorte y gravedad, o MAS. No se puede usar la energía a través del choque: en un choque totalmente inelástico se pierde energía cinética.
2. **Caída libre (T7).** Conservación de la energía mecánica con $U_{grav}$ (U ec. 7.4 p. 205): $mgh = \tfrac12 m v_0^2$ ⇒ $v_0 = \sqrt{2gh} = \sqrt{9{,}8} = 3{,}13$ m/s hacia abajo.
3. **Choque (a).** Durante el choque las fuerzas internas (masa–bandeja) son enormes; el resorte y el peso son finitos y su impulso en el instante del choque es despreciable ⇒ se conserva la componente vertical de la cantidad de movimiento (U p. 248). Choque totalmente inelástico (U ec. 8.16 p. 248): $m v_0 = (m+M)V$ ⇒ $V = \dfrac{1\cdot3{,}13}{1{,}5} = $ **2,09 m/s** hacia abajo.
   - (Se pierden $\tfrac12 m v_0^2 - \tfrac12(m+M)V^2 = 4{,}90 - 3{,}27 = 1{,}63$ J en deformar la masa.)
4. **Posiciones de equilibrio.** Antes del choque la bandeja sola está en equilibrio con el resorte estirado $y_0 = Mg/k = 0{,}0098$ m. El conjunto ($m+M$) tiene su equilibrio con estiramiento $y_e = (m+M)g/k = 0{,}0294$ m. Justo tras el choque el sistema está, pues, $x_0 = y_e - y_0 = mg/k = 0{,}0196$ m **por encima** de su nueva posición de equilibrio y bajando a 2,09 m/s. Por eso la amplitud no es simplemente la distancia bajada.
5. **Amplitud por energía (T7).** Sea $d$ lo que baja desde el impacto hasta el punto más bajo (allí $v=0$). Con $U_{grav}$ y $U_{el}=\tfrac12 k y^2$ (U ecs. 7.13–7.14 pp. 214–215):
   $$\tfrac12(m+M)V^2 + (m+M)g\,d = \tfrac12 k\big[(y_0+d)^2 - y_0^2\big].$$
   Numéricamente $3{,}267 + 14{,}7\,d = 250\,d^2 + 4{,}9\,d$ ⇒ $d = 0{,}1356$ m. El estiramiento máximo es $y_0 + d = 0{,}1454$ m y la amplitud es la distancia del punto más bajo al equilibrio: $A = 0{,}1454 - 0{,}0294 = $ **0,116 m**.
6. **Misma amplitud con MAS (T14).** En el MAS vertical la gravedad solo desplaza el equilibrio (U §14.4 p. 446); medido desde él, $\tfrac12 kA^2 = \tfrac12 k x_0^2 + \tfrac12(m+M)V^2$ ⇒ $A = \sqrt{x_0^2 + (V/\omega)^2}$, con $\omega = \sqrt{k/(m+M)} = 18{,}26$ rad/s: $A = \sqrt{0{,}0196^2 + 0{,}1143^2} = 0{,}116$ m. Coincide.
7. **Periodo (c).** $T = 2\pi\sqrt{(m+M)/k} = 2\pi\sqrt{1{,}5/500} = $ **0,344 s** (U ec. 14.12 p. 438). La masa que oscila es la del conjunto; el periodo no depende de $g$ ni de la amplitud.
8. **Comentario físico.** Se supone, como dice el enunciado, que la masa queda pegada a la bandeja. Si solo estuviera apoyada, en la parte alta la aceleración necesaria ($\omega^2 A \approx 39$ m/s²) supera $g$ y se separaría.

**Resultado:** a) $V = 2{,}09$ m/s (hacia abajo); b) $A = 0{,}116$ m; c) $T = 0{,}344$ s. (Con $g=9{,}81$: 2,09 m/s; 0,116 m; 0,344 s.)

**Receta.** «Cae–choca–oscila»: energía hasta el choque, cantidad de movimiento en el choque, energía (o MAS respecto al **nuevo** equilibrio) después. La amplitud se mide desde el equilibrio del conjunto, no desde donde ocurre el choque.

**Error típico.** (1) Usar conservación de energía a través del choque ($mgh = \tfrac12(m+M)V^2$). (2) Tomar como amplitud $V/\omega$ olvidando que el choque ocurre fuera del nuevo equilibrio (daría 0,114 m). (3) Usar solo $M$ o solo $m$ en el periodo.

Teoría: U §7.1 p. 205, §7.2 pp. 213–215; §8.3 p. 248; §14.2 p. 438; §14.4 p. 446.

---

### X4. Examen Febrero 2019 (2ª semana), P-1 — Cohete con empuje proporcional a la masa y gravedad variable

Fuente: `Examanes/E689010160-19F2.pdf`, pregunta 1 (3 puntos).

**Enunciado.** Sea un cohete que se lanza verticalmente al espacio. Se supone que en el ascenso vertical la aceleración de la gravedad va variando según la ley $g = g_0 - k_3 t$, siendo $g_0$ la aceleración de la gravedad en la superficie y $t$ el tiempo. Durante los 10 primeros segundos, la fuerza impulsora del cohete viene dada por $F_1 = k_1 M$, donde $M$ es la masa del cohete, variable al ir consumiendo el combustible. Tras esos 10 primeros segundos, la fuerza impulsora pasa a regirse por $F_2 = k_2 M$. Calcular la altura alcanzada tras 60 segundos de ascenso sabiendo que $g_0 = 10$ m/s², $k_1 = 20$ m/s², $k_2 = 15$ m/s², $k_3 = 0{,}1$ m/s³.

**Solución.**

1. **Qué es la «fuerza impulsora».** Es el empuje del cohete, $F = -v_{esc}\,dM/dt$ (U ec. 8.38 p. 259), que nos dan ya calculado como función de $M$. No hace falta conocer $v_{esc}$ ni $dM/dt$.
2. **Ecuación de movimiento.** El libro deduce $M\,dv/dt = F$ en el espacio y advierte que, lanzado desde un planeta, hay que añadir la gravedad (U p. 260). Con eje $+y$ hacia arriba: $M\dfrac{dv}{dt} = F - Mg$.
3. **La masa se cancela.** Como $F = kM$: $\dfrac{dv}{dt} = k - g(t)$. Por eso no importa que $M$ varíe ni cuánto valga: la aceleración solo depende del tiempo.
4. **Fase 1 ($0\le t\le10$ s).** $a_1 = k_1 - g_0 + k_3 t = 10 + 0{,}1\,t$ (m/s²). Parte del reposo en el suelo:
   $v(t) = 10t + 0{,}05\,t^2$, $\;y(t) = 5t^2 + t^3/60$.
   En $t = 10$ s: $v = 105$ m/s, $y = 500 + 16{,}67 = 516{,}7$ m.
5. **Fase 2 ($10\le t\le60$ s).** $a_2 = k_2 - g_0 + k_3 t = 5 + 0{,}1\,t$. Integrando desde las condiciones del final de la fase 1 (continuidad de $v$ e $y$: el empuje cambia, pero la posición y la velocidad no saltan):
   $v(t) = 105 + \int_{10}^{t}(5+0{,}1t')\,dt' = 50 + 5t + 0{,}05\,t^2$,
   $y(t) = 516{,}7 + \int_{10}^{t} v\,dt' = \dfrac{t^3}{60} + 2{,}5\,t^2 + 50\,t - 250$.
6. **Altura en $t = 60$ s.** $y(60) = 3600 + 9000 + 3000 - 250 = $ **15 350 m** (≈ 15,4 km). Velocidad entonces: $v(60) = 530$ m/s.
7. **Comprobación de coherencia.** $g(60) = 10 - 6 = 4$ m/s² > 0 durante todo el intervalo, y $a>0$ siempre: el cohete sube acelerando, sin cambiar de sentido; la fórmula vale en todo el tramo.

**Resultado:** $y(60\ \text{s}) = 15\,350$ m (con $v = 530$ m/s en ese instante).

**Receta.** Cohete con gravedad: $M\,dv/dt = F_{empuje} - Mg$; despeja $a(t)$, integra dos veces por tramos y empalma $v$ e $y$ en el cambio de régimen.

**Error típico.** (1) Olvidar el peso (daría $a=k$). (2) Tratar $g$ como constante. (3) Reiniciar $v$ o $y$ a cero en $t=10$ s, o integrar la fase 2 desde $t=0$ en vez de desde $t=10$. (4) Intentar usar $v - v_0 = v_{esc}\ln(m_0/m)$ (ec. 8.40), que no sirve aquí: no se da $v_{esc}$ y esa fórmula no incluye la gravedad.

Teoría: U §8.6 pp. 259–260 (ecs. 8.37–8.39 y la nota sobre la gravedad); integración de $a(t)$, U §2.6 p. 53.

---

## PARTE B — Respuestas modelo a las preguntas de teoría (X)

### T1. Examen Febrero 2018 (2ª semana), P-3, Opción 3.1 — «Centro de masa de un sistema de partículas. Su movimiento. Conservación del momento lineal.»

Fuente: `Examanes/E689010160-18F2.pdf`, pregunta 3.1 (4 puntos).

Guion de respuesta (ideas que deben aparecer, en este orden):

1. **Definición.** Para partículas de masas $m_i$ en posiciones $\vec r_i$: $\vec r_{cm} = \dfrac{\sum m_i\vec r_i}{\sum m_i}$ (U ecs. 8.28–8.29 p. 255): es la posición media ponderada con la masa. En cuerpos con simetría y densidad uniforme está en el centro geométrico; puede estar fuera del material (anillo).
2. **Velocidad del CM.** Derivando: $\vec v_{cm} = \dfrac{\sum m_i\vec v_i}{M}$ (U ec. 8.30 p. 256) ⇒ $\vec P = \sum m_i\vec v_i = M\vec v_{cm}$ (U ec. 8.32 p. 256): la cantidad de movimiento total es la de una partícula de masa $M$ que se moviera con el CM.
3. **Aceleración y ecuación de movimiento.** $M\vec a_{cm} = \sum m_i\vec a_i = \sum\vec F_{i}$. Las fuerzas internas aparecen por pares acción–reacción (tercera ley) y se anulan en la suma, de modo que $\sum\vec F_{ext} = M\vec a_{cm}$ (U ec. 8.34 p. 257): **el CM se mueve como una partícula de masa total sometida solo a las fuerzas externas.** Equivalente: $d\vec P/dt = \sum\vec F_{ext}$ (U ec. 8.36 p. 258).
4. **Ejemplo.** Un proyectil que estalla en el aire: los fragmentos se dispersan, pero el CM sigue la misma parábola que habría seguido el proyectil entero (las fuerzas de la explosión son internas).
5. **Conservación del momento lineal.** Si $\sum\vec F_{ext} = 0$ ⇒ $d\vec P/dt = 0$ ⇒ $\vec P$ constante y $\vec v_{cm}$ constante (U p. 243, ec. 8.13; p. 258). Las fuerzas internas cambian las cantidades de movimiento de cada parte, pero no la total (U p. 244). Es una ley vectorial: puede conservarse una componente (p. ej. la horizontal) aunque otra no.
6. **Aplicaciones típicas.** Retroceso de un rifle (U Ej. 8.4 p. 245), choques (U §8.3), persona que camina en una barca: si parte del reposo y no hay fuerza horizontal externa, $x_{cm}$ no cambia (U Ej. 8.14 p. 256; Problema 8.92, abajo).

---

### T2. Examen Febrero 2019 (2ª semana), P-3, Opción 3.2 — «Choques elásticos.»

Fuente: `Examanes/E689010160-19F2.pdf`, pregunta 3.2 (4 puntos).

Guion de respuesta:

1. **Choque y por qué se conserva $\vec P$.** En un choque las fuerzas de interacción son internas, grandes y breves; las externas, si existen, tienen impulso despreciable en ese intervalo ⇒ $\vec P$ antes = $\vec P$ después (U p. 248).
2. **Clasificación.** Elástico: las fuerzas de interacción son conservativas y la energía cinética total final es igual a la inicial; inelástico: $K_f < K_i$; totalmente inelástico: quedan unidos (U §8.3 p. 247).
3. **Caso 1D con B en reposo.** Ecuaciones: $m_A v_{A1} = m_A v_{A2} + m_B v_{B2}$ y $\tfrac12 m_A v_{A1}^2 = \tfrac12 m_A v_{A2}^2 + \tfrac12 m_B v_{B2}^2$. Agrupando términos de A y dividiendo la ecuación de energía entre la de cantidad de movimiento ($a^2-b^2=(a+b)(a-b)$): $v_{A1}+v_{A2} = v_{B2}$. Resolviendo (U ecs. 8.24–8.25 p. 252):
   $$v_{A2} = \frac{m_A-m_B}{m_A+m_B}\,v_{A1},\qquad v_{B2} = \frac{2m_A}{m_A+m_B}\,v_{A1}.$$
4. **Casos límite.** $m_A = m_B$: A se para y B sale con $v_{A1}$ (intercambio de velocidades, péndulo de Newton). $m_A \ll m_B$: A rebota con casi $-v_{A1}$ y B apenas se mueve (pelota contra pared). $m_A \gg m_B$: A sigue casi igual y B sale a casi $2v_{A1}$ (U p. 252).
5. **Velocidad relativa (caso general 1D).** $v_{B2}-v_{A2} = -(v_{B1}-v_{A1})$ (U ec. 8.27 p. 252): en un choque elástico la velocidad relativa invierte su sentido y conserva su módulo. Junto con la cantidad de movimiento da un sistema **lineal**, más cómodo que la ecuación de energía (U Ej. 8.10 p. 253). Las fórmulas del paso 3 solo valen si B está inicialmente en reposo.
6. **Choques elásticos en 2D.** Dos ecuaciones de componentes + la de energía (U Ej. 8.12 p. 254). Resultado notable (deducción propia): si las masas son iguales y B está en reposo, de $\vec v_{A1} = \vec v_{A2} + \vec v_{B2}$ y $v_{A1}^2 = v_{A2}^2 + v_{B2}^2$ se sigue $\vec v_{A2}\cdot\vec v_{B2} = 0$: salen formando 90°.
7. **Ejemplo de aplicación.** Moderadores de reactores: el neutrón pierde más energía chocando con núcleos ligeros (U Ej. 8.11 p. 253).

---

### T3. Examen Febrero 2022 (2ª semana), P-3, Opción 3.1 — «Conservación del momento lineal o de la cantidad de movimiento» y cuestiones

Fuente: `Examanes/E689010160-22F2.pdf`, pregunta 3.1 con cuestiones 3.1a y 3.1b (4 puntos).

**Desarrollo del tema (guion).** $\vec p = m\vec v$ (U p. 238); $\sum\vec F = d\vec p/dt$ (ec. 8.4); sistema de dos o más partículas: las fuerzas internas forman pares acción–reacción que se anulan, $d\vec P/dt = \sum\vec F_{ext}$ (ecs. 8.12–8.13 p. 243); si $\sum\vec F_{ext} = 0$, $\vec P$ es constante; se conserva **cada componente** (p. 244); válido aunque haya fuerzas internas no conservativas (choques inelásticos, explosiones); relación con el CM: $\vec P = M\vec v_{cm}$ (p. 256). Ejemplos: retroceso de un rifle (Ej. 8.4 p. 245), choques (§8.3), cohetes (§8.6).

**Cuestión 3.1a.** *Un juguete accionado por un resorte está en reposo sobre una superficie horizontal sin fricción. Al soltarse el resorte, el juguete se divide en tres piezas de masas iguales A, B y C, que se deslizan por la superficie. A se aleja en la dirección $-x$ y B en la dirección $-y$. a) ¿Signos de las componentes de la velocidad de C? b) ¿Cuál de las tres piezas se mueve más rápido?*

1. Fuerzas externas: peso y normal (verticales, se anulan) y no hay fricción ⇒ la cantidad de movimiento horizontal se conserva; era cero (reposo).
2. Con masas iguales $m$: $m\vec v_A + m\vec v_B + m\vec v_C = 0$ ⇒ $\vec v_C = -(\vec v_A + \vec v_B)$.
3. $\vec v_A = (-v_A, 0)$, $\vec v_B = (0, -v_B)$ ⇒ $\vec v_C = (+v_A, +v_B)$: **las dos componentes de C son positivas** (C sale hacia el primer cuadrante).
4. $|\vec v_C| = \sqrt{v_A^2 + v_B^2}$, mayor que $v_A$ y que $v_B$ ⇒ **C es la más rápida**.

**Cuestión 3.1b.** *Se dispara una ametralladora contra una placa de acero. ¿La fuerza media sobre la placa es mayor si las balas rebotan o si se aplastan y quedan adheridas? Explique.*

1. Teorema impulso–cantidad de movimiento: la fuerza media sobre cada bala es $\vec F_{med} = \Delta\vec p/\Delta t$ (U ecs. 8.6 y 8.8 p. 239); la placa recibe la opuesta (tercera ley).
2. Si se aplasta y queda adherida: $|\Delta p| = mv$ (de $mv$ a 0). Si rebota con rapidez $v'$: $|\Delta p| = mv + mv'$ (de $+mv$ a $-mv'$), hasta $2mv$ en un rebote elástico. Es lo mismo que en el Ej. 8.2 de U (pelota contra pared, p. 241).
3. Con igual frecuencia de disparo, el impulso por unidad de tiempo, que es la fuerza media, es **mayor si las balas rebotan** (hasta el doble).

---

### T4. Examen Septiembre 2023 (Nacional-UE Original), P-3 Teoría Opción A, cuestión (b) — Patinador

Fuente: `Examanes/FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf`, págs. 15–16 del PDF (escaneo). El tema principal de esa opción es «Momento angular. Momento angular de un cuerpo rígido» (Tema 10); la cuestión (b) es de Tema 8.

**Enunciado.** Sabemos que el momento angular de un patinador se conserva al dar vueltas en el aire. ¿Se conserva su momento lineal? Explique su respuesta.

**Respuesta modelo.**

1. El momento lineal (cantidad de movimiento) se conserva solo si la fuerza externa neta es nula: $d\vec P/dt = \sum\vec F_{ext}$ (U ec. 8.36 p. 258).
2. En el aire actúa sobre el patinador su peso $M\vec g$ (despreciando el aire). Luego $d\vec P/dt = M\vec g \neq 0$: **el momento lineal no se conserva**. Su componente vertical cambia (sube frenando y baja acelerando: el CM describe una parábola, U ec. 8.34 p. 257); la componente **horizontal sí se conserva**, porque no hay fuerza horizontal.
3. ¿Por qué sí se conserva el momento angular? El peso actúa en el centro de masa, así que su momento (torca) respecto al CM es nulo; sin torca externa neta, el momento angular respecto al CM es constante (U §10.6 p. 320). Son dos leyes distintas con condiciones distintas: fuerza externa nula para $\vec P$, torca externa nula para $\vec L$.

---

## PARTE C — Problemas del solucionario (E), traducidos y ampliados, de más fácil a más difícil

### E1. Problema 8.48 — Choque elástico frontal de dos canicas

Fuente: U p. 266, Problema 8.48 (fig. E8.48); desarrollo en Solucionario 8-17.

**Enunciado (traducido/adaptado).** Una canica de 10,0 g se desliza hacia la izquierda a 0,400 m/s sobre una acera horizontal helada (sin fricción) y tiene un choque elástico de frente con una canica de 30,0 g que se desliza hacia la derecha a 0,200 m/s. a) Determine la velocidad (módulo y sentido) de cada canica después del choque. b) Calcule el cambio de cantidad de movimiento de cada canica y compárelos. c) Calcule el cambio de energía cinética de cada canica y compárelos.

**Solución.**

1. **Ejes y datos.** $+x$ hacia la derecha. A = 10,0 g, $v_{A1} = -0{,}400$ m/s; B = 30,0 g, $v_{B1} = +0{,}200$ m/s. Choque frontal ⇒ todo en una recta.
2. **Ecuaciones.** Cantidad de movimiento (no hay fuerzas horizontales externas): $0{,}010(-0{,}400) + 0{,}030(0{,}200) = 0{,}010\,v_{A2} + 0{,}030\,v_{B2}$ ⇒ $v_{A2} + 3v_{B2} = 0{,}200$ m/s.
   Elástico, y B **no** está en reposo ⇒ no valen las ecs. 8.24–8.25; se usa la velocidad relativa (U ec. 8.27 p. 252): $v_{B2} - v_{A2} = -(0{,}200 - (-0{,}400)) = -0{,}600$ m/s.
3. **Resolver** (sistema lineal): sumando, $4v_{B2} = -0{,}400$ ⇒ $v_{B2} = -0{,}100$ m/s; $v_{A2} = +0{,}500$ m/s.
   ⇒ la canica de 10,0 g sale **hacia la derecha a 0,500 m/s**; la de 30,0 g **hacia la izquierda a 0,100 m/s**.
4. **(b)** $\Delta p_A = 0{,}010(0{,}500 - (-0{,}400)) = +9{,}0\times10^{-3}$ kg·m/s; $\Delta p_B = 0{,}030(-0{,}100 - 0{,}200) = -9{,}0\times10^{-3}$ kg·m/s. Iguales y opuestos: lo que gana una lo pierde la otra (conservación de $P$; tercera ley).
5. **(c)** $\Delta K_A = \tfrac12(0{,}010)(0{,}500^2 - 0{,}400^2) = +4{,}5\times10^{-4}$ J; $\Delta K_B = \tfrac12(0{,}030)(0{,}100^2 - 0{,}200^2) = -4{,}5\times10^{-4}$ J. Iguales y opuestos porque el choque es elástico ($K$ total constante).

**Resultado:** 10,0 g → +0,500 m/s; 30,0 g → −0,100 m/s; $\Delta p = \pm9{,}0\times10^{-3}$ kg·m/s; $\Delta K = \pm4{,}5\times10^{-4}$ J.

**Receta.** Choque elástico 1D con ambos móviles: cantidad de movimiento + velocidad relativa invertida ⇒ sistema lineal de 2×2.

**Error típico.** Aplicar las fórmulas de «B en reposo» (8.24–8.25) cuando B se mueve, o perder los signos de las velocidades iniciales.

Teoría: U §8.4 p. 252 (ec. 8.27), Ej. 8.10 p. 253.

---

### E2. Problema 8.44 — Piedra que golpea un bloque unido a un resorte

Fuente: U p. 266, Problema 8.44 «Combinación de las leyes de conservación» (fig. E8.44); Solucionario 8-15.

**Enunciado.** Un bloque de 15,0 kg está sujeto a un resorte horizontal muy ligero de constante 500,0 N/m y reposa sobre una mesa horizontal sin fricción. De repente lo golpea una piedra de 3,00 kg que viaja horizontalmente a 8,00 m/s hacia la derecha y que rebota horizontalmente a 2,00 m/s hacia la izquierda. Calcule la compresión máxima del resorte después del choque.

**Solución.**

1. **Dos etapas.** Choque (instantáneo) → cantidad de movimiento; después, el bloque comprime el resorte → energía mecánica (solo trabaja la fuerza elástica, conservativa).
2. **Choque.** El resorte aún no está comprimido durante el choque, así que no hay fuerza horizontal externa apreciable ⇒ se conserva $P_x$ ($+x$ a la derecha):
   $(3{,}00)(8{,}00) = (3{,}00)(-2{,}00) + (15{,}0)\,v_b$ ⇒ $v_b = 30{,}0/15{,}0 = 2{,}00$ m/s.
3. **Compresión.** Desde justo después del choque hasta la compresión máxima ($v=0$): $\tfrac12 m_b v_b^2 = \tfrac12 k x^2$ (U ec. 7.13–7.14 p. 214) ⇒ $x = v_b\sqrt{m_b/k} = 2{,}00\sqrt{15{,}0/500{,}0} = $ **0,346 m**.
4. **Comprobación.** $K$ antes del choque 96 J; después 6 J (piedra) + 30 J (bloque) = 36 J: el choque es inelástico, por eso no se podía usar la energía en el choque.

**Resultado:** $v_b = 2{,}00$ m/s; compresión máxima 0,346 m.

**Receta.** «Choque + resorte»: $P$ en el choque, energía después. Nunca energía a través del choque.

**Error típico.** Poner +2,00 m/s a la piedra que rebota (daría $v_b = 1{,}20$ m/s) o usar $\tfrac12(3)(8)^2 = \tfrac12kx^2$.

Teoría: U §8.2 pp. 243–244; §7.2 p. 214.

---

### E3. Problema 8.79 — Bala que se incrusta en un bloque con resorte

Fuente: U p. 269, Problema 8.79 (fig. P8.79); Solucionario 8-29.

**Enunciado.** Una bala de rifle de 8,00 g golpea y se incrusta en un bloque de 0,992 kg que descansa sobre una superficie horizontal sin fricción, sujeto a un resorte. El impacto comprime el resorte 15,0 cm. La calibración del resorte indica que se requiere una fuerza de 0,750 N para comprimirlo 0,250 cm. a) Calcule la magnitud de la velocidad del bloque inmediatamente después del impacto. b) ¿Qué rapidez tenía inicialmente la bala?

**Solución.**

1. **Constante del resorte (ley de Hooke).** $k = F/x = 0{,}750/0{,}00250 = 300$ N/m.
2. **Se razona hacia atrás.** Conocemos el final (compresión), así que primero energía (después del choque) y luego cantidad de movimiento (choque).
3. **(a) Tras el choque.** Masa total $M = 0{,}992 + 0{,}008 = 1{,}000$ kg. Solo trabaja el resorte: $\tfrac12 M V^2 = \tfrac12 k x^2$ ⇒ $V = x\sqrt{k/M} = 0{,}150\sqrt{300} = $ **2,60 m/s**.
4. **(b) Choque totalmente inelástico.** $m v_1 = M V$ ⇒ $v_1 = (1{,}000/0{,}00800)(2{,}598) = $ **325 m/s**.
5. **Balance.** $K$ de la bala: 422 J; energía almacenada en el resorte: 3,38 J. Más del 99 % se disipa en el choque (calor, deformación): por eso no se puede igualar $\tfrac12 m v_1^2$ a $\tfrac12 k x^2$.

**Resultado:** $V = 2{,}60$ m/s; $v_1 = 325$ m/s.

**Receta.** Péndulo/resorte balístico: del dato final se obtiene $V$ por energía; de $V$, la velocidad del proyectil por cantidad de movimiento.

**Error típico.** Igualar la energía de la bala a la del resorte (daría ≈ 29 m/s) o no pasar 0,250 cm y 15,0 cm a metros.

Teoría: U §8.3 p. 248 (ec. 8.16) y Ej. 8.8 p. 249; §7.2 p. 214.

---

### E4. Problema 8.41 — Choque de dos vehículos en un cruce (2D, quedan unidos)

Fuente: U p. 266, Problema 8.41 (fig. E8.41); Solucionario 8-13.

**Enunciado.** En un cruce, un automóvil subcompacto de 950 kg que viaja al este choca con una camioneta pickup de 1900 kg que viaja al norte y no respetó el semáforo. Los vehículos quedan unidos después del choque y se deslizan a 16,0 m/s en dirección 24,0° al este del norte. Calcule la rapidez de cada vehículo antes del choque. Las fuerzas de fricción con el pavimento (mojado) son despreciables.

**Solución.**

1. **Ejes.** $+x$ = este, $+y$ = norte. Antes: coche A solo con $v_{Ax}$; camioneta B solo con $v_{By}$. Después: conjunto de 2850 kg con 16,0 m/s a 24,0° del norte hacia el este.
2. **Componentes finales** (el ángulo se mide desde el norte, por eso el seno va con $x$): $V_x = 16{,}0\sin24{,}0° = 6{,}51$ m/s; $V_y = 16{,}0\cos24{,}0° = 14{,}62$ m/s.
3. **Conservación en $x$** (solo el coche tenía cantidad de movimiento este–oeste): $950\,v_A = 2850\,V_x$ ⇒ $v_A = $ **19,5 m/s**.
4. **Conservación en $y$:** $1900\,v_B = 2850\,V_y$ ⇒ $v_B = $ **21,9 m/s**.

**Resultado:** coche 19,5 m/s (este); camioneta 21,9 m/s (norte).

**Receta.** Choque totalmente inelástico en 2D: una ecuación por eje; cada cuerpo solo aporta en el eje por el que se movía.

**Error típico.** Tomar el ángulo desde el eje $x$ (intercambiar seno y coseno) o sumar las magnitudes de las cantidades de movimiento.

Teoría: U §8.2 p. 244 (componentes), §8.3 p. 248 (ec. 8.16), Ej. 8.9 p. 250.

---

### E5. Problema 8.61 — Unidad de maniobras de un astronauta (empuje de un cohete)

Fuente: U p. 267, Problema 8.61; Solucionario 8-21/8-22.

**Enunciado.** Un astronauta de 70 kg flota en el espacio con una unidad de maniobras tripulada (MMU) de 110 kg y experimenta una aceleración de 0,029 m/s² al disparar uno de sus impulsores. a) Si la rapidez del gas N₂ que escapa, relativa al astronauta, es de 490 m/s, ¿cuánto gas se gasta en 5,0 s? b) ¿Qué empuje tiene el impulsor?

**Solución.**

1. **Masa que se acelera.** Astronauta + MMU: $m = 180$ kg. En 5 s la masa apenas cambia (lo comprobamos al final), así que tomamos $m$ y $dm/dt$ constantes.
2. **(a) Ritmo de gasto.** De $a = -\dfrac{v_{esc}}{m}\dfrac{dm}{dt}$ (U ec. 8.39 p. 259): $\dfrac{dm}{dt} = -\dfrac{m a}{v_{esc}} = -\dfrac{180\cdot0{,}029}{490} = -0{,}0107$ kg/s (negativo: la masa disminuye).
   Gas expulsado en 5,0 s: $0{,}0107\cdot5{,}0 = $ **0,053 kg** (53 g; despreciable frente a 180 kg, lo que justifica el paso 1).
3. **(b) Empuje.** $F = -v_{esc}\,dm/dt$ (U ec. 8.38 p. 259) $= 490\cdot0{,}01065 = $ **5,22 N**. Equivalente y más directo: el empuje es la fuerza neta, $F = m a = 180\cdot0{,}029 = 5{,}22$ N.

**Resultado:** a) 0,053 kg de N₂; b) $F = 5{,}22$ N.

**Receta.** $F = m a = -v_{esc}\,dm/dt$: conocidas dos de las tres magnitudes ($a$, $v_{esc}$, $dm/dt$) se obtiene la tercera.

**Error típico.** Usar solo la masa del astronauta (70 kg) o solo la de la MMU, o redondear $dm/dt$ antes de calcular $F$ (conviene $F = ma$ directamente).

Teoría: U §8.6 p. 259 (ecs. 8.38–8.39), Ej. 8.15 p. 260.

---

### E6. Problema 8.92 — Mujer que camina en una canoa

Fuente: U p. 270, Problema 8.92 (fig. P8.92); Solucionario 8-34.

**Enunciado.** Una mujer de 45,0 kg está de pie en una canoa de 60,0 kg y 5,00 m de longitud. Camina desde un punto a 1,00 m de un extremo hasta un punto a 1,00 m del otro extremo (es decir, 3,00 m respecto a la canoa). Si se ignora la resistencia del agua, ¿qué distancia se mueve la canoa?

**Solución.**

1. **Ley.** Sin fuerza horizontal externa, $P_x$ se conserva; como todo parte del reposo, $v_{cm} = 0$ y **la posición horizontal del CM no cambia** (U ec. 8.32 p. 256; Ej. 8.14 p. 256).
2. **Coordenadas (respecto al agua).** Origen en el extremo izquierdo inicial de la canoa. Inicio: mujer en $x=1{,}00$ m; CM de la canoa (uniforme) en su centro, $x = 2{,}50$ m.
   Final: si el extremo izquierdo de la canoa pasa a $x_c$, la mujer está en $x_c + 4{,}00$ m y el centro de la canoa en $x_c + 2{,}50$ m.
3. **CM inicial = CM final** (basta igualar los numeradores, porque la masa total es la misma):
   $45{,}0(1{,}00) + 60{,}0(2{,}50) = 45{,}0(x_c+4{,}00) + 60{,}0(x_c+2{,}50)$ ⇒ $105\,x_c = -135$ ⇒ $x_c = -1{,}29$ m.
4. **Interpretación.** La canoa se desplaza **1,29 m en sentido contrario** al de la marcha de la mujer; ella avanza respecto al agua $3{,}00 - 1{,}29 = 1{,}71$ m. Comprobación: $45{,}0\cdot1{,}71 = 60{,}0\cdot1{,}29 = 77{,}1$ kg·m.

**Resultado:** la canoa se mueve 1,29 m (hacia atrás respecto a la mujer).

**Receta.** Sistema aislado que parte del reposo: $\sum m_i\,\Delta x_i = 0$ con desplazamientos medidos respecto al suelo (o al agua), no respecto al objeto móvil.

**Error típico.** Usar los 3,00 m como desplazamiento de la mujer respecto al agua (darían 2,25 m para la canoa).

Teoría: U §8.5 pp. 255–256.

---

### E7. Problema 8.95 — Obús en reposo que explota (complemento breve)

Fuente: U p. 270, Problema 8.95; Solucionario 8-35.

**Enunciado.** Un obús en reposo de 7,0 kg explota y se divide en dos fragmentos, uno de 2,0 kg y otro de 5,0 kg. Si el fragmento más pesado gana 100 J de energía cinética en la explosión, ¿cuánta energía cinética gana el más ligero?

**Solución.**

1. Parte del reposo ⇒ $\vec P = 0$ después: los fragmentos tienen cantidades de movimiento de **igual módulo** $p$ y sentidos opuestos (U §8.2).
2. Escribiendo $K = p^2/(2m)$ con el mismo $p$: $\dfrac{K_{2\,\text{kg}}}{K_{5\,\text{kg}}} = \dfrac{5{,}0}{2{,}0} = 2{,}5$.
3. El pesado (5,0 kg) gana 100 J ⇒ el ligero (2,0 kg) gana $2{,}5\cdot100 = $ **250 J**.

**Receta.** En una explosión desde el reposo, la energía se reparte en proporción **inversa** a las masas.

**Error típico.** Asignar los 100 J al fragmento de 2,0 kg (el enunciado se los da al más pesado) o suponer que ambos tienen igual energía.

---

### E8. Problema 8.97 — Cohete de fuegos artificiales (1,40 kg / 0,28 kg)

Fuente: U p. 270, Problema 8.97; Solucionario 8-35/8-36.

Es exactamente el problema de examen **X2 (Febrero 2020, 1ª semana, P-2)**: ver su resolución completa arriba. Resultados: $v_{1,40} = 14{,}3$ m/s, $v_{0,28} = 71{,}5$ m/s (horizontales y opuestas), caída en 4,04 s, separación entre puntos de impacto 347 m.

---

### E9. Problema 8.98 — Obús que estalla en el punto más alto

Fuente: U p. 270, Problema 8.98; Solucionario 8-36.

**Enunciado.** Un obús de 12,0 kg se dispara con un ángulo de 55,0° sobre la horizontal con rapidez inicial de 150 m/s. En el punto más alto de la trayectoria estalla en dos fragmentos, uno con tres veces más masa que el otro. Los dos fragmentos llegan al suelo al mismo tiempo. Despreciando la resistencia del aire: si el fragmento más pesado cae en el punto desde el que se lanzó el obús, ¿dónde cae el más ligero y cuánta energía se libera en la explosión?

**Solución.**

1. **Masas.** $m_A + m_B = 12{,}0$ y $m_A = 3m_B$ ⇒ $m_A = 9{,}00$ kg (pesado), $m_B = 3{,}00$ kg (ligero).
2. **Estado en el punto más alto** (proyectil, U §3.3): $v_y = 0$, $v_x = 150\cos55{,}0° = 86{,}0$ m/s. Tiempo de subida $t_s = 150\sin55{,}0°/9{,}8 = 12{,}54$ s; distancia horizontal recorrida hasta ahí: $v_x t_s = R/2 = 1079$ m, con $R = v_0^2\sin(2\cdot55°)/g = 2157$ m (alcance sin explosión).
3. **Velocidades tras la explosión: horizontales.** Como en X2: llegan a la vez desde la misma altura ⇒ ninguno puede salir con componente vertical (el otro la tendría opuesta). Ambos tardan en caer lo mismo que tardó el obús en subir, $t_s = 12{,}54$ s.
4. **Fragmento pesado.** Debe volver al punto de lanzamiento, 1079 m hacia atrás, en 12,54 s ⇒ $v_{Ax} = -86{,}0$ m/s (la velocidad del obús, invertida).
5. **Conservación de $P_x$ en la explosión** (fuerzas internas; impulso del peso despreciable): $12{,}0(86{,}0) = 9{,}00(-86{,}0) + 3{,}00\,v_{Bx}$ ⇒ $v_{Bx} = 7\cdot86{,}0 = 602$ m/s.
6. **Punto de caída del ligero.** Desde la explosión avanza $602\cdot12{,}54 = 7551$ m; desde el lanzamiento: $1079 + 7551 = $ **8,63 km**.
   Comprobación con el CM (U ec. 8.34 p. 257): el CM sigue la parábola original y cae en $R = 2157$ m: $12{,}0\cdot2157 = 9{,}00\cdot0 + 3{,}00\,x_B$ ⇒ $x_B = 4R = 8630$ m. Coincide.
7. **Energía liberada** = aumento de energía cinética en la explosión:
   $\Delta K = \tfrac12(9{,}00)(86{,}0)^2 + \tfrac12(3{,}00)(602)^2 - \tfrac12(12{,}0)(86{,}0)^2 = $ **5,33 × 10⁵ J**.

**Resultado:** el ligero cae a 8,63 km del punto de lanzamiento; energía liberada $5{,}33\times10^5$ J.

**Receta.** Explosión en el vértice de una parábola: velocidades horizontales, conservación de $P_x$ y, para el punto de caída, el atajo del CM: $\sum m_i x_i = M\,R$.

**Error típico.** Dar la distancia desde el punto de explosión (7,55 km) en lugar de desde el lanzamiento, o suponer que el pesado queda en reposo (caería en vertical, a 1079 m).

Teoría: U §3.3 pp. 76–77; §8.2 p. 244; §8.5 p. 257 (ec. 8.34).

---

## Resumen de resultados

| Ejercicio | Resultado |
|---|---|
| X Feb 2018 2ª P-1 | $\vec v_{O_2} = (150\,\hat\imath - 75\,\hat\jmath)$ m/s = 168 m/s a 26,6° bajo $+x$; pérdida 19/32 ≈ 59 % |
| X Feb 2020 1ª P-2 (= U 8.97) | 14,3 m/s y 71,5 m/s opuestas; $t = 4{,}04$ s; separación 347 m |
| X Feb 2022 1ª P-1 | $V = 2{,}09$ m/s; $A = 0{,}116$ m; $T = 0{,}344$ s |
| X Feb 2019 2ª P-1 | $y(60\ \text{s}) = 15\,350$ m ($v = 530$ m/s) |
| E 8.48 | 10 g: +0,500 m/s; 30 g: −0,100 m/s; $\Delta p=\pm9{,}0\times10^{-3}$ kg·m/s; $\Delta K=\pm4{,}5\times10^{-4}$ J |
| E 8.44 | $v_b = 2{,}00$ m/s; $x_{máx} = 0{,}346$ m |
| E 8.79 | $V = 2{,}60$ m/s; $v_{bala} = 325$ m/s |
| E 8.41 | coche 19,5 m/s; camioneta 21,9 m/s |
| E 8.61 | 0,053 kg de gas; $F = 5{,}22$ N |
| E 8.92 | la canoa se mueve 1,29 m |
| E 8.95 | 250 J el ligero |
| E 8.98 | ligero a 8,63 km del lanzamiento; $5{,}33\times10^5$ J |
