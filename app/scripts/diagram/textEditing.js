(function(window, fabric, codiag, CanvasInput, undefined) {
    "use strict";

    var currentlyEditedBubble;
    var textInput;
    var diagramContainer;

    function applyTextChangesToEditedBubble() {
        currentlyEditedBubble.setText(textInput.value);
    }

    function pixels(value) {
        return parseInt(value, 10) + "px";
    }

    function updateInputPosition() {
        textInput.style.left = pixels(currentlyEditedBubble.left + codiag.style.bubblePadding / 2 - 1);
        textInput.style.top = pixels(currentlyEditedBubble.top + codiag.style.bubblePadding / 2 - 1);
    }

    function createCanvasInputForEditedBubble() {
        textInput = document.createElement("textarea");
        textInput.style["max-width"] = textInput.style["min-width"] = pixels(currentlyEditedBubble.getWidth() - codiag.style.bubblePadding);
        textInput.style["max-height"] = textInput.style["min-height"] = pixels(currentlyEditedBubble.getHeight() - codiag.style.bubblePadding);
        textInput.style.position = "absolute";
        textInput.style["border-radius"] = textInput.style.padding = pixels(15);
        updateInputPosition();
        textInput.value = codiag.getBubble(currentlyEditedBubble.id).getText();
        textInput.style.resize = "none";
        diagramContainer.appendChild(textInput);
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

    codiag.changeEditedBubble = function(target) {
        console.log("changing currentlyEditedBubble to", (target ? target.id : target));
        if (currentlyEditedBubble) {
            currentlyEditedBubble.isInEditMode = false;
            applyTextChangesToEditedBubble();
            var editedBubble = codiag.getBubble(currentlyEditedBubble.id);
            if (!editedBubble.getText().length) {
                codiag.removeBubble(editedBubble.shape);
            }

        }

        if (textInput) {
            diagramContainer.removeChild(textInput);
            textInput = null;
            if (target === null) {
                codiag.disableCreationMode();
            }
        }

        currentlyEditedBubble = target;
        if (currentlyEditedBubble) {
            currentlyEditedBubble.isInEditMode = true;
            createCanvasInputForEditedBubble();
        }
    };

    codiag.cancelEditing = function() {
        if (currentlyEditedBubble && textInput) {
            textInput.value = currentlyEditedBubble.getText();
            codiag.changeEditedBubble(null);
        }

        codiag.disableCreationMode();
    };

    codiag.isEditingABubble = function() {
        return !!currentlyEditedBubble;
    };

    codiag.initializeTextEditing = function() {
        diagramContainer = document.querySelector(".diagram-container");
        codiag.canvas.on("object:enableEditMode", function enableEditMode(e) {
            console.log("object:enableEditMode");
            codiag.changeEditedBubble(e.target);
        });

        codiag.canvas.on("selection:cleared", function clearEditMode() {
            console.log("selection:cleared");
            codiag.changeEditedBubble(null);
        });

        codiag.canvas.on("object:selected", function(e) {
            if (currentlyEditedBubble) {
                console.log("object:selected");
                var selectingCurrentBubble = e.target === currentlyEditedBubble;
                if (!selectingCurrentBubble) {
                    codiag.changeEditedBubble(null);
                    codiag.disableCreationMode();
                } else {
                    console.log(textInput.selectionStart);
                    setCaretPosition(textInput, textInput.selectionStart);
                }
            }

        });

        codiag.canvas.on("object:moving", function(e) {
            if (e.target === currentlyEditedBubble && textInput) {
                updateInputPosition();
            }
        });
    };

})(window, window.fabric, window.codiag || (window.codiag = {}), window.CanvasInput);