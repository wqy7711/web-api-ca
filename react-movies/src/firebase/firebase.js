import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA3qViBgX--bxG3jI45CQQeQEyfOfq4ifA",
    authDomain: "react-movie-labs-2ef9a.firebaseapp.com",
    projectId: "react-movie-labs-2ef9a",
    storageBucket: "react-movie-labs-2ef9a.firebasestorage.app",
    messagingSenderId: "541800881651",
    appId: "1:541800881651:web:c6718036383d44d8adc686"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  };