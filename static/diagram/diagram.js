(function(window, fabric, codiag, undefined) {
    "use strict";

    // var currentlyEditedBubble;
    var bubbles = {};
    var connections = {};

    var canvas = new fabric.Canvas("c", {
        selection: false
    });

    function uuid() {
        var result;
        var existingUuids = Object.keys(bubbles).concat(Object.keys(connections));
        while (existingUuids.indexOf((result = Math.uuid())) !== -1) {}

        return result;
    }

    canvas.setWidth(1920);
    canvas.setHeight(1080);

    codiag.canvas = canvas;


    codiag.createBubble = function(shapeOptions, connections) {
        var result = new codiag.Bubble(shapeOptions, connections);
        var id = uuid();
        result.shape.id = id;
        bubbles[id] = result;
        return result;
    };

    codiag.getBubble = function(uuid) {
        return bubbles[uuid];
    };

})(window, window.fabric, window.codiag = {});