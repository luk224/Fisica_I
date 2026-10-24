# Soluciones — Tema 7: Energía potencial y conservación de la energía

Material de trabajo para el redactor del Tema 7. Todas las cifras están verificadas con sympy (script `t7.py` del scratchpad de la sesión; cálculos reproducidos abajo). Los problemas de E están **traducidos y ampliados**, no copiados.

**Herramientas de teoría usadas (U = Sears-Zemansky 14ª ed., página impresa):**

| Herramienta | Referencia |
|---|---|
| $U_{grav}=mgy$; $W_{grav}=-\Delta U_{grav}$ | U §7.1, ec. (7.2)-(7.3), p. 204 |
| Conservación $K_1+U_1=K_2+U_2$ (solo gravedad) | U §7.1, ec. (7.4), p. 205 |
| $K_1+U_1+W_{otras}=K_2+U_2$ | U §7.1, ec. (7.7), p. 207; forma general (7.14), p. 214 |
| $W_{grav}$ en trayectoria curva solo depende de $\Delta y$ | U §7.1, p. 209 |
| $U_{el}=\tfrac12kx^2$; $W_{el}=-\Delta U_{el}$ | U §7.2, ec. (7.9)-(7.11), p. 212-213 |
| Fuerzas conservativas / no conservativas; energía interna $\Delta K+\Delta U+\Delta U_{int}=0$ | U §7.3, p. 217-220, ec. (7.15) p. 220 |
| $F_x=-dU/dx$ | U §7.4, ec. (7.16), p. 221 |
| Equilibrio y diagramas de energía | U §7.5, p. 225 |
| Fricción cinética $f_k=\mu_k n$ | U §5.3, ec. (5.3), p. 143 |
| Dinámica del movimiento circular ($a_{rad}=v^2/R$) | U §5.4, p. 151 |
| Teorema trabajo-energía $W_{tot}=K_2-K_1$ | U §6.2, ec. (6.6), p. 178 |
| Energía potencial gravitacional general $U=-Gm_Em/r$ | U §13.3, ec. (13.9), p. 405-407 |

**Método general («Receta maestra» del tema).**
1. Elige estado 1 y estado 2 (dónde conoces todo / dónde está la incógnita).
2. Fija el origen de alturas y el sentido $+y$ hacia arriba.
3. Escribe $K_1$, $U_1=U_{grav,1}+U_{el,1}$, $K_2$, $U_2$.
4. Calcula $W_{otras}$: trabajo de todo lo que no sea peso ni resorte (fricción, empujes…). La fricción da $W_f=-f_k\,s=-\mu_k n\,s$; la normal no trabaja si es perpendicular al desplazamiento.
5. Plantea $K_1+U_1+W_{otras}=K_2+U_2$ y despeja.

---

## Parte 1 — Exámenes reales (X)

Orden: de más fácil a más difícil.

### X1. Examen Septiembre 2023 (Nacional-UE Original) P-2 — partícula en cuarto de círculo con tramo horizontal con fricción

**Fuente:** recopilatorio `Examanes/FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf`, p. 15 del PDF (verificado renderizando la página). En el índice `examenes_por_tema.md` solo figura en el Tema 6; es plenamente de energía (Tema 7).

**Enunciado (literal):** «Una partícula de masa 0,5 kg que se encuentra en reposo se suelta desde una posición A, que forma un cuarto de círculo de radio $R = 2{,}1$ m según se muestra en la figura, deslizándose hasta llegar al punto B con una velocidad de $5{,}2\ \mathrm{m\,s^{-1}}$. A partir de este punto, la partícula se desplaza sobre una superficie horizontal hasta el punto C situado a 5 m donde se detiene. Calcular, (a) el coeficiente de fricción cinética de la superficie horizontal, y (b) el trabajo de la fuerza de rozamiento sobre la partícula al deslizarse desde el punto A al B.» (Figura: A en el borde superior del cuarto de círculo, a altura $R$ sobre B; tramo horizontal BC de $s=5$ m.) 3 puntos. No da $g$: se usa $g=9{,}8\ \mathrm{m/s^2}$ (con 9,81 los resultados apenas cambian, se indican).

**Solución**
1. *Elección del método.* En el tramo curvo la normal y la fricción cambian punto a punto: Newton sería muy difícil. Con energía solo necesitamos estados inicial y final (U §7.1, Estrategia 7.1, p. 207).
2. *Apartado (a), tramo BC.* Estado 1 = B ($v_B=5{,}2$ m/s), estado 2 = C ($v_C=0$). Mismo nivel, así que $U_1=U_2$. Sobre la superficie horizontal $n=mg$ (equilibrio vertical, U §5.3), luego $f_k=\mu_k mg$ (ec. 5.3, p. 143) y $W_{otras}=-\mu_k mg\,s$.
3. Balance $K_B+W_{otras}=K_C$: $\tfrac12 m v_B^2-\mu_k m g s=0\ \Rightarrow\ \mu_k=\dfrac{v_B^2}{2gs}$. La masa se cancela: el resultado no depende de $m$.
4. Números: $\mu_k=\dfrac{(5{,}2)^2}{2(9{,}8)(5)}=\dfrac{27{,}04}{98}=0{,}276$ (con $g=9{,}81$: 0,276).
5. *Apartado (b), tramo AB.* Origen de alturas en B: $y_A=R=2{,}1$ m, $y_B=0$. $K_A=0$. La normal no trabaja (siempre perpendicular a la trayectoria); la única «otra» fuerza que trabaja es la fricción: $W_{otras}=W_f^{AB}$.
6. Balance $K_A+U_A+W_f^{AB}=K_B+U_B$: $W_f^{AB}=\tfrac12 m v_B^2-mgR$.
7. $\tfrac12 m v_B^2=\tfrac12(0{,}5)(27{,}04)=6{,}76$ J; $mgR=(0{,}5)(9{,}8)(2{,}1)=10{,}29$ J. Luego $W_f^{AB}=6{,}76-10{,}29=-3{,}53$ J (con $g=9{,}81$: $-3{,}54$ J).
8. *Comprobación de sentido.* Sin fricción llegaría a B con $v=\sqrt{2gR}=6{,}42$ m/s > 5,2 m/s: coherente con que la fricción haya quitado energía; y el signo negativo es el esperado.

