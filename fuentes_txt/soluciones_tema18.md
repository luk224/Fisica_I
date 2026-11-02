# Soluciones Tema 18 — Propiedades térmicas de la materia

Material para el redactor del tema 18. Todos los números se han comprobado con sympy (scripts propios; resultados en la tabla final). Enunciados tomados de U (`sears.txt`, ejercicios y problemas en págs. impresas 610–614, PDF 638–642; problema práctico en p. 608, PDF 636) y desarrollos de `solman.txt` (la página «18-N» del solucionario es la página de texto 593+N). Cada problema se ha localizado por su número y por su contenido; abajo se cita la página «18-N» donde está realmente su desarrollo. Los problemas E están traducidos y ampliados, no copiados. «U p. NN» = página impresa del Sears-Zemansky.

**Fórmulas confirmadas sobre la imagen del PDF de U** (pdftoppm de las págs. PDF 626, 631 y 632):
- p. 598: tiempo libre medio $t_{med}=\dfrac{V}{4\pi\sqrt2\,r^2vN}$ (18.20) — lleva la rapidez $v$ en el denominador —; trayectoria libre media $\lambda=v\,t_{med}=\dfrac{V}{4\pi\sqrt2\,r^2N}$ (18.21); con $pV=NkT$: $\lambda=\dfrac{kT}{4\pi\sqrt2\,r^2p}$ (18.22). $\lambda$ no depende de $v$.
- p. 603: $v_{med}=\int_0^\infty v f(v)\,dv$ (18.30); $(v^2)_{med}=\int_0^\infty v^2f(v)\,dv$ (18.31); Maxwell-Boltzmann $f(v)=4\pi\left(\dfrac{m}{2\pi kT}\right)^{3/2}v^2e^{-mv^2/2kT}$ (18.32); $f(\epsilon)$ (18.33); **$v_{mp}=\sqrt{2kT/m}$ (18.34)**.
- p. 604: **$v_{med}=\sqrt{8kT/\pi m}$ (18.35)**; **$v_{rms}=\sqrt{3kT/m}$ (18.36)**, que coincide con (18.19); tabla 18.2 (fracción de moléculas con $v$ menor que 0,20…2,00 $v_{rms}$; p. ej. 1,00 → 0,608; 1,60 → 0,947; 2,00 → 0,993).
- Como $k/m=R/M$, las tres rapideces se escriben también con $R$ y $M$: $v_{mp}=\sqrt{2RT/M}$, $v_{med}=\sqrt{8RT/\pi M}$, $v_{rms}=\sqrt{3RT/M}$. Siempre $v_{mp}<v_{med}<v_{rms}$ (factores $\sqrt2:\sqrt{8/\pi}:\sqrt3=1:1{,}128:1{,}225$).

Datos y convenciones (los de U): $R=8{,}314$ J/(mol·K) $=0{,}08206$ L·atm/(mol·K) (p. 586); $N_A=6{,}022\times10^{23}$ mol⁻¹ (p. 592); $k=R/N_A=1{,}381\times10^{-23}$ J/K (p. 595); 1 atm $=1{,}013\times10^5$ Pa; $T_K=T_C+273{,}15$; masa molar media del aire $M=28{,}8$ g/mol (ejemplo 18.3, p. 588); $g=9{,}80$ m/s². **En $pV=nRT$ la presión es absoluta y la temperatura en kelvin, también en los cocientes** (U p. 587, Estrategia 18.1).

## Herramientas de teoría que se usan

| Herramienta | Dónde |
|---|---|
| Masa molar: $m_{total}=nM$ (18.2) | U §18.1 p. 585 |
| **Ecuación del gas ideal** $pV=nRT$ (18.3); con masa $pV=\frac{m_{total}}{M}RT$ (18.4); **densidad $\rho=pM/RT$ (18.5)** | U §18.1 p. 586 |
| **Dos estados de la misma cantidad de gas**: $\dfrac{p_1V_1}{T_1}=\dfrac{p_2V_2}{T_2}$ (18.6) (no hace falta $R$) | U §18.1 p. 586; Estrategia 18.1 p. 587 |
| Atmósfera isoterma: $p=p_0e^{-Mgy/RT}$ (ejemplo 18.4) | U §18.1 pp. 588–589 |
| Van der Waals (18.7), isotermas, temperatura crítica | U §18.1 pp. 589–590 |
| Mol y número de Avogadro; $M=N_Am$ (18.8); $n=N/N_A$ | U §18.2 p. 592 |
| Presión por choques (18.11)–(18.12); $pV=\frac23K_{tr}$ (18.13); **$K_{tr}=\frac32nRT$ (18.14)**; **$\frac12m(v^2)_{med}=\frac32kT$ (18.16)**; **$pV=NkT$ (18.18)** | U §18.3 pp. 594–595 |
| **Rapidez eficaz** $v_{rms}=\sqrt{3kT/m}=\sqrt{3RT/M}$ (18.19) | U §18.3 p. 596; Estrategia 18.2 p. 596 |
| Trayectoria libre media (18.20)–(18.22) | U §18.3 p. 598 |
| $dQ=nC_V\,dT$ (18.24); **$C_V=\frac32R$ monoatómico (18.25)**; **$C_V=\frac52R$ diatómico (18.26)**; equipartición; tabla 18.1 | U §18.4 pp. 599–601 |
| **Distribución de Maxwell-Boltzmann** y $v_{mp}$, $v_{med}$, $v_{rms}$ (18.32)–(18.36); tabla 18.2 | U §18.5 pp. 603–604 |
| Fases, presión de vapor, punto triple y crítico | U §18.6 pp. 604–607 |
| Presión hidrostática $p=p_0+\rho gh$ (12.6) | U §12.2 p. 373 |
| Principio de Arquímedes (flotación, $B=\rho_{fluido}Vg$) | U §12.3 p. 376 |
| Ecuación de Bernoulli (12.17) | U §12.5 p. 382 |
| Conservación de la energía mecánica | U §7.1 p. 205 |
| (Solo en la Parte A) primera ley $\Delta U=Q-W$ (19.4) p. 624; trabajo isotérmico $W=nRT\ln(V_2/V_1)$ p. 621; isobárico $W=p(V_2-V_1)$ (19.10) p. 629; $dU=nC_VdT$ (19.13) p. 631; $C_p=C_V+R$ (19.17) p. 632; eficiencia $e=W/Q_H$ (20.4) p. 650; coeficiente de rendimiento $K=|Q_C|/|W|$ (20.9) p. 654; Carnot $e=1-T_C/T_H$ (20.14) p. 660 | U caps. 19–20 |

---

## PARTE A — Exámenes (X)

**Qué ha caído del tema 18.** En `examenes_por_tema.md` el Tema 18 **no tiene ninguna entrada**: no ha caído ningún problema ni ninguna teoría dedicada a este tema en las convocatorias disponibles. **No se inventa ninguno.**

Sí hay tres problemas de examen, catalogados en los Temas 19 y 20, cuya **primera mitad es puro Tema 18**: fijar los estados de un gas ideal con $pV=nRT$, usar $C_V=\frac32R$ o $\frac52R$ y $\Delta U=nC_V\Delta T$. Se resuelven aquí como **«ejercicios de examen relacionados (gas ideal)»**, detallando la parte de gas ideal y dando el resto (calor, trabajo, rendimiento) con las herramientas de los caps. 19–20 indicadas. Los tres tienen texto nativo; los exponentes y subíndices que el OCR del `.txt` pierde se han leído en la imagen del PDF.

### X1. Examen Septiembre 2024 P-2 (3 puntos) — ciclo con helio: isócora, isoterma, isóbara

**Fuente.** `fuentes_txt/examenes/EXAMENESFISICA1.txt` (también en `FISICA_EXAMENS_ULTIMOSAOS_25-18.txt`); PDF `EXAMENES FISICA 1.pdf`, p. 16. Catalogado en Tema 19 (secundario Tema 20).

**Enunciado (literal).** Una máquina térmica opera empleando el siguiente ciclo termodinámico. Se produce una transformación isócora entre los estados $a$ y $b$ para a continuación producirse una transformación isoterma entre los estados $b$ y $c$, cerrándose el ciclo mediante una transformación isobara entre los estados $c$ y $a$. La sustancia de trabajo se compone de 1,5 moles de helio gaseoso que alcanza una temperatura máxima en el ciclo de 573.2 K. Se conoce además que el ciclo opera entre las presiones $p_a=1{,}5\times10^5$ Pa y $p_b=4\times10^5$ Pa. Suponga que la sustancia de trabajo es un gas ideal. A partir de los datos presentados, obtenga: (a) Una representación gráfica del ciclo termodinámico. (b) El calor de entrada y salida al sistema en cada ciclo termodinámico. (c) El trabajo efectuado por la máquina en cada ciclo termodinámico. (d) Obtenga y compare la eficiencia del ciclo con la de la máquina térmica que pudiera obtener la máxima eficiencia operando las temperaturas de fuente caliente y fría del problema. Considere: $R=8{,}314$ kJ/(kmol·K).

**Solución.**
1. **Unidades de R.** $8{,}314$ kJ/(kmol·K) $=8{,}314$ J/(mol·K): es la misma constante (U p. 586).
2. **Dónde está la temperatura máxima.** En la isócora $a\to b$ la presión sube de $1{,}5\times10^5$ a $4\times10^5$ Pa a volumen constante; por $pV=nRT$, $T\propto p$ ⇒ la temperatura sube. En la isoterma $b\to c$ se mantiene. En la isóbara $c\to a$ el volumen vuelve a $V_a<V_c$ ⇒ $T$ baja. Así que **$T_b=T_c=T_{max}=573{,}2$ K** y la mínima es $T_a$.
3. **$T_a$ con la isócora** (18.6 con $V_1=V_2$): $\dfrac{p_a}{T_a}=\dfrac{p_b}{T_b}\Rightarrow T_a=573{,}2\cdot\dfrac{1{,}5}{4}=$ **214,95 K**.
4. **Volúmenes con $pV=nRT$** (18.3): $V_a=V_b=\dfrac{nRT_b}{p_b}=\dfrac{1{,}5\cdot8{,}314\cdot573{,}2}{4\times10^5}=$ **0,01787 m³**. El estado $c$ está en la isoterma de $b$ y a la presión de $a$ (la isóbara $c\to a$): $p_c=p_a$ ⇒ $V_c=\dfrac{nRT_c}{p_c}=V_b\dfrac{p_b}{p_a}=$ **0,04766 m³**.

   | Estado | $p$ (Pa) | $V$ (m³) | $T$ (K) |
   |---|---|---|---|
   | a | $1{,}5\times10^5$ | 0,01787 | 214,95 |
   | b | $4\times10^5$ | 0,01787 | 573,2 |
   | c | $1{,}5\times10^5$ | 0,04766 | 573,2 |
