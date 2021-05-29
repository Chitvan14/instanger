import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBaPD4z4mpAtYSo_IdN33FxkoaDz0fEpUQ",
  authDomain: "instanger-78429.firebaseapp.com",
  projectId: "instanger-78429",
  storageBucket: "instanger-78429.appspot.com",
  messagingSenderId: "463920685890",
  appId: "1:463920685890:web:8ed83f9f6ee415ae745edb",
  measurementId: "G-YH3WK15VEE"
});


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
