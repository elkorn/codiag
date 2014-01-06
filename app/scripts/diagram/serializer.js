(function(window, fabric, codiag, undefined) {
    "use strict";

    function serializeConnection(connection) {
        return {
            from: connection.from.id,
            to: connection.to.id,
            id: connection.id
        };
    }

    codiag.serializer = {
        serializeConnection: serializeConnection,

        deserializeConnectionOptions: function(serializedOptions) {
            return {
                from: codiag.getBubble(serializedOptions.from),
                to: codiag.getBubble(serializedOptions.to),
                id: serializedOptions.id,
                refId: serializedOptions.refId
            };
        }
    };

})(window, window.fabric, window.codiag || (window.codiag = {}));