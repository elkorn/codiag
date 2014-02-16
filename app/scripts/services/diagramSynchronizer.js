(function (window, angular, codiag, undefined) {
    "use strict";

    angular.module("codiagApp")
        .service("DiagramSynchronizer", function DiagramSynchronizer(Userservice) {
            return function synchronizeWithScope(scope) {
                function applyScope() {
                    if (!scope.$$phase) {
                        scope.$apply();
                    }
                }

                function initializeSnapshotWith(initializer) {
                    function initialize(data) {
                        return function (key) {
                            var element = data[key];
                            element.refId = key;
                            initializer(element);
                        };
                    }

                    return function (snapshot) {
                        var data = snapshot.val();
                        if (data) {
                            codiag.util.getIndex(data)
                                .forEach(initialize(data));
                        }
                    };
                }

                function changeFrozenStatus(freezer, scope) {
                    return function (options) {
                        var target = options.target;
                        if (!(target && target.refId)) {
                            // the element has been removed - there is nothing to change.
                            return;
                        }

                        scope.bubbles.child(target.refId).child("frozenBy").set(freezer);
                        if (freezer !== "") {
                            if (freezer === Userservice.getCurrentUserName()) {
                                scope.bubbles.child(target.refId).child("frozenBy").onDisconnect().set("");
                            }
                        } else {
                            scope.bubbles.child(target.refId).child("frozenBy").onDisconnect().cancel();
                        }
                        applyScope();
                    };
                }

                function handleFreezingForBubble(bubbleData) {
                    scope.bubbles.child(bubbleData.refId).child("frozenBy").on("value", function (snapshot) {
                        var frozenBy = snapshot.val();
                        var bubble = codiag.getBubble(bubbleData.id);
                        if (frozenBy && frozenBy !== Userservice.getCurrentUserName()) {
                            bubble.freeze(frozenBy);
                        } else if (!frozenBy &&
                            bubble.frozenBy &&
                            bubble.frozenBy !== Userservice.getCurrentUserName()) {
                            bubble.unfreeze();
                        }
                    });
                }

                function synchronizeTextChangesForBubble(bubble) {
                    scope.bubbles.child(bubble.refId).child("text").on("value", function (snapshot) {
                        var text = snapshot.val();
                        if (text) {
                            if (text !== bubble.getText()) {
                                bubble.setText(text);
                            }
                        }
                    });
                }

                function synchronizeCoordinateChangesForBubble(bubble) {
                    var childRef = scope.bubbles.child(bubble.refId);

                    childRef.child("left").on("value", function (snapshot) {
                        bubble.setLeft(snapshot.val());
                    });

                    childRef.child("top").on("value", function (snapshot) {
                        bubble.setTop(snapshot.val());
                    });
                }

                function bubbleInitializer(bubbleData) {
                    codiag.createStandaloneBubble(bubbleData);
                    var bubble = codiag.getBubble(bubbleData.id);
                    handleFreezingForBubble(bubbleData);
                    synchronizeTextChangesForBubble(bubble);
                    synchronizeCoordinateChangesForBubble(bubble);
                }

                return {
                    init: {
                        bubbles: initializeSnapshotWith(bubbleInitializer),
                        connections: initializeSnapshotWith(codiag.createConnection)
                    },
                    local: {
                        addBubble: function (snapshot) {
                            var data = snapshot.val();
                            if (!codiag.getBubble(data.id)) {
                                data.refId = snapshot.name();
                                bubbleInitializer(data);
                            }
                        },
                        addConnection: function (snapshot) {
                            var data = snapshot.val();
                            if (!codiag.getConnection(data.id)) {
                                data.refId = snapshot.name();
                                codiag.createConnection(data);
                            }
                        },
                        removeBubble: function (snapshot) {
                            var data = snapshot.val();
                            if (codiag.getBubble(data.id)) {
                                codiag.removeBubble(data, true);
                            }
                        },
                        handleFreezing: function (snapshot) {
                            handleFreezingForBubble(snapshot.val());
                        }
                    },
                    remote: {
                        addBubble: function (data) {
                            var dto = data.target.serialize();
                            var bubble = codiag.getBubble(dto.id);
                            bubble.refId = scope.bubbles.push(dto).name();
                            synchronizeTextChangesForBubble(bubble);
                            applyScope();
                        },
                        addConnection: function (data) {
                            var connection = codiag.serializer.serializeConnection(data.target);
                            codiag.getConnection(connection.id).refId = scope.connections.push(connection).name();
                            applyScope();
                        },
                        removeBubble: function (data) {
                            if (!data.refId) {
                                return;
                            }

                            scope.bubbles.child(data.refId).remove();
                            applyScope();
                        },
                        removeConnection: function (data) {
                            if (!data.target.refId) {
                                return;
                            }

                            scope.connections.child(data.target.refId).remove();
                            applyScope();
                        },
                        freeze: changeFrozenStatus(Userservice.getCurrentUserName(), scope),
                        unfreeze: changeFrozenStatus("", scope),
                        changeBubbleText: function (data) {
                            if (!data.target.refId) {
                                return;
                            }

                            scope.bubbles.child(data.target.refId).child("text").set(data.target.getText());
                            applyScope();
                        },
                        moveBubble: function (data) {
                            var refId = data.target.refId;
                            if (!refId) {
                                return;
                            }

                            scope.bubbles.child(refId).child("top").set(data.target.getTop());
                            scope.bubbles.child(refId).child("left").set(data.target.getLeft());
                            applyScope();
                        }
                    },
                };
            };
        });
})(window, window.angular, window.codiag);