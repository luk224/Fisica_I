"""Genera `temas/prioridades.html` («¿Por dónde empiezo?») y `temas/ruta.html` (calendario hacia atrás desde las PEC).

  python herramientas/prioridades.py

Datos:
  - `fuentes_txt/examenes_por_tema.md`: una entrada = una pregunta de examen. Cuenta en el tema de su sección, salvo las marcadas
    «(secundario)», «referencia cruzada» o «principal Tema N» (esas suman como «herramienta»); «(secundario: Tema N…)» dentro de una entrada
    suma como herramienta en el tema N.
  - horas: las de la «ruta rápida» del chip ⏱ de cada tema (`tema.json`); se pueden corregir en `contenido/prioridades.json` («horas»).
  - dependencias y fechas de las PEC: `contenido/prioridades.json`.
"""
import collections
import html
import json
import pathlib
import re

from pagina_extra import pagina

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CONT = RAIZ / 'contenido'
DATOS = json.loads((CONT / 'prioridades.json').read_text(encoding='utf8'))
DEP = {int(k): [int(x) for x in v] for k, v in DATOS['dep'].items()}

CSS = """
.pr-tabla{width:100%;border-collapse:collapse;font:14px/1.35 var(--sans)}
.pr-tabla th,.pr-tabla td{padding:7px 8px;text-align:left;vertical-align:middle;border-bottom:1px solid var(--bd)}
.pr-tabla th{font-size:11.5px;text-transform:uppercase;letter-spacing:.04em;color:var(--mut)}
.pr-tabla td a{color:var(--fg);text-decoration:none}.pr-tabla td a:hover{color:var(--acc)}
.pr-tabla td small{display:block;color:var(--mut);font-size:12px}
.pr-tabla td.bar{position:relative;min-width:80px}
.pr-tabla .fill{position:absolute;left:8px;top:50%;height:55%;transform:translateY(-50%);background:color-mix(in srgb,var(--acc) 26%,transparent);border-radius:4px}
.pr-tabla .num{position:relative;font-weight:700}
.pr-tabla td.herr{color:var(--mut)}
.pr-tabla tfoot td{border-top:2px solid var(--bd)}
.pr-tag{font:700 11.5px var(--sans);padding:2px 8px;border-radius:99px;border:1px solid currentColor;display:inline-block;white-space:nowrap}
.pr-tag.t1{color:var(--warn-b)}.pr-tag.t2{color:#a06a00}.pr-tag.t3{color:var(--mut)}
:root[data-theme="dark"] .pr-tag.t2{color:#e5b04a}
.pr-rutas{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;margin:1em 0}
.pr-ruta{border:1px solid var(--bd);border-radius:12px;padding:4px 14px 12px;background:var(--card);font-family:var(--sans);min-width:0}
.pr-ruta h3{margin:.5em 0 .1em}.pr-ruta .big{font:800 1.4rem var(--sans);margin:.1em 0}
.pr-ruta .big small{font:500 .8rem var(--sans);color:var(--mut);display:block}
.pr-ruta .lst{color:var(--mut);font-size:.85rem;line-height:1.5;overflow-wrap:anywhere}
.pr-nota{color:var(--mut);font:.85rem var(--sans)}
.pr-ctl{display:flex;gap:8px;flex-wrap:wrap;margin:.8em 0}
.pr-ctl button{font:600 .85rem var(--sans);background:var(--card);color:var(--fg);border:1px solid var(--bd);border-radius:99px;padding:6px 14px;cursor:pointer}
.pr-ctl button[aria-pressed="true"]{background:var(--acc);border-color:var(--acc);color:#fff}
.pr-barras{font-family:var(--sans)}
.pr-barras .brow{display:grid;grid-template-columns:2.4em 1fr 3.6em;gap:8px;align-items:center;margin:4px 0;font-size:.85rem}
.pr-barras .brow a{color:var(--acc);text-decoration:none;font-weight:700}
.pr-barras .brow b{text-align:right}
.pr-barras .bt{display:block;background:color-mix(in srgb,var(--fg) 8%,transparent);border-radius:4px;height:14px;overflow:hidden}
.pr-barras .bt i{display:block;height:100%;border-radius:4px;background:var(--mut)}
.pr-barras .bt i.t1{background:var(--warn-b)}.pr-barras .bt i.t2{background:#d59a00}
@media(max-width:640px){.pr-tabla th.herr,.pr-tabla td.herr{display:none}.pr-tabla th,.pr-tabla td{padding:6px 4px}}
@media print{.pr-ctl{display:none}.pr-barras .bt i,.pr-tabla .fill{background:#999!important}.pr-ruta,.pr-tabla tr{break-inside:avoid}}
"""


