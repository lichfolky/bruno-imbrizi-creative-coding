const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

let manager;
let text = "M";
let fontSize = 1200;
let fontFamily = "Playfair Display";

const imgCanvas = document.createElement("canvas");
const imgContext = imgCanvas.getContext("2d");

const sketch = ({ context, width, height }) => {
  const cell = 30;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  imgCanvas.width = cols;
  imgCanvas.height = rows;

  return ({ context, width, height }) => {
    imgContext.fillStyle = "black";
    imgContext.fillRect(0, 0, cols, rows);

    const img = new Image(); // Create new img element
    img.src = "ApettaASC.jpg"; // Set source path
    context.fillStyle = "black";

    context.fillRect(0, 0, width, height);
    img.addEventListener(
      "load",
      () => {
        imgContext.drawImage(img, 0, 0, cols, rows);
        console.log("draw!", img);

        context.drawImage(imgCanvas, 0, 0);

        const typeData = imgContext.getImageData(0, 0, cols, rows).data;

        for (let i = 0; i < numCells; i++) {
          const col = i % rows;
          const row = Math.floor(i / rows);
          const x = col * cell;
          const y = row * cell;

          const r = typeData[i * 4 + 0];
          const g = typeData[i * 4 + 1];
          const b = typeData[i * 4 + 2];
          const a = typeData[i * 4 + 3];
          context.fillStyle = `rgb(${r}, ${g}, ${b})`;
          //context.fillStyle = "white";
          context.textBaseline = "middle";
          context.textAlign = "center";

          const glyph = getGlyph(r);
          context.font = `${cell * 2}px ${fontFamily}`;

          context.save();
          context.translate(x, y);
          //context.translate(cell, cell);
          context.fillRect(0, 0, cell * 0.99, cell * 0.99);
          // context.beginPath();
          // context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
          // context.fill();
          // context.fillText(glyph, 0, 0);

          context.restore();
        }
      },
      false
    );
  };
};

const getGlyph = (v) => {
  if (v < 50) {
    return "";
  }
  if (v < 100) {
    return ".";
  }
  if (v < 150) {
    return "-";
  }
  if (v < 200) {
    return text;
  }
  const glyphs = "_=/".split("");
  return random.pick(glyphs);
};

const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();
};

document.addEventListener("keyup", onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve(img);
    img.onerror = reject();
    img.src = url;
  });
};

/*
const url = "https://picsum.photos/id/237/200/300";


const start = async () => {
  const img = await loadImage(url);
  console.log("img.width: ", img.width);
};

const start = async () => {
  const img = await loadImage(url).then((img) => {
    console.log("img.width: ", img.width);
  });
};

start(); */
