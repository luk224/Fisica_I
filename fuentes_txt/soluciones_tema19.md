# Soluciones Tema 19 — Primera ley de la termodinámica

Material para el redactor del tema 19. Todos los números se han comprobado con sympy (scripts propios; resultados en la tabla final). Enunciados de U (`sears.txt`, ejercicios y problemas en págs. impresas 639–645, PDF 667–673; ejemplos en pp. 621–636) y desarrollos de `solman.txt` (la página «19-N» del solucionario es la página PDF 620+N). Los problemas E están traducidos y ampliados, no copiados. «U p. NN» = página impresa del Sears-Zemansky.

**Cotejo de los exámenes con la imagen del PDF.** Todos los enunciados X de abajo se han releído sobre la página renderizada con `pdftoppm` (escaneos 18F1, 19F1, 19F2, 20F1, 22F1, 23F1, 23F2, 24F2; PDF nativos 25F1 y 25F2; recopilatorios `EXAMENES FISICA 1.pdf` p. 16 para Septiembre 2024 y `FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf` pp. 26–27 para Septiembre 2019). Los números coinciden con los transcritos en el dossier. **Dos problemas de Tema 19 que no estaban en el índice** aparecen en las páginas escaneadas del recopilatorio: Septiembre 2019 «Original» P-2 y Septiembre 2019 «Reserva» P-2 (se resuelven abajo como X3 y X4).

Datos y convenciones (los de U): $R=8{,}314$ J/(mol·K); 1 atm $=1{,}013\times10^5$ Pa; $T_K=T_C+273{,}15$; **$Q>0$ si entra calor en el sistema; $W>0$ si el sistema hace trabajo sobre el entorno** (U p. 619). Monoatómico: $C_V=\frac32R$, $C_p=\frac52R$, $\gamma=5/3$ exacto; diatómico: $C_V=\frac52R$, $C_p=\frac72R$, $\gamma=7/5$ (U p. 633).

## Herramientas de teoría que se usan

| Herramienta | Dónde |
|---|---|
| Convención de signos de $Q$ y $W$ | U §19.1 p. 619 |
| $dW=p\,dV$ (19.1); **$W=\int_{V_1}^{V_2}p\,dV$ (19.2)** = área bajo la curva pV | U §19.2 p. 620 |
| **Isobárico: $W=p(V_2-V_1)$ (19.3)** | U §19.2 p. 621 |
| **Isotérmico, gas ideal: $W=nRT\ln(V_2/V_1)=nRT\ln(p_1/p_2)$** (ejemplo 19.1) | U §19.2 p. 621 |
| $W$ y $Q$ dependen de la trayectoria; ciclo: $W$ = área encerrada (horario > 0) | U §19.3 pp. 622–623 |
| **Primera ley $\Delta U=Q-W$ (19.4)**, $Q=\Delta U+W$ (19.5); $U$ función de estado | U §19.4 p. 624 |
| Ciclo: $\Delta U=0$, $Q=W$; sistema aislado: $Q=W=0$, $\Delta U=0$ | U §19.4 p. 625 |
| Estrategia 19.1 (tabla de $Q$, $W$, $\Delta U$ por paso) | U p. 626 |
| Forma infinitesimal $dU=dQ-p\,dV$ (19.6)–(19.7) | U p. 628 |
| Adiabático $Q=0$, $\Delta U=-W$ (19.8); isocórico $W=0$, $\Delta U=Q$ (19.9); isobárico (19.10); isotérmico | U §19.5 pp. 629–630 |
| **$U$ del gas ideal solo depende de $T$** | U §19.6 p. 630 |
| $dQ=nC_VdT$ (19.12); **$\Delta U=nC_V\Delta T$ en cualquier proceso de gas ideal (19.13)** | U §19.7 p. 631 |
| $dQ=nC_pdT$ (19.14); **$C_p=C_V+R$ (19.17)**; tabla 19.1 | U §19.7 p. 632 |
| **$\gamma=C_p/C_V$ (19.18)**; valores monoatómico/diatómico | U §19.7 p. 633 |
| Adiabático gas ideal: **$TV^{\gamma-1}=$ cte (19.21)–(19.22); $pV^\gamma=$ cte (19.23)–(19.24); $W=nC_V(T_1-T_2)$ (19.25); $W=\dfrac{p_1V_1-p_2V_2}{\gamma-1}$ (19.26)** | U §19.8 pp. 634–635 |
| Gas ideal $pV=nRT$ (18.3); $C_V=\frac32R$ (18.25), $\frac52R$ (18.26) | U §18.1 p. 586; §18.4 pp. 599–601 |
| Calor específico $Q=mc\Delta T$ (17.13); calor latente $Q=mL$ (17.20) | U §17.5 p. 557; §17.6 p. 560 |
| (Solo partes secundarias) eficiencia $e=W/Q_H$ (20.4) p. 650; $K=|Q_C|/|W|$ (20.9) p. 654; Carnot $e=1-T_C/T_H$ (20.14) p. 660; entropía $\Delta S=Q/T$ (20.18) p. 665, $\Delta S=\int dQ/T$ (20.19) p. 666 | U cap. 20 |

**Truco que se usa en muchos ejercicios:** como $nRT=pV$, en un gas ideal $nC_V\Delta T=\dfrac{C_V}{R}\Delta(pV)$ (monoatómico: $\frac32\Delta(pV)$; diatómico: $\frac52\Delta(pV)$). Así no hace falta $n$ ni $T$.

---

## PARTE A — Exámenes (X)

**Qué ha caído del tema 19.** Es uno de los temas más preguntados: 9 problemas (dos con la primera ley pura, el resto ciclos de gas ideal que siguen en el Tema 20) y 3 preguntas de teoría. Ordenados de más fácil a más difícil.

### X1. Examen Febrero 2024 (2ª semana) P-2 (3 puntos) — dos trayectorias abc y adc

**Fuente.** `E689010160-24F2.pdf` (escaneo), p. 1. Mismo enunciado y datos que el problema 19.38 de U (p. 642).

**Enunciado (literal).** Un sistema termodinámico se lleva del estado $a$ al estado $c$ de la figura siguiendo la trayectoria $abc$, el trabajo $W$ efectuado por el sistema es de 450 J. Por la trayectoria $adc$ el trabajo es $W=120$ J. Las energías internas de los cuatro estados que se ilustran en la figura son $U_a=150$ J, $U_b=240$ J, $U_c=680$ J y $U_d=330$ J. Calcule el flujo de calor $Q$ para cada uno de los cuatro procesos: $ab$, $bc$, $ad$, $dc$. En cada proceso, ¿el sistema absorbe o desprende calor?
(Figura: rectángulo en el diagrama pV; $a$ abajo a la izquierda, $b$ encima de $a$, $c$ arriba a la derecha, $d$ abajo a la derecha. $ab$ y $dc$ son verticales hacia arriba; $bc$ y $ad$ horizontales hacia la derecha.)

**Solución.**
1. **Qué herramienta.** No se conoce la sustancia (no dice gas ideal), así que solo vale lo general: la **primera ley** en la forma $Q=\Delta U+W$ (19.5, U p. 624), con $\Delta U=U_{final}-U_{inicial}$ porque $U$ es función de estado.
2. **Trabajo de cada tramo leyendo la figura.** El trabajo es el área bajo la curva (19.2): en un tramo **vertical** ($V$ constante) $W=0$. Por tanto $W_{ab}=0$ ⇒ todo el trabajo de $abc$ está en $bc$: $W_{bc}=450$ J. Igual $W_{dc}=0$ ⇒ $W_{ad}=120$ J.
3. **Cambios de energía interna:** $\Delta U_{ab}=240-150=90$ J; $\Delta U_{bc}=680-240=440$ J; $\Delta U_{ad}=330-150=180$ J; $\Delta U_{dc}=680-330=350$ J.
4. **Calores** ($Q=\Delta U+W$):
   - $Q_{ab}=90+0=$ **+90 J** (absorbe).
   - $Q_{bc}=440+450=$ **+890 J** (absorbe).
   - $Q_{ad}=180+120=$ **+300 J** (absorbe).
   - $Q_{dc}=350+0=$ **+350 J** (absorbe).
5. **Comprobación.** $\Delta U_{ac}=530$ J por los dos caminos: $Q_{abc}-W_{abc}=980-450=530$ ✓; $Q_{adc}-W_{adc}=650-120=530$ ✓. $Q$ y $W$ cambian con el camino, $\Delta U$ no.

**Receta.** Primera ley con tabla (Estrategia 19.1): por cada tramo, $W$ del área (0 si es vertical), $\Delta U$ de los valores de $U$, y $Q=\Delta U+W$.
**Error típico.** Repartir el trabajo de $abc$ a medias entre $ab$ y $bc$ (en $ab$ no hay cambio de volumen); escribir $Q=\Delta U-W$ (signo cambiado).
**Teoría:** U §19.2 p. 620 (19.2); §19.3 pp. 622–623; §19.4 p. 624 (19.4)–(19.5); Estrategia 19.1 p. 626.

---

### X2. Examen Febrero 2022 (1ª semana) P-2 (3 puntos) — compresión adiabática de un gas monoatómico

**Fuente.** `E689010160-22F1.pdf` (escaneo), p. 1. Es el ejercicio 19.27 de U con otros datos.

**Enunciado (literal).** Un gas monoatómico con comportamiento ideal, está a una presión inicial de $3\times10^5$ Pa y ocupa un volumen de 0,10 m³. Se comprime adiabáticamente a un volumen mitad del inicial. a) Calcule la presión final. b) ¿Cuánto trabajo efectúa el gas? c) Determine la razón entre las temperaturas final e inicial del gas. ¿Esta compresión calienta o enfría el gas?

**Solución.**
1. **Datos.** $p_1=3\times10^5$ Pa, $V_1=0{,}10$ m³, $V_2=0{,}05$ m³, monoatómico ⇒ $\gamma=5/3$ (U p. 633). Adiabático ⇒ $Q=0$.
2. **a) Presión final.** En un proceso adiabático (cuasiestático) de gas ideal, $p_1V_1^\gamma=p_2V_2^\gamma$ (19.24): $p_2=p_1\left(\dfrac{V_1}{V_2}\right)^{\gamma}=3\times10^5\cdot2^{5/3}=$ **9,52 × 10⁵ Pa**. (Si fuese isotermo sería solo $6\times10^5$ Pa: en la adiabática la presión sube más porque además sube $T$.)
3. **b) Trabajo** con (19.26): $W=\dfrac{p_1V_1-p_2V_2}{\gamma-1}=\dfrac{30\,000-47\,622}{2/3}=$ **−2,64 × 10⁴ J**. Negativo: el gas **recibe** trabajo (se comprime).
4. **c) Razón de temperaturas** con (19.22): $\dfrac{T_2}{T_1}=\left(\dfrac{V_1}{V_2}\right)^{\gamma-1}=2^{2/3}=$ **1,587** > 1 ⇒ **la compresión calienta el gas**. Por qué: $Q=0$ ⇒ $\Delta U=-W=+26\,433$ J > 0, y en un gas ideal $U$ solo depende de $T$ (U p. 630).
5. **Comprobación** con $pV=nRT$: $\dfrac{T_2}{T_1}=\dfrac{p_2V_2}{p_1V_1}=\dfrac{47\,622}{30\,000}=1{,}587$ ✓.

**Receta.** Adiabática de gas ideal: $pV^\gamma$ cte para $p$, $TV^{\gamma-1}$ cte para $T$, y $W=(p_1V_1-p_2V_2)/(\gamma-1)$ (o $W=-\Delta U=nC_V(T_1-T_2)$).
**Error típico.** Usar $p_1V_1=p_2V_2$ (eso es isotermo); usar $\gamma=1{,}4$ para un monoatómico; dar el trabajo positivo en una compresión.
**Teoría:** U §19.8 pp. 634–635 (19.22), (19.24), (19.26); §19.6 p. 630.

---

