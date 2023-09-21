import Client from "../../../client/client";

export default function init(self: Window | any, __dynamic: any) {
    if (!__dynamic) __dynamic = self.__dynamic;

    __dynamic.define = new self.Proxy(self.Object.defineProperty, {
        apply(t: any, g: any, a: any) {
            try {
                return Reflect.apply(t, g, a);
            } catch(e) {
                return a[2];
            }
        }
    }), __dynamic.defines = new self.Proxy(self.Object.defineProperties, {
        apply(t: any, g: any, a: any) {
            try {
                return Reflect.apply(t, g, a);
            } catch(e) {
                return a[1];
            }
        }
    });

    if (self.parent) __dynamic.parent = self.parent;
    if (self.top) __dynamic.top = self.top;

    if (self.document) __dynamic.elements = {
        attributes: ['src', 'href', 'srcset', 'action', 'data', 'integrity', 'nonce', 'imagesrcset'],
        iframeSrc: Object.getOwnPropertyDescriptor(self.HTMLIFrameElement.prototype, 'src'),
        contentWindow: Object.getOwnPropertyDescriptor(self.HTMLIFrameElement.prototype, 'contentWindow'),
        innerHTML: Object.getOwnPropertyDescriptor(self.Element.prototype, 'innerHTML'),
        outerHTML: Object.getOwnPropertyDescriptor(self.Element.prototype, 'outerHTML'),
        attrValue: Object.getOwnPropertyDescriptor(self.Attr.prototype, 'value'),

        setAttribute: self.Element.prototype.setAttribute,
        getAttribute: self.Element.prototype.getAttribute,
        removeAttribute: self.Element.prototype.removeAttribute,
        hasAttribute: self.Element.prototype.hasAttribute,
        cloneNode: self.Node.prototype.cloneNode,
        addEventListener: self.Node.prototype.addEventListener,
        
        config: [
            {
                "elements": [self.HTMLScriptElement, self.HTMLIFrameElement, self.HTMLEmbedElement, self.HTMLInputElement, self.HTMLTrackElement, self.HTMLMediaElement,self.HTMLSourceElement, self.Image, self.HTMLImageElement],
                "tags": ['src'],
                "action": "url"
            },
            {
                "elements": [self.HTMLSourceElement, self.HTMLImageElement],
                "tags": ['srcset'],
                "action": "srcset"
            },
            {
                "elements": [self.HTMLAnchorElement, self.HTMLLinkElement, self.HTMLAreaElement, self.SVGImageElement, self.HTMLBaseElement],
                "tags": ['href'],
                "action": "url"
            },
            {
                "elements": [self.HTMLIFrameElement],
                "tags": ['contentWindow', 'contentDocument'],
                "action": "window"
            },
            {
                "elements": [self.HTMLFormElement],
                "tags": ['action'],
                "action": "url"
            }, 
            {
                "elements": [self.HTMLObjectElement],
                "tags": ['data'],
                "action": "url",
            },
            {
                "elements": [self.HTMLScriptElement, self.HTMLLinkElement],
                "tags": ['integrity'],
                "action": "rewrite",
                "new": "nointegrity",
            },
            {
                "elements": [self.HTMLScriptElement, self.HTMLLinkElement],
                "tags": ['nonce'],
                "action": "rewrite",
                "new": "nononce",
            },
            {
                "elements": [self.HTMLIFrameElement],
                "tags": ['srcdoc'],
                "action": "html",
            },
            {
                "elements": [self.HTMLElement],
                "tags": ['style'],
                "action": "css"
            },
            {
                "elements": [self.HTMLLinkElement],
                "tags": ['imageSrcset'],
                "action": "srcset"
            },
        ],

        createGetter: (prop: any) => {return {get(this: any): any {return (new URL(this.href||self.__dynamic$location.href) as any)[prop];},set(val: any) {return;}}},
        client: Client
    }, self.__dynamic.baseURL = self.document ? new URL(self.__dynamic.url.decode(self.document.baseURI)) : null;

    if (self.document) __dynamic.cookie = {
        str: self.__dynamic$cookie||'',
        desc: Object.getOwnPropertyDescriptor(self.Document.prototype, 'cookie')
    };

    if (self.XMLHttpRequest) __dynamic.http = {
        XMLResponseURL: Object.getOwnPropertyDescriptor(self.XMLHttpRequest.prototype, 'responseURL'),
        ResponseURL: Object.getOwnPropertyDescriptor(self.Response.prototype, 'url'),
        RequestURL: Object.getOwnPropertyDescriptor(self.Request.prototype, 'url'),
        XMLHttpRequest: self.XMLHttpRequest,
    }

    if (self.Storage) (__dynamic.storage = {
        localStorage: self.localStorage,
        sessionStorage: self.sessionStorage,
        keys: {
            localStorage: Object.keys(self.localStorage),
            sessionStorage: Object.keys(self.sessionStorage)
        },
        methods: ['getItem', 'setItem', 'removeItem', 'clear', 'length', 'keys', 'values', 'entries', 'forEach', 'hasOwnProperty', 'toString', 'toLocaleString', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor', 'key'],
    }, __dynamic.storage.cloned = {
        localStorage: __dynamic.util.clone(__dynamic.storage.localStorage),
        sessionStorage: __dynamic.util.clone(__dynamic.storage.sessionStorage)
    });

    if (self.RTCPeerConnection) __dynamic.webrtc = {
        endpoints: [
            'stun:stun.webice.org'
        ]
    }

    if (self.trustedTypes) __dynamic.trustedTypes = {
        policy: self.trustedTypes.createPolicy('dynamic', {
            createHTML: (s: any) => s,
            createScript: (s: any) => s,
            createScriptURL: (s: any) => s,
            createURL: (s: any) => s,
        }),
        createScript: self.TrustedTypePolicy.prototype.createScript,
    }

    if (self.__dynamic$config.tab) {
        if (self.document && self.__dynamic$config.tab['title']) {
            document.title = self.__dynamic$config.tab.title;
            __dynamic.define(self.document, 'title', {
                get() {
                    return self.__dynamic$config.tab.title;
                },
                set(val: any) {
                    return val;
                }
            });
        }

        if (self.__dynamic$config.tab['icon']) {
            self.__dynamic$icon = self.__dynamic$config.tab.icon;
        }

        if (self.Navigator && self.__dynamic$config.tab['ua']) {
            __dynamic.define(self.navigator, 'userAgent', {
                get() {
                    return self.__dynamic$config.tab.ua;
                },
                set() {}
            });
        }
    }
}