import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAJTBjsUArjmVmeQMWL71SyiuptopVb8Dc",
    authDomain: "disney-clone-9cdd5.firebaseapp.com",
    projectId: "disney-clone-9cdd5",
    storageBucket: "disney-clone-9cdd5.appspot.com",
    messagingSenderId: "43752701904",
    appId: "1:43752701904:web:6dc5c8805f630146d9c3d5",
    measurementId: "G-CGXME135QE"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();
  
  export { auth, provider, storage };
  export default db;