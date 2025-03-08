import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2HtT08m4hBuoBUllfoSn5kHqTzwziPC4",
  authDomain: "tradelab-9aa4c.firebaseapp.com",
  projectId: "tradelab-9aa4c",
  storageBucket: "tradelab-9aa4c.firebasestorage.app",
  messagingSenderId: "822198439511",
  appId: "1:822198439511:web:a147563ffa419c57191d12",
  measurementId: "G-5TGL65W3TE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Auth instance
const auth = getAuth(app);

// Set persistence to local storage
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to browserLocalPersistence");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Initialize GoogleAuthProvider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
