import Srcset from '../global/rewrite/html/srcset';
import Node from '../global/rewrite/html/nodewrapper';
import MetaURL from '../global/meta/type';
import generateHead from '../global/rewrite/html/generateHead';
import { Element } from 'parse5/dist/tree-adapters/default';
import * as parse5 from 'parse5';

(self as any).html = class html {

  ctx;

  generateHead = generateHead;

  config = [
      {
        "elements": "all",
        "tags": ['style'],
        "action": "css"
      },
      {
          "elements": ['script', 'iframe', 'embed', 'input', 'track', 'media', 'source', 'img'],
          "tags": ['src'],
          "action": "url"
      },
      {
          "elements": ['source', 'img'],
          "tags": ['srcset'],
          "action": "srcset"
      },
      {
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
      },
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

  constructor(ctx:any) {
    this.ctx = ctx.ctx;
  }

  generateRedirect(url:any) {
    return `
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="${url}">here</A>.
</BODY></HTML>
    `
  }

  iterate(_dom: any, cb: any) {
    function it(dom: any = _dom) {
      for (var i = 0; i<dom.childNodes.length; i++) {
        cb(dom.childNodes[i]);
    
        if (dom.childNodes[i].childNodes) if (dom.childNodes[i].childNodes.length) {
          it(dom.childNodes[i]);
        };
      }
    }
  
    it(_dom);
  }

  rewrite(src:any, meta:MetaURL, head: any = []) {
    const that = this;

    if (Array.isArray(src)) src = src[0];
    
    if (!src) return src;

    src = src.toString();

    if (!src.match(/<(html|script|style)[^>]*>/g) && src.match(/<\!DOCTYPE[^>]*>/gi)) return src;

    var ast = parse5.parse(src, {});

    var nodes: Array<Element | any> = [];

    this.iterate(ast, (node: Element) => nodes.push(node));

    nodes = nodes.map((e: any) => (e.attribs = {}, e.attrs?e.attrs.map(({name, value}: any)=>e.attribs[name]=value):null, e));

    if (nodes.find(e=>e.nodeName=='base')) {
      var base: URL | string = new URL(nodes.find(e=>e.nodeName=='base').attribs['href'], new URL(meta.href)).href;
    } else {
      var base: URL | string = meta.href;
    }

    base = new URL(base);

    for (var node of nodes) {
      var rewritten = new Node(node, that.ctx);

      if (node.nodeName == 'base') {
        rewritten.setAttribute('data-dynamic_href', rewritten.getAttribute('href'));
        rewritten.setAttribute('href', this.ctx.url.encode(rewritten.getAttribute('href'), meta));
      }

      if (node.nodeName == 'script') {
          if (meta.href == 'about:blank') node.attribs.defer = "true";

          if (!rewritten.getAttribute('src') && (rewritten.getAttribute('type') !== 'application/json')) {
              node.childNodes.forEach(( script: Element & { value: string } ) => {
                  if (script.nodeName!=='#text') return script;
                  if (rewritten.getAttribute('type') && rewritten.getAttribute('type')!=='application/javascript' && rewritten.getAttribute('type')!=='text/javascript' && rewritten.getAttribute('type')!=='module') return e;

                  script.value = that.ctx.rewrite.js.rewrite(script.value, {type: 'script'}, false, that.ctx);
              });
          }
      }

      if (node.nodeName == 'style') {
          node.childNodes.forEach(( style: Element & { value: string } )=>{
              if (style.nodeName !== '#text') return e;

              style.value = that.ctx.rewrite.css.rewrite(style.value, base);
          });
      }

      for (var config of that.config) {
        if (config.elements === 'all' || config.elements.indexOf(node.nodeName) > -1) {
          for (var tag of config.tags) {
            if (!rewritten.hasAttribute(tag) || !rewritten.getAttribute(tag)) continue;

            if (node.tagName == 'link' && (rewritten.getAttribute('rel') == 'icon' || rewritten.getAttribute('rel') == 'shortcut icon') && this.ctx.config.tab?.icon) {
              rewritten.setAttribute(`data-dynamic_${tag}`, rewritten.getAttribute(tag));
              rewritten.setAttribute('href', this.ctx.url.encode(this.ctx.config.tab.icon, base));

              continue;
            }

            if (config.action === 'url') {
              rewritten.setAttribute(`data-dynamic_${tag}`, rewritten.getAttribute(tag));
              if (!rewritten.getAttribute(tag).match(that.ctx.regex.ProtocolRegex) && rewritten.getAttribute(tag).match(/^([a-zA-Z0-9\-]+)\:\/\//g)) continue;
              rewritten.setAttribute(tag, that.ctx.url.encode(rewritten.getAttribute(tag), base));
            } else if (config.action === 'srcset') {
              rewritten.setAttribute(`data-dynamic_${tag}`, rewritten.getAttribute(tag));
              rewritten.setAttribute(tag, Srcset.encode(rewritten.getAttribute(tag), that.ctx));
            } else if (config.action === 'rewrite') {
              rewritten.setAttribute(config.new as any, rewritten.getAttribute(tag));
              rewritten.removeAttribute(tag);
            } else if (config.action === 'html') {
              rewritten.setAttribute(`data-dynamic_${tag}`, rewritten.getAttribute(tag));
              rewritten.removeAttribute(tag);

              const blob = new Blob([that.ctx.rewrite.html.rewrite(rewritten.getAttribute(tag), base)], {type: 'text/html'});
              rewritten.setAttribute('src', URL.createObjectURL(blob));
            } else if (config.action === 'http-equiv') {
              const content = rewritten.getAttribute('content');
              const name = rewritten.getAttribute('http-equiv');

              switch(name.toLowerCase()) {
                case "refresh":
                  var time = content.split('url=')[0].split(';')[0], value = content.split('url=')[1];

                  rewritten.setAttribute('content', `${time};url=${that.ctx.url.encode(value, base)}`);
                  break;
                case "content-security-policy":
                  rewritten.removeAttribute('content');
                  rewritten.removeAttribute('http-equiv');
                  break;
                default:
                  break;
              }
            } else if (config.action === 'css') {
              rewritten.setAttribute(`data-dynamic_${tag}`, rewritten.getAttribute(tag));
              rewritten.setAttribute(tag, that.ctx.rewrite.css.rewrite(rewritten.getAttribute(tag), base));
            } else if (config.action === 'delete') {
              rewritten.removeAttribute(tag);
            } else if (config.action === 'js') {
              rewritten.setAttribute(tag, that.ctx.rewrite.js.rewrite(rewritten.getAttribute(tag), {type: 'script'}, false, that.ctx));
            }
          }
        }
      };
    }

    if (head && ast.childNodes.length && head.length) {
      var html: any = ast.childNodes.find((e: any) => e.nodeName == 'html');

      for (var e = 0; e < head.length; e++) {
        if (html) {
          html.childNodes.unshift(head[e]);
          continue;
        }

        ast.childNodes.unshift(head[e]);
      }
    }
    
    src = parse5.serialize(ast as any) as string;

    return src;
  }
}
