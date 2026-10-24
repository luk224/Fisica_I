# Soluciones Tema 9 — Rotación de cuerpos rígidos

Material para el redactor del tema 9. Todos los números se han comprobado con sympy (script de verificación propio). El enunciado de examen se ha leído en `fuentes_txt/examenes/E689010160-25F2.txt`; los enunciados de U, en `sears.txt` (págs. impresas 295–298); las páginas «cap-pág» del solucionario se han confirmado en `solman.txt` (la página 9-N está en el PDF 297+N). Los problemas E están traducidos y ampliados (no son copia del solucionario).

**Ejercicios de examen (X) de este tema:** solo hay **uno**, y es una **cuestión corta de teoría**, no un problema: Examen Febrero 2025 (2ª semana), P-3 Teoría Opción A, cuestiones (a) y (b). En `examenes_por_tema.md` aparece catalogada bajo el Tema 10 (el tema que se pide desarrollar, «Trabajo y potencia en un movimiento de rotación», es del cap. 10 de U), pero la cuestión (b) es cinemática de rotación pura (U §9.3) y la (a) se razona con el momento de inercia (U §9.4) y la energía de rodadura (U §10.3). Ningún **problema** de examen (3 puntos) de los 16 exámenes revisados es de Tema 9 puro: los de rotación son de dinámica (Tema 10). Por eso el grueso del material de práctica son los 10 problemas de E.

Convenciones: $g = 9{,}8\ \text{m/s}^2$; «U p. NN» = página impresa del Sears-Zemansky; ángulos siempre en radianes en las fórmulas que mezclan magnitudes lineales y angulares.

Referencias de teoría que se usan:

| Herramienta | Dónde |
|---|---|
| Radián: $\theta = s/r$ (9.1); 1 rev $=2\pi$ rad | U §9.1 p. 274 |
| Velocidad angular media e instantánea (9.2)–(9.3) | U §9.1 p. 275 |
| Aceleración angular media e instantánea (9.4)–(9.6); signos de $\omega_z$ y $\alpha_z$ (se acelera / frena) | U §9.1 p. 277 |
| Rotación con $\alpha_z$ constante (9.7), (9.10), (9.11), (9.12); tabla 9.1 | U §9.2 pp. 278–279 |
| $v = r\omega$ (9.13), $a_{tan}=r\alpha$ (9.14), $a_{rad}=v^2/r=\omega^2 r$ (9.15) | U §9.3 p. 281 |
| Momento de inercia $I=\sum m_i r_i^2$ (9.16); $K=\tfrac12 I\omega^2$ (9.17) | U §9.4 p. 284 |
| Tabla 9.2 de momentos de inercia | U §9.4 p. 286 |
| $U = Mg\,y_{cm}$ (9.18) | U §9.4 p. 288 |
| Teorema de los ejes paralelos $I_P = I_{cm}+Md^2$ (9.19) | U §9.5 p. 288 |
| $I = \int r^2\,dm$ (9.20) | U §9.6 p. 290 |
| Movimiento circular uniforme: $a_{rad}=v^2/R$ (3.27) hacia el centro | U §3.4 pp. 83–84 |
| MRUA: $x-x_0=\tfrac12(v_{0x}+v_x)t$ (2.14) | U §2.4 p. 47 |
| Conservación de la energía con $W_{otras}$ (7.4)/(7.7) | U §7.1 pp. 205–207 |
| Energía cinética de rodadura $K=\tfrac12Mv_{cm}^2+\tfrac12 I_{cm}\omega^2$ (10.8); carrera de cuerpos rodantes (Ej. 10.5) | U §10.3 pp. 310–312 |

---

## PARTE A — Cuestión de examen (X)

### X1. Examen Febrero 2025 (2ª semana), P-3 Teoría Opción A, cuestiones (a) y (b)

Fuente: `fuentes_txt/examenes/E689010160-25F2.txt` (examen `E689010160-25F2.pdf`), pregunta P-3, Teoría Opción A (4 puntos en total, junto con el desarrollo del tema «Trabajo y potencia en un movimiento de rotación», que es materia del Tema 10, U §10.4 pp. 315–316, y no se desarrolla aquí). El mismo enunciado aparece en los dos recopilatorios.

**Enunciado (literal, con las tildes corregidas).**
(a) Se pretende fabricar un carro de cuatro ruedas destinado a circular en una carrera con una pendiente cuesta abajo con el objetivo de que circule lo más rápido posible. Considerando invariable el coeficiente de fricción entre las ruedas y la carretera y que la masa total del carro no se verá influenciada por el tamaño de las ruedas. Desarrolle de forma razonada por qué opción optaría en cada uno de los siguientes casos: (1) Utilizar unas ruedas grandes y pesadas o unas ruedas pequeñas y ligeras. (2) Utilizar unas ruedas sólidas o unas ruedas con radios.
(b) Un volante gira con velocidad angular constante. Un punto situado en el borde del mismo, ¿tiene aceleración tangencial? ¿Y aceleración radial? ¿Tienen estas aceleraciones una magnitud constante? ¿Y una dirección constante? Justifique las respuestas en cada caso.

Se resuelve primero (b), que es Tema 9 puro y más fácil.

**Solución (b) — punto del borde de un volante con $\omega$ constante.**

