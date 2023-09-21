export default function history(self: Window | any) {
    self.__dynamic$history = function(this: History, target: Function, ...args: Array<string | null>): void {
        if (args[2]) args[2] = self.__dynamic.url.encode(args[2], self.__dynamic.meta);

        self.__dynamic.Reflect.apply(target, this, args) as undefined;

        self.__dynamic.client.location(self, true, false);

        return;
    }
    
    self.History.prototype.pushState = self.__dynamic.wrap(self.History.prototype.pushState, self.__dynamic$history);
    self.History.prototype.replaceState = self.__dynamic.wrap(self.History.prototype.replaceState, self.__dynamic$history);
}