**Resultado:** (a) $\mu_k\approx 0{,}28$; (b) $W_f^{AB}\approx-3{,}5$ J.

**Receta:** si un tramo tiene fricción de valor desconocido (curvo) y otro con fricción conocida en forma ($\mu_k mg s$, horizontal), aplica $K_1+U_1+W_{otras}=K_2+U_2$ por separado en cada tramo, usando el punto común (B) como bisagra.

**Error típico:** escribir $W_f^{AB}=-\mu_k mg\cdot(\pi R/2)$ con el $\mu_k$ del apartado (a): en la curva la normal no vale $mg$ y la superficie no es la misma. El trabajo de fricción en AB sale solo del balance de energía.

---

### X2. Examen Febrero 2020 (2ª semana) P-1 — bloque por un carril con tramo rugoso que comprime un resorte

**Fuente:** `Examanes/E689010160-20F2.pdf`, pregunta 1 (verificado en el PDF con la figura).

**Enunciado (literal):** «Sea un bloque de 5 kg de masa que se deja deslizar, partiendo del reposo, desde el punto A de un carril a una altura $h=4$ m según la figura. El carril consta de tres tramos de los cuales sólo existe rozamiento en el tramo BC de 5 m de longitud. Al final del trayecto, en el tramo CD se encuentra un resorte cuya constante elástica es $k=400$ N/m. Cuando el bloque alcance el punto D, el resorte se ha comprimido 25 cm. Suponiendo que el choque entre la masa y el resorte es perfectamente elástico, calcular el coeficiente de rozamiento dinámico en el tramo BC.» (3 puntos). Figura: A a 4 m sobre el tramo horizontal B-C-D; AB curvo sin fricción; BC = 5 m con $\mu$; CD horizontal sin fricción con el resorte.

**Interpretación necesaria (decirlo en el examen):** «el resorte se ha comprimido 25 cm cuando el bloque alcanza D» significa que D es el punto de compresión máxima, donde el bloque queda momentáneamente en reposo ($v_D=0$). «Choque perfectamente elástico» significa que en el contacto con el resorte no se pierde energía mecánica: toda la energía cinética se almacena como $\tfrac12kx^2$. No se da $g$: tomamos $9{,}8\ \mathrm{m/s^2}$.

**Solución**
1. *Estados.* Estado 1 = A ($v_A=0$, $y_A=h=4$ m). Estado 2 = D ($v_D=0$, $y_D=0$, resorte comprimido $x=0{,}25$ m). Origen de alturas en el tramo horizontal.
2. *Energías.* $K_1=0$, $U_1=mgh$ (U §7.1, ec. 7.2). $K_2=0$, $U_2=\tfrac12kx^2$ (U §7.2, ec. 7.10, p. 213); $U_{grav,2}=0$.
3. *Trabajo de otras fuerzas.* Solo hay fricción en BC. En el tramo horizontal $n=mg$, $f_k=\mu mg$, y el trabajo es $W_{otras}=-\mu mg L$ con $L=5$ m (la normal no trabaja en ningún tramo).
4. *Balance* (ec. 7.14, p. 214): $mgh-\mu mgL=\tfrac12kx^2\ \Rightarrow\ \mu=\dfrac{mgh-\tfrac12kx^2}{mgL}=\dfrac{h}{L}-\dfrac{kx^2}{2mgL}$.
5. Números: $mgh=5\cdot9{,}8\cdot4=196$ J; $\tfrac12kx^2=\tfrac12\cdot400\cdot0{,}25^2=12{,}5$ J; $mgL=5\cdot9{,}8\cdot5=245$ J. $\mu=\dfrac{196-12{,}5}{245}=\dfrac{183{,}5}{245}=0{,}749$.
6. *Comprobación.* Con $g=9{,}81$: $\mu=0{,}7490$ (idéntico a tres cifras, porque el término dominante $h/L=0{,}8$ no depende de $g$). El valor es alto pero físicamente posible: casi toda la energía (183,5 de 196 J) se disipa en BC.

**Resultado:** $\mu_k\approx0{,}75$.

**Receta:** toma como estado 2 el de compresión máxima ($v=0$); entonces la energía inicial se reparte en «energía disipada por fricción» + «energía elástica»: $mgh=\mu mgL+\tfrac12kx^2$.

**Error típico:** olvidar convertir 25 cm a 0,25 m (daría $\tfrac12kx^2=125\,000$ J, absurdo), o meter la fricción en todo el recorrido cuando solo actúa en BC.

