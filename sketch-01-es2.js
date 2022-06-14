const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [600, 600],
  /*
  dimensions: "A4",
  orientation: "landscape",
  pixelsPerInch: 300,
  */
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "black";
    context.strokeStyle = "white";
    context.fillRect(0, 0, width, height);

    const marginHorizontal = width * 0.05;
    const marginVertical = width * 0.05;

    let w = width * 0.12;
    let h = w;

    const gap = width * 0.02;
    const off = width * 0.04;

    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = marginHorizontal + i * (w + gap);
        y = marginVertical + j * (h + gap);
        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();
        let r = Math.random();
        if (r < 0.5) {
          context.fillStyle = "white";
          context.fill();
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.fillStyle = "black";
          context.fill();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