### X3. Examen Septiembre 2019 «Reserva» P-2 (3 puntos) — trabajo en una expansión adiabática

**Fuente.** `FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf`, p. 27 (escaneo; convocatoria «Curso 2018-2019, RESERVA, Septiembre 2019»). No figura todavía en `examenes_por_tema.md`.

**Enunciado (literal).** Calcular el trabajo desarrollado por 3 l de un gas ideal monoatómico que partiendo de una presión de 1 atm se expansiona reversible y adiabáticamente hasta multiplicar por tres su volumen.

**Solución.**
1. **Datos en SI.** $V_1=3\times10^{-3}$ m³, $p_1=1{,}013\times10^5$ Pa ⇒ $p_1V_1=303{,}9$ J. $V_2=3V_1$. Monoatómico ⇒ $\gamma=5/3$.
2. **«Reversible y adiabática»** = la adiabática cuasiestática de U §19.8, donde vale $pV^\gamma=$ cte (19.23).
3. **Presión final:** $p_2=p_1(V_1/V_2)^\gamma=p_1\,3^{-5/3}=0{,}160$ atm $=1{,}62\times10^4$ Pa.
4. **Trabajo** (19.26), escrito solo con datos: $W=\dfrac{p_1V_1-p_2V_2}{\gamma-1}=\dfrac{p_1V_1}{\gamma-1}\left[1-\left(\dfrac{V_1}{V_2}\right)^{\gamma-1}\right]=\dfrac{303{,}9}{2/3}\left(1-3^{-2/3}\right)=$ **≈ 237 J**.
5. **Lectura.** $W>0$ (expansión). Como $Q=0$, $\Delta U=-237$ J: el gas se enfría ($T_2/T_1=3^{-2/3}=0{,}481$). No hace falta conocer $n$ ni $T$.

**Receta.** Adiabática con $p_1$, $V_1$ y la razón de volúmenes: $W=\dfrac{p_1V_1}{\gamma-1}\left[1-(V_1/V_2)^{\gamma-1}\right]$.
**Error típico.** Calcular $W=nRT\ln 3$ (isotermo: daría 334 J, más que la adiabática); usar litros·atm sin convertir.
**Teoría:** U §19.8 pp. 634–635 (19.23), (19.26).

---

### X4. Examen Septiembre 2019 «Original» P-2 (3 puntos) — dos gases separados por un pistón en un cilindro aislado

**Fuente.** `FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf`, p. 26 (escaneo; «Curso 2018-2019, Original, Septiembre 2019»). No figura todavía en `examenes_por_tema.md`. La parte de entropía es del Tema 20.

**Enunciado (literal).** Un cilindro térmicamente aislado, cerrado por ambos extremos, está provisto de un pistón conductor sin rozamiento, que lo divide en dos partes. Inicialmente se sujeta al pistón en el centro del cilindro de forma que este está dividido en dos partes iguales, quedando a un lado un litro de aire a 300 K y a 2 atmósferas y al otro, un litro de aire a 300 K y a 1 atmósfera. Se abandona el pistón asimismo, alcanzándose el equilibrio de presión y temperatura en una nueva posición. Calcúlese la presión y la temperatura finales así como la variación de entropía ΔS.

**Solución.**
1. **Elegir el sistema** (paso 1 de la Estrategia 19.1, U p. 626): los dos gases + el pistón. El cilindro es rígido y aislado ⇒ $W=0$ (el volumen total no cambia; el trabajo que un gas hace sobre el otro es interno) y $Q=0$. Es un **sistema aislado** ⇒ $\Delta U_{total}=0$ (U p. 625).
2. **Temperatura final.** El pistón es conductor ⇒ al final los dos gases tienen la misma $T_f$. El aire es gas ideal ⇒ $U$ solo depende de $T$ y $\Delta U=nC_V\Delta T$ (19.13): $n_1C_V(T_f-300)+n_2C_V(T_f-300)=0$ ⇒ **$T_f=300$ K**.
3. **Moles** ($pV=nRT$): $n_1=\dfrac{2\cdot1{,}013\times10^5\cdot10^{-3}}{8{,}314\cdot300}=0{,}0812$ mol; $n_2=0{,}0406$ mol ($n_1=2n_2$).
4. **Presión final.** Equilibrio mecánico ⇒ misma $p_f$ a los dos lados; volumen total 2 L; $T$ común: $p_f=\dfrac{(n_1+n_2)RT}{V_{total}}=\dfrac{p_1V+p_2V}{2V}=$ **1,5 atm** ($1{,}52\times10^5$ Pa). El pistón se desplaza: $V_1'=\frac{n_1RT}{p_f}=\frac43$ L y $V_2'=\frac23$ L.
5. **(Tema 20) Entropía.** $S$ es función de estado: se calcula por un camino reversible con los mismos extremos, una isoterma para cada gas, $\Delta S=nR\ln(V_f/V_i)$ (U §20.7 pp. 665–666): $\Delta S=n_1R\ln\frac43+n_2R\ln\frac23=\dfrac{p_1V}{T}\ln\frac43+\dfrac{p_2V}{T}\ln\frac23=0{,}1943-0{,}1369=$ **+0,057 J/K** > 0, como corresponde a un proceso irreversible en un sistema aislado.

**Receta.** Sistema aislado de gases ideales: $\Delta U_{total}=0$ da la temperatura final; el equilibrio mecánico y $pV=nRT$ dan la presión y los volúmenes.
**Error típico.** Pensar que la temperatura cambia porque «un gas se expande y otro se comprime» (lo que pierde uno lo gana el otro a través del pistón conductor); promediar presiones sin justificar (aquí sale la media porque los volúmenes iniciales y las temperaturas son iguales).
**Teoría:** U §19.4 p. 625 (sistema aislado); §19.6 p. 630; §19.7 p. 631 (19.13); §18.1 p. 586 (18.3); §20.7 pp. 665–666.

---

### X5. Examen Febrero 2019 (1ª semana) P-1 (3 puntos) — ciclo ABCA de un mol de gas monoatómico

**Fuente.** `E689010160-19F1.pdf` (escaneo), p. 1. Entropía y rendimiento: Tema 20.

**Enunciado (literal).** Sea un mol de gas monoatómico ($\gamma=5/3$) que describe un ciclo ABCA en el diagrama PV. En el estado inicial A, ocupa un volumen de 0,5 l y se encuentra a una presión de 1 atm. El gas pasa al estado B expandiéndose a presión constante hasta alcanzar un volumen cuatro veces mayor. A continuación sufre una transformación a volumen constante hasta alcanzar una presión un cuarto de la inicial, llegando al estado C y posteriormente vuelve al estado inicial. Se pide calcular: a) la temperatura en estos tres estados; b) el trabajo, calor, variación de la energía interna y la entropía en cada proceso, y c) el rendimiento del ciclo.

**Solución.**
1. **Estados** (SI): A $(5\times10^{-4}$ m³; $1{,}013\times10^5$ Pa$)$; B $(2\times10^{-3}$; $1{,}013\times10^5)$; C $(2\times10^{-3}$; $2{,}533\times10^4)$. Productos $pV$: A 50,65 J; B 202,6 J; C 50,65 J.
2. **¿Qué proceso es C→A?** $p_CV_C=p_AV_A$ ⇒ $T_C=T_A$: C y A están en la **misma isoterma**. El regreso C→A se toma como **compresión isotérmica** (es lo que permite calcular $W$ y $Q$ con los datos).
3. **a) Temperaturas** ($T=pV/nR$, $n=1$): $T_A=$ **6,09 K**, $T_B=4T_A=$ **24,4 K**, $T_C=T_A=$ **6,09 K**. (Son temperaturas muy bajas porque 1 mol en medio litro a 1 atm lo exige; el método es el mismo que con valores ordinarios.)
4. **b) Tramo A→B (isóbaro):** $W=p\Delta V=1{,}013\times10^5\cdot1{,}5\times10^{-3}=$ **151,95 J**; $\Delta U=\frac32\Delta(pV)=\frac32(202{,}6-50{,}65)=$ **227,9 J**; $Q=\Delta U+W=$ **379,9 J** (= $\frac52W$, es decir $nC_p\Delta T$). Entra calor.
5. **Tramo B→C (isócoro):** $W=0$; $\Delta U=Q=\frac32(50{,}65-202{,}6)=$ **−227,9 J**. Sale calor.
6. **Tramo C→A (isotermo):** $\Delta U=0$; $W=Q=nRT_A\ln\dfrac{V_A}{V_C}=50{,}65\ln\frac14=$ **−70,2 J**. Sale calor.
7. **Ciclo:** $\Delta U=0$ ✓; $W=151{,}95+0-70{,}2=$ **81,7 J** $=\sum Q$ ✓.
8. **(Tema 20) Entropía por tramo.** Isóbaro $\Delta S=nC_p\ln\frac{T_B}{T_A}=\frac52R\ln4=$ **+28,8 J/K**; isócoro $\Delta S=nC_V\ln\frac{T_C}{T_B}=\frac32R\ln\frac14=$ **−17,3 J/K**; isotermo $\Delta S=Q/T=R\ln\frac14=$ **−11,5 J/K**. Suma 0 ✓ ($S$ es función de estado).
9. **c) Rendimiento** $e=W/Q_H$ con $Q_H$ = calor que entra = solo $Q_{AB}$: $e=81{,}7/379{,}9=$ **0,215 (21,5 %)**. (Carnot entre 24,4 K y 6,09 K daría 75 %.)

**Receta.** Ciclo de gas ideal: tabla de estados con $pV$; reconocer el tipo de cada tramo (si $p_1V_1=p_2V_2$ es una isoterma); $W$, $\Delta U=\frac{C_V}{R}\Delta(pV)$, $Q=\Delta U+W$; $Q_H$ = suma de los calores positivos.
**Error típico.** Tomar $C_V$ en el isóbaro ($Q_{AB}$ saldría 227,9 J); meter en $Q_H$ el calor neto del ciclo; usar litros sin convertir.
**Teoría:** U §19.2 p. 621 (19.3) y ejemplo 19.1; §19.4 pp. 624–625; §19.5 p. 629; §19.7 pp. 631–632; (20.4) p. 650; §20.7 pp. 665–666.

---

### X6. Examen Febrero 2023 (2ª semana) P-2 (3 puntos) — máquina con isócora, isoterma e isóbara (3 mol monoatómico)

**Fuente.** `E689010160-23F2.pdf` (escaneo), p. 1. Eficiencia: Tema 20.

**Enunciado (literal).** Una máquina térmica opera según el ciclo de la figura siendo la sustancia de trabajo 3 moles de un gas monoatómico con comportamiento ideal, que alcanza una temperatura máxima de 300 °C, y se sabe que el proceso BC es isotérmico. La presión en los estados A y C es de $1\times10^5$ Pa, y en el estado B, de $4\times10^5$ Pa. Calcular: (a) El calor entrante en el gas y el cedido por el gas en cada ciclo. (b) El trabajo que efectúa la máquina en cada ciclo. (c) La eficiencia que tiene la máquina y compárela con la máxima eficiencia posible que puede lograrse con los depósitos caliente y frío que se usan en este ciclo. Considere: T (K) = T (°C) + 273,15; R = 8,31 J mol⁻¹ K⁻¹.
(Figura: A abajo a la izquierda, B encima de A —A→B vertical—, BC curva isoterma bajando a la derecha hasta C, y C→A horizontal hacia la izquierda.)

