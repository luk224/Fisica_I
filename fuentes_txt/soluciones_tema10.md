# Soluciones Tema 10 — Dinámica del movimiento de rotación

Material para el redactor del tema 10. Todos los números se han comprobado con sympy (script propio de verificación, un bloque por ejercicio). Los enunciados de examen se han leído **en la imagen del PDF original** (`Examanes/E689010160-18F1.pdf`, `-19F1.pdf`, `-23F1.pdf`, `-24F2.pdf`, `-25F1.pdf`, recopilatorio `FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf` p. 26) y, cuando existe, en `fuentes_txt/examenes/*.txt`. Los enunciados de E se han tomado de U (`sears.txt`, págs. impresas 329–336, figura E10.1 comprobada sobre el PDF) y las soluciones de `solman.txt` (la página 10-N del solucionario está en el PDF 327+N). Los problemas E están traducidos y ampliados, no copiados.

Convenciones: si el enunciado no da $g$, se usa $g=9{,}8\ \text{m/s}^2$ (como U); si lo da ($9{,}81$), se usa ese. «U p. NN» = página impresa del Sears-Zemansky. Sentido positivo de giro = el del movimiento (se dice en cada caso). Ángulos en radianes siempre que se mezclen magnitudes lineales y angulares.

## Herramientas de teoría que se usan

| Herramienta | Dónde |
|---|---|
| Torca $\tau=Fl=rF\sin\phi=F_{tan}r$ (10.2); $\vec\tau=\vec r\times\vec F$ (10.3) | U §10.1 p. 305 |
| $\sum\tau_z=I\alpha_z$ (10.7); Estrategia 10.1 | U §10.2 pp. 307–308 |
| $K=\tfrac12Mv_{cm}^2+\tfrac12I_{cm}\omega^2$ (10.8) | U §10.3 p. 310 |
| Rodar sin resbalar $v_{cm}=R\omega$ (10.11) (y, derivando, $a_{cm}=R\alpha$) | U §10.3 p. 311 |
| Traslación + rotación: $\sum\vec F_{ext}=M\vec a_{cm}$ (10.12), $\sum\tau_z=I_{cm}\alpha_z$ (10.13); yoyo (Ej. 10.6), bola en rampa (Ej. 10.7) | U §10.3 pp. 313–314 |
| Trabajo de una torca $dW=\tau_z d\theta$ (10.19), $W=\int\tau_z d\theta$ (10.20), $W=\tau_z\Delta\theta$ (10.21); $W_{tot}=\Delta K_{rot}$ (10.22); $P=\tau_z\omega_z$ (10.23); Ej. 10.8 | U §10.4 pp. 315–317 |
| Momento angular $\vec L=\vec r\times m\vec v$ (10.24), $L=mvl$ (10.25); $L_z=I\omega_z$ (10.28); $\sum\vec\tau_{ext}=d\vec L/dt$ (10.29) | U §10.5 pp. 317–319 |
| Conservación: si $\sum\vec\tau_{ext}=0$, $\vec L$ = cte; $I_1\omega_{1z}=I_2\omega_{2z}$ (10.30); torcas internas (10.31); Ej. 10.10–10.12 | U §10.6 pp. 320–322 |
| Preguntas P10.24 (huevos) y P10.25 (rotor de cola) | U p. 328 |
| Momento de inercia, tabla 9.2; ejes paralelos (9.19); $v=r\omega$, $a_{tan}=r\alpha$, $a_{rad}=\omega^2r$ | U §9.3–9.5 pp. 281–288 |
| Fricción estática $f_s\le\mu_s n$ (5.4); cinética $f_k=\mu_k n$ (5.3) | U §5.3 pp. 143–144 |
| MRUA $x=x_0+v_{0}t+\tfrac12at^2$ (2.12); $v^2=v_0^2+2a\Delta x$ (2.13) | U §2.4 p. 47 |
| Conservación de la energía mecánica (7.4) | U §7.1 p. 205 |
| Cantidad de movimiento total $\vec P=M\vec v_{cm}$ (8.32); conservación de $\vec P$ | U §8.2 p. 243; §8.5 p. 256 |
| Choques inelásticos (energía cinética que se pierde) | U §8.3 p. 247 |
| Aceleración centrípeta $a_{rad}=v^2/R$ | U §3.4 pp. 83–84 |

---

## PARTE A — Problemas de examen (X), de más fácil a más difícil

### X1. Examen Febrero 2023 (1ª semana) P-2 — cilindro macizo frente a hueco en una rampa de 50°

Fuente: `Examanes/E689010160-23F1.pdf` (P-2, 3 puntos; leído en la imagen del PDF; no hay `.txt`).

**Enunciado (literal).** Se deja caer un cilindro sólido de masa $m$ y radio $r$ por una superficie inclinada que forma un ángulo de 50° con la horizontal: (a) Calcular el valor mínimo del coeficiente de fricción estática entre la superficie del cilindro y la superficie de la rampa para que el cilindro ruede sin deslizamiento. (b) Calcular el valor de la aceleración lineal del primer cilindro si cae rodando tal y como se indica en el apartado anterior sabiendo que el valor de la masa del cilindro es 1 kg y su radio 0,5 m. (c) Qué pasaría si en lugar de un cilindro macizo fuera uno hueco con la misma masa concentrada en la superficie y el coeficiente de fricción calculado en el apartado a), ¿Rodaría también sin deslizamiento? Considere: $g=9{,}81\ \text{m s}^{-2}$; $I_{cilindro}=\tfrac12mr^2$; $I_{cilindro\ hueco}=mr^2$.

**Solución.**

1. **Qué tipo de problema es.** El cilindro se traslada (baja) y a la vez gira: es el caso «eje móvil» de U §10.3. Se necesitan **dos** ecuaciones de Newton, una para el CM (10.12) y otra para la rotación en torno al CM (10.13), más la condición de rodadura $a_{cm}=r\alpha$ (derivada de (10.11), U p. 311). Es el mismo esquema que la bola de bolos del Ej. 10.7 (U p. 314), cambiando $I$.
2. **DCL y por qué la fricción va hacia arriba de la rampa.** Fuerzas: peso $mg$ (en el CM), normal $n$ (perpendicular, su recta pasa por el CM) y fricción estática $f$ en el punto de contacto (paralela a la rampa). Respecto al CM, el peso y la normal **no dan torca** (su brazo de palanca es cero, U p. 305). La única que puede hacer girar el cilindro es $f$. Para que gane velocidad angular en el sentido de bajar rodando, $f$ debe apuntar **rampa arriba**. Eje $x$ rampa abajo.
3. **Ecuación perpendicular a la rampa.** No hay movimiento en esa dirección: $n-mg\cos\theta=0\Rightarrow n=mg\cos\theta$.
4. **Traslación (10.12).** $mg\sin\theta-f=ma_{cm}$.
5. **Rotación respecto al CM (10.13).** $fr=I_{cm}\alpha=\tfrac12mr^2\alpha$.
6. **Rodadura.** $\alpha=a_{cm}/r$ ⇒ $fr=\tfrac12mr^2\,a_{cm}/r$ ⇒ $f=\tfrac12ma_{cm}$.
7. **Resolver.** Sustituyendo en 4: $mg\sin\theta=\tfrac32ma_{cm}$ ⇒ $a_{cm}=\tfrac23g\sin\theta$ y $f=\tfrac13mg\sin\theta$.
8. **(a) Coeficiente mínimo.** La fricción estática solo puede llegar hasta $\mu_sn$ (5.4, U p. 144): $f\le\mu_sn$ ⇒ $\tfrac13mg\sin\theta\le\mu_smg\cos\theta$ ⇒ $\mu_s\ge\tfrac13\tan\theta=\tfrac13\tan50^\circ=$ **0,397**. No depende de $m$ ni de $r$.
9. **(b) Aceleración.** $a_{cm}=\tfrac23(9{,}81)\sin50^\circ=$ **5,01 m/s²** (con $m=1$ kg, $r=0{,}5$ m; los datos de $m$ y $r$ no hacen falta para $a_{cm}$; sí para $\alpha=a_{cm}/r=10{,}0$ rad/s² y $f=2{,}50$ N, $n=6{,}31$ N).
10. **(c) Cilindro hueco con $\mu_s=0{,}397$.** Repite 5–7 con $I=mr^2$: $f=ma_{cm}$, $mg\sin\theta=2ma_{cm}$ ⇒ $a_{cm}=\tfrac12g\sin\theta$, $f=\tfrac12mg\sin\theta$. Condición: $\mu_s\ge\tfrac12\tan50^\circ=0{,}596$. Como $0{,}397<0{,}596$, **no rueda sin deslizar: resbala**. Motivo: con más $I$ hace falta más torca (más fricción) para dar la misma $\alpha$.
11. **(c) ampliación — qué hace si resbala** (suponiendo $\mu_k\approx\mu_s=0{,}397$): fricción cinética $f=\mu_kmg\cos\theta$; $a_{cm}=g(\sin\theta-\mu_k\cos\theta)=5{,}01$ m/s² y $\alpha=f r/(mr^2)=\mu_kg\cos\theta/r=5{,}01$ rad/s². Como $r\alpha=2{,}50$ m/s² $<a_{cm}$, el punto de contacto se desliza rampa abajo: resbala. (Que $a_{cm}$ coincida con la del macizo es casualidad de haber elegido $\mu=\tfrac13\tan\theta$.)

**Resultado:** (a) $\mu_{s,min}=\tfrac13\tan50^\circ=0{,}397$; (b) $a_{cm}=\tfrac23g\sin50^\circ=5{,}01$ m/s²; (c) no: el hueco necesitaría $\mu_s\ge0{,}596$; resbala.

**Receta.** Cuerpo que rueda por rampa: DCL → $\sum F=ma_{cm}$ a lo largo de la rampa, $\sum\tau_{cm}=I_{cm}\alpha$ (solo la fricción da torca), $a_{cm}=R\alpha$. Con $I=cMR^2$: $a_{cm}=\dfrac{g\sin\theta}{1+c}$, $f=\dfrac{c}{1+c}Mg\sin\theta$, $\mu_{s,min}=\dfrac{c}{1+c}\tan\theta$.

**Error típico.** Usar $f=\mu_sn$ desde el principio (la fricción estática vale lo que haga falta, solo su máximo es $\mu_sn$); dibujar la fricción rampa abajo; olvidar que el hueco, al tener más $I$, necesita **más** fricción.

