export default function Get(self: Window | any) {
    self.__dynamic$get = function(object: any) {
        var data: any = self.__dynamic.fire('get', [object]);
        if (data) return data;

        try {
            if (object==self.parent) return self.parent.__dynamic$window;
            if (object==self.top) return self.top.__dynamic$window;

            if (object == self.location) {
                return self.__dynamic$location;
            }

            if (self.Location || self.WorkerLocation) if (object instanceof (self.Location || self.WorkerLocation)) {
                return self.__dynamic$location;
            }

            if (self.Document) if (object instanceof self.Document) {
                return self.__dynamic$document;
            }

            if (object == self) return self.__dynamic$window;

            if (typeof object == 'function') {
                if (object.name == '__d$Send') return self.__dynamic$message(object.target, self);
            }

            return object;
        } catch(e) {
            return object;
        }
    }

    self.__dynamic$property = function(prop: any) {
        if (typeof prop !== "string") {
            return prop;
        }

        if (prop == 'location') return '__dynamic$location';
        if (prop == 'eval') return '__dynamic$eval';

        return prop;
    }

    self.__dynamic$set = function(object: any, value: any) {
        if (!object) return value;

        return self.__dynamic.url.encode(self.__dynamic.meta.href.replace(self.__dynamic.property['href'], value), self.__dynamic.property);
    }

    self.__dynamic$var = function(object: any, value: any) {
        return window[value] = object;
    }

    self.dg$ = self.__dynamic$get;
    self.ds$ = self.__dynamic$set;
    self.dp$ = self.__dynamic$property;
    self.dv$ = self.__dynamic$var;
    self.d$g_ = self.__dynamic$get;
    self.d$s_ = self.__dynamic$set;
    self.d$p_ = self.__dynamic$property;
    self.d$v_ = self.__dynamic$var;
}