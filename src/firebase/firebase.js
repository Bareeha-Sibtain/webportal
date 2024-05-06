import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";  // Import for Realtime Database
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4D7F996uEJF03WtStZ4MhxpDLkz0lxLo",
  authDomain: "newapp-50da2.firebaseapp.com",
  databaseURL: "https://newapp-50da2-default-rtdb.firebaseio.com",
  projectId: "newapp-50da2",
  storageBucket: "newapp-50da2.appspot.com",
  messagingSenderId: "478436791531",
  appId: "1:478436791531:web:2d5c6f0f0e2d8eb638daae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore
const messaging = getMessaging(app);
const realTimeDb = getDatabase(app); // Initialize Realtime Database

export { auth, db, messaging, realTimeDb };
