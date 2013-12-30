/* global fabric _*/
"use strict";

var canvas = codiag.canvas;
var x = codiag.createBubble({
    text: "lorem ipsum dolor sit amet\nthis is a multiline text\nit should be centered",
    left: 10,
    top: 10,
    canvas: canvas
});

var y = codiag.createBubble({
    text: "the second element\nwith multiline text",
    left: 300,
    top: 300,
    canvas: canvas
});

codiag.createConnection({
    from: x,
    to: y,
    canvas: canvas
});