**Solución.**
1. **Dónde está $T_{max}$.** A→B a volumen constante con $p$ que se multiplica por 4 ⇒ $T$ sube; B→C isoterma; C→A a $p$ constante con $V$ que disminuye ⇒ $T$ baja. Luego $T_B=T_C=573{,}15$ K y $T_A$ es la mínima.
2. **Estados.** Isócora: $T_A=T_B\dfrac{p_A}{p_B}=$ **143,29 K**. $V_A=V_B=\dfrac{nRT_B}{p_B}=\dfrac{3\cdot8{,}31\cdot573{,}15}{4\times10^5}=$ **0,03572 m³**. Isoterma con $p_C=p_A$: $V_C=V_B\dfrac{p_B}{p_C}=4V_B=$ **0,14289 m³**.
3. **Calores** ($C_V=\frac32R$, $C_p=\frac52R$):
   - A→B: $W=0$, $Q_{AB}=\Delta U=nC_V(T_B-T_A)=3\cdot\frac32\cdot8{,}31\cdot429{,}86=$ **+16 075 J**.
   - B→C: $\Delta U=0$, $Q_{BC}=W_{BC}=nRT_B\ln\frac{V_C}{V_B}=3\cdot8{,}31\cdot573{,}15\ln4=$ **+19 808 J**.
   - C→A: $Q_{CA}=nC_p(T_A-T_C)=$ **−26 791 J**; $W_{CA}=p_A(V_A-V_C)=-10\,717$ J; $\Delta U_{CA}=-16\,075$ J.
4. **(a)** Calor entrante $Q_H=16\,075+19\,808=$ **35 883 J**; cedido $|Q_C|=$ **26 791 J**.
5. **(b)** $W=Q_H-|Q_C|=$ **9092 J** por ciclo. Comprobación por tramos: $0+19\,808-10\,717=9091$ J ✓.
6. **(c)** $e=W/Q_H=$ **0,253 (25,3 %)**. Máxima posible entre los mismos depósitos (Carnot, 20.14): $e_C=1-\dfrac{143{,}29}{573{,}15}=1-\dfrac{p_A}{p_B}=$ **0,75 (75 %)**. La máquina alcanza un tercio del máximo.

**Receta.** Igual que X5; para la eficiencia, $Q_H$ suma **todos** los tramos con $Q>0$ (isócora + isoterma).
**Error típico.** Poner $T_A=573{,}15$ K; olvidar el calor de la isoterma en $Q_H$; usar 300 °C sin pasar a kelvin en Carnot.
**Teoría:** U §19.2 p. 621; §19.5 pp. 629–630; §19.7 pp. 631–632; (20.4) p. 650; (20.14) p. 660.

---

### X7. Examen Septiembre 2024 P-2 (3 puntos) — ciclo con helio: isócora, isoterma, isóbara

**Fuente.** `fuentes_txt/examenes/EXAMENESFISICA1.txt`; PDF `EXAMENES FISICA 1.pdf`, p. 16 («Septiembre 2024. Nacional-UE-Guinea Original»). Mismo esquema que X6. (Resuelto con detalle de la parte de gas ideal en `soluciones_tema18.md`, X1.)

**Enunciado (literal).** Una máquina térmica opera empleando el siguiente ciclo termodinámico. Se produce una transformación isócora entre los estados $a$ y $b$ para a continuación producirse una transformación isoterma entre los estados $b$ y $c$, cerrándose el ciclo mediante una transformación isobara entre los estados $c$ y $a$. La sustancia de trabajo se compone de 1,5 moles de helio gaseoso que alcanza una temperatura máxima en el ciclo de 573.2 K. Se conoce además que el ciclo opera entre las presiones $p_a=1{,}5\times10^5$ Pa y $p_b=4\times10^5$ Pa. Suponga que la sustancia de trabajo es un gas ideal. A partir de los datos presentados, obtenga: (a) Una representación gráfica del ciclo termodinámico. (b) El calor de entrada y salida al sistema en cada ciclo termodinámico. (c) El trabajo efectuado por la máquina en cada ciclo termodinámico. (d) Obtenga y compare la eficiencia del ciclo con la de la máquina térmica que pudiera obtener la máxima eficiencia operando las temperaturas de fuente caliente y fría del problema. Considere: $R=8{,}314$ kJ/(kmol·K).

**Solución.**
1. $R=8{,}314$ kJ/(kmol·K) = 8,314 J/(mol·K). $T_b=T_c=573{,}2$ K (máxima, mismo razonamiento que X6). $T_a=573{,}2\cdot\frac{1{,}5}{4}=$ **214,95 K**.
2. $V_a=V_b=\dfrac{nRT_b}{p_b}=$ **0,01787 m³**; $V_c=V_b\dfrac{p_b}{p_a}=$ **0,04766 m³**.
3. **(a)** Vertical $a\to b$ hacia arriba, isoterma $b\to c$, horizontal $c\to a$ a la izquierda: sentido horario ⇒ máquina térmica.
4. **Tabla de la primera ley** (He monoatómico):

   | Tramo | $W$ (J) | $\Delta U$ (J) | $Q$ (J) |
   |---|---|---|---|
   | $a\to b$ isócora | 0 | +6702 | **+6702** |
   | $b\to c$ isoterma | +7011 | 0 | **+7011** |
   | $c\to a$ isóbara | −4468 | −6702 | **−11 169** |
   | Ciclo | **2544** | 0 | 2544 |
5. **(b)** $Q_H=$ **13 713 J**; $|Q_C|=$ **11 169 J**. **(c)** $W=$ **2544 J**.
6. **(d)** $e=2544/13\,713=$ **18,5 %**; Carnot $1-214{,}95/573{,}2=$ **62,5 %**.

**Receta / Error típico:** los de X6.
**Teoría:** U §18.1 p. 586; §19.2 p. 621; §19.5 pp. 629–630; §19.7 pp. 631–632; (20.4) p. 650; (20.14) p. 660.

---

### X8. Examen Febrero 2025 (2ª semana) P-2 (3 puntos) — isóbara, isócora y recta, gas monoatómico

**Fuente.** `fuentes_txt/examenes/E689010160-25F2.txt`, p. 1 del PDF (también en los dos recopilatorios). En la imagen del PDF se lee $p_a=4\times10^5$ Pa y $p_c=2\times10^5$ Pa.

**Enunciado (literal).** En un ciclo termodinámico se opera un gas ideal monoatómico. El gas se somete a un proceso isóbaro entre los estados $a$ y $b$ para pasar posteriormente por un proceso isócoro entre los estados $b$ y $c$, cerrándose el ciclo a través de un proceso que puede ser representado como una línea recta en un diagrama presión, volumen, pV. Se conoce que $p_a=4\times10^5$ Pa, $p_c=2\times10^5$ Pa, $V_a=0{,}55$ m³ y $V_b=0{,}82$ m³. Conocidos estos datos: Calcule el calor intercambiado, el trabajo realizado y la variación de energía interna en cada proceso del ciclo. Calcule el calor intercambiado, el trabajo realizado y la variación de energía interna para el ciclo completo. Determine la eficiencia del ciclo. (a) Dibuje el ciclo termodinámico descrito en un diagrama pV. (b) Calcule el calor intercambiado, el trabajo realizado y la variación de energía interna en cada proceso del ciclo. (c) Determine la eficiencia del ciclo. Considere: $C_v=3R/2$ y $C_p=5R/2$ y la constante de los gases $R=8{,}314$ J mol⁻¹K⁻¹.

**Solución.**
1. **Estados.** $a$ (0,55 m³; 4×10⁵ Pa) → isóbara → $b$ (0,82; 4×10⁵) → isócora → $c$ (0,82; 2×10⁵) → recta → $a$. Productos $pV$: 220 000, 328 000 y 164 000 J.
2. **No se da $n$ y no hace falta:** $\Delta U=nC_V\Delta T=\frac32\Delta(pV)$ (19.13 + $pV=nRT$).
3. **Tabla** ($W$ = área bajo cada tramo, 19.2):

   | Tramo | $W$ (J) | $\Delta U$ (J) | $Q=\Delta U+W$ (J) |
   |---|---|---|---|
   | $a\to b$ isóbaro: $W=p\Delta V$ | +108 000 | +162 000 | **+270 000** |
   | $b\to c$ isócoro | 0 | −246 000 | **−246 000** |
   | $c\to a$ recta: $W=\frac{p_c+p_a}{2}(V_a-V_c)$ | −81 000 | +84 000 | **+3000** |
   | **Ciclo** | **+27 000** | **0** | **+27 000** |
4. **Comprobación.** $W_{ciclo}$ = área del triángulo $\frac12\cdot0{,}27\cdot2\times10^5=27\,000$ J ✓; horario ⇒ positivo.
5. **(c) Eficiencia.** $Q_H$ = todo el calor que **entra**. En la recta el calor cambia de signo: con $p(V)=p_c+s(V-V_b)$, $s=-7{,}41\times10^5$ Pa/m³, la primera ley infinitesimal (19.7) da $dQ=dU+p\,dV=\left(\frac52p+\frac32sV\right)dV$, que se anula en $V^*=109/160=0{,}681$ m³. De $c$ a $V^*$ **entran 28 521 J** y de $V^*$ a $a$ **salen 25 521 J** (neto +3000 J). $Q_H=270\,000+28\,521=298\,521$ J ⇒ $e=\dfrac{27\,000}{298\,521}=$ **9,0 %**. (Con solo el neto del tramo, $Q_H=273\,000$ J, saldría 9,9 %; conviene al menos indicar que en la recta hay una parte con calor entrante y otra saliente.)

**Receta.** Sin $n$, trabaja con $pV$: $\Delta U=\frac{C_V}{R}\Delta(pV)$; trabajo = área (rectángulo, trapecio); en un tramo recto que corta isotermas, mira si $dQ$ cambia de signo.
**Error típico.** Inventar $n$; dar el trabajo de la recta con un solo valor de $p$; sumar en $Q_H$ el neto de la recta sin más.
**Teoría:** U §19.2 p. 620 (19.2), p. 621 (19.3); §19.4 p. 624, p. 628 (19.7); §19.7 p. 631 (19.13); (20.4) p. 650.

---

### X9. Examen Febrero 2025 (1ª semana) P-2 (3 puntos) — refrigerador con gas diatómico (secundario del Tema 19)

**Fuente.** `fuentes_txt/examenes/E689010160-25F1.txt`, p. 1 del PDF (también en los recopilatorios). Catalogado en Tema 20 (secundario 19): se usa aquí para practicar la tabla $Q$, $W$, $\Delta U$.

**Enunciado (literal).** Un ciclo de refrigeración opera un mol de un gas ideal diatómico. El ciclo consta de un proceso isotermo $a\to b$, un proceso isócoro $b\to c$ y un proceso isóbaro $c\to a$ que cierra el ciclo. Se conoce que $p_a=70$ kPa y que $V_a=0{,}03$ m³ y que $V_b=0{,}1$ m³. Conociendo estos datos: (a) Dibuje el ciclo termodinámico descrito en un diagrama pV. (b) Calcule el coeficiente de rendimiento del refrigerador. Considere: $C_V=5R/2$ y $C_p=7R/2$ y la constante de los gases $R=8{,}314$ J mol⁻¹K⁻¹.

**Solución.**
1. **Estados.** $T_a=p_aV_a/R=$ **252,6 K**; isoterma ⇒ $p_b=p_aV_a/V_b=$ **21 kPa**; $c$: $V_c=V_b$, $p_c=p_a$ ⇒ $T_c=$ **842,0 K**.
2. **(a)** De $a$ (0,03; 70 kPa) baja por la isoterma a $b$ (0,1; 21), sube vertical a $c$ (0,1; 70) y vuelve horizontal a $a$: **antihorario** ⇒ $W_{neto}<0$, refrigerador.
3. **Tabla** (diatómico, $\Delta U=\frac52\Delta(pV)$):

   | Tramo | $W$ (J) | $\Delta U$ (J) | $Q$ (J) |
   |---|---|---|---|
   | $a\to b$ isoterma: $W=p_aV_a\ln\frac{V_b}{V_a}$ | +2528 | 0 | **+2528** |
   | $b\to c$ isócora | 0 | +12 250 | **+12 250** |
   | $c\to a$ isóbara: $W=p_a(V_a-V_c)$ | −4900 | −12 250 | **−17 150** |
   | Ciclo | **−2372** | 0 | −2372 |
