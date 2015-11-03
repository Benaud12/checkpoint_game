var canvas = document.getElementById("map_canvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(50,20);
ctx.bezierCurveTo(140, 100, 100, 130, 240, 30);
ctx.stroke();

ctx.fillStyle = 'blue';
// start point
ctx.fillRect(50, 20, 10, 10);
// end point
ctx.fillRect(240, 30, 10, 10);

ctx.fillStyle = 'red';
// control point one
ctx.fillRect(140, 100, 10, 10);
// control point two
ctx.fillRect(100, 130, 10, 10);
