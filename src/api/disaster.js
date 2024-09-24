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
//게시글 수정
export async function updateDisaster(category, docId, updatedId) {
  try {
    const postRef = doc(db, category, docId);
    await updateDoc(postRef, updatedId);
    return true;
  } catch (error) {
    console.error("게시글 수정 중 오류 발생: ", error);
    return false;
  }
}

// 삭제
export async function deleteDisaster(category, docId) {
  try {
    const commentRef = doc(db, category, docId);
    await deleteDoc(commentRef);
    return true;
  } catch (error) {
    console.error("게시글 삭제 중 오류 발생: ", error);
    return false;
  }
}

// 조회수 증가 함수
export async function incrementViewCount(category, docId) {
  try {
    const postRef = doc(db, category, docId);
    await updateDoc(postRef, {
      view: increment(1), // 1씩 증가
    });
    console.log("조회수가 증가했습니다.");
  } catch (error) {
    console.error("조회수 증가 중 오류 발생: ", error);
  }
}
