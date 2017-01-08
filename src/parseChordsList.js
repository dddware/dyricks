'use strict';

var parse5 = require('parse5'),
    Chords = require('./chords'),
    findAttributeValue = require('./findAttributeValue'),
    findNodesByClassName = require('./findNodesByClassName');

/**
 * @param {String} html
 *
 * @return {Chords[]}
 */
module.exports = function(html) {
    var chordsList = [],
        parsed = findNodesByClassName('tresults', parse5.parse(html));

    if (parsed.length) {
        var table = parsed[0],
            rows = table.childNodes[3].childNodes.filter(function(node) { return node.nodeName === 'tr'; });

        rows.forEach(function(row) {
            var cells = row.childNodes.filter(function(node) { return node.nodeName === 'td'; });

            // This is gonna be quite a bit magical.
            if (cells[3].childNodes[0].childNodes[0].value === 'chords') {
                var url = findAttributeValue(cells[1].childNodes[1].childNodes[1], 'href'),

                    nbStars = !(cells[2].childNodes.length && 'childNodes' in cells[2].childNodes[0]) ? 0 :
                        cells[2].childNodes[0].childNodes.reduce(function(score, star) {
                            switch (findAttributeValue(star, 'class').split('_').pop()) {
                                case 'active':
                                    return score + 1;
                                case 'half':
                                    return score + 0.5;
                            }

                            return score;
                        }, 0),

                    nbVotes = !(cells[2].childNodes.length > 2 && 'childNodes' in cells[2].childNodes[2]) ? 0 :
                        cells[2].childNodes[2].childNodes[1].childNodes[0].value;

                chordsList.push(new Chords(url, nbStars, nbVotes));
            }
        });
    }

    return chordsList;
};
