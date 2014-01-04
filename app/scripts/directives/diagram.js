(function(window, fabric, codiag, $, undefined) {
    "use strict";

    angular.module("codiagApp")
        .directive("diagram", function(DiagramService) {
            return {
                templateUrl: "partials/diagram.html",
                replace: true,
                restrict: "A",
                room: "=",
                link: function postLink(scope, element, attrs) {
                    codiag.initializeDiagram();
                    codiag.enableDiagramHotkeys();
                    codiag.input.startTrackingMouse();
                    codiag.initializeTextEditing();

                    scope.$emit("codiag:diagram:initialized");

                    // var diagram = DiagramService.getDiagram();

                    // TODO: serialize this to firebase and test further
                    var canvas = codiag.canvas;
                    var x = codiag.createStandaloneBubble({
                        text: "lorem ipsum dolor sit amet\nthis is a multiline text\nit should be centered",
                        left: 10,
                        top: 100,
                        canvas: canvas
                    });

                    var y = codiag.createStandaloneBubble({
                        text: "the second element\nwith multiline text",
                        left: 300,
                        top: 400,
                        canvas: canvas
                    });

                    codiag.createConnection({
                        from: x,
                        to: y,
                        canvas: canvas
                    });
                }
            };
        });
})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);