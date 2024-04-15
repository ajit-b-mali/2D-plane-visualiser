import {drawPoint } from "../../utils.js";
import { boardToScreen } from "../createScreen.js";
import app from "../geometry.config.js";

function Rect([p1, p2, p3, p4]) {
  let a = [...p1];
  let b = [...p2];
  let c = [...p3];
  let d = [...p4];

  const id = Math.random().toString();

  function get(prop) {
    switch (prop) {
      case "pos": return [a, b, c, d];
      case "id": return id;

      default: return null;
    }
  }

  function scale(x, y) {
    c = [x, y];
    b = [x, b[1]];
    d = [d[0], y];
  }

  function update(dt) {

  }

  function draw(canvasId = "shape") {
    const canvas = app.getCanvas(canvasId);
    const ctx = canvas.getContext("2d");
    
    const [x1, y1] = boardToScreen(a);
    const [x2, y2] = boardToScreen(b);
    const [x3, y3] = boardToScreen(c);
    const [x4, y4] = boardToScreen(d);
    
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    drawPoint(ctx, x1, y1);
    drawPoint(ctx, x2, y2);
    drawPoint(ctx, x3, y3);
    drawPoint(ctx, x4, y4);
  }

  return Object.freeze({
    get,
    draw,
    update,
    scale,
  });
}

export default Rect;