4. **(b)** $K=\dfrac{|Q_C|}{|W|}$ (20.9), con $Q_C$ = calor que **absorbe** el gas $=2528+12\,250=14\,778$ J: $K=14\,778/2372=$ **6,23**.

**Receta.** Tabla de la primera ley por tramos; signo del trabajo neto según el sentido de giro; $K$ = calor absorbido / |trabajo neto|.
**Error típico.** Poner el calor cedido en el numerador de $K$; usar $\frac32R$ (el gas es diatómico).
**Teoría:** U §19.2 p. 621; §19.5 pp. 629–630; §19.7 pp. 631–632; (20.9) p. 654.

---

### X10. Examen Febrero 2019 (2ª semana) P-2 (3 puntos) — ciclo de 1 kg de aire: adiabática, isóbara, adiabática, isócora

**Fuente.** `E689010160-19F2.pdf` (escaneo), p. 1. Rendimiento: Tema 20. Es el más largo del tema.

**Enunciado (literal).** A una masa de aire de 1 kg que se encuentra inicialmente a una temperatura de 15 °C y una presión de 1 atm se le hace describir el siguiente ciclo: a) una compresión adiabática hasta una presión de 30 atm. b) un calentamiento a presión constante suministrando 300 Kcal. c) una expansión adiabática hasta alcanzar el volumen inicial y d) una transformación isocora hasta llegar a las condiciones iniciales. Se pide calcular la presión, el volumen y la temperatura al final de cada una de las transformaciones así como el rendimiento del ciclo. Considérese: $c_p=0{,}25$ cal/g °C; $\gamma=1{,}4$; 1 cal = 4,18 J.

**Solución.**
1. **Calores específicos por unidad de masa.** $c_p=0{,}25\cdot4{,}18\cdot1000=1045$ J/(kg·K); $c_V=c_p/\gamma=746{,}4$ J/(kg·K) (19.18 con capacidades por masa). La «constante del aire» por kg es $r=c_p-c_V=298{,}6$ J/(kg·K) (19.17 por kg; así el problema es coherente con sus propios datos). Ecuación del gas por masa: $pV=m\,r\,T$.
2. **Estado 1:** $p_1=1$ atm $=1{,}013\times10^5$ Pa, $T_1=288{,}15$ K, $V_1=\dfrac{m r T_1}{p_1}=$ **0,849 m³**. (Con la masa molar media del aire, 28,8 g/mol, saldría 0,821 m³; el resto del método no cambia.)
3. **1→2 compresión adiabática hasta 30 atm.** Combinando $pV^\gamma$ cte con $pV=mrT$: $T_2=T_1\left(\dfrac{p_2}{p_1}\right)^{(\gamma-1)/\gamma}=288{,}15\cdot30^{2/7}=$ **761,5 K**; $V_2=V_1\left(\dfrac{p_1}{p_2}\right)^{1/\gamma}=$ **0,0748 m³**; $p_2=$ **30 atm** ($3{,}04\times10^6$ Pa).
4. **2→3 isóbara con $Q=300$ kcal $=1{,}254\times10^6$ J.** $Q=mc_p\Delta T$ ⇒ $\Delta T=1{,}254\times10^6/1045=1200$ K ⇒ $T_3=$ **1961,5 K**; $p_3=$ **30 atm**; $V_3=V_2\dfrac{T_3}{T_2}=$ **0,1927 m³**.
5. **3→4 expansión adiabática hasta $V_4=V_1$.** $T_4=T_3\left(\dfrac{V_3}{V_1}\right)^{\gamma-1}=$ **1083,7 K**; $p_4=p_3\left(\dfrac{V_3}{V_1}\right)^{\gamma}=$ **3,76 atm** ($3{,}81\times10^5$ Pa); $V_4=$ **0,849 m³**. Comprobación con la isócora: $p_4=p_1T_4/T_1=3{,}76$ atm ✓.
6. **4→1 isócora:** $W=0$; $Q_{41}=mc_V(T_1-T_4)=$ **−5,94 × 10⁵ J** (sale calor).
7. **Trabajos** (para la tabla): $W_{12}=mc_V(T_1-T_2)=-3{,}53\times10^5$ J; $W_{23}=p_2(V_3-V_2)=3{,}58\times10^5$ J; $W_{34}=mc_V(T_3-T_4)=6{,}55\times10^5$ J; $W_{41}=0$. Neto $W=$ **6,60 × 10⁵ J** $=Q_{23}+Q_{41}$ ✓ ($\Delta U_{ciclo}=0$).
8. **Rendimiento** (20.4): solo entra calor en 2→3: $e=\dfrac{W}{Q_{23}}=1-\dfrac{|Q_{41}|}{Q_{23}}=1-\dfrac{1}{\gamma}\dfrac{T_4-T_1}{T_3-T_2}=$ **0,526 (52,6 %)**. No depende de $r$.

   | Estado | $p$ (atm) | $V$ (m³) | $T$ (K) |
   |---|---|---|---|
   | 1 | 1 | 0,849 | 288,15 |
   | 2 | 30 | 0,0748 | 761,5 |
   | 3 | 30 | 0,1927 | 1961,5 |
   | 4 | 3,76 | 0,849 | 1083,7 |

**Receta.** Ciclo con adiabáticas: en cada adiabática usa la pareja de variables que conoces ($T$–$p$ con exponente $(\gamma-1)/\gamma$; $T$–$V$ con $\gamma-1$); el calor solo se intercambia en los tramos no adiabáticos; $e=1-|Q_{sale}|/Q_{entra}$.
**Error típico.** Usar 15 °C en lugar de 288,15 K en las potencias; olvidar convertir kcal a J; usar $c_p$ en la isócora.
**Teoría:** U §19.7 pp. 631–633 (19.17)–(19.18); §19.8 pp. 634–635 (19.21)–(19.24); §17.5 p. 557 ($Q=mc\Delta T$, 17.13); (20.4) p. 650.

---

### T1. Teoría: Febrero 2018 (1ª semana) P-3 Opción 3.1 «Primera ley de la termodinámica»; Febrero 2020 (1ª semana) P-3 Opción 3.2 «Energía interna y primera ley de la termodinámica»; Febrero 2023 (1ª semana) P-4 Opción B «Energía interna y la primera ley de la termodinámica» (4 puntos)

**Fuentes.** `E689010160-18F1.pdf`, `E689010160-20F1.pdf` (escaneos; solo el título, sin cuestiones) y `E689010160-23F1.pdf` pp. 1–2 (con cuestiones (a) y (b)).

**Esquema de respuesta ideal (≈ 1,5–2 caras).**
1. **Sistema termodinámico y signos** (U p. 619): sistema/entorno; $Q>0$ si entra calor, $W>0$ si el sistema hace trabajo (al revés que en mecánica).
2. **Trabajo de un cambio de volumen** (U pp. 620–621): pistón, $dW=F\,dx=pA\,dx=p\,dV$ (19.1); $W=\int p\,dV$ (19.2) = área bajo la curva pV; casos: isobárico $p\Delta V$ (19.3), isotermo $nRT\ln(V_2/V_1)$ (ej. 19.1), isócoro 0. Dibujo pV con el área sombreada.
3. **Trayectorias** (U pp. 622–623): mismo estado inicial y final, distinto $W$ (figura con dos caminos) y distinto $Q$; no existe «el calor o el trabajo que contiene un cuerpo».
4. **Energía interna** (U p. 623): suma de energías cinéticas y potenciales de interacción de las partículas; no incluye la energía potencial del sistema en un campo externo ni su energía cinética de conjunto.
5. **Primera ley** (U p. 624): $\Delta U=Q-W$ (19.4). Hecho experimental: $Q-W$ es el mismo por cualquier camino ⇒ $U$ es **función de estado**. Es la conservación de la energía con el calor incluido.
6. **Casos especiales** (U p. 625): ciclo $\Delta U=0$, $Q=W$ (área encerrada); sistema aislado $Q=W=0$ ⇒ $U$ constante. Forma diferencial $dU=dQ-p\,dV$ (19.7, p. 628).
7. **Tipos de procesos** (U pp. 629–630): adiabático ($Q=0$, $\Delta U=-W$), isocórico ($W=0$, $\Delta U=Q$), isobárico, isotérmico. Diagrama pV con las cuatro curvas.
8. **Gas ideal** (U pp. 630–633): $U=U(T)$ (expansión libre); $\Delta U=nC_V\Delta T$ en cualquier proceso; $C_p=C_V+R$ (con la deducción de una línea a partir de la primera ley); $\gamma$. Si queda tiempo: adiabática $pV^\gamma=$ cte (p. 635).
9. **Ejemplo numérico corto**: ejemplo 19.5 de U (1 g de agua hirviendo: $W=169$ J, $Q=2256$ J, $\Delta U=2087$ J).

**Cuestión (a) de Febrero 2023.** *Si se conocen $p$, $V$, $T$ de los estados inicial y final y $\Delta U$, ¿se puede saber si el cambio se debió a trabajo o a calor?* — **No.** $\Delta U$ depende solo de los estados (U p. 624), pero el reparto entre $Q$ y $W$ depende de la trayectoria (U pp. 622–623): el mismo $\Delta U$ puede lograrse calentando a volumen constante ($W=0$, $\Delta U=Q$), comprimiendo adiabáticamente ($Q=0$, $\Delta U=-W$) o con cualquier combinación. Hace falta conocer el proceso (la curva en el diagrama pV) para obtener $W=\int p\,dV$ y después $Q=\Delta U+W$. (Es la pregunta P19.4 de U, p. 638.)

**Cuestión (b) de Febrero 2023.** *Cuerpo caliente en un recipiente con tapa no hermética: ¿qué proceso sufre el aire al enfriarse el cuerpo?* — **Isobárico** (a la presión atmosférica). Como la tapa no cierra herméticamente, el aire interior se comunica con el exterior y su presión es siempre la atmosférica. No es isotermo (su temperatura baja hasta la ambiente), no es adiabático (pierde calor hacia el entorno) y, para una cantidad fija de aire, no es isócoro: al enfriarse a $p$ constante se contrae ($V\propto T$) y entra algo de aire de fuera para llenar el recipiente. (Es la pregunta P19.8 de U, p. 639, con galletas recién horneadas.)

**Cuestiones cortas de repaso para 2018/2020** (esas convocatorias no las traían; preguntas para análisis de U, **no de examen**): P19.10 (adiabático con $p$ que baja ⇒ expansión, $W>0$, $\Delta U=-W<0$: $U$ disminuye); P19.12 (expansión isobárica de gas ideal ⇒ $T$ sube, $\Delta U>0$ y $W>0$ ⇒ $Q>0$: entra calor); P19.19 ($dU=nC_VdT$ vale siempre para gas ideal; $nC_pdT$ es el calor a $p$ constante, no $dU$); P19.21 (en una expansión adiabática la energía para el trabajo sale de la energía interna, que baja).

**Receta.** Teoría de la primera ley: definiciones → $W=\int p\,dV$ con dibujo → dependencia de la trayectoria → $\Delta U=Q-W$ y función de estado → casos (ciclo, aislado, cuatro procesos) → gas ideal.
**Error típico.** Escribir $\Delta U=Q+W$ sin decir qué convención se usa; decir que el calor «se almacena» en el cuerpo; confundir isotermo con adiabático.
**Teoría:** U §19.1–19.8 pp. 619–636.

---

## PARTE B — Problemas del solucionario (E), de fácil a difícil

Orden: trabajo y primera ley sin gas ideal → procesos de gas ideal (isotermo, isócoro, isobárico) → $C_V$, $C_p$, $\gamma$ → adiabáticos → trayectorias y ciclos.

### E1. Problema 19.1 (U p. 639; Solucionario 19-1) — calentamiento isobárico

**Enunciado (de U).** Dos moles de gas ideal se calientan a presión constante desde $T=27$ °C hasta 107 °C. a) Dibuje una gráfica pV para este proceso. b) Calcule el trabajo efectuado por el gas.

