import { DynamicBundle } from '../global/client';
importScripts('/dynamic/dynamic.config.js');

import init from '../global/client/methods/init';
import wrap from '../global/client/methods/wrap';

(function(self: Window | any) {
  const __dynamic: DynamicBundle = new DynamicBundle(self.__dynamic$config);
  self.__dynamic = __dynamic;

  const __dynamic$baseURL: string = __dynamic.url.decode(location.pathname);

  __dynamic.meta.load(new URL(__dynamic$baseURL));

  init(self, null), wrap(self);

  __dynamic.client.message(self);
  __dynamic.client.location(self, false);
  __dynamic.client.window(self);
  __dynamic.client.get(self);
  __dynamic.client.reflect(self);
  __dynamic.client.imports(self);
  __dynamic.client.blob(self);
})(self);