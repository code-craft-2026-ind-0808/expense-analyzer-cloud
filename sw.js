// Dynamic Cloud Service Worker - Makes app work offline
const CACHE_NAME = "expense-cloud-v2";
const FILES_TO_CACHE = [
  "index.html",
  "add.html",
  "analytics.html",
  "manifest.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
