import * as firebase from "firebase";
require("firebase/firestore");
require("firebase/auth");
require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyDEBF5B-DVKs8c4y066qtrhrxxUWr7x5p0",
  authDomain: "brigadeiropelomundo-yasmin.firebaseapp.com",
  databaseURL: "https://brigadeiropelomundo-yasmin.firebaseio.com",
  projectId: "brigadeiropelomundo-yasmin",
  storageBucket: "brigadeiropelomundo-yasmin.appspot.com",
  messagingSenderId: "698043028603",
  appId: "1:698043028603:web:710c29dbb98538f4d57ede",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
