(function(window, fabric, codiag, _, undefined) {
    "use strict";
    var padding = 20;
    codiag.Bubble = function(shapeOptions, connections) {
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
            top: padding,
            left: padding,
            textAlign: "center"
        });

        rect.setWidth(text.width + 2 * padding);
        rect.setHeight(text.height + 2 * padding);
        var result = new fabric.Group([rect, text], {
            top: top,
            left: left
        });

        var self = this;

        result.hasControls = false;
        this.setText = function(newText) {
            shapeOptions.canvas.remove(result);
            shapeOptions.top = result.top;
            shapeOptions.left = result.left;
            result = new codiag.Bubble(fabric.util.object.extend(shapeOptions, {
                text: newText
            }));

            // Causes trouble with positioning.
            // if(typeof(newText) !== "undefined") {
            //     var textNode = result.item(1);
            //     var rectNode = result.item(0);
            //     textNode.set({
            //         text: newText || ""
            //     });

            //     var newSize = {
            //         width: textNode.width + 2 * padding,
            //         height: textNode.height + 2 * padding
            //     };

            //     rectNode.set(fabric.util.object.extend(newSize, { left: 0, top: 0}));
            //     result.set(newSize);
            //     // textNode.set({
            //     //     left: 0,
            //     //     top: 0
            //     // });
            // }
        };

        this.getText = function() {
            return this.shape.item(1).getText();
        };

        shapeOptions.canvas.add(result);
        this.connections = connections || {
            input: [],
            output: []
        };

        shapeOptions.canvas.on("object:moving", function(e) {
            if (e.target === result) {
                self.connections.input.forEach(codiag.Bubble.prototype.updateInputConnectionCoords.bind(self));
                self.connections.output.forEach(codiag.Bubble.prototype.updateOutputConnectionCoords.bind(self));
            }
        });

        this.shape = result;
        this.shape.id = this.id = Math.uuid();
        return this;
    };

    codiag.Bubble.prototype = {
        updateOutputConnectionCoords: function(connection) {
            var coords = codiag.getLineCoords(this, null, "json");
            connection.set({
                x1: coords.x1,
                y1: coords.y1
            });
        },
        updateInputConnectionCoords: function(connection) {
            var coords = codiag.getLineCoords(null, this, "json");
            connection.set({
                x2: coords.x2,
                y2: coords.y2
            });
        }
    };
})(window, window.fabric, window.codiag || (window.codiag = {}), window._);