"""Series de práctica al azar (assets/practica.js): los resultados de cada generador coinciden con un recálculo independiente en Python,
los errores típicos del diagnóstico no coinciden con la respuesta correcta y las cuestiones tipo test tienen una sola opción buena.
Necesita Chrome (se salta si no hay); la página temas/practica.html solo puede usar series que existen."""
import json
import math
import pathlib
import re
import subprocess
import sys
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from comun import RAIZ, TEMAS, chrome, leer  # noqa: E402

g, G0, MT, RT, R = 9.81, 6.674e-11, 5.972e24, 6.371e6, 8.314
rad = math.pi / 180

# Recálculo independiente: datos de entrada (`data` del problema) -> resultado en las unidades que muestra el problema.
F = {
    't1_unidades': lambda d: d['v'] / 3.6,
    't1_suma': lambda d: math.hypot(d['ax'] + d['bx'], d['ay'] + d['by']),
    't2_mua': lambda d: d['a'] * d['t'] ** 2 / 2,
    't2_frenado': lambda d: d['v0'] ** 2 / (2 * d['a']),
    't2_caida': lambda d: math.sqrt(2 * d['h'] / g),
    't3_alcance': lambda d: d['v0'] ** 2 * math.sin(math.radians(2 * d['th'])) / g,
    't3_altura': lambda d: (d['v0'] * math.sin(d['th'] * rad)) ** 2 / (2 * g),
    't3_centripeta': lambda d: d['v'] ** 2 / d['r'],
    't5_plano': lambda d: g * (math.sin(d['th'] * rad) - d['mu'] * math.cos(d['th'] * rad)),
    't5_atwood': lambda d: (d['m2'] - d['m1']) * g / (d['m1'] + d['m2']),
    't5_ascensor': lambda d: d['m'] * (g + d['a']),
    't5_curva': lambda d: d['v'] ** 2 / (g * d['r']),
    't6_trabajo': lambda d: d['F'] * d['d'] * math.cos(d['ph'] * rad),
    't6_resorte': lambda d: d['k'] * d['x'] ** 2 / 2,
    't6_teorema': lambda d: math.sqrt(2 * d['F'] * d['d'] / d['m']),
    't6_potencia': lambda d: d['m'] * g * d['v'],
    't7_caida': lambda d: math.sqrt(d['v0'] ** 2 + 2 * g * d['h']),
    't7_resorte': lambda d: d['x'] * math.sqrt(d['k'] / d['m']),
    't7_friccion': lambda d: d['h'] / d['mu'],
    't8_inelastico': lambda d: d['m1'] * d['v1'] / (d['m1'] + d['m2']),
    't8_elastico': lambda d: 2 * d['m1'] * d['v1'] / (d['m1'] + d['m2']),
    't8_impulso': lambda d: d['m'] * (d['v1'] + d['v2']) / d['dt'],
    't9_alfa': lambda d: (d['F'] * d['R']) / (d['M'] * d['R'] ** 2 / 2),
    't9_cinematica': lambda d: (d['rpm'] * 2 * math.pi / 60) * d['t'] / 2 / (2 * math.pi),
    't10_rodadura': lambda d: math.sqrt(2 * g * d['h'] / (1 + d['k'])),
    't10_momento': lambda d: d['I1'] * d['w1'] / d['I2'],
    't10_torque': lambda d: d['F'] * d['l'] * math.sin(d['ph'] * rad),
    't11_alargamiento': lambda d: d['F'] * d['L'] / (math.pi * (d['d_mm'] * 1e-3 / 2) ** 2 * 2.0e11) * 1000,
    't11_palanca': lambda d: d['m1'] * d['d1'] / d['m2'],
    't12_presion': lambda d: (101300 + 1000 * g * d['h']) / 1000,
    't12_continuidad': lambda d: d['v1'] * (d['d1'] / d['d2']) ** 2,
    't12_empuje': lambda d: 1000 * g * d['V_L'] / 1000,
    't13_gplaneta': lambda d: G0 * (d['m'] * MT) / (d['r'] * RT) ** 2 / (G0 * MT / RT ** 2) * g,
    't13_orbita': lambda d: math.sqrt(G0 * MT / (RT + d['h_km'] * 1000)) / 1000,
    't13_kepler': lambda d: d['T1'] * (d['a2'] / d['a1']) ** 1.5,
    't14_resorte': lambda d: 2 * math.pi * math.sqrt(d['m'] / d['k']),
    't14_pendulo': lambda d: 2 * math.pi * math.sqrt(d['L'] / g),
    't14_vmax': lambda d: d['A'] * math.sqrt(d['k'] / d['m']),
    't15_cuerda': lambda d: math.sqrt(d['T'] / d['mu']),
    't15_fundamental': lambda d: d['v'] / (2 * d['L']),
    't16_nivel': lambda d: 10 * math.log10(d['I'] / 1e-12),
    't16_doppler': lambda d: d['f'] * 343 / (343 - d['vs']),
    't16_tubo': lambda d: 343 / (4 * d['L']),
    't17_mezcla': lambda d: (d['m1'] * d['T1'] + d['m2'] * d['T2']) / (d['m1'] + d['m2']),
    't17_dilatacion': lambda d: 1.2e-5 * d['L'] * d['dT'] * 1000,
    't18_gas': lambda d: d['n'] * R * (d['Tc'] + 273.15) / (d['V_L'] / 1000) / 1000,
    't18_vrms': lambda d: math.sqrt(3 * R * (d['Tc'] + 273.15) / 0.028),
    't19_isotermo': lambda d: d['n'] * R * d['T'] * math.log(d['r']),
    't19_adiabatico': lambda d: d['T1'] * d['r'] ** (d['gamma'] - 1),
    't19_isobaro': lambda d: d['n'] * 2.5 * R * d['dT'],
    't20_carnot': lambda d: 100 * (1 - (d['Tc_C'] + 273.15) / (d['Th_C'] + 273.15)),
    't20_calor': lambda d: d['QH'] * (1 - d['e']),
    't20_entropia': lambda d: d['m'] * 3.34e5 / 273.15,
}
CUES = ['c_m1', 'c_m2', 'c_m3', 'c_m4']
SEMILLAS = range(1, 41)

