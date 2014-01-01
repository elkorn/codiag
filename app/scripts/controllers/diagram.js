(function(window, fabric, codiag, $, undefined) {
    "use strict";

    angular.module("codiagApp")
        .controller("DiagramCtrl", function($scope, $routeParams, RoomsService) {
            var currentRoomId = $routeParams.roomId;
            RoomsService.query(function(data) {
                $scope.room = window.codiag.util.findFirst(data)(function(room) {
                    return room.id === currentRoomId;
                });
            });

            // $(function() {

            // });
        });
})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);