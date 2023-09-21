import DynamicTypeFunctions from "../istype";
import MetaURL from "../meta/type";

export default function css(this: DynamicTypeFunctions, url: MetaURL, contentType: string = '') {
    return (this.ctx.modules.mime.contentType((contentType || url.pathname)) || 'text/css').split(';')[0] === 'text/css';
}