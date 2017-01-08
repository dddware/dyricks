'use strict';

var getChords = require('./src/getChords');

getChords('simon and garfunkel sound of silence')
    .then(function(chords) {
        console.log(chords);
    })
    .catch(function(error) {
        console.error(error);
    });
