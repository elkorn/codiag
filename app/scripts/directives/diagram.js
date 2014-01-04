(function(window, fabric, codiag, $, undefined) {
    "use strict";

    angular.module("codiagApp")
        .directive("diagram", function() {
            return {
                templateUrl: "partials/diagram.html",
                replace: true,
                restrict: "A",
                room: "=",
                link: function postLink(scope) {
                    codiag.initializeDiagram();
                    codiag.enableDiagramHotkeys();
                    codiag.input.startTrackingMouse();
                    codiag.initializeTextEditing();

                    scope.$emit("codiag:diagram:initialized");

                    scope.room.$on("loaded", function(roomData) {
                        console.log(JSON.stringify(roomData.diagram, null, 2));
                        codiag.createDiagramFromSerializedData(roomData.diagram);
                    });
                }
            };
        });
})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);