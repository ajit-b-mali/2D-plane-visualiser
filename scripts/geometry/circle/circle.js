import { circlePath, drawPoint, findDist } from "../../utils.js";
import { boardToScreen } from "../createScreen.js";
import app from "../geometry.config.js";
import { getScreen } from "../createScreen.js";

function Circle([x, y], cr) {
  const screen = getScreen();

  let c = [x, y];
  let r = cr;

  const id = Math.random().toString();

  function get(prop) {
    switch (prop) {
      case "pos": return [...c];
      case "r": return r;
      case "id": return id;

      default: return null;
    }
  }

  function scale(x, y) {
    r = findDist(c[0], c[1], x, y);
  }

  function update(dt) {

  }

  function draw(canvasId = "shape") {
    const canvas = app.getCanvas(canvasId);
    const ctx = canvas.getContext("2d");

    const [cx, cy] = boardToScreen(c);
    const cr = r * screen.get("scale");

    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.beginPath();
      circlePath(ctx, cx, cy, cr);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    drawPoint(ctx, cx, cy);
  }

  return Object.freeze({
    get,
    draw,
    update,
    scale,
  });
}

export default Circle;