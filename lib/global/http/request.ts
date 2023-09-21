export default class DynamicRequest {
    headers: Headers = new Headers({});
    redirect: String = 'manual';
    body: Blob | ReadableStream<any> | null = null;
    method: String = 'GET';

    url: URL | String;

    constructor(url: URL | String = '', init: Request | undefined = new Request('')) {
      if (init.headers) this.headers = init.headers;
      if (init.redirect) this.redirect = init.redirect;
      if (init.body) this.body = init.body;
      this.method = init.method || 'GET';

      this.url = new String(url);
    }

    get init() {
      return {
        headers: this.headers || new Headers({}),
        redirect: this.redirect || 'manual',
        body: this.body || null,
        method: this.method || 'GET',
      }
    }
  }