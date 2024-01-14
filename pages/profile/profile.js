import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import app from "../../firebase.config.js";

const auth = getAuth(app);

const signOutBtn = document.querySelector("#sign-out");
const user = getUser(auth);


function getUser(auth) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(user);
            return user;
        } else {
            location.href = "../signin/index.html";
        }
    });
}

signOutBtn.addEventListener("click", (_) => {
    signOut(auth)
    .then(_ => {
        console.log(user.uid + " signed out");
    })
});