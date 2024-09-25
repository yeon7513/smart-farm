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
    photoUrl: '',
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

// 로컬스토리지 저장용 함수
const saveToLocalStorage = (data) => {
  const { pwck, password, ...rest } = data;
  const isAdmin = JSON.parse(localStorage.getItem('user')).email;
  if (!isAdmin.includes('admin')) {
    localStorage.setItem('user', JSON.stringify(rest));
  }
};

export async function updateDatasWithImage(
  collectionName,
  docId,
  updateObj, // 업데이트할 객체들 (기존 정보)
  photoUrl // 기존 이미지 경로
) {
  try {
    const docRef = await doc(db, collectionName, docId);

    const time = new Date().getTime();

    updateObj.updatedAt = time;

    // 업데이트 객체의 photoUrl이 파일 객체일 경우
    if (updateObj.photoUrl instanceof File) {
      // 기존 이미지가 있을 경우
      if (photoUrl !== '') {
        const storage = getStorage();
        const deleteRef = ref(storage, photoUrl);
        await deleteObject(deleteRef);
      }

      // 새 이미지를 업로드하고 새로운 url로 저장
      const url = await uploadImage(
        createPath('profiles/'),
        updateObj.photoUrl
      );
      updateObj.photoUrl = url;
    }

    await updateDoc(docRef, updateObj);
    const updatedData = await getDoc(docRef);
    const resultData = { docId: updatedData.id, ...updatedData.data() };

    await saveToLocalStorage(updateObj);

    return resultData;
  } catch (error) {
    console.error(error);
  }
}
