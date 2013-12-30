(function(window, fabric, codiag, undefined) {
    "use strict";

    // var currentlyEditedBubble;
    var bubbles = {};
    var connections = {};

    var canvas = new fabric.Canvas("c", {
        selection: false
    });

    codiag.style = {
        bubblePadding: 20
    };

    (codiag.util || (codiag.util = {})).uuid = function() {
        var result;
        var existingUuids = Object.keys(bubbles).concat(Object.keys(connections));
        while (existingUuids.indexOf((result = Math.uuid())) !== -1) {}
        return result;
    };

    canvas.setWidth(1920);
    canvas.setHeight(1080);

    codiag.canvas = canvas;


    codiag.createBubble = function(shapeOptions, connections) {
        var result = new codiag.Bubble(shapeOptions, connections);
        var id = codiag.util.uuid();
        result.id = result.shape.id = id;
        bubbles[id] = result;
        return result;
    };

    codiag.getBubble = function(id) {
        console.log("searching for", id);
        return bubbles[id];
    };

    codiag.getConnection = function(id) {
        return connections[id];
    };

    // TODO: Refactor to put into Connection.js
    codiag.createConnection = function(options) {
        var connection = new fabric.Line(codiag.getLineCoords(options.from, options.to), {
            stroke: "red",
            fill: "red",
            originX: "center",
            originY: "center",
            strokeWidth: 5,
            selectable: false
        });

        // TODO: Refactor to work on IDs only.
        options.from.connections.output.push(connection);
        options.to.connections.input.push(connection);

        options.canvas.add(connection);

        connection.id = codiag.util.uuid();
        connections[connection.id] = connection;
        connection.sendToBack();
    };

})(window, window.fabric, window.codiag = {});