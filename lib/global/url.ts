import Encode from './url/encode';
import Decode from './url/decode';
import { DynamicBundle } from './bundle';

class DynamicUrlRewriter {
  encode: Function = Encode;
  decode: Function = Decode;

  ctx: DynamicBundle;
  
  constructor(ctx: DynamicBundle) {
    this.ctx = ctx;
  }
}

export default DynamicUrlRewriter;