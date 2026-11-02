# Soluciones Tema 17 — Temperatura y calor

Material para el redactor del tema 17. Todos los números se han comprobado con sympy (script propio, un bloque por ejercicio; resultados en la tabla final). Los enunciados se han tomado de U (`sears.txt`, págs. impresas 573–582, PDF 601–610) y las soluciones de `solman.txt` (la página 17-N del solucionario está en la página de texto 561+N). En casi todas las páginas del capítulo 17 del solucionario las etiquetas «17.N.» del texto extraído aparecen apiladas o corridas respecto al bloque de solución; **cada problema se ha asignado por contenido**, comparándolo con el enunciado de U, y abajo se cita la página donde está realmente su desarrollo. Los problemas E están traducidos y ampliados, no copiados. «U p. NN» = página impresa del Sears-Zemansky.

Convenciones y datos (los de U): agua $c_w=4190$ J/(kg·K); hielo $c_i=2100$ J/(kg·K); aluminio 910, cobre 390, hierro 470, plomo 130, plata 234 J/(kg·K) (tabla 17.3, p. 559); agua $L_f=3{,}34\times10^5$ J/kg, $L_v=2{,}256\times10^6$ J/kg (p. 560, tabla 17.4 p. 561); hidrógeno $L_f=58{,}6\times10^3$ J/kg; plomo: fusión a 327,3 °C, $L_f=24{,}5\times10^3$ J/kg (tabla 17.4). Conductividades (tabla 17.5, p. 565): aluminio 205, latón 109, cobre 385, acero 50,2, vidrio 0,8, hielo 1,6, poliestireno 0,027, aire 0,024 W/(m·K). Coeficientes (tablas 17.1–17.2, p. 552): $\alpha$ acero $1{,}2\times10^{-5}$, aluminio $2{,}4\times10^{-5}$, latón $2{,}0\times10^{-5}$ K⁻¹; $\beta$ mercurio $18\times10^{-5}$ K⁻¹. $\sigma=5{,}67\times10^{-8}$ W/(m²·K⁴) (p. 569). Un intervalo de 1 K = 1 C° (p. 549), así que en $\Delta T$, $\alpha$, $c$ y $k$ se puede usar °C; **en la radiación ($T^4$) siempre kelvin**.

## Herramientas de teoría que se usan

| Herramienta | Dónde |
|---|---|
| Equilibrio térmico; **ley cero**: dos sistemas están en equilibrio térmico si y solo si tienen la misma temperatura | U §17.1 pp. 546–547 |
| Escalas: $T_F=\tfrac95T_C+32°$ (17.1), $T_C=\tfrac59(T_F-32°)$ (17.2), $T_K=T_C+273{,}15$ (17.3); valor frente a intervalo (10 C° = 18 F°) | U §17.2 pp. 547–549 |
| Termómetro de gas a $V$ constante: $T_2/T_1=p_2/p_1$ (17.4); $T=T_{triple}\,p/p_{triple}$, $T_{triple}=273{,}16$ K (17.5); cero absoluto | U §17.3 pp. 549–550 |
| Expansión lineal $\Delta L=\alpha L_0\Delta T$ (17.6), $L=L_0(1+\alpha\Delta T)$ (17.7); **un orificio se dilata como el material** | U §17.4 pp. 551–552 |
| Expansión de volumen $\Delta V=\beta V_0\Delta T$ (17.8); sólidos $\beta=3\alpha$ (17.9); Estrategia 17.1 | U §17.4 pp. 552–553 |
| **Esfuerzo térmico** $F/A=-Y\alpha\Delta T$ (17.12) (barra que no puede cambiar de longitud) | U §17.4 pp. 554–555; ejemplo 17.4 pp. 555–556 |
| Calor = energía transferida solo por diferencia de temperatura; 1 cal = 4,186 J; 1 Btu = 1055 J | U §17.5 p. 556 |
| **$Q=mc\,\Delta T$** (17.13), con el signo de $\Delta T=T_f-T_i$ | U §17.5 p. 557 |
| Potencia $P=Q/t$ (1 W = 1 J/s); energía mecánica convertida en calor | U §6.4 pp. 189–190; §7.3 |
| **Cambio de fase $Q=\pm mL$** (17.20) (+ si entra calor, − si sale); durante el cambio de fase $T$ no cambia (fig. 17.20) | U §17.6 pp. 560–561 |
| **Calorimetría**: en un sistema aislado $\sum Q=0$; Estrategia 17.2 (suponer el estado final y comprobarlo) | U §17.6 p. 563; ejemplos 17.7–17.9 pp. 563–564 |
| **Conducción** $H=kA\dfrac{T_H-T_C}{L}$ (17.21); forma local $H=-kA\,dT/dx$ (17.22) | U §17.7 pp. 565–566 |
| **Resistencia térmica** $H=A(T_H-T_C)/R$ (17.23), $R=L/k$ (17.24); en serie las $R$ se suman, en paralelo se suman las $H$ (Estrategia 17.3) | U §17.7 pp. 566–567; ejemplos 17.11–17.13 pp. 567–568 |
| **Convección** (natural y forzada; $\propto$ área, $\approx\propto\Delta T^{5/4}$) | U §17.7 p. 568 |
| **Radiación** $H=Ae\sigma T^4$ (17.25); neta $H_{net}=Ae\sigma(T^4-T_s^4)$ (17.26); cuerpo negro, buen absorbedor = buen emisor | U §17.7 pp. 569–570; ejemplos 17.14–17.15 |

---

## PARTE A — Exámenes (X)

**Qué ha caído del tema 17.** En las convocatorias disponibles solo ha caído **teoría**, siempre el mismo tema: «Mecanismos de transferencia de calor» (`examenes_por_tema.md`, Tema 17):

- **Examen Febrero 2022 (2ª semana) P-3, Teoría Opción 3.2** — «Mecanismos de transferencia de calor» + cuestiones sobre humedad/calor percibido y bloques de metal/madera a igual temperatura. **El PDF es un escaneo sin capa de texto**: no hay enunciado completo en `fuentes_txt/examenes/`; solo consta el resumen del índice. **No se resuelve.**
- **Examen Febrero 2024 (2ª semana) P-4, Teoría Opción B** — «Mecanismos de transferencia de calor» + cuestiones sobre tuberías congeladas/termómetro de mercurio y papel de aluminio en el horno. **Escaneo sin texto**: tampoco se resuelve (solo el resumen del índice).
- **Examen Febrero 2025 (2ª semana) P-4, Teoría Opción B** — resuelto abajo (enunciado completo en `fuentes_txt/examenes/E689010160-25F2.txt`, página 2 del PDF; también en los dos recopilatorios).

Observación útil para el redactor: las cuestiones de estos exámenes son **Preguntas para análisis del propio U** (p. 573–574): la del clavo en la patata es P17.24, la de la calefacción constante es P17.28; las del índice de 2022 y 2024 coinciden en tema con P17.19 (metal y madera), P17.12 (humedad), P17.4 (tuberías congeladas y termómetro de mercurio) y P17.13 (papel de aluminio). Se pueden citar como «tipo examen» en el HTML, pero **solo la de 2025 está transcrita**.

No hay ningún **problema** de examen del tema 17 (todos los problemas X catalogados son de mecánica). Los problemas de la Parte B son del libro, no de examen.

### X1. Examen Febrero 2025 (2ª semana) P-4 — Teoría Opción B (4 puntos)

**Enunciado (literal, `E689010160-25F2.txt`, p. 2).** Desarrolle el tema: Mecanismos de transferencia de calor. Además, responda a las siguientes cuestiones:
(a) Para hornear una patata en menos tiempo ésta se atraviesa con un clavo grande. ¿Por qué? ¿Sería mejor usar un clavo de aluminio o uno de acero? ¿Por qué?
(b) Cuando hay escasez de energía, algunos medios recomiendan mantener las casas a temperatura constante día y noche para ahorrar combustible. El argumento es que, al apagar la calefacción de noche, las paredes, los techos y otras áreas se enfrían y deberán volver a calentarse a la mañana siguiente. Así, al mantener la temperatura constante, esas partes de la casa no se enfriarán y no tendrán que volver a calentarse. ¿Tiene sentido este argumento? ¿Realmente se ahorrará energía siguiendo ese consejo?

#### Desarrollo modelo del tema (una cara y media; en negrita lo que no puede faltar)

1. **Qué es el calor** (U p. 556). **Calor es la energía que se transfiere exclusivamente por una diferencia de temperatura**; fluye espontáneamente del cuerpo más caliente al más frío hasta que se alcanza el equilibrio térmico (misma temperatura, ley cero, U p. 547). Un cuerpo *no contiene* calor (U p. 557, «Cuidado»): tiene temperatura y energía interna; el calor es energía *en tránsito*. La rapidez de transferencia es la **corriente de calor** $H=dQ/dt$, en watts (U p. 565). **Hay tres mecanismos: conducción, convección y radiación** (U p. 565).

