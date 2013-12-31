'use strict';
var _ = require('underscore');

/*
 * This will probably be an extension of a socket.io room.
 */

exports.Room = function Room (options) {
    _.extend(this, options);
};