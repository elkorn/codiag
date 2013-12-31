"use strict";
var Room = require("./model").Room;
require("../../../app/scripts/utils/Math.uuid");

var mockRooms = [
    new Room({
        name: "Room 1",
        id: Math.uuid()
    }),
    new Room({
        name: "Room 2",
        id: Math.uuid()
    }),
    new Room({
        name: "Room 3",
        id: Math.uuid()
    }),
    new Room({
        name: "Room 4",
        id: Math.uuid()
    })
];

exports.getAll = function() {
    return mockRooms;
};