import { createBoard } from "./Board/board.js";
import { getCursor } from "./cursor/cursor.js";

function initializeApp(listOfCanvas, mainScreenEl) {
  const canvas = { ...listOfCanvas };
  const screenEl = mainScreenEl;
  const shapes = [];
  let tempShape = null;

  init(canvas, screenEl);

  const getMainScreen = () => {
    return screenEl;
  }

  const getCanvas = (whichCanvas) => {
    return canvas[whichCanvas];
  }

  const getShapes = () => {
    return shapes;
  }

  const getTempShape = () => {
    return tempShape;
  }

  const setTempShape = (shape) => {
    tempShape = shape;
  }

  return Object.freeze({
    getCanvas,
    getMainScreen,
    getShapes,
    getTempShape,
    setTempShape,
  });
}

function init(canvas, screenEl) {
  setWidthHeight(canvas);

  const board = createBoard(canvas.board);
  board.addEventsTo(screenEl);
  board.draw();
  const cursor = getCursor();
  cursor.addEventsTo(screenEl);

  addDefaultEvents(canvas, screenEl, board)
}

function addDefaultEvents(canvas, screenEl, board) {
  // prevent Zoom in out
  window.addEventListener("wheel", (event) => {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  }, { passive: false })

  // prevent Zoom Using KeyBoard
  window.addEventListener("keydown", (event) => {
    const preventKeys = ["Equal", "Minus", "NumpadAdd", "NumpadSubtract"];
    if (preventKeys.includes(event.code) && event.ctrlKey)
      event.preventDefault();
  }, { passive: false });

  // keep canvas in proper shape
  window.addEventListener("resize", () => {
    setWidthHeight(canvas);
    board.draw();
  });

  // prevent default move on middle button
  screenEl.addEventListener("mousedown", (event) => {
    if (event.button == 1)
      event.preventDefault();
  })

  // prevent default menu
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  }, { passive: false });
}

function setWidthHeight(canvas) {
  for (const key in canvas) {
    if (Object.hasOwnProperty.call(canvas, key)) {
      const c = canvas[key];
      c.width = c.clientWidth;
      c.height = c.clientHeight;
    }
  }
}

export { initializeApp };