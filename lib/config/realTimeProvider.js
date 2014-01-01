"use strict";

var io = require("socket.io");
var http = require("http");
/*
app.set('port', process.env.PORT || 3000);
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(app.get('port'));

 */

// var realTimePort = 6789;
var realTimeProvider;
var realTimeServer;

function configureProvider(provider) {
    provider.configure("development", function() {
        provider.set("log level", 1);
    });

    provider.configure("production", function() {
        provider.set("log level", 0);
    });
}

exports.startAppWithRealTime = function(app) {
    console.log("configuring real-time");
    realTimeServer = http.createServer(app);
    realTimeProvider = io.listen(realTimeServer);
    realTimeServer.listen(app.get("port"));
    configureProvider(realTimeProvider);
    // return server;
};

exports.io = function() {
    if (!realTimeProvider) {
        throw new Error("Real-time provider is not configured for the Express app.");
    }

    return realTimeProvider;
};