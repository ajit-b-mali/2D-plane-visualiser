import { ellipsePath } from "../Util.js";
import Point from "./Point.js";

export default class Ellipse {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.a = new Point(ctx, x, y);
        this.dx = 1;
        this.dy = 0.5;
    }

    update(dt, unitsize) {
        this.a.update(dt, unitsize);
        this.fakeDx = this.dx *  unitsize;
        this.fakeDy = this.dy * unitsize;
    }

    draw() {
        this.a.draw();
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.lineWidth = 2;
        if (Math.abs(this.dy - this.dx) < 0.01 && Math.abs(this.dx - this.dy) >= -0.01) {
            this.ctx.strokeStyle = 'white';
        } else {
            this.ctx.strokeStyle = 'grey';
        }
        ellipsePath(this.ctx, this.a.fakeX, this.a.fakeY, this.fakeDx, this.fakeDy, 0);
    }

    updateSize(x, y) {
        this.dx = Math.abs(this.a.x - x);
        this.dy = Math.abs(this.a.y - y);
        this.dx = (!this.dx)? 0.05: this.dx;
        this.dy = (!this.dy)? 0.05: this.dy;
    }
}