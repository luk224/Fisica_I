// Carga perezosa de las figuras SVG (assets/figs/tNN/*.svg): se incrustan en la página al acercarse con el scroll,
// para conservar los colores de las variables CSS (claro/oscuro). Hace falta servir la web por http(s):
// `python herramientas/servir.py` en local, o la web publicada.
(function () {
  var d = document;
  function figs() { return [].slice.call(d.querySelectorAll('figure.fig[data-svg]')); }
  function poner(f, txt) {
    var ph = f.querySelector('.figph');
    if (!ph || f.dataset.listo) return;
    var t = d.createElement('template'); t.innerHTML = txt.trim();
    var svg = t.content.firstElementChild;
    if (!svg) return;
    ph.replaceWith(svg); f.dataset.listo = '1';
  }
  function cargar(f) {
    if (f.dataset.listo || f.dataset.cargando) return Promise.resolve();
    f.dataset.cargando = '1';
    return fetch(f.dataset.svg).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (t) { poner(f, t); })
      .catch(function () {
        f.dataset.cargando = '';
        var ph = f.querySelector('.figph');
        if (ph) { ph.classList.add('figerr'); ph.textContent = 'No se pudo cargar la figura. Si abres el archivo directamente, usa «python herramientas/servir.py» o la web publicada.'; }
      });
  }
  window.cargarFiguras = function () { return Promise.all(figs().map(cargar)); };
  function iniciar() {
    var lista = figs();
    if (!('IntersectionObserver' in window)) { window.cargarFiguras(); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); cargar(e.target); } });
    }, { rootMargin: '900px 0px' });
    lista.forEach(function (f) { io.observe(f); });
    /* las figuras dentro de una solución plegada se cargan al abrirla */
    d.addEventListener('toggle', function (e) {
      if (e.target.open) [].forEach.call(e.target.querySelectorAll('figure.fig[data-svg]'), cargar);
    }, true);
  }
  /* al imprimir se necesitan todas ya: carga síncrona de las que falten */
  window.addEventListener('beforeprint', function () {
    figs().forEach(function (f) {
      if (f.dataset.listo) return;
      try { var x = new XMLHttpRequest(); x.open('GET', f.dataset.svg, false); x.send(); if (x.responseText) poner(f, x.responseText); } catch (e) {}
    });
  });
  d.readyState !== 'loading' ? iniciar() : d.addEventListener('DOMContentLoaded', iniciar);
})();
