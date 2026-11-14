"""Contenido de un tema como datos (carpeta `contenido/tema_NN/`) <-> página HTML (`temas/`).

  python herramientas/tema_datos.py migrar  temas/tema_05_final.html 5 tema_05_aplicacion_newton.html   # HTML -> contenido/tema_05/ (una sola vez por tema)
  python herramientas/tema_datos.py generar 5                            # contenido/tema_05/ -> temas/… + assets/figs/t05/
  python herramientas/tema_datos.py generar 5 --inline                   # igual, pero con los SVG incrustados (comprobaciones)
  python herramientas/tema_datos.py equivale 5 [página.html]               # compara la página regenerada con la publicada

Estructura de `contenido/tema_NN/`:
  tema.json        metadatos, orden de los bloques y diccionario de figuras (con su pie y su fuente)
  ejercicios/      un `.json` (metadatos) + un `.html` (cuerpo) por ejercicio; `{{fig:nombre}}` inserta una figura
  partes/          fragmentos HTML que se copian tal cual (resumen en 5 minutos, chuleta…)
Los SVG viven en `assets/figs/tNN/nombre.svg` y las páginas los cargan al acercarse (assets/figuras.js).
"""
import html as _html
import json
import pathlib
import re
import sys
import unicodedata

RAIZ = pathlib.Path(__file__).resolve().parent.parent
XMLNS = ' xmlns="http://www.w3.org/2000/svg"'
SRC_RE = re.compile(r'<span class="src" data-l="(\w)" data-ref="([^"]*)"[^>]*>([^<]*)</span>')
PRIO_RE = re.compile(r'<span class="prio p(\d)">([^<]*)</span>')


# ---------------------------------------------------------------- utilidades
def a_json(s):
    return s.split('\n') if '\n' in s else s

def de_json(v):
    return '\n'.join(v) if isinstance(v, list) else v

def src_dict(m):
    return {'l': m.group(1), 'ref': _html.unescape(m.group(2)) if False else m.group(2), 'txt': m.group(3)}

def src_html(d):
    return f'<span class="src" data-l="{d["l"]}" data-ref="{d["ref"]}">{d["txt"]}</span>'

