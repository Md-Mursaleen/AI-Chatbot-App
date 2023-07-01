import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, getDoc, getDocs, doc, addDoc, setDoc, collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyColyFEWAlOBm2FJglxd6AZUbcyVGS6VQw",
    authDomain: "openai-chatbot-ac7fb.firebaseapp.com",
    projectId: "openai-chatbot-ac7fb",
    storageBucket: "openai-chatbot-ac7fb.appspot.com",
    messagingSenderId: "902204162225",
    appId: "1:902204162225:web:25297c8a46077a8447e290",
    measurementId: "G-NV0WK0H4GL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getDoc, getDocs, doc, addDoc, setDoc, collection };