1. **Datos de partida.** «Velocidad angular constante» significa $\omega_z = $ cte, luego $\alpha_z = d\omega_z/dt = 0$ (definición de aceleración angular, U ec. 9.5 p. 277). Sea $R$ el radio del volante.
2. **Aceleración tangencial.** La componente tangencial mide cómo cambia la **rapidez** del punto: $a_{tan} = dv/dt = R\alpha$ (U ec. 9.14 p. 281). Como $\alpha=0$: $a_{tan}=0$. **No tiene aceleración tangencial** (la rapidez $v = R\omega$ no cambia).
3. **Aceleración radial.** La componente radial mide cómo cambia la **dirección** de la velocidad: $a_{rad} = v^2/R = \omega^2 R$ (U ec. 9.15 p. 281). Como $\omega\neq 0$, $a_{rad}\neq0$: **sí tiene aceleración radial** (centrípeta). Sin ella el punto seguiría en línea recta, no en círculo.
4. **Magnitudes.** $a_{tan}=0$ es trivialmente constante. $a_{rad}=\omega^2R$ es constante porque $\omega$ y $R$ lo son (el punto es del sólido rígido, $R$ fijo).
5. **Direcciones.** $\vec a_{rad}$ apunta siempre **hacia el eje** (U p. 281; MCU U §3.4 p. 83). Al girar el punto, la dirección «hacia el centro» gira con él: **la dirección de $\vec a_{rad}$ no es constante**; da una vuelta completa en cada revolución. (La tangencial, al ser nula, no tiene dirección que discutir.)
6. **Comprobación (sympy).** Con $\vec r=(R\cos\omega t,\ R\sin\omega t)$: $|\vec v|=\omega R$, $\vec a=-\omega^2\vec r$ (antiparalela a $\vec r$), $|\vec a|=\omega^2R$ y $\vec a\cdot\vec v=0$ (no hay componente a lo largo de la velocidad).

**Resultado (b):** $a_{tan}=0$; $a_{rad}=\omega^2R\neq0$, de módulo constante y dirección variable (siempre hacia el eje). Es un movimiento circular uniforme: velocidad de módulo constante pero **acelerado**.

**Solución (a) — carro que baja una pendiente.**

1. **Qué decide la rapidez.** Rodar sin deslizar significa que el punto de contacto de cada rueda está instantáneamente en reposo: el rozamiento estático no realiza trabajo y la energía mecánica se conserva (U §10.3 p. 312, Ej. 10.5). Al bajar una altura $h$, $Mgh$ se reparte entre traslación del carro y rotación de las ruedas (U ec. 10.8 p. 310).
2. **Planteamiento.** Carro de masa total $M$ (incluye las ruedas), 4 ruedas de masa $m_r$ y radio $r$, cada una con $I = c\,m_r r^2$ ($c=\tfrac12$ disco macizo, $c\approx1$ si la masa está en la llanta; U tabla 9.2 p. 286). Rodadura sin deslizar: $\omega = v/r$ (U ec. 9.13 p. 281 aplicada al punto de contacto).
3. **Energía cinética total.** $K = \tfrac12Mv^2 + 4\cdot\tfrac12\,(c\,m_r r^2)\left(\tfrac{v}{r}\right)^2 = \tfrac12\left(M + 4c\,m_r\right)v^2$. **El radio $r$ se simplifica.**
4. **Rapidez tras bajar $h$.** $Mgh = \tfrac12(M+4c\,m_r)v^2 \Rightarrow v = \sqrt{\dfrac{2gh}{1+4c\,m_r/M}}$ (comprobado con sympy). Es el mismo resultado que el Ej. 10.5 de U para un cuerpo que rueda, generalizado a un carro.
5. **Caso (1).** Con $M$ fija, $v$ es mayor cuanto menor sea $c\,m_r$: la energía «invertida» en hacer girar las ruedas no se usa para trasladar el carro. El tamaño en sí no influye (se ha simplificado $r$), pero sí la masa: **ruedas pequeñas y ligeras** (lo que cuenta es «ligeras»).
6. **Caso (2).** Para la misma masa de rueda, una rueda de radios concentra la masa en la llanta, lejos del eje ($c\to1$, como un aro, $I=m_rr^2$), mientras que la maciza tiene $c=\tfrac12$ (disco, $I=\tfrac12 m_rr^2$). Menor $c$ ⇒ menos energía de rotación ⇒ más rapidez: **ruedas sólidas** (a igual masa). Si la de radios fuese mucho más ligera, habría que comparar el producto $c\,m_r$.

**Resultado (a):** (1) ruedas pequeñas y ligeras (el radio no importa; la masa de las ruedas sí); (2) ruedas sólidas, porque a igual masa tienen menor momento de inercia relativo ($c=\tfrac12$ frente a $c\approx1$).

**Receta.** (b) Separa siempre la aceleración de un punto que gira en $a_{tan}=r\alpha$ (cambio de rapidez) y $a_{rad}=\omega^2r$ (cambio de dirección); con $\omega$ constante solo queda la radial, que gira con el punto. (a) Para «¿qué rueda/objeto baja más rápido?», escribe $K=\tfrac12Mv^2+\tfrac12I\omega^2$ con $\omega=v/r$, pon $I=c\,mr^2$ y mira qué parámetros sobreviven: el que tenga menor $c\,m$ gana.

**Error típico.** Decir que «con velocidad angular constante no hay aceleración»: confunde rapidez constante con velocidad (vector) constante. En (a), elegir ruedas grandes «porque recorren más por vuelta» (el radio se simplifica) o pensar que el rozamiento frena al carro (en rodadura sin deslizar no hace trabajo).

Teoría: U §9.1 p. 277, §9.3 p. 281, §3.4 p. 83; §9.4 p. 286 (tabla 9.2); §10.3 pp. 310–312 (ec. 10.8, Ej. 10.5).

---

## PARTE B — Problemas del solucionario (E), traducidos y ampliados, de más fácil a más difícil

### E1. Problema 9.11 — Aspas de una licuadora (Solucionario 9-4)

