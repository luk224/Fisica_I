// Comportamiento del formato «estudio»: ejemplos opcionales abiertos al imprimir, lista de comprobación con memoria y vistas del tema
// (Todo / Teoría / Ejercicios / Examen y «solo lo esencial»; solo en pantalla, la impresión siempre sale completa).
(function () {
  var d = document;
  window.addEventListener('beforeprint', function () { d.querySelectorAll('details.mas').forEach(function (x) { x.open = true; }); });
  function ready(f) { d.readyState !== 'loading' ? f() : d.addEventListener('DOMContentLoaded', f); }
  ready(function () {
    var clave = 'chk:' + location.pathname;
    var est = {};
    try { est = JSON.parse(localStorage.getItem(clave) || '{}'); } catch (e) {}
    d.querySelectorAll('ul.checklist li').forEach(function (li, i) {
      var cb = d.createElement('input'); cb.type = 'checkbox'; cb.checked = !!est[i];
      cb.setAttribute('aria-label', 'Marcar como hecho');
      cb.addEventListener('change', function () {
        est[i] = cb.checked;
        try { localStorage.setItem(clave, JSON.stringify(est)); } catch (e) {}
      });
      li.insertBefore(cb, li.firstChild);
    });
  });
  /* ===== Vistas del tema =====
     Cada hijo de <main> recibe un grupo (data-vg): intro (en 5 minutos), dec (¿qué tipo de problema es?), teo (apartados numerados),
     ejer (ejercicios resueltos) o cierre (chuleta y fuentes). Las reglas de estudio.css ocultan grupos según body.v-*; «solo lo esencial»
     oculta además los apartados 🟡/⚪ y los ejercicios y ejemplos que no son 🔴. */
  ready(function () {
    var main = d.querySelector('main'), hero = main && main.querySelector('header.hero'), kids = main ? [].slice.call(main.children) : [];
    if (!hero || !d.getElementById('ejercicios')) return;
    var VK = 'vista:' + location.pathname, EK = 'esencial:' + location.pathname, vista = 'todo', esencial = false;
    try { vista = localStorage.getItem(VK) || 'todo'; esencial = localStorage.getItem(EK) === '1'; } catch (e) {}
    var grupo = 'intro', prio = '';
    kids.forEach(function (el) {
      var h2 = el.tagName === 'H2' ? el : el.querySelector(':scope > h2');
      if (el.matches('section.en5')) grupo = 'intro';
      else if (el.tagName === 'SECTION' && el.querySelector(':scope > h2')) grupo = 'dec';
      else if (h2) {
        var id = h2.id;
        grupo = /^s\d+$/.test(id) ? 'teo' : id === 'ejercicios' ? 'ejer' : /^(chuleta|fuentes)$/.test(id) ? 'cierre' : grupo;
        var p = h2.querySelector('.prio'); prio = p ? (p.className.match(/p[123]/) || [''])[0] : '';
      }
      if (el.tagName === 'FOOTER' || el.tagName === 'SVG' || el === hero) return;
      el.setAttribute('data-vg', grupo);
      if (grupo === 'teo' && (prio === 'p2' || prio === 'p3')) el.setAttribute('data-extra', '');
      if (grupo === 'ejer') {
        if (el.matches('details.mas')) el.setAttribute('data-extra', '');
        else if (el.matches('details.sol')) {
          var q = el.querySelector('summary .prio');
          if (q && /p[23]/.test(q.className)) el.setAttribute('data-extra', '');
          if (el.querySelector('summary .src[data-l="X"]')) el.setAttribute('data-examen', '');
        }
      }
    });
    var nx = main.querySelectorAll('[data-examen]').length;
    var bar = d.createElement('div'); bar.className = 'vistas'; bar.setAttribute('role', 'group'); bar.setAttribute('aria-label', 'Vista del tema');
    var tabs = [['todo', 'Todo'], ['teoria', 'Teoría'], ['ejercicios', 'Ejercicios']].concat(nx ? [['examen', 'Examen (' + nx + ')']] : []);
    bar.innerHTML = tabs.map(function (t) { return '<button type="button" data-v="' + t[0] + '">' + t[1] + '</button>'; }).join('') +
      '<label class="ves"><input type="checkbox"> Solo lo esencial</label>';
    hero.parentNode.insertBefore(bar, hero.nextSibling);
    var sw = bar.querySelector('input');
    if (!nx && vista === 'examen') vista = 'todo';
    function oculto(el) { return !el.getClientRects().length && !el.closest('details:not([open])'); }
    function aplica() {
      d.body.className = d.body.className.replace(/\bv-\w+|\bsolo-esencial\b/g, '').trim();
      d.body.classList.add('v-' + vista); if (esencial) d.body.classList.add('solo-esencial');
      bar.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.v === vista ? 'true' : 'false'); });
      sw.checked = esencial;
      /* encabezados de nivel sin ninguna tarjeta visible debajo */
      var nivs = [].slice.call(main.querySelectorAll('[data-vg="ejer"].nivel'));
      nivs.forEach(function (n) {
        var el = n.nextElementSibling, hay = false;
        while (el && !el.matches('.nivel, h2')) { if (el.matches('details.sol, details.mas') && !oculto(el)) hay = true; el = el.nextElementSibling; }
        n.classList.toggle('vh', !hay);
      });
      /* los enlaces del índice lateral y del menú móvil siguen a lo que se ve */
      d.querySelectorAll('.side-toc a, .mnav-list a').forEach(function (a) {
        var t = d.getElementById((a.getAttribute('href') || '').slice(1)); a.hidden = !!t && oculto(t);
      });
    }
    function guarda() { try { localStorage.setItem(VK, vista); localStorage.setItem(EK, esencial ? '1' : '0'); } catch (e) {} }
    bar.addEventListener('click', function (e) { var b = e.target.closest('button[data-v]'); if (b) { vista = b.dataset.v; guarda(); aplica(); } });
    sw.addEventListener('change', function () { esencial = sw.checked; guarda(); aplica(); });
    /* un enlace (o resultado del buscador) a algo que la vista oculta vuelve a «Todo» */
    function alcanza() {
      var t = location.hash && d.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (t && oculto(t) && (vista !== 'todo' || esencial)) {
        var det = t.closest('details'); if (det) det.open = true;
        vista = 'todo'; esencial = false; guarda(); aplica(); setTimeout(function () { t.scrollIntoView(); }, 30);
      }
    }
    aplica(); alcanza(); window.addEventListener('hashchange', alcanza);
    d.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]'); if (!a || bar.contains(a)) return;
      var t = d.getElementById(a.getAttribute('href').slice(1));
      if (t && oculto(t) && (vista !== 'todo' || esencial)) { vista = 'todo'; esencial = false; guarda(); aplica(); setTimeout(function () { t.scrollIntoView(); }, 30); }
    });
  });
})();
