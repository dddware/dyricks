'use strict';

var NotFoundError = function() {
    Error.call();

    this.statusCode = 404;
};

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

module.exports = NotFoundError;
