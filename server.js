"use strict";

// Module dependencies.
var express = require("express");
var realTimeProvider = require("./lib/config/realTimeProvider");
var app = express();
app.set("port", process.env.PORT || 3000);

// Express Configuration
require("./lib/config/express")(app);
require("./lib/config/api")(app);

// Controllers
var api = require("./lib/controllers/api"),
    index = require("./lib/controllers");

app.get("/api/awesomeThings", api.awesomeThings);
// Angular Routes
app.get("/partials/*", index.partials);
app.get("/*", index.index);

// Start server
// var port = app.get("port");
// app.listen(port, function () {
//   console.log("Express server listening on port %d in %s mode", port, app.get("env"));
// });
// We need to have realtime so:
realTimeProvider.startAppWithRealTime(app);

// Expose app
exports = module.exports = app;