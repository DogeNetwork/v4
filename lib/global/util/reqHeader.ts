import MetaURL from "../meta/type";
import DynamicUtil from "../util";

export default function Header(this: DynamicUtil, headers: Object | any, meta: MetaURL, request: Request & { client: any }, cookies: string) {
    let { referrer }: any = request;

    [
        'origin',
        'Origin',
        'host',
        'Host',
        'referer',
        'Referer'
    ].forEach((header: string) => {
        if (headers[header]) delete headers[header];
    });

    headers['Origin'] = `${meta.protocol}//${meta.host}${meta.port ? ':'+meta.port : ''}`;
    headers['Host'] = meta.host + (meta.port ? ':'+meta.port : '');
    headers['Referer'] = meta.href;

    if (request.referrerPolicy == 'strict-origin-when-cross-origin') headers['Referer'] = `${meta.protocol}//${meta.host}/`;

    if (request.referrerPolicy == 'origin' && meta.origin) {
        referrer = meta.origin+'/';
    }

    if (cookies) {
        switch(request.credentials) {
            case 'omit':
                break;
            case 'same-origin':
                if (request.client) if (meta.origin == request.client.__dynamic$location.origin) headers['Cookie'] = cookies;
                if (!request.client) headers['Cookie'] = cookies;
                break;
            case 'include':
                headers['Cookie'] = cookies;
                break;
            default:
                break;
        }
        headers['Cookie'] = cookies;
    }

    if (referrer && referrer != location.origin+'/') {
        try {
            headers['Referer'] = this.ctx.url.decode(referrer);
            if (request.referrerPolicy=='strict-origin-when-cross-origin') headers['Referer'] = new URL(this.ctx.url.decode(referrer)).origin;
            headers['Origin'] = new URL(this.ctx.url.decode(referrer)).origin;
        } catch {}
    }

    if (request.client) {
        headers['Origin'] = request.client.__dynamic$location.origin;
        headers['Referer'] = request.client.__dynamic$location.href;

        if (request.referrerPolicy=='strict-origin-when-cross-origin') headers['Referer'] = request.client.__dynamic$location.origin;
    }

    if (this.ctx.config.tab) {
        if (this.ctx.config.tab.ua) {
            delete headers['user-agent'];
            delete headers['User-Agent'];
            
            headers['user-agent'] = this.ctx.config.tab.ua;
        }
    }

    headers['sec-fetch-dest'] = request.destination || 'empty';
    headers['sec-fetch-mode'] = request.mode || 'cors';
    headers['sec-fetch-site'] = request.client ? request.client.__dynamic$location.origin == meta.origin ? request.client.__dynamic$location.port == meta.port ? 'same-origin' : 'same-site' : 'cross-origin' : 'none';
    if (request.mode == 'navigate') headers['sec-fetch-site'] = 'same-origin';
    headers['sec-fetch-user'] = '?1';

    return new Headers(headers);
}