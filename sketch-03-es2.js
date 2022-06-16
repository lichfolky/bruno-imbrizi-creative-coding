const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ context, width, height }) => {
  const cx = width * 0.5;
  const cy = height * 0.5;
  // initial radius
  const radius = width * 0.3;

  const agents = [];
  const numArcs = 10;
  const slice = math.degToRad(360 / numArcs);

  for (let i = 0; i < numArcs; i++) {
    agents.push(
      new Agent(
        cx,
        cy,
        radius * random.range(0.1, 2),
        slice * random.range(1, -8),
        slice * random.range(1, 5),
        random.range(15, 40)
      )
    );
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "black";

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);

class Arc {
  constructor(cx, cy, radius, startDeg, endDeg) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.startDeg = startDeg;
    this.endDeg = endDeg;
  }
}

class Agent {
  constructor(cx, cy, radius, startDeg, endDeg, width) {
    this.arc = new Arc(cx, cy, radius, startDeg, endDeg);
    this.startingDeg = startDeg;
    this.endDeg = endDeg;
    this.vel = random.range(0.001, 0.01);
    this.width = width;
  }

  update() {
    this.arc.startDeg += this.vel;
    this.arc.endDeg += this.vel;
  }

  draw(context) {
    context.save();
    // move to the center
    context.translate(this.arc.cx, this.arc.cy);
    //context.rotate(-angle);
    //random line width
    context.lineWidth = this.width;
    context.beginPath();
    context.arc(0, 0, this.arc.radius, this.arc.startDeg, this.arc.endDeg);
    context.stroke();
    context.restore();
  }
}
