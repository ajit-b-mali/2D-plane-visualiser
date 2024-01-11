import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import app from '../../firebase.config.js';

const signUpBtn = document.querySelector('#signUpBtn');
const emailField = document.querySelector('#email');
const passwordField = document.querySelector('#password');
const auth = getAuth(app);

signUpBtn.addEventListener('click', _ => {
    const email = emailField.value;
    const password = passwordField.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .then(_ => {
            location.href = '../profile/index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })
});