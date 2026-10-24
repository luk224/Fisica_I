/* Motor común de los ejemplos interactivos (three.js r147 local, sin CDN).
   Uso en un tema:
     <link rel="stylesheet" href="../assets/interactivos.css">
     <script defer src="../assets/interactivos.js"></script>
     <figure class="interactivo" data-escena="nombre" data-params='{"k":1}' data-estatica="../assets/img/int_nombre.png" aria-label="…">
       <figcaption>…</figcaption></figure>
   La escena vive en assets/escenas/<nombre>.js y se registra con Interactivos.registrar('nombre', function(ctx){…}).
   Nada se descarga hasta que la figura entra en pantalla. Se pinta solo cuando algo cambia. */
(function () {
  var base = (function () {
    var s = document.currentScript || document.querySelector('script[src*="interactivos.js"]');
    return s.src.replace(/interactivos\.js.*$/, '');
  })();
  var registro = {}, cargas = {};
  var reducir = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function script(url) {
    return cargas[url] || (cargas[url] = new Promise(function (ok, ko) {
      var s = document.createElement('script'); s.src = url; s.onload = ok; s.onerror = ko; document.head.appendChild(s);
    }));
  }
  function webgl() {
    try { var c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; }
  }
  function color(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || '#888'; }
  function paleta() {
    return { bg: color('--bg'), fg: color('--fg'), mut: color('--mut'), acc: color('--acc'), S: color('--U'), L: color('--X'), E: color('--E'), A: color('--A'), W: color('--warn-b'), bd: color('--bd') };
  }

  // ---- helpers de geometría ----
  var H = {
    /* Ejes x,y,z de longitud len (z hacia arriba, como en los libros). Devuelve el grupo. */
    ejes: function (THREE, len, col) {
      var g = new THREE.Group(), m = new THREE.LineBasicMaterial({ color: col });
      [[len, 0, 0], [0, len, 0], [0, 0, len]].forEach(function (p) {
        var geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-p[0], -p[1], -p[2]), new THREE.Vector3(p[0], p[1], p[2])]);
        g.add(new THREE.Line(geo, m));
      });
      g.userData.mat = m; return g;
    },
    /* Superficie z=f(x,y) en [xr]x[yr] con n×n celdas. f recibe (x,y) y devuelve z (NaN = hueco). */
    superficie: function (THREE, f, o) {
      o = o || {}; var n = o.n || 48, xr = o.xr || [-2, 2], yr = o.yr || [-2, 2], zmax = o.zmax || 6;
      var pos = [], idx = [], i, j;
      for (j = 0; j <= n; j++) for (i = 0; i <= n; i++) {
        var x = xr[0] + (xr[1] - xr[0]) * i / n, y = yr[0] + (yr[1] - yr[0]) * j / n, z = f(x, y);
        if (!isFinite(z)) z = 0; z = Math.max(-zmax, Math.min(zmax, z)); pos.push(x, y, z);
      }
      for (j = 0; j < n; j++) for (i = 0; i < n; i++) {
        var a = j * (n + 1) + i, b = a + 1, c = a + n + 1, d = c + 1; idx.push(a, b, d, a, d, c);
      }
      var geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals();
      var mat = new THREE.MeshStandardMaterial({ color: o.color || 0x4477dd, side: THREE.DoubleSide, transparent: true, opacity: o.opacity || 0.85, roughness: 0.6, metalness: 0 });
      return new THREE.Mesh(geo, mat);
    },
    /* Curva (polilínea) a partir de una lista de [x,y,z]. */
    curva: function (THREE, pts, col, w) {
      var geo = new THREE.BufferGeometry().setFromPoints(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }));
      return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: col, linewidth: w || 1 }));
    },
    /* Curva de nivel f(x,y) = k en [-d,d]² por «marching squares» con n×n celdas: lista de segmentos [x1,y1,x2,y2]. */
    nivel: function (f, k, d, n) {
      var seg = [], i, j, h = 2 * d / n, tab = [[], [[3, 0]], [[0, 1]], [[3, 1]], [[1, 2]], [[3, 0], [1, 2]], [[0, 2]], [[2, 3]], [[2, 3]], [[0, 2]], [[0, 1], [2, 3]], [[1, 2]], [[1, 3]], [[0, 1]], [[3, 0]], []];
      for (j = 0; j < n; j++) for (i = 0; i < n; i++) {
        var x0 = -d + i * h, y0 = -d + j * h, x1 = x0 + h, y1 = y0 + h;
        var v = [f(x0, y0) - k, f(x1, y0) - k, f(x1, y1) - k, f(x0, y1) - k], px = [x0, x1, x1, x0], py = [y0, y0, y1, y1];
        var idx = (v[0] > 0 ? 1 : 0) | (v[1] > 0 ? 2 : 0) | (v[2] > 0 ? 4 : 0) | (v[3] > 0 ? 8 : 0);
        var pt = function (e) { var b = (e + 1) % 4, t = v[e] / (v[e] - v[b]); return [px[e] + (px[b] - px[e]) * t, py[e] + (py[b] - py[e]) * t]; };
        tab[idx].forEach(function (s) { var p = pt(s[0]), q = pt(s[1]); seg.push([p[0], p[1], q[0], q[1]]); });
      }
      return seg;
    },
    /* Tubo de radio r por una lista de puntos [x,y,z] (curvas o segmentos gruesos en 3D). m.set(pts) lo rehace. */
    tubo: function (THREE, pts, r, col) {
      var m = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ color: col }));
      m.set = function (ps) {
        m.geometry.dispose();
        if (ps.length < 2) { m.geometry = new THREE.BufferGeometry(); return; }
        var cur = new THREE.CatmullRomCurve3(ps.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }), false, 'centripetal');
        m.geometry = new THREE.TubeGeometry(cur, Math.max(2, ps.length * 2), r, 6, false);
      };
      m.set(pts); return m;
    },
    /* Flecha 3D (tubo + cono) de color col y grosor r. f.poner([x,y,z],[x,y,z]) la coloca; f.userData.eje / .cono son las mallas. */
    flecha: function (THREE, col, r) {
      var g = new THREE.Group(), eje = H.tubo(THREE, [], r, col), cono = new THREE.Mesh(new THREE.ConeGeometry(r * 3, r * 8, 14), new THREE.MeshBasicMaterial({ color: col }));
      g.add(eje, cono); g.userData = { eje: eje, cono: cono };
      g.poner = function (p, q) {
        var dir = new THREE.Vector3(q[0] - p[0], q[1] - p[1], q[2] - p[2]), L = dir.length(); g.visible = L > r * 8; if (!g.visible) return;
        dir.normalize(); var base = new THREE.Vector3(q[0], q[1], q[2]).addScaledVector(dir, -r * 8);
        eje.set([p, [base.x, base.y, base.z]]);
        cono.position.set(q[0], q[1], q[2]).addScaledVector(dir, -r * 4); cono.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      };
      return g;
    },
    /* ---- 2D (cámara ortográfica, data-params {"dim":2}) ---- */
    /* Cinta de grosor w (unidades de mundo) sobre una lista de polilíneas [[ [x,y],… ],…].
       dash=[trazo,hueco] la hace discontinua. m.set(polilíneas) la reconstruye. */
    cinta: function (THREE, pols, col, w, dash) {
      var mat = new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide });
      var m = new THREE.Mesh(new THREE.BufferGeometry(), mat);
      var w0 = w, dash0 = dash, fc = 1, last = pols;
      function trozos(a, b, out) {
        var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy);
        if (!(L > 0) || !isFinite(L)) return;
        var ux = dx / L, uy = dy / L, ext = dash ? 0 : w * 0.5;
        if (!dash) { out.push([a[0] - ux * ext, a[1] - uy * ext, b[0] + ux * ext, b[1] + uy * ext, ux, uy]); return; }
        for (var t = 0; t < L; t += dash[0] + dash[1]) {
          var t2 = Math.min(L, t + dash[0]);
          out.push([a[0] + ux * t, a[1] + uy * t, a[0] + ux * t2, a[1] + uy * t2, ux, uy]);
        }
      }
      m.set = function (ps) {
        var seg = [], pos = [], i, j, k; last = ps;
        for (i = 0; i < ps.length; i++) for (j = 0; j + 1 < ps[i].length; j++) trozos(ps[i][j], ps[i][j + 1], seg);
        for (k = 0; k < seg.length; k++) {
          var q = seg[k], nx = -q[5] * w / 2, ny = q[4] * w / 2;
          pos.push(q[0] + nx, q[1] + ny, 0, q[0] - nx, q[1] - ny, 0, q[2] + nx, q[3] + ny, 0,
                   q[2] + nx, q[3] + ny, 0, q[0] - nx, q[1] - ny, 0, q[2] - nx, q[3] - ny, 0);
        }
        m.geometry.dispose(); m.geometry = new THREE.BufferGeometry();
        m.geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      };
      /* Zoom: el grosor y los trazos se mantienen en píxeles al cambiar la escala f de la vista. */
      m.reescalar = function (f) {
        if (f === fc) return; fc = f; w = w0 * f; dash = dash0 && [dash0[0] * f, dash0[1] * f]; m.set(last);
      };
      m.set(pols); return m;
    },
    /* Punto (disco) de radio r en mundo; p.mover(x,y). */
    punto: function (THREE, x, y, r, col) {
      var m = new THREE.Mesh(new THREE.CircleGeometry(r, 24), new THREE.MeshBasicMaterial({ color: col }));
      m.position.set(x, y, 0); m.mover = function (a, b) { m.position.x = a; m.position.y = b; };
      m.reescalar = function (f) { if (m.scale.x !== f) m.scale.set(f, f, 1); }; return m;
    },
    /* Flecha 2D de grosor w y punta de 5w (en píxeles al hacer zoom): f.poner([x,y],[x,y]); f.material.color para recolorear. */
    flecha2D: function (THREE, col, w) {
      var m = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide })), fc = 1, p0 = [0, 0], p1 = [0, 0];
      function haz() {
        var dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.sqrt(dx * dx + dy * dy), a = w * fc, h = 5 * a;
        m.visible = L > h * 0.4; if (!m.visible) return;
        var ux = dx / L, uy = dy / L, nx = -uy, ny = ux, hh = Math.min(h, L), bx = p1[0] - ux * hh, by = p1[1] - uy * hh, s = a / 2, t = hh * 0.34;
        var pos = [p0[0] + nx * s, p0[1] + ny * s, 0, p0[0] - nx * s, p0[1] - ny * s, 0, bx + nx * s, by + ny * s, 0,
                   bx + nx * s, by + ny * s, 0, p0[0] - nx * s, p0[1] - ny * s, 0, bx - nx * s, by - ny * s, 0,
                   bx + nx * t, by + ny * t, 0, bx - nx * t, by - ny * t, 0, p1[0], p1[1], 0];
        m.geometry.dispose(); m.geometry = new THREE.BufferGeometry(); m.geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      }
      m.poner = function (p, q) { p0 = p; p1 = q; haz(); };
      m.reescalar = function (f) { if (f !== fc) { fc = f; haz(); } };
      m.visible = false; return m;
    },
    /* Polilíneas de y=f(x) en [x0,x1], cortadas donde f no es finita o se sale de [-ylim,ylim]. */
    grafica: function (f, x0, x1, n, ylim) {
      var out = [], cur = [], i;
      for (i = 0; i <= n; i++) {
        var x = x0 + (x1 - x0) * i / n, y = f(x);
        if (isFinite(y) && Math.abs(y) <= ylim) cur.push([x, y]); else { if (cur.length > 1) out.push(cur); cur = []; }
      }
      if (cur.length > 1) out.push(cur); return out;
    },
    /* Ejes y cuadrícula entera dentro de v=[x0,x1,y0,y1]. g.userData.eje / .rejilla son los materiales. */
    ejes2D: function (THREE, v, w, cEje, cRej, sx, sy) {
      var g = new THREE.Group(), rej = [], i; sx = sx || 1; sy = sy || sx;
      for (i = Math.ceil(v[0] / sx); i * sx <= v[1]; i++) rej.push([[i * sx, v[2]], [i * sx, v[3]]]);
      for (i = Math.ceil(v[2] / sy); i * sy <= v[3]; i++) rej.push([[v[0], i * sy], [v[1], i * sy]]);
      var a = H.cinta(THREE, rej, cRej, w * 0.5), b = H.cinta(THREE, [[[v[0], 0], [v[1], 0]], [[0, v[2]], [0, v[3]]]], cEje, w);
      a.position.z = -0.3; b.position.z = -0.2; g.add(a, b); g.userData.rejilla = a.material; g.userData.eje = b.material; return g;
    },
    /* Paso «bonito» (1, 2, 5 · 10ᵏ) para dividir un intervalo r en unas n marcas. */
    paso: function (r, n) {
      var e = Math.pow(10, Math.floor(Math.log(r / n) / Math.LN10)), m = r / n / e; return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * e;
    },
    /* Mínimo múltiplo «bonito» (1, 2, 5 · 10ᵏ) que es ≥ v. */
    techo: function (v) {
      if (!(v > 0)) return 1; var e = Math.pow(10, Math.floor(Math.log(v) / Math.LN10)), m = v / e;
      var q = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10], i = 0; while (q[i] < m - 1e-9) i++; return q[i] * e;
    }
  };

  function montar(fig) {
    var nombre = fig.dataset.escena, params = {};
    try { params = JSON.parse(fig.dataset.params || '{}'); } catch (e) {}
    var stage = document.createElement('div'); stage.className = 'int-stage';
    var msg = document.createElement('div'); msg.className = 'int-msg'; msg.innerHTML = '<span class="int-spin" aria-hidden="true"></span><span>Cargando interactivo…</span>'; msg.setAttribute('role', 'status'); stage.appendChild(msg);
    fig.insertBefore(stage, fig.firstChild);
    function fallo(t) { msg.textContent = t; msg.classList.add('int-fallo'); if (!msg.parentNode) stage.appendChild(msg); }
    if (!webgl()) { fig.classList.add('int-sinwebgl'); return fallo('Tu navegador no tiene WebGL: se muestra una imagen fija.'); }

    Promise.all([script(base + 'three/three.min.js')]).then(function () {
      return script(base + 'three/OrbitControls.js');
    }).then(function () { return script(base + 'escenas/' + nombre + '.js'); }).then(function () {
      return new Promise(function (r) { setTimeout(r, 40); }); /* deja pintar el indicador de carga antes de construir la escena */
    }).then(function () {
      var fn = registro[nombre]; if (!fn) return fallo('Escena «' + nombre + '» no registrada.');
      var THREE = window.THREE;
      var renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      stage.insertBefore(renderer.domElement, msg);
      var dos = params.dim === 2, vista = [-1, 1, -1, 1], controls = null;
      var kxv = 1, z = { s: 1, px: 0, py: 0 }, base = null, btnReset = null, crudo = [-1, 1, -1, 1];
      var scene = new THREE.Scene(), camera;
      if (dos) { camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10); }
      else {
        camera = new THREE.PerspectiveCamera(45, 1.6, 0.1, 200);
        camera.up.set(0, 0, 1); camera.position.set(6, -7, 5);
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = false; controls.addEventListener('change', pedir);
      }
      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      var luz = new THREE.DirectionalLight(0xffffff, 0.6); luz.position.set(4, -3, 8); scene.add(luz);

      var ctl = null, ro = null, temaCbs = [], visible = true, pendiente = false;
      function pedir() { if (!pendiente) { pendiente = true; requestAnimationFrame(pintar); } }
      function pintar() {
        pendiente = false; if (!visible) return;
        if (dos) scene.traverse(function (o) { if (o.reescalar) o.reescalar(z.s); });
        renderer.render(scene, camera);
        if (dos && params.marcas !== false) marcas();
        if (dos) posEtiquetas();
      }
      /* Etiquetas de texto sobre el lienzo 2D (HTML, en coordenadas del mundo): ctx.etiqueta('texto', x, y, 'l'|'r'|'c') devuelve {poner, mover, ver, ancla, quitar}; solo 2D. */
      var capaE = null, etiq = [];
      function posEtiquetas() {
        if (!capaE) return;
        var W = stage.clientWidth, Hh = stage.clientHeight, L = camera.left, R = camera.right, T2 = camera.top, B = camera.bottom;
        if (!W || !Hh || !(R > L) || !(T2 > B)) return;
        etiq.forEach(function (e) {
          var px = (e.x - L) / (R - L) * W, py = (T2 - e.y) / (T2 - B) * Hh;
          e.el.style.display = e.vis && px > -80 && px < W + 80 && py > -20 && py < Hh + 20 ? '' : 'none';
          e.el.style.left = px + 'px'; e.el.style.top = py + 'px';
        });
      }
      /* Números en los ejes (solo 2D): etiquetas HTML sobre el lienzo, con paso 1·2·5·10ᵏ según la zona visible. */
      var capaM = null, usadas = [];
      function paso(r) { var e = Math.pow(10, Math.floor(Math.log(r / 6) / Math.LN10)), m = r / 6 / e; return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * e; }
      function marcas() {
        var W = stage.clientWidth, Hh = stage.clientHeight, L = camera.left, R = camera.right, T2 = camera.top, B = camera.bottom;
        if (!W || !Hh || !(R > L) || !(T2 > B)) return;
        if (!capaM) { capaM = document.createElement('div'); capaM.className = 'int-ticks'; capaM.setAttribute('aria-hidden', 'true'); stage.appendChild(capaM); }
        var n = 0;
        function poner(txt, x, y, cls) {
          var e = usadas[n++]; if (!e) { e = document.createElement('span'); capaM.appendChild(e); usadas.push(e); }
          e.className = cls; e.style.display = ''; e.style.left = x + 'px'; e.style.top = y + 'px'; if (e.textContent !== txt) e.textContent = txt;
        }
        function fmtN(v, st) { var d = Math.max(0, -Math.floor(Math.log(st) / Math.LN10 + 1e-9)); return (Math.abs(v) < st * 1e-6 ? '0' : v.toFixed(d)).replace('-', '−').replace('.', ','); }
        var sx = paso((R - L) / kxv), sy = paso(T2 - B), yx = (0 - B) / (T2 - B), xy = (0 - L) / (R - L), i, v;
        var py = Math.min(Hh - 16, Math.max(2, (1 - yx) * Hh + 3)), px = Math.min(W - 4, Math.max(4, xy * W - 4));
        for (i = Math.ceil(L / kxv / sx); i * sx * kxv <= R; i++) { v = i * sx; if (Math.abs(v) < sx * 1e-6) continue; poner(fmtN(v, sx), (v * kxv - L) / (R - L) * W, py, 'x'); }
        for (i = Math.ceil(B / sy); i * sy <= T2; i++) { v = i * sy; if (Math.abs(v) < sy * 1e-6) continue; poner(fmtN(v, sy), px, (T2 - v) / (T2 - B) * Hh, 'y'); }
        if (L < 0 && R > 0 && B < 0 && T2 > 0) poner('0', px, py, 'o');
        for (; n < usadas.length; n++) usadas[n].style.display = 'none';
      }
      function ajustar() {
        var w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
        renderer.setSize(w, h, false);
        if (dos) {
          var cx = (vista[0] + vista[1]) / 2, cy = (vista[2] + vista[3]) / 2, vw = vista[1] - vista[0], vh = vista[3] - vista[2];
          if (vw / vh < w / h) vw = vh * w / h; else vh = vw * h / w;
          base = { cx: cx, cy: cy, vw: vw, vh: vh }; aplicarVista();
        } else { camera.aspect = w / h; camera.updateProjectionMatrix(); pedir(); }
      }
      /* Cámara 2D = vista base escalada por z.s y desplazada por (z.px, z.py), sin salirse de lo dibujado:
         la región dibujada por las escenas es 4 veces más ancha y más alta que la vista inicial (ZOOM_FUERA). */
      function lim(c, mitad, a, b) { return 2 * mitad >= b - a ? (a + b) / 2 : Math.max(a + mitad, Math.min(b - mitad, c)); }
      function aplicarVista() {
        if (!base) return;
        var vw = base.vw * z.s, vh = base.vh * z.s, dx = (crudo[1] - crudo[0]) * 1.5, dy = (crudo[3] - crudo[2]) * 1.5;
        var cx = lim(base.cx + z.px, vw / 2, crudo[0] - dx, crudo[1] + dx), cy = lim(base.cy + z.py, vh / 2, crudo[2] - dy, crudo[3] + dy);
        z.px = cx - base.cx; z.py = cy - base.cy;
        camera.left = cx - vw / 2; camera.right = cx + vw / 2; camera.bottom = cy - vh / 2; camera.top = cy + vh / 2;
        camera.updateProjectionMatrix();
        if (btnReset) btnReset.style.display = z.s !== 1 || z.px || z.py ? '' : 'none';
        pedir();
      }
      var ctx = {
        el: fig, THREE: THREE, scene: scene, camera: camera, renderer: renderer, controls: controls, params: params, H: H,
        colores: paleta, reducirMovimiento: reducir, pedir: pedir,
        /* Solo 2D: escala anisótropa; coordenada de mundo en x = valor · k (gráficas con unidades distintas en cada eje). Llamar antes de vista(). */
        escalaX: function (k) { kxv = k; },
        /* Solo 2D: caja del mundo que debe verse (se amplía para respetar la proporción del lienzo). */
        vista: function (x0, x1, y0, y1) {
          var px = (x1 - x0) * 0.04, py = (y1 - y0) * 0.04; vista = [x0 - px, x1 + px, y0 - py, y1 + py]; crudo = [x0, x1, y0, y1]; z.s = 1; z.px = 0; z.py = 0;
          var r = (vista[1] - vista[0]) / (vista[3] - vista[2]); stage.style.aspectRatio = Math.max(1.3, Math.min(2, r)).toFixed(3);
          ajustar();
        },
        /* Desplegable; cb(índice). */
        selector: function (etiqueta, opciones, idx, cb) {
          if (!ctl) { ctl = document.createElement('div'); ctl.className = 'int-ctl'; stage.after(ctl); }
          var l = document.createElement('label'), sel = document.createElement('select');
          opciones.forEach(function (t, i) { var o = document.createElement('option'); o.value = i; o.textContent = t; sel.appendChild(o); });
          sel.value = idx; l.appendChild(document.createTextNode(etiqueta)); l.appendChild(sel); ctl.appendChild(l);
          sel.addEventListener('change', function () { cb(parseInt(sel.value, 10)); pedir(); }); cb(idx); return sel;
        },
        /* Slider accesible; cb(valor) se llama al mover y una vez al crearlo. fmt opcional para la lectura. */
        slider: function (etiqueta, min, max, paso, valor, cb, fmt) {
          if (!ctl) { ctl = document.createElement('div'); ctl.className = 'int-ctl'; stage.after(ctl); }
          var l = document.createElement('label'), o = document.createElement('output'), r = document.createElement('input');
          r.type = 'range'; r.min = min; r.max = max; r.step = paso; r.value = valor;
          fmt = fmt || function (v) { return String(Math.round(v * 100) / 100).replace('-', '−'); };
          l.appendChild(document.createTextNode(etiqueta + ' = ')); l.appendChild(o); l.appendChild(r); ctl.appendChild(l);
          function act() { var v = parseFloat(r.value); o.textContent = fmt(v); cb(v); pedir(); }
          r.addEventListener('input', act); act(); return r;
        },
        /* Lecturas numéricas bajo el lienzo: lectura('clave','Etiqueta') devuelve fn(texto). */
        lectura: function (etiqueta) {
          if (!ro) { ro = document.createElement('div'); ro.className = 'int-ro'; (ctl || stage).after(ro); }
          var d = document.createElement('div'), b = document.createElement('b');
          if (etiqueta) d.appendChild(document.createTextNode(etiqueta + ': ')); d.appendChild(b); ro.appendChild(d);
          return function (t) { b.textContent = t; };
        },
        /* Leyenda bajo el lienzo: leyenda([['var(--L)', 'F(x)', 'linea'|'area'|'punto'], …]); los colores son variables CSS, siguen el tema. */
        leyenda: function (items) {
          var d = document.createElement('div'); d.className = 'int-leg'; d.setAttribute('aria-label', 'Leyenda');
          items.forEach(function (it) {
            var e = document.createElement('span'), m = document.createElement('i');
            m.className = 'int-sw ' + (it[2] || 'linea'); m.style.setProperty('--c', it[0]); e.appendChild(m); e.appendChild(document.createTextNode(it[1])); d.appendChild(e);
          });
          (ro || ctl || stage).after(d); return d;
        },
        /* Solo 2D (en 3D no hace nada y devuelve un objeto inerte). ctx.etiqueta('texto', x, y, 'l'|'r'|'c') → {poner(texto), mover(x,y), ver(bool), ancla('l'|'r'|'c'), quitar()}. */
        etiqueta: function (txt, x, y, anc) {
          var nulo = { poner: function () {}, mover: function () {}, ver: function () {}, ancla: function () {}, quitar: function () {} };
          if (!dos) return nulo;
          if (!capaE) { capaE = document.createElement('div'); capaE.className = 'int-labs'; capaE.setAttribute('aria-hidden', 'true'); stage.appendChild(capaE); }
          var el = document.createElement('span'); el.className = 'int-lab ' + (anc || 'c'); el.textContent = txt; capaE.appendChild(el);
          var o = { el: el, x: x, y: y, vis: true,
            poner: function (t) { if (el.textContent !== t) el.textContent = t; },
            mover: function (a, b) { o.x = a; o.y = b; },
            ver: function (v) { o.vis = !!v; },
            ancla: function (a) { var n = 'int-lab ' + a; if (el.className !== n) el.className = n; },
            quitar: function () { var i = etiq.indexOf(o); if (i >= 0) etiq.splice(i, 1); if (el.parentNode) el.parentNode.removeChild(el); } };
          etiq.push(o); return o;
        },
        alCambiarTema: function (cb) { temaCbs.push(cb); cb(paleta()); }
      };
      if (dos) activarZoom();
      fn(ctx);
      requestAnimationFrame(function () { requestAnimationFrame(function () { if (msg.parentNode) stage.removeChild(msg); }); });
      /* Zoom con rueda o pellizco, desplazamiento arrastrando, doble clic o botón para restablecer. */
      function activarZoom() {
        var cv = renderer.domElement, ptrs = {}, arr = null;
        function mundo(x, y) { var q = frac(x, y); return [camera.left + q[0] * (camera.right - camera.left), camera.top - q[1] * (camera.top - camera.bottom)]; }
        cv.classList.add('zoom2d');
        btnReset = document.createElement('button'); btnReset.type = 'button'; btnReset.className = 'int-reset';
        btnReset.textContent = 'Restablecer vista'; btnReset.style.display = 'none'; stage.appendChild(btnReset);
        var ayuda = document.createElement('div'); ayuda.className = 'int-hint';
        ayuda.textContent = 'Rueda o pellizco: zoom · arrastrar: mover · doble clic: restablecer'; stage.appendChild(ayuda);
        function reset() { z.s = 1; z.px = 0; z.py = 0; aplicarVista(); }
        function zoomEn(fx, fy, f) {
          if (!base) return;
          var smax = Math.min(4, 4 * (crudo[1] - crudo[0]) / base.vw, 4 * (crudo[3] - crudo[2]) / base.vh);
          var ns = Math.max(0.04, Math.min(smax, z.s * f)), vw0 = base.vw * z.s, vh0 = base.vh * z.s;
          var wx = base.cx + z.px - vw0 / 2 + fx * vw0, wy = base.cy + z.py + vh0 / 2 - fy * vh0;
          var vw1 = base.vw * ns, vh1 = base.vh * ns; z.s = ns;
          z.px = wx - fx * vw1 + vw1 / 2 - base.cx; z.py = wy + fy * vh1 - vh1 / 2 - base.cy; aplicarVista();
        }
        function mover(dx, dy) {
          if (!base) return; var r = cv.getBoundingClientRect();
          z.px -= dx / r.width * base.vw * z.s; z.py += dy / r.height * base.vh * z.s; aplicarVista();
        }
        function frac(x, y) { var r = cv.getBoundingClientRect(); return [(x - r.left) / r.width, (y - r.top) / r.height]; }
        cv.addEventListener('wheel', function (e) {
          e.preventDefault(); var q = frac(e.clientX, e.clientY);
          zoomEn(q[0], q[1], Math.exp(e.deltaY * (e.deltaMode === 1 ? 0.03 : 0.0015)));
        }, { passive: false });
        /* Si la escena define ctx.arrastre = { coger(wx, wy, radio) → índice o −1, mover(i, wx, wy) }, un dedo o ratón
           que empieza sobre un objeto lo arrastra en vez de mover la vista. */
        cv.addEventListener('pointerdown', function (e) {
          if (ctx.arrastre && !Object.keys(ptrs).length) {
            var m = mundo(e.clientX, e.clientY), rc = cv.getBoundingClientRect();
            var i = ctx.arrastre.coger(m[0], m[1], 18 * (camera.right - camera.left) / rc.width);
            if (i >= 0) { arr = { id: e.pointerId, i: i }; cv.setPointerCapture(e.pointerId); return; }
          }
          ptrs[e.pointerId] = { x: e.clientX, y: e.clientY }; cv.setPointerCapture(e.pointerId);
        });
        cv.addEventListener('pointermove', function (e) {
          if (arr && arr.id === e.pointerId) { var m = mundo(e.clientX, e.clientY); ctx.arrastre.mover(arr.i, m[0], m[1]); pedir(); return; }
          var p = ptrs[e.pointerId]; if (!p) return; var ids = Object.keys(ptrs);
          if (ids.length === 1) { mover(e.clientX - p.x, e.clientY - p.y); p.x = e.clientX; p.y = e.clientY; return; }
          if (ids.length !== 2) return;
          var a = ptrs[ids[0]], b = ptrs[ids[1]], d0 = Math.hypot(a.x - b.x, a.y - b.y), m0x = (a.x + b.x) / 2, m0y = (a.y + b.y) / 2;
          p.x = e.clientX; p.y = e.clientY;
          var d1 = Math.hypot(a.x - b.x, a.y - b.y), m1x = (a.x + b.x) / 2, m1y = (a.y + b.y) / 2, q = frac(m1x, m1y);
          if (d0 > 0 && d1 > 0) zoomEn(q[0], q[1], d0 / d1); mover(m1x - m0x, m1y - m0y);
        });
        function suelta(e) { delete ptrs[e.pointerId]; if (arr && arr.id === e.pointerId) arr = null; }
        cv.addEventListener('pointerup', suelta); cv.addEventListener('pointercancel', suelta);
        cv.addEventListener('dblclick', reset); btnReset.addEventListener('click', reset);
      }
      new MutationObserver(function () { var p = paleta(); temaCbs.forEach(function (cb) { cb(p); }); pedir(); })
        .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; if (visible) pedir(); }).observe(stage);
      if (window.ResizeObserver) new ResizeObserver(ajustar).observe(stage); else window.addEventListener('resize', ajustar);
      ajustar();
    }).catch(function (e) { if (window.console) console.error(e); fallo('No se pudo cargar el interactivo.' + (e && e.message ? ' (' + e.message + ')' : '')); });
  }

  window.Interactivos = {
    registrar: function (nombre, fn) { registro[nombre] = fn; },
    helpers: H
  };

  function iniciar() {
    var figs = document.querySelectorAll('figure.interactivo[data-escena]'); if (!figs.length) return;
    if (!('IntersectionObserver' in window)) { [].forEach.call(figs, montar); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); montar(e.target); } });
    }, { rootMargin: '200px' });
    [].forEach.call(figs, function (f) { io.observe(f); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
