import { drawPoint } from "../../utils.js";
import { boardToScreen } from "../createScreen.js";
import app from "../geometry.config.js";

function Polygon(points) {
  let vertices = points;
  const id = Math.random().toString();

  function get(prop) {
    switch (prop) {
      case "pos": return vertices;
      case "id": return id;

      default: return null;
    }
  }

  function update(dt) {
  }

  function addPointAtLast([x, y]) {
    vertices.push([x, y]);
  }

  function removeLastPoint() {
    vertices.pop();
  }

  function draw(canvasId = "shape") {
    const canvas = app.getCanvas(canvasId);
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";

    ctx.beginPath();
    const [x, y] = boardToScreen(vertices[0]);
    ctx.moveTo(x, y);
    for (let i = 1; i < vertices.length; i++) {
      const [x, y] = boardToScreen(vertices[i]);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    for (const vertice of vertices) {
      const [x, y] = boardToScreen(vertice);
      drawPoint(ctx, x, y);
    }
  }

  function move([x, y]) {
    vertices.at(-1)[0] = x;
    vertices.at(-1)[1] = y;
  }

  return Object.freeze({
    get,
    draw,
    update,
    addPointAtLast,
    removeLastPoint,
    move,
  });
}

export default Polygon;