import MetaURL from "../meta/type";
import DynamicRewrites from "../rewrite";

export default class css {

  ctx;

  constructor(ctx: DynamicRewrites) {
    this.ctx = ctx.ctx;
  }

  rewrite(this: css, src: string | URL, meta: MetaURL, config: Object = {}) {
    if (!src) return src;

    return src.toString().replace(/(?:@import\s?|url\(?)['"]?(.*?)['")]/gmi, (...args) => {
      try {
        return args[0].replace(args[3], this.ctx.url.encode(args[3], meta));
      } catch {return args[0];}
    });
  }
}