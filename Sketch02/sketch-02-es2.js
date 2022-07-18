const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const degToRad = (deg) => deg * (Math.PI / 180);
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

    const num = 10;
    const radius = width * 0.3;
    let x, y;
    let begin, end;
    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(90 / num);
      const angle = slice * i;

      x = cx + Math.sin(angle) * radius;
      y = cy - Math.cos(angle) * radius;

      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.scale(random.range(0.1, 2), random.range(0.2, 2));

      context.beginPath();
      context.fillRect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.lineWidth = random.range(5, 20);

      context.beginPath();

      begin = 360 - random.range(0, 45);
      end = random.range(360 - begin, 90);

      begin = 360 - random.range(0, 45);
      end = random.range(270, begin);

      console.log(begin, end, degToRad(begin), degToRad(end));
      context.arc(
        0,
        0,
        radius * random.range(0.7, 1.3),
        degToRad(begin),
        degToRad(end),
        true
      );
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