---

### X3. Examen Febrero 2022 (2ª semana) P-1 — bloque lanzado por un resorte en un plano inclinado con fricción

**Fuente:** `Examanes/E689010160-22F2.pdf`, pregunta 1 (verificado en el PDF). Mismos datos que el problema 7.73 de U (resuelto en Solucionario 7-28).

**Enunciado (literal):** «Un bloque sólido de 1,50 kg de masa se coloca contra un resorte comprimido en la base de un plano inclinado de pendiente 30° (punto A). Al soltarse el resorte, el bloque sube por el plano. En el punto B, a 6,0 m pendiente arriba de A, el bloque tiene una velocidad de 7 m/s dirigida pendiente arriba y ya no está en contacto con el resorte. El coeficiente de fricción cinética entre el bloque y la superficie del plano es $\mu_k = 0{,}50$. La masa del resorte es despreciable. Calcule la energía potencial almacenada inicialmente en el resorte. (3 puntos)». Se toma $g=9{,}8\ \mathrm{m/s^2}$.

**Solución**
1. *Estados.* 1 = A (bloque en reposo contra el resorte comprimido): $K_A=0$, $U_A=U_{el,A}$ (incógnita), $y_A=0$. 2 = B: $v_B=7$ m/s, sin resorte, $y_B=s\sin30^\circ=6{,}0\cdot0{,}5=3{,}0$ m.
2. *¿Por qué podemos ignorar el detalle del resorte?* Porque su fuerza es conservativa: toda su contribución está en $U_{el,A}$ (U §7.2). No necesitamos saber cuánto estaba comprimido.
3. *Fricción.* Perpendicular al plano no hay aceleración, así que $n=mg\cos30^\circ$; $f_k=\mu_k mg\cos30^\circ$ (U §5.3). Actúa durante los 6,0 m (también mientras el resorte empuja; la distancia de compresión ya está incluida en los 6,0 m desde A). $W_{otras}=-\mu_k mg\cos30^\circ\, s$.
4. *Balance* (ec. 7.14): $U_{el,A}+W_{otras}=K_B+U_{grav,B}\ \Rightarrow\ U_{el,A}=\tfrac12mv_B^2+mgs\sin\theta+\mu_k mg\cos\theta\,s$.
5. Números: $K_B=\tfrac12(1{,}50)(7)^2=36{,}75$ J; $U_{grav,B}=(1{,}50)(9{,}8)(3{,}0)=44{,}10$ J; $|W_f|=(0{,}50)(1{,}50)(9{,}8)(0{,}866)(6{,}0)=38{,}19$ J.
6. $U_{el,A}=36{,}75+44{,}10+38{,}19=119{,}04$ J.
7. *Lectura física.* La energía del resorte se reparte en tres «cuentas»: cinética en B (31 %), potencial gravitatoria (37 %) y energía interna por fricción (32 %).

**Resultado:** $U_{el,A}\approx119$ J (con $g=9{,}81$: 119,1 J).

**Receta:** «energía del resorte = lo que hay al final + lo que se ha perdido»: $U_{el}=K_2+mg\,s\sin\theta+\mu_k mg\cos\theta\,s$.

**Error típico:** usar $n=mg$ en lugar de $mg\cos\theta$ en el plano inclinado, o poner $mgs$ en vez de $mgs\sin\theta$ (la altura ganada es $s\sin\theta$, no la distancia recorrida).

---

### X4. Examen Septiembre 2024 (Nacional-UE-Guinea Original) P-1 — mismo planteamiento, rampa de 25°

**Fuente:** solo en los recopilatorios `Examanes/EXAMENESFISICA1.pdf` (texto en `fuentes_txt/examenes/EXAMENESFISICA1.txt`, líneas 17-27) y `FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf`.

**Enunciado (literal):** «Un bloque de 1,5 kg de masa se coloca contra un muelle que se encuentra comprimido en la base de una rampa de 25°. Al liberar el muelle, el bloque sube por la pendiente por la acción de éste de forma que cuando lleva recorridos 5 m el módulo de su velocidad es de 6 m/s. En ese momento el bloque ya no está en contacto con el muelle. El coeficiente de fricción cinética entre el bloque y la pendiente es de $\mu_k = 0{,}4$. Considere además que la masa del muelle es despreciable. Obtenga el valor de la energía potencial almacenada inicialmente en el muelle. Considere: $g = 9{,}81\ \mathrm{m\,s^{-2}}$.» (3 puntos)

**Solución**
1. *Estados.* 1 = base de la rampa (reposo, muelle comprimido, $y_1=0$). 2 = tras recorrer $s=5$ m: $v_2=6$ m/s, $y_2=s\sin25^\circ$.
2. *Fuerzas.* Peso y muelle son conservativas (van en $U$); la normal $n=mg\cos25^\circ$ no trabaja; la fricción $f_k=\mu_k mg\cos25^\circ$ es la única «otra» fuerza.
3. *Balance* (ec. 7.14, p. 214): $U_{el,1}-\mu_k mg\cos\theta\,s=\tfrac12mv_2^2+mgs\sin\theta$.
4. Números: $\tfrac12mv_2^2=\tfrac12(1{,}5)(36)=27{,}00$ J; $mgs\sin25^\circ=(1{,}5)(9{,}81)(5)(0{,}4226)=31{,}09$ J; $\mu_k mg\cos25^\circ s=(0{,}4)(1{,}5)(9{,}81)(0{,}9063)(5)=26{,}67$ J.
5. $U_{el,1}=27{,}00+31{,}09+26{,}67=84{,}77$ J.

