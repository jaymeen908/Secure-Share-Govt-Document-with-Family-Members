import { initializeApp, getApps } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyB7cEDFVK3jd_n6d8R-WzVUwMwCTGBK6C0",
  authDomain: "digital-c58c2.firebaseapp.com",
  projectId: "digital-c58c2",
  storageBucket: "digital-c58c2.firebasestorage.app",
  messagingSenderId: "478829957240",
  appId: "1:478829957240:web:e378e28c30ff46a4791d8d",
  measurementId: "G-6RP8Z38WV2",
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)
let analytics

if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}

// Check authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in", user)
  } else {
    console.log("User is signed out")
  }
})

export { app, auth, db, analytics }

