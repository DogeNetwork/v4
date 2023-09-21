import Eval from '../object/Eval';
import PostMessage from '../object/PostMessage';
import { Node } from '../types';

export default function MemberExpression(node: Node, parent: Node = {} as any, config: any = {}) {
    /*if (config.destination !== 'worker') if (node.object.type!=='Identifier') {
      if (node.object.type == 'MemberExpression') return node.object = {
        type: 'CallExpression',
        callee: {type: 'Identifier', name: '__dynamic$get'},
        arguments: [node.object]
      }
    }

    if (config.destination !== 'worker') if (node.object.type=='Identifier') {
      node.object = {
        type: 'CallExpression',
        callee: {type: 'Identifier', name: '__dynamic$get'},
        arguments: [node.object]
      }
    }*/

    node.object.name+='';

    if (parent.type!=='AssignmentExpression'&&parent.left!==node) {
      if (node.property.value == 'postMessage' && (parent.type=='CallExpression'&&parent.callee==node)) return PostMessage(node, parent);
      if (node.object.value == 'postMessage' && (parent.type=='CallExpression'&&parent.callee==node)) return PostMessage(node, parent);

      if ((node.property.name=='postMessage'||node.object.name=='postMessage') && node.object.type!=='Super') {
        var original:string = node.object?.name
        node.type = 'CallExpression';
        node.callee = {type: 'Identifier', name: '__dynamic$message'} as Node;
        node.arguments = [{type: 'Identifier', name: original} as Node, {type: 'Identifier', name: 'self', __dynamic: true} as Node]
        if (parent.type=='CallExpression') {
          parent.arguments = parent.arguments
        }

        return;
      }
    }

    if (node.property.name=='eval') node.property.name = '__dynamic$eval';
    if (node.object.name=='eval') node.object.name = '__dynamic$eval';

    if (config.destination!=='worker') {
      if (node.property.name=='window'&&node.object.name!='top'&&(node.object.name=='self'||node.object.name=='globalThis')) if (parent.type!=='NewExpression'&&(parent.type!=='CallExpression'||((parent.type=='CallExpression')&&node!==parent.callee))) node.property.name = '__dynamic$window';
      if (node.object.name=='top') if (parent.type!=='NewExpression'&&(parent.type!=='CallExpression'||((parent.type=='CallExpression')&&node!==parent.callee))) node.object.name = 'top.__dynamic$window';
      if (node.property.name=='top'&&(node.object.name=='self'||node.object.name=='globalThis')) if (parent.type!=='NewExpression'&&(parent.type!=='CallExpression'||((parent.type=='CallExpression')&&node!==parent.callee))) node.property.name = 'top.__dynamic$window';
      if (parent.type!=='NewExpression'&&(parent.type!=='CallExpression'||((parent.type=='CallExpression')&&node!==parent.callee))) {
        if (node.object.name=='window') {
          node.object = {
            type: 'CallExpression',
            callee: {type: 'Identifier', name: 'dg$'} as Node,
            arguments: [node.object],
            __dynamic: true
          } as Node;
        };
        if (node.object.name=='parent') {
          node.object = {
            type: 'CallExpression',
            callee: {type: 'Identifier', name: 'dg$'},
            arguments: [node.object],
            __dynamic: true
          } as Node;
        };
        if (node.property.name == '__dynamic') node.property.name = 'undefined';
        if (node.object.name=='self') {
          node.object = {
            type: 'CallExpression',
            callee: {type: 'Identifier', name: 'dg$'},
            arguments: [node.object],
            __dynamic: true
          } as Node;
        };
        if (node.object.name=='document') {
          node.object = {
            type: 'CallExpression',
            callee: {type: 'Identifier', name: 'dg$'},
            arguments: [node.object],
            __dynamic: true
          } as Node;
        };
        if (node.object.name=='globalThis') {
          node.object = {
            type: 'CallExpression',
            callee: {type: 'Identifier', name: 'dg$'},
            arguments: [node.object],
            __dynamic: true
          } as Node;
        };
      }
      if (node.object.name=='location') {
        node.object = {
          type: 'CallExpression',
          callee: {type: 'Identifier', name: 'dg$'},
          arguments: [node.object],
          __dynamic: true
        } as Node;
      };
      if (node.property.name=='location' && parent.type !== "BinaryExpression" && parent.type !== "AssignmentExpression") {
        node.property.__dynamic = true;

        node.__dynamic = true;
        let original: any = Object.assign({}, node);

        node.type = "CallExpression";
        node.callee = {type: 'Identifier', name: 'dg$', __dynamic: true} as Node;
        node.arguments = [original];
        node.__dynamic = true;
      }
    }

    if (node.computed && config.destination !== 'worker') {
      node.property = {
        type: "CallExpression",
        callee: {type: 'Identifier', name: 'dp$'},
        arguments: [node.property],
        __dynamic: true,
      } as Node;
    }
    
    //if (!['self', 'globalThis'].includes(node.object.name)) return false;

    //if (parent.type=='CallExpression'&&parent.callee==node) return;

    //if (node.object.name=='document') return node.object.name = `d$g_(${node.object.name})`;

    //return node.object.name = '__dynamic$'+node.object.name;
}