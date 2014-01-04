(function(window, fabric, codiag, undefined) {
    "use strict";
    /*
        https://github.com/kangax/fabric.js/wiki/Working-with-events
     */
    var currentParentBubble;
    var connectionOrigin;
    var bubbles = {};
    var connections = {};
    var isInCreationMode = false;

    var canvas;

    function disableCreationMode() {
        console.log("Leaving creation mode.");
        codiag.canvas.off("mouse:up", createStandaloneBubbleOnDemand);
        codiag.canvas.off("mouse:up", createChildBubbleOnDemand);
        codiag.canvas.off("object:selected", createConnectionOnDemand);
        connectionOrigin = null;
        isInCreationMode = false;
        codiag.canvas.fire("mode:creation:disabled");
    }

    function enableCreationMode() {
        if (!isInCreationMode) {
            console.log("Entering creation mode.");
            isInCreationMode = true;
            codiag.canvas.fire("mode:creation:enabled");
        }
    }

    function handleCreationModeSwitching(creationMode) {
        if (isInCreationMode) {
            codiag.disableCreationMode();
        } else {
            enableCreationMode();
            codiag.canvas.on("mouse:up", creationMode);
        }
    }

    function createStandaloneBubbleOnDemand() {
        var coords = codiag.input.getMousePosition();
        disableCreationMode();
        codiag.createStandaloneBubble({
            left: coords.x,
            top: coords.y
        });
    }

    function createChildBubbleOnDemand() {
        var coords = codiag.input.getMousePosition();
        disableCreationMode();
        codiag.createChildBubble({
            left: coords.x,
            top: coords.y
        });
    }

    function createConnectionOnDemand(event) {
        var target = codiag.getBubble(event.target.id);
        var connectionAlreadyExists = Object.keys(connections).some(function(key) {
            var connection = connections[key];
            return (connection.from === connectionOrigin && connection.to === target) ||
                (connection.to === connectionOrigin && connection.from === target);
        });

        if (!connectionAlreadyExists) {
            codiag.createConnection({
                from: connectionOrigin,
                to: target
            });
        }

        codiag.disableCreationMode();
    }

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

    codiag.enableCreationMode = enableCreationMode;
    codiag.disableCreationMode = disableCreationMode;

    codiag.serialize = function() {
        return codiag._serializer.serialize({
            bubbles: bubbles,
            connections: connections
        });
    };

    codiag.initializeDiagram = function() {
        canvas = new fabric.Canvas("canvas", {
            selection: false
        });

        canvas.setWidth(2000);
        canvas.setHeight(2000);
        codiag.canvas = canvas;

        canvas.on("object:selected", function() {
            currentParentBubble = canvas.getActiveObject();
        });
    };

    codiag.createStandaloneBubble = function(shapeOptions, connections) {
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

        codiag.canvas.fire("bubble:created", {
            target: result
        });

        return result;
    };

    codiag.createChildBubble = function(shapeOptions, connections) {
        var parent = codiag.getBubble(currentParentBubble.id);
        if (parent) {
            var child = codiag.createStandaloneBubble(shapeOptions, connections);
            codiag.createConnection({
                from: parent,
                to: child
            });

            currentParentBubble = child.shape;
            canvas.setActiveObject(child.shape);
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
        disableCreationMode();
    };

    codiag.removeCurrentBubble = function() {
        if (!codiag.isEditingABubble()) {
            codiag.removeBubble(canvas.getActiveObject());
        }
    };

    codiag.toggleStandaloneCreationMode = function() {
        handleCreationModeSwitching(createStandaloneBubbleOnDemand);
    };

    codiag.toggleChildCreationMode = function() {
        handleCreationModeSwitching(createChildBubbleOnDemand);
    };

    codiag.toggleConnectionMode = function() {
        if (!isInCreationMode) {
            var activeObject = codiag.canvas.getActiveObject();
            if (activeObject) {
                enableCreationMode();
                codiag.canvas.fire("mode:connection:enabled");
                connectionOrigin = codiag.getBubble(activeObject.id);
                codiag.canvas.on("object:selected", createConnectionOnDemand);
            }
        }
    };

})(window, window.fabric, (window.codiag || (window.codiag = {})));