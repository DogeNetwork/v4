import Eval from '../object/Eval';
import PostMessage from '../object/PostMessage';
import { Node } from '../types';

export default function CallExpression(node: Node, parent: Node = {} as any) {
    if (node.go === false) return;

    if (parent.type == 'CallExpression' && parent.arguments.includes(node)) return;

    if (parent.type !== "SequenceExpression" && parent.type !== "VariableDeclarator") return;

    node.type = 'CallExpression';
    node.callee = {type: 'Identifier', name: 'dg$', __dynamic: true} as Node;
    node.__dynamic = true;
    node.arguments = [{type: 'ThisExpression', go: false, __dynamic: true}] as Array<Node>;
}