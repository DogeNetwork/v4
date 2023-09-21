import { Node } from "../types";

export default function PostMessage(node: Node, parent: Node = {} as any) {
    Object.entries({
        type: 'CallExpression',
        callee: {
            type: 'MemberExpression',
            object: {type: 'Identifier', name: 'self'},
            property: {type: 'Identifier', name: '__dynamic$message'},
        },
        arguments: [
            node.object||node,
            {type: 'Identifier', name: 'self', __dynamic: true}
        ]
    }).forEach(([name,value]) => (node as any)[name] = value)

    return;
}