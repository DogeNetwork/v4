import MetaURL from "../meta/type";
import DynamicUtil from "../util";

export default function rewritePath(this: DynamicUtil, request: Request, client: Object | any, meta: MetaURL | URL) {
    if (!request.url.startsWith('http')) return request.url;

    let url: any = request.url.toString();

    if (request.url.startsWith(location.origin)) url = url.substr(self.location.origin.length);

    url = new URL(url, new URL(client.__dynamic$location.href)).href;

    return this.ctx.url.encode(url, meta);
}