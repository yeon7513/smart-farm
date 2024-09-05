import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  runTransaction,
} from "firebase/firestore";
import { getCollection } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { createPath } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBz9TEYoPHVv_Lz28BzcTa1DrLMI7wnBWc",
  authDomain: "ifarm-dd7b6.firebaseapp.com",
  projectId: "ifarm-dd7b6",
  storageBucket: "ifarm-dd7b6.appspot.com",
  messagingSenderId: "581435413866",
  appId: "1:581435413866:web:09a6d8065e5b47863c8113",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getBoardDatas(collectionName) {
  const collect = await getCollection(collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
    collection: collectionName,
  }));

  return resultData;
}

// export async function addBoardDatas(collectionName, dataObj) {
//   try {
//     if (dataObj.imgUrl) {
//       const url = await uploadImage(dataObj.imgUrl);
//       dataObj.imgUrl = url;
//     }

//     const time = new Date().getTime();
//     dataObj.createdAt = time;
//     dataObj.updatedAt = time;

//     // 문서 id 자동
//     const collect = await collection(db, collectionName);
//     const result = await addDoc(collect, dataObj);
//     const docSnap = await getDoc(result); // result ==> documentReference

//     const resultData = {
//       ...docSnap.data(),
//       docId: docSnap.id,
//       collection: collectionName,
//     };
//     return resultData;
//   } catch (error) {
//     return false;
//   }
// }

export async function uploadImage(path, imgFile) {
  const storage = getStorage();
  const imageRef = ref(storage, path);
  await uploadBytes(imageRef, imgFile);
  const url = await getDownloadURL(imageRef);
  console.log("업로드된 이미지 URL: ", url);
  return url;
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
    const path = `board/${addObj.imgUrl.name}`; // Adjusted path
    const url = await uploadImage(path, addObj.imgUrl);
    addObj.imgUrl = url;

    // No 필드를 최신 값에서 1 증가시키기
    const resultData = await runTransaction(db, async (tr) => {
      const lastId = (await getLastNum(collectionName, "id")) + 1;
      addObj.id = lastId;

      // 데이터베이스에 새 문서 추가
      const docRef = await addDoc(collection(db, collectionName), addObj);
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