5. **(a) Diagrama pV:** segmento vertical $a\to b$ hacia arriba, hipérbola $pV=$ cte de $b$ a $c$ (hacia la derecha y abajo), segmento horizontal $c\to a$ hacia la izquierda. Se recorre en sentido horario ⇒ **máquina térmica** (trabajo neto positivo).
6. **(b) Calores.** Helio = monoatómico ⇒ $C_V=\frac32R$ (18.25), $C_p=\frac52R$ (19.17).
   - $a\to b$ (isócora, $W=0$): $Q_{ab}=nC_V(T_b-T_a)=1{,}5\cdot\frac32\cdot8{,}314\cdot358{,}25=$ **+6702 J** (entra).
   - $b\to c$ (isoterma, $\Delta U=0$ porque $U$ de un gas ideal solo depende de $T$): $Q_{bc}=W_{bc}=nRT_b\ln\dfrac{V_c}{V_b}=1{,}5\cdot8{,}314\cdot573{,}2\cdot\ln\dfrac83=$ **+7011 J** (entra).
   - $c\to a$ (isóbara): $Q_{ca}=nC_p(T_a-T_c)=1{,}5\cdot\frac52\cdot8{,}314\cdot(-358{,}25)=$ **−11 169 J** (sale).
   - Calor de entrada $Q_H=6702+7011=$ **13 713 J**; de salida $|Q_C|=$ **11 169 J**.
7. **(c) Trabajo neto** = suma de calores (en un ciclo $\Delta U=0$): $W=13\,713-11\,169=$ **2544 J**. Comprobación por tramos: $W_{bc}+W_{ca}=7011+p_a(V_a-V_c)=7011-4468=2544$ J.
8. **(d) Eficiencias.** $e=W/Q_H=2544/13\,713=$ **0,185 (18,5 %)** (20.4). Carnot entre $T_H=573{,}2$ K y $T_C=214{,}95$ K: $e_{Carnot}=1-\dfrac{214{,}95}{573{,}2}=1-\dfrac{1{,}5}{4}=$ **0,625 (62,5 %)** (20.14). El ciclo real aprovecha menos de un tercio de lo máximo posible.

**Receta.** Ciclo de gas ideal: (1) tabla de estados $p,V,T$ con $pV=nRT$ y las condiciones de cada proceso (isócora ⇒ $p/T$ cte, isoterma ⇒ $pV$ cte, isóbara ⇒ $V/T$ cte); (2) solo entonces calores y trabajos.
**Error típico.** Tomar 573,2 K como $T_a$; olvidar que en la isoterma $\Delta U=0$ y por tanto $Q=W$; usar $C_V$ en la isóbara.
**Figura sugerida.** Diagrama pV con los tres estados acotados (valores de la tabla), la isoterma de 573,2 K a trazos y flechas en sentido horario; sombreado el área encerrada (2544 J).
Teoría: U §18.1 p. 586 (18.3), (18.6); §18.4 p. 599 (18.25); §19.2 p. 621; (19.10) p. 629; (19.17) p. 632; (20.4) p. 650; (20.14) p. 660.

---

### X2. Examen Febrero 2025 (1ª semana) P-2 (3 puntos) — refrigerador con gas diatómico

**Fuente.** `fuentes_txt/examenes/E689010160-25F1.txt`, p. 1 del PDF (también en los dos recopilatorios). Catalogado en Tema 20 (secundario Tema 19).

**Enunciado (literal).** Un ciclo de refrigeración opera un mol de un gas ideal diatómico. El ciclo consta de un proceso isotermo $a\to b$, un proceso isócoro $b\to c$ y un proceso isóbaro $c\to a$ que cierra el ciclo. Se conoce que $p_a=70$ kPa y que $V_a=0{,}03$ m³ y que $V_b=0{,}1$ m³. Conociendo estos datos: (a) Dibuje el ciclo termodinámico descrito en un diagrama pV. (b) Calcule el coeficiente de rendimiento del refrigerador. Considere: $C_V=5R/2$ y $C_p=7R/2$ y la constante de los gases $R=8{,}314$ J mol⁻¹K⁻¹.

**Solución.**
1. **Estado a** ($pV=nRT$, $n=1$): $T_a=\dfrac{p_aV_a}{R}=\dfrac{70\,000\cdot0{,}03}{8{,}314}=$ **252,6 K**.
2. **Estado b** (isoterma: $T_b=T_a$, $pV$ cte): $p_b=p_a\dfrac{V_a}{V_b}=70\cdot\dfrac{0{,}03}{0{,}1}=$ **21 kPa**.
3. **Estado c**: isócora desde b ⇒ $V_c=V_b=0{,}1$ m³; isóbara hacia a ⇒ $p_c=p_a=70$ kPa. $T_c=\dfrac{p_cV_c}{R}=\dfrac{7000}{8{,}314}=$ **842,0 K**.
4. **(a) Diagrama:** de a (0,03 m³; 70 kPa) baja por la isoterma hasta b (0,1; 21), sube vertical hasta c (0,1; 70) y vuelve horizontal a a. Se expande por abajo y se comprime por arriba ⇒ sentido **antihorario** ⇒ el trabajo neto lo recibe el gas: es un **refrigerador**, como dice el enunciado.
5. **Calores y trabajos** (diatómico, $C_V=\frac52R$, $C_p=\frac72R$):
   - $a\to b$: $Q_{ab}=W_{ab}=nRT_a\ln\dfrac{V_b}{V_a}=2100\ln\dfrac{10}{3}=$ **+2528 J**.
   - $b\to c$: $W=0$; $Q_{bc}=nC_V(T_c-T_b)=\frac52(p_cV_c-p_bV_b)=\frac52(7000-2100)=$ **+12 250 J**.
   - $c\to a$: $W_{ca}=p_a(V_a-V_c)=70\,000(-0{,}07)=$ **−4900 J**; $Q_{ca}=nC_p(T_a-T_c)=\frac72(2100-7000)=$ **−17 150 J**.
   - (Truco: $nRT=pV$, así que $nC_V\Delta T=\frac52\Delta(pV)$ y no hace falta calcular $T$.)
6. **Trabajo neto:** $W=2528-4900=$ **−2372 J** (lo recibe el gas). Comprobación: $\sum Q=2528+12\,250-17\,150=-2372$ J $=W$ ✓.
7. **(b) Coeficiente de rendimiento** (20.9): $K=\dfrac{|Q_C|}{|W|}$, con $Q_C$ = calor que **absorbe** el gas $=Q_{ab}+Q_{bc}=14\,778$ J: $K=\dfrac{14\,778}{2372}=$ **6,23**.

**Receta.** Mismo método que X1: tabla de estados → calores por tramo (con $\frac{C_V}{R}\Delta(pV)$ cuando no se conoce $n$ o para ahorrar pasos) → $K=Q_{absorbido}/|W_{neto}|$.
**Error típico.** Usar $V$ en litros con $R$ en J/(mol·K); confundir el sentido del ciclo (en un refrigerador $W<0$); poner en $K$ el calor cedido en vez del absorbido.
**Figura sugerida.** Diagrama pV con a (0,03; 70 kPa), b (0,1; 21 kPa), c (0,1; 70 kPa), isoterma de 252,6 K y flechas en sentido antihorario.
Teoría: U §18.1 p. 586 (18.3); §18.4 p. 601 (18.26); §19.2 p. 621; (19.10) p. 629; (19.17) p. 632; (20.9) p. 654.

---

### X3. Examen Febrero 2025 (2ª semana) P-2 (3 puntos) — isóbara, isócora y recta, gas monoatómico

**Fuente.** `fuentes_txt/examenes/E689010160-25F2.txt`, p. 1 del PDF (también en los dos recopilatorios). Catalogado en Tema 19 (secundario Tema 20). El `.txt` pierde los subíndices y exponentes; en la imagen del PDF se lee $p_a=4\times10^5$ Pa y $p_c=2\times10^5$ Pa.

**Enunciado (literal).** En un ciclo termodinámico se opera un gas ideal monoatómico. El gas se somete a un proceso isóbaro entre los estados $a$ y $b$ para pasar posteriormente por un proceso isócoro entre los estados $b$ y $c$, cerrándose el ciclo a través de un proceso que puede ser representado como una línea recta en un diagrama presión, volumen, pV. Se conoce que $p_a=4\times10^5$ Pa, $p_c=2\times10^5$ Pa, $V_a=0{,}55$ m³ y $V_b=0{,}82$ m³. Conocidos estos datos: (a) Dibuje el ciclo termodinámico descrito en un diagrama pV. (b) Calcule el calor intercambiado, el trabajo realizado y la variación de energía interna en cada proceso del ciclo [y para el ciclo completo]. (c) Determine la eficiencia del ciclo. Considere: $C_v=3R/2$ y $C_p=5R/2$ y $R=8{,}314$ J mol⁻¹K⁻¹.

**Solución.**
1. **Estados.** $a$: (0,55 m³; 4×10⁵ Pa). Isóbara ⇒ $b$: (0,82; 4×10⁵). Isócora ⇒ $c$: (0,82; 2×10⁵). La recta une $c$ con $a$.
2. **No se da $n$ y no hace falta.** Por $pV=nRT$, $nT=pV/R$; todo lo que necesitamos es $\Delta U=nC_V\Delta T=\frac32\Delta(pV)$ (monoatómico, 18.25 y 19.13). Productos $pV$: $a$: 220 000 J; $b$: 328 000 J; $c$: 164 000 J. Por tanto $T_b>T_a>T_c$ ($T_b/T_a=1{,}49$; $T_c/T_a=0{,}745$).
3. **(b) Tramo a→b (isóbaro):** $W=p(V_b-V_a)=4\times10^5\cdot0{,}27=$ **108 000 J**; $\Delta U=\frac32(328\,000-220\,000)=$ **162 000 J**; $Q=\Delta U+W=$ **270 000 J** (= $\frac52p\Delta V$, es decir $nC_p\Delta T$).
4. **Tramo b→c (isócoro):** $W=0$; $\Delta U=Q=\frac32(164\,000-328\,000)=$ **−246 000 J**.
5. **Tramo c→a (recta):** el trabajo es el área bajo la recta (un trapecio), negativa porque el volumen disminuye: $W=\dfrac{p_c+p_a}{2}(V_a-V_c)=3\times10^5\cdot(-0{,}27)=$ **−81 000 J**; $\Delta U=\frac32(220\,000-164\,000)=$ **84 000 J**; $Q=\Delta U+W=$ **+3000 J**.
6. **Ciclo completo:** $\Delta U=0$ ✓; $W=108\,000-81\,000=$ **27 000 J** (= área del triángulo $\frac12\cdot0{,}27\cdot2\times10^5$); $Q_{neto}=270\,000-246\,000+3000=27\,000$ J $=W$ ✓.
7. **(c) Eficiencia** $e=W/Q_H$, con $Q_H$ = **todo el calor que entra**. Cuidado con la recta: a lo largo de ella el calor cambia de signo. Con $p(V)$ la recta de pendiente $s=-7{,}41\times10^5$ Pa/m³, $dQ=dU+p\,dV=\left(\frac52p+\frac32Vs\right)dV$; se anula en $V^*=0{,}681$ m³. De $c$ a $V^*$ **entra** 28 521 J y de $V^*$ a $a$ **sale** 25 521 J (neto +3000 J). Entonces $Q_H=270\,000+28\,521=298\,521$ J y $e=\dfrac{27\,000}{298\,521}=$ **0,090 (9,0 %)**. Si se toma solo el neto del tramo ($Q_H=273\,000$ J) sale 9,9 %, que sobrestima la eficiencia; en examen, indicar al menos que la recta tiene una parte con calor entrante y otra saliente.

