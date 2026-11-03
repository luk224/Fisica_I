# Soluciones Tema 20 — Segunda ley de la termodinámica

Material para el redactor del tema 20. Todos los números se han comprobado con sympy (scripts propios; resultados en la tabla final). Enunciados de U (`sears.txt`; ejercicios y problemas en págs. impresas 676–681, PDF 704–709; ejemplos en pp. 651–672) y desarrollos de `solman.txt` (la página «20-N» del solucionario es la página PDF 646+N; varias páginas mezclan dos problemas, y se ha comprobado cada uno por su enunciado). Los problemas E están traducidos y ampliados, no copiados. «U p. NN» = página impresa del Sears-Zemansky.

**Cotejo de los exámenes con la imagen del PDF.** Los enunciados X se han releído sobre la página renderizada: escaneos `E689010160-18F1.pdf`, `18F2.pdf`, `20F2.pdf` (p. 1) y recopilatorio `FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf` p. 26 (Septiembre 2019 «Original»); PDF nativos `25F1`/`25F2` y `EXAMENES FISICA 1.pdf` pp. 16–17 (Septiembre 2024) por su texto. Los de Febrero 2019 (1ª y 2ª) y Febrero 2023 (2ª) se toman de la transcripción ya cotejada en `soluciones_tema19.md`. **Septiembre 2019 «Original» P-3 Opción 3.2** (teoría de irreversibilidad) no figura todavía en `examenes_por_tema.md`.

Datos y convenciones (los de U): $R=8{,}314$ J/(mol·K); 1 atm $=1{,}013\times10^5$ Pa; $T_K=T_C+273{,}15$; **$Q>0$ si entra calor en la sustancia de trabajo, $W>0$ si la sustancia hace trabajo** (U p. 650). En una máquina $Q_H>0$, $Q_C<0$, $W>0$; en un refrigerador $Q_C>0$, $Q_H<0$, $W<0$. Monoatómico: $C_V=\frac32R$, $C_p=\frac52R$, $\gamma=5/3$; diatómico: $C_V=\frac52R$, $C_p=\frac72R$, $\gamma=7/5$ (U p. 633). **En toda fórmula de Carnot y de entropía, $T$ en kelvin** (U p. 660, «CUIDADO»).

## Herramientas de teoría que se usan

| Herramienta | Dónde |
|---|---|
| Procesos reversibles (cuasiequilibrio, se invierten con un cambio infinitesimal) e irreversibles (flujo de calor con $\Delta T$ finita, expansión libre, rozamiento) | U §20.1 pp. 647–648 |
| Máquina térmica, depósitos, signos; ciclo: $\Delta U=0$, $W=Q=Q_H+Q_C=|Q_H|-|Q_C|$ (20.1)–(20.2) | U §20.2 pp. 649–650 |
| **Eficiencia térmica $e=\dfrac{W}{Q_H}=1+\dfrac{Q_C}{Q_H}=1-\left|\dfrac{Q_C}{Q_H}\right|$ (20.3)–(20.4)** | U p. 650 |
| Estrategia 20.1 (diagrama de flujo de energía; $P=W/t$; «¿cuánto en un segundo?») | U p. 651 |
| Ciclo Otto $e=1-\dfrac{1}{r^{\gamma-1}}$ (20.6); Diesel | U §20.3 pp. 652–654 |
| Refrigerador: $|Q_H|=|Q_C|+|W|$ (20.7)–(20.8); **$K=\dfrac{|Q_C|}{|W|}=\dfrac{|Q_C|}{|Q_H|-|Q_C|}$ (20.9)**; $K=H/P$ | U §20.4 pp. 654–656 |
| **Segunda ley, enunciado de «máquina» (Kelvin-Planck)** | U §20.5 p. 656 |
| **Enunciado de «refrigerador» (Clausius)**; equivalencia de ambos (fig. 20.11) | U pp. 657–658 |
| **Ciclo de Carnot**: 2 isotermas + 2 adiabáticas, todas reversibles; $Q_H=nRT_H\ln\frac{V_b}{V_a}$ (20.10); $Q_C=-nRT_C\ln\frac{V_c}{V_d}$ (20.11); $\frac{V_b}{V_a}=\frac{V_c}{V_d}$ | U §20.6 pp. 658–660 |
| **$\dfrac{Q_C}{Q_H}=-\dfrac{T_C}{T_H}$ (20.13); $e_{Carnot}=1-\dfrac{T_C}{T_H}$ (20.14)** | U p. 660 |
| **Refrigerador de Carnot $K_{Carnot}=\dfrac{T_C}{T_H-T_C}$ (20.15)** | U p. 662 |
| Ninguna máquina supera a Carnot entre las mismas $T$ (fig. 20.15); todas las de Carnot tienen la misma $e$ | U pp. 662–663 |
| Escala Kelvin $\frac{T_C}{T_H}=\frac{|Q_C|}{|Q_H|}$ (20.16) | U p. 663 |
| **Entropía: $dS=\dfrac{dQ}{T}$ (20.17); isotérmico reversible $\Delta S=\dfrac{Q}{T}$ (20.18)** | U §20.7 p. 665 |
| **$\Delta S=\displaystyle\int_1^2\dfrac{dQ}{T}$ (20.19)**; $S$ función de estado; un proceso irreversible se calcula por **un camino reversible inventado** con los mismos extremos | U p. 666 |
| Cambio de temperatura $\Delta S=mc\ln\frac{T_2}{T_1}$ (ej. 20.6); adiabático reversible $\Delta S=0$ (ej. 20.7); expansión libre $\Delta S=nR\ln\frac{V_2}{V_1}$ (ej. 20.8) | U pp. 666–667 |
| Carnot: $\frac{Q_H}{T_H}+\frac{Q_C}{T_C}=0$ (20.20); ciclo reversible $\oint\frac{dQ}{T}=0$ (20.21) | U pp. 668–669 |
| **Principio de aumento de entropía**: incluyendo todos los sistemas, $\Delta S_{total}\ge0$ (= 0 solo si reversible) | U pp. 669–670 |
| Interpretación microscópica $S=k\ln w$ (20.22); $\Delta S=k\ln\frac{w_2}{w_1}$ (20.23) | U §20.8 pp. 671–672 |
| (Del tema 19) $Q=\Delta U+W$; $\Delta U=nC_V\Delta T$; isotermo $W=nRT\ln\frac{V_2}{V_1}$; adiabático $TV^{\gamma-1}$ y $pV^\gamma$ ctes, $W=nC_V(T_1-T_2)$ | U pp. 621, 624, 631, 634–635 |

**Para entropías de gas ideal por tramos** (consecuencia directa de (20.19) con $dQ=nC_VdT$, $dQ=nC_pdT$ o $dQ=p\,dV$): isócoro $\Delta S=nC_V\ln\frac{T_2}{T_1}$; isóbaro $\Delta S=nC_p\ln\frac{T_2}{T_1}$; isotermo $\Delta S=nR\ln\frac{V_2}{V_1}=\frac{Q}{T}$; adiabático reversible $\Delta S=0$. En un ciclo la suma de los $\Delta S$ del gas es 0 (es una buena comprobación).

---

## PARTE A — Exámenes (X)

**Qué ha caído del tema 20.** Tres problemas principales (máquina de Carnot, refrigerador de Carnot, refrigerador con un ciclo cualquiera), tres preguntas de teoría (reversibles/irreversibles y Carnot; irreversibilidad; enunciado de la segunda ley con dos cuestiones) y seis problemas de ciclos del tema 19 cuyas últimas preguntas (rendimiento, comparación con Carnot, entropía) son del tema 20. Ordenados de más fácil a más difícil.

### X1. Examen Febrero 2020 (2ª semana) P-2 (3 puntos) — sistema de frío con ciclo de Carnot

**Fuente.** `E689010160-20F2.pdf` (escaneo), p. 1, pregunta 2.

**Enunciado (literal).** Un sistema de frío que sigue un ciclo de Carnot funciona con 18 moles de un gas ideal monoatómico, realizando ciclos de 2 s. Las temperaturas de los focos son 450 K y 150 K y consume una potencia de 60 kW. Se pide: a) dibujar el ciclo en un diagrama p-V especificando las transformaciones que se realizan; b) calcular la eficiencia; c) calcular el calor intercambiado en cada etapa y la relación entre los volúmenes en la compresión isotérmica; d) calcular la variación de entropía del gas en cada transformación y en el ciclo; e) sabiendo que después de la expansión isoterma el volumen del gas es 0,5 m³, calcular la presión y el volumen después de la compresión adiabática.

**Solución.**
1. **Qué es cada cosa.** «Sistema de frío» = refrigerador: con trabajo de fuera saca calor $Q_C$ del foco frío ($T_C=150$ K) y entrega $|Q_H|$ al caliente ($T_H=450$ K) (U §20.4 p. 654). Es de **Carnot**, el ciclo de U fig. 20.13 recorrido **al revés** (U p. 662): con las letras de U, $a\to d$ expansión adiabática ($T_H\to T_C$), $d\to c$ **expansión isoterma a $T_C$** (absorbe $Q_C$), $c\to b$ compresión adiabática ($T_C\to T_H$), $b\to a$ **compresión isoterma a $T_H$** (cede $Q_H$).
2. **a) Diagrama pV.** Dos hipérbolas $pV=$ cte (isotermas 450 K arriba y 150 K abajo) unidas por dos adiabáticas, más empinadas; recorrido **antihorario** ⇒ $W_{neto}<0$ (el gas recibe trabajo). Los valores numéricos de los cuatro vértices salen en el paso 8.
3. **b) «Eficiencia» de un refrigerador = coeficiente de rendimiento $K$** (U (20.9) p. 654). Para Carnot solo dependen de las temperaturas, (20.15) p. 662: $K=\dfrac{T_C}{T_H-T_C}=\dfrac{150}{300}=$ **0,50**. (Por cada julio de trabajo se sacan 0,5 J del foco frío: con una diferencia de temperaturas tan grande, un refrigerador rinde poco.)
4. **c) Calores.** Trabajo por ciclo = potencia × duración: $|W|=60\,000\cdot2=1{,}2\times10^5$ J ($W=-1{,}2\times10^5$ J). De $K=|Q_C|/|W|$: $Q_C=0{,}5\cdot1{,}2\times10^5=$ **+6,0 × 10⁴ J** (entra en $d\to c$). Primera ley del ciclo (20.8): $|Q_H|=|Q_C|+|W|=1{,}8\times10^5$ J ⇒ $Q_H=$ **−1,8 × 10⁵ J** (sale en $b\to a$). Comprobación con (20.13): $Q_C/Q_H=-150/450=-1/3$ ✓. En las dos adiabáticas **$Q=0$**.
5. **Trabajo de cada etapa** (útil para la tabla): isotermas $W=Q$ ($\Delta U=0$): $W_{dc}=+6{,}0\times10^4$ J, $W_{ba}=-1{,}8\times10^5$ J; adiabáticas $W=-\Delta U=-nC_V\Delta T$: $W_{cb}=-18\cdot\frac32\cdot8{,}314\cdot300=-6{,}73\times10^4$ J y $W_{ad}=+6{,}73\times10^4$ J (se cancelan, como en todo ciclo de Carnot). Suma $-1{,}2\times10^5$ J ✓.
6. **Relación de volúmenes en la compresión isoterma** ($b\to a$, a 450 K). $Q_H=nRT_H\ln\dfrac{V_a}{V_b}$ (como en (20.10)): $\ln\dfrac{V_b}{V_a}=\dfrac{1{,}8\times10^5}{18\cdot8{,}314\cdot450}=2{,}673$ ⇒ $\dfrac{V_b}{V_a}=$ **14,5** (el volumen se reduce a 0,0691 del inicial). La expansión isoterma a 150 K tiene la misma razón: $\ln\frac{V_c}{V_d}=\frac{6\times10^4}{18\cdot8{,}314\cdot150}=2{,}673$, como exige $\frac{V_b}{V_a}=\frac{V_c}{V_d}$ (U p. 660).
7. **d) Entropía del gas.** Isotermas reversibles, (20.18): $\Delta S_{dc}=\dfrac{Q_C}{T_C}=\dfrac{6\times10^4}{150}=$ **+400 J/K**; $\Delta S_{ba}=\dfrac{Q_H}{T_H}=\dfrac{-1{,}8\times10^5}{450}=$ **−400 J/K**. Adiabáticas reversibles: **$\Delta S=0$** (ej. 20.7, p. 667). **Ciclo: $\Delta S=0$** (20.20)–(20.21): $S$ es función de estado y el gas vuelve al estado inicial. (Los focos cambian $-400$ y $+400$ J/K: el universo tampoco cambia, porque Carnot es reversible.)
8. **e) Tras la compresión adiabática.** «Después de la expansión isoterma» = estado $c$: $V_c=0{,}5$ m³, $T_c=150$ K, $p_c=\dfrac{nRT_C}{V_c}=\dfrac{18\cdot8{,}314\cdot150}{0{,}5}=4{,}49\times10^4$ Pa. La compresión adiabática $c\to b$ lleva el gas a $T_H$; con $TV^{\gamma-1}=$ cte (19.22), $\gamma-1=2/3$:
   $V_b=V_c\left(\dfrac{T_C}{T_H}\right)^{1/(\gamma-1)}=0{,}5\cdot\left(\tfrac13\right)^{3/2}=$ **0,0962 m³**; $p_b=\dfrac{nRT_H}{V_b}=$ **7,0 × 10⁵ Pa** (≈ 6,9 atm). Comprobación con $pV^\gamma$: $p_c(V_c/V_b)^{5/3}=6{,}999\times10^5$ Pa ✓.
   Los otros vértices (para la figura): $V_a=V_b/14{,}48=6{,}64\times10^{-3}$ m³, $p_a=1{,}01\times10^7$ Pa; $V_d=V_c/14{,}48=0{,}0345$ m³, $p_d=6{,}50\times10^5$ Pa.

