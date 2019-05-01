self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        return caches.delete(key);
      }));
    })
    .then(function() {
      return caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/index.html',
        ])
      })
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone())
          return response
        })
      })
    })
  )
})
