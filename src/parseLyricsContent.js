'use strict';

var parse5 = require('parse5'),
    findNodesByClassName = require('./findNodesByClassName'),
    flattenToText = require('./flattenToText');

/**
 * @param {Boolean} toHtml
 * @param {String}  html
 *
 * @return {String}
 */
module.exports = function(toHtml, html) {
    var node = findNodesByClassName('lyrics', parse5.parse(html)).shift();

    if (toHtml) {
        return parse5.serialize(node).trim();
    }

    return flattenToText(node).trim();
};
