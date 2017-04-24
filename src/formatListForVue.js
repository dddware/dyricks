'use strict';

var formatSongForVue = require('./formatSongForVue');

/**
 * @param {Object[]} songList
 *
 * @return {Object[]}
 */
module.exports = function(songList) {
    return songList.map(function(song) {
        return formatSongForVue(song);
    })
};
