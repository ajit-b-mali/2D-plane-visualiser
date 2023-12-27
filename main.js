/**
 * @type HTMLCanvasElement
 */

import Board from "./src/Board.js";
import * as Util from "./src/Util.js";
import Offset from "./src/Offset.js";
import Cursor from "./src/Cursor.js";
import Point from "./src/shapes/Point.js";
import Circle from "./src/shapes/Circle.js";
import Square from "./src/shapes/Square.js";
import Line from "./src/shapes/Line.js";
import Rect from "./src/shapes/Rect.js";
import Ellipse from "./src/shapes/Ellipse.js";

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

const unit = Unit(100);
let SNAP = inputSnapSize.value;

let shapes = [];

// Default Functions--------------------------------
function update(dt) {
    Util.reset(ctx, offset);
    board.update(offset, unit.size);

    shapes.forEach(shape => {
        shape.update(dt, unit.size);
    });
    cursor.update(dt);
}

function draw() {
    board.draw(offset, unit.size);

    shapes.forEach(shape => {
        shape.draw();
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
let x, y;
let canMove = false;
let clicked = false;
let selected;
let option = {
    line: (x, y) => new Line(ctx, x, y, x, y),
    circle: (x, y) => new Circle(ctx, x, y),
    rect: (x, y) => new Rect(ctx, x, y),
    point: (x, y) => new Point(ctx, x, y),
    ellipse: (x, y) => new Ellipse(ctx, x, y)
}
canvas.addEventListener('mousedown', e => {
    if (e.button == 1) {
        canMove = true;
    }
    if (e.button == 0) {
        x = e.offsetX - offset.x;
        y = e.offsetY - offset.y;
        [x, y] = Util.snapXY(x, y, unit.size, SNAP);
        let a = option["ellipse"];
        selected = a(x, y);
        shapes.push(selected);
        clicked = true;
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
    // let line = clicked && (selected.b.x != x || selected.b.y != y);
    // let circle = clicked && (selected.center.x != x || selected.center.y != y);
    // let square = clicked && (selected.a.x != x || selected.a.y != y);
    let ellipse = clicked && (selected.center.x != x || selected.center.y != y);
    if (ellipse) {
        selected.updateSize(x, y);
    }
});

window.addEventListener('mouseup', e => {
    canMove = false;
    if (e.button == 0) {
        clicked = false;
    }
});

canvas.addEventListener('mouseleave', e => {
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