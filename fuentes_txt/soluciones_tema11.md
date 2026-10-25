# Soluciones Tema 11 — Equilibrio y elasticidad

Material para el redactor del tema 11. Todos los números se han comprobado con sympy (script propio de verificación, un bloque por ejercicio). Los enunciados de E se han tomado de U (`sears.txt`, págs. impresas 357–366; figuras E11.14, P11.46 y P11.83 comprobadas sobre la imagen del PDF) y las soluciones de `solman.txt` (la página 11-N del solucionario está en el PDF 367+N). Los ejemplos del libro y el Problema práctico se han leído en la imagen del PDF (págs. impresas 344, 345, 350 y 355). Los problemas E están traducidos y ampliados, no copiados.

Convenciones: si el enunciado no da $g$, se usa $g=9{,}8\ \text{m/s}^2$ (como U). «U p. NN» = página impresa del Sears-Zemansky. Sentido positivo de las torcas = antihorario (salvo que se diga otra cosa). Datos de materiales: tablas 11.1 (p. 349) y 11.2 (p. 351) de U.

## Herramientas de teoría que se usan

| Herramienta | Dónde |
|---|---|
| Primera condición de equilibrio $\sum\vec F=0$ (11.1) | U §11.1 p. 340 |
| Segunda condición de equilibrio $\sum\vec\tau=0$ respecto a **cualquier** punto (11.2) | U §11.1 p. 340 |
| Centro de masa $x_{cm}=\sum m_ix_i/\sum m_i$ (11.3), $\vec r_{cm}$ (11.4); el peso actúa en el cg (11.5) y, con $g$ uniforme, cg = cm | U §11.2 pp. 341–342 |
| Ecuaciones en el plano: $\sum F_x=0$, $\sum F_y=0$, $\sum\tau_z=0$ (11.6); el punto de referencia es libre: elegir el que elimina incógnitas | U §11.3 p. 343 |
| Estrategia para resolver problemas 11.1 (identificar, DCL, ejes, punto de torcas, evaluar con otro punto) | U §11.3 p. 344 |
| Torca $\tau=Fl=rF\sin\phi$ (10.2) | U §10.1 p. 305 |
| Fricción estática $f_s\le\mu_sn$ (5.4) | U §5.3 p. 144 |
| Ley de Hooke: esfuerzo/deformación = módulo (11.7) | U §11.4 p. 347 |
| Tensión: esfuerzo $F_\perp/A$ (11.8), deformación $\Delta l/l_0$ (11.9), $Y=\dfrac{F_\perp l_0}{A\,\Delta l}$ (11.10); vale igual en compresión | U §11.4 pp. 348–350 |
| Volumétrico: $p=F_\perp/A$ (11.11), $\Delta V/V_0$ (11.12), $B=-\dfrac{\Delta p}{\Delta V/V_0}$ (11.13), $k=1/B$ (11.14) | U §11.4 pp. 350–351 |
| Corte: esfuerzo $F_\parallel/A$ (11.15), deformación $x/h$ (11.16), $S=\dfrac{F_\parallel h}{A\,x}$ (11.17) | U §11.4 p. 352 |
| Tabla 11.1 ($Y$, $B$, $S$: acero $20$, $16$, $7{,}5\times10^{10}$ Pa; cobre $11$, $14$, $4{,}4\times10^{10}$ Pa) y Tabla 11.2 (agua $k=46{,}4\times10^{-6}$ atm$^{-1}$) | U pp. 349 y 351 |

---

## PARTE A — Problemas de examen (X)

**No hay ningún ejercicio de examen real para el Tema 11.** El índice `fuentes_txt/examenes_por_tema.md` dice «Ningún ejercicio de examen encontrado» y el dossier lo ha comprobado convocatoria por convocatoria (2018–2025): ningún examen trata equilibrio de cuerpos rígidos, centro de gravedad ni elasticidad. En el HTML hay que decirlo así, y los ejercicios resueltos son los ejemplos de U (Parte B) y los problemas de E (Parte C). No presentar ninguno como «de examen».

---

## PARTE B — Ejemplos del libro U y Problema práctico (verificados)

### U1. Ejemplo 11.2 — localizar el centro de gravedad en la plancha (U p. 344)

**Enunciado (resumen fiel).** Un atleta en posición de plancha, de 1,80 m de altura, se apoya sobre los dedos de los pies y los antebrazos; dos básculas indican que el 66,0 % de su peso $w$ cae en los antebrazos y el 34,0 % en los dedos de los pies. La distancia de los dedos de los pies a la mitad de los antebrazos es 1,53 m. ¿A qué distancia de los dedos de los pies está su centro de gravedad?

**Solución.**

1. **Modelo.** El atleta está en reposo y no gira: cuerpo rígido en equilibrio, valen (11.6) (U p. 343). Su peso actúa en el cg (U p. 342), que tiene que estar entre los dos apoyos.
2. **DCL.** Fuerzas verticales: $n_T=0{,}340w$ (dedos, punto T), $n_F=0{,}660w$ (antebrazos, a 1,53 m de T), peso $w$ a distancia $L_{cg}$ de T. No hay fuerzas horizontales ⇒ $\sum F_x=0$ se cumple sola. $\sum F_y=0{,}340w+0{,}660w-w=0$ también se cumple (por eso las básculas suman el 100 %).
3. **Punto de torcas en T.** Así $n_T$ no da torca (brazo cero) y la única incógnita es $L_{cg}$. Antihorario +: $\sum\tau_T=0{,}340w(0)-wL_{cg}+0{,}660w(1{,}53\ \text{m})=0$.
4. **Resultado.** $L_{cg}=0{,}660\cdot1{,}53=1{,}0098\ \text{m}\approx$ **1,01 m** desde los dedos de los pies. El peso $w$ se simplifica: no hace falta conocerlo.
5. **Comprobación con otro punto (Estrategia 11.1, «Evaluar»).** Respecto a F: $-0{,}340w(1{,}53)+w(1{,}53-L_{cg})=0$ ⇒ $1{,}53-L_{cg}=0{,}520$ m ⇒ $L_{cg}=1{,}01$ m. Coincide.

