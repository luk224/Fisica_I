"""Calidad de todas las páginas de `temas/` (nuevas y antiguas): estructura, enlaces, citas y escapes de HTML."""
import re
import sys
import unittest
import pathlib

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from comun import FIN_U, INICIO_U, RAIZ, TEMAS, leer, paginas_tema  # noqa: E402

MD = RAIZ / 'fuentes_txt' / 'examenes_por_tema.md'
HTML_OK = set('''a abbr article aside b blockquote body br button caption code col colgroup dd del details div dl dt em figcaption figure
footer form h1 h2 h3 h4 h5 h6 head header hr html i iframe img input kbd label legend li link main mark meta nav noscript object ol option p pre q
s samp script section select small span strong style sub summary sup table tbody td template textarea tfoot th thead title tr u ul var video''' .split())
SVG_OK = set('''svg g path line circle ellipse rect polygon polyline text tspan defs marker use clipPath mask pattern linearGradient radialGradient
stop title desc symbol foreignObject image animate animateTransform filter feGaussianBlur feOffset feMerge feMergeNode'''.split())
SIN_CIERRE = {'br', 'hr', 'img', 'input', 'link', 'meta', 'col', 'path', 'line', 'circle', 'ellipse', 'rect', 'polygon', 'polyline', 'stop', 'use'}


def sin_svg(t):
    return re.sub(r'<(script|style)\b.*?</\1>', '', re.sub(r'<svg\b.*?</svg>', '<svg/>', t, flags=re.S), flags=re.S)


class Paginas(unittest.TestCase):
    def paginas(self):
        return paginas_tema() + [(0, p) for p in sorted(TEMAS.glob('ejercicios_*.html'))]

    def test_estructura(self):
        for n, p in self.paginas():
            t = sin_svg(leer(p))
            with self.subTest(pagina=p.name):
                for tag in ('div', 'details', 'section', 'figure', 'table', 'ul', 'ol', 'span', 'main'):
                    self.assertEqual(len(re.findall(rf'<{tag}\b', t)), len(re.findall(rf'</{tag}>', t)), f'<{tag}> sin equilibrar')
                self.assertEqual(len(re.findall(r'<h1\b', t)), 1)

    def test_etiquetas_html_desconocidas(self):
        """Un `<` suelto dentro de una fórmula (p. ej. «$n<mg$») se lee como etiqueta y se come el texto: lo detecta."""
        for n, p in self.paginas():
            t = sin_svg(leer(p))
            with self.subTest(pagina=p.name):
                malas = {m for m in re.findall(r'<([A-Za-z][\w-]*)', t)} - HTML_OK - SVG_OK
                self.assertFalse(malas, f'etiquetas desconocidas (¿un «<» sin escapar?): {sorted(malas)[:8]}')

    def test_ids_unicos_y_enlaces_internos(self):
        for n, p in self.paginas():
            t = leer(p)
            ids = re.findall(r'\sid="([^"]+)"', sin_svg(t))
            with self.subTest(pagina=p.name):
                dup = {i for i in ids if ids.count(i) > 1 and not i.startswith('m')}
                self.assertFalse(dup, f'ids repetidos: {sorted(dup)}')
                for h in re.findall(r'href="#([^"]+)"', t):
                    self.assertIn(h, ids, f'enlace roto #{h}')

    def test_citas_bien_formadas(self):
        for n, p in self.paginas():
            t = sin_svg(leer(p))
            with self.subTest(pagina=p.name):
                for l, ref in re.findall(r'<span class="src" data-l="([^"]*)" data-ref="([^"]*)"', t):
                    self.assertIn(l, 'UEXPA', f'clave de fuente desconocida «{l}»')
                    self.assertTrue(ref.strip(), 'cita vacía')

    def test_paginas_de_libro_dentro_del_capitulo(self):
        """Cada página citada de U cae dentro del capítulo que la propia cita indica (§N.M, Ej. N.M, Problema N.M, ec. N.M);
        si la cita no indica capítulo, dentro del de su tema."""
        for n, p in paginas_tema():
            t = sin_svg(leer(p))
            with self.subTest(pagina=p.name):
                for ref in re.findall(r'<span class="src" data-l="U" data-ref="([^"]*)"', t):
                    for seg in re.split(r';', ref):
                        # capítulos que la propia cita menciona: «§15.8», «Ej. 5.3», «Problema 5.1», «ec. 14.23», «sección 7.3»
                        caps = {int(c) for c in re.findall(r'(?:§|Ej\.?|Ejemplos?|Problemas?|Ejercicios?|ec\.|fig\.|secci[oó]n|Tabla|estrategia[^.\d]*|\()\s*\(?(\d{1,2})\.\d', seg, re.I) if 1 <= int(c) <= 20}
                        caps |= {int(c) for c in re.findall(r'\b(?:y|e)\s+(\d{1,2})\.\d+', seg) if 1 <= int(c) <= 20} if caps else set()
                        caps = caps or {n}
                        rangos = [(INICIO_U[c] - 3, FIN_U[c] + 3) for c in caps]
                        for m in re.finditer(r'\bpp?\.\s*(\d+(?:\s*[-,]\s*\d+)*)', seg):
                            for x in map(int, re.findall(r'\d+', m.group(1))):
                                self.assertTrue(any(lo <= x <= hi for lo, hi in rangos), f'«{seg.strip()}» (en «{ref}»): página {x} fuera de los capítulos {sorted(caps)}')

    def test_examenes_citados_existen(self):
        if not MD.exists():
            self.skipTest('falta fuentes_txt/examenes_por_tema.md')
        md = leer(MD)
        mes = {'Feb': 'Febrero', 'Sept': 'Septiembre', 'Sep': 'Septiembre'}
        for n, p in paginas_tema():
            t = sin_svg(leer(p))
            with self.subTest(pagina=p.name):
                for ref in set(re.findall(r'data-l="X" data-ref="([^"]*)"', t)):
                    for r in re.split(r';\s*', ref):
                        m = re.search(r'(Febrero|Feb|Septiembre|Sept|Sep)\.?\s+(\d{4})\s*\(([^)]*?)\.?\)\s*,?\s*P-(\d+)', r)
                        if not m:
                            continue          # referencias que no son una convocatoria concreta
                        m_, y, sem, pn = m.groups()
                        m_ = mes.get(m_, m_)
                        sem = re.sub(r'\bsem\.?', 'semana', sem).strip()
                        ok = any(f'{m_} {y}' in l and f'P-{pn}' in l and (sem.split()[0] in l or 'Reserva' in sem) for l in md.split('\n'))
                        self.assertTrue(ok, f'«{r}» no aparece en examenes_por_tema.md')

    def test_sin_comparativas_de_fuentes(self):
        """Regla 8 bis de CLAUDE.md: nada sobre erratas ni discrepancias entre fuentes en el texto visible."""
        pat = re.compile(r'errata|la oficial se equivoca|solucionario (omite|dice|se equivoca)', re.I)
        for n, p in paginas_tema():
            t = re.sub(r'<[^>]+>', ' ', sin_svg(leer(p)))
            with self.subTest(pagina=p.name):
                m = pat.search(t)
                self.assertIsNone(m, f'menciona: …{t[max(0, m.start() - 50):m.end() + 50] if m else ""}…')


if __name__ == '__main__':
    unittest.main()
