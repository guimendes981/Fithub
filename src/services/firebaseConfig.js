// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ-MXDl1N0cPwtnknsjH1pcUA-IjN6VeE",
  authDomain: "fithubv1-75f39.firebaseapp.com",
  projectId: "fithubv1-75f39",
  storageBucket: "fithubv1-75f39.appspot.com",
  messagingSenderId: "510575989855",
  appId: "1:510575989855:web:e323261c248229d83b37ea",
  measurementId: "G-F8J5BPH5VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app); 