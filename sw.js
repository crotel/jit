const PRECACHE = 'bGZidnJ1eXc';
const RUNTIME = 'runtime';

const cachePUT = async (request, response) => {
  await caches.open(PRECACHE)
  .then(cache => cache.put(request, response))
  // .then(self.skipWaiting())
  // const cache = await caches.open(PRECACHE);
  // await cache.put(request, response);
};

const PRECACHE_URLS = [
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
 ];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
    .then(cache => cache.addAll(PRECACHE_URLS))
    .then(self.skipWaiting())
    )
});


self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil((async () => {
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
    
  }));
});

self.addEventListener('fetch', (event) => {
  // console.log(event.request.mode);
  /*
  We only want to call event.respondWith() if this is a navigation request
  for an HTML page.
  */
  // if (event.request.mode === 'navigate') {
  event.respondWith((async () => {
    /* 1.cache, First try to get the resource from the cache */
    try {
      // console.info('using caches'); 
      const responseFromCache = await caches.match(event.request);
      if (responseFromCache) {
        return responseFromCache
      };
    } catch {
      try {
    /* 2.preloaded, Next try to use the preloaded response, if it's there */
        // console.info('preload Response'); 
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          cachePUT(event.request, preloadResponse.clone()); 
          return preloadResponse
        }
      } catch(err) {
    /* 3.network, Next try to get the resource from the network */
        // console.info('response From Network'); 
        try {
          const responseFromNetwork = await fetch(event.request);
          /*
          response may be used only once
          we need to save clone to put one copy in cache
          and serve second one
          */
          cachePUT(event.request, responseFromNetwork.clone());
          return responseFromNetwork
        } catch (err) {
          // console.log('Fetch failed; returning offline resources instead.', err.message);
    /* 4.fallback cache */
          return await caches.open(PRECACHE)
          .then(cache => cache.match(event.request))
          .then(cachedResponse => cachedResponse)
          .catch(()=>{
            return new Response('Caches null and Network error', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' },
            })
          }
          )

        }
      }


    }
    


  })());
  // }

  // If our if() condition is false, then this fetch handler won't intercept the
  // request. If there are any other fetch handlers registered, they will get a
  // chance to call event.respondWith(). If no fetch handlers call
  // event.respondWith(), the request will be handled by the browser as if there
  // were no service worker involvement.
});

