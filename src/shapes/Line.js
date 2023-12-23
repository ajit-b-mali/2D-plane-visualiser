import Point from "./Point.js";
import * as Util from "../Util.js";

export default class Line {
    constructor(ctx, x1, y1, x2, y2) {
        this.ctx = ctx;
        this.a = new Point(this.ctx, x1, y1);
        this.b = new Point(this.ctx, x2, y2);        
    }

    update(dt, unitsize) {
        this.a.update(dt, unitsize);
        this.b.update(dt, unitsize);
    }

    draw() {
        this.a.draw();
        this.b.draw();
        this.ctx.strokeStyle = 'white';
        Util.drawLine(this.ctx, this.a.fakeX, this.a.fakeY, this.b.fakeX, this.b.fakeY);
    }
}