**Receta.** Para localizar un cg con dos apoyos: torcas respecto a un apoyo; la fracción del peso que soporta el **otro** apoyo × la distancia entre apoyos = distancia del cg al primero.

**Error típico.** Tomar torcas respecto al cg desconocido (aparecen dos incógnitas) o creer que el apoyo que más carga está más lejos del cg (es al revés: está más cerca).

Teoría: U §11.2–11.3 pp. 341–344.

---

### U2. Ejemplo 11.3 — ¿se deslizará la escalera? (U p. 345)

**Enunciado (resumen fiel).** Sir Lancelot (800 N) sube por una escalera uniforme de 5,0 m y 180 N apoyada contra una pared vertical **sin fricción**; la escalera forma 53,1° con la horizontal. Se para a un tercio del camino. a) Fuerzas normal y de fricción en la base. b) Coeficiente de fricción estática mínimo para que no deslice. c) Módulo y dirección de la fuerza de contacto en la base.

**Solución.**

1. **Geometría.** 53,1° es el ángulo del triángulo 3-4-5: con la escalera de 5,0 m, la base está a 3,0 m de la pared y el apoyo superior a 4,0 m de altura. El peso de la escalera actúa en su centro (horizontal 1,5 m desde la base B); Lancelot está a $5/3$ m a lo largo de ella ⇒ horizontal $\tfrac13\cdot3{,}0=1{,}0$ m.
2. **DCL.** Pared lisa: solo una normal horizontal $n_1$ (hacia fuera de la pared). Suelo: normal $n_2$ hacia arriba y fricción $f_s$ hacia la pared (impide que la base resbale hacia fuera). Pesos 180 N y 800 N. Tres incógnitas: $n_1,n_2,f_s$.
3. **Fuerzas (11.6).** $\sum F_x=f_s-n_1=0$; $\sum F_y=n_2-800-180=0$ ⇒ $n_2=$ **980 N**.
4. **Torcas respecto a B**, porque ahí actúan $n_2$ y $f_s$ (dos incógnitas fuera de la ecuación). Brazo de $n_1$: la altura 4,0 m; brazos de los pesos: sus distancias horizontales. $\sum\tau_B=n_1(4{,}0)-180(1{,}5)-800(1{,}0)=0$ ⇒ $n_1=1070/4{,}0=267{,}5$ N ≈ **268 N**, y $f_s=n_1=$ **268 N**.
5. **b)** No deslizar exige $f_s\le\mu_sn_2$ (5.4, U p. 144) ⇒ $\mu_s\ge f_s/n_2=267{,}5/980=0{,}273$ ⇒ $(\mu_s)_{mín}\approx$ **0,27**.
6. **c)** Fuerza de contacto en B = suma vectorial de normal y fricción: $\vec F_B=(267{,}5\ \text{N})\hat\imath+(980\ \text{N})\hat\jmath$; $F_B=\sqrt{267{,}5^2+980^2}=1016\ \text{N}\approx$ **1,02×10³ N**; $\theta=\arctan(980/267{,}5)=74{,}7^\circ\approx$ **75°** sobre la horizontal. No va a lo largo de la escalera (53,1°): si fuera así, su torca respecto al extremo superior sería cero y la de los pesos no quedaría compensada.

**Nota de redondeo (para el redactor).** El libro da $F_B=1020$ N: es $1016$ N redondeado a tres cifras significativas ($1{,}02\times10^3$ N). Escribir «$\approx1{,}02\times10^3$ N (1016 N)».

**Receta.** Escalera contra pared lisa: $\sum F_y$ da la normal del suelo; torcas respecto al pie dan la normal de la pared; $\sum F_x$ iguala fricción y normal de la pared; al final, $\mu_s\ge f_s/n_2$.

**Error típico.** Poner fricción en la pared lisa; usar como brazo de palanca la longitud a lo largo de la escalera en vez de la distancia perpendicular (horizontal para los pesos, vertical para $n_1$).

Teoría: U §11.3 pp. 343–345; §5.3 p. 144.

---

### U3. Ejemplo 11.5 — esfuerzo y deformación por tensión (U p. 350)

**Enunciado (resumen fiel).** Una varilla de acero de 2,0 m de longitud y área transversal 0,30 cm² se cuelga de un soporte y del otro extremo se cuelga una fresadora de 550 kg. Determine el esfuerzo, la deformación y el alargamiento.

**Solución.**

1. **Esfuerzo (11.8).** $F_\perp=mg=550\cdot9{,}8=5390$ N; $A=0{,}30\ \text{cm}^2=3{,}0\times10^{-5}\ \text{m}^2$ (1 cm² = $10^{-4}$ m²). $\sigma=F_\perp/A=1{,}797\times10^{8}\ \text{Pa}\approx$ **1,8×10⁸ Pa**.
2. **Deformación (de 11.10, $\Delta l/l_0=\sigma/Y$).** Acero, $Y=20\times10^{10}$ Pa (tabla 11.1): $1{,}797\times10^8/2{,}0\times10^{11}=8{,}98\times10^{-4}\approx$ **9,0×10⁻⁴**.
3. **Alargamiento.** $\Delta l=(\Delta l/l_0)\,l_0=8{,}98\times10^{-4}\cdot2{,}0=1{,}80\times10^{-3}$ m = **1,8 mm**.

**Nota de redondeo.** Con los valores sin redondear: $\sigma=1{,}797\times10^8$ Pa, $\varepsilon=8{,}98\times10^{-4}$, $\Delta l=1{,}797$ mm; el libro da 1,8×10⁸ Pa, 9,0×10⁻⁴ y 1,8 mm (dos cifras, como los datos). Se desprecia el peso propio de la varilla. La masa es 550 kg.

**Receta.** Pasar el área a m²; esfuerzo = $F/A$; deformación = esfuerzo/$Y$; alargamiento = deformación × $l_0$.

