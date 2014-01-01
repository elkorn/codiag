(function(window, fabric, codiag, $, undefined) {
    "use strict";

    var buttons;

    function enable(id) {
        document.getElementById(id).disabled = undefined;
    }

    function disable(id) {
        document.getElementById(id).disabled = "true";
    }

    function asId(elem) {
        if(Array.isArray(elem)) {
            return elem.map(asId);
        } else {
            if(typeof(elem) === "string") {
                return "#" + elem;
            } else {
                throw new TypeError("string required.");
            }
        }
    }

    codiag.initializeDiagramMenu = function() {
        buttons = {
            ADD_STANDALONE: "addStandalone",
            ADD_CHILD: "addChild",
            REMOVE: "delete"
        };

        codiag.canvas.on("selection:cleared", function() {
            disable(buttons.ADD_CHILD);
            disable(buttons.REMOVE);

            $(asId(buttons.ADD_CHILD)).popover("hide");
        });

        codiag.canvas.on("object:selected", function() {
            enable(buttons.ADD_CHILD);
            enable(buttons.REMOVE);
        });

        function hideCreationPopovers() {
            $(asId([buttons.ADD_STANDALONE, buttons.ADD_CHILD])).popover("hide");
        }

        codiag.canvas.on("mode:creation:disabled", hideCreationPopovers);

        $(asId(buttons.ADD_STANDALONE)).on("click", codiag.toggleStandaloneCreationMode.bind(codiag));
        $(asId(buttons.ADD_CHILD)).on("click", codiag.toggleChildCreationMode.bind(codiag));
        $(asId(buttons.REMOVE)).on("click", codiag.removeCurrentBubble.bind(codiag));

        $("[data-toggle*='popover']").popover();
        $("[data-toggle*='tooltip']").tooltip();
        $("[data-toggle*='button']").button();
    };

})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);