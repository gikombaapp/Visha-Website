import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: "visha-app-291ec.firebaseapp.com",
  projectId: "visha-app-291ec",
  storageBucket: "visha-app-291ec.firebasestorage.app",
  messagingSenderId: "6236911241",
  appId: "1:6236911241:web:ab43630faef3e04eaaf858",
  measurementId: "G-6SWFPN9BH6",
};

export const app = initializeApp(firebaseConfig);
