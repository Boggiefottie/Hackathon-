// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9jamlc8_h2PibCp8OujBK5LSAaKJKQcU",
  authDomain: "ecommerce-7abd8.firebaseapp.com",
  projectId: "ecommerce-7abd8",
  storageBucket: "ecommerce-7abd8.appspot.com",
  messagingSenderId: "1004799895674",
  appId: "1:1004799895674:web:9c1e8974e3c03bade3b3c3",
  measurementId: "G-30KP5MT97D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