**Solución.**
1. **a)** A $p$ constante, $V\propto T$: segmento horizontal hacia la derecha (el gas se expande).
2. **b)** $W=p(V_2-V_1)$ (19.3) y $pV=nRT$ ⇒ $W=nR(T_2-T_1)$. No necesitamos $p$.
3. $\Delta T=80$ K (una diferencia de temperaturas vale lo mismo en °C y en K): $W=2\cdot8{,}314\cdot80=$ **+1330 J**.

**Receta.** Isobárico de gas ideal: $W=p\Delta V=nR\Delta T$.
**Error típico.** Usar 380 K o 300 K sueltos en vez de la diferencia.
**Teoría:** U §19.2 p. 621 (19.3); §18.1 p. 586.

---

### E2. Problema 19.16 (U p. 641; Solucionario 19-5) — compresión isotérmica

**Enunciado (de U).** Durante una compresión isotérmica de gas ideal, es preciso extraer 410 J de calor al gas para mantener la temperatura constante. ¿Cuánto trabajo efectúa el gas durante el proceso?

**Solución.**
1. Gas ideal a $T$ constante ⇒ $\Delta U=0$ ($U$ solo depende de $T$, U p. 630).
2. Primera ley: $0=Q-W$ ⇒ $W=Q=$ **−410 J** (se extrae calor ⇒ $Q<0$).
3. Negativo: en una compresión el entorno hace trabajo sobre el gas.

**Receta.** Isotermo de gas ideal: $\Delta U=0$, $Q=W$.
**Error típico.** Responder +410 J.
**Teoría:** U §19.5 pp. 629–630; §19.6 p. 630.

---

### E3. Problema 19.9 (U p. 640; Solucionario 19-3 y 19-4) — expansión a presión constante

**Enunciado (de U).** Un gas en un cilindro se expande desde un volumen de 0,110 m³ a 0,320 m³. Fluye calor hacia el gas con la rapidez mínima que permite mantener la presión constante a $1{,}65\times10^5$ Pa durante la expansión. El calor total agregado es de $1{,}15\times10^5$ J. a) Calcule el trabajo efectuado por el gas. b) Calcule el cambio de energía interna del gas. c) ¿Importa si el gas tiene comportamiento ideal o no? ¿Por qué?

**Solución.**
1. **a)** $W=p\Delta V=1{,}65\times10^5\cdot0{,}210=$ **3,47 × 10⁴ J**.
2. **b)** $\Delta U=Q-W=1{,}15\times10^5-3{,}47\times10^4=$ **8,04 × 10⁴ J**.
3. **c)** **No importa:** $W=p\Delta V$ (definición de trabajo) y la primera ley valen para cualquier sustancia; no se ha usado $pV=nRT$.

**Receta.** Isobárico, cualquier sustancia: $W=p\Delta V$, $\Delta U=Q-W$.
**Error típico.** Creer que $\Delta U=Q$ (eso solo es a volumen constante).
**Teoría:** U §19.2 p. 621; §19.4 p. 624.

---

### E4. Problema 19.15 (U p. 641; Solucionario 19-5) — proceso isocórico

**Enunciado (de U).** Un gas ideal se lleva de $a$ a $b$ en la gráfica pV de la figura E19.15 (segmento vertical en $V=0{,}050$ m³, desde 30,0 kPa). Durante este proceso, se agregan 700 J de calor y se duplica la presión. a) ¿Cuánto trabajo realiza el gas o se efectúa sobre éste? b) ¿Cómo se compara la temperatura del gas en $a$ con su temperatura en $b$? c) ¿Cómo se compara la energía interna del gas en $a$ con la de $b$?

**Solución.**
1. **a)** $\Delta V=0$ ⇒ **$W=0$** (no hay área bajo un segmento vertical).
2. **b)** $pV=nRT$ con $n$, $V$ fijos ⇒ $T\propto p$: **$T_b=2T_a$**.
3. **c)** $\Delta U=Q-W=700$ J ⇒ **$U_b=U_a+700$ J**.

**Receta.** Isocórico: $W=0$, $\Delta U=Q$, $T\propto p$.
**Error típico.** Calcular un «trabajo» $V\Delta p$.
**Teoría:** U §19.5 p. 629 (19.9); §18.1 p. 586.

---

### E5. Problema 19.10 (U p. 640; Solucionario 19-4) — temperatura final con la primera ley

**Enunciado (de U).** Cinco moles de un gas monoatómico con comportamiento ideal y temperatura inicial de 127 °C se expanden y, en el proceso, absorben 1500 J de calor y efectúan 2100 J de trabajo. Calcule la temperatura final del gas.

**Solución.**
1. $\Delta U=Q-W=1500-2100=-600$ J.
2. Gas ideal monoatómico: $\Delta U=n\frac32R\Delta T$ (19.13 con 18.25) ⇒ $\Delta T=\dfrac{-600}{5\cdot1{,}5\cdot8{,}314}=-9{,}62$ K.
3. $T_2=127-9{,}62=$ **117 °C**. Se enfría: sale más energía como trabajo que la que entra como calor.

**Receta.** Primera ley → $\Delta U$ → $\Delta T=\Delta U/(nC_V)$ (válido en cualquier proceso de gas ideal).
**Error típico.** Pensar que si entra calor la temperatura tiene que subir.
**Teoría:** U §19.4 p. 624; §19.7 p. 631 (19.13).

---

### E6. Problema 19.3 (U p. 639; Solucionario 19-1) — compresión isotérmica hasta triplicar la presión

**Enunciado (de U).** Dos moles de gas ideal están comprimidos en un cilindro a temperatura constante de 65,0 °C hasta que se triplique la presión original. a) Dibuje una gráfica pV para este proceso. b) Calcule la cantidad de trabajo efectuado.

**Solución.**
1. **a)** Hipérbola $pV=$ cte recorrida hacia la izquierda y arriba.
2. **b)** Isotermo (ejemplo 19.1): $W=nRT\ln\dfrac{p_1}{p_2}=2\cdot8{,}314\cdot338{,}15\cdot\ln\frac13=$ **−6180 J** ($T$ en kelvin).

**Receta.** Isotermo: $W=nRT\ln(V_2/V_1)=nRT\ln(p_1/p_2)$.
**Error típico.** Escribir $\ln(p_2/p_1)$ (signo cambiado) o usar 65 °C.
**Teoría:** U §19.2 p. 621 (ejemplo 19.1).

---

### E7. Problema 19.25 (U p. 641; Solucionario 19-8 y 19-9) — compresión isotérmica al 25 %

**Enunciado (de U).** La temperatura de 0,150 moles de gas ideal se mantiene constante en 77,0 °C, mientras su volumen se reduce al 25,0 % de su volumen inicial. La presión inicial del gas es de 1,25 atm. a) Determine el trabajo efectuado por el gas. b) Determine el cambio de energía interna. c) ¿El gas intercambia calor con su entorno? Si lo hace, ¿de cuánto es el intercambio? ¿El gas absorbe o desprende calor?

**Solución.**
1. **a)** $W=nRT\ln\dfrac{V_2}{V_1}=0{,}150\cdot8{,}314\cdot350{,}15\cdot\ln0{,}25=$ **−605 J**. (La presión inicial no hace falta.)
2. **b)** $T$ constante ⇒ **$\Delta U=0$**.
3. **c)** $Q=W=$ **−605 J**: el gas **desprende** 605 J de calor.

**Receta / Error típico:** los de E2 y E6 (dato sobrante: $p_1$).
**Teoría:** U §19.2 p. 621; §19.6 p. 630.

---

### E8. Problema 19.7 (U p. 640; Solucionario 19-3) — trabajo en un ciclo rectangular

**Enunciado (de U).** a) En la figura 19.7a (U p. 622), considere el ciclo cerrado 1→3→2→4→1, que es un proceso cíclico donde los estados inicial y final son iguales. Calcule el trabajo total efectuado por el sistema y demuestre que es igual al área encerrada por el ciclo. b) ¿Qué relación hay entre ese trabajo y el que se realiza si se recorre el ciclo en sentido opuesto, 1→4→2→3→1?
(Fig. 19.7a: estado 1 $(V_1,p_1)$, estado 2 $(V_2,p_2)$ con $V_2>V_1$ y $p_2<p_1$; 3 $=(V_2,p_1)$, 4 $=(V_1,p_2)$.)

**Solución.**
1. $W_{13}=p_1(V_2-V_1)$ (isóbara, expansión); $W_{32}=0$ (isócora); $W_{24}=p_2(V_1-V_2)$ (isóbara, compresión); $W_{41}=0$.
2. Total: $W=(p_1-p_2)(V_2-V_1)$ = base × altura del rectángulo = **área encerrada**, positiva (sentido horario).
3. **b)** En sentido contrario cada tramo cambia de signo ⇒ $W=-(p_1-p_2)(V_2-V_1)$: mismo valor absoluto, signo opuesto.

**Receta.** Ciclo: $W$ = área encerrada; horario ⇒ $W>0$ (motor), antihorario ⇒ $W<0$.
**Error típico.** Sumar las áreas bajo las dos isóbaras en vez de restarlas.
**Teoría:** U §19.3 pp. 622–623; ejemplo 19.3 p. 626.

---

### E9. Problema 19.11 (U p. 640; Solucionario 19-4) — proceso abc leído en la gráfica

**Enunciado (de U).** En la figura E19.11 se muestra el diagrama pV del proceso $abc$ que implica 0,0175 moles de un gas ideal ($a$: 2,0 L y 0,20 atm; $b$: 2,0 L y 0,50 atm; $c$: 6,0 L y 0,30 atm; $bc$ es una recta). a) ¿Cuál fue la temperatura más baja que alcanzó el gas en este proceso? ¿Dónde ocurrió? b) ¿Cuánto trabajo efectuó el gas o se realizó sobre éste de $a$ a $b$? ¿Y de $b$ a $c$? c) Si se agregaron 215 J de calor en el gas durante $abc$, ¿cuántos de esos joules se destinaron a la energía interna?

**Solución.**
1. **a)** $T=pV/nR$ es mínima donde $pV$ es mínimo: en $a$ ($pV=0{,}4$ L·atm frente a 1,0 y 1,8). $T_a=\dfrac{0{,}20\cdot1{,}013\times10^5\cdot2{,}0\times10^{-3}}{0{,}0175\cdot8{,}314}=$ **278,5 K** en el punto $a$.
2. **b)** $W_{ab}=0$ (vertical). $W_{bc}$ = área del trapecio $=\frac12(0{,}50+0{,}30)$ atm $\cdot4{,}0$ L $=1{,}6$ L·atm $=$ **162 J** (lo efectúa el gas).
3. **c)** $\Delta U=Q-W=215-162=$ **53 J**.

**Receta.** Gráfica con segmentos: $T$ por $pV$; trabajo por áreas (1 L·atm = 101,3 J).
**Error típico.** Tomar una sola presión en el tramo inclinado.
**Teoría:** U §19.2 p. 620 (19.2); §19.4 p. 624.

---

### E10. Problema 19.18 (U p. 641; Solucionario 19-6) — calentar helio a V constante o a p constante

**Enunciado (de U).** Un cilindro contiene 0,0100 moles de helio a $T=27{,}0$ °C. a) ¿Cuánto calor se requiere para elevar la temperatura a 67,0 °C manteniendo constante el volumen? b) Si se mantiene constante la presión, ¿cuánto calor se requiere? c) ¿Qué explica la diferencia? d) ¿Cuánto cambia la energía interna en a) y en b)?

**Solución.**
1. **a)** $Q=nC_V\Delta T=0{,}0100\cdot12{,}47\cdot40{,}0=$ **4,99 J** (tabla 19.1).
2. **b)** $Q=nC_p\Delta T=0{,}0100\cdot20{,}78\cdot40{,}0=$ **8,31 J**.
3. **c)** A $p$ constante el gas se expande y hace trabajo $W=nR\Delta T=3{,}33$ J: ese calor extra sale como trabajo. Por eso $C_p=C_V+R$ (19.17).
4. **d)** $\Delta U=nC_V\Delta T=$ **4,99 J en los dos casos** (mismo $\Delta T$, y $U$ solo depende de $T$).

