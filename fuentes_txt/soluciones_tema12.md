# Soluciones Tema 12 — Mecánica de fluidos

Material para el redactor del tema 12. Todos los números se han comprobado con sympy (script propio de verificación, un bloque por ejercicio). Los enunciados de E se han tomado de U (`sears.txt`, págs. impresas 390–393; la figura E12.33 se ha comprobado sobre la imagen del PDF, pág. PDF 420) y las soluciones de `solman.txt` (la página 12-N del solucionario está en el PDF 411+N). Cada etiqueta 12.N se ha confirmado comparando el enunciado de U con el contenido de la solución de E. Los ejemplos del libro se han leído en `sears.txt` (págs. impresas 374–384). Los problemas E están traducidos y ampliados, no copiados.

Convenciones: si el enunciado no da $g$, se usa $g=9{,}8\ \text{m/s}^2$ (como U). $\rho_{\text{agua}}=1000\ \text{kg/m}^3$, agua de mar $1030\ \text{kg/m}^3$ (tabla 12.1, U p. 370). $1\ \text{atm}=1{,}013\times10^5$ Pa (U p. 371). «U p. NN» = página impresa del Sears-Zemansky. Eje $y$ hacia arriba; $h$ = profundidad bajo la superficie.

## Herramientas de teoría que se usan

| Herramienta | Dónde |
|---|---|
| Densidad $\rho=m/V$ (12.1); tabla 12.1 de densidades | U §12.1 p. 370 |
| Presión $p=dF_\perp/dA$ (12.2), $p=F_\perp/A$ (12.3); 1 Pa = 1 N/m²; 1 atm = $1{,}013\times10^5$ Pa | U §12.2 p. 371 |
| Variación con la altura $p_2-p_1=-\rho g(y_2-y_1)$ (12.5) | U §12.2 p. 372 |
| Presión a profundidad $h$: $p=p_0+\rho gh$ (12.6); misma presión a la misma altura dentro del mismo fluido en reposo | U §12.2 p. 373 |
| Ley de Pascal; elevador hidráulico $F_2=(A_2/A_1)F_1$ (12.7) | U §12.2 p. 373 |
| Presión absoluta y manométrica ($p-p_{atm}$) | U §12.2 p. 373 |
| Manómetro de tubo abierto $p-p_{atm}=\rho gh$ (12.8); barómetro $p_{atm}=\rho gh$ (12.9) | U §12.2 pp. 374–375 |
| Principio de Arquímedes: $B=\rho_{\text{fluido}}V_{\text{sumergido}}\,g$ | U §12.3 p. 376 |
| Continuidad $A_1v_1=A_2v_2$ (12.10); caudal $dV/dt=Av$ (12.11) | U §12.4 p. 380 |
| Bernoulli $p_1+\rho gy_1+\tfrac12\rho v_1^2=p_2+\rho gy_2+\tfrac12\rho v_2^2$ (12.17); Estrategia 12.1 (presiones todas absolutas o todas manométricas) | U §12.5 p. 382 |
| Teorema de Torricelli $v=\sqrt{2gh}$ (Ej. 12.8); medidor Venturi (Ej. 12.9) | U §12.5 p. 384 |
| Viscosidad: a caudal fijo, $\Delta p\propto L/R^4$ | U §12.6 p. 386 |
| Primera ley de Newton / $\sum F_y=0$ (equilibrio de una partícula) | U §5.1 p. 130 y ss. |

---

## PARTE A — Problemas de examen (X)

**No hay ningún ejercicio de examen real para el Tema 12.** El índice `fuentes_txt/examenes_por_tema.md` dice «Ningún ejercicio de examen encontrado» y el dossier lo ha comprobado convocatoria por convocatoria (2018–2025): ningún examen trata presión, flotación, continuidad, Bernoulli ni viscosidad. En el HTML hay que decirlo así («no hay ejercicios de examen de este tema en las convocatorias disponibles, 2018–2025»), y los ejercicios resueltos son los ejemplos de U (Parte B) y los problemas de E (Parte C). No presentar ninguno como «de examen».

---

## PARTE B — Ejemplos del libro U que aportan un método propio (verificados)

Se amplían solo los ejemplos con método distinto de los problemas E de la Parte C: 12.3 (absoluta frente a manométrica), 12.4 (dos fluidos inmiscibles), 12.5 (Arquímedes con tensión: es el modelo de E 12.26 y 12.35), 12.7 (continuidad + Bernoulli con cambio de cota) y 12.9 (Venturi: Bernoulli + continuidad + manómetro). Los ejemplos 12.1, 12.2 y 12.6 son aplicaciones directas de una sola fórmula ($m=\rho V$, $F=pA$, $Q=Av$) y quedan cubiertos por E 12.2, 12.24 y 12.38. El 12.8 (Torricelli) se trata en E 12.44 y 12.41. Los 12.10 y 12.11 son conceptuales.

### U1. Ejemplo 12.3 — presiones absoluta y manométrica (U p. 374)

**Enunciado (resumen fiel).** Un tanque de almacenamiento de 12,0 m de profundidad está lleno de agua y abierto por arriba al aire. ¿Cuál es la presión absoluta en el fondo? ¿Y la manométrica?

**Solución.**

1. **Modelo.** El agua es prácticamente incompresible ⇒ densidad uniforme ⇒ vale $p=p_0+\rho gh$ (12.6, U p. 373). En la superficie el agua toca el aire: $p_0=p_{atm}\approx1{,}01\times10^5$ Pa.
2. **Absoluta.** $p=1{,}01\times10^5+(1000)(9{,}8)(12{,}0)=1{,}01\times10^5+1{,}176\times10^5=2{,}186\times10^5$ Pa ≈ **2,19×10⁵ Pa** (≈ 2,16 atm).
3. **Manométrica.** Es lo que excede de la atmosférica (U p. 373): $p-p_0=\rho gh=$ **1,18×10⁵ Pa** (≈ 1,16 atm).
4. **Por qué importa.** Un manómetro en el fondo del tanque marca la manométrica (mide la diferencia con el aire de fuera); la absoluta es la que «siente» una pared con vacío al otro lado.

**Receta.** Profundidad $h$ ⇒ manométrica $=\rho gh$; absoluta $=p_{atm}+\rho gh$. Cada 10 m de agua añaden ≈ 1 atm.

**Error típico.** Dar la absoluta cuando se pide la manométrica (o al revés), o mezclar ambas en una misma ecuación.

