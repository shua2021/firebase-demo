import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCBv0rPVyiXqsRBVuCQ1mmydSueoy5RjWk",
    authDomain: "fir-demo-1ea74.firebaseapp.com",
    projectId: "fir-demo-1ea74",
    storageBucket: "fir-demo-1ea74.appspot.com",
    messagingSenderId: "36841794398",
    appId: "1:36841794398:web:3054fea2e13f9fe9a53dcf",
    measurementId: "G-372PCDT63Y"
  };

firebase.initializeApp(firebaseConfig); //Intializes the firebase app
export const auth = firebase.auth();
export const firestore = firebase.firestore();
//After this point firebase is fully set up

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export default generateUserDocument
