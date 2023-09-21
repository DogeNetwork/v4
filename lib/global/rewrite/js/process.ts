import DynamicRewrites from "../../rewrite";
import js from "./js";

export default function process(this: js, src: string, config: Object | any = {}, ctx: any, dynamic: Object | any) {
  var ast = this.ctx.modules.acorn.parse(src.toString(), { sourceType: config.module ? 'module' : 'script', allowImportExportEverywhere: true, allowAwaitOutsideFunction: true, allowReturnOutsideFunction: true, ecmaVersion: "latest", preserveParens: false, loose: true, allowReserved: true });

  this.iterate(ast, (node: any, parent: any = null) => {
    this.emit(node, node.type, parent, ctx, dynamic, config);
  });

  src = this.ctx.modules.estree.generate(ast);

  return src;
}
