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

    codiag.util.findFirst = function(collection) {
        return function(fn) {
            var result;
            collection.some(function(element, index) {
                if (fn(element, index)) {
                    result = element;
                    return true;
                }
            });
            return result;
        };
    };

    codiag.util.removeIfContains = function(collection, element) {
        var index = collection.indexOf(element);
        var contains = index !== -1;
        if (contains) {
            collection.splice(index, 1);
        }

        return contains;
    };

})(window, window.fabric, window.codiag || (window.codiag = {}), window._);