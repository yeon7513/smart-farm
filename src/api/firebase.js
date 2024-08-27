import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { batch } from "react-redux";

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

export async function createPayment(uid, paymentObj) {
  try {
    const paymentsRef = collection("users", uid, "payments");
    const createObj = {
      createdAt: new Date().getTime,
      updatedAt: new Date().getTime,
      ...paymentObj,
    };
    const batch = writeBatch(db);
    const docRef = await addDoc(paymentsRef, createObj);
    batch.delete(paymentsRef);
    const paymentRef = getCollection("users", uid, "payment");
    paymentObj.products.forEach((product) => {
      const itemRef = doc(paymentRef, product.id.toString());
      batch.delete(itemRef);
    });
    await batch.commit();
    return docRef.id;
  } catch (error) {
    console.error(error);
  }
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

// const url =
//   "https://apis.data.go.kr/1390000/SmartFarmdata/grwdatarqst?serviceKey=iv2U4%2BpsJ7CRlDQ2ukixg4slrgEMjbIL%2FB%2B9pefVtqqEHGHhSRX7tNubbe2Y%2FGpjV59et7GLPJwxAdVe7iXycA%3D%3D&searchFrmhsCode=81&returnType=json";
// fetch(url)
//   .then((response) => response.json())
//   .then((result) => {
//     console.log(result);
//   });
// const url =
//   "https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=3bd960b544d8e85c3f24e4e2d139794c";
// fetch(url)
//   .then((response) => response.json())
//   .then((result) => {
//     console.log(result);
//   });

// const apiKey = "2024fae68820b6a8f539fd5def6a6dfd02c1";

// const url = `/api1?apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&dtlSrchFlag=kncr2`;
// try {
//   fetch(url)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log(result);
//     });
// } catch (error) {
//   console.log(error);
// }

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
