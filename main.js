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
const tools = document.querySelector('.tools');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

window.addEventListener('resize', _ => {
    canvas.width = canvas.width = canvas.clientWidth;
    canvas.height = canvas.height = canvas.clientHeight;
    offset.update(0, 0);
});

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
function pointCircle(px, py, cx, cy, cr) {
    return cr ** 2 > (px - cx) ** 2 + (py - cy) ** 2;
}

// function pointRect(px, py, rx, ry, rw, rh) {
//     return px < rx + rw && px > rx && py > ry && py < ry + rh;
// }

function updateValue(s) {
    let shape = { ...s };
    const el = document.getElementById("circleHtml");
    const child = el.children;
    child.x.addEventListener("change", (e) => {
        shape.x = e.target.value;
        console.log(shape);
    });
    return shape;
}

function addCircleHtml(shape) {
    let { a, r } = shape;
    let { x, y } = a;
    document.getElementById("rectangleHtml").style.display = "none";
    const el = document.getElementById("circleHtml");
    el.style.display = "grid";
    const child = el.children;
    child.x.value = x;
    child.y.value = y;
    child.r.value = r;
}

// function addRectangleHtml(shape) {
//     let { x, y, w, h } = shape;
//     const el = document.getElementById("rectangleHtml");
//     el.style.display = "grid";
//     document.getElementById("circleHtml").style.display = "none";
//     const child = el.children;
//     child.x.value = x;
//     child.y.value = y;
//     child.w.value = w;
//     child.h.value = h;
// }

let x, y;
let canMove = false;
let clicked = false;
let drawManager = 'select';
let tempShape = {};
let option = {
    line: (x, y) => new Line(ctx, x, y, x, y),
    circle: (x, y) => new Circle(ctx, x, y),
    rect: (x, y) => new Rect(ctx, x, y),
    point: (x, y) => new Point(ctx, x, y),
    ellipse: (x, y) => new Ellipse(ctx, x, y),
    square: (x, y) => new Square(ctx, x, y),
}
canvas.addEventListener('mousedown', e => {
    // middle button canvas movement
    if (e.button == 1) {
        canMove = true;
        e.preventDefault();
    }

    // promary button
    if (e.button == 0) {
        x = e.offsetX - offset.x;
        y = e.offsetY - offset.y;
        [x, y] = Util.snapXY(x, y, unit.size, SNAP);
        if (drawManager != "select") {
            let a = option[drawManager];
            tempShape = a(x, y);
            tempShape.selected = true;
            shapes.push(tempShape);
        } else {
            for (const shape of shapes) {
                shape.selected = false;
            }
            for (const shape of shapes) {
                console.log(x, y, shape.a.x, shape.a.y, shape.r);
                if (pointCircle(x, y, shape.a.x, shape.a.y, shape.r)) {
                    shape.selected = true;
                    addCircleHtml(shape);
                    break;
                }
                // if (pointRect(x, y, shape.x, shape.y, shape?.w, shape?.h)) {
                //     shape.selected = true;
                //     addRectangleHtml(shape);
                //     // break;
                // }
            }
        }

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
    // if (drawManager != "select" && clicked && drawManager != "point" && (tempShape.a.x != x || tempShape.a.y != y)) {
    //     tempShape.updateSize(x, y);
    // }
    for (const shape of shapes) {
        if (shape.selected && drawManager != "select" && clicked && drawManager != "point" && (tempShape.a.x != x || tempShape.a.y != y)) {
            shape.updateSize(x, y);
        }
    }
    // if (tempShape) {
    //     tempShape.updateSize(x, y);
    // }
});

window.addEventListener('mouseup', e => {
    canMove = false;
    if (e.button == 0) {
        clicked = false;
        tempShape = null;
        drawManager = "select";
    }
});

canvas.addEventListener('mouseleave', e => {
    cursor.setPos(0, 0);
});

window.addEventListener('wheel', e => {
    e.preventDefault();
}, { passive: false });

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

inputSnapSize.addEventListener('change', e => {
    SNAP = e.target.value;
});

tools.addEventListener('click', (e) => {
    drawManager = e.target.dataset.tool;
    let toolList = tools.children;
    for (const tool of toolList) {
        if (drawManager == tool.dataset.tool) {
            tool.style.backgroundColor = 'black';
            tool.style.color = 'white';
        } else {
            tool.style.backgroundColor = '';
            tool.style.color = '';
        }
    }
});

function contextMenuManage() {
    const contextMenu = document.getElementById('context-menu');

    return {
        showOption: (x, y) => {
            if (contextMenu.clientHeight + y > window.innerHeight) {
                y -= contextMenu.clientHeight;
            }
            if (contextMenu.clientWidth + x > window.innerWidth) {
                x -= contextMenu.clientWidth;
            }
            contextMenu.style.left = `${x}px`;
            contextMenu.style.top = `${y}px`;
            contextMenu.style.visibility = "visible";
        },
        hideOption: () => {
            contextMenu.style.visibility = "hidden";
        }
    }
}

const contextMenu = new contextMenuManage;

window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    let x = e.clientX;
    let y = e.clientY;
    contextMenu.showOption(x, y);
}, { passive: false });

window.addEventListener('click', contextMenu.hideOption)


function updateCirclevalue() {
    shapes.forEach((shape) => {
        if (shape.selected) {
            if (this.id == "r")
                shape.r = this.value;
            else
                shape.a[this.id] = this.value;                
        }
    });
}

// function updateRectanglevalue() {
//     shapes.forEach((shape) => {
//         if (shape.selected) {
//             shape[this.id] = this.value;
//         }
//     });
// }


let el = document.getElementById("circleHtml");
let child = el.children;
child.x.addEventListener("change", updateCirclevalue);
child.y.addEventListener("change", updateCirclevalue);
child.r.addEventListener("change", updateCirclevalue);

// el = document.getElementById("rectangleHtml");
// child = el.children;
// child.x.addEventListener("change", updateRectanglevalue);
// child.y.addEventListener("change", updateRectanglevalue);
// child.w.addEventListener("change", updateRectanglevalue);
// child.h.addEventListener("change", updateRectanglevalue);
