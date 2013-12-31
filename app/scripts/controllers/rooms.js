'use strict';

angular.module('codiagApp')
    .controller('RoomsCtrl', function($scope, $resource) {
        var Rooms = $resource('/api/rooms/:roomId', {
            roomId: '@id'
        });

        $scope.rooms = Rooms.query(function(data){
            console.log(arguments);
        });
    });