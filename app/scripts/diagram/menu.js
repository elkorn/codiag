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
        if (Array.isArray(elem)) {
            return elem.map(asId);
        } else {
            if (typeof(elem) === "string") {
                return "#" + elem;
            } else {
                throw new TypeError("string required.");
            }
        }
    }

    function hidePopover(id) {
        $(asId(id)).popover("hide");
    }

    function showPopover(id) {
        $(asId(id)).popover("show");
    }

    function disableCreationButtons() {
        disable(buttons.ADD_CHILD);
        disable(buttons.REMOVE);
        disable(buttons.CONNECT);
    }

    function enableCreationButtons() {
        enable(buttons.ADD_CHILD);
        enable(buttons.REMOVE);
        enable(buttons.CONNECT);
    }

    function handleCreationModeEnabled() {
        disableCreationButtons();
    }

    function handleCreationModeDisabled() {
        hideCreationPopovers();
        if (codiag.canvas.getActiveObject()) {
            enableCreationButtons();
        }
    }

    function hideCreationPopovers() {
        hidePopover([buttons.ADD_STANDALONE, buttons.ADD_CHILD, buttons.CONNECT]);
    }

    codiag.initializeDiagramMenu = function() {
        buttons = {
            ADD_STANDALONE: "addStandalone",
            ADD_CHILD: "addChild",
            REMOVE: "delete",
            CONNECT: "connect"
        };

        codiag.canvas.on("selection:cleared", function() {
            disableCreationButtons();
            $(asId(buttons.ADD_CHILD)).popover("hide");
        });

        codiag.canvas.on("object:selected", enableCreationButtons);


        codiag.canvas.on("mode:creation:disabled", handleCreationModeDisabled);
        codiag.canvas.on("mode:creation:enabled", handleCreationModeEnabled);
        codiag.canvas.on("mode:connection:enabled", function() {
            showPopover(buttons.CONNECT);
        });

        $(asId(buttons.ADD_STANDALONE)).on("click", codiag.toggleStandaloneCreationMode.bind(codiag));
        $(asId(buttons.ADD_CHILD)).on("click", codiag.toggleChildCreationMode.bind(codiag));
        $(asId(buttons.REMOVE)).on("click", codiag.removeCurrentBubble.bind(codiag));
        $(asId(buttons.CONNECT)).on("click", codiag.toggleConnectionMode.bind(codiag));

        $("[data-toggle*='popover']").popover();
        $("[data-toggle*='tooltip']").tooltip();
        $("[data-toggle*='button']").button();
    };
})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);