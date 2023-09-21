export default function wrap(self: Window | any) {
    self.__dynamic.wrap = function(target: any, handler: any, result: any) {
        if (target.__dynamic$target) return target;
        
        if (target.toString().includes('{ [native code] }') && !target.prototype) {
            var g = handler;
            var t = target;
            var f: any = function(this: any, ...a: any[]) {
                if (typeof result == 'string') {
                    var event = self.__dynamic.fire(result, this ? [this, ...a] : a);
                    if (event) return event;
                }

                var v = g.call(this, t, ...a);
                return v;
            }

            var func: any = function(this: any, ...a: any[]) {return f.call(this, ...a)};

            self.__dynamic.define(func, 'name', {
                value: target.name,
                writable: false,
            });

            func.__dynamic$target = target;

            func.toString = () => {return `function ${target.name}() { [native code] }`}

            return func;
        } else {
            try {
                const p = class extends target {
                    constructor(...args: any[]) {
                        var og = [...args];

                        var handled = handler.call(target, target, ...args);

                        if (handled) args = handled;

                        super(...args);

                        if (result) result(this, og)
                    }
                }

                Object.defineProperty(p, 'name', {
                    value: target.name,
                    writable: false,
                });

                return p;
            } catch(e) {
                return target;
            }
        }
    }
}