**Valores para la figura.** Rampa de 50°; macizo: $a_{cm}=5{,}01$, $f=2{,}50$ N (rampa arriba), $mg\sin\theta=7{,}51$ N, $n=mg\cos\theta=6{,}31$ N, $mg=9{,}81$ N; hueco: $f_{necesaria}=3{,}76$ N > $f_{max}=2{,}50$ N.

Teoría: U §10.3 pp. 311–314 (10.11–10.13, Ej. 10.7); §5.3 p. 144 (5.4); tabla 9.2 p. 286.

---

### X2. Examen Febrero 2018 (1ª semana) P-1 — yoyó de dos discos

Fuente: `Examanes/E689010160-18F1.pdf` (pregunta 1, 3 puntos; escaneo leído en la imagen).

**Enunciado (literal).** Un cuerpo formado por dos discos macizos y homogéneos de radio 40 mm unidos por un cilindro de masa despreciable y radio 25 mm, similar a un yoyó, tiene una masa total de 100 g. En su funcionamiento se enrolla una cuerda de longitud 1 m al cilindro interior. Si el extremo de la cuerda se mantiene fijo y el cuerpo parte del reposo, calcular: a) Aceleración angular del cuerpo. b) Aceleración lineal de su centro de masas. c) Velocidad del centro de masas en el instante en que se ha desenrollado completamente el hilo.

**Solución** ($g=9{,}8$ m/s², no lo da el enunciado).

1. **Datos en SI.** $M=0{,}100$ kg (cada disco 0,050 kg), $R=0{,}040$ m (discos), $b=0{,}025$ m (eje, donde está la cuerda), $L=1$ m.
2. **Momento de inercia.** Cada disco macizo respecto a su eje: $\tfrac12m_dR^2$ (U tabla 9.2 p. 286); el eje tiene masa despreciable. $I_{cm}=2\cdot\tfrac12(0{,}050)(0{,}040)^2=8{,}0\times10^{-5}$ kg·m². **Ojo:** el radio que entra en $I$ es $R$ (donde está la masa), pero el brazo de la tensión es $b$ (donde está la cuerda).
3. **Fuerzas.** Peso $Mg$ hacia abajo (en el CM) y tensión $T$ hacia arriba, aplicada a distancia $b$ del eje. Eje $y$ hacia abajo (sentido del movimiento).
4. **Traslación (10.12).** $Mg-T=Ma_{cm}$.
5. **Rotación respecto al CM (10.13).** Solo $T$ da torca: $Tb=I_{cm}\alpha$.
6. **Ligadura: la cuerda no resbala.** El punto del eje en contacto con la cuerda vertical está en reposo (como el punto de contacto en rodadura): $a_{cm}=b\,\alpha$ (U ec. 10.11 con radio $b$, cf. Ej. 10.6 p. 313).
7. **Resolver.** De 5 y 6: $T=I_{cm}a_{cm}/b^2$. En 4: $Mg=a_{cm}(M+I_{cm}/b^2)$ ⇒ 
$$a_{cm}=\frac{g}{1+I_{cm}/(Mb^2)},\qquad \frac{I_{cm}}{Mb^2}=\frac{8{,}0\times10^{-5}}{0{,}100\cdot(0{,}025)^2}=1{,}28.$$
8. **(b)** $a_{cm}=9{,}8/2{,}28=$ **4,30 m/s²** (hacia abajo).
9. **(a)** $\alpha=a_{cm}/b=4{,}298/0{,}025=$ **172 rad/s²**.
10. **Tensión (no pedida, útil):** $T=M(g-a_{cm})=0{,}550$ N.
11. **(c)** La aceleración es constante (todas las fuerzas lo son), así que vale (2.13, U p. 47) con $\Delta y=L=1$ m (al desenrollarse 1 m de hilo, el CM baja 1 m): $v=\sqrt{2a_{cm}L}=\sqrt{2(4{,}298)(1)}=$ **2,93 m/s**. Tiempo: $t=\sqrt{2L/a}=0{,}682$ s; $\omega_f=v/b=117$ rad/s.
12. **Comprobación por energía (U §10.3, Ej. 10.4 p. 312).** $MgL=\tfrac12Mv^2+\tfrac12I_{cm}(v/b)^2$ ⇒ $v=\sqrt{2gL/(1+I/(Mb^2))}=2{,}93$ m/s. Coincide (la tensión no hace trabajo neto porque el punto de aplicación está instantáneamente en reposo).

**Resultado:** (a) $\alpha=172$ rad/s²; (b) $a_{cm}=4{,}30$ m/s²; (c) $v_{cm}=2{,}93$ m/s. (Con $g=9{,}81$: 172 rad/s², 4,30 m/s², 2,93 m/s.)

**Receta.** Yoyó / carrete con cuerda fija: $\sum F=Ma$, $\sum\tau_{cm}=I\alpha$ con el brazo $b$ del punto donde sale la cuerda y $a=b\alpha$ ⇒ $a=\dfrac{g}{1+I_{cm}/(Mb^2)}$. Para la velocidad tras bajar $h$: energía con $\omega=v/b$.

**Error típico.** Usar $R$ en la ligadura ($a=R\alpha$) o $b$ en el momento de inercia; contar mal la masa de cada disco (50 g, no 100 g); creer que cae con $g$.

**Valores para la figura.** Yoyó con $R=40$ mm, $b=25$ mm; $T=0{,}550$ N arriba (a 25 mm del centro), $Mg=0{,}980$ N abajo; $a_{cm}=4{,}30$ m/s²; tras 1 m: $v=2{,}93$ m/s, $t=0{,}68$ s.

Teoría: U §10.3 pp. 311–314 (10.11–10.13, Ej. 10.4 y 10.6); §9.4 tabla 9.2 p. 286; §2.4 p. 47.

---

### X3. Examen Febrero 2025 (1ª semana) P-1 — cilindro de 490 kg que sube rodando una rampa de 35°

Fuente: `fuentes_txt/examenes/E689010160-25F1.txt` y `Examanes/E689010160-25F1.pdf` (P-1, 3 puntos). El dato de 490 kg se ha comprobado en la imagen del PDF (texto nítido).

**Enunciado (literal).** Un cilindro macizo de distribución de masa uniforme de 490 kg y un radio de 0,25 m sube girando sin deslizar por una rampa inclinada 35° sobre la horizontal de longitud 6,5 m de largo. La fuerza que consigue que esto sea así se aplica de forma paralela a la superficie sin realizar ningún momento sobre el cilindro. Siendo el coeficiente de fricción estática entre la superficie de la rampa y el cilindro de 0,12. Determine: (a) La magnitud máxima de la fuerza que permite que el cilindro ruede sin deslizar mientras sube la rampa. (b) Si el cilindro comienza a desplazarse desde el reposo cuando está situado en la parte inferior de la rampa rodando sin deslizar mientras sube, obtenga el tiempo mínimo que necesita el cilindro para alcanzar la parte superior de la rampa. Considere: $g=9{,}81\ \text{m s}^{-2}$.

**Solución.**

1. **Interpretar «sin realizar ningún momento».** La fuerza $F$ se aplica en el eje del cilindro (su recta pasa por el CM), paralela a la rampa y hacia arriba: **no da torca respecto al CM**. El peso (en el CM) y la normal (recta por el CM) tampoco. La única torca posible es la de la **fricción** en el contacto.
2. **Sentido de la fricción (paso clave).** El cilindro parte del reposo y sube cada vez más rápido: su $\omega$ debe aumentar en el sentido de «rodar hacia arriba». Solo la fricción puede producir esa $\alpha$, y para ello debe apuntar **rampa abajo** (en el punto de contacto, una fuerza rampa abajo hace girar el cilindro en el sentido de subir rodando). Es el caso contrario a X1: allí el peso «tira» del CM y la fricción frena la traslación y hace girar; aquí $F$ tira del CM y la fricción, otra vez, se opone a la traslación y hace girar.
3. **Ecuaciones** (eje $x$ rampa arriba; U 10.12, 10.13 y 10.11):
   - perpendicular: $n=mg\cos\theta$;
   - traslación: $F-mg\sin\theta-f=ma_{cm}$;
   - rotación: $fR=\tfrac12mR^2\alpha$, con $\alpha=a_{cm}/R$ ⇒ $f=\tfrac12ma_{cm}$.
4. **Resolver en función de $F$.** $F-mg\sin\theta=\tfrac32ma_{cm}$ ⇒ $a_{cm}=\dfrac{2(F-mg\sin\theta)}{3m}$, $f=\dfrac{F-mg\sin\theta}{3}$.
5. **(a) Condición de no deslizar.** $f\le\mu_sn$ (5.4) ⇒ $\dfrac{F-mg\sin\theta}{3}\le\mu_smg\cos\theta$ ⇒ 
$$F_{max}=mg(\sin\theta+3\mu_s\cos\theta)=490\cdot9{,}81\,(0{,}5736+3\cdot0{,}12\cdot0{,}8192)=\mathbf{4{,}17\times10^3\ N}\ (4175\ \text{N}).$$
   Además, para que suba desde el reposo hace falta $F>mg\sin\theta=2757$ N. Rango útil: $2757\ \text{N}<F\le4175$ N.
6. **(b) Tiempo mínimo.** Menor tiempo = mayor aceleración = $F=F_{max}$, es decir, fricción en su valor máximo $f=\mu_smg\cos\theta=473$ N. Entonces $a_{max}=2f_{max}/m=2\mu_sg\cos\theta=2(0{,}12)(9{,}81)\cos35^\circ=1{,}93$ m/s² (¡no depende de la masa!).
7. **Cinemática** (aceleración constante desde el reposo, 2.12): $L=\tfrac12a_{max}t^2$ ⇒ $t_{min}=\sqrt{2L/a_{max}}=\sqrt{13/1{,}929}=$ **2,60 s**.
8. **Comprobaciones.** Velocidad arriba $v=a t=5{,}01$ m/s, $\omega=v/R=20{,}0$ rad/s. Dimensionalmente $F_{max}$ es masa×aceleración ✔. Si $\mu_s\to0$, $F_{max}\to mg\sin\theta$ (no podría acelerar sin resbalar) ✔.
9. **¿Es plausible y coherente la masa de 490 kg?** Sí. Un cilindro macizo de 0,25 m de radio y 490 kg, si es de acero ($\rho\approx7850$ kg/m³), mide $L=m/(\rho\pi R^2)\approx0{,}32$ m de largo; de hormigón ($\approx2400$ kg/m³), $\approx1{,}0$ m: un rodillo compactador o una bobina. La masa solo interviene en (a) (proporcional a $m$); el tiempo de (b) es independiente de $m$ y de $R$. Los datos son coherentes entre sí: $F_{max}>mg\sin\theta$, así que existe un intervalo de fuerzas que hace subir el cilindro rodando.

