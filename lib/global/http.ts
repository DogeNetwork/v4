import { DynamicBundle } from './client';
import Request from './http/request';
import Response from './http/response';

class DynamicHttp {
  Request = Request;
  Response = Response;

  ctx: DynamicBundle;
  
  constructor(ctx: DynamicBundle) {
    this.ctx = ctx;
  }
}

export default DynamicHttp;