2. **Conducción** (U pp. 565–567).
   - *Idea*: dentro de un cuerpo, o entre dos cuerpos en contacto, los átomos de la zona caliente (más energía cinética media) empujan a sus vecinos y les pasan energía; **la materia no se desplaza, la energía sí**. En los metales, además, los **electrones libres** llevan la energía muy deprisa: por eso los metales son buenos conductores del calor (y de la electricidad).
   - *Ley* (experimental) para una varilla o placa de sección $A$, longitud $L$ y extremos a $T_H>T_C$, con los costados aislados, en estado estable:
   $$\boxed{H=\frac{dQ}{dt}=kA\,\frac{T_H-T_C}{L}}\qquad(17.21)$$
   $H$ es proporcional al área y a la diferencia de temperatura, e inversamente proporcional al espesor (fig. 17.24). $(T_H-T_C)/L$ es el **gradiente de temperatura**; $k$ = **conductividad térmica** [W/(m·K)] (tabla 17.5: cobre 385, aluminio 205, acero 50,2, vidrio 0,8, madera 0,12–0,04, poliestireno 0,027, aire 0,024). Forma local: $H=-kA\,dT/dx$ (17.22); **el signo − dice que el calor va hacia temperaturas decrecientes**.
   - *Resistencia térmica*: $H=A(T_H-T_C)/R$ con $R=L/k$ (17.23)–(17.24). **Capas en serie: las $R$ se suman** (la misma $H$ atraviesa todas); **caminos en paralelo: las $H$ se suman** (Estrategia 17.3).
   - *Aplicación*: los buenos aislantes (lana, poliestireno, fibra de vidrio, plumas) son sobre todo **aire inmóvil** atrapado, de $k$ muy baja (U p. 566). Ejemplo 17.11 (U p. 567): hielera de poliestireno de 0,80 m² y 2,0 cm, $\Delta T=30$ K ⇒ $H=0{,}027\cdot0{,}80\cdot30/0{,}020=32{,}4$ W.
   - *Sensación de frío*: un metal a 20 °C se siente más frío que la madera a 20 °C porque, con su $k$ grande, saca calor de la mano mucho más deprisa (U p. 565 y Evalúe 17.7, respuesta p. 583). El tacto mide $H$, no $T$.

3. **Convección** (U p. 568).
   - *Idea*: transferencia de calor **por movimiento de una masa de fluido** de una región a otra; el fluido caliente lleva su energía consigo.
   - **Natural (libre)**: el movimiento lo causan las diferencias de densidad debidas a la dilatación (el aire caliente, menos denso, sube). **Forzada**: el fluido lo mueve un ventilador o una bomba (calefacción por aire, refrigeración del motor, sangre bombeada por el corazón, que es el mecanismo principal de transporte de calor dentro del cuerpo).
   - *No hay una ecuación sencilla*; hechos experimentales: (i) $H$ es **proporcional al área** (por eso radiadores y aletas tienen mucha superficie); (ii) cerca de una pared se forma una **película de fluido casi inmóvil** que aísla; la convección forzada la adelgaza (efecto del viento frío, «factor de congelación»); (iii) $H$ es aproximadamente **proporcional a $(\Delta T)^{5/4}$**.
   - Escala grande: la convección atmosférica y oceánica gobierna el clima; corrientes térmicas que aprovechan los planeadores.

4. **Radiación** (U pp. 569–570).
   - *Idea*: transferencia de energía por **ondas electromagnéticas** (infrarrojo, visible, ultravioleta). **No necesita medio material**: funciona en el vacío (así nos llega el calor del Sol). Todo cuerpo emite; a 20 °C casi todo en infrarrojo; a 800 °C ya se ve «al rojo»; a ~3000 °C «al blanco».
   - **Ley de Stefan-Boltzmann**:
   $$\boxed{H=Ae\sigma T^4}\qquad(17.25),\qquad \sigma=5{,}67\times10^{-8}\ \text{W/(m}^2\text{·K}^4),$$
   con $T$ **absoluta (kelvin)** y $e$ la **emisividad** (0 a 1; mayor en superficies oscuras y mates).
   - El cuerpo también **absorbe** la radiación del entorno a $T_s$; la **corriente neta** es
   $$\boxed{H_{net}=Ae\sigma\,(T^4-T_s^4)}\qquad(17.26)$$
   ($H_{net}>0$: el cuerpo pierde calor). Ejemplo 17.15 (U p. 570): cuerpo humano, 1,20 m², 303 K, entorno 293 K ⇒ emite 574 W pero pierde solo **72 W netos**.
   - **Buen absorbedor = buen emisor**; $e=1$ es el **cuerpo negro**; un reflector ideal es mal emisor. Por eso el **termo (vaso Dewar)**: doble pared de vidrio con vacío (elimina conducción y convección) y plateado (reduce la radiación).
   - Aplicaciones: incubadoras, **efecto invernadero** (el CO₂ absorbe y reemite hacia abajo parte del infrarrojo terrestre; eleva la temperatura media unos 33 °C, U pp. 570–571).

5. **Cuadro resumen** (para la cuartilla):

| Mecanismo | ¿Qué transporta la energía? | ¿Necesita medio? | Ley | Depende de |
|---|---|---|---|---|
| Conducción | choques entre partículas y electrones libres | sí (sólido o fluido en reposo) | $H=kA\Delta T/L$ | $k$, $A$, $\Delta T$, $1/L$ |
| Convección | el propio fluido en movimiento | sí (fluido) | empírica, $\propto A\,\Delta T^{5/4}$ | área, movimiento del fluido |
| Radiación | ondas electromagnéticas | **no** | $H=Ae\sigma T^4$, neta $Ae\sigma(T^4-T_s^4)$ | $T^4$ (K), $e$, $A$ |

6. **Cierre**: en la práctica actúan a la vez (una olla: radiación y conducción desde el fuego, conducción por el fondo, convección en el agua). En **estado estable**, si el calor pasa en serie por varios mecanismos o capas, **la corriente $H$ es la misma en todos** (problema práctico de U p. 573: radiación hacia un extremo de una varilla = conducción por la varilla).

**Figuras obligatorias:** (a) varilla con $T_H$, $T_C$, $A$, $L$ y la flecha de $H$; (b) esquema de celda de convección (fluido que sube caliente y baja frío); (c) cuerpo que emite $Ae\sigma T^4$ y absorbe $Ae\sigma T_s^4$.

#### Cuestión (a): el clavo en la patata

1. **Por qué tarda la patata.** Dentro del horno, el aire y las paredes calientan la **superficie** de la patata (convección y radiación); hacia el **centro** el calor solo llega por **conducción** a través de la propia patata, que es casi toda agua y almidón, de conductividad muy baja (orden de 0,6 W/(m·K), como el agua). Con (17.21), $H=kA\Delta T/L$: $k$ pequeña ⇒ el interior tarda mucho.
2. **Qué hace el clavo.** El clavo es metálico, con $k$ cientos de veces mayor; su cabeza y la parte que sobresale están a la temperatura del horno y **conducen calor directamente al centro** de la patata, que así se calienta desde dentro y desde fuera a la vez. Es un «atajo» de baja resistencia térmica ($R=L/k$ pequeña).
3. **¿Aluminio o acero?** Mejor **aluminio**: $k_{Al}=205$ W/(m·K) frente a $k_{acero}=50{,}2$ W/(m·K) (tabla 17.5). Con la misma geometría y la misma diferencia de temperatura, la corriente de calor es proporcional a $k$: el clavo de aluminio conduce unas **4,1 veces más** calor ($205/50{,}2=4{,}08$). *Orden de magnitud (estimación propia)*: clavo de 4 mm de diámetro, 5 cm de recorrido y 100 K de diferencia ⇒ $H_{Al}\approx5{,}2$ W, $H_{acero}\approx1{,}3$ W.
4. **Comentario.** Es la misma idea que la pared de cobre que «se siente más fría» (Evalúe 17.7): lo que importa es la conductividad, no la temperatura del metal.

#### Cuestión (b): ¿mantener la casa a temperatura constante ahorra combustible?

1. **Qué se gasta.** La calefacción solo tiene que reponer **el calor que se escapa al exterior** por paredes, techos y ventanas (sobre todo por conducción a través de ellas). Si al cabo de 24 h la casa vuelve al mismo estado (misma temperatura de paredes y aire), la energía que guardan las paredes es la misma al principio y al final: **el combustible gastado en un día = calor total perdido hacia fuera en ese día**.
2. **De qué depende la pérdida.** Por (17.23), $H=A\,(T_{int}-T_{ext})/R$: la pérdida es proporcional a la **diferencia de temperatura entre dentro y fuera**.
3. **Con la calefacción apagada de noche** la casa se enfría, $T_{int}-T_{ext}$ es menor y **se pierde menos calor** durante esas horas. Es cierto que por la mañana hay que recalentar paredes y techos, pero esa energía es exactamente la que esas partes cedieron por la noche, y esa energía cedida **ya está contada** en la pérdida (más pequeña) de la noche. En total se pierde menos ⇒ **se gasta menos combustible**.
4. **Conclusión: el argumento no tiene sentido; bajar la calefacción de noche ahorra energía.** Mantener la temperatura constante es lo que *más* gasta, porque mantiene la máxima diferencia con el exterior todo el tiempo.
5. *Ejemplo numérico (propio, modelo simplificado)*: casa con $A/R=200$ W/K y exterior a 0 °C. A 20 °C constante: $200\cdot20\cdot24=96$ kWh/día. Si durante 8 h la temperatura media interior baja a 12 °C: $200\,(20\cdot16+12\cdot8)=83{,}2$ kWh ⇒ ahorro del 13 %.

**Receta (X1).** Pregunta de teoría de transferencia de calor: «definición de calor y de $H$ → tres mecanismos, cada uno con *idea microscópica + ley + parámetros + ejemplo* → cuadro comparativo → estado estable (misma $H$ en serie)». Las cuestiones se contestan con una ley: el clavo con $H\propto k$; la casa con $H\propto(T_{int}-T_{ext})$ y el balance de energía de un día.
**Error típico.** (1) Decir que el cuerpo «tiene» calor. (2) Usar °C en Stefan-Boltzmann. (3) Decir que la radiación necesita aire. (4) En (b), olvidar que lo que se paga es lo que se pierde hacia fuera, y que la pérdida depende de $T_{int}-T_{ext}$. (5) En (a), justificar el aluminio por «calentarse antes» en lugar de por su mayor $k$.
Teoría: U §17.5 p. 556; §17.7 pp. 565–571; Preguntas P17.24 y P17.28 p. 574.

---

