// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7Ke3NArI4KuNrChzMbLKGincGFHGNWko",
  authDomain: "the-hive-4c0c2.firebaseapp.com",
  projectId: "the-hive-4c0c2",
  storageBucket: "the-hive-4c0c2.appspot.com",
  messagingSenderId: "308053310116",
  appId: "1:308053310116:web:31dff7d49ef85e15994431",
  measurementId: "G-KMB5KQMMRD",
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Get a Firebase Auth instance
const auth = getAuth();

export default firebase_app;
export { auth };


