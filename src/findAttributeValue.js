'use strict';

/**
 * @param {Node}   node
 * @param {String} key
 *
 * @return {String}
 */
module.exports = function(node, key) {
    var value = '';

    if ('attrs' in node) {
        node.attrs.some(function(attr) {
            if (attr.name === key) {
                value = attr.value;

                return true;
            }
        });
    }

    return value;
};
