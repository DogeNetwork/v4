import DynamicUrlRewriter from "../url";

declare const self: any;

export default function decode(this: DynamicUrlRewriter, url: string | URL) {
  if (!url) return url;

  url = new String(url).toString();

  if (url.match(this.ctx.regex.BypassRegex)) return url;

  var index = url.indexOf(this.ctx.config.prefix);

  if(index == -1)
    return url;

  try {
    url = new URL(url, new URL(self.location.origin)).href;

    index = url.indexOf(this.ctx.config.prefix);
  
    if (url.slice(index + this.ctx.config.prefix.length).trim() == 'about:blank')
      return 'about:blank';
    
    var search = (new URL(url).search + new URL(url).hash) || '';
    var base = new URL(this.ctx.encoding.decode(url.slice(index + this.ctx.config.prefix.length)
    .replace('https://', 'https:/')
    .replace('https:/', 'https://').split('?')[0]));
  } catch(e) {
    return url;
  }

  url = base.origin + base.pathname + search + (new URL(url).search ? base.search.replace('?', '&') : base.search);

  return url;
}