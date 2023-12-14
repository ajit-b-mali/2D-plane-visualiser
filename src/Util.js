/******************************************
 ***** Useful utility Methods ans data ****
 ******************************************/

// Colors
const color = {
    teal: 'rgb(18, 49, 49, 0.5)',
    teal2: 'rgb(0, 128, 128)',
    teal3: 'rgba(0, 128, 128, 0.39)',
    aqua: 'rgb(0, 255, 255)',
    pink: 'rgb(255, 150, 255)',
    hotpink: 'rgb(255, 107, 181)',
    yellow: 'rgb(255, 255, 75)',
}

// Draw a line from (sx, sy) to (ex, ey)
function drawLine(ctx, sx, sy, ex, ey) {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.closePath();
    ctx.stroke();
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
    value = (value == 0)? 1: UNITSIZE * value;
    x = (Math.round(x / value) * value) / UNITSIZE;
    y = (Math.round(y / value) * value) / UNITSIZE;
    if(value == 1) {
        x = Math.round(x * 100) / 100;
        y = Math.round(y * 100) / 100;
    }
    return [x, y];
}

// degree to radian
function rtoa(angle) {
    return angle * Math.PI / 180;
}

// create a stroke Ellipse
function ellipsePath(ctx, x, y, rx, ry, rt, type) {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rt, 0, 2 * Math.PI);
    ctx.closePath();
    if(type == "fill") ctx.fill();
    else ctx.stroke()
}

export { drawLine, color, clamp, reset, snapXY , rtoa, ellipsePath};