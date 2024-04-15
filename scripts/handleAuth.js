import { redirectTo } from "./utils.js";

import app from "./firebase.config.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const signOutBtn = document.getElementById("sign-out");

const auth = getAuth(app);

signOutBtn?.addEventListener("click", () => {
  signOut(auth);
});

onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  if (path.endsWith("landing.html")) {
    if (user) {
      redirectTo("chart");
    }
  } else {
    if (!user) {
      redirectTo("landing");
    }
  }
});