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

    codiag.canvas.on("mouse:move", codiag.util.debounce(trackPosition, 10));

    (codiag.input || (codiag.input = {})).getMousePosition = function() {
        return coords;
    };

})(window, window.fabric, (window.codiag || (window.codiag = {})));