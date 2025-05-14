import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyACbo0Ir-QVH9zr-y_mZzjibMEm2JBgoQY",
  authDomain: "grievance-8e8af.firebaseapp.com",
  databaseURL: "https://grievance-8e8af-default-rtdb.firebaseio.com",
  projectId: "grievance-8e8af",
  storageBucket: "grievance-8e8af.appsoft.com",
  messagingSenderId: "991588376117",
  appId: "1:991588376117:web:2f6b39678cb944fd025b7c",
  measurementId: "G-QGH4LYMFFJ"
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
