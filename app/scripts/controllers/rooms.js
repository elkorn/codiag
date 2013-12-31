"use strict";

angular.module("codiagApp")
    .controller("RoomsCtrl", function($scope, RoomsService, $route) {
        $scope.rooms = RoomsService.query();
    });