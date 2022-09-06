import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyB9-OmZCK19NQ854PybMvsS6RHlF0AXRzs",
  authDomain: "listcont-8cab2.firebaseapp.com",
  databaseURL: "https://listcont-8cab2-default-rtdb.firebaseio.com",
  projectId: "listcont-8cab2",
  storageBucket: "listcont-8cab2.appspot.com",
  messagingSenderId: "114923171174",
  appId: "1:114923171174:web:5c913778628b687af06ca7"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app
}

const database = firebase.database()

export {database, firebase}