import { getScreen } from "../createScreen.js";
import { getCursor } from "../cursor/cursor.js";


function createEventFunctionForBoardReset(draw) {
  const screen = getScreen();
  
  let mx = 0;
  let my = 0;

  function handleMouseMove(event) {
    mx = event.offsetX;
    my = event.offsetY;
  }

  function handleKeyDown(event) {
    if (event.code == "KeyO") {
      screen.manageZoom(mx, my, screen.resetScale);
    } else if (event.code == "KeyP") {
      const beforeOffsetX = screen.get("offsetX");
      const beforeOffsetY = screen.get("offsetY");
      screen.resetOffset();
      const afterOffsetX = screen.get("offsetX");
      const afterOffsetY = screen.get("offsetY");

      getCursor().manageOffsetReset(afterOffsetX - beforeOffsetX, afterOffsetY - beforeOffsetY);
    }
    draw();
  }

  return [handleMouseMove, handleKeyDown];
}

export { createEventFunctionForBoardReset };