import { getAuth, signInWithEmailAndPassword   } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import app from '../../firebase.config.js';

const signInBtn = document.querySelector('#signInBtn');
const emailField = document.querySelector('#email');
const passwordField = document.querySelector('#password');
const auth = getAuth(app);

signInBtn.addEventListener('click', _ => {
    const email = emailField.value;
    const password = passwordField.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => userCredential.user)
        .then(_ => {
            location.href = "../profile/index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })
});