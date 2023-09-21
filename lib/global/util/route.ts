import DynamicUtil from "../util";

async function route(this: DynamicUtil, request: Request) {
  var url;

  if (request.method === "GET") {
    var parsed = new URL(request.url);
    url = parsed.searchParams.get('url');
  } else if (request.method === "POST") {
    const formData = await request.formData();

    url = formData.get('url');

    if (url === null) {
      var parsed = new URL(request.url);
      url = parsed.searchParams.get('url');
    }

    if (!url) return new Response('Error: Invalid or Unfound url', {status: 400});
  } else {
    return new Response('Error: Invalid method', {status: 405});
  }

  return new Response('', {status: 301, headers: {location: location.origin+this.ctx.config.prefix+this.ctx.encoding.encode(url)}});
}

function routePath(this: any, { url }: Request) {
  return !(url.toString().substr(location.origin.length, (this.ctx.config.prefix+'route').length).startsWith(this.ctx.config.prefix+'route'));
}

export { route, routePath };