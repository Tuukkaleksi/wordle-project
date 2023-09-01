import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBtexbpAJrDI0Bce6Z7jm4_5wVgioDEsA8",
  authDomain: "wordleproject-91cfe.firebaseapp.com",
  databaseURL: "https://wordleproject-91cfe-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wordleproject-91cfe",
  storageBucket: "wordleproject-91cfe.appspot.com",
  messagingSenderId: "1073464564002",
  appId: "1:1073464564002:web:f5dc9982ecbff188cced7b",
  measurementId: "G-G5LZWMWFGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { analytics, db };
export const auth = getAuth(app);
export default app;