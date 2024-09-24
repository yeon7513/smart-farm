import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, getCollection } from "./firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// 화면에 보여줄 데이터
export async function getDisasterDatas(collectionName) {
  const collect = getCollection(collectionName);
  const q = query(collect);
  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}
