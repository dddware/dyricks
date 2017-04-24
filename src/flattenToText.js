'use strict';

/**
 * @param {Node} node
 *
 * @return {String}
 */
var getFlattenedText = module.exports = function(node) {
    var text = '';

    if ('childNodes' in node) {
        text = node.childNodes.reduce(function(text, childNode) {
            return text += childNode.nodeName === '#text'
                ? childNode.value
                : getFlattenedText(childNode);
        }, '');
    }

    return text;
};
