import html from './rewrite/html/html';
import css from './rewrite/css';
import js from './rewrite/js/js';
import man from './rewrite/manifest';
import srcset from './rewrite/html/srcset';
import { DynamicBundle } from './client';

class DynamicRewrites {

  html: html;
  srcset;
  js: js;
  css: css;
  man: man;
  ctx: DynamicBundle;

  constructor(ctx: DynamicBundle) {
    this.ctx = ctx;
    this.html = new html(this);
    this.srcset = srcset;
    this.js = new js(this);
    this.css = new css(this);
    this.man = new man(this);
  }
}

export default DynamicRewrites;