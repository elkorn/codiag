(function(window, fabric, codiag, CanvasInput, undefined) {
    "use strict";

    var currentlyEditedBubble;
    var textInput;

    function applyTextChangesToEditedBubble() {
        currentlyEditedBubble.setText(textInput.value);
    }

    function pixels(value) {
        return parseInt(value, 10) + "px";
    }

    function createCanvasInputForEditedBubble() {
        textInput = document.createElement("textarea");
        textInput.style["max-width"] = textInput.style["min-width"] = pixels(currentlyEditedBubble.getWidth() - codiag.style.bubblePadding);
        textInput.style["max-height"] = textInput.style["min-height"] = pixels(currentlyEditedBubble.getHeight() - codiag.style.bubblePadding);
        textInput.style.position = "absolute";
        textInput.style.left = pixels(currentlyEditedBubble.left + codiag.style.bubblePadding - 5);
        textInput.style.top = pixels(currentlyEditedBubble.top + codiag.style.bubblePadding - 5);
        textInput.style["border-radius"] = textInput.style.padding = pixels(15);
        textInput.value = codiag.getBubble(currentlyEditedBubble.id).getText();
        textInput.style.resize = "none";
        document.body.appendChild(textInput);
        setCaretPosition(textInput, textInput.value.length);
    }

    function setCaretPosition(elem, caretPos) {
        if (elem !== null) {
            if (elem.hasOwnProperty("createTextRange")) {
                var range = elem.createTextRange();
                range.move("character", caretPos);
                range.select();
            } else {
                if (elem.hasOwnProperty("selectionStart")) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                } else {
                    elem.focus();
                }
            }
        }
    }

    codiag.canvas.on("object:enableEditMode", function enableEditMode(e) {
        console.log("object:enableEditMode");
        codiag.changeEditedBubble(e.target);
        return false;
    });

    codiag.canvas.on("selection:cleared", function clearEditMode(e) {
        console.log("selection:cleared")
        codiag.changeEditedBubble(null);
        return false;
    });

    codiag.canvas.on("object:selected", function(e) {
        if (currentlyEditedBubble) {
            console.log("object:selected");
            var selectingCurrentBubble = e.target === currentlyEditedBubble;
            if (!selectingCurrentBubble) {
                codiag.changeEditedBubble(null);
                return false;
            }
        }
    });

    codiag.changeEditedBubble = function(target) {
        console.log("changing currentlyEditedBubble to", target);
        if (currentlyEditedBubble) {
            currentlyEditedBubble.isInEditMode = false;
            applyTextChangesToEditedBubble();
        }

        if (textInput) {
            document.body.removeChild(textInput);
            textInput = null;
        }

        currentlyEditedBubble = target;
        if (currentlyEditedBubble) {
            currentlyEditedBubble.isInEditMode = true;
            createCanvasInputForEditedBubble();
        }
    };

})(window, window.fabric, window.codiag || (window.codiag = {}), window.CanvasInput);