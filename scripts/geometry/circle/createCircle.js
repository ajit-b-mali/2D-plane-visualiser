import { getCursor } from "../cursor/cursor.js";
import app from "../geometry.config.js";
import Circle from "./circle.js";

function handleMouseDown(event) {
  if (event.button !== 0) return;

  const screenEl = app.getMainScreen();
  const cursor = getCursor();
  const c = cursor.get("pos");

  app.setTempShape(Circle(c, 1));

  screenEl.addEventListener("mousemove", handleMouseMove);
  screenEl.addEventListener("mouseup", handleMouseUp);
}

function handleMouseMove() {
  const tempShape = app.getTempShape();
  const cursor = getCursor();
  const [ex, ey] = cursor.get("pos");
  const [sx, sy] = tempShape.get("pos");

  if (ex == sx && ey == sy) return;
  tempShape.scale(ex, ey);
}

function handleMouseUp(event) {
  if (event.button != 0) return;

  const screenEl = app.getMainScreen();
  app.getShapes().push(Circle(app.getTempShape().get("pos"), app.getTempShape().get("r")));
  app.setTempShape(null);

  screenEl.removeEventListener("mousedown", handleMouseDown);
  screenEl.removeEventListener("mousemove", handleMouseMove);
  screenEl.removeEventListener("mouseup", handleMouseUp);
}

function createCircle() {
  const screenEl = app.getMainScreen();
  screenEl.addEventListener("mousedown", handleMouseDown);
}

export { createCircle };