(function(window, fabric, codiag, undefined) {
    "use strict";

    var currentlyEditedBubble;
    var bubbles = {};
    var connections = {};

    var canvas = new fabric.Canvas("c", {
        selection: false
    });

    canvas.setWidth(1920);
    canvas.setHeight(1080);

    codiag.canvas = canvas;

})(window, window.fabric, window.codiag = {});