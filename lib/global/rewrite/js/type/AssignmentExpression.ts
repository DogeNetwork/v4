import Eval from '../object/Eval';
import PostMessage from '../object/PostMessage';
import { Node } from '../types';

export default function AssignmentExpression(node: Node, parent: Node = {} as any) {
    if (node.left.type == 'Identifier') {
        if (node.left.__dynamic === true) return;

        if (node.left.name == 'location') {
            var ol = structuredClone(node.left), or = structuredClone(node.right);
            node.right.type = 'CallExpression';
            node.right.callee = {type: 'Identifier', name: 'ds$'} as Node;
            node.right.arguments = [ol, or];
        }
    }
}