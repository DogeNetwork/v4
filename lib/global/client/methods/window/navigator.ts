export default function navigator(self: Window | any) {
    if ('serviceWorker' in self.navigator) {
        self.__dynamic.sw = self.navigator.serviceWorker;

        delete self.navigator.serviceWorker;
        delete self.Navigator.prototype.serviceWorker;
    }

    self.navigator.sendBeacon = self.__dynamic.wrap(self.navigator.sendBeacon,
        function(this: Navigator, target: Function, ...args: Array<string>): Boolean {
            if (args[0]) {
                args[0] = self.__dynamic.url.encode(args[0], self.__dynamic.meta);
            }

            return Reflect.apply(target, this, args) as boolean;
        },
        'navigator.sendBeacon'
    );
}