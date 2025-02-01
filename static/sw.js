importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');
importScripts('/uv/uv.sw.js');

const uv = new UVServiceWorker();

const CACHE_VERSION = 1;
const CURRENT_CACHES = {
  static: `static-cache-v${CACHE_VERSION}`,
  dynamic: `dynamic-cache-v${CACHE_VERSION}`,
  assets: `assets-cache-v${CACHE_VERSION}`
};

// Resources to cache on install
const STATIC_RESOURCES = [
  '/',
  '/assets/css/app.css',
  '/assets/css/menu.css',
  '/assets/js/particles.js',
  '/assets/js/cdn-rocket.js',
  '/assets/js/anym.js',
  '/assets/js/themes.js',
  '/assets/js/main.js',
  '/assets/img/salyte.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CURRENT_CACHES.static).then((cache) => {
      return cache.addAll(STATIC_RESOURCES);
    })
  );
});

self.addEventListener('activate', (event) => {
  const expectedCacheNames = new Set(Object.values(CURRENT_CACHES));
  
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!expectedCacheNames.has(cacheName)) {
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

async function handleRequest(event) {
    if (uv.route(event)) {
        return await uv.fetch(event);
    }
    
    return await fetch(event.request)
}

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        const cacheKey = event.request.url.includes('/assets/') ? 
          CURRENT_CACHES.assets : CURRENT_CACHES.dynamic;

        caches.open(cacheKey).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});