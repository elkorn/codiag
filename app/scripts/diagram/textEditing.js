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
        textInput.style.left = pixels(currentlyEditedBubble.left + codiag.style.bubble.padding / 2 - 1);
        textInput.style.top = pixels(currentlyEditedBubble.top + codiag.style.bubble.padding / 2 - 1);
    }

    function createCanvasInputForEditedBubble() {
        textInput = document.createElement("textarea");
        textInput.style["max-width"] = textInput.style["min-width"] = pixels(currentlyEditedBubble.getWidth() - codiag.style.bubble.padding);
        textInput.style["max-height"] = textInput.style["min-height"] = pixels(currentlyEditedBubble.getHeight() - codiag.style.bubble.padding);
        textInput.style.position = "absolute";
        textInput.style.outline = "none";
        textInput.style["border-radius"] = pixels(15);
        fabric.util.object.extend(textInput.style, codiag.style.textInput);
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
        if (currentlyEditedBubble) {
            currentlyEditedBubble.isInEditMode = false;
            var isEditing = !!currentlyEditedBubble.getText();
            applyTextChangesToEditedBubble();
            var editedBubble = codiag.getBubble(currentlyEditedBubble.id);
            if (editedBubble.getText().length) {
                codiag.canvas.fire((isEditing ? "bubble:text:changed" : "bubble:created"), {
                    target: editedBubble
                });
            } else {
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
            codiag.disableCreationMode();
            codiag.enableCreationMode();
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
            codiag.changeEditedBubble(e.target);
        });

        codiag.canvas.on("selection:cleared", function clearEditMode() {
            codiag.changeEditedBubble(null);
        });

        codiag.canvas.on("object:selected", function(e) {
            if (currentlyEditedBubble) {
                var selectingCurrentBubble = e.target === currentlyEditedBubble;
                if (!selectingCurrentBubble) {
                    codiag.changeEditedBubble(null);
                    codiag.disableCreationMode();
                } else {
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