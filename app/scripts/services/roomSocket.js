"use strict";

angular.module("codiagApp")
    .factory("roomSocket", function(socketFactory) {
        console.log("Room socket service initialized!");
        return {
            getSocketForRoom: function(id) {
                console.log("Getting socket for room %s.", id);
                return socketFactory({
                    ioSocket: window.io.connect("/" + id)
                });
            }
        };
    });