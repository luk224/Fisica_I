"""Genera `cambios.html` (página de cambios) a partir del historial de git.

  python herramientas/generar_cambios.py

Una entrada por commit (fecha, resumen y detalle); se omiten las líneas de coautoría y de sesión. La página va fuera de los temas.
El commit que incluye esta página no aparece en ella hasta el siguiente (no puede listarse a sí mismo).
"""
import html
import pathlib
import re
import subprocess
from datetime import date

RAIZ = pathlib.Path(__file__).resolve().parent.parent
SEP, FIN = '\x1e', '\x1f'


def commits():
    r = subprocess.run(['git', 'log', f'--pretty=format:%h{FIN}%as{FIN}%B{SEP}'], cwd=RAIZ, capture_output=True, text=True, encoding='utf8', check=True)
    out = []
    for reg in r.stdout.split(SEP):
        reg = reg.strip('\n')
        if not reg.strip():
            continue
        h, fecha, msg = reg.split(FIN, 2)
        lineas = [l for l in msg.strip().split('\n') if not re.match(r'^(Co-Authored-By|Claude-Session):', l.strip(), re.I)]
        asunto = lineas[0].strip() if lineas else ''
        detalle = [l.strip() for l in lineas[1:] if l.strip()]
        out.append((h.strip(), fecha, asunto, detalle))
    return out


def main():
    cs = commits()
    items, ultimo = [], None
    for h, f, asunto, det in cs:
        if f != ultimo:
            items.append(f'<h2>{html.escape(f)}</h2>')
            ultimo = f
        m = re.match(r'(Tema\s+(\d+)|Temas\s+[\d\-, y]+|Piloto del tema\s+(\d+))', asunto)
        chip = f'<span class="chip">{html.escape(m.group(1))}</span> ' if m else ''
        cuerpo = ''.join(f'<p>{html.escape(l)}</p>' for l in det)
        items.append(f'<article class="cmb"><b>{chip}{html.escape(asunto)}</b>{cuerpo}<small>{html.escape(h)}</small></article>')
    pagina = f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<script>try{{var t=localStorage.getItem('tema');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}}catch(e){{}}</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Física I · Cambios</title>
<link rel="stylesheet" href="assets/resumen.css">
<style>
main.cambios{{max-width:760px;margin:0 auto;padding:24px 16px 80px}}
main.cambios h1{{margin:.2em 0}}
main.cambios h2{{font-size:1.05rem;margin:1.8em 0 .3em;padding-top:.5em;border-top:1px solid var(--bd);font-family:var(--sans);color:var(--mut)}}
.cmb{{background:var(--card);border:1px solid var(--bd);border-radius:10px;padding:10px 14px;margin:.5em 0}}
.cmb p{{margin:.3em 0;color:var(--mut);font-size:.93rem}}
.cmb small{{color:var(--mut);font:12px var(--sans)}}
.chip{{display:inline-block;font:700 11px var(--sans);border:1px solid var(--acc);color:var(--acc);border-radius:99px;padding:1px 8px;margin-right:4px}}
</style>
</head>
<body>
<div class="topbar"><div class="in"><a href="index.html">← Índice de temas</a></div></div>
<main class="cambios">
<h1>Cambios</h1>
<p>Historial de cambios del proyecto (generado desde git el {date.today().isoformat()}; {len(cs)} cambios). Cada tema lleva además su fecha de última revisión en el pie.</p>
{chr(10).join(items)}
</main>
</body>
</html>
'''
    (RAIZ / 'cambios.html').write_text(pagina, encoding='utf8')
    print('OK cambios.html,', len(cs), 'cambios')


if __name__ == '__main__':
    main()
