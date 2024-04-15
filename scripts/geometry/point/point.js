import { circlePath } from "../../utils.js";
import { boardToScreen } from "../createScreen.js";
import { getCursor } from "../cursor/cursor.js";
import { drawPoint } from "../../utils.js";
import app from "../geometry.config.js";

function Point(x, y) {
  const canvas = document.getElementById("shape");
  const ctx = canvas.getContext("2d");
  let posX = x;
  let posY = y;
  let isDeleted = false;
  let id = Math.random().toString();
  let selected = false;

  function get(prop) {
    switch (prop) {
      case "pos": return { x: posX, y: posY };
      case "id": return id;
      case "isDeleted": return isDeleted;

      default: return null;
    }
  }

  function update(dt) {

  }

  function draw() {
    let [x, y] = boardToScreen([posX, posY]);

    if (!selected) {
      drawPoint(ctx, x, y);
    } else {
      ctx.strokeStyle = "red"
      circlePath(ctx, x, y, 8);
      ctx.stroke();

      ctx.fillStyle = "crimson";
      circlePath(ctx, x, y, 4);
      ctx.fill();
    }
  }

  return Object.freeze({
    get,
    draw,
    update
  });
}

function createPoint() {
  const shapes = app.getShapes();
  const screenEl = app.getMainScreen();

  function foo() {
    const cursor = getCursor();
    const [x, y] = cursor.get("pos");
    shapes.push(Point(x, y));
    screenEl.removeEventListener("click", foo);
  }
  screenEl.addEventListener("click", foo);
}

export { createPoint };