**Enunciado (U p. 295).** Las aspas de una licuadora giran con aceleración angular constante de 1,50 rad/s². a) ¿Cuánto tiempo tardan en alcanzar una velocidad angular de 36,0 rad/s partiendo del reposo? b) ¿Cuántas revoluciones giran las aspas en ese tiempo?

**Solución.**

1. **Tipo de movimiento.** $\alpha_z$ constante ⇒ valen las ecuaciones de la rotación con aceleración angular constante (U §9.2 pp. 278–279), análogas a las del MRUA. Datos: $\omega_{0z}=0$, $\omega_z=36{,}0$ rad/s, $\alpha_z=1{,}50$ rad/s².
2. **a) Tiempo.** La ecuación que relaciona $\omega$, $\alpha$ y $t$ es (9.7): $\omega_z=\omega_{0z}+\alpha_z t$ ⇒ $t = \dfrac{36{,}0-0}{1{,}50} = $ **24,0 s**.
3. **b) Ángulo girado.** Con (9.11): $\theta-\theta_0 = \omega_{0z}t+\tfrac12\alpha_z t^2 = \tfrac12(1{,}50)(24{,}0)^2 = 432$ rad.
4. **Paso a revoluciones.** 1 rev $=2\pi$ rad (U p. 274): $432/(2\pi) = $ **68,8 rev**.
5. **Comprobación independiente** con (9.10): $\theta-\theta_0=\tfrac12(\omega_{0z}+\omega_z)t=\tfrac12(36{,}0)(24{,}0)=432$ rad. Coincide.

**Resultado:** 24,0 s; 68,8 rev.

**Receta.** Rotación con $\alpha$ constante = MRUA con $x\to\theta$, $v\to\omega$, $a\to\alpha$ (tabla 9.1). Lista los datos, elige la ecuación que contiene la incógnita y no contiene lo que no sabes; comprueba con otra.

**Error típico.** Dar 432 como «revoluciones» (son radianes) o dividir entre 360 en lugar de entre $2\pi$.

Teoría: U §9.2 pp. 278–279 (ecs. 9.7, 9.10, 9.11).

---

### E2. Problema 9.8 — Rueda cuya velocidad angular cambia de signo (Solucionario 9-3)

**Enunciado (U p. 295).** Una rueda gira en torno a un eje en la dirección $z$. Su velocidad angular $\omega_z$ es −6,00 rad/s en $t=0$, aumenta linealmente con el tiempo y vale +4,00 rad/s en $t=7{,}00$ s. El giro antihorario se considera positivo. a) ¿La aceleración angular en ese intervalo es positiva o negativa? b) ¿Durante qué intervalo aumenta la rapidez de la rueda? ¿Y durante cuál disminuye? c) Determine el desplazamiento angular de la rueda en $t=7{,}00$ s.

**Solución.**

1. **«Aumenta linealmente» ⇒ $\alpha_z$ constante**, porque $\alpha_z=d\omega_z/dt$ (U ec. 9.5 p. 277) es la pendiente de la recta $\omega_z(t)$.
2. **a)** $\alpha_z=\dfrac{\Delta\omega_z}{\Delta t}=\dfrac{4{,}00-(-6{,}00)}{7{,}00}=1{,}43$ rad/s² (exactamente 10/7). **Positiva**: $\omega_z$ crece de −6 a +4.
3. **Ley de $\omega_z$.** $\omega_z(t) = -6{,}00 + 1{,}429\,t$ (U ec. 9.7). Se anula en $t = 6{,}00/1{,}429 = $ **4,20 s**.
4. **b) Rapidez = $|\omega_z|$.** Regla de U p. 277: si $\omega_z$ y $\alpha_z$ tienen **signos opuestos**, la rotación frena; si tienen el **mismo signo**, se acelera.
   - $0<t<4{,}20$ s: $\omega_z<0$, $\alpha_z>0$ ⇒ la rapidez **disminuye** (de 6 a 0 rad/s).
   - $4{,}20<t<7{,}00$ s: $\omega_z>0$, $\alpha_z>0$ ⇒ la rapidez **aumenta** (de 0 a 4 rad/s).
5. **c) Desplazamiento angular.** Con $\alpha$ constante, la velocidad angular media es la semisuma: $\omega_{med}=\tfrac12(-6{,}00+4{,}00)=-1{,}00$ rad/s, y $\Delta\theta=\omega_{med}\,t = $ **−7,00 rad** (U ec. 9.10 p. 278).
6. **Interpretación.** La rueda gira primero en sentido horario hasta $\theta=-12{,}6$ rad (en $t=4{,}20$ s) y luego vuelve 5,6 rad en sentido antihorario: neto −7,00 rad. El desplazamiento no es el ángulo total recorrido (18,2 rad).

**Resultado:** a) positiva, 1,43 rad/s²; b) frena de 0 a 4,20 s, acelera de 4,20 a 7,00 s; c) −7,00 rad.

**Receta.** Para saber si un giro se acelera o frena no mires el signo de $\alpha_z$ solo: compara los signos de $\omega_z$ y $\alpha_z$. El instante de parada sale de $\omega_z(t)=0$.

**Error típico.** Decir que «como $\alpha>0$, la rueda siempre acelera»; o calcular el ángulo con valores absolutos (sumar 6 y 4).

Teoría: U §9.1 p. 277; §9.2 pp. 278–279 (ecs. 9.7, 9.10).

---

### E3. Problema 9.58 — Rodillo de una imprenta, $\theta(t)=\gamma t^2-\beta t^3$ (Solucionario 9-17)

