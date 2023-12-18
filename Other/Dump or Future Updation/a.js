/* ---------For tiny zoom ----------------------- //
if (this.iterate == 0) {
let group = 100;
// Y parallel
from = -offset.x - (-offset.x % (UNITSIZE * group));
let loop = Math.max(this.canvas.height, this.canvas.width) / UNITSIZE * 5 + 1;
for (let i = -1; i < loop; i++) {
bdx.strokeStyle = util.color.teal3;
bdx.lineWidth = 1;
util.drawLine(bdx, from + i * UNITSIZE * group, -offset.y, from + i * UNITSIZE * group, -offset.y + this.canvas.height)
}

// X parallel
from = -offset.y - (-offset.y % (UNITSIZE * group));
for (let i = -1; i < loop; i++) {
bdx.strokeStyle = util.color.teal3;
bdx.lineWidth = 1;
util.drawLine(bdx, -offset.x, from + i * UNITSIZE * group, -offset.x + this.canvas.width, from + i * UNITSIZE * group);
}
}
//////////////////////////////////////////////////////////////////*/

/**
 *         <!-- Point -->
        <!-- <div id="point">
            <p>Position</p>
            <label for="pointX">X : </label> <input type="number" name="boardX" id="pointY" step="0.1"><br>
            <label for="pointY">Y : </label> <input type="number" name="boardY" id="pointX" step="0.1"><br>
        </div> -->
 */

        /**
         *                 <label for="boardX">X : </label> <input type="number" name="boardX" id="boardX" step="10"><br>
                <label for="boardY">Y : </label> <input type="number" name="boardY" id="boardY" step="10"><br>
         */

