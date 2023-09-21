import Identifier from './type/Identifier';
import MemberExpression from "./type/MemberExpression";
import Literal from './type/Literal';
import CallExpression from './type/CallExpression';
import AssignmentExpression from './type/AssignmentExpression';
import ThisExpression from './type/ThisExpression';
import Property from './type/Property';
import Imports from './type/Imports';
import VariableDeclarator from './type/VariableDeclaractor';

function Emit(node: Object | any, type: string, parent: Object | any = {}, ctx: Object | any = {}, dynamic: Object | any = {}, config: Object | any = {}) {
    if (node.__dynamic) return;

    switch(type) {
        case "Identifier":
            Identifier(node, parent);
            break;
        case "MemberExpression":
            MemberExpression(node, parent, config);
            break;
        case "Literal":
            Literal(node, parent);
            break;
        case "CallExpression":
            CallExpression(node, parent);
            break;
        case "AssignmentExpression":
            AssignmentExpression(node, parent);
            break;
        case "ThisExpression":
            //ThisExpression(node, parent);
            break;
        case "Property":
            Property(node, parent);
            break;
        case "VariableDeclarator":
            VariableDeclarator(node, parent);
            break;
        case "CatchClause":
            //node.body.body.unshift({"type":"ExpressionStatement","start":21,"end":37,"expression":{"type":"CallExpression","start":21,"end":36,"callee":{"type":"MemberExpression","start":21,"end":34,"object":{"type":"Identifier","start":21,"end":28,"name":"console"},"property":{"type":"Identifier","start":29,"end":34,"name":"error"},"computed":false,"optional":false},"arguments":[{type: "Identifier", name: "typeof E == 'undefined' ? typeof d == 'undefined' ? null : d : E"}],"optional":false}});
            break;
        default:
            break;
    }

    Imports(node, parent, ctx, dynamic);
}

export default Emit;