def leer_examenes():
    """Preguntas de examen por tema: (principal, herramienta)."""
    prin, herr = collections.Counter(), collections.Counter()
    cur = None
    for l in (RAIZ / 'fuentes_txt' / 'examenes_por_tema.md').read_text(encoding='utf8').splitlines():
        m = re.match(r'## Tema (\d+)', l)
        if m:
            cur = int(m.group(1))
            continue
        if l.startswith('## '):
            cur = None
        if cur and l.startswith('- **['):
            if re.search(r'\(secundario\)|referencia cruzada|principal Tema \d+|tema principal \d+', l):
                herr[cur] += 1
            else:
                prin[cur] += 1
                for k in re.finditer(r'\(secundario: Tema (\d+)', l):
                    herr[int(k.group(1))] += 1
    return prin, herr


def horas_tema(n, t):
    """Horas de la «ruta rápida» del chip ⏱ de la cabecera del tema (`tema.json`)."""
    m = re.search(r'ruta rápida ~(\d+(?:,\d+)?) h', (CONT / f'tema_{n:02d}' / 'tema.json').read_text(encoding='utf8'))
    if not m:
        raise SystemExit(f'tema {n}: falta el chip «ruta rápida ~N h» en tema.json')
    return float(m.group(1).replace(',', '.'))


def fh(x):
    return (f'{x:.1f}'.rstrip('0').rstrip('.') if x != int(x) else str(int(x))).replace('.', ',')


def pc(x):
    return f'{x:.1f}'.replace('.', ',')


def nivel(r):
    """🔴 ≥ 9 % de las preguntas o ≥ 2 preguntas/hora; 🟡 ≥ 4 % o ≥ 3 apariciones como herramienta; ⚪ el resto."""
    if r['pct'] >= 9 or r['ratio'] >= 2:
        return 1
    if r['pct'] >= 4 or r['herr'] >= 3:
        return 2
    return 3


def cargar():
    prin, herr = leer_examenes()
    tot = sum(prin.values())
    filas = []
    for n in range(1, 21):
        t = json.loads((CONT / f'tema_{n:02d}' / 'tema.json').read_text(encoding='utf8'))
        h = DATOS['horas'].get(str(n)) or horas_tema(n, t)
        r = dict(n=n, nombre=t['titulo'], url=pathlib.Path(t['archivo']).name, h=h, ex=prin.get(n, 0), herr=herr.get(n, 0), dep=DEP.get(n, []))
        r['pct'] = 100 * r['ex'] / tot
        r['ratio'] = r['ex'] / h
        r['nivel'] = nivel(r)
        filas.append(r)
    return filas, tot


def cierre(cods):
    out, pend = set(), list(cods)
    while pend:
        c = pend.pop()
        if c not in out:
            out.add(c)
            pend += DEP.get(c, [])
    return out


NIVEL = {1: ('🔴', 'Imprescindible'), 2: ('🟡', 'Recomendada'), 3: ('⚪', 'Completa')}