**Resultado:** (a) $F_{max}=mg(\sin35^\circ+3\mu_s\cos35^\circ)\approx4{,}17$ kN; (b) $t_{min}=\sqrt{L/(\mu_sg\cos35^\circ)}=2{,}60$ s.

**Receta.** Cuando la fuerza motriz no da torca, la **fricción es la que hace girar**: su sentido es el que produce la $\alpha$ necesaria. Escribe las dos ecuaciones (CM y rotación) + $a=R\alpha$, despeja $f$ en función de la fuerza aplicada y aplica $f\le\mu_sn$: eso da la fuerza máxima y, con ella, la aceleración y el tiempo mínimos.

**Error típico.** Poner la fricción rampa arriba (por «oponerse al movimiento»: se opone al deslizamiento relativo que habría sin ella, no al movimiento); olvidar el término $mg\sin\theta$; tomar el tiempo mínimo con $F$ cualquiera en vez de con $F_{max}$.

**Valores para la figura.** Rampa 35°, 6,5 m; $F_{max}=4175$ N (rampa arriba, en el eje); $mg\sin\theta=2757$ N; $f_{max}=473$ N (rampa abajo, en el contacto); $n=3938$ N; $mg=4807$ N; $a=1{,}93$ m/s²; $t=2{,}60$ s; $v_{arriba}=5{,}01$ m/s; $\omega_{arriba}=20{,}0$ rad/s. (Fuerzas no a escala si se dibujan junto a $mg$.)

Teoría: U §10.3 pp. 311–314 (10.11–10.13); §5.3 p. 144; §2.4 p. 47.

---

### X4. Examen Febrero 2019 (1ª semana) P-2 — cilindro empujado por $F=t^2/2$ en el centro

Fuente: `Examanes/E689010160-19F1.pdf` (pregunta 2, 3 puntos; escaneo leído en la imagen; figura: cilindro sobre el suelo con $F$ horizontal en el centro).

**Enunciado (literal, «siento» por «siendo» corregido).** Sea un cilindro de masa $m=30$ kg y radio $R=600$ mm que se puede mover en un plano horizontal con rozamiento $\mu=0{,}3$. Si partiendo del reposo se le aplica una fuerza $F=t^2/2$ (siendo $t$ el tiempo) en el centro del cilindro. Se pide calcular: a) el tiempo al cabo del cual el cilindro empieza a deslizar. b) La aceleración de cualquier punto del centro del cilindro cuando empieza a deslizar. c) La aceleración del centro de masas y la aceleración angular del cilindro a los 4 segundos de aplicar la fuerza.

**Hipótesis** (no dichas en el enunciado, se declaran): cilindro **macizo** homogéneo, $I=\tfrac12mR^2$; $F$ en newtons con $t$ en segundos; $\mu_s=\mu_k=0{,}3$; $g=9{,}8$ m/s². «Cualquier punto del centro» = cualquier punto del eje del cilindro, cuya aceleración es la del CM.

**Solución.**

1. **Idea.** Al principio $F$ es pequeña y el cilindro **rueda sin deslizar**: la fricción estática hace lo necesario. Como $F$ crece con el tiempo, la fricción necesaria crece hasta que supera $\mu_smg$: en ese instante empieza a deslizar.
2. **Fuerzas y sentido de la fricción.** $F$ (horizontal, en el eje, sin torca), $mg$, $n=mg$, fricción $f$ en el contacto. $F$ empuja el CM hacia delante; para que el cilindro gire acelerando en el sentido de rodar hacia delante, la fricción debe apuntar **hacia atrás**.
3. **Ecuaciones en rodadura** (10.12, 10.13, 10.11): $F-f=ma_{cm}$; $fR=\tfrac12mR^2\alpha$; $a_{cm}=R\alpha$ ⇒ $f=\tfrac12ma_{cm}$ ⇒ $a_{cm}=\dfrac{2F}{3m}$, $f=\dfrac F3$.
4. **(a) Inicio del deslizamiento.** $f=\mu_smg$ ⇒ $F=3\mu_smg=3(0{,}3)(30)(9{,}8)=264{,}6$ N ⇒ $t^2/2=264{,}6$ ⇒ $t=\sqrt{529{,}2}=$ **23,0 s**.
5. **(b) Aceleración del CM en ese instante.** $a_{cm}=\dfrac{2F}{3m}=\dfrac{2(264{,}6)}{90}=$ **5,88 m/s²** $=2\mu_sg$; $\alpha=a_{cm}/R=$ **9,80 rad/s²**. Justo después, ya deslizando con $\mu_k=0{,}3$: $a_{cm}=(F-\mu_kmg)/m=5{,}88$ m/s² y $\alpha=\mu_kmgR/(\tfrac12mR^2)=2\mu_kg/R=9{,}80$ rad/s²: los valores son continuos en el instante de transición (con $\mu_k<\mu_s$ habría un salto). Después, $a_{cm}$ sigue creciendo con $F$ y $\alpha$ se queda constante: $R\alpha<a_{cm}$, desliza.
6. **(c) A los 4 s** (todavía rueda, porque 4 s < 23 s): $F=4^2/2=8$ N; $a_{cm}=\dfrac{2\cdot8}{3\cdot30}=$ **0,178 m/s²**; $\alpha=a_{cm}/R=0{,}178/0{,}600=$ **0,296 rad/s²**. Fricción necesaria $f=F/3=2{,}67$ N $\ll\mu_smg=88{,}2$ N ✔.
7. **Nota sobre los puntos del borde.** Un punto de la periferia tiene además aceleración centrípeta $\omega^2R$ (U §9.3 p. 281), que depende de la velocidad acumulada; por eso la pregunta se refiere a los puntos del eje, cuya aceleración es la del CM.

**Resultado:** (a) $t=\sqrt{6\mu mg}=23{,}0$ s; (b) $a_{cm}=2\mu g=5{,}88$ m/s² (y $\alpha=9{,}80$ rad/s²); (c) $a_{cm}=0{,}178$ m/s², $\alpha=0{,}296$ rad/s². (Con $g=9{,}81$: 23,0 s; 5,89 m/s².)

**Receta.** Fuerza variable en el centro de un cuerpo que rueda: resuelve primero **como si rodara** (obtienes $f$ necesaria en función de $F$) y compara con $\mu_sn$; el instante en que se igualan es el de inicio del deslizamiento. Antes de ese instante, rodadura ($a=R\alpha$); después, fricción cinética $\mu_kn$ y $a\neq R\alpha$.

**Error típico.** Poner desde el principio $f=\mu mg$ (eso solo vale cuando ya desliza); fricción hacia delante; calcular (c) con fricción cinética sin comprobar que a los 4 s aún rueda.

**Valores para la figura.** Gráfica $f(t)=t^2/6$ (parábola) frente a la recta $\mu_smg=88{,}2$ N: corte en $t=23{,}0$ s. A 4 s: $F=8$ N, $f=2{,}67$ N. En el corte: $F=264{,}6$ N; $a_{cm}=5{,}88$ m/s²; $v_{cm}=t^3/(9m)=45{,}1$ m/s (velocidad acumulada a 23 s).

Teoría: U §10.3 pp. 311–314; §5.3 pp. 143–144.

---

### X5. Examen Febrero 2024 (2ª semana) P-1 — acróbata que salta del extremo de una barra

Fuente: `Examanes/E689010160-24F2.pdf` (P-1, 3 puntos; leído en la imagen del PDF).

**Enunciado (literal).** Un acróbata de 60 kg se encuentra al final de una barra delgada y uniforme que se encuentra inicialmente en reposo sobre una superficie horizontal lisa. El otro extremo de la barra está unido a un eje fijado al suelo que permite el giro. La masa de la barra es 10 kg y su longitud 3 m. El acróbata salta en dirección horizontal, perpendicular a la barra con una velocidad de módulo 10 m/s respecto a la superficie lisa. Conocida esta situación obtenga: (a) La velocidad angular de la barra tras el salto del acróbata (b) La energía cinética del sistema inmediatamente después del salto (c) ¿De dónde proviene la energía? Considere: $I=\tfrac13m_br^2$ siendo $I$ el momento de inercia de la barra respecto a su eje de giro y $m_b$ la masa de la barra.

**Solución.**

1. **Sistema y qué se conserva.** Sistema = acróbata + barra. Durante el salto actúan fuerzas internas (pies–barra), el peso y la normal (verticales, sin torca respecto al eje vertical) y la fuerza del eje fijo. La fuerza del eje **no** es despreciable (por eso no se conserva la cantidad de movimiento lineal), pero actúa **en el eje**: su torca respecto a él es nula. Por tanto $\sum\tau_{ext,z}=0$ ⇒ $L_z$ se conserva (U §10.6 p. 320, ec. 10.29–10.31).
2. **Antes del salto.** Todo en reposo: $L_z=0$.
3. **Después.** Acróbata (partícula) a $r=3$ m del eje, velocidad perpendicular a la barra: $L_{ac}=mvr$ (10.25, $l=r$). Barra: $L_b=I\omega$ con $I=\tfrac13(10)(3)^2=30$ kg·m² (10.28).
4. **Conservación.** $0=mvr-I\omega$ (signos opuestos: la barra gira en sentido contrario al del acróbata, como el retroceso de un arma) ⇒ $\omega=\dfrac{mvr}{I}=\dfrac{60\cdot10\cdot3}{30}=$ **60 rad/s** ($\approx9{,}5$ rev/s), en sentido opuesto al salto.
5. **(b) Energía cinética.** $K=\tfrac12mv^2+\tfrac12I\omega^2=\tfrac12(60)(10)^2+\tfrac12(30)(60)^2=3000+54\,000=$ **57 000 J = 57 kJ**. La barra se lleva casi toda la energía porque su $I$ es pequeño: con el mismo $L$, $K=L^2/(2I)$ es grande si $I$ es pequeño.
6. **(c) Origen.** Antes $K=0$; después 57 kJ. La energía viene del **trabajo de las fuerzas internas** que hace el acróbata con sus músculos (energía química interna transformada en cinética), igual que en una explosión las fuerzas internas no cambian la cantidad de movimiento total (aquí, el momento angular) pero sí la energía cinética.
7. **Comentario físico.** La cifra es enorme (el extremo de la barra saldría a $\omega r=180$ m/s): el enunciado es una idealización (barra muy ligera, salto instantáneo). El método es el correcto.
8. **Cantidad de movimiento (para entender el paso 1).** Después del salto, $p_{ac}=600$ kg·m/s en un sentido y $p_b=m_b v_{cm,b}=m_b\omega\tfrac L2=900$ kg·m/s en el opuesto: no suman cero; la diferencia (300 N·s) es el impulso del eje. Por eso se usa $L$ y no $p$.

