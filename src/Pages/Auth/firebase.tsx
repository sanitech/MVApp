// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCy_KtPmGgWl8kJH-0HTTy_Rz_25pBYWfs",
  authDomain: "multivendor-1494a.firebaseapp.com",
  projectId: "multivendor-1494a",
  storageBucket: "multivendor-1494a.appspot.com",
  messagingSenderId: "33911363683",
  appId: "1:33911363683:web:1f039f26a323e4c64b4056",
  measurementId: "G-E6ZM43HYG0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const authInstance = getAuth(app);

// export default authInstance;

export function getAuthInstance() {
  return getAuth(app);
}