def pagina_prioridades(filas, tot):
    por = {r['n']: r for r in filas}
    rutas = []
    for titulo, niv, emoji, desc in [
            ('Imprescindible', 1, '🔴', 'Los temas que más caen o mejor rinden por hora, más los previos que necesitan.'),
            ('Recomendada', 2, '🟡', 'Lo anterior más los temas de frecuencia media.'),
            ('Completa', 3, '⚪', 'Todo el temario.')]:
        cods = sorted(cierre([r['n'] for r in filas if r['nivel'] <= niv]))
        ex = sum(por[c]['ex'] for c in cods)
        h = sum(por[c]['h'] for c in cods)
        rutas.append(dict(t=titulo, e=emoji, desc=desc, n=len(cods), h=h, ex=ex, pct=100 * ex / tot, cods=cods))
    mx = max(r['ex'] for r in filas)
    tr = []
    for r in filas:
        e, nom = NIVEL[r['nivel']]
        ant = f'<small>Antes: {", ".join(map(str, r["dep"]))}</small>' if r['dep'] else ''
        tr.append(f'<tr data-i="{r["n"]}" data-ex="{r["ex"]}" data-ratio="{r["ratio"]:.3f}"><td><a href="{r["url"]}"><b>{r["n"]}</b> {html.escape(r["nombre"])}</a>{ant}</td>'
                  f'<td class="bar"><span class="fill" style="width:{100 * r["ex"] / mx:.0f}%"></span><span class="num">{r["ex"]}</span></td>'
                  f'<td>{pc(r["pct"])} %</td><td>{fh(r["h"])}</td><td><span class="pr-tag t{r["nivel"]}">{e} {nom}</span></td><td class="herr">{r["herr"] or "—"}</td></tr>')
    cards = ''.join(f'<div class="pr-ruta"><h3>{x["e"]} {x["t"]}</h3><p class="big">{fh(round(x["h"], 1))} h <small>· {x["n"]} temas · {pc(x["pct"])} % de las preguntas</small></p>'
                    f'<p>{x["desc"]}</p><p class="lst"><b>Temas:</b> {", ".join(map(str, x["cods"]))}</p></div>' for x in rutas)
    barras = ''.join(f'<div class="brow"><a href="{r["url"]}">{r["n"]}</a><span class="bt"><i class="t{r["nivel"]}" style="width:{100 * r["ex"] / mx:.0f}%"></i></span><b>{pc(r["pct"])} %</b></div>'
                     for r in sorted(filas, key=lambda r: (-r['ex'], r['n'])))
    nn = {k: [str(r['n']) for r in filas if r['nivel'] == k] for k in (1, 2, 3)}
    cero = [str(r['n']) for r in filas if r['ex'] == 0]
    hero = ('<header class="hero">\n  <div class="kick">Prioridades de estudio</div>\n  <h1>🎯 ¿Por dónde empiezo?</h1>\n'
            '  <p>No todos los temas «pagan» lo mismo en el examen: unos aparecen una y otra vez y otros casi nunca. Esta página cruza <b>cuánto ha caído</b> cada tema con <b>cuánto cuesta estudiarlo</b> '
            'y te propone tres rutas según el tiempo que tengas. Para convertirlas en un calendario, usa la <a href="ruta.html">ruta de estudio</a>.</p>\n</header>\n')
    cuerpo = f'''<div class="box warn"><span class="h">Léelo con cuidado</span>
<p>Es <b>frecuencia histórica</b> de los exámenes finales, no una probabilidad de que algo caiga este año. Sirve para ordenar el esfuerzo, no para dejar temas sin ver: un tema con pocas preguntas puede ser requisito de otro que sí cae (las rutas incluyen los previos) y <b>las PEC (15 % de la nota) sí preguntan todos los temas de su módulo</b>, incluidos los que casi nunca caen en el examen. Los exámenes analizados son los 16 catalogados en el índice del proyecto: no son todos los que ha habido.</p></div>
<h2 id="rutas">Tres rutas según tu tiempo</h2>
<div class="pr-rutas">{cards}</div>
<p class="pr-nota">Las horas de cada ruta incluyen los temas previos necesarios. Son las de la <b>ruta rápida</b> de cada tema (chip ⏱ de su cabecera: lo esencial, los ejercicios clave y los exámenes), pensada para quien lo ve por primera vez; la «completa» tarda casi el doble. Ajústalas a tu ritmo.</p>
<h2 id="tabla">Tema a tema</h2>
<div class="pr-ctl" role="group" aria-label="Ordenar la tabla">
  <button type="button" data-o="i" aria-pressed="true">Orden del temario</button>
  <button type="button" data-o="ex" aria-pressed="false">Más cae primero</button>
  <button type="button" data-o="ratio" aria-pressed="false">Más rentable primero</button>
</div>
<table id="tp" class="pr-tabla">
<thead><tr><th>Tema</th><th>Preguntas</th><th>% total</th><th>Horas</th><th>Prioridad</th><th class="herr" title="Preguntas de otro tema que usan este como herramienta (no suman al total)">Herram.</th></tr></thead>
<tbody>
{chr(10).join(tr)}
</tbody>
<tfoot><tr><td><b>Total</b></td><td><b>{tot}</b></td><td>100 %</td><td><b>{fh(sum(r["h"] for r in filas))}</b></td><td></td><td class="herr"></td></tr></tfoot>
</table>
<h2 id="barras">Qué parte del examen es cada tema</h2>
<div class="pr-barras">{barras}</div>
<h2 id="niveles">Cómo leer los niveles</h2>
<ul>
<li>🔴 <b>Imprescindible</b> (temas {", ".join(nn[1])}): al menos el 9 % de las preguntas contadas o 2 preguntas por hora de estudio. Aquí se gana o se pierde el aprobado.</li>
<li>🟡 <b>Recomendada</b> (temas {", ".join(nn[2])}): al menos el 4 % de las preguntas o tres apariciones como herramienta en otros temas.</li>
<li>⚪ <b>Completa</b> (temas {", ".join(nn[3])}): casi no caen en estos exámenes, pero siguen siendo materia{(" (sin ninguna pregunta contada: " + ", ".join(cero) + ")") if cero else ""} y entran en las PEC.</li>
</ul>
<h2 id="metodo">Cómo se ha calculado</h2>
<div class="box tip"><span class="h">Método y límites</span>
<ul>
<li><b>Cuánto cae.</b> Una entrada del índice de exámenes es una pregunta; cuenta en el tema de su sección ({tot} en total). Las que el índice marca como secundarias o referencias cruzadas suman solo en «Herram.».</li>
<li><b>Cuánto cuesta.</b> Las horas de la «ruta rápida» del chip ⏱ de la cabecera de cada tema: son estimaciones, no mediciones.</li>
<li><b>Dependencias.</b> Orientativas (criterio del autor, no del libro), en <code>contenido/prioridades.json</code>.</li>
<li><b>Regenerar.</b> <code>python3 herramientas/prioridades.py</code> (lo hace <code>construir.py</code>).</li>
</ul></div>
'''
    pagina('Física I · Prioridades de estudio', hero, cuerpo + '''<script>
(function(){
  var tb=document.querySelector('#tp tbody'),rows=[].slice.call(tb.rows);
  document.querySelectorAll('.pr-ctl button').forEach(function(b){b.addEventListener('click',function(){
    var o=b.dataset.o;document.querySelectorAll('.pr-ctl button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
    rows.slice().sort(function(a,c){return o==='i'?a.dataset.i-c.dataset.i:c.dataset[o]-a.dataset[o]||a.dataset.i-c.dataset.i}).forEach(function(r){tb.appendChild(r)});
  })});
})();
</script>
''', 'Datos: índice de exámenes del proyecto y volumen de cada tema. Página generada por herramientas/prioridades.py.', 'prioridades.html', CSS)
    return rutas


