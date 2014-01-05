(function(window, codiag, undefined) {

    (codiag.util || (codiag.util = {})).get = function(key) {
        return function(obj) {
            return obj[key];
        };
    };

    codiag.util.asArray = function(obj){
        return Array.prototype.slice.call(obj);
    };
    
    codiag.util.getIndex = function(obj) {
        var keys = [];
        for(var k in obj) keys.push(k);
        return keys;
    };

})(window, window.codiag);