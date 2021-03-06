"use strict";

exports.awesomeThings = function (req, res) {
    res.json([{
        name: "HTML5 Boilerplate",
        info: "HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.",
        awesomeness: 10
    }, {
        name: "AngularJS",
        info: "AngularJS is a toolset for building the framework most suited to your application development.",
        awesomeness: 18
    }, {
        name: "Karma",
        info: "Spectacular Test Runner for JavaScript.",
        awesomeness: 10
    }, {
        name: "Express",
        info: "Flexible and minimalist web application framework for node.js.",
        awesomeness: 10
    }, {
        name: "Firebase",
        info: "A powerful API to store and sync data in realtime.",
        awesomeness: 19
    }, {
        name: "Fabric.js",
        info: "A powerful and simple Javascript HTML5 canvas library.",
        awesomeness: 20
    }]);
};

exports.version = function (req, res) {
    res.send(require("../../package.json").version);
};

exports.authors = function (req, res) {
    res.json([{
        name: "Korneliusz Caputa",
        link: "https://github.com/elkorn"
    }, {
        name: "Dawid Mazur",
        link: "https://github.com/dmazur"
    }]);
};