**Resultado:** $U_{el}\approx84{,}8$ J.

**Receta:** idéntica a X3 (es el mismo problema con otros números): suma de energía cinética final + potencial gravitatoria ganada + energía disipada por fricción.

**Error típico:** calcular la fricción solo en la parte en que ya no actúa el muelle. Actúa en todo el recorrido medido desde la posición inicial.

---

### X5. Cuestiones de teoría (respuestas modelo breves)

#### X5.1 Examen Febrero 2022 (1ª semana) P-3, Opción 3.1 «Fuerzas conservativas y no conservativas»
(`Examanes/E689010160-22F1.pdf`, verificado.)

**Desarrollo del tema (guion, U §7.3 p. 217-220 y §7.4 p. 221):**
- Una fuerza es **conservativa** si su trabajo (i) puede escribirse como diferencia de una energía potencial, $W=U_1-U_2=-\Delta U$; (ii) es reversible (lo que se «presta» a la energía cinética se recupera al volver); (iii) no depende de la trayectoria, solo de los puntos inicial y final; (iv) es nulo en cualquier trayectoria cerrada. Ejemplos: peso ($U=mgy$), fuerza elástica ideal ($U=\tfrac12kx^2$), gravitación ($U=-Gm_1m_2/r$), fuerza eléctrica.
- Relación fuerza-potencial: $F_x=-dU/dx$ (ec. 7.16); en 3D, $\vec F=-\left(\tfrac{\partial U}{\partial x}\hat\imath+\tfrac{\partial U}{\partial y}\hat\jmath+\tfrac{\partial U}{\partial z}\hat k\right)$ (ec. 7.18, p. 223). La fuerza apunta hacia donde $U$ disminuye.
- Una fuerza es **no conservativa** si no cumple lo anterior: fricción cinética, resistencia de fluidos. Su trabajo depende del camino (ej. 7.10, p. 218) y es **disipativo**: no puede representarse con una $U$. Su efecto es aumentar la **energía interna**: $\Delta K+\Delta U+\Delta U_{int}=0$ (ec. 7.15, p. 220), es decir, la energía total se conserva aunque la mecánica no.
- Consecuencia práctica: si solo trabajan fuerzas conservativas, $K+U=\text{cte}$; si no, $K_1+U_1+W_{otras}=K_2+U_2$ (ec. 7.14).

**3.1a) Central hidroeléctrica.** Se produce **menos** energía eléctrica que la energía potencial gravitatoria liberada. Parte de la energía se queda como energía cinética del agua que sale de las turbinas, y otra parte se disipa por fuerzas no conservativas (fricción del agua con conductos y álabes, rozamiento en ejes, pérdidas eléctricas por calor en los generadores), que la convierten en energía interna. La energía total se conserva ($\Delta K+\Delta U+\Delta U_{int}=0$), pero solo una fracción acaba como energía eléctrica útil. Nunca puede ser *más*: eso violaría la conservación de la energía.

**3.1b) Caja que baja por una rampa.** El trabajo del **peso sí** se expresa como cambio de una energía potencial, $W_{grav}=-\Delta U_{grav}=mg(y_1-y_2)$: es conservativo y solo depende del desnivel. El trabajo de la **fricción no**: $W_f=-f_k s$ depende de la longitud del camino recorrido (no solo de los extremos), siempre es negativo (la fricción se opone al movimiento tanto al bajar como al subir), por lo que en un viaje de ida y vuelta no se anula. No existe ninguna función $U(x,y)$ cuyo cambio lo reproduzca.

#### X5.2 Examen Febrero 2024 (2ª semana) P-3, Teoría Opción A «Fuerzas conservativas y no conservativas»
(`Examanes/E689010160-24F2.pdf`, p. 2, verificado.) Desarrollo del tema: el mismo guion de X5.1.

**(a) $U=\tfrac12k(x-x_1)^2$: no es correcto.** Es cierto que la constante aditiva de $U$ es arbitraria, pero cambiar el cero de $U$ significa **sumar una constante**, no desplazar la variable. La forma correcta de tomar $U=0$ en $x=x_1$ es $U=\tfrac12kx^2-\tfrac12kx_1^2$. La expresión del estudiante describe otro resorte, cuyo equilibrio estaría en $x=x_1$: su fuerza sería $F_x=-dU/dx=-k(x-x_1)$, distinta de la real $F_x=-kx$ (ec. 7.16). Como la fuerza cambia, los resultados físicos (velocidades, posiciones de retorno) saldrían mal.

**(b) Signo de $U$ entre dos partículas con $U(\infty)=0$.** Partimos de $W=-\Delta U$ (fuerza conservativa). Llevamos las partículas desde el infinito hasta una separación $r$: $U(r)=U(\infty)-W_{\infty\to r}=-W_{\infty\to r}$.
- Si **se repelen**, al acercarlas la fuerza se opone al desplazamiento: $W_{\infty\to r}<0\Rightarrow U(r)>0$. Además $U$ disminuye al separarlas, y $F_r=-dU/dr>0$ (hacia fuera), coherente con repulsión.
- Si **se atraen**, la fuerza va a favor del acercamiento: $W_{\infty\to r}>0\Rightarrow U(r)<0$. Habría que aportar energía para separarlas de nuevo hasta el infinito (sistema ligado). Ejemplo: gravitación, $U=-Gm_1m_2/r$ (U §13.3, ec. 13.9, p. 405).