## PARTE B — Problemas del solucionario (E) y problema práctico de U

Orden de dificultad creciente, que coincide con el del temario: escalas (§17.2–17.3) → dilatación y esfuerzo térmico (§17.4) → $Q=mc\Delta T$ (§17.5) → cambios de fase y calorimetría (§17.6), terminando con los casos en que hay que **comprobar el estado final** → conducción en una, dos y tres barras (§17.7) → radiación → problema práctico de U (radiación + conducción + fusión).

### E1. Problema 17.4 (U p. 574; Solucionario 17-1) — ¿dónde coinciden las escalas?

**Enunciado (de U).** a) Calcule la única temperatura a la que los termómetros Fahrenheit y Celsius coinciden. b) Calcule la única temperatura a la que los termómetros Fahrenheit y Kelvin coinciden.

**Solución.**
1. **Idea.** «Coinciden» significa que marcan **el mismo número** $T$. Se impone $T_F=T_C=T$ en la relación entre escalas y se despeja.
2. **a)** Con (17.1): $T=\tfrac95T+32°\Rightarrow -\tfrac45T=32°\Rightarrow T=$ **−40°**: $-40$ °C $=-40$ °F.
3. **b)** Se pasa de °F a K encadenando (17.2) y (17.3): $T_K=\tfrac59(T_F-32°)+273{,}15$. Con $T_K=T_F=T$: $T=\tfrac59(T-32)+273{,}15\Rightarrow\tfrac49T=273{,}15-17{,}78=255{,}37\Rightarrow T=$ **574,6 ≈ 575**: 575 °F = 575 K.
4. **Celsius y Kelvin no coinciden nunca**: difieren siempre en 273,15 (mismo tamaño de grado, distinto cero).
5. **Calentamiento previo (Problema 17.1, misma página 17-1).** $T_F=\tfrac95T_C+32$: $-62{,}8$ °C → **−81,0 °F**; 56,7 °C → **134,1 °F**; 31,1 °C → **88,0 °F**.

**Receta.** Para convertir valores: primero la fórmula (con el +32 o el +273,15); para intervalos, solo el factor 9/5 (1 C° = 1 K = 1,8 F°).
**Error típico.** Aplicar el +32 a un **intervalo** de temperatura (un cambio de 10 C° son 18 F°, no 50 F°).
**Figura sugerida.** Tres termómetros verticales en paralelo (°F, °C, K) con marcas en −40, 0, 32, 100, 212 y 575 y líneas horizontales que unen los puntos equivalentes.
Teoría: U §17.2 pp. 548–549 (17.1)–(17.3).

---

### E2. Problema 17.9 (U p. 574; Solucionario 17-2) — el cero absoluto con un termómetro de gas

**Enunciado (de U).** Termómetro de gas de volumen constante. Usando un termómetro de gas, un experimentador determinó que la presión en el punto triple del agua (0,01 °C) era $4{,}80\times10^4$ Pa; y en el punto de ebullición normal del agua (100 °C) era $6{,}50\times10^4$ Pa. a) Suponiendo que la presión varía linealmente con la temperatura, use estos datos para calcular la temperatura Celsius en la que la presión del gas sería cero (es decir, obtenga la temperatura Celsius del cero absoluto). b) ¿El gas de este termómetro obedece con precisión la ecuación (17.4)? Si es así y la presión a 100 °C fuera $6{,}50\times10^4$ Pa, ¿qué presión habría medido el experimentador a 0,01 °C?

**Solución.**
1. **Idea** (U p. 549, fig. 17.5–17.6). A volumen constante, la presión de un gas crece linealmente con la temperatura; extrapolando la recta hasta $p=0$ se obtiene el cero absoluto.
2. **a) Pendiente.** $\gamma=\dfrac{\Delta p}{\Delta T}=\dfrac{6{,}50\times10^4-4{,}80\times10^4}{100-0{,}01}=170{,}0$ Pa/C°.
3. **Recta y corte.** $p=p_1+\gamma(T-T_1)$; con $p=0$: $T=T_1-\dfrac{p_1}{\gamma}=0{,}01-\dfrac{4{,}80\times10^4}{170{,}0}=$ **−282 °C**.
4. **b)** La ecuación (17.4), $p_2/p_1=T_2/T_1$, exige **temperaturas en kelvin**: $p_{triple}=6{,}50\times10^4\cdot\dfrac{273{,}16}{373{,}15}=$ **4,76 × 10⁴ Pa**. El valor medido (4,80 × 10⁴ Pa) es distinto: **este gas no obedece exactamente (17.4)**; por eso su extrapolación da −282 °C y no −273,15 °C. La ecuación (17.4) solo es exacta para gases de muy baja densidad (U p. 574, nota del enunciado).

**Receta.** Termómetro de gas: recta $p(T)$ por dos puntos → corte con $p=0$; los cocientes $p_2/p_1=T_2/T_1$ solo con kelvin.
**Error típico.** Hacer el cociente con °C ($6{,}50\times10^4\cdot0{,}01/100$: absurdo).
**Figura sugerida.** Gráfica $p$–$T$ (°C) con los dos puntos medidos, la recta extrapolada a trazos hasta cortar el eje en −282 °C y la marca −273,15 °C.
Teoría: U §17.3 pp. 549–550 (17.4), (17.5).

---

### E3. Problema 17.14 (U p. 575; Solucionario 17-3) — ajuste estrecho de un remache

**Enunciado (de U).** Ajuste estrecho. Los remaches de aluminio para construcción de aviones se fabrican un poco más grandes que sus orificios y se enfrían con «hielo seco» (CO₂ sólido) antes de insertarse. Si el diámetro de un orificio es de 4,500 mm, ¿qué diámetro debe tener un remache a 23,0 °C para que su diámetro sea igual al del orificio cuando se enfría a −78,0 °C, la temperatura del hielo seco? Suponga que el coeficiente de expansión es constante, con el valor dado en la tabla 17.1.

**Solución.**
1. **Idea.** El diámetro es una longitud: se dilata según (17.7), $L=L_0(1+\alpha\Delta T)$, con $\alpha_{Al}=2{,}4\times10^{-5}$ K⁻¹ (tabla 17.1).
2. **Elegir el estado de referencia.** Se conoce el diámetro a −78,0 °C (debe ser 4,500 mm); se busca a 23,0 °C. Tomando $L_0=4{,}500$ mm a −78,0 °C, $\Delta T=23{,}0-(-78{,}0)=101$ C°.
3. **Cálculo.** $d=4{,}500\,[1+(2{,}4\times10^{-5})(101)]=$ **4,511 mm**.
4. **Lectura.** Al volver a temperatura ambiente el remache intenta crecer 0,011 mm dentro del orificio: queda muy apretado (eso se busca).

**Receta.** Cualquier dimensión lineal (longitud, diámetro, lado) cumple $L=L_0(1+\alpha\Delta T)$; elige como $L_0$ el valor conocido y $\Delta T=T_{buscada}-T_{conocida}$.
**Error típico.** Equivocar el signo de $\Delta T$ (dar un remache más pequeño que el orificio).
**Figura sugerida.** Remache frío (4,500 mm) entrando en el orificio y remache a 23 °C (4,511 mm, dilatación exagerada, «no a escala»).
Teoría: U §17.4 p. 551 (17.6)–(17.7); tabla 17.1 p. 552.

---

### E4. Problema 17.17 (U p. 575; Solucionario 17-3 y 17-4) — el mercurio que se derrama

**Enunciado (de U).** Un matraz de vidrio con volumen de 1000,00 cm³ a 0,0 °C se llena al tope con mercurio a esa temperatura. Cuando el frasco y el mercurio se calientan a 55,0 °C, se derraman 8,95 cm³ de mercurio. Si el coeficiente de expansión volumétrica del mercurio es de $18{,}0\times10^{-5}$ K⁻¹, calcule el coeficiente de expansión volumétrica del vidrio.

**Solución.**
1. **Idea.** Se dilatan **los dos**: el mercurio y el hueco del matraz (un hueco se dilata como si fuera del mismo material, U p. 552). Lo que se derrama es la **diferencia** de dilataciones: $\Delta V_{Hg}-\Delta V_{vidrio}=8{,}95$ cm³.
2. **Mercurio** (17.8): $\Delta V_{Hg}=\beta_{Hg}V_0\Delta T=(18{,}0\times10^{-5})(1000{,}00)(55{,}0)=9{,}90$ cm³.
3. **Vidrio:** $\Delta V_{vidrio}=9{,}90-8{,}95=0{,}95$ cm³.
4. **Coeficiente:** $\beta_{vidrio}=\dfrac{\Delta V_{vidrio}}{V_0\Delta T}=\dfrac{0{,}95}{(1000{,}00)(55{,}0)}=$ **1,7 × 10⁻⁵ K⁻¹**, dentro del intervalo de la tabla 17.2 (1,2–2,7 × 10⁻⁵).
5. **Comprobación.** $\beta_{Hg}\gg\beta_{vidrio}$: por eso se derrama (mismo mecanismo que el ejemplo 17.3).

**Receta.** Recipiente lleno que se calienta: derrame = $(\beta_{líq}-\beta_{recip})V_0\Delta T$.
**Error típico.** Suponer que el recipiente no se dilata (daría el derrame igual a 9,90 cm³) o que su capacidad *disminuye*.
**Figura sugerida.** Matraz lleno a 0 °C y a 55 °C con el nivel por encima del borde y las dos dilataciones (9,90 y 0,95 cm³) señaladas.
Teoría: U §17.4 pp. 552–554 (17.8); ejemplo 17.3 p. 554.

---

### E5. Problema 17.21 (U p. 575; Solucionario 17-4) — juntas de dilatación en los rieles

