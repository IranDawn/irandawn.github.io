// Preload version from version.json at startup
let CACHE_VER = '0.1'; // fallback version

(async () => {
  try {
    const response = await fetch('./version.json');
    if (response.ok) {
      const data = await response.json();
      CACHE_VER = data.version;
      console.log('[SW] Preloaded cache version from version.json:', CACHE_VER);
    }
  } catch (e) {
    console.warn('[SW] Could not preload version.json, using fallback');
  }
})();

// Cache names derived from version
const getCacheName = () => `irandawn-v${CACHE_VER}`;
const getApiCacheName = () => `irandawn-api-v${CACHE_VER}`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/irandawn.js',
  '/version.json'
];

const API_HOST = 'raw.githubusercontent.com';

// Install: cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(getCacheName())
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => {
        const currentCacheName = getCacheName();
        const currentApiCacheName = getApiCacheName();
        return Promise.all(
          keys
            .filter(key => key !== currentCacheName && key !== currentApiCacheName)
            .map(key => {
              console.log('[SW] Deleting old cache:', key);
              return caches.delete(key);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch: serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  console.log('[SW] Fetch:', url.pathname, 'params:', Array.from(url.searchParams.keys()));

  // Version check requests: always network, never cache response from this request
  if (url.pathname.endsWith('/version.json') && url.searchParams.has('check')) {
    console.log('[SW] Version check request - using network directly');
    event.respondWith(fetch(request));
    return;
  }

  // API requests (GitHub raw content): network-first with cache fallback
  if (url.host === API_HOST) {
    event.respondWith(networkFirstWithCache(request, getApiCacheName()));
    return;
  }

  // Static assets: cache-first with network fallback
  if (request.method === 'GET' && url.origin === self.location.origin) {
    event.respondWith(cacheFirstWithNetwork(request, getCacheName()));
    return;
  }

  // All other requests: network only
  event.respondWith(fetch(request));
});

// Cache-first strategy: try cache, then network
async function cacheFirstWithNetwork(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    // Return cached response and update cache in background
    updateCacheInBackground(request, cache);
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return offline page or error
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Network-first strategy: try network, then cache
async function networkFirstWithCache(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Update cache in background without blocking
function updateCacheInBackground(request, cache) {
  fetch(request)
    .then(response => {
      if (response.ok) {
        cache.put(request, response);
      }
    })
    .catch(() => {
      // Ignore errors in background update
    });
}

// Listen for messages from the main thread
self.addEventListener('message', event => {
  console.log('[SW] Received message:', event.data);

  if (event.data === 'skipWaiting') {
    console.log('[SW] skipWaiting message received');
    self.skipWaiting();
  }

  if (event.data === 'clearCache') {
    console.log('[SW] clearCache message received, starting cache deletion...');
    event.waitUntil(
      caches.keys()
        .then(keys => {
          console.log('[SW] Found caches:', keys);
          return Promise.all(keys.map(key => {
            console.log('[SW] Deleting cache:', key);
            return caches.delete(key);
          }));
        })
        .then(() => {
          console.log('[SW] All caches deleted, activating new service worker');
          // Skip waiting to activate new SW immediately
          self.skipWaiting();

          // Notify all clients that cache was cleared
          return self.clients.matchAll().then(clients => {
            console.log('[SW] Found clients:', clients.length);
            clients.forEach(client => {
              console.log('[SW] Sending cacheCleared message to client');
              client.postMessage('cacheCleared');
            });
          });
        })
    );
  }
});
