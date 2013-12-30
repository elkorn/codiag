(function(window, fabric, codiag, _, undefined) {
    "use strict";

    codiag.getLineCoords = function(from, to, format) {
        var fromCenter = from && from.shape ? from.shape.getCenterPoint() : {
            x: null,
            y: null
        },
            toCenter = to && to.shape ? to.shape.getCenterPoint() : {
                x: null,
                y: null
            };

        var result = format && format === "json" ? {
            x1: fromCenter.x,
            y1: fromCenter.y,
            x2: toCenter.x,
            y2: toCenter.y
        } : [
            fromCenter.x,
            fromCenter.y,
            toCenter.x,
            toCenter.y
        ];

        return result;
    };

    var defaults = {
        stroke: "red",
        fill: "red",
        originX: "center",
        originY: "center",
        strokeWidth: 5,
        selectable: false
    };

    codiag.Connection = function(options) {
        var result = new fabric.Line(
            codiag.getLineCoords(options.from, options.to),
            codiag.util.extendClone(defaults, options));
        options.canvas.add(result);
        return result;
    };

})(window, window.fabric, window.codiag || (window.codiag = {}), window._);