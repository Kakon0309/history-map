const CACHE_NAME = 'history-map-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './main.js',
  './style.css',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// インストールイベント: アプリの基本ファイル（アプシェル）をキャッシュする
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// フェッチイベント: リクエストに応じてキャッシュまたはネットワークから応答を返す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにヒットすれば、それを返す
        if (response) {
          return response;
        }

        // キャッシュになければ、ネットワークにリクエストしに行く
        return fetch(event.request);
      }
    )
  );
});
