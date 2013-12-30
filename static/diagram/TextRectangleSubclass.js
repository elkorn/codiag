(function(window, fabric, codiag, _, undefined){
    "use strict";
    var padding = 15;
    codiag.TextRect = fabric.util.createClass(fabric.Rect, {
        type: "TextRect",
        initialize: function(options) {
            options = options || {};
            this.callSuper("initialize", options);
            this.set("text", options.text || "");
            this.hasBorders = false;
            this.hasControls = false;
        },
        // This will be useful for serialization/deserialization
        toObject: function() {
            return fabric.util.object.extend(this.callSuper("toObject"), {
                text: this.get("text")
            });
        },
        _render: function(ctx) {
            this.callSuper("_render", ctx);
            ctx.font = "1em Verdana";
            ctx.fillStyle = "#333";
            var textSize = ctx.measureText(this.text);
            this.setWidth(textSize.width + 2 * padding);
            this.setHeight(textSize.height + 2 * padding);
            ctx.fillText(this.text, -this.width/2, -this.height/2);
        }
    });
})(window, window.fabric, window.codiag || (window.codiag = {}), window._);
