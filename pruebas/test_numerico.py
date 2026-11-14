"""Resultados numéricos de los ejercicios, recalculados con sympy (pruebas/numerico/tNN.py) y buscados en la solución de la página."""
import importlib.util
import pathlib
import re
import sys
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import json  # noqa: E402
from comun import CONTENIDO, TEMAS, leer  # noqa: E402


def formatear(x, dec):
    if dec < 0:
        return str(int(round(float(x), dec)))
    s = f'{float(x):.{dec}f}'
    return s.replace('.', ',')


def texto(ruta):
    t = leer(ruta)
    t = re.sub(r'\{,\}', ',', t)                       # decimales escritos como 2{,}5 en LaTeX
    t = re.sub(r'\\[,;!:]|\\ |~|&nbsp;| ', '', t)  # separadores de miles y espacios finos
    return t


def cargar(n):
    ruta = pathlib.Path(__file__).resolve().parent / 'numerico' / f't{n:02d}.py'
    spec = importlib.util.spec_from_file_location(f't{n:02d}', ruta)
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m


class Numerico(unittest.TestCase):
    def test_resultados_de_los_ejercicios(self):
        for ruta in sorted((pathlib.Path(__file__).resolve().parent / 'numerico').glob('t*.py')):
            n = int(ruta.stem[1:])
            d = CONTENIDO / f'tema_{n:02d}' / 'ejercicios'
            casos = []
            cargar(n).comprobaciones(lambda ej, desc, val, dec: casos.append((ej, desc, val, dec)))
            self.assertTrue(casos)
            for ej, desc, val, dec in casos:
                with self.subTest(tema=n, ejercicio=ej, dato=desc):
                    if ej == 'pagina':
                        arch = json.loads((CONTENIDO / f'tema_{n:02d}' / 'tema.json').read_text(encoding='utf8'))['archivo']
                        t = texto(TEMAS / arch)
                    else:
                        t = texto(d / f'{ej}.html')
                    esperado = formatear(val, dec)
                    self.assertIn(esperado, t, f'{ej}: {desc} = {esperado} no aparece')


if __name__ == '__main__':
    unittest.main()
