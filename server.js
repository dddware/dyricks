'use strict';

var Promise = require('promise'),
    encodeUrl = require('encodeurl'),
    express = require('express'),
    rp = require('request-promise'),
    NotFoundError = require('./src/notFoundError'),
    parseChordsContent = require('./src/parseChordsContent'),
    parseChordsList = require('./src/parseChordsList'),
    reduceToBestChords = require('./src/reduceToBestChords'),

    app = express();

app.get('/api(\.html)?', function(req, res) {
    var toHtml = req.path.match(/\.html$/);

    res.append('Content-Type', 'text/' + toHtml ? 'html' : 'plain');

    rp('https://www.ultimate-guitar.com/search.php?type=300&title=' + encodeUrl(req.query.q))
        .then(parseChordsList)
        .then(reduceToBestChords)
        .then(rp)
        .then(parseChordsContent.bind(null, toHtml))
        .then(res.end.bind(res))
        .catch(function(error) {
            if (error instanceof NotFoundError) {
                res.status(404).end('No chords found for "' + req.query.q + '"');
            } else {
                console.error(error);
                res.status(500).end();
            }
        });
});

app.listen(3000);
