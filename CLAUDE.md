# CLAUDE.md — Física I (UNED, Grado en Ingeniería, curso 2026-27)

**Objetivo del proyecto:** que el usuario apruebe la asignatura y sepa resolver los problemas que caen en examen.
**Producto principal:** un resumen HTML por cada **tema** dentro de su **bloque** (`temas/tema_NN_slug.html`), pensado para alguien que lo estudia **por primera vez**, con ejercicios resueltos (del libro y, siempre que exista, de examen real) y **la fuente (libro + página) visible en lateral o al pasar el ratón**.

Idioma: **español** (todo el contenido, comentarios y comunicación con el usuario). El libro de ejercicios (E) está en inglés: traducir al redactar, no copiar literal.

Esta asignatura **no tiene subtemas**, sino **bloques que agrupan temas completos** (p. ej. Bloque Mecánica → Tema 11 Equilibrio y Elasticidad). Un HTML = un tema completo (no una subsección).

## 1. Fuentes (carpeta padre `E:\UNED\FISICA I\`)

| Clave | Fuente | Archivo original | Texto extraído (`fuentes_txt/`) | Uso |
|---|---|---|---|---|
| **U** | *Sears & Zemansky, Física Universitaria con Física Moderna* (vol. 1, 14ª ed., Young & Freedman). **Libro oficial** de la bibliografía básica de la guía docente | `Fisica_universitara_con_fisica_moderna_I.pdf` | `sears.txt` | Estructura, definiciones, notación, figuras y enunciados de referencia. **Manda el temario.** |
| **E** | *Instructor's Solutions Manual*, University Physics 14th ed. (mismo autor, en **inglés**) | `INSTRUCTORS_SOLUTIONS_MANUAL_14TH_EDITIO 2.pdf` | `solman.txt` | Desarrollo paso a paso de los problemas de fin de capítulo de U (mismo número de problema, p. ej. «1.45»). Traducir y ampliar pasos al redactar, no copiar literal. |
| **A** | Academia_Tec — apuntes/resúmenes complementarios de terceros, uno por tema | `Academia_Tec/TEMA NN-*.pdf` (temas 1-9) y `17/18 ANALISIS *.pdf` | `fuentes_txt/academia_tec/temaNN_academia.txt` | Explicación alternativa cuando aclare más que U. **Cobertura incompleta: ver aviso abajo.** |
| **X** | Exámenes reales de convocatorias pasadas (2018-2025) | `Examanes/*.pdf` (14 individuales + 2 recopilatorios) | `fuentes_txt/examenes/*.txt` + índice `fuentes_txt/examenes_por_tema.md` | Ejercicios de examen reales citables por tema — **usar siempre que exista uno para el tema que se redacta.** |
| Guía | Guía docente oficial, asignatura 68901016, curso 2026/27 | `Guia.pdf` | `fuentes_txt/guia.txt` | Cronograma (lista de 20 temas), sistema de evaluación, bibliografía. Fuente de verdad del temario; no inventar nada que no esté aquí. |

Los `.txt` se generan con `pdftotext -layout -enc UTF-8` (páginas separadas por `\f`). Si `pdftotext` de Git Bash falla por tildes/espacios en el nombre, copiar antes el PDF a un nombre ASCII y extraer desde ahí.

### Aviso sobre Academia_Tec (fuente A)
Solo hay PDF para los temas 1-9, 17 y 18 (no existe nada para 10-16, 19-20). De esos, **los temas 1-9 son escaneos de imagen sin capa de texto**: `pdftotext` no extrae nada legible y no se ha hecho OCR (fuera del alcance de esta fase). Solo **17 y 18 tienen texto digital extraído y usable** (`fuentes_txt/academia_tec/tema17_academia.txt`, `tema18_academia.txt`). Para el resto de temas, A simplemente no está disponible: usar U (y X para ejemplos) sin forzar una cita a A que no existe. Si en el futuro se quiere aprovechar Academia_Tec 1-9, haría falta OCR (p. ej. renderizar a imagen con PyMuPDF y leer con visión, como se hizo para los exámenes escaneados).