**Resultado:** (a) $\omega=60$ rad/s (sentido opuesto al del acróbata); (b) $K=5{,}7\times10^4$ J; (c) del trabajo interno (muscular) del acróbata.

**Receta.** Si hay un eje fijo que da fuerzas desconocidas durante un choque/salto/empujón, toma momentos **respecto a ese eje**: la torca del eje es cero y $L$ se conserva aunque $\vec p$ no. Partícula: $L=mvl$; sólido: $L=I\omega$; ojo con los signos.

**Error típico.** Conservar la cantidad de movimiento lineal (el eje la cambia); usar $\tfrac1{12}m_bL^2$ (eso es respecto al centro); pensar que la energía cinética también se conserva.

**Valores para la figura.** Vista desde arriba: barra de 3 m, eje en un extremo, acróbata en el otro con $\vec v=10$ m/s perpendicular; barra girando al revés con $\omega=60$ rad/s; $L_{ac}=1800$ kg·m²/s, $L_b=-1800$ kg·m²/s.

Teoría: U §10.5 pp. 317–319 (10.25, 10.28, 10.29); §10.6 pp. 320–322 (10.30–10.31, Ej. 10.12); tabla 9.2 p. 286.

---

### X6. Examen Septiembre 2019 P-1, apartado (a) — bala que se incrusta en una varilla con pivote

Fuente: recopilatorio `Examanes/FISICA_EXAMENS_ULTIMOS AÑOS _25-18.pdf`, p. 26 (cabecera «Curso 2018-2019 · Original · Septiembre 2019»; escaneo leído en la imagen, no está en los `.txt`). Pregunta 1, 3 puntos. El apartado (a) es de Tema 10; (b) y (c) son de Tema 8, pero se resuelven aquí brevemente porque se entienden con lo mismo.

**Enunciado (literal).** Una varilla de longitud $L$ y masa $M$ puede rotar libremente alrededor de un pivote situado en su extremo superior A. Una bala de masa $m$ y velocidad $v$ golpea la varilla a una distancia «$a$» de su extremo A y se incrusta en ella. a) Calcular el momento angular del sistema con respecto a A inmediatamente después de que la bala choque con la varilla. b) Determinar la cantidad de movimiento del sistema inmediatamente antes y después del choque explicando la respuesta. c) ¿Cuál es la cantidad de calor que se desprende de la colisión?

**Hipótesis:** la varilla cuelga vertical y en reposo; la bala llega horizontal, perpendicular a la varilla.

**Solución.**

1. **Qué se conserva.** En el choque (muy breve) el pivote ejerce una fuerza impulsiva desconocida, pero aplicada **en A**: torca nula respecto a A. El peso no da torca apreciable durante el choque (varilla vertical: su recta pasa por A; y el choque es instantáneo). Luego $L_A$ se conserva (U §10.6 p. 320).
2. **(a) Antes del choque.** Solo se mueve la bala: $L_A=mv\,l$ con $l=a$ (distancia perpendicular de A a la recta de $\vec v$, 10.25). Por conservación, **justo después**: $L_A=mva$ (perpendicular al plano del movimiento, regla de la mano derecha).
3. **Velocidad angular después.** $I_A=\tfrac13ML^2+ma^2$ (varilla respecto a su extremo, U tabla 9.2 p. 286, + bala puntual a distancia $a$) ⇒ $\omega=\dfrac{mva}{\tfrac13ML^2+ma^2}$.
4. **(b) Cantidad de movimiento.** Antes: $p=mv$. Después: $P=Mv_{cm,varilla}+mv_{bala}=\left(M\tfrac L2+ma\right)\omega=\dfrac{mva\,(\tfrac12ML+ma)}{\tfrac13ML^2+ma^2}$ (8.32, U p. 256). En general **no** coinciden: el pivote da un impulso horizontal. Solo si $a=\tfrac23L$ (centro de percusión) coinciden y el pivote no da impulso (comprobado con sympy: $P=mv\iff a=2L/3$, independiente de $m$).
5. **(c) Calor.** Choque perfectamente inelástico (la bala se queda): se pierde energía cinética (U §8.3 p. 247). $Q=K_i-K_f=\tfrac12mv^2-\dfrac{L_A^2}{2I_A}=\dfrac12mv^2\,\dfrac{\tfrac13ML^2}{\tfrac13ML^2+ma^2}=\dfrac{ML^2\,mv^2}{2(ML^2+3ma^2)}$.

**Resultado:** (a) $L_A=mva$ (y $\omega=\dfrac{3mva}{ML^2+3ma^2}$); (b) $p_{antes}=mv$, $p_{después}=(\tfrac12ML+ma)\omega$, distintos salvo $a=\tfrac23L$; (c) $Q=\dfrac{ML^2mv^2}{2(ML^2+3ma^2)}$.

**Ejemplo numérico de control** (propio, para la figura): $m=10$ g, $v=300$ m/s, $M=2$ kg, $L=1$ m, $a=0{,}75$ m ⇒ $L_A=2{,}25$ kg·m²/s, $I_A=0{,}6723$ kg·m², $\omega=3{,}35$ rad/s, $p$: 3,00 → 3,37 kg·m/s, $Q=446$ J (de 450 J iniciales).

**Receta.** Choque contra un cuerpo con pivote: conserva $L$ **respecto al pivote** (no $\vec p$, no $K$). $L_{antes}=mv\,l$ (brazo = distancia perpendicular del pivote a la trayectoria), $L_{después}=I_{total}\,\omega$ con $I_{total}$ incluyendo la bala.

**Error típico.** Conservar $\vec p$ (el pivote lo impide); olvidar el término $ma^2$ en $I$; usar $\tfrac1{12}ML^2$.

**Valores para la figura.** Varilla vertical colgando de A, bala horizontal a distancia $a$ de A; marcar $l=a$ como brazo de palanca y, opcional, el punto $a=\tfrac23L$.

Teoría: U §10.5 pp. 317–319 (10.25, 10.28); §10.6 pp. 320–322 (Ej. 10.12 puerta y bala, mismo método); §8.3 p. 247; §8.5 p. 256.

---

## PARTE B — Teoría de examen (X): esquema del tema y cuestiones cortas

### X7. Examen Febrero 2025 (2ª semana) P-3, Teoría Opción A — «Trabajo y potencia en un movimiento de rotación»

Fuente: `fuentes_txt/examenes/E689010160-25F2.txt` (P-3 Teoría Opción A, 4 puntos; también en los dos recopilatorios). Las cuestiones (a) y (b) ya están resueltas paso a paso en `soluciones_tema09.md` (X1); aquí se da el **esquema del tema** y el resumen de las cuestiones.

**Enunciado (literal).** Desarrolle el tema: Trabajo y potencia en un movimiento de rotación. Además, responda a las siguientes cuestiones: (a) Se pretende fabricar un carro de cuatro ruedas destinado a circular en una carrera con una pendiente cuesta abajo con el objetivo de que circule lo más rápido posible. Considerando invariable el coeficiente de fricción entre las ruedas y la carretera y que la masa total del carro no se verá influenciada por el tamaño de las ruedas. Desarrolle de forma razonada por qué opción optaría en cada uno de los siguientes casos: (1) Utilizar unas ruedas grandes y pesadas o unas ruedas pequeñas y ligeras. (2) Utilizar unas ruedas sólidas o unas ruedas con radios. (b) Un volante gira con velocidad angular constante. Un punto situado en el borde del mismo, ¿tiene aceleración tangencial?, ¿y aceleración radial? ¿tienen estas aceleraciones una magnitud constante?, ¿y una dirección constante? Justifique las respuestas en cada caso.

**Esquema para desarrollar el tema (U §10.4 pp. 315–317).**

1. **Punto de partida.** Una fuerza $\vec F$ aplicada en el borde de un cuerpo que gira en torno a un eje fijo, a distancia $R$. Al girar $d\theta$, el punto de aplicación recorre $ds=R\,d\theta$ (definición de radián, U ec. 9.1 p. 274).
2. **Trabajo elemental.** Solo la componente tangencial hace trabajo (la radial es perpendicular al desplazamiento): $dW=F_{tan}\,ds=F_{tan}R\,d\theta$. Como $F_{tan}R=\tau_z$ (10.2), $dW=\tau_z\,d\theta$ (10.19).
3. **Trabajo finito.** $W=\int_{\theta_1}^{\theta_2}\tau_z\,d\theta$ (10.20); si la torca es constante, $W=\tau_z(\theta_2-\theta_1)=\tau_z\Delta\theta$ (10.21). Análogos de $W=\int F_xdx$ y $W=Fs$ (U p. 316). Unidades: N·m = J (con $\theta$ en rad).
4. **Teorema trabajo–energía en rotación.** Con $\tau_z=I\alpha_z$ (10.7) y $\alpha_z=\dfrac{d\omega_z}{dt}=\omega_z\dfrac{d\omega_z}{d\theta}$: $\tau_zd\theta=I\omega_zd\omega_z$ ⇒ $W_{tot}=\int\tau_zd\theta=\tfrac12I\omega_2^2-\tfrac12I\omega_1^2$ (10.22). El trabajo total de las torcas es la variación de energía cinética de rotación.
5. **Potencia.** Dividiendo $dW=\tau_zd\theta$ entre $dt$: $P=\dfrac{dW}{dt}=\tau_z\dfrac{d\theta}{dt}=\tau_z\omega_z$ (10.23), análoga de $P=Fv$. Motores: a potencia fija, más par a menos rpm.
6. **Ejemplo (U Ej. 10.8 pp. 316–317).** Piedra de afilar acelerada por una torca constante: $\alpha=5{,}0$ rad/s², $\Delta\theta=160$ rad, $W=\tau\Delta\theta=1600$ J $=\Delta K$, $P_{media}=200$ W.
7. **Comentario.** En rodadura sin deslizar, la fricción estática no hace trabajo (el punto de contacto no se desplaza mientras actúa), U §10.3 p. 312.