#### X5.3 Examen Febrero 2022 (1ª semana) P-3, Opción 3.2 «Energía potencial gravitatoria» (catalogado en el Tema 13; útil aquí)
(`Examanes/E689010160-22F1.pdf`, verificado.)

**3.2a)** No: el astronauta en órbita sigue sometido a la gravedad terrestre (a 400 km de altura $g$ es todavía cerca del 89 % del valor en superficie). Parece «ingrávido» porque él y la nave están en caída libre continua alrededor de la Tierra con la misma aceleración. La fuerza $F=Gm_Em/r^2$ solo se anula en $r\to\infty$: no hay distancia finita a la que se «salga» de la gravedad, aunque a grandes distancias sea despreciable frente a la de otros cuerpos.

**3.2b)** Con $U=-Gm_Em/r$ (cero en el infinito), $E=K+U$ se conserva. Si $E<0$, en algún $r_{max}$ finito se tiene $K=0$ ($E=U(r_{max})$): el proyectil sube, se para y vuelve a caer (sistema ligado). Si $E\geq0$, $K=E-U>0$ para todo $r$: escapa hasta el infinito (con $E=0$ llega con rapidez tendente a cero; es el caso de la velocidad de escape, U §13.3, p. 406-407).

#### X5.4 Examen Septiembre 2022 (Nacional-UE) P-4, Teoría Opción B «Energía potencial gravitacional» (no catalogado en el índice)
(Recopilatorio `FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf`, p. 21 del PDF, verificado.)

**(a)** La expresión general, con el cero en el infinito, es $U=-\dfrac{GMm}{r}$ (U §13.3, ec. 13.9). Es negativa; su **módulo** $GMm/r$ disminuye con $r$, pero $U$ misma **aumenta** (se hace menos negativa) al alejarse, igual que $mgh$ aumenta con la altura: las dos dicen que subir cuesta trabajo. $U=mgh$ es la aproximación cerca de la superficie: para $r=R_T+h$ con $h\ll R_T$, $\Delta U=GMm\left(\dfrac1{R_T}-\dfrac1{R_T+h}\right)=\dfrac{GMm\,h}{R_T(R_T+h)}\approx\dfrac{GM}{R_T^2}m h=mgh$, usando $g=GM/R_T^2$. La diferencia es solo de dónde se toma el cero ($U=0$ en la superficie frente a $U=0$ en el infinito), que no cambia la física porque solo importan las diferencias.

**(b)** Ambas playas están al nivel del mar (misma distancia al centro de la Tierra, la misma altura). Como la gravedad es conservativa, su trabajo solo depende de los extremos: $W_{grav}=-\Delta U=0$, sea cual sea el camino (por la autopista, en avión…). Sin fuerzas no conservativas, por el teorema trabajo-energía el trabajo total es también el cambio de energía cinética: si se sale y se llega en reposo, $W_{tot}=0$.

---

## Parte 2 — Problemas del solucionario (E)

Orden de dificultad creciente: 7.6 → 7.40 → 7.24 → 7.67 → 7.65 → 7.9 → 7.22 → 7.73.

### E 7.6 — Solucionario 7-2, Problema 7.6 (U p. 229)

**Enunciado (U, traducido/resumido):** una caja de masa $M$ parte del reposo en lo alto de una rampa sin fricción inclinada un ángulo $\alpha$. Calcule su rapidez en la base, a una distancia $d$ (medida a lo largo de la rampa) del punto de partida, de dos maneras: (a) con el cero de energía potencial en la base y $+y$ hacia arriba; (b) con el cero en la cima y $+y$ hacia arriba. (c) ¿Por qué no interviene la fuerza normal?

**Solución**
1. *Fuerzas:* peso (conservativo) y normal. La normal es perpendicular al desplazamiento: $W_n=0$ (apartado c). Por tanto solo trabaja la gravedad y $K_1+U_1=K_2+U_2$ (ec. 7.4, p. 205).
2. *Desnivel:* bajar $d$ por la rampa es bajar $d\sin\alpha$ en vertical.
3. *(a) Cero en la base:* $y_1=d\sin\alpha$, $y_2=0$. $0+Mgd\sin\alpha=\tfrac12Mv_2^2+0\Rightarrow v_2=\sqrt{2gd\sin\alpha}$.
4. *(b) Cero en la cima:* $y_1=0$, $y_2=-d\sin\alpha$. $0+0=\tfrac12Mv_2^2-Mgd\sin\alpha\Rightarrow v_2=\sqrt{2gd\sin\alpha}$, igual.
5. *Por qué coinciden:* solo importa $\Delta U$, no el valor absoluto (U, cuadro «Elija la altura cero en cualquier sitio», p. 206).

**Resultado:** $v=\sqrt{2gd\sin\alpha}$, independiente de $M$ y del origen elegido.

**Receta:** sin fricción, la rapidez tras bajar un desnivel $\Delta h$ partiendo del reposo es siempre $v=\sqrt{2g\Delta h}$, sea cual sea la forma del camino.

**Error típico:** usar $d$ como altura ($v=\sqrt{2gd}$) o poner $+y$ hacia abajo con $U=mgy$ (cambia el signo).

