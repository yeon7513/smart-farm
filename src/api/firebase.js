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
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { getLastNum } from "./board";
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
export const auth = getAuth(app);

export const db = getFirestore(app);

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
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
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

// export async function getDocDatas(collectionName, docId) {
//   try {
//     const collect = getCollection(collectionName, docId);
//     const snapshot = await getDoc(collect);
//     if (snapshot.exists()) {
//       const resultData = { id: snapshot.id, ...snapshot.data() };
//       return resultData;
//     } else {
//       console.log("해당 문서가 존재하지 않습니다.");
//       return null;
//     }
//   } catch (error) {
//     console.log("문서 불러오기 에러: ", error);
//   }
// }

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

// 결제를 취소하는 함수입니다.
export const pointTableCancel = async (imp_uid) => {
  try {
    const paymentsQuery = query(
      collection(db, "payments"),
      where("imp_uid", "==", imp_uid)
    );
    const paymentsSnapshot = await getDocs(paymentsQuery);

    // 결제 문서가 있으면 삭제합니다.
    if (!paymentsSnapshot.empty) {
      const docRef = paymentsSnapshot.docs[0].ref;
      await deleteDoc(docRef);
      console.log("결제 정보가 삭제되었습니다.");
    } else {
      console.log("결제 정보를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("결제 정보 삭제 실패: ", error);
  }
};

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
