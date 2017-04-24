'use strict';

var encodeUrl = require('encodeurl'),
    mask = 'https://www.ultimate-guitar.com/search.php?type=300&title=';

/**
 * @param {String} songName
 *
 * @return {String}
 */
module.exports = function(songName) {
    return mask + encodeUrl(songName).split(' - ').pop().toLowerCase();
};
