'use strict';

var encodeUrl = require('encodeurl'),
    mask = 'https://genius.com/search?q=';

/**
 * @param {String} songName
 *
 * @return {String}
 */
module.exports = function(songName) {
    return mask + encodeUrl(songName).split(' - ').join(' ').toLowerCase();
};
