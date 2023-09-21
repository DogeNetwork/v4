import Cookie from "../cookie";
import MetaURL from "../meta/type";
import DynamicUtil from "../util";

export default async function Header(this: DynamicUtil, headers: Object | any, meta: MetaURL, Cookies: Cookie) {

    for (const header in headers) {
        if (this.ctx.headers.csp.indexOf(header.toLowerCase())!==-1) delete headers[header];

        if (header.toLowerCase() == 'location') {
            headers[header] = this.ctx.url.encode(headers[header], meta);

            continue;
        }

        if (header.toLowerCase() === 'set-cookie') {
            if (!Array.isArray(headers[header])) headers[header] = this.ctx.modules.setCookieParser(headers[header], {decodeValues: false}); else headers[header] = headers[header].map((e: any)=>this.ctx.modules.setCookieParser(e, {decodeValues: false})[0]);

            for await (var cookie of headers[header]) {
                await Cookies.set(meta.host, this.ctx.modules.cookie.serialize(cookie.name, cookie.value, {...cookie, encode: (e:any) => e}));

                continue;
            }

            delete headers[header];
            
            continue;
        }
    }

    return new Headers(headers);
}