import { getCursor } from "../cursor/cursor.js";
import app from "../geometry.config.js";
import Line from "./line.js";

function handleMouseDown(event) {
  if (event.button != 0) return;

  const screenEl = app.getMainScreen();
  const cursor = getCursor();
  let [sx, sy] = cursor.get("pos");
  app.setTempShape(Line([[sx, sy], [sx + 1, sy]]));

  screenEl.addEventListener("mousemove", handleMouseMove);
  screenEl.addEventListener("mouseup", handleMouseUp);
}

function handleMouseMove() {
  const tempShape = app.getTempShape();
  const cursor = getCursor();
  const [ex, ey] = cursor.get("pos");
  const [sx, sy] = tempShape.get("pos")[0];

  if (ex == sx && ey == sy) return;
  tempShape.move([[sx, sy], [ex, ey]]);
}

function handleMouseUp(event) {
  if (event.button != 0) return;

  const screenEl = app.getMainScreen();
  app.getShapes().push(Line(app.getTempShape().get("pos")));
  app.setTempShape(null);

  screenEl.removeEventListener("mousedown", handleMouseDown);
  screenEl.removeEventListener("mousemove", handleMouseMove);
  screenEl.removeEventListener("mouseup", handleMouseUp);
}

function createLine() {
  const screenEl = app.getMainScreen();
  screenEl.addEventListener("mousedown", handleMouseDown);
}

export { createLine };