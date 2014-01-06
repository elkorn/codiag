(function(window, angular, Firebase, codiag, undefined) {
    'use strict';
    var pathRegisterTemplate = "https://codiag.firebaseio.com/rooms/:roomId/users/:userId";
    var pathUsersTemplate = "https://codiag.firebaseio.com/rooms/:roomId/users/";
    angular.module('codiagApp')
        .service('UserRoomService', function UserRoomService() {
            console.log('URS init');
            var refRegistered = null;
            
            return {
                roomRegisterUser: function (roomId, username) {
                    var path = pathRegisterTemplate.replace(":userId", Math.uuid());
                    refRegistered = new Firebase(path.replace(":roomId", roomId));
                    refRegistered.onDisconnect().remove();
                    refRegistered.set(username);
                },
                roomUnregisterUser: function() {
                    if (refRegistered !== null) {
                        refRegistered.remove();
                        refRegistered = null;
                    }
                },
                getRegisteregUsersRef: function(roomId) {
                    var path = pathUsersTemplate.replace(":roomId", roomId);
                    return new Firebase(path);
                }
            }
        });
})(window, window.angular, window.Firebase, window.codiag);