**Enunciado (de U).** Los rieles de acero para un tren se tienden en segmentos de 12,0 m de longitud, colocados extremo con extremo en un día de invierno en que la temperatura es de −9,0 °C. a) ¿Cuánto espacio debe dejarse entre rieles adyacentes para que apenas se toquen en verano, cuando la temperatura suba a 33,0 °C? b) Si los rieles se tienden en contacto, ¿a qué esfuerzo se someterán un día de verano en el que la temperatura sea de 33,0 °C?

**Solución.**
1. **a) Dilatación libre.** $\Delta T=33{,}0-(-9{,}0)=42{,}0$ C°; $\Delta L=\alpha L_0\Delta T=(1{,}2\times10^{-5})(12{,}0)(42{,}0)=6{,}0\times10^{-3}$ m $=$ **6,0 mm**. Ese es el hueco que hay que dejar (fig. 17.11 de U).
2. **b) Dilatación impedida.** Si no hay hueco, el riel no puede alargarse: las paredes (los rieles vecinos) lo **comprimen** lo justo para anular la dilatación. La idea (U p. 555): la deformación por fuerza, $\Delta L/L_0=F/(AY)$ (cap. 11), debe cancelar la térmica, $\alpha\Delta T$:
$$\frac FA=-Y\alpha\Delta T\quad(17.12)\;=-(2{,}0\times10^{11})(1{,}2\times10^{-5})(42{,}0)=\mathbf{-1{,}0\times10^{8}\ Pa}.$$
El signo − indica **compresión**.
3. **Evaluación.** Una deformación térmica de solo 0,05 % produce un esfuerzo de 100 MPa, del orden del límite elástico de un acero común: el riel se pandearía. Cambios pequeños de longitud, esfuerzos enormes.

**Receta.** Si la pieza puede dilatarse: $\Delta L=\alpha L_0\Delta T$. Si no puede: $F/A=-Y\alpha\Delta T$ ($Y$ de la tabla 11.1).
**Error típico.** Calcular la fuerza con $\Delta L$ en vez del esfuerzo, o olvidar que el esfuerzo no depende de la longitud del riel.
**Figura sugerida.** Dos tramos de riel con el hueco de 6,0 mm en invierno y cerrado en verano; al lado, riel entre topes con flechas de compresión.
Teoría: U §17.4 p. 551 (17.6), pp. 554–555 (17.12); ejemplo 17.4 pp. 555–556.

---

### E6. Problema 17.23 (U p. 575; Solucionario 17-5) — la tetera y el agua

**Enunciado (de U).** Una tetera de aluminio de 1,10 kg que contiene 1,80 kg de agua se coloca sobre la estufa. Si no se transfiere calor al entorno, ¿cuánto calor debe agregarse para elevar la temperatura de 20,0 a 85,0 °C?

**Solución.**
1. **Idea.** Se calientan **dos cuerpos** (tetera y agua) con el mismo $\Delta T=65{,}0$ C°; cada uno absorbe $Q=mc\Delta T$ (17.13) y el total es la suma.
2. **Tetera:** $Q_{Al}=(1{,}10)(910)(65{,}0)=6{,}51\times10^4$ J.
3. **Agua:** $Q_w=(1{,}80)(4190)(65{,}0)=4{,}90\times10^5$ J.
4. **Total:** $Q=$ **5,55 × 10⁵ J**.
5. **Evaluación.** El agua se lleva el 88 % aunque su masa no sea mucho mayor: su calor específico es 4,6 veces el del aluminio.

**Receta.** Varios cuerpos que pasan de la misma $T_i$ a la misma $T_f$: $Q=(\sum m_ic_i)\Delta T$.
**Error típico.** Olvidar el recipiente.
**Figura sugerida.** Diagrama de barras de $Q_{Al}$ y $Q_w$ (65,1 kJ y 490 kJ).
Teoría: U §17.5 p. 557 (17.13); tabla 17.3 p. 559.

---

### E7. Problema 17.24 (U p. 575; Solucionario 17-5) — el café de la noche de estudio

**Enunciado (de U).** Tratando de mantenerse despierto para estudiar toda la noche, un estudiante prepara una taza de café colocando una resistencia eléctrica de inmersión de 200 W en 0,320 kg de agua. a) ¿Cuánto calor debe agregarse al agua para elevar su temperatura de 20,0 a 80,0 °C? b) ¿Cuánto tiempo se requiere? Suponga que toda la potencia se invierte en calentar el agua.

**Solución.**
1. **a)** $Q=mc\Delta T=(0{,}320)(4190)(60{,}0)=$ **8,04 × 10⁴ J**.
2. **b)** Potencia = energía/tiempo, $P=Q/t$, y 200 W = 200 J/s ⇒ $t=Q/P=8{,}04\times10^4/200=$ **402 s ≈ 6,7 min**.
3. **Evaluación.** Es lo que tarda un hervidor pequeño: razonable.

**Receta.** Calentador de potencia $P$: $t=mc\Delta T/P$ (o con $mL$ si hay cambio de fase).
**Error típico.** Confundir W con J, o usar $\Delta T$ en kelvin absolutos (353 K) en vez del intervalo.
**Figura sugerida.** No imprescindible; como mucho, recta $T(t)$ de 20 a 80 °C en 402 s.
Teoría: U §17.5 p. 557 (17.13); potencia, U §6.4.

---

### E8. Problema 17.31 (U p. 576; Solucionario 17-6) — el clavo martilleado

**Enunciado (de U).** PA. Un clavo que se clava en una tabla sufre un aumento de temperatura. Si suponemos que el 60 % de la energía cinética de un martillo de 1,80 kg que se mueve a 7,80 m/s se transforma en calor, que fluye hacia el clavo y no sale de él, ¿cuánto aumentará la temperatura de un clavo de aluminio de 8,00 g que es golpeado diez veces?

**Solución.**
1. **Idea.** La energía mecánica que «desaparece» en el golpe se convierte en energía interna; aquí se pide tratarla como un calor $Q$ que entra en el clavo (conservación de la energía, cap. 7).
2. **Energía de un golpe:** $K=\tfrac12mv^2=\tfrac12(1{,}80)(7{,}80)^2=54{,}8$ J.
3. **Al clavo, en 10 golpes:** $Q=10\cdot0{,}60\cdot54{,}8=329$ J.
4. **Subida de temperatura:** $\Delta T=\dfrac{Q}{mc}=\dfrac{329}{(8{,}00\times10^{-3})(910)}=$ **45,1 C°**.
5. **Evaluación.** Un clavo recién clavado quema al tacto: coherente.

**Receta.** Energía mecánica → calor: $Q=$ (fracción)·$\Delta E_{mec}$ y después $Q=mc\Delta T$; la masa en kg.
**Error típico.** Poner la masa del clavo en gramos (sale 1000 veces menos) o usar la masa del martillo en $mc\Delta T$.
**Figura sugerida.** Martillo con $v=7{,}80$ m/s sobre el clavo y diagrama de flujo «$K$ (54,8 J) → 60 % al clavo → ×10 → 329 J → ΔT = 45,1 C°».
Teoría: U §17.5 p. 557 (17.13); §6.2 (energía cinética).

---

### E9. Problema 17.35 (U p. 576; Solucionario 17-7) — calor específico de un metal desconocido

**Enunciado (de U).** Un trozo de 500,0 g de un metal desconocido, que ha estado en agua en ebullición durante varios minutos, se deja caer rápidamente en un vaso de espuma de poliestireno, que contiene 1,00 kg de agua a temperatura ambiente (20,0 °C). Después de esperar y agitar suavemente durante 5,00 minutos, se observa que la temperatura del agua ha alcanzado un valor constante de 22,0 °C. a) Suponiendo que el vaso absorbe una cantidad despreciable de calor y que no se pierde calor al entorno, ¿qué calor específico tiene el metal? b) ¿Qué es más útil para almacenar energía térmica: este metal o un peso igual de agua? Explique su respuesta. c) Suponga que el calor absorbido por el vaso no es despreciable. ¿Qué tipo de error tendría el calor específico calculado en el inciso a)? ¿Sería demasiado grande, demasiado pequeño o correcto? Explique su respuesta.

**Solución.**
1. **Idea (calorimetría, Estrategia 17.2, U p. 563).** Sistema aislado: la energía no sale, solo se reparte ⇒ $\sum Q=0$, con cada $Q=mc\,(T_f-T_i)$ con **su signo**. Haber estado en agua hirviendo ⇒ el metal empieza a 100 °C.
2. **Planteamiento:** $Q_w+Q_m=0$: $(1{,}00)(4190)(22{,}0-20{,}0)+(0{,}500)\,c_m\,(22{,}0-100)=0$.
3. **Despeje:** $c_m=\dfrac{(1{,}00)(4190)(2{,}0)}{(0{,}500)(78{,}0)}=$ **215 J/(kg·K)**.
4. **b)** Para almacenar energía térmica es mejor **el agua**: por kilogramo y por grado guarda $4190/215\approx19$ veces más.
5. **c)** Si el vaso también absorbe calor, el metal cedió **más** calor del que se atribuye al agua; el $c_m$ verdadero es **mayor** y el calculado resulta **demasiado pequeño**.

**Receta.** Calorimetría sin cambios de fase: $\sum m_ic_i(T_f-T_{i})=0$ y despejar la incógnita.
**Error típico.** Poner los $\Delta T$ todos positivos y escribir «calor ganado = calor perdido» con un signo mal: si se usan $\Delta T$ con signo, la suma es cero; si se usan valores absolutos, se igualan.
**Figura sugerida.** Eje de temperaturas con el metal bajando de 100 a 22 °C y el agua subiendo de 20 a 22 °C (flechas de longitud 78 y 2).
Teoría: U §17.5 p. 557; §17.6 p. 563 (Estrategia 17.2); ejemplo 17.7 p. 563.

---

