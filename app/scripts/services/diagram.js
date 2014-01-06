(function(window, angular, Firebase, codiag, undefined) {
    "use strict";
    var path = "https://codiag.firebaseio.com/rooms/:roomId/diagram";

    angular.module("codiagApp")
        .service("DiagramService", function DiagramService() {
            return {
                getDiagram: function(roomId) {
                    return new Firebase(path.replace(":roomId", roomId));
                }
            };
        });

})(window, window.angular, window.Firebase, window.codiag);