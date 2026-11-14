"""El índice del buscador (assets/busqueda_indice.js) está al día con las páginas."""
import pathlib
import sys
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from comun import RAIZ, leer  # noqa: E402
sys.path.insert(0, str(RAIZ / 'herramientas'))
import construir_busqueda  # noqa: E402


class Busqueda(unittest.TestCase):
    def test_indice_actualizado(self):
        texto, n = construir_busqueda.generar_texto()
        self.assertGreater(n, 500)
        self.assertEqual(texto, leer(RAIZ / 'assets' / 'busqueda_indice.js'),
                         'assets/busqueda_indice.js está desactualizado: ejecuta `python herramientas/construir.py`')


if __name__ == '__main__':
    unittest.main()
