"use strict";

angular.module("codiagApp")
  .directive("diagram", function () {
    return {
      templateUrl: "<div class=\"diagram-container\"><canvas id=\"canvas\" class=\"diagram\"></canvas></div>",
      restrict: "E",
      link: function postLink(scope, element, attrs) {
        element.text("this is the diagram directive");
      }
    };
  });


(function(window, fabric, codiag, $, undefined) {
    "use strict";

    angular.module("codiagApp")
        .controller("DiagramCtrl", function($scope, $routeParams, RoomsService) {
            var currentRoomId = $routeParams.roomId;
            RoomsService.query(function(data) {
                $scope.room = window.codiag.util.findFirst(data)(function(room) {
                    return room.id === currentRoomId;
                });
            });

            $(function() {
                codiag.initializeDiagram();
                codiag.enableDiagramHotkeys();
                codiag.input.startTrackingMouse();
                codiag.initializeTextEditing();
                codiag.initializeDiagramMenu();

                var canvas = codiag.canvas;
                var x = codiag.createBubble({
                    text: "lorem ipsum dolor sit amet\nthis is a multiline text\nit should be centered",
                    left: 10,
                    top: 100,
                    canvas: canvas
                });

                var y = codiag.createBubble({
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
            });
        });
})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);