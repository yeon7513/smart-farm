import { collection, doc, getDocs, setDoc } from "firebase/firestore";
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
