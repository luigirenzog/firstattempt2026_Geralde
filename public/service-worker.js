const CACHE_VERSION = 'university-app-v4'
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`
const STATIC_ASSET_CACHE = `${CACHE_VERSION}-static`
const API_CACHE = `${CACHE_VERSION}-api`
const PAGE_CACHE = `${CACHE_VERSION}-pages`

const APP_SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/icon-192x192.png',
  '/assets/icon-512x512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => cache.addAll(APP_SHELL_ASSETS))
  )

  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(
            (key) =>
              key !== APP_SHELL_CACHE &&
              key !== STATIC_ASSET_CACHE &&
              key !== API_CACHE &&
              key !== PAGE_CACHE
          )
          .map((key) => caches.delete(key))
      )
    )
  )

  self.clients.claim()
})
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return
  }

  const requestUrl = new URL(event.request.url)
  const acceptsJson = event.request.headers.get('accept')?.includes('application/json')
  const isApiRequest = requestUrl.pathname.startsWith('/api/') || acceptsJson
  const isSameOrigin = requestUrl.origin === self.location.origin
  const isStaticAsset =
    isSameOrigin &&
    /\.(?:js|css|png|jpg|jpeg|gif|webp|svg|ico|woff2?)$/i.test(requestUrl.pathname)

  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirstPage(event.request))
    return
  }

  if (isApiRequest) {
    event.respondWith(networkFirstApi(event.request))
    return
  }

  if (isStaticAsset) {
    event.respondWith(cacheFirstStatic(event))
  }
})

async function networkFirstPage(request) {
  try {
    const networkResponse = await fetch(request)
    if (isCacheableResponse(networkResponse)) {
      const cache = await caches.open(PAGE_CACHE)
      await cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch {
    const cachedPage = await caches.match(request)
    if (cachedPage) {
      return cachedPage
    }
    return caches.match('/index.html')
  }
}

async function networkFirstApi(request) {
  try {
    const networkResponse = await fetch(request)
    if (isCacheableResponse(networkResponse)) {
      const cache = await caches.open(API_CACHE)
      await cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    return new Response(
      JSON.stringify({ error: 'Offline and no cached API data available.' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

async function cacheFirstStatic(event) {
  const cachedResponse = await caches.match(event.request)
  if (cachedResponse) {
    // Update in the background so users get fresh files on next visit.
    event.waitUntil(updateStaticCache(event.request))
    return cachedResponse
  }

  const networkResponse = await fetch(event.request)
  if (isCacheableResponse(networkResponse)) {
    const cache = await caches.open(STATIC_ASSET_CACHE)
    await cache.put(event.request, networkResponse.clone())
  }
  return networkResponse
}

async function updateStaticCache(request) {
  try {
    const networkResponse = await fetch(request)
    if (isCacheableResponse(networkResponse)) {
      const cache = await caches.open(STATIC_ASSET_CACHE)
      await cache.put(request, networkResponse.clone())
    }
  } catch {
    // Keep serving the previous cached file when network is unavailable.
  }
}

function isCacheableResponse(response) {
  return Boolean(response) && (response.ok || response.type === 'opaque')
}
