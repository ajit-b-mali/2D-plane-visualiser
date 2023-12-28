import Point from "./Point.js";
import * as Util from "../Util.js";
export default class Circle {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.a = new Point(ctx, x, y);
        this.r = 1;
        this.color = Math.random() * 360;
    }

    update(dt, unitsize) {
        this.a.update(dt, unitsize);
        this.fakeR = this.r * unitsize;
    }

    draw() {
        this.a.draw();
        this.ctx.strokeStyle = 'white';
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(this.a.fakeX, this.a.fakeY, this.fakeR, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        Util.drawLine(this.ctx, this.a.fakeX, this.a.fakeY, this.a.fakeX + this.fakeR, this.a.fakeY);
    }

    updateSize(x, y) {
        this.r = Util.findDist(this.a.x, this.a.y, x, y);
    }
}