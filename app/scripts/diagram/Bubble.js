(function (window, fabric, codiag, undefined) {
    "use strict";

    function createBubbleObject(shapeOptions) {
        var left = shapeOptions.left;
        var top = shapeOptions.top;
        var opts = fabric.util.object.extend(fabric.util.object.clone(shapeOptions), {
            top: 0,
            left: 0,
            fill: codiag.style.bubble.normal.fill,
            stroke: codiag.style.bubble.normal.stroke,
            strokeWidth: codiag.style.bubble.normal.strokeWidth,
            rx: 15,
            ry: 15
        });

        var rect = new fabric.Rect(opts);
        var text = new fabric.Text(shapeOptions.text || "", {
            top: codiag.style.bubble.padding,
            left: codiag.style.bubble.padding,
            textAlign: "center",
            fill: codiag.style.bubble.normal.fontColor,
            fontSize: codiag.style.fontSize,
            fontFamily: codiag.style.font
        });

        var width = (shapeOptions.width || (shapeOptions.text && text.width)) ?
            (shapeOptions.width || text.width) + 2 * codiag.style.bubble.padding :
            codiag.style.bubble.defaultForNew.width;
        var height = shapeOptions.text && text.height ?
            text.height + 2 * codiag.style.bubble.padding :
            codiag.style.bubble.defaultForNew.height;

        rect.setWidth(width);
        rect.setHeight(height);
        var result = new fabric.Group([rect, text], {
            top: top,
            left: left
        });

        result.hasControls = false;
        result.id = shapeOptions.id;

        result.setText = function (newText) {
            codiag.getBubble(this.id).setText(newText);
        };

        result.getText = function () {
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

    codiag.Bubble = function (originalOptions, connections) {
        this.options = fabric.util.object.clone(originalOptions);
        var canvas = this.options.canvas = this.options.canvas || codiag.canvas;
        Object.freeze(this.options);
        var self = this;

        this.shape = createBubbleObject(this.options);
        this.frozenBy = originalOptions.frozenBy || "";
        this.connections = connections || {
            input: [],
            output: []
        };

        canvas.on("object:moving", function (e) {
            if (e.target === self.shape) {
                self.updateConnections();
            }
        });

        return this;
    };

    codiag.Bubble.prototype = {
        getLeft: function () {
            return this.shape.getLeft();
        },
        getText: function () {
            return this.shape.item(1).getText();
        },
        getTop: function () {
            return this.shape.getTop();
        },
        setText: function (newText) {
            this.options.canvas.remove(this.shape);
            var workingOptions = codiag.util.extendClone(this.options, {
                text: newText,
                id: this.id,
                top: this.shape.top,
                left: this.shape.left
            });
            workingOptions.width = null;
            this.shape = createBubbleObject(workingOptions);
            this.updateConnections();
        },
        setLeft: function (left) {
            var result = this.shape.setLeft(left);
            this.updateConnections();
            codiag.canvas.renderAll();
            return result;
        },
        setTop: function (top) {
            var result = this.shape.setTop(top);
            this.updateConnections();
            codiag.canvas.renderAll();
            return result;
        },
        updateConnections: function () {
            this.updateInputConnections();
            this.updateOutputConnections();
        },
        serialize: function () {
            return {
                id: this.id,
                text: this.getText(),
                left: this.shape.getLeft(),
                top: this.shape.getTop()
            };
        },
        updateOutputConnections: function () {
            this.connections.output.forEach(updateOutputConnectionCoords.bind(this, this));
        },
        updateInputConnections: function () {
            this.connections.input.forEach(updateInputConnectionCoords.bind(this, this));
        },
        freeze: function (freezer) {
            if (codiag.canvas.getActiveObject() === this.shape) {
                codiag.cancelEditing();
                codiag.canvas.setActiveObject(null);
            }

            this.shape.item(0).set(codiag.style.bubble.frozen);
            this.shape.item(1).set({
                fill: codiag.style.bubble.frozen.fontColor
            });
            this.shape.selectable = false;
            this.frozenBy = freezer;
            codiag.canvas.renderAll();
            return this;
        },
        unfreeze: function () {
            this.shape.item(0).set(codiag.style.bubble.normal);
            this.shape.item(1).set({
                fill: codiag.style.bubble.normal.fontColor
            });
            this.shape.selectable = true;
            codiag.canvas.renderAll();
            this.frozenBy = "";
            return this;
        }
    };
})(window, window.fabric, window.codiag || (window.codiag = {}));