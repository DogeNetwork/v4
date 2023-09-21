declare const self: any;

export default async function Edit(req: Request) {
    let request: Response;

    if (self.__dynamic$config.mode !== 'development') {
        var cache = await caches.open('__dynamic$files');

        if (!cache) request = await fetch(req);
        else 
            request = await cache.match(req.url) || await fetch(req);
    } else request = await fetch(req);
    let text = await request.blob();

    if (req.url.startsWith(location.origin + '/dynamic/dynamic.config.js') || req.url.startsWith(location.origin + '/dynamic/dynamic.client.js')) {
        text = new Blob([`${await text.text()}\nself.document?.currentScript?.remove();`], {type: 'application/javascript'});
    }

    return new Response(text, {
        headers: request.headers,
        status: request.status,
        statusText: request.statusText
    });
}