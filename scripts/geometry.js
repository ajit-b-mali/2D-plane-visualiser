import app from "./geometry/geometry.config.js";
import { getCursor } from "./geometry/cursor/cursor.js";
import { clear } from "./utils.js";
import { createPoint } from "./geometry/point/point.js";
import { createLine } from "./geometry/line/createLine.js";
import { createRect } from "./geometry/rect/createRect.js";
import { createCircle } from "./geometry/circle/createCircle.js";
import { createPolygon } from "./geometry/polygon/createPolygon.js";

const pointBtn = document.getElementById("point");
const lineBtn = document.getElementById("line");
const rectBtn = document.getElementById("rect");
const circleBtn = document.getElementById("circle");
const polygonBtn = document.getElementById("polygon");

pointBtn.addEventListener("click", createPoint);
lineBtn.addEventListener("click", createLine);
rectBtn.addEventListener("click", createRect);
circleBtn.addEventListener("click", createCircle);
polygonBtn.addEventListener("click", createPolygon);

const cursor = getCursor();
const shapes = app.getShapes();

function update(dt) {
  const tempShape = app.getTempShape();
  tempShape?.update(dt);

  cursor.update(dt);
  for (const shape of shapes) {
    shape.update(dt);
  }
}

function draw() {
  const tempShape = app.getTempShape();
  tempShape?.draw("temp");

  cursor.draw();
  for (const shape of shapes) {
    shape.draw();
  }
}

let oldTimeStamp = 0;
function appLoop(timestamp) {
  let dt = (timestamp - oldTimeStamp) / 1000;
  oldTimeStamp = timestamp;

  clear(app.getCanvas("shape"));
  clear(app.getCanvas("temp"));

  update(dt);

  draw();

  requestAnimationFrame(appLoop);
}
requestAnimationFrame(appLoop);
