"use strict";

angular.module("codiagApp")
    .service("RoomsService", function Rooms($resource) {
        return $resource("/api/rooms/:roomId", {
            roomId: "@id"
        });
        /*getAllRooms: function() {
                return resource.query();
            },
            selectRoom: function(id) {
                currentRoom = window.codiag.util.findFirst(resource.query())(function(room) {
                    return room.id === id;
                });

                return currentRoom;
            },
            getCurrentRoom: function() {
                return currentRoom;
            });*/
    });