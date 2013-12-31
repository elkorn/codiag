'use strict';

var rest = require('./rest');

module.exports = function configureRoomsRoutesFor(app) {
    app.get('/api/rooms', rest.getAll);
};