import MetaURL from "../../../meta/type";

export default function html(self: Window | any) {
    self.__dynamic.rewrite.dom = function(src: string, meta: MetaURL) {
        if (typeof self.DOMParser == 'undefined') return src;
        if (!src) return src;

        var parser: DOMParser = new self.DOMParser();
        var doc: Document = parser.parseFromString(src.toString(), 'text/html');
        var html: HTMLElement = doc.documentElement;

        html.querySelectorAll('script').forEach(function(script: HTMLScriptElement) {
            if (!script.type || (script.type && script.type !== 'text/javascript' && script.type !== 'application/javascript' && script.type !== 'application/x-javascript')) {
                if (script.src) script.src = self.__dynamic.url.encode(script.getAttribute('src'), meta);
            } else {
                if (script.innerHTML) script.innerHTML = self.__dynamic.js.encode(script.innerHTML, {type: 'script'}, meta, {});
            }
        });

        html.querySelectorAll('link').forEach(function(link: HTMLLinkElement) {
            if (link.href && link.getAttribute('rel') !== 'stylesheet') link.href = self.__dynamic.url.encode(link.getAttribute('href'), meta);
        });

        html.querySelectorAll('img').forEach(function(img: HTMLImageElement) {
            if (img.src) img.src = self.__dynamic.url.encode(img.getAttribute('src'), meta);
            if (img.srcset) img.srcset = self.__dynamic.rewrite.srcset.encode(img.getAttribute('srcset'), self.__dynamic);
        });

        html.querySelectorAll('a').forEach(function(a: HTMLAnchorElement) {
            if (a.href) a.href = self.__dynamic.url.encode(a.getAttribute('href'), meta);
        });

        html.querySelectorAll('style').forEach(function(style: HTMLStyleElement) {
            if (style.innerHTML) style.innerHTML = self.__dynamic.rewrite.css.rewrite(style.innerHTML, meta);
        });

        return html.outerHTML as string;
    }
}