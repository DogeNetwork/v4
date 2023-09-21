import { DynamicBundle } from "./client";

class DynamicMiddleware {

  ctx: DynamicBundle;
  
  constructor(ctx: DynamicBundle) {
    this.ctx = ctx;
  }
}

export default DynamicMiddleware;