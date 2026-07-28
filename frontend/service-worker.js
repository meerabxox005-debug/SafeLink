const CACHE_NAME = "safelink-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./login.html",
  "./signup.html",
  "./css/style.css",
  "./js/config.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of urlsToCache) {
        try {
          await cache.add(url);
          console.log("Cached:", url);
        } catch (err) {
          console.log("Failed to cache:", url);
        }
      }
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});