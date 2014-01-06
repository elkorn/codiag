(function(window, fabric, codiag, $, undefined) {
    "use strict";

    angular.module("codiagApp")
        .directive("diagram", function(DiagramSynchronizer) {
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

                    function unfreezeBubbleOnRouteChange(data) {
                        scope.$on("$routeChangeStart", function() {
                            synchronizer.remote.unfreeze({
                                target: codiag.getBubble(data.id)
                            });
                        });
                    }

                    scope.diagram.once("value", function initializeData() {
                        scope.bubbles = scope.diagram.child("bubbles");
                        scope.connections = scope.diagram.child("connections");

                        if (!scope.$$phase) {
                            scope.$apply();
                        }

                        scope.bubbles.once("value", function(snapshot) {
                            synchronizer.init.bubbles(snapshot);
                            var data = snapshot.val();
                            Object.keys(data).forEach(function(key){
                                unfreezeBubbleOnRouteChange(data[key]);
                            });
                        });

                        scope.connections.once("value", synchronizer.init.connections);

                        scope.bubbles.on("child_added", synchronizer.local.addBubble);
                        scope.bubbles.on("child_removed", synchronizer.local.removeBubble);
                        codiag.canvas.on("bubble:created", synchronizer.remote.addBubble);
                        codiag.canvas.on("bubble:removed", synchronizer.remote.removeBubble);
                        codiag.canvas.on("bubble:text:changed", synchronizer.remote.changeBubbleText);

                        // removing connections should be handled when removing connected bubbles.
                        scope.connections.on("child_added", synchronizer.local.addConnection);
                        // scope.connections.on("child_removed", synchronizer.local.removeConnection);
                        codiag.canvas.on("connection:created", synchronizer.remote.addConnection);
                        // codiag.canvas.on("connection:removed", synchronizer.remote.removeConnection);

                        scope.bubbles.on("child_changed", synchronizer.local.handleFreezing);
                        codiag.canvas.on("object:selected", function(data) {
                            var bubble = codiag.getBubble(data.target.id);
                            var id = bubble.id;
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
                    });
                }
            };
        });
})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);