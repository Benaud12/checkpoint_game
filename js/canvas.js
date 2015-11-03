var canvas = document.getElementById("map_canvas");
var context = canvas.getContext("2d");

fitToContainer(canvas);

function fitToContainer(canvas){
  // Make it visually fill the positioned parent
  canvas.style.width ='100%';
  canvas.style.height='100%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

      context.beginPath();

      context.setLineDash([5]);

      context.moveTo(100, 50);

      // line 1
      context.lineTo(200, 160);

      // quadratic curve
      context.quadraticCurveTo(230, 200, 250, 120);

      // bezier curve
      context.bezierCurveTo(290, -40, 300, 200, 400, 150);

      // line 2
      context.lineTo(500, 90);

      // context.lineWidth = 30;
      // context.strokeStyle = '#669999';

      context.lineWidth = 5;
      context.strokeStyle = 'red';

      context.stroke();
