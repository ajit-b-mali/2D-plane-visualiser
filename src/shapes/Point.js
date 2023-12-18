export default class Point {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.setPos(x, y);
        this.r = 3;
        this.angle = 0;
    }

    update(dt, unitsize) {
        // this.r = Math.max(unitsize / 50, 3)
        this.fakeX = this.x * unitsize;
        this.fakeY = this.y * unitsize;
    }

    draw() {
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(this.fakeX, this.fakeY, this.r, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }

    setPos(x,  y) {
        this.x = x;
        this.y = y;
    }

    updatePos(x, y) {
        this.x += x;
        this.y += y;
    }
}