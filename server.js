'use strict';

var Promise = require('promise'),
    express = require('express'),
    pug = require('pug'),
    rp = require('request-promise'),
    formatListForVue = require('./src/formatListForVue'),
    getLyricsUrl = require('./src/getLyricsUrl'),
    getUgSearchUrl = require('./src/getUgSearchUrl'),
    getGeniusSearchUrl = require('./src/getGeniusSearchUrl'),
    parseChordsContent = require('./src/parseChordsContent'),
    parseChordsList = require('./src/parseChordsList'),
    parseLyricsContent = require('./src/parseLyricsContent'),
    reduceToBestChords = require('./src/reduceToBestChords'),
    songs = require('./songs'),

    app = express();

// Serves static files
app.use(express.static('public'));

// Serves HTML
app.get('/', function(req, res) {
    res.end(pug.renderFile('lyrics.html.pug', { songs: formatListForVue(songs) }));
});

// UG API
app.get('/ug(\.html)?', function(req, res) {
    var toHtml = req.path.match(/\.html$/);

    res.append('Content-Type', 'text/' + toHtml ? 'html' : 'plain');

    rp(getUgSearchUrl(req.query.q))
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

// Genius API
app.get('/genius(\.html)?', function(req, res) {
    var toHtml = req.path.match(/\.html$/);

    res.append('Content-Type', 'text/' + toHtml ? 'html' : 'plain');

    rp(getGeniusSearchUrl(req.query.q))
        .then(getLyricsUrl)
        .then((url) => rp(url))
        .then(parseLyricsContent.bind(null, toHtml))
        .then(res.end.bind(res))
        .catch(function(error) {
            var statusCode = error.statusCode || 500;

            res.status(statusCode);

            if (statusCode === 404) {
                res.end('No lyrics found for "' + req.query.q + '"');
            } else {
                console.error(error);
                res.end();
            }
        });
});

app.listen(3000);
