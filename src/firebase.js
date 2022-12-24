// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoQ1ldcnKxOAuG-KSziPCwVckk0fGUqyQ",
  authDomain: "authdevelopment-e1888.firebaseapp.com",
  databaseURL: "https://authdevelopment-e1888-default-rtdb.firebaseio.com",
  projectId: "authdevelopment-e1888",
  storageBucket: "authdevelopment-e1888.appspot.com",
  messagingSenderId: "185279555620",
  appId: "1:185279555620:web:fa3c03f0836173aadb90b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
