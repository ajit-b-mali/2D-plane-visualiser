import Point from "./Point.js";
import * as Util from "../Util.js";

export default class Line {
    constructor(ctx, x1 = 0, y1 = 0, x2 = 1, y2 = 0) {
        this.ctx = ctx;
        this.a = new Point(this.ctx, x1, y1);
        this.b = new Point(this.ctx, x2, y2);
        this.name = "line";
    }

    update(dt, unitsize) {
        this.a.update(dt, unitsize);
        this.b.update(dt, unitsize);
    }

    draw() {
        this.a.draw();
        this.b.draw();
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        Util.drawLine(this.ctx, this.a.fakeX, this.a.fakeY, this.b.fakeX, this.b.fakeY);
    }

    updateSize(x, y) {
        this.b.x = x;
        this.b.y = y;
    }
}