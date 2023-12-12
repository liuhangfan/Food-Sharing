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
  // apiKey: "AIzaSyBuil7Ruo6gJjJ9vNlbQybD06uxyxSWD6I",
  // authDomain: "food-sharing-16423.firebaseapp.com",
  // projectId: "food-sharing-16423",
  // storageBucket: "food-sharing-16423.appspot.com",
  // messagingSenderId: "572342170330",
  // appId: "1:572342170330:web:f6565022093bce02b3abe3",
  // measurementId: "G-ED322C89TW"
  apiKey: "AIzaSyCT23vZ0n18q0VSOmMkTmTZblJnOJ3E4G4",
  authDomain: "food-sharing-lmu.firebaseapp.com",
  projectId: "food-sharing-lmu",
  storageBucket: "food-sharing-lmu.appspot.com",
  messagingSenderId: "177664002070",
  appId: "1:177664002070:web:c9540acb64ccfa9c030d37",
  measurementId: "G-NX2YCF7PM4"
};
  

export const app = initializeApp(config);
export const auth = getAuth(app);
export const storage = getStorage(app); 
export const db = getFirestore(app);

