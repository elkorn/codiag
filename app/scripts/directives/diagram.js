(function (window, fabric, codiag, $, undefined) {
    "use strict";

    angular.module("codiagApp")
        .directive("diagram", function (DiagramSynchronizer, Userservice) {
            return {
                templateUrl: "partials/diagram.html",
                replace: false,
                restrict: "A",
                transclude: true,
                link: function postLink(scope) {
                    var synchronizer = new DiagramSynchronizer(scope);
                    codiag.initializeDiagram();
                    codiag.enableDiagramHotkeys();
                    codiag.input.startTrackingMouse();
                    codiag.initializeTextEditing();
                    scope.$emit("codiag:diagram:initialized");

                    scope.$on("$routeChangeStart", codiag.disableDiagramHotkeys);

                    function unfreezeBubbleOnRouteChange(data) {
                        scope.$on("$routeChangeStart", function () {
                            var bubble = codiag.getBubble(data.id);
                            if (bubble.frozenBy === Userservice.getCurrentUserName()) {
                                synchronizer.remote.unfreeze({
                                    target: bubble
                                });
                            }
                        });
                    }

                    scope.diagram.once("value", function initializeData() {
                        scope.bubbles = scope.diagram.child("bubbles");
                        scope.connections = scope.diagram.child("connections");

                        if (!scope.$$phase) {
                            scope.$apply();
                        }

                        scope.bubbles.once("value", function (snapshot) {
                            synchronizer.init.bubbles(snapshot);
                            var data = snapshot.val();
                            if (data) {
                                Object.keys(data).forEach(function (key) {
                                    unfreezeBubbleOnRouteChange(data[key]);
                                });
                            }
                        });

                        scope.connections.once("value", synchronizer.init.connections);
                        scope.bubbles.on("child_added", synchronizer.local.addBubble);
                        scope.bubbles.on("child_removed", synchronizer.local.removeBubble);
                        codiag.canvas.on("bubble:created", synchronizer.remote.addBubble);
                        codiag.canvas.on("bubble:removed", synchronizer.remote.removeBubble);
                        codiag.canvas.on("bubble:text:changed", synchronizer.remote.changeBubbleText);

                        scope.connections.on("child_added", synchronizer.local.addConnection);
                        codiag.canvas.on("connection:created", synchronizer.remote.addConnection);
                        codiag.canvas.on("connection:removed", synchronizer.remote.removeConnection);

                        codiag.canvas.on("object:selected", function (data) {
                            var bubble = codiag.getBubble(data.target.id);
                            var id = bubble.id;
                            if (!bubble.getText()) {
                                // The bubble has not been yet fully created.
                                return;
                            }

                            if (scope.currentlyFrozenBubble && scope.currentlyFrozenBubble !== id) {
                                synchronizer.remote.unfreeze({
                                    target: codiag.getBubble(scope.currentlyFrozenBubble)
                                });

                                scope.currentlyFrozenBubble = id;
                            }

                            synchronizer.remote.freeze({
                                target: bubble
                            });
                        });

                        codiag.canvas.on("object:deselected", synchronizer.remote.unfreeze);
                        codiag.canvas.on("object:moved", synchronizer.remote.moveBubble);
                    });
                }
            };
        });
})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);