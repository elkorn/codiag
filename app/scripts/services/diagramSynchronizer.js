(function(window, angular, codiag, undefined) {
    "use strict";

    angular.module("codiagApp")
        .service("DiagramSynchronizer", function DiagramSynchronizer(Userservice) {
            function canUnfreeze(id) {
                return codiag.getBubble(id).frozenBy === Userservice.getCurrentUserName();
            }

            return function synchronizeWithScope(scope) {
                function applyScope() {
                    if (!scope.$$phase) {
                        scope.$apply();
                    }
                }

                function initializeWithSnapshot(initializer) {
                    function initialize(data) {
                        return function(key) {
                            var element = data[key];
                            element.refId = key;
                            initializer(element);
                        };
                    }

                    return function(snapshot) {
                        var data = snapshot.val();
                        if (data) {
                            codiag.util.getIndex(data)
                                .forEach(initialize(data));
                        }
                    };
                }

                function changeFrozenStatus(freezer, scope) {
                    return function(options) {
                        var target = options.target;
                        if (!target.refId) {
                            return;
                        }

                        scope.bubbles.child(target.refId).child("frozenBy").set(freezer);
                        applyScope();
                    };
                }

                function handleFreezingForBubble(data) {
                    if (data.frozenBy && data.frozenBy !== Userservice.getCurrentUserName()) {
                        codiag.getBubble(data.id).freeze();
                    } else if (!data.frozenBy) {
                        codiag.getBubble(data.id).unfreeze();
                    }
                }

                function bubbleInitializer(bubble) {
                    codiag.createStandaloneBubble(bubble);
                    handleFreezingForBubble(bubble);
                }

                return {
                    init: {
                        bubbles: initializeWithSnapshot(bubbleInitializer),
                        connections: initializeWithSnapshot(codiag.createConnection)
                    },
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
                            if (!codiag.getConnection(data.id)) {
                                data.refId = snapshot.name();
                                codiag.createConnection(data);
                            }
                        },
                        removeBubble: function(snapshot) {
                            var data = snapshot.val();
                            if (codiag.getBubble(data.id)) {
                                codiag.removeBubble(data, true);
                            }
                        },
                        handleFreezing: function(snapshot) {
                            handleFreezingForBubble(snapshot.val());
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
                            codiag.getConnection(connection.id).refId = scope.connections.push(connection);
                            applyScope();
                        },
                        removeBubble: function(options) {
                            scope.bubbles.child(options.refId).remove();
                            applyScope();
                        },
                        freeze: changeFrozenStatus(Userservice.getCurrentUserName(), scope),
                        unfreeze: changeFrozenStatus("", scope)
                    },
                };
            };
        });
})(window, window.angular, window.codiag);