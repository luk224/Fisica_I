# PLAN — próximos pasos del proyecto (retomable en frío)

**Cómo usar este plan:** hacer los pasos **en orden**, uno por sesión si hace falta. Al terminar un paso: marcarlo `[x]` aquí, ejecutar `python herramientas/construir.py --probar`, commit con mensaje en español y `git push origin main` (CLAUDE.md §4b). Si te quedas sin contexto a mitad, deja anotado debajo del paso qué falta («En curso: …»).

**Antes de empezar cualquier sesión:** `git pull --rebase --autostash origin main`, leer `CLAUDE.md` §8 (cómo está montado) y este fichero.

**Reglas que no se negocian**
- **Ningún ejercicio de examen real se elimina ni se acorta** (X1…Xn de cada tema). `examenes_requeridos` en `tema.json` lo vigila.
- Un tema migrado se edita en `contenido/tema_NN/`, **nunca** en `temas/*.html` (se sobrescribe).
- Español; citas de página impresa de U; sin comparar fuentes ni hablar de erratas (regla 8 bis).
- Todo número se comprueba con sympy (`pruebas/numerico/tNN.py`).

**Estado a 2026-11-14:** los 20 temas están migrados a `contenido/` (fase B completa, con pruebas numéricas `t01-t20`); solo el tema 5 está en formato «estudio». Siguiente: fase C.

---

## Fase A — Que los temas nuevos nazcan ya en el formato bueno
- [x] **A1. Plantilla y skill.** Actualizar `plantilla_tema.html` y `.claude/skills/resumen-fisica/SKILL.md` al formato «estudio» (CLAUDE.md §8: resumen de 5 minutos, «¿qué tipo de problema es?», prioridades 🔴🟡⚪, teoría condensada, mini-tests, ejercicios Núcleo/Práctica/Teoría).
  *Hecho cuando:* la plantilla describe `contenido/tema_NN/` (no HTML a mano) y el skill lo dice.
- [x] **A2. Agentes.** Actualizar `.claude/agents/redactor-tema.md` (escribe en `contenido/`, ejecuta `tema_datos.py generar`), `resolutor-ejercicios.md` (entrega también el fichero `pruebas/numerico/tNN.py`) y `revisor-tema.md` (comprueba el formato estudio y las pruebas).
  *Hecho cuando:* los tres mencionan `contenido/`, `construir.py --probar` y la regla de exámenes intactos.

## Fase B — Migrar los temas antiguos a `contenido/` (sin cambiar su contenido)
Receta por tema NN (archivo `temas/tema_NN_slug.html`):
1. `python herramientas/tema_datos.py migrar temas/tema_NN_slug.html NN tema_NN_slug.html`
2. `python herramientas/tema_datos.py equivale NN temas/tema_NN_slug.html` → debe decir OK. Si falla por un elemento no reconocido, **ampliar el migrador** (`herramientas/tema_datos.py`, clase `Migrador`) en vez de retocar a mano; los temas antiguos pueden traer cajas/figuras con otra forma.
3. `python herramientas/tema_datos.py generar NN` y `python herramientas/construir.py --probar`.
4. Crear `pruebas/numerico/tNN.py` con los resultados de cada ejercicio recalculados con sympy (modelo: `t05.py`). Esto puede destapar errores reales: corregirlos en `contenido/` y anotarlo en el commit.
5. Marcar el tema aquí, commit «Tema NN: migrado a contenido/».

Orden sugerido (de menos a más figuras): hacer 1 tema de prueba y, si el migrador va bien, el resto por bloques.
- [x] B1. Tema 1 (prueba del migrador con el tema más simple). Migrador corregido: ejercicios sin `id` en el HTML original ya no generan `id="problema 1.10"` (ahora archivo `problema-1-10` y sin atributo id). `test_numerico` acepta decimales con punto o con coma.
  *Pendiente para C11 (redacción, no tocado al migrar):* `problema-1-31` y `problema-1-51` comparan con «el solucionario da…» (viola la regla 8 bis): reescribir dejando solo el valor correcto.
