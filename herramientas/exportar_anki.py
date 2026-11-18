"""Exporta tarjetas Anki (texto con tabuladores, importable en Anki) desde las chuletas, las guías de decisión y los errores típicos.

  python herramientas/exportar_anki.py            # escribe anki/tema_NN.txt y anki/todo.txt

Tres tipos de tarjeta por tema:
  · chuleta: «concepto / situación» ↔ «fórmula o regla» (contenido/tema_NN/partes/chuleta-tabla.html)
  · decide:  «si el enunciado dice…» ↔ «método» (partes/decide.html)
  · error:   «¿qué error se comete en este apartado?» ↔ el error típico y su corrección (cajas `warn` de temas/*.html)
En Anki: Archivo > Importar; el fichero lleva las cabeceras #separator, #html y #tags, así que no hay que configurar nada.
Las fórmulas $…$ se convierten a \\(…\\) y $$…$$ a \\[…\\] (MathJax de Anki).
"""
import html
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parent.parent
SALIDA = RAIZ / 'anki'
CABECERA = '#separator:tab\n#html:true\n#tags column:3\n'


def limpio(h):
    h = re.sub(r'<span class="(?:src|prio)[^"]*"[^>]*>.*?</span>', '', h, flags=re.S)
    h = re.sub(r'</?a\b[^>]*>', '', h)
    h = re.sub(r'<(?:/?p|/?div|br)\b[^>]*>', ' ', h)
    h = re.sub(r'\$\$(.+?)\$\$', r'\\[\1\\]', h, flags=re.S)
    h = re.sub(r'(?<!\\)\$([^$]+?)\$', r'\\(\1\\)', h)
    return re.sub(r'\s+', ' ', h).strip()


def filas_tabla(txt):
    for fila in re.findall(r'<tr>(.*?)</tr>', txt, re.S):
        celdas = re.findall(r'<td[^>]*>(.*?)</td>', fila, re.S)
        if len(celdas) >= 2:
            yield limpio(celdas[0]), limpio(celdas[1])


def tarjetas_tema(n):
    d = RAIZ / 'contenido' / f'tema_{n:02d}' / 'partes'
    pagina = next((RAIZ / 'temas').glob(f'tema_{n:02d}_*.html'))
    tag = f'Fisica1 Tema{n:02d}'
    out = []
    if (d / 'chuleta-tabla.html').exists():
        for a, b in filas_tabla((d / 'chuleta-tabla.html').read_text(encoding='utf8')):
            out.append((a, b, 'chuleta', tag))
    if (d / 'decide.html').exists():
        for a, b in filas_tabla((d / 'decide.html').read_text(encoding='utf8')):
            out.append((f'Enunciado: {a}. ¿Qué método?', b, 'decide', tag))
    txt = pagina.read_text(encoding='utf8')
    for m in re.finditer(r'<div class="box warn"><span class="h">(.*?)</span>(.*?)</div>', txt, re.S):
        sec = re.findall(r'<h[23][^>]*>(.*?)</h[23]>', txt[:m.start()], re.S)
        titulo = limpio(re.sub(r'<span class="n">.*?</span>', '', sec[-1])) if sec else ''
        cab = limpio(m.group(1))
        frente = cab if len(cab) > len('Error típico') + 2 else f'Error típico en «{titulo}»: ¿cuál es y cómo se evita?'
        out.append((frente, limpio(m.group(2)), 'error', tag))
    return out


def main():
    SALIDA.mkdir(exist_ok=True)
    todo = []
    for n in range(1, 21):
        t = tarjetas_tema(n)
        todo += t
        escribir(SALIDA / f'tema_{n:02d}.txt', t)
    escribir(SALIDA / 'todo.txt', todo)
    print('OK', len(todo), 'tarjetas en', SALIDA.relative_to(RAIZ))


def escribir(ruta, tarjetas):
    ruta.write_text(CABECERA + ''.join(f'{a}\t{b}\t{g} {c}\n' for a, b, c, g in tarjetas), encoding='utf8')


if __name__ == '__main__':
    main()
