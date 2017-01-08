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
    var node = findNodesByClassName('js-tab-content', parse5.parse(html))[0];

    if (toHtml) {
        return parse5.serialize(node)
            .replace(/<(\/?span)>/g, '§$1§')
            .replace(/<|>/g, '')
            .replace(/§([^§]+)§/g, '<$1>');
    }

    return flattenToText(node);
};