PAGINA = '''<!doctype html><meta charset="utf-8"><script src="../assets/practica.js"></script><pre id="res"></pre>
<script>var out={};var gs=FisPractica.gens;for(var k in gs){out[k]=[];for(var s=%d;s<%d;s++){var p=gs[k](s);
var o={s:s,tipo:p.tipo||'num',data:p.data,ans:p.ans,u:p.u,enun:p.enun,sol:p.sol};
if(p.diag)o.diag=p.diag.map(function(x){return x[0]});if(p.opts)o.opts=p.opts.map(function(x){return [x.ok,x.t,x.why]});out[k].push(o)}}
document.getElementById('res').textContent=JSON.stringify(out);</script>'''


@unittest.skipUnless(chrome(), 'no hay Chrome/Chromium (define CHROME=ruta)')
class Practica(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        tmp = TEMAS / '_tmp_practica.html'
        tmp.write_text(PAGINA % (SEMILLAS.start, SEMILLAS.stop), encoding='utf8')
        try:
            r = subprocess.run([chrome(), '--headless=new', '--no-sandbox', '--disable-gpu', '--virtual-time-budget=5000', '--dump-dom', 'file://' + str(tmp)],
                               capture_output=True, text=True, encoding='utf8', timeout=120)
        finally:
            tmp.unlink()
        m = re.search(r'<pre id="res">(.*?)</pre>', r.stdout, re.S)
        assert m, 'practica.js no generó datos: ' + r.stderr[-300:]
        import html
        cls.datos = json.loads(html.unescape(m.group(1)))

    def test_hay_un_recalculo_por_generador(self):
        self.assertEqual(sorted(set(self.datos) - set(CUES)), sorted(F))

    def test_resultados_recalculados(self):
        for tipo, f in F.items():
            for p in self.datos[tipo]:
                esperado = f(p['data'])
                self.assertAlmostEqual(p['ans'], esperado, delta=1e-9 * max(1, abs(esperado)), msg=f'{tipo} semilla {p["s"]}: {p["data"]}')

    def test_errores_tipicos_distinguibles_de_la_respuesta(self):
        for tipo in F:
            for p in self.datos[tipo]:
                self.assertTrue(math.isfinite(p['ans']) and p['ans'] != 0, f'{tipo} semilla {p["s"]}: respuesta no válida')
                for d in p.get('diag', []):
                    self.assertGreater(abs(d - p['ans']), 0.04 * abs(p['ans']), f'{tipo} semilla {p["s"]}: un error típico ({d}) cae dentro de la tolerancia de la respuesta {p["ans"]}')

    def test_enunciados_y_soluciones_sin_nan(self):
        for tipo, lst in self.datos.items():
            for p in lst:
                for campo in ('enun', 'sol'):
                    self.assertNotRegex(p[campo], r'NaN|undefined|Infinity', f'{tipo} semilla {p["s"]}')

    def test_cuestiones_una_sola_opcion_buena(self):
        for tipo in CUES:
            vistas = set()
            for p in self.datos[tipo]:
                self.assertEqual(sum(1 for o in p['opts'] if o[0]), 1, f'{tipo}: debe haber una sola opción correcta')
                self.assertGreaterEqual(len(p['opts']), 3)
                vistas.add(p['data']['i'])
                for ok, txt, why in p['opts']:
                    self.assertTrue(ok or why, f'{tipo}: opción incorrecta sin explicación')
            self.assertGreaterEqual(len(vistas), 5)

    def test_pagina_solo_usa_series_que_existen(self):
        html_ = leer(TEMAS / 'practica.html')
        usados = set(re.findall(r'data-tipo="([^"]+)"', html_))
        self.assertTrue(usados)
        self.assertFalse(usados - set(self.datos), usados - set(self.datos))
        self.assertFalse(set(F) - usados, 'generadores sin serie en la página: ' + str(set(F) - usados))


if __name__ == '__main__':
    unittest.main()
