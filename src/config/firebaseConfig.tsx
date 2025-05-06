import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';

// import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyDsZASxTJXvUY27mzCWRbxkCbTmN6UWXcc",
    authDomain: "compassreact-abafb.firebaseapp.com",
    projectId: "compassreact-abafb",
    storageBucket: "compassreact-abafb.appspot.com",
    //   storageBucket: "compassreact-abafb.firebasestorage.app",
    messagingSenderId: "747979765176",
    appId: "1:747979765176:web:30b590299201c56865cb4d",
    measurementId: "G-9S640SEM6E",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);