| Etapa | Proceso | $Q$ (kJ) | $W$ (kJ) | $\Delta U$ (kJ) | $\Delta S_{gas}$ (J/K) |
|---|---|---|---|---|---|
| $a\to d$ | expansión adiabática 450 → 150 K | 0 | +67,3 | −67,3 | 0 |
| $d\to c$ | expansión isoterma 150 K | **+60** | +60 | 0 | +400 |
| $c\to b$ | compresión adiabática 150 → 450 K | 0 | −67,3 | +67,3 | 0 |
| $b\to a$ | compresión isoterma 450 K | **−180** | −180 | 0 | −400 |
| Ciclo | | −120 | −120 | 0 | 0 |

**Receta.** Refrigerador de Carnot: $K=T_C/(T_H-T_C)$ → $|W|=P\,t$ → $Q_C=K|W|$ → $|Q_H|=|Q_C|+|W|$; razón de volúmenes con $Q=nRT\ln(V_2/V_1)$; entropía $Q/T$ en las isotermas y 0 en las adiabáticas; estados extremos con $TV^{\gamma-1}$ cte.
**Error típico.** Dar como «eficiencia» $e=1-T_C/T_H=0{,}67$ (eso es la de la máquina, no la del refrigerador); poner $Q_C$ y $Q_H$ con signos de máquina; usar $\gamma=1{,}4$ con un gas monoatómico; decir que la entropía del gas «aumenta en el ciclo».
**Teoría:** U §20.4 p. 654 (20.8)–(20.9); §20.6 pp. 659–662 (20.10)–(20.15); §19.8 p. 634 (19.22); §20.7 pp. 665–669 (20.18), (20.20)–(20.21).

---

### X2. Examen Febrero 2018 (1ª semana) P-2 (3 puntos) — máquina de Carnot a 30 ciclos por segundo

**Fuente.** `E689010160-18F1.pdf` (escaneo), p. 1, pregunta 2.

**Enunciado (literal).** Sea una máquina térmica que funciona siguiendo un ciclo de Carnot 30 veces por segundo. Si los valores de las variables en los distintos puntos del ciclo son los siguientes: $V_1=5$ L, $T_1=500$ K, $P_2=4$ atm y $V_3=20$ L, calcular: a) Intercambio de calor y trabajo en cada transición del ciclo. b) Rendimiento del ciclo. c) Potencia de la máquina.

**Datos que hay que suponer (y escribirlo en el examen).** El enunciado no da ni la cantidad de gas ni su tipo. Lo natural es **1 mol de gas ideal** y, para el aire, **diatómico ($\gamma=1{,}4$)**; abajo se dan también los resultados con monoatómico. Numeración habitual (la de U fig. 20.13 con números): $1\to2$ expansión isoterma a $T_H=T_1$, $2\to3$ expansión adiabática, $3\to4$ compresión isoterma a $T_C$, $4\to1$ compresión adiabática. Los datos son coherentes con esto ($p_2<p_1$ y $V_3>V_2$, ver pasos 2–3).

**Solución** (1 mol, $\gamma=1{,}4$).
1. **Estado 1.** $p_1=\dfrac{nRT_1}{V_1}=\dfrac{8{,}314\cdot500}{5\times10^{-3}}=8{,}31\times10^5$ Pa $=8{,}21$ atm.
2. **Estado 2** (misma isoterma, $p_1V_1=p_2V_2$): $V_2=\dfrac{p_1V_1}{p_2}=\dfrac{4157\ \text{J}}{4\cdot1{,}013\times10^5}=$ **10,26 L**; $T_2=500$ K.
3. **Estado 3** (adiabática $2\to3$, $TV^{\gamma-1}$ cte): $T_3=T_C=T_2\left(\dfrac{V_2}{V_3}\right)^{0{,}4}=500\left(\dfrac{10{,}26}{20}\right)^{0{,}4}=$ **382,8 K**; $p_3=\dfrac{nRT_3}{V_3}=1{,}59\times10^5$ Pa (1,57 atm).
4. **Estado 4.** En Carnot $\dfrac{V_2}{V_1}=\dfrac{V_3}{V_4}$ (U p. 660, con las dos adiabáticas) ⇒ $V_4=\dfrac{V_1V_3}{V_2}=$ **9,75 L**; $p_4=3{,}27\times10^5$ Pa (3,22 atm).
5. **a) Calor y trabajo en cada transición** (U (20.10)–(20.11); adiabáticas $W=-\Delta U=nC_V(T_{ini}-T_{fin})$, $C_V=\frac52R$):
   - $1\to2$ isoterma 500 K: $Q_{12}=W_{12}=nRT_1\ln\dfrac{V_2}{V_1}=4157\ln2{,}052=$ **+2988 J** (entra).
   - $2\to3$ adiabática: $Q=0$; $W_{23}=nC_V(T_1-T_3)=\frac52\cdot8{,}314\cdot117{,}2=$ **+2435 J**.
   - $3\to4$ isoterma 382,8 K: $Q_{34}=W_{34}=nRT_3\ln\dfrac{V_4}{V_3}=-nRT_3\ln\dfrac{V_2}{V_1}=$ **−2288 J** (sale).
   - $4\to1$ adiabática: $Q=0$; $W_{41}=$ **−2435 J**.
6. **b) Rendimiento.** $W=2988-2288=$ **700 J** por ciclo; $e=\dfrac{W}{Q_H}=\dfrac{700}{2988}=$ **0,234 (23,4 %)**. Coincide con $e=1-\dfrac{T_C}{T_H}=1-\dfrac{382{,}8}{500}$ (20.14), como debe en Carnot.
7. **c) Potencia.** $P=\dfrac{W}{t}=700\ \text{J}\cdot30\ \text{s}^{-1}=$ **2,1 × 10⁴ W = 21 kW**.
8. **Entropía (comprobación).** $\dfrac{Q_{12}}{T_1}=+5{,}98$ J/K y $\dfrac{Q_{34}}{T_3}=-5{,}98$ J/K: suma 0 (20.20).

**Si el gas fuese monoatómico ($\gamma=5/3$).** Los estados 1, 2 y 4 y $Q_{12}=2988$ J no cambian ($V_4=V_1V_3/V_2$ no depende de $\gamma$); $T_3=320{,}4$ K, $p_3=1{,}31$ atm, $W_{23}=-W_{41}=2240$ J, $Q_{34}=-1915$ J, $W=1073$ J, $e=35{,}9$ %, $P=32{,}2$ kW.

| Estado | $V$ (L) | $p$ (atm) | $T$ (K) |
|---|---|---|---|
| 1 | 5,00 | 8,21 | 500 |
| 2 | 10,26 | 4,00 | 500 |
| 3 | 20,00 | 1,57 | 382,8 |
| 4 | 9,75 | 3,22 | 382,8 |

**Receta.** Carnot con estados sueltos: completa los vértices con $pV=nRT$ (isotermas) y $TV^{\gamma-1}$ cte (adiabáticas), usa $V_2/V_1=V_3/V_4$; calores solo en las isotermas ($nRT\ln$), trabajos de las adiabáticas iguales y opuestos; $e=1-T_C/T_H$; potencia = trabajo por ciclo × ciclos por segundo.
**Error típico.** Calcular $e$ con temperaturas en °C; poner calor en las adiabáticas; multiplicar el **calor** absorbido (y no el trabajo neto) por 30 para la potencia; no declarar la hipótesis sobre $n$ y $\gamma$.
**Teoría:** U §20.6 pp. 659–660 (20.10)–(20.14); §19.8 p. 634 (19.22), p. 635 (19.25); Estrategia 20.1 p. 651 ($P=W/t$).

---

### X3. Examen Febrero 2025 (1ª semana) P-2 (3 puntos) — refrigerador con gas diatómico (isoterma, isócora, isóbara)

**Fuente.** `fuentes_txt/examenes/E689010160-25F1.txt`, p. 1 del PDF (también en los dos recopilatorios).

**Enunciado (literal).** Un ciclo de refrigeración opera un mol de un gas ideal diatómico. El ciclo consta de un proceso isotermo $a\to b$, un proceso isócoro $b\to c$ y un proceso isóbaro $c\to a$ que cierra el ciclo. Se conoce que $p_a=70$ kPa y que $V_a=0{,}03$ m³ y que $V_b=0{,}1$ m³. Conociendo estos datos: (a) Dibuje el ciclo termodinámico descrito en un diagrama pV. (b) Calcule el coeficiente de rendimiento del refrigerador. Considere: $C_V=5R/2$ y $C_p=7R/2$ y la constante de los gases $R=8{,}314$ J mol⁻¹K⁻¹.

**Solución.**
1. **Estados.** $T_a=\dfrac{p_aV_a}{nR}=\dfrac{2100}{8{,}314}=$ **252,6 K**. Isoterma ⇒ $p_b=\dfrac{p_aV_a}{V_b}=$ **21 kPa**, $T_b=252{,}6$ K. Isócora hasta la presión de $a$ (porque $c\to a$ es isóbaro): $V_c=0{,}1$ m³, $p_c=70$ kPa, $T_c=\dfrac{7000}{8{,}314}=$ **842,0 K**.
2. **a) Diagrama.** $a$ (0,03; 70) baja por la hipérbola hasta $b$ (0,1; 21), sube vertical a $c$ (0,1; 70) y vuelve horizontal a $a$. El sentido es **antihorario**: el trabajo neto es negativo (área encerrada), como corresponde a un refrigerador (U p. 654).
3. **Calor de cada tramo** (primera ley, tema 19):
   - $a\to b$ isoterma: $Q_{ab}=W_{ab}=nRT_a\ln\dfrac{V_b}{V_a}=2100\ln\dfrac{10}{3}=$ **+2528 J** (entra).
   - $b\to c$ isócora: $W=0$, $Q_{bc}=nC_V(T_c-T_b)=\frac52(p_cV_c-p_bV_b)=\frac52(7000-2100)=$ **+12 250 J** (entra).
   - $c\to a$ isóbara: $Q_{ca}=nC_p(T_a-T_c)=\frac72p_a(V_a-V_c)=$ **−17 150 J** (sale); $W_{ca}=p_a(V_a-V_c)=-4900$ J.
4. **Trabajo neto.** $W=Q_{neto}=2528+12\,250-17\,150=$ **−2372 J** (se le suministran 2372 J por ciclo). Comprobación: $W_{ab}+W_{bc}+W_{ca}=2528+0-4900$ ✓.
5. **b) Coeficiente de rendimiento** (20.9): $K=\dfrac{|Q_C|}{|W|}$, donde $Q_C$ es todo el calor que **absorbe** la sustancia en el ciclo: $Q_C=2528+12\,250=14\,778$ J; $|Q_H|=17\,150$ J $=|Q_C|+|W|$ ✓ (20.8). $K=\dfrac{14\,778}{2372}=$ **6,23**.
6. **Comprobación con entropía.** $\Delta S_{ab}=R\ln\frac{10}{3}=+10{,}01$; $\Delta S_{bc}=C_V\ln\frac{T_c}{T_b}=+25{,}02$; $\Delta S_{ca}=C_p\ln\frac{T_a}{T_c}=-35{,}03$ J/K. Suma 0 ✓.
7. **Observación (no se pide).** No tiene sentido comparar este $K$ con el de Carnot entre $T_{min}=252{,}6$ K y $T_{max}=842$ K ($K_C=0{,}43$): en este ciclo el gas absorbe calor también a temperaturas altas (durante $b\to c$ sube hasta 842 K), no solo de un foco frío a 252,6 K. La cota de Carnot (20.15) es para un refrigerador que toma calor de un foco a $T_C$ y lo cede a uno a $T_H$.

**Receta.** Refrigerador con ciclo cualquiera: tabla de $Q$ por tramo → $Q_C$ = suma de los $Q>0$, $|Q_H|$ = suma de los $|Q|$ con $Q<0$ → $|W|=|Q_H|-|Q_C|$ → $K=|Q_C|/|W|$.
**Error típico.** Poner en el numerador el calor cedido (daría $K=7{,}23$, que es la «eficiencia» de bomba de calor); usar $\frac32R$; olvidar el calor de la isócora.
**Teoría:** U §19.2 p. 621; §19.5 pp. 629–630; §19.7 pp. 631–632; §20.4 p. 654 (20.8)–(20.9); §20.6 p. 662 (20.15).

---

### X4. Examen Septiembre 2019 «Original» P-2 (3 puntos) — entropía al soltar un pistón en un cilindro aislado

**Fuente.** `FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf`, p. 26 (escaneo; «Curso 2018-2019, Original, Septiembre 2019»). La parte de presión y temperatura está resuelta también en `soluciones_tema19.md` (X4); aquí se insiste en la entropía.

**Enunciado (literal).** Un cilindro térmicamente aislado, cerrado por ambos extremos, está provisto de un pistón conductor sin rozamiento, que lo divide en dos partes. Inicialmente se sujeta al pistón en el centro del cilindro de forma que este está dividido en dos partes iguales, quedando a un lado un litro de aire a 300 K y a 2 atmósferas y al otro, un litro de aire a 300 K y a 1 atmósfera. Se abandona el pistón asimismo, alcanzándose el equilibrio de presión y temperatura en una nueva posición. Calcúlese la presión y la temperatura finales así como la variación de entropía ΔS.

**Solución.**
1. **Sistema aislado** (gases + pistón, cilindro rígido y aislado): $Q=0$, $W=0$ ⇒ $\Delta U_{total}=0$ (U p. 625). Gas ideal ⇒ $U$ solo depende de $T$; los dos gases empiezan a 300 K y el pistón conductor iguala temperaturas ⇒ **$T_f=300$ K**.
2. **Presión final.** Moles $n_1=\dfrac{p_1V}{RT}$, $n_2=\dfrac{p_2V}{RT}$ ($n_1=2n_2$). Con el volumen total 2 L: $p_f=\dfrac{(n_1+n_2)RT}{2V}=\dfrac{p_1+p_2}{2}=$ **1,5 atm** ($1{,}52\times10^5$ Pa). Volúmenes finales: $V_1'=\frac{n_1RT}{p_f}=\frac43$ L, $V_2'=\frac23$ L.
3. **Por qué no vale $\Delta S=Q/T=0$.** El proceso es **irreversible** (el pistón se suelta con una diferencia finita de presión, oscila y se frena por la disipación interna). La fórmula (20.19) solo vale en procesos reversibles; como $S$ es **función de estado**, se inventa un camino reversible con los mismos extremos (U p. 666, como en el ej. 20.8 de la expansión libre).
4. **Camino reversible elegido.** Cada gas pasa de (300 K, $V$) a (300 K, $V'$): una **expansión o compresión isoterma reversible** para cada uno, con $\Delta S=\dfrac{Q}{T}=nR\ln\dfrac{V'}{V}$ (ej. 20.8 generalizado, p. 667). Escribiendo $nR=pV/T$:
   $\Delta S_1=\dfrac{p_1V}{T}\ln\dfrac43=\dfrac{2\cdot1{,}013\times10^5\cdot10^{-3}}{300}\ln\dfrac43=+0{,}1943$ J/K (el gas a 2 atm se expande);
   $\Delta S_2=\dfrac{p_2V}{T}\ln\dfrac23=-0{,}1369$ J/K (el gas a 1 atm se comprime).
