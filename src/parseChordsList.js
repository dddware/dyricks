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

            if (cells[0].attrs[0] && cells[0].attrs[0].value === 'npd77') {
                cells.shift();
            }
            // Check if its :  tab pro // chords pro // chords // tab
            var typeCell = cells.pop().childNodes.filter(function(node) {
                return node.nodeName === 'strong';
            })[0].childNodes[0];
            var type = typeCell.value;

            var rankCell = cells.pop()

            if (type === 'chords') {

                var linkCell = cells[1].childNodes.filter(function(node) {
                    return node.nodeName === 'a';
                });
                // td.search-version--td div.search-version--link
                if (linkCell.length === 0) {
                    linkCell = cells[1].childNodes[1].childNodes[1];
                }

                var url = findAttributeValue(linkCell, 'href').replace("'"," "),

                    nbStars = !(rankCell.childNodes.length && 'childNodes' in rankCell.childNodes[0]) ? 0 :
                        rankCell.childNodes[0].childNodes.reduce(function(score, star) {
                            switch (findAttributeValue(star, 'class').split('_').pop()) {
                                case 'active':
                                    return score + 1;
                                case 'half':
                                    return score + 0.5;
                            }

                            return score;
                        }, 0),

                    nbVotes = !(rankCell.childNodes.length > 2 && 'childNodes' in rankCell.childNodes[2]) ? 0 :
                        rankCell.childNodes[2].childNodes[1].childNodes[0].value;
                chordsList.push(new Chords(url, nbStars, nbVotes));
            }
        });
    }
    return chordsList;
};
