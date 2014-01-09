(function(window, fabric, codiag, undefined) {
    "use strict";

    var defaults = {
        stroke: codiag.style.connection.stroke,
        fill: codiag.style.connection.fill,
        originX: "center",
        originY: "center",
        strokeWidth: codiag.style.connection.strokeWidth,
        selectable: false
    };

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

    codiag.Connection = function(options) {
        var result = new fabric.Line(
            codiag.getLineCoords(options.from, options.to),
            codiag.util.extendClone(defaults, options));
        (options.canvas || codiag.canvas).add(result);
   

        return result;
    };

})(window, window.fabric, window.codiag || (window.codiag = {}));