5. **Total:** $\Delta S=$ **+0,057 J/K** > 0. Es lo que exige el principio de aumento de entropía para un proceso irreversible en un sistema aislado (U p. 670): el sistema no volverá solo al estado con el pistón en el centro.

**Receta.** Entropía en un proceso irreversible: identifica estados inicial y final de cada parte, elige para cada una un camino reversible cómodo (aquí isotermo, $nR\ln\frac{V_f}{V_i}$) y suma; si el sistema está aislado, el resultado debe salir > 0.
**Error típico.** Decir $\Delta S=0$ «porque $Q=0$»; sumar los $\ln$ con las presiones intercambiadas (el gas de 2 atm es el que se expande); trabajar con $T$ en °C.
**Teoría:** U §19.4 p. 625; §19.6 p. 630; §20.7 pp. 665–667 (20.18)–(20.19), ej. 20.8; principio p. 670.

---

### X5. Examen Febrero 2019 (1ª semana) P-1 (3 puntos) — ciclo ABCA: entropía en cada proceso y rendimiento

**Fuente.** `E689010160-19F1.pdf` (escaneo), p. 1. Primera ley desarrollada en `soluciones_tema19.md` (X5).

**Enunciado (literal).** Sea un mol de gas monoatómico ($\gamma=5/3$) que describe un ciclo ABCA en el diagrama PV. En el estado inicial A, ocupa un volumen de 0,5 l y se encuentra a una presión de 1 atm. El gas pasa al estado B expandiéndose a presión constante hasta alcanzar un volumen cuatro veces mayor. A continuación sufre una transformación a volumen constante hasta alcanzar una presión un cuarto de la inicial, llegando al estado C y posteriormente vuelve al estado inicial. Se pide calcular: a) la temperatura en estos tres estados; b) el trabajo, calor, variación de la energía interna y la entropía en cada proceso, y c) el rendimiento del ciclo.

**Solución.**
1. **Estados y temperaturas** ($T=pV/nR$): A (0,5 L; 1 atm) **$T_A=6{,}09$ K**; B (2 L; 1 atm) **$T_B=4T_A=24{,}4$ K**; C (2 L; 0,25 atm) **$T_C=T_A=6{,}09$ K**. Como $p_CV_C=p_AV_A$, C y A están en la misma isoterma: el regreso C→A se toma **isotermo** (es lo único que permite calcularlo con los datos).
2. **b) Primera ley** (detalle en el tema 19): AB $W=151{,}95$ J, $\Delta U=227{,}9$ J, $Q=+379{,}9$ J; BC $W=0$, $Q=\Delta U=-227{,}9$ J; CA $\Delta U=0$, $Q=W=-70{,}2$ J.
3. **b) Entropía de cada proceso** (20.19), con $dQ$ según el tipo de proceso:
   - A→B isóbaro, $dQ=nC_pdT$: $\Delta S_{AB}=nC_p\ln\dfrac{T_B}{T_A}=\frac52R\ln4=$ **+28,8 J/K** (entra calor: crece).
   - B→C isócoro, $dQ=nC_VdT$: $\Delta S_{BC}=nC_V\ln\dfrac{T_C}{T_B}=\frac32R\ln\frac14=$ **−17,3 J/K**.
   - C→A isotermo, (20.18): $\Delta S_{CA}=\dfrac{Q_{CA}}{T_A}=nR\ln\dfrac{V_A}{V_C}=R\ln\frac14=$ **−11,5 J/K**.
   - **Ciclo: 28,8 − 17,3 − 11,5 = 0** ✓ ($S$ función de estado, (20.21)).
4. **c) Rendimiento.** $W=151{,}95-70{,}2=81{,}7$ J; $Q_H$ = calor que entra = solo $Q_{AB}$: $e=\dfrac{81{,}7}{379{,}9}=$ **0,215 (21,5 %)**. Con los mismos extremos de temperatura, Carnot daría $1-\frac{6{,}09}{24{,}4}=75$ %.
5. **Por qué no se usa $\Delta S=Q/T$ en AB y BC.** Esa fórmula solo vale a $T$ constante (U p. 666, «CUIDADO»); en AB y BC la temperatura cambia y hay que integrar.

**Receta.** Entropía de gas ideal por tramo: isóbaro $nC_p\ln\frac{T_2}{T_1}$, isócoro $nC_V\ln\frac{T_2}{T_1}$, isotermo $nR\ln\frac{V_2}{V_1}$, adiabático reversible 0; comprueba que la suma en el ciclo es 0.
**Error típico.** $\Delta S_{AB}=Q_{AB}/T_A$ (o con $T$ media); $C_V$ en el isóbaro; incluir $|Q_{BC}|$ o el neto del ciclo en $Q_H$.
**Teoría:** U §19.7 pp. 631–632; (20.4) p. 650; §20.7 pp. 665–666 (20.18)–(20.19); p. 669 (20.21).

---

### X6. Examen Febrero 2023 (2ª semana) P-2 (3 puntos) — eficiencia de un ciclo y comparación con Carnot

**Fuente.** `E689010160-23F2.pdf` (escaneo), p. 1. Primera ley desarrollada en `soluciones_tema19.md` (X6). Es el problema 20.41 de U con otros datos (ver E22).

**Enunciado (literal).** Una máquina térmica opera según el ciclo de la figura siendo la sustancia de trabajo 3 moles de un gas monoatómico con comportamiento ideal, que alcanza una temperatura máxima de 300 °C, y se sabe que el proceso BC es isotérmico. La presión en los estados A y C es de $1\times10^5$ Pa, y en el estado B, de $4\times10^5$ Pa. Calcular: (a) El calor entrante en el gas y el cedido por el gas en cada ciclo. (b) El trabajo que efectúa la máquina en cada ciclo. (c) La eficiencia que tiene la máquina y compárela con la máxima eficiencia posible que puede lograrse con los depósitos caliente y frío que se usan en este ciclo. Considere: T (K) = T (°C) + 273,15; R = 8,31 J mol⁻¹ K⁻¹.
(Figura: A→B vertical hacia arriba, B→C isoterma hacia la derecha, C→A horizontal hacia la izquierda.)

**Solución.**
1. **Temperaturas.** $T_B=T_C=573{,}15$ K (máxima: la isócora A→B multiplica $p$ por 4); $T_A=573{,}15\cdot\frac14=$ **143,29 K** (mínima). $V_A=V_B=0{,}0357$ m³, $V_C=4V_B=0{,}1429$ m³.
2. **(a)** $Q_{AB}=nC_V(T_B-T_A)=$ **+16 075 J**; $Q_{BC}=nRT_B\ln4=$ **+19 808 J**; $Q_{CA}=nC_p(T_A-T_C)=$ **−26 791 J**. Entra $Q_H=35\,883$ J; sale $|Q_C|=26\,791$ J.
3. **(b)** $W=Q_H-|Q_C|=$ **9092 J** por ciclo.
4. **(c) Eficiencia** $e=\dfrac{W}{Q_H}=$ **25,3 %**.
5. **Máxima posible con esos depósitos.** El depósito caliente tiene que estar al menos a la temperatura más alta del gas (573,15 K) y el frío como mucho a la más baja (143,29 K), porque el calor solo fluye espontáneamente de caliente a frío. Ninguna máquina entre esas temperaturas supera a la de Carnot (U pp. 662–663): $e_{Carnot}=1-\dfrac{143{,}29}{573{,}15}=$ **75 %**. Esta máquina consigue un tercio del máximo.
6. **Por qué es menor (lectura de la segunda ley).** El gas recibe calor en A→B mientras su temperatura sube de 143 a 573 K: si el foco caliente está a 573 K, ese calor pasa con una diferencia finita de temperatura, que es irreversible (U p. 658); lo mismo al ceder calor en C→A. Carnot solo intercambia calor en isotermas a la temperatura de cada foco.
7. **Entropía del gas (comprobación):** $\Delta S_{AB}=nC_V\ln4=+51{,}84$; $\Delta S_{BC}=nR\ln4=+34{,}56$; $\Delta S_{CA}=nC_p\ln\frac14=-86{,}40$ J/K; suma 0 ✓.

**Receta.** Comparar con Carnot: $T_H$ = temperatura máxima del ciclo, $T_C$ = mínima, en kelvin; $e_{real}<e_{Carnot}$ siempre.
**Error típico.** Usar 300 °C en la fórmula de Carnot ($e$ absurda); tomar $T_C=$ temperatura de un estado intermedio; olvidar el calor de la isoterma en $Q_H$.
**Teoría:** U (20.4) p. 650; §20.6 pp. 658, 660 (20.14), 662–663.

---

### X7. Examen Septiembre 2024 P-2 (3 puntos) — ciclo con helio y comparación con la máquina de máxima eficiencia

**Fuente.** `fuentes_txt/examenes/EXAMENESFISICA1.txt`; PDF `EXAMENES FISICA 1.pdf`, p. 16 («Septiembre 2024. Nacional-UE-Guinea Original»). Mismo esquema que X6; detalle de la primera ley en `soluciones_tema19.md` (X7).

**Enunciado (literal).** Una máquina térmica opera empleando el siguiente ciclo termodinámico. Se produce una transformación isócora entre los estados $a$ y $b$ para a continuación producirse una transformación isoterma entre los estados $b$ y $c$, cerrándose el ciclo mediante una transformación isobara entre los estados $c$ y $a$. La sustancia de trabajo se compone de 1,5 moles de helio gaseoso que alcanza una temperatura máxima en el ciclo de 573.2 K. Se conoce además que el ciclo opera entre las presiones $p_a=1{,}5\times10^5$ Pa y $p_b=4\times10^5$ Pa. Suponga que la sustancia de trabajo es un gas ideal. A partir de los datos presentados, obtenga: (a) Una representación gráfica del ciclo termodinámico. (b) El calor de entrada y salida al sistema en cada ciclo termodinámico. (c) El trabajo efectuado por la máquina en cada ciclo termodinámico. (d) Obtenga y compare la eficiencia del ciclo con la de la máquina térmica que pudiera obtener la máxima eficiencia operando las temperaturas de fuente caliente y fría del problema. Considere: $R=8{,}314$ kJ/(kmol·K).

**Solución.**
1. $T_b=T_c=573{,}2$ K; $T_a=573{,}2\cdot\frac{1{,}5}{4}=$ **214,95 K**; $V_a=V_b=0{,}01787$ m³; $V_c=0{,}04766$ m³.
2. **(a)** Vertical $a\to b$ hacia arriba, isoterma $b\to c$, horizontal $c\to a$: horario ⇒ máquina.
3. **(b)** $Q_{ab}=+6702$ J, $Q_{bc}=+7011$ J ⇒ entrada **$Q_H=13\,713$ J**; $Q_{ca}=$ **−11 169 J** (salida).
4. **(c)** $W=13\,713-11\,169=$ **2544 J**.
5. **(d)** $e=\dfrac{2544}{13\,713}=$ **18,5 %**. «La máquina que pudiera obtener la máxima eficiencia» entre la fuente caliente (573,2 K) y la fría (214,95 K) es la de **Carnot** (U pp. 662–663): $e_C=1-\dfrac{214{,}95}{573{,}2}=1-\dfrac{p_a}{p_b}=$ **62,5 %**. El ciclo real rinde 0,30 veces el máximo, porque intercambia calor con diferencias finitas de temperatura (isócora e isóbara).
6. **Entropía del gas (comprobación):** $+18{,}35$ ($ab$), $+12{,}23$ ($bc$), $-30{,}58$ ($ca$) J/K; suma 0 ✓.

**Receta / Error típico:** los de X6.
**Teoría:** U (20.4) p. 650; (20.14) p. 660; pp. 662–663.

---

### X8. Examen Febrero 2025 (2ª semana) P-2 (3 puntos) — isóbara, isócora y recta: eficiencia

**Fuente.** `fuentes_txt/examenes/E689010160-25F2.txt`, p. 1 del PDF (también en los recopilatorios). Primera ley completa en `soluciones_tema19.md` (X8).

**Enunciado (literal).** En un ciclo termodinámico se opera un gas ideal monoatómico. El gas se somete a un proceso isóbaro entre los estados $a$ y $b$ para pasar posteriormente por un proceso isócoro entre los estados $b$ y $c$, cerrándose el ciclo a través de un proceso que puede ser representado como una línea recta en un diagrama presión, volumen, pV. Se conoce que $p_a=4\times10^5$ Pa, $p_c=2\times10^5$ Pa, $V_a=0{,}55$ m³ y $V_b=0{,}82$ m³. […] (a) Dibuje el ciclo termodinámico descrito en un diagrama pV. (b) Calcule el calor intercambiado, el trabajo realizado y la variación de energía interna en cada proceso del ciclo. (c) Determine la eficiencia del ciclo. Considere: $C_v=3R/2$ y $C_p=5R/2$ y $R=8{,}314$ J mol⁻¹K⁻¹.

