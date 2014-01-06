(function(window, fabric, codiag, undefined) {
    "use strict";

    function lighten(color, percent) {
        var num = parseInt(color.slice(1), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    var style = {
        font: "sans-serif",
        fontSize: 12,
        bubble: {
            padding: 20,
            normal: {
                fontColor: "rgb(0,0,0)",
                fill: "rgb(230,230,230)",
                stroke: "rgb(150,150,150)"
            }
        }
    };

    style.bubble.frozen = {
        fontColor: "rgb(201,201,201)",
        fill: "rgb(250,250,250)",
        stroke: "rgb(234,234,234)"
    };

    codiag.style = style;

})(window, window.fabric, (window.codiag || (window.codiag = {})));