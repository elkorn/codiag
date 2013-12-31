(function(window, fabric, codiag, Mousetrap, undefined) {
    "use strict";
    /*
        For modifier keys you can use shift, ctrl, alt, option, meta, and command.

        Other special keys are backspace, tab, enter, return, capslock, esc, escape, space, pageup, pagedown, end, home,
        left, up, right, down, ins, and del.

        Any other key you should be able to reference by name like a, /, $, *, or =.
     */

    var hotkeys = {
        "ADD_BUBBLE": "enter",
        "ADD_CHILD_BUBBLE": "ins",
        "CANCEL": "escape",
        "DELETE_BUBBLE": "del"
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

    Mousetrap.bind(hotkeys.CANCEL, codiag.cancelEditing.bind(codiag));
    Mousetrap.bind(hotkeys.DELETE_BUBBLE, codiag.removeCurrentBubble.bind(codiag));

})(window, window.fabric, window.codiag || (window.codiag = {}), window.Mousetrap);