RUTA_CSS = """
.ru .ctl{display:flex;gap:14px;flex-wrap:wrap;align-items:center;margin:1em 0;font:15px var(--sans)}
.ru input[type=number]{font:16px var(--sans);width:5em;padding:5px 8px;border:1px solid var(--bd);border-radius:8px;background:var(--bg);color:var(--fg)}
.ru .pec{border:1px solid var(--bd);border-radius:12px;padding:6px 16px 12px;margin:1em 0;background:var(--card);font-family:var(--sans)}
.ru .pec h2{margin:.5em 0 .1em;font-size:1.2rem}.ru .res{color:var(--mut);font-size:14.5px}
.ru table{width:100%;border-collapse:collapse;font:14.5px/1.4 var(--sans);margin:.6em 0}
.ru th,.ru td{padding:7px 8px;border-bottom:1px solid var(--bd);text-align:left;vertical-align:top}
.ru th{font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--mut)}
.ru tr.hecho td{opacity:.5;text-decoration:line-through}
.ru .fuera{color:#b5701a}
.ru .tag{font:700 11px var(--sans);padding:2px 8px;border-radius:99px;border:1px solid currentColor;margin-left:6px;white-space:nowrap}
.ru .t1{color:var(--warn-b)}.ru .t2{color:#b5701a}.ru .t3{color:var(--mut)}
@media(max-width:600px){.ru th,.ru td{padding:6px 4px;font-size:14px}.ru .tag{display:inline-block;margin:3px 0 0}}
"""

