(function(window, fabric, codiag, _, undefined) {
    "use strict";

    (codiag.util || (codiag.util = {})).extendClone = function(a, b) {
        return fabric.util.object.extend(fabric.util.object.clone(a), b);
    };

    codiag.util.debounce = function(func, threshold, execAsap) {

        var timeout;

        return function debounced() {
            var obj = this,
                args = arguments;

            function delayed() {
                if (!execAsap) {
                    func.apply(obj, args);
                }

                timeout = null;
            }

            if (timeout) {
                clearTimeout(timeout);
            } else if (execAsap) {
                func.apply(obj, args);
            }

            timeout = setTimeout(delayed, threshold || 100);
        };
    };

})(window, window.fabric, window.codiag || (window.codiag = {}), window._);