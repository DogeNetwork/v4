export default function policy(self: Window | any) {
    // This breaks Google Login
    
    /*self.TrustedTypePolicy.prototype.createScript = self.__dynamic.wrap(self.TrustedTypePolicy.prototype.createScript,
        function(this: any, target: Function, ...args: Array<string>) {
            let script = Reflect.apply(target, this, [...args]);

            script = self.__dynamic.rewrite.js.rewrite(script.toString(), {type: 'module'}, false, self.__dynamic);

            return self.__dynamic.trustedTypes.createScript.call(self.__dynamic.trustedTypes.policy, script);
        }
    );*/
}