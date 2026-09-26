/* IBI ScannerC — Service Worker
 * CACHE_VERSION must move with the app version badge on every release (v2.0.0 -> ibi-scannerc-v2.2.0).
 */
const CACHE_VERSION = 'ibi-scannerc-v2.2.0';
const RUNTIME = 'ibi-scannerc-runtime-v1';   // CDN libraries + OCR language data (versioned URLs, safe to keep)
const SHARE = 'ibi-scannerc-share';
const APP_SHELL = ['./', './index.html', './manifest.json', './logo.png', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-64.png'];
const LIB_HOSTS = ['cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'docs.opencv.org', 'tessdata.projectnaptha.com', 'unpkg.com'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL.map((u) => new Request(u, { cache: 'reload' }))))   // bypass the HTTP cache: never precache a stale shell
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION && k !== RUNTIME && k !== SHARE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => { if (event.data === 'SKIP_WAITING') self.skipWaiting(); });

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Web Share Target: the OS shares photos/PDFs INTO the app (POST ./share-target) — stash them, then open the app.
  if (req.method === 'POST' && url.pathname.endsWith('/share-target')) {
    event.respondWith((async () => {
      try {
        const fd = await req.formData();
        const files = fd.getAll('files');
        const cache = await caches.open(SHARE);
        let i = 0;
        for (const f of files) {
          if (!f || !f.size) continue;
          await cache.put(new Request('./shared/' + Date.now() + '-' + (i++)), new Response(f, { headers: { 'content-type': f.type || 'application/octet-stream', 'x-name': encodeURIComponent(f.name || 'shared') } }));
        }
      } catch (e) {}
      return Response.redirect('./?shared=1', 303);
    })());
    return;
  }
  if (req.method !== 'GET') return;

  // Navigations: network first, cached shell when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE_VERSION).then((c) => c.put('./index.html', copy)).catch(() => {}); }
        return res;
      }).catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // Same-origin assets: cache first, refresh in the background.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req).then((res) => {
          if (res && res.status === 200 && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE_VERSION).then((c) => c.put(req, copy)).catch(() => {}); }
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // Libraries + OCR language data: cache first (URLs are versioned/immutable). OpenCV is ~11 MB — download once.
  if (LIB_HOSTS.some((h) => url.hostname === h || url.hostname.endsWith('.' + h))) {
    event.respondWith(
      caches.open(RUNTIME).then((cache) => cache.match(req).then((cached) => cached || fetch(req).then((res) => {
        if (res && (res.status === 200 || res.type === 'opaque')) cache.put(req, res.clone()).catch(() => {});
        return res;
      })))
    );
    return;
  }

  // Fonts and everything else: stale-while-revalidate.
  event.respondWith(
    caches.open(RUNTIME).then((cache) => cache.match(req).then((cached) => {
      const network = fetch(req).then((res) => { if (res && (res.status === 200 || res.type === 'opaque')) cache.put(req, res.clone()).catch(() => {}); return res; }).catch(() => cached);
      return cached || network;
    }))
  );
});
