import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2HtT08m4hBuoBUllfoSn5kHqTzwziPC4",
  authDomain: "tradelab-9aa4c.firebaseapp.com",
  projectId: "tradelab-9aa4c",
  storageBucket: "tradelab-9aa4c.firebasestorage.app",
  messagingSenderId: "822198439511",
  appId: "1:822198439511:web:a147563ffa419c57191d12",
  measurementId: "G-5TGL65W3TE",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Set auth state persistence to localStorage
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("✅ Auth persistence set to localStorage");
  })
  .catch((error) => {
    console.log("❌ Error setting persistence:", error.message);
  });

export { auth, googleProvider };
