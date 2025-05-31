
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("asi-futsal-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "torneo.html",
        "Logo della ASI Futsal League.png",
        "converted_logo_federazione.jpg",
        "index.js",
        "torneo.js",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