**Figura SVG sugerida.** Tanque de 12 m con una escala lateral de presión: arriba $p_0=1{,}01\times10^5$ Pa, abajo $2{,}19\times10^5$ Pa; flecha de doble punta «$\rho gh=1{,}18\times10^5$ Pa» (manométrica).

Teoría: U §12.2 p. 373 (12.6, absoluta/manométrica).

---

### U2. Ejemplo 12.4 — historia de dos fluidos (U p. 375)

**Enunciado (resumen fiel).** Un tubo en U contiene agua; se vierte aceite (no se mezcla) en el brazo izquierdo hasta que la interfase aceite-agua queda en el punto medio del fondo del tubo. Ambos brazos están abiertos al aire. Halle la relación entre las alturas $h_{\text{aceite}}$ y $h_{\text{agua}}$ medidas desde el nivel de la interfase.

**Solución.**

1. **Por qué no se puede usar una sola ecuación (12.6).** $p=p_0+\rho gh$ vale solo para un fluido de densidad uniforme: hay que escribirla por separado para cada columna.
2. **Nivel de referencia.** El nivel de la interfase. A esa altura, en el brazo derecho hay agua y en el izquierdo está justo el contacto aceite-agua; los dos puntos están unidos por agua continua en reposo ⇒ **tienen la misma presión $p$** (U p. 373: misma presión a la misma altura dentro de un mismo fluido en reposo).
3. **Cada columna.** Izquierda: $p=p_0+\rho_{\text{aceite}}g\,h_{\text{aceite}}$. Derecha: $p=p_0+\rho_{\text{agua}}g\,h_{\text{agua}}$. Arriba de ambas, aire a $p_0$.
4. **Igualar.** $\rho_{\text{aceite}}h_{\text{aceite}}=\rho_{\text{agua}}h_{\text{agua}}$ ⇒ $h_{\text{aceite}}=\dfrac{\rho_{\text{agua}}}{\rho_{\text{aceite}}}h_{\text{agua}}$.
5. **Valor (con $\rho_{\text{aceite}}\approx850$ kg/m³, como sugiere U).** $h_{\text{aceite}}=1{,}18\,h_{\text{agua}}$: el aceite, menos denso, necesita una columna más alta para producir la misma presión.

**Receta.** En un tubo en U con dos líquidos: igualar presiones al nivel de la interfase (el punto más bajo donde a ambos lados hay el mismo fluido) ⇒ $\rho_1h_1=\rho_2h_2$.

**Error típico.** Igualar presiones a una altura donde a cada lado hay un fluido distinto (por ejemplo, en la superficie del agua del brazo derecho): ahí las presiones no son iguales.

**Figura SVG sugerida.** Tubo en U con el aceite (color `--A`) a la izquierda y el agua (`--U`) a la derecha; línea discontinua horizontal en la interfase marcada «misma $p$»; cotas $h_{\text{aceite}}$ (más alta) y $h_{\text{agua}}$, cociente 1,18.

Teoría: U §12.2 pp. 373–375 (12.6).

---

### U3. Ejemplo 12.5 — la estatua de oro (flotación con tensión) (U pp. 377–378)

**Enunciado (resumen fiel).** Se iza una estatua de oro macizo de 15,0 kg desde un barco hundido. ¿Qué tensión hay en el cable (masa despreciable) cuando la estatua está a) en reposo y totalmente sumergida en agua de mar, b) en reposo fuera del agua?

**Solución.**

1. **Modelo.** La estatua está en reposo ⇒ $\sum F_y=0$ (primera ley de Newton). Tres fuerzas: peso $mg$ (abajo), tensión $T$ (arriba) y empuje $B$ (arriba) = peso del fluido desplazado (Arquímedes, U p. 376).
2. **Volumen.** Totalmente sumergida desplaza su propio volumen: $V=m/\rho_{\text{oro}}=15{,}0/19{,}3\times10^3=7{,}77\times10^{-4}$ m³ (tabla 12.1).
3. **Empuje en el mar.** $B=\rho_{\text{mar}}Vg=(1030)(7{,}77\times10^{-4})(9{,}8)=$ **7,84 N**.
4. **a)** $T+B-mg=0$ ⇒ $T=147-7{,}84=139{,}2$ ≈ **139 N** ($mg=147$ N).
5. **b) En el aire.** $B_{\text{aire}}=(1{,}2)(7{,}77\times10^{-4})(9{,}8)=9{,}1\times10^{-3}$ N, despreciable ⇒ $T=$ **147 N**.
6. **Interpretación.** El empuje depende de la densidad **del fluido**, no de la del cuerpo; la tensión sumergida es el «peso aparente».

**Receta.** Cuerpo colgado y sumergido: $T=mg-\rho_{\text{fluido}}Vg$, con $V=m/\rho_{\text{cuerpo}}$ si está entero dentro.

**Error típico.** Usar la densidad del oro en el empuje, o poner $B$ hacia abajo.

**Figura SVG sugerida.** DCL de la estatua: $T=139$ N y $B=7{,}84$ N hacia arriba, $mg=147$ N hacia abajo (rótulo «no a escala» si se exagera $B$).

Teoría: U §12.3 pp. 376–378.

---

### U4. Ejemplo 12.7 — presión del agua en el hogar (U pp. 383–384)

**Enunciado (resumen fiel).** El agua entra en una casa por un tubo de 2,0 cm de diámetro a presión absoluta $4{,}0\times10^5$ Pa y rapidez 1,5 m/s. Un tubo de 1,0 cm lleva el agua al baño del segundo piso, 5,0 m más arriba. Calcule la rapidez, la presión y el caudal en el baño.

**Solución.**

1. **Modelo.** Agua: incompresible, flujo estable, fricción despreciable (tubos anchos) ⇒ valen continuidad (12.10) y Bernoulli (12.17) (U pp. 380 y 382). Punto 1: entrada ($y_1=0$); punto 2: baño ($y_2=5{,}0$ m).
2. **Continuidad primero** (es la que da la velocidad desconocida): $v_2=v_1\dfrac{A_1}{A_2}=v_1\left(\dfrac{d_1}{d_2}\right)^2=1{,}5\cdot4=$ **6,0 m/s**. El área va con el **cuadrado** del diámetro.
3. **Bernoulli** despejando $p_2$: $p_2=p_1-\tfrac12\rho(v_2^2-v_1^2)-\rho g(y_2-y_1)$.
4. **Números.** $\tfrac12(1000)(36-2{,}25)=1{,}69\times10^4$ Pa; $\rho g\,(5{,}0)=4{,}90\times10^4$ Pa ⇒ $p_2=4{,}0\times10^5-0{,}17\times10^5-0{,}49\times10^5=3{,}34\times10^5$ ≈ **3,3×10⁵ Pa**.
5. **Caudal.** $Q=A_2v_2=\pi(0{,}50\times10^{-2})^2(6{,}0)=4{,}7\times10^{-4}$ m³/s = **0,47 L/s**.
6. **Comprobación física.** Subir (energía potencial) y acelerar (energía cinética) «cuestan» presión: las dos correcciones restan. Con el grifo cerrado ($v=0$), $p_2=4{,}0\times10^5-0{,}49\times10^5=3{,}5\times10^5$ Pa.

