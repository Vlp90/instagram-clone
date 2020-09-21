import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBlUIbXuQV_Up3Psbwnxfp-fux7Z7MzzLg",
    authDomain: "instagram-light-1b746.firebaseapp.com",
    databaseURL: "https://instagram-light-1b746.firebaseio.com",
    projectId: "instagram-light-1b746",
    storageBucket: "instagram-light-1b746.appspot.com",
    messagingSenderId: "363693175893",
    appId: "1:363693175893:web:a87988923f68086b3e10dc",
    measurementId: "G-5MJFS8WDFW",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