**Cuestión (a) — resumen** (ver `soluciones_tema09.md` X1). Con $M$ total fija y ruedas de masa $m_r$, $I=c\,m_rr^2$: $Mgh=\tfrac12(M+4c\,m_r)v^2$ ⇒ $v=\sqrt{\dfrac{2gh}{1+4c\,m_r/M}}$; el radio se simplifica. (1) Ruedas **ligeras** (el tamaño no influye; la masa sí): menos energía «gastada» en hacerlas girar. (2) A igual masa, ruedas **sólidas** ($c=\tfrac12$, disco) mejor que de radios (masa en la llanta, $c\to1$, aro).

**Cuestión (b) — resumen.** $\omega$ constante ⇒ $\alpha=0$ ⇒ $a_{tan}=R\alpha=0$; $a_{rad}=\omega^2R\neq0$, de módulo constante y dirección variable (siempre hacia el eje; gira con el punto). U §9.3 p. 281.

**Receta.** Para el desarrollo: «fuerza tangencial × arco» ⇒ $dW=\tau d\theta$ ⇒ integrar ⇒ con $\tau=I\alpha$ sale $W=\Delta(\tfrac12I\omega^2)$ ⇒ derivar respecto al tiempo da $P=\tau\omega$; cerrar con la tabla de analogías traslación/rotación y un ejemplo numérico.

**Error típico.** Usar $\theta$ en revoluciones o grados en $W=\tau\Delta\theta$ o $\omega$ en rpm en $P=\tau\omega$; decir que la componente radial de la fuerza hace trabajo.

Teoría: U §10.4 pp. 315–317; §9.3 p. 281; §10.3 pp. 310–312.

---

### X8. Examen Septiembre 2024 P-3, Teoría Opción A — «Conservación del momento angular»

Fuente: recopilatorios `fuentes_txt/examenes/EXAMENESFISICA1.txt` (líneas 54–71) y `FISICA_EXAMENS_ULTIMOSAOS_25-18.txt`; cabecera «Convocatoria: Septiembre 2024. Nacional-UE-Guinea Original». 4 puntos.

**Enunciado (literal).** Desarrolle el tema: Conservación del momento angular. Además, responda a las siguientes cuestiones: (a) Si se detiene un huevo crudo en rotación durante un instante y lo vuelve a soltar, éste vuelve a girar. Si hace lo mismo con un huevo duro, éste se mantendrá quieto. Explique a qué se debe el fenómeno y relaciónelo con los contenidos de la asignatura. (b) Un helicóptero tiene un rotor principal grande que gira en un plano horizontal y proporciona sustentación. También hay un rotor pequeño en la cola que gira en un plano vertical. ¿Para qué sirve? Considere la situación en la que, en ausencia de dicho rotor de cola, el piloto alterara la velocidad angular del rotor principal, ¿qué consecuencias tendría? Algunos helicópteros no tienen rotor de cola, pero tienen dos rotores principales grandes que giran en un plano horizontal. ¿Por qué es importante que los dos rotores principales giren en direcciones opuestas?

**Esquema para desarrollar el tema (U §10.5–10.6 pp. 317–322).**

1. **Momento angular de una partícula** respecto a O: $\vec L=\vec r\times m\vec v$ (10.24), módulo $L=mvl$ con $l$ la distancia perpendicular de O a la recta de $\vec v$ (10.25). Depende del punto O elegido.
2. **Ley de variación.** Derivando: $d\vec L/dt=\vec v\times m\vec v+\vec r\times m\vec a=\vec r\times\vec F=\vec\tau$ (10.26). Para un sistema, las torcas internas se anulan por pares (acción–reacción sobre la misma recta): $\sum\vec\tau_{ext}=d\vec L/dt$ (10.29). Análoga de $\sum\vec F=d\vec p/dt$.
3. **Cuerpo rígido** girando en torno a un eje de simetría: $\vec L=I\vec\omega$; en eje fijo $L_z=I\omega_z$ (10.28).
4. **Principio de conservación.** Si $\sum\vec\tau_{ext}=0$, $\vec L$ es constante (U p. 320). Si el sistema cambia su forma (no rígido) alrededor de un eje: $I_1\omega_{1z}=I_2\omega_{2z}$ (10.30). Es una ley tan fundamental como la de la energía o la cantidad de movimiento.
5. **Ejemplos.** Patinadora/bailarina y profesor con mancuernas (Ej. 10.10 p. 321: $\omega$ pasa de 0,5 a 2,5 rev/s, $K$ de 64 J a 320 J, la diferencia la aporta el trabajo de sus brazos); «choque» rotacional de discos con embrague (Ej. 10.11 pp. 321–322, $K_f=\tfrac23K_i$); puerta y bala (Ej. 10.12 p. 322). Idea clave: **$L$ se conserva, $K$ en general no**.
6. **Carácter vectorial.** También se conserva la dirección: giróscopos y precesión (U §10.7 pp. 322–325), estabilidad de una rueda o peonza.
7. **Condición a vigilar.** La conservación depende del punto respecto al cual se calcula: elegir el pivote o eje donde actúan las fuerzas desconocidas hace que su torca sea cero.

**Cuestión (a) — huevo crudo y huevo duro** (U P10.24 p. 328).
1. Huevo **duro**: es (casi) un sólido rígido. Al pararlo un instante, se detiene **todo** él: $\omega=0$ ⇒ $L=0$. Al soltarlo no hay torca externa que lo ponga en marcha: sigue quieto.
2. Huevo **crudo**: cáscara rígida + interior líquido, débilmente unido a ella. Al tocar la cáscara solo se para la cáscara; el líquido sigue girando por inercia y **conserva casi todo su momento angular** (la torca que le transmite la cáscara a través de la viscosidad en ese instante breve es pequeña).
3. Al soltarlo, el sistema huevo (cáscara + líquido) está libre de torcas externas apreciables, así que su $L$ total se conserva (10.31: las torcas internas no cambian $L$ total). La fricción interna líquido–cáscara es una torca **interna**: transfiere momento angular del líquido a la cáscara, que vuelve a girar.
4. Relación con la asignatura: conservación de $L$ de un sistema y papel de las torcas internas (U §10.6 p. 320); diferencia entre cuerpo rígido y no rígido ($L=I\omega$ solo para el rígido).

**Cuestión (b) — rotor de cola y rotores contrarrotatorios** (U P10.25 p. 328).
1. El motor aplica una torca al rotor principal; por la tercera ley, el rotor aplica una torca **igual y opuesta** al fuselaje (torcas internas del sistema helicóptero). Sistema helicóptero en vuelo estacionario: $L_{total}$ (vertical) se conserva si no hay torca externa.
2. **Para qué sirve el rotor de cola:** genera un empuje horizontal en el extremo de la cola (fuerza que el aire hace sobre él) que, por su brazo de palanca hasta el eje del rotor principal, da una **torca externa** que compensa la torca de reacción sobre el fuselaje: así el fuselaje no gira. También sirve para orientar el helicóptero (variando su empuje).
3. **Sin rotor de cola, si el piloto cambia $\omega$ del rotor principal:** $\Delta L_{rotor}+\Delta L_{fuselaje}=0$ ⇒ $I_r\Delta\omega_r=-I_f\,\omega_f$: el fuselaje empezaría a girar en sentido **contrario** al cambio del rotor (si acelera el rotor, el fuselaje gira al revés; si lo frena, gira en el mismo sentido que el rotor). Incluso a $\omega$ constante, la torca del motor que compensa la resistencia del aire en las palas haría girar el fuselaje.
4. **Dos rotores principales en sentidos opuestos:** sus momentos angulares tienen sentidos opuestos y pueden sumar cero, y las torcas de reacción sobre el fuselaje se cancelan. Si ambos cambian su $\omega$ por igual, $\Delta L_1+\Delta L_2=0$ sin que el fuselaje tenga que girar. Si girasen en el mismo sentido, sus reacciones se sumarían y el fuselaje giraría.

**Receta.** En cuestiones cualitativas de momento angular: (1) define el sistema; (2) identifica torcas externas (¿hay alguna? ¿respecto a qué eje?); (3) si no hay, $L_{total}$ constante; (4) las torcas internas solo **redistribuyen** $L$ entre partes del sistema.

**Error típico.** Decir que en el huevo crudo «la energía» lo vuelve a hacer girar (lo que se redistribuye es $L$; la energía disminuye por la fricción interna); explicar el rotor de cola como fuente de sustentación.

Teoría: U §10.5–10.6 pp. 317–322 (10.24–10.31; Ej. 10.10–10.12); §10.7 pp. 322–325; P10.24 y P10.25 p. 328.

---

## PARTE C — Problemas del solucionario (E), traducidos y ampliados, de más fácil a más difícil

### E1. Problema 10.1 — torca de una fuerza sobre una varilla (Solucionario 10-1)

**Enunciado (U p. 329, Ej. 10.1).** Calcule la torca (magnitud y dirección) alrededor del punto O debida a la fuerza $\vec F$ en cada una de las situaciones de la figura E10.1. En todos los casos, la fuerza y la varilla están en el plano de la página, la varilla mide 4,00 m de largo y $F=10{,}0$ N. (Figura, comprobada sobre el PDF: varilla horizontal con O en el extremo izquierdo. a) $F$ hacia arriba en el extremo derecho, a 90° con la varilla; b) $F$ en el extremo, hacia arriba-izquierda, formando 120° con la varilla; c) $F$ en el extremo, hacia arriba-derecha, a 30° con la varilla; d) $F$ hacia abajo-derecha a 60° con la varilla, aplicada a 2,00 m del extremo derecho, es decir, a 2,00 m de O; e) $F$ aplicada en O, a 60°; f) $F$ en el extremo derecho, dirigida a lo largo de la varilla hacia O.)

**Solución.**

1. **Herramienta.** $\tau=Fl=rF\sin\phi$ (10.2, U p. 305): $r$ = distancia de O al punto de aplicación, $\phi$ = ángulo entre $\vec r$ y $\vec F$, $l=r\sin\phi$ = brazo de palanca. Sentido: antihorario (+, $\vec\tau$ saliendo de la página) u horario (−, entrando), por la regla de la mano derecha.
2. **a)** $r=4{,}00$ m, $\phi=90^\circ$: $\tau=(10)(4)\sin90^\circ=$ **40,0 N·m**, antihoraria (sale de la página).
3. **b)** $\phi=120^\circ$: $l=4\sin120^\circ=3{,}46$ m; $\tau=$ **34,6 N·m**, antihoraria.
4. **c)** $\phi=30^\circ$: $l=2{,}00$ m; $\tau=$ **20,0 N·m**, antihoraria.
5. **d)** $r=2{,}00$ m, $\phi=60^\circ$: $\tau=(10)(2)\sin60^\circ=$ **17,3 N·m**, horaria (entra en la página): la componente vertical de $F$ apunta hacia abajo.
6. **e)** $r=0$: $\tau=$ **0** (aplicada en el propio O).
7. **f)** $\phi=180^\circ$ (la recta de acción pasa por O): $l=0$, $\tau=$ **0**.

