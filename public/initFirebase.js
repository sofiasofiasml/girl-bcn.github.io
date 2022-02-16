import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQC3c8Uc8z-AI89EdScSyYy6rNZzyXYgs",
    authDomain: "girls-bcn.firebaseapp.com",
    projectId: "girls-bcn",
    storageBucket: "girls-bcn.appspot.com",
    messagingSenderId: "808643930279",
    appId: "1:808643930279:web:9f26e58feba79d8be59382",
    measurementId: "G-LCZJWF9KD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Get a reference to the database service
const DB = getDatabase(app);