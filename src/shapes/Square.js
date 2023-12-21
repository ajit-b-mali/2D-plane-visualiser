export default class Square {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 1;
        this.h = 1;
    }

    update(dt, unitsize) {
        this.fakeX = this.x * unitsize;
        this.fakeY = this.y * unitsize;
        this.fakeW = this.w * unitsize;
        this.fakeH = this.h * unitsize;
    }

    draw() {
        this.ctx.strokeStyle = 'white';
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.fakeX, this.fakeY, this.fakeW, this.fakeH);
        this.ctx.fillRect(this.fakeX, this.fakeY, this.fakeW, this.fakeH);
    }

    setSize(s) {
        this.w = s;
        this.h = s;
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    updatePos(x, y) {
        this.x += x;
        this.y += y;
    }
}