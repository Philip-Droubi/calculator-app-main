const calculatorApp = "calculator-v1";
const assets = [
    "/",
    "/index.html",
    "/CSS/main.css",
    "/JS/main.js",
    "/images/favicon-32x32.png",
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(calculatorApp).then(cache => {
            cache.addAll(assets);
        })
    )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
});