/* Service worker: deja el calendario disponible sin conexión.
   Estrategia: primero red (así los cambios nuevos se ven al instante) y, si no
   hay conexión, lo guardado en caché. Si cambias muchos archivos, sube el
   número de VERSION para limpiar la caché antigua. */
const VERSION = "adviento-v1";
const ARCHIVOS = [
  "./", "index.html", "style.css", "app.js", "data.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"
];
for (let i = 1; i <= 24; i++) ARCHIVOS.push("img/dia-" + String(i).padStart(2, "0") + ".jpg");

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(claves => Promise.all(claves.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        const copia = res.clone();
        caches.open(VERSION).then(c => c.put(req, copia));
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
