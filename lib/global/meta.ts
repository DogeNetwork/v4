import { DynamicBundle } from './client';
import load from './meta/load';
import MetaURL from './meta/type';

class DynamicMeta extends MetaURL {
  load: Function = load;

  ctx: DynamicBundle;

  constructor(ctx: DynamicBundle) {
    super();
    this.ctx = ctx;
  }
}

export default DynamicMeta;