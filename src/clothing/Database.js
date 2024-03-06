import { Firestore } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore'
import { doc, setDoc, getDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: "dressful-99f4d.firebaseapp.com",
    projectId: "dressful-99f4d",
    storageBucket: "dressful-99f4d.appspot.com",
    messagingSenderId: "181392494567",
    appId: `${process.env.REACT_APP_APP_ID}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`
  };

  initializeApp(firebaseConfig);
  const db = getFirestore();


async function uploadMessage(name, email, message) {
    const data = {name: name, email: email, message: message};
    await setDoc(doc(db, 'Contact', email), data)
}


async function getKey(keyName) {
    const docRef = doc(db, 'Keys', keyName);
    const docSnap = await getDoc(docRef);
    const key = await docSnap.data().key;
    return key;
}


export {uploadMessage, getKey};