**Error típico.** Dejar el área en cm² (error de $10^4$); usar la masa en vez del peso.

Teoría: U §11.4 pp. 347–350, tabla 11.1 p. 349.

---

### U4. Problema práctico «En equilibrio y bajo esfuerzo» (U p. 355, figura 11.21)

**Enunciado (literal).** Una varilla sólida horizontal y uniforme de cobre de longitud inicial $l_0$, área transversal $A$, módulo de Young $Y$, módulo volumétrico $B$, módulo de corte $S$ y masa $m$ está sostenida por un pivote sin fricción en su extremo derecho y por un cable a una distancia $l_0/4$ del extremo izquierdo (figura 11.21). Tanto el pivote como el cable se sujetan de modo que ejercen sus fuerzas de manera uniforme sobre la sección transversal de la varilla. El cable forma un ángulo $\theta$ con la varilla y la comprime. a) Calcule la tensión en el cable. b) Calcule la magnitud y dirección de la fuerza ejercida por el pivote en el extremo derecho de la varilla. ¿Cómo se compara esta magnitud con la tensión del cable? ¿Cómo se compara el ángulo calculado con $\theta$? c) Determine el cambio de longitud de la varilla causado por los esfuerzos ejercidos por el cable y el pivote (el cambio de longitud es pequeño en comparación con la longitud original $l_0$). d) ¿En qué factor aumentaría su respuesta del inciso c) si la varilla fuera dos veces más larga, pero tuviera la misma sección transversal?

(Figura: la varilla está horizontal con el pivote en el extremo derecho, junto a la pared; el cable sale del punto a $l_0/4$ del extremo izquierdo y sube hacia la derecha hasta la pared, formando el ángulo $\theta$ con la varilla.)

**Solución.**

1. **DCL (guía de U, paso 1).** Eje $x$ a lo largo de la varilla hacia la pared, $y$ hacia arriba; origen en el extremo izquierdo. Fuerzas: peso $mg$ en el centro ($x=l_0/2$, la varilla es uniforme, U p. 342); tensión $T$ en $x=l_0/4$, dirigida hacia la pared y hacia arriba: componentes $(T\cos\theta,\ T\sin\theta)$; fuerza del pivote $(P_x,P_y)$ en $x=l_0$, de dirección desconocida (por eso se ponen dos componentes). Incógnitas: $T,P_x,P_y$ ⇒ las tres ecuaciones (11.6).
2. **a) Torcas respecto al pivote** (elimina $P_x$ y $P_y$, sugerencia del paso 4 de la guía). La componente horizontal de $T$ está sobre la recta de la varilla, que pasa por el pivote: su torca es cero. Brazos: $T\sin\theta$ a $\tfrac34l_0$ del pivote; $mg$ a $\tfrac12l_0$. $T\sin\theta\cdot\tfrac34l_0=mg\cdot\tfrac12l_0$ ⇒ $$T=\frac{2mg}{3\sin\theta}.$$
3. **b) Fuerzas.** $\sum F_x=T\cos\theta+P_x=0$ ⇒ $P_x=-\dfrac{2mg}{3\tan\theta}$ (el pivote empuja **alejándose de la pared**: el cable aprieta la varilla contra él). $\sum F_y=T\sin\theta+P_y-mg=0$ ⇒ $P_y=mg-\tfrac23mg=\dfrac{mg}{3}$ (hacia arriba).
4. **Módulo y ángulo.** $P=\dfrac{mg}{3}\sqrt{\dfrac{4}{\tan^2\theta}+1}$. Ángulo $\phi$ sobre la horizontal (apuntando en sentido contrario a la pared): $\tan\phi=\dfrac{P_y}{|P_x|}=\dfrac{\tan\theta}{2}$.
5. **Comparación con $T$ (paso 5 de la guía).** $T=\dfrac{mg}{3}\cdot\dfrac{2}{\sin\theta}=\dfrac{mg}{3}\sqrt{\dfrac{4}{\tan^2\theta}+4}$. Como $1<4$, **$P<T$**; más precisamente $P/T=\sqrt{1-\tfrac34\sin^2\theta}$. Y como $\tan\phi=\tfrac12\tan\theta$, **$\phi<\theta$**. Interpretación (paso 6): el cable soporta $\tfrac23$ del peso y el pivote $\tfrac13$, lógico porque el cable está más cerca del centro de la varilla ($\tfrac14l_0$ frente a $\tfrac12l_0$).
6. **c) Qué tramo se comprime.** Las fuerzas horizontales sobre la varilla son $T\cos\theta$ (en $x=l_0/4$, hacia la pared) y $P_x$ (en $x=l_0$, hacia fuera): comprimen solo el tramo **entre el cable y el pivote**, de longitud $\tfrac34l_0$. El cuarto izquierdo no tiene fuerza axial (su extremo está libre). Fuerza de compresión $F_\perp=T\cos\theta=\dfrac{2mg}{3\tan\theta}$.
7. **Acortamiento (11.10 en compresión, U p. 350).** $|\Delta l|=\dfrac{F_\perp\,(\tfrac34l_0)}{AY}=\dfrac{2mg}{3\tan\theta}\cdot\dfrac{3l_0}{4AY}=$ $$|\Delta l|=\frac{mg\,l_0}{2AY\tan\theta}\quad(\text{acortamiento}).$$ Solo interviene $Y$: $B$ y $S$ son datos que no hacen falta (el esfuerzo es de compresión lineal, no volumétrico ni de corte).
8. **d) Varilla el doble de larga, misma sección.** Misma densidad y misma $A$ ⇒ la masa también se duplica ($m\to2m$), y $l_0\to2l_0$ (cable a $l_0/4$ del nuevo extremo y mismo $\theta$). $|\Delta l|\propto m\,l_0$ ⇒ aumenta en un factor **4**.

**Comprobación numérica (propia, para la figura).** Con $m=1$ kg, $g=9{,}8$ m/s², $\theta=30^\circ$: $T=13{,}07$ N, $P_x=-11{,}32$ N, $P_y=3{,}27$ N, $P=11{,}78$ N $<T$, $\phi=16{,}1^\circ<30^\circ$.

