importScripts('/wk/wk2.js');
importScripts('/wk/wk3.js');
importScripts('/wk/wk4.js');
importScripts('/dynamic/dynamic.config.js');
importScripts('/dynamic/dynamic.worker.js');

const uv = new UVServiceWorker();
let userKey = new URL(location).searchParams.get("userkey");

const dynamic = new Dynamic();
self.dynamic = dynamic;


self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async function () {
      if (await dynamic.route(event)) {
        return await dynamic.fetch(event)
      }

      if (event.request.url.includes(`${location.origin}` + `${__uv$config.prefix}`)) {
        return await uv.fetch(event);
    }

      return await fetch(event.request)
    })()
  )
})