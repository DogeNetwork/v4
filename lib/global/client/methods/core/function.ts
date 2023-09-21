export default function Function(self: Window | any) {
    var _toString: Function = self.Function.prototype.toString;

    self.__dynamic.Function = self.Function.bind({});

    self.__dynamic.define(self.Function.prototype, '_toString', {
        get(this: any) {
            return _toString;
        },
        set: () => {}
    });

    var string = function(this: Function): string {
        try {
            var string: string | any = Reflect.apply(_toString, this, []);
        } catch(e) {
            return `function ${this.name}() { [native code] }`;
        }

        if (string.includes('[native code]')) {
            return `function ${this.name}() { [native code] }`;
        }

        return string;
    }

    self.__dynamic.define(self.Function.prototype, 'toString', {
        get(this: any) {
            return this.__toString || string;
        },
        set(val: any) { this.__toString = val; } 
    });

    self.Function = new Proxy(self.Function, {
        apply(t, g, a: Array<string>): Function {
            var args: Array<string> = [...a];
            var body: string | undefined = args.pop();

            body = `(function anonymous(${args.toString()}) {${body}})`;
            body = self.__dynamic.rewrite.js.rewrite(body, {type: 'script'}, false, self.__dynamic);

            return self.eval(body);
        },
        construct(t, a: Array<string>): Function {
            var args: Array<string> = [...a];
            var body: string | undefined = args.pop();

            body = `(function anonymous(${args.toString()}) {${body}})`;
            body = self.__dynamic.rewrite.js.rewrite(body, {type: 'script'}, false, self.__dynamic);

            return self.eval(body);
        }
    });

    self.Function.prototype.apply = self.__dynamic.wrap(self.Function.prototype.apply,
        function(this: any, handler: Function, ...args: Array<any>): any {
            if (args[0] == self.__dynamic$window) args[0] = args[0].__dynamic$self;
            if (args[0] == self.__dynamic$document) args[0] = self.document;

            return Reflect.apply(handler, this, args);
        },
        'Function.prototype.apply'
    );

    self.Function.prototype.call = new Proxy(self.Function.prototype.call, {
        apply(t, g, a: any): any {
            if (a[0] == self.__dynamic$window) a[0] = a[0].__dynamic$self;
            if (a[0] == self.__dynamic$document) a[0] = self.document;
        
            return Reflect.apply(t, g, a);
        }
    });

    self.Function.prototype.bind = self.__dynamic.wrap(self.Function.prototype.bind,
        function(this: any, handler: Function, ...args: Array<any>): Function {
            if (args[0] == self.__dynamic$window) args[0] = args[0].__dynamic$self;
            if (args[0] == self.__dynamic$document) args[0] = self.document;

            return handler.apply(this, args);
        },
        'Function.prototype.bind'
    );
}