**Receta.** Torca = fuerza × distancia **perpendicular** de O a la recta de acción. Si esa recta pasa por O (fuerza aplicada en O o dirigida hacia O), la torca es cero. Signo: ¿haría girar como las agujas del reloj (−) o al revés (+)?

**Error típico.** Usar $\cos\phi$ en vez de $\sin\phi$; usar la longitud total de la varilla en d); olvidar el sentido.

**Valores para la figura.** Varilla 4 m; brazos de palanca $l=4;\ 3{,}46;\ 2;\ 1{,}73;\ 0;\ 0$ m; torcas 40,0; 34,6; 20,0; −17,3; 0; 0 N·m.

Teoría: U §10.1 pp. 304–306 (10.1–10.3).

---

### E2. Problema 10.17 — aro que rueda sin resbalar (Solucionario 10-8)

**Enunciado (U p. 330).** Un aro de 2,20 kg y 1,20 m de diámetro rueda hacia la derecha sin resbalar sobre un piso horizontal a 2,60 rad/s constantes. a) ¿Qué tan rápido se mueve su centro? b) ¿Cuál es la energía cinética total del aro? c) Calcule el vector velocidad de cada uno de los siguientes puntos, vistos por una persona en reposo en el suelo: i. el punto más alto del aro; ii. el punto más bajo; iii. un punto en el lado derecho del aro, a la mitad de la distancia entre la parte superior y la inferior. d) Calcule el vector velocidad de cada uno de esos puntos vistos por alguien que se mueve con la misma velocidad que el aro.

**Solución.**

1. **a)** Rodar sin resbalar (10.11): $v_{cm}=R\omega=(0{,}600)(2{,}60)=$ **1,56 m/s**.
2. **b)** (10.8): $K=\tfrac12Mv_{cm}^2+\tfrac12I_{cm}\omega^2$ con $I_{cm}=MR^2$ (aro, tabla 9.2) y $\omega=v_{cm}/R$: $K=\tfrac12Mv_{cm}^2+\tfrac12Mv_{cm}^2=Mv_{cm}^2=(2{,}20)(1{,}56)^2=$ **5,35 J** (mitad traslación, mitad rotación: es propio del aro).
3. **Idea para c).** Velocidad de un punto = velocidad del CM + velocidad de giro alrededor del CM (10.9, U p. 310). La de giro tiene módulo $R\omega=v_{cm}$, tangente al aro; el aro rueda hacia la derecha ⇒ gira en sentido horario.
4. **c-i)** Arriba, la de giro apunta a la derecha: $v=v_{cm}+R\omega=2v_{cm}=$ **3,12 m/s, hacia la derecha**.
5. **c-ii)** Abajo, la de giro apunta a la izquierda: $v=v_{cm}-R\omega=$ **0** (por eso «no resbala»).
6. **c-iii)** Punto derecho a la altura del centro: la de giro (horario) apunta hacia **abajo**; se suma a $v_{cm}$ hacia la derecha: $|v|=\sqrt{v_{cm}^2+(R\omega)^2}=\sqrt2\,v_{cm}=$ **2,21 m/s, a 45° por debajo de la horizontal** (hacia la derecha y abajo).
7. **d)** Para quien se mueve con el centro, el aro solo gira en torno a un eje fijo: todos los puntos del borde a 1,56 m/s tangentes: i) **1,56 m/s a la derecha**; ii) **1,56 m/s a la izquierda**; iii) **1,56 m/s hacia abajo**.

**Receta.** En rodadura: $\vec v_{punto}=\vec v_{cm}+\vec v_{giro}$, con $|\vec v_{giro}|=R\omega=v_{cm}$ y tangente; el punto de contacto está en reposo y el de arriba va a $2v_{cm}$.

**Error típico.** Creer que todos los puntos del aro van a $v_{cm}$ respecto al suelo; usar $I=\tfrac12MR^2$ para un aro.

**Valores para la figura.** $R=0{,}60$ m; vectores: arriba 3,12 → ; abajo 0; lado derecho 2,21 a 45° abajo; centro 1,56 →. Similar a U fig. 10.13 p. 311 (puntos 1–4).

Teoría: U §10.3 pp. 309–311 (10.8–10.11, fig. 10.13); tabla 9.2 p. 286.

---

### E3. Problema 10.10 — cuerda enrollada en una rueda con eje fijo (Solucionario 10-4/10-5)

**Enunciado (U p. 329).** Una cuerda se enrolla en el borde de una rueda sólida uniforme de 0,250 m de radio y 9,20 kg. Se tira de la cuerda con una fuerza horizontal constante de 40,0 N hacia la derecha, retirándola tangencialmente de la rueda, que está montada con cojinetes sin fricción en un eje horizontal que pasa por su centro. a) Calcule la aceleración angular de la rueda y la aceleración de la parte de la cuerda ya retirada. b) Determine la magnitud y la dirección de la fuerza que ejerce el eje sobre la rueda. c) ¿Cuál de las respuestas a) y b) cambiaría si el tirón fuera hacia arriba en vez de horizontal, y por qué?

**Solución** ($g=9{,}8$ m/s²).

1. **Momento de inercia.** Disco macizo: $I=\tfrac12MR^2=\tfrac12(9{,}20)(0{,}250)^2=0{,}2875$ kg·m² (tabla 9.2).
2. **a) Torca.** El tirón $P=40{,}0$ N es tangente al borde: brazo $R$. $\tau=PR=10{,}0$ N·m. El peso y la fuerza del eje actúan en el eje: torca nula.
3. **$\sum\tau=I\alpha$ (10.7):** $\alpha=\tau/I=10{,}0/0{,}2875=$ **34,8 rad/s²**.
4. **Cuerda.** No resbala: su aceleración es la tangencial del borde, $a=R\alpha=$ **8,70 m/s²** (U ec. 9.14 p. 281).
5. **b) Fuerza del eje.** El centro de la rueda no se mueve ⇒ $\sum\vec F=0$ (primera ley). Fuerzas: $P$ (40,0 N a la derecha, horizontal), peso $Mg=90{,}2$ N abajo, eje $\vec F$. $F_x=-40{,}0$ N, $F_y=+90{,}2$ N ⇒ $|F|=\sqrt{40{,}0^2+90{,}2^2}=$ **98,6 N**, a $\arctan(90{,}2/40{,}0)=$ **66,1° por encima de la horizontal, hacia la izquierda** (lado opuesto al tirón).
6. **c) Tirón vertical hacia arriba.** La torca sigue siendo $PR$ (la cuerda sigue saliendo tangente al borde, con el mismo brazo): **a) no cambia**. En b) el equilibrio vertical es $F+P=Mg$ ⇒ $F=90{,}2-40{,}0=$ **50,2 N hacia arriba**: **b) sí cambia**.

**Receta.** Rueda con eje fijo: torcas solo de las fuerzas que no pasan por el eje ⇒ $\alpha=\tau/I$, $a_{cuerda}=R\alpha$. La fuerza del eje sale de $\sum\vec F=0$ (el CM está quieto), no de las torcas.

**Error típico.** Pensar que la fuerza del eje es solo el peso; usar $I=MR^2$; dar $a=P/M$ (eso sería si la rueda se trasladara sin eje).

**Valores para la figura.** DCL: $P=40{,}0$ N → en el borde superior (o tangente), $Mg=90{,}2$ N ↓ en el centro, $F_{eje}=98{,}6$ N a 66,1° arriba-izquierda; $\alpha=34{,}8$ rad/s², $a=8{,}70$ m/s².

Teoría: U §10.2 pp. 306–308 (10.7, Ej. 10.2); §9.3 p. 281.

---

### E4. Problema 10.25 — cilindro hueco que cae desenrollando una cuerda (Solucionario 10-12)

**Enunciado (U p. 330).** Una cuerda delgada y ligera se enrolla alrededor del borde exterior de un cilindro hueco uniforme de masa 4,75 kg con radios interno 20,0 cm y externo 35,0 cm (figura E10.25). El cilindro se libera desde el reposo. a) ¿Qué distancia debe haber caído antes de que su centro se mueva a 6,66 m/s? b) Si se suelta ese cilindro sin cuerda, ¿con qué rapidez se mueve su centro tras caer la distancia del inciso a)? c) ¿Por qué se obtienen dos respuestas distintas si cae la misma distancia?

**Solución** ($g=9{,}8$ m/s²).

1. **Por qué energía.** Piden una distancia a partir de una velocidad, sin tiempos: la conservación de la energía es lo más directo (U §10.3 p. 312, Ej. 10.4). La tensión no hace trabajo neto: su punto de aplicación (donde la cuerda deja el cilindro) está instantáneamente en reposo.
2. **Momento de inercia** del cilindro hueco grueso (tabla 9.2): $I=\tfrac12M(R_1^2+R_2^2)$, con $R_1=0{,}200$ m, $R_2=0{,}350$ m.
3. **Ligadura.** La cuerda está en el borde **exterior**: $v_{cm}=R_2\omega$.
4. **Energía.** $Mgd=\tfrac12Mv_{cm}^2+\tfrac12I\omega^2=\tfrac12Mv_{cm}^2\left[1+\tfrac12\left(1+\tfrac{R_1^2}{R_2^2}\right)\right]$. El corchete vale $1+\tfrac12(1+0{,}3265)=1{,}663$.
5. **a)** $d=\dfrac{1{,}663\,v_{cm}^2}{2g}=\dfrac{1{,}663\,(6{,}66)^2}{2(9{,}8)}=$ **3,76 m**. La masa se simplifica.
6. **b) Sin cuerda.** No gira: caída libre, $v=\sqrt{2gd}=\sqrt{2(9{,}8)(3{,}764)}=$ **8,59 m/s**.
7. **c)** La misma $\Delta U=Mgd$ se convierte, con cuerda, en traslación **y** rotación (el 40 % va a rotación: $0{,}663/1{,}663$); sin cuerda, todo en traslación. Por eso con cuerda el centro va más lento.
8. **Casos límite (comprobación).** Cilindro macizo ($R_1=0$): $d=\tfrac32v^2/(2g)=3{,}39$ m. Hueco de pared delgada ($R_1=R_2$): $d=v^2/g=4{,}53$ m (en metros, como $d$ en a). Nuestro caso, 3,76 m, queda entre ambos, como debe ser.

