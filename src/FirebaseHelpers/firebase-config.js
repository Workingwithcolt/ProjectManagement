// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore,connectFirestoreEmulator  } from "@firebase/firestore";

import { connectAuthEmulator, getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo4ob1fJ9PkAc9-S7JhgUhAA0_hvfJ07w",
  authDomain: "flutter-todo-1de0d.firebaseapp.com",
  projectId: "flutter-todo-1de0d",
  storageBucket: "flutter-todo-1de0d.appspot.com",
  messagingSenderId: "25322579611",
  appId: "1:25322579611:web:7431c693783049910bc83e",
  measurementId: "G-CHQXM4D53L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const runWithEmulator = false;
export const db = getFirestore(app);

if (runWithEmulator) {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, 'localhost', 8080);
}
