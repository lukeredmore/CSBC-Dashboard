import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import keys from "./client-side-private-files.json";

const firebaseConfig = {
  apiKey: keys.FIREBASE_API_KEY,
  authDomain: "csbcprod.firebaseapp.com",
  databaseURL: "https://csbcprod.firebaseio.com",
  projectId: "csbcprod",
  storageBucket: "csbcprod.appspot.com",
  messagingSenderId: "230246212278",
  appId: keys.FIREBASE_APP_ID,
  measurementId: "G-WXC439C5CZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const getDataFromRef = async refString => {
  var dataRef = await firebase.database().ref(refString).once("value");
  return dataRef.val();
};

export const getContinuousDataFromRef = async (refString, callback) => {
  var dataRef = firebase.database().ref(refString);
  dataRef.on("value", function (snapshot) {
    callback(snapshot.val());
  });
};

export const writeToRef = async (refString, data) => {
  var dataRef = await firebase.database().ref(refString).set(data);
  return dataRef;
};

export const pushToRef = async (refString, data) => {
  var dataRef = await firebase.database().ref(refString).push(data);
  return dataRef;
};

export const removeAtRef = async refString => {
  var dataRef = await firebase.database().ref(refString).remove();
  return dataRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const sendAuthenticatedRequest = async url => {
  try {
    const authToken = await auth.currentUser.getIdToken();
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
      method: "GET",
    };
    const response = await fetch(url, config);
    const status = response.status;
    const { message } = await response.json();
    return { status, message };
  } catch (err) {
    return {
      status: 500,
      message: err,
    };
  }
};

export const sendAuthenticatedPostRequest = async (url, data) => {
  try {
    const authToken = await auth.currentUser.getIdToken();
    const config = {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
      method: "POST",
      body: JSON.stringify(data)
    };
    const response = await fetch(url, config);
    console.log(response)
    const status = response.status;
    const { message } = await response.json();
    return { status, message };
  } catch (err) {
    return {
      status: 500,
      message: err,
    };
  }
};

export const verifyLoginStatus = () => {
  return auth.currentUser
}
