import { color, drawLine, ceil, round, circlePath } from "../../utils.js";
import { createEventFunctionForBoardMove } from "./boardEventMove.js";
import { createEventFunctionForBoardZoom } from "./boardEventZoom.js";
import { createEventFunctionForBoardReset } from "./boardEventReset.js";
import { getScreen, boardToScreen, screenToBoard } from "../createScreen.js";

const screen = getScreen();

function drawSubAxis(canvas) {
  const ctx = canvas.getContext("2d");

  const [sx, sy] = screenToBoard([0, 0]);
  const [ex, ey] = screenToBoard([canvas.width, canvas.height]);

  ctx.lineWidth = 1;
  // Parallel to X-Axis
  for (let i = ceil(sy); i < ey; i += 0.1) {
    ctx.strokeStyle = color.Uth;
    i = round(i);
    const [temp, y] = boardToScreen([0, i]);
    drawLine(ctx, 0, y, canvas.width, y);
    if (i % 0.5 == 0) {
      ctx.strokeStyle = color.Ut;
      drawLine(ctx, 0, y, canvas.width, y);
    }
  }

  // Parallel to Y-Axis
  for (let i = ceil(sx); i < ex; i += 0.1) {
    ctx.strokeStyle = color.Uth;
    i = round(i);
    const [x, temp] = boardToScreen([i, 0]);
    drawLine(ctx, x, 0, x, canvas.height);
    if (i % 0.5 == 0) {
      ctx.strokeStyle = color.Ut;
      drawLine(ctx, x, 0, x, canvas.height);
    }
  }
}

function drawUnitAxis(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = color.Us;
  ctx.lineWidth = 2;

  const [sx, sy] = screenToBoard([0, 0]);
  const [ex, ey] = screenToBoard([canvas.width, canvas.height]);

  // Parallel to X-Axis
  for (let i = ceil(sy, 1); i < ey; i++) {
    const [temp, y] = boardToScreen([0, i]);
    drawLine(ctx, 0, y, canvas.width, y);
  }
  // Parallel to Y-Axis
  for (let i = ceil(sx, 1); i < ex; i++) {
    const [x, temp] = boardToScreen([i, 0]);
    drawLine(ctx, x, 0, x, canvas.height);
  }
}

function drawMainAxis(canvas) {
  const ctx = canvas.getContext("2d");

  const [sx, sy] = boardToScreen([0, 0]);

  ctx.lineWidth = 2;
  // X-axis
  ctx.strokeStyle = color.hotpink;
  drawLine(ctx, 0, sy, canvas.width, sy);

  // Y-axis
  ctx.strokeStyle = color.yellow;
  drawLine(ctx, sx, 0, sx, canvas.height);
}

function drawOrigin(canvas) {
  const ctx = canvas.getContext("2d");

  // Label
  ctx.font = "12px Courier";
  ctx.fillStyle = "white";
  const [x, y] = boardToScreen([0, 0]);
  ctx.fillText("O(0, 0)", x - 50, y + 15);

  // Point
  ctx.fillStyle = "black";
  circlePath(ctx, x, y, 3);
  ctx.fill();
}

function createBoard(canvas) {
  const ctx = canvas.getContext("2d");

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Sub Axis
    if (screen.get("scale") > 49) drawSubAxis(canvas);
    // Unit Axis
    if (screen.get("scale") > 9) drawUnitAxis(canvas);
    // Main Axis
    drawMainAxis(canvas);
    // draw Origin
    drawOrigin(canvas);
  }

  // adds event to the screen other than canvas to manage overlaps of canvas
  function addEventsTo(screenEl) {
    // move events
    const handleBoardMove = createEventFunctionForBoardMove(draw);
    screenEl.addEventListener("mousemove", handleBoardMove[0]);
    screenEl.addEventListener("mousedown", handleBoardMove[1]);
    window.addEventListener("mouseup", handleBoardMove[2]);
    screenEl.addEventListener("mouseleave", handleBoardMove[3]);

    // zoom events
    const handleBoardZoom = createEventFunctionForBoardZoom(draw);
    screenEl.addEventListener("mousemove", handleBoardZoom[0]);
    screenEl.addEventListener("wheel", handleBoardZoom[1]);
    window.addEventListener("keydown", handleBoardZoom[2]);

    // reset events
    const handleBoardReset = createEventFunctionForBoardReset(draw);
    screenEl.addEventListener("mousemove", handleBoardReset[0]);
    window.addEventListener("keydown", handleBoardReset[1]);
  }

  return {
    draw,
    addEventsTo,
  }
}

export { createBoard };