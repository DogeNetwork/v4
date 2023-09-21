import DynamicModules from './modules';
import DynamicRewrites from './rewrite';
import DynamicUtil from './util';
import DynamicUrlRewriter from './url';
import DynamicRegex from './regex';
import DynamicMeta from './meta';
import HeaderData from './headers';
import DynamicTypeFunctions from './istype';
import DynamicClient from './client/index';
import DynamicCookies from './cookie';
import * as DynamicEncoding from './codec';

class DynamicBundle {
  _location: any;
  bare: any;
  http: any;
  middleware: any;

  modules: DynamicModules = new DynamicModules(this);
  util: DynamicUtil = new DynamicUtil(this);
  meta: DynamicMeta = new DynamicMeta(this);
  regex: DynamicRegex = new DynamicRegex(this);
  rewrite: DynamicRewrites = new DynamicRewrites(this);
  url: DynamicUrlRewriter = new DynamicUrlRewriter(this);
  is: DynamicTypeFunctions = new DynamicTypeFunctions(this);
  cookies: DynamicCookies = new DynamicCookies(this);
  client: DynamicClient = new DynamicClient(this);
  encoding: typeof DynamicEncoding = DynamicEncoding;
  headers: typeof HeaderData = HeaderData;

  parent: Window | any;
  top: Window | any;

  define: Function | undefined;
  config: any;

  listeners: Array<{ event: string; cb: Function }> = [];

  on(event: string, cb: Function) {
    this.listeners.push({ event, cb });
  }

  fire(event: string, data: Array<any>) {
    let found = false;

    for (const listener of this.listeners) {
      if (listener.event === event) {
        data = (found = true, listener.cb(...data));
      }
    }

    if (found && data) {
      return data;
    }

    return null;
  }
  
  constructor(config: any) {
    if (config && !this.config) {
      this.config = config;
    }
    if (config) {
      this.util.encode(self);
    }
  }
}

export {
  DynamicBundle,
  DynamicModules,
  DynamicRewrites,
  DynamicUtil,
  DynamicMeta,
  DynamicUrlRewriter,
};