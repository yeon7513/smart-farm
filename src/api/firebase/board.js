import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

export async function getBoardDatas(collectionName) {
  const collect = await getCollection(collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
    collection: collectionName,
  }));

  return resultData;
}

export async function addBoardDatas(collectionName, dataObj) {
  try {
    const url = await uploadImage(dataObj.imgUrl);
    dataObj.imgUrl = url;

    const time = new Date().getTime();
    dataObj.createdAt = time;
    dataObj.updatedAt = time;

    // 문서 id 자동
    const collect = await collection(db, collectionName);
    const result = await addDoc(collect, dataObj);
    const docSnap = await getDoc(result); // result ==> documentReference

    const resultData = { ...docSnap.data(), docId: docSnap.id };

    return resultData;
  } catch (error) {
    return false;
  }
}

async function uploadImage(path, imgFile) {
  // 스토리지 객체 가져오기
  const storage = getStorage();
  // 저장할 이미지 객체 생성
  const imageRef = ref(storage, path);
  // debugger;
  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, imgFile);
  // 저장한 File의 url 가져오기
  const url = await getDownloadURL(imageRef);
  return url;
}
