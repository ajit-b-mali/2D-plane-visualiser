import { snapXY } from "../Util.js";
import Point from "./Point.js";

export default class Rect {
    constructor(ctx, x = 0, y = 1) {
        this.ctx = ctx;
        this.a = new Point(ctx, x, y);
        this.b = new Point(ctx, x + 2, y);
        this.c = new Point(ctx, x + 2, y - 1);
        this.d = new Point(ctx, x, y - 1);
        this.type = "rect";
    }

    update(dt, unitsize) {
        this.a.update(dt, unitsize);
        this.b.update(dt, unitsize);
        this.c.update(dt, unitsize);
        this.d.update(dt, unitsize);
        this.ab = Math.abs(this.a.x - this.b.x);
        this.ad = Math.abs(this.a.y - this.d.y);
        this.w = -1;
        this.h = -1;
    }

    draw() {
        this.a.draw();
        this.b.draw();
        this.c.draw();
        this.d.draw();
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.lineWidth = 2;
        if (Math.abs(this.ab - this.ad) < 0.01 && Math.abs(this.ad - this.ab) >= -0.01) {
            this.ctx.strokeStyle = 'white';
        } else {
            this.ctx.strokeStyle = 'gray';
        }
        this.ctx.beginPath();
        this.ctx.moveTo(this.a.fakeX, this.a.fakeY);
        this.ctx.lineTo(this.b.fakeX, this.b.fakeY);
        this.ctx.lineTo(this.c.fakeX, this.c.fakeY);
        this.ctx.lineTo(this.d.fakeX, this.d.fakeY);
        this.ctx.lineTo(this.a.fakeX, this.a.fakeY);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    }

    updateSize(x, y) {
        let dx = this.a.x - x;
        let dy = this.a.y - y;
        dx = (!dx)? 0.1: dx;
        dy = (!dy)? 0.1: dy;
        this.c.x = this.a.x - dx;
        this.c.y = this.a.y - dy;
        this.c.x = Math.round(this.c.x * 10) / 10;
        this.c.y = Math.round(this.c.y * 10) / 10;
        this.b.x = this.c.x;
        this.d.y = this.c.y;
    }
}