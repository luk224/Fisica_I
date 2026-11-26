"""Integridad de `contenido/tema_NN/`: referencias, huérfanos, exámenes requeridos y página regenerada sin retoques a mano."""
import json
import re
import sys
import tempfile
import unittest
import pathlib

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from comun import CONTENIDO, RAIZ, TEMAS, leer  # noqa: E402
sys.path.insert(0, str(RAIZ / 'herramientas'))
import tema_datos  # noqa: E402

TEMAS_DATOS = sorted(CONTENIDO.glob('tema_*/tema.json'))
MD = RAIZ / 'fuentes_txt' / 'examenes_por_tema.md'


def num_de(p):
    return int(p.parent.name.split('_')[1])


class Contenido(unittest.TestCase):
    def test_sin_punto_medio_dentro_de_text(self):
        """«·» dentro de \\text{} no lo entiende KaTeX (sale «\\cdotp» en rojo): usar \\text{kg}\\cdot\\text{m}."""
        malos = []
        for f in CONTENIDO.rglob('*'):
            if f.suffix in ('.html', '.json') and re.search(r'\\+text\{[^{}]*\u00b7', f.read_text(encoding='utf8')):
                malos.append(str(f.relative_to(CONTENIDO)))
        self.assertFalse(malos, f'«·» dentro de \\text{{}}: {malos}')

    def test_sin_acentos_latex_dentro_de_text(self):
        """\\acute, \\tilde o \\' dentro de \\text{} dan error en KaTeX: escribir la letra acentuada (á, é, ñ…)."""
        malos = []
        for f in CONTENIDO.rglob('*'):
            if f.suffix in ('.html', '.json') and re.search(r"\\+text\{[^{}]*(\\+acute|\\+tilde|\\+~|\\+')", f.read_text(encoding='utf8')):
                malos.append(str(f.relative_to(CONTENIDO)))
        self.assertFalse(malos, f'acentos LaTeX dentro de \\text{{}}: {malos}')

    def test_hay_temas(self):
        self.assertTrue(TEMAS_DATOS, 'no hay ningún contenido/tema_NN/tema.json')

    def test_referencias_y_huerfanos(self):
        for tj in TEMAS_DATOS:
            d, n = tj.parent, num_de(tj)
            t = json.loads(tj.read_text(encoding='utf8'))
            with self.subTest(tema=n):
                usadas_fig, usados_ej, usadas_partes = set(), set(), set()
                textos = ''
                for b in t['bloques']:
                    if b['t'] == 'fig':
                        usadas_fig.add(b['ref'])
                    elif b['t'] == 'ej':
                        usados_ej.add(b['ref'])
                        self.assertTrue((d / 'ejercicios' / f'{b["ref"]}.json').exists(), b['ref'])
                        self.assertTrue((d / 'ejercicios' / f'{b["ref"]}.html').exists(), b['ref'])
                        textos += leer(d / 'ejercicios' / f'{b["ref"]}.html')
                    elif b['t'] == 'parte':
                        usadas_partes.add(b['archivo'])
                        self.assertTrue((d / 'partes' / b['archivo']).exists(), b['archivo'])
                        textos += leer(d / 'partes' / b['archivo'])
                    elif b['t'] == 'caja':
                        textos += json.dumps(b['html'], ensure_ascii=False)
                usadas_fig |= set(re.findall(r'\{\{fig:([\w-]+)\}\}', textos))
                for f in usadas_fig:
                    self.assertIn(f, t['figuras'], f'figura sin definir: {f}')
                for f in t['figuras']:
                    self.assertIn(f, usadas_fig, f'figura sin usar: {f}')
                    self.assertTrue((RAIZ / 'assets' / 'figs' / f't{n:02d}' / f'{f}.svg').exists(), f)
                for s in (RAIZ / 'assets' / 'figs' / f't{n:02d}').glob('*.svg'):
                    self.assertIn(s.stem, t['figuras'], f'SVG huérfano: {s.name}')
                for e in (d / 'ejercicios').glob('*.json'):
                    self.assertIn(e.stem, usados_ej, f'ejercicio huérfano: {e.name}')
                for p in (d / 'partes').glob('*.html'):
                    self.assertIn(p.name, usadas_partes, f'fragmento huérfano: {p.name}')

    def test_examenes_requeridos_presentes(self):
        """Ningún ejercicio de examen real puede desaparecer: cada uno de `examenes_requeridos` está en la página y en el índice de exámenes."""
        md = leer(MD) if MD.exists() else ''
        for tj in TEMAS_DATOS:
            t = json.loads(tj.read_text(encoding='utf8'))
            req = t.get('examenes_requeridos')
            with self.subTest(tema=num_de(tj)):
                self.assertIsNotNone(req, 'falta «examenes_requeridos» en tema.json')
                pagina = leer(TEMAS / t['archivo'])
                for ref in req:
                    self.assertIn(f'data-ref="{ref}"', pagina, f'falta en la página: {ref}')
                    m = re.match(r'Examen (\w+ \d{4})(?: \((.*?)\))? P-(\d+)', ref)
                    self.assertTrue(m, ref)
                    if md:
                        linea = [l for l in md.split('\n') if (f'[{m.group(1)}, {m.group(2)}]' if m.group(2) else f'[{m.group(1)}]') in l and f'P-{m.group(3)}' in l]
                        if not linea:   # preguntas cruzadas: basta que la convocatoria esté catalogada en el índice
                            linea = [l for l in md.split('\n') if (f'[{m.group(1)}, {m.group(2)}]' if m.group(2) else f'[{m.group(1)}]') in l]
                        self.assertTrue(linea, f'no está en examenes_por_tema.md: {ref}')

    def test_pagina_regenerada_igual_a_la_publicada(self):
        """La página de temas/ es exactamente lo que genera el contenido (nadie la ha editado a mano)."""
        for tj in TEMAS_DATOS:
            n = num_de(tj)
            with self.subTest(tema=n):
                g = tema_datos.Generador(n)
                self.assertEqual(g.pagina().replace('\r\n', '\n'), leer(TEMAS / g.t['archivo']),
                                 f'temas/{g.t["archivo"]} no coincide con contenido/tema_{n:02d}: ejecuta `python herramientas/construir.py`')

    def test_equivalencia_inline(self):
        """La versión con SVG incrustados y la perezosa describen lo mismo (mismas figuras, mismo texto)."""
        for tj in TEMAS_DATOS:
            n = num_de(tj)
            a = tema_datos.Generador(n, inline=True).pagina()
            b = tema_datos.Generador(n).pagina()
            with self.subTest(tema=n):
                self.assertEqual(a.count('<figure class="fig"'), b.count('<figure class="fig"'))
                self.assertEqual(a.count('<svg') - a.count('<svg width="0"'), b.count('data-svg='))


if __name__ == '__main__':
    unittest.main()