**Receta.** Torcas respecto al pivote ⇒ $T$; fuerzas ⇒ componentes del pivote; para la deformación, identificar **qué tramo** soporta la fuerza axial y aplicar $\Delta l=F l/(AY)$ a ese tramo.

**Error típico.** Suponer que la fuerza del pivote va a lo largo de la varilla o del cable; aplicar la compresión a toda la longitud $l_0$; olvidar en d) que al duplicar la longitud también se duplica la masa.

Teoría: U §11.3 pp. 343–344; §11.4 pp. 348–350; figura 11.21 p. 355.

---

## PARTE C — Problemas del solucionario (E), traducidos y ampliados, de más fácil a más difícil

### E1. Ejercicio 11.1 — barra con dos masas: dónde poner el apoyo (Solucionario 11-1)

**Enunciado (U p. 357, Ej. 11.1).** Una barra uniforme de 50,0 cm de longitud y 0,120 kg tiene adherida una masa pequeña de 0,055 kg a su extremo izquierdo, y una masa pequeña de 0,110 kg pegada al otro extremo. Las dos masas se consideran partículas puntuales. Usted quiere equilibrar horizontalmente este sistema sobre un apoyo colocado justamente debajo de su centro de gravedad. ¿A qué distancia del extremo izquierdo debería colocarse el apoyo?

**Solución.**

1. **Idea.** Un cuerpo apoyado en un solo punto está en equilibrio si ese punto está justo debajo del cg (la torca del peso respecto al apoyo es entonces cero, U p. 342). Con $g$ uniforme, cg = cm (U p. 342): basta calcular $x_{cm}$.
2. **Sustituir la barra por una partícula.** La barra uniforme pesa como si toda su masa estuviera en su centro: 0,120 kg en $x=0{,}250$ m.
3. **Ejes.** Origen en el extremo izquierdo, $x$ a lo largo de la barra. Masas: 0,120 kg en 0,250 m; 0,055 kg en 0; 0,110 kg en 0,500 m.
4. **Ecuación (11.3).** $x_{cm}=\dfrac{(0{,}120)(0{,}250)+(0{,}055)(0)+(0{,}110)(0{,}500)}{0{,}120+0{,}055+0{,}110}=\dfrac{0{,}085}{0{,}285}=0{,}298$ m.
5. **Resultado.** El apoyo va a **29,8 cm** del extremo izquierdo: un poco a la derecha del centro, porque la masa de la derecha es mayor.

**Receta.** Cada pieza uniforme = una partícula en su centro; $x_{cm}=\sum m_ix_i/\sum m_i$; el apoyo único va bajo el cm.

**Error típico.** Olvidar en el denominador la masa situada en $x=0$ (no suma en el numerador pero sí en la masa total).

Teoría: U §11.2 pp. 341–342 (11.3).

---

### E2. Ejercicio 11.6 — tabla llevada por dos personas (Solucionario 11-2)

**Enunciado (U p. 357, Ej. 11.6).** Dos personas llevan una tabla uniforme de madera de 3,00 m de longitud que pesa 160 N. Si una persona aplica una fuerza hacia arriba de 60 N en un extremo, ¿en qué punto sostiene la tabla la otra persona? Inicie dibujando un diagrama de cuerpo libre de la tabla.

**Solución.**

1. **DCL.** Fuerzas verticales: $F_1=60$ N en el extremo izquierdo ($x=0$), peso $w=160$ N en el centro ($x=1{,}50$ m), y $F_2$ (desconocida) a una distancia $x$ (desconocida) del extremo izquierdo. Dos incógnitas ⇒ $\sum F_y=0$ y $\sum\tau_z=0$.
2. **Fuerzas.** $F_1+F_2-w=0$ ⇒ $F_2=160-60=$ **100 N**.
3. **Torcas respecto al extremo de la persona 1** (su fuerza no da torca). Antihorario +: $F_2\,x-w(1{,}50)=0$ ⇒ $x=\dfrac{160\cdot1{,}50}{100}=$ **2,40 m** del extremo donde empuja la primera persona.
4. **Comprobación respecto al centro.** $F_1(1{,}50)-F_2(2{,}40-1{,}50)=90-90=0$ ✓. Quien empuja más cerca del cg hace más fuerza.

**Receta.** Fuerza vertical neta cero da la fuerza desconocida; torcas respecto al punto de la fuerza conocida dan su posición.

**Error típico.** Suponer que la segunda persona está en el otro extremo (entonces la tabla giraría).

Teoría: U §11.3 pp. 343–344 (11.6).

---

### E3. Ejercicio 11.26 — varillas de acero y cobre en serie (Solucionario 11-13)

**Enunciado (U p. 359, Ej. 11.26).** Dos varillas circulares, una de acero y la otra de cobre, se unen por los extremos. Cada una tiene 0,750 m de longitud y 1,50 cm de diámetro. La combinación se somete a una fuerza de tensión con magnitud de 4000 N. Para cada varilla, determine: a) la deformación y b) el alargamiento.

**Solución.**

1. **Misma fuerza en las dos.** Si cortamos imaginariamente el conjunto por cualquier sección y aplicamos $\sum F=0$ al trozo, la fuerza interna es 4000 N en toda la longitud: ambas varillas soportan $F_\perp=4000$ N (están «en serie»).
2. **Área.** $A=\pi d^2/4=\pi(0{,}0150)^2/4=1{,}767\times10^{-4}$ m². Esfuerzo (11.8): $F_\perp/A=2{,}26\times10^{7}$ Pa, igual en las dos.
3. **a) Deformación** $=\text{esfuerzo}/Y$ (de 11.10). Tabla 11.1: acero $Y=2{,}0\times10^{11}$ Pa, cobre $Y=1{,}1\times10^{11}$ Pa. Acero: $2{,}26\times10^7/2{,}0\times10^{11}=$ **1,1×10⁻⁴**; cobre: $2{,}26\times10^7/1{,}1\times10^{11}=$ **2,1×10⁻⁴**.
4. **b) Alargamiento** $=\text{deformación}\times l_0$. Acero: $1{,}13\times10^{-4}\cdot0{,}750=$ **8,5×10⁻⁵ m** (0,085 mm); cobre: $2{,}06\times10^{-4}\cdot0{,}750=$ **1,5×10⁻⁴ m** (0,15 mm). Alargamiento total 0,24 mm.
5. **Interpretación.** Mismo esfuerzo, distinto material: se estira más el de menor $Y$ (el cobre).

