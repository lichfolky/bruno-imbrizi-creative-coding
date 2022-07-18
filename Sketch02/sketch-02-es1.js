const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

// const degToRad = (deg) => deg * (Math.PI / 180);
// const randomRange = (min, max) => Math.random() * (max - min) + min;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    const num = 110;
    const radius = width / (1.2 * num);
    let x, y;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + Math.sin(angle) * radius;
      y = cy + Math.cos(angle) * radius;

      context.save();
      context.translate(cx, cy);
      //context.rotate(-angle);

      //context.lineWidth = random.range(10, 50);
      context.lineWidth = width / (1.4 * num);

      context.beginPath();
      // arc(x, y, radius, startAngle, endAngle)
      console.log(radius);
      context.arc(
        0,
        0,
        random.range(radius, radius * i),
        slice * random.range(1, i),
        slice * random.range(1, i),
        true
      );
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
