import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

import keys from './client-side-private-files.json'

const firebaseConfig = {
  apiKey: keys.FIREBASE_API_KEY,
  authDomain: "csbcprod.firebaseapp.com",
  databaseURL: "https://csbcprod.firebaseio.com",
  projectId: "csbcprod",
  storageBucket: "csbcprod.appspot.com",
  messagingSenderId: "230246212278",
  appId: keys.FIREBASE_APP_ID,
  measurementId: "G-WXC439C5CZ"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
}

export const getDataFromRef = async (refString) => {
  var dataRef = await firebase.database().ref(refString).once('value')
  return dataRef.val()
}

export const getContinuousDataFromRef = async (refString, callback) => {
  var dataRef = firebase.database().ref(refString);
    dataRef.on('value', function(snapshot) {
    callback(snapshot.val())
  })
}

export const writeToRef = async (refString, data) => {
  var dataRef = await firebase.database().ref(refString).set(data)
  return dataRef
}

export const pushToRef = async (refString, data) => {
  var dataRef = await firebase.database().ref(refString).push(data)
  return dataRef
}

export const removeAtRef = async (refString) => {
  var dataRef = await firebase.database().ref(refString).remove()
  return dataRef
}
