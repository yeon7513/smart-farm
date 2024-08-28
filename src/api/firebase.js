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
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { batch } from "react-redux";

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
const auth = getAuth(app);
export const db = getFirestore(app);

export function getCollection(collectionName) {
  return collection(db, collectionName);
}

export function getUserAuth() {
  return auth;
}

export async function joinUser(uid, email, password, userInfo) {
  const { address, number, farmAddress, required, name, nickname } = userInfo;
  const userData = {
    email: email,
    password: password,
    ...(address !== undefined && { address: address }),
    ...(number !== undefined && { number: number }),
    ...(farmAddress !== undefined && { farmAddress: farmAddress }),
    ...(required !== undefined && { required: required }),
    ...(name !== undefined && { name: name }),
    ...(name !== undefined && { nickname: nickname }),
  };
  await setDoc(doc(db, "users", uid), userData);
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

export async function getDatas(collectionName) {
  try {
    const collect = collection(db, collectionName);
    const snapshot = await getDocs(collect);
    return snapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
}

export async function updateDatas(collectionName, docId, updateObj) {
  try {
    const docRef = await doc(db, collectionName, docId);
    await updateDoc(docRef, updateObj);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
}

// let userId;

// export async function fetchData() {
//   const url =
//     "/api/Agree_WS/webservices/ProvideRestService/getIdentityDataList/cbd181f0a2594233a01eed9b0b86a392";
//   const response = await fetch(url);
//   const result = await response.json();
//   result.forEach((item) => {
//     userId = item.userId;
//   });
//   console.log(userId);
// }
// fetchData();

let userId = [];

// const url =
//   "https://apis.data.go.kr/1390000/SmartFarmdata/grwdatarqst?serviceKey=iv2U4%2BpsJ7CRlDQ2ukixg4slrgEMjbIL%2FB%2B9pefVtqqEHGHhSRX7tNubbe2Y%2FGpjV59et7GLPJwxAdVe7iXycA%3D%3D&searchFrmhsCode=81&returnType=json";
// fetch(url)
//   .then((response) => response.json())
//   .then((result) => {
//     console.log(result);
//   });
// const url =
//   "https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=3bd960b544d8e85c3f24e4e2d139794c";
// fetch(url)
//   .then((response) => response.json())
//   .then((result) => {
//     console.log(result);
//   });

// const apiKey =
//   "iv2U4%2BpsJ7CRlDQ2ukixg4slrgEMjbIL%2FB%2B9pefVtqqEHGHhSRX7tNubbe2Y%2FGpjV59et7GLPJwxAdVe7iXycA%3D%3D";

// const url = `/api2/grwdatarqst?serviceKey=${apiKey}&searchFrmhsCode=TestFarm01&returnType=json`;
// fetch(url)
//   .then((response) => response.json())
//   .then((result) => {
//     console.log(result);
//   });

const apiKey =
  "iv2U4%2BpsJ7CRlDQ2ukixg4slrgEMjbIL%2FB%2B9pefVtqqEHGHhSRX7tNubbe2Y%2FGpjV59et7GLPJwxAdVe7iXycA%3D%3D"; // 여기에 실제 API 키를 넣으세요
const searchFrmhsCodes = [
  "81",
  "9",
  "21",
  "25",
  "27",
  "28",
  "29",
  "31",
  "32",
  "39",
  "42",
  "44",
  "45",
  "48",
  "50",
  "51",
  "53",
  "54",
  "56",
  "57",
  " 59",
  "201",
  "202",
  "204",
  "205",
  "206",
  "207",
  "209",
  "210",
  "315",
  "316",
  "318",
  "319",
  "320",
  "324",
  "325",
  "326",
  "327",
  "339",
  "344",
  "345",
  "349",
  "315",
  "33",
  "35",
  "37",
  "41",
  "43",
  "203",
]; // 배열에 여러 코드를 넣으세요

// 모든 URL을 생성하여 저장
const urls = searchFrmhsCodes.map(
  (code) =>
    `/api2/grwdatarqst?serviceKey=${apiKey}&searchFrmhsCode=${code}&returnType=json`
);

// API 호출을 비동기적으로 처리
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 모든 데이터를 가져오고 처리하기
async function fetchAllData() {
  const dataPromises = urls.map((url) => fetchData(url));
  const allData = await Promise.all(dataPromises);
  return allData;
}

// 데이터를 가져오고 콘솔에 출력
// fetchAllData().then((data) => {
//   data.forEach((item, index) => {
//     console.log(
//       `Data for ${searchFrmhsCodes[index]}:`,
//       item.response.body.items.item
//     );
//   });
// });

// const api = "cbd181f0a2594233a01eed9b0b86a392"; // 여기에 실제 API 키를 넣으세요

// const apiurl = `/api3/Agree_WS/webservices/ProvideRestService/getIdentityDataList/${api}`;
// fetch(apiurl)
//   .then((response) => response.json())
//   .then((result) => {
//     console.log(result);
//   });

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
