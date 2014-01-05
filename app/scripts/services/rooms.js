(function(window, angular, Firebase, codiag, undefined) {
    "use strict";
    var ref = new window.Firebase("https://codiag.firebaseio.com/rooms");

    angular.module("codiagApp")
        .service("RoomsService", function RoomsService() {
            return ref;
        });

})(window, window.angular, window.Firebase, window.codiag);