"""Reconstruye todo lo generado: páginas desde `contenido/`, índice del buscador y página de cambios.

  python herramientas/construir.py          # construye
  python herramientas/construir.py --probar # construye y ejecuta las pruebas rápidas
"""
import pathlib
import subprocess
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
H = RAIZ / 'herramientas'


def correr(*args):
    r = subprocess.run([sys.executable, *map(str, args)], cwd=RAIZ)
    if r.returncode:
        sys.exit(r.returncode)


def main():
    for d in sorted((RAIZ / 'contenido').glob('tema_*')):
        correr(H / 'tema_datos.py', 'generar', int(d.name.split('_')[1]))
    correr(H / 'construir_busqueda.py')
    correr(H / 'generar_cambios.py')
    if '--probar' in sys.argv:
        correr(RAIZ / 'pruebas' / 'ejecutar.py', '--rapido')


if __name__ == '__main__':
    main()