**Receta.** En serie: misma fuerza ⇒ mismo esfuerzo si la sección es igual; deformación = esfuerzo/$Y$ de cada material; alargamientos se suman.

**Error típico.** Repartir la fuerza (2000 N a cada una) como si estuvieran en paralelo; usar el diámetro como radio en $A$.

Teoría: U §11.4 pp. 348–349 (11.8–11.10), tabla 11.1 p. 349.

---

### E4. Ejercicio 11.36 — placa de acero sometida a corte (Solucionario 11-16)

**Enunciado (U p. 360, Ej. 11.36).** Una placa cuadrada de acero mide 10,0 cm por lado y tiene un espesor de 0,500 cm. a) Calcule la deformación por corte que se produce al aplicarse a cada uno de los cuatro lados una fuerza de $9{,}0\times10^5$ N paralela a cada lado. b) Determine el desplazamiento $x$ en centímetros.

**Solución.**

1. **Por qué es corte.** Las fuerzas son **paralelas** a las caras sobre las que actúan (tangenciales), no perpendiculares: esfuerzo de corte, $F_\parallel/A$ (11.15, U p. 352). Las cuatro fuerzas se equilibran por pares (fuerzas y torcas), así que la placa no se mueve: solo se deforma (el cuadrado pasa a rombo).
2. **Área sobre la que actúa $F_\parallel$.** La cara lateral: lado × espesor $=0{,}100\cdot0{,}00500=5{,}00\times10^{-4}$ m² (no la cara de 10×10 cm). La dimensión perpendicular al desplazamiento es $h=0{,}100$ m.
3. **Esfuerzo.** $F_\parallel/A=9{,}0\times10^5/5{,}00\times10^{-4}=1{,}8\times10^{9}$ Pa.
4. **a) Deformación por corte** $=\text{esfuerzo}/S$ (de 11.17), acero $S=7{,}5\times10^{10}$ Pa: $1{,}8\times10^9/7{,}5\times10^{10}=$ **2,4×10⁻²**.
5. **b) Desplazamiento.** Deformación $=x/h$ (11.16) ⇒ $x=0{,}024\cdot0{,}100=2{,}4\times10^{-3}$ m = **0,24 cm**.

**Receta.** Corte: $A$ = área de la cara **paralela** a la fuerza; deformación $x/h=F_\parallel/(AS)$; $h$ es la distancia entre las caras que se desplazan.

**Error típico.** Usar el área de la cara grande (10 × 10 cm) o el módulo de Young en vez del de corte.

Teoría: U §11.4 p. 352 (11.15–11.17), tabla 11.1 p. 349.

---

### E5. Ejercicio 11.34 — agua en el abismo Challenger (Solucionario 11-15)

**Enunciado (U p. 360, Ej. 11.34).** En el abismo Challenger de la Fosa de las Marianas, la profundidad del agua es de 10,9 km y la presión es de $1{,}16\times10^8$ Pa (cerca de $1{,}15\times10^3$ atm). a) Si se lleva un metro cúbico de agua de la superficie a esa profundidad, ¿cuánto cambiará su volumen? (La presión atmosférica normal es del orden de $1{,}0\times10^5$ Pa. Suponga que $k$ para el agua de mar es igual al valor para el agua dulce de la tabla 11.2.) b) ¿Qué densidad tiene el agua de mar a esta profundidad? (En la superficie, su densidad es de $1{,}03\times10^3$ kg/m³.)

**Solución.**

1. **Tipo de esfuerzo.** El agua presiona por igual en todas direcciones: esfuerzo **volumétrico** (U p. 350). El esfuerzo es el aumento de presión, $\Delta p=1{,}16\times10^8-1{,}0\times10^5=1{,}159\times10^8$ Pa (la presión atmosférica apenas cuenta).
2. **Módulo.** Tabla 11.2: $k=46{,}4\times10^{-6}$ atm$^{-1}$. Pasado a Pa$^{-1}$ (1 atm = $1{,}013\times10^5$ Pa): $k=4{,}58\times10^{-10}$ Pa$^{-1}$, y $B=1/k$ (11.14) $=2{,}18\times10^9$ Pa ($\approx2{,}2\times10^9$ Pa).
3. **a) Cambio de volumen.** De (11.13): $\Delta V=-\dfrac{\Delta p\,V_0}{B}=-k\,\Delta p\,V_0=-(4{,}58\times10^{-10})(1{,}159\times10^8)(1{,}00)=$ **−0,053 m³** (el signo menos: el volumen disminuye un 5,3 %). Con $B=2{,}2\times10^9$ Pa redondeado sale $-0{,}0527$ m³; mismo resultado a dos cifras.
4. **b) Densidad.** La masa no cambia: los $1{,}03\times10^3$ kg que ocupaban 1,00 m³ ocupan ahora $1{,}00-0{,}053=0{,}947$ m³. $\rho=1{,}03\times10^3/0{,}947=$ **1,09×10³ kg/m³** (un 5,6 % mayor).

**Receta.** Volumétrico: $\Delta V/V_0=-\Delta p/B=-k\Delta p$, con $\Delta p$ el **aumento** de presión y $k$ en Pa$^{-1}$; para la densidad, misma masa y nuevo volumen.

**Error típico.** Mezclar $k$ en atm$^{-1}$ con $\Delta p$ en Pa; olvidar el signo (el volumen disminuye); calcular la nueva densidad como $\rho_0(1-\Delta V/V_0)$ con el signo cambiado.

