import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import app from '../../firebase.config.js';

const auth = getAuth(app);

const signUpBtn = document.querySelector('#signUpBtn');
const emailField = document.querySelector('#email');
const passwordField = document.querySelector('#password');

signUpBtn.addEventListener('click', _ => {
    const email = emailField.value;
    const password = passwordField.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => userCredential.user)
        .then(user => {
            user.dispalyName = userName;
            location.href = "../profile/index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })

    onAuthStateChanged(auth, (user) => {
        if (user) {
            updateProfile(auth.currentUser, {
                    displayName: userName
            });
            location.href = "../profile/index.html";
        }
    });
});