**Receta.** Cuando no te dan $n$, trabaja con $pV$: $\Delta U=\frac{C_V}{R}\Delta(pV)$; el trabajo es siempre el área bajo la curva en el diagrama pV (rectángulo, trapecio…).
**Error típico.** Pensar que hace falta $n$ (o inventarlo); dar el trabajo de la recta con un solo valor de $p$; calcular $Q_H$ con el neto de un tramo en el que el calor cambia de signo.
**Figura sugerida.** Diagrama pV: triángulo a (0,55; 4), b (0,82; 4), c (0,82; 2) [×10⁵ Pa], recorrido horario; marcar $V^*=0{,}681$ m³ sobre la recta (cambio de signo del calor) y sombrear el triángulo (27 kJ).
Teoría: U §18.1 p. 586; §18.4 p. 599 (18.25); (19.4) p. 624; (19.10) p. 629; (19.13) p. 631; (20.4) p. 650.

---

## PARTE B — Problemas del solucionario (E) y problema práctico de U

Orden de dificultad creciente: dos estados de un gas (18.6) → un estado (18.3) y densidad (18.5) → atmósfera isoterma → moles y moléculas (§18.2) → modelo cinético y $v_{rms}$ (§18.3) → $C_V$ (§18.4) → rapideces de Maxwell-Boltzmann (§18.5) → presión de vapor (§18.6) → problemas combinados con fluidos (flotación, presión hidrostática, Bernoulli) → problema práctico de U.

### E1. Problema 18.3 (U p. 610; Solucionario 18-1) — expansión isotérmica con un pistón

**Enunciado (de U).** Un tanque cilíndrico tiene un pistón ajustado que permite modificar el volumen del tanque. Originalmente, el tanque contiene 0,110 m³ de aire a 0,355 atm de presión. Se tira lentamente del pistón hasta aumentar el volumen del aire a 0,390 m³. Si la temperatura permanece constante, ¿qué valor final tiene la presión?

**Solución.**
1. **Idea.** Mismo gas (n constante), dos estados ⇒ (18.6). Como $T_1=T_2$, se reduce a $p_1V_1=p_2V_2$ (ley de Boyle).
2. **Despejar:** $p_2=p_1\dfrac{V_1}{V_2}=0{,}355\cdot\dfrac{0{,}110}{0{,}390}=$ **0,100 atm**.
3. **Unidades.** En un cociente las unidades se cancelan: se puede dejar la presión en atm y el volumen en m³.
4. **Lectura.** El volumen se multiplica por 3,55 y la presión se divide por 3,55.

**Receta.** Dos estados, n fijo: escribe (18.6), tacha lo que sea constante y despeja.
**Error típico.** Multiplicar en lugar de dividir (pensar que «más volumen ⇒ más presión»).
**Figura sugerida.** Hipérbola $pV=$ cte en un diagrama pV con los puntos (0,110; 0,355) y (0,390; 0,100).
Teoría: U §18.1 p. 586 (18.6).

---

### E2. Problema 18.11 (U p. 610; Solucionario 18-3) — globo en nitrógeno líquido

**Enunciado (de U).** El gas dentro de un globo siempre tiene una presión casi igual a la presión atmosférica, pues ésta es la presión aplicada al exterior del globo. Un globo se llena con helio (un gas casi ideal) hasta un volumen de 0,600 L a 19,0 °C. ¿Qué volumen tendrá el globo si se le enfría hasta el punto de ebullición del nitrógeno líquido (77,3 K)?

**Solución.**
1. **Idea.** $p$ y $n$ constantes ⇒ (18.6) queda $V_1/T_1=V_2/T_2$: a presión constante, el volumen es proporcional a la temperatura **absoluta**.
2. **Kelvin:** $T_1=19{,}0+273{,}15=292{,}15$ K.
3. **Cálculo:** $V_2=V_1\dfrac{T_2}{T_1}=0{,}600\cdot\dfrac{77{,}3}{292{,}15}=$ **0,159 L**.
4. **Lectura.** El globo se queda en algo más de la cuarta parte de su volumen.

**Receta.** Presión constante: $V\propto T$ (en K).
**Error típico.** Usar 19 °C en el cociente: daría $V_2=0{,}600\cdot77{,}3/19=2{,}4$ L (¡el globo crecería al enfriarlo!).
**Figura sugerida.** Recta $V$–$T$ que pasa por el origen (0 K) con los puntos (292 K; 0,600 L) y (77,3 K; 0,159 L).
Teoría: U §18.1 pp. 586–587 (18.6), «Cuidado» sobre kelvin p. 587.

---

### E3. Problema 18.14 (U p. 610; Solucionario 18-4) — la burbuja del buzo

**Enunciado (de U).** Un buzo observa una burbuja de aire que sube del fondo de un lago (donde la presión absoluta es de 3,50 atm) a la superficie (donde es de 1,00 atm). La temperatura en el fondo es de 4,0 °C, y en la superficie, de 23,0 °C. a) Calcule la razón entre el volumen de la burbuja al llegar a la superficie y el que tenía en el fondo. b) ¿Puede el buzo detener la respiración sin peligro mientras sube del fondo del lago a la superficie? ¿Por qué?

**Solución.**
1. **Idea.** El aire de la burbuja no cambia (n constante); cambian $p$ y $T$ ⇒ (18.6) completa.
2. **Despejar el cociente:** $\dfrac{V_2}{V_1}=\dfrac{p_1}{p_2}\cdot\dfrac{T_2}{T_1}$.
3. **Kelvin:** $T_1=277{,}15$ K, $T_2=296{,}15$ K. Presiones ya **absolutas**.
4. **a)** $\dfrac{V_2}{V_1}=\dfrac{3{,}50}{1{,}00}\cdot\dfrac{296{,}15}{277{,}15}=$ **3,74**. Casi todo el efecto es la presión (factor 3,5); la temperatura solo añade un 7 %.
5. **b)** **No.** El aire retenido en los pulmones tendería a ocupar 3,7 veces más volumen: los pulmones no pueden expandirse tanto y se dañarían. Hay que exhalar mientras se sube.

**Receta.** $V_2/V_1=(p_1/p_2)(T_2/T_1)$, con presiones absolutas y kelvin.
**Error típico.** Usar presiones manométricas (2,50 atm y 0 atm: división por cero).
**Figura sugerida.** Esquema del lago con la burbuja pequeña en el fondo (3,50 atm, 4 °C) y 3,74 veces mayor en la superficie (1,00 atm, 23 °C).
Teoría: U §18.1 p. 586 (18.6).

---

### E4. Problema 18.9 (U p. 610; Solucionario 18-3) — se comprime y se calienta

**Enunciado (de U).** Un tanque cilíndrico grande contiene 0,750 m³ de nitrógeno gaseoso a 27 °C y $7{,}50\times10^3$ Pa (presión absoluta). El tanque tiene un pistón ajustado que permite modificar el volumen. Determine la presión si el volumen se reduce a 0,410 m³ y la temperatura se aumenta a 157 °C.

**Solución.**
1. **Idea.** Mismo gas, dos estados, cambian las tres variables ⇒ (18.6) completa: $p_2=p_1\dfrac{V_1}{V_2}\dfrac{T_2}{T_1}$.
2. **Kelvin:** $T_1=300{,}15$ K, $T_2=430{,}15$ K.
3. **Cálculo:** $p_2=7{,}50\times10^3\cdot\dfrac{0{,}750}{0{,}410}\cdot\dfrac{430{,}15}{300{,}15}=$ **1,97 × 10⁴ Pa**.
4. **Comprobación cualitativa.** Comprimir sube $p$ (factor 1,83) y calentar también (factor 1,43): ambos efectos se multiplican (factor 2,62).

**Receta.** Cada factor de (18.6) se interpreta por separado: «menos volumen ⇒ más presión», «más temperatura ⇒ más presión».
**Error típico.** Cociente de temperaturas en °C ($157/27=5{,}8$ en lugar de 1,43).
**Figura sugerida.** Diagrama pV con dos isotermas (300 K y 430 K) y los estados 1 (0,750; 7,50 kPa) y 2 (0,410; 19,7 kPa).
Teoría: U §18.1 p. 586 (18.6).

---

### E5. Problema 18.13 (U p. 610; Solucionario 18-4) — el mismo gas en Venus

**Enunciado (de U).** Si una cierta cantidad de gas ideal ocupa un volumen V a TPE en la Tierra, ¿cuál sería su volumen (en términos de V) en Venus, donde la temperatura es de 1003 °C y la presión es de 92 atm?

**Solución.**
1. **TPE** (temperatura y presión estándar, U p. 587): $T=0$ °C $=273{,}15$ K, $p=1$ atm.
2. **Idea.** Misma cantidad de gas ⇒ (18.6): $V_V=V\,\dfrac{p_T}{p_V}\dfrac{T_V}{T_T}$.
3. **Kelvin:** $T_V=1276{,}15$ K.
4. **Cálculo:** $V_V=V\cdot\dfrac{1}{92}\cdot\dfrac{1276{,}15}{273{,}15}=$ **0,0508 V**.
5. **Lectura.** La temperatura multiplica el volumen por 4,7, pero la presión lo divide por 92: gana la presión, el gas ocupa ≈5 % de lo que ocupaba.

**Receta.** Sin datos numéricos de V, se trabaja con el cociente; el resultado sale «en términos de V».
**Error típico.** No saber qué es TPE o usar 0 °C dentro del cociente.
**Figura sugerida.** Dos cubos a escala: V (Tierra, 273 K, 1 atm) y 0,0508 V (Venus, 1276 K, 92 atm).
Teoría: U §18.1 pp. 586–587 (18.6), ejemplo 18.1 p. 587 (TPE).

---

### E6. Problema 18.1 (U p. 610; Solucionario 18-1) — helio en un tanque

**Enunciado (de U).** Un tanque de 20,0 L contiene $4{,}86\times10^{-4}$ kg de helio a 18,0 °C. La masa molar del helio es de 4,00 g/mol. a) ¿Cuántos moles de helio hay en el tanque? b) ¿Cuál es la presión en el tanque en pascales y atmósferas?

