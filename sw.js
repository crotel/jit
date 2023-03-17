const CACHE_VERSION = 'bGZieTVtOG0';
const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_VERSION);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open(CACHE_VERSION);
  await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to use the preloaded response, if it's there
  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.info('using preload response', preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request);
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    console.log('Fetch failed; returning offline page instead.', error.message);
    console.log(new URL(request).pathname);
    const cache = await caches.open(CACHE_VERSION);
    const cachedResponse = await cache.match(new URL(request.url).pathname);
    return cachedResponse;
    // const fallbackResponse = await caches.match(fallbackUrl);
    // if (fallbackResponse) {
    //   return fallbackResponse;
    // }
    // // when even the fallback response is not available,
    // // there is nothing we can do, but we must always
    // // return a Response object
    // return new Response('Network error happened', {
    //   status: 408,
    //   headers: { 'Content-Type': 'text/plain' },
    // });
  }
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload());
  self.clients.claim();
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    addResourcesToCache([
      "0-bundle.js",
      "1-bundle.js",
      "1-bundle.worker.js",
      "10-bundle.js",
      "10-bundle.worker.js",
      "11-bundle.js",
      "11-bundle.worker.js",
      "12-bundle.js",
      "12-bundle.worker.js",
      "13-bundle.js",
      "13-bundle.worker.js",
      "14-bundle.js",
      "14-bundle.worker.js",
      "15-bundle.js",
      "15-bundle.worker.js",
      "16-bundle.js",
      "16-bundle.worker.js",
      "17-bundle.js",
      "17-bundle.worker.js",
      "18-bundle.worker.js",
      "19-bundle.worker.js",
      "2-bundle.worker.js",
      "20-bundle.worker.js",
      "21-bundle.worker.js",
      "22-bundle.worker.js",
      "23-bundle.worker.js",
      "24-bundle.worker.js",
      "25-bundle.worker.js",
      "26-bundle.worker.js",
      "27-bundle.worker.js",
      "28-bundle.worker.js",
      "29-bundle.worker.js",
      "3-bundle.worker.js",
      "30-bundle.worker.js",
      "31-bundle.worker.js",
      "32-bundle.worker.js",
      "33-bundle.worker.js",
      "34-bundle.worker.js",
      "35-bundle.worker.js",
      "36-bundle.worker.js",
      "37-bundle.worker.js",
      "38-bundle.worker.js",
      "39-bundle.worker.js",
      "4-bundle.js",
      "4-bundle.worker.js",
      "40-bundle.worker.js",
      "41-bundle.worker.js",
      "42-bundle.worker.js",
      "43-bundle.worker.js",
      "44-bundle.worker.js",
      "45-bundle.worker.js",
      "46-bundle.worker.js",
      "47-bundle.worker.js",
      "48-bundle.worker.js",
      "49-bundle.worker.js",
      "5-bundle.js",
      "5-bundle.worker.js",
      "50-bundle.worker.js",
      "51-bundle.worker.js",
      "52-bundle.worker.js",
      "53-bundle.worker.js",
      "54-bundle.worker.js",
      "55-bundle.worker.js",
      "56-bundle.worker.js",
      "57-bundle.worker.js",
      "58-bundle.worker.js",
      "59-bundle.worker.js",
      "6-bundle.js",
      "6-bundle.worker.js",
      "60-bundle.worker.js",
      "7-bundle.js",
      "7-bundle.worker.js",
      "8-bundle.js",
      "8-bundle.worker.js",
      "9-bundle.js",
      "9-bundle.worker.js",
      "a888af59c6704e958e87aaebe0dfd3aa.svg",
      "babel-worker-bundle.js",
      "index-bundle.js",
      "index.html",
      "player-bundle.js",
      "player.html",
      "python-worker-bundle.js",
      "typescript-worker-bundle.js",
      ])
    );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
      fallbackUrl: "index.html",
    })
    );
});
