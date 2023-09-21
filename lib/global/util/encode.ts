import DynamicUtil from "../util";

export default function encode(this: DynamicUtil, self: Window | any) {
    var obj = this.ctx.encoding;

    if (typeof this.ctx.config.encoding == 'object') {
        obj = {
            ...obj,
            ...this.ctx.encoding,
        }
    } else {
        obj = {
            ...this.ctx.encoding[this.ctx.config.encoding],
        }
    }

    this.ctx.encoding = {
        ...this.ctx.encoding,
        ...obj,
    }

    return this.ctx.encoding;
}