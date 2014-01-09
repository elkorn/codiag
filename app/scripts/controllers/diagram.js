(function (window, fabric, codiag, $, undefined) {
    "use strict";

    angular.module("codiagApp")
        .controller("DiagramCtrl", function ($scope, $rootScope, $routeParams, DiagramService, RoomsService,
            Userservice, UserRoomService) {
            var currentRoomId = $routeParams.roomId;

            function applyScope() {
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }

            $scope.room = null;
            RoomsService.getRoom(currentRoomId).on("value", function (snapshot) {
                $scope.room = snapshot.val();
                $rootScope.pageTitle = $scope.room.name + " - Codiag";
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });

            $scope.$on("$routeChangeStart", function () {
                $rootScope.pageTitle = "";
            });

            $scope.diagram = DiagramService.getDiagram(currentRoomId);
            $scope.bubbles = $scope.diagram.child("bubbles");
            $scope.connections = $scope.diagram.child("connections");

            UserRoomService.roomRegisterUser(currentRoomId, Userservice.getCurrentUserName());

            $scope.$on("codiag:diagram:initialized", function () {
                $scope.isEditingABubble = false;
                codiag.canvas.on("mode:creation:enabled", function (mode) {
                    if (mode.kind !== "connection") {
                        $scope.isEditingABubble = true;
                        applyScope();
                    }
                });

                codiag.canvas.on("mode:creation:disabled", function (mode) {
                    if (mode.kind !== "connection") {
                        $scope.isEditingABubble = false;
                        applyScope();
                    }
                });
            });
        });

})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);