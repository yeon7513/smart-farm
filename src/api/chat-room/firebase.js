import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "REACT_APP_CHATROOM_FIREBASE_API_KEY",
  authDomain: "ifarm-dd7b6.firebaseapp.com",
  projectId: "ifarm-dd7b6",
  storageBucket: "ifarm-dd7b6.appspot.com",
  messagingSenderId: "581435413866",
  appId: "1:581435413866:web:09a6d8065e5b47863c8113"
}

// firebase 초기화
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();