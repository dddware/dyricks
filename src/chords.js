'use strict';

/**
 * @param {String} url
 * @param {Number} nbStars
 * @param {Number} nbVotes
 */
var Chords = function(url, nbStars, nbVotes) {
    this.url = url;
    this.score = (nbStars - (nbStars > 2 ? 2 : 3)) * nbVotes;
};

module.exports = Chords;
