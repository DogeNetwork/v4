import DynamicMeta from "../meta";

declare const self: any;

export default function loadMeta(this: DynamicMeta | any, url: URL | any) {
  url = new URL(url.href);

  for (var prop in url) {
    this.ctx.meta[prop] = url[prop];
  }

  return true;
}