**Solución (parte del tema 20).**
1. **Tabla de la primera ley** (tema 19): $ab$: $Q=+270\,000$ J, $W=+108\,000$ J; $bc$: $Q=-246\,000$ J, $W=0$; $ca$ (recta): $W=-81\,000$ J, $\Delta U=+84\,000$ J, $Q=+3000$ J neto. $W_{ciclo}=27\,000$ J (área del triángulo).
2. **$Q_H$ es todo el calor que entra.** En la recta el calor cambia de signo: con $p(V)=p_c+s(V-V_b)$, $s=-7{,}41\times10^5$ Pa/m³, $dQ=dU+p\,dV=\left(\tfrac52p+\tfrac32sV\right)dV$ (U (19.7) p. 628), que se anula en $V^*=0{,}681$ m³. De $c$ a $V^*$ entran **28 521 J**; de $V^*$ a $a$ salen 25 521 J.
3. **(c)** $Q_H=270\,000+28\,521=298\,521$ J ⇒ $e=\dfrac{27\,000}{298\,521}=$ **9,0 %**. (Con el neto de la recta, $Q_H=273\,000$ J, saldría 9,9 %.)
4. **Comparación con Carnot (no se pide, pero ayuda).** $T_{max}$ en $b$ ($pV=328\,000$ J) y $T_{min}$ en $c$ ($pV=164\,000$ J; en la recta $pV$ crece de $c$ hacia $a$): $e_C=1-\frac{164\,000}{328\,000}=50$ %. El ciclo triangular es muy poco eficiente.

**Receta.** $e=W/Q_H$ con $Q_H$ = suma de todos los calores que **entran**; si un tramo recto cruza isotermas, comprueba si $dQ$ cambia de signo.
**Error típico.** Usar el calor neto del ciclo como $Q_H$ (daría $e=1$).
**Teoría:** U §19.4 p. 628 (19.7); (20.4) p. 650; (20.14) p. 660.

---

### X9. Examen Febrero 2019 (2ª semana) P-2 (3 puntos) — rendimiento de un ciclo con dos adiabáticas

**Fuente.** `E689010160-19F2.pdf` (escaneo), p. 1. Resolución completa de estados en `soluciones_tema19.md` (X10).

**Enunciado (literal).** A una masa de aire de 1 kg que se encuentra inicialmente a una temperatura de 15 °C y una presión de 1 atm se le hace describir el siguiente ciclo: a) una compresión adiabática hasta una presión de 30 atm. b) un calentamiento a presión constante suministrando 300 Kcal. c) una expansión adiabática hasta alcanzar el volumen inicial y d) una transformación isocora hasta llegar a las condiciones iniciales. Se pide calcular la presión, el volumen y la temperatura al final de cada una de las transformaciones así como el rendimiento del ciclo. Considérese: $c_p=0{,}25$ cal/g °C; $\gamma=1{,}4$; 1 cal = 4,18 J.

**Solución (parte del tema 20).**
1. **Estados** (tema 19): $T_1=288{,}15$ K; $T_2=288{,}15\cdot30^{2/7}=761{,}5$ K; $T_3=T_2+\dfrac{Q_{23}}{mc_p}=1961{,}5$ K; $T_4=1083{,}7$ K ($p_4=3{,}76$ atm). $V_1=V_4=0{,}849$ m³, $V_2=0{,}0748$ m³, $V_3=0{,}1927$ m³.
2. **Calor que entra y que sale.** Solo hay intercambio en los tramos no adiabáticos: entra $Q_{23}=300$ kcal $=1{,}254\times10^6$ J (isóbara); sale $Q_{41}=mc_V(T_1-T_4)=-5{,}94\times10^5$ J (isócora).
3. **Rendimiento** (20.4): $e=1-\dfrac{|Q_{41}|}{Q_{23}}=1-\dfrac{1}{\gamma}\dfrac{T_4-T_1}{T_3-T_2}=$ **0,526 (52,6 %)**; $W=6{,}60\times10^5$ J por ciclo.
4. **Comparación con Carnot** (entre la $T$ máxima y la mínima del ciclo): $e_C=1-\dfrac{288{,}15}{1961{,}5}=85{,}3$ %. Es el ciclo de U §20.3 tipo Diesel (calor a $p$ constante, cesión a $V$ constante); su rendimiento queda por debajo del de Carnot, como exige la segunda ley.

**Receta.** En ciclos de motor con adiabáticas: $e=1-\dfrac{|Q_{sale}|}{Q_{entra}}$ con los calores de los tramos isócoro/isóbaro, escritos con $mc\Delta T$.
**Error típico.** Calcular $e$ con $T$ en °C; poner $c_p$ en la isócora.
**Teoría:** U §19.8 pp. 634–635; (20.4) p. 650; §20.3 pp. 652–654; (20.14) p. 660.

---

### T1. Teoría: Febrero 2018 (2ª semana) P-3 Opción 3.2 «Procesos reversibles e irreversibles. Ciclo de Carnot.» y Septiembre 2019 «Original» P-3 Opción 3.2 «Irreversibilidad de los procesos térmicos. Procesos reversibles e irreversibles.» (4 puntos)

**Fuentes.** `E689010160-18F2.pdf` p. 1 (escaneo) y `FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf` p. 26 (escaneo). Solo el título; sin cuestiones cortas (esas convocatorias no las traían).

**Esquema de respuesta ideal (≈ 1,5–2 caras).**
1. **Dirección de los procesos** (U p. 647): los procesos naturales van en un sentido (calor de caliente a frío, frenado por rozamiento, expansión libre, mezcla). El inverso no violaría la primera ley: lo prohíbe la segunda.
2. **Proceso reversible** (U p. 648): idealización en que el sistema pasa por estados de **equilibrio** (cuasiestático), sin rozamiento ni diferencias finitas de $T$ o $p$; se invierte con un cambio **infinitesimal** de las condiciones (ej.: hielo a 0 °C en una caja a 0 °C ± d$T$, fig. 20.1b). **Irreversible**: flujo de calor con $\Delta T$ finita (hielo en caja a 70 °C, fig. 20.1a), expansión libre, conversión de trabajo en calor por rozamiento; el sistema no está en equilibrio hasta el final.
3. **Desorden** (U p. 648): los procesos irreversibles llevan a estados más desordenados (energía cinética ordenada → agitación térmica).
4. **Segunda ley** (U pp. 656–657): enunciado de «máquina» (Kelvin-Planck) y de «refrigerador» (Clausius) y su equivalencia (fig. 20.11, en dos líneas).
5. **Ciclo de Carnot** (U pp. 658–659): para eliminar toda irreversibilidad, el calor solo se intercambia a la temperatura del foco (isotermas a $T_H$ y $T_C$) y los cambios de temperatura son adiabáticos reversibles. Pasos $a\to b$ expansión isoterma (absorbe $Q_H$), $b\to c$ expansión adiabática, $c\to d$ compresión isoterma (cede $|Q_C|$), $d\to a$ compresión adiabática. **Dibujo pV obligatorio** (fig. 20.13).
6. **Rendimiento con gas ideal** (U pp. 659–660): $Q_H=nRT_H\ln\frac{V_b}{V_a}$, $Q_C=-nRT_C\ln\frac{V_c}{V_d}$; de las adiabáticas $T_HV_b^{\gamma-1}=T_CV_c^{\gamma-1}$, $T_HV_a^{\gamma-1}=T_CV_d^{\gamma-1}$ ⇒ $\frac{V_b}{V_a}=\frac{V_c}{V_d}$ ⇒ $\frac{|Q_C|}{|Q_H|}=\frac{T_C}{T_H}$ ⇒ **$e_{Carnot}=1-\frac{T_C}{T_H}$** (kelvin). Ejemplo: ej. 20.2 (500 K / 350 K: $e=30$ %).
7. **Teorema de Carnot** (U pp. 662–663): ninguna máquina entre $T_H$ y $T_C$ supera $e_{Carnot}$ (máquina «supereficiente» + refrigerador de Carnot = máquina 100 % eficiente, imposible; fig. 20.15); todas las de Carnot tienen la misma $e$, sea cual sea la sustancia. Consecuencias: subir $T_H$ y bajar $T_C$; $e=1$ exigiría $T_C=0$.
8. **Refrigerador de Carnot** (U p. 662): ciclo invertido, $K=\frac{T_C}{T_H-T_C}$.
9. **Cierre con entropía** (U pp. 668–670): en Carnot $\frac{Q_H}{T_H}+\frac{Q_C}{T_C}=0$ ⇒ $\Delta S_{universo}=0$; en un proceso irreversible $\Delta S_{universo}>0$ (ej. 20.10, mezcla de agua: +102 J/K). Esto da el criterio cuantitativo de irreversibilidad.
10. (Septiembre 2019) Insistir en 1–3 y 9, con dos o tres ejemplos de cada tipo (P20.2 de U, p. 676: sistemas mecánicos con bloques, resortes y poleas) y el «aumento de entropía» como medida de la irreversibilidad.

**Preguntas cortas de repaso** (preguntas para análisis de U, **no de examen**): P20.1 (olla tapada que hierve y luego condensa: irreversible, el calor pasa con $\Delta T$ finita de la estufa al agua y del vapor al ambiente); P20.12 (Carnot con $T_H=T_C$: $e=0$; con $T_C=0$: $e=1$, inalcanzable); P20.13 (sin rozamiento la máquina no llega al 100 %: lo impide la segunda ley, no la fricción; el máximo es $e_{Carnot}$).

**Receta.** Definición + ejemplo de reversible/irreversible → segunda ley (dos enunciados) → por qué Carnot usa solo isotermas y adiabáticas → deducción de $e=1-T_C/T_H$ → teorema de Carnot → entropía como criterio.
**Error típico.** Definir «reversible» como «que se puede deshacer» (cualquier proceso se puede deshacer gastando trabajo: lo que importa es que el sistema **y el entorno** vuelvan al estado inicial con un cambio infinitesimal); dar $e_{Carnot}$ con °C; decir que Carnot tiene $e=100$ %.
**Teoría:** U §20.1 pp. 647–648; §20.5 pp. 656–658; §20.6 pp. 658–663; §20.7 pp. 668–670.

---

### T2. Teoría: Septiembre 2024 P-4 Opción B «La segunda ley de la termodinámica» + cuestiones (a) y (b) (4 puntos)

**Fuente.** `fuentes_txt/examenes/EXAMENESFISICA1.txt`; PDF `EXAMENES FISICA 1.pdf`, p. 17 (también `FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf`, p. 10). Las dos cuestiones son las preguntas P20.19 y P20.20 de U (p. 676).

**Enunciado (literal).** Desarrolle el tema: La segunda ley de la termodinámica. Además, responda a las siguientes cuestiones: (a) ¿La Tierra y el Sol están en equilibrio térmico? ¿Hay cambios de entropía asociados a la transmisión de energía del Sol a la Tierra? ¿La radiación es diferente de otros modos de transferencia de calor con respecto a los cambios de entropía? Explique su razonamiento. (b) Suponga que usted pone un objeto caliente en contacto térmico con un objeto frío y observa (para su sorpresa) que el calor fluye del objeto frío al objeto caliente, haciendo al frío más frío y al caliente más caliente. ¿Este proceso viola necesariamente la primera ley de termodinámica? ¿Y la segunda ley de la termodinámica? Explique su razonamiento.

**Esquema del tema (≈ 1,5 caras).**
1. Procesos irreversibles y dirección preferente (U pp. 647–648).
2. Máquina térmica y eficiencia $e=W/Q_H=1-|Q_C|/|Q_H|$ (U pp. 649–650), con diagrama de flujo (fig. 20.3).
3. Refrigerador y $K=|Q_C|/|W|$ (U pp. 654–655), con diagrama de flujo (fig. 20.8).
4. **Enunciado de Kelvin-Planck** (máquina): es imposible que un sistema absorba calor de un depósito de temperatura uniforme y lo convierta totalmente en trabajo terminando en el mismo estado (U p. 656). **Enunciado de Clausius** (refrigerador): es imposible un proceso cuyo único resultado sea pasar calor de un cuerpo más frío a uno más caliente (U p. 657). **Equivalencia** con la fig. 20.11 (U pp. 657–658).
5. Consecuencia: ciclo de Carnot y límite $e\le1-T_C/T_H$, $K\le T_C/(T_H-T_C)$ (U pp. 658–663).
6. **Formulación con entropía** (U pp. 665–670): $dS=dQ/T$, $\Delta S=\int dQ/T$; $S$ función de estado; incluyendo todos los sistemas, $\Delta S_{total}\ge0$ (= 0 solo en procesos reversibles). Ejemplo 20.10 (+102 J/K).
7. (Si hay tiempo) Interpretación microscópica $S=k\ln w$ (U pp. 671–672): los estados desordenados tienen muchísimos más microestados.

**Cuestión (a).** **No están en equilibrio térmico**: la superficie del Sol está a unos 5800 K (U p. 574) y la Tierra a unos 288 K, y hay un flujo neto de energía del Sol a la Tierra por radiación. **Sí hay cambios de entropía**: cuando un calor $Q$ sale del Sol a $T_S$ y llega a la Tierra a $T_T$ (cada cuerpo casi a temperatura constante, (20.18)), $\Delta S=-\dfrac{Q}{T_S}+\dfrac{Q}{T_T}>0$; por cada julio, $-\frac{1}{5800}+\frac{1}{288}=+3{,}3\times10^{-3}$ J/K. Es un flujo irreversible de calor con una diferencia finita de temperaturas, igual que el del ejemplo 20.10. **La radiación no es diferente** en este aspecto: el cambio de entropía de cada cuerpo depende solo del calor que gana o pierde y de su temperatura, no del mecanismo (conducción, convección o radiación). Lo que tiene de particular la radiación es que no necesita medio material, pero la conclusión (aumento de la entropía total) es la misma.

**Cuestión (b).** **Primera ley: no necesariamente.** Si el calor $Q$ que pierde el cuerpo frío es exactamente el que gana el caliente, la energía se conserva y la primera ley se cumple (U p. 647: «el flujo de calor de un cuerpo frío a uno caliente no violaría la primera ley»). **Segunda ley: sí la viola**, porque el único resultado sería pasar calor de un cuerpo frío a uno caliente sin trabajo externo, lo que prohíbe el enunciado de Clausius (U p. 657). Con entropía: $\Delta S=-\dfrac{Q}{T_C}+\dfrac{Q}{T_H}<0$ en un sistema aislado, imposible (U p. 670).

