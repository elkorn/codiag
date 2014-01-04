(function(window, fabric, codiag, $, undefined) {
    "use strict";

    angular.module("codiagApp")
        .controller("DiagramCtrl", function($scope, $routeParams, DiagramService) {
            var currentRoomId = $routeParams.roomId;
            $scope.room = DiagramService.getDiagram(currentRoomId);
        });

})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);