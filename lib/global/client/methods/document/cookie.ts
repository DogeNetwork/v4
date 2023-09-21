import Cookie from '../../../cookie';
import { parse, serialize } from '../../../cookie/parse';

export default function cookie(self: any) {
    delete self.Document.prototype.cookie;

    self.__dynamic.define(self.document, 'cookie', {
        get(): string {
            var event = self.__dynamic.fire('getCookies', [self.__dynamic.location.host, self.__dynamic.cookie.str || '']);
            if (event) return event;

            self.__dynamic.cookies.update(self.__dynamic.location.host);
            return self.__dynamic.cookie.str || self.__dynamic.cookie.desc.get.call(this) || '';
        },
        set(val: any): void {
            var parsed = self.__dynamic.modules.setCookieParser.parse(val, {decodeValues: false})[0];

            var event = self.__dynamic.fire('setCookie', [self.__dynamic.location.host, val, parsed]);
            if (event) return event;

            parsed.name = parsed.name.replace(/^\./g, '');

            Promise.resolve(self.__dynamic.cookies.set(self.__dynamic.location.host, self.__dynamic.modules.cookie.serialize(parsed.name, parsed.value, {...parsed, encode: (e:any) => e}))).then(async (e:any)=>{
                await self.__dynamic.cookies.update(self.__dynamic.location.host)
                self.__dynamic.cookie.str = await self.__dynamic.cookies.get(self.__dynamic.location.host);
            });

            var cookies = parse(self.__dynamic.cookie.str || '');

            cookies[parsed.name] = parsed.value;

            self.__dynamic.cookie.str = serialize(Object.entries(cookies).map(e=>({ name: e[0], value: e[1] })) as Array<any>);
        }
    });

    if (self.navigator.serviceWorker) try {
        self.navigator.serviceWorker.onmessage = ({ data }: any) => {
            if (data.host==self.__dynamic.location.host && data.type == 'set-cookie') {
                    var parsed = self.__dynamic.modules.cookie.parse(data.val);
                    var cookies = parse(self.__dynamic.cookie.str || '');

                    cookies[Object.entries(parsed)[0][0]] = Object.entries(parsed)[0][1];

                    self.__dynamic.cookie.str = serialize(Object.entries(cookies).map(e=>({ name: e[0], value: e[1] })) as Array<any>);
            }

            if (data.host==self.__dynamic.location.host && data.type == 'cookies') {
                self.__dynamic.cookie.str = data.cookies;
            }
        };
    } catch {};
}