(function(window, fabric, codiag, Mousetrap, undefined) {
    "use strict";

    Mousetrap.bind("space", function() {
        var activeObject = codiag.canvas.getActiveObject(),
            result;

        if (activeObject) {
            result = !!activeObject.isInEditMode;
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

})(window, window.fabric, window.codiag || (window.codiag = {}), window.Mousetrap);