**Receta.** Tema «segunda ley»: dirección de los procesos → máquina y refrigerador → dos enunciados y su equivalencia → Carnot como límite → entropía y $\Delta S_{total}\ge0$. Cuestiones de «¿viola la primera/segunda ley?»: primera ley = balance de energía; segunda = signo de $\Delta S_{total}$ con $\pm Q/T$.
**Error típico.** Afirmar que la radiación «no cambia la entropía» porque no hay contacto; confundir las dos leyes (decir que el flujo frío → caliente «crea energía»); dar los enunciados sin la condición «como único resultado» / «terminando en el mismo estado».
**Teoría:** U §20.1–20.8 pp. 647–673; P20.19 y P20.20 p. 676; temperatura del Sol p. 574.

---

## PARTE B — Problemas del solucionario (E), de fácil a difícil

Orden: máquinas y refrigeradores generales → Otto → Carnot (máquina y refrigerador) → entropía (isoterma, fusión, cambio de temperatura, expansión libre) → problemas de transición (central oceánica) → ciclos completos.

### E1. Problema 20.1 (U p. 676; Solucionario 20-1) — eficiencia de un motor diésel

**Enunciado (de U).** Un motor diésel realiza 2200 J de trabajo mecánico y cede 4300 J de calor en cada ciclo. a) ¿Cuánto calor debe suministrarse al motor en cada ciclo? b) Calcule la eficiencia térmica del motor.

**Solución.**
1. **Ciclo ⇒ $\Delta U=0$** y $W=Q_H+Q_C=|Q_H|-|Q_C|$ (20.2, U p. 650).
2. **a)** $Q_H=W+|Q_C|=2200+4300=$ **6500 J**.
3. **b)** $e=\dfrac{W}{Q_H}=\dfrac{2200}{6500}=$ **0,34 (34 %)** (20.4).

**Receta.** Máquina: $Q_H=W+|Q_C|$, $e=W/Q_H$.
**Error típico.** Calcular $e=W/|Q_C|$ o $e=|Q_C|/Q_H$.
**Teoría:** U §20.2 p. 650 (20.2)–(20.4).

---

### E2. Problema 20.2 (U p. 677; Solucionario 20-1) — motor de avión

**Enunciado (de U).** Un motor de avión recibe 9000 J de calor y cede 6400 J cada ciclo. a) Calcule el trabajo mecánico efectuado por el motor en un ciclo. b) Calcule la eficiencia térmica del motor.

**Solución.**
1. **a)** $W=|Q_H|-|Q_C|=9000-6400=$ **2600 J**.
2. **b)** $e=\dfrac{2600}{9000}=$ **0,29 (29 %)**. Los otros 6400 J son calor «perdido» que la segunda ley obliga a ceder.

**Receta / Error típico:** los de E1.
**Teoría:** U p. 650 (20.2), (20.4).

---

### E3. Problema 20.9 (U p. 677; Solucionario 20-3) — refrigerador con K dado

**Enunciado (de U).** Un refrigerador tiene un coeficiente de rendimiento de 2.10. Durante cada ciclo, absorbe $3.10\times10^4$ J de calor del depósito frío. a) ¿Cuánta energía mecánica se requiere en cada ciclo para operar el refrigerador? b) Durante cada ciclo, ¿cuánto calor se desecha al depósito caliente?

**Solución.**
1. **a)** De (20.9): $|W|=\dfrac{Q_C}{K}=\dfrac{3{,}10\times10^4}{2{,}10}=$ **1,48 × 10⁴ J** ($W=-1{,}48\times10^4$ J: se suministra).
2. **b)** Primera ley del ciclo $W=Q_C+Q_H$ ⇒ $Q_H=W-Q_C=-1{,}48\times10^4-3{,}10\times10^4=$ **−4,58 × 10⁴ J** (negativo: sale hacia el depósito caliente). Equivale a (20.8): $|Q_H|=|Q_C|+|W|$.

**Receta.** Refrigerador: $|W|=|Q_C|/K$; $|Q_H|=|Q_C|+|W|$.
**Error típico.** Pensar que $|Q_H|<|Q_C|$; olvidar que al exterior va también el trabajo del compresor.
**Teoría:** U §20.4 p. 654 (20.7)–(20.9).

---

### E4. Problema 20.6 (U p. 677; Solucionario 20-2) — ciclo Otto con r = 9,50

**Enunciado (de U).** a) Calcule la eficiencia teórica de una máquina con ciclo Otto que tiene $\gamma=1.40$ y $r=9.50$. b) Si este motor consume 10,000 J de calor de la quema de su combustible, ¿cuánto calor desecha hacia el aire exterior?

**Solución.**
1. **a)** Ciclo Otto ideal (20.6, U p. 653): $e=1-\dfrac{1}{r^{\gamma-1}}=1-\dfrac{1}{9{,}50^{0{,}40}}=$ **0,594 (59,4 %)**. Solo depende de la razón de compresión.
2. **b)** $|Q_C|=(1-e)Q_H=0{,}406\cdot10\,000=$ **4060 J** (y $W=5940$ J).

**Receta.** Otto: $e=1-r^{1-\gamma}$; $|Q_C|=(1-e)Q_H$.
**Error típico.** Usar $r^{\gamma}$ en vez de $r^{\gamma-1}$.
**Teoría:** U §20.3 pp. 652–653 (20.6).

---

### E5. Problema 20.7 (U p. 677; Solucionario 20-2) — subir la razón de compresión

**Enunciado (de U).** El ciclo Otto de un motor Mercedes Benz SLK230 tiene una razón de compresión de 8.8. a) ¿Cuál es la eficiencia ideal del motor? Use $\gamma=1.40$. b) El motor de un Dodge Viper GT2 tiene una razón de compresión un poco arriba de 9.6. ¿Qué aumento en la eficiencia ideal resulta de este aumento en la razón de compresión?

**Solución.**
1. **a)** $e=1-8{,}8^{-0{,}40}=$ **0,581 (58 %)**.
2. **b)** $e=1-9{,}6^{-0{,}40}=0{,}595$: aumento de **1,4 puntos porcentuales**. Aumentar $r$ mejora poco, y está limitado por la preignición (detonación) de la mezcla (U p. 653).

**Receta / Error típico:** los de E4.
**Teoría:** U p. 653 (20.6).

---

### E6. Problema 20.12 (U p. 677; Solucionario 20-4) — máquina de Carnot entre 520 K y 300 K

**Enunciado (de U).** Una máquina de Carnot opera entre dos depósitos de calor a 520 K y 300 K. a) Si la máquina recibe 6.45 kJ de calor del depósito a 520 K en cada ciclo, ¿cuántos joules por ciclo cede al depósito a 300 K? b) ¿Cuánto trabajo mecánico realiza la máquina en cada ciclo? c) Determine la eficiencia térmica de la máquina.

**Solución.**
1. **a)** Carnot (20.13): $Q_C=-Q_H\dfrac{T_C}{T_H}=-6450\cdot\dfrac{300}{520}=$ **−3,72 × 10³ J**.
2. **b)** $W=Q_H+Q_C=$ **2,73 × 10³ J**.
3. **c)** $e=\dfrac{W}{Q_H}=$ **0,423 (42,3 %)**; comprobación con (20.14): $1-\frac{300}{520}=0{,}423$ ✓.

**Receta.** Carnot: $|Q_C|/|Q_H|=T_C/T_H$; luego primera ley.
**Error típico.** Usar la razón de temperaturas al revés ($T_H/T_C$).
**Teoría:** U §20.6 p. 660 (20.13)–(20.14); ej. 20.2.

---

### E7. Problema 20.15 (U p. 677; Solucionario 20-5) — temperatura de la fuente de una máquina de Carnot

**Enunciado (de U).** Una máquina de Carnot tiene una eficiencia del 66% y realiza $2.5\times10^4$ J de trabajo en cada ciclo. a) ¿Cuánto calor extrae la máquina de su fuente de calor en cada ciclo? b) Suponga que la máquina expulsa calor a temperatura ambiente (20.0°C). ¿Cuál es la temperatura de su fuente de calor?

**Solución.**
1. **a)** $Q_H=\dfrac{W}{e}=\dfrac{2{,}5\times10^4}{0{,}66}=$ **3,8 × 10⁴ J**.
2. **b)** $e=1-\dfrac{T_C}{T_H}$ ⇒ $T_H=\dfrac{T_C}{1-e}=\dfrac{293{,}15}{0{,}34}=$ **862 K ≈ 589 °C**. (Equivalente: $Q_C=W-Q_H=-1{,}29\times10^4$ J y $T_H=-T_CQ_H/Q_C$.)

**Receta.** Despejar temperaturas de $e=1-T_C/T_H$ siempre en kelvin, y convertir a °C solo al final.
**Error típico.** $T_H=20/0{,}34=59$ °C (con °C).
**Teoría:** U p. 660 (20.14).

---

### E8. Problema 20.17 (U p. 677; Solucionario 20-5) — refrigerador de Carnot entre 320 K y 270 K

**Enunciado (de U).** Un refrigerador de Carnot opera entre dos depósitos de calor a temperaturas de 320 K y 270 K. a) Si en cada ciclo el refrigerador recibe 415 J de calor del depósito a 270 K, ¿cuántos joules de energía calorífica cede al depósito a 320 K? b) Si el refrigerador realiza 165 ciclos/min, ¿qué potencia de entrada se requiere para operarlo? c) Calcule el coeficiente de rendimiento del refrigerador.

**Solución.**
1. **a)** (20.13): $Q_H=-Q_C\dfrac{T_H}{T_C}=-415\cdot\dfrac{320}{270}=$ **−492 J**.
2. **b)** $|W|=|Q_H|-|Q_C|=77$ J por ciclo; $P=\dfrac{165\cdot77}{60\ \text{s}}=$ **211 W**.
3. **c)** $K=\dfrac{415}{77}=$ **5,4**; con (20.15): $\frac{270}{320-270}=5{,}4$ ✓.

**Receta.** Refrigerador de Carnot: $K=T_C/(T_H-T_C)$ y $|Q_H|=|Q_C|\,T_H/T_C$; potencia = $|W|$ por ciclo × ciclos por segundo.
**Error típico.** Olvidar pasar ciclos/min a ciclos/s.
**Teoría:** U p. 660 (20.13); p. 662 (20.15).

---

### E9. Problema 20.14 (U p. 677; Solucionario 20-4 y 20-5) — máquina para hacer hielo (refrigerador de Carnot)

**Enunciado (de U).** Una máquina para fabricar hielo opera en un ciclo de Carnot; toma calor de agua a 0.0°C y desecha calor a una habitación a 24.0°C. Suponga que 85.0 kg de agua a 0.0°C se convierten en hielo a 0.0°C. a) ¿Cuánto calor se descarga hacia la habitación? b) ¿Cuánta energía debe suministrarse al aparato?

**Solución.**
1. **Calor sacado del agua** (cambio de fase, $Q=mL_f$, U p. 560): $Q_C=+mL_f=85{,}0\cdot3{,}34\times10^5=2{,}84\times10^7$ J (entra en la sustancia de trabajo).
2. **a)** $|Q_H|=Q_C\dfrac{T_H}{T_C}=2{,}84\times10^7\cdot\dfrac{297{,}15}{273{,}15}=$ **3,09 × 10⁷ J**.
3. **b)** $W=Q_C+Q_H=$ **−2,5 × 10⁶ J** (hay que suministrar 2,5 MJ). $K=\frac{273{,}15}{24}=11{,}4$: con solo 24 K de diferencia el refrigerador ideal rinde mucho.

**Receta.** Calor de un cambio de fase = $Q_C$; después Carnot (20.13) y primera ley.
**Error típico.** Usar 24 °C y 0 °C en la razón (división por cero).
**Teoría:** U §17.6 p. 560; §20.6 pp. 660, 662.

---

### E10. Problema 20.18 (U p. 677; Solucionario 20-6) — máquina de Carnot entre agua hirviendo y hielo

**Enunciado (de U).** Una máquina térmica de Carnot utiliza un depósito caliente que consiste en una gran cantidad de agua en ebullición y un depósito frío que consiste en una tina grande llena de hielo y agua. En 5 minutos de operación, el calor expulsado por la máquina derrite 0.0400 kg de hielo. En ese tiempo, ¿cuánto trabajo $W$ efectúa la máquina?

**Solución.**
1. **Calor cedido al foco frío** = calor que funde el hielo: $Q_C=-mL_f=-0{,}0400\cdot3{,}34\times10^5=-1{,}336\times10^4$ J.
2. **Calor tomado del caliente** (20.13): $Q_H=-Q_C\dfrac{T_H}{T_C}=1{,}336\times10^4\cdot\dfrac{373{,}15}{273{,}15}=1{,}825\times10^4$ J.
3. **Trabajo:** $W=Q_H+Q_C=$ **4,89 × 10³ J**. (El dato de 5 minutos solo serviría para la potencia, 16 W.)

**Receta.** Un depósito de agua-hielo o agua hirviendo es un foco ideal: su temperatura no cambia y el calor se mide por la masa que cambia de fase.
**Error típico.** Usar $Q_C$ positivo para una máquina.
**Teoría:** U §17.6 p. 560; p. 660 (20.13).

---

### E11. Problema 20.40 (U p. 679; Solucionario 20-14 y 20-15) — diseñar una máquina de Carnot

**Enunciado (de U).** Como un ingeniero mecánico en ciernes, le piden diseñar una máquina de Carnot que use como sustancia de trabajo 2.00 moles de un gas ideal monoatómico y que opere con un depósito caliente a 500°C. La máquina debe levantar 2.00 m una masa de 15.0 kg en cada ciclo, empleando un suministro de calor de 500 J. El gas en la cámara de la máquina puede tener un volumen mínimo de 5.00 L durante el ciclo. a) Dibuje un diagrama pV para este ciclo, indicando dónde entra calor en el gas y dónde sale de él. b) ¿A qué temperatura debe estar el depósito frío? c) Calcule la eficiencia térmica de la máquina. d) ¿Cuánta energía térmica gasta esta máquina en cada ciclo? e) Calcule la presión máxima que tendrá que resistir la cámara de gas.

