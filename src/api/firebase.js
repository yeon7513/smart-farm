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
export function getCollection(collectionName) {
  return collection(db, collectionName);
}
export function getUserAuth() {
  return auth;
}

// 컬렉션에 저장
export async function addDatas(collectionName, addObj) {
  const result = await addDoc(getCollection(collectionName), addObj);
  const docSnap = await getDoc(result);
  const resultData = { ...docSnap.data(), docId: docSnap.id };
  return resultData;
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
    // console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
}

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
