(function(window, codiag, undefined) {
    "use strict";

    (codiag.util || (codiag.util = {})).get = function(key) {
        return function(obj) {
            return obj[key];
        };
    };

    codiag.util.asArray = function(obj){
        return Array.prototype.slice.call(obj);
    };
    
    codiag.util.getIndex = function(obj) {
        return Object.keys(obj);
    };

})(window, window.codiag);