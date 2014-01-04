(function(window, codiag, undefined) {

    (codiag.util || (codiag.util = {})).get = function(key) {
        return function(obj) {
            return obj[key];
        };
    };

    codiag.util.asArray = function(obj){
        return Array.prototype.slice.call(obj);
    };

})(window, window.codiag);