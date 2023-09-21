export default function niche(self: any) {
    // self explanatory

    self.__dynamic.define(self.document, 'origin', {
        value: self.__dynamic$location.origin as string,
        configurable: false,
        enumerable: false,
    });

    self.__dynamic.define(self.document, 'domain', {
        value: self.__dynamic$location.hostname as string,
        configurable: false,
        enumerable: false,
    });

    ['referrer', 'URL', 'documentURI'].forEach(prop => {
        self.__dynamic.define(self.document, prop, {
            value: self.__dynamic$location.toString() as string,
            configurable: false,
            enumerable: false,
        });
    });

    [self.document, self.HTMLElement.prototype].forEach(obj => {
        self.__dynamic.define(obj, 'baseURI', {
            get(): string {
                return (self.__dynamic.baseURL || self.__dynamic$location).href as string;
            }
        });
    });

    // storage.getEntries can leak page location

    ['getEntries', 'getEntriesByName', 'getEntriesByType'].forEach(prop => {
        self.performance[prop] = new Proxy(self.performance[prop], {
            apply(t, g, a: Array<any>): Array<PerformanceEntry> {
                return (Reflect.apply(t, g, a) as any).filter((e:any)=>!e.name?.includes(self.location.origin+'/dynamic/dynamic.')).filter((e:any)=>!e.name.includes(self.location.origin+self.__dynamic.config.prefix+'caches/')).map((e:any)=>{
                    if (e.name) {
                        var cloned: PerformanceEntry | any = self.__dynamic.util.clone(e);
                        
                        cloned.__defineGetter__('name', function(this: any) {
                            return this._name;
                        });

                        cloned.__defineSetter__('name', function(this: any, value: any) {
                            this._name = value;
                        });

                        cloned.name = self.__dynamic.url.decode(e.name);

                        self.__dynamic.define(cloned, 'name', {
                            get: undefined,
                            set: undefined,
                        });

                        self.__dynamic.define(cloned, 'name', {
                            value: cloned._name as string,
                            writable: false,
                        });

                        delete cloned._name;

                        for (var i in e) {
                            if (i=='name') continue;

                            if (typeof e[i] == 'function') var val = new Proxy(e[i], {apply(t, g, a) {if (t.name=='toJSON') {var b: any = {}; for (var c in cloned) b[c] = cloned[c]; return b;}; return Reflect.apply(t, e, a)}});
                            else var val = e[i];

                            Object.defineProperty(cloned, i, {
                                value: val,
                                writable: true,
                            });
                        }

                        e = cloned;
                    }

                    return e as PerformanceEntry;
                });
            }
        });
    });

    // initEvent things

    if (self.MouseEvent) self.MouseEvent.prototype.initMouseEvent = self.__dynamic.wrap(self.MouseEvent.prototype.initMouseEvent,
        function(this: MouseEvent, target: Function, ...args: Array<string | Symbol | any>): void {
            if (args.length) args = args.map(e=>e==self.__dynamic$window?self:e);

            return Reflect.apply(target, this, args);
        }
    );

    if (self.KeyboardEvent) self.KeyboardEvent.prototype.initKeyboardEvent = self.__dynamic.wrap(self.KeyboardEvent.prototype.initKeyboardEvent,
        function(this: KeyboardEvent, target: Function, ...args: Array<string | Symbol | any>): void {
            if (args.length) args = args.map(e=>e==self.__dynamic$window?self:e);

            return Reflect.apply(target, this, args);
        }
   );

    if (self.StorageEvent) self.StorageEvent.prototype.initStorageEvent = self.__dynamic.wrap(self.StorageEvent.prototype.initStorageEvent,
        function(this: StorageEvent, target: Function, ...args: Array<string | Symbol | any>): void {
            if (args.length) args = args.map(e=>e==self.localStorage?self.__dynamic.storage.localStorage:e==self.sessionStorage?self.__dynamic.storage.sessionStorage:e);

            return Reflect.apply(target, this, args);
        }
    );

    self.Object.defineProperty = self.__dynamic.wrap(self.Object.defineProperty,
        function(this: any, target: Function, ...args: Array<string | Symbol | any>): any {
            try {
                return Reflect.apply(target, this, args);
            } catch(e: any) {
                if (e.toString().includes('Cannot redefine property:')) {
                    if (!args[0].__defined) args[0].__defined = {};

                    args[0].__defined[args[1]] = args[2];
                }
            }
        }
    );

    if (self.__dynamic.meta.origin == 'https://www.google.com') self.setInterval = new Proxy(self.setInterval, {apply(t: Function, g: Window, a: Array<any>) { return a[1] == 500 ? null : Reflect.apply(t, g, a) }});
}