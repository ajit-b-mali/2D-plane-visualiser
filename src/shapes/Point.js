export default class Point {
    constructor(ctx, x, y, unitsize) {
        this.ctx = ctx;
        this.set(x, y, unitsize);
        this.r = 5;
    }

    update(dt, unitsize) {
        this.fakeX = this.x * unitsize;
        this.fakeY = this.y * unitsize;
    }

    draw() {
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }

    set(x,  y) {
        this.x = x;
        this.y = y;
    }

    update(x, y) {
        this.x += x;
        this.y += y;
    }
}