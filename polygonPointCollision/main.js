/**
 * @type HTMLCanvasElement
 */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const polyBtn = document.getElementById("poly")
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let drawPoly = false;

class Polygon {
    constructor(canvas, vertices) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.vertices = vertices;
        this.selected = false;
    }
    
    draw() {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = this.selected? "crimson": "black";
        this.ctx.beginPath();
        for (const vertex of this.vertices) {
            this.ctx.lineTo(vertex.x, vertex.y);
        }
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fill();
        
        for (const vertex of this.vertices) {
            vertex.draw();
        }
        
    }

    addVertix(x, y) {
        this.vertices.push(new Point(this.canvas, x, y))
    }
}

class Point {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = x;
        this.y = y;
    }

    draw() {
        this.ctx.fillStyle = "green"
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
}
const polies = [];

const point = new Point(canvas, 10, 10);

function polyPoint(vertices, px, py) {
    let collision = false;
    let next = 0;
    for (let current = 0; current < vertices.length; current++) {
        next = current + 1;
        if (next == vertices.length) next = 0;

        let vc = vertices[current];
        let vn = vertices[next];

        if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) && (px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x)) {
            collision = !collision;
        }
    }
    return collision;
}

function loop() {
    // reset
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update

    for (const poly of polies) {
        let collision = polyPoint(poly.vertices, point.x, point.y);
        poly.selected = collision;
    }
    // draw
    for (const poly of polies) {
        poly.draw();
    }

    point.draw();

    // repeat
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

addEventListener("mousemove", e => {
    point.setPos(e.pageX, e.pageY);
});

canvas.addEventListener("click", e => {
    if (drawPoly)
    polies?.at(-1).addVertix(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousedown", (e) => {
    if (e.button == 2) {
        drawPoly = false;
    }
})
canvas.addEventListener("contextmenu", (e) => {
    // e.preventDefault();
})

polyBtn.addEventListener("click", () => {
    if (!drawPoly) {
        drawPoly = true;
    }
    polies.push(new Polygon(canvas, []));
})
