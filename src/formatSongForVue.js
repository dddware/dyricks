'use strict';

/**
 * @param {Object} song
 *
 * @param {Object}
 */
module.exports = function(song) {
    return Object.assign({}, song, {
        artist: song.title.split(' - ').shift(),
        clue: song.title.toLowerCase(),
        title: song.title.split(' - ').pop()
    })
};
