import { Node } from "../types";

export default function Eval(node: Node, parent: Node = {} as any) {
    if (node.__dynamic) return;
    
    if (node.arguments.length) {
        node.arguments = [{
            type: 'CallExpression',
            callee: {
                type: 'Identifier',
                name: '__dynamic$wrapEval',
                __dynamic: true,
            },
            arguments: node.arguments,
            __dynamic: true,
        }] as Array<Node>;

        node.__dynamic = true;
    }

    return;
}