import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import app from '../../firebase.config.js';

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in.
        const uid = user.uid;
        
    }
});

function h1Update(text) {
    document.querySelector('h1').innerText = 'text';
}