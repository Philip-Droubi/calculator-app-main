const calculatorApp = "calculator-v1";
const link = "/calculator-app-main";
const assets = [
    `${link}/`,
    `${link}/index.html`,
    `${link}/CSS/main.css`,
    `${link}/JS/main.js`,
    `${link}/images/favicon-32x32.png`,
    `${link}/Fonts/LeagueSpartan-Bold.ttf`,
    `${link}/Fonts/LeagueSpartan-Medium.ttf`,
    `${link}/sounds/click.mp3`,
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