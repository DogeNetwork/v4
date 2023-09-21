import Eval from '../object/Eval';
import PostMessage from '../object/PostMessage';
import { Node } from '../types';

export default function Imports(node: Node, parent: Node = {} as any, ctx: Object | any = {}, dynamic: Object | any = {}) {
    if (node.type=='Literal'&&(parent.type=='ImportDeclaration'||parent.type=='ExportNamedDeclaration'||parent.type=='ExportAllDeclaration')) {
        var og = node.value + '';
        node.value = ctx.url.encode(node.value, dynamic.meta);
        node.raw = node.raw.replace(og, node.value);
        node.__dynamic = true;
    }

    if (node.type=='ImportExpression') {
        node.source = {type: 'CallExpression', callee: {type: 'Identifier', name: '__dynamic$import'}, arguments: [node.source, {type: 'Literal', __dynamic: true, value: ctx.meta.href}]} as Node;
        node.__dynamic = true;
    }
}