**Enunciado (U p. 298).** El rodillo de una imprenta gira un ángulo $\theta(t)=\gamma t^2-\beta t^3$, con $\gamma=3{,}20$ rad/s² y $\beta=0{,}500$ rad/s³. a) Calcule la velocidad angular del rodillo en función del tiempo. b) Calcule su aceleración angular en función del tiempo. c) ¿Cuál es la máxima velocidad angular positiva que alcanza, y en qué instante?

**Solución.**

1. **Aquí $\alpha$ NO es constante** ($\theta$ tiene un término en $t^3$), así que no valen las ecuaciones 9.7–9.12: hay que derivar (definiciones, U ecs. 9.3 p. 275 y 9.5 p. 277).
2. **a)** $\omega_z=\dfrac{d\theta}{dt}=2\gamma t-3\beta t^2 = (6{,}40\ \text{rad/s}^2)\,t-(1{,}50\ \text{rad/s}^3)\,t^2$.
3. **b)** $\alpha_z=\dfrac{d\omega_z}{dt}=2\gamma-6\beta t = 6{,}40\ \text{rad/s}^2-(3{,}00\ \text{rad/s}^3)\,t$.
4. **c) Máximo de $\omega_z$.** Un máximo de una función derivable está donde su derivada se anula: $\alpha_z=0$ ⇒ $t^*=\dfrac{2\gamma}{6\beta}=\dfrac{\gamma}{3\beta}=\dfrac{32}{15}=$ **2,13 s**. Es máximo (no mínimo) porque $\alpha_z$ pasa de positiva a negativa ($d\alpha_z/dt=-6\beta<0$).
5. **Valor.** $\omega_z(t^*)=6{,}40(2{,}133)-1{,}50(2{,}133)^2 = 512/75 = $ **6,83 rad/s**.
6. **Qué pasa después.** $\omega_z$ se anula en $t=64/15=4{,}27$ s y luego se hace negativa y cada vez mayor en valor absoluto ($\omega_z\to-\infty$). Por eso el enunciado pide la máxima velocidad angular **positiva**: no es la máxima rapidez.

**Resultado:** a) $\omega_z=6{,}40t-1{,}50t^2$ (rad/s); b) $\alpha_z=6{,}40-3{,}00t$ (rad/s²); c) 6,83 rad/s en $t=2{,}13$ s.

**Receta.** Si te dan $\theta(t)$ no polinómica de grado ≤ 2, deriva: $\omega=\dot\theta$, $\alpha=\ddot\theta$. Extremos de $\omega$ ⇔ $\alpha=0$.

**Error típico.** Aplicar $\omega=\omega_0+\alpha t$ con un $\alpha$ «fijo» cuando $\alpha$ depende del tiempo.

Teoría: U §9.1 pp. 275–277 (ecs. 9.3, 9.5).

---

### E4. Problema 9.25 — Centrifugador: ¿es verosímil el anuncio? (Solucionario 9-8)

**Enunciado (U p. 296).** En un anuncio se asegura que un centrifugador solo ocupa 0,127 m de espacio en una mesa de trabajo, pero que puede producir una aceleración radial de $3000g$ a 5000 rpm. Calcule el radio que debe tener el centrifugador. ¿Es verosímil el anuncio?

**Solución.**

1. **Qué ley usar.** Un punto a distancia $r$ del eje que gira con $\omega$ tiene $a_{rad}=\omega^2 r$ (U ec. 9.15 p. 281). La incógnita es $r$.
2. **Pasar $\omega$ a rad/s.** Obligatorio: la ec. 9.15 mezcla magnitudes lineales y angulares (U p. 282, «CUIDADO»). $\omega = 5000\ \tfrac{\text{rev}}{\text{min}}\cdot\tfrac{1\ \text{min}}{60\ \text{s}}\cdot\tfrac{2\pi\ \text{rad}}{1\ \text{rev}} = 523{,}6$ rad/s.
3. **Aceleración pedida.** $a_{rad}=3000(9{,}8)=29\,400$ m/s².
4. **Radio.** $r=a_{rad}/\omega^2 = 29\,400/(523{,}6)^2 = $ **0,107 m**.
5. **Interpretación.** Un aparato de radio 0,107 m ocupa un círculo de diámetro **0,214 m**, mayor que los 0,127 m anunciados: **el anuncio no es verosímil**. Visto al revés: con $r=0{,}0635$ m (diámetro 0,127 m) a 5000 rpm solo se llega a $a_{rad}\approx1780$ m/s² ≈ $181g$.

**Resultado:** $r=0{,}107$ m; el anuncio no es creíble.

**Receta.** Problemas de «aceleración en $g$» con rpm: (1) rpm → rad/s multiplicando por $2\pi/60$; (2) $a_{rad}=\omega^2r$; (3) compara diámetro, no radio, con el espacio disponible.

**Error típico.** Usar $\omega=5000$ (rpm) directamente o $\omega$ en rev/s ($83{,}3$): el radio saldría un factor $(60/2\pi)^2$ o $(2\pi)^2$ mal.

Teoría: U §9.1 p. 275 (conversión rpm); §9.3 pp. 281–282 (ec. 9.15).

---

### E5. Problema 9.23 — Aceleraciones de un punto del borde de un volante (Solucionario 9-7)

**Enunciado (U p. 296).** Un volante de radio 0,300 m parte del reposo y acelera con aceleración angular constante de 0,600 rad/s². Calcule la magnitud de las aceleraciones tangencial y radial, así como de la aceleración resultante, de un punto de su borde a) al principio; b) después de girar 60,0°; c) después de girar 120,0°.

**Solución.**