RUTA_JS = r"""
(function(){
  var D=JSON.parse(document.getElementById('datos').textContent), KEY='ruta_fisica_v1', S={hs:8,hecho:{}};
  try{var g=JSON.parse(localStorage.getItem(KEY));if(g){S.hs=g.hs||8;S.hecho=g.hecho||{}}}catch(e){}
  function guarda(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
  var hs=document.getElementById('hs');hs.value=S.hs;
  var por={};D.temas.forEach(function(t){por[t.n]=t});
  var NOM=['','Imprescindible','Recomendado','Completo'];
  function f(d){return d.toLocaleDateString('es-ES',{day:'numeric',month:'short'})}
  function dias(a,b){return Math.round((b-a)/86400000)}
  function fila(t,a,b,atras){var chk='<input type="checkbox" data-c="'+t.n+'"'+(S.hecho[t.n]?' checked':'')+' aria-label="Estudiado">';
    return '<tr class="'+(S.hecho[t.n]?'hecho':'')+'"><td>'+chk+'</td><td><a href="'+t.url+'"><b>'+t.n+'</b> '+t.nombre+'</a><span class="tag t'+t.nivel+'">'+NOM[t.nivel]+'</span>'+(atras?'<span class="tag t3">pendiente de antes</span>':'')+'</td><td>'+(a?f(a)+' – '+f(b):'—')+'</td><td>'+String(t.h).replace('.',',')+' h</td></tr>'}
  function lista(arr){return arr.map(function(t){return '<a href="'+t.url+'">'+t.n+'</a> <label><input type="checkbox" data-c="'+t.n+'"> ya lo he estudiado</label>'}).join(' · ')}
  function pinta(){
    var hoy=new Date();hoy.setHours(0,0,0,0);
    document.getElementById('hoy').textContent='Hoy: '+hoy.toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
    var elegidos={}, ini=hoy, h='', acarreo=[];
    D.hitos.forEach(function(hi){
      var fin=new Date(hi.fecha+'T00:00:00');
      var propios=D.temas.filter(function(t){return hi.temas.indexOf(t.n)>=0});
      if(fin<hoy){
        var pend=propios.filter(function(t){return !S.hecho[t.n]});
        acarreo=acarreo.concat(pend);
        h+='<div class="pec"><h2>'+hi.nombre+'</h2><p class="res">Ya ha pasado'+(pend.length?'; '+pend.length+' temas siguen sin marcar y se pasan al siguiente hito (también entran en el examen).':'.')+'</p></div>';return}
      var grupo=propios.concat(acarreo.filter(function(t){return propios.indexOf(t)<0}));
      var rest=grupo.filter(function(t){return !S.hecho[t.n]&&!elegidos[t.n]});
      var cap=Math.max(0,dias(ini,fin)+1)/7*S.hs, usada=0, sel=[];
      function mete(t){ if(elegidos[t.n]||S.hecho[t.n]||sel.indexOf(t)>=0) return;
        (t.dep||[]).forEach(function(d){if(!S.hecho[d]&&!elegidos[d]&&grupo.indexOf(por[d])>=0)mete(por[d])});
        if(usada+t.h<=cap+0.01&&sel.indexOf(t)<0){usada+=t.h;sel.push(t)} }
      [propios,acarreo].forEach(function(origen){[1,2,3].forEach(function(nv){rest.filter(function(t){return t.nivel===nv&&origen.indexOf(t)>=0}).forEach(mete)})});
      sel.sort(function(a,b){return a.n-b.n});
      var ac=0, filas=sel.map(function(t){var a=new Date(ini.getTime()+ac/S.hs*7*86400000);ac+=t.h;var b=new Date(ini.getTime()+ac/S.hs*7*86400000-86400000);elegidos[t.n]=1;return fila(t,a,b,propios.indexOf(t)<0)});
      var fuera=rest.filter(function(t){return !elegidos[t.n]}), total=rest.reduce(function(s,t){return s+t.h},0);
      h+='<div class="pec"><h2>'+hi.nombre+' (cierra el '+f(fin)+')</h2><p class="res">Desde el '+f(ini)+' hay '+Math.max(0,dias(ini,fin)+1)+' días: caben ~<b>'+cap.toFixed(0)+' h</b> con '+S.hs+' h/semana; pendiente aquí: <b>'+total.toFixed(0)+' h</b>. '+
        (fuera.length?'<span class="fuera">No cabe todo: se eligen primero los temas que más puntúan y los que hacen falta antes.</span>':'<b>Te da tiempo de todo.</b>')+'</p>';
      h+='<table><thead><tr><th></th><th>Tema</th><th>Cuándo</th><th>Horas</th></tr></thead><tbody>'+filas.join('')+propios.filter(function(t){return S.hecho[t.n]}).map(function(t){return fila(t)}).join('')+'</tbody></table>';
      if(fuera.length)h+='<p class="res"><b>Para después</b> (si sobra tiempo): '+lista(fuera)+'</p>';
      h+='</div>'; ini=new Date(Math.max(ini.getTime(),fin.getTime()+86400000)); });
    var sin=D.temas.filter(function(t){return !S.hecho[t.n]&&!elegidos[t.n]});
    if(sin.length)h+='<div class="pec"><h2>Sin hueco antes de la última PEC</h2><p class="res">Faltan <b>'+sin.reduce(function(s,t){return s+t.h},0).toFixed(0)+' h</b> de estos temas, que son materia de examen: '+lista(sin)+'. Sube las horas por semana o déjalos para el repaso final.</p></div>';
    document.getElementById('out').innerHTML=h}
  hs.oninput=hs.onchange=function(){S.hs=Math.max(1,parseInt(hs.value,10)||8);guarda();pinta()};
  document.getElementById('out').addEventListener('change',function(e){if(e.target.dataset.c){S.hecho[e.target.dataset.c]=e.target.checked;guarda();pinta()}});
  pinta();
})();
"""


