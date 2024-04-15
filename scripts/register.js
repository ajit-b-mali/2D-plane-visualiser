import { redirectTo } from "./utils.js";

import app from "./firebase.config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const GoogleSigninBtn = document.getElementById("google-signin");
const signupBtn = document.getElementById("signup-btn");

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

GoogleSigninBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .catch((error) => {
      alert(error.code);
    });
});

signupBtn.addEventListener("click", () => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  if (password.value != confirmPassword.value) {
    alert("wrong password");
    password.value = "";
    confirmPassword.value = "";
    return;
  }
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .catch((error) => {
      alert(error.code)
    });
})

onAuthStateChanged(auth, (user) => {
  if (user) {
    redirectTo("geometry");
  }
});

