"use strict";

angular.module("codiagApp")
    .controller("RoomsCtrl", function($scope, RoomsService/*, $route*/) {
        $scope.rooms /*= window.rs*/ = RoomsService;

        $scope.getRoomIndex = function(roomNumber) {
            return RoomsService.$getIndex()[roomNumber];
        };
    });