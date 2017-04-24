'use strict';

var findAttributeValue = require('./findAttributeValue'),

    /**
     * @param {String} className
     * @param {Node}   node
     *
     * @return {Node[]}
     */
    findNodesByClassName = module.exports = function(className, node) {
        var results = [];

        Array.prototype.slice.call(node.childNodes, 0).forEach(function(childNode) {
            if (findAttributeValue(childNode, 'class') === className) {
                results.push(childNode);
            }

            if ('childNodes' in childNode) {
                results = results.concat(findNodesByClassName(className, childNode));
            }
        });

        return results;
    };
