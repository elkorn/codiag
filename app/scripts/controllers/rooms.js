"use strict";

angular.module("codiagApp")
    .controller("RoomsCtrl", function($scope, RoomsService) {
        $scope.rooms = null;
        $scope.newRoom = false;
        RoomsService.on('value', function(snapshot) {
            $scope.rooms = snapshot.val();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        $scope.showNewRoomForm = function() {
            $scope.newRoom = true;
        };
        
        $scope.hideNewRoomForm = function() {
            $scope.newRoom = false;
            $scope.newRoomName = '';
        };
        
        $scope.createNewRoom= function() {
            RoomsService.push({ 
                name: $scope.newRoomName, 
                id: Math.uuid()
            });
            
            $scope.newRoom = false;
            $scope.newRoomName = '';
        };

        $scope.getRoomIndex = function(roomNumber) {
            return window.codiag.util.getIndex($scope.rooms)[roomNumber];
        };
    });