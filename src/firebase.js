// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBhXznFwX9B1skv_RUhUU-yUBDyfRd1K4g",
    authDomain: "discord-lite.firebaseapp.com",
    databaseURL: "https://discord-lite.firebaseio.com",
    projectId: "discord-lite",
    storageBucket: "discord-lite.appspot.com",
    messagingSenderId: "418231344319",
    appId: "1:418231344319:web:791c6001d54789671c3a0a",
    measurementId: "G-YJH41HB7NB"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()


  export {auth, provider}
  export default db