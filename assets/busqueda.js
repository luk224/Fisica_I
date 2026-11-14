// Buscador global: atajo «/» o Ctrl+K. Carga assets/busqueda_indice.js al abrirlo por primera vez (con <script>: vale también desde file://).
(function () {
  var d = document, S = d.currentScript || d.querySelector('script[src*="busqueda.js"]');
  var base = (S && S.src ? S.src : location.href).replace(/busqueda\.js.*$/, '');
  var raiz = base.replace(/assets\/$/, '');
  var cargado = false, datos = null, ov, inp, lista, sel = 0, res = [];
  var NOM = { tema: 'Tema', sec: 'Apartado', caja: 'Teoría', ej: 'Ejercicio' };
  var KIND = { def: 'Definición', thm: 'Ley / método', ex: 'Ejemplo', tip: 'Truco', warn: 'Error típico', intu: 'Intuición' };

  var GR = { 'α': 'alpha', 'β': 'beta', 'γ': 'gamma', 'δ': 'delta', 'θ': 'theta', 'λ': 'lambda', 'μ': 'mu', 'π': 'pi', 'ρ': 'rho', 'σ': 'sigma', 'τ': 'tau', 'φ': 'phi', 'ω': 'omega', 'ε': 'epsilon', 'η': 'eta' };
  function norm(s) { return (s || '').toLowerCase().replace(/[αβγδθλμπρστφωεη]/g, function (c) { return GR[c]; }).normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function nf(s) { return norm(s).replace(/[\s\\{}$]/g, ''); }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function css() {
    var st = d.createElement('style');
    st.textContent = '.bq-btn{font:inherit;background:none;border:1px solid var(--bd);color:var(--fg);border-radius:8px;padding:4px 10px;cursor:pointer}' +
      '.bq-btn.fijo{position:fixed;top:12px;right:12px;z-index:50;background:var(--card)}' +
      '.bq-ov{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.45);display:none;align-items:flex-start;justify-content:center;padding:8vh 12px 0}' +
      '.bq-ov.on{display:flex}.bq-box{width:min(720px,100%);max-height:80vh;display:flex;flex-direction:column;background:var(--bg);color:var(--fg);border:1px solid var(--bd);border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.35);font-family:var(--sans)}' +
      '.bq-in{font:16px var(--sans);padding:14px 16px;border:0;border-bottom:1px solid var(--bd);background:transparent;color:var(--fg);outline:none;border-radius:12px 12px 0 0}' +
      '.bq-l{list-style:none;margin:0;padding:6px;overflow:auto}.bq-l li{border-radius:8px;padding:8px 10px;cursor:pointer}' +
      '.bq-l li.on,.bq-l li:hover{background:color-mix(in srgb,var(--acc) 12%,transparent)}' +
      '.bq-t{font-weight:600;font-size:15px}.bq-m{font-size:12px;color:var(--mut);margin-top:2px}.bq-x{font-size:13px;color:var(--mut);margin-top:3px;line-height:1.4}' +
      '.bq-k{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border:1px solid var(--bd);border-radius:99px;padding:1px 7px;margin-right:6px;color:var(--acc)}' +
      '.bq-l mark{background:color-mix(in srgb,var(--acc) 25%,transparent);color:inherit;border-radius:3px}.bq-v{padding:16px;color:var(--mut);font-size:14px}.bq-pie{padding:7px 14px;border-top:1px solid var(--bd);font-size:12px;color:var(--mut)}' +
      '@media print{.bq-btn,.bq-ov{display:none!important}}';
    d.head.appendChild(st);
  }

  function indice(cb) {
    if (datos) return cb();
    if (window.BUSQUEDA) { prep(window.BUSQUEDA); return cb(); }
    var s = d.createElement('script'); s.src = base + 'busqueda_indice.js';
    s.onload = function () { prep(window.BUSQUEDA); cb(); };
    s.onerror = function () { lista.innerHTML = '<li class="bq-v">No se pudo cargar el índice (assets/busqueda_indice.js).</li>'; };
    d.head.appendChild(s);
  }
  function prep(b) {
    datos = b;
    b.e.forEach(function (e) { e.n = norm(e[4] + ' ' + e[5]); e.t = norm(e[4]); e.f = nf(e[6]); });
  }

  function buscar(q) {
    var toks = norm(q).split(/\s+/).filter(Boolean);
    if (!toks.length) return [];
    var fq = nf(q), out = [];
    datos.e.forEach(function (e) {
      var pts = 0, ok = true;
      for (var i = 0; i < toks.length; i++) {
        var k = toks[i], p = 0;
        if (e.t.indexOf(k) >= 0) p = e.t.indexOf(k) === 0 ? 14 : 10;
        else if (e.n.indexOf(k) >= 0) p = 3;
        else if (e.f && nf(k).length > 1 && e.f.indexOf(nf(k)) >= 0) p = 4;
        if (!p) { ok = false; break; }
        pts += p;
      }
      if (!ok && fq.length > 2 && e.f.indexOf(fq) >= 0) { ok = true; pts = 6; }
      if (!ok) return;
      if (e.t.indexOf(norm(q)) >= 0) pts += 8;
      pts += { tema: 3, sec: 2, caja: 1.5, ej: 1 }[e[0]] || 0;
      out.push([pts, e]);
    });
    out.sort(function (a, b) { return b[0] - a[0]; });
    return out.slice(0, 40).map(function (x) { return x[1]; });
  }

  function marca(txt, toks) {
    var h = esc(txt);
    toks.forEach(function (k) {
      if (k.length < 2) return;
      var re = new RegExp('(' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'i');
      h = norm(h) === h.toLowerCase() ? h.replace(re, '<mark>$1</mark>') : h;
    });
    return h;
  }

  function pinta() {
    var q = inp.value.trim();
    if (!q) { lista.innerHTML = '<li class="bq-v">Escribe un concepto, una fórmula o un ejercicio: «fricción estática», «peso aparente», «tan β», «péndulo cónico»…</li>'; res = []; return; }
    res = buscar(q); sel = 0;
    if (!res.length) { lista.innerHTML = '<li class="bq-v">Sin resultados para «' + esc(q) + '».</li>'; return; }
    var toks = norm(q).split(/\s+/).filter(Boolean);
    lista.innerHTML = res.map(function (e, i) {
      var tipo = e[0] === 'caja' ? (KIND[e[1]] || 'Teoría') : NOM[e[0]];
      return '<li data-i="' + i + '"' + (i === 0 ? ' class="on"' : '') + '><div class="bq-t"><span class="bq-k">' + esc(tipo) + '</span>' + marca(e[4], toks) +
        '</div><div class="bq-m">' + esc(datos.temas[e[2]]) + '</div>' + (e[5] ? '<div class="bq-x">' + marca(e[5].slice(0, 150), toks) + '…</div>' : '') + '</li>';
    }).join('');
  }
  function mover(n) {
    var li = lista.querySelectorAll('li[data-i]'); if (!li.length) return;
    li[sel].classList.remove('on'); sel = (sel + n + li.length) % li.length; li[sel].classList.add('on'); li[sel].scrollIntoView({ block: 'nearest' });
  }
  function ir(i) { var e = res[i]; if (e) location.href = raiz + e[3]; }

  function abrir() {
    if (!ov) construir();
    ov.classList.add('on'); inp.value = ''; inp.focus();
    lista.innerHTML = '<li class="bq-v">Cargando índice…</li>';
    indice(pinta);
  }
  function cerrar() { if (ov) ov.classList.remove('on'); }
  function construir() {
    css();
    ov = d.createElement('div'); ov.className = 'bq-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'Buscar en los apuntes');
    ov.innerHTML = '<div class="bq-box"><input class="bq-in" type="search" placeholder="Buscar en los 20 temas…" aria-label="Buscar" autocomplete="off"><ul class="bq-l"></ul><div class="bq-pie">↑↓ para moverte · Intro para abrir · Esc para cerrar</div></div>';
    d.body.appendChild(ov);
    inp = ov.querySelector('input'); lista = ov.querySelector('ul');
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) cerrar(); });
    inp.addEventListener('input', function () { if (datos) pinta(); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); mover(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); mover(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); ir(sel); }
    });
    lista.addEventListener('click', function (e) { var li = e.target.closest('li[data-i]'); if (li) ir(+li.dataset.i); });
  }

  d.addEventListener('keydown', function (e) {
    var t = e.target, escribiendo = t && (/^(input|textarea|select)$/i.test(t.tagName) || t.isContentEditable);
    if (e.key === 'Escape') cerrar();
    else if ((e.key === '/' && !escribiendo && !e.ctrlKey && !e.metaKey) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); abrir(); }
  });

  function iniciar() {
    var b = d.createElement('button'); b.type = 'button'; b.className = 'bq-btn'; b.id = 'btn-buscar';
    b.innerHTML = '🔍 Buscar'; b.title = 'Buscar en todos los temas (tecla «/» o Ctrl+K)';
    b.addEventListener('click', abrir);
    var ref = d.getElementById('btn-sol') || d.getElementById('btn-tema');
    if (ref) { ref.parentNode.insertBefore(b, ref); ref.parentNode.insertBefore(d.createTextNode(' '), ref); }
    else { b.classList.add('fijo'); d.body.appendChild(b); css(); }
    /* un enlace con #id de una solución la abre */
    function abre() { var h = location.hash.slice(1), el = h && d.getElementById(h); if (el && el.tagName === 'DETAILS') { el.open = true; setTimeout(function () { el.scrollIntoView(); }, 50); } }
    abre(); window.addEventListener('hashchange', abre);
  }
  d.readyState !== 'loading' ? iniciar() : d.addEventListener('DOMContentLoaded', iniciar);
})();
