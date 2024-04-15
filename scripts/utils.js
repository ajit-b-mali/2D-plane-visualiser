function redirectTo(page) {
  window.location.assign("/2D-plane-visualiser/pages/" + page + ".html");
}

/******************************************
 ***** Useful utility Methods ans data ****
 ******************************************/

// Colors
const color = {
  hotpink: 'rgb(255, 107, 181)',
  yellow: 'rgb(255, 255, 75)',
  Up: 'rgb(0, 200, 200)',
  Us: 'rgb(0, 120, 120)',
  Ut: 'rgb(58, 66, 65)',
  Uth: 'rgb(40, 40, 40)',
  Uf: 'rgb(20, 70, 70)',
}

// Draw a line from (sx, sy) to (ex, ey)
function drawLine(ctx, sx, sy, ex, ey) {
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(ex, ey);
  ctx.closePath();
  ctx.stroke();
}

function circlePath(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
}

// Clamp the value
function clamp(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value
}

// reset the canvas to defaualt
function reset(ctx, offset) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(offset.x, offset.y);
}

// Returns the snaped value of (x, y) in according to value
function snapXY(x, y, UNITSIZE, value) {
  value = (value == 0) ? 1 : UNITSIZE * value;
  x = (Math.round(x / value) * value) / UNITSIZE;
  y = (Math.round(y / value) * value) / UNITSIZE;
  if (value == 1) {
    x = Math.round(x * 100) / 100;
    y = Math.round(y * 100) / 100;
  }
  return [x, y];
}

// create a stroke Ellipse
function ellipsePath(ctx, x, y, rx, ry, rt) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, rt, 0, 2 * Math.PI);
  ctx.closePath();
}

function findDist(ax, ay, bx, by) {
  return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
}

function ceil(value, ceilTo = 10) {
  return Math.ceil(value * ceilTo) / ceilTo;
}

function round(value, roundTo = 10) {
  if (roundTo < 0) return value;
  return Math.round(value * roundTo) / roundTo;
}

function getOrdinates(mx, my) {
  let [x, y] = screenToWorld(mx, my);
  x = round(x, 10);
  y = round(y, 10);
  return [x, y];
}

function ator(angle) {
  return angle * Math.PI / 180;
}

function clear(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function drawPoint(ctx, x, y) {
  ctx.strokeStyle = "white"
  circlePath(ctx, x, y, 5);
  ctx.stroke();

  ctx.fillStyle = "white";
  circlePath(ctx, x, y, 2);
  ctx.fill();
}

export { drawPoint, clear, circlePath, getOrdinates, ceil, round, redirectTo, drawLine, color, clamp, reset, snapXY, ator, ellipsePath, findDist };