**Receta.** Tubería con dos secciones y dos alturas: continuidad ⇒ velocidad desconocida; Bernoulli ⇒ presión desconocida; caudal $=Av$ en cualquier sección.

**Error típico.** Usar el cociente de diámetros (factor 2) en lugar del de áreas (factor 4); restar presiones absolutas de un lado y manométricas del otro.

**Figura SVG sugerida.** Esquema de dos tramos de tubo a 0 y 5,0 m, con barras de «presupuesto de presión»: $4{,}0\times10^5$ → $-0{,}17\times10^5$ (cinética) → $-0{,}49\times10^5$ (altura) → $3{,}3\times10^5$ Pa.

Teoría: U §12.4 p. 380; §12.5 p. 382 (Estrategia 12.1).

---

### U5. Ejemplo 12.9 — el medidor Venturi (U p. 384)

**Enunciado (resumen fiel).** Un medidor Venturi (tubo con un estrechamiento o «garganta») lleva dos tubos verticales abiertos, uno en la parte ancha (punto 1, área $A_1$) y otro en la garganta (punto 2, área $A_2$). Deduzca la rapidez $v_1$ en función de $A_1$, $A_2$ y la diferencia de altura $h$ del líquido en los dos tubos verticales.

**Solución.**

1. **Tres herramientas, una por incógnita.** Bernoulli relaciona presiones y velocidades; continuidad relaciona $v_1$ y $v_2$; la hidrostática de los tubos verticales convierte la diferencia de presión en una altura medible.
2. **Bernoulli con $y_1=y_2$** (tubo horizontal): $p_1+\tfrac12\rho v_1^2=p_2+\tfrac12\rho v_2^2$.
3. **Continuidad:** $v_2=(A_1/A_2)v_1$. Sustituyendo: $p_1-p_2=\tfrac12\rho v_1^2\left[\left(\dfrac{A_1}{A_2}\right)^2-1\right]$.
4. **Tubos verticales** (12.6): cada uno sube hasta que su columna equilibra la presión de su punto ⇒ $p_1-p_2=\rho gh$.
5. **Igualar y despejar:** $v_1=\sqrt{\dfrac{2gh}{(A_1/A_2)^2-1}}$ (comprobado con sympy).
6. **Ejemplo numérico (propio).** Con $A_1/A_2=2$ y $h=10{,}0$ cm: $v_1=\sqrt{2(9{,}8)(0{,}10)/3}=0{,}81$ m/s y $v_2=1{,}62$ m/s.
7. **Interpretación.** En la garganta la velocidad es mayor y la presión menor: la diferencia de presión empuja al fluido hacia la garganta (lo acelera) y lo frena a la salida.

**Receta.** Medidor de caudal: Bernoulli a la misma altura + continuidad + $\Delta p=\rho gh$ del manómetro; despejar $v_1$.

**Error típico.** Pensar que la presión es mayor donde el tubo es más estrecho («se aprieta»): es al revés.

**Figura SVG sugerida.** Venturi con los dos tubos verticales; columna más alta sobre la parte ancha, diferencia $h$ marcada; flechas $v_1$ (corta) y $v_2$ (larga, doble).

Teoría: U §12.4 p. 380; §12.5 pp. 382–384.

---

## PARTE C — Problemas del solucionario (E), traducidos y ampliados, de más fácil a más difícil

### E1. Ejercicio 12.2 — cubo con un agujero: densidad y peso original (Solucionario 12-1)

**Enunciado (U p. 390, Ej. 12.2).** Un cubo de 5,0 cm de lado está hecho de una aleación metálica. Tras taladrarle de lado a lado un orificio cilíndrico de 2,0 cm de diámetro, perpendicular a una cara, el cubo pesa 6,30 N. a) ¿Cuál es la densidad del metal? b) ¿Cuánto pesaba el cubo antes de taladrarlo?

**Solución.**

1. **Qué objeto conocemos.** El peso 6,30 N es el del cubo **ya agujereado**; su volumen es el del cubo menos el del cilindro (de radio 1,0 cm y longitud igual al lado, 5,0 cm, porque atraviesa el cubo).
2. **Volumen de metal.** $V=L^3-\pi r^2L=125-\pi(1{,}0)^2(5{,}0)=125-15{,}7=109{,}3\ \text{cm}^3=1{,}093\times10^{-4}$ m³ (1 cm³ = 10⁻⁶ m³).
3. **Masa.** De $w=mg$: $m=6{,}30/9{,}8=0{,}643$ kg.
4. **a) Densidad (12.1).** $\rho=m/V=0{,}643/1{,}093\times10^{-4}=5{,}88\times10^3$ ≈ **5,9×10³ kg/m³**. Comprobación con la tabla 12.1: entre el aluminio (2,7×10³) y el hierro (7,8×10³), razonable para una aleación.
5. **b) Cubo macizo.** Mismo metal ⇒ misma densidad: $m_0=\rho L^3=(5{,}88\times10^3)(1{,}25\times10^{-4})=0{,}735$ kg ⇒ $w_0=m_0g=$ **7,2 N**.
6. **Atajo.** El agujero quita $\pi r^2L/L^3=12{,}6\,\%$ del volumen ⇒ $w_0=6{,}30/(1-0{,}126)=7{,}2$ N.

**Resultado.** $\rho\approx5{,}9\times10^3$ kg/m³; $w_0\approx7{,}2$ N.

**Receta.** Densidad = masa del objeto real / volumen del objeto real (descontando huecos); después, la densidad es la propiedad del material que sirve para cualquier otra pieza.

**Error típico.** Dividir la masa del cubo agujereado entre el volumen del cubo entero; olvidar pasar cm³ a m³.

**Figura SVG sugerida.** Cubo en perspectiva con el cilindro pasante: cotas $L=5{,}0$ cm, $d=2{,}0$ cm; rótulo $V=125-15{,}7=109$ cm³.