1. **Componentes.** Un punto del borde tiene $a_{tan}=r\alpha$ y $a_{rad}=\omega^2r$ (U ecs. 9.14–9.15 p. 281), **perpendiculares** entre sí (una tangente al círculo, otra hacia el centro). Por tanto $a=\sqrt{a_{tan}^2+a_{rad}^2}$.
2. **$a_{tan}$ es la misma en los tres casos**, porque $\alpha$ es constante: $a_{tan}=(0{,}300)(0{,}600)=0{,}180$ m/s².
3. **$\omega$ en función del ángulo girado.** No nos dan tiempos sino ángulos, así que usamos la ecuación sin $t$ (U ec. 9.12 p. 279): $\omega^2=\omega_0^2+2\alpha\,\Delta\theta=2\alpha\,\Delta\theta$, con $\Delta\theta$ **en radianes**. Entonces $a_{rad}=\omega^2 r=2\alpha\,\Delta\theta\,r = 2\,a_{tan}\,\Delta\theta$.
4. **a) Al principio** ($\omega=0$): $a_{rad}=0$, $a=a_{tan}=$ **0,180 m/s²**.
5. **b) $\Delta\theta=60{,}0°=\pi/3=1{,}047$ rad:** $\omega=\sqrt{2(0{,}600)(1{,}047)}=1{,}121$ rad/s; $a_{rad}=(0{,}300)(1{,}121)^2=0{,}377$ m/s²; $a=\sqrt{0{,}180^2+0{,}377^2}=$ **0,418 m/s²**.
6. **c) $\Delta\theta=120{,}0°=2\pi/3=2{,}094$ rad:** $\omega=1{,}585$ rad/s; $a_{rad}=0{,}754$ m/s² (el doble que en b, porque $a_{rad}\propto\Delta\theta$); $a=\sqrt{0{,}180^2+0{,}754^2}=$ **0,775 m/s²**.

**Resultado:** $a_{tan}=0{,}180$ m/s² siempre; $a_{rad}=0$; 0,377; 0,754 m/s²; $a=0{,}180$; 0,418; 0,775 m/s².

**Receta.** Punto de un cuerpo que gira con $\alpha$ constante: $a_{tan}$ fija, $a_{rad}$ crece con $\omega^2$; si el dato es un ángulo, usa $\omega^2=\omega_0^2+2\alpha\Delta\theta$ (en rad). Suma las componentes con Pitágoras porque son perpendiculares.

**Error típico.** Meter $\Delta\theta=60$ (grados) en $\omega^2=2\alpha\Delta\theta$, o sumar $a_{tan}+a_{rad}$ como escalares.

Teoría: U §9.2 p. 279 (ec. 9.12); §9.3 p. 281 (ecs. 9.14–9.15).

---

### E6. Problemas 9.30 y 9.31 — Momento de inercia de masas puntuales y de varilla con esferas (Solucionario 9-10)

**Enunciado 9.30 (U p. 296).** Bloques pequeños de masa $m$ están sujetos en los extremos y en el centro de una varilla de longitud $L$ y masa despreciable. Calcule el momento de inercia del sistema alrededor de un eje perpendicular a la varilla que pasa por a) el centro de la varilla; b) un punto a un cuarto de su longitud desde un extremo.

**Enunciado 9.31 (U p. 296).** Dos esferas pequeñas, de 0,300 kg cada una (tratables como masas puntuales), están pegadas a los extremos de una barra uniforme de 2,00 m de longitud y 4,00 kg. Calcule el momento de inercia del conjunto respecto a: a) un eje perpendicular a la barra por su centro; b) un eje perpendicular a la barra que pasa por una de las esferas; c) un eje paralelo a la barra que pasa por ambas esferas; d) un eje paralelo a la barra a 0,500 m de ella.

**Solución 9.30.**

1. **Definición.** Para masas puntuales $I=\sum m_i r_i^2$, con $r_i$ = distancia **perpendicular al eje** (U ec. 9.16 p. 284). La varilla no cuenta (masa despreciable).
2. **a) Eje por el centro.** Distancias: $L/2$, 0, $L/2$. $I=m(L/2)^2+0+m(L/2)^2=$ **$\tfrac12 mL^2$**.
3. **b) Eje a $L/4$ de un extremo.** Distancias: $L/4$ (extremo cercano), $L/4$ (centro), $3L/4$ (extremo lejano). $I=m\tfrac{L^2}{16}+m\tfrac{L^2}{16}+m\tfrac{9L^2}{16}=$ **$\tfrac{11}{16}mL^2$**.
4. **Comprobación con ejes paralelos** (U ec. 9.19 p. 288): el CM está en el centro y es el eje de a), con masa total $3m$ y $d=L/4$: $I=\tfrac12mL^2+3m\tfrac{L^2}{16}=\tfrac{11}{16}mL^2$. Coincide.

**Solución 9.31** ($M=4{,}00$ kg, $L=2{,}00$ m, $m=0{,}300$ kg).

1. **Principio.** El momento de inercia es aditivo: $I_{total}=I_{barra}+I_{esferas}$, cada uno respecto al **mismo** eje (U ec. 9.16 es una suma).
2. **a)** Barra por el centro: $\tfrac1{12}ML^2$ (tabla 9.2a, p. 286); esferas a $L/2$: $2m(L/2)^2$. $I=\tfrac1{12}(4)(4)+2(0{,}3)(1)^2=1{,}333+0{,}600=$ **1,93 kg·m²**.
3. **b)** Barra por un extremo: $\tfrac13ML^2$ (tabla 9.2b); la esfera del eje aporta 0, la otra $mL^2$. $I=\tfrac13(4)(4)+0{,}3(4)=5{,}333+1{,}200=$ **6,53 kg·m²**. Comprobación por ejes paralelos: $1{,}933+(4{,}60)(1{,}00)^2=6{,}53$ ✓.
4. **c)** Eje a lo largo de la barra: todas las masas están sobre el eje ($r_i=0$; barra y esferas «delgadas»): **$I=0$**.
5. **d)** Eje paralelo a la barra a 0,500 m: **todas** las masas están a la misma distancia $d=0{,}500$ m. $I=(M+2m)d^2=(4{,}60)(0{,}25)=$ **1,15 kg·m²**.

