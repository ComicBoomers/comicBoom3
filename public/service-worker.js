var cacheName= 'v3';
var cacheFiles = [
  'http://localhost:8080/index.html',
  'http://localhost:8080/style.css',
  'http://localhost:8080/landingPage',
  'http://localhost:8080/home',
  'http://localhost:8080/comicPage/:id',
  'http://localhost:8080/createComic'
]

self.addEventListener('install', e => {
   console.log('[ServiceWorker] Installed');
      e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
          console.log('[Service Worker] Caching cacheFiles!!!!!!', cache, cacheFiles);
          return cacheFiles.map(file => cache.add(file))
        })
        .catch(err => {
          console.log("AHHHHH WTFFF", err)
        })
      )
})

self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activated');
      e.waitUntil(
        caches.keys().then(function(cacheNames){
          return Promise.all(cacheNames.map(thisCacheName =>{
            if (thisCacheName !== cacheName){
              console.log('[Service Worker] Removing Files from', thisCacheName )
              return caches.delete(thisCacheName)
            }
          }))
        })
      )
})



self.addEventListener('fetch', event => {
  // Let the browser do its default thing
  // for non-GET requests.
  if (event.request.method != 'GET') return;

  // Prevent the default, and handle the request ourselves.
  event.respondWith(async function() {
    // Try to get the response from a cache.
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
      // If we found a match in the cache, return it, but also
      // update the entry in the cache in the background.
      event.waitUntil(cache.add(event.request));
      return cachedResponse;
    }

    // If we didn't find a match in the cache, use the network.
    return fetch(event.request);
  }());
});
