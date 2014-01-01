(function(window, fabric, codiag, $, undefined) {
    "use strict";

    angular.module("codiagApp")
        .directive("diagramMenu", function() {
            return {
                templateUrl: "partials/diagram-menu.html",
                replace: true,
                restrict: "A",
                link: function postLink(scope, element, attrs) {
                    codiag.initializeDiagramMenu();
                }
            };
        });
})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);