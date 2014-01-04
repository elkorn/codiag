(function(window, fabric, codiag, undefined) {
    "use strict";

    function serializeConnection(connection) {
        return {
            from: connection.from.id,
            to: connection.to.id
        };
    }

    codiag._serializer = {
        serialize: function(diagram) {
            var result = {};

            if (diagram.hasOwnProperty("bubbles")) {
                result.bubbles = Object.keys(diagram.bubbles).map(function(id) {
                    return diagram.bubbles[id].serialize();
                });
            } else {
                result.bubbles = [];
            }

            if (diagram.hasOwnProperty("connections")) {
                result.connections = Object.keys(diagram.connections).map(function(id) {
                    return serializeConnection(diagram.connections[id]);
                });
            } else {
                result.connections = [];
            }

            return result;
        }
    };

})(window, window.fabric, window.codiag || (window.codiag = {}));