### E10. Problema 17.45 (U p. 576; Solucionario 17-9 y 17-10) — de hielo a −10 °C a vapor a 100 °C

**Enunciado (de U).** ¿Cuánto calor se requiere para transformar 18,0 g de hielo a −10,0 °C en vapor a 100,0 °C? Exprese su respuesta en joules, calorías y Btu.

**Solución.**
1. **Idea (fig. 17.20, U p. 561).** El proceso tiene **cuatro tramos**: mientras cambia la temperatura, $Q=mc\Delta T$ (con el $c$ de la fase en que está); en cada cambio de fase la temperatura no varía y $Q=+mL$ (entra calor).
2. **Hielo −10 → 0 °C:** $Q_1=(0{,}0180)(2100)(10{,}0)=378$ J.
3. **Fusión a 0 °C:** $Q_2=(0{,}0180)(3{,}34\times10^5)=6012$ J.
4. **Agua 0 → 100 °C:** $Q_3=(0{,}0180)(4190)(100)=7542$ J.
5. **Vaporización a 100 °C:** $Q_4=(0{,}0180)(2{,}256\times10^6)=40\,608$ J.
6. **Total:** $Q=$ **5,45 × 10⁴ J** $=5{,}45\times10^4/4{,}186=$ **1,30 × 10⁴ cal** $=5{,}45\times10^4/1055=$ **51,7 Btu**.
7. **Evaluación.** ¡La vaporización sola es el 74 % del total! Los cambios de fase dominan.

**Receta.** Dibuja la «escalera» $T$–$Q$ (tramos inclinados $mc\Delta T$, tramos horizontales $mL$) y suma tramo a tramo con el $c$ de cada fase.
**Error típico.** Usar $c$ del agua para el hielo, olvidar un cambio de fase o hacer un único $mc\Delta T$ de −10 a 100 °C.
**Figura sugerida.** Gráfica $T$ frente a $Q$ acumulado con los cuatro tramos y sus valores (0,378; 6,39; 13,9; 54,5 kJ).
Teoría: U §17.6 pp. 560–561 (17.20), fig. 17.20; tabla 17.4.

---

### E11. Problema 17.46 (U p. 576; Solucionario 17-10) — curva de calentamiento a potencia constante

**Enunciado (de U).** Un recipiente abierto con masa despreciable contiene 0,550 kg de hielo a −15,0 °C. Se suministra calor al recipiente a una tasa constante de 800,0 J/min durante 500,0 min. a) ¿Después de cuántos minutos comienza a fundirse el hielo? b) ¿Cuántos minutos después de iniciado el calentamiento, la temperatura comienza a elevarse por encima de 0,0 °C? c) Dibuje la curva obtenida en una gráfica de la temperatura en función del tiempo transcurrido.

**Solución.**
1. **Idea.** Con potencia constante, el tiempo es proporcional al calor: $t=Q/P$. La gráfica $T(t)$ tiene la misma forma que la fig. 17.20.
2. **a)** Calentar el hielo hasta 0 °C: $Q_1=(0{,}550)(2100)(15{,}0)=1{,}73\times10^4$ J ⇒ $t_1=1{,}73\times10^4/800=$ **21,7 min**.
3. **b)** Fundirlo todo: $Q_2=(0{,}550)(3{,}34\times10^5)=1{,}84\times10^5$ J ⇒ $229{,}6$ min más. La temperatura empieza a subir de 0 °C a los $21{,}7+229{,}6=$ **251 min**.
4. **c) Resto del intervalo.** Quedan $500-251{,}3=248{,}7$ min, es decir, $1{,}99\times10^5$ J para el agua: $\Delta T=1{,}99\times10^5/[(0{,}550)(4190)]=86{,}3$ C° ⇒ a los 500 min el agua está a **86,3 °C** (no llega a hervir). La gráfica: recta de −15 a 0 °C en 21,7 min; meseta en 0 °C hasta 251 min; recta de 0 a 86,3 °C hasta 500 min.
5. **Pendientes.** En sólido $dT/dt=P/(mc_i)=0{,}69$ C°/min; en líquido $P/(mc_w)=0{,}35$ C°/min: la recta del agua es la mitad de empinada porque $c_w\approx2c_i$.

**Receta.** Potencia constante: cada tramo dura $Q_{tramo}/P$; la pendiente de cada recta es $P/(mc)$ y las mesetas duran $mL/P$.
**Error típico.** Dibujar la misma pendiente para hielo y agua, o no hacer la meseta.
**Figura sugerida (obligatoria, la pide el enunciado).** $T$ (°C) frente a $t$ (min): puntos (0; −15), (21,7; 0), (251; 0), (500; 86,3).
Teoría: U §17.6 pp. 560–561 (17.20), fig. 17.20.

---

### E12. Problema 17.38 (U p. 576; Solucionario 17-8) — calorímetro con hielo y plomo caliente

**Enunciado (de U).** Un calorímetro de cobre tipo lata con masa de 0,100 kg contiene 0,160 kg de agua y 0,0180 kg de hielo en equilibrio térmico a presión atmosférica. Si 0,750 kg de plomo a 255 °C se introducen al calorímetro, ¿cuál es la temperatura final? Suponga que no hay pérdida de calor a los alrededores.

**Solución.**
1. **Estado inicial.** Agua y hielo en equilibrio a 1 atm ⇒ todo (lata, agua, hielo) está a **0 °C**.
2. **Hipótesis (Estrategia 17.2).** Suponemos que **todo el hielo se funde** y que la temperatura final $T$ está entre 0 y 100 °C; al final se comprueba.
3. **Calor de cada parte** (con $T$ en °C):
   - lata: $Q_c=(0{,}100)(390)T=39{,}0\,T$;
   - agua: $Q_w=(0{,}160)(4190)T=670{,}4\,T$;
   - hielo: se funde y el agua resultante sube a $T$: $Q_i=(0{,}0180)(3{,}34\times10^5)+(0{,}0180)(4190)T=6012+75{,}4\,T$;
   - plomo: $Q_{Pb}=(0{,}750)(130)(T-255)=97{,}5\,T-24\,863$.
4. **$\sum Q=0$:** $882{,}3\,T=24\,863-6012=18\,851$ ⇒ $T=$ **21,4 °C**.
5. **Comprobación.** $T>0$ °C: la hipótesis era correcta (todo el hielo se funde).

**Receta.** Con hielo de por medio: supón el estado final más sencillo, escribe cada $Q$ en función de $T$, resuelve y **comprueba** que $T$ es compatible con la hipótesis.
**Error típico.** Olvidar el $mL_f$ del hielo, o el $mc_wT$ del agua que procede del hielo fundido.
**Figura sugerida.** Esquema del calorímetro con sus cuatro componentes y una barra de balance: calor que cede el plomo (18,8 kJ + 6,0 kJ…) frente a lo que absorbe cada parte.
Teoría: U §17.6 p. 563 (Estrategia 17.2); ejemplo 17.8 p. 563.

---

### E13. Problema 17.93 (U p. 580; Solucionario 17-22 y 17-23) — ¿se derrite todo el hielo?

**Enunciado (de U).** Usted tiene 1,50 kg de agua a 28 °C en un recipiente aislado de masa despreciable. Usted agrega 0,600 kg de hielo que inicialmente está a −22,0 °C. Suponga que no hay intercambio de calor con el entorno. a) Después de que se ha alcanzado el equilibrio térmico, ¿se ha derretido todo el hielo? b) Si todo el hielo se ha derretido, ¿cuál es la temperatura final del agua en el recipiente? Si todavía quedan algunos hielos, ¿cuál es la temperatura final del sistema, y cuánto hielo queda?

**Solución.**
1. **Idea: comparar «presupuestos».** Antes de plantear $\sum Q=0$ con una $T$ desconocida, se calcula lo máximo que puede dar el agua sin congelarse y lo que necesita el hielo para fundirse entero.
2. **Lo que puede ceder el agua al bajar a 0 °C:** $(1{,}50)(4190)(28{,}0)=1{,}76\times10^5$ J.
3. **Lo que necesita el hielo para fundirse entero:** calentarse a 0 °C, $(0{,}600)(2100)(22{,}0)=2{,}77\times10^4$ J, más fundirse, $(0{,}600)(3{,}34\times10^5)=2{,}00\times10^5$ J: total $2{,}28\times10^5$ J.
4. **a)** $2{,}28\times10^5>1{,}76\times10^5$: **no se funde todo**. (Si se hubiera supuesto que sí, saldría $T=-5{,}9$ °C, imposible con agua líquida: la hipótesis queda refutada.)
5. **b)** Coexisten hielo y agua ⇒ $T_f=$ **0 °C**. Masa fundida: $1{,}76\times10^5=2{,}77\times10^4+m(3{,}34\times10^5)$ ⇒ $m=0{,}444$ kg. **Quedan 0,156 kg de hielo**.

**Receta.** Mezclas con cambio de fase: (1) calor disponible hasta la temperatura de cambio de fase; (2) calor necesario para completar el cambio; (3) si no alcanza, $T_f$ es la del cambio de fase y la incógnita pasa a ser **la masa** que cambia de fase.
**Error típico.** Resolver directamente $\sum Q=0$ con «todo fundido» y dar por buena una temperatura negativa.
**Figura sugerida.** Dos barras: calor disponible del agua (176 kJ) frente a calor necesario del hielo (27,7 + 200 kJ), con la parte del hielo que queda sin fundir señalada.
Teoría: U §17.6 pp. 560–563 (17.20), Estrategia 17.2; ejemplo 17.9 p. 564.

---

### E14. Problema 17.97 (U p. 580; Solucionario 17-24) — vapor que no se condensa entero

