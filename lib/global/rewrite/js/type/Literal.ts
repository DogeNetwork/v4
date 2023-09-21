import Eval from '../object/Eval';
import PostMessage from '../object/PostMessage';
import { Node } from '../types';

export default function Literal(node: Node, parent: Node = {} as any) {
    if (!((node.value as any) instanceof String)) return false;

    if (node.value==('__dynamic')) node.value = 'undefined';

    if (!['location', 'parent', 'top', 'postMessage'].includes(node.value)) return false;

    if (node.value=='postMessage' && parent.type != 'AssignmentExpression' && parent.left != node) PostMessage(node, parent);
    if (node.value=='location') node.value = '__dynamic$location';
    if (node.value=='__dynamic') node.value = 'undefined';
    if (node.value=='eval') node.value = '__dynamic$eval';
}