**Receta.** Volumen constante: $Q=nC_V\Delta T$; presión constante: $Q=nC_p\Delta T$; siempre $\Delta U=nC_V\Delta T$.
**Error típico.** Escribir $\Delta U=nC_p\Delta T$ en el isobárico.
**Teoría:** U §19.7 pp. 631–632 (19.12)–(19.17); tabla 19.1 p. 632.

---

### E11. Problema 19.17 (U p. 641; Solucionario 19-5 y 19-6) — CO₂ calentado a 1 atm

**Enunciado (de U).** Un cilindro contiene 0,250 moles de CO₂ gaseoso a 27,0 °C con un pistón sin fricción que mantiene 1,00 atm. Se calienta hasta 127,0 °C. Trate el CO₂ como gas ideal. a) Gráfica pV. b) Trabajo del gas. c) ¿Sobre qué se efectúa? d) Cambio de energía interna. e) Calor suministrado. f) Trabajo si la presión fuese 0,50 atm.

**Solución.**
1. **a)** Segmento horizontal hacia la derecha.
2. **b)** $W=nR\Delta T=0{,}250\cdot8{,}314\cdot100=$ **208 J**.
3. **c)** Sobre el pistón (y, a través de él, sobre el aire exterior).
4. **d)** $\Delta U=nC_V\Delta T=0{,}250\cdot28{,}46\cdot100=$ **712 J** (tabla 19.1).
5. **e)** $Q=\Delta U+W=$ **920 J** (coincide con $nC_p\Delta T=923$ J salvo redondeo de la tabla).
6. **f)** $W=nR\Delta T$ no depende de $p$: **208 J** (a menor presión el volumen inicial es mayor y $\Delta V$ también, en la misma proporción).

**Receta.** $W=nR\Delta T$, $\Delta U=nC_V\Delta T$, $Q=\Delta U+W$.
**Error típico.** Pensar que a la mitad de presión se hace la mitad de trabajo.
**Teoría:** U §19.2 p. 621; §19.7 pp. 631–632.

---

### E12. Problema 19.21 (U p. 641; Solucionario 19-7) — fracción del calor que se convierte en trabajo

**Enunciado (de U).** Fluye calor $Q$ hacia un gas monoatómico con comportamiento ideal y el volumen aumenta mientras la presión se mantiene constante. ¿Qué fracción de la energía calorífica se usa para efectuar el trabajo de expansión del gas?

**Solución.**
1. $W=p\Delta V=nR\Delta T$; $\Delta U=\frac32nR\Delta T=\frac32W$.
2. $Q=\Delta U+W=\frac52W$ ⇒ $W/Q=$ **2/5 = 40 %**. El 60 % restante se queda como energía interna.

**Receta.** Isobárico de gas ideal: $W/Q=R/C_p$ (monoatómico 2/5; diatómico 2/7).
**Error típico.** Responder 100 % «porque se expande».
**Teoría:** U §19.7 pp. 631–632.

---

### E13. Problema 19.22 (U p. 641; Solucionario 19-7 y 19-8) — tres moles de gas monoatómico a 2,50 atm

**Enunciado (de U).** Tres moles de un gas monoatómico ideal se expanden a una presión constante de 2,50 atm; el volumen cambia de $3{,}20\times10^{-2}$ m³ a $4{,}50\times10^{-2}$ m³. Calcule a) las temperaturas inicial y final; b) el trabajo; c) el calor agregado; d) el cambio de energía interna.

**Solución.**
1. $p=2{,}50\cdot1{,}013\times10^5=2{,}533\times10^5$ Pa.
2. **a)** $T_1=pV_1/nR=$ **325 K**; $T_2=pV_2/nR=$ **457 K**.
3. **b)** $W=p\Delta V=2{,}533\times10^5\cdot0{,}0130=$ **3,29 × 10³ J**.
4. **c)** $Q=nC_p\Delta T=\frac52p\Delta V=$ **8,23 × 10³ J**.
5. **d)** $\Delta U=\frac32p\Delta V=$ **4,94 × 10³ J**; comprobación $Q-W=8231-3292=4938$ J ✓.

**Receta.** Usa $nR\Delta T=p\Delta V$ para no arrastrar redondeos de $T$.
**Error típico.** Redondear $T_1$ y $T_2$ antes de restar (el resultado se desvía en la tercera cifra).
**Teoría:** U §19.7 pp. 631–632.

---

### E14. Problema 19.24 (U p. 641; Solucionario 19-8) — $C_V$ y $C_p$ a partir de $\gamma$

**Enunciado (de U).** Propano (C₃H₈) gaseoso se comporta como gas ideal con $\gamma=1{,}127$. Determine la capacidad calorífica molar a volumen y presión constantes.

**Solución.**
1. De $\gamma=C_p/C_V=(C_V+R)/C_V=1+R/C_V$ ⇒ $C_V=\dfrac{R}{\gamma-1}=\dfrac{8{,}314}{0{,}127}=$ **65,5 J/(mol·K)**.
2. $C_p=C_V+R=$ **73,8 J/(mol·K)**.
3. Lectura: molécula con muchos átomos ⇒ muchos grados de libertad ⇒ $C_V$ grande y $\gamma$ próximo a 1.

**Receta.** $C_V=R/(\gamma-1)$, $C_p=\gamma R/(\gamma-1)$.
**Error típico.** $C_V=\gamma R$.
**Teoría:** U §19.7 pp. 632–633 (19.17)–(19.18); ejemplo 19.6 p. 633.

---

### E15. Problema 19.19 (U p. 641; Solucionario 19-6) — 645 J a un gas en un cilindro

**Enunciado (de U).** En un experimento, 0,185 moles de aire a 780 K están en un cilindro de 40,0 cm³. Se transfieren 645 J de calor. a) Si el volumen se mantiene fijo, ¿qué temperatura final alcanza el aire? (Suponga que el aire es nitrógeno y use la tabla 19.1.) b) Repita si el volumen aumenta a presión constante.

**Solución.**
1. **a)** $\Delta T=\dfrac{Q}{nC_V}=\dfrac{645}{0{,}185\cdot20{,}76}=167{,}9$ K ⇒ **$T=948$ K**.
2. **b)** $\Delta T=\dfrac{Q}{nC_p}=\dfrac{645}{0{,}185\cdot29{,}07}=119{,}9$ K ⇒ **$T=900$ K**.
3. A $p$ constante sube menos: parte del calor se va en trabajo de expansión.

**Receta.** Con $Q$ dado: $\Delta T=Q/(nC)$ con la $C$ del proceso.
**Error típico.** Usar la misma $C$ en los dos apartados.
**Teoría:** U §19.7 pp. 631–632; tabla 19.1.

---

### E16. Problema 19.32 (U p. 642; Solucionario 19-11) — duplicar el volumen por tres caminos

**Enunciado (de U).** Un cilindro contiene 0,100 moles de un gas monoatómico ideal a $1{,}00\times10^5$ Pa en $2{,}50\times10^{-3}$ m³. a) Temperatura inicial. b) El gas se expande al doble de su volumen; calcule $T$ y $p$ finales si la expansión es i. isotérmica, ii. isobárica, iii. adiabática.

**Solución.**
1. **a)** $T_1=\dfrac{p_1V_1}{nR}=\dfrac{250}{0{,}8314}=$ **301 K**.
2. **i. Isotérmica:** $T=$ **301 K**; $p=p_1/2=$ **5,00 × 10⁴ Pa** (Boyle).
3. **ii. Isobárica:** $p=$ **1,00 × 10⁵ Pa**; $T=2T_1=$ **601 K** ($V\propto T$).
4. **iii. Adiabática** ($\gamma=5/3$): $T=T_1\,2^{-2/3}=$ **189 K**; $p=p_1\,2^{-5/3}=$ **3,15 × 10⁴ Pa**.
5. **Lectura.** Para el mismo $\Delta V$: la isobárica calienta (entra calor), la isoterma mantiene $T$, la adiabática enfría (paga el trabajo con su $U$). En el diagrama pV la adiabática cae por debajo de la isoterma.

**Receta.** Elige la «ley de dos estados» del proceso: isoterma $pV$; isóbara $V/T$; adiabática $pV^\gamma$ y $TV^{\gamma-1}$.
**Error típico.** Pensar que la adiabática conserva $T$ porque «no entra calor».
**Teoría:** U §19.5 pp. 629–630; §19.8 p. 635 (19.22), (19.24).

---

### E17. Problema 19.28 (U p. 641; Solucionario 19-9 y 19-10) — compresión en un motor de Ferrari

**Enunciado (de U).** El motor de un automóvil deportivo Ferrari F355 admite aire a 20,0 °C y 1,00 atm, y lo comprime adiabáticamente a 0,0900 veces el volumen original. El aire se puede tratar como gas ideal con $\gamma=1{,}40$. a) Gráfica pV. b) Temperatura y presión finales.

**Solución.**
1. **a)** Curva adiabática más empinada que la isoterma, recorrida hacia volúmenes pequeños.
2. **b)** $V_1/V_2=1/0{,}0900=11{,}1$. $T_2=T_1(V_1/V_2)^{\gamma-1}=293{,}15\cdot11{,}1^{0{,}40}=$ **768 K (495 °C)**; $p_2=p_1(V_1/V_2)^{\gamma}=11{,}1^{1{,}40}=$ **29,1 atm**.
3. Comprobación: $p_2=p_1\dfrac{V_1}{V_2}\dfrac{T_2}{T_1}=11{,}1\cdot\dfrac{768}{293}=29{,}1$ atm ✓.

**Receta.** Razón de compresión $r$: $T_2=T_1r^{\gamma-1}$, $p_2=p_1r^\gamma$.
**Error típico.** Elevar la temperatura en °C.
**Teoría:** U §19.8 p. 635 (19.22), (19.24); ejemplo 19.7 p. 636.

---

### E18. Problema 19.31 (U p. 641; Solucionario 19-10) — aire que asciende (gradiente adiabático)

**Enunciado (de U).** Una masa grande de aire a 1,01 × 10⁵ Pa se calienta con el suelo a 26,0 °C y empieza a ascender (proceso aproximadamente adiabático, ¿por qué?). Calcule su temperatura cuando la presión es 0,850 × 10⁵ Pa. Aire: gas ideal con $\gamma=1{,}40$.

**Solución.**
1. **Por qué adiabático:** el aire es mal conductor y la masa es grande: en el tiempo de subida apenas intercambia calor.
2. **Relación $T$–$p$:** sustituyendo $V=nRT/p$ en $TV^{\gamma-1}=$ cte ⇒ $T^\gamma p^{1-\gamma}=$ cte ⇒ $T_2=T_1\left(\dfrac{p_2}{p_1}\right)^{(\gamma-1)/\gamma}$.
3. $T_2=299{,}15\cdot(0{,}850/1{,}01)^{0{,}2857}=$ **284,8 K = 11,6 °C**. Se enfría unos 14 K.

**Receta.** Adiabática con presiones: exponente $(\gamma-1)/\gamma$.
**Error típico.** Usar $(p_2/p_1)^{\gamma-1}$.
**Teoría:** U §19.8 p. 635 (19.21)–(19.24).

---

### E19. Problema 19.26 (U p. 641; Solucionario 19-8 y 19-9) — presión final de una expansión adiabática con W dado

**Enunciado (de U).** Cinco moles de gas ideal monoatómico tienen una presión inicial de $2{,}50\times10^3$ Pa y volumen inicial de 2,10 m³. En una expansión adiabática, el gas realiza 1480 J de trabajo. ¿Cuál es la presión final?

