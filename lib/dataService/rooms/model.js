"use strict";
var _ = require("underscore");
var io = require("../../config/realTimeProvider").io;

/*
 * This will probably be an extension of a socket.io room.
 */

function logForRoom(roomName) {
    return function(msg) {
        console.log("[%s] %s", roomName, msg);
    };
}

exports.Room = function Room(options) {
    _.extend(this, options);
    var log = logForRoom(this.name);
    var channel = io().of("/" + this.id);
    log("Creating socket channel.");
    channel.on("connection", function(socket) {
        log("A connection!");
        socket.emit("info", {
            message: "Hello!"
        });
        channel.emit("info", {
            message: "Somebody has joined!"
        });
    });
};