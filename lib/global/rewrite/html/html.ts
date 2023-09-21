import Srcset from './srcset';
import Node from './nodewrapper';
import MetaURL from '../../meta/type';
import generateHead from './generateHead';
import { Element } from 'parse5/dist/tree-adapters/default';
import DynamicRewrites from '../../rewrite';

export default class html {

  ctx: any;

  generateHead: Function = generateHead;

  config: Array<Object> = [
    {
      "elements": "all",
      "tags": ['style'],
      "action": "css"
    },
    {
      "elements": ['script', 'iframe', 'embed', 'input', 'track', 'media', 'source', 'img', 'a', 'link', 'area', 'form', 'object'],
      "tags": ['src', 'href', 'action', 'data'],
      "action": "url"
    },
    {
      "elements": ['source', 'img'],
      "tags": ['srcset'],
      "action": "srcset"
    },
    /*{
        "elements": ['a', 'link', 'area'],
        "tags": ['href'],
        "action": "url"
    },
    {
        "elements": ['form'],
        "tags": ['action'],
        "action": "url"
    }, 
    {
        "elements": ['object'],
        "tags": ['data'],
        "action": "url",
    },*/
    {
      "elements": ['script', 'link'],
      "tags": ['integrity'],
      "action": "rewrite",
      "new": "nointegrity",
    },
    {
      "elements": ['script', 'link'],
      "tags": ['nonce'],
      "action": "rewrite",
      "new": "nononce",
    },
    {
      "elements": ['meta'],
      "tags": ['http-equiv'],
      "action": "http-equiv",
    },
    {
      "elements": ['iframe'],
      "tags": ['srcdoc'],
      "action": "html",
    },
    {
      "elements": ['link'],
      "tags": ["imagesrcset"],
      "action": "srcset",
    },
    {
      "elements": 'all',
      "tags": ['onclick'],
      "action": "js",
    }
  ];

  constructor(ctx: DynamicRewrites) {
    this.ctx = ctx.ctx;
  }

  generateRedirect(url: string) {
    return `
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="${url}">here</A>.
</BODY></HTML>
    `
  }

  iterate(_dom: Object, cb: Function) {
    function it(dom: Object | any = _dom) {
      for (var i = 0; i < dom.childNodes.length; i++) {
        cb(dom.childNodes[i]);

        if (dom.childNodes[i].childNodes) if (dom.childNodes[i].childNodes.length) {
          it(dom.childNodes[i]);
        };
      }
    }

    it(_dom);
  }

  rewrite(src: string, meta: MetaURL, head: Array<string | Object> = []) {
    if (Array.isArray(src)) src = src[0];

    if (!src) return src;

    src = src.toString();

    if (!src.match(/<\!DOCTYPE[^>]*>/gi)) {
      src = "<!DOCTYPE html>" + src
    }

    return src.replace(/(<!DOCTYPE html>|<html(.*?)>)/im, `$1${head.join(``)}\n`).replace(/<(script|link)\b[^>]*>/g, (e, n) => e.replace(/\snonce\s*=\s*"[^"]*"/, e => e.replace("nonce", "nononce")).replace(/\sintegrity\s*=\s*"[^"]*"/, e => e.replace("integrity", "nointegrity")));
  }
}
