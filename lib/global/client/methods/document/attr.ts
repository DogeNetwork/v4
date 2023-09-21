export default function attributes(self: Window | any) {
    const sanitize = (html: string): string => new DOMParser().parseFromString(html, 'text/html').body.innerHTML;

    self.__dynamic.elements.config.forEach((config: any) => {
        config.elements.forEach((element: any) => {
            config.tags.forEach((tag: string) => {
                var descriptor: PropertyDescriptor | any = Object.getOwnPropertyDescriptor(element.prototype, tag);
                if (!descriptor) descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, tag);

                if (typeof element.prototype.setAttribute.__dynamic$target == 'undefined') {
                    element.prototype.setAttribute = self.__dynamic.wrap(element.prototype.setAttribute,
                        function(this: HTMLElement, target: Function, ...args: Array<string>): undefined {
                            if (this instanceof HTMLLinkElement && self.__dynamic$icon) {
                                if (args[0].toLowerCase() == 'href' && (this.rel == 'icon' || this.rel == 'shortcut icon')) {
                                    args[1] = self.__dynamic$icon;

                                    return Reflect.apply(target, this, args);
                                }
                            }

                            if (self.__dynamic.elements.attributes.indexOf(args[0].toLowerCase())==-1) return Reflect.apply(target, this, args);

                            if (args[0].toLowerCase()=='srcset' || args[0].toLowerCase() == 'imagesrcset') {
                                this.dataset[`dynamic_${args[0]}`] = args[1];
                                args[1] = self.__dynamic.rewrite.srcset.encode(args[1], self.__dynamic);

                                return Reflect.apply(target, this, args);
                            }

                            if (args[0].toLowerCase()=='integrity'||args[0].toLowerCase()=='nonce') {
                                this.dataset[`dynamic_${args[0]}`] = args[1];
                                this.removeAttribute(args[0]);

                                return Reflect.apply(target, this, ['nointegrity', args[1]]);
                            }

                            this.dataset[`dynamic_${args[0]}`] = args[1];
                            args[1] = self.__dynamic.url.encode(args[1], self.__dynamic.baseURL || self.__dynamic.meta);

                            return Reflect.apply(target, this, args);
                        },
                        'setAttribute'
                    );

                    element.prototype.setAttributeNS = self.__dynamic.wrap(element.prototype.setAttributeNS,
                        function(this: HTMLElement, target: Function, ...args: Array<string>): undefined {
                            if (this instanceof HTMLLinkElement && self.__dynamic$icon) {
                                if (args[1].toLowerCase() == 'href' && (this.rel == 'icon' || this.rel == 'shortcut icon')) {
                                    args[2] = self.__dynamic$icon;

                                    return Reflect.apply(target, this, args);
                                }
                            }

                            if (self.__dynamic.elements.attributes.indexOf(args[1].toLowerCase())==-1) return Reflect.apply(target, this, args);

                            if (args[1].toLowerCase()=='srcset' || args[1].toLowerCase() == 'imagesrcset') {
                                this.dataset[`dynamic_${args[1]}`] = args[2];
                                args[2] = self.__dynamic.rewrite.srcset.encode(args[2], self.__dynamic);

                                return Reflect.apply(target, this, args);
                            }

                            if (args[1].toLowerCase()=='integrity'||args[1].toLowerCase()=='nonce') {
                                this.dataset[`dynamic_${args[1]}`] = args[2];
                                this.removeAttribute(args[1]);

                                return Reflect.apply(target, this, ['nointegrity', args[2]]);
                            }

                            this.dataset[`dynamic_${args[1]}`] = args[2];
                            args[2] = self.__dynamic.url.encode(args[2], self.__dynamic.baseURL || self.__dynamic.meta);

                            return Reflect.apply(target, this, args);
                        },
                        'setAttributeNS'
                    );

                    element.prototype.getAttribute = self.__dynamic.wrap(element.prototype.getAttribute,
                        function(this: HTMLElement, target: Function, ...args: Array<string>): string | undefined {
                            if (this.dataset[`dynamic_${args[0]}`]) return this.dataset[`dynamic_${args[0]}`];

                            return Reflect.apply(target, this, args);
                        },
                        'getAttribute'
                    );

                    element.prototype.getAttributeNS = self.__dynamic.wrap(element.prototype.getAttributeNS, 
                        function(this: HTMLElement, target: Function, ...args: Array<string>): string | undefined {
                            if (this.dataset[`dynamic_${args[1]}`]) return this.dataset[`dynamic_${args[1]}`];

                            return Reflect.apply(target, this, args);
                        },
                        'getAttributeNS'
                    );
                }


                self.__dynamic.define(element.prototype, tag, {
                    get(): string {
                        if (config.action=='window') {
                            const _window: any = self.__dynamic.elements.contentWindow.get.call(this);

                            let origin = true;

                            try {
                                _window.location.href
                            } catch {origin = false;};

                            if (origin) if (!_window.__dynamic) {
                                self.__dynamic.elements.client(_window, self.__dynamic$config, decodeURIComponent(this.src));
                            }

                            if (tag=='contentDocument') {
                                return _window.document;
                            }

                            if (tag=='contentWindow') {
                                return origin ? (_window.__dynamic$window || _window) : _window;
                            }
                        }

                        if (config.action=='css') {
                            return descriptor.get.call(this);
                        }

                        try {
                            return self.__dynamic.url.decode(descriptor.get.call(this));
                        } catch {};

                        return descriptor.get.call(this);
                    },
                    set(val: string): any {
                        if (val && typeof val == 'string') val = val.toString();

                        if (tag == 'href' && this instanceof HTMLLinkElement && self.__dynamic$icon && (this.rel == 'icon' || this.rel == 'shortcut icon')) {
                            this.dataset[`dynamic_${tag}`] = val;

                            val = self.__dynamic$icon;
                        }

                        if (config.action=='html') {
                            Promise.resolve(self.__dynamic.createBlobHandler(new Blob([val], {type: 'text/html'}), this, val)).then((url: string) => {this.setAttribute(tag, url);});

                            return val;
                        }

                        if (config.action=='srcset') {
                            val = self.__dynamic.rewrite.srcset.encode(val, self.__dynamic);
                        }

                        if (config.action=='rewrite') {
                            this.dataset[`dynamic_${tag}`] = val;
                            this.removeAttribute(tag);

                            return this.setAttribute(config.new, val);
                        }

                        if (config.action=='css') {
                            val = self.__dynamic.rewrite.css.rewrite(val, self.__dynamic.meta);
                        }

                        if (config.action=='url') val = self.__dynamic.url.encode(val, self.__dynamic.baseURL || self.__dynamic.meta);


                        this.dataset[`dynamic_${tag}`] = val;
                        return descriptor.set.call(this, val);
                    }
                })
            })
        })
    });

    ['innerHTML', 'outerHTML'].forEach(tag => {
        self.__dynamic.define(self.HTMLElement.prototype, tag, {
            get(): string {
                return (this['__'+tag]||self.__dynamic.elements[tag].get.call(this)).toString(); 
            },
            set(val: string): string {
                this['__'+tag] = sanitize(val);

                if (this instanceof self.HTMLTextAreaElement) return self.__dynamic.elements[tag].set.call(this, val);
                if (this instanceof self.HTMLScriptElement) return self.__dynamic.elements[tag].set.call(this, self.__dynamic.rewrite.js.rewrite(val, {type: 'script'}));
                if (this instanceof self.HTMLStyleElement) return self.__dynamic.elements[tag].set.call(this, self.__dynamic.rewrite.css.rewrite(val, self.__dynamic.meta));

                return self.__dynamic.elements[tag].set.call(this, self.__dynamic.rewrite.dom(val, self.__dynamic.meta));
            }
        });
    });

    ["MutationObserver", "ResizeObserver", "IntersectionObserver"].forEach(observer => {
        self[observer].prototype.observe = self.__dynamic.wrap(self[observer].prototype.observe,
            function(this: MutationObserver | ResizeObserver | IntersectionObserver, target: Function, ...args: Array<string>): undefined {
                if (args[0]==self.__dynamic$document) args[0] = self.document;

                return Reflect.apply(target, this, args);
            },
            observer + '.prototype.observe'
        );
    });

    self.__dynamic.defines(self.HTMLAnchorElement.prototype, {
        pathname: self.__dynamic.elements.createGetter('pathname'),
        origin: self.__dynamic.elements.createGetter('origin'),
        host: self.__dynamic.elements.createGetter('host'),
        hostname: self.__dynamic.elements.createGetter('hostname'),
        port: self.__dynamic.elements.createGetter('port'),
        protocol: self.__dynamic.elements.createGetter('protocol'),
        search: self.__dynamic.elements.createGetter('search'),
        hash: self.__dynamic.elements.createGetter('hash'),

        toString: {get: function(this: HTMLAnchorElement & {__toString: any}) {return this.__toString || (() => this.href?(new URL(this.href) as any).toString():'')}, set: function(this: HTMLAnchorElement & {__toString: any}, v: Function) {this.__toString = v;}},
    });

    self.HTMLElement.prototype.insertAdjacentHTML = self.__dynamic.wrap(self.HTMLElement.prototype.insertAdjacentHTML,
        function(this: HTMLElement, target: Function, ...args: Array<string>): undefined {
            if (this instanceof self.HTMLStyleElement) return Reflect.apply(target, this, [args[0], self.__dynamic.rewrite.css.rewrite(args[1], self.__dynamic.meta)]);
            if (this instanceof self.HTMLScriptElement) return Reflect.apply(target, this, [args[0], self.__dynamic.rewrite.js.rewrite(args[1], {type: 'script'}, false, self.__dynamic)]);
            if (this instanceof self.HTMLTextAreaElement) return Reflect.apply(target, this, args);

            return Reflect.apply(target, this, [args[0], self.__dynamic.rewrite.html.rewrite(args[1], self.__dynamic.meta)]);
        },
        'insertAdjacentHTML'
    );

    [[self.Node, 'textContent'], [self.HTMLElement, 'innerText']].forEach(([el, attr]: any) => {
        var desc: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(el.prototype, attr);

        function get(this: HTMLScriptElement | HTMLStyleElement & any) {
            return this['__'+attr] || (desc?.get && desc.get.call(this));
        }

        self.__dynamic.define(self.HTMLStyleElement.prototype, attr, {
            get,
            set(this: HTMLStyleElement | any, val: any) : any {
                this['__'+attr] = val;

                return desc?.set && desc.set.call(this, self.__dynamic.rewrite.css.rewrite(val, self.__dynamic.meta));
            }
        });

        self.__dynamic.define(self.HTMLScriptElement.prototype, attr, {
            get,
            set(val: any) {
                this['__'+attr] = val;

                if (this.type !== null || this.type !== 'application/javascript' || this.type !== 'text/javascript' || this.type !== 'application/x-javascript') return desc?.set && desc.set.call(this, val);

                return desc?.set && desc.set.call(this, self.__dynamic.rewrite.js.rewrite(val, {type: 'script'}, false, self.__dynamic));
            }
        });
    });

    self.Text.prototype.toString = function(this: Text): string | null {
        return this.textContent;
    }

    self.document.createElement = self.__dynamic.wrap(self.document.createElement,
        function(this: Document, target: Function, ...args: Array<string>): HTMLElement & { src: any, rewritten: any } {
            var element: HTMLElement & { src: any, rewritten: any } = Reflect.apply(target, this, args);
            element.rewritten = true;

            if (args[0].toLowerCase() == 'iframe') {
                element.src = 'about:blank';
            }

            return element;
        },
        'createElement'
    );

    if (!document.querySelector('link[rel="icon"], link[rel="shortcut icon"]')) {
        var link: HTMLLinkElement = document.createElement('link');
        link.rel = 'icon';
        link.href = (self.__dynamic$icon || '/favicon.ico') + '?dynamic';

        link.dataset['dynamic_hidden'] = 'true';

        document.head.appendChild(link);
    }

    self.__dynamic.define(self.Attr.prototype, 'value', {
        get(): string | null {
            return this.__value || self.__dynamic.elements.attrValue.get.call(this);
        },
        set(val: any): any {
            this.__value = val;

            if (this.name == 'href' || this.name == 'src') return self.__dynamic.elements.attrValue.set.call(this, self.__dynamic.url.encode(val, self.__dynamic.meta));
            if (this.name == 'style') return self.__dynamic.elements.attrValue.set.call(this, self.__dynamic.rewrite.css.rewrite(val, self.__dynamic.meta));
            if (this.name == 'onclick') return self.__dynamic.elements.attrValue.set.call(this, self.__dynamic.rewrite.js.rewrite(val, {type: 'script'}, false, self.__dynamic));

            return self.__dynamic.elements.attrValue.set.call(this, val);
        }
    });
}