Teoría: U §12.1 p. 370 (12.1, tabla 12.1).

---

### E2. Ejercicio 12.11 — altura mínima de la bolsa de suero (Solucionario 12-3)

**Enunciado (U p. 391, Ej. 12.11).** En la alimentación intravenosa se inserta una aguja en una vena del brazo y se conecta con un tubo a un depósito de fluido (densidad 1050 kg/m³) situado a una altura $h$ sobre el brazo; el depósito está abierto a la atmósfera por arriba. Si la presión manométrica en la vena es de 5980 Pa, ¿qué valor mínimo de $h$ permite que el fluido entre en la vena? (Suponga la aguja lo bastante ancha como para despreciar la viscosidad.)

**Solución.**

1. **Condición física.** El fluido entra si la presión en la punta de la aguja es al menos la de la sangre de la vena; en el caso límite, fluido en reposo con las dos presiones iguales ⇒ se puede usar hidrostática.
2. **Presión en la aguja (12.6).** La superficie del depósito está a $p_{atm}$; la aguja está a profundidad $h$ bajo ella: $p=p_{atm}+\rho gh$ ⇒ manométrica $\rho gh$.
3. **Igualar manométricas.** $\rho gh=5980$ Pa (la presión de la vena también es manométrica: comparamos lo mismo con lo mismo).
4. **Despejar.** $h=5980/(1050\cdot9{,}8)=$ **0,581 m**.
5. **Sentido.** Por eso las bolsas cuelgan de un soporte alto, a más de medio metro sobre el brazo.

**Receta.** «¿A qué altura debe estar el depósito para vencer una presión $p$?»: $h=p_{\text{man}}/(\rho g)$.

**Error típico.** Sumar $p_{atm}$ a un lado y no al otro (mezclar absoluta y manométrica).

**Figura SVG sugerida.** Bolsa a $h=0{,}581$ m sobre el brazo, tubo hasta la vena; a la derecha, comparación «$\rho gh$ = 5980 Pa».

Teoría: U §12.2 p. 373 (12.6; absoluta/manométrica).

---

### E3. Ejercicio 12.24 — elevador hidráulico II: presión necesaria (Solucionario 12-6)

**Enunciado (U p. 392, Ej. 12.24).** El pistón de un elevador hidráulico para autos tiene 0,30 m de diámetro. ¿Qué presión manométrica, en pascales y en atmósferas, se necesita para levantar un auto de 1200 kg?

**Solución.**

1. **DCL del pistón (con el auto encima), subiendo a velocidad constante o en equilibrio.** Arriba: fuerza del aceite $pA$ (presión absoluta). Abajo: peso $w=mg$ y el aire de encima, $p_{atm}A$.
2. **$\sum F_y=0$:** $pA-p_{atm}A-mg=0$ ⇒ $p-p_{atm}=mg/A$. **La atmósfera se cancela sola** y queda exactamente la manométrica.
3. **Área.** $A=\pi r^2=\pi(0{,}15)^2=0{,}0707$ m² (radio = mitad del diámetro).
4. **Número.** $p_{\text{man}}=(1200)(9{,}8)/0{,}0707=1{,}66\times10^5$ Pa ≈ **1,7×10⁵ Pa**.
5. **En atmósferas.** $1{,}66\times10^5/1{,}013\times10^5=$ **1,64 atm** (≈ 1,6 atm).

**Receta.** Pistón en equilibrio con aire por el otro lado: $p_{\text{man}}=F/A$.

**Error típico.** Usar el diámetro como radio (da una presión 4 veces menor); dar la absoluta (2,7 atm) cuando se pide la manométrica.

**Figura SVG sugerida.** DCL del pistón: $p_{\text{man}}A=1{,}18\times10^4$ N hacia arriba y $mg=1{,}18\times10^4$ N hacia abajo.

Teoría: U §12.2 pp. 371 y 373 (12.3; manométrica).

---

### E4. Ejercicio 12.23 — elevador hidráulico I: relación de diámetros (Solucionario 12-6)

**Enunciado (U p. 392, Ej. 12.23).** En el elevador hidráulico de la figura 12.7, ¿qué proporción debe haber entre el diámetro del recipiente bajo el auto y el diámetro del recipiente donde se aplica $F_1$, para que el auto de 1520 kg pueda levantarse con una fuerza $F_1$ de solo 125 N?

**Solución.**

1. **Ley de Pascal (U p. 373).** La presión aplicada se transmite igual a todo el fluido: $p=F_1/A_1=F_2/A_2$ (12.7) (los dos pistones a la misma altura).
2. **Fuerza necesaria.** $F_2=mg=(1520)(9{,}8)=1{,}49\times10^4$ N.
3. **Cociente de áreas.** $A_2/A_1=F_2/F_1=1{,}49\times10^4/125=119$.
4. **Pasar a diámetros.** $A=\pi D^2/4$ ⇒ $A_2/A_1=(D_2/D_1)^2$ ⇒ $D_2/D_1=\sqrt{119}=$ **10,9**.
5. **Conservación de la energía (comprobación).** El trabajo es el mismo en los dos pistones: para subir el auto 1 cm hay que bajar el pistón pequeño 119 cm. La prensa multiplica la fuerza, no el trabajo.

**Receta.** Pascal: $F_2/F_1=A_2/A_1=(D_2/D_1)^2$.

**Error típico.** Dar 119 (cociente de áreas) como cociente de diámetros.

**Figura SVG sugerida.** Elevador con dos pistones (diámetros en proporción 1 : 10,9 — o el recorte de la fig. 12.7 de U) y rótulos $F_1=125$ N, $F_2=1{,}49\times10^4$ N, «misma $p$».

Teoría: U §12.2 p. 373 (ley de Pascal, 12.7).

---

### E5. Ejercicio 12.26 — líquido de densidad mínima en el que flota una roca (Solucionario 12-6 y 12-7)

**Enunciado (U p. 392, Ej. 12.26).** Una roca tiene una masa de 1,80 kg. Cuando se cuelga de una cuerda y se sumerge totalmente en agua, la tensión es de 12,8 N. ¿Cuál es la menor densidad de un líquido en el que la roca flota?

**Solución.**