**Enunciado (de U).** En un recipiente de masa despreciable, 0,0400 kg de vapor de agua a 100 °C y presión atmosférica se agregan a 0,200 kg de agua a 50,0 °C. a) Si no se transfiere calor al entorno, ¿qué temperatura final alcanzará el sistema? b) A la temperatura final, ¿cuántos kilogramos hay de vapor de agua y cuántos de agua líquida?

**Solución.**
1. **Presupuestos (como en E13).** Si se condensa **todo** el vapor libera $mL_v=(0{,}0400)(2{,}256\times10^6)=9{,}02\times10^4$ J. El agua, para llegar a 100 °C, solo puede absorber $(0{,}200)(4190)(50{,}0)=4{,}19\times10^4$ J.
2. **a)** El vapor tiene más calor que dar del que el agua puede aceptar sin hervir ⇒ no se condensa todo y **$T_f=100$ °C**. (La hipótesis «todo líquido» daría 148 °C, imposible para agua líquida a 1 atm.)
3. **b)** Vapor condensado: $m=4{,}19\times10^4/2{,}256\times10^6=0{,}0186$ kg. Quedan **0,0214 kg de vapor** y $0{,}200+0{,}0186=$ **0,219 kg de agua líquida**.

**Receta.** La misma de E13, ahora con condensación: si el calor de condensación completa supera lo que el agua puede absorber hasta 100 °C, el estado final es una mezcla a 100 °C.
**Error típico.** Plantear $\sum Q=0$ con todo condensado y aceptar $T_f=148$ °C.
**Figura sugerida.** Barras: 90,2 kJ (condensación completa) frente a 41,9 kJ (capacidad del agua hasta 100 °C).
Teoría: U §17.6 pp. 560–564 (17.20); ejemplo 17.9 p. 564.

---

### E15. Problema 17.57 (U p. 577; Solucionario 17-13) — gradiente y temperatura en una varilla de cobre

**Enunciado (de U).** Suponga que la varilla de la figura 17.24a es de cobre, tiene 45,0 cm de longitud y área de sección transversal de 1,25 cm². Sea $T_H=100{,}0$ °C y $T_C=0{,}0$ °C. En el estado estable final, calcule: a) el gradiente de la temperatura a lo largo de la varilla, b) la corriente de calor en la varilla, y c) la temperatura de la varilla a 12,0 cm de su extremo izquierdo.

**Solución.**
1. **Idea.** En estado estable no se acumula calor en ningún trozo: **la misma $H$ atraviesa toda la varilla**. Con $k$ y $A$ constantes, eso exige que $T$ baje **linealmente** con $x$.
2. **a)** Gradiente $=\dfrac{T_H-T_C}{L}=\dfrac{100{,}0}{0{,}450}=$ **222 K/m**.
3. **b)** (17.21): $H=kA\cdot\text{gradiente}=(385)(1{,}25\times10^{-4})(222)=$ **10,7 W**.
4. **c)** Aplicando (17.21) solo al primer tramo de 0,120 m: $100-T=\dfrac{HL_1}{kA}=26{,}7$ C° ⇒ $T=$ **73,3 °C**. (Equivale a $T=100-222\cdot0{,}120$: la recta.)

**Receta.** Varilla homogénea en estado estable: $T(x)=T_H-(T_H-T_C)\,x/L$ y $H=kA(T_H-T_C)/L$, igual en cualquier sección.
**Error típico.** Pasar el área a m² mal (1 cm² = 10⁻⁴ m²) o creer que $H$ disminuye a lo largo de la varilla.
**Figura sugerida.** Varilla entre 100 °C y 0 °C y, debajo, gráfica $T(x)$ lineal con el punto (12 cm; 73,3 °C).
Teoría: U §17.7 p. 565 (17.21), fig. 17.24.

---

### E16. Problema 17.56 (U p. 577; Solucionario 17-12 y 17-13) — barra latón-cobre que funde hielo

**Enunciado (de U).** Dos barras, una de latón y otra de cobre, están unidas extremo con extremo. La longitud de la barra de latón es 0,300 m y la de cobre es 0,800 m. Cada segmento tiene un área de sección transversal de 0,00500 m². El extremo libre del segmento de latón está en agua hirviendo y el extremo libre del segmento de cobre se encuentra en una mezcla de hielo y agua, en ambos casos a la presión atmosférica normal. Los lados de las varillas están aislados, por lo que no hay pérdida de calor a los alrededores. a) ¿Cuál es la temperatura del punto en el que los segmentos de latón y cobre se unen? b) ¿Qué masa de hielo se funde en 5,00 min por el calor conducido por la varilla compuesta?

**Solución.**
1. **Idea (Estrategia 17.3, paso 2).** En serie y en estado estable la corriente es la **misma** en las dos barras; la unión está a una $T$ intermedia desconocida.
2. **a)** $H_{latón}=H_{Cu}$: $\dfrac{109\,(100-T)}{0{,}300}=\dfrac{385\,(T-0)}{0{,}800}$ ⇒ $363{,}3(100-T)=481{,}3\,T$ ⇒ $T=$ **43,0 °C**.
3. **b) Corriente:** $H=\dfrac{(109)(0{,}00500)(100-43{,}0)}{0{,}300}=103{,}5$ W. En 300 s: $Q=Ht=3{,}11\times10^4$ J.
4. **Hielo fundido.** La mezcla está a 0 °C: todo el calor que llega funde hielo, $Q=mL_f$ ⇒ $m=3{,}11\times10^4/3{,}34\times10^5=$ **0,0930 kg = 93,0 g**.
5. **Evaluación.** La unión no está a 50 °C: la caída de temperatura es mayor donde la «resistencia» $L/k$ es mayor (latón: $0{,}300/109=2{,}75\times10^{-3}$; cobre: $0{,}800/385=2{,}08\times10^{-3}$ m²·K/W).

**Receta.** Barras en serie: iguala las $H$ para hallar la temperatura de la unión; después usa cualquiera de ellas para $H$ y $Q=Ht$.
**Error típico.** Suponer que la unión está a la media de las temperaturas.
**Figura sugerida.** Barra compuesta (latón 0,300 m | cobre 0,800 m) entre 100 °C y 0 °C con la unión a 43,0 °C, y gráfica $T(x)$ con dos rectas de pendiente distinta.
Teoría: U §17.7 pp. 565–567 (17.21), Estrategia 17.3; ejemplo 17.12 p. 567; §17.6 (17.20).

---

### E17. Problema 17.59 (U p. 577; Solucionario 17-13 y 17-14) — pared de madera y poliestireno

**Enunciado (de U).** Un carpintero construye una pared exterior con una capa externa de madera de 3,0 cm de espesor y una capa interna de espuma de poliestireno de 2,2 cm de espesor. La madera tiene $k=0{,}080$ W/(m·K) y el poliestireno $k=0{,}027$ W/(m·K). La temperatura de la superficie interior es de 19,0 °C, y la exterior, −10,0 °C. a) Calcule la temperatura en la unión entre la madera y la espuma de poliestireno. b) Calcule la rapidez de flujo de calor por metro cuadrado a través de esta pared.

**Solución.**
1. **Idea.** Mismo esquema que E16: dos capas en serie, misma $H$ (y misma $H/A$, pues el área es común).
2. **a)** $\dfrac{0{,}080\,(T-(-10{,}0))}{0{,}030}=\dfrac{0{,}027\,(19{,}0-T)}{0{,}022}$ ⇒ $2{,}667(T+10)=1{,}227(19-T)$ ⇒ $T=$ **−0,86 °C**.
3. **b)** Con la madera: $H/A=0{,}080\,(−0{,}86+10{,}0)/0{,}030=$ **24 W/m²**; con el poliestireno sale lo mismo (comprobación).
4. **Con resistencias** (17.23–17.24): $R=0{,}030/0{,}080+0{,}022/0{,}027=0{,}375+0{,}815=1{,}19$ m²·K/W ⇒ $H/A=29{,}0/1{,}19=24{,}4$ W/m² ✓.
5. **Evaluación.** Casi toda la caída de temperatura (19,9 de 29 C°) está en el poliestireno, que es la capa de mayor $R$ aunque sea más delgada.

**Receta.** Capas en serie: $H/A=\Delta T_{total}/\sum R_i$ y la caída en cada capa es $(H/A)\,R_i$.
**Error típico.** Sumar conductividades en lugar de resistencias.
**Figura sugerida.** Corte de la pared (madera 3,0 cm | poliestireno 2,2 cm) con el perfil de temperatura quebrado: −10,0 °C → −0,86 °C → 19,0 °C.
Teoría: U §17.7 pp. 566–567 (17.23)–(17.24), Estrategia 17.3.

---

### E18. Problema 17.63 (U p. 577; Solucionario 17-14 y 17-15) — la base de la olla

**Enunciado (de U).** Una olla con base de acero de 8,50 mm de espesor y área de 0,150 m² descansa en una estufa caliente. El agua dentro de la olla está a 100,0 °C y se evaporan 0,390 kg cada 3,00 min. Calcule la temperatura de la superficie inferior de la olla, que está en contacto con la estufa.

**Solución.**
1. **Idea.** Todo el calor que atraviesa la base (conducción) se gasta en evaporar agua a 100 °C (cambio de fase): se calcula $H$ a partir de la evaporación y se despeja $T_H$ de (17.21).
2. **Calor y corriente.** $Q=mL_v=(0{,}390)(2{,}256\times10^6)=8{,}80\times10^5$ J en 180 s ⇒ $H=4{,}89\times10^3$ W.
3. **Diferencia de temperatura en la base:** $T_H-T_C=\dfrac{HL}{kA}=\dfrac{(4{,}89\times10^3)(8{,}50\times10^{-3})}{(50{,}2)(0{,}150)}=5{,}52$ C°.
4. **Resultado:** $T_H=100{,}0+5{,}52=$ **105,5 °C**.
5. **Evaluación.** Basta una diferencia de 5,5 C° a través del acero para conducir casi 5 kW: el metal es un buen conductor y la base es fina.

