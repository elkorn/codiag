(function(window, fabric, codiag, $, undefined) {
    "use strict";


    function enable(elem) {
        elem.disabled = undefined;
    }

    function disable(elem) {
        elem.disabled = "true";
    }

    codiag.initializeDiagramMenu = function() {
        var buttons = {
            ADD_STANDALONE: document.getElementById("addStandalone"),
            ADD_CHILD: document.getElementById("addChild"),
            REMOVE: document.getElementById("delete")
        };

        codiag.canvas.on("selection:cleared", function() {
            disable(buttons.ADD_CHILD);
            disable(buttons.REMOVE);
        });

        codiag.canvas.on("object:selected", function() {
            enable(buttons.ADD_CHILD);
            enable(buttons.REMOVE);
        });

        function hideCreationPopovers() {
            $([buttons.ADD_STANDALONE, buttons.ADD_CHILD]).popover("hide");
        }

        codiag.canvas.on("mode:creation:disabled", hideCreationPopovers);

        $(buttons.ADD_STANDALONE).on("click", codiag.toggleCreationMode.bind(codiag));
        $(buttons.REMOVE).on("click", codiag.removeCurrentBubble.bind(codiag));
    };

})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);