// Ultraviolet worker fallback
importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');

const uv = new UVServiceWorker();
self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async function() {
      try {
        return await uv.fetch(event);
      } catch (error) {
        return new Response('UV Worker Error: ' + error.toString(), {
          status: 500,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    })()
  );
}); 