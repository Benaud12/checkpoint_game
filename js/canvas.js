var canvas = document.getElementById("map_canvas");
var context = canvas.getContext("2d");

      context.beginPath();
      context.moveTo(100, 20);

      // line 1
      context.lineTo(200, 160);

      // quadratic curve
      context.quadraticCurveTo(230, 200, 250, 120);

      // bezier curve
      context.bezierCurveTo(290, -40, 300, 200, 400, 150);

      // line 2
      context.lineTo(500, 90);

      context.lineWidth = 5;
      context.strokeStyle = 'blue';
      context.stroke();