**Solución.**
1. **a)** Fig. 20.13: entra calor en la expansión isoterma a 773 K ($a\to b$) y sale en la compresión isoterma a $T_C$ ($c\to d$).
2. **Trabajo por ciclo** = energía potencial ganada (U p. 204): $W=mg\Delta y=15{,}0\cdot9{,}80\cdot2{,}00=294$ J.
3. **b)** $|Q_C|=Q_H-W=500-294=206$ J; (20.13): $T_C=T_H\dfrac{|Q_C|}{Q_H}=773{,}15\cdot\dfrac{206}{500}=$ **318,5 K ≈ 45 °C**.
4. **c)** $e=\dfrac{294}{500}=$ **58,8 %** ($=1-T_C/T_H$).
5. **d)** Calor «desechado» por ciclo: **206 J** (se cede al foco frío).
6. **e)** La presión máxima está en $a$: volumen mínimo y temperatura máxima. $p_a=\dfrac{nRT_H}{V_a}=\dfrac{2{,}00\cdot8{,}314\cdot773{,}15}{5{,}00\times10^{-3}}=$ **2,57 × 10⁶ Pa** (≈ 25 atm).

**Receta.** Diseño de Carnot: $W$ del enunciado mecánico → $|Q_C|$ por la primera ley → $T_C$ por (20.13) → $p_{max}$ en el vértice de menor volumen sobre la isoterma caliente.
**Error típico.** Buscar la presión máxima en el foco frío.
**Teoría:** U §7.1 p. 204 ($U_{grav}=mgy$); §20.6 pp. 659–660.

---

### E12. Problema 20.25 (U p. 678; Solucionario 20-8) — entropía en una compresión isotérmica

**Enunciado (de U).** Tres moles de gas ideal experimentan una compresión isotérmica reversible a 20.0°C, durante la cual se realizan 1850 J de trabajo sobre el gas. Calcule el cambio de entropía del gas.

**Solución.**
1. **Isotermo de gas ideal** ⇒ $\Delta U=0$ ⇒ $Q=W=-1850$ J («trabajo sobre el gas» ⇒ $W<0$).
2. **Reversible a $T$ constante** ⇒ (20.18): $\Delta S=\dfrac{Q}{T}=\dfrac{-1850}{293{,}15}=$ **−6,31 J/K**.
3. **¿Viola la segunda ley?** No: el gas no está aislado; el entorno recibe +1850 J a 293 K y su entropía sube +6,31 J/K (total 0, proceso reversible).

**Receta.** Isotermo reversible: $\Delta S=Q/T$ con $Q=W$.
**Error típico.** Dar $\Delta S$ positivo; usar 20 °C.
**Teoría:** U §19.5 p. 630; §20.7 p. 665 (20.18); p. 670.

---

### E13. Problema 20.21 (U p. 678; Solucionario 20-7) — fundir hielo con una fuente a 25 °C

**Enunciado (de U).** Un estudiante de segundo grado no tiene nada mejor que hacer que calentar un hielo de 0.350 kg a 0.0°C hasta fundirlo. a) ¿Cuál es el cambio de la entropía del agua? b) La fuente de calor es un cuerpo de gran masa a una temperatura de 25.0°C. ¿Cuál es el cambio en la entropía de este cuerpo? c) ¿Cuál es el cambio total en la entropía del agua y de la fuente de calor?

**Solución.**
1. **Calor de fusión:** $Q=mL_f=0{,}350\cdot3{,}34\times10^5=1{,}169\times10^5$ J.
2. **a)** El hielo funde a $T$ constante (273,15 K) ⇒ (20.18): $\Delta S_{agua}=\dfrac{1{,}169\times10^5}{273{,}15}=$ **+428 J/K**.
3. **b)** La fuente es tan grande que su $T$ no cambia (298,15 K) y pierde ese calor: $\Delta S_{fuente}=\dfrac{-1{,}169\times10^5}{298{,}15}=$ **−392 J/K**.
4. **c)** $\Delta S_{total}=$ **+36 J/K** > 0: el calor ha pasado con una diferencia finita de temperatura (proceso irreversible, U p. 648 fig. 20.1a).

**Receta.** Dos cuerpos a temperaturas fijas que intercambian $Q$: $\Delta S=-\frac{Q}{T_{cal}}+\frac{Q}{T_{fr}}>0$.
**Error típico.** Usar la misma $T$ para los dos cuerpos (daría 0).
**Teoría:** U §20.7 p. 665 (20.18), ej. 20.5; p. 670.

---

### E14. Problema 20.31 (U p. 678; Solucionario 20-9) — globo que estalla en la Estación Espacial

**Enunciado (de U).** Un solitario globo de una fiesta con un volumen de 2.40 L y que contiene 0.100 moles de aire se deja a la deriva en la Estación Espacial Internacional, temporalmente inhabitada y despresurizada. La luz solar que pasa por una ventanilla incide sobre el globo y hace que estalle provocando que el aire en su interior experimente una expansión libre en la estación vacía, cuyo volumen total es de 425 m³. Calcule el cambio de entropía del aire durante la expansión.

**Solución.**
1. **Expansión libre** (U p. 667, ej. 20.8): $Q=0$, $W=0$, $\Delta U=0$ ⇒ gas ideal a $T$ constante. Pero no es reversible, así que **no** se puede decir $\Delta S=Q/T=0$.
2. **Camino reversible con los mismos extremos:** isoterma de 2,40 L a 425 m³ ⇒ $\Delta S=nR\ln\dfrac{V_2}{V_1}$.
3. $\Delta S=0{,}100\cdot8{,}314\cdot\ln\dfrac{425}{2{,}40\times10^{-3}}=0{,}8314\cdot12{,}08=$ **+10,0 J/K**.

**Receta.** Expansión libre de gas ideal: $\Delta S=nR\ln(V_2/V_1)$ (no hace falta $T$).
**Error típico.** $\Delta S=0$ «porque no hay calor»; no pasar litros a m³ en el cociente (unidades distintas).
**Teoría:** U §20.7 pp. 666–667 (20.19), ej. 20.8.

---

### E15. Problema 20.24 (U p. 678; Solucionario 20-7 y 20-8) — té que se enfría

**Enunciado (de U).** Usted prepara té con 0.250 kg de agua a 85.0°C y lo deja enfriar a temperatura ambiente (20.0°C) antes de beberlo. a) Calcule el cambio de entropía del agua mientras se enfría. b) En esencia, el proceso de enfriamiento es isotérmico para el aire de su cocina. Calcule el cambio de entropía del aire mientras el té se enfría, suponiendo que todo el calor que pierde el agua va al aire. ¿Cuál es el cambio total de entropía del sistema constituido por el té + aire?

**Solución.**
1. **a)** La temperatura del agua cambia ⇒ hay que integrar, (20.19) con $dQ=mc\,dT$ (ej. 20.6, U p. 666): $\Delta S_{agua}=mc\ln\dfrac{T_2}{T_1}=0{,}250\cdot4190\cdot\ln\dfrac{293{,}15}{358{,}15}=$ **−210 J/K**.
2. **b)** Calor que pasa al aire: $|Q|=mc|\Delta T|=0{,}250\cdot4190\cdot65=6{,}81\times10^4$ J, a 293,15 K constante: $\Delta S_{aire}=+\dfrac{6{,}81\times10^4}{293{,}15}=$ **+232 J/K**.
3. **Total:** $-210+232=$ **+22 J/K** > 0 (enfriamiento espontáneo, irreversible).

**Receta.** Cuerpo que cambia de $T$: $mc\ln(T_2/T_1)$; entorno a $T$ fija: $Q/T$.
**Error típico.** Usar $Q/T$ para el agua (con 85 °C o con 20 °C): da un valor distinto y sin justificación.
**Teoría:** U p. 666 (20.19), ej. 20.6; p. 665 (20.18).

---

### E16. Problema 20.22 (U p. 678; Solucionario 20-7) — mezclar agua hirviendo con el baño

**Enunciado (de U).** Usted llena la tina con 195 kg de agua a 30.0°C e intenta calentarla más vertiendo 5.00 kg de agua que alcanzó la ebullición en una estufa. a) ¿Se trata de un proceso reversible o irreversible? Utilice un razonamiento de física para explicar el hecho. b) Calcule la temperatura final del agua para el baño. c) Calcule el cambio neto de entropía del sistema (agua del baño + agua en ebullición), suponiendo que no hay intercambio de calor con el aire o con la tina misma.

**Solución.**
1. **a) Irreversible:** el calor pasa entre aguas con una diferencia finita de temperatura (70 K); nunca se ha visto que el agua tibia se separe sola en caliente y fría.
2. **b) Calorimetría** (U §17.6): $195\,c(T-30)+5\,c(T-100)=0$ ⇒ $T=\dfrac{195\cdot30+5\cdot100}{200}=$ **31,75 °C** (304,90 K).
3. **c)** Cada parte cambia de temperatura ⇒ $mc\ln\frac{T_2}{T_1}$ (como en el ej. 20.10):
   $\Delta S_{baño}=195\cdot4190\ln\dfrac{304{,}90}{303{,}15}=+4703$ J/K; $\Delta S_{hirviendo}=5\cdot4190\ln\dfrac{304{,}90}{373{,}15}=-4232$ J/K.
   **Total: +471 J/K** > 0, coherente con a).

**Receta.** Mezcla: temperatura final por calorimetría; $\Delta S$ de cada parte con $mc\ln(T_f/T_i)$; suma > 0.
**Error típico.** Usar temperaturas en °C dentro del logaritmo; restar entropías grandes con pocas cifras (la diferencia es pequeña: lleva 4 cifras).
**Teoría:** U §17.6 p. 563 (Estrategia 17.2); §20.7 p. 666, ej. 20.10 p. 669.

---

### E17. Problema 20.59 (U p. 681; Solucionario 20-24) — energía del mar: profundidad del agua fría

**Enunciado (de U, problema de transición).** La conversión de la energía térmica oceánica usa la diferencia de temperatura entre el agua caliente de la superficie de los océanos tropicales y el agua fría de las profundidades para operar una máquina térmica (la gráfica de U p. 681 da la temperatura frente a la profundidad). Si la central eléctrica utiliza un ciclo de Carnot y la eficiencia teórica deseada es del 6.5%, ¿desde qué profundidad se debe traer el agua fría? a) 100 m; b) 400 m; c) 800 m; d) mayor profundidad que 1000 m.

**Solución.**
1. **Foco caliente:** agua superficial, unos 27 °C ≈ 300 K (gráfica y texto de U).
2. **Despejar $T_C$** de (20.14): $T_C=T_H(1-e)=300\cdot0{,}935=280{,}5$ K ≈ **7,4 °C**.
3. **Leer la gráfica:** ≈ 7,5 °C se alcanza hacia los **400 m** ⇒ respuesta **b)**.

**Receta.** Con una eficiencia de Carnot dada: $T_C=T_H(1-e)$.
**Error típico.** Hacer $T_C=27\cdot0{,}935$ °C.
**Teoría:** U p. 660 (20.14).

---

### E18. Problema 20.60 (U p. 681; Solucionario 20-24) — entropía del amoníaco por segundo

**Enunciado (de U).** ¿Cuál es el cambio en la entropía del amoniaco evaporado por segundo en la central eléctrica de 10 MW, suponiendo una eficiencia de Carnot ideal del 6.5%? a) $+6\times10^6$ J/K por segundo; b) $+5\times10^5$ J/K por segundo; c) $+1\times10^5$ J/K por segundo; d) 0.

**Solución.**
1. **Calor absorbido por segundo:** $\dfrac{Q_H}{t}=\dfrac{W/t}{e}=\dfrac{10\ \text{MW}}{0{,}065}=1{,}54\times10^8$ W.
2. El amoníaco se evapora a la temperatura del agua superficial (300 K, isotermo) ⇒ (20.18): $\dfrac{\Delta S}{t}=\dfrac{1{,}54\times10^8}{300}=$ **5,1 × 10⁵ J/K por segundo** ⇒ **b)**.

**Receta.** Entropía en un cambio de fase a $T$ fija: $Q/T$, aquí por unidad de tiempo.
**Error típico.** Dividir la potencia útil (10 MW) entre $T$.
**Teoría:** U p. 650 (20.4); p. 665 (20.18).

---

### E19. Problema 20.61 (U p. 681; Solucionario 20-24) — entropías de los dos focos en Carnot

**Enunciado (de U).** Compare el cambio de entropía del agua más caliente con la del agua más fría durante un ciclo de la máquina térmica, suponiendo un ciclo ideal de Carnot. a) La entropía no cambia durante un ciclo en ningún caso. b) La entropía de ambas aumenta, pero la entropía del agua más fría aumenta más porque su temperatura inicial es menor. c) La entropía del agua más caliente disminuye mucho más de lo que aumenta la entropía del agua más fría, debido a que parte del calor retirado del agua caliente se aprovecha como trabajo realizado por la máquina. d) La entropía del agua caliente disminuye en la misma cantidad que aumenta la entropía del agua más fría.

**Solución.**
1. Focos grandes ⇒ $T$ constantes ⇒ $\Delta S=Q/T$. El agua caliente pierde $|Q_H|$: $\Delta S_{cal}=-|Q_H|/T_H$; la fría gana $|Q_C|$: $\Delta S_{fr}=+|Q_C|/T_C$.
2. En Carnot, (20.13): $|Q_C|/T_C=|Q_H|/T_H$ ⇒ **iguales y opuestos** ⇒ **d)**. Aunque sale menos calor del que entra, se cede a una temperatura más baja, y el cociente es el mismo (c es falsa por eso).

**Receta.** Carnot = reversible ⇒ $\Delta S_{universo}=0$ ⇒ $\frac{|Q_H|}{T_H}=\frac{|Q_C|}{T_C}$ (20.20).
**Error típico.** Elegir c) pensando solo en las cantidades de calor.
**Teoría:** U p. 668 (20.20), ej. 20.9.

---

### E20. Problema 20.62 (U p. 681; Solucionario 20-25) — eficiencia real de la central

