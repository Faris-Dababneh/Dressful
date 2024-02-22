import { Firestore } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore'
import { doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';

import imglyRemoveBackground from "@imgly/background-removal"
import { useState } from 'react';

// FIGURE OUT FIREBASE SECURITY RULES TO PREVENT PEOPLE FROM REQUESTING DATABASE UNAUTHORIZED
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

async function getKey(key) {
    const docRef = doc(db, 'Keys', key);
    const docSnap = await getDoc(docRef);

    return docSnap.data().key;
}


export {uploadMessage, getKey};


/*
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "openAIAPI";

const client = new SecretsManagerClient({
  region: "us-east-2",
});

let response;

try {
  response = await client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
    })
  );
} catch (error) {
  // For a list of exceptions thrown, see
  // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  throw error;
}

const secret = response.SecretString;
*/

