import app from './firebase-config.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Initialize Firebase Authentication
const auth = getAuth();

// Registration Form Submission
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Firebase Authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User registered:", userCredential.user);
      alert("Registration Successful!");
      // Redirect to login page or dashboard
      window.location.href = "login.html"; // Ensure login.html exists
    })
    .catch((error) => {
      console.error("Error during registration:", error.message);
      alert("Registration Failed: " + error.message);
    });
});
