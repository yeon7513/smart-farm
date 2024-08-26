import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

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

export function getCollection(collectionName) {
  return collection(db, collectionName);
}

export function getUserAuth() {
  return auth;
}

export async function joinUser(uid, email, password, userInfo) {
  const { address, number, farmAddress, required, name } = userInfo;
  const userData = {
    email: email,
    password: password,
    ...(address !== undefined && { address: address }),
    ...(number !== undefined && { number: number }),
    ...(farmAddress !== undefined && { farmAddress: farmAddress }),
    ...(required !== undefined && { required: required }),
    ...(name !== undefined && { name: name }),
  };
  await setDoc(doc(db, "users", uid), userData);
}

export async function getDatas(collectionName) {
  try {
    const collect = collection(db, collectionName);
    const snapshot = await getDocs(collect);
    return snapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
}

export async function updateDatas(collectionName, docId, updateObj) {
  try {
    const docRef = await doc(db, collectionName, docId);
    await updateDoc(docRef, updateObj);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
}

// let userId;

// async function fetchData() {
//   const url =
//     "/api/Agree_WS/webservices/ProvideRestService/getIdentityDataList/cbd181f0a2594233a01eed9b0b86a392";
//   const response = await fetch(url);
//   const result = await response.json();
//   result.forEach((item) => {
//     userId = item.userId;
//   });
//   console.log(userId);
// }
// fetchData();

let userId = [];

const url =
  "/api/Agree_WS/webservices/ProvideRestService/getIdentityDataList/cbd181f0a2594233a01eed9b0b86a392";
fetch(url)
  .then((response) => response.json())
  .then((result) => {
    result.forEach((result) => {
      userId.push(result.userId);
    });
  });

// const url2 = `/api/http://www.smartfarmkorea.net/Agree_WS/webservices/ProvideRestService/getCroppingSeasonDataList/cbd181f0a2594233a01eed9b0b86a392/${userId}`;
// fetch(url2)
//   .then((response) => response.json())
//   .then((result) => {
//     console.log(result);
//   });

export async function deleteDatas(collectionName, docId) {
  try {
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting document: ", error);
    return false;
  }
}
