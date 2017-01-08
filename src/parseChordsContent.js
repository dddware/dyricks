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
    var nodes = findNodesByClassName('js-tab-content', parse5.parse(html))[0];

    return toHtml
        ? parse5.serialize(nodes)
        : flattenToText(nodes);
};
