import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBtexbpAJrDI0Bce6Z7jm4_5wVgioDEsA8",
  authDomain: "wordleproject-91cfe.firebaseapp.com",
  projectId: "wordleproject-91cfe",
  storageBucket: "wordleproject-91cfe.appspot.com",
  messagingSenderId: "1073464564002",
  appId: "1:1073464564002:web:f5dc9982ecbff188cced7b",
  measurementId: "G-G5LZWMWFGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);