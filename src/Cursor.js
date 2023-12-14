import * as Util from "./Util.js";

/********************************************************
 * Point Manager A.K.A The pen of the main Board screen *
 ********************************************************/

// -----------Note
// Fake value only for the programming
// other is what will be used to display the user

export default class Cursor {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.fakeX = 0;
        this.x = 0;
        this.fakeY = 0;
        this.y = 0;

        this.angle = 0;
        this.rad = Util.rtoa(this.angle);
    }
    
    update(dt) {
        let tps = 1.5;
        this.angle += tps * 360 * dt;
        this.rad = Util.rtoa(this.angle);
    }

    draw(UNITSIZE) {
        this.fakeX = this.x * UNITSIZE;
        this.fakeY = this.y * UNITSIZE;
        this.ctx.lineWidth = 2;
        
        this.ctx.strokeStyle = 'white';
        Util.ellipsePath(this.ctx, this.fakeX, this.fakeY, 1, 5, this.rad);
        Util.ellipsePath(this.ctx, this.fakeX, this.fakeY, 1, 5, this.rad + Util.rtoa(90));

        this.ctx.strokeStyle = 'black';
        Util.ellipsePath(this.ctx, this.fakeX, this.fakeY, 1, 5, this.rad + Util.rtoa(45));
        Util.ellipsePath(this.ctx, this.fakeX, this.fakeY, 1, 5, this.rad + Util.rtoa(135));

        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.fakeX, this.fakeY, 3, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill(); 
    }

    // set position to a fixed position
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
}