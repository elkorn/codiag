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

                    scope.diagram.once("value", function initializeData() {
                        scope.bubbles = scope.diagram.child("bubbles");
                        scope.connections = scope.diagram.child("connections");

                        if (!scope.$$phase) {
                            scope.$apply();
                        }

                        scope.bubbles.once("value", synchronizer.init.bubbles);
                        scope.connections.once("value", synchronizer.init.connections);

                        scope.bubbles.on("child_added", synchronizer.local.addBubble);
                        scope.bubbles.on("child_removed", synchronizer.local.removeBubble);
                        codiag.canvas.on("bubble:created", synchronizer.remote.addBubble);
                        codiag.canvas.on("bubble:removed", synchronizer.remote.removeBubble);

                        scope.connections.on("child_added", synchronizer.local.addConnection);
                        codiag.canvas.on("connection:created", synchronizer.remote.addConnection);
                    });
                }
            };
        });
})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);