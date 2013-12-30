(function(window, fabric, codiag, Mousetrap, undefined) {
    "use strict";

    var hotkeys = {
        "ADD_BUBBLE": "enter",
        "ADD_CHILD_BUBBLE": "ins",
        "CANCEL": "escape"
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
        var activeObject = codiag.canvas.getActiveObject();
        if ((activeObject && !activeObject.isInEditMode) || !activeObject) {
            codiag.createBubble();
            return false;
        }
    });

    Mousetrap.bind(hotkeys.ADD_CHILD_BUBBLE, function() {
        var activeObject = codiag.canvas.getActiveObject();
        if (activeObject) {
            codiag.createChildBubble();
            return false;
        }
    });

    Mousetrap.bind(hotkeys.CANCEL, function() {
        codiag.cancelEditing();
    });

})(window, window.fabric, window.codiag || (window.codiag = {}), window.Mousetrap);