import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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
} from 'firebase/firestore';
import { getLastNum } from './board';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const db = getFirestore(app);

export function getCollection(...path) {
  let newPath = path;
  if (typeof path[0] !== 'string') {
    newPath = path.flat();
  }
  return collection(db, ...newPath);
}

export function getUserAuth() {
  return auth;
}

// 랜덤 파일 이름 생성
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
  const orderRef = getCollection('user', uid, 'order');
  const batch = writeBatch(db);
  for (const item of orderArr) {
    const result = await updateOrder(uid, item);
    if (!result) {
      const itemRef = doc(orderRef, item.id.toString());
      batch.set(itemRef, item);
    }
  }
  await batch.commit();
  const resultData = await getDatas(['user', uid, 'order'], {});
  return resultData;
}

export async function updateOrder(uid, orderItem) {
  const orderRef = getCollection('user', uid, 'order');
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
    const paymentsRef = collection('users', uid, 'payments');
    const createObj = {
      createdAt: new Date().getTime,
      updatedAt: new Date().getTime,
      ...paymentObj,
    };
    const batch = writeBatch(db);
    const docRef = await addDoc(paymentsRef, createObj);
    batch.delete(paymentsRef);
    const paymentRef = getCollection('users', uid, 'payment');
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
    q = query(q, orderBy(order.field, order.direction || 'asc'));
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
    console.error('Error getting documents: ', error);
    throw error;
  }
}

export const getOrder = async (collectionName, orderByField) => {
  const q = query(
    collection(db, collectionName),
    orderBy(orderByField, 'desc')
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
    console.error('Error updating document: ', error);
    throw error;
  }
}

export async function deleteDatas(collectionName, docId) {
  try {
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting document: ', error);
    return false;
  }
}

export const addSetDocDatas = async (collectionName, complainData) => {
  try {
    // 마지막 신고 번호 가져오기
    const lastNum = await getLastNum(collectionName, 'docIdNum');
    const newIdNumber = lastNum + 1; // 마지막 번호에서 1 증가

    let docId = `Cp_${newIdNumber}`;

    // if (complainData.selectedReason.value === "ps") {
    //   docId = `Ps_${newIdNumber}`; // 게시글 신고 ID
    // } else if (complainData.selectedReason.value === "pf") {
    //   docId = `Pf_${newIdNumber}`; // 프로필 신고 ID
    // }

    const complainWithId = { ...complainData, docIdNum: newIdNumber };
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, complainWithId);

    return true;
  } catch (error) {
    console.error('setDoc 에러 발생: ', error);
  }
};
