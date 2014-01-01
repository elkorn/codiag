"use strict";
var dao = require("./dao");

exports.getAll = function(req, res) {
    res.json(dao.getAll());
};