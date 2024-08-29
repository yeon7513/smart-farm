import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { useEffect } from "react";
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
export const db = getFirestore(app);

export async function addDatas(uid, dataObj) {
  try {
    const userDocRef = doc(db, "users", uid);
    const paymentsCollectionRef = collection(userDocRef, "payments");
    await addDoc(paymentsCollectionRef, dataObj);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

export function getCollection(collectionName) {
  return collection(db, collectionName);
}

export function getUserAuth() {
  return auth;
}

export async function joinUser(uid, email, password, userInfo) {
  const { address, number, farmAddress, required, name, nickname } = userInfo;
  const userData = {
    email: email,
    password: password,
    ...(address !== undefined && { address: address }),
    ...(number !== undefined && { number: number }),
    ...(farmAddress !== undefined && { farmAddress: farmAddress }),
    ...(required !== undefined && { required: required }),
    ...(name !== undefined && { name: name }),
    ...(name !== undefined && { nickname: nickname }),
  };
  await setDoc(doc(db, "users", uid), userData);
}

export async function syncOrder(uid, orderArr) {
  const orderRef = getCollection("user", uid, "order");
  const batch = writeBatch(db);
  for (const item of orderArr) {
    const result = await updateOrder(uid, item);
    if (!result) {
      const itemRef = doc(orderRef, item.id.toString());
      batch.set(itemRef, item);
    }
  }
  await batch.commit();
  const resultData = await getDatas(["user", uid, "order"], {});
  return resultData;
}

export async function updateOrder(uid, orderItem) {
  const orderRef = getCollection("user", uid, "order");
  const itemRef = doc(orderRef, orderItem.id.toString());

  const itemDoc = await getDoc(itemRef);
  if (itemDoc.exists()) {
    return true;
  } else {
    return false;
  }
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

// 토마토
// const apiKey =
//   "iv2U4%2BpsJ7CRlDQ2ukixg4slrgEMjbIL%2FB%2B9pefVtqqEHGHhSRX7tNubbe2Y%2FGpjV59et7GLPJwxAdVe7iXycA%3D%3D"; // 여기에 실제 API 키를 넣으세요
// const searchFrmhsCodes = [
//   "81",
//   "9",
//   "21",
//   "25",
//   "27",
//   "28",
//   "29",
//   "31",
//   "32",
//   "39",
//   "42",
//   "44",
//   "45",
//   "48",
//   "50",
//   "51",
//   "53",
//   "54",
//   "56",
//   "57",
//   "59",
//   "201",
//   "202",
//   "204",
//   "205",
//   "206",
//   "207",
//   "209",
//   "210",
//   "315",
//   "316",
//   "318",
//   "319",
//   "320",
//   "324",
//   "325",
//   "326",
//   "327",
//   "339",
//   "344",
//   "345",
//   "349",
//   "315",
//   "33",
//   "35",
//   "37",
//   "41",
//   "43",
//   "203",
// ]; // 배열에 여러 코드를 넣으세요

// // 모든 URL을 생성하여 저장
// const urls = searchFrmhsCodes.map(
//   (code) =>
//     `/api2/http://apis.data.go.kr/1390000/SmartFarmdata/grwdatarqst?serviceKey=${apiKey}&searchFrmhsCode=${code}&returnType=json`
// );
const urls =
  "/bestfarm/grwdatarqst?serviceKey=iv2U4%2BpsJ7CRlDQ2ukixg4slrgEMjbIL%2FB%2B9pefVtqqEHGHhSRX7tNubbe2Y%2FGpjV59et7GLPJwxAdVe7iXycA%3D%3D&searchFrmhsCode=81&returnType=json";
fetch(urls)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
  });

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
