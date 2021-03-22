import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD-6r223Da09L93WAp1CHgs3x3Y3hP1l4U",
    authDomain: "react-crud-176b8.firebaseapp.com",
    databaseURL: "https://react-crud-176b8-default-rtdb.firebaseio.com",
    projectId: "react-crud-176b8",
    storageBucket: "react-crud-176b8.appspot.com",
    messagingSenderId: "386686364808",
    appId: "1:386686364808:web:8d00c78dd8ccd67b41433d"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export const createUserProfileDocument = async(userAuth,additionalData) => {
    if(!userAuth)
      return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
      const{displayName,email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }
      catch(error){
        console.log('error creating user',error.message);
      }
    }

    return userRef;

  };

  export default firebase;