**Solución.**
1. **Idea.** Un solo estado ⇒ $pV=nRT$ (Estrategia 18.1). Primero hay que pasar la masa a moles.
2. **a)** (18.2) $n=\dfrac{m_{total}}{M}=\dfrac{4{,}86\times10^{-4}\ \text{kg}}{4{,}00\times10^{-3}\ \text{kg/mol}}=$ **0,122 mol** (pasar M a kg/mol).
3. **Unidades SI:** $V=20{,}0$ L $=0{,}0200$ m³; $T=291{,}15$ K; $R=8{,}314$ J/(mol·K).
4. **b)** $p=\dfrac{nRT}{V}=\dfrac{0{,}1215\cdot8{,}314\cdot291{,}15}{0{,}0200}=$ **1,47 × 10⁴ Pa** $=\dfrac{1{,}47\times10^4}{1{,}013\times10^5}=$ **0,145 atm**.
5. **Comprobación.** 1 mol a TPE ocupa 22,4 L (ejemplo 18.1); aquí hay ~1/8 de mol en ~20 L a temperatura parecida ⇒ presión del orden de 1/7 atm. ✓

**Receta.** Un estado: $n=m/M$ → $p=nRT/V$ con todo en SI (o R = 0,08206 L·atm/(mol·K) si se trabaja en L y atm).
**Error típico.** Dejar el volumen en litros con $R=8{,}314$ (sale una presión 1000 veces mayor).
**Figura sugerida.** No es necesaria (opcional: tanque con los datos $V$, $T$, $m$).
Teoría: U §18.1 pp. 585–586 (18.2), (18.3); ejemplo 18.1 p. 587.

---

### E7. Problema 18.6 (U p. 610; Solucionario 18-2) — cuánto aire o helio cabe en un globo

**Enunciado (de U).** Usted tiene varios globos idénticos y determina experimentalmente que uno de ellos se revienta si su volumen excede 0,900 L. La presión del gas dentro del globo es igual a la atmosférica (1,00 atm). a) Si el aire dentro del globo está a una temperatura constante de 22,0 °C y se comporta como gas ideal, ¿qué masa de aire podrá introducir en uno de esos globos sin que se reviente? b) Repita el inciso a) considerando que el gas es helio en vez de aire.

**Solución.**
1. **Idea.** Masa máxima = la que ocupa justo 0,900 L. Con (18.4): $m=\dfrac{pVM}{RT}$.
2. **Moles (comunes a los dos gases):** $n=\dfrac{pV}{RT}=\dfrac{1{,}013\times10^5\cdot0{,}900\times10^{-3}}{8{,}314\cdot295{,}15}=0{,}0372$ mol.
3. **a) Aire** ($M=28{,}8$ g/mol): $m=0{,}0372\cdot0{,}0288=$ **1,07 × 10⁻³ kg** (1,07 g).
4. **b) Helio** ($M=4{,}00$ g/mol): $m=0{,}0372\cdot0{,}00400=$ **1,49 × 10⁻⁴ kg** (0,149 g).
5. **Lectura.** A igual $p$, $V$, $T$ hay el **mismo número de moléculas** ($2{,}24\times10^{22}$) sea cual sea el gas; cambia la masa porque cambia la masa de cada molécula.

**Receta.** $pV=nRT$ da moles (independientes del gas); la masa sale multiplicando por $M$ de cada gas.
**Error típico.** Usar M en g/mol con R en SI (resultado mil veces mayor).
**Figura sugerida.** Dos globos iguales (0,900 L) con el mismo número de «bolitas» dibujadas, unas grandes (aire, 1,07 g) y otras pequeñas (helio, 0,149 g).
Teoría: U §18.1 p. 586 (18.3)–(18.4).

---

### E8. Problema 18.5 (U p. 610; Solucionario 18-2) — densidad de atmósferas planetarias

**Enunciado (de U).** Atmósferas planetarias. a) Calcule la densidad de la atmósfera en la superficie de Marte (donde la presión es de 650 Pa y la temperatura es normalmente de 253 K, con una atmósfera de CO₂), en Venus (con una temperatura media de 730 K y presión de 92 atm, con una atmósfera de CO₂), y en la luna de Saturno, Titán (donde la presión es de 1,5 atm y la temperatura de −178 °C con una atmósfera de N₂). b) Compare cada una de estas densidades con la de la atmósfera terrestre, que es de 1,20 kg/m³. Consulte el apéndice D para determinar las masas molares.

**Solución.**
1. **Idea.** La densidad de un gas ideal es $\rho=\dfrac{pM}{RT}$ (18.5): sale de $pV=\frac{m}{M}RT$ dividiendo por $V$.
2. **Masas molares:** CO₂: $12+2\cdot16=44$ g/mol; N₂: 28 g/mol (en kg/mol: 0,044 y 0,028).
3. **Marte:** $\rho=\dfrac{650\cdot0{,}044}{8{,}314\cdot253}=$ **0,0136 kg/m³**.
4. **Venus:** $p=92\cdot1{,}013\times10^5$ Pa: $\rho=\dfrac{9{,}32\times10^6\cdot0{,}044}{8{,}314\cdot730}=$ **67,6 kg/m³**.
5. **Titán:** $T=-178+273{,}15=95{,}15$ K: $\rho=\dfrac{1{,}5\cdot1{,}013\times10^5\cdot0{,}028}{8{,}314\cdot95{,}15}=$ **5,38 kg/m³**.
6. **b)** Dividiendo por 1,20 kg/m³: Marte **0,011** (≈1 %), Venus **56**, Titán **4,5** veces la terrestre. Titán, con menos presión que Venus, es muy densa por lo **fría** que está ($\rho\propto1/T$).

**Receta.** Densidad de un gas: $\rho=pM/RT$ ($p$ en Pa, $M$ en kg/mol, $T$ en K).
**Error típico.** Dejar M en g/mol (densidades 1000 veces mayores) o −178 sin pasar a kelvin.
**Figura sugerida.** Diagrama de barras en escala logarítmica con las cuatro densidades (Marte 0,0136; Tierra 1,20; Titán 5,38; Venus 67,6 kg/m³).
Teoría: U §18.1 p. 586 (18.5).

---

### E9. Problema 18.17 (U p. 610; Solucionario 18-5) — altura a la que la presión baja un 10 %

**Enunciado (de U).** Con las suposiciones del ejemplo 18.4 (sección 18.1), ¿a qué altura sobre el nivel del mar la presión del aire es el 90 % de la presión en el nivel del mar?

**Solución.**
1. **Suposiciones del ejemplo 18.4** (U pp. 588–589): $T=0$ °C $=273{,}15$ K y $g=9{,}80$ m/s² en toda la atmósfera, composición constante ($M=28{,}8$ g/mol). Con ellas, combinando $dp/dy=-\rho g$ (12.4) y $\rho=pM/RT$ se obtiene $p=p_0e^{-Mgy/RT}$.
2. **Plantear:** $0{,}90\,p_0=p_0e^{-Mgy/RT}\Rightarrow\ln0{,}90=-\dfrac{Mg}{RT}y$.
3. **Despejar:** $y=-\dfrac{RT}{Mg}\ln0{,}90$. La «altura de escala» es $\dfrac{RT}{Mg}=\dfrac{8{,}314\cdot273{,}15}{0{,}0288\cdot9{,}80}=8046$ m.
4. **Resultado:** $y=8046\cdot0{,}1054=$ **848 m ≈ 850 m**.
5. **Lectura.** Basta subir unos 850 m (una ciudad de meseta) para perder un 10 % de presión.

**Receta.** En $p=p_0e^{-y/H}$ con $H=RT/Mg$, la altura para una fracción $f$ es $y=-H\ln f$.
**Error típico.** Olvidar el signo de $\ln0{,}90<0$ (altura negativa) o usar $\log_{10}$.
**Figura sugerida.** Curva exponencial $p/p_0$ frente a $y$ (0–10 km) con la marca $p/p_0=0{,}90$ en $y=848$ m.
Teoría: U §18.1 ejemplo 18.4 pp. 588–589; §12.2 p. 372.

---

### E10. Problema 18.51 (U p. 613; Solucionario 18-13) — propano gastado en una parrillada

**Enunciado (de U).** Un cilindro de 1,00 m de altura con diámetro interior de 0,120 m contiene gas propano (masa molar 44,1 g/mol) que se usará en una parrillada. Inicialmente, el tanque se llena hasta que la presión manométrica es de $1{,}30\times10^6$ Pa y la temperatura es 22,0 °C. La temperatura del gas se mantiene constante mientras el tanque se vacía parcialmente hasta que la presión manométrica es de $3{,}40\times10^5$ Pa. Calcule la masa de propano utilizada.

**Solución.**
1. **Idea.** Ahora **n cambia** (sale gas), así que no vale (18.6) con n fijo. Con $V$, $T$ y $M$ constantes, $pV=\frac{m}{M}RT$ dice que $m\propto p$ (absoluta).
2. **Presiones absolutas** ($p=p_{man}+p_{atm}$): $p_1=1{,}30\times10^6+1{,}013\times10^5=1{,}401\times10^6$ Pa; $p_2=3{,}40\times10^5+1{,}013\times10^5=4{,}413\times10^5$ Pa.
3. **Volumen:** $V=\pi r^2h=\pi(0{,}060)^2(1{,}00)=0{,}01131$ m³; $T=295{,}15$ K.
4. **Masa inicial:** $m_1=\dfrac{p_1VM}{RT}=\dfrac{1{,}401\times10^6\cdot0{,}01131\cdot0{,}0441}{8{,}314\cdot295{,}15}=$ **0,2848 kg**.
5. **Masa final:** $m_2=m_1\dfrac{p_2}{p_1}=$ **0,0897 kg**.
6. **Usada:** $m_1-m_2=$ **0,195 kg**.

**Receta.** Recipiente rígido a T constante que pierde gas: $m\propto p_{abs}$; calcula una masa con $pV=\frac{m}{M}RT$ y la otra por proporción.
**Error típico.** Usar presiones manométricas en la proporción ($3{,}40/13{,}0$ en lugar de $4{,}41/14{,}0$): da 0,211 kg.
**Figura sugerida.** Cilindro con dos niveles «de presión» y una barra de masa: 0,285 kg → 0,090 kg, diferencia 0,195 kg.
Teoría: U §18.1 p. 586 (18.4); ejemplo 18.3 p. 588 (presión absoluta).

---

### E11. Problema 18.21 (U p. 611; Solucionario 18-6) — moles y moléculas en una botella de agua

**Enunciado (de U).** ¿Cuántos moles hay en una botella con 1,00 kg de agua? ¿Cuántas moléculas? La masa molar del agua es de 18,0 g/mol.

**Solución.**
1. **Moles** (18.2): $n=\dfrac{m}{M}=\dfrac{1{,}00}{0{,}0180}=$ **55,6 mol**.
2. **Moléculas:** cada mol tiene $N_A$ moléculas (U p. 592): $N=nN_A=55{,}6\cdot6{,}022\times10^{23}=$ **3,35 × 10²⁵ moléculas**.
3. **Comprobación** con (18.8): masa de una molécula $m=M/N_A=2{,}99\times10^{-26}$ kg; $1{,}00/2{,}99\times10^{-26}=3{,}35\times10^{25}$ ✓.

