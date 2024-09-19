// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
  // apiKey: "AIzaSyAlk0SsMqhC_Cf21It-DhiDX-B6RikbT4Y",
  // authDomain: "hope-ef191.firebaseapp.com",
  // projectId: "hope-ef191",
  // storageBucket: "hope-ef191.appspot.com",
  // messagingSenderId: "872490700793",
  // appId: "1:872490700793:web:f844e50b3daa4d997ef728"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;