import Point from "./Point.js";
import * as Util from "../Util.js";
export default class Circle {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.center = new Point(ctx, x, y);
        this.r = 1;
        this.color = Math.random() * 360;
    }

    update(dt, unitsize) {
        this.center.update(dt, unitsize);
        this.fakeR = this.r * unitsize;
    }

    draw() {
        this.center.draw();
        this.ctx.strokeStyle = `hsl(${this.color}, 100%, 50%)`;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(this.center.fakeX, this.center.fakeY, this.fakeR, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        Util.drawLine(this.ctx, this.center.fakeX, this.center.fakeY, this.center.fakeX + this.fakeR, this.center.fakeY);
    }

    setRadius(r) {
        this.r = r;
    }
}