**Receta.** masa → (÷M) → moles → (×N_A) → moléculas.
**Error típico.** Dividir por 18,0 sin pasar a kg/mol (0,0556 mol).
**Figura sugerida.** Diagrama de flechas «m —÷M→ n —×N_A→ N» con los valores.
Teoría: U §18.1 p. 585 (18.2); §18.2 p. 592 (18.8).

---

### E12. Problema 18.23 (U p. 611; Solucionario 18-6) — moléculas en el vacío de laboratorio

**Enunciado (de U).** Las bombas de vacío modernas alcanzan fácilmente presiones del orden de 10⁻¹³ atm en el laboratorio. Considere un volumen de aire y trátelo como un gas ideal. a) A una presión de $9{,}00\times10^{-14}$ atm y una temperatura ordinaria de 300,0 K, ¿cuántas moléculas hay en un volumen de 1,00 cm³? b) ¿Cuántas moléculas estarían presentes a la misma temperatura, pero a una presión de 1,00 atm?

**Solución.**
1. **Idea.** $pV=NkT$ (18.18), o $pV=nRT$ y $N=nN_A$.
2. **SI:** $p=9{,}00\times10^{-14}\cdot1{,}013\times10^5=9{,}12\times10^{-9}$ Pa; $V=1{,}00\times10^{-6}$ m³.
3. **a)** $n=\dfrac{pV}{RT}=3{,}66\times10^{-18}$ mol ⇒ $N=nN_A=$ **2,20 × 10⁶ moléculas**.
4. **b)** A $V$ y $T$ fijos, $N\propto p$: $N_2=2{,}20\times10^6\cdot\dfrac{1{,}00}{9{,}00\times10^{-14}}=$ **2,45 × 10¹⁹ moléculas**.
5. **Lectura.** Incluso en el mejor vacío quedan millones de moléculas por cm³; a 1 atm hay unas 2,5 × 10¹⁹.

**Receta.** Contar moléculas: $N=pV/kT$; a $V$, $T$ fijos, $N\propto p$.
**Error típico.** Olvidar que 1 cm³ = 10⁻⁶ m³.
**Figura sugerida.** Dos cubos de 1 cm³ con densidad de puntos muy distinta y las cifras 2,2 × 10⁶ y 2,45 × 10¹⁹.
Teoría: U §18.2 p. 592; §18.3 p. 595 (18.18).

---

### E13. Problema 18.26 (U p. 611; Solucionario 18-7) — ¿qué tan cerca están las moléculas de un gas?

**Enunciado (de U).** ¿Qué tan cerca están las moléculas de gas? Considere un gas ideal a 27 °C y a una presión de 1,00 atm. Para tener una idea de qué tan cerca están estas moléculas entre sí, en promedio, imagine que se encuentran separadas de manera uniforme, cada una en el centro de un pequeño cubo. a) ¿Cuál es la longitud de la arista de cada cubo si cubos adyacentes se tocan pero no se traslapan? b) ¿Cómo se compara esta distancia con el diámetro de una molécula típica? c) ¿Cómo se compara esta separación con la que existe entre los átomos de sólidos, los cuales comúnmente se encuentran a 0,3 nm de distancia?

**Solución.**
1. **Idea.** El volumen «que le toca» a cada molécula es $V/N$; con $pV=NkT$, $\dfrac{V}{N}=\dfrac{kT}{p}=\dfrac{RT}{N_Ap}$.
2. **Cálculo:** $\dfrac{V}{N}=\dfrac{8{,}314\cdot300{,}15}{6{,}022\times10^{23}\cdot1{,}013\times10^5}=4{,}09\times10^{-26}$ m³.
3. **a) Arista:** $l=(V/N)^{1/3}=$ **3,45 × 10⁻⁹ m** (3,45 nm).
4. **b)** Una molécula típica mide ~10⁻¹⁰–4 × 10⁻¹⁰ m (en el ejemplo 18.8, $r=2{,}0\times10^{-10}$ m): la separación es **unas 10 veces el diámetro**.
5. **c)** $3{,}45/0{,}3\approx$ **11 veces** la separación en un sólido.
6. **Lectura.** Un gas a condiciones ordinarias es casi todo vacío: eso justifica tratar las moléculas como puntuales (supuesto 2 del modelo, U p. 593).

**Receta.** Separación media en un gas: $l=(kT/p)^{1/3}$.
**Error típico.** Tomar el volumen molar (22,4 L) como volumen por molécula, o hacer la raíz cuadrada en vez de la cúbica.
**Figura sugerida.** Rejilla de cubos de 3,45 nm con una molécula de ~0,4 nm en el centro de cada uno (dibujada a escala relativa).
Teoría: U §18.3 p. 593 (supuestos), p. 595 (18.18).

---

### E14. Problema 18.36 (U p. 612; Solucionario 18-9 y 18-10) — movimiento browniano del humo

**Enunciado (de U).** Las partículas de humo en el aire suelen tener masas del orden de 10⁻¹⁶ kg. El movimiento browniano (rápido e irregular) de estas partículas, resultado de choques con las moléculas de aire, se puede observar con un microscopio. a) Calcule la rapidez eficaz del movimiento browniano de una partícula con una masa de $3{,}00\times10^{-16}$ kg en aire a 300 K. b) ¿Sería diferente la rapidez eficaz si la partícula estuviera en hidrógeno gaseoso a la misma temperatura? Explique su respuesta.

**Solución.**
1. **Idea.** En equilibrio térmico, la partícula de humo es «una molécula más» del gas: su energía cinética media de traslación es $\frac32kT$ (18.16), sea cual sea su masa. Por tanto $v_{rms}=\sqrt{3kT/m}$ (18.19).
2. **a)** $v_{rms}=\sqrt{\dfrac{3\cdot1{,}381\times10^{-23}\cdot300}{3{,}00\times10^{-16}}}=$ **6,44 × 10⁻³ m/s = 6,44 mm/s**.
3. **b)** **No.** La $v_{rms}$ de la partícula depende solo de $T$ y de **su propia** masa. En hidrógeno las moléculas del gas van más deprisa (son más ligeras), pero tienen la misma energía cinética media $\frac32kT$, y la partícula también.
4. **Comparación.** Las moléculas de aire a 300 K tienen $v_{rms}\approx510$ m/s; la partícula, 80 000 veces más lenta.

**Receta.** $v_{rms}=\sqrt{3kT/m}$ vale para cualquier partícula en equilibrio a $T$ (molécula o grano de humo); lo común a todas es $\frac32kT$.
**Error típico.** Pensar que en hidrógeno la partícula se movería más rápido porque «la golpean moléculas más rápidas».
**Figura sugerida.** Trayectoria quebrada (camino aleatorio) de la partícula de humo rodeada de moléculas pequeñas con flechas.
Teoría: U §18.3 pp. 595–596 (18.16), (18.19).

---

### E15. Problema 18.33 (U pp. 611–612; Solucionario 18-8 y 18-9) — una molécula de oxígeno en una caja

**Enunciado (de U).** a) El oxígeno (O₂) tiene una masa molar de 32,0 g/mol. a) Calcule la energía cinética de traslación media de una molécula de oxígeno a 300 K. b) ¿Cuál es el valor medio del cuadrado de su rapidez? c) Calcule su rapidez rms. d) Calcule el momento lineal de una molécula de oxígeno que viaja con esa rapidez. e) Suponga que una molécula de oxígeno que viaja con esa rapidez rebota entre los costados opuestos de un recipiente cúbico de 0,10 m por lado. ¿Qué fuerza media ejerce la molécula sobre cada una de las paredes del recipiente? (Suponga que la velocidad de la molécula es perpendicular a los dos costados que golpea). f) Calcule la fuerza media por unidad de área. g) ¿Cuántas moléculas de oxígeno que viajan con esa rapidez se necesitan para producir una presión media de 1 atm? h) Calcule el número de moléculas de oxígeno contenidas realmente en un recipiente de ese tamaño a 300 K y presión atmosférica. i) Su respuesta al inciso h) deberá ser 3 veces mayor que su respuesta en g). ¿Cuál es el origen de esta discrepancia?

**Solución.**
1. **a)** (18.16): $\frac12m(v^2)_{med}=\frac32kT=\frac32(1{,}381\times10^{-23})(300)=$ **6,21 × 10⁻²¹ J**.
2. **Masa de una molécula** (18.8): $m=M/N_A=0{,}0320/6{,}022\times10^{23}=5{,}31\times10^{-26}$ kg.
3. **b)** $(v^2)_{med}=\dfrac{2\cdot6{,}21\times10^{-21}}{5{,}31\times10^{-26}}=$ **2,34 × 10⁵ m²/s²**.
4. **c)** $v_{rms}=\sqrt{(v^2)_{med}}=$ **484 m/s** (como en el ejemplo 18.6, p. 597).
5. **d)** $P=mv_{rms}=$ **2,57 × 10⁻²³ kg·m/s**.
6. **e) Fuerza media sobre una pared.** En cada choque elástico la velocidad perpendicular se invierte: $\Delta P=2mv$ (como en la deducción de U p. 594). Entre dos choques con **la misma** pared la molécula recorre ida y vuelta, $2L=0{,}20$ m: $\Delta t=0{,}20/484=4{,}14\times10^{-4}$ s. $F_{med}=\dfrac{\Delta P}{\Delta t}=\dfrac{5{,}14\times10^{-23}}{4{,}14\times10^{-4}}=$ **1,24 × 10⁻¹⁹ N** (= $mv^2/L$).
7. **f)** $F/A=1{,}24\times10^{-19}/(0{,}10)^2=$ **1,24 × 10⁻¹⁷ Pa** por molécula.
8. **g)** Para 1 atm: $N=1{,}013\times10^5/1{,}24\times10^{-17}=$ **8,15 × 10²¹ moléculas**.
9. **h)** Real, con $pV=NkT$: $N=\dfrac{1{,}013\times10^5\cdot(0{,}10)^3}{1{,}381\times10^{-23}\cdot300}=$ **2,45 × 10²² moléculas**.
10. **i)** Cociente exactamente **3**. En g) se supuso que todas las moléculas van perpendiculares a esas dos paredes con $v_x^2=v_{rms}^2$; en realidad se mueven en las tres direcciones y $(v_x^2)_{med}=\frac13(v^2)_{med}$ (U p. 594, paso de (18.11) a (18.12)). Cada molécula aporta en promedio un tercio de lo supuesto ⇒ hacen falta 3 veces más.

**Receta.** Presión cinética: una molécula da $F=mv_x^2/L$ sobre una pared; sumando $N$ moléculas y usando $(v_x^2)_{med}=\frac13(v^2)_{med}$ sale $pV=\frac23N\cdot\frac12m(v^2)_{med}$.
**Error típico.** Tomar $\Delta t=L/v$ (la molécula tarda ida y vuelta en volver a la misma pared) o $\Delta P=mv$ (olvidar que la velocidad se invierte).
**Figura sugerida.** Cubo de 0,10 m con una molécula rebotando entre dos caras opuestas: $v_{rms}=484$ m/s, $\Delta P=2mv$, recorrido $2L$.
Teoría: U §18.3 pp. 593–596 (18.11)–(18.19); ejemplo 18.6 p. 597.

