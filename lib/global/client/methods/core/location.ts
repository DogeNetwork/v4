export default function Location(self: any, doc: Boolean = true) {
  const cloneAncestor: Function = (ancestor: DOMStringList) => {
    let cloned: DOMStringList = self.__dynamic.util.clone(ancestor);

    for (var i = 0; i < ancestor.length; i++) {
      self.__dynamic.define(cloned, i, {
        value: (self.top.__dynamic$location || self.__dynamic$location).origin,
        configurable: true,
        enumerable: true,
        writable: false
      });
    }

    self.__dynamic.define(cloned, 'length', {
      value: ancestor.length,
      configurable: true,
      enumerable: true,
      writable: false
    });

    return cloned as DOMStringList;
  }

  const ancestor: DOMStringList | Array<string> = self.location.ancestorOrigins || [];

  const descriptors: Array<Window & { prototype: object | any } | Location & { prototype: object | any } | Document & { prototype: object | any }> = [
    self.Window,
    self.Location,
    self.WorkerLocation,
    self.Document,
  ].filter(object => object);

  [...descriptors, self.Object].forEach(object => {
    delete object['prototype']['__dynamic$location'];
  });

  const descriptor: PropertyDescriptor = {
    get() {
      return self.__dynamic.location;
    },
    set(value: Location | string) {
      if (value instanceof self.Location) return self.__dynamic.location = value;

      self.__dynamic.location.href = value;
    },
    configurable: true,
  };

  const props: Array<string> = [
    "href",
    "host",
    "hash",
    "origin",
    "hostname",
    "port",
    "pathname",
    "protocol",
    "search",
  ];

  const funcs: Array<string> = [
    "assign",
    "replace",
    "toString",
    "reload"
  ];

  try {
    var property: URL = new URL(self.__dynamic$url || self.__dynamic.url.decode(self.location.pathname + self.location.search + self.location.hash));
  } catch {
    self.__dynamic$url = 'about:blank'
    var property: URL = new URL('about:blank');
  }

  self.__dynamic.property = property;
  self.__dynamic.meta.load(property as URL);
  self.__dynamic.location = self.__dynamic.util.clone(self.location) as Location

  props.forEach(prop => {
    self.__dynamic.define(self.__dynamic.location, prop, {
      get: () =>
        (prop == 'search' && (self.location[prop] + (self.location.search ? property.search.replace('?', '&') : property.search))) || (prop == 'hash' ? location[prop] : (property as any)[prop] as string),
      set: (e: any) => {
        if (prop === "href") {
          (self.location[prop] = self.__dynamic.url.encode(self.__dynamic.meta.href.replace((property as any)[prop], e), property)) as string
        }
        else {
          self.location[prop] = e.toString();
        }
      }
    });
  });

  self.__dynamic.define(self.Object.prototype, '__dynamic$location', {
    get() {
      if (this === self || this === self.__dynamic$window || this === self.document || this === self.__dynamic$document) return this.__dynamic?.location;

      return this.location;
    },
    set(value: string) {
      if (this === self || this === self.__dynamic$window || this === self.document || this === self.__dynamic$document) return this.__dynamic.location.href = value;

      return this.location = value;
    },
    configurable: true
  })

  funcs.forEach(func => {
    self.__dynamic.define(self.__dynamic.location, func, {
      get: () => {
        if (func == 'toString') return () => property['href'] as string;

        return new self.__dynamic.Function("arg", `return window.location.${func}(arg?${"reload" !== func && "toString" !== func ? "(self.__dynamic).url.encode(arg, new URL('" + property.href + "'))" : "arg"}:null)`) as Function;
      },
      set: () => null
    });
  });

  if (ancestor.length) {
    self.__dynamic.define(self.__dynamic.location, 'ancestorOrigins', {
      get: () => cloneAncestor(ancestor) as DOMStringList,
      set: () => null
    });
  }

  descriptors.forEach((object: Location & { prototype: Object } | Window & { prototype: Object } | Document & { prototype: Object }) => {
    self.__dynamic.define(object.prototype, '__dynamic$location', descriptor);
  });

  if (!self.__dynamic.hashchange) self.__dynamic.hashchange = (self.addEventListener("hashchange", (event: HashChangeEvent) => {
    //property["hash"] = "#" + (event.newURL.split("#")[1] || "");

    //self.history.pushState(null, null, self.__dynamic.location.href);
  }), true);

  return self.__dynamic.location;
};
