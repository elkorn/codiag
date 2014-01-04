(function(window, angular, Firebase, codiag, undefined) {
    "use strict";
    var path = "https://codiag.firebaseio.com/rooms/:roomId";
    var cache = {};

    angular.module("codiagApp")
        .service("DiagramService", function DiagramService($firebase) {
            return {
                getDiagram: function(roomId) {
                    if(!cache.hasOwnProperty(roomId)) {
                        cache[roomId] = new Firebase(path.replace(":roomId", roomId));
                    }

                    return $firebase(cache[roomId]);
                }
            };
        });

})(window, window.angular, window.Firebase, window.codiag);