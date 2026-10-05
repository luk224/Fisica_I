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
        throwOnError: false, ignoredTags: ['script', 'style', 'textarea', 'code'],
        macros: { '\\lim': '\\mathop{\\operatorname{lim}}\\limits' } /* subíndice siempre debajo de «lim», también en línea */
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
    var tocLinks = toc ? [].slice.call(toc.querySelectorAll('a')) : [];
    if (tocLinks.length) {
      var mn = d.createElement('div'); mn.className = 'mnav';
      mn.innerHTML = '<button type="button" class="mnav-btn" aria-expanded="false" aria-controls="mnav-list">☰ Apartados</button><nav id="mnav-list" class="mnav-list" aria-label="Apartados del tema" hidden></nav>';
      var list = mn.querySelector('nav'), mb = mn.querySelector('button');
      tocLinks.forEach(function (a) { var c = d.createElement('a'); c.href = a.getAttribute('href'); c.textContent = a.textContent; list.appendChild(c); });
      function setOpen(o) { list.hidden = !o; mb.setAttribute('aria-expanded', o ? 'true' : 'false');
        if (o) { var cur = null; hs.forEach(function (h) { if (h.getBoundingClientRect().top < 120) cur = h.id; });
          [].forEach.call(list.children, function (x) { var on = x.getAttribute('href') === '#' + cur; x.classList.toggle('on', on); if (on) x.scrollIntoView({ block: 'center' }); }); } }
      mb.addEventListener('click', function (e) { e.stopPropagation(); setOpen(list.hidden); });
      list.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
      d.addEventListener('click', function (e) { if (!mn.contains(e.target)) setOpen(false); });
      d.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
      d.body.appendChild(mn);
    }
    var panel = d.getElementById('panel-fuentes');
    if (panel) {
      var seen = {}, ul = d.createElement('ul');
      d.querySelectorAll('main .src').forEach(function (s) {
        if (panel.contains(s) || s.closest('.legend')) return;
        var k = s.dataset.l + '|' + s.dataset.ref; if (seen[k]) return; seen[k] = 1;
        var li = d.createElement('li'), c = s.cloneNode(true);
        li.appendChild(c); li.appendChild(d.createTextNode(' ' + s.dataset.ref)); ul.appendChild(li);
      });
      panel.appendChild(ul);
    }
    d.querySelectorAll('.src').forEach(function (s) { s.tabIndex = 0; s.setAttribute('aria-label', s.dataset.ref); });
    var bt = d.getElementById('btn-tema');
    if (bt && !d.getElementById('btn-imprimir')) {
      var bi = d.createElement('button'); bi.id = 'btn-imprimir'; bi.type = 'button'; bi.textContent = 'Imprimir / PDF';
      bi.title = 'Abre el diálogo de impresión (A4, blanco y negro, sin fuentes ni «fuera de examen»)';
      bi.addEventListener('click', function () { window.print(); });
      bt.parentNode.insertBefore(bi, bt); bt.parentNode.insertBefore(d.createTextNode(' '), bt);
    }
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
    function abrirSoluciones() { d.querySelectorAll('details.sol').forEach(function (x) { x.open = true; }); }
    if (matchMedia('print').matches) abrirSoluciones();
    window.addEventListener('beforeprint', function () { d.querySelectorAll('details.sol').forEach(function (x) { x.open = true; }); });
  });
})();