**Solución.**
1. **Camino por energía:** $T_1=\dfrac{p_1V_1}{nR}=\dfrac{5250}{41{,}57}=126{,}3$ K. Adiabático ⇒ $W=nC_V(T_1-T_2)$ (19.25) ⇒ $T_2=T_1-\dfrac{W}{n\frac32R}=126{,}3-23{,}7=102{,}6$ K.
2. **Presión** con $T$–$p$ de la adiabática: $p_2=p_1\left(\dfrac{T_2}{T_1}\right)^{\gamma/(\gamma-1)}=2500\cdot(0{,}8121)^{5/2}=$ **1,49 × 10³ Pa**.
3. **Comprobación** por volúmenes: $V_2=V_1(T_1/T_2)^{1/(\gamma-1)}=2{,}870$ m³ y $p_2=p_1(V_1/V_2)^{5/3}=1486$ Pa ✓.

**Receta.** Si te dan $W$ de una adiabática, conviértelo en $\Delta T$ con $W=nC_V(T_1-T_2)$ y luego usa la relación adiabática.
**Error típico.** Usar $W=p\Delta V$ (la presión no es constante).
**Teoría:** U §19.8 p. 635 (19.22)–(19.25).

---

### E20. Problema 19.30 (U p. 641; Solucionario 19-10) — balón de baloncesto que bota

**Enunciado (de U).** Un balón se comprime al 80,0 % de su volumen original al botar. El aire (≈ N₂) está a 20,0 °C y 2,00 atm; diámetro interno 23,9 cm. a) Temperatura en la compresión máxima (adiabática, gas ideal). b) Cambio de energía interna.

**Solución.**
1. **a)** N₂ ⇒ $\gamma=1{,}40$. $T_2=T_1(V_1/V_2)^{\gamma-1}=293{,}15\cdot(1{,}25)^{0{,}40}=$ **320,5 K (47,4 °C)**.
2. **b)** $V_1=\frac43\pi(0{,}1195)^3=7{,}15\times10^{-3}$ m³; $n=\dfrac{p_1V_1}{RT_1}=\dfrac{2{,}026\times10^5\cdot7{,}15\times10^{-3}}{8{,}314\cdot293{,}15}=0{,}594$ mol.
3. $\Delta U=nC_V\Delta T=0{,}594\cdot20{,}76\cdot27{,}4=$ **≈ 338 J** (positivo: el trabajo del suelo sobre el aire se queda como energía interna, $Q=0$).

**Receta.** Adiabática: $T_2$ con $TV^{\gamma-1}$; $n$ con $pV=nRT$; $\Delta U=nC_V\Delta T$.
**Error típico.** Usar el diámetro como radio; olvidar pasar 2 atm a Pa.
**Teoría:** U §19.8 p. 635; §19.7 p. 631 (19.13).

---

### E21. Problema 19.37 (U p. 642; Solucionario 19-12 y 19-13) — trayectorias acb, adb y regreso curvo

**Enunciado (de U).** Cuando un sistema se lleva del estado $a$ al $b$ (figura P19.37) por la trayectoria $acb$, entran 90,0 J de calor y el sistema efectúa 60,0 J de trabajo. a) ¿Cuánto calor entra por la trayectoria $adb$ si el trabajo es 15,0 J? b) Cuando regresa de $b$ a $a$ por la trayectoria curva, el valor absoluto del trabajo es 35,0 J. ¿Absorbe o desprende calor? ¿Cuánto? c) Si $U_a=0$ y $U_d=8{,}0$ J, calcule el calor absorbido en $ad$ y $db$.
(Figura: $a$ abajo a la izquierda, $c$ encima de $a$, $b$ arriba a la derecha, $d$ abajo a la derecha; $ad$ horizontal, $db$ vertical.)

**Solución.**
1. $\Delta U_{ab}=Q_{acb}-W_{acb}=90-60=30$ J (vale por cualquier camino).
2. **a)** $Q_{adb}=\Delta U_{ab}+W_{adb}=30+15=$ **+45 J**.
3. **b)** De $b$ a $a$ el volumen disminuye ⇒ $W_{ba}=-35$ J; $\Delta U_{ba}=-30$ J ⇒ $Q_{ba}=-30-35=$ **−65 J** (desprende).
4. **c)** $U_b=30$ J. $W_{db}=0$ (vertical) ⇒ $W_{ad}=15$ J. $Q_{ad}=(8-0)+15=$ **+23 J**; $Q_{db}=(30-8)+0=$ **+22 J**. Suma 45 J ✓.

**Receta.** Saca $\Delta U$ del camino completo conocido y úsalo en todos los demás.
**Error típico.** Tomar $W_{ba}=+35$ J (en una compresión el trabajo del sistema es negativo).
**Teoría:** U §19.3–19.4 pp. 622–625.

---

### E22. Problema 19.39 (U p. 642; Solucionario 19-13 y 19-14) — enfriar a V constante y expandir a p constante

**Enunciado (de U).** Aire (gas ideal) primero se enfría sin cambiar su volumen y luego se expande a presión constante, trayectoria $abc$ de la figura P19.39 ($a$: 0,02 m³, 3,0 × 10⁵ Pa; $b$: 0,02 m³, 1,0 × 10⁵ Pa; $c$: 0,06 m³, 1,0 × 10⁵ Pa). a) ¿Cómo se compara $T_c$ con $T_a$? b) ¿Cuánto calor intercambia en $abc$? ¿Absorbe o libera? c) Si se expande de $a$ a $c$ por la recta, ¿cuánto calor intercambia?

**Solución.**
1. **a)** $\dfrac{T_c}{T_a}=\dfrac{p_cV_c}{p_aV_a}=\dfrac{6000}{6000}=1$ ⇒ **$T_c=T_a$** ⇒ $\Delta U_{ac}=0$ por cualquier camino.
2. **b)** $W_{ab}=0$; $W_{bc}=1{,}0\times10^5\cdot0{,}040=4000$ J ⇒ $Q_{abc}=W_{abc}=$ **+4,0 × 10³ J** (absorbe).
3. **c)** Recta: $W$ = trapecio $=\frac12(3{,}0+1{,}0)\times10^5\cdot0{,}040=8000$ J ⇒ $Q_{ac}=$ **+8,0 × 10³ J**.
4. Mismos extremos, distinto $Q$ y $W$: dependen de la trayectoria.

**Receta.** Si $p_aV_a=p_cV_c$, $\Delta U=0$ y $Q=W$ = área bajo el camino.
**Error típico.** Concluir «$Q=0$ porque $T$ final = $T$ inicial».
**Teoría:** U §19.3 pp. 622–623; §19.6 p. 630.

---

### E23. Problema 19.36 (U p. 642; Solucionario 19-12) — ciclo de helio con isóbara, isócora e isoterma

**Enunciado (de U).** La figura P19.36 muestra un diagrama pV para 3,25 moles de helio ideal ($a$: 0,010 m³; $b$: 0,040 m³ a la misma presión que $a$; $c$: 0,040 m³ y 2,0 × 10⁵ Pa). La parte $ca$ es isotérmica. a) Presión en $a$. b) Temperaturas en $a$, $b$, $c$. c) Calor en $ab$, $bc$, $ca$ (¿entra o sale?). d) Cambio de energía interna en cada tramo.

**Solución.**
1. **a)** Isoterma $ca$: $p_aV_a=p_cV_c$ ⇒ $p_a=2{,}0\times10^5\cdot4=$ **8,0 × 10⁵ Pa**.
2. **b)** $T_a=\dfrac{p_aV_a}{nR}=$ **296 K**; $T_b=4T_a=$ **1184 K**; $T_c=T_a=$ **296 K**.
3. **c)** $Q_{ab}=nC_p\Delta T=\frac52p\Delta V=$ **+6,00 × 10⁴ J** (entra); $Q_{bc}=nC_V\Delta T=\frac32V\Delta p=$ **−3,60 × 10⁴ J** (sale); $Q_{ca}=nRT_a\ln\frac{V_a}{V_c}=8000\ln\frac14=$ **−1,11 × 10⁴ J** (sale).
4. **d)** $\Delta U_{ab}=$ **+3,60 × 10⁴ J**; $\Delta U_{bc}=$ **−3,60 × 10⁴ J**; $\Delta U_{ca}=$ **0**. Suma 0 ✓ (ciclo).
5. **Extra.** $W_{ciclo}=\sum Q=1{,}29\times10^4$ J (horario).

**Receta.** Ciclo: estados → $\Delta U=\frac32\Delta(pV)$ → $W$ por áreas → $Q=\Delta U+W$; comprobar $\sum\Delta U=0$.
**Error típico.** Calcular $p_a$ con la isócora en vez de la isoterma.
**Teoría:** U §19.5 pp. 629–630; §19.7 pp. 631–632.

---

### E24. Problema 19.42 (U p. 643; Solucionario 19-15) — ciclo con una adiabática

**Enunciado (de U).** Tres moles de gas ideal se llevan por el ciclo $abc$ de la figura P19.42 ($C_p=29{,}1$ J/(mol·K)). El proceso $ac$ es a presión constante, $ba$ a volumen constante y $cb$ es adiabático. $T_a=300$ K, $T_c=492$ K, $T_b=600$ K. Calcule el trabajo total $W$ del ciclo.
(Figura: $a$ abajo a la izquierda, $c$ abajo a la derecha, $b$ arriba encima de $a$.)

**Solución.**
1. **$a\to c$ isobárico:** $W_{ac}=nR(T_c-T_a)=3\cdot8{,}314\cdot192=$ **+4789 J**.
2. **$c\to b$ adiabático:** $Q=0$ ⇒ $W_{cb}=-\Delta U=-nC_V(T_b-T_c)$, con $C_V=C_p-R=20{,}79$ J/(mol·K): $W_{cb}=-3\cdot20{,}79\cdot108=$ **−6735 J**.
3. **$b\to a$ isócoro:** $W_{ba}=0$.
4. **Total:** $W=4789-6735=$ **−1,95 × 10³ J**. Negativo: el ciclo es antihorario (se comprime por la adiabática a presiones más altas de las que se expande).

**Receta.** En un tramo adiabático no calcules áreas: $W=-\Delta U=nC_V(T_1-T_2)$.
**Error típico.** Usar $C_p$ en la adiabática o tomar $W_{cb}$ positivo.
**Teoría:** U §19.7 p. 632 (19.17); §19.8 p. 635 (19.25).

---

## PARTE C — Ejemplos resueltos de U (resultado y comprobación)

| Ejemplo (U p.) | Resultado de U | Comprobación numérica |
|---|---|---|
| 19.1 Expansión isotérmica (p. 621) | $W=nRT\ln(V_2/V_1)=nRT\ln(p_1/p_2)$ | Integral $\int nRT\,dV/V$ verificada simbólicamente; signo + si $V_2>V_1$ |
| 19.2 Para quemar el postre (p. 626) | $h=6410$ m (25 %: ≈ 1600 m) | $900\cdot4186/(60\cdot9{,}80)=6407$ m ✓; ×0,25 = 1602 m ✓ |
| 19.3 Proceso cíclico (p. 626) | $W=-500$ J (antihorario); $\Delta U=0$; $Q=-500$ J | Ciclo ⇒ $Q=W$ ✓ |
| 19.4 Comparación de procesos (p. 627) | $\Delta U_{ab}=150$ J; $W_{bd}=240$ J; $\Delta U_{abd}=510$ J; $W_{acd}=90$ J; $Q_{acd}=600$ J | $8{,}0\times10^4\cdot3{,}0\times10^{-3}=240$ ✓; $3{,}0\times10^4\cdot3{,}0\times10^{-3}=90$ ✓; $750-240=510$ ✓; $510+90=600$ ✓ |
| 19.5 Agua en ebullición (p. 628) | $W=169$ J; $Q=2256$ J; $\Delta U=2087$ J | $1{,}013\times10^5\cdot1670\times10^{-6}=169{,}2$ J ✓; $2256-169{,}2=2086{,}8$ ✓ |
| 19.6 Enfriamiento de una habitación (p. 633) | $C_V=20{,}79$ J/(mol·K); $\Delta U=-4{,}68\times10^5$ J | $8{,}314/0{,}400=20{,}785$ ✓; $2500\cdot20{,}785\cdot(-9)=-4{,}677\times10^5$ ✓ |
| 19.7 Motor diésel (p. 636) | $T_2=886$ K; $p_2=44{,}8\times10^5$ Pa ≈ 44 atm; $W=-494$ J | $300\cdot15^{0{,}4}=886{,}2$ K ✓; $1{,}01\times10^5\cdot15^{1{,}4}=44{,}76\times10^5$ Pa ✓; (19.26) $-493$ J y (19.25) con $n=0{,}0405$ mol $-494$ J ✓ |
| Problema práctico Van der Waals (p. 638) | $W_{vdW}=2{,}80\times10^3$ J; $W_{ideal}=3{,}11\times10^3$ J | 2797,9 J y 3111,9 J ✓ (dossier) |

