import DynamicTypeFunctions from "../istype";
import MetaURL from "../meta/type";

export default function html(this: DynamicTypeFunctions, url: MetaURL, contentType: String = '', html: String = '') {
    let a;
    if (!contentType && this.ctx.modules.mime.contentType(url.pathname) == url.pathname) return html.trim().match(/<(html|script|body)[^>]*>/g) && !!(a = html.trim().indexOf((html.trim().match(/<(html|script|body)[^>]*>/g)||[])[0] as any), a > -1 && a < 100);
    return (this.ctx.modules.mime.contentType((contentType || url.pathname)) || 'text/html').split(';')[0] === 'text/html'||html.trim().match(/\<\!(doctype|DOCTYPE) html\>/g);
};