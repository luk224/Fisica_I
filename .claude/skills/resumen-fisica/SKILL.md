---
name: resumen-fisica
description: Crea o revisa el resumen HTML de un tema del temario de Física I (UNED) — p. ej. "tema 11 equilibrio y elasticidad" — con explicaciones para principiantes, ejercicios de examen real resueltos y fuentes (libro+página o examen+convocatoria) visibles. Úsalo cuando el usuario pida un tema, resumen o bloque concreto de la asignatura.
---

# Skill: resumen de tema de Física I

Lee primero `CLAUDE.md` (fuentes, offsets de página, temario por bloques, reglas de contenido). Este skill solo fija el **procedimiento**.

## Procedimiento
1. **Identificar el tema** (ej. Tema 11 Equilibrio y elasticidad, Bloque Mecánica) y su rango de páginas en U (`CLAUDE.md` §2), si existe Academia_Tec (A) para ese tema (solo 17 y 18), y los ejercicios de examen (X) del tema en `fuentes_txt/examenes_por_tema.md`.
2. **Dossier de fuentes**: lanzar `fuentes-fisica` (haiku) con el tema. Debe devolver extractos con página impresa de U, lo que haya de A, problemas relevantes de E, y la lista de ejercicios de examen reales del tema con su referencia exacta.
3. **Ejercicios**: lanzar `resolutor-ejercicios` (opus) con la lista de ejercicios de examen (X) y del solucionario (E) del tema; en paralelo con el paso 4 si el dossier ya está. Si el tema no tiene ningún X, debe decirlo y usar E/propios en su lugar.
4. **Redacción**: `redactor-tema` (sonnet) copia `plantilla_tema.html` a `temas/tema_NN_<slug>.html` y lo rellena siguiendo las reglas de contenido (CLAUDE.md §3), priorizando los ejercicios de examen real. Usa solo `assets/resumen.css|js` y KaTeX local, sin dependencias externas.
5. **Revisión**: `revisor-tema` (opus) comprueba física, citas (incluyendo que las convocatorias de examen citadas sean reales), cobertura y render. Aplicar sus correcciones.
6. **Cierre**: actualizar `index.html` (marcar el tema como «listo»), **subir a GitHub siguiendo CLAUDE.md §4b (commit + push)**, comprobar visualmente el HTML (Claude in Chrome o captura) en ancho de escritorio y móvil, y resumir al usuario qué hay y qué falta.

## Convenciones de marcado (resumen)
- Cajas: `.box.def|thm|ex|warn|tip|intu` con `<span class="h">Título</span>`; receta: `.recipe`; pasos: `ol.steps`; ejercicio: `details.sol > summary + .enun + …`.
- Fuente: `<span class="src" data-l="U|A|E|X|P" data-ref="referencia exacta">U p.N</span>`. Colocarlo **como hijo directo** del `.box`, `h2`, `h3` o `summary` para que salga en el margen derecho en escritorio.
  - U: `data-ref="U cap.N §N.N, p. NN"` (página impresa).
  - A: `data-ref="Academia_Tec Tema NN"` (solo temas 17-18).
  - E: `data-ref="Solucionario NN-N, Prob. N.N"`.
  - X: `data-ref="Examen <convocatoria> P-N"` (exactamente como en `fuentes_txt/examenes_por_tema.md`).
  - P: `data-ref="Explicación o ejemplo propio"`.
- Encabezados `h2` con `id` único (alimentan el índice lateral). Fórmulas: `$…$` y `$$…$$`.
- Figuras: `<figure class="bookfig"><img src="../assets/img/…png" …><figcaption>…<span class="src" …></span></figcaption></figure>` para recortes del libro; `<figure><svg class="fig" viewBox=…>…</svg><figcaption>…</figcaption></figure>` con clases `.ax .a .b .pt .op` solo para figuras propias.

## Calidad
- Nada de página, enunciado o convocatoria inventados: verificar siempre en `fuentes_txt/`.
- Cada ejercicio termina con una **receta** reutilizable y, si procede, el error típico.
- Si un tema no tiene ejercicios de examen real disponibles, decirlo explícitamente en el HTML en vez de simular uno.
- Skills de diseño para el pulido: `frontend-design:frontend-design`, `carattere`, `componi`, `scrutinio`, `lucida`.