**Enunciado (de U).** Si la planta propuesta se construye y produce 10 MW, pero la tasa a la que el calor residual es expulsado al agua fría es de 165 MW, ¿cuál es la eficiencia real de la planta? a) 5.7%; b) 6.1%; c) 6.5%; d) 16.5%.

**Solución.**
1. **Primera ley por segundo:** $\dfrac{Q_H}{t}=\dfrac{W}{t}+\dfrac{|Q_C|}{t}=10+165=175$ MW.
2. $e=\dfrac{W/t}{Q_H/t}=\dfrac{10}{175}=$ **5,7 %** ⇒ **a)**, menor que el 6,5 % de Carnot, como debe ser.

**Receta.** Potencias: $P_H=P_W+P_C$, $e=P_W/P_H$.
**Error típico.** $e=10/165$ (6,1 %, dividir entre el calor cedido).
**Teoría:** U p. 650 (20.2), (20.4); Estrategia 20.1 p. 651.

---

### E21. Problema 20.36 (U pp. 678–679; Solucionario 20-11 y 20-12) — ciclo isócoro-adiabático-isóbaro con gas diatómico

**Enunciado (de U).** Una máquina térmica usa como sustancia de trabajo 0.350 moles de un gas diatómico ideal que efectúa el ciclo que se muestra en el diagrama pV de la figura P20.36. El proceso 1→2 es a volumen constante, de 2→3 es adiabático, y de 3→1 es a presión constante de 1.00 atm. Para este gas, $\gamma=1.40$. a) Calcule la presión y el volumen en los puntos 1, 2 y 3. b) Calcule Q, W y ΔU para cada uno de los tres procesos. c) Calcule el trabajo neto efectuado por el gas en el ciclo. d) Calcule el flujo neto de calor de la máquina en un ciclo. e) Determine la eficiencia térmica de la máquina y compárela con la de una máquina de Carnot que opera entre las mismas temperaturas mínima y máxima $T_1$ y $T_2$. (Figura: $T_1=300$ K, $T_2=600$ K, $T_3=492$ K.)

**Solución.**
1. **Capacidades** de $\gamma$ (19.18): $C_V=\dfrac{R}{\gamma-1}=20{,}79$ J/(mol·K), $C_p=29{,}10$ J/(mol·K).
2. **a) Estados.** 1: $p_1=1{,}013\times10^5$ Pa, $V_1=\dfrac{nRT_1}{p_1}=$ **8,62 × 10⁻³ m³**. 2: $V_2=V_1$, $p_2=p_1\frac{T_2}{T_1}=$ **2,03 × 10⁵ Pa**. 3: $p_3=p_1$, $V_3=V_1\frac{T_3}{T_1}=$ **14,1 × 10⁻³ m³**. ($T_3=492$ K es lo que da la adiabática: $600\cdot(1/2)^{0{,}4/1{,}4}=492{,}2$ K.)
3. **b)** 1→2 isócoro: $W=0$, $Q=\Delta U=nC_V(T_2-T_1)=$ **+2183 J**. 2→3 adiabático: $Q=0$, $\Delta U=nC_V(T_3-T_2)=$ **−786 J**, $W=+786$ J. 3→1 isóbaro: $W=nR(T_1-T_3)=$ **−559 J**, $Q=nC_p(T_1-T_3)=$ **−1955 J**, $\Delta U=-1397$ J.
4. **c)** $W_{neto}=0+786-559=$ **227 J**. **d)** $Q_{neto}=2183-1955=$ **227 J** ✓ ($\Delta U_{ciclo}=2183-786-1397=0$).
5. **e)** Solo entra calor en 1→2: $e=\dfrac{227}{2183}=$ **10,4 %**. Carnot entre 300 K y 600 K: **50 %**. (Con $T_3=492{,}2$ K sin redondear: $W=225$ J, $e=10{,}3$ %.)

**Receta.** Ciclo con adiabática: $T$ de los vértices con $pV=nRT$ y la adiabática; $W_{adiab}=-nC_V\Delta T$; $e=W/Q_{entra}$; compara con $1-T_{min}/T_{max}$.
**Error típico.** Poner $Q\neq0$ en la adiabática; meter el calor neto en el denominador.
**Teoría:** U §19.7 p. 633 (19.18); §19.8 pp. 634–635; (20.4) p. 650; (20.14) p. 660.

---

### E22. Problema 20.41 (U p. 679; Solucionario 20-15) — máquina con isócora, isoterma e isóbara (2 mol de helio)

**Enunciado (de U).** Una máquina térmica opera empleando el ciclo de la figura P20.41. La sustancia de trabajo es de 2.00 moles de helio gaseoso, que alcanza una temperatura máxima de 327°C. Suponga que el helio se puede tratar como gas ideal. El proceso bc es isotérmico. La presión en los estados a y c es de $1.00\times10^5$ Pa, y en el estado b, de $3.00\times10^5$ Pa. a) ¿Cuánto calor entra en el gas y cuánto sale del gas en cada ciclo? b) ¿Cuánto trabajo efectúa la máquina en cada ciclo y qué eficiencia tiene? c) Compare la eficiencia de esta máquina con la máxima eficiencia posible que puede lograrse con los depósitos caliente y frío que se usan en este ciclo. (Figura: $a\to b$ vertical, $b\to c$ isoterma, $c\to a$ horizontal.)

**Solución.** (Es el mismo problema que X6, Febrero 2023, con otros datos.)
1. $T_b=T_c=600{,}15$ K (máxima); $T_a=T_b\frac{p_a}{p_b}=200{,}05$ K (isócora $a\to b$); $V_a=V_b=\frac{nRT_b}{p_b}=0{,}0333$ m³; isoterma $b\to c$ con $p_c=p_b/3$ ⇒ $V_c=3V_b=0{,}0998$ m³.
2. **a)** $Q_{ab}=nC_V(T_b-T_a)=$ **+9980 J**; $Q_{bc}=nRT_b\ln3=$ **+10 964 J** ⇒ entra **2,09 × 10⁴ J**; $Q_{ca}=nC_p(T_a-T_c)=$ **−16 633 J** (sale).
3. **b)** $W=20\,944-16\,633=$ **4,31 × 10³ J**; $e=\dfrac{4311}{20\,944}=$ **21 %**.
4. **c)** $e_C=1-\dfrac{200}{600}=$ **67 %**: la máquina da algo menos de un tercio del máximo.

**Receta / Error típico:** los de X6.
**Teoría:** U §19.5 pp. 629–630; §19.7 pp. 631–632; (20.4) p. 650; (20.14) p. 660.

---

### E23. Problema 20.46 (U p. 680; Solucionario 20-17 y 20-18) — ciclo con una recta

**Enunciado (de U).** Un gas ideal monoatómico realiza el ciclo de la figura P20.46 en el sentido que se indica. La trayectoria del proceso $c\to a$ es una recta en el diagrama pV. a) Calcule Q, W y ΔU para cada proceso: $a\to b$, $b\to c$ y $c\to a$. b) Calcule Q, W y ΔU para un ciclo completo. c) Determine la eficiencia del ciclo. (Figura: $a$ (0,500 m³; 3,00 × 10⁵ Pa), $b$ (0,800 m³; 3,00 × 10⁵ Pa), $c$ (0,800 m³; 1,00 × 10⁵ Pa).)

**Solución.** (Mismo esquema que X8, Febrero 2025.)
1. **Sin $n$:** $\Delta U=\frac32\Delta(pV)$; $pV$: $a$ 150 000 J, $b$ 240 000 J, $c$ 80 000 J.
2. **a)** $a\to b$ isóbaro: $W=p\Delta V=$ **+90 000 J**, $\Delta U=$ **+135 000 J**, $Q=$ **+225 000 J**. $b\to c$ isócoro: $W=0$, $Q=\Delta U=$ **−240 000 J**. $c\to a$ recta: $W=-$(trapecio) $=-\frac12(3+1)\times10^5\cdot0{,}300=$ **−60 000 J**, $\Delta U=$ **+105 000 J**, $Q=$ **+45 000 J** (neto).
3. **b)** Ciclo: $W=Q=$ **+30 000 J** (área del triángulo, horario), $\Delta U=0$.
4. **c) Calor que entra.** En la recta $dQ=\left(\frac52p+\frac32sV\right)dV$ con $s=-6{,}67\times10^5$ Pa/m³: cambia de signo en $V^*=0{,}594$ m³. De $c$ a $V^*$ entran 56 719 J; de $V^*$ a $a$ salen 11 719 J. $Q_H=225\,000+56\,719=281\,719$ J ⇒ $e=\dfrac{30\,000}{281\,719}=$ **10,6 %**. (Si se toma el neto de la recta, $Q_H=270\,000$ J y $e=11{,}1$ %.) Carnot entre $T_{max}$ ($b$) y $T_{min}$ ($c$): $1-\frac{80\,000}{240\,000}=67$ %.

**Receta / Error típico:** los de X8.
**Teoría:** U §19.2 p. 620; §19.4 p. 628 (19.7); (20.4) p. 650.

---

### E24. Problema 20.49 (U p. 680; Solucionario 20-19 y 20-20) — motor Otto de un Passat

**Enunciado (de U).** Un Volkswagen Passat tiene un motor de ciclo Otto de seis cilindros con razón de compresión $r=10.6$. El diámetro de cada cilindro, llamado barreno del motor, es de 82.5 mm. La distancia que el pistón se mueve durante la compresión en la figura 20.5, la carrera del motor, es de 86.4 mm. La presión inicial de la mezcla aire-combustible (en el punto $a$ de la figura 20.6) es de $8.50\times10^4$ Pa, y la temperatura inicial es de 300 K (la del aire exterior). Suponga que, en cada ciclo, se agregan 200 J de calor a cada cilindro al quemarse la gasolina y que el gas tiene $C_V=20.5$ J/mol·K y $\gamma=1.40$. a) Calcule el trabajo total que realiza cada cilindro del motor en un ciclo y el calor disipado cuando el gas se enfría a la temperatura del aire exterior. b) Calcule el volumen de la mezcla aire-combustible en el punto $a$ del ciclo. c) Calcule la presión, el volumen y la temperatura del gas en los puntos $b$, $c$ y $d$ del ciclo. Dibuje un diagrama pV que muestre los valores numéricos de p, V y T para cada uno de los cuatro estados. d) Compare la eficiencia de este motor con la de una máquina de Carnot que opera entre las mismas temperaturas máxima y mínima.

**Solución.**
1. **a)** (20.6): $e=1-10{,}6^{-0{,}4}=0{,}611$; $Q_C=-(1-e)Q_H=$ **−78 J**; $W=Q_H+Q_C=$ **122 J** por cilindro y ciclo.
2. **b)** La carrera barre $A\,l=(r-1)V$ con $V$ el volumen mínimo: $V=\dfrac{0{,}0864\cdot\pi(0{,}04125)^2}{9{,}6}=4{,}81\times10^{-5}$ m³ ⇒ $V_a=rV=$ **5,10 × 10⁻⁴ m³**.
3. **c)** $a\to b$ adiabática: $T_b=T_ar^{\gamma-1}=$ **771 K**, $p_b=p_a\,r\,\frac{T_b}{T_a}=$ **2,32 × 10⁶ Pa**, $V_b=4{,}81\times10^{-5}$ m³. Moles $n=\frac{p_aV_a}{RT_a}=0{,}01738$. $b\to c$ isócora con $Q_H=200$ J: $T_c=T_b+\frac{Q_H}{nC_V}=$ **1333 K**, $p_c=p_b\frac{T_c}{T_b}=$ **4,00 × 10⁶ Pa**. $c\to d$ adiabática: $T_d=T_c/r^{\gamma-1}=$ **518 K**, $V_d=V_a$, $p_d=$ **1,47 × 10⁵ Pa**. Comprobación: $Q_{da}=nC_V(T_a-T_d)=-78$ J ✓.
4. **d)** $e_{Otto}=61{,}1$ %; Carnot entre 1333 K y 300 K: $1-\frac{300}{1333}=$ **77,5 %** > 61,1 %, como exige la segunda ley.

**Receta.** Otto: $e$ de $r$; estados con $Tr^{\gamma-1}$ en las adiabáticas y $\Delta T=Q/(nC_V)$ en la combustión.
**Error típico.** Tomar el volumen barrido como $V_a$ (es $V_a-V_b$).
**Teoría:** U §20.3 pp. 652–653 (20.6); §19.8 p. 634; (20.14) p. 660.

---

## PARTE C — Ejemplos resueltos de U (resultado y comprobación)

