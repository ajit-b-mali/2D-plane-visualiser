import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
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

export default initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);