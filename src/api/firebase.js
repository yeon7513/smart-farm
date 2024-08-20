import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz9TEYoPHVv_Lz28BzcTa1DrLMI7wnBWc",
  authDomain: "ifarm-dd7b6.firebaseapp.com",
  projectId: "ifarm-dd7b6",
  storageBucket: "ifarm-dd7b6.appspot.com",
  messagingSenderId: "581435413866",
  appId: "1:581435413866:web:09a6d8065e5b47863c8113",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

export function getUserAuth() {
  return auth;
}

export async function joinUser(uid, email, password, userInfo) {
  const { address, number, farmAddress, required } = userInfo;
  const userData = {
    email: email,
    password: password,
    ...(address !== undefined && { address: address }),
    ...(number !== undefined && { number: number }),
    ...(farmAddress !== undefined && { farmAddress: farmAddress }),
    ...(required !== undefined && { required: required }),
  };
  await setDoc(doc(db, "users", uid), userData);
}
