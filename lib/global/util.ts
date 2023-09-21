import { route, routePath } from './util/route';
import path from './util/path';
import resHeader from './util/resHeader';
import reqHeader from './util/reqHeader';
import clone from './util/clone';
import Class from './util/class';
import file from './util/file';
import edit from './util/edit';
import error from './util/error';
import about from './util/about';
import encode from './util/encode';
import rewritePath from './util/rewritePath';
import { DynamicBundle } from './client';

class DynamicUtil {
  route: Function = route;
  routePath: Function = routePath;
  path: Function = path;
  resHeader: Function = resHeader;
  reqHeader: Function = reqHeader;
  clone: Function = clone;
  class: Function = Class;
  file: Function = file;
  edit: Function = edit;
  error: Function = error;
  encode: Function = encode;
  rewritePath: Function = rewritePath;
  
  about = about;

  ctx: DynamicBundle & { encoding: any };
  
  constructor(ctx: DynamicBundle) {
    this.ctx = ctx;
  }
}

export default DynamicUtil;