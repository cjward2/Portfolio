import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB8cufJdBGRlIGDnSzsr7ZT4xnT4nx6RUg",
    authDomain: "netflix-clone-e83ae.firebaseapp.com",
    projectId: "netflix-clone-e83ae",
    storageBucket: "netflix-clone-e83ae.appspot.com",
    messagingSenderId: "914191281181",
    appId: "1:914191281181:web:f9143ae31d174485582af4"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };
  export default db;