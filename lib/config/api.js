"use strict";
var routeConfigurationFns = [
    require("../dataService/rooms/routes")
];

module.exports = function configureApiRoutesFor(app) {
    routeConfigurationFns.forEach(function(routeConfigurationFn) {
        routeConfigurationFn(app);
    });
};