---

### E 7.40 — Solucionario 7-14, Problema 7.40 (U p. 231)

**Enunciado (traducido):** un bloque de 2,00 kg se empuja contra un resorte de masa despreciable y $k=400$ N/m, comprimiéndolo 0,220 m. Al soltarlo, se mueve por una superficie sin fricción, primero horizontal y luego en rampa de 37,0°. (a) ¿Qué rapidez tiene en el tramo horizontal tras separarse del resorte? (b) ¿Hasta dónde sube por la rampa antes de detenerse y volver?

**Solución**
1. Sin fricción: solo trabajan fuerzas conservativas (resorte y peso), $K_1+U_1=K_2+U_2$ (ec. 7.12, p. 213).
2. *(a)* Estado 1: reposo, $U_{el}=\tfrac12kx^2=\tfrac12(400)(0{,}220)^2=9{,}68$ J. Estado 2: resorte relajado, tramo horizontal. $\tfrac12kx^2=\tfrac12mv^2\Rightarrow v=x\sqrt{k/m}=0{,}220\sqrt{200}=3{,}11$ m/s.
3. *(b)* Estado 3: punto más alto, $v=0$. Toda la energía es gravitatoria: $\tfrac12kx^2=mgh\Rightarrow h=\dfrac{9{,}68}{(2{,}00)(9{,}80)}=0{,}494$ m de altura vertical.
4. Distancia recorrida a lo largo de la rampa: $L=h/\sin37{,}0^\circ=\dfrac{9{,}68}{(2{,}00)(9{,}80)(0{,}6018)}=0{,}821$ m.

**Resultado:** (a) 3,11 m/s; (b) sube 0,821 m por la rampa (0,494 m de altura).

**Receta:** sin fricción, encadena las conversiones: elástica → cinética → gravitatoria, $\tfrac12kx^2=\tfrac12mv^2=mgh$.

**Error típico:** confundir la altura alcanzada $h$ con la distancia sobre la rampa $L=h/\sin\theta$.

---

### E 7.24 — Solucionario 7-9, Problema 7.24 (U p. 230)

**Enunciado (traducido):** un bloque de 2,50 kg sobre un suelo horizontal está unido a un resorte horizontal inicialmente comprimido 0,0300 m, con $k=840$ N/m. Coeficiente de fricción cinética $\mu_k=0{,}40$. Se sueltan desde el reposo. ¿Qué rapidez tiene el bloque tras recorrer 0,0200 m (el resorte queda comprimido 0,0100 m)?

**Solución**
1. Fuerzas: resorte (conservativo, va en $U_{el}$), peso y normal (no trabajan, movimiento horizontal), fricción (no conservativa, va en $W_{otras}$).
2. $U_1=\tfrac12(840)(0{,}0300)^2=0{,}378$ J; $U_2=\tfrac12(840)(0{,}0100)^2=0{,}0420$ J. El bloque está unido al resorte, así que en el estado 2 sigue teniendo energía elástica.
3. $n=mg$, $W_f=-\mu_k mg\,s=-(0{,}40)(2{,}50)(9{,}8)(0{,}0200)=-0{,}196$ J.
4. Balance: $K_2=U_1+W_f-U_2=0{,}378-0{,}196-0{,}042=0{,}140$ J.
5. $v_2=\sqrt{2K_2/m}=\sqrt{2(0{,}140)/2{,}50}=0{,}335$ m/s. (Sin fricción serían 0,519 m/s.)

**Resultado:** $v=0{,}335$ m/s.

**Receta:** con resorte y fricción en horizontal: $\tfrac12mv_2^2=\tfrac12kx_1^2-\tfrac12kx_2^2-\mu_k mg\,s$, con $s=|x_1-x_2|$.

**Error típico:** escribir $\tfrac12k(x_1-x_2)^2$ en vez de $\tfrac12kx_1^2-\tfrac12kx_2^2$ (la energía elástica no es lineal en $x$).

---

### E 7.67 — Solucionario 7-25/7-26, Problema 7.67 (U p. 234)

**Enunciado (traducido):** un pez de 3,00 kg cuelga del extremo inferior de un resorte vertical de masa despreciable y $k=900$ N/m. Inicialmente el resorte no está estirado ni comprimido y el pez se suelta desde el reposo. (a) ¿Qué rapidez tiene tras descender 0,0500 m? (b) ¿Cuál es su rapidez máxima durante la bajada?

**Solución**
1. Solo trabajan peso y resorte (conservativos): $K+U_{grav}+U_{el}=\text{cte}$.
2. Llamamos $y$ a la distancia descendida (positiva hacia abajo). Entonces $U_{grav}$ baja $mgy$ y el resorte se estira $y$: $K(y)=mgy-\tfrac12ky^2$.
3. *(a)* $K(0{,}0500)=(3{,}00)(9{,}8)(0{,}0500)-\tfrac12(900)(0{,}0500)^2=1{,}470-1{,}125=0{,}345$ J $\Rightarrow v=\sqrt{2(0{,}345)/3{,}00}=0{,}480$ m/s.
4. *(b)* $K$ es máxima donde $dK/dy=0$: $mg-ky=0\Rightarrow y^*=mg/k=0{,}0327$ m. Es el punto de equilibrio: la fuerza neta es nula y el pez deja de acelerar (equivalente a $F=-dU/dy=0$ con $U$ total mínima, U §7.4-7.5, p. 221-225).
5. $K_{max}=mgy^*-\tfrac12ky^{*2}=\dfrac{(mg)^2}{2k}=0{,}480$ J $\Rightarrow v_{max}=0{,}566$ m/s.
6. *Comprobación:* $v_{max}>0{,}480$ m/s del apartado (a), como debe ser; el pez se detiene en $y=2y^*=0{,}0653$ m.

