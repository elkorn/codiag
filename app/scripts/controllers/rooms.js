"use strict";

angular.module("codiagApp")
    .controller("RoomsCtrl", function($scope, RoomsService, Userservice) {
        $scope.rooms = null;
        $scope.newRoom = false;
        var roomListService = RoomsService.getAllRooms();
        var roomIndex = [];
        roomListService.on("value", function(snapshot) {
            $scope.rooms = snapshot.val();
            roomIndex = [];
            snapshot.forEach(function(s) {
                roomIndex.push(s.name());
            });

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });

        $scope.showNewRoomForm = function() {
            $scope.newRoom = true;
        };

        $scope.hideNewRoomForm = function() {
            $scope.newRoom = false;
            $scope.newRoomName = "";
        };

        $scope.createNewRoom = function() {
            roomListService.push({
                name: $scope.newRoomName,
                id: Math.uuid()
            });

            $scope.newRoom = false;
            $scope.newRoomName = "";
        };

        $scope.getRoomIndex = function(roomNumber) {
            return roomIndex[roomNumber];
        };
    });