(function(window, fabric, codiag, $, undefined) {
    "use strict";

    angular.module("codiagApp")
        .controller("DiagramCtrl", function($scope, $routeParams, DiagramService, RoomsService, Userservice) {
            var currentRoomId = $routeParams.roomId;
            $scope.room = null;
            RoomsService.getRoom(currentRoomId).on("value", function(snapshot) {
                $scope.room = snapshot.val();
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });

            $scope.diagram = DiagramService.getDiagram(currentRoomId);
            $scope.bubbles = $scope.diagram.child("bubbles");
            $scope.connections = $scope.diagram.child("connections");
        });

})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);