Teoría: U §11.4 pp. 350–351 (11.11–11.14), tabla 11.2 p. 351.

---

### E6. Ejercicio 11.14 — viga horizontal con cable y bisagra (Solucionario 11-7)

**Enunciado (U p. 358, Ej. 11.14).** La viga horizontal de la figura E11.14 pesa 190 N, y su centro de gravedad está en su centro. Calcule a) la tensión en el cable, y b) las componentes horizontal y vertical de la fuerza ejercida por la pared sobre la viga. (Figura, comprobada en el PDF: viga de 4,00 m unida a la pared por una bisagra; del extremo libre cuelga una carga de 300 N; el cable va del extremo libre a un punto de la pared 3,00 m por encima de la bisagra y mide 5,00 m.)

**Solución.**

1. **Geometría del cable.** Triángulo 3-4-5: el ángulo $\theta$ del cable con la viga cumple $\sin\theta=3{,}00/5{,}00=0{,}600$, $\cos\theta=4{,}00/5{,}00=0{,}800$.
2. **DCL de la viga.** Peso 190 N en el centro (2,00 m de la bisagra); carga 300 N en el extremo (4,00 m); tensión $T$ en el extremo, dirigida hacia el punto de la pared: componentes $T\cos\theta$ (hacia la pared) y $T\sin\theta$ (hacia arriba); fuerza de la bisagra con componentes $H_h$ y $H_v$ (su dirección es desconocida, no tiene por qué ir a lo largo de la viga). Tres incógnitas: $T,H_h,H_v$.
3. **a) Torcas respecto a la bisagra.** Ahí $H_h$ y $H_v$ no dan torca; $T\cos\theta$ tampoco (su recta es la propia viga, que pasa por la bisagra). Antihorario +: $T\sin\theta(4{,}00)-190(2{,}00)-300(4{,}00)=0$ ⇒ $T=\dfrac{380+1200}{4{,}00\cdot0{,}600}=658{,}3$ N ≈ **658 N**.
4. **b) Fuerzas.** $\sum F_x=H_h-T\cos\theta=0$ ⇒ $H_h=658{,}3\cdot0{,}800=$ **527 N** (la pared empuja la viga hacia fuera: el cable tira de ella hacia la pared). $\sum F_y=H_v+T\sin\theta-190-300=0$ ⇒ $H_v=490-395=$ **95 N** hacia arriba.
5. **Comprobación con otro punto (Estrategia 11.1).** Respecto al extremo libre (ahí actúan $T$ y la carga): $-H_v(4{,}00)+190(2{,}00)=0$ ⇒ $H_v=95$ N ✓ (y es hacia arriba porque debe compensar la torca del peso de la viga). Respecto al punto de la pared donde se ata el cable: $H_h(3{,}00)-190(2{,}00)-300(4{,}00)=0$ ⇒ $H_h=527$ N ✓.

**Receta (viga + cable + bisagra).** (1) Torcas respecto a la bisagra ⇒ $T$; (2) $\sum F_x$ ⇒ $H_h$; (3) $\sum F_y$ ⇒ $H_v$; (4) comprobar con torcas en el extremo libre.

**Error típico.** Suponer que la fuerza de la bisagra va a lo largo de la viga ($H_v=0$); usar $T\cos\theta$ en la torca.

Teoría: U §11.3 pp. 343–344 (11.6); §10.1 p. 305 (10.2).

---

### E7. Ejercicio 11.10 — escalera con rozamiento en el suelo (Solucionario 11-4)

**Enunciado (U p. 357, Ej. 11.10).** Una escalera uniforme de 5,0 m de longitud que pesa 160 N descansa contra una pared vertical sin fricción con su base a 3,0 m de la pared. El coeficiente de fricción estática entre la base de la escalera y el suelo es de 0,40. Un hombre de 740 N sube lentamente la escalera. Comience por dibujar un diagrama de cuerpo libre de la escalera. a) ¿Qué fuerza de fricción máxima puede ejercer el suelo sobre la escalera en su base? b) ¿Cuál es la fuerza de fricción cuando el hombre ha subido 1,0 m a lo largo de la escalera? c) ¿Hasta dónde puede subir el hombre antes de que la escalera resbale?

**Solución.**

1. **Geometría.** Escalera 5,0 m, base a 3,0 m ⇒ apoyo en la pared a $\sqrt{5^2-3^2}=4{,}0$ m (triángulo 3-4-5; ángulo con el suelo 53,1°). Un punto a distancia $s$ a lo largo de la escalera está a $\tfrac35s$ en horizontal de la base.
2. **DCL.** Pared lisa ⇒ solo $n_1$ horizontal. Suelo: $n_2$ vertical y fricción $f_s$ hacia la pared. Pesos: 160 N en el centro ($s=2{,}5$ m ⇒ 1,5 m en horizontal) y 740 N del hombre ($s$).
3. **a) Fricción máxima.** $\sum F_y=n_2-160-740=0$ ⇒ $n_2=900$ N, **sea cual sea la posición del hombre**. $f_{s,máx}=\mu_sn_2=0{,}40\cdot900=$ **360 N** (5.4).
4. **b) Hombre a 1,0 m.** Torcas respecto a la base (elimina $n_2$ y $f_s$): $n_1(4{,}0)=160(1{,}5)+740(\tfrac35\cdot1{,}0)=240+444=684$ N·m ⇒ $n_1=171$ N. $\sum F_x=f_s-n_1=0$ ⇒ $f_s=$ **171 N ≈ 1,7×10² N**, menor que 360 N: no resbala.
5. **c) Hasta dónde.** Al subir, crece la torca del hombre ⇒ crece $n_1$ ⇒ crece la fricción necesaria. Resbala cuando $f_s=n_1=360$ N: $360(4{,}0)=160(1{,}5)+740\cdot\tfrac35s$ ⇒ $s=\dfrac{1440-240}{444}=2{,}70$ m ≈ **2,7 m** a lo largo de la escalera (algo más de la mitad).

