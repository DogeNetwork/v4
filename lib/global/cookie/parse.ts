import { Cookie } from "set-cookie-parser";

export const parse = (str: string) =>
    str ? str.split(';').map((v: string) => v.split('=')).reduce((acc: any, v: any) => {acc[(v[0].trim())] = (v[1].trim()); return acc; }, {}) : {};
export const serialize = (obj: Array<Cookie> = []) =>
    obj.map((k) => `${k.name}=${(k.value)}`).join('; ');