**Resultado:** (a) 0,480 m/s; (b) 0,566 m/s.

**Receta:** para la rapidez máxima, escribe $K$ en función de la posición y deriva: el máximo está donde la fuerza neta es cero.

**Error típico:** creer que la rapidez máxima está en el punto más bajo (allí $v=0$).

---

### E 7.65 — Solucionario 7-25, Problema 7.65 (U p. 233)

**Enunciado (traducido):** en un sistema de manejo de paquetes, una caja de 1,60 kg se coloca contra un resorte ligero comprimido 0,280 m, con $k=45{,}0$ N/m. Se suelta desde el reposo y se mueve sobre una superficie horizontal con $\mu_k=0{,}300$. Tras recorrer 0,280 m el resorte alcanza su longitud natural y la caja se separa. (a) ¿Rapidez al separarse? (b) ¿Rapidez máxima durante el movimiento?

**Solución**
1. Igual que E 7.24: $\tfrac12mv^2=U_{el,1}-U_{el,2}-\mu_k mg\,d$, con $d$ = distancia recorrida.
2. *(a)* $d=0{,}280$ m, $U_{el,2}=0$: $U_{el,1}=\tfrac12(45{,}0)(0{,}280)^2=1{,}764$ J; $W_f=-(0{,}300)(1{,}60)(9{,}8)(0{,}280)=-1{,}317$ J; $K=0{,}447$ J $\Rightarrow v=0{,}747$ m/s.
3. *(b)* En función de $d$: $v^2(d)=\dfrac2m\left[\tfrac12k x_0^2-\tfrac12k(x_0-d)^2-\mu_k mg\,d\right]$. Máximo: $\dfrac{d(v^2)}{dd}=0\Rightarrow k(x_0-d)=\mu_k mg$. Es decir, la rapidez es máxima cuando la fuerza del resorte iguala a la de fricción (aceleración nula).
4. Compresión en ese punto: $x_0-d=\mu_k mg/k=(0{,}300)(1{,}60)(9{,}8)/45{,}0=0{,}105$ m ($d=0{,}175$ m).
5. Sustituyendo: $v_{max}=0{,}931$ m/s. Después la fricción supera al resorte y la caja frena, por eso al separarse va a 0,747 m/s.

**Resultado:** (a) 0,747 m/s; (b) 0,931 m/s (cuando el resorte está comprimido 0,105 m).

**Receta:** con fricción, la rapidez máxima no está en la longitud natural del resorte sino donde $kx=f_k$.

**Error típico:** suponer que la rapidez máxima es la de separación del resorte, como en el caso sin fricción.

---

### E 7.9 — Solucionario 7-3, Problema 7.9 (U p. 229)

**Enunciado (traducido):** una piedra pequeña de 0,20 kg se suelta desde el reposo en el punto A, en el borde de un cuenco hemisférico de radio $R=0{,}50$ m. Desliza (no rueda) y la fricción realiza un trabajo de 0,22 J en módulo al ir de A al fondo B. (a) Entre A y B, ¿qué trabajo realizan (i) la normal y (ii) la gravedad? (b) ¿Rapidez en B? (c) ¿Cuáles de las tres fuerzas son constantes? (d) ¿Cuánto vale la normal en B?

**Solución**
1. *(a)(i)* La normal es radial y la velocidad tangente: $W_n=0$.
2. *(a)(ii)* Origen en B: $W_{grav}=U_A-U_B=mgR=(0{,}20)(9{,}8)(0{,}50)=0{,}98$ J (ec. 7.3, p. 204; vale para trayectoria curva, p. 209).
3. *(b)* Teorema trabajo-energía (ec. 6.6, p. 178): $W_{tot}=0+0{,}98-0{,}22=0{,}76$ J $=\tfrac12mv_B^2\Rightarrow v_B=\sqrt{2(0{,}76)/0{,}20}=2{,}76$ m/s (sin fricción: $\sqrt{2gR}=3{,}13$ m/s).
4. *(c)* Solo el peso es constante. La normal cambia en módulo y dirección (vale 0 en A, donde la velocidad es nula y la pared es vertical, y es máxima en B); la fricción $f_k=\mu_k n$ cambia con ella y además cambia de dirección.
5. *(d)* En B el movimiento es circular y la aceleración es centrípeta (hacia arriba), $a_{rad}=v_B^2/R$ (U §5.4, p. 151). $\sum F_y=n-mg=mv_B^2/R\Rightarrow n=m\left(g+\dfrac{v_B^2}{R}\right)=0{,}20\left(9{,}8+\dfrac{7{,}6}{0{,}50}\right)=0{,}20(9{,}8+15{,}2)=5{,}0$ N (2,6 veces el peso, 1,96 N).

**Resultado:** (a) 0 J y 0,98 J; (b) 2,76 m/s; (c) solo el peso; (d) $n=5{,}0$ N.

**Receta:** energía para la rapidez, y luego la segunda ley de Newton en dirección radial para la normal: $n-mg=mv^2/R$ en el fondo.

