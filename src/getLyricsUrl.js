'use strict';

var parse5 = require('parse5'),
    findAttributeValue = require('./findAttributeValue'),
    findNodesByClassName = require('./findNodesByClassName');

/**
 * @param {String} html
 *
 * @return {String}
 */
module.exports = function(html) {
    var node = findNodesByClassName('song_link', parse5.parse(html)).shift();

    return findAttributeValue(node, 'href');
};