| Ejemplo (U p.) | Método | Resultado de U | Comprobación numérica |
|---|---|---|---|
| 20.1 Motor de camión (p. 651) | $e=W/Q_H$; $Q_C=W-Q_H$; $P=W\cdot f$; $m=Q_H/L_c$ | $e=20$ %; $Q_C=-8000$ J; 50 kW = 67 hp; 0,20 g/ciclo; 5,0 g/s; 18 kg/h | $50\,000/746=67{,}0$ hp ✓; $0{,}2\cdot25\cdot3600=18\,000$ g ✓ |
| 20.2 Carnot I (p. 660) | (20.13), (20.2), (20.14) | $Q_C=-1400$ J; $W=600$ J; $e=30$ % | ✓ |
| 20.3 Carnot II (p. 661) | $pV=nRT$, $TV^{\gamma-1}$, (20.10)–(20.11), $W_{ad}=nC_V\Delta T$ | $V_a=8{,}31\times10^{-4}$, $V_b=16{,}6\times10^{-4}$, $V_c=59{,}6\times10^{-4}$, $V_d=29{,}8\times10^{-4}$ m³; $p_b=5{,}00$, $p_c=0{,}837$, $p_d=1{,}67$ (×10⁵ Pa); $Q_H=576$ J, $W_{bc}=832$ J, $Q_C=-346$ J, $W=230$ J; $e=40$ % | $V_c=59{,}63$, $V_d=29{,}81$ (×10⁻⁴); $p_c=0{,}8366$, $p_d=1{,}673$; $Q_H=576{,}3$; $Q_C=-345{,}8$; $W=230{,}5$ ✓ |
| 20.4 Refrigerador de Carnot (p. 662) | $K=|Q_C|/|W|$ y (20.15) | $K=1{,}50$ | $346/230=1{,}50$; $300/200=1{,}50$ ✓ |
| 20.5 Fusión (p. 665) | (20.18) | $+1{,}22\times10^3$ J/K | $3{,}34\times10^5/273=1223$ ✓ |
| 20.6 Calentar agua 0→100 °C (p. 666) | (20.19) con $dQ=mc\,dT$ | $+1{,}31\times10^3$ J/K | $4190\ln(373/273)=1308$ ✓ |
| 20.7 Adiabático reversible (p. 667) | $dQ=0$ | $\Delta S=0$ (isoentrópico) | — |
| 20.8 Expansión libre (p. 667) | camino isotermo reversible | $nR\ln2$; 5,76 J/K por mol | $8{,}314\ln2=5{,}763$ ✓ |
| 20.9 Entropía en Carnot (p. 667–668) | $Q/T$ en isotermas | $+4{,}0$ y $-4{,}0$ J/K; total 0 (máquina y entorno) | ✓ |
| 20.10 Mezcla 1 kg a 100 °C + 1 kg a 0 °C (p. 669) | $mc\ln(T_2/T_1)$ cada una | $-603$, $+705$, total $+102$ J/K; primer grado $+4{,}1$ J/K | $-602{,}8+704{,}3=101{,}5$ ✓; $-\frac{4190}{373}+\frac{4190}{273}=4{,}11$ ✓ |
| 20.11 Microscópico (p. 672) | $w_2=2^Nw_1$, (20.23) | $\Delta S=Nk\ln2=nR\ln2$ | igual a 20.8 ✓ |
| Problema práctico (p. 675) | calorimetría con cambio de fase + $\Delta S$ por tramos | a) 34,8 °C; b) +10 J/K | $T_f=34{,}83$ °C; $\Delta S=+10{,}5$ J/K ✓ |
| Evalúe 20.7 (p. 670) | inverso del ej. 20.10 | $-102$ J/K: imposible | ✓ |

---

## Tabla de verificación (sympy)

| Ejercicio | Resultado verificado |
|---|---|
| X1 Feb 2020 2ª P-2 | $K=1/2$; $|W|=120\,000$ J; $Q_C=60\,000$ J; $Q_H=-180\,000$ J; $\ln(V_b/V_a)=2{,}67287$, $V_b/V_a=14{,}4814$; $\Delta S=+400$, $-400$ J/K; $W_{ad}=\mp67\,343$ J; $p_c=44\,895{,}6$ Pa; $V_b=0{,}096225$ m³; $p_b=699\,853$ Pa; $V_a=6{,}6447\times10^{-3}$ m³, $p_a=1{,}01349\times10^7$ Pa; $V_d=0{,}034527$ m³, $p_d=650\,153$ Pa |
| X2 Feb 2018 1ª P-2 (1 mol, γ = 1,4) | $p_1=831\,400$ Pa (8,2073 atm); $V_2=10{,}2591$ L; $T_3=382{,}827$ K; $V_4=9{,}74741$ L; $p_3=1{,}5710$ atm; $p_4=3{,}2234$ atm; $Q_{12}=2987{,}76$ J; $W_{23}=2435{,}45$ J; $Q_{34}=-2287{,}59$ J; $W=700{,}17$ J; $e=0{,}234347$; $P=21\,005$ W; $\Delta S=\pm5{,}9755$ J/K |
| X2 (γ = 5/3) | $T_3=320{,}398$ K; $W_{23}=2239{,}81$ J; $Q_{34}=-1914{,}55$ J; $W=1073{,}21$ J; $e=0{,}359203$; $P=32\,196$ W; $p_3=1{,}3148$ atm |
| X3 Feb 2025 1ª P-2 | $T_a=252{,}586$ K; $p_b=21\,000$ Pa; $T_c=841{,}953$ K; $Q_{ab}=2528{,}34$, $Q_{bc}=12\,250$, $Q_{ca}=-17\,150$ J; $W=-2371{,}66$ J; $K=6{,}23123$; $\Delta S$: 10,0098; 25,0246; −35,0344 J/K |
| X4 Sep 2019 Original P-2 | $T_f=300$ K; $p_f=1{,}5$ atm; $\Delta S=0{,}0573692$ J/K |
| X5 Feb 2019 1ª P-1 | $T_A=6{,}09213$ K, $T_B=24{,}3685$ K; $Q_{AB}=379{,}875$, $Q_{BC}=-227{,}925$, $Q_{CA}=-70{,}2158$ J; $W=81{,}7342$ J; $e=0{,}215161$; $\Delta S$: 28,8141; −17,2885; −11,5257 J/K; $e_C=0{,}75$ |
| X6 Feb 2023 2ª P-2 | $T_A=143{,}288$ K; $Q_{AB}=16\,074{,}7$, $Q_{BC}=19\,808{,}2$, $Q_{CA}=-26\,791{,}2$ J; $W=9091{,}77$ J; $e=0{,}253373$; $e_C=0{,}75$; $\Delta S$: 51,8405; 34,5603; −86,4008 J/K |
| X7 Sep 2024 P-2 | $T_a=214{,}95$ K; $Q_{ab}=6701{,}6$, $Q_{bc}=7011{,}34$, $Q_{ca}=-11\,169{,}3$ J; $W=2543{,}6$ J; $e=0{,}185489$; $e_C=0{,}625$; $\Delta S$: 18,3479; 12,2319; −30,5798 J/K |
| X8 Feb 2025 2ª P-2 | $V^*=109/160$ m³; entra 28 520,8 J; sale 25 520,8 J; $e=0{,}090446$; $e_C=0{,}5$ |
| X9 Feb 2019 2ª P-2 | $e=0{,}52644$ (tema 19); $e_C=1-288{,}15/1961{,}47=0{,}853095$ |
| T2 Sol–Tierra | $-1/5800+1/288=+3{,}2998\times10^{-3}$ J/K por julio |
| 20.1 | 6500 J; 0,33846 |
| 20.2 | 2600 J; 0,28889 |
| 20.9 | 14 761,9 J; −45 761,9 J |
| 20.6 | 0,593640; 4063,6 J; $W=5936{,}4$ J |
| 20.7 | 0,581007; 0,595339; +0,014332 |
| 20.12 | −3721,15 J; 2728,85 J; 0,423077 |
| 20.15 | 37 878,8 J; $Q_C=-12\,878{,}8$ J; $T_H=862{,}206$ K (589,06 °C) |
| 20.17 | −491,852 J; 76,852 J; 211,34 W; $K=5{,}4$ |
| 20.14 | $Q_C=2{,}839\times10^7$ J; $|Q_H|=3{,}08845\times10^7$ J; $W=-2{,}49445\times10^6$ J; $K=11{,}381$ |
| 20.18 | $Q_C=-13\,360$ J; $Q_H=18\,251{,}1$ J; $W=4891{,}09$ J |
| 20.40 | $W=294$ J; $Q_C=-206$ J; $T_C=318{,}538$ K; $e=0{,}588$; $p_a=2{,}57134\times10^6$ Pa |
| 20.25 | −6,31076 J/K |
| 20.21 | 427,970; −392,085; +35,8855 J/K |
| 20.31 | 10,0469 J/K |
| 20.24 | −209,780 J/K; $Q=-68\,087{,}5$ J; +232,262 J/K; total +22,4815 J/K |
| 20.22 | 31,75 °C; +4703,04; −4231,83; total +471,210 J/K |
| 20.59 | $T_C=280{,}5$ K (7,35 °C); ≈ 400 m |
| 20.60 | 512 820 J/K por segundo |
| 20.61 | d) |
| 20.62 | 0,0571429 |
| 20.36 | $V_1=8{,}61819\times10^{-3}$ m³; $p_2=202\,600$ Pa; $T_3^{adiab}=492{,}201$ K; $V_3=0{,}0141396$ m³; $Q_{12}=2182{,}56$ J; con $T_3=492$ K: $W=226{,}99$ J, $e=0{,}1040$; con 492,2 K: $W=224{,}94$ J, $e=0{,}10306$ |
| 20.41 | $T_a=200{,}05$ K; $V_b=0{,}0332663$ m³; $Q_{ab}=9979{,}89$, $Q_{bc}=10\,964{,}0$, $Q_{ca}=-16\,633{,}2$ J; $W=4310{,}77$ J; $e=0{,}205824$; $e_C=2/3$ |
| 20.46 | $ab$: 225 000 / 90 000 / 135 000 J; $bc$: −240 000 J; $ca$: $W=-60\,000$, $\Delta U=105\,000$, $Q=45\,000$ J; $W_{ciclo}=30\,000$ J; $V^*=0{,}59375$ m³; entra 56 718,8 J, sale 11 718,8 J; $e=0{,}106489$ (0,111111 con el neto); $e_C=2/3$ |
| 20.49 | $e=0{,}611064$; $Q_C=-77{,}79$ J; $W=122{,}21$ J; $V_b=4{,}81105\times10^{-5}$, $V_a=5{,}09972\times10^{-4}$ m³; $T_b=771{,}34$ K, $p_b=2{,}31658\times10^6$ Pa; $n=0{,}0173783$; $T_c=1332{,}73$ K, $p_c=4{,}00264\times10^6$ Pa; $T_d=518{,}35$ K, $p_d=146\,865$ Pa; $e_C=0{,}774898$ |
| Ej. U | 20.3: $V_c=5{,}963\times10^{-3}$, $V_d=2{,}981\times10^{-3}$ m³, $p_c=83\,656$, $p_d=167\,313$ Pa, $Q_H=576{,}28$, $Q_C=-345{,}77$, $W=230{,}51$ J; 20.5: 1222,8 J/K (273,15 K); 20.6: 1307,1 J/K; 20.8: 5,7628 J/K; 20.10: −602,79 + 704,32 = 101,53 J/K; Problema práctico: 34,828 °C, +10,522 J/K |

---

## Figuras SVG / gráficas sugeridas

| Ejercicio | Figura (valores ya verificados) |
|---|---|
| X1 (Feb 2020 2ª) | Ciclo de Carnot **antihorario** en pV: isotermas 450 K y 150 K, adiabáticas; vértices $a$ (6,64 × 10⁻³ m³; 1,01 × 10⁷ Pa), $b$ (0,0962; 7,0 × 10⁵), $c$ (0,5; 4,49 × 10⁴), $d$ (0,0345; 6,50 × 10⁵). Escala muy desigual: usar ejes **logarítmicos** o «no a escala». Al lado, diagrama de flujo: $Q_C=60$ kJ entra del foco a 150 K, $|W|=120$ kJ entra, $|Q_H|=180$ kJ sale al foco a 450 K. |
| X2 (Feb 2018 1ª) | Ciclo de Carnot horario con vértices 1 (5 L; 8,21 atm), 2 (10,26; 4), 3 (20; 1,57), 4 (9,75; 3,22); isotermas 500 K y 382,8 K; flechas $Q_{12}=+2988$ J y $Q_{34}=-2288$ J; área $W=700$ J sombreada. |
| X3 (Feb 2025 1ª) | $a$ (0,03; 70 kPa) → isoterma → $b$ (0,1; 21) → $c$ (0,1; 70) → $a$, antihorario; flechas de calor que entra en $ab$ y $bc$ (14 778 J) y sale en $ca$ (17 150 J); $K=6{,}23$. |
| X4 (Sep 2019 O) | Cilindro antes/después (pistón al centro: 2 atm | 1 atm; desplazado: 4/3 L | 2/3 L a 1,5 atm) con los dos $\Delta S$ (+0,194 y −0,137 J/K). |
| X5 / X6 / X7 | Ciclo pV con el $\Delta S$ de cada tramo escrito junto al lado y «Σ ΔS = 0»; barra comparativa $e$ real frente a $e_{Carnot}$ (21,5/75; 25,3/75; 18,5/62,5 %). |
| X8 / E23 | Triángulo con el punto $V^*$ (0,681 m³ en X8; 0,594 m³ en E23) separando «entra calor» / «sale calor» en la recta. |
| T1 | (a) Fig. 20.1 de U (hielo en caja a 70 °C frente a 0 °C) —recortar del libro—; (b) ciclo de Carnot pV con los cuatro pasos (fig. 20.13); (c) fig. 20.15 (máquina supereficiente + refrigerador de Carnot). |
| T2 | Diagramas de flujo de energía de los dos enunciados (fig. 20.11 de U) y esquema Sol (5800 K) → Tierra (288 K) con $\Delta S=-Q/T_S+Q/T_T>0$. |
| E3, E8, E9 | Diagrama de flujo del refrigerador (cajas $T_H$ / $T_C$, flechas $Q_C$, $W$, $|Q_H|$ con los números). |
| E6, E7, E10, E11 | Diagrama de flujo de máquina de Carnot con $Q_H$, $W$, $|Q_C|$ y temperaturas en kelvin. |
| E13, E15, E16 | Barras de $\Delta S$: negativa (cuerpo caliente) y positiva mayor (cuerpo frío), total positivo (+36, +22, +471 J/K). |
| E14 / ej. 20.8 | Expansión libre (caja dividida) y, al lado, la isoterma reversible que se usa para calcular $\Delta S$. |
| E17 | Gráfica temperatura–profundidad de U p. 681 (recorte) marcando 7,4 °C ≈ 400 m. |
| E21 | Ciclo 1 (8,62 L; 1 atm; 300 K) → 2 (8,62 L; 2 atm; 600 K) → adiabática → 3 (14,1 L; 1 atm; 492 K) → 1. |
| E24 | Ciclo Otto con $a$ (5,10 × 10⁻⁴ m³; 8,5 × 10⁴ Pa; 300 K), $b$ (4,81 × 10⁻⁵; 2,32 × 10⁶; 771 K), $c$ (4,81 × 10⁻⁵; 4,00 × 10⁶; 1333 K), $d$ (5,10 × 10⁻⁴; 1,47 × 10⁵; 518 K); «no a escala». |
| Interactivo (idea) | Ciclo de Carnot con deslizadores $T_H$, $T_C$ y razón $V_b/V_a$: muestra $Q_H$, $Q_C$, $W$, $e=1-T_C/T_H$ y $\Delta S$ de cada isoterma (siempre opuestos). |
