import DynamicTypeFunctions from "../istype";
import MetaURL from "../meta/type";

export default function js(this: DynamicTypeFunctions, url: MetaURL, contentType: string = '') {
    if (url.pathname.endsWith('.js')&&contentType=='text/plain') return true;
    var type = (this.ctx.modules.mime.contentType((contentType || url.pathname)) || 'application/javascript').split(';')[0];
    return type=='text/javascript'||type=='application/javascript'||type=='application/x-javascript';
}