**Resultado:** a) 3,76 m; b) 8,59 m/s; c) parte de la energía va a rotación.

**Receta.** Cuerpo que cae desenrollando una cuerda: $Mgd=\tfrac12Mv^2(1+I/(MR^2))$ con $R$ = radio donde está la cuerda. El factor $1+I/(MR^2)$ mide «cuánto cuesta» hacerlo girar.

**Error típico.** Usar $I=MR^2$ (pared delgada) o $\tfrac12MR^2$ (macizo) para un hueco grueso; poner $\omega=v/R_1$ (la cuerda está en el radio exterior); mezclar cm y m en los radios.

**Valores para la figura.** Cilindro con $R_1=20$ cm, $R_2=35$ cm; caída 3,76 m; $v=6{,}66$ m/s con cuerda (ω = 19,0 rad/s) frente a 8,59 m/s sin cuerda; barras de energía: 60 % traslación, 40 % rotación.

Teoría: U §10.3 pp. 310–312 (10.8, 10.11, Ej. 10.4); tabla 9.2 p. 286; §7.1 p. 205.

---

### E5. Problema 10.26 — bola de bolos que sube rodando (Solucionario 10-12)

**Enunciado (U pp. 330–331).** Bola que rueda cuesta arriba. Una bola de bolos sube rodando sin resbalar por una rampa que forma un ángulo $\beta$ con la horizontal (vea el ejemplo 10.7). Trate la bola como una esfera sólida uniforme, sin tomar en cuenta los orificios. a) Dibuje el diagrama de cuerpo libre. Explique por qué la fricción debe tener dirección cuesta arriba. b) ¿Qué aceleración tiene el centro de masa? c) ¿Qué coeficiente mínimo de fricción estática se necesita para que la bola no resbale?

**Solución.**

1. **a) DCL y sentido de la fricción.** Peso (CM), normal (recta por el CM) y fricción estática en el contacto. Mientras sube, la bola se frena: $v_{cm}$ disminuye y, como rueda, también $\omega=v_{cm}/R$. Para **frenar el giro** hace falta una torca opuesta a $\omega$; la única que la puede dar es la fricción, y para ello debe apuntar **cuesta arriba** (es la misma dirección que al bajar en el Ej. 10.7: en los dos casos $\alpha$ tiene el sentido de «girar hacia abajo de la rampa»).
2. **b) Ecuaciones** (eje $x$ rampa abajo, igual que el Ej. 10.7): $mg\sin\beta-f=ma_{cm}$; $fR=\tfrac25mR^2\alpha$; $a_{cm}=R\alpha$ ⇒ $f=\tfrac25ma_{cm}$ ⇒ $mg\sin\beta=\tfrac75ma_{cm}$ ⇒ $a_{cm}=\tfrac57g\sin\beta$ **rampa abajo** (la bola que sube se frena con esa aceleración). Es la misma que al bajar.
3. **c)** $f=\tfrac27mg\sin\beta\le\mu_smg\cos\beta$ ⇒ $\mu_s\ge\tfrac27\tan\beta$. (Ej.: $\beta=30^\circ$ ⇒ $\mu_s\ge0{,}165$, $a_{cm}=3{,}50$ m/s².)
4. **Comentario.** Sin fricción, $a=g\sin\beta$ (frena más) y la bola llega menos alto porque conserva su energía de rotación; con fricción, la fricción (que no hace trabajo) convierte esa energía de rotación en energía de traslación que luego se convierte en altura.

**Receta.** El sentido de la fricción lo decide la $\alpha$ necesaria, no el sentido del movimiento. Para $I=cMR^2$: $a=\dfrac{g\sin\beta}{1+c}$ y $\mu_{s,min}=\dfrac{c}{1+c}\tan\beta$, tanto subiendo como bajando.

**Error típico.** Dibujar la fricción cuesta abajo «porque se opone al movimiento de subida».

**Valores para la figura.** Rampa $\beta$ (p. ej. 30°): $\vec v$ rampa arriba, $\vec a_{cm}$ rampa abajo, $f$ rampa arriba, $\omega$ disminuyendo.

Teoría: U §10.3 pp. 313–314 (10.12–10.13, Ej. 10.7); §5.3 p. 144.

---

### E6. Problema 10.54 — piedra de afilar con fricción del hacha y del eje (Solucionario 10-21)

**Enunciado (U p. 333).** Una piedra de afilar de 50,0 kg es un disco sólido de 0,520 m de diámetro. Se empuja un hacha contra el borde con una fuerza normal de 160 N (figura P10.54). El coeficiente de fricción cinética entre la piedra y el hacha es 0,60, y hay una torca de fricción constante de 6,50 N·m entre el eje de la piedra y sus cojinetes. a) ¿Qué fuerza debe aplicarse tangencialmente al extremo de una manivela de 0,500 m para llevar la piedra del reposo a 120 rev/min en 9,00 s? b) Una vez a 120 rev/min, ¿qué fuerza tangencial mantendría la rapidez angular constante? c) ¿Cuánto tarda la piedra en detenerse si solo actúa la fricción del eje y está girando a 120 rev/min?

**Solución.**

1. **Unidades.** $\omega=120\ \text{rev/min}\cdot\dfrac{2\pi\ \text{rad}}{1\ \text{rev}}\cdot\dfrac{1\ \text{min}}{60\ \text{s}}=4\pi=12{,}57$ rad/s (rad/s obligatorio en $\tau=I\alpha$).
2. **Momento de inercia.** $I=\tfrac12MR^2=\tfrac12(50{,}0)(0{,}260)^2=1{,}69$ kg·m² (radio = 0,260 m).
3. **Aceleración angular** ($\alpha$ constante, U ec. 9.7): $\alpha=\omega/t=4\pi/9{,}00=1{,}396$ rad/s².
4. **Torca neta necesaria** (10.7): $\tau_{neta}=I\alpha=2{,}36$ N·m.
5. **Torcas que se oponen.** (i) Fricción del hacha: $f=\mu_kn=0{,}60\cdot160=96$ N tangente al borde ⇒ torca $fR=96\cdot0{,}260=24{,}96$ N·m. (ii) Eje: 6,50 N·m.
6. **a) Balance de torcas.** $F\cdot0{,}500-24{,}96-6{,}50=2{,}36$ ⇒ $F=\dfrac{2{,}36+6{,}50+24{,}96}{0{,}500}=$ **67,6 N**.
7. **b) Velocidad constante** ⇒ $\alpha=0$ ⇒ $\sum\tau=0$: $F'=\dfrac{6{,}50+24{,}96}{0{,}500}=$ **62,9 N**.
8. **c) Frenado solo por el eje.** $\alpha=-6{,}50/1{,}69=-3{,}85$ rad/s² ⇒ $t=\omega_0/|\alpha|=12{,}57/3{,}85=$ **3,27 s** (gira 20,5 rad ≈ 3,27 rev hasta pararse).

**Receta.** Varias torcas en un eje fijo: escribe $\sum\tau=(\text{motrices})-(\text{resistentes})=I\alpha$, convierte rpm a rad/s y despeja. Si piden «mantener $\omega$ constante», $\sum\tau=0$.

**Error típico.** Usar el diámetro como radio; dejar $\omega$ en rev/min; olvidar alguna torca resistente; usar el brazo del borde (0,26 m) para la fuerza de la manivela (0,50 m).

**Valores para la figura.** Disco $R=0{,}26$ m; manivela 0,50 m con $F=67{,}6$ N; hacha con $n=160$ N y $f=96$ N; $\tau_{eje}=6{,}50$ N·m; $\tau_{neta}=2{,}36$ N·m.

Teoría: U §10.2 pp. 306–308 (10.7); §9.2 pp. 278–279 (9.7); §5.3 p. 143 (5.3).

---

### E7. Problema 10.67 — el yoyo (Solucionario 10-28)

**Enunciado (U p. 334).** El yoyo. Un yoyo consiste en dos discos uniformes, cada uno de masa $m$ y radio $R$, conectados por un eje ligero de radio $b$. Una cuerda delgada y ligera se enrolla varias veces en el eje y luego se mantiene fija mientras el yoyo se libera del reposo; el yoyo cae al desenrollarse el hilo. Calcule las aceleraciones lineal y angular del yoyo y la tensión en la cuerda.

**Solución.**

1. **Datos.** Masa total $2m$; $I_{cm}=2\cdot\tfrac12mR^2=mR^2$; brazo de la tensión $b$.
2. **Traslación (10.12)**, eje hacia abajo: $2mg-T=2ma$.
3. **Rotación (10.13):** $Tb=I_{cm}\alpha=mR^2\alpha$.
4. **Ligadura:** $a=b\alpha$ ⇒ $T=mR^2a/b^2$.
5. **Resolver:** $2mg=a\left(2m+\dfrac{mR^2}{b^2}\right)$ ⇒ $a=\dfrac{2b^2g}{2b^2+R^2}=\dfrac{g}{1+R^2/(2b^2)}$; $\alpha=\dfrac ab=\dfrac{2bg}{2b^2+R^2}$; $T=2m(g-a)=\dfrac{2mgR^2}{2b^2+R^2}=\dfrac{2mg}{1+2(b/R)^2}$.
6. **Casos límite.** $b\to0$: $a\to0$ y $T\to2mg$ (el yoyo «se queda girando»). $b\to R$: $a\to\tfrac23g$, el valor del cilindro macizo del Ej. 10.6 (U p. 313) ✔. Con los datos de X2 ($R=40$ mm, $b=25$ mm) da $a=g/2{,}28=4{,}30$ m/s² ✔.

**Receta.** Es X2 en símbolos: compara siempre con los casos límite.

**Error típico.** Igual que en X2: confundir $R$ (masa) y $b$ (cuerda).

**Valores para la figura.** Curva $a/g=1/(1+R^2/(2b^2))$ frente a $b/R$ entre 0 y 1: de 0 a 2/3; punto en $b/R=0{,}625$, $a/g=0{,}439$ (yoyó de X2).

Teoría: U §10.3 pp. 313–314 (10.12–10.13, Ej. 10.6).

---

### E8. Problema 10.86 — bloque en una mesa sin fricción con la cuerda que se acorta (Solucionario 10-36)

**Enunciado (U p. 336).** Un bloque pequeño de 0,130 kg se ata a una cuerda que pasa por un orificio en una superficie horizontal sin fricción (figura E10.40). El bloque gira originalmente en un círculo de 0,800 m de radio alrededor del orificio, con rapidez tangencial de 4,00 m/s. Se tira lentamente de la cuerda desde abajo, acortando el radio. La resistencia a la ruptura de la cuerda es de 30,0 N. ¿Qué radio tendrá el círculo cuando la cuerda se rompa?

