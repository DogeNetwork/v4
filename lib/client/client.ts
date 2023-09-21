import { DynamicBundle } from '../global/client';

import init from '../global/client/methods/init';
import wrap from '../global/client/methods/wrap';

export default function(self: Window | any, config: Object = {}, altURL: string = '') {
  if (self.hasOwnProperty("__dynamic")) return false;
  if (!self.hasOwnProperty("__dynamic$config")) self.__dynamic$config = config;

  if (self.parent?.__dynamic) {
    self.__dynamic$bare = self.parent.__dynamic$bare;
  }

  const __dynamic: DynamicBundle = new DynamicBundle(self.__dynamic$config);
  __dynamic.config.bare.path = (typeof __dynamic.config.bare.path === 'string' || __dynamic.config.bare.path instanceof URL) ? [ new URL(__dynamic.config.bare.path, self.location) ][0] : __dynamic.config.bare.path.map((str:any) => new URL(str, self.location));

  self.__dynamic$baseURL = altURL || self.__dynamic$url || __dynamic.url.decode(location.pathname + location.search + location.hash) || "";
  self.__dynamic = __dynamic;
  self.__dynamic.bare = new self.__dynamic.modules.bare.BareClient(self.__dynamic$config.bare.path, self.__dynamic$bare);
  self.__dynamic.meta.load(new URL(self.__dynamic$baseURL));

  init(self, null), wrap(self);

  for (var method of self.__dynamic.client.methods) {
    const name: string = method.name;
    const func: Array<Function> | any = Object.entries(self.__dynamic.client).find(e=>e[0]==name);

    if (name == 'mutation' && self.frameElement) continue;

    if (method.function=='self') func[1](self);

    continue;
  }; 

  return self;
};