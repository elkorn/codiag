(function (window, fabric, codiag, $, undefined) {
    "use strict";

    var buttons;

    function enable(id) {
        document.getElementById(id).disabled = undefined;
    }

    function disable(id) {
        document.getElementById(id).disabled = "true";
        $(asId(id)).tooltip("hide");
    }

    function asId(elem) {
        if (Array.isArray(elem)) {
            return elem.map(asId);
        } else {
            if (typeof (elem) === "string") {
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
        var $elem = $(asId(id));
        if (!$elem.is("visible")) {
            $elem.popover("show");
        }
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

    codiag.initializeDiagramMenu = function () {
        buttons = {
            ADD_STANDALONE: "addStandalone",
            ADD_CHILD: "addChild",
            REMOVE: "delete",
            CONNECT: "connect"
        };

        var $addStandalone = $(asId(buttons.ADD_STANDALONE)),
            $addChild = $(asId(buttons.ADD_CHILD)),
            $remove = $(asId(buttons.REMOVE)),
            $connect = $(asId(buttons.CONNECT));

        codiag.canvas.on("selection:cleared", function () {
            disableCreationButtons();
            $addChild.popover("hide");
        });
        codiag.canvas.on("object:selected", enableCreationButtons);
        codiag.canvas.on("mode:creation:disabled", handleCreationModeDisabled);
        codiag.canvas.on("mode:creation:enabled", handleCreationModeEnabled);
        codiag.canvas.on("mode:connection:enabled", function () {
            if ($connect.__clicked) {
                $connect.__clicked = false;
            } else {
                showPopover(buttons.CONNECT);
            }
        });

        $addStandalone.on("click", codiag.toggleStandaloneCreationMode.bind(codiag));
        $addChild.on("click", codiag.toggleChildCreationMode.bind(codiag));
        $remove.on("click", codiag.removeCurrentBubble.bind(codiag));
        $connect.on("click", function () {
            $connect.__clicked = true;
            codiag.toggleConnectionMode();
        });

        $("[data-toggle*='popover']").popover();
        $("[data-toggle*='tooltip']").tooltip();
        $("[data-toggle*='button']").button();
    };
})(window, window.fabric, window.codiag || (window.codiag = {}), window.jQuery);