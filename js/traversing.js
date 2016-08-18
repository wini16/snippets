function traverseNodesClass(node, className) {
    if (!node.parentElement || node.nodeName === 'BODY') {
        return false;
    }
    if (node.className && node.className.split(' ').indexOf(className) !== -1) {
        return node;
    } else {
        return traverseNodesClass(node.parentElement, className);
    }
}

function traverseNodesId(node, id) {
    if (!node.parentElement || node.nodeName === 'BODY') {
        return false;
    }
    if (node.id && node.id === id) {
        return node;
    } else {
        return traverseNodesId(node.parentElement, id);
    }
}

function traverseNodesName(node, name) {
    if (!node.parentElement || node.nodeName === 'BODY') {
        return false;
    }
    if (node.nodeName === name) {
        return node;
    } else {
        return traverseNodesName(node.parentElement, name);
    }
}