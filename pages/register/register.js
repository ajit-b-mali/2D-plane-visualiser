import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDx0QqL8rsi7-Gt96bdBGTO4srsE8yk4t0",
    authDomain: "visualizer-41044.firebaseapp.com",
    projectId: "visualizer-41044",
    storageBucket: "visualizer-41044.appspot.com",
    messagingSenderId: "116770989067",
    appId: "1:116770989067:web:71fa2f239b8ad412df930e",
    measurementId: "G-Q609N46E6M"
};
const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export function handleSignUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(_ => {
            alert("successful");
        })
        .catch(error => {
            console.log(error.code, error.message);
        })
    console.log("Sign Up")
}

export function handleSignIn(email, password) {
    console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
        .then(_ => {
            alert("successfull")
        })
        .catch(error => {
            console.log(error.code, error.message);
        })
    console.log("Sign In");
}

export function handleSignOut() {
    signOut(auth).then(_ => {
        alert("successful");
    }).catch(error => {
        console.log(error.code, error.message);
    })
}

export function handleGoogleSignIn() {
    signInWithPopup(auth, provider).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage)
        });
}

onAuthStateChanged(auth, user => {
    if (user) {
        console.log("user not found");
    } else {
        location.href = "../../landing page";
    }
})
