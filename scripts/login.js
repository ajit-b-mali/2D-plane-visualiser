import app from "./firebase.config.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { redirectTo } from "./utils.js";

const signinBtn = document.getElementById("signin-btn");
const GoogleSigninBtn = document.getElementById("google-signin");

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

GoogleSigninBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .catch((error) => {
      alert(error.code);
    });
});

signinBtn.addEventListener("click", () => {
  const email = document.getElementById("email");
  const password = document.getElementById("password")
  signInWithEmailAndPassword(auth, email.value, password.value)
    .catch((error) => {
      email.value = "";
      password.value = "";
      alert(error.code);
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    redirectTo("chart");
  } else {
    console.log("User not found");
  }
});