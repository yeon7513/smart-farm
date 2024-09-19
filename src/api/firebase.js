import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  limit,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
  writeBatch,
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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

// 컬렉션에 저장
export async function addDatas(collectionName, addObj) {
  const result = await addDoc(getCollection(collectionName), addObj);
  const docSnap = await getDoc(result);
  const resultData = { ...docSnap.data(), docId: docSnap.id };
  return resultData;
}

// export async function joinUser(uid, email, password = "", userInfo = {}) {
//   const userData = {
//     email: email,
//     password: password,
//     createdAt: new Date().getTime(),
//     updatedAt: new Date().getTime(),
//     photoUrl: [],
//     liked: "",
//     ...(userInfo.deleteYn && { deleteYn: userInfo.deleteYn }),
//     ...(userInfo.address && { address: userInfo.address }),
//     ...(userInfo.number && { number: userInfo.number }),
//     ...(userInfo.farmAddress && { farmAddress: userInfo.farmAddress }),
//     ...(userInfo.required && { required: userInfo.required }),
//     ...(userInfo.name && { name: userInfo.name }),
//     ...(userInfo.nickname && { nickname: userInfo.nickname }),
//     ...(userInfo.complaneNum && { complaneNum: userInfo.complaneNum }),
//   };
//   await setDoc(doc(db, "users", uid), userData);
// }

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
// 함수 수정시 어디서 사용중인지 확인하면 좋을듯요!

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

// board

export async function getBoardDatas(collectionName) {
  const collect = await getCollection(collectionName);
  const q = query(
    collect,
    orderBy("id", "desc") // Adjust field name based on your schema
  );
  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
    collection: collectionName,
  }));

  return resultData;
}

export async function uploadImage(path, imgFile) {
  try {
    const storage = getStorage();
    const imageRef = ref(storage, path);
    await uploadBytes(imageRef, imgFile);
    const url = await getDownloadURL(imageRef);
    console.log("업로드된 이미지 URL: ", url);
    return url;
  } catch (error) {
    console.error("이미지 업로드 실패: ", error);
    return "";
  }
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  if (lastDoc.docs.length === 0) {
    return 0;
  }
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

export async function addBoardDatas(collectionName, addObj) {
  try {
    if (addObj.imgUrl) {
      const path = `/board/${Date.now()}_${addObj.imgUrl.name}`;
      addObj.imgUrl = await uploadImage(path, addObj.imgUrl);
    }

    const resultData = await runTransaction(db, async (tr) => {
      const lastId = (await getLastNum(collectionName, "id")) + 1;
      addObj.id = lastId;

      // 데이터베이스에 새 문서 추가
      const docRef = await addDoc(collection(db, collectionName), addObj);
      // 하위 컬렉션 "comment" 생성
      const commentRef = collection(docRef, "comment");
      await addDoc(commentRef, { initial: true }); // 초기값, 필요시 변경

      const snapshot = await getDoc(docRef);
      const docData = snapshot.exists()
        ? { ...snapshot.data(), docId: snapshot.id, collection: collectionName }
        : null;
      return docData;
    });

    return resultData;
  } catch (error) {
    console.error("addBoardDatas 에러: ", error);
    return false;
  }
}

// 조회수 증가 함수
export const incrementPostCount = async (category, docId) => {
  try {
    const postRef = doc(db, category, docId); // category는 컬렉션 이름, postId는 문서 ID
    await updateDoc(postRef, {
      count: increment(1), // count 필드 값에 +1 증가
    });
  } catch (error) {
    console.error("조회수 증가 중 오류 발생:", error); // 오류 로그
  }
};

export async function deletePost(category, docId) {
  try {
    const commentRef = doc(db, category, docId);
    await deleteDoc(commentRef);
    return true;
  } catch (error) {
    console.error("게시글 삭제 중 오류 발생: ", error);
    return false;
  }
}

export async function updatePost(category, docId, updatedId) {
  try {
    const postRef = doc(db, category, docId);
    await updateDoc(postRef, updatedId);
    return true;
  } catch (error) {
    console.error("게시글 수정 중 오류 발생: ", error);
    return false;
  }
}

export const getPostById = async (collection, docId) => {
  try {
    // Firestore에서 특정 문서 참조를 생성
    const docRef = doc(db, collection, docId);
    // 문서 데이터를 가져오기
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // 문서가 존재하면 데이터를 반환
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      // 문서가 존재하지 않는 경우 처리
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching post: ", error);
    throw error;
  }
};

export async function getComment(collectionName, docId) {
  try {
    const commentRef = collection(db, collectionName, docId, "comment");
    const q = query(commentRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const comment = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      collection: collectionName,
    }));
    return comment;
  } catch (error) {
    console.log("댓글 불러오기 중 오류: ", error);
    return false;
  }
}

export async function addComment(collectionName, docId, commentObj) {
  try {
    const commentRef = collection(db, collectionName, docId, "comment");
    await addDoc(commentRef, {
      ...commentObj,
      createdAt: new Date().toISOString().split("T")[0],
    });
    return true;
  } catch (error) {
    console.log("댓글 추가 중 오류: ", error);
    return false;
  }
}

export async function deleteComment(collectionName, docId, commentId) {
  try {
    const commentRef = doc(db, collectionName, docId, "comment", commentId);
    await deleteDoc(commentRef);
    return true;
  } catch (error) {
    console.error("댓글 삭제 중 오류 발생: ", error);
    return false;
  }
}

export async function updateComment(
  category,
  docId,
  commentId,
  updatedComment
) {
  try {
    const commentRef = doc(db, category, docId, "comment", commentId);
    await updateDoc(commentRef, updatedComment);
    return true;
  } catch (error) {
    console.error("댓글 수정 중 오류 발생: ", error);
    return false;
  }
}
