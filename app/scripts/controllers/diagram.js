(function(window, fabric, codiag, $, undefined) {
    "use strict";

    angular.module("codiagApp")
        .controller("DiagramCtrl", function($scope, $routeParams, RoomsService, roomSocket) {
            var currentRoomId = $routeParams.roomId;
            var socket = roomSocket.getSocketForRoom(currentRoomId);
            socket.forward("info", $scope);

            $scope.$on("socket:info", function(){
                /*
                    Beget unicorns.
                 */
            });

            RoomsService.query(function(data) {
                $scope.room = window.codiag.util.findFirst(data)(function(room) {
                    return room.id === currentRoomId;
                });
            });

        });
})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);