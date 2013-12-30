(function(window, fabric, codiag, CanvasInput, undefined) {
    "use strict";

    var currentlyEditedBubble;
    var textInput;
    codiag.canvas.on("object:enableEditMode", function enableEditMode(e) {
        codiag.changeEditedBubble(e.target);
    });

    codiag.canvas.on("before:selection:cleared", function clearEditMode() {
        codiag.changeEditedBubble(null);
    });

    codiag.canvas.on("object:selected", function(e) {
        if (currentlyEditedBubble) {
            var selectingCurrentBubble = e.target === currentlyEditedBubble;
            if (!selectingCurrentBubble) {
                codiag.changeEditedBubble(null);
            }
        }
    });

    codiag.changeEditedBubble = function(target) {
        console.log("changing currentlyEditedBubble to", target);
        if (currentlyEditedBubble) {
            currentlyEditedBubble.isInEditMode = false;
        }

        currentlyEditedBubble = target;
        if (currentlyEditedBubble) {
            currentlyEditedBubble.isInEditMode = true;
            createCanvasInputForEditedBubble();
        }
    };

    function createCanvasInputForEditedBubble() {
        textInput = new CanvasInput({
            canvas: codiag.canvas,
            fontSize: 18,
            fontFamily: "Arial",
            fontColor: "#212121",
            fontWeight: "bold",
            width: currentlyEditedBubble.getWidth(),
            height: currentlyEditedBubble.getHeight(),
            padding: 8,
            borderWidth: 1,
            borderColor: "#000",
            borderRadius: 3,
            boxShadow: "1px 1px 0px #fff",
            innerShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
            value: currentlyEditedBubble.getText()
        });
    }

})(window, window.fabric, window.codiag || (window.codiag = {}), window.CanvasInput);