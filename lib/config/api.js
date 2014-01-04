"use strict";
var routeConfigurationFns = [];

module.exports = function configureApiRoutesFor(app) {
    routeConfigurationFns.forEach(function(routeConfigurationFn) {
        routeConfigurationFn(app);
    });
};