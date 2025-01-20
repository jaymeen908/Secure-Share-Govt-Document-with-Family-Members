// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsw0NRqV5LoaRhzeLcynEIGf3sSO48gK8",
  authDomain: "document-1b7ae.firebaseapp.com",
  projectId: "document-1b7ae",
  storageBucket: "document-1b7ae.appspot.com",
  messagingSenderId: "608415353648",
  appId: "1:608415353648:web:8fb2e02c2c45c17bf956f5",
  measurementId: "G-EWWPK4Z5P1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
