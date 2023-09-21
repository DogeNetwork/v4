export default function style(self: any) {
    self.CSSStyleDeclaration.prototype._setProperty = self.CSSStyleDeclaration.prototype.setProperty;

    self.CSSStyleDeclaration.prototype.setProperty = self.__dynamic.wrap(self.CSSStyleDeclaration.prototype.setProperty,
        function(this: CSSStyleDeclaration, handler: Function, ...args: Array<string>): undefined {
            if (args[0] == 'background-image' || args[0] == 'background' || args[0] == 'backgroundImage') args[1] = self.__dynamic.rewrite.css.rewrite(args[1], self.__dynamic.meta);

            return handler.apply(this, args);
        },
        'CSSStyleDeclaration.prototype.setProperty'
    );

    self.__dynamic.define(self.CSSStyleDeclaration.prototype, 'background', {
        get(): string | null {
            if (this._background) return this._background;

            return this.getPropertyValue('background');
        },
        set(val: string): string | null {
            this._background = val;

            return this._setProperty('background', self.__dynamic.rewrite.css.rewrite(val, self.__dynamic.meta));
        }
    });

    self.__dynamic.define(self.CSSStyleDeclaration.prototype, 'backgroundImage', {
        get(): string | null {
            if (this._backgroundImage) return this._backgroundImage;

            return this.getPropertyValue('background-image');
        },
        set(val: string): string | null {
            this._backgroundImage = val;

            return this._setProperty('background-image', self.__dynamic.rewrite.css.rewrite(val, self.__dynamic.meta));
        }
    });

    self.__dynamic.define(self.CSSStyleDeclaration.prototype, 'background-image', {
        get(): string | null {
            if (this._backgroundImage) return this._backgroundImage;

            return this.getPropertyValue('background-image');
        },
        set(val: string): string | null {
            this._backgroundImage = val;

            return this._setProperty('background-image', self.__dynamic.rewrite.css.rewrite(val, self.__dynamic.meta));
        }
    });
}