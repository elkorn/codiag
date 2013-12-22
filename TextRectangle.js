(function(window, fabric, codiag, _, undefined){
    "use strict";
    var padding = 20;
    codiag.Bubble = function(shapeOptions) {
        var left = shapeOptions.left;
        var top = shapeOptions.top;
        var opts =  fabric.util.object.extend(fabric.util.object.clone(shapeOptions), {
            top: 0,
            left: 0,
            fill: "rgb(230,230,230)",
            stroke: "rgba(150,150,150,0.5)",
            strokeWidth: 3,
            rx: 5,
            ry: 5
        });
        // shapeOptions.left = null;
        // shapeOptions.top = null;
        var rect = new fabric.Rect(opts);
        var text = new fabric.Text(shapeOptions.text || "", {
            top: padding,
            left: padding,
            textAlign: "center"
        });

        rect.setWidth(text.width + 2*padding);
        rect.setHeight(text.height + 2*padding);
        var result = new fabric.Group([rect,text], {
            top: top,
            left: left
        });

        result.hasControls = false;
        result.setText = function(newText) {
            shapeOptions.canvas.remove(result);
            result = new codiag.Bubble(fabric.util.object.extend(shapeOptions, {text: newText}));
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

        shapeOptions.canvas.add(result);
        return result;
    };
})(window, window.fabric, window.codiag || (window.codiag = {}), window._);