---

### E16. Problema 18.63 (U p. 614; Solucionario 18-18) — igualar las $v_{rms}$ de dos gases

**Enunciado (de U).** Usted tiene dos recipientes idénticos, uno contiene el gas A y el otro contiene el gas B. Las masas de estas moléculas son $m_A=3{,}34\times10^{-27}$ kg y $m_B=5{,}34\times10^{-26}$ kg. Ambos gases están a la misma presión y a 10,0 °C. a) ¿Cuáles moléculas (A o B) tienen la mayor energía cinética de traslación por molécula y la mayor rapidez rms? Ahora usted desea elevar la temperatura de sólo uno de esos recipientes, de manera que ambos gases tengan la misma rapidez rms. b) ¿De cuál gas elevaría la temperatura? c) ¿A qué temperatura logrará su cometido? d) Una vez que haya logrado su meta, ¿qué moléculas (A o B) tienen ahora la mayor energía cinética de traslación media por molécula?

**Solución.**
1. **a) Energía cinética media:** $\frac32kT$ (18.16) depende solo de $T$ ⇒ **la misma** para A y B ($5{,}87\times10^{-21}$ J). **$v_{rms}=\sqrt{3kT/m}$**: a igual $T$, mayor la de la molécula más ligera ⇒ **A** (1874 m/s frente a 469 m/s).
2. **b)** Para que B alcance a A hay que **calentar B** (enfriar no está permitido: «elevar la temperatura»).
3. **c)** Igualar: $\dfrac{3kT_A}{m_A}=\dfrac{3kT_B}{m_B}\Rightarrow T_B=T_A\dfrac{m_B}{m_A}=283{,}15\cdot15{,}99=$ **4,53 × 10³ K ≈ 4250 °C**.
4. **d)** Ahora $T_B>T_A$ ⇒ **B** tiene mayor energía cinética media (16 veces mayor).
5. **Comentario.** $m_AN_A=2{,}01$ g/mol (H₂) y $m_BN_A=32{,}2$ g/mol (O₂): es hidrógeno frente a oxígeno. La presión común no interviene.

**Receta.** A igual $T$: igual $\bar K$, distinta $v_{rms}\propto1/\sqrt m$; para igualar $v_{rms}$, $T/m$ debe ser igual.
**Error típico.** Creer que mayor $v_{rms}$ implica mayor energía cinética media (o que «el más pesado tiene más energía»).
**Figura sugerida.** Dos curvas de Maxwell-Boltzmann (A y B a 283 K) y la de B a 4527 K superpuesta a la de A (misma $v_{rms}$ marcada).
Teoría: U §18.3 pp. 595–596 (18.16), (18.19).

---

### E17. Problema 18.38 (U p. 612; Solucionario 18-10) — el mismo calor a H₂ y a Ne

**Enunciado (de U).** Recipientes perfectamente rígidos contienen cada uno n moles de gas ideal: uno de ellos es hidrógeno (H₂) y el otro es neón (Ne). Si se requieren 300 J de calor para aumentar la temperatura del hidrógeno en 2,50 °C, ¿en cuántos grados elevará la misma cantidad de calor la temperatura del neón?

**Solución.**
1. **Idea.** Recipiente rígido ⇒ volumen constante ⇒ $Q=nC_V\Delta T$ (18.24).
2. **Capacidades:** H₂ diatómico, $C_V=\frac52R$ (18.26) (3 grados de traslación + 2 de rotación, ½kT cada uno, equipartición, U p. 600); Ne monoatómico, $C_V=\frac32R$ (18.25).
3. **Mismo Q y mismo n:** $C_{V,H_2}\Delta T_{H_2}=C_{V,Ne}\Delta T_{Ne}\Rightarrow\Delta T_{Ne}=\dfrac{5/2}{3/2}\cdot2{,}50=$ **4,17 K (= 4,17 C°)**.
4. **Lectura.** El neón se calienta más: toda la energía va a traslación (temperatura); en el H₂ parte se va a la rotación. (Dato sobrante: $n=300/(\frac52R\cdot2{,}50)=5{,}77$ mol, no se necesita.)

**Receta.** Mismo calor y mismos moles a V constante: $\Delta T\propto1/C_V$.
**Error típico.** Invertir el cociente (dar 1,50 K) o usar $C_p$.
**Figura sugerida.** Dos barras de energía: H₂ (traslación 3/5, rotación 2/5) frente a Ne (todo traslación), con ΔT = 2,50 K y 4,17 K.
Teoría: U §18.4 pp. 599–601 (18.24)–(18.26).

---

### E18. Problema 18.41 (U p. 612; Solucionario 18-11) — las tres rapideces del CO₂

**Enunciado (de U).** Para dióxido de carbono gaseoso (CO₂, masa molar $=44{,}0$ g/mol) a $T=300$ K, calcule a) la rapidez más probable $v_{mp}$; b) la rapidez media $v_{med}$; c) la rapidez eficaz $v_{rms}$.

**Solución.**
1. **Fórmulas** (U pp. 603–604): $v_{mp}=\sqrt{2kT/m}$ (18.34), $v_{med}=\sqrt{8kT/\pi m}$ (18.35), $v_{rms}=\sqrt{3kT/m}$ (18.36). Como $k/m=R/M$, se usa $R$ y $M=0{,}0440$ kg/mol.
2. **a)** $v_{mp}=\sqrt{\dfrac{2\cdot8{,}314\cdot300}{0{,}0440}}=$ **337 m/s** (máximo de la curva de Maxwell-Boltzmann).
3. **b)** $v_{med}=\sqrt{\dfrac{8\cdot8{,}314\cdot300}{\pi\cdot0{,}0440}}=$ **380 m/s**.
4. **c)** $v_{rms}=\sqrt{\dfrac{3\cdot8{,}314\cdot300}{0{,}0440}}=$ **412 m/s**.
5. **Orden** $v_{mp}<v_{med}<v_{rms}$: la cola de la distribución hacia rapideces altas desplaza la media a la derecha del máximo, y al elevar al cuadrado las rapideces altas pesan aún más.

**Receta.** Calcula una (p. ej. $v_{mp}$) y obtén las otras con $1:1{,}128:1{,}225$.
**Error típico.** Confundir $v_{med}$ y $v_{rms}$, o usar M en g/mol (rapideces 31,6 veces menores).
**Figura sugerida.** Curva $f(v)$ del CO₂ a 300 K con tres líneas verticales en 337, 380 y 412 m/s.
Teoría: U §18.5 pp. 603–604 (18.32)–(18.36).

---

### E19. Problema 18.44 (U p. 612; Solucionario 18-11) — humedad relativa y agua en el aire

**Enunciado (de U).** Meteorología. La presión de vapor es la presión de la fase de vapor de una sustancia cuando está en equilibrio con la fase sólida o líquida de la sustancia. La humedad relativa es la presión parcial del vapor de agua en el aire dividida entre la presión de vapor del agua a esa misma temperatura, expresada como porcentaje. El aire está saturado cuando la humedad es del 100 %. a) La presión de vapor del agua a 20,0 °C es de $2{,}34\times10^3$ Pa. Si la temperatura del aire es de 20,0 °C y la humedad relativa es de 60 %, determine la presión parcial del vapor de agua en la atmósfera (esto es, la presión debida exclusivamente al vapor de agua). b) En las condiciones del inciso a), ¿qué masa de agua hay en 1,00 m³ de aire? (La masa molar del agua es de 18,0 g/mol. Suponga que el vapor de agua puede tratarse como gas ideal).

**Solución.**
1. **a) Definición:** $p_{vapor}=0{,}60\cdot2{,}34\times10^3=$ **1,40 × 10³ Pa** (1404 Pa).
2. **b) Idea.** El vapor de agua ocupa todo el metro cúbico a su **presión parcial**, como si los demás gases no estuvieran: $m=\dfrac{pVM}{RT}$ (18.4) con $p=p_{vapor}$.
3. **Cálculo:** $m=\dfrac{1404\cdot1{,}00\cdot0{,}0180}{8{,}314\cdot293{,}15}=0{,}0104$ kg $=$ **10,4 g**.
4. **Lectura.** Unos 10 g de agua por m³; el vapor aporta solo el 1,4 % de la presión atmosférica.

**Receta.** Cada gas de una mezcla cumple $p_iV=n_iRT$ con su presión parcial.
**Error típico.** Usar la presión atmosférica total (daría 750 g de agua por m³).
**Figura sugerida.** Barra de presión atmosférica (101 kPa) con la franja del vapor (1,40 kPa) resaltada.
Teoría: U §18.1 p. 586 (18.4); §18.6 p. 604 (presión de vapor).

---

### E20. Problema 18.49 (U p. 612; Solucionario 18-12 y 18-13) — globo de aire caliente

**Enunciado (de U).** Un globo de aire caliente permanece suspendido porque el aire caliente a presión atmosférica es menos denso que el aire frío a la misma presión. Si el volumen del globo es 500,0 m³ y el aire circundante está a 15,0 °C, ¿cuál debe ser la temperatura del aire en el globo para levantar una carga total de 290 kg (además de la masa de aire caliente)? La densidad del aire a 15,0 °C y a presión atmosférica es 1,23 kg/m³.

**Solución.**
1. **Fuerzas sobre el globo** (equilibrio): empuje hacia arriba $B=\rho_{frío}Vg$ (Arquímedes, U p. 376); hacia abajo, peso de la carga $290g$ y peso del aire caliente $\rho_{cal}Vg$.
2. **Equilibrio:** $\rho_{frío}Vg=290g+\rho_{cal}Vg\Rightarrow\rho_{cal}=\rho_{frío}-\dfrac{290}{V}=1{,}23-0{,}58=0{,}65$ kg/m³.
3. **Densidad y temperatura** (18.5): $\rho=pM/RT$; misma $p$ y $M$ dentro y fuera ⇒ $\rho T=$ cte ⇒ $T_{cal}=T_{frío}\dfrac{\rho_{frío}}{\rho_{cal}}$.
4. **Cálculo:** $T_{cal}=288{,}15\cdot\dfrac{1{,}23}{0{,}65}=$ **545 K = 272 °C**.

**Receta.** Flotación de gases: $\rho_{gas}=pM/RT$ y, a igual presión y gas, $\rho\propto1/T$.
**Error típico.** Olvidar el peso del propio aire caliente (daría $\rho_{cal}=0$) o hacer la proporción con °C.
**Figura sugerida.** DCL del globo: $B=6027$ N hacia arriba; pesos 2842 N (carga) y 3185 N (aire caliente) hacia abajo.
Teoría: U §12.3 p. 376; §18.1 p. 586 (18.5).

---

### E21. Problema 18.60 (U p. 613; Solucionario 18-17) — tensión del hilo de una esfera ligera

