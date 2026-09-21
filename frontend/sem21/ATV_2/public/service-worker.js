const CACHE_NAME = "monitoramento-v1";

const ARQUIVOS_INICIAIS = [
  "/",
  "/index.html",
  "/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ARQUIVOS_INICIAIS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Apenas requisições GET
  if (request.method !== "GET") {
    return;
  }

  // Só permite HTTP e HTTPS
  const url = new URL(request.url);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {

            // Não tenta armazenar respostas inválidas
            if (!response || response.status !== 200) {
              return response;
            }

            const responseClone = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.put(request, responseClone);
              })
              .catch((error) => {
                console.warn(
                  "Não foi possível armazenar no cache:",
                  request.url,
                  error
                );
              });

            return response;
          });
      })
      .catch(() => {
        return caches.match("/index.html");
      })
  );
});