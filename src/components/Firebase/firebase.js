// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID
  apiKey: "AIzaSyBuil7Ruo6gJjJ9vNlbQybD06uxyxSWD6I",
  authDomain: "food-sharing-16423.firebaseapp.com",
  projectId: "food-sharing-16423",
  storageBucket: "food-sharing-16423.appspot.com",
  messagingSenderId: "572342170330",
  appId: "1:572342170330:web:f6565022093bce02b3abe3",
  measurementId: "G-ED322C89TW"
};
  

export const app = initializeApp(config);
export const auth = getAuth(app);
export const storage = getStorage(app); 
export const db = getFirestore(app);

