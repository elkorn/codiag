(function(window, fabric, codiag, Mousetrap, undefined) {
    "use strict";

    var hotkeys = {
        "ADD_BUBBLE": "enter",
        "ADD_CHILD_BUBBLE": "insert"
    };

    Mousetrap.bind("space", function() {
        var activeObject = codiag.canvas.getActiveObject(),
            result;

        if (activeObject) {
            result = !! activeObject.isInEditMode;
            if (!result) {
                codiag.canvas.fire("object:enableEditMode", {
                    target: activeObject
                });
            }

        } else {
            result = false;
        }

        return result;
    });

    Mousetrap.bind(hotkeys.ADD_BUBBLE, function() {
        console.log("Adding bubble");
        var activeObject = codiag.canvas.getActiveObject();
        if (!(activeObject && activeObject.isInEditMode)) {
            codiag.createBubble();
            return false;
        }
    });

})(window, window.fabric, window.codiag || (window.codiag = {}), window.Mousetrap);