**Receta.** «Conducción que alimenta un cambio de fase»: $H=mL/t$ y luego $\Delta T=HL/(kA)$.
**Error típico.** Usar $mc\Delta T$ para el agua (no cambia de temperatura, hierve) o $L_f$ en lugar de $L_v$.
**Figura sugerida.** Corte de la olla: estufa a 105,5 °C, base de acero de 8,50 mm, agua hirviendo a 100 °C, flecha $H=4{,}89$ kW.
Teoría: U §17.7 p. 565 (17.21); §17.6 p. 560 (17.20).

---

### E19. Problema 17.101 (U p. 580; Solucionario 17-25) — ventana sencilla frente a doble acristalamiento

**Enunciado (de U).** Calcule el cociente entre las tasas de pérdida de calor a través de una ventana de un solo vidrio con área de 0,15 m² y a través de una ventana de doble vidrio con la misma área. Cada vidrio tiene un espesor de 4,2 mm, y el espacio entre los dos vidrios de la ventana doble es de 7,0 mm. El vidrio tiene una conductividad térmica de 0,80 W/(m·K). Las películas de aire en las superficies interior y exterior de ambas ventanas tienen una resistencia térmica combinada de 0,15 m²·K/W.

**Solución.**
1. **Idea.** Las capas (película de aire, vidrio, cámara de aire, vidrio, película) están en serie: **las resistencias se suman** y $H=A\Delta T/R_{total}$ (17.23). Con la misma $A$ y $\Delta T$, $H_s/H_d=R_d/R_s$.
2. **Vidrio:** $R_v=L/k=4{,}2\times10^{-3}/0{,}80=5{,}25\times10^{-3}$ m²·K/W.
3. **Cámara de aire** (aire inmóvil, $k=0{,}024$): $R_a=7{,}0\times10^{-3}/0{,}024=0{,}292$ m²·K/W.
4. **Sencilla:** $R_s=R_v+0{,}15=0{,}155$. **Doble:** $R_d=2R_v+R_a+0{,}15=0{,}452$ m²·K/W.
5. **Cociente:** $H_s/H_d=0{,}452/0{,}155=$ **2,9**.
6. **Lectura.** El vidrio aporta poquísimo aislamiento; lo que aísla son las películas de aire y, sobre todo, **la cámara de aire inmóvil**.

**Receta.** Paredes compuestas: suma de $R=L/k$ (más las de las películas) y $H=A\Delta T/R$; en cocientes, $A$ y $\Delta T$ se cancelan.
**Error típico.** Olvidar las películas de aire (daría un cociente enorme y falso) o usar el área en $R$ (aquí $R$ es por m²).
**Figura sugerida.** Las dos ventanas en corte con sus capas y una «escalera» de resistencias en serie (0,15 + 0,005 frente a 0,15 + 0,005 + 0,292 + 0,005).
Teoría: U §17.7 p. 566 (17.23)–(17.24); p. 568 (película superficial de convección).

---

### E20. Problema 17.103 (U p. 580; Solucionario 17-26) — barra de tres tramos

**Enunciado (de U).** Una barra de latón de 12,0 cm de longitud, una de cobre de 18,0 cm y una de aluminio de 24,0 cm, todas con sección transversal de 2,30 cm², se sueldan para formar una barra de 54,0 cm de largo, colocando la de cobre en la parte media. El extremo libre de la de latón se mantiene a 100,0 °C, y el extremo libre de la de aluminio se mantiene a 0,0 °C. Suponga que no hay pérdida de calor en las superficies curvas y que se ha establecido una corriente de calor en estado estable. Determine a) la temperatura $T_1$ en la unión de las secciones de latón y cobre; b) la temperatura $T_2$ en la unión de las secciones de cobre y aluminio; c) la corriente de calor en la sección de aluminio.

**Solución.**
1. **Idea.** Tres tramos en serie ⇒ la misma $H$ en los tres. Dos incógnitas ($T_1$, $T_2$) y dos ecuaciones ($H_{lat}=H_{Cu}$, $H_{lat}=H_{Al}$); el área común se cancela.
2. **Ecuaciones:** $\dfrac{109(100-T_1)}{0{,}120}=\dfrac{385(T_1-T_2)}{0{,}180}=\dfrac{205\,T_2}{0{,}240}$.
3. **Atajo con resistencias.** $R_i=L_i/k_i$: latón $1{,}101\times10^{-3}$, cobre $4{,}68\times10^{-4}$, aluminio $1{,}171\times10^{-3}$ m²·K/W; total $2{,}740\times10^{-3}$. $H/A=100/2{,}740\times10^{-3}=3{,}65\times10^4$ W/m².
4. **a)** $T_1=100-(H/A)R_{lat}=$ **59,8 °C**. **b)** $T_2=T_1-(H/A)R_{Cu}=$ **42,7 °C**.
5. **c)** $H=(H/A)\,A=(3{,}65\times10^4)(2{,}30\times10^{-4})=$ **8,40 W** (con el aluminio: $205\cdot2{,}30\times10^{-4}\cdot42{,}7/0{,}240=8{,}40$ W ✓; con el cobre también 8,40 W).

**Receta.** $n$ tramos en serie: $H=A\Delta T_{total}/\sum(L_i/k_i)$ y cada salto $\Delta T_i=(H/A)L_i/k_i$, en orden desde el extremo caliente.
**Error típico.** Resolver el sistema sin cancelar el área o con las longitudes en cm junto a $k$ en W/(m·K) (aquí se cancelan si todas van en cm, pero no en el apartado c).
**Figura sugerida.** Barra de tres colores con 100 °C | 59,8 °C | 42,7 °C | 0 °C y el perfil $T(x)$ con tres pendientes (la más suave en el cobre).
Teoría: U §17.7 pp. 565–567 (17.21), (17.23)–(17.24), Estrategia 17.3.

---

### E21. Problema 17.102 (U p. 580; Solucionario 17-25 y 17-26) — unión en Y: calor que se reparte

**Enunciado (de U).** Se sueldan varillas de cobre, latón y acero para formar una Y. El área de sección transversal de cada varilla es de 2,00 cm². El extremo libre de la varilla de cobre se mantiene a 100,0 °C; y los extremos libres de las varillas de latón y acero, a 0,0 °C. Suponga que no hay pérdida de calor por los costados de las varillas, cuyas longitudes son: cobre, 13,0 cm; latón, 18,0 cm; acero, 24,0 cm. a) ¿Qué temperatura tiene el punto de unión? b) Calcule la corriente de calor en cada una de las tres varillas.

**Solución.**
1. **Idea.** Ahora **no** es una serie: el calor que llega por el cobre se **reparte** entre latón y acero (que están en paralelo entre la unión y 0 °C). En la unión no se acumula energía: $H_{Cu}=H_{lat}+H_{ac}$ (conservación de la energía en un nudo).
2. **Ecuación** (área común cancelada): $\dfrac{385}{0{,}130}(100-T_0)=\dfrac{109}{0{,}180}T_0+\dfrac{50{,}2}{0{,}240}T_0$ ⇒ $T_0=\dfrac{2962\cdot100}{2962+605{,}6+209{,}2}=$ **78,4 °C**.
3. **b)** $H_{Cu}=\dfrac{385\,(2{,}00\times10^{-4})(21{,}6)}{0{,}130}=$ **12,8 W**; $H_{lat}=\dfrac{109\,(2{,}00\times10^{-4})(78{,}4)}{0{,}180}=$ **9,50 W**; $H_{ac}=\dfrac{50{,}2\,(2{,}00\times10^{-4})(78{,}4)}{0{,}240}=$ **3,28 W**.
4. **Comprobación.** $9{,}50+3{,}28=12{,}78\approx12{,}8$ W ✓.

**Receta.** Uniones de varias barras: en cada nudo, $\sum H_{entra}=\sum H_{sale}$ (como la ley de nudos), y en cada barra $H=kA\Delta T/L$.
**Error típico.** Igualar las tres corrientes como si estuvieran en serie.
**Figura sugerida.** La Y con 100 °C arriba, la unión a 78,4 °C y dos extremos a 0 °C; flechas de $H$ con 12,8, 9,50 y 3,28 W.
Teoría: U §17.7 pp. 565–567 (17.21), Estrategia 17.3 (pasos 2 y 3); ejemplo 17.13 p. 568.

---

### E22. Problema 17.67 (U p. 578; Solucionario 17-15 y 17-16) — la cafetera que se enfría por radiación

**Enunciado (de U).** Una olla esférica contiene 0,75 L de café caliente (en esencia solo agua) a una temperatura de 95 °C. La olla tiene una emisividad de 0,60 y los alrededores están a 20,0 °C. Para el café, calcule la tasa de pérdida de calor por radiación.

**Solución.**
1. **Idea.** La olla emite según (17.25) y absorbe del entorno; la pérdida neta es (17.26), $H_{net}=Ae\sigma(T^4-T_s^4)$, con **temperaturas en kelvin**. Se supone la pared delgada, de modo que su superficie está a la temperatura del café.
2. **Área a partir del volumen.** $V=\tfrac43\pi R^3=7{,}5\times10^{-4}$ m³ ⇒ $R=0{,}0564$ m ⇒ $A=4\pi R^2=0{,}0399$ m².
3. **Temperaturas:** $T=95+273=368$ K, $T_s=20+273=293$ K.
4. **Cálculo:** $H_{net}=(0{,}0399)(0{,}60)(5{,}67\times10^{-8})(368^4-293^4)=$ **15 W**.
5. **Evaluación.** Pequeño frente a lo que emite la olla sola ($Ae\sigma T^4=25$ W): el entorno devuelve buena parte.

