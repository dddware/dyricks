'use strict';

var NotFoundError = require('./notFoundError');

/**
 * @param {Chords[]} chordsList
 *
 * @return {Chords}
 */
module.exports = function(chordsList) {
    if (!chordsList.length) {
        throw new NotFoundError();
    }

    return chordsList.reduce(function(best, current) {
        return best && best.score >= current.score ? best : current;
    }, null);
};