**Enunciado (de U).** Una esfera ligera y plástica con masa $m=9{,}00$ g y densidad $\rho=4{,}00$ kg/m³ se suspende en el aire con hilo de masa despreciable. a) ¿Cuál es la tensión T en el hilo si el aire está a 5,00 °C y p = 1,00 atm? La masa molar del aire es 28,8 g/mol. b) ¿Cuánto cambia la tensión en el hilo si la temperatura del gas aumenta a 35,0 °C? Desprecie el cambio en el volumen de la esfera plástica cuando se modifica la temperatura.

**Solución.**
1. **Fuerzas** (la esfera cuelga en reposo): tensión $F$ hacia arriba, empuje $B$ hacia arriba, peso $mg$ hacia abajo: $F=mg-B$.
2. **Volumen de la esfera:** $V=m/\rho=0{,}00900/4{,}00=2{,}25\times10^{-3}$ m³.
3. **Densidad del aire a 5,00 °C** (18.5): $\rho_a=\dfrac{pM}{RT}=\dfrac{1{,}013\times10^5\cdot0{,}0288}{8{,}314\cdot278{,}15}=1{,}262$ kg/m³.
4. **a)** $B=\rho_aVg=1{,}262\cdot2{,}25\times10^{-3}\cdot9{,}80=0{,}0278$ N; $mg=0{,}0882$ N ⇒ $F=$ **0,0604 N**.
5. **b)** A 35,0 °C (308,15 K): $\rho_a=1{,}139$ kg/m³, $B=0{,}0251$ N, $F=0{,}0631$ N. **La tensión aumenta 2,71 × 10⁻³ N** (2,71 mN). En fórmula: $\Delta F=\dfrac{mgpM}{\rho R}\left(\dfrac1{T_1}-\dfrac1{T_2}\right)$.
6. **Lectura.** Aire más caliente ⇒ menos denso ⇒ menos empuje ⇒ el hilo soporta más.

**Receta.** Empuje en un gas: $B=\dfrac{pM}{RT}Vg$; un cambio de temperatura cambia $B$ a través de la densidad.
**Error típico.** Usar 25 °C (298,15 K) o °C en la densidad; olvidar el empuje del aire (tomar $F=mg$).
**Figura sugerida.** DCL de la esfera con $F$ (0,0604 N), $B$ (0,0278 N) y $mg$ (0,0882 N) a escala.
Teoría: U §12.3 p. 376; §18.1 p. 586 (18.5).

---

### E22. Problema 18.57 (U p. 613; Solucionario 18-15 y 18-16) — globo de hidrógeno o de helio

**Enunciado (de U).** Un globo con un volumen de 750 m³ se va a llenar con hidrógeno a presión atmosférica ($1{,}01\times10^5$ Pa). a) Si el hidrógeno se guarda en cilindros de 1,90 m³ a una presión manométrica de $1{,}20\times10^6$ Pa, ¿cuántos cilindros se necesitarán? Suponga que la temperatura del hidrógeno se mantiene constante. b) ¿Qué peso total (además del peso del gas) puede sostener el globo si el gas y el aire circundante están a 15,0 °C? La masa molar del hidrógeno (H₂) es de 2,02 g/mol. La densidad del aire a 15,0 °C y a presión atmosférica es de 1,23 kg/m³. Vea el capítulo 12 para una explicación de la flotación. c) ¿Qué peso se podría sostener si el globo se llenara con helio (masa molar de 4,00 g/mol) en vez de hidrógeno, también a 15,0 °C?

**Solución.**
1. **a) Gas de un cilindro al expandirse a 1 atm** (T constante, Boyle): presión absoluta en el cilindro $p_1=1{,}20\times10^6+1{,}01\times10^5=1{,}301\times10^6$ Pa. $V_2=V_1\dfrac{p_1}{p_2}=1{,}90\cdot\dfrac{1{,}301\times10^6}{1{,}01\times10^5}=24{,}47$ m³ por cilindro.
2. **Número:** $750/24{,}47=30{,}6$ ⇒ hacen falta **31 cilindros** (con 30 no se llena).
3. **b) Masa de hidrógeno** en el globo (18.4): $m_{gas}=\dfrac{pVM}{RT}=\dfrac{1{,}01\times10^5\cdot750\cdot0{,}00202}{8{,}314\cdot288{,}15}=63{,}9$ kg.
4. **Equilibrio:** $B=\rho_{aire}Vg=m_{carga}g+m_{gas}g\Rightarrow m_{carga}=1{,}23\cdot750-63{,}9=858{,}6$ kg ⇒ peso **8,41 × 10³ N**.
5. **c) Helio:** a igual $p$, $V$, $T$, la masa es proporcional a $M$: $m_{He}=63{,}9\cdot\dfrac{4{,}00}{2{,}02}=126{,}5$ kg ⇒ $m_{carga}=796$ kg ⇒ peso **7,80 × 10³ N**.
6. **Lectura.** El helio, con el doble de masa molar, solo reduce la carga un 7 %: lo que manda es el aire desalojado (922 kg).

**Receta.** Globo: carga = (masa de aire desalojado) − (masa del gas de relleno), con $m_{gas}=pVM/RT$.
**Error típico.** Usar la presión manométrica del cilindro en Boyle; redondear 30,6 hacia abajo.
**Figura sugerida.** DCL del globo con $B=9040$ N, peso del gas (626 N con H₂) y peso de la carga (8414 N).
Teoría: U §18.1 p. 586 (18.4), (18.6); §12.3 p. 376.

---

### E23. Problema 18.52 (U p. 613; Solucionario 18-13) — la campana de rescate del Squalus

**Enunciado (de U).** Durante una inmersión de prueba en 1939 antes de ser aceptado por la Marina de Estados Unidos, el submarino Squalus se hundió en un punto donde la profundidad del agua era de 73,0 m. La temperatura en la superficie era de 27,0 °C, y en el fondo, 7,0 °C. La densidad del agua de mar es de 1030 kg/m³. a) Se usó una campana de inmersión con forma de cilindro circular de 2,30 m de altura, abierto abajo y cerrado arriba, para rescatar a 33 tripulantes atrapados en el Squalus. Al bajar la campana al fondo, ¿a qué altura subió el agua dentro de la campana? (Sugerencia: Puede despreciarse la relativamente pequeña variación en la presión del agua entre el fondo de la campana y la superficie del agua dentro de la campana). b) ¿Con qué presión manométrica debió haberse suministrado aire comprimido a la campana en el fondo para expulsar de ella toda el agua?

**Solución.**
1. **Idea.** El aire atrapado en la campana es una cantidad fija de gas ideal ⇒ (18.6). Al ser un cilindro de sección constante $A$, $V=Ah$: la altura de la columna de aire hace el papel del volumen.
2. **Estado 1 (superficie):** $p_1=1{,}013\times10^5$ Pa, $h_1=2{,}30$ m, $T_1=300{,}15$ K.
3. **Estado 2 (fondo):** presión hidrostática (12.6) a 73,0 m (sugerencia: la misma en toda la campana): $p_2=p_{atm}+\rho gy=1{,}013\times10^5+1030\cdot9{,}80\cdot73{,}0=8{,}38\times10^5$ Pa; $T_2=280{,}15$ K.
4. **Columna de aire:** $h_2=h_1\dfrac{p_1}{p_2}\dfrac{T_2}{T_1}=2{,}30\cdot\dfrac{1{,}013\times10^5}{8{,}38\times10^5}\cdot\dfrac{280{,}15}{300{,}15}=0{,}259$ m.
5. **a) El agua sube** $2{,}30-0{,}26=$ **2,04 m** dentro de la campana.
6. **b)** Para expulsar toda el agua, el aire tiene que estar a la presión del agua en el borde inferior, $p_2=p_{atm}+\rho gy$; su presión manométrica es $\rho gy=1030\cdot9{,}80\cdot73{,}0=$ **7,37 × 10⁵ Pa** (≈ 7,3 atm).

**Receta.** Gas atrapado bajo un líquido: presión = hidrostática a esa profundidad, volumen ∝ altura de la columna; luego (18.6).
**Error típico.** Usar solo $\rho gy$ como presión absoluta en el fondo (olvidar $p_{atm}$) o no corregir la temperatura.
**Figura sugerida.** Campana de 2,30 m en el fondo (73 m) con 0,26 m de aire arriba y 2,04 m de agua; a la izquierda, la misma campana en superficie llena de aire.
Teoría: U §12.2 p. 373 (12.6); §18.1 p. 586 (18.6).

---

### E24. Problema 18.59 (U p. 613; Solucionario 18-16 y 18-17) — tanque presurizado que se vacía

**Enunciado (de U).** Un tanque grande de agua tiene una manguera conectada (figura P18.59). El tanque está sellado por arriba y tiene aire comprimido entre la superficie del agua y la tapa. Cuando la altura del agua h es de 3,50 m, la presión absoluta p del aire comprimido es de $4{,}20\times10^5$ Pa. Suponga que ese aire se expande a temperatura constante, y considere que la presión atmosférica es $1{,}00\times10^5$ Pa. a) ¿Con qué rapidez sale agua por la manguera cuando h = 3,50 m? b) Al salir agua del tanque, h disminuye. Calcule la rapidez de flujo para h = 3,00 m y h = 2,00 m. c) ¿En qué valor de h se detiene el flujo?
(Figura P18.59: tanque de 4,00 m de alto; la salida de la manguera está a 1,00 m sobre el fondo.)

**Solución.**
1. **Bernoulli** (12.17) entre la superficie del agua (1) y la salida de la manguera (2): $p_1+\rho gy_1+\frac12\rho v_1^2=p_2+\rho gy_2+\frac12\rho v_2^2$. Tanque grande ⇒ $v_1\approx0$; salida al aire ⇒ $p_2=p_{atm}$; $y_1-y_2=h-1{,}00$ m. Queda $v_2=\sqrt{\dfrac{2}{\rho}(p-p_{atm})+2g(h-1{,}00)}$.
2. **a)** $h=3{,}50$ m, $p=4{,}20\times10^5$ Pa: $v_2=\sqrt{640+49}=$ **26,2 m/s**.
3. **Presión del aire al bajar el agua** (gas ideal a T constante, Boyle): la columna de aire mide $4{,}00-h$ y $V=A(4{,}00-h)$: $p=p_0\dfrac{4{,}00-3{,}50}{4{,}00-h}=\dfrac{2{,}10\times10^5\ \text{Pa·m}}{4{,}00-h}$.
4. **b)** $h=3{,}00$ m: $p=2{,}10\times10^5$ Pa, $v_2=$ **16,1 m/s**. $h=2{,}00$ m: $p=1{,}05\times10^5$ Pa, $v_2=$ **5,44 m/s**.
5. **c) El flujo se detiene** cuando $v_2=0$: $\dfrac{2{,}10\times10^5}{4{,}00-h}-1{,}00\times10^5=-1000\cdot9{,}80\,(h-1{,}00)$. Multiplicando por $(4{,}00-h)$ y ordenando: $9{,}80h^2-149h+229{,}2=0$ (en unidades de kPa y m), con raíces $h=1{,}74$ m y $h=13{,}5$ m. La segunda supera la altura del tanque ⇒ **h = 1,74 m**.
6. **Comprobación:** a $h=1{,}74$ m el aire está a $p=9{,}28\times10^4$ Pa (por debajo de la atmosférica) y el agua sobre la salida aporta $\rho g(0{,}74)=7{,}2\times10^3$ Pa: total $1{,}00\times10^5$ Pa = $p_{atm}$ ✓.

