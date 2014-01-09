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
        codiag.canvas.off("mouse:up", createStandaloneBubbleOnDemand);
        codiag.canvas.off("mouse:up", createChildBubbleOnDemand);
        codiag.canvas.off("object:selected", createConnectionOnDemand);
        connectionOrigin = null;
        isInCreationMode = false;
        codiag.canvas.fire("mode:creation:disabled");
    }

    function enableCreationMode() {
        if (!isInCreationMode) {
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
            var connection = codiag.createConnection({
                from: connectionOrigin,
                to: target
            });

            codiag.canvas.fire("connection:created", {
                target: connection
            });
        }

        codiag.disableCreationMode();
    }

    function createConnectionFromSerializedData(connection) {
        codiag.createConnection(codiag.serializer.deserializeConnectionOptions(connection));
    }

    function objectMoved(data) {
        canvas.fire("object:moved", {
            target: codiag.getBubble(data.target.id)
        });
    }

    (codiag.util || (codiag.util = {})).uuid = function() {
        var result;
        var existingUuids = Object.keys(bubbles).concat(Object.keys(connections));
        while (existingUuids.indexOf((result = Math.uuid())) !== -1) {}
        return result;
    };

    codiag.enableCreationMode = enableCreationMode;
    codiag.disableCreationMode = disableCreationMode;

    codiag.serialize = function() {
        return codiag.serializer.serialize({
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
            if (currentParentBubble) {
                canvas.fire("object:deselected", {
                    target: codiag.getBubble(currentParentBubble.id)
                });
            }

            currentParentBubble = canvas.getActiveObject();
        });

        canvas.on("before:selection:cleared", function(data) {
            var deselectedBubble = codiag.getBubble(data.target.id);
            if (deselectedBubble) {
                // This means that the deselected bubble still exists - it has not been removed.
                canvas.fire("object:deselected", {
                    target: deselectedBubble
                });
            }
        });

        canvas.on("object:moving", codiag.util.debounce(objectMoved));
    };

    codiag.getCurrentlySelectedBubble = function() {
        return currentParentBubble;
    };

    codiag.createStandaloneBubble = function(shapeOptions) {
        var options = fabric.util.object.extend({}, shapeOptions);
        var shouldBeEditableImmediately = !options.hasOwnProperty("text");
        if (!(options.hasOwnProperty("left") || options.hasOwnProperty("top"))) {
            var coords = codiag.input.getMousePosition();
            fabric.util.object.extend(options, {
                left: coords.x,
                top: coords.y
            });
        }

        var result = new codiag.Bubble(options);
        var id = options.id || codiag.util.uuid();
        result.id = result.shape.id = id;
        result.refId = options.refId;

        bubbles[id] = result;
        if (shouldBeEditableImmediately) {
            codiag.canvas.setActiveObject(result.shape);
            codiag.changeEditedBubble(result.shape);
        }

        return result;
    };

    codiag.createChildBubble = function(shapeOptions) {
        var parent = codiag.getBubble(currentParentBubble.id);
        var connection;

        function fireConnectionCreated() {
            codiag.canvas.off("bubble:created", fireConnectionCreated);
            codiag.canvas.fire("connection:created", {
                target: connection
            });
        }

        if (parent) {
            codiag.canvas.on("bubble:created", fireConnectionCreated);
            var child = codiag.createStandaloneBubble(shapeOptions);
            connection = codiag.createConnection({
                from: parent,
                to: child
            });

            currentParentBubble = child.shape;
            canvas.setActiveObject(child.shape);
        }
    };

    codiag.getBubble = function(id) {
        return bubbles[id];
    };

    codiag.getConnection = function(id) {
        return connections[id];
    };

    codiag.createConnection = function(options) {
        if (typeof(options.from) === "string" && typeof(options.to) === "string") {
            return createConnectionFromSerializedData(options);
        } else {
            var connection = new codiag.Connection(options);
            options.from.connections.output.push(connection);
            options.to.connections.input.push(connection);
            connection.id = options.id || codiag.util.uuid();
            connections[connection.id] = connection;
            connection.refId = options.refId;
            connection.sendToBack();
            return connection;
        }
    };

    codiag.removeConnection = function(connectionId) {
        var connection = codiag.getConnection(connectionId);
        connection.from.connections.output.splice(connection.from.connections.output.indexOf(connection), 1);
        connection.to.connections.input.splice(connection.to.connections.input.indexOf(connection), 1);
        canvas.remove(connection);
        codiag.canvas.fire("connection:removed", {
            target: connection
        });
        delete connections[connection.id];
        connection = null;
    };

    codiag.removeBubble = function(bubble, silent) {
        var toRemove = bubbles[(typeof(bubble) === "string" ? bubble : bubble.id)];
        var refId = toRemove.refId;
        var removeConnection = codiag.removeConnection.bind(codiag);
        toRemove.connections.input.map(codiag.util.get("id")).forEach(removeConnection);
        toRemove.connections.output.map(codiag.util.get("id")).forEach(removeConnection);
        delete bubbles[toRemove.id];
        canvas.remove(toRemove.shape);
        disableCreationMode();
        if (!silent) {
            codiag.canvas.fire("bubble:removed", {
                refId: refId
            });
        }
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