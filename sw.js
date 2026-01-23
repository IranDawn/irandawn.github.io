const CACHE_NAME = 'irandawn-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/irandawn.js',
  '/version.json'
];

const API_CACHE_NAME = 'irandawn-api-v1';
const API_HOST = 'raw.githubusercontent.com';

// Install: cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== API_CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Version check requests: always network, never cache response from this request
  if (url.pathname.endsWith('/version.json') && url.searchParams.has('check')) {
    event.respondWith(fetch(request));
    return;
  }

  // API requests (GitHub raw content): network-first with cache fallback
  if (url.host === API_HOST) {
    event.respondWith(networkFirstWithCache(request, API_CACHE_NAME));
    return;
  }

  // Static assets: cache-first with network fallback
  if (request.method === 'GET' && url.origin === self.location.origin) {
    event.respondWith(cacheFirstWithNetwork(request, CACHE_NAME));
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
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }

  if (event.data === 'clearCache') {
    event.waitUntil(
      caches.keys()
        .then(keys => Promise.all(keys.map(key => caches.delete(key))))
        .then(() => {
          // Notify all clients that cache was cleared
          self.clients.matchAll().then(clients => {
            clients.forEach(client => client.postMessage('cacheCleared'));
          });
        })
    );
  }
});
