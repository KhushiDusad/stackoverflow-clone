// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDceXyfXfwOXRPUyt4v_NtqZfv3lkfvsu8",
  authDomain: "ministackoverflow.firebaseapp.com",
  projectId: "ministackoverflow",
  storageBucket: "ministackoverflow.firebasestorage.app",
  messagingSenderId: "467775715535",
  appId: "1:467775715535:web:3bbd57a3d51b27c92e9fba",
  measurementId: "G-9262NWK3KF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const provider= new GoogleAuthProvider();

