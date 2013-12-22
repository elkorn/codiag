/* global fabric, requestAnimationFrame, _*/
"use strict";

var canvas = new fabric.Canvas("c");
canvas.setWidth(800);
canvas.setHeight(600);
var size = 100;
var x = new codiag.Bubble({
    text: "lorem ipsum dolor sit amet\nthis is a multiline text\nit should be centered",
    left: 300,
    top: 300,
    fill: "yellow",
    canvas: canvas});
// var objs = [
//     new fabric.Rect({ left: 100, top: 100, width: size, height: size, fill: "#BADA55" }),
//     new fabric.Triangle({ left: 130 + size, top: 100, width: size, height: size, fill: "blue" })
// ];
// 
// window.codiag = {};
// 
// fabric.Image.fromURL("http://placekitten.com/200/300", function(img) {
//     img.scale(0.5).setFlipX(true);
//     canvas.add(img);
//     animateSeparately(img);
// });
// 
// var text = new fabric.Text("Test text", {
//     fontFamily: "Impact"
// });
// 
// canvas.add(text);
// 
// objs[0].set({strokeWidth: 5, stroke: "rgba(200,200,200,0.5)"});
// 
// function addToCanvas(object) {
//     canvas.add(object);
//     return object;
// }
// 
// function changeAngle(obj) {
//     obj.set({angle: obj.angle + 1 % 360 });
// }
// 
// function rotateObjs() {
//     objs.forEach(rotate);
//     canvas.renderAll();
//     requestAnimationFrame(rotateObjs);
// }
// 
// function rotate(obj) {
//     changeAngle(obj);
//     return obj;
// }
// 
// function animateSeparately(obj) {
//     obj.animate("angle", "+=1", {
//         onChange: _.compose(
//                       requestAnimationFrame.bind(window, animateSeparately.bind(null, obj)),
//                       canvas.renderAll.bind(canvas))
//     });
// }
// 
// function flipY(obj) {
//     obj.set({flipY: !obj.flipY});
//     return obj;
// }
// 
// var transforms = [addToCanvas]; 
// 
// function createPipeline(fns){
//     return _.compose.apply(_, fns.reverse());
// }
// 
// var startFn = createPipeline(transforms);
// objs.forEach(startFn);
// 
// rotateObjs();
// 