**Resultado:** 9.30: $\tfrac12mL^2$; $\tfrac{11}{16}mL^2$. 9.31: 1,93; 6,53; 0; 1,15 kg·m².

**Receta.** $I$ de un conjunto = suma de los $I$ de cada pieza respecto al mismo eje: masas puntuales con $mr^2$, cuerpos con la tabla 9.2, trasladados con $I_{cm}+Md^2$ si su eje no pasa por su CM.

**Error típico.** Usar como $r$ la distancia al «punto» del eje en lugar de la distancia perpendicular a la recta del eje; olvidar que $I$ cambia con el eje (el mismo objeto da 1,93, 6,53, 0 y 1,15 kg·m²).

Teoría: U §9.4 pp. 284–286 (ec. 9.16, tabla 9.2); §9.5 p. 288 (ec. 9.19).

---

### E7. Problema 9.35 — Disco compuesto: disco macizo + anillo (Solucionario 9-11)

**Enunciado (U p. 296).** Un disco compuesto de 140,0 cm de diámetro exterior está formado por un disco sólido uniforme de 50,0 cm de radio y densidad superficial 3,00 g/cm², rodeado por un anillo concéntrico de radio interior 50,0 cm y radio exterior 70,0 cm, de densidad superficial 2,00 g/cm². Calcule su momento de inercia respecto a un eje perpendicular a su plano que pasa por su centro.

**Solución.**

1. **Dividir en piezas.** $I = I_{disco}+I_{anillo}$ (aditividad, U ec. 9.16). Tabla 9.2 (p. 286): disco macizo $\tfrac12 m R^2$ (caso f); anillo grueso $\tfrac12 m(R_1^2+R_2^2)$ (caso e, el «cilindro hueco» de espesor cualquiera vale para una lámina, porque la longitud axial no interviene).
2. **Unidades SI.** $3{,}00$ g/cm² $=30{,}0$ kg/m²; $2{,}00$ g/cm² $=20{,}0$ kg/m² (1 g/cm² = $10^{-3}$ kg / $10^{-4}$ m² = 10 kg/m²).
3. **Masas = densidad × área.** Disco: $m_d=30{,}0\cdot\pi(0{,}500)^2=23{,}56$ kg. Anillo: $m_a=20{,}0\cdot\pi(0{,}700^2-0{,}500^2)=15{,}08$ kg.
4. **Momentos.** $I_d=\tfrac12(23{,}56)(0{,}500)^2=2{,}945$ kg·m². $I_a=\tfrac12(15{,}08)(0{,}500^2+0{,}700^2)=5{,}579$ kg·m².
5. **Total.** $I=2{,}945+5{,}579=$ **8,52 kg·m²**.
6. **Interpretación.** El anillo tiene menos masa que el disco y, sin embargo, más momento de inercia: su masa está más lejos del eje, y $I$ crece con $r^2$ (U p. 284).

**Resultado:** $I=8{,}52$ kg·m².

**Receta.** Cuerpos compuestos coaxiales: masa de cada pieza = densidad × área (o volumen), $I$ de cada una con la tabla 9.2 y suma. Un hueco se puede tratar también como «disco grande menos disco pequeño».

**Error típico.** Escribir el anillo como $\tfrac12m(R_2^2-R_1^2)$ (es suma, no resta) o no pasar g/cm² a kg/m².

Teoría: U §9.4 pp. 284–286 (ec. 9.16, tabla 9.2 casos e y f).

---

### E8. Problema 9.52 — Varilla doblada en ángulo recto (Solucionario 9-15)

**Enunciado (U p. 297).** Una varilla delgada uniforme de masa $M$ y longitud $L$ se dobla por su centro de manera que los dos segmentos quedan perpendiculares entre sí. Determine el momento de inercia respecto a un eje perpendicular a su plano que pasa por a) el punto donde se cruzan los dos segmentos; b) el punto medio de la recta que une los dos extremos.

**Solución.** Cada segmento es una varilla de masa $M/2$ y longitud $L/2$. Coloca el vértice en el origen y los segmentos sobre los ejes: extremos en $(L/2,0)$ y $(0,L/2)$.

1. **a) Eje por el vértice.** Cada segmento gira alrededor de **su extremo**: $I_s=\tfrac13\tfrac{M}{2}\left(\tfrac{L}{2}\right)^2=\tfrac1{24}ML^2$ (tabla 9.2b, p. 286). Que el otro segmento esté a 90° da igual: la distancia de cada elemento al eje (perpendicular al plano) es su distancia al vértice. $I_a=2I_s=$ **$\tfrac1{12}ML^2$**.
2. **b) Eje por el punto medio de la hipotenusa**, $P=(L/4,\,L/4)$. El CM del segmento horizontal está en $(L/4,0)$, a distancia $d=L/4$ de $P$ (igual para el vertical, por simetría).
3. **Ejes paralelos** (U ec. 9.19 p. 288): $I_s=I_{cm}+\tfrac M2 d^2=\tfrac1{12}\tfrac M2\left(\tfrac L2\right)^2+\tfrac M2\left(\tfrac L4\right)^2=\tfrac{ML^2}{96}+\tfrac{ML^2}{32}=\tfrac{ML^2}{24}$.
4. **Total.** $I_b=2I_s=$ **$\tfrac1{12}ML^2$**. Comprobado además integrando $\int r^2\,dm$ directamente con sympy.
5. **Interpretación.** Coinciden porque, para cada segmento, el vértice y $P$ están a la misma distancia ($L/4$) de su CM: $\tfrac1{24}=\tfrac1{96}+\tfrac1{32}$ es justo $\tfrac13 m\ell^2=\tfrac1{12}m\ell^2+m(\ell/2)^2$.

