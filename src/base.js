import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCA-T76rI4aqYMQ7Rvfd3cN08mtQix58j8",
  authDomain: "react-relearn2.firebaseapp.com",
  databaseURL: "https://react-relearn2-default-rtdb.firebaseio.com/",
});

const base = Rebase.createClass(firebaseApp.database());

//named export
export { firebaseApp };

//export default
export default base;
