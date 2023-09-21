export default class DynamicResponse extends Response {
    status: number = 200;
    body: ReadableStream<Uint8Array> | null;
    statusText: string = 'OK';
    headers: Headers = new Headers({});

    constructor(body: string | ReadableStream<any> = '', init: Response | undefined = new Response('')) {
        super(body, init)
        
        this.body = body as ReadableStream<any>;

        if (init.status) this.status = init.status;
        if (init.statusText) this.statusText = init.statusText;
        if (init.headers) this.headers = init.headers;
    }

    get init() {
        return {
            headers: this.headers || new Headers({}),
            statusText: this.statusText || 200,
            body: this.body || new Blob([]),
            status: this.statusText || 'OK',
          }
    }
}