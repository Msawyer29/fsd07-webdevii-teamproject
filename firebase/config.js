//--------------------------------------------------------------

// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC7Ke3NArI4KuNrChzMbLKGincGFHGNWko",
//   authDomain: "the-hive-4c0c2.firebaseapp.com",
//   projectId: "the-hive-4c0c2",
//   storageBucket: "the-hive-4c0c2.appspot.com",
//   messagingSenderId: "308053310116",
//   appId: "1:308053310116:web:31dff7d49ef85e15994431",
//   measurementId: "G-KMB5KQMMRD",
// };

//--------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyA0-xasUXF1b25CdelaBSJBAPeyJjkZ3I4",
  authDomain: "the-hive-11ae5.firebaseapp.com",
  projectId: "the-hive-11ae5",
  storageBucket: "the-hive-11ae5.appspot.com",
  messagingSenderId: "307793356244",
  appId: "1:307793356244:web:aa37377b52b7e786ebe241",
  measurementId: "G-7NVLH2JEN9",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebase_app);
//--------------------------------------------------------------------

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const firebaseStorage = getStorage(firebase_app);

// Get a Firebase Auth instance
// const auth = getAuth();

export default firebase_app;
// export { auth };

// Stripe API configuration
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
export { firebaseStorage };
