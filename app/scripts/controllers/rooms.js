"use strict";

angular.module("codiagApp")
    .controller("RoomsCtrl", function($scope, RoomsService) {
        $scope.rooms = RoomsService;

        $scope.getRoomIndex = function(roomNumber) {
            return RoomsService.$getIndex()[roomNumber];
        };
    });