/**
 * @type HTMLCanvasElement
 */

import Board from "./src/Board.js";
import * as Util from "./src/Util.js";
import Offset from "./src/Offset.js";
import Cursor from "./src/Cursor.js";
import Point from "./src/shapes/Point.js";

// References-------------------------------------
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const inputSnapSize = document.getElementById('snapSize');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const board = new Board(canvas);
const offset = new Offset(canvas);
const cursor = new Cursor(canvas);
// Global variables--------------------------------
function Unit(v) {
    return {
        default: v,
        mini: 35,
        maxi: 250,
        size: v,
        setSize(v) {
            this.size = v;
        },
        updateSize(v) {
            this.size = Util.clamp(this.size + v, this.mini, this.maxi);
        },
    }
}

const unit = Unit(250);
let SNAP = inputSnapSize.value;

let points = [];

// Default Functions--------------------------------
function update(dt) {
    console.log(points);
    Util.reset(ctx, offset);
    board.update(offset, unit.size);
    points.forEach(point => {
        point.update(dt, unit.size);
    });
    cursor.update(dt);
}

function draw() {
    board.draw(offset, unit.size);

    points.forEach(point => {
        point.draw()
    });

    cursor.draw(unit.size);
}

function clear() {
    ctx.clearRect(-offset.x, -offset.y, canvas.width, canvas.height);
}

let oldTimeStamp = 0;
let dt = 0;
function mainLoop(timeStamp) {
    dt = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;

    update(dt);
    clear();
    draw();

    requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);

// Events--------------------------------------------
let canMove = false;

canvas.addEventListener('mousedown', e => {
    if (e.button == 1) {
        canMove = true;
    }
    if (e.button == 0) {
        let x = e.offsetX - offset.x;
        let y = e.offsetY - offset.y;
        [x, y] = Util.snapXY(x, y, unit.size, SNAP);
        points.push(new Point(ctx, x, y));
    }
});

canvas.addEventListener('mousemove', e => {
    if (canMove) {
        offset.update(e.movementX, e.movementY);
    }
    let x = e.offsetX - offset.x;
    let y = e.offsetY - offset.y;
    [x, y] = Util.snapXY(x, y, unit.size, SNAP);
    cursor.setPos(x, y);
});

canvas.addEventListener('mouseup', e => {
    canMove = false;
});

canvas.addEventListener('mouseleave', e => {
    canMove = false;
    cursor.setPos(0, 0);
});

window.addEventListener('wheel', e => {
    e.preventDefault();
}, {passive: false});

canvas.addEventListener('wheel', e => {
    let zoomSpeed = (unit.size >= 70) ? 20 : 50;
    let moveSpeed = (unit.size <= 70) ? 5 : 20;
    let zoom = -e.deltaY / zoomSpeed;
    let move = -e.deltaY / moveSpeed;
    if (e.ctrlKey) {
        e.preventDefault();
        unit.updateSize(zoom);
        offset.update(0, 0);
    }
    else if (!canMove) {
        if (e.shiftKey) {
            offset.update(move, 0);
        } else {
            offset.update(0, move);
        }
    }
    let x = e.offsetX - offset.x;
    let y = e.offsetY - offset.y;
    [x, y] = Util.snapXY(x, y, unit.size, SNAP);
    cursor.setPos(x, y);
}, { passive: false });

window.addEventListener('keydown', e => {
    if (e.ctrlKey) e.preventDefault();
    if (e.code == 'KeyC' && !e.ctrlKey) {
        offset.set(canvas.width / 2, canvas.height / 2)
    }
    if (e.code == 'KeyC' && e.ctrlKey) {
        unit.setSize(unit.default);
    }
}, { passive: false });

window.addEventListener('resize', _ => {
    canvas.width = canvas.width = canvas.clientWidth;
    canvas.height = canvas.height = canvas.clientHeight;
    offset.update(0, 0);
});

inputSnapSize.addEventListener('change', e => {
    SNAP = e.target.value;
});