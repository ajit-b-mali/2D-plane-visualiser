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

firebase.auth().onAuthStateChanged((user) => {
       if (user) {
              location.href = "../pages/choice.html";
       } else {
              console.log("user not found");
       }
});
<script type="module">
       import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
       import {
              getAuth,
              onAuthStateChanged,
              signOut
       } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

       const firebaseConfig = {
              apiKey: "AIzaSyDx0QqL8rsi7-Gt96bdBGTO4srsE8yk4t0",
       authDomain: "visualizer-41044.firebaseapp.com",
       projectId: "visualizer-41044",
       storageBucket: "visualizer-41044.appspot.com",
       messagingSenderId: "116770989067",
       appId: "1:116770989067:web:71fa2f239b8ad412df930e",
       measurementId: "G-Q609N46E6M"
        };

       const app = initializeApp(firebaseConfig);
       const auth = getAuth();
        onAuthStateChanged(auth, user => {
            if (user) {
              let userName = user.displayName;
       let userId = user.uid;
       let userEmail = user.email;
       console.log(userEmail + "<br>");
              console.log(userId + "<br>");
                     console.log(userName + "<br>");
            } else {
                                   location.href = "../register/";
            }
        })
                            const signOutBtn = document.querySelector('#sign-out')
        signOutBtn.addEventListener('click', () => {
            const response = confirm("are you sure");
                            if (response) {
                                   signOut(auth).catch(error => console.log(error.message));
            }
        });
                     </script>