- [x] B2. Temas 2-4 (migrados; `t02-t04.py` creados). Corregida una errata de cálculo en tema 3 X3: x_B = 71,55·4,04 = 289,1 m (decía 288,9; D≈347 m no cambia). El tema 4 no tiene ejercicios de examen real catalogados.
- [x] B3. Temas 6-8 (migrador ampliado: `<svg>` de marcadores y `style` en recortes del libro; `t06-t08.py` creados). Correcciones de redondeo: T7 e3 0,518 m/s; T8 x9 I_A=0,6731. Pendiente (índice de exámenes): faltan en `examenes_por_tema.md` entradas propias de Sept 2022 P-2(e) y P-3(a), citadas en el tema 6 (la prueba solo exige la convocatoria).
- [x] B4. Temas 9-11 (migrados; `t09-t11.py` creados, sin correcciones de contenido). Migrador: atributos extra en recortes del libro (`attrs`) y ejercicios sin título (`prac`).
- [x] B5. Temas 12-14 (migrados; `t12-t14.py`). Migrador: texto suelto `$$…$$`, `<h3 id>`, `<h4>`, ids con guion. `examenes_requeridos` ahora se calcula con TODAS las etiquetas X de la página (antes solo las de ejercicios): ya vigila 13 (6 refs), 14 (7), 10 (8), 8 (9), 9 (1). Corrección: T12 e10 «≈26 veces».
- [x] B6. Temas 15-17 (migrados; `t15-t17.py`, sin correcciones de contenido; migrador: recortes del libro con estructura distinta pasan como parte).
- [x] B7. Temas 18-20 (migrados sin cambios en el migrador; `t18-t20.py`, sin correcciones de contenido). Nota: miles escritos con espacio normal («25 521») no los detecta `test_numerico` (se cubren por totales); unificar con `\,` al redactar.
- [x] B8. `ejercicios_modulo1.html` se deja tal cual (página aparte con 6 bloques; ya está en el buscador). `PRUEBAS_TODAS=1` ejecutado el 2026-11-14: 16 pruebas OK en 778 s. Fase B completa: los 20 temas viven en `contenido/`. (Original: ejecutar una vez `PRUEBAS_TODAS=1 python pruebas/ejecutar.py` (≈13 min).

## Fase C — Aplicar el formato «estudio» a cada tema (redacción)
Receta por tema NN (modelo: `contenido/tema_05/`): resumen de 5 minutos + tabla «¿qué tipo de problema es?» + prioridades + teoría condensada (una caja por idea, un error típico) + mini-tests (3 preguntas por sección) + ejercicios Núcleo/Práctica/Teoría con tabla «método que te llevas». Los X de examen **intactos**. Flujo con agentes: `fuentes-fisica` → `resolutor-ejercicios` → `redactor-tema` → `revisor-tema` (CLAUDE.md §4).
- [x] C1. Tema 6 (formato estudio: en5 + decide, 4 mini-tests, 13 núcleo/7 práctica, x1–x11 intactos; 27 comprobaciones nuevas en t06). Pendiente menor: x7 menciona «como el solucionario 5-38»
- [x] C2. Tema 7 (5 secciones, 5 mini-tests, 7 núcleo/5 práctica/4 teoría; X1–X8 intactos; chip de páginas aún dice pp. 204-226, revisar)
- [x] C3. Tema 8 (6 secciones, 6 mini-tests, 8 núcleo/5 práctica/4 teoría; X1–X9 intactos; e8 duplicado de X2 eliminado)
- [x] C4. Tema 9 (6 secciones, 6 mini-tests, 8 núcleo/4 práctica; X1 intacto, único examen del tema)
- [x] C5. Tema 10 (7 secciones, 7 mini-tests, 10 núcleo/6 práctica/2 teoría; X1–X8 intactos)
- [x] C6. Tema 11 (5 secciones, 5 mini-tests, 7 núcleo/3 práctica; sin exámenes reales catalogados)
- [x] C7. Tema 12 (6 secciones, 6 mini-tests, 8 núcleo/5 práctica; sin exámenes reales catalogados)
- [ ] C8. Tema 13
- [ ] C9. Temas 14-16
- [ ] C10. Temas 17-20
- [ ] C11. Temas 1-4
(Se puede hacer un tema por sesión; subir cada uno al terminar.)

## Fase D — Mejoras de método de academia (primero en el tema 5, luego se generalizan)
- [ ] D1. **Desglose de puntos** de cada problema de examen (planteamiento / ecuaciones / resultado y unidades) en el tema 5.
- [ ] D2. **Pistas progresivas** (pista 1, 2, solución) en los ejercicios del bloque Núcleo.
- [ ] D3. **Problemas gemelos** de los X: variante con otros datos y solo el resultado, generados con sympy (un fichero `contenido/tema_NN/gemelos.json` + pruebas numéricas).
- [ ] D4. **Ejemplo resuelto → con huecos → solo** (tres escalones) en 2-3 métodos del tema 5.
- [ ] D5. **«Encuentra el error»** (solución con un fallo típico) y **pregunta previa** al inicio de cada sección.
- [ ] D6. **Mini-examen de cierre** (1 problema + 1 teoría, 30-35 min, con rúbrica) y **respuesta modelo de teoría** (4 puntos).
- [ ] D7. **Tarjetas Anki** (fórmula ↔ cuándo se usa; error ↔ corrección) generadas desde las chuletas: script `herramientas/exportar_anki.py`.
- [ ] D8. Probar el tema 5 con una persona que no lo haya visto y anotar dónde se atasca.
- [ ] D9. Generalizar lo que funcione a los demás temas (añadir al flujo de la Fase C).

## Fase E — Extras de plataforma (cuando lo anterior esté)
- [ ] E1. Probar `herramientas/exportar_pdf.py` (ahora usa http y espera a `cargarFiguras()`; **no está probado**). Requiere `pip install playwright pymupdf`.
- [ ] E2. Comprobar que la acción de GitHub (`.github/workflows/pruebas.yml`) pasa en verde y arreglarla si no.
- [ ] E3. Actualizar `index.html` (tarjetas y progreso) y el aviso de «11 de 20 secciones listas» si ya no es correcto.
- [ ] E4. Zona de entrenamiento (problemas con pistas, tests tipo PEC, simulacro cronometrado, cuaderno de errores) — diseñar antes con el usuario.
- [ ] E5. PWA / uso sin conexión; cuenta o código de recuperación para el progreso entre dispositivos (hoy las casillas son de `localStorage`).
- [ ] E6. Calendario de estudio hacia atrás desde las PEC (CLAUDE.md §2) y módulo 0 de matemáticas con diagnóstico.

## Notas para quien retome
- Si un paso falla en las pruebas por una cita o un número, **arregla el contenido**, no la prueba (salvo que la prueba esté mal; el capítulo 20 de U llega hasta la p. 682, ya corregido).
- `pruebas/ejecutar.py --rapido` tarda segundos; sin `--rapido` usa Chrome (45 s para el tema 5, ≈13 min con `PRUEBAS_TODAS=1`).
- Para ver las páginas en local: `python herramientas/servir.py` (con doble clic las figuras no cargan).
- Decisiones ya tomadas por el usuario: figuras en SVG sueltos con carga perezosa; migrar de uno en uno empezando por el piloto; uso **personal** (los recortes del libro U no se publican fuera del proyecto, CLAUDE.md §3 regla 11).
