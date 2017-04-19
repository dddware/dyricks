'use strict';

var Promise = require('promise'),
    express = require('express'),
    pug = require('pug'),
    rp = require('request-promise'),
    formatListForVue = require('./src/formatListForVue'),
    getSearchUrl = require('./src/getSearchUrl'),
    parseChordsContent = require('./src/parseChordsContent'),
    parseChordsList = require('./src/parseChordsList'),
    reduceToBestChords = require('./src/reduceToBestChords'),
    songs = require('./songs'),

    app = express();

// Serves static files
app.use(express.static('public'));

// Serves HTML
app.get('/', function(req, res) {
    res.end(pug.renderFile('lyrics.html.pug', { songs: formatListForVue(songs) }));
});

// Serves API
app.get('/api(\.html)?', function(req, res) {
    var toHtml = req.path.match(/\.html$/);

    res.append('Content-Type', 'text/' + toHtml ? 'html' : 'plain');

    rp(getSearchUrl(req.query.q))
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
