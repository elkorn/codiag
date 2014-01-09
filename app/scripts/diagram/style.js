(function (window, fabric, codiag, undefined) {
    "use strict";

    var style = {
        font: "sans-serif",
        fontSize: 18,
        bubble: {
            padding: 20,
            normal: {
                fontColor: "#434343",
                fill: "whitesmoke",
                stroke: "#9c9c9c",
                strokeWidth: 1
            }
        },
        connection: {
            fill: "#f30",
            stroke: "#f30",
            strokeWidth: 2
        }
    };

    style.bubble.frozen = {
        fontColor: "#E0E0E0",
        fill: "#FDFDFD",
        stroke: "#EBEBEB"
    };

    style.bubble.defaultForNew = {
        width: style.fontSize * 10 + 2 * style.bubble.padding,
        height: style.fontSize * 3 + 2 * style.bubble.padding
    };

    style.textInput = {
        border: "1px solid " + style.bubble.normal.fill,
        "box-shadow": "inset 1px 1px 3px " + style.bubble.normal.stroke,
        padding: (style.fontSize / 2) + "px",
        "font-size": style.fontSize + "px"
    };

    codiag.style = style;

})(window, window.fabric, (window.codiag || (window.codiag = {})));