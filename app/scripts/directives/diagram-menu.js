(function(window, fabric, codiag, $, undefined) {
    "use strict";

    angular.module("codiagApp")
        .directive("diagramMenu", function() {
            return {
                templateUrl: "partials/diagram-menu.html",
                replace: true,
                restrict: "A",
                link: function postLink(scope, element, attrs) {
                    scope.$on("codiag:diagram:initialized", function() {
                        console.log("initializing menu...");
                        codiag.initializeDiagramMenu();
                    });
                }
            };
        });
})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);