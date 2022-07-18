const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

import { Pane } from "tweakpane";

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const params = {
  cols: 30,
  rows: 30,
  border: 0.45,
  margin: 0.3,
  freq: 0.2,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);

    const cellCols = params.cols;
    const cellRows = params.rows;
    const cellNumber = cellRows * cellCols;
    const cellWidth = width / cellCols;
    const cellHeight = height / cellRows;

    /*
    const agap = width * params.gap;
    console.log("agap", agap);

    const containerWidth = width - agap * cellCols;
    const containerHeight = height - agap * cellRows;
    const cellBorderWidthRatio = 0.1;
    const cellBorderHeightRatio = 0.1;
    */

    for (let i = 0; i < cellNumber; i++) {
      const xIndex = i % cellCols;
      const yIndex = Math.floor(i / cellCols);

      let rng = random.noise3D(
        xIndex * cellWidth,
        yIndex * cellHeight,
        frame,
        params.freq / 60
      );

      const r = rng * 0.5 + 0.5;

      let sqColor;

      if (r < 0.4) {
        sqColor = "#06122e";
      } else {
        if (r < 0.5) {
          sqColor = "#363062";
        } else {
          if (r < 0.7) {
            sqColor = "#827397";
          } else {
            sqColor = "#ffc0cb";
          }
        }
      }

      /*
       margin + border + content + border + margin = cellWidth

       border has priority
       

      */
      let sqBorder = (params.border * cellHeight) / 2;
      let sqMargin =
        (Math.min(1 - params.border, params.margin) * cellHeight) / 2;

      drawSquare(
        context,
        xIndex * cellWidth + sqMargin / 2 + sqBorder / 2,
        yIndex * cellHeight + sqMargin / 2 + sqBorder / 2,
        cellWidth - sqMargin - sqBorder,
        cellHeight - sqMargin - sqBorder,
        sqBorder,
        sqColor
      );
    }
  };
};

const drawSquare = (context, x1, y1, width, height, border, bkColor) => {
  context.save();

  context.lineWidth = border;
  context.strokeStyle = bkColor;

  //context.fillStyle = bkColor;
  //context.fillRect(x1, y1, width, height);

  context.beginPath();
  context.rect(x1, y1, width, height);
  context.stroke();
  context.restore();
};

const createPane = () => {
  const pane = new Pane();
  let folder = pane.addFolder({ title: "grid" });

  folder.addInput(params, "rows", { min: 1, max: 100, step: 1 });
  folder.addInput(params, "cols", { min: 1, max: 100, step: 1 });
  folder.addInput(params, "border", { min: 0.01, max: 0.99, step: 0.01 });
  folder.addInput(params, "margin", { min: 0, max: 0.99, step: 0.01 });
  folder.addInput(params, "freq", { min: 0, max: 0.99, step: 0.01 });
};

createPane();

canvasSketch(sketch, settings);
