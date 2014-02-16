"use strict";

var express = require("express"),
    path = require("path");

var MIME_TYPES = {
    woff: "application/font-woff",
    ttf: "application/x-font-truetype",
    eof: "application/vnd.ms-fontobject",
    svg: "image/svg+xml"
};
module.exports = function(app) {
  var rootPath = path.normalize(__dirname + "/../..");
  function getExt(url) {
      return url.substr(url.lastIndexOf(".") + 1);
  }

  function addMimeType(req, res, next) {
      var extension = getExt(req.path);
          console.log(
            require("util")
            .format(
                "Checking mimetype %s for path %s",
                MIME_TYPES[extension],
                req.path));
      if(MIME_TYPES.hasOwnProperty(extension)) {
          res.set("Content-Type", MIME_TYPES[extension]);
      }

      next();
  }

  app.configure("development", function(){
    app.use(require("connect-livereload")());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf("/scripts/") === 0 || req.url.indexOf("/socket.io/") === 0) {
        console.log("aiovadiogdba");
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
      }
      next();
    });

    app.use(express.static(path.join(rootPath, ".tmp")));
    app.use(express.static(path.join(rootPath, "app")));
    app.use(express.errorHandler());
    app.set("views", rootPath + "/app/views");
  });

  app.configure("production", function(){
    app.use(addMimeType);
    app.use(express.favicon(path.join(rootPath, "public", "favicon.ico")));
    app.use(express.static(path.join(rootPath, "public")));
    app.set("views", rootPath + "/views");
  });

  app.configure(function(){
    app.engine("html", require("ejs").renderFile);
    app.set("view engine", "html");
    app.use(express.logger("dev"));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    // Router needs to be last
    app.use(app.router);
  });
};
