"""Pruebas en Chrome sin interfaz (se saltan si no hay Chrome): fórmulas, figuras de carga perezosa y buscador.
Por defecto solo las páginas generadas desde `contenido/`; con PRUEBAS_TODAS=1, los 20 temas."""
import os
import pathlib
import re
import sys
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from comun import CONTENIDO, RAIZ, TEMAS, chrome, paginas_tema, servidor, volcar_dom, leer  # noqa: E402



def paginas():
    if os.environ.get('PRUEBAS_TODAS'):
        return [p for _, p in paginas_tema()]
    import json
    return [TEMAS / json.loads(t.read_text(encoding='utf8'))['archivo'] for t in sorted(CONTENIDO.glob('tema_*/tema.json'))]


@unittest.skipUnless(chrome(), 'no hay Chrome/Chromium (define CHROME=ruta)')
class Navegador(unittest.TestCase):
    @classmethod
    def tearDownClass(cls):
        for f in TEMAS.glob('_tmp_*.html'):
            f.unlink()

    def test_formulas_y_figuras(self):
        with servidor() as base:
            for p in paginas():
                # copia con todas las soluciones abiertas: así también se cargan las figuras de los ejercicios
                copia = TEMAS / ('_tmp_' + p.name)
                copia.write_text(leer(p).replace('<details class="sol"', '<details open class="sol"'), encoding='utf8')
                dom = volcar_dom(base + f'temas/_tmp_{p.name}')
                with self.subTest(pagina=p.name):
                    self.assertGreater(dom.count('class="katex"'), 50, 'KaTeX no ha renderizado')
                    self.assertEqual(dom.count('katex-error'), 0, 'fórmulas con error')
                    texto = re.sub(r'<(script|style|svg)\b.*?</\1>', '', dom, flags=re.S)
                    texto = re.sub(r'<span class="katex-mathml">.*?</span>', '', texto, flags=re.S)
                    texto = re.sub(r'<[^>]+>', '', texto)
                    sueltos = re.findall(r'.{25}\$.{25}', texto)
                    self.assertFalse(sueltos, f'«$» sin renderizar: {sueltos[:2]}')
                    self.assertEqual(dom.count('class="figph"'), 0, f'figuras sin cargar: {dom.count("class=" + chr(34) + "figph" + chr(34))}')
                    self.assertEqual(dom.count('figerr'), 0)

    def test_buscador(self):
        pag = paginas()[0]
        guion = ('<script>window.addEventListener("load",function(){document.dispatchEvent(new KeyboardEvent("keydown",{key:"/"}));'
                 'var out=[];(function n(){if(!window.BUSQUEDA)return setTimeout(n,100);var i=document.querySelector(".bq-in");'
                 '["peso aparente","fricción estática","tan beta","qwertyzz"].forEach(function(q){i.value=q;i.dispatchEvent(new Event("input"));'
                 'out.push(q+"="+document.querySelectorAll(".bq-l li[data-i]").length)});'
                 'var p=document.createElement("pre");p.id="res";p.textContent=out.join(";");document.body.appendChild(p)})()});</script></body>')
        copia = TEMAS / '_tmp_busqueda.html'
        copia.write_text(leer(pag).replace('</body>', guion), encoding='utf8')
        with servidor() as base:
            dom = volcar_dom(base + 'temas/_tmp_busqueda.html', alto=900)
        m = re.search(r'<pre id="res">(.*?)</pre>', dom)
        self.assertTrue(m, 'el buscador no respondió')
        r = dict(x.split('=') for x in m.group(1).split(';'))
        self.assertGreater(int(r['peso aparente']), 0)
        self.assertGreater(int(r['fricción estática']), 0)
        self.assertGreater(int(r['tan beta']), 0)
        self.assertEqual(int(r['qwertyzz']), 0)


if __name__ == '__main__':
    unittest.main()
