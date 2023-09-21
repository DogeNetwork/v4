import DynamicUtil from "../util";

export default function path(this: DynamicUtil, { url }: Request) {
  return !(url.toString().substr(location.origin.length, this.ctx.config.prefix.length).startsWith(this.ctx.config.prefix));
}