**Receta.** Problema combinado: Bernoulli para la salida + gas ideal (Boyle) para la presión que empuja, que cambia con el nivel.
**Error típico.** Suponer constante la presión del aire, o aceptar la raíz de 13,5 m sin comprobar que cabe en el tanque.
**Figura sugerida.** Gráfica de $v_2$ frente a $h$ (de 3,50 a 1,74 m) con los puntos (3,50; 26,2), (3,00; 16,1), (2,00; 5,44) y (1,74; 0), junto al esquema del tanque.
Teoría: U §12.5 p. 382 (12.17); §18.1 p. 586 (18.6).

---

### E25. Problema práctico de U (p. 608) — gas en Europa, la luna de Júpiter

**Enunciado (de U).** Un astronauta que visita un satélite de Júpiter, Europa, deja en la superficie un recipiente de 1,20 moles de gas nitrógeno (28,0 g/mol) a 25,0 °C. Europa no tiene una atmósfera significativa, y la aceleración de la gravedad en su superficie es de 1,30 m/s². El recipiente tiene una fuga, permitiendo que las moléculas escapen por un orificio pequeño. a) ¿Cuál es la altura máxima (en km) arriba de la superficie de Europa a la que llega una molécula de nitrógeno cuya rapidez es igual a la rapidez rms? Suponga que la molécula se disparó hacia arriba fuera del orificio del recipiente, y desprecie la variación de g con la altura. b) La rapidez de escape de Europa es 2025 m/s. ¿Puede alguna de las moléculas de nitrógeno escapar de Europa e ir al espacio?
(Guía de U: 1) esquema; 2) cantidades conocidas e incógnitas; 3) cómo hallar $v_{rms}$ y qué principio da la altura máxima; 4) ¿es $v_{rms}$ la rapidez máxima?; 5) calcular; 6) responder b); 7) ¿depende de la cantidad de gas?; 8) ¿qué cambiaría en Ganímedes?)

**Solución.**
1. **Datos e incógnitas (pasos 1–2).** $n=1{,}20$ mol, $M=0{,}0280$ kg/mol, $T=298{,}15$ K, $g=1{,}30$ m/s², $v_{esc}=2025$ m/s. Incógnitas: $h_{max}$ y si alguna molécula supera $v_{esc}$.
2. **Herramientas (paso 3).** $v_{rms}=\sqrt{3RT/M}$ (18.19); para la altura, **conservación de la energía mecánica** (U §7.1): sin atmósfera no hay choques ni rozamiento, $\frac12mv^2=mgh_{max}$.
3. **Paso 5.** $v_{rms}=\sqrt{\dfrac{3\cdot8{,}314\cdot298{,}15}{0{,}0280}}=$ **515 m/s**. $h_{max}=\dfrac{v_{rms}^2}{2g}=\dfrac{515{,}4^2}{2\cdot1{,}30}=1{,}02\times10^5$ m $=$ **102 km**. (La masa de la molécula se cancela.)
4. **Paso 4: $v_{rms}$ no es la rapidez máxima.** Las rapideces siguen la distribución de Maxwell-Boltzmann (18.32), que no tiene máximo absoluto: siempre hay una fracción, aunque minúscula, con rapideces muy altas (U p. 603, «cola» de la figura 18.23).
5. **b) (paso 6).** $v_{esc}/v_{rms}=2025/515=3{,}93$. Según la tabla 18.2, ya con $v>2v_{rms}$ solo queda el 0,7 % de las moléculas; para $3{,}93\,v_{rms}$ la fracción es del orden de $5\times10^{-10}$ (integrando la distribución (18.32)). Como hay $1{,}20\cdot N_A=7{,}2\times10^{23}$ moléculas, **sí, algunas pueden escapar** (del orden de 10¹⁴), aunque la gran mayoría no. Además, las que escapan se reponen por choques dentro del recipiente, así que con el tiempo se irían más.
6. **Paso 7.** **No depende de la cantidad de gas:** $v_{rms}$ y $h_{max}$ dependen solo de $T$, $M$ y $g$; la cantidad solo cambia cuántas moléculas escapan, no la fracción.
7. **Paso 8 (Ganímedes).** Con $g$ mayor, $h_{max}=v_{rms}^2/2g$ **menor**; con $v_{esc}$ mayor, la fracción capaz de escapar es **todavía más pequeña** (la cola de la distribución decrece como $e^{-v^2/v_{mp}^2}$).

**Receta.** Molécula «lanzada» sin colisiones: $v$ de la teoría cinética ($v_{rms}$) + conservación de la energía; para escapar, comparar $v_{esc}$ con la cola de Maxwell-Boltzmann, no con $v_{rms}$.
**Error típico.** Decir «no escapa ninguna porque $v_{rms}<v_{esc}$»; usar M en g/mol; usar °C.
**Figura sugerida.** Curva $f(v)$ del N₂ a 298 K con $v_{rms}=515$ m/s marcada y la línea de $v_{esc}=2025$ m/s muy a la derecha (cola sombreada, «no a escala» en vertical); al lado, la molécula subiendo 102 km.
Teoría: U §18.3 p. 596 (18.19); §18.5 pp. 603–604 (18.32), tabla 18.2; §7.1 p. 205.

---

## Tabla de verificación (sympy)

| Ejercicio | Resultado verificado |
|---|---|
| X1 Sep 2024 P-2 | $T_a=214{,}95$ K; $V_a=0{,}017871$ m³; $V_c=0{,}047656$ m³; $Q_{ab}=6701{,}6$ J; $Q_{bc}=7011{,}3$ J; $Q_{ca}=-11\,169{,}3$ J; $W=2543{,}6$ J; $Q_H=13\,712{,}9$ J; $e=0{,}18549$; $e_C=0{,}625$ |
| X2 Feb 2025 1ª P-2 | $T_a=252{,}586$ K; $p_b=21\,000$ Pa; $T_c=841{,}953$ K; $Q_{ab}=2528{,}34$ J; $Q_{bc}=12\,250$ J; $Q_{ca}=-17\,150$ J; $W_{ca}=-4900$ J; $W=-2371{,}66$ J; $K=6{,}2312$ |
| X3 Feb 2025 2ª P-2 | $ab$: $W=108\,000$, $\Delta U=162\,000$, $Q=270\,000$ J; $bc$: $\Delta U=Q=-246\,000$ J; $ca$: $W=-81\,000$, $\Delta U=84\,000$, $Q=3000$ J; $W_{ciclo}=27\,000$ J; $V^*=109/160=0{,}68125$ m³; en la recta entra 28 520,8 J y sale 25 520,8 J; $e=0{,}09045$ (0,0989 con el neto) |
| 18.3 | $p_2=0{,}10013$ atm |
| 18.11 | $V_2=0{,}15875$ L |
| 18.14 | 3,7399 |
| 18.9 | $p_2=1{,}9662\times10^4$ Pa |
| 18.13 | $0{,}050782\,V$ |
| 18.1 | $n=0{,}1215$ mol; $p=14\,705$ Pa $=0{,}14517$ atm |
| 18.6 | $n=0{,}037154$ mol; aire $1{,}0700\times10^{-3}$ kg; He $1{,}4861\times10^{-4}$ kg; $N=2{,}237\times10^{22}$ |
| 18.5 | 0,013597; 67,564; 5,3782 kg/m³; cocientes 0,01133; 56,30; 4,482 |
| 18.17 | $RT/Mg=8046{,}2$ m; $y=847{,}76$ m |
| 18.51 | $V=0{,}011310$ m³; $m_1=0{,}28482$ kg; $m_2=0{,}089696$ kg; usada 0,19512 kg |
| 18.21 | 55,556 mol; $3{,}3456\times10^{25}$ moléculas; $m=2{,}989\times10^{-26}$ kg |
| 18.23 | $n=3{,}6553\times10^{-18}$ mol; $N=2{,}2012\times10^6$; $N_2=2{,}4458\times10^{19}$ |
| 18.26 | $V/N=4{,}0907\times10^{-26}$ m³; $l=3{,}4456\times10^{-9}$ m |
| 18.36 | $v_{rms}=6{,}4366\times10^{-3}$ m/s; aire 509,7 m/s |
| 18.33 | $6{,}2145\times10^{-21}$ J; $m=5{,}3139\times10^{-26}$ kg; $2{,}3390\times10^5$ m²/s²; 483,63 m/s; $2{,}5699\times10^{-23}$ kg·m/s; $\Delta t=4{,}1354\times10^{-4}$ s; $F=1{,}2429\times10^{-19}$ N; $1{,}2429\times10^{-17}$ Pa; $8{,}1503\times10^{21}$; $2{,}4451\times10^{22}$; cociente 3,0000 |
| 18.63 | $m_B/m_A=15{,}988$; $T_B=4527{,}0$ K $=4253{,}9$ °C; $v_{rms,A}=1874{,}1$, $v_{rms,B}=468{,}7$ m/s; $\bar K=5{,}8655\times10^{-21}$ J; $M_A=2{,}011$, $M_B=32{,}16$ g/mol |
| 18.38 | $\Delta T_{Ne}=4{,}1667$ K; $n=5{,}773$ mol |
| 18.41 | 336,71; 379,94; 412,38 m/s |
| 18.44 | 1404,0 Pa; 0,010369 kg |
| 18.49 | $\rho_{cal}=0{,}650$ kg/m³; $T=545{,}27$ K $=272{,}12$ °C |
| 18.60 | $V=2{,}25\times10^{-3}$ m³; $\rho_1=1{,}2616$; $B_1=0{,}027818$ N; $F_1=0{,}060382$ N; $\rho_2=1{,}1388$; $F_2=0{,}063091$ N; $\Delta F=2{,}7082\times10^{-3}$ N |
| 18.57 | $V_2=24{,}474$ m³; 30,644 ⇒ 31 cilindros; $m_{H_2}=63{,}871$ kg; carga 858,63 kg, 8414,6 N; $m_{He}=126{,}48$ kg; carga 796,02 kg, 7801,0 N |
| 18.52 | $p_2=8{,}3816\times10^5$ Pa; $h_2=0{,}25946$ m; sube 2,0405 m; $p_{man}=7{,}3686\times10^5$ Pa |
| 18.59 | 26,249; 16,100 (p = 2,10 × 10⁵); 5,4406 m/s (p = 1,05 × 10⁵); raíces 1,7366 y 13,468 m; a 1,74 m: 92 781 Pa + 7219 Pa |
| Probl. práctico | $v_{rms}=515{,}35$ m/s; $h_{max}=102{,}15$ km; $v_{mp}=420{,}78$ m/s; fracción con $v>2025$ m/s $=4{,}85\times10^{-10}$; $\approx3{,}5\times10^{14}$ moléculas |
