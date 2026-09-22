const CACHE_NAME = 'expense-v2-fixed';
const urlsToCache = [
  'index.html',
  'add.html',
  'analytics.html',
  'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Don't cache charts and external files - this fixes the colorful glitch
  if (event.request.url.includes('cdn') || event.request.url.includes('chart')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
