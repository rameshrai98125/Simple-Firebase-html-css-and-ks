// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIEDiSstMmMSduxaip2poYs9d38OB-wLg",
  authDomain: "fir-html-70303.firebaseapp.com",
  projectId: "fir-html-70303",
  storageBucket: "fir-html-70303.appspot.com",
  messagingSenderId: "258666828981",
  appId: "1:258666828981:web:89c023b9512d4c8d4b1afc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// create an Account
document.getElementById("SignBtn").addEventListener("click", function () {
  alert("data");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((data) => {
      console.log(data.user.uid);
    })
    .catch((err) => {
      console.log(err);
      alert("user already exists");
    });
});

// Login an Account
document.getElementById("LoignIn").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((data) => {
      console.log(data.user);
      alert("User Logged In Successfully");
    })
    .catch((err) => {
      console.log(err);
      alert("Invalid email or password");
    });
});

console.log("Good ");
