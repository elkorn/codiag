(function(window, angular, codiag, undefined) {
    "use strict";

    angular.module("codiagApp")
        .service("DiagramSynchronizer", function DiagramSynchronizer() {
            return function synchronizeWithScope(scope) {
                function applyScope() {
                    if (!scope.$$phase) {
                        scope.$apply();
                    }
                }

                return {
                    local: {
                        addBubble: function(snapshot) {
                            var data = snapshot.val();
                            if (!codiag.getBubble(data.id)) {
                                data.refId = snapshot.name();
                                codiag.createStandaloneBubble(data);
                            }
                        },
                        addConnection: function(snapshot) {
                            var data = snapshot.val();
                            data.refId = snapshot.name();
                            codiag.createConnection(data);
                        },
                        removeBubble: function(snapshot) {
                            var data = snapshot.val();
                            if (codiag.getBubble(data.id)) {
                                codiag.removeBubble(data, true);
                            }
                        }
                    },
                    remote: {
                        addBubble: function(data) {
                            var dto = data.target.serialize();
                            codiag.getBubble(dto.id).refId = scope.bubbles.push(dto);
                            applyScope();
                        },
                        addConnection: function(options) {
                            var connection = codiag.serializer.serializeConnection(options.target);
                            codiag.getConnection(connection.id).refId = scope.connections.push();
                            applyScope();
                        },
                        removeBubble: function(options) {
                            scope.bubbles.child(options.refId).remove();
                            applyScope();
                        }
                    },
                };
            };
        });
})(window, window.angular, window.codiag);