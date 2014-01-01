"use strict";

angular.module("codiagApp")
    .service("RoomsService", function Rooms($resource) {
        return $resource("/api/rooms/:roomId", {
            roomId: "@id"
        });
    });