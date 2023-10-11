// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvdNsI9gDafJCQTVkjmVnLA3Tv85j5nqY",
  authDomain: "notebook-8ed2b.firebaseapp.com",
  projectId: "notebook-8ed2b",
  storageBucket: "notebook-8ed2b.appspot.com",
  messagingSenderId: "488834967562",
  appId: "1:488834967562:web:74c4b83b995dbadfe297f3",
  measurementId: "G-606WLCWLRH"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);