1. **Paso 1: volumen de la roca a partir del agua.** Equilibrio sumergida: $T+B=mg$ ⇒ $B=mg-T=17{,}64-12{,}8=4{,}84$ N. Arquímedes: $B=\rho_wVg$ ⇒ $V=4{,}84/(1000\cdot9{,}8)=4{,}94\times10^{-4}$ m³.
2. **Densidad de la roca.** $\rho_{\text{roca}}=m/V=1{,}80/4{,}94\times10^{-4}=3{,}64\times10^3$ kg/m³.
3. **Paso 2: condición de flotar.** Para que la roca flote sin cuerda, el empuje máximo (totalmente sumergida) debe igualar al menos su peso: $\rho_{\text{liq}}Vg\ge mg$ ⇒ $\rho_{\text{liq}}\ge m/V=\rho_{\text{roca}}$.
4. **Resultado.** $\rho_{\text{liq,mín}}=\rho_{\text{roca}}=\rho_w\dfrac{mg}{mg-T}=$ **3,64×10³ kg/m³** (3645 sin redondear). Un líquido más denso (p. ej. mercurio, 13,6×10³) la haría flotar con parte fuera.
5. **Idea clave.** Un cuerpo flota en un líquido si y solo si su densidad media es menor o igual que la del líquido (U p. 377).

**Receta.** «¿Flota?» ⇒ comparar densidades. Una pesada en agua con cuerda da el volumen: $V=(mg-T)/(\rho_wg)$.

**Error típico.** Usar la tensión 12,8 N como si fuera el empuje.

**Figura SVG sugerida.** Dos DCL lado a lado: en agua ($T=12{,}8$ N, $B=4{,}84$ N, $mg=17{,}6$ N) y en el líquido límite ($B=mg=17{,}6$ N, $T=0$).

Teoría: U §12.3 pp. 376–377.

---

### E6. Ejercicio 12.35 — densidad de un líquido desconocido por pesadas (Solucionario 12-9 y 12-10)

**Enunciado (U p. 392, Ej. 12.35).** Una roca cuelga de un hilo ligero. En el aire la tensión es 39,2 N; totalmente sumergida en agua, 28,4 N; totalmente sumergida en un líquido desconocido, 21,5 N. Determine la densidad del líquido.

**Solución.**

1. **Por qué tres pesadas bastan.** La diferencia «aire − sumergido» es el empuje. El volumen de la roca es el mismo en ambos líquidos, así que los empujes están en la proporción de las densidades.
2. **Empuje en agua.** $B_w=39{,}2-28{,}4=10{,}8$ N ⇒ $V=B_w/(\rho_wg)=1{,}10\times10^{-3}$ m³.
3. **Empuje en el líquido.** $B_L=39{,}2-21{,}5=17{,}7$ N $=\rho_LVg$.
4. **Cociente (sin calcular $V$).** $\dfrac{\rho_L}{\rho_w}=\dfrac{B_L}{B_w}=\dfrac{17{,}7}{10{,}8}=1{,}64$ ⇒ $\rho_L=$ **1,64×10³ kg/m³**.
5. **Extra.** Densidad de la roca: $\rho_{\text{roca}}=\rho_w\cdot39{,}2/10{,}8=3{,}63\times10^3$ kg/m³.

**Receta.** $\rho_L=\rho_w\dfrac{w-T_L}{w-T_w}$ (método de la balanza hidrostática).

**Error típico.** Dividir las tensiones ($28{,}4/21{,}5$) en lugar de los empujes.

**Figura SVG sugerida.** Tres dinamómetros con la roca: 39,2 N (aire), 28,4 N (agua, $B=10{,}8$ N), 21,5 N (líquido, $B=17{,}7$ N).

Teoría: U §12.3 p. 376.

---

### E7. Ejercicio 12.33 — bloque en la interfase aceite-agua (Solucionario 12-8 y 12-9)

**Enunciado (U p. 392, Ej. 12.33).** Un bloque cúbico de madera de 10,0 cm de lado flota en la interfase entre aceite y agua con su cara inferior 1,50 cm bajo la interfase (figura E12.33). La densidad del aceite es 790 kg/m³. a) ¿Qué presión manométrica hay en la cara superior del bloque? b) ¿Y en la inferior? c) ¿Qué masa y densidad tiene el bloque? (Figura, comprobada en el PDF: la capa de aceite mide 10,0 cm de espesor y está abierta al aire; el bloque, de 10,0 cm, tiene 8,50 cm en el aceite y 1,50 cm en el agua, de modo que su cara superior está 1,50 cm bajo la superficie del aceite.)

**Solución.**

1. **Geometría.** Interfase a 10,0 cm bajo la superficie del aceite; cara inferior a 1,50 cm bajo la interfase ⇒ cara superior a $10{,}0+1{,}50-10{,}0=1{,}50$ cm bajo la superficie del aceite.
2. **a) Cara superior** (solo aceite encima, 12.6): $p_{\text{man}}=\rho_{\text{ac}}g(0{,}0150)=790\cdot9{,}8\cdot0{,}0150=$ **116 Pa**.
3. **b) Cara inferior: «escalera» de capas.** Se baja capa a capa sumando el $\rho gh$ de cada fluido (cada uno con su densidad): $p_{\text{man}}=\rho_{\text{ac}}g(0{,}100)+\rho_wg(0{,}0150)=774{,}2+147=$ **921 Pa**.
4. **c) Equilibrio del bloque.** Las caras laterales se compensan dos a dos. Verticalmente: $p_bA-p_tA-mg=0$. La diferencia de absolutas es igual a la de manométricas ($p_{atm}$ se cancela): $\Delta p=921-116=805$ Pa. Con $A=0{,}0100$ m²: $m=805\cdot0{,}0100/9{,}8=$ **0,821 kg**.
5. **Densidad.** $\rho=m/V=0{,}821/(0{,}100)^3=$ **821 kg/m³** (≈ 822 sin redondear).
6. **Comprobación con Arquímedes.** Masa de fluido desplazado: $790(0{,}0100)(0{,}0850)+1000(0{,}0100)(0{,}0150)=0{,}6715+0{,}150=0{,}8215$ kg = masa del bloque. La diferencia de presiones entre caras **es** el empuje: dos caminos, mismo resultado.

**Receta.** Varios fluidos apilados: $p=p_0+\sum\rho_ig h_i$ capa a capa. Empuje = (presión abajo − presión arriba) × área = peso del fluido desplazado (de cada fluido, su parte).

**Error típico.** Usar una sola densidad para toda la profundidad; olvidar que el aceite también desplaza (empuja) y calcular el empuje solo con el agua.

**Figura SVG sugerida.** Corte del recipiente: aceite 10,0 cm, agua debajo; bloque con 8,50 cm en el aceite y 1,50 cm en el agua; rótulos $p_t=116$ Pa, $p_b=921$ Pa; gráfica lateral $p(h)$ con dos tramos rectos de distinta pendiente (790·g y 1000·g).

