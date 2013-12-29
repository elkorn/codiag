(function(window, fabric, codiag, _, undefined) {
    "use strict";

    codiag.util = {
        maybe: function maybe(value) {
            var obj = null;

            function isEmpty() {
                return typeof(value) === "undefined" || value === null;
            }

            function nonEmpty() {
                return !isEmpty();
            }
            obj = {
                map: function(f) {
                    return isEmpty() ? obj : maybe(f(value));
                },
                getOrElse: function(n) {
                    return isEmpty() ? n : value;
                },
                isEmpty: isEmpty,
                nonEmpty: nonEmpty
            };
            return obj;
        }
    };


})(window, window.fabric, window.codiag || (window.codiag = {}), window._);