"""Ejecuta todas las pruebas del proyecto.

  python pruebas/ejecutar.py            # todas (las de navegador necesitan Chrome; con PRUEBAS_TODAS=1 revisan los 20 temas)
  python pruebas/ejecutar.py --rapido   # sin navegador (segundos)
"""
import pathlib
import sys
import unittest

AQUI = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI))
sys.path.insert(0, str(AQUI.parent))

if __name__ == '__main__':
    rapido = '--rapido' in sys.argv
    patron = 'test_*.py'
    suite = unittest.TestSuite()
    for f in sorted(AQUI.glob(patron)):
        if rapido and f.stem == 'test_navegador':
            continue
        suite.addTests(unittest.defaultTestLoader.loadTestsFromName('pruebas.' + f.stem))
    r = unittest.TextTestRunner(verbosity=1).run(suite)
    sys.exit(0 if r.wasSuccessful() else 1)
