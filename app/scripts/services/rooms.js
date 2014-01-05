(function(window, angular, Firebase, codiag, undefined) {
    "use strict";
    var ref = new window.Firebase("https://codiag.firebaseio.com/rooms");

    angular.module("codiagApp")
        .service("RoomsService", function RoomsService() {
            return {
                getAllRooms: function() {
                    return ref;
                },
                getRoom: function(roomId) {
                    console.log(ref.child(roomId).toString());
                    return ref.child(roomId);
                }
            };
        });

})(window, window.angular, window.Firebase, window.codiag);