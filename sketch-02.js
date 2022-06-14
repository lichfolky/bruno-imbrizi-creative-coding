const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};
const degToRad = (deg) => deg * (Math.PI / 180);

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    const num = 12;
    const radius = width * 0.3;
    let x, y;

    for (let i = 0; i < num; i++) {
      const angle = degToRad(360 / num) * i;

      x = cx + Math.sin(angle) * radius;
      y = cy + Math.cos(angle) * radius;

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.beginPath();
      context.fillRect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
