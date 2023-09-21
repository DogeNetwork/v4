import * as idb from 'idb';
import { Cookie } from 'set-cookie-parser';

function createObject(input: Array<Object> | undefined, newobj: Cookie) {
    if (!input) input = [];

    if (input.find((e:any)=>e.name==newobj.name)) input[input.findIndex((e:any)=>e.name==newobj.name)] = { name: newobj.name, value: newobj.value, expires: newobj.expires }
    else input.push({ name: newobj.name, value: newobj.value, expires: newobj.expires });

    return input as Array<Cookie>;
}

export const DB = {
    open: async () => {
        return idb.openDB('__dynamic$cookies', 1, {
            async upgrade(db) {
                await db.createObjectStore('__dynamic$cookies');
            }
        });
    },
    set: async (host: string, raw: Cookie & { raw: any }, db: Promise<idb.IDBPDatabase>) => {
        if (raw.domain) host = raw.domain as string;
        if (host.startsWith('.')) host = host.slice(1);

        if (raw.expires) {
            var expires: Date = new Date(raw.expires);

            if (expires < new Date()) return DB.remove(host, raw, db);
        }
        
        await (await db).put('__dynamic$cookies', createObject((await (await db).get('__dynamic$cookies', host)), raw), host);
        
        return true;
    },
    get: async (host: string, db: Promise<idb.IDBPDatabase>) => {
        var baseHost: string = host.replace(/^(.*\.)?([^.]*\..*)$/g, "$2");
        var first: Array<Cookie> = await (await db).get('__dynamic$cookies', host) || [];

        if (host !== baseHost && host !== '.' + baseHost) {
            var cookies: Array<Cookie | any> = await (await db).get('__dynamic$cookies', baseHost);

            if (cookies) {
                for (var {name, value, expires} of cookies) {
                    if (expires) {
                        var target: Date = new Date(expires);

                        if (target <= new Date()) { DB.remove(host, cookies.find((e:any)=>e.name==name&&e.value==value&&e.expires==expires), db); continue; };
                    }
                    
                    if (!first.find((e:any)=>e.name==name && e.value==value)) first.push({ name, value, expires: expires || new Date(10e+12) });
                }
            }
        }

        return first as Array<Cookie>;
    },
    remove: async (host: string, raw: Cookie, db: Promise<idb.IDBPDatabase>) => {
        if (raw.domain) host = raw.domain;

        if (host.startsWith('.')) host = host.slice(1);

        var cookies: Array<Cookie> = await (await db).get('__dynamic$cookies', host);

        if (!cookies) return false;

        cookies = cookies.filter((e:any)=>e.name!==raw.name);

        await (await db).put('__dynamic$cookies', cookies, host);

        return true;
    },
    update: async (host: string, db: Promise<idb.IDBPDatabase>) => {
        var baseHost: string = host.replace(/^(.*\.)?([^.]*\..*)$/g, "$2");

        var cookies: Array<Cookie> = await (await db).get('__dynamic$cookies', baseHost);

        if (cookies) {
            for (var {name, value, expires} of cookies) {
                if (expires) {
                    var target: Date = new Date(expires);

                    if (target <= new Date()) { DB.remove(host, {name, value, expires}, db); continue; };
                }
            }
        }

        return cookies as Array<Cookie>;
    }
}