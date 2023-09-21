import { IDBPDatabase } from 'idb';
import { DynamicBundle } from '../bundle';
import { DB } from './db';
import { serialize } from './parse';

export default class Cookie {
    _db: any;
    db: IDBPDatabase | any = DB;
    ctx: any;
    constructor(ctx: DynamicBundle) {this.ctx = ctx;}
    async get(host: string): Promise<string> {
        if (!this._db) this._db = this.db.open();
        const cookie = await DB.get(host, this._db);
        return serialize(cookie);
    }
    async set(host: string, raw: any = ''): Promise<Boolean> {
        raw = this.ctx.modules.setCookieParser.parse(raw, {decodeValues: false})[0];
        if (!this._db) this._db = this.db.open();
        const cookie = await DB.set(host, raw, this._db);
        return cookie;
    }
    async open(): Promise<undefined> {
        await DB.open();

        return;
    }
    async update(host: string): Promise<Array<Object>> {
        if (!this._db) this._db = this.db.open();
        return await DB.update(host, this._db);
    }
}