Teoría: U §12.2 p. 373 (12.6); §12.3 p. 376.

---

### E8. Ejercicio 12.38 — continuidad en un tubo de sección variable (Solucionario 12-10)

**Enunciado (U p. 392, Ej. 12.38).** Fluye agua por un tubo de sección variable, llenándolo por completo. En el punto 1 el área es 0,070 m² y la rapidez 3,50 m/s. ¿Qué rapidez tiene el agua donde el área es a) 0,105 m²; b) 0,047 m²? c) Calcule el volumen de agua descargado por el extremo abierto en una hora.

**Solución.**

1. **Por qué continuidad.** El agua es incompresible y el tubo está lleno: lo que entra por una sección en un tiempo $dt$ sale por cualquier otra ⇒ $A_1v_1=A_2v_2$ (12.10).
2. **Caudal.** $Q=A_1v_1=0{,}070\cdot3{,}50=0{,}245$ m³/s, el mismo en todo el tubo (12.11).
3. **a)** $v=Q/A=0{,}245/0{,}105=$ **2,33 m/s** (sección mayor ⇒ más lento).
4. **b)** $v=0{,}245/0{,}047=$ **5,21 m/s** (sección menor ⇒ más rápido).
5. **c)** El caudal es el mismo también en la salida: $V=Qt=0{,}245\cdot3600=882$ m³ ≈ **8,8×10² m³**.

**Receta.** Calcular $Q=Av$ donde se conozcan ambos; en cualquier otra sección $v=Q/A$; volumen en un tiempo $t$: $Qt$.

**Error típico.** Pensar que hace falta el área de salida para el apartado c): no, el caudal es único.

**Figura SVG sugerida.** Tubo con tres secciones (0,105 / 0,070 / 0,047 m²) y flechas de velocidad proporcionales a 2,33 / 3,50 / 5,21 m/s.

Teoría: U §12.4 p. 380.

---

### E9. Ejercicio 12.44 — Torricelli: orificio en la pared de un tanque (Solucionario 12-12)

**Enunciado (U p. 393, Ej. 12.44).** Se hace un orificio circular de 6,00 mm de diámetro en el costado de un tanque grande de agua, 14,0 m por debajo del nivel del agua. El tanque está abierto al aire por arriba. Calcule a) la rapidez de salida y b) el volumen descargado por segundo.

**Solución.**

1. **Bernoulli entre la superficie (1) y el chorro justo fuera del orificio (2).** Ambos a $p_{atm}$ (superficie abierta; chorro libre en el aire) ⇒ las presiones se cancelan.
2. **Tanque grande:** por continuidad $v_1=(A_2/A_1)v_2\approx0$ (el nivel baja muy despacio).
3. **Queda** $\rho gh=\tfrac12\rho v_2^2$ ⇒ $v_2=\sqrt{2gh}$ (teorema de Torricelli, U p. 384): la misma rapidez que en caída libre desde la altura $h$; vale para un orificio lateral (U p. 384).
4. **a)** $v=\sqrt{2(9{,}8)(14{,}0)}=$ **16,6 m/s**.
5. **b)** $A=\pi d^2/4=\pi(6{,}00\times10^{-3})^2/4=2{,}83\times10^{-5}$ m² ⇒ $Q=Av=4{,}68\times10^{-4}$ m³/s ≈ **0,468 L/s**.

**Receta.** Tanque abierto, orificio a profundidad $h$: $v=\sqrt{2gh}$; caudal $Q=A_{\text{orificio}}\sqrt{2gh}$.

**Error típico.** Usar $h$ = altura del orificio sobre el suelo en vez de la profundidad bajo la superficie; usar el diámetro como radio.

**Figura SVG sugerida.** Tanque con nivel, orificio a 14,0 m bajo la superficie, chorro horizontal con $v=16{,}6$ m/s; analogía de una piedra que cae 14,0 m y llega con la misma rapidez.

Teoría: U §12.5 pp. 382–384 (12.17; Ej. 12.8).

---

### E10. Ejercicio 12.46 — Bernoulli con cambio de altura y de sección (Solucionario 12-12)

**Enunciado (U p. 393, Ej. 12.46).** En cierto punto de una tubería la rapidez del agua es 3,00 m/s y la presión manométrica $5{,}00\times10^4$ Pa. Calcule la presión manométrica en un segundo punto, 11,0 m más abajo que el primero, si el diámetro allí es el doble.

**Solución.**

1. **Continuidad.** Diámetro doble ⇒ área cuádruple ⇒ $v_2=v_1/4=0{,}750$ m/s.
2. **Bernoulli (12.17)** con $y_1-y_2=11{,}0$ m. Se pueden usar presiones manométricas en los dos puntos, porque $p_{atm}$ aparece a ambos lados y se cancela (Estrategia 12.1, U p. 382): $p_2=p_1+\tfrac12\rho(v_1^2-v_2^2)+\rho g(y_1-y_2)$.
3. **Términos.** Cinético: $\tfrac12(1000)(9-0{,}5625)=4{,}22\times10^3$ Pa. Altura: $(1000)(9{,}8)(11{,}0)=1{,}078\times10^5$ Pa.
4. **Resultado.** $p_2=5{,}00\times10^4+4{,}22\times10^3+1{,}078\times10^5=1{,}62\times10^5$ Pa (manométrica).
5. **Sentido.** Bajar y frenar hacen subir la presión: ambos términos suman. El término de altura domina (≈ 25 veces el cinético).

**Receta.** Bernoulli entre dos puntos de una tubería: (i) continuidad ⇒ $v_2$; (ii) $p_2=p_1+\tfrac12\rho(v_1^2-v_2^2)+\rho g(y_1-y_2)$ con todas las presiones del mismo tipo.

**Error típico.** Signo del término de altura (el punto más bajo tiene **más** presión); poner $v_2=v_1/2$ (cociente de diámetros).

**Figura SVG sugerida.** Tubería que baja 11,0 m y se ensancha al doble; rótulos $v_1=3{,}00$ m/s, $p_1=5{,}00\times10^4$ Pa; $v_2=0{,}750$ m/s, $p_2=1{,}62\times10^5$ Pa.

Teoría: U §12.4 p. 380; §12.5 p. 382.

---

### E11. Ejercicio 12.41 — tanque sellado con aire a presión (Solucionario 12-11)