**Solución.**

1. **¿Se conserva $L$ respecto al orificio?** La tensión apunta siempre hacia el orificio (radial): $\vec r\times\vec T=0$. Peso y normal son verticales y se anulan. Torca neta nula ⇒ $L=mvr$ constante (10.25 con $l=r$; U §10.6 p. 320).
2. **$L$ inicial.** $L=mv_1r_1=(0{,}130)(4{,}00)(0{,}800)=0{,}416$ kg·m²/s.
3. **Tensión en función de $r$.** La tensión es la fuerza centrípeta: $T=mv^2/r$ (U §3.4 y §5.4). Con $v=L/(mr)$: $T=\dfrac{L^2}{mr^3}$. Al reducir $r$, $T$ crece como $1/r^3$.
4. **Rotura.** $T=30{,}0$ N ⇒ $r^3=\dfrac{L^2}{mT_{max}}=\dfrac{(0{,}416)^2}{(0{,}130)(30{,}0)}$ ⇒ $r=$ **0,354 m**.
5. **Comprobación.** $v=L/(mr)=9{,}04$ m/s; $mv^2/r=30{,}0$ N ✔. Tensión inicial: 2,6 N.
6. **Energía.** $K$ pasa de 1,04 J a 5,31 J: no se conserva; el aumento es el trabajo de la mano que tira de la cuerda (la fuerza tiene componente a lo largo del desplazamiento radial hacia dentro).

**Receta.** Fuerza central (siempre hacia un punto) ⇒ $L=mvr$ constante respecto a ese punto. Combínalo con la segunda ley en la dirección radial ($T=mv^2/r$) y elimina $v$.

**Error típico.** Conservar la energía cinética (o la rapidez) en lugar de $L$; usar $T=mv_1^2/r$ con la velocidad inicial.

**Valores para la figura.** Vista desde arriba: dos círculos, $r_1=0{,}800$ m ($v=4{,}00$ m/s, $T=2{,}6$ N) y $r_2=0{,}354$ m ($v=9{,}04$ m/s, $T=30{,}0$ N); gráfica $T(r)=L^2/(mr^3)$.

Teoría: U §10.5–10.6 pp. 317–322 (10.25, 10.29–10.30); §3.4 pp. 83–84.

---

### E9. Problema 10.87 — corredor sobre una tornamesa (Solucionario 10-36/10-37)

**Enunciado (U p. 336).** Un hombre de 55 kg corre alrededor del borde de una tornamesa horizontal montada en un eje vertical sin fricción que pasa por su centro. La velocidad del corredor respecto a la Tierra tiene magnitud 2,8 m/s. La tornamesa gira en la dirección opuesta con velocidad angular de magnitud 0,20 rad/s respecto a la Tierra. El radio de la tornamesa es 3,0 m y su momento de inercia respecto al eje de rotación es 80 kg·m². Calcule la velocidad angular final del sistema si el corredor se detiene respecto a la tornamesa (puede considerarse partícula).

**Solución.**

1. **Sistema y conservación.** Hombre + tornamesa. Eje sin fricción y vertical; peso y normales verticales ⇒ sin torca externa respecto al eje ⇒ $L_z$ se conserva (U §10.6 p. 320). Al pararse el corredor, las fuerzas pies–plataforma son internas.
2. **Signos.** Sentido + = el del corredor. Corredor: $L_h=+mRv=(55)(3{,}0)(2{,}8)=462$ kg·m²/s (10.25). Tornamesa (sentido contrario): $L_t=-I\omega_1=-(80)(0{,}20)=-16$ kg·m²/s.
3. **$L$ inicial total:** $446$ kg·m²/s.
4. **Final.** Se mueven juntos: $I_{tot}=I+mR^2=80+55(3{,}0)^2=575$ kg·m²; $L=I_{tot}\omega_2$.
5. **Resultado.** $\omega_2=446/575=$ **0,776 rad/s, en el sentido en que corría el hombre**: la tornamesa invierte su giro, porque el corredor tenía mucho más momento angular que ella.
6. **Energía.** $K$: 217 J → 173 J. Se pierden 44 J (como en un choque inelástico: el corredor «frena» contra la plataforma).

**Receta.** Partícula + plataforma con eje libre: suma algebraica de $mRv$ (partícula) e $I\omega$ (plataforma) con un sentido positivo elegido; si al final van juntos, $\omega=L/(I+mR^2)$.

**Error típico.** Sumar los dos momentos angulares sin signo (daría 0,83 rad/s); olvidar el término $mR^2$ del corredor en el $I$ final; usar la velocidad del corredor respecto a la plataforma (aquí es respecto a la Tierra, como debe ser).

**Valores para la figura.** Vista desde arriba: plataforma $R=3$ m girando en un sentido a 0,20 rad/s, corredor en el borde a 2,8 m/s en el otro; final: todo a 0,776 rad/s en el sentido del corredor.

Teoría: U §10.5–10.6 pp. 317–322 (10.25, 10.28, 10.30; Ej. 10.11).

---

## Resumen de resultados (para la chuleta y las figuras)

| Ejercicio | Resultados |
|---|---|
| X1 Feb 2023 1ª P-2 | $\mu_{s,min}=0{,}397$; $a=5{,}01$ m/s²; hueco necesita 0,596 ⇒ resbala |
| X2 Feb 2018 1ª P-1 | $\alpha=172$ rad/s²; $a=4{,}30$ m/s²; $v=2{,}93$ m/s ($T=0{,}550$ N) |
| X3 Feb 2025 1ª P-1 | $F_{max}=4{,}17$ kN; $a_{max}=1{,}93$ m/s²; $t_{min}=2{,}60$ s |
| X4 Feb 2019 1ª P-2 | $t=23{,}0$ s; $a=5{,}88$ m/s² ($\alpha=9{,}80$ rad/s²); a 4 s: $a=0{,}178$ m/s², $\alpha=0{,}296$ rad/s² |
| X5 Feb 2024 2ª P-1 | $\omega=60$ rad/s; $K=57$ kJ; energía muscular (trabajo interno) |
| X6 Sep 2019 P-1(a) | $L_A=mva$; $\omega=3mva/(ML^2+3ma^2)$ |
| X7 Feb 2025 2ª P-3 | $dW=\tau d\theta$, $W=\Delta K_{rot}$, $P=\tau\omega$; ruedas ligeras y macizas; $a_{tan}=0$, $a_{rad}=\omega^2R$ |
| X8 Sep 2024 P-3 | $\sum\tau_{ext}=0\Rightarrow L$ cte; huevo: torca interna devuelve $L$ a la cáscara; rotor de cola compensa la torca de reacción |
| E 10.1 | 40,0; 34,6; 20,0; 17,3 (horaria); 0; 0 N·m |
| E 10.17 | $v_{cm}=1{,}56$ m/s; $K=5{,}35$ J; 3,12 / 0 / 2,21 m/s |
| E 10.10 | $\alpha=34{,}8$ rad/s²; $a=8{,}70$ m/s²; $F_{eje}=98{,}6$ N a 66,1°; vertical: 50,2 N |
| E 10.25 | $d=3{,}76$ m; $v=8{,}59$ m/s |
| E 10.26 | $a=\tfrac57g\sin\beta$; $\mu_s\ge\tfrac27\tan\beta$ |
| E 10.54 | $F=67{,}6$ N; $F'=62{,}9$ N; $t=3{,}27$ s |
| E 10.67 | $a=g/(1+R^2/2b^2)$; $T=2mg/(1+2b^2/R^2)$ |
| E 10.86 | $r=0{,}354$ m ($v=9{,}04$ m/s) |
| E 10.87 | $\omega_2=0{,}776$ rad/s en el sentido del corredor |

---

## Notas internas para el redactor (NO publicar en el HTML; regla 8 bis)

1. **Datos dudosos de los escaneos.**
   - *Feb 2019 1ª P-2:* el enunciado no dice si el cilindro es macizo ni da unidades de $F=t^2/2$ ni distingue $\mu_s$ de $\mu_k$; la frase «aceleración de cualquier punto del centro del cilindro» es ambigua. Se han declarado las hipótesis (macizo, N y s, $\mu_s=\mu_k$, puntos del eje) dentro de la solución, como hipótesis, sin comentarios sobre el enunciado. «siento t el tiempo» se ha escrito «siendo».
   - *Feb 2018 1ª P-1 y Feb 2019 1ª P-2:* no dan $g$; se usa 9,8 (los resultados con 9,81 difieren en la tercera cifra o menos, indicado).
   - *Sep 2019 P-1:* no dice la dirección de la bala ni la posición inicial de la varilla; se supone varilla vertical en reposo y bala horizontal perpendicular.
   - *Feb 2024 2ª P-1:* los datos son nítidos en el PDF; el resultado (60 rad/s, 57 kJ) es físicamente exagerado pero coherente con los datos: se presenta como idealización.
   - *Feb 2025 1ª P-1:* 490 kg comprobado en la imagen del PDF (no es fallo de OCR); es coherente (rodillo de acero de ~0,32 m de largo) y no afecta al tiempo de (b).
   - *Feb 2023 1ª P-2:* «Se deja caer» se interpreta como «se suelta desde el reposo»; la ampliación de (c) supone $\mu_k=\mu_s$.
2. **E 10.25:** el caso límite de pared delgada es $d=4{,}53$ m (metros). En el HTML se escribe directamente así.
3. **E 10.87:** el solucionario toma positivo el sentido de la tornamesa (−0,776 rad/s); aquí se toma el del corredor (+0,776 rad/s). Es el mismo resultado físico; usar la versión de este documento.
4. **E 10.10 c):** el enunciado de U pregunta «por qué cambiarían a) y b)»; la respuesta correcta es que a) no cambia y b) sí. Se ha redactado la pregunta en forma neutra («¿cuál de las respuestas cambiaría…?»).
5. **E 10.54 c)** no está resuelto en el solucionario; resuelto aquí ($t=3{,}27$ s) y verificado.
6. **Índice:** la entrada «Feb 2018 1ª P-3 Opción 3.2 Momento angular» de `examenes_por_tema.md` no corresponde (la 3.2 de ese examen es «Energía del MAS», comprobado en la imagen). No usarla. Otros exámenes de teoría con «Momento angular. Conservación» sin cuestiones: Feb 2019 1ª P-3 (3.2) y Feb 2020 2ª P-3 (3.1); su esquema es el de X8.
