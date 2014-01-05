"use strict";

angular.module("codiagApp")
    .controller("RoomsCtrl", function($scope, RoomsService) {
        $scope.rooms = RoomsService;
        $scope.newRoom = false;
        
        $scope.showNewRoomForm = function() {
            $scope.newRoom = true;
        };
        
        $scope.hideNewRoomForm = function() {
            $scope.newRoom = false;
            $scope.newRoomName = '';
        };
        
        $scope.createNewRoom= function() {
            $scope.rooms.$add(
                { name: $scope.newRoomName, id: Math.uuid(), diagram: { bubbles: [], connections: [] }}
            );
            
            $scope.newRoom = false;
            $scope.newRoomName = '';
        };

        $scope.getRoomIndex = function(roomNumber) {
            return RoomsService.$getIndex()[roomNumber];
        };
    });