**Enunciado (U p. 392, Ej. 12.41).** Un tanque sellado contiene agua de mar hasta una altura de 11,0 m y, sobre ella, aire a una presión manométrica de 3,00 atm. Sale agua por un orificio pequeño en el fondo. ¿Con qué rapidez sale?

**Solución.**

1. **Puntos.** 1 en la superficie del agua ($y_1=11{,}0$ m, $p_1=p_{atm}+3{,}00$ atm), 2 en el chorro a la salida ($y_2=0$, $p_2=p_{atm}$).
2. **$v_1\approx0$** por continuidad (orificio pequeño frente al tanque).
3. **Bernoulli:** $p_1+\rho gy_1=p_2+\tfrac12\rho v_2^2$ ⇒ $v_2=\sqrt{\dfrac{2(p_1-p_{atm})}{\rho}+2gy_1}$ (la forma general de U, Ej. 12.8, p. 384).
4. **Números** ($\rho_{\text{mar}}=1030$ kg/m³, $3{,}00$ atm $=3{,}039\times10^5$ Pa): $2(3{,}039\times10^5)/1030=590{,}1$ m²/s²; $2(9{,}8)(11{,}0)=215{,}6$ m²/s² ⇒ $v_2=\sqrt{805{,}7}=$ **28,4 m/s**.
5. **Comparación.** Con el tanque abierto ($\Delta p=0$), Torricelli daría $\sqrt{215{,}6}=14{,}7$ m/s: la sobrepresión del aire aporta casi tres veces más «energía por unidad de volumen» que la columna de agua.

**Receta.** Depósito presurizado: $v=\sqrt{2\,p_{\text{man,superficie}}/\rho+2gh}$. La sobrepresión equivale a una columna extra de altura $p_{\text{man}}/(\rho g)$ (aquí 30,1 m).

**Error típico.** Poner $p_1=3{,}00$ atm absoluta y $p_2=p_{atm}$ (mezclar tipos de presión); olvidar la columna de agua.

**Figura SVG sugerida.** Tanque cerrado con «aire, $p_{\text{man}}=3{,}00$ atm» arriba, 11,0 m de agua, chorro en el fondo con 28,4 m/s; columna fantasma de 30,1 m que representa la sobrepresión.

Teoría: U §12.5 pp. 382–384 (12.17; Ej. 12.8).

---

### E12. Ejercicio 12.50 — tubería viscosa: efecto de reducir el radio (Solucionario 12-13)

**Enunciado (U p. 393, Ej. 12.50).** Se necesita una diferencia de presión de $6{,}00\times10^4$ Pa para mantener un caudal de 0,800 m³/s de un fluido viscoso por un tramo de tubo cilíndrico de radio 0,210 m. ¿Qué diferencia de presión hace falta para el mismo caudal si el radio se reduce a 0,0700 m?

**Solución.**

1. **Por qué no Bernoulli.** Con viscosidad hay fricción interna: hace falta una diferencia de presión solo para mantener el flujo aunque la velocidad media no cambie. U da la ley de escala (p. 386): a caudal fijo, $\Delta p\propto L/R^4$.
2. **Mismo tubo, misma longitud, mismo caudal** ⇒ $\Delta p\,R^4=$ cte ⇒ $\Delta p_2=\Delta p_1(R_1/R_2)^4$.
3. **Números.** $R_1/R_2=0{,}210/0{,}0700=3$ ⇒ factor $3^4=81$ ⇒ $\Delta p_2=81\cdot6{,}00\times10^4=$ **4,86×10⁶ Pa** (≈ 48 atm).
4. **Sentido físico.** Reducir el radio a un tercio multiplica por 81 la presión necesaria (U pone el ejemplo de la mitad: ×16). Por eso un pequeño estrechamiento de una arteria obliga al corazón a trabajar mucho más.

**Receta.** Flujo viscoso en tubo, caudal fijo: $\Delta p\propto L/R^4$ ⇒ razonar con cocientes, sin necesidad de la viscosidad.

**Error típico.** Usar $R^2$ (como en la continuidad) en lugar de $R^4$.

**Figura SVG sugerida.** Dos tubos (radios 0,210 y 0,0700 m) con el mismo caudal y una barra de $\Delta p$: $6{,}00\times10^4$ Pa frente a $4{,}86\times10^6$ Pa (×81, «no a escala»).

Teoría: U §12.6 p. 386.

---

## Resumen de resultados (para la chuleta y las figuras)

| Ejercicio | Resultados |
|---|---|
| U Ej. 12.3 | $p=2{,}19\times10^5$ Pa (abs., 2,16 atm); $1{,}18\times10^5$ Pa (man., 1,16 atm) |
| U Ej. 12.4 | $h_{\text{aceite}}=(\rho_{\text{agua}}/\rho_{\text{aceite}})h_{\text{agua}}=1{,}18\,h_{\text{agua}}$ (aceite 850) |
| U Ej. 12.5 | $V=7{,}77\times10^{-4}$ m³; $B=7{,}84$ N; $T_{\text{mar}}=139$ N; $T_{\text{aire}}=147$ N |
| U Ej. 12.7 | $v_2=6{,}0$ m/s; $p_2=3{,}3\times10^5$ Pa; $Q=0{,}47$ L/s |
| U Ej. 12.9 | $v_1=\sqrt{2gh/((A_1/A_2)^2-1)}$; propio: $A_1/A_2=2$, $h=0{,}10$ m ⇒ 0,81 m/s |
| E 12.2 | $\rho=5{,}9\times10^3$ kg/m³; $w_0=7{,}2$ N |
| E 12.11 | $h=0{,}581$ m |
| E 12.24 | $1{,}66\times10^5$ Pa = 1,64 atm (≈1,7×10⁵ Pa ≈ 1,6 atm) |
| E 12.23 | $D_2/D_1=10{,}9$ ($A_2/A_1=119$) |
| E 12.26 | $V=4{,}94\times10^{-4}$ m³; $\rho_{\text{mín}}=\rho_{\text{roca}}=3{,}64\times10^3$ kg/m³ |
| E 12.35 | $\rho_L=1{,}64\times10^3$ kg/m³ ($\rho_{\text{roca}}=3{,}63\times10^3$) |
| E 12.33 | 116 Pa; 921 Pa; $m=0{,}821$ kg; $\rho=821$ kg/m³ |
| E 12.38 | 2,33 m/s; 5,21 m/s; 882 m³ ≈ 8,8×10² m³ |
| E 12.44 | 16,6 m/s; $4{,}68\times10^{-4}$ m³/s = 0,468 L/s |
| E 12.46 | $v_2=0{,}750$ m/s; $p_2=1{,}62\times10^5$ Pa (man.) |
| E 12.41 | 28,4 m/s (abierto: 14,7 m/s) |
| E 12.50 | $4{,}86\times10^6$ Pa (×81) |

