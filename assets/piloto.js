// Comportamiento del formato «piloto»: ejemplos opcionales abiertos al imprimir y lista de comprobación con memoria.
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
})();
