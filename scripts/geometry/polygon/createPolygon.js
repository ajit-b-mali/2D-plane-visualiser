import { getCursor } from "../cursor/cursor.js";
import app from "../geometry.config.js";
import Polygon from "./polygon.js";

let firstPoint = true;

function handleMouseClick() {
  const screenEl = app.getMainScreen();
  const cursor = getCursor();
  const [sx, sy] = cursor.get("pos");

  if (firstPoint) {
    app.setTempShape(Polygon([[sx, sy], [sx, sy]]));

    screenEl.addEventListener("mousemove", handleMouseMove);
    screenEl.addEventListener("mousedown", handleMouseDown);

    firstPoint = false;
  } else {
    const tempShape = app.getTempShape();
    tempShape.addPointAtLast([sx, sy]);
  }
}


function handleMouseMove() {
  const tempShape = app.getTempShape();
  const cursor = getCursor();
  const [ex, ey] = cursor.get("pos");
  tempShape.move([ex, ey]);
}

function handleMouseDown(event) {
  if (event.button == 2) {
    const screenEl = app.getMainScreen();
    app.getShapes().push(Polygon(app.getTempShape().get("pos")));
    app.setTempShape(null);
    firstPoint = true;
  
    screenEl.removeEventListener("click", handleMouseClick);
    screenEl.removeEventListener("mousemove", handleMouseMove);
    screenEl.removeEventListener("mousedown", handleMouseDown);
  }
}

function createPolygon() {
  const screenEl = app.getMainScreen();
  screenEl.addEventListener("click", handleMouseClick);
}

export { createPolygon };