### Numeración de páginas (citar SIEMPRE la página **impresa** cuando exista)
- **U**: página impresa = página PDF **− 28**. Offset verificado de forma independiente en 8 puntos a lo largo de todo el volumen (cabeceras de sección, p. ej. «1.10 Productos de vectores 23» en PDF 51 → 51−28=23; «12.2 Presión en un fluido 373» en PDF 401 → 401−28=373; «20.8 Interpretación microscópica de la entropía 673» en PDF 701 → 701−28=673). Es constante en todo el libro (no cambia por capítulo).
- **E (solman)**: no tiene página de libro U. Usa su propia paginación por capítulo, formato «**cap-página**» impreso en la cabecera de cada página (p. ej. «Units, Physical Quantities, and Vectors 1-5», «Motion Along a Straight Line 2-13»). Citar tal cual (p. ej. «Solucionario 1-5») **más el número de problema** (idéntico al de U, p. ej. Problema 1.45).
- **A**: cada tema es un PDF independiente con su propia paginación interna (empieza en 1). Citar como «Academia_Tec Tema N» sin página, o con la página del PDF si aporta algo localizar.
- **X**: no hay página; citar como «Examen «convocatoria» P-N» usando exactamente la convocatoria y el número de pregunta tal como aparecen en `fuentes_txt/examenes_por_tema.md` (p. ej. «Examen Febrero 2025 (1ª semana) P-1»).
- El offset de U está comprobado hasta la página impresa 673 (fin del cap. 20); no hace falta ni se debe extrapolar más allá del temario de la asignatura.

## 2. Temario y cronograma (curso 2026-27)

La guía docente (`fuentes_txt/guia.txt`) da una lista plana de **20 temas**, sin agruparlos en bloques ni dar fechas por módulo (las fechas de PEC que aparecen en el PDF, «01/11», «01/12», «15/12», «10/01», son un resto de una guía de curso anterior sin actualizar — **no fiables como fecha real**, avisar al usuario de que las fechas de PEC las publica AGORA). La agrupación en **3 bloques** de abajo no es una invención: es la propia estructura en partes del libro U (Sears/Zemansky Vol. 1: Parte 1 Mecánica caps. 1-13, Parte 2 Ondas/Acústica caps. 14-16, Parte 3 Termodinámica caps. 17-20).

| Bloque | Tema | Título (guía docente) | U — página impresa de inicio (offset −28, verificado) |
|---|---|---|---|
| **Mecánica** | 1 | Unidades, cantidades físicas y vectores | p. 2 |
| | 2 | Movimiento rectilíneo | p. 36 |
| | 3 | Movimiento en dos o en tres dimensiones | p. 68 |
| | 4 | Leyes del movimiento de Newton *(en U: «Leyes de Newton del movimiento»)* | p. 102 |
| | 5 | Aplicación de las leyes de Newton | p. 132 |
| | 6 | Trabajo y energía cinética | p. 174 |
| | 7 | Energía potencial y conservación de la energía mecánica | p. 204 |
| | 8 | Cantidad de movimiento, impulso y colisiones | p. 238 |
| | 9 | Rotación de cuerpos rígidos | p. 274 |
| | 10 | Dinámica del movimiento de rotación | p. 304 |
| | 11 | Equilibrio y elasticidad | p. 340 |
| | 12 | Mecánica de fluidos | p. 370 |
| | 13 | Gravitación | p. 400 |
| **Oscilaciones y ondas** | 14 | Movimiento periódico | p. 434 |
| | 15 | Ondas mecánicas | p. 470 |
| | 16 | Sonido y oído | p. 506 |
| **Termodinámica** | 17 | Temperatura y calor | p. 546 |
| | 18 | Propiedades térmicas de la materia | p. 586 |
| | 19 | Primera ley de la termodinámica | p. 620 |
| | 20 | Segunda ley de la termodinámica | p. 648 |

