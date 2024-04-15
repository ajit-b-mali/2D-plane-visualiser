import { getScreen } from "../createScreen.js";

function createEventFunctionForBoardZoom(draw) {
  const screen = getScreen();

  let mx = 0;
  let my = 0;

  function handleWheel(event) {
    function modifyZoom() {
      if (event.ctrlKey && event.deltaY < 0) {
        screen.zoomIn(1.1);
      } else if (event.ctrlKey && event.deltaY > 0) {
        screen.zoomOut(0.9);
      }
    }
    screen.manageZoom(mx, my, modifyZoom);
    draw();
  }

  function handleKeyDown(event) {
    function modifyZoom() {
      if (event.code == "Equal" || event.code == "NumpadAdd" && event.ctrlKey) {
        screen.zoomIn();
      }
      if (event.code == "Minus" || event.code == "NumpadSubtract" && event.ctrlKey) {
        screen.zoomOut();
      }
    }
    screen.manageZoom(mx, my, modifyZoom);
    draw();
  }

  function handleMouseMove(event) {
    mx = event.offsetX;
    my = event.offsetY;
  }

  return [handleMouseMove, handleWheel, handleKeyDown];
}

export { createEventFunctionForBoardZoom };
