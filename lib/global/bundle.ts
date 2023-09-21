import { BareClient } from '@tomphttp/bare-client';
import DynamicModules from './modules';
import DynamicRewrites from './rewrite';
import DynamicUtil from './util';
import DynamicUrlRewriter from './url';
import DynamicMeta from './meta';
import DynamicHttp from './http';
import DynamicRegex from './regex';
import DynamicMiddleware from './middleware';
import DynamicTypeFunctions from './istype';
import DynamicCookies from './cookie';
import HeaderData from './headers';
import * as DynamicEncoding from './codec';

class DynamicBundle {
  _location: any;
  client: any;
  parent: any;
  top: any;
  define: Function | undefined;
  config: any;
  listeners: Array<{ event: string; cb: Function }> = [];

  modules: DynamicModules = new DynamicModules(this);
  util: DynamicUtil = new DynamicUtil(this);
  http: DynamicHttp = new DynamicHttp(this);
  meta: DynamicMeta = new DynamicMeta(this);
  rewrite: DynamicRewrites = new DynamicRewrites(this);
  url: DynamicUrlRewriter = new DynamicUrlRewriter(this);
  is: DynamicTypeFunctions = new DynamicTypeFunctions(this);
  cookies: DynamicCookies = new DynamicCookies(this);
  regex: DynamicRegex = new DynamicRegex(this);
  headers: typeof HeaderData = HeaderData;
  encoding: typeof DynamicEncoding = DynamicEncoding;
  bare!: Promise<BareClient>;
  middleware: DynamicMiddleware = new DynamicMiddleware(this);

  constructor(config: any) {
    if (config && !this.config) {
      this.config = config;
    }
    if (config) {
      this.util.encode(self);
    }
  }

  on(event: string, cb: Function) {
    this.listeners.push({ event, cb });
  }

  fire(event: string, data: Array<any>) {
    for (const listener of this.listeners) {
      if (listener.event === event) {
        data = listener.cb(...data);
        return data;
      }
    }
    return null;
  }
}

export {
  DynamicBundle,
  DynamicModules,
  DynamicRewrites,
  DynamicUtil,
  DynamicMiddleware,
  DynamicHttp,
  DynamicMeta,
  DynamicUrlRewriter,
};