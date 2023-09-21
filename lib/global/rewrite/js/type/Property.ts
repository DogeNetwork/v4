// why am i doing this

import { Node } from "../types";

export default function Property(node: Node, parent: Node = {} as any) {
    if (node.parent.type == "ObjectPattern") return;
    if (node.parent?.parent?.type == "AssignmentExpression") return;

    node.shorthand = false;
}