export default class about {
    rawHeaders = {};
    headers = new Headers({});
    status = 200;
    statusText = 'OK';

    body: Blob;

    constructor(blob: Blob) {
        this.body = blob;
    }

    async blob() {
        return this.body;
    }

    async text() {
        return await this.body.text();
    }
}