**Receta.** Igual que el Ej. 11.3 de U, pero con la posición del hombre como incógnita: la normal del suelo no cambia; el deslizamiento empieza cuando la fricción necesaria ($=n_1$) alcanza $\mu_sn_2$.

**Error típico.** Usar 1,0 m como brazo de palanca del hombre (es la distancia a lo largo de la escalera; el brazo es la horizontal, 0,6 m); pensar que la normal del suelo crece al subir.

Teoría: U §11.3 pp. 343–345 (Ej. 11.3); §5.3 p. 144.

---

### E8. Problema 11.46 — viga inclinada sostenida por cable y bisagra (Solucionario 11-18/11-19)

**Enunciado (U p. 361, Prob. 11.46).** Una viga uniforme de 8,0 m y 1150 kg está unida por una bisagra a la pared y sostenida por un cable delgado sujeto a 2,0 m del extremo libre de la viga (figura P11.46). La viga está sostenida a un ángulo de 30,0° arriba de la horizontal. a) Dibuje un diagrama de cuerpo libre de la viga. b) Calcule la tensión en el cable. c) ¿Con qué intensidad empuja la viga hacia la pared? (Figura, comprobada en el PDF: el cable va desde el punto de la viga hasta la pared y forma 40,0° con la viga.)

**Solución.**

1. **Ángulos.** La viga sube a 30,0° sobre la horizontal. El cable vuelve hacia la pared formando 40,0° con la viga: respecto a la horizontal forma $40{,}0^\circ-30{,}0^\circ=10{,}0^\circ$, subiendo hacia la pared. Por tanto $\vec T$ tiene componente horizontal $T\cos10{,}0^\circ$ (hacia la pared) y vertical $T\sin10{,}0^\circ$ (hacia arriba).
2. **a) DCL.** Peso $w=1150\cdot9{,}8=1{,}127\times10^4$ N en el centro (4,0 m de la bisagra a lo largo de la viga); $T$ en el punto a $8{,}0-2{,}0=6{,}0$ m de la bisagra; bisagra con $H_h$ (horizontal) y $H_v$ (vertical).
3. **b) Torcas respecto a la bisagra** (elimina $H_h$, $H_v$). Brazos de palanca $=r\sin\phi$ (10.2): para $T$, $r=6{,}0$ m y el ángulo entre viga y cable es 40,0° ⇒ brazo $6{,}0\sin40{,}0^\circ=3{,}86$ m. Para $w$ (vertical), el brazo es la distancia horizontal $4{,}0\cos30{,}0^\circ=3{,}46$ m. $T(6{,}0)\sin40{,}0^\circ=w(4{,}0)\cos30{,}0^\circ$ ⇒ $$T=\frac{(1{,}127\times10^4)(4{,}0)\cos30{,}0^\circ}{(6{,}0)\sin40{,}0^\circ}=1{,}01\times10^4\ \text{N}.$$
4. **c) Empuje contra la pared.** $\sum F_x=H_h-T\cos10{,}0^\circ=0$ ⇒ $H_h=$ **9,97×10³ N**: la pared empuja la viga hacia fuera con esa fuerza y, por la tercera ley, la viga empuja la pared con **9,97×10³ N** (≈1,0×10⁴ N).
5. **Ampliación ($H_v$).** $\sum F_y=H_v+T\sin10{,}0^\circ-w=0$ ⇒ $H_v=1{,}127\times10^4-1758=9{,}51\times10^3$ N hacia arriba. La bisagra soporta casi todo el peso, porque el cable es casi horizontal.
6. **Comprobación.** Con productos vectoriales ($\vec r\times\vec F$, 10.3), $\sum\tau_z=0$ en la bisagra con estos valores (verificado). $T<w$ porque el brazo de $T$ (3,86 m) es mayor que el de $w$ (3,46 m).

**Receta.** Viga inclinada: para cada fuerza, brazo = $r\sin(\text{ángulo entre la viga y la fuerza})$; con el peso vertical eso es $r\cos(\text{inclinación})$. Después, componentes con el ángulo del cable **respecto a la horizontal**.

**Error típico.** Usar 30° o 40° en las componentes horizontales/verticales de $T$ (es 10°); tomar 8,0 m como brazo de $T$.

Teoría: U §11.3 pp. 343–344; §10.1 p. 305 (10.2–10.3).

---

### E9. Problema 11.83 — varilla colgada de dos alambres distintos (Solucionario 11-38/11-39)

**Enunciado (U p. 366, Prob. 11.83).** Una varilla de 1,05 m de longitud con peso despreciable está sostenida en sus extremos por alambres A y B de igual longitud (figura P11.83). El área transversal de A es de 2,00 mm², y la de B, 4,00 mm². El módulo de Young del alambre A es de $1{,}80\times10^{11}$ Pa; el de B, $1{,}20\times10^{11}$ Pa. ¿En qué punto de la varilla debe colgarse un peso $w$ con la finalidad de producir a) esfuerzos iguales en A y B? b) ¿Y deformaciones iguales en A y B?

**Solución.**

