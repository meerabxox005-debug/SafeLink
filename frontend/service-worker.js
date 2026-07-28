const CACHE_NAME = "safelink-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/login.html",
  "/signup.html",
  "/dashboard.html",
  "/profile.html",
  "/contacts.html",
  "/chatbot.html",
  "/sos.html",
  "/css/style.css",
  "/js/config.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
