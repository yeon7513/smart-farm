import {
  collection,
  doc,
  getDocs,
  runTransaction,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export async function joinUser(uid, email, password = "", userInfo = {}) {
  const userData = {
    email: email,
    password: password,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    photoUrl: [],
    liked: "",
    ...(userInfo.deleteYn && { deleteYn: userInfo.deleteYn }),
    ...(userInfo.address && { address: userInfo.address }),
    ...(userInfo.number && { number: userInfo.number }),
    ...(userInfo.farmAddress && { farmAddress: userInfo.farmAddress }),
    ...(userInfo.required && { required: userInfo.required }),
    ...(userInfo.name && { name: userInfo.name }),
    ...(userInfo.nickname && { nickname: userInfo.nickname }),
    ...(userInfo.complaneNum && { complaneNum: userInfo.complaneNum }),
  };
  await setDoc(doc(db, "users", uid), userData);
}
export async function LoginGetDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return resultData;
}

export async function addDatasTransJaction(collection, addObj) {
  try {
    await runTransaction(db, async (transaction) => {
      const docRef = doc(db, collection, addObj.id); // 문서 참조 생성
      const docSnapshot = await transaction.get(docRef); // 해당 문서 가져오기

      if (!docSnapshot.exists()) {
        // 문서가 존재하지 않는 경우 추가
        transaction.set(docRef, addObj);
      } else {
        // 문서가 이미 존재할 경우 처리 (선택적)
        console.log("Document already exists");
      }
    });
    console.log("Transaction successfully committed!");
  } catch (error) {
    console.error("Transaction failed: ", error);
  }
}
