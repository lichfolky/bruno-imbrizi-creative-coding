const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
import { Pane } from "tweakpane";

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 0,
  scaleMax: 30,
  color: "#ff0055",
  freq: 0.001,
  amp: 0.2,
  aframe: 0,
  animate: true,
  lineCap: "butt",
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    const gridW = width * 0.8;
    const gridH = height * 0.8;
    const cellW = gridW / cols;
    const cellH = gridH / rows;
    const margX = (width - gridW) * 0.5;
    const margY = (height - gridH) * 0.5;

    let fr = params.animate ? frame : params.aframe;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellW;
      const y = row * cellH;
      const w = cellW * 0.8;
      const h = cellH * 0.8;

      //const rngNum = random.noise2D(x + frame * 50, y, params.freq); // -1 to 1
      const rngNum = random.noise3D(x, y, fr * 15, params.freq); // -1 to 1
      const angle = rngNum * Math.PI * params.amp;
      // const scale = ((rngNum + 1) / 2) * 30;
      // const scale = (rngNum * 0.5 + 0.5) * 30;
      const scale = math.mapRange(
        rngNum,
        -1,
        1,
        params.scaleMin,
        params.scaleMax
      );

      context.save();
      context.translate(x, y);
      context.translate(margX, margY);
      context.translate(cellW * 0.5, cellH * 0.5);

      context.rotate(angle);
      context.lineWidth = scale;
      context.strokeStyle = params.color;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};
const createPane = () => {
  const pane = new Pane();

  let folder = pane.addFolder({ title: "grid" });

  folder.addInput(params, "lineCap", {
    options: { butt: "butt", round: "round", square: "square" },
  });
  folder.addInput(params, "rows", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "cols", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "scaleMin", { min: 1, max: 100, step: 1 });
  folder.addInput(params, "scaleMax", { min: 1, max: 100, step: 1 });
  folder.addInput(params, "color");

  folder = pane.addFolder({ title: "noise" });

  folder.addInput(params, "freq", { min: -0.01, max: 0.01 });
  folder.addInput(params, "amp", { min: 0, max: 1 });
  folder.addInput(params, "aframe", { min: 0, max: 999 });
  folder.addInput(params, "animate");
};
createPane();
canvasSketch(sketch, settings);