def slug(t):
    t = unicodedata.normalize('NFD', t.lower())
    t = ''.join(c for c in t if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')[:48] or 'fig'

def norm(s):
    s = s.replace(XMLNS, '')
    s = re.sub(r'\s+', ' ', s)
    s = re.sub(r'\s*(<[^>]+>)\s*', r'\1', s)
    return s.strip()

def top_level(s):
    """Divide un fragmento HTML en sus elementos de primer nivel (cadena completa de cada uno)."""
    out, pos = [], 0
    abre = re.compile(r'<(\w+)([^>]*)>')
    while True:
        m = abre.search(s, pos)
        if not m:
            assert not s[pos:].strip(), s[pos:pos + 80]
            return out
        assert not s[pos:m.start()].strip(), s[pos:m.start()][:80]
        tag = m.group(1)
        depth, i = 1, m.end()
        tok = re.compile(r'<(/?)' + tag + r'\b[^>]*>')
        while depth:
            t = tok.search(s, i)
            assert t, 'sin cierre de ' + tag
            depth += -1 if t.group(1) else 1
            i = t.end()
        out.append(s[m.start():i])
        pos = i


# ---------------------------------------------------------------- HTML -> datos
class Migrador:
    def __init__(self, num, destino, archivo):
        self.num, self.dir, self.archivo = num, destino, archivo
        self.figs, self.bloques, self.partes = {}, [], 0
        self.ej_meta = {}      # id -> metadatos de la tabla «método que te llevas»
        self.svgdir = RAIZ / 'assets' / 'figs' / f't{num:02d}'
        self.nombres = set()

    def _nombre(self, label):
        base = slug(label); n, k = base, 2
        while n in self.nombres:
            n = f'{base}-{k}'; k += 1
        self.nombres.add(n); return n

    def _figura(self, outer):
        m = re.match(r'<figure class="fig">\s*(<svg.*?</svg>)\s*<figcaption>(.*?)</figcaption>\s*</figure>', outer, re.S)
        assert m, outer[:120]
        svg, cap = m.group(1), m.group(2)
        label = re.search(r'aria-label="([^"]*)"', svg).group(1)
        vb = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', svg)
        nombre = self._nombre(label)
        self.svgdir.mkdir(parents=True, exist_ok=True)
        svg_x = svg.replace('<svg ', '<svg' + XMLNS + ' ', 1)
        (self.svgdir / f'{nombre}.svg').write_text(svg_x + '\n', encoding='utf8')
        sm = list(SRC_RE.finditer(cap))
        fin = sm[-1] if sm and cap.rstrip().endswith('</span>') else None
        self.figs[nombre] = {'w': vb.group(1), 'h': vb.group(2), 'label': label,
                             'pie': a_json((cap[:fin.start()] if fin else cap).rstrip()), 'src': src_dict(fin) if fin else None}
        return nombre

    def _tokenizar_figuras(self, body):
        def rep(m):
            return '{{fig:' + self._figura(m.group(0)) + '}}'
        return re.sub(r'<figure class="fig">.*?</figure>', rep, body, flags=re.S)

    def _parte(self, outer, nombre=None):
        self.partes += 1
        if not nombre:
            idm = re.search(r'\bid="([\w-]+)"', outer)
            nombre = (idm.group(1) if idm else f'parte{self.partes:02d}')
        (self.dir / 'partes').mkdir(parents=True, exist_ok=True)
        (self.dir / 'partes' / f'{nombre}.html').write_text(self._tokenizar_figuras(outer).strip() + '\n', encoding='utf8')
        self.bloques.append({'t': 'parte', 'archivo': f'{nombre}.html'})

    def _ejercicio(self, outer):
        m = re.match(r'<details class="sol"( id="([\w]+)")?><summary>(.*?)</summary>(.*)</details>$', outer, re.S)
        assert m, outer[:100]
        eid, summ, body = m.group(2), m.group(3), m.group(4)
        sm = list(SRC_RE.finditer(summ)); fin = sm[-1]
        pm = PRIO_RE.search(summ)
        tit = summ[:min(x for x in (pm.start() if pm else 10**9, fin.start()))].strip()
        et, _, titulo = tit.partition(' — ')
        orig = eid
        eid = eid or re.sub(r'[^a-z0-9]+', '-', et.lower()).strip('-')
        meta = {'id': orig and eid, 'etiqueta': et, 'titulo': titulo, 'prio': PRIO_RE.search(summ).group(0) if pm else None, 'src': src_dict(fin)}
        (self.dir / 'ejercicios').mkdir(parents=True, exist_ok=True)
        (self.dir / 'ejercicios' / f'{eid}.html').write_text(self._tokenizar_figuras(body).strip() + '\n', encoding='utf8')
        self.ej_meta.setdefault(eid, {}).update(meta)
        self.bloques.append({'t': 'ej', 'ref': eid})

    def _h2(self, outer):
        m = re.match(r'<h2 id="([^"]+)"><span class="n">([^<]*)</span>(.*?)</h2>$', outer, re.S)
        assert m, outer[:100]
        id_, n, resto = m.groups()
        sm = list(SRC_RE.finditer(resto)); src = src_dict(sm[-1]) if sm else None
        pm = PRIO_RE.search(resto)
        cut = min([x.start() for x in (pm, sm[-1] if sm else None) if x] or [len(resto)])
        self.bloques.append({'t': 'h2', 'id': id_, 'n': n, 'titulo': resto[:cut].strip(),
                             'prio': int(pm.group(1)) if pm else None, 'src': src})

    def _h3(self, outer):
        m = re.match(r'<h3>(.*?)</h3>$', outer, re.S)
        resto = m.group(1); pm = PRIO_RE.search(resto)
        self.bloques.append({'t': 'h3', 'titulo': (resto[:pm.start()] if pm else resto).strip(), 'prio': int(pm.group(1)) if pm else None})

    def _caja(self, outer):
        m = re.match(r'<div class="box (\w+)"><span class="h">(.*?)</span>\n?(.*)</div>$', outer, re.S)
        if not m:
            return self._parte(outer)
        k, h, resto = m.groups()
        sm = list(SRC_RE.finditer(resto))
        if not sm or not resto.rstrip().endswith('</span>'):
            return self._parte(outer)
        fin = sm[-1]
        self.bloques.append({'t': 'caja', 'k': k, 'h': h, 'html': a_json(self._tokenizar_figuras(resto[:fin.start()]).strip()), 'src': src_dict(fin)})

    def _libro(self, outer):
        m = re.match(r'<figure class="bookfig">\s*<img src="([^"]+)" alt="([^"]*)" loading="lazy">\s*<figcaption>(.*?)</figcaption>\s*</figure>$', outer, re.S)
        assert m, outer[:100]
        cap = m.group(3); sm = list(SRC_RE.finditer(cap)); fin = sm[-1]
        self.bloques.append({'t': 'libro', 'img': m.group(1), 'alt': m.group(2), 'pie': a_json(cap[:fin.start()].rstrip()), 'src': src_dict(fin)})

    def _test(self, outer):
        m = re.match(r'<details class="check"><summary>(.*?)</summary>\s*<ol>(.*)</ol>\s*</details>$', outer, re.S)
        assert m, outer[:100]
        items = []
        for li in re.findall(r'<li>(.*?)</li>', m.group(2), re.S):
            q, a = re.match(r'(.*?)<details><summary>Ver respuesta</summary>(.*)</details>$', li, re.S).groups()
            items.append({'q': q.strip(), 'a': a.strip()})
        self.bloques.append({'t': 'test', 'titulo': m.group(1), 'items': items})

    def _metodos(self, outer):
        for tr in re.findall(r'<tr><td><a href="#(\w+)">(\w+)</a>([^<]*)</td><td>(.*?)</td><td>(.*?)</td></tr>', outer, re.S):
            eid, et, extra, tipo, metodo = tr
            self.ej_meta.setdefault(eid, {})['tabla'] = {'extra': extra.strip(' ·'), 'tipo': tipo, 'metodo': metodo}
        self.bloques.append({'t': 'metodos'})

    def migrar(self, ruta_html):
        s = pathlib.Path(ruta_html).read_text(encoding='utf8')
        titulo = re.search(r'<title>(.*?)</title>', s).group(1)
        main = s[s.index('<main>') + 6:s.index('</main>')]
        meta = {'num': self.num}
        cabecera_ok = False
        for outer in top_level(main):
            if outer.startswith('<header class="hero">'):
                h = re.search(r'<div class="kick">(.*?)</div>\s*<h1>(.*?)</h1>\s*<p>(.*?)</p>\s*<div class="chips">(.*?)</div>', outer, re.S)
                meta.update({'kick': h.group(1), 'titulo': h.group(2), 'descripcion': h.group(3),
                             'chips': re.findall(r'<span>(.*?)</span>', h.group(4))})
                cabecera_ok = True
            elif outer.startswith('<h2 '): self._h2(outer)
            elif outer.startswith('<h3'): self._h3(outer)
            elif outer.startswith('<div class="box '): self._caja(outer)
            elif outer.startswith('<figure class="bookfig">'): self._libro(outer)
            elif outer.startswith('<details class="check">'): self._test(outer)
            elif outer.startswith('<details class="sol"'): self._ejercicio(outer)
            elif outer.startswith('<table class="metodos">'): self._metodos(outer)
            elif outer.startswith('<figure class="fig">'):
                self.bloques.append({'t': 'fig', 'ref': self._figura(outer)})
            elif outer.startswith('<footer>'):
                meta['pie'] = re.search(r'<footer>(.*?)</footer>', outer, re.S).group(1)
            elif outer.startswith('<section') or outer.startswith('<details') or outer.startswith('<figure') or outer.startswith('<ul') \
                    or outer.startswith('<table') or outer.startswith('<p') or outer.startswith('<div') or outer.startswith('<ol'):
                self._parte(outer)
            else:
                raise ValueError('elemento no reconocido: ' + outer[:80])
        assert cabecera_ok
        meta['titulo_pagina'] = titulo
        meta['archivo'] = self.archivo
        meta['examenes_requeridos'] = [m['src']['ref'] for m in self.ej_meta.values() if m.get('src', {}).get('l') == 'X']
        meta['figuras'] = self.figs
        meta['bloques'] = self.bloques
        for eid, m in self.ej_meta.items():
            ruta = self.dir / 'ejercicios' / f'{eid}.json'
            if 'etiqueta' in m:
                ruta.write_text(json.dumps(m, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
        return meta


# ---------------------------------------------------------------- datos -> HTML
PLANTILLA = (RAIZ / 'contenido' / 'plantilla_pagina.html')


def leer_json(p):
    return json.loads(pathlib.Path(p).read_text(encoding='utf8'))


class Generador:
    def __init__(self, num, inline=False):
        self.num, self.inline = num, inline
        self.dir = RAIZ / 'contenido' / f'tema_{num:02d}'
        self.t = leer_json(self.dir / 'tema.json')
        self.figs = self.t['figuras']

    def prio(self, n):
        return {1: '<span class="prio p1">🔴</span>', 2: '<span class="prio p2">🟡</span>', 3: '<span class="prio p3">⚪</span>'}[n]

    def figura(self, nombre):
        f = self.figs[nombre]
        pie = de_json(f['pie']) + (' ' + src_html(f['src']) if f['src'] else '')
        ruta = RAIZ / 'assets' / 'figs' / f't{self.num:02d}' / f'{nombre}.svg'
        if self.inline:
            svg = ruta.read_text(encoding='utf8').strip().replace(XMLNS, '', 1)
            return f'<figure class="fig">\n{svg}\n<figcaption>{pie}</figcaption>\n</figure>'
        return (f'<figure class="fig" data-svg="../assets/figs/t{self.num:02d}/{nombre}.svg">\n'
                f'<div class="figph" role="img" aria-label="{f["label"]}" style="aspect-ratio:{f["w"]}/{f["h"]}"></div>\n'
                f'<figcaption>{pie}</figcaption>\n</figure>')

    def tokens(self, s):
        return re.sub(r'\{\{fig:([\w-]+)\}\}', lambda m: self.figura(m.group(1)), s)

    def ejercicio(self, eid):
        m = leer_json(self.dir / 'ejercicios' / f'{eid}.json')
        cuerpo = self.tokens((self.dir / 'ejercicios' / f'{eid}.html').read_text(encoding='utf8').strip())
        idattr = f' id="{m["id"]}"' if m.get('id') else ''
        pr = (' ' + m['prio']) if m.get('prio') else ''
        return (f'<details class="sol"{idattr}><summary>{m["etiqueta"]} — {m["titulo"]}{pr} {src_html(m["src"])}</summary>\n'
                f'{cuerpo}\n</details>\n')

    def metodos(self):
        filas = []
        for b in self.t['bloques']:
            if b['t'] != 'ej':
                continue
            m = leer_json(self.dir / 'ejercicios' / f'{b["ref"]}.json')
            tb = m.get('tabla')
            if tb:
                extra = f' · {tb["extra"]}' if tb['extra'] else ''
                enlace = f'<a href="#{m["id"]}">{m["etiqueta"]}</a>' if m.get('id') else m['etiqueta']
                filas.append(f'<tr><td>{enlace}{extra}</td><td>{tb["tipo"]}</td><td>{tb["metodo"]}</td></tr>')
        return ('<table class="metodos">\n<tr><th>Ejercicio</th><th>Qué tipo es</th><th>Método que te llevas</th></tr>\n'
                + '\n'.join(filas) + '\n</table>\n')

    def bloque(self, b):
        t = b['t']
        if t == 'h2':
            extra = (' ' + self.prio(b['prio'])) if b.get('prio') else ''
            extra += (' ' + src_html(b['src'])) if b.get('src') else ''
            return f'<h2 id="{b["id"]}"><span class="n">{b["n"]}</span>{b["titulo"]}{extra}</h2>\n'
        if t == 'h3':
            return f'<h3>{b["titulo"]}' + (' ' + self.prio(b['prio']) if b.get('prio') else '') + '</h3>\n'
        if t == 'caja':
            return (f'<div class="box {b["k"]}"><span class="h">{b["h"]}</span>\n{self.tokens(de_json(b["html"]))}\n'
                    f'  {src_html(b["src"])}</div>\n')
        if t == 'fig':
            return self.figura(b['ref']) + '\n'
        if t == 'libro':
            return (f'<figure class="bookfig">\n<img src="{b["img"]}" alt="{b["alt"]}" loading="lazy">\n'
                    f'<figcaption>{de_json(b["pie"])} {src_html(b["src"])}</figcaption>\n</figure>\n')
        if t == 'test':
            li = ''.join(f'<li>{i["q"]}<details><summary>Ver respuesta</summary>{i["a"]}</details></li>\n' for i in b['items'])
            return f'<details class="check"><summary>{b["titulo"]}</summary>\n<ol>\n{li}</ol>\n</details>\n\n'
        if t == 'ej':
            return self.ejercicio(b['ref'])
        if t == 'metodos':
            return self.metodos()
        if t == 'parte':
            return self.tokens((self.dir / 'partes' / b['archivo']).read_text(encoding='utf8').strip()) + '\n'
        raise ValueError(t)

    def pagina(self):
        t = self.t
        chips = ''.join(f'<span>{c}</span>' for c in t['chips'])
        hero = ('<header class="hero">\n  <div class="kick">' + t['kick'] + '</div>\n  <h1>' + t['titulo'] + '</h1>\n  <p>' + t['descripcion']
                + '</p>\n  <div class="chips">' + chips + '</div>\n' + (self.dir.parent / 'leyenda.html').read_text(encoding='utf8').strip() + '\n</header>\n')
        cuerpo = ''.join(self.bloque(b) for b in t['bloques'])
        pl = PLANTILLA.read_text(encoding='utf8')
        return (pl.replace('{{titulo_pagina}}', t['titulo_pagina']).replace('{{hero}}', hero)
                  .replace('{{cuerpo}}', cuerpo).replace('{{pie}}', t['pie']))

    def escribir(self, destino=None):
        destino = destino or RAIZ / 'temas' / self.t['archivo']
        destino.write_text(self.pagina(), encoding='utf8')
        return destino


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    cmd = sys.argv[1]
    if cmd == 'migrar':
        ruta, num, archivo = sys.argv[2], int(sys.argv[3]), sys.argv[4]
        d = RAIZ / 'contenido' / f'tema_{num:02d}'
        d.mkdir(parents=True, exist_ok=True)
        meta = Migrador(num, d, archivo).migrar(ruta)
        (d / 'tema.json').write_text(json.dumps(meta, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
        print('OK datos en', d.relative_to(RAIZ), '·', len(meta['figuras']), 'figuras ·', len(meta['bloques']), 'bloques')
    elif cmd == 'generar':
        num = int(sys.argv[2]); g = Generador(num, '--inline' in sys.argv)
        print('OK', g.escribir().relative_to(RAIZ))
    elif cmd == 'equivale':
        num = int(sys.argv[2])
        g = Generador(num, inline=True)
        ref = pathlib.Path(sys.argv[3]) if len(sys.argv) > 3 and not sys.argv[3].startswith('--') else RAIZ / 'temas' / g.t['archivo']
        cuerpo = lambda x: x[x.index('<main>'):x.index('</main>')]
        a = norm(cuerpo(g.pagina())); b = norm(cuerpo(ref.read_text(encoding='utf8')))
        if a == b:
            print('OK la página regenerada (SVG incrustados) equivale a la publicada'); return
        i = next(k for k in range(min(len(a), len(b))) if a[k] != b[k]) if a[:min(len(a), len(b))] != b[:min(len(a), len(b))] else min(len(a), len(b))
        print('DIFERENCIA en', i, '\n generada:', a[max(0, i - 80):i + 120], '\n publicada:', b[max(0, i - 80):i + 120]); sys.exit(1)

if __name__ == '__main__':
    main()
