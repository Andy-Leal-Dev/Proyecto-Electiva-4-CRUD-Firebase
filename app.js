 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyC1AahhmF5o4VBqb5iqBPPDTUYZG-P_WXc",
   authDomain: "proyectouni-7faff.firebaseapp.com",
   projectId: "proyectouni-7faff",
   storageBucket: "proyectouni-7faff.appspot.com",
   messagingSenderId: "669116950016",
   appId: "1:669116950016:web:fdbe20d1560a9e8c161ae5",
   measurementId: "G-MWTR4GEZWE"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);



 