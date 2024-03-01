import { findDist } from "../Util.js";
import Point from "./Point.js";

export default class Square {
    constructor(ctx, x = 0, y = 1) {
        this.ctx = ctx;
        this.v = [
            new Point(ctx, x, y),
            new Point(ctx, x + 1, y),
            new Point(ctx, x + 1, y - 1),
            new Point(ctx, x, y - 1)
        ];
        this.s = 1;
        this.type = "square";
        this.selected = false;
    }

    update(dt, unitsize) {
        this.v.forEach(vertex => {
            vertex.update(dt, unitsize);
        });
        this.s = Math.abs(this.v[0].x - this.v[1].x);
    }

    draw() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = this.selected? "crimson": 'white';

        this.ctx.beginPath();
        this.ctx.moveTo(this.v[0].fakeX, this.v[0].fakeY);
        this.v.forEach((vertex, i) => {
            if (i == 0) return;
            this.ctx.lineTo(vertex.fakeX, vertex.fakeY);
        });
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();

        this.v.forEach(vertex => {
            vertex.draw();
        });
    }

    updateSize(x, y) {
        let dx = this.v[0].x - x;
        let dy = this.v[0].y - y;
        dx = (!dx)? 0.1: dx;
        dy = (!dy)? 0.1: dy;
        console.log(dx, dy);
        let d = Math.max(Math.abs(dx), Math.abs(dy));
        d = Math.round(d * 10) / 10;
        this.v[2].x = this.v[0].x + d * Math.sign(dx) * -1;
        this.v[2].y = this.v[0].y + d * Math.sign(dy) * -1;
        this.v[1].x = this.v[2].x;
        this.v[3].y = this.v[2].y;
    }
}