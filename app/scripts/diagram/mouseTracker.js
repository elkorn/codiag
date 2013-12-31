(function(window, fabric, codiag, undefined) {
    "use strict";

    var coords = {
        x: 0,
        y: 0
    };

    function trackPosition(data) {
        coords.x = data.e.layerX;
        coords.y = data.e.layerY;
    }

    var trackingFn = codiag.util.debounce(trackPosition, 10);


    (codiag.input || (codiag.input = {})).getMousePosition = function() {
        return coords;
    };

    codiag.input.startTrackingMouse = function() {
        codiag.canvas.on("mouse:move", trackingFn);
    };

    codiag.input.stopTrackingMouse = function() {
        codiag.canvas.off("mouse:move", trackingFn);
    };

})(window, window.fabric, (window.codiag || (window.codiag = {})));
