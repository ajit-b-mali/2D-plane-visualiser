import { drawLine, drawPoint } from "../../utils.js";
import { boardToScreen } from "../createScreen.js";
import app from "../geometry.config.js";

function Line([[x1, y1], [x2, y2]]) {
  let sx = x1;
  let sy = y1;

  let ex = x2;
  let ey = y2;

  const id = Math.random().toString();

  function get(prop) {
    switch (prop) {
      case "pos": return [[sx, sy], [ex, ey]];
      case "id": return id;

      default: return null;
    }
  }

  function move([[x1, y1], [x2, y2]]) {
    sx = x1;
    sy = y1;

    ex = x2;
    ey = y2;
  }

  function update(dt) {

  }

  function draw(canvasId = "shape") {
    const canvas = app.getCanvas(canvasId);
    const ctx = canvas.getContext("2d");

    const [x1, y1] = boardToScreen([sx, sy]);
    const [x2, y2] = boardToScreen([ex, ey]);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    drawLine(ctx, x1, y1, x2, y2);
    drawPoint(ctx, x1, y1);
    drawPoint(ctx, x2, y2);
  }

  return Object.freeze({
    get,
    draw,
    update,
    move,
  });
}


export default Line;