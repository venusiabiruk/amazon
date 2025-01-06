// import * as firebase from "firebase/app";
// import { getAuth } from "firebase/auth";
// import "firebase/firestore"
// import "firebase/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyDIL5T7w_aDJX0f4HEr_NeecsHHeNWfvwA",
//   authDomain: "clone-d2a1c.firebaseapp.com",
//   projectId: "clone-d2a1c",
//   storageBucket: "clone-d2a1c.firebasestorage.app",
//   messagingSenderId: "757166496337",
//   appId: "1:757166496337:web:3819d6855a2d4bf0f23670",
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// export const auth=getAuth(app);
// // export const db=app
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIL5T7w_aDJX0f4HEr_NeecsHHeNWfvwA",
  authDomain: "clone-d2a1c.firebaseapp.com",
  projectId: "clone-d2a1c",
  storageBucket: "clone-d2a1c.firebasestorage.app",
  messagingSenderId: "757166496337",
  appId: "1:757166496337:web:3819d6855a2d4bf0f23670",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
