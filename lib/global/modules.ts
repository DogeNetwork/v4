import mime from '@dynamic-pkg/mime';
import * as path from 'path-browserify';
import * as idb from 'idb';
import { parse } from 'acorn';
import { BareClient, createBareClient } from '@tomphttp/bare-client';
import * as cookie from 'cookie';
import { parse as cookieParser } from 'set-cookie-parser'
import { generate } from 'astring';

class DynamicModules {
  mime = mime;
  idb = idb;
  path = path;
  acorn = { parse };
  bare = {createBareClient, BareClient};
  base64 = { encode: btoa, decode: atob };
  estree = { generate };
  cookie = cookie;
  setCookieParser = cookieParser;

  ctx;

  constructor(ctx:any) {
    this.ctx = ctx;
  }
}

export default DynamicModules;