import { version } from '../package.json';

var FONT_STYLESHEET_URL =
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';
var STATIC_FONT_URL = /url\((https:\/\/fonts.gstatic.com[^)\s]+)\)/g;

function getNewFontUrls(cache) {
  return Promise.all([
    cache.keys(),
    cache
      .add(FONT_STYLESHEET_URL)
      .then(function () {
        return cache.match(FONT_STYLESHEET_URL);
      })
      .then(function (response) {
        return response.text();
      })
      .then(function (content) {
        return Array.from(content.matchAll(STATIC_FONT_URL)).map(function (
          match
        ) {
          return match[1];
        });
      })
      .catch((error) => {
        console.error(error);
        return [];
      }),
  ]).then((resolved) => {
    var storedRequests = resolved[0];
    var staticFontUrls = resolved[1];
    var storedFontUrls = storedRequests.map(function (request) {
      return request.url;
    });
    const newFontUrls = staticFontUrls.filter(function (url) {
      return storedFontUrls.indexOf(url) === -1;
    });
    return newFontUrls;
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    self.caches.open(version).then(function (cache) {
      return getNewFontUrls(cache).then(function (newFontUrls) {
        return cache.addAll(['/', '/about'].concat(newFontUrls));
      });
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    self.caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) {
            return key !== version;
          })
          .map(function (key) {
            return self.caches.delete(key);
          })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(self.caches.match(event.request.url));
});
