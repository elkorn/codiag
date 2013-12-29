/* global fabric _*/
"use strict";

var canvas = new fabric.Canvas("c");
canvas.setWidth(1920);
canvas.setHeight(1080);
var size = 100;

var x = new codiag.Bubble({
    text: "lorem ipsum dolor sit amet\nthis is a multiline text\nit should be centered",
    left: 10,
    top: 10,
    canvas: canvas
});
var y = new codiag.Bubble({
    text: "the second element\nwith multiline text",
    left: 300,
    top: 300,
    canvas: canvas
});

var xcp = x.shape.getCenterPoint();
var ycp = y.shape.getCenterPoint();

function updateInputConnectionCoords(result) {
    return function(connection) {
        connection.set({
            x2: result.left,
            y2: result.top
        });
    };
}

function updateOutputConnectionCoords(result) {
    return function(connection) {
        connection.set({
            x1: result.left,
            y1: result.top
        });
    };
}

codiag.createConnection({
    from: x,
    to: y,
    canvas: canvas
});