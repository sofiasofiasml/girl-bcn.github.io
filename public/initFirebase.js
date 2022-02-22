
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAQC3c8Uc8z-AI89EdScSyYy6rNZzyXYgs",
    authDomain: "girls-bcn.firebaseapp.com",
    databaseURL: "https://girls-bcn-default-rtdb.firebaseio.com",
    projectId: "girls-bcn",
    storageBucket: "girls-bcn.appspot.com",
    messagingSenderId: "808643930279",
    appId: "1:808643930279:web:9f26e58feba79d8be59382",
    measurementId: "G-LCZJWF9KD1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);



// // import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
// // import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
// // import { getDatabase } from "firebase/database";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAQC3c8Uc8z-AI89EdScSyYy6rNZzyXYgs",
//     authDomain: "girls-bcn.firebaseapp.com",
//     projectId: "girls-bcn",
//     storageBucket: "girls-bcn.appspot.com",
//     messagingSenderId: "808643930279",
//     appId: "1:808643930279:web:9f26e58feba79d8be59382",
//     measurementId: "G-LCZJWF9KD1"
// };

// // Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const DB = firebaseApp.firestore();
// const auth = firebaseApp.auth();

// function saveDB()
// {
//     // var NameEvent = document.querySelector("input #nameUser").value; 
//     // var NameEvent = document.querySelector("input #nameUser"); 
//     // var NameEvent = document.querySelector("input #url"); 
//     // var NameEvent = document.querySelector("textarea"); 
//     // var NameEvent = document.querySelector("input #file-upload-button"); 
//     // var NameEvent = document.querySelector("input #nameUser"); 
//     set(ref(DB, 'Events/'+ "Probar"),{
//         nameEvent:  "NameEvent", 
//         image: "img/casa.png", 
//         content : "Nos vamos de senderismo", 
//         date : "20/02/2022", 
//         hour: "18:00", 
//         votation : "Yes"
//     })
//     .then(()=>{
//         alert('Saved DB'); 

//     })
//     .catch((error)=>{
//         alert('no DB'); 

//     }); 
//     // DB.ref('Events/'+ "Probar").set({
//     //     nameEvent:  "NameEvent", 
//     //     image: "img/casa.png", 
//     //     content : "Nos vamos de senderismo", 
//     //     date : "20/02/2022", 
//     //     hour: "18:00", 
//     //     votation : "Yes"
//     // })
// }
