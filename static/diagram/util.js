(function(window, fabric, codiag, _, undefined) {
    "use strict";

    (codiag.util || (codiag.util = {})).extendClone = function(a, b) {
        return fabric.util.object.extend(fabric.util.object.clone(a), b);
    };

})(window, window.fabric, window.codiag || (window.codiag = {}), window._);