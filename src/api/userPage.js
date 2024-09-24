import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { uploadImage } from './board';
import { createPath, db } from './firebase';

export async function joinUser(uid, email, password = '', userInfo = {}) {
  const userData = {
    email: email,
    password: password,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    photoUrl: [],
    liked: '',
    ...(userInfo.deleteYn && { deleteYn: userInfo.deleteYn }),
    ...(userInfo.address && { address: userInfo.address }),
    ...(userInfo.number && { number: userInfo.number }),
    ...(userInfo.farmAddress && { farmAddress: userInfo.farmAddress }),
    ...(userInfo.required && { required: userInfo.required }),
    ...(userInfo.name && { name: userInfo.name }),
    ...(userInfo.nickname && { nickname: userInfo.nickname }),
    ...(userInfo.complaneNum && { complaneNum: userInfo.complaneNum }),
  };
  await setDoc(doc(db, 'users', uid), userData);
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

export async function updateDatasWithImage(
  collectionName,
  docId,
  updateObj,
  photoUrl
) {
  const docRef = await doc(db, collectionName, docId);

  const time = new Date().getTime();

  updateObj.updatedAt = time;

  const storage = getStorage();

  if (typeof photoUrl === 'string' && photoUrl) {
    const deleteRef = ref(storage, photoUrl);
    await deleteObject(deleteRef);
  }

  if (updateObj.photoUrl instanceof File) {
    const imagePath = createPath('profiles/') + `${docId}.jpg`;
    const uploadedUrl = await uploadImage(imagePath, updateObj.photoUrl);
    updateObj.photoUrl = uploadedUrl;
  } else if (photoUrl === null) {
    delete updateObj['photoUrl'];
  }

  await updateDoc(docRef, updateObj);
  const updatedData = await getDoc(docRef);
  const resultData = { docId: updatedData.id, ...updatedData.data() };

  return resultData;
}
