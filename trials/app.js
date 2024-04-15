/**
 * @type HTMLCanvasElement
 */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
}

let sPanX = 0;
let sPanY = 0;
let scaleX = 40;
let scaleY = 40;
let offsetX = -canvas.width / 2 / scaleX + 5;
let offsetY = -canvas.height / 2 / scaleY + 5;
let mx = 0;
let my = 0;
let mxBeforeZoom = 0;
let myBeforeZoom = 0;
let mxAfterZoom = 0;
let myAfterZoom = 0;
let selectedCellX = 0;
let selectedCellY = 0;
let worldLeft, worldRight, worldTop, worldBottom;
function worldToScreen(wx, wy) {
  const sx = Math.floor((wx - offsetX) * scaleX);
  const sy = Math.floor((wy - offsetY) * scaleY);
  return [sx, sy];
}

function screenToWorld(sx, sy) {
  const wx = sx / scaleX + offsetX;
  const wy = sy / scaleY + offsetY;
  return [wx, wy];
}

function drawWorld() {
  [worldLeft, worldTop] = screenToWorld(0, 0);
  [worldRight, worldBottom] = screenToWorld(canvas.width, canvas.height);

  // 11 Horizontal Lines
  let lines = 0;
  for (let y = 0; y <= 10; y++) {
    if (y < worldTop || y > worldBottom) continue;
    let sx = 0, sy = y;
    let ex = 10, ey = y;
    const [psx, psy] = worldToScreen(sx, sy);
    const [pex, pey] = worldToScreen(ex, ey);
    drawLine(psx, psy, pex, pey);
    lines++;
  }

  // 11 Vertical Lines
  for (let x = 0; x <= 10; x++) {
    if (x < worldLeft || x > worldRight) continue;
    let sx = x, sy = 0;
    let ex = x, ey = 10;
    const [psx, psy] = worldToScreen(sx, sy);
    const [pex, pey] = worldToScreen(ex, ey);
    drawLine(psx, psy, pex, pey);
    lines++;
  }
  console.log(worldLeft, worldTop)
}

function update() {

}

function draw() {
  ctx.strokeStyle = "white";
  ctx.fillStyle = "red";
  ctx.lineWidth = .1;

  drawWorld();
  let [cx, cy] = worldToScreen(selectedCellX + 0.5, selectedCellY + 0.5);
  let cr = 0.5 * scaleX;
  ctx.beginPath();
  ctx.arc(cx, cy, cr, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  update();
  draw();

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

let isClicked = false;
canvas.addEventListener("mousedown", (e) => {
  mx = e.x;
  my = e.y;

  // using mouse movement
  if (e.button == 1) {
    isClicked = true;
  }
  if (e.button == 0) {
    let [x, y] = screenToWorld(mx, my);
    selectedCellX = Math.floor(x);
    selectedCellY = Math.floor(y);
    console.log(selectedCellX, -selectedCellY);
  }
});

canvas.addEventListener("mousemove", (e) => {
  mx = e.x;
  my = e.y;

  // using mouse movement
  if (isClicked) {
    offsetX -= e.movementX / scaleX;
    offsetY -= e.movementY / scaleY;
  }
});

window.addEventListener("mouseup", (e) => {
  if (e.button == 1 && isClicked) {
    isClicked = false;
  }
});

window.addEventListener("keydown", (e) => {
  [mxBeforeZoom, myBeforeZoom] = screenToWorld(mx, my);

  if (e.key == "q") {
    scaleX *= 1.01;
    scaleY *= 1.01;
  } else if (e.key == "a") {
    scaleX *= 0.99;
    scaleY *= 0.99;
  }

  [mxAfterZoom, myAfterZoom] = screenToWorld(mx, my);

  offsetX += (mxBeforeZoom - mxAfterZoom);
  offsetY += (myBeforeZoom - myAfterZoom);
});