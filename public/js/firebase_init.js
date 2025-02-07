  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
  import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

  const firebaseConfig = {
    apiKey: "AIzaSyDjjGUoA4uMeNB38N2cHqZ6kRLx5v8SGuI",
    authDomain: "lifetime-health.firebaseapp.com",
    databaseURL: "https://lifetime-health-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lifetime-health",
    storageBucket: "lifetime-health.firebasestorage.app",
    messagingSenderId: "39657506151",
    appId: "1:39657506151:web:7df730b9b2eb8800029bc2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };