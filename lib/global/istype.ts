import { DynamicBundle } from "./client";
import css from "./is/css";
import html from "./is/html";
import js from "./is/js";

class DynamicTypeFunctions {
  html: Function = html;
  js: Function = js;
  css: Function = css;

  ctx: DynamicBundle;
  
  constructor(ctx: DynamicBundle) {
    this.ctx = ctx;
  }
}

export default DynamicTypeFunctions;