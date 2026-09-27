// Comportamiento compartido: KaTeX, índice lateral, panel de fuentes, tema claro/oscuro, soluciones.
(function () {
  var d = document;
  try { var t0 = localStorage.getItem('tema'); if (t0) d.documentElement.setAttribute('data-theme', t0); } catch (e) {}
  function ready(f) { d.readyState !== 'loading' ? f() : d.addEventListener('DOMContentLoaded', f); }
  ready(function () {
    try {
      if (window.renderMathInElement) renderMathInElement(d.body, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '\\[', right: '\\]', display: true },
                     { left: '$', right: '$', display: false }, { left: '\\(', right: '\\)', display: false }],
        throwOnError: false, ignoredTags: ['script', 'style', 'textarea', 'code']
      });
    } catch (e) {}
    var toc = d.querySelector('.side-toc');
    var hs = [].slice.call(d.querySelectorAll('main h2[id]'));
    if (toc) hs.forEach(function (h) {
      var a = d.createElement('a'); a.href = '#' + h.id;
      var c = h.cloneNode(true); c.querySelectorAll('.src').forEach(function (x) { x.remove(); });
      var n = c.querySelector('.n'); var num = n ? n.textContent.trim() + ' ' : ''; if (n) n.remove();
      a.textContent = num + c.textContent.replace(/\s+/g, ' ').trim(); toc.appendChild(a);
    });
    if ('IntersectionObserver' in window && toc) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) toc.querySelectorAll('a').forEach(function (a) {
          a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); }); });
      }, { rootMargin: '-20% 0px -70% 0px' });
      hs.forEach(function (h) { io.observe(h); });
    }
    var panel = d.getElementById('panel-fuentes');
    if (panel) {
      var seen = {}, ul = d.createElement('ul');
      d.querySelectorAll('main .src').forEach(function (s) {
        if (panel.contains(s)) return;
        var k = s.dataset.l + '|' + s.dataset.ref; if (seen[k]) return; seen[k] = 1;
        var li = d.createElement('li'), c = s.cloneNode(true);
        li.appendChild(c); li.appendChild(d.createTextNode(' ' + s.dataset.ref)); ul.appendChild(li);
      });
      panel.appendChild(ul);
    }
    d.querySelectorAll('.src').forEach(function (s) { s.tabIndex = 0; s.setAttribute('aria-label', s.dataset.ref); });
    var btn = d.getElementById('btn-tema');
    if (btn) btn.addEventListener('click', function () {
      var r = d.documentElement, cur = r.getAttribute('data-theme');
      var dark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      r.setAttribute('data-theme', dark ? 'light' : 'dark');
      try { localStorage.setItem('tema', dark ? 'light' : 'dark'); } catch (e) {}
    });
    var all = d.getElementById('btn-sol');
    if (all) { var open = false; all.addEventListener('click', function () {
      open = !open; d.querySelectorAll('details.sol').forEach(function (x) { x.open = open; });
      all.textContent = open ? 'Ocultar soluciones' : 'Mostrar soluciones'; }); }
    window.addEventListener('beforeprint', function () { d.querySelectorAll('details.sol').forEach(function (x) { x.open = true; }); });
  });
})();
