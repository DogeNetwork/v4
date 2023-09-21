export default function Iterate(ast: Object, handler: Function) {
    if (typeof ast != 'object' || !handler) return;
    walk(ast, null, handler);
    function walk(node: Object | any, parent: Object | null, handler: Function) {
        if (typeof node != 'object' || !handler) return;
        node.parent = parent;
        handler(node, parent, handler);
        for (const child in node) {
            if (child === 'parent') continue;
            if (Array.isArray(node[child])) {
                node[child].forEach((entry: Object | undefined) => { 
                    if (entry) walk(entry, node, handler)
                });
            } else {
                if (node[child]) walk(node[child], node, handler);
            };
        };
        if (typeof node.iterateEnd === 'function') node.iterateEnd();
    };
};