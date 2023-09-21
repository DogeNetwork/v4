export default function storage(self: Window | any) {

    self.Storage.prototype.setItem = self.__dynamic.wrap(self.Storage.prototype.setItem,
        function(this: Storage, target: Function, ...args: Array<string | Symbol>): void {
            if (args[0]) args[0] = '__dynamic$' + self.__dynamic$location.host + '$' + args[0].toString();

            return Reflect.apply(target, this, args) as undefined;
        },
        'Storage.prototype.setItem'
    );

    self.Storage.prototype.getItem = self.__dynamic.wrap(self.Storage.prototype.getItem,
        function(this: Storage, target: Function, ...args: Array<string | Symbol>): string | null {
            if (args[0]) args[0] = '__dynamic$' + self.__dynamic$location.host + '$' + args[0].toString();

            return (Reflect.apply(target, this, args) as string || null);
        },
        'Storage.prototype.getItem'
    );

    self.Storage.prototype.removeItem = self.__dynamic.wrap(self.Storage.prototype.removeItem,
        function(this: Storage, target: Function, ...args: Array<string | Symbol>): void {
            if (args[0]) args[0] = '__dynamic$' + self.__dynamic$location.host + '$' + args[0].toString();

            return Reflect.apply(target, this, args) as undefined;
        },
        'Storage.prototype.removeItem'
    );

    self.Storage.prototype.clear = self.__dynamic.wrap(self.Storage.prototype.clear,
        function(this: Storage, target: Function, ...args: Array<string | Symbol>): void {
            var keys: Array<any> = [];

            for (var i = 0; i < this.length; i++) {
                if (target.call(this, i)?.startsWith('__dynamic$' + self.__dynamic$location.host + '$')) keys.push(target.call(this, i)?.replace('__dynamic$' + self.__dynamic$location.host + '$', ''));
            }

            for (var key in keys) {
                target.call(this, keys[key]);
            }

            return;
        },
        'Storage.prototype.clear'
    );

    self.Storage.prototype.key = self.__dynamic.wrap(self.Storage.prototype.key,
        function(this: Storage, target: Function, ...args: Array<string | Symbol | number | any>): string | null {
            var keys: Array<any> = [];

            for (var i = 0; i < this.length; i++) {
                if (target.call(this, i)?.startsWith('__dynamic$' + self.__dynamic$location.host + '$')) keys.push(target.call(this, i)?.replace('__dynamic$' + self.__dynamic$location.host + '$', ''));
            }

            if (keys[args[0]]) return keys[args[0]];

            return null;
        },
        'Storage.prototype.key'
    );

    ["localStorage", "sessionStorage"].forEach((storage: any) => {
        self['__dynamic$'+storage] = new Proxy(self[storage], {
            get(target, prop: any): any {
                if (prop == 'length') {
                    var keys = [];

                    for (var i = 0; i < Object.keys(self.__dynamic.storage[storage]).length; i++) {
                        if (Object.keys(self.__dynamic.storage[storage])[i].startsWith('__dynamic$' + self.__dynamic$location.host + '$')) keys.push(Object.keys(self.__dynamic.storage[storage])[i].replace('__dynamic$' + self.__dynamic$location.host + '$', ''));
                    }
    
                    return keys.length;
                }

                if (self.__dynamic.storage.methods.includes(prop)) return self.__dynamic.storage.cloned[storage][prop].bind(self.__dynamic.storage[storage])

                return self.__dynamic.storage[storage].getItem('__dynamic$' + self.__dynamic$location.host + '$' + prop.toString());
            },
            set(target, prop: any, value: any): any {
                self.__dynamic.storage[storage].setItem('__dynamic$' + self.__dynamic$location.host + '$' + prop.toString(), value);

                return value || true;
            },
            deleteProperty(target, prop: any): any {
                return self.__dynamic.storage[storage].removeItem('__dynamic$' + self.__dynamic$location.host + '$' + prop.toString());
            }
        });

        delete self[storage];

        self[storage] = self['__dynamic$'+storage];
    });
}