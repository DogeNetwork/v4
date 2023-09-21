import { Element } from "domhandler";
import html from "./html";

declare const self: Window | any;

export default function GenerateHead(this: html, scriptURL: string, configURL: string, mutationURL: string, cookies: string | null, script: string = '', object: boolean = false, bare: string = '') {
    if (self.__dynamic$config) {
        var cache = self.__dynamic$config.mode == 'development';
    } else var cache = false;

    if (object) {
        var head: Array<Object> = [
            {nodeName: 'script', tagName: 'script', namespaceURI: 'http://www.w3.org/1999/xhtml', childNodes: [], attrs: [{name: 'src', value: scriptURL+(cache?'?'+Math.floor(Math.random()*(99999-10000)+10000):'')}]},
            {nodeName: 'script', tagName: 'script', namespaceURI: 'http://www.w3.org/1999/xhtml', childNodes: [], attrs: [{name: 'src', value: configURL+(cache?'?'+Math.floor(Math.random()*(99999-10000)+10000):'')}]},
        ];
    
        if (this.ctx.config.assets.files.inject) head.unshift({nodeName: 'script', tagName: 'script', namespaceURI: 'http://www.w3.org/1999/xhtml', childNodes: [], attrs: [{name: 'src', value: this.ctx.config.assets.files.inject+(cache?'?'+Math.floor(Math.random()*(99999-10000)+10000):'')}]});
        if (cookies) head.unshift({nodeName: 'script', tagName: 'script', namespaceURI: 'http://www.w3.org/1999/xhtml', childNodes: [], attrs: [{name: 'src', value: 'data:application/javascript;base64,'+btoa(`self.__dynamic$cookies = atob("${btoa(cookies)}");document.currentScript?.remove();`)}]});
        if (script) head.unshift({nodeName: 'script', tagName: 'script', namespaceURI: 'http://www.w3.org/1999/xhtml', childNodes: [], attrs: [{name: 'src', value: 'data:application/javascript;base64,'+btoa(script+';document.currentScript?.remove();')}]});
        if (bare) head.unshift({nodeName: 'script', tagName: 'script', namespaceURI: 'http://www.w3.org/1999/xhtml', childNodes: [], attrs: [{name: 'src', value: 'data:application/javascript;base64,'+btoa(bare+';document.currentScript?.remove();')}]});
    
        return head;
    } else {
        var array: Array<Object> = [
            `<script src="${configURL+(cache?'?'+Math.floor(Math.random()*(99999-10000)+10000):'')}"></script>`,
            //`<script src="${mutationURL+(cache?'?'+Math.floor(Math.random()*(99999-10000)+10000):'')}"></script>`,
            `<script src="${scriptURL+(cache?'?'+Math.floor(Math.random()*(99999-10000)+10000):'')}"></script>`,
        ]

        if (this.ctx.config.assets.files.inject) array.unshift(`<script src="${this.ctx.config.assets.files.inject+(cache?'?'+Math.floor(Math.random()*(99999-10000)+10000):'')}"></script>`);
        if (cookies) array.unshift(`<script src="${'data:application/javascript;base64,'+btoa(`self.__dynamic$cookies = atob("${btoa(cookies)}");document.currentScript?.remove();`)}"></script>`);
        if (script) array.unshift(`<script src="${'data:application/javascript;base64,'+btoa(script+';document.currentScript?.remove();')}"></script>`);
        if (bare) array.unshift(`<script src="${'data:application/javascript;base64,'+btoa(bare+';document.currentScript?.remove();')}"></script>`);

        return array;
    }
    
    /*if (self.__dynamic$config) {
        var cache = self.__dynamic$config.mode == 'development';
    } else var cache = false;

    var head: Array<Object> = [
        {nodeName: 'script', tagName: 'script', namespaceURI: 'http://www.w3.org/1999/xhtml', childNodes: [], attrs: [{name: 'src', value: scriptURL+(cache?'?'+Math.floor(Math.random()*(99999-10000)+10000):'')}]},
        {nodeName: 'script', tagName: 'script', namespaceURI: 'http://www.w3.org/1999/xhtml', childNodes: [], attrs: [{name: 'src', value: configURL+(cache?'?'+Math.floor(Math.random()*(99999-10000)+10000):'')}]},
    ];

    if (this.ctx.config.assets.files.inject) head.unshift({nodeName: 'script', tagName: 'script', namespaceURI: 'http://www.w3.org/1999/xhtml', childNodes: [], attrs: [{name: 'src', value: this.ctx.config.assets.files.inject+(cache?'?'+Math.floor(Math.random()*(99999-10000)+10000):'')}]});
    if (cookies) head.unshift({nodeName: 'script', tagName: 'script', namespaceURI: 'http://www.w3.org/1999/xhtml', childNodes: [], attrs: [{name: 'src', value: 'data:application/javascript;base64,'+btoa(`self.__dynamic$cookies = atob("${btoa(cookies)}");document.currentScript?.remove();`)}]});
    if (script) head.unshift({nodeName: 'script', tagName: 'script', namespaceURI: 'http://www.w3.org/1999/xhtml', childNodes: [], attrs: [{name: 'src', value: 'data:application/javascript;base64,'+btoa(script+';document.currentScript?.remove();')}]});

    return head;*/

    
    /*var array: Array<Object> = [
        new Element('script', {src: scriptURL+(cache?'?'+Math.floor(Math.random()*(99999-10000)+10000):'')}),
        new Element('script', {src: configURL+(cache?'?'+Math.floor(Math.random()*(99999-10000)+10000):'')}),
    ]

    if (cookies) array.unshift(new Element('script', {src: 'data:application/javascript;base64,'+btoa(`self.__dynamic$cookies = atob("${btoa(cookies)}");document.currentScript?.remove();`)}, []));
    if (script) array.unshift(new Element('script', {src: 'data:application/javascript;base64,'+btoa(script+';document.currentScript?.remove();')}, []));

    return array;*/
}