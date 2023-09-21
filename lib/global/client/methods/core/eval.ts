export default function Eval(self: Window | any) {
    self.__dynamic.eval = self.__dynamic.wrap(eval, function(this: Window, handler: Function, ...args: Array<string>): any {
        if (!args.length) return;

        var script = args[0].toString();
        script = self.__dynamic.rewrite.js.rewrite(script, {type: 'script'}, false, self.__dynamic);

        return handler.apply(this, [script]);
    }, 'eval');

    self.__dynamic.define(self.Object.prototype, '__dynamic$eval', {
            get() {
                return this === window ? self.__dynamic.eval : this.eval;
            },
            set(val: any) {
                return val;
            },
        }
    );

    self.__dynamic$wrapEval = function(script: string): string {
        if (!arguments.length) return arguments[0];

        var event: any = self.__dynamic.fire('eval', [self, script]);
        if (event) return event;
        
        script = self.__dynamic.rewrite.js.rewrite(script, {type: 'script'}, false, self.__dynamic);

        return script;
    }
}