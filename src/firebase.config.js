// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3W9bHlLMBwJs-RwYtOIooDOvo-8zv-LQ",
  authDomain: "nosql-project-9b788.firebaseapp.com",
  projectId: "nosql-project-9b788",
  storageBucket: "nosql-project-9b788.appspot.com",
  messagingSenderId: "17187899856",
  appId: "1:17187899856:web:26c9d5f4655acbec3691d5",
  measurementId: "G-Q4RWVZP31H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export default db;
