export default class Node {
    Original: Object | any | null = null;
    ctx: any;

    constructor(element: Element, ctx: any) {
        this.Original = element;

        var that = this;

        this.Original.attribs = new Proxy(this.Original.attribs||{}, {
            set: (target:any, prop: string, value:any): any => {
                var a = target[prop] = value;

                that.Original.attrs = Object.keys(target).map((key:any) => {
                    return {
                        name: key,
                        value: target[key] + ''
                    }
                });

                return a || (a + ' ');
            },
            deleteProperty: (target: any, prop: string): any => {
                var a = delete target[prop];

                that.Original.attrs = Object.keys(target).map((key:any) => {
                    return {
                        name: key,
                        value: target[key]
                    }
                });

                return a;
            }
        });

        this.ctx = ctx;
    }

    getAttribute(attr: string) {
        if (!this.Original.attribs) return false;

        return (typeof this.Original.attribs[attr] == 'undefined' ? null : this.Original.attribs[attr].trim());
    }

    setAttribute(attr: string, value: any) {
        if (!this.Original.attribs) return false;

        return this.Original.attribs[attr] = value;
    }

    removeAttribute(attr: string) {
        if (!this.Original.attribs) return false;

        return delete this.Original.attribs[attr];
    }

    hasAttribute(attr: string) {
        if (!this.Original.attribs) return false;

        return this.Original.attribs.hasOwnProperty(attr);
    }
}