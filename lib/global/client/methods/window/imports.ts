export default function imports(self: any) {
    self.importScripts = new Proxy(self.importScripts, {
        apply(t, g, a: Array<string>): void {
            [...a].forEach((url, index) => {
                a[index] = self.__dynamic.url.encode(url, self.__dynamic.meta);
            });

            return Reflect.apply(t, g, a);
        }
    });

    self.__dynamic.define(self.__dynamic, '_location', {
        value: self.location as Location,
        writable: true
    });

    self.__dynamic.define(self.WorkerGlobalScope.prototype, 'location', {
        get(): Location {
            return self.__dynamic.location;
        },
        set(value: string): string {
            return value;
        }
    });

    self.location = self.__dynamic.location;
}