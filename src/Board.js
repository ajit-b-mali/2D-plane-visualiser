import * as util from "./Util.js";

/***************************
 * The Board Manager Class *
 ***************************/

export default class Board {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.mainAxis = {
            len: 3,
            xColor: util.color.hotpink,
            yColor: util.color.yellow,
        };
        this.unitAxis = {
            len: 2,
            color: util.color.Up,
        };
        this.subaxis = {
            len: 1,
            color: util.color.Ut,
        };
        this.subiterate = 10;
    }

    update(offset, UNITSIZE) {
        this.iterate = Math.max(this.canvas.height, this.canvas.width) / UNITSIZE + 1;
        this.fromTop = -offset.y - (-offset.y % UNITSIZE);
        this.fromLeft = -offset.x - (-offset.x % UNITSIZE);
        if (UNITSIZE < 60) {
            this.subiterate = 1;
            this.unitAxis.len = 2;
            this.unitAxis.color = util.color.Uf;
        } else if (UNITSIZE < 130) {
            this.subiterate = 2;
            this.mainAxis.len = 3;
            this.unitAxis.len = 2;
            this.subaxis.len = 2;
            this.unitAxis.color = util.color.Us;
            this.subaxis.color = util.color.Ut;
        } else {
            this.subiterate = 10;
            this.mainAxis.len = 3;
            this.unitAxis.len = 2;
            this.subaxis.len = 2;
            this.unitAxis.color = util.color.Up;
            this.subaxis.color = util.color.Uth;
        }
    }

    draw(offset, UNITSIZE) {
        let iterate = this.iterate;
        let divisions = this.subiterate;

        // Sub Axis Parrallel to X-Axis
        let from = this.fromTop;
        for (let i = -1; i < iterate; i++) {
            this.ctx.strokeStyle = this.subaxis.color;
            this.ctx.lineWidth = this.subaxis.len;
            for (let j = 1; j < divisions; j++) {
                if (j == 5) {
                    this.ctx.strokeStyle = util.color.Ut;
                    this.ctx.lineWidth = 3;
                } else {
                    this.ctx.strokeStyle = this.subaxis.color;
                    this.ctx.lineWidth = this.subaxis.len;
                }
                util.drawLine(this.ctx, -offset.x, (from + j * UNITSIZE / divisions) + i * UNITSIZE, -offset.x + this.canvas.width, (from + j * UNITSIZE / divisions) + i * UNITSIZE);
            }
        }

        // Y
        from = this.fromLeft;
        for (let i = -1; i < iterate; i++) {
            // Sub Axis Parrallel to Y-Axis
            this.ctx.strokeStyle = this.subaxis.color;
            this.ctx.lineWidth = this.subaxis.len;
            for (let j = 1; j < divisions; j++) {
                if (j == 5) {
                    this.ctx.strokeStyle = util.color.Ut;
                    this.ctx.lineWidth = 3;
                } else {
                    this.ctx.strokeStyle = this.subaxis.color;
                    this.ctx.lineWidth = this.subaxis.len;
                }
                util.drawLine(this.ctx, (from + j * UNITSIZE / divisions) + i * UNITSIZE, -offset.y, (from + j * UNITSIZE / divisions) + i * UNITSIZE, -offset.y + this.canvas.height)
            }
            // Unit Axis Parallel to Y-Axis
            this.ctx.strokeStyle = this.unitAxis.color;
            this.ctx.lineWidth = this.unitAxis.len;
            util.drawLine(this.ctx, from + i * UNITSIZE, -offset.y, from + i * UNITSIZE, -offset.y + this.canvas.height)
        }

        // Unit Axis Parallel to X-Axis
        from = this.fromTop;
        for (let i = -1; i < iterate; i++) {
            this.ctx.strokeStyle = this.unitAxis.color;
            this.ctx.lineWidth = this.unitAxis.len;
            util.drawLine(this.ctx, -offset.x, from + i * UNITSIZE, -offset.x + this.canvas.width, from + i * UNITSIZE);
        }

        // Main Axis
        this.ctx.lineWidth = this.mainAxis.len;

        // X-Axis
        this.ctx.strokeStyle = this.mainAxis.xColor;
        util.drawLine(this.ctx, -offset.x, 0, -offset.x + this.canvas.width, 0);
        
        // Y-Axis
        this.ctx.strokeStyle = this.mainAxis.yColor;
        util.drawLine(this.ctx, 0, -offset.y, 0, -offset.y + this.canvas.height);
    }
}