import { getScreen, screenToBoard } from "../createScreen.js";

function createEventFunctionForBoardMove(draw) {
  const screen = getScreen();

  const WHEEL_CLICK = 1;

  let isClicked = false;
  let mxBeforePan = 0;
  let myBeforePan = 0;

  function handleMouseMove(event) {
    if (isClicked) {
      const [mxAfterPan, myAfterPan] = screenToBoard([event.offsetX, event.offsetY]);
      screen.pan(mxAfterPan - mxBeforePan, myAfterPan - myBeforePan);
      draw();
    }
  }
  
  function handleMouseDown(event) {
    if (event.button == WHEEL_CLICK) {
      isClicked = true;
      [mxBeforePan, myBeforePan] = screenToBoard([event.offsetX, event.offsetY]);
    }
  }
  
  function handleMouseUp(event) {
    if (event.button == WHEEL_CLICK) {
      isClicked = false;
    }
  }
  
  function handleMouseLeave() {
    isClicked = false;
  }
  
  return [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave];
}

export { createEventFunctionForBoardMove };