Las páginas de inicio son un ancla aproximada (primer párrafo detectado del capítulo, puede estar 1-2 páginas dentro de la portadilla del capítulo): al redactar, confirmar el rango exacto de páginas de cada tema en `fuentes_txt/sears.txt` antes de citarlo.

### Sistema de evaluación (guía docente, íntegro)
- **Examen presencial** (80% de la nota): 2 problemas (3 puntos cada uno) + 1 pregunta de teoría a elegir entre 2 opciones (4 puntos, incluye 2 cuestiones cortas relacionadas). Duración 120 min. Solo calculadora no programable. Nota mínima 5 para aprobar sin PEC (máximo 9,5 sin PEC); nota mínima 4 para que sumen las PEC.
- **PEC** (15%, voluntarias): 4 pruebas de evaluación continua a través de AGORA. Renunciar a ellas no penaliza (la nota final sería solo examen+prácticas).
- **Prácticas de laboratorio** (5%, **obligatorias**, imprescindibles para aprobar; válidas 5 cursos si ya superadas).
- Fórmula: con PEC, `CFA = 0,8·CPP + 0,15·CPEC + 0,05·CLAB`; sin PEC, `CFA = 0,95·CPP + 0,05·CLAB`. Se toma la mayor de las dos.

### Bibliografía (guía docente)
- **Básica**: Young & Freedman, *Sears-Zemansky Física Universitaria* (vol. 1), Pearson Addison-Wesley — es la fuente U de este proyecto.
- **Complementaria**: Lorente Guarch / Rueda de Andrés, *Física* (2 vols.), UNED; *La física en problemas*, Tébar Flores (no localizado un PDF de ninguno de los dos en `E:\UNED\FISICA I\`; si aparece, añadir como fuente nueva y actualizar esta tabla).

### Unidades de resumen
Un HTML por tema completo: `tema_01_unidades_vectores.html` … `tema_20_segunda_ley_termodinamica.html`. Orden de trabajo = orden del temario (o el que pida el usuario; puede pedir saltarse temas que no entren en su examen).

## 3. Formato de los resúmenes HTML

Ficheros y estructura:
```
E:\UNED\FISICA I\Claude\
  CLAUDE.md
  index.html                      índice por bloques (actualizarlo al terminar cada tema)
  assets/resumen.css, resumen.js  estilo y comportamiento COMPARTIDOS (no duplicar en cada tema)
  assets/katex/                   KaTeX local (offline)
  plantilla_tema.html             esqueleto que se copia para cada tema
  temas/tema_NN_slug.html          …
  fuentes_txt/                    texto de los PDF + índice de exámenes
  herramientas/extraer_figura.py   recorta figuras del libro U
  herramientas/figuras_svg.py      librería para generar las figuras SVG propias
  .claude/agents/, .claude/skills/
```

Reglas de contenido (para alguien que estudia por primera vez):
1. **Intuición primero**: cada concepto = idea en lenguaje llano + ejemplo/analogía → definición formal → ejemplo → error típico. Nada de «es evidente».
2. **Prerrequisitos** al principio y **mapa del tema** (qué se pide en los ejercicios y qué ha caído en examen).
3. Cajas: `def` (definición), `thm` (teorema/ley/propiedad), `ex` (ejemplo resuelto), `tip` (truco de examen), `warn` (error típico), `intu` (intuición).
4. **Ejercicios resueltos**: prioridad a los de **X** (examen real) del tema — ver `fuentes_txt/examenes_por_tema.md» —, resueltos paso a paso con el «por qué» de cada paso; completar con ejercicios de **E** (traducidos y ampliados, no copiados) y ejemplos propios sencillos → difíciles. Cada ejercicio enseña un **método reutilizable** (recuadro «Receta»). Si un tema no tiene ningún ejercicio de examen real disponible, decirlo y usar E/propios, sin fingir que viene de un examen.
5. Al final: **chuleta** (fórmulas/leyes clave), **lista de comprobación** («sé hacer…») y errores frecuentes.
6. Matemáticas con **KaTeX** local (`$…$`, `$$…$$`). Figuras en **SVG inline** (obligatorias, ver regla 12). Todo debe verse bien en claro/oscuro y en móvil, e imprimirse.
7. **Fuentes visibles**: cada definición, ley, ejemplo y ejercicio lleva `<span class="src" data-l data-ref>` con la clave (U/E/A/X/P) y la referencia exacta (ej. `U §11.2 p.342`, `Solucionario 1-5 Prob. 1.45`, `Examen Feb 2025 (1ª sem.) P-1`). Si es explicación propia sin fuente, `data-l="P"`.
8. Prioridad de fuentes: **U** define lo que cae en examen (notación, leyes, alcance); **A** se usa solo cuando exista y explique mejor (temas 17-18 principalmente); **X** para ejemplos de examen reales; **E** para ejercicios adicionales del libro. Si A contradice a U en notación o alcance, gana U.
9. **Rigor**: no inventar páginas, enunciados ni convocatorias de examen. Toda cita se verifica en `fuentes_txt/`. Todo cálculo numérico se comprueba (con Python/sympy) antes de publicarlo.
10. Estilo de las cajas y componentes: ver `assets/resumen.css` y `plantilla_tema.html` (no reinventar).
11. **Figuras: preferir recortes del libro U a SVG.** Si U ya tiene la figura, recórtala con `python herramientas/extraer_figura.py` (ver cabecera del script; página PDF de U = impresa + 28) y guarda en `assets/img/`. En el HTML: `<figure class="bookfig"><img src="../assets/img/nombre.png" alt="descripción" loading="lazy"><figcaption>… <span class="src" …></span></figcaption></figure>`. SVG inline para las figuras propias que no existan ya en el libro (ver regla 12). Las imágenes son solo para uso personal de estudio: no se comparten fuera de este proyecto ni se suben con las páginas indexables (ver §4b).
12. **Figuras SVG explicativas (obligatorias en todo tema nuevo).** Además de los recortes del libro, cada tema lleva figuras SVG propias que *expliquen* el concepto o el método, en dos sitios: (a) **en la teoría**, una por cada operación, ley o concepto que se entienda mejor dibujado (p. ej. suma/resta de vectores, componentes, gráficas x-t / v-t con cuerda y tangente, trayectorias con sus vectores, diagramas de cuerpo libre, pares acción-reacción, ciclos pV, ondas); (b) **en los ejercicios** (X y E) donde el dibujo ayude a plantear o interpretar el resultado (gráficas con los puntos y valores clave, esquemas del enunciado, DCL, triángulos de vectores). Se coloca la figura justo después del cuadro o de los pasos (`</ol>`) a los que ilustra. Reglas de calidad:
    - Formato: `<figure class="fig"><svg class="fig" viewBox=… role="img" aria-label=…>…</svg><figcaption>… <span class="src" data-l="P" data-ref="Diagrama propio de …">P</span></figcaption></figure>`. Son figuras propias → fuente `P`. Si el dibujo reproduce un caso del libro/examen, decirlo en `data-ref` (p. ej. «Diagrama propio del ejemplo 2.5»).
    - Generarlas con `herramientas/figuras_svg.py` (flechas con punta de tamaño fijo, ejes de datos, subíndices reales con `v_{x}`, colores solo con variables CSS `var(--acc)`, `--A`, `--X`, `--E`, `--mut`, `--fg`) para que se vean en claro y oscuro. Nada de colores fijos ni de `_` suelto en el texto SVG.
    - **Coherencia numérica:** los valores dibujados (alturas, tiempos, fuerzas, ángulos) son los del cálculo ya verificado con sympy; si una escala no es real (p. ej. peso frente a una fuerza de impacto), decirlo en el dibujo («no a escala»).
    - Etiquetas dentro del `viewBox` (sin texto recortado), sin solapes con flechas o curvas, legibles a ~330 px de ancho (móvil). **Comprobar cada figura visualmente** (navegador, claro y oscuro) antes de darla por buena.
    - No duplicar la figura del libro: si U ya trae el dibujo (recorte `bookfig`), la SVG solo se añade si aporta algo distinto (valores del ejercicio, gráfica asociada, comparación).

## 4. Flujo de trabajo por tema (subagentes en `.claude/agents/`)

| Agente | Modelo | Función |
|---|---|---|
| `fuentes-fisica` | haiku | Busca en `fuentes_txt/*.txt` los pasajes de un tema en U, A (si existe) y E, más los ejercicios de examen del tema en `fuentes_txt/examenes_por_tema.md`, y devuelve un dossier con página impresa. Solo lectura. |
| `resolutor-ejercicios` | opus | Resuelve paso a paso los ejercicios de examen (X) y del solucionario (E) asignados al tema, verifica con sympy, devuelve solución + «receta». |
| `redactor-tema` | sonnet | Escribe el HTML final a partir de la plantilla, integrando teoría, ejercicios y fuentes. |
| `revisor-tema` | opus | Revisa rigor físico, citas de página/convocatoria, cobertura del temario y de exámenes, y maquetación. Solo lectura. |

Pipeline: (1) `fuentes-fisica` → dossier del tema; (2) `resolutor-ejercicios` (puede ir en paralelo con 3 si el dossier ya está); (3) `redactor-tema`; (4) `revisor-tema`; (5) corregir, actualizar `index.html` y avisar al usuario. Al empezar un tema, la conversación principal coordina y **no** escribe el HTML a mano salvo retoques puntuales.
Skills de diseño disponibles para el redactor: `frontend-design:frontend-design`, `carattere` (tipografía), `componi` (layout), `scrutinio` (accesibilidad/rendimiento), `lucida` (pulido final). Skill propio del proyecto: `resumen-fisica` (`.claude/skills/`).

## 4b. Publicación en GitHub (obligatorio tras cada cambio)
Repositorio: `git@github.com:luk224/Fisica_I.git` (rama `main`, **público**). Web: https://luk224.github.io/Fisica_I/ (GitHub Pages desde `main`, carpeta raíz; hay `.nojekyll`).
**Cada vez que se termine un tema nuevo o se haga un cambio en el proyecto (temas, assets, CLAUDE.md, agentes, índices, index.html), y antes de dar la tarea por cerrada:**
1. Actualizar `index.html` (marcar el tema como «listo») si se añadió o terminó un tema.
2. `git add -A`, revisar `git status` (no debe entrar nada de `.gitignore`: los `.pdf` y los textos completos con copyright de `fuentes_txt/{sears,solman}.txt` y `fuentes_txt/academia_tec/*.txt` se quedan fuera; regenerarlos desde los PDF originales si hacen falta; los índices propios `examenes_por_tema.md` y `guia.txt` sí se suben).
3. `git commit` con mensaje en español que diga qué tema o cambio (p. ej. «Tema 11: equilibrio y elasticidad»), terminado con la línea de coautoría del entorno.
4. `git pull --rebase origin main` si hace falta y `git push origin main`.
5. Confirmar con `git log -1` y `git status` que quedó sincronizado, e indicar al usuario el enlace de la web.
Un commit por tema o cambio coherente; no acumular varios temas sin subir. No usar `--force`. Si el push falla (red, credenciales), avisar al usuario en lugar de dejarlo sin subir en silencio.

## 5. Comandos útiles
- Buscar en el libro oficial: `Grep pattern=… path=fuentes_txt/sears.txt` (usar `-C` para contexto).
- Leer una página de U: `python -c "print(open('fuentes_txt/sears.txt',encoding='utf8').read().split('\f')[PDF-1])"` (PDF = impresa + 28).
- Buscar un problema en el solucionario: `Grep pattern="1\.45\." path=fuentes_txt/solman.txt`.
- Ejercicios de examen ya catalogados por tema: `fuentes_txt/examenes_por_tema.md`.
- Verificar cálculos: `python -c "import sympy…"` (instalar `sympy` si falta).
- Previsualizar: abrir el HTML en el navegador (o con Claude in Chrome y captura).
