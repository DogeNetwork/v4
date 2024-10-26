importScripts("./wk/wk2.js");
importScripts("./wk/wk3.js");
importScripts("./wk/wk4.js");

const sw = new UVServiceWorker();
let userKey = new URL(location).searchParams.get('userkey');

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));