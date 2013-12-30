(function(window, fabric, codiag, undefined) {
    "use strict";

    // var currentlyEditedBubble;
    var bubbles = {};
    var connections = {};

    var canvas = new fabric.Canvas("c", {
        selection: false
    });

    codiag.style = {
        bubblePadding: 20,
        font: "sans-serif",
        fontSize: 12
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
        var options = fabric.util.object.extend({}, shapeOptions);
        var shouldBeEditableImmediately = !options.hasOwnProperty("text");
        if (!(options.hasOwnProperty("left") || options.hasOwnProperty("top"))) {
            var coords = codiag.input.getMousePosition();
            fabric.util.object.extend(options, {
                left: coords.x,
                top: coords.y
            });
        }

        if (shouldBeEditableImmediately && !options.hasOwnProperty("width")) {
            options.width = 100;
        }

        var result = new codiag.Bubble(options, connections);
        var id = codiag.util.uuid();
        result.id = result.shape.id = id;
        bubbles[id] = result;
        if (shouldBeEditableImmediately) {
            codiag.canvas.setActiveObject(result.shape);
            codiag.changeEditedBubble(result.shape);
        }

        return result;
    };

    codiag.createChildBubble = function(shapeOptions, connections) {
        var parent = codiag.getBubble(codiag.canvas.getActiveObject().id);
        if (parent) {
            var child = codiag.createBubble(shapeOptions, connections);
            codiag.createConnection({
                from: parent,
                to: child
            });
        }
    };

    codiag.getBubble = function(id) {
        console.log("searching for", id);
        return bubbles[id];
    };

    codiag.getConnection = function(id) {
        return connections[id];
    };

    codiag.createConnection = function(options) {
        // TODO: Refactor to work on IDs only?
        var connection = new codiag.Connection(options);
        options.from.connections.output.push(connection);
        options.to.connections.input.push(connection);
        connection.id = codiag.util.uuid();
        connections[connection.id] = connection;
        connection.sendToBack();
    };

    codiag.removeConnection = function(connection) {
        Object.keys(bubbles).forEach(function(key) {
            var bubble = bubbles[key];
            if (!codiag.util.removeIfContains(bubble.connections.input, connection)) {
                codiag.util.removeIfContains(bubble.connections.output, connection);
            }
        });

        delete connections[connection.id];
        canvas.remove(connection);
        connection = null;
    };

    codiag.removeBubble = function(bubble) {
        var toRemove = bubbles[bubble.id];
        var removeConnection = codiag.removeConnection.bind(codiag);
        toRemove.connections.input.forEach(removeConnection);
        toRemove.connections.output.forEach(removeConnection);
        delete bubbles[bubble.id];
        canvas.remove(bubble);
    };

    codiag.removeCurrentBubble = function() {
        if (!codiag.isEditingABubble()) {
            codiag.removeBubble(canvas.getActiveObject());
        }
    };

})(window, window.fabric, (window.codiag || (window.codiag = {})));