---

## Tabla de verificación (sympy)

| Ejercicio | Resultado verificado |
|---|---|
| X1 Feb 2024 2ª P-2 | $Q_{ab}=90$, $Q_{bc}=890$, $Q_{ad}=300$, $Q_{dc}=350$ J; $Q_{abc}=980$, $Q_{adc}=650$ J; $\Delta U_{ac}=530$ J |
| X2 Feb 2022 1ª P-2 | $p_2=9{,}5244\times10^5$ Pa; $W=-26\,433$ J; $T_2/T_1=1{,}5874$ |
| X3 Sep 2019 Reserva P-2 | $W=236{,}70$ J (236,76 con 101 325 Pa); $p_2=16\,233$ Pa; $T_2/T_1=0{,}48075$ |
| X4 Sep 2019 Original P-2 | $T_f=300$ K; $p_f=1{,}5$ atm; $n_1=0{,}081228$, $n_2=0{,}040614$ mol; $V_1'=4/3$ L, $V_2'=2/3$ L; $\Delta S=0{,}057369$ J/K |
| X5 Feb 2019 1ª P-1 | $T_A=T_C=6{,}0921$ K, $T_B=24{,}369$ K; AB: $W=151{,}95$, $\Delta U=227{,}93$, $Q=379{,}88$ J; BC: $Q=\Delta U=-227{,}93$ J; CA: $W=Q=-70{,}216$ J; $\Delta S$: 28,814; −17,289; −11,526 J/K; $W=81{,}734$ J; $e=0{,}21516$ |
| X6 Feb 2023 2ª P-2 | $T_A=143{,}29$ K; $V_B=0{,}035722$, $V_C=0{,}14289$ m³; $Q_{AB}=16\,074{,}7$, $Q_{BC}=19\,808{,}2$, $Q_{CA}=-26\,791{,}2$ J; $W_{CA}=-10\,716{,}5$ J; $W=9091{,}8$ J; $Q_H=35\,883$ J; $e=0{,}25337$; $e_C=0{,}75$ |
| X7 Sep 2024 P-2 | $T_a=214{,}95$ K; $V_a=0{,}017871$, $V_c=0{,}047656$ m³; $Q_{ab}=6701{,}6$, $Q_{bc}=7011{,}3$, $Q_{ca}=-11\,169$ J; $W_{ca}=-4467{,}7$ J; $W=2543{,}6$ J; $e=0{,}18549$; $e_C=0{,}625$ |
| X8 Feb 2025 2ª P-2 | $ab$: 108 000 / 162 000 / 270 000 J; $bc$: 0 / −246 000 / −246 000 J; $ca$: −81 000 / 84 000 / 3000 J; $W=27\,000$ J; $V^*=109/160$ m³; entra 28 520,8 J y sale 25 520,8 J; $e=0{,}090446$ (0,098901 con el neto) |
| X9 Feb 2025 1ª P-2 | $T_a=252{,}59$ K; $p_b=21\,000$ Pa; $T_c=841{,}95$ K; $Q_{ab}=2528{,}3$, $Q_{bc}=12\,250$, $Q_{ca}=-17\,150$ J; $W_{ca}=-4900$ J; $W=-2371{,}7$ J; $K=6{,}2312$ |
| X10 Feb 2019 2ª P-2 | $c_p=1045$, $c_V=746{,}43$, $r=298{,}57$ J/(kg·K); $V_1=0{,}84929$ m³; $T_2=761{,}47$ K, $V_2=0{,}074812$ m³; $T_3=1961{,}47$ K, $V_3=0{,}19271$ m³; $T_4=1083{,}72$ K, $p_4=3{,}7610$ atm; $Q_{23}=1{,}254\times10^6$ J; $Q_{41}=-593\,839$ J; $W=660\,161$ J ($W_{12}=-353\,300$, $W_{23}=358\,286$, $W_{34}=655\,175$); $e=0{,}52644$; $V_1=0{,}82116$ m³ con $M=28{,}8$ g/mol |
| 19.1 | 1330,2 J |
| 19.16 | −410 J |
| 19.9 | 34 650 J; 80 350 J |
| 19.15 | $W=0$; $T_b=2T_a$; $\Delta U=700$ J |
| 19.10 | $\Delta T=-9{,}6223$ K; 117,38 °C |
| 19.3 | −6177,2 J |
| 19.25 | −605,36 J |
| 19.7 | $(p_1-p_2)(V_2-V_1)$ (simbólico) |
| 19.11 | $T_a=278{,}50$ K ($T_b=696{,}2$, $T_c=1253{,}2$ K); $W_{bc}=162{,}08$ J; $\Delta U=52{,}92$ J |
| 19.18 | 4,9880 J; 8,3120 J; $W=3{,}3256$ J |
| 19.17 | 207,85 J; 711,50 J; 919,35 J |
| 19.21 | 2/5 |
| 19.22 | 324,91 K; 456,91 K; 3292,2 J; 8230,6 J; 4938,4 J |
| 19.24 | 65,465; 73,779 J/(mol·K) |
| 19.19 | 947,94 K; 899,93 K |
| 19.32 | 300,70 K; 50 000 Pa; 601,40 K; 189,43 K y 31 498 Pa |
| 19.28 | 768,06 K; 29,111 atm |
| 19.31 | 284,77 K |
| 19.26 | $T_1=126{,}29$ K, $T_2=102{,}56$ K; $p_2=1485{,}6$ Pa |
| 19.30 | 320,52 K (47,37 °C); $V_1=7{,}1481\times10^{-3}$ m³; $n=0{,}59420$ mol; $\Delta U=337{,}6$ J |
| 19.37 | 45 J; −65 J; 23 J; 22 J |
| 19.39 | $T_c/T_a=1$; 4000 J; 8000 J |
| 19.36 | 296,07 K; 1184,3 K; 60 000 J; −36 000 J; −11 090 J |
| 19.42 | 4788,9 J; −6734,7 J; −1945,8 J |
| (extra) 19.27 | 4,7622 × 10⁵ Pa; −10 573 J; 1,5874 |
| (extra) 19.35 | 0,6804 mol; 0,03333 m³; 2225,8 J |

---

## Figuras SVG / gráficas pV sugeridas

| Ejercicio | Figura |
|---|---|
| X1 (Feb 2024) / 19.38 | Rectángulo $abcd$ con flechas de las dos trayectorias, $U$ en cada vértice y $Q$ de cada tramo junto al lado (todos positivos); sombrear las áreas bajo $bc$ (450 J) y bajo $ad$ (120 J) con dos tonos. |
| X2 (Feb 2022) | Adiabática $p_1V_1^{5/3}$ de (0,10; 3) a (0,05; 9,52) [×10⁵ Pa] y, a trazos, la isoterma que pasa por el estado inicial (llega a 6 × 10⁵ Pa) para ver que la adiabática es más empinada; área bajo la curva sombreada (26,4 kJ, negativo). |
| X3 (Sep 2019 R) | Adiabática de (3 L; 1 atm) a (9 L; 0,160 atm) con el área (237 J) sombreada y la isoterma a trazos (334 J) para comparar. |
| X4 (Sep 2019 O) | Esquema del cilindro en dos instantes: pistón al centro (1 L, 2 atm | 1 L, 1 atm, 300 K) y pistón desplazado (4/3 L | 2/3 L, 1,5 atm, 300 K). |
| X5 (Feb 2019 1ª) | Ciclo pV A(0,5 L; 1 atm) → B(2 L; 1 atm) → C(2 L; 0,25 atm) → isoterma de vuelta a A; flechas en sentido horario; $Q$ de cada tramo con su signo. |
| X6 (Feb 2023 2ª) | Ciclo A(0,0357; 1) → B(0,0357; 4) → isoterma 573 K → C(0,1429; 1) → A [m³; ×10⁵ Pa]; marcar $Q_{AB}$ y $Q_{BC}$ entrando y $Q_{CA}$ saliendo; barra comparativa $e=25{,}3$ % frente a 75 %. |
| X7 (Sep 2024) | Igual que X6 con a(0,0179; 1,5), b(0,0179; 4), c(0,0477; 1,5); tabla $Q$/$W$/$\Delta U$ al lado. |
| X8 (Feb 2025 2ª) | Triángulo a(0,55; 4), b(0,82; 4), c(0,82; 2), horario; punto $V^*=0{,}681$ m³ sobre la recta separando «entra calor» y «sale calor»; área de 27 kJ sombreada. Candidato a interactivo (mover un punto sobre la recta y ver el signo de $dQ$). |
| X9 (Feb 2025 1ª) | a(0,03; 70 kPa) → isoterma → b(0,1; 21) → c(0,1; 70) → a, sentido antihorario; flechas de $Q_C$ (entra) y $Q_H$ (sale). |
| X10 (Feb 2019 2ª) | Ciclo de cuatro tramos (dos adiabáticas, isóbara a 30 atm, isócora) con escala logarítmica en $p$ o indicación «no a escala», y la tabla de estados 1–4. |
| T1 (teoría) | (a) pistón con $dW=pA\,dx$; (b) dos caminos entre los mismos estados con áreas distintas; (c) las cuatro curvas de proceso (isóbara, isócora, isoterma, adiabática) desde un mismo punto; (d) ciclo horario (W>0) y antihorario (W<0). |
| E1, E11, E13 | Segmento isobárico con el rectángulo de área $W$ sombreado. |
| E2, E6, E7 | Hipérbola isoterma recorrida hacia la izquierda con el área bajo ella sombreada (signo negativo). |
| E4 | Segmento vertical en $V=0{,}050$ m³ de 30 a 60 kPa; «$W=0$». |
| E8 | Rectángulo 1-3-2-4 de la fig. 19.7a con el área encerrada y flechas en los dos sentidos. |
| E9 | Gráfica de E19.11: vertical $ab$ y recta $bc$ con el trapecio sombreado (162 J) y las isotermas que pasan por $a$, $b$, $c$ a trazos. |
| E10, E15 | Dos caminos desde el mismo estado a la misma isoterma final (vertical y horizontal) con $Q_V$ y $Q_p$ rotulados. |
| E16 | Tres curvas desde (2,5 L; 1,00 × 10⁵ Pa) hasta $V=5{,}0$ L: isóbara, isoterma, adiabática, con $T$ final en cada extremo (601, 301, 189 K). |
| E17, E20 | Adiabática de compresión con la isoterma a trazos. |
| E18 | Columna de aire ascendente con $p$ y $T$ en la base (1,01 × 10⁵ Pa; 26 °C) y arriba (0,85 × 10⁵ Pa; 11,6 °C). |
| E21 | Figura P19.37 con $\Delta U=30$ J y los calores de cada tramo. |
| E22 | Figura P19.39: camino $abc$ (área 4 kJ) frente a recta $ac$ (área 8 kJ) en dos tonos. |
| E23 | Ciclo de P19.36 con $T$ en cada vértice y $Q$ de cada tramo. |
| E24 | Ciclo de P19.42 (isóbara inferior, adiabática, isócora) antihorario, con $W_{ac}=+4789$ J y $W_{cb}=-6735$ J. |
