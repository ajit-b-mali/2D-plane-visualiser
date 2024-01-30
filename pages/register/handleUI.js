import { handleSignIn, handleSignUp, handleGoogleSignIn } from "./register.js";

let email, password;

const googleBtn = document.querySelector('#google-sign-in');
    
function register(onRegister) {
    email = document.querySelector("#email").value;
    password = document.querySelector("#password").value;
    onRegister(email, password);
}

function signUpHtml() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <h2>Create an Account</h2>
        <input type="email" id="email" placeholder="E-mail" autocomplete="off" />
        <input type="password" id="password" placeholder="password">
        <input type="password" id="confirm-password" placeholder="confirm password">
        <button id="signUpBtn" class="submitBtn">Sign Up</button>
        <p>already have account? <span class="link" id="signInHtml">SIGN IN</span></p>
    `;
    let htmlBtn = document.querySelector('#signInHtml');
    let registerBtn = document.querySelector('#signUpBtn');
    reset(htmlBtn, signInHtml, registerBtn, handleSignUp);
}

function signInHtml() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <h2>Welcome Back!</h2>
        <input type="email" id="email" placeholder="E-mail" autocomplete="off"/>
        <input type="password" id="password" placeholder="Password" />
        <button id="signInBtn" class="submitBtn">Sign In</button>
        <p>don't have account? <span class="link" id="signUpHtml">CREATE ONE</span></p>
    `;
    let htmlBtn = document.querySelector('#signUpHtml');
    let registerBtn = document.querySelector('#signInBtn');
    reset(htmlBtn, signUpHtml, registerBtn, handleSignIn);
}

function reset(htmlBtn, onHtmlChange, registerBtn, onRegister) {
    htmlBtn.onclick = onHtmlChange;
    registerBtn.onclick = () => register(onRegister);
}

signUpHtml();

googleBtn.onclick = handleGoogleSignIn;