1. **Plan.** Une las dos partes del tema: el equilibrio de la varilla relaciona las tensiones $T_A$ y $T_B$ con la posición $x$ del peso; la elasticidad traduce «igual esfuerzo» o «igual deformación» en una relación entre $T_A$ y $T_B$.
2. **Equilibrio.** Peso $w$ a distancia $x$ de A. Torcas respecto al punto C del peso (así $w$ no aparece): $T_B(1{,}05-x)-T_Ax=0$ ⇒ $\dfrac{T_B}{T_A}=\dfrac{x}{1{,}05-x}$. (Además $T_A+T_B=w$.)
3. **a) Esfuerzos iguales** (11.8): $T_A/A_A=T_B/A_B$ ⇒ $T_B=\dfrac{4{,}00}{2{,}00}T_A=2T_A$. Entonces $2(1{,}05-x)=x$ ⇒ $x=$ **0,70 m** desde A ($T_A=w/3$, $T_B=2w/3$).
4. **b) Deformaciones iguales.** Deformación $=\dfrac{T}{AY}$ (de 11.10): $\dfrac{T_A}{A_AY_A}=\dfrac{T_B}{A_BY_B}$ ⇒ $T_B=\dfrac{A_BY_B}{A_AY_A}T_A=\dfrac{(4{,}00)(1{,}20)}{(2{,}00)(1{,}80)}T_A=\dfrac43T_A$. Entonces $\tfrac43(1{,}05-x)=x$ ⇒ $x=\dfrac{1{,}40}{2{,}333}=$ **0,60 m** desde A ($T_A=3w/7$, $T_B=4w/7$).
5. **Interpretación.** B es más grueso: para el mismo esfuerzo necesita el doble de tensión, así que el peso se acerca a B. Pero B es más «blando» ($Y$ menor), lo que compensa en parte su mayor área en la deformación: el punto se acerca al centro (0,525 m). Como los alambres miden lo mismo, igual deformación = igual alargamiento ⇒ la varilla baja sin inclinarse.

**Receta.** Equilibrio ⇒ $T_B/T_A=x/(L-x)$; condición elástica ⇒ $T_B/T_A$ (= $A_B/A_A$ para igual esfuerzo; = $A_BY_B/(A_AY_A)$ para igual deformación); igualar y despejar $x$.

**Error típico.** Confundir esfuerzo (no depende de $Y$) con deformación (sí depende); tomar torcas respecto a A y olvidar que entonces aparece $w$ como incógnita adicional (se resuelve igual, pero con una ecuación más).

Teoría: U §11.3 p. 343; §11.4 pp. 348–349 (11.8–11.10).

---

## Resumen de resultados (para la chuleta y las figuras)

| Ejercicio | Resultados |
|---|---|
| U Ej. 11.2 | $L_{cg}=1{,}01$ m de los dedos de los pies (0,52 m de los antebrazos) |
| U Ej. 11.3 | $n_2=980$ N; $n_1=f_s=268$ N (267,5); $\mu_{s,mín}=0{,}27$; $F_B=1016\approx1{,}02\times10^3$ N a 75° |
| U Ej. 11.5 | $\sigma=1{,}8\times10^8$ Pa; $\varepsilon=9{,}0\times10^{-4}$; $\Delta l=1{,}8$ mm |
| U Problema práctico | $T=\dfrac{2mg}{3\sin\theta}$; $P_x=-\dfrac{2mg}{3\tan\theta}$, $P_y=\dfrac{mg}{3}$; $P<T$, $\tan\phi=\tfrac12\tan\theta$; $|\Delta l|=\dfrac{mgl_0}{2AY\tan\theta}$; factor 4 |
| E 11.1 | 29,8 cm del extremo izquierdo |
| E 11.6 | $F_2=100$ N a 2,40 m |
| E 11.26 | acero $1{,}1\times10^{-4}$, $8{,}5\times10^{-5}$ m; cobre $2{,}1\times10^{-4}$, $1{,}5\times10^{-4}$ m |
| E 11.36 | deformación $2{,}4\times10^{-2}$; $x=0{,}24$ cm |
| E 11.34 | $\Delta V=-0{,}053$ m³; $\rho=1{,}09\times10^3$ kg/m³ |
| E 11.14 | $T=658$ N; $H_h=527$ N; $H_v=95$ N (arriba) |
| E 11.10 | $f_{máx}=360$ N; $f=171$ N; $s=2{,}7$ m |
| E 11.46 | $T=1{,}01\times10^4$ N; $H_h=9{,}97\times10^3$ N; $H_v=9{,}51\times10^3$ N |
| E 11.83 | a) 0,70 m de A; b) 0,60 m de A |

---

## Notas internas para el redactor (NO publicar en el HTML; regla 8 bis)

1. **No hay ejercicios X** para este tema: decirlo en el mapa del tema y no inventar convocatoria.
2. **E 11.26 b):** los alargamientos correctos son $8{,}5\times10^{-5}$ m (acero) y $1{,}5\times10^{-4}$ m (cobre), calculados sin redondear la deformación. Escribir directamente esos valores.
3. **E 11.34:** el enunciado pide $k$ de la tabla 11.2 ($46{,}4\times10^{-6}$ atm$^{-1}$ ⇒ $B=2{,}18\times10^9$ Pa) y $\Delta p=1{,}16\times10^8-1{,}0\times10^5$ Pa; resultado $\Delta V=-0{,}0531$ m³ ≈ $-0{,}053$ m³. Usar esta versión.
4. **E 11.46 (c):** el solucionario solo da $H_h$; $H_v=9{,}51\times10^3$ N es ampliación propia (verificada). Comprobación de signos hecha con producto vectorial completo.
5. **Problema práctico (U p. 355):** sin solución en E; resuelto aquí. En (c) solo se comprime el tramo de $\tfrac34l_0$ entre cable y pivote (el cuarto libre no soporta fuerza axial); resultado $|\Delta l|=mgl_0/(2AY\tan\theta)$. En (d) la masa se duplica con la longitud ⇒ factor 4. Se desprecia la flexión de la varilla por su peso (como pide el enunciado, solo el cambio de longitud).
6. **Ej. 11.3:** $F_B$ = 1016 N; escribir «≈1,02×10³ N».
7. **Ej. 11.5:** la masa es 550 kg (comprobado en la imagen del PDF).
8. **Figuras sugeridas** (valores ya verificados): DCL de la viga de E 11.14 (triángulo 3-4-5, $T=658$ N, $H_h=527$ N, $H_v=95$ N); escalera de E 11.10 con la gráfica $f_s$ frente a $s$ (recta $f_s=60+111s$ N, corta 360 N en $s=2{,}70$ m); DCL de la varilla del Problema práctico con $\theta=30^\circ$ ($T=13{,}1$ N, $P=11{,}8$ N a 16,1°, por kg de varilla); esquema de E 11.83 con las dos posiciones (0,60 y 0,70 m).
