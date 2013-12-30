(function(window, fabric, codiag, _, undefined) {
    "use strict";

    codiag.getLineCoords = function(from, to, format) {
        var fromCenter = from && from.shape ? from.shape.getCenterPoint() : {
            x: null,
            y: null
        },
            toCenter = to && to.shape? to.shape.getCenterPoint() : {
                x: null,
                y: null
            };
        return format && format === "json" ? {
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
    };

    codiag.createConnection = function(options) {

        var connection = new fabric.Line(codiag.getLineCoords(options.from, options.to), {
            stroke: "red",
            fill: "red",
            originX: "center",
            originY: "center",
            strokeWidth: 5,
            selectable: false
        });


        options.from.connections.output.push(connection);
        options.to.connections.input.push(connection);

        options.canvas.add(connection);
        connection.sendToBack();
    };

})(window, window.fabric, window.codiag || (window.codiag = {}), window._);