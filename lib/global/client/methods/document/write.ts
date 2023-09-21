export default function write(self: any) {
    function handler(this: Document, handler: Function, ...args: Array<string>): undefined {
        for (var arg in args) {
            args[arg] = self.__dynamic.rewrite.dom(args[arg], self.__dynamic.meta);
        }

        return handler.apply(this, args);
    };

    ["write", "writeln"].forEach(method => {
        self.document[method] = self.__dynamic.wrap(self.document[method],
            handler,
            `document.${method}`
        );
    });
}