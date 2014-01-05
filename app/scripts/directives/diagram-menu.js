(function(window, fabric, codiag, $, undefined) {
    "use strict";

    angular.module("codiagApp")
        .directive("diagramMenu", function() {
            return {
                templateUrl: "partials/diagram-menu.html",
                replace: true,
                restrict: "A",
                scope: {
                    room: "="
                },
                link: function postLink(scope, element, attrs) {
                    scope.$on("codiag:diagram:initialized", function() {
                        codiag.initializeDiagramMenu();
                    });
                }
            };
        });
})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);