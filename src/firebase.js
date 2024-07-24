// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD5TnqJMsAWl5MEFdQOevrilFyU8h5Eddg",
    authDomain: "travel-planner-7386b.firebaseapp.com",
    projectId: "travel-planner-7386b",
    storageBucket: "travel-planner-7386b.appspot.com",
    messagingSenderId: "313347265615",
    appId: "1:313347265615:web:8aaacc0d29f70c83be463a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
