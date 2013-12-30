(function(window, fabric, codiag, _, undefined) {
    "use strict";

    function createBubbleObject(shapeOptions) {
        var left = shapeOptions.left;
        var top = shapeOptions.top;
        var opts = fabric.util.object.extend(fabric.util.object.clone(shapeOptions), {
            top: 0,
            left: 0,
            fill: "rgb(230,230,230)",
            stroke: "rgba(150,150,150,0.5)",
            strokeWidth: 3,
            rx: 15,
            ry: 15
        });

        var rect = new fabric.Rect(opts);
        var text = new fabric.Text(shapeOptions.text || "", {
            top: codiag.style.bubblePadding,
            left: codiag.style.bubblePadding,
            textAlign: "center"
        });

        rect.setWidth(text.width + 2 * codiag.style.bubblePadding);
        rect.setHeight(text.height + 2 * codiag.style.bubblePadding);
        var result = new fabric.Group([rect, text], {
            top: top,
            left: left
        });

        result.hasControls = false;
        result.id = shapeOptions.id;

        result.setText = function(newText) {
            codiag.getBubble(this.id).setText(newText);
        };

        result.getText = function() {
            return codiag.getBubble(this.id).getText();
        };

        shapeOptions.canvas.add(result);

        return result;
    }

    function updateOutputConnectionCoords(obj, connection) {
        var coords = codiag.getLineCoords(obj, null, "json");
        connection.set({
            x1: coords.x1,
            y1: coords.y1
        });
    }

    function updateInputConnectionCoords(obj, connection) {
        var coords = codiag.getLineCoords(null, obj, "json");
        connection.set({
            x2: coords.x2,
            y2: coords.y2
        });
    }

    codiag.Bubble = function(originalOptions, connections) {
        this.options = fabric.util.object.clone(originalOptions);
        Object.freeze(this.options);

        var canvas = this.options.canvas || codiag.canvas;
        var self = this;

        this.shape = createBubbleObject(this.options);
        this.connections = connections || {
            input: [],
            output: []
        };

        canvas.on("object:moving", function(e) {
            if (e.target === self.shape) {
                self.updateConnections();
            }
        });

        return this;
    };

    codiag.Bubble.prototype = {
        getText: function() {
            return this.shape.item(1).getText();
        },
        setText: function(newText) {
            console.log("setting text");
            this.options.canvas.remove(this.shape);
            this.shape = createBubbleObject(
                fabric.util.object.extend(
                    fabric.util.object.clone(this.options), {
                        text: newText,
                        id: this.id,
                        top: this.shape.top,
                        left: this.shape.left
                    }));
            this.updateConnections();
        },
        updateConnections: function() {
            this.updateInputConnections();
            this.updateOutputConnections();
        },
        updateOutputConnections: function() {
            this.connections.output.forEach(updateOutputConnectionCoords.bind(this, this));
        },
        updateInputConnections: function() {
            this.connections.input.forEach(updateInputConnectionCoords.bind(this, this));
        }
    };
})(window, window.fabric, window.codiag || (window.codiag = {}), window._);