**Error típico:** poner $n=mg$ en el fondo (olvidar la aceleración centrípeta), o redondear $v_B$ antes de elevarlo al cuadrado: usa $v_B^2=2W_{tot}/m=7{,}6\ \mathrm{m^2/s^2}$ exacto.

---

### E 7.22 — Solucionario 7-8/7-9, Problema 7.22 (U p. 230)

**Enunciado (traducido):** (a) ¿Qué rapidez tiene el ascensor del ejemplo 7.9 (U p. 216) tras haber bajado 1,00 m desde el punto 1 de la figura 7.17? (b) ¿Qué aceleración tiene en ese momento?
*Datos del ejemplo 7.9:* ascensor de 2000 kg (peso 19 600 N), cae a 4,00 m/s al tocar un resorte amortiguador; un freno de seguridad aplica una fricción constante de 17 000 N; el resorte lo detiene tras comprimirse 2,00 m, de donde el ejemplo obtiene $k=1{,}06\times10^4$ N/m.

**Solución**
0. *(Comprobación de $k$.)* Del ejemplo: $16\,000-17\,000(2{,}00)=-39\,200+\tfrac12k(2{,}00)^2\Rightarrow k=10\,600$ N/m. ✓
1. *Estados.* 1: contacto con el resorte, $y_1=0$, $v_1=4{,}00$ m/s, resorte sin comprimir. 2: $y_2=-1{,}00$ m.
2. $K_1=\tfrac12(2000)(4{,}00)^2=16\,000$ J; $U_1=0$.
3. $W_{otras}=-f\,|y_2|=-17\,000$ J (fricción opuesta al movimiento hacia abajo).
4. $U_2=mgy_2+\tfrac12ky_2^2=-19\,600+5300=-14\,300$ J.
5. Balance (ec. 7.14): $16\,000-17\,000=K_2-14\,300\Rightarrow K_2=13\,300$ J $\Rightarrow v_2=\sqrt{2(13\,300)/2000}=3{,}65$ m/s.
6. *(b)* Fuerzas en ese instante (positivo hacia arriba): fricción $+17\,000$ N (el ascensor baja, la fricción sube), resorte $+ky=+10\,600$ N, peso $-19\,600$ N. $\sum F=8000$ N $\Rightarrow a=8000/2000=4{,}00\ \mathrm{m/s^2}$ hacia arriba.
7. *Interpretación:* velocidad hacia abajo y aceleración hacia arriba: el ascensor está frenando.

**Resultado:** (a) 3,65 m/s; (b) 4,00 m/s² hacia arriba.

**Receta:** energía para la rapidez en una posición intermedia; Newton (suma de fuerzas en ese instante) para la aceleración, que la energía no da directamente.

**Error típico:** olvidar que $U_{grav}$ es negativa por debajo del origen, o dar a la fricción el mismo sentido que el movimiento.

---

### E 7.73 — Solucionario 7-28, Problema 7.73 (U p. 234)

**Enunciado (traducido):** un bloque de madera de 1,50 kg se coloca contra un resorte comprimido en la base de una pendiente de 30,0° (punto A). Al soltarse, sube; en B, 6,00 m pendiente arriba, lleva 7,00 m/s hacia arriba y ya no toca el resorte. $\mu_k=0{,}50$; resorte de masa despreciable. Calcule la energía potencial almacenada inicialmente en el resorte.

**Solución:** es exactamente el problema X3 (Examen Febrero 2022, 2ª semana, P-1). Con $g=9{,}80$: $K_B=36{,}75$ J, $U_{grav,B}=44{,}10$ J, $|W_f|=38{,}19$ J, $U_{el,A}=119$ J. Comprobación de coherencia: $U_{el}$ tiene que ser positiva (lo es); parte de ella se disipa por fricción y el resto pasa a $K$ y a $U_{grav}$.

**Resultado:** $U_{el,A}=119$ J.

**Receta y error típico:** los de X3.

---

## Resumen de resultados (verificados con sympy)

| Ejercicio | Resultado |
|---|---|
| X Sept 2023 P-2 | (a) $\mu_k=0{,}276$; (b) $W_f^{AB}=-3{,}53$ J (−3,54 J con $g=9{,}81$) |
| X Feb 2020 2ª P-1 | $\mu_k=0{,}749$ |
| X Feb 2022 2ª P-1 (= E 7.73) | $U_{el}=119$ J |
| X Sept 2024 P-1 | $U_{el}=84{,}8$ J ($g=9{,}81$) |
| E 7.6 | $v=\sqrt{2gd\sin\alpha}$ |
| E 7.40 | (a) 3,11 m/s; (b) 0,821 m por la rampa (0,494 m de altura) |
| E 7.24 | 0,335 m/s |
| E 7.67 | (a) 0,480 m/s; (b) 0,566 m/s en $y=0{,}0327$ m |
| E 7.65 | (a) 0,747 m/s; (b) 0,931 m/s con compresión 0,105 m |
| E 7.9 | (a) 0 y 0,98 J; (b) 2,76 m/s; (c) solo el peso es constante; (d) $n=5{,}0$ N |
| E 7.22 | (a) 3,65 m/s; (b) 4,00 m/s² hacia arriba |

Ningún examen de los utilizados incluye solución oficial en las fuentes disponibles, por lo que no hay cifras de examen con que contrastar; todos los resultados son de cálculo propio verificado.
