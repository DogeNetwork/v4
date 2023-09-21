export type Node = Object & {
    type: string;
    value: string | Node | any;
    name: string;
    callee: Node;
    arguments: Array<Node>;
    expression: Node;
    property: Node;
    operator: string;
    left: Node;
    right: Node;
    body: Node;
    param: Node;
    source: Node;
    test: Node;
    consequent: Node;
    alternate: Node;
    shorthand: boolean;
    argument: Node;
    declarations: Array<Node>;
    id: Node;
    init: Node;
    params: Array<Node>;
    async: boolean;
    generator: boolean;
    computed: boolean;
    key: Node;
    object: Node;
    start: number;
    end: number;
    loc: {
        start: {
            line: number;
            column: number;
        };
        end: {
            line: number;
            column: number;
        };
    };
    range: [number, number];
    raw: string;
    parent: Node;
    __dynamic: boolean;
    go?: boolean;
}