**Resultado:** a) y b) $\tfrac1{12}ML^2$.

**Receta.** Divide el cuerpo en piezas de la tabla 9.2; para cada pieza localiza su CM, mide $d$ hasta el eje y usa $I_{cm}+md^2$; suma.

**Error típico.** Usar la masa o longitud de la varilla entera ($M$, $L$) para cada segmento, o tomar como $d$ la distancia del eje al extremo del segmento en lugar de a su CM (el teorema solo vale desde el CM).

Teoría: U §9.4 p. 286 (tabla 9.2); §9.5 pp. 288–289 (ec. 9.19).

---

### E9. Problema 9.55 — Varilla de densidad variable $dm/dx=\gamma x$ (Solucionario 9-16)

**Enunciado (U p. 297).** La masa por unidad de longitud de una varilla delgada de longitud $L$ varía con la distancia al extremo izquierdo ($x=0$) según $dm/dx=\gamma x$, con $\gamma$ en kg/m². a) Calcule la masa total en función de $\gamma$ y $L$. b) Use la ecuación (9.20) para calcular el momento de inercia respecto a un eje perpendicular por el extremo izquierdo; expréselo en función de $M$ y $L$, compárelo con el de una varilla uniforme y explique la diferencia. c) Repita b) para un eje en el extremo derecho y compare.

**Solución.**

1. **Herramienta.** Si la masa no es uniforme, no sirve la tabla 9.2: hay que integrar, $I=\int r^2\,dm$ (U ec. 9.20 p. 290), eligiendo elementos $dm$ cuyos puntos estén todos a la misma distancia del eje (aquí, trocitos $dx$). Elemento: $dm=\gamma x\,dx$.
2. **a)** $M=\int_0^L\gamma x\,dx=$ **$\tfrac12\gamma L^2$**.
3. **b) Eje en $x=0$.** Distancia del elemento al eje: $r=x$. $I=\int_0^L x^2\,\gamma x\,dx=\tfrac14\gamma L^4$. Sustituyendo $\gamma=2M/L^2$: **$I=\tfrac12ML^2$**.
4. **Comparación.** Varilla uniforme por un extremo: $\tfrac13ML^2$ (tabla 9.2b). Sale mayor porque la densidad crece hacia el extremo derecho, lejos del eje.
5. **c) Eje en $x=L$.** Distancia: $r=L-x$. $I=\int_0^L (L-x)^2\gamma x\,dx=\gamma\left[\tfrac{L^2x^2}{2}-\tfrac{2Lx^3}{3}+\tfrac{x^4}{4}\right]_0^L=\tfrac1{12}\gamma L^4=$ **$\tfrac16ML^2$**.
6. **Comparación.** Ahora la mayor parte de la masa está cerca del eje: $\tfrac16<\tfrac13<\tfrac12$. Es un tercio del resultado b).
7. **Comprobación con ejes paralelos.** CM: $x_{cm}=\tfrac1M\int x\,dm=\tfrac23L$. $I_{cm}=\tfrac12ML^2-M\left(\tfrac{2L}3\right)^2=\tfrac1{18}ML^2$; trasladando al extremo derecho ($d=L/3$): $\tfrac1{18}ML^2+\tfrac19ML^2=\tfrac16ML^2$ ✓ (sympy).

**Resultado:** a) $M=\tfrac12\gamma L^2$; b) $\tfrac12ML^2$; c) $\tfrac16ML^2$.

**Receta.** Densidad variable: escribe $dm=\lambda(x)\,dx$, calcula $M=\int dm$ para poder expresar todo en $M$, y $I=\int r(x)^2\,dm$ con $r$ medida desde el eje concreto.

**Error típico.** Usar $r=x$ también para el eje derecho; o dejar el resultado en $\gamma$ cuando piden $M$ y $L$.

Teoría: U §9.6 p. 290 (ec. 9.20); §9.4 p. 286 (tabla 9.2); §9.5 p. 288.

---

### E10. Problemas 9.44 y 9.45 — Polea con cubeta / rueda con objeto colgado (Solucionario 9-13)

**Enunciado 9.44 (U p. 297).** Una cubeta de masa $m$ se ata a un cable de masa despreciable enrollado en el borde exterior de una polea uniforme sin fricción de radio $R$ (como en la figura E9.43). En términos de esas variables, ¿cuál debe ser el momento de inercia de la polea para que siempre tenga la mitad de la energía cinética de la cubeta?

**Enunciado 9.45 (U p. 297).** Un alambre ligero y delgado se enrolla en el borde de una rueda que gira sin fricción alrededor de un eje horizontal fijo por su centro. La rueda es un disco uniforme de radio $R=0{,}280$ m. Del extremo libre cuelga un objeto de masa $m=4{,}20$ kg. El sistema se libera del reposo y el objeto desciende con aceleración constante 3,00 m en 2,00 s. ¿Cuál es la masa de la rueda?

**Solución 9.44.**

