/******************************************
 * The Class That manages and keep track **
 * of the current offset of canvas ********
 ******************************************/

// -----------Note
// Fake value only for the programming
// other is what will be used to display the user

export default class Offset {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = 100;
        this.fakeY = this.canvas.height - this.x;
        this.y = this.canvas.height - this.fakeY;    
    }

    // Set the (x, y)
    set(x, y) {
        this.x = x;
        this.fakeY = y;
        this.y = this.canvas.height - y;
    }

    // Add and Update the (x, y)
    update(x, y) {
        this.x += x;
        this.fakeY += y;
        this.y = this.canvas.height - this.fakeY;
    }
}