def pagina_ruta(filas):
    temas = [dict(n=r['n'], nombre=r['nombre'], h=r['h'], nivel=r['nivel'], dep=r['dep'], url=r['url']) for r in filas]
    datos = json.dumps(dict(temas=temas, hitos=DATOS['hitos']), ensure_ascii=False)
    hero = ('<header class="hero">\n  <div class="kick">Ruta de estudio</div>\n  <h1>🗓️ Ruta de estudio hasta las PEC</h1>\n'
            '  <p>Dime cuántas horas por semana puedes dedicar y calculo qué temas te caben antes de cada PEC, empezando por los que más rinden en el examen (ver <a href="prioridades.html">prioridades</a>) '
            'y respetando lo que cada tema necesita antes. Marca lo que ya has estudiado y el plan se recalcula. Todo se guarda solo en este navegador.</p>\n</header>\n')
    cuerpo = ('<div class="ru"><div class="ctl"><label>Horas por semana: <input type="number" id="hs" min="1" max="60" value="8"></label><span id="hoy"></span></div>\n<div id="out"></div>\n'
              '<p class="res">Las horas por tema son las de la «ruta rápida» de cada tema (estimaciones) y las dependencias son orientativas. '
              'Cada PEC cierra a las 23:59 de la fecha indicada. La fecha del examen presencial la publica la UNED: lo que no quepa antes de la PEC 4 queda para el repaso final.</p></div>\n'
              f'<script type="application/json" id="datos">{datos}</script>\n<script>{RUTA_JS}</script>\n')
    pagina('Física I · Ruta de estudio', hero, cuerpo, 'Página generada por herramientas/prioridades.py. Las PEC son voluntarias (15 % de la nota).', 'ruta.html', RUTA_CSS)


def main():
    filas, tot = cargar()
    rutas = pagina_prioridades(filas, tot)
    pagina_ruta(filas)
    print('OK temas/prioridades.html, temas/ruta.html;', tot, 'preguntas contadas')
    print('n\tex\therr\th\tnivel')
    for r in filas:
        print(f"{r['n']}\t{r['ex']}\t{r['herr']}\t{fh(r['h'])}\t{NIVEL[r['nivel']][1]}")
    for x in rutas:
        print(x['t'], fh(x['h']), 'h', x['n'], 'temas', pc(x['pct']), '%', x['cods'])


if __name__ == '__main__':
    main()
