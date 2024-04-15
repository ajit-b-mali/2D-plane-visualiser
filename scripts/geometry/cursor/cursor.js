import { ator, circlePath, ellipsePath, round } from "../../utils.js";
import { boardToScreen, screenToBoard } from "../createScreen.js"

function drawCursor(ctx, x, y, rad) {
  const r = 3;

  ctx.lineWidth = r;
  ctx.strokeStyle = "white";
  ellipsePath(ctx, x, y, r / 2, 3 * r / 2, rad);
  ctx.stroke();
  ellipsePath(ctx, x, y, r / 2, 3 * r / 2, rad + ator(90));
  ctx.stroke();

  ctx.strokeStyle = "black";
  ellipsePath(ctx, x, y, r / 2, 3 * r / 2, rad + ator(45));
  ctx.stroke();
  ellipsePath(ctx, x, y, r / 2, 3 * r / 2, rad + ator(135));
  ctx.stroke();

  ctx.fillStyle = "red";
  circlePath(ctx, x, y, r);
  ctx.fill();
}

function createCursor() {
  const canvas = document.getElementById("cursor");
  const ctx = canvas.getContext("2d");
  let posX = 0;
  let posY = 0;
  let mx = -100;
  let my = -100;
  let snap = 0.1;
  let angle = 0;
  let rad = ator(angle);

  function update(dt) {
    let tps = 1.5;
    angle += tps * 360 * dt;
    rad = ator(angle);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const [x, y] = boardToScreen([posX, posY]);
    drawCursor(ctx, x, y, rad);

    ctx.font = "12px Courier";
    ctx.fillStyle = "white";
    let tx = posX;
    let ty = posY;
    if (snap < 0) {
      tx = posX.toFixed(2);
      ty = posY.toFixed(2);
    }
    ctx.fillText(`(${tx}, ${-ty})`, mx, my);
  }

  const moveTo = (x, y) => {
    posX = x;
    posY = y;
  }

  function addEventsTo(screenEl) {
    screenEl.addEventListener("mousemove", (event) => {
      let [x, y] = screenToBoard([event.offsetX, event.offsetY]);
      x = round(x, 1 / snap);
      y = round(y, 1 / snap);
      moveTo(x, y);

      mx = event.offsetX + 10;
      my = event.offsetY + 25;
    });

    screenEl.addEventListener("mouseleave", () => {
      moveTo(0, 0);

      mx = -100;
      my = -100;
    });
  }

  function get(prop) {
    switch (prop) {
      case "pos": return [posX, posY];

      default: return null;
    }
  }

  function manageOffsetReset(x, y) {
    if (posX != 0 && posY != 0) {
      posX += x;
      posY += y;
    }
    draw();
  }

  const snapEl = document.getElementById("snap");
  snapEl.addEventListener("change", (e) => {
    snap = snapEl.value;
  })

  return Object.freeze({
    update,
    draw,
    moveTo,
    addEventsTo,
    manageOffsetReset,
    get,
  });
}

const cursor = createCursor();

function getCursor() {
  return cursor;
}

export { getCursor };