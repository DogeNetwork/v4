export default function message(self: Window | any) {
  const isWorker = (s: any) => s.constructor.name=='Worker' || s.constructor.name=='MessagePort' || self.constructor.name=='DedicatedWorkerGlobalScope';
  const isTarget = (s: any) => s.constructor.name=="Window" || s.constructor.name=='global';
  const getWindow = (name: any, location: any) => Object.keys(window || {}).map(e=>parseInt(e)).filter(e=>isFinite(e)).map(e=>window[e]).filter(e=>e||false).find((e: any)=>{try{return e.name == name && e.location.href == location} catch {return false;}});

  self.__dynamic$message = function(target: Window & any, origin: Window | null & any = top) {
    if (!target) target = self;

    function __d$Send(): void {
        var args = arguments;

        if (isWorker(target) || !isTarget(target))
          return target.postMessage.call(target, ...args);

        if (target.__dynamic$self) target = target.__dynamic$self;

        return (target._postMessage || target.postMessage).call(target, ...[[args[0], origin.__dynamic$location.origin, origin.location.href, origin.name, origin !== self], '*', args[2]||[]]);
    }

    return __d$Send;
  }

  if (self.constructor.name == 'Window') {
    if (self.addEventListener) self.addEventListener = new Proxy(self.addEventListener, {
      apply(t, g, a: Array<Function | string | null>): void {
        if (g==self.__dynamic$window) g = self;
        if (!a[1] || !a[0] || typeof a[1] != 'function') return Reflect.apply(t, g, a);
  
        if (a[0]=='message') {
          var o = a[1].bind({});
  
          a[1] = function(event: MessageEvent | any) {
            return o(cloneEvent(event));
          }
        }
  
        return Reflect.apply(t, g, a);
      }
    });

    if (self.constructor.name == 'Window') self.__dynamic.define(self, 'onmessage', {
      get(): Function | null {
        return self._onmessage || null;
      },
      set(val: Function | null): Function | null {
        if (self._onmessage) {self.removeEventListener('message', self._onmessage)}
  
        self.addEventListener('message', val);;
        return self._onmessage = val;
      }
    });
  }

  function cloneEvent(event: MessageEvent | any): MessageEvent {
      const cloned = self.__dynamic.util.clone(event);

      let _window: any;

      if (event.source) _window = getWindow(event.data[3], event.data[2]) || event.currentTarget;

      self.__dynamic.define(cloned, 'isTrusted', {
        value: true,
        writable: false,
      });

      if (event.origin) {
        if (Array.isArray(event.data) && event.data.length == 5) self.__dynamic.define(cloned, 'origin', {
          value: event.data[1],
          writable: false,
        }); else self.__dynamic.define(cloned, 'origin', {
          value: event.origin,
          writable: false,
        });
      }

      if (event.data) {
        if (Array.isArray(event.data) && event.data.length == 5) self.__dynamic.define(cloned, 'data', {
          value: event.data[0],
          writable: false,
        }); else self.__dynamic.define(cloned, 'data', {
          value: event.data,
          writable: false,
        });
      }

      if (event.source) {
        if (_window) {
          self.__dynamic.define(cloned, 'source', {
            value: _window?.__dynamic$window || _window,
            writable: true,
          });
        } else {
          self.__dynamic.define(cloned, 'source', {
            value: _window || (Array.isArray(event.data) && event.data.length == 3 && event.data[2] === true) ? event.source : event.currentTarget,
            writable: true,
          });
        };
      }

      for (var i in event) {
        switch(i) {
          default:
            if (i !== 'isTrusted' && i !== 'origin' && i !== 'data' && i !== 'source') {
              self.__dynamic.define(cloned, i, {
                value: event[i],
                writable: false,
              });
            }
            
            break;
        }
      }
      
      return cloned;
  }
}