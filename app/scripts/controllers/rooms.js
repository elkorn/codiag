"use strict";

angular.module("codiagApp")
    .controller("RoomsCtrl", function($scope, RoomsService, UserRoomService) {
        $scope.rooms = null;
        $scope.newRoom = false;
        var roomListService = RoomsService.getAllRooms();
        var roomIndex = [];
        roomListService.on("value", function(snapshot) {
            $scope.rooms = snapshot.val();
            roomIndex = [];
            snapshot.forEach(function(s) {
                roomIndex.push(s.name());
                
                var roomUsers = s.val().users;
                var roomUserNames = [];
                var i = null;
                for (i in roomUsers) {
                    roomUserNames.push(roomUsers[i]);
                }
                var uniqueRoomUserNames = roomUserNames.filter(function(elem, pos) {
                    return roomUserNames.indexOf(elem) === pos;
                });
                $scope.rooms[s.name()].usernames = uniqueRoomUserNames;
            });

            if (!$scope.$$phase) {
                $scope.$apply();
            }
            
            $("[data-toggle*='popover']").popover({
                trigger: 'hover',
                html: true
            });
        });
        
        $scope.listUsers = function(userArray) {
            return userArray.join("<br />");
        };

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