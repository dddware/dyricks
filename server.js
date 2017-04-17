'use strict';

var Promise = require('promise'),
    encodeUrl = require('encodeurl'),
    express = require('express'),
    pug = require('pug'),
    rp = require('request-promise'),
    parseChordsContent = require('./src/parseChordsContent'),
    parseChordsList = require('./src/parseChordsList'),
    reduceToBestChords = require('./src/reduceToBestChords'),
    songs = require('./songs'),
    searchUrl = function (song) {
        var url =
            'https://www.ultimate-guitar.com/search.php?type=300&title='
            + encodeUrl(song).split('-').pop().toLowerCase();
        console.log(url);
        return url;
    },
    app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.end(pug.renderFile('lyrics.html.pug', { songs }));
});

app.get('/api(\.html)?', function(req, res) {
    var toHtml = req.path.match(/\.html$/);

    res.append('Content-Type', 'text/' + toHtml ? 'html' : 'plain');

    rp(searchUrl(req.query.q))
        .then(parseChordsList)
        .then(reduceToBestChords)
        .then(rp)
        .then(parseChordsContent.bind(null, toHtml))
        .then(res.end.bind(res))
        .catch(function(error) {
            var statusCode = error.statusCode || 500;

            res.status(statusCode);

            if (statusCode === 404) {
                res.end('No chords found for "' + req.query.q + '"');
            } else {
                console.error(error);
                res.end();
            }
        });
});

app.listen(3000);
