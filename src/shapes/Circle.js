export default class Circle {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.setPos(x, y);
        this.r = 1;
    }

    update(dt, unitsize) {
        this.fakeX = this.x * unitsize;
        this.fakeY = this.y * unitsize;
        this.fakeR = this.r * unitsize;
    }

    draw() {
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(this.fakeX, this.fakeY, this.fakeR, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    setPos(x,  y) {
        this.x = x;
        this.y = y;
    }

    setRadius(r) {
        this.r = r;
    }

    updatePos(x, y) {
        this.x += x;
        this.y += y;
    }

}