**Receta.** Radiación: pasa a kelvin, calcula el área real que emite y usa la **diferencia de cuartas potencias** (no la cuarta potencia de la diferencia).
**Error típico.** Usar $(T-T_s)^4$ o temperaturas en °C ($95^4-20^4$).
**Figura sugerida.** Esfera con flechas salientes $Ae\sigma T^4$ (368 K) y entrantes $Ae\sigma T_s^4$ (293 K), neto 15 W.
Teoría: U §17.7 pp. 569–570 (17.25)–(17.26); ejemplo 17.15 p. 570.

---

### E23. Problema 17.108 (U p. 581; Solucionario 17-28) — emisividad de una esfera y la trampa del $2^4$

**Enunciado (de U).** Una esfera metálica con radio de 3,20 cm, se encuentra suspendida en una caja metálica grande cuyas paredes interiores se mantienen a 30,0 °C. Un calentador eléctrico pequeño se coloca junto a la esfera y se le suministra calor a razón de 0,660 J/s para mantenerla a una temperatura constante de 41,0 °C. a) ¿Cuál es la emisividad de la esfera de metal? b) ¿Qué potencia se requiere para mantener la esfera a 82,0 °C? ¿Cuál es el cociente de potencia requerida para 82,0 °C con respecto a la potencia requerida para mantenerla a 41,0 °C? ¿Cómo se compara este cociente con $2^4$? Explique su respuesta.

**Solución.**
1. **Idea.** Temperatura constante ⇒ el calentador repone exactamente la pérdida neta por radiación: $P=H_{net}=Ae\sigma(T^4-T_s^4)$.
2. **Datos en kelvin:** $T=314$ K, $T_s=303$ K; $A=4\pi(0{,}0320)^2=0{,}01287$ m².
3. **a)** $e=\dfrac{0{,}660}{(0{,}01287)(5{,}67\times10^{-8})(314^4-303^4)}=$ **0,700**.
4. **b)** A $T=82{,}0$ °C $=355$ K: $P=(0{,}01287)(0{,}700)(5{,}67\times10^{-8})(355^4-303^4)=$ **3,81 W**. Cociente $3{,}81/0{,}660=$ **5,77**.
5. **¿Por qué no 16?** «Doblar» de 41 a 82 °C **no dobla la temperatura absoluta** (355/314 = 1,13), y además la pérdida neta depende de $T^4-T_s^4$, no de $T^4$. El factor $2^4=16$ solo saldría si se doblara la temperatura **en kelvin** y el entorno estuviera a 0 K.

**Receta.** Estado estacionario con radiación: potencia suministrada = $H_{net}$; nunca razones por proporciones con °C.
**Error típico.** Esperar un factor 16 al «doblar» la temperatura en °C.
**Figura sugerida.** Gráfica de $H_{net}$ frente a $T$ (300–360 K) con los puntos (314 K; 0,660 W) y (355 K; 3,81 W).
Teoría: U §17.7 pp. 569–570 (17.25)–(17.26).

---

### E24. Problema práctico de U (p. 573; resultados en U p. 583) — radiación + conducción + fusión

**Enunciado (de U).** Flujo de calor en estado estable: radiación y conducción. Uno de los extremos de una varilla de cobre sólida cilíndrica de 0,200 m de largo y de 0,0250 m de radio se inserta en un bloque grande de hidrógeno sólido a su temperatura de fusión, 13,84 K. El otro extremo se ennegrece y se expone a la radiación térmica de las paredes que lo rodean a 500,0 K. Los lados de la varilla están aislados, por lo que no se pierde ni se gana energía, excepto en los extremos de la varilla. a) Cuando se alcanza el equilibrio, ¿cuál es la temperatura del extremo ennegrecido? La conductividad térmica del cobre a temperaturas cercanas a 20 K es 1670 W/(m·K). b) ¿Con qué rapidez (en kg/h) se funde el hidrógeno sólido?

**Solución.**
1. **Idea (guía de U).** En estado estable no se acumula energía en la varilla: **la corriente neta de radiación que entra por el extremo ennegrecido es igual a la corriente de conducción** por la varilla, y esa misma corriente funde el hidrógeno.
2. **Planteamiento.** Extremo ennegrecido ⇒ $e=1$; área del extremo $A=\pi(0{,}0250)^2=1{,}96\times10^{-3}$ m² (la misma para radiación y conducción, así que se cancela). Con $T$ = temperatura del extremo:
$$\underbrace{A\sigma(500^4-T^4)}_{\text{radiación neta que entra}}=\underbrace{kA\,\frac{T-13{,}84}{0{,}200}}_{\text{conducción}}$$
3. **Resolver.** Es una ecuación de cuarto grado; como el cobre conduce muy bien, $T$ será solo un poco mayor que 13,84 K y $T^4\ll500^4$. Aproximación: $\sigma\,500^4=3544$ W/m² $=8350\,(T-13{,}84)$ ⇒ $T-13{,}84=0{,}424$ K. Resolviendo la ecuación completa (sympy): **$T=14{,}26$ K** (el término $T^4$ es despreciable, se confirma la aproximación).
4. **b) Corriente:** $H=A\sigma(500^4-T^4)=6{,}96$ W. **Fusión** del hidrógeno, $L_f=58{,}6\times10^3$ J/kg (tabla 17.4): $\dfrac{dm}{dt}=\dfrac{H}{L_f}=1{,}19\times10^{-4}$ kg/s $=$ **0,427 kg/h**.
5. **Evaluación (pasos 7–8 de la guía).** El extremo está solo 0,42 K por encima de 13,84 K, como sugería U. Si el radio se duplicara, $A$ se cuadruplica en ambos lados: $T$ no cambia (el área se cancela) y la fusión es 4 veces más rápida (1,71 kg/h).

**Receta.** Mecanismos en serie en estado estable: escribe una $H$ por mecanismo y **iguálalas**; la $H$ común alimenta el cambio de fase ($dm/dt=H/L$).
**Error típico.** Usar 500 K como temperatura del extremo, olvidar restar la emisión propia $T^4$ o tomar $L_v$ en lugar de $L_f$.
**Figura sugerida.** Varilla horizontal: a la izquierda, paredes a 500 K con flechas onduladas de radiación hacia el extremo negro (14,26 K); a la derecha, bloque de hidrógeno sólido a 13,84 K; flecha $H=6{,}96$ W a lo largo de la varilla.
Teoría: U §17.7 pp. 565 (17.21), 569–570 (17.25)–(17.26); §17.6 p. 560 (17.20), tabla 17.4 p. 561.

---

## Tabla de verificación (sympy)

| Ejercicio | Resultado verificado |
|---|---|
| X1 (estimaciones propias) | hielera 32,4 W; cuerpo 573,5 W y 72,0 W netos; clavo $H_{Al}=5{,}15$ W, $H_{acero}=1{,}26$ W (cociente 4,08); casa 96,0 frente a 83,2 kWh (ahorro 13,3 %) |
| 17.1 | −81,04; 134,06; 87,98 °F |
| 17.4 | −40; $T=45967/80=574{,}59$ |
| 17.9 | $\gamma=170{,}02$ Pa/C°; $T_0=-282{,}31$ °C; $p_{triple}=4{,}7582\times10^4$ Pa |
| 17.14 | $d=4{,}5109$ mm |
| 17.17 | $\Delta V_{Hg}=9{,}90$ cm³; $\Delta V_v=0{,}950$ cm³; $\beta_v=1{,}727\times10^{-5}$ K⁻¹ |
| 17.21 | $\Delta L=6{,}048\times10^{-3}$ m; $F/A=-1{,}008\times10^{8}$ Pa |
| 17.23 | 65 065 J + 490 230 J = 555 295 J |
| 17.24 | $Q=80\,448$ J; $t=402{,}2$ s = 6,70 min |
| 17.31 | $K=54{,}756$ J; $Q=328{,}5$ J; $\Delta T=45{,}13$ C° |
| 17.35 | $c=214{,}9$ J/(kg·K) |
| 17.45 | 378 + 6012 + 7542 + 40 608 = 54 540 J; 13 029 cal; 51,70 Btu |
| 17.46 | 21,66 min; +229,63 min ⇒ 251,28 min; $T$(500 min) = 86,34 °C |
| 17.38 | $T=21{,}365$ °C |
| 17.93 | 175 980 J < 228 120 J; fundido 0,44389 kg; quedan 0,15611 kg; hipótesis «todo fundido» ⇒ −5,93 °C ✗ |
| 17.97 | 90 240 J > 41 900 J; condensa 0,018573 kg; vapor 0,021427 kg; líquido 0,21857 kg; hipótesis «todo líquido» ⇒ 148,1 °C ✗ |
| 17.57 | 222,22 K/m; 10,694 W; 73,333 °C |
| 17.56 | $T=43{,}019$ °C; $Q=3{,}1055\times10^4$ J; $m=0{,}092978$ kg |
| 17.59 | $T=-0{,}8599$ °C; $H/A=24{,}374$ W/m² (por ambas capas) |
| 17.63 | $H=4888$ W; $\Delta T=5{,}5177$ C° |
| 17.101 | $R_s=0{,}15525$; $R_d=0{,}45217$ m²·K/W; cociente 2,9125 |
| 17.103 | $T_1=59{,}809$ °C; $T_2=42{,}740$ °C; $H=8{,}3967$ W |
| 17.102 | $T_0=78{,}425$ °C; 12,779 W; 9,4982 W; 3,2808 W |
| 17.67 | $R=0{,}056363$ m; $A=0{,}039920$ m²; $H_{net}=14{,}90$ W (14,92 W con 273,15) |
| 17.108 | $A=0{,}012868$ m²; $e=0{,}69999$; $P=3{,}8066$ W; cociente 5,7676 |
| Probl. práctico | $T=14{,}2644$ K; $H=6{,}9581$ W; $dm/dt=0{,}42746$ kg/h |
