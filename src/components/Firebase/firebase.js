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
  apiKey: "AIzaSyBuil7Ruo6gJjJ9vNlbQybD06uxyxSWD6I",
  authDomain: "food-sharing-16423.firebaseapp.com",
  projectId: "food-sharing-16423",
  storageBucket: "food-sharing-16423.appspot.com",
  messagingSenderId: "572342170330",
  appId: "1:572342170330:web:f6565022093bce02b3abe3",
  measurementId: "G-ED322C89TW"
};

// const app = initializeApp(config);

// class Firebase {
//     constructor() {
//       this.app = app
//       /* Helper functions */
//     //   this.fieldValue = app.firestore.FieldValue;
//     //   this.emailAuthProvider = app.auth.EmailAuthProvider;
  
//       /* Firebase APIs */
//       this.auth = getAuth(app);
//     //   this.db = app.firestore();
//     //   this.storage = app.storage;
//     //   this.myUID = null;
  
//     //   /* Facebook sign in method provider */
//     //   this.facebookProvider = new app.auth.FacebookAuthProvider();
//     }
  
//     // *** Storage API ***
//     // getImage = (ref, imgId) =>
//     //   this.storage()
//     //     .refFromURL(ref)
//     //     .getDownloadURL()
//     //     .then(url => {
//     //       const img = document.getElementByID(imgId);
//     //       img.src = url;
//     //     })
//     //     .catch(err => {
//     //       console.error(err);
//     //     });
  
//     // *** Auth API ***
//     // doCreateUserWithEmailAndPassword = (email, password) =>
//     //   this.auth.createUserWithEmailAndPassword(email, password);
  
//     // doSignInWithEmailAndPassword = (email, password) =>
//     //   this.auth.signInWithEmailAndPassword(email, password);
  
//     // // doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);
  
//     // doSignOut = () => this.auth.signOut();
  
//     // doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  
//     // doPasswordUpdate = (passwordOne, passwordTwo) => {
//     //   return new Promise((resolve, reject) => {
//     //     if (passwordOne <= 5 || passwordTwo <= 5) {
//     //       reject({
//     //         code: 'passwords-too-short',
//     //         message: 'The password should at least be 6 characters long.'
//     //       });
//     //     } else if (passwordOne === passwordTwo) {
//     //       resolve(this.auth.currentUser.updatePassword(passwordOne));
//     //     } else {
//     //       reject({
//     //         code: 'passwords-not-the-same',
//     //         message: 'Passwords not the same.'
//     //       });
//     //     }
//     //   });
//     // };
  
//     // doSendEmailVerification = () =>
//     //   this.auth.currentUser.sendEmailVerification({
//     //     url: config.confirmationEmailRedirect
//     //   });
  
//     // // *** Algolia API ***
//     // onBooksAddedListener = change => {
//     //   this.db.collection('books').onSnapshot(snap => {
//     //     snap.docChanges().forEach(change => {
//     //       // if (change.type === 'added') {
//     //       this.addOrUpdateIndexRecord(change.doc);
//     //       // }
//     //     });
//     //   });
//     // };
//     // addOrUpdateIndexRecord(dataSnapshot) {
//     //   let firebaseObject = dataSnapshot.data();
//     //   // Specify Algolia's objectID using the Firebase object key
//     //   firebaseObject.objectID = dataSnapshot.id;
//     //   // Add or update object
//     //   index.setSettings({
//     //     attributesForFaceting: ['type']
//     //   });
  
//     //   index.saveObject(firebaseObject, err => {
//     //     if (err) {
//     //       throw err;
//     //     }
//     //   });
//     // }
  
//     // // *** Merge Auth and DB User API *** //
//     // onAuthUserListener = (next, fallback) =>
//     //   this.auth.onAuthStateChanged(authUser => {
//     //     if (authUser) {
//     //       this.myUID = authUser.uid; //store my uid
//     //       this.user(authUser.uid)
//     //         .get()
//     //         .then(snapshot => {
//     //           const dbUser = snapshot.data();
  
//     //           // merge auth and db user
//     //           authUser = {
//     //             age: authUser.age,
//     //             email: authUser.email,
//     //             emailVerified: authUser.emailVerified,
//     //             location: authUser.location,
//     //             myBooks: authUser.myBooks,
//     //             phoneNumber: authUser.phoneNumber,
//     //             photoUrl: authUser.photoUrl,
//     //             providerData: authUser.providerData,
//     //             userName: authUser.userName,
//     //             transactions: authUser.transactions,
//     //             uid: authUser.uid,
//     //             ...dbUser
//     //           };
  
//     //           next(authUser);
//     //         });
//     //     } else {
//     //       fallback();
//     //     }
//     //   });
  
//     // should be checked if null before userw
//     getMyUID = () => this.myUID;
  
//     // // *** API ***
//     // user = uid => this.db.doc(`users/${uid}`);
//     // users = () => this.db.collection('users');
//     // book = uid => this.db.doc(`books/${uid}`);
//     // books = () => this.db.collection('books');
//     // transaction = id => this.db.doc(`transactions/${id}`);
//     // transactions = () => this.db.collection('transactions');
//   }
  
// export default Firebase;
  

export const app = initializeApp(config);
export const auth = getAuth(app);
export const storage = getStorage(app); 
export const db = getFirestore(app);

