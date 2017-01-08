'use strict';

var Promise = require('promise'),
    encodeUrl = require('encodeurl'),
    request = require('request'),
    config = require('../config'),

    domain = 'http://api.guitarparty.com';

/**
 * @param {String} query
 *
 * @return {Promise}
 */
module.exports = function(query) {
    return new Promise(function(resolve, reject) {
        request(
            {
                url: domain + '/v2/songs/?query=' + encodeUrl(query),
                followRedirect: false,
                headers: {
                    'Guitarparty-Api-Key': config.guitarPartyApiKey
                }
            },
            function(error, response, body) {
                try {
                    resolve(JSON.parse(body).objects[0].body)
                } catch (e) {
                    reject(e);
                }
            }
        );
    });
}