1. **Ligadura cuerda–polea.** Si el cable no resbala, la rapidez del cable (y de la cubeta) es la de un punto del borde: $v=R\omega$ (U ec. 9.13 p. 281; estrategia 9.1 p. 286).
2. **Energías.** Polea: $K_p=\tfrac12I\omega^2$ (U ec. 9.17 p. 284). Cubeta: $K_c=\tfrac12mv^2=\tfrac12mR^2\omega^2$.
3. **Condición.** $K_p=\tfrac12K_c$ ⇒ $\tfrac12I\omega^2=\tfrac14mR^2\omega^2$ ⇒ **$I=\tfrac12mR^2$**.
4. **Interpretación.** No depende de $\omega$: si se cumple en un instante, se cumple siempre. Es el momento de inercia de un disco macizo de masa igual a la de la cubeta.

**Solución 9.45.**

1. **Cinemática del objeto (MRUA desde el reposo).** Con aceleración constante, $\Delta y=\tfrac12(v_0+v)t$ (U ec. 2.14 p. 47) ⇒ $v=2\Delta y/t=2(3{,}00)/2{,}00=3{,}00$ m/s. (Aceleración: $a=2\Delta y/t^2=1{,}50$ m/s², menor que $g$ porque la rueda «frena».)
2. **Rueda.** El alambre no resbala: $\omega=v/R=3{,}00/0{,}280=10{,}714$ rad/s.
3. **Conservación de la energía.** No hay rozamiento y el alambre es ideal (no disipa): la energía potencial perdida por el objeto se convierte en cinética del objeto y de la rueda (U ec. 7.4 p. 205 con $K$ de rotación, ec. 9.17; estrategia 9.1 p. 286): $mg\,\Delta y=\tfrac12mv^2+\tfrac12I\omega^2$.
4. **Despejar $I$.** $I=\dfrac{2\left(mg\Delta y-\tfrac12mv^2\right)}{\omega^2}=\dfrac{2\,(123{,}48-18{,}90)}{114{,}80}=1{,}822$ kg·m².
5. **Masa de la rueda.** Disco uniforme: $I=\tfrac12MR^2$ (tabla 9.2f) ⇒ $M=\dfrac{2I}{R^2}=\dfrac{2(1{,}822)}{0{,}0784}=$ **46,5 kg** (46,48 kg con todos los decimales).
6. **Comprobación.** Con la fórmula del Ej. 9.8 de U (p. 287), $v=\sqrt{2gh/(1+M/2m)}$: con $M=46{,}48$ kg, $m=4{,}20$ kg, $h=3{,}00$ m sale $v=3{,}00$ m/s ✓ (sympy). Atajo: de ella, $M=2m\left(\dfrac{2gh}{v^2}-1\right)=8{,}40\,(6{,}533-1)=46{,}48$ kg.

**Resultado:** 9.44: $I=\tfrac12mR^2$. 9.45: $M=46{,}5$ kg.

**Receta.** Sistema «polea + masa colgada» sin rozamiento y sin pedir tiempos: (1) ligadura $v=R\omega$; (2) energía: $mgh=\tfrac12mv^2+\tfrac12I(v/R)^2$; (3) despeja la incógnita. Si dan distancia y tiempo, la rapidez final sale del MRUA ($v=2\Delta y/t$ partiendo del reposo).

**Error típico.** Tomar $v=\Delta y/t=1{,}50$ m/s (eso es la velocidad **media**, no la final); u olvidar la energía cinética del objeto colgado y poner $mgh=\tfrac12I\omega^2$.

Teoría: U §2.4 p. 47 (ec. 2.14); §7.1 p. 205 (ec. 7.4); §9.3 p. 281 (ec. 9.13); §9.4 pp. 284–287 (ec. 9.17, tabla 9.2, estrategia 9.1, Ej. 9.8).

---

## Resumen de resultados

| Ejercicio | Resultado |
|---|---|
| X Feb 2025 2ª P-3 Opción A (b) | $a_{tan}=0$; $a_{rad}=\omega^2R$, módulo constante, dirección variable (hacia el eje) |
| X Feb 2025 2ª P-3 Opción A (a) | $v=\sqrt{2gh/(1+4c\,m_r/M)}$: (1) ruedas ligeras (el radio no influye); (2) sólidas ($c=\tfrac12$ frente a $c\approx1$) |
| E 9.11 | 24,0 s; 432 rad = 68,8 rev |
| E 9.8 | $\alpha=+1{,}43$ rad/s²; frena 0–4,20 s, acelera 4,20–7,00 s; $\Delta\theta=-7{,}00$ rad |
| E 9.58 | $\omega=6{,}40t-1{,}50t^2$; $\alpha=6{,}40-3{,}00t$; $\omega_{máx}=6{,}83$ rad/s en $t=2{,}13$ s |
| E 9.25 | $r=0{,}107$ m (⌀ 0,214 m > 0,127 m): no verosímil |
| E 9.23 | $a_{tan}=0{,}180$ m/s²; $a_{rad}=0$ / 0,377 / 0,754 m/s²; $a=0{,}180$ / 0,418 / 0,775 m/s² |
| E 9.30 | $\tfrac12mL^2$; $\tfrac{11}{16}mL^2$ |
| E 9.31 | 1,93; 6,53; 0; 1,15 kg·m² |
| E 9.35 | $m_d=23{,}56$ kg, $m_a=15{,}08$ kg; $I=8{,}52$ kg·m² |
| E 9.52 | $\tfrac1{12}ML^2$ en ambos ejes |
| E 9.55 | $M=\tfrac12\gamma L^2$; $\tfrac12ML^2$; $\tfrac16ML^2$ |
| E 9.44 | $I=\tfrac12mR^2$ |
| E 9.45 | $v=3{,}00$ m/s, $\omega=10{,}71$ rad/s, $I=1{,}822$ kg·m², $M=46{,}5$ kg |
