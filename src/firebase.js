import firebase from 'firebase/app'
import 'firebase/database'
import 'dotenv'

var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "csbcprod.firebaseapp.com",
  databaseURL: "https://csbcprod.firebaseio.com",
  projectId: "csbcprod",
  storageBucket: "csbcprod.appspot.com",
  messagingSenderId: "230246212278",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-WXC439C5CZ"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const getDataFromRef = async (refString) => {
  var dataRef = await firebase.database().ref(refString).once('value')
  return dataRef.val()
}

export const writeToRef = async (refString, data) => {
  var dataRef = await firebase.database().ref(refString).set(data)
  return dataRef
}

