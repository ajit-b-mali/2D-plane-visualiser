const initialScale = 200;

function createScreen() {
  let offsetX = -150 / initialScale;
  let offsetY = -150 / initialScale;
  let scale = initialScale;

  const zoomIn = (zoomFactor = 1.01) => scale *= zoomFactor;
  const zoomOut = (zoomFactor = 0.99) => scale *= zoomFactor;

  const pan = (x, y) => {
    offsetX -= x;
    offsetY -= y;
  }

  const get = (prop) => {
    switch (prop) {
      case "offsetX":
        return offsetX;

      case "offsetY":
        return offsetY;

      case "scale":
        return scale;

      default:
        return null;
    }
  }

  const resetOffset = () => {
    offsetX = -150 / scale;
    offsetY = -150 / scale;
  }

  const resetScale = () => {
    scale = initialScale;
  }

  const manageZoom = (mx, my, callback) => {
    const [mxBefore, myBefore] = screenToBoard([mx, my]);

    callback();

    const [mxAfter, myAfter] = screenToBoard([mx, my]);

    const x = mxAfter - mxBefore;
    const y = myAfter - myBefore;
    pan(x, y);
  }

  const setOffset = (x, y) => {
    offsetX = x;
    offsetY = y;
  }

  return Object.freeze({
    zoomIn,
    zoomOut,
    pan,
    get,
    resetOffset,
    resetScale,
    manageZoom,
    setOffset,
  });
}

const screen = createScreen();

const boardToScreen = ([boardX, boardY]) => {
  const offsetX = screen.get("offsetX");
  const offsetY = screen.get("offsetY")
  const scale = screen.get("scale");

  const screenX = (boardX - offsetX) * scale;
  const screenY = (boardY - offsetY) * scale;

  return [screenX, screenY];
}

const screenToBoard = ([screenX, screenY]) => {
  const offsetX = screen.get("offsetX");
  const offsetY = screen.get("offsetY");
  const scale = screen.get("scale");

  const boardX = offsetX + screenX / scale;
  const boardY = offsetY + screenY / scale;

  return [boardX, boardY];
}

function getScreen() {
  return screen;
}

export { getScreen, screenToBoard, boardToScreen };