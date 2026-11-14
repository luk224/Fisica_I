# Plantilla de tema (formato «estudio»)

Se copia a `contenido/tema_NN/` (`cp -r contenido/plantilla_tema contenido/tema_NN`, quitando este README) y se rellena. **Nunca se escribe `temas/*.html` a mano**: lo genera `python herramientas/tema_datos.py generar NN` (o `python herramientas/construir.py --probar`, que además regenera el buscador y los cambios y lanza las pruebas). Modelo completo: `contenido/tema_05/`.

## Ficheros
- `tema.json` — metadatos y **orden de la página** (`bloques`). Ver `tema.json` de esta carpeta.
- `partes/*.html` — fragmentos tal cual (resumen de 5 minutos, tabla «¿qué tipo de problema es?», intros de nivel, chuleta, lista de comprobación, panel de fuentes).
- `ejercicios/xN.json|html` (examen real) y `eN.json|html` (solucionario): metadatos + cuerpo. `{{fig:nombre}}` inserta una figura declarada en `figuras`.
- Figuras SVG sueltas en `assets/figs/tNN/nombre.svg` (colores con variables CSS; se cargan al hacer scroll).

## Orden de la página (formato estudio)
1. `parte` **«El tema en 5 minutos»**: método en 4 pasos, ≤6 fórmulas con «cuándo se usa», qué cae en examen, rutas rápida/completa. `parte` **«¿Qué tipo de problema es?»** (tabla de decisión → ejercicio modelo).
2. Teoría condensada: `h2` con `prio` (1 🔴 imprescindible, 2 🟡 importante, 3 ⚪ si te sobra tiempo) → una `caja` por idea (`def|thm|ex|warn|tip|intu`: ley o definición + ejemplo mínimo + un error típico) → `fig` donde el dibujo explique → `test` («Comprueba», 3 preguntas con respuesta plegada) al final de cada sección.
3. Ejercicios: `parte` de introducción → **Núcleo** (un método distinto cada uno; `metodos` = tabla «método que te llevas»; **aquí van todos los X de examen real, intactos**) → **Práctica** (sin dibujo) → **Teoría** (guion de pregunta de 4 puntos).
4. `parte` chuleta y lista de comprobación; `parte` panel de fuentes.

## Reglas
- **Ningún ejercicio de examen real se elimina ni se acorta**: se declaran en `examenes_requeridos` y `test_examenes_requeridos_presentes` lo vigila.
- Fuente en cada bloque: `src` `{l: U|E|X|P, ref: «U §N.N p.NN» | «Solucionario NN-N Prob. N.N» | «Examen <convocatoria> P-N», txt: etiqueta corta}`; página impresa de U dentro del capítulo; examen tal como figura en `fuentes_txt/examenes_por_tema.md`.
- Fórmulas con KaTeX; un `<` suelto en una fórmula se lee como etiqueta HTML: escribir `\lt` / `\gt`.
- Todo resultado numérico se recalcula con sympy en `pruebas/numerico/tNN.py` (modelo: `t05.py`).
- Sin erratas ni comparativas entre fuentes (CLAUDE.md regla 8 bis); figuras SVG en teoría y ejercicios (regla 12); interactivos solo si aportan (regla 13).
