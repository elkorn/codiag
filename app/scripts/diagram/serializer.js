(function(window, fabric, codiag, undefined) {
    "use strict";

    function serializeConnection(connection) {
        return {
            from: connection.from.id,
            to: connection.to.id
        };
    }

    codiag.serializer = {
        serializeConnection: serializeConnection,

        deserializeConnectionOptions: function(serializedOptions) {
            return {
                from: codiag.getBubble(serializedOptions.from),
                to: codiag.getBubble(serializedOptions.to)
            };
        }
    };

})(window, window.fabric, window.codiag || (window.codiag = {}));