---

## Ideas de interactivos three.js (2D)

**1. `flotacion` (2D, `{"dim":2}`) — presión con la profundidad y empuje.** Recipiente con un líquido de densidad $\rho_f$ (deslizador 700–13600 kg/m³: aceite, agua, agua de mar, glicerina, mercurio) y un bloque cúbico de lado $a$ y densidad $\rho_c$ (deslizador 100–20000 kg/m³). Interruptor «colgado de un hilo / libre».
- Libre: si $\rho_c<\rho_f$ flota con fracción sumergida $f=\rho_c/\rho_f$ (de $B=mg$); si $\rho_c\ge\rho_f$ va al fondo. Mostrar $f$ en %.
- Colgado y sumergido: $T=(\rho_c-\rho_f)a^3g$ (peso aparente; negativo ⇒ el hilo se afloja).
- Flechas: $mg=\rho_ca^3g$ (abajo) y $B=\rho_fV_{\text{sum}}g$ (arriba), y las fuerzas de presión $p_tA$ y $p_bA$ en las caras superior e inferior con $p=\rho_fgh$, para ver que $B=(p_b-p_t)A$.
- Gráfica lateral $p_{\text{man}}(h)=\rho_fgh$ (recta, pendiente $\rho_fg$) con los puntos de las dos caras. Valores de control (verificados): estatua de oro en agua de mar ($\rho_c=19300$, $V=7{,}77\times10^{-4}$ m³): $B=7{,}84$ N, $T=139$ N; roca de E 12.26: flota justo cuando $\rho_f=3645$ kg/m³. Usa `escalaX` en la gráfica $p$–$h$ (Pa frente a m).

**2. `torricelli` (2D) — Bernoulli en un depósito con orificio.** Depósito de altura de agua $H$ (deslizador 0,5–15 m) sobre el suelo, orificio lateral a profundidad $h$ (deslizador $0<h<H$) y sobrepresión del aire $p_{\text{man}}$ (deslizador 0–3 atm; con 0 ⇒ tanque abierto).
- Rapidez de salida $v=\sqrt{2p_{\text{man}}/\rho+2gh}$ (U Ej. 12.8); con $p_{\text{man}}=0$, $v=\sqrt{2gh}$.
- Chorro = tiro horizontal (tema 3): sale a altura $y_0=H-h$ y llega al suelo a distancia $x=v\sqrt{2y_0/g}$; con tanque abierto $x=2\sqrt{h(H-h)}$, máximo $x=H$ cuando $h=H/2$ (verificado con sympy).
- Caudal $Q=A_{\text{orificio}}v$ (deslizador del diámetro del orificio).
- Barra de «presupuesto» de Bernoulli en la superficie y en el chorro: $p$, $\rho gy$, $\tfrac12\rho v^2$ (suma constante).
Valores de control: E 12.44 ($h=14{,}0$ m ⇒ 16,6 m/s); E 12.41 ($h=11{,}0$ m, agua de mar, 3,00 atm ⇒ 28,4 m/s; abierto 14,7 m/s); $H=1$ m, $h=0{,}5$ m ⇒ $x=1{,}00$ m.

(Alternativa, si se prefiere una tercera: **`venturi`** — tubo horizontal con estrechamiento de cociente $A_1/A_2$ regulable; continuidad $v_2=(A_1/A_2)v_1$, $p_1-p_2=\tfrac12\rho v_1^2[(A_1/A_2)^2-1]$ y la diferencia de altura en los tubos verticales $h=(p_1-p_2)/(\rho g)$. Control: $A_1/A_2=2$, $v_1=0{,}81$ m/s ⇒ $h=0{,}10$ m.)

---

## Notas internas para el redactor (NO publicar en el HTML; regla 8 bis)

1. **No hay ejercicios X** para este tema: decirlo en el mapa del tema y no inventar convocatoria.
2. **Etiquetas de E confirmadas** contra el enunciado de U y la cap-página: 12.2 → 12-1; 12.11 → 12-3; 12.23 y 12.24 → 12-6; 12.26 → 12-6/12-7; 12.33 → 12-8/12-9; 12.35 → 12-9/12-10; 12.38 → 12-10; 12.41 → 12-11; 12.44 y 12.46 → 12-12; 12.50 → 12-13. En el texto extraído las etiquetas de 12.46 y otras aparecen desplazadas; la asignación es por contenido.
3. **E 12.24:** $1{,}66\times10^5$ Pa son **1,64 atm** (≈ 1,6 atm con dos cifras). Escribir directamente esos valores.
4. **E 12.44 b):** con $v$ sin redondear, $Q=4{,}68\times10^{-4}$ m³/s (0,468 L/s). Escribir este valor.
5. **E 12.38 c):** $0{,}245\cdot3600=882$ m³; escribir «882 m³ ≈ 8,8×10² m³».
6. **E 12.26:** 3645 kg/m³ sin redondear; escribir «3,64×10³ kg/m³». La interpretación «$\rho_{\text{mín}}=\rho_{\text{roca}}$» es ampliación propia (equivalente al resultado).
7. **E 12.33:** la geometría (aceite de 10,0 cm, cara superior a 1,50 cm bajo la superficie del aceite) está en la figura E12.33, no en el texto; se ha comprobado en la imagen (PDF 420). Conviene describirla en el enunciado o recortar la figura.
8. **U Ej. 12.4:** U no da la densidad del aceite en el enunciado; usa ≈ 850 kg/m³ solo en «Evaluar». El factor 1,18 es con ese valor.
9. **U Ej. 12.9:** el ejemplo numérico ($A_1/A_2=2$, $h=0{,}10$ m) es propio: marcarlo `data-l="P"`.
10. **Ecuaciones (12.8) y (12.9):** (12.8) está en la p. 374 y (12.9) en la p. 375.
11. **Figuras de U útiles para recortar** (PDF = impresa + 28): 12.7 elevador (p. 373), 12.8 manómetro/barómetro (p. 374), 12.10 tubo en U (p. 375), 12.11 Arquímedes (p. 376), 12.13 estatua (p. 377), 12.24 casa (p. 383), 12.25 tanque (p. 383), 12.26 Venturi (p. 384), E12.33 (p. 392).
