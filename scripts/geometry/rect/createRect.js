import { getCursor } from "../cursor/cursor.js";
import app from "../geometry.config.js";
import Rect from "./rect.js";

function handleMouseDown(event) {
  if (event.button !== 0) return;

  const screenEl = app.getMainScreen();
  const cursor = getCursor();
  const [sx, sy] = cursor.get("pos");

  app.setTempShape(Rect([
      [sx    , sy    ],
      [sx + 1, sy    ],
      [sx + 1, sy + 1],
      [sx    , sy + 1],
  ]));

  screenEl.addEventListener("mousemove", handleMouseMove);
  screenEl.addEventListener("mouseup", handleMouseUp);
}

function handleMouseMove() {
  const tempShape = app.getTempShape();
  const cursor = getCursor();
  const [ex, ey] = cursor.get("pos");
  const [sx, sy]= tempShape.get("pos")[0];

  if (ex == sx && ey == sy) return;
  tempShape.scale(ex, ey);
}

function handleMouseUp() {
  if (event.button != 0) return;

  const screenEl = app.getMainScreen();
  app.getShapes().push(Rect(app.getTempShape().get("pos")));
  app.setTempShape(null);
  
  screenEl.removeEventListener("mousedown", handleMouseDown);
  screenEl.removeEventListener("mousemove", handleMouseMove);
  screenEl.removeEventListener("mouseup", handleMouseUp);
}

function createRect() {
  const screenEl = app.getMainScreen();
  screenEl.addEventListener("mousedown", handleMouseDown);
}

export { createRect };