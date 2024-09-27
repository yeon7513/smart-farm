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
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

export function getCollection(...path) {
  let newPath = path;
  if (typeof path[0] !== "string") {
    newPath = path.flat();
  }
  return collection(db, ...newPath);
}

export function getUserAuth() {
  return auth;
}

export function createPath(path) {
  const uuid = crypto.randomUUID();
  return path + uuid;
}

// 컬렉션에 저장
export async function addDatas(collectionName, addObj) {
  const result = await addDoc(getCollection(collectionName), addObj);
  const docSnap = await getDoc(result);
  const resultData = { ...docSnap.data(), docId: docSnap.id };
  return resultData;
}

export async function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [] } = queryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);

  // where 조건
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });

  // orderBy 조건
  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || "asc"));
  });

  return q;
}

export async function getDatas(collectionName) {
  try {
    const collect = getCollection(collectionName);
    const snapshot = await getDocs(collect);
    const returnData = snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));

    return returnData;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
}

export async function getDocDatas(collectionName, docId) {
  try {
    // Firestore의 컬렉션과 문서 참조를 가져옴
    const docRef = doc(db, collectionName, docId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const resultData = { id: snapshot.id, ...snapshot.data() };
      return resultData;
    } else {
      console.log("해당 문서가 존재하지 않습니다.");
      return null;
    }
  } catch (error) {
    console.log("문서 불러오기 에러: ", error);
    throw new Error(`문서 불러오기 실패: ${error.message}`); // 오류를 상위로 던짐
  }
}

export const getOrder = async (collectionName, orderByField) => {
  const q = query(
    collection(db, collectionName),
    orderBy(orderByField, "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export async function updateDatas(collectionName, docId, updateObj) {
  try {
    const docRef = await doc(db, collectionName, docId);
    await updateDoc(docRef, updateObj);
    const snapshot = await getDoc(docRef);
    const resultData = { docId: snapshot.id, ...snapshot.data() };

    return resultData;
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

// chatroomId를 가져오는 함수 추가
export const fetchChatroomId = async (email) => {
  try {
    const q = query(
      collection(db, "chatbot", email, "chatroom1"), // 경로에 맞는 컬렉션
      where("activeYn", "==", "N") // 승인되지 않은 방만 가져옴
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const chatroomId = querySnapshot.docs[0].id; // 첫 번째 문서의 ID를 chatroomId로 사용
      return chatroomId; // chatroomId를 반환
    } else {
      console.log("No chatroom found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching chatroomId: ", error);
    throw error;
  }
};

async function onApproveChat(chatId) {
  try {
    const chatRoomRef = doc(
      db,
      "chatRoom",
      "admin@gmail.com",
      "chatroom1",
      chatId
    );
    await updateDoc(chatRoomRef, {
      activeYn: "Y", // 승인 상태로 변경
    });
    console.log(`Chatroom ${chatId} 승인 완료`);
  } catch (error) {
    console.error("승인 처리 중 오류가 발생했습니다:", error);
  }
}
