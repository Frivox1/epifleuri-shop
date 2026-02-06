// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "epifleuri-8aa46.firebaseapp.com",
  projectId: "epifleuri-8aa46",
  storageBucket: "epifleuri-8aa46.appspot.com",
  messagingSenderId: "673930882796",
  appId: "1:673930882796:web:8df9d40e30ac39f0273fc9",
  measurementId: "G-LWH8GZML80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
