(function(window, fabric, codiag, _, undefined) {
    "use strict";

    var buttons = {
        ADD_STANDALONE: document.getElementById("addStandalone"),
        ADD_CHILD: document.getElementById("addChild")
    };

    function enable(elem) {
        elem.disabled = undefined;
    }

    function disable(elem) {
        elem.disabled = "tre=ue";
    }

    codiag.canvas.on("selection:cleared", function() {
        disable(buttons.ADD_CHILD);
    });

    codiag.canvas.on("object:selected", function() {
        enable(buttons.ADD_CHILD);
    });

})(window, window.fabric, window.codiag || (window.codiag = {}), window._);