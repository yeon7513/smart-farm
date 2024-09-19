import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBz9TEYoPHVv_Lz28BzcTa1DrLMI7wnBWc",
    authDomain: "ifarm-dd7b6.firebaseapp.com",
    projectId: "ifarm-dd7b6",
    storageBucket: "ifarm-dd7b6.appspot.com",
    messagingSenderId: "581435413866",
    appId: "1:581435413866:web:09a6d8065e5b47863c8113"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function getUserAuth() {
  //  async 필요 없음. const auth = getAuth(app);에서 그대로 가져옴
  return auth;
}

async function addDatas(collectionName, addObj) {
  await addDoc(getCollection(collectionName), addObj);
}
// function getMessages(setMessages) {
//   const collect = getCollection("messages");
//   const q = query(collect, orderBy("createdAt"), limit(100));
//   return onSnapshot(q, (snapshot) => {
//     const resultData = snapshot.docs.map((doc) => doc.data());
//     setMessages(resultData);
//   });
// }
function getRealTimeMessages(collectionName, setData) {
  // chatRoom에서 firebase로 옮김
  const collect = collection(db, collectionName);
  const q = query(collect, orderBy("createdAt"), limit(100));
  // 리미트는 카톡에서 중요한 요소임
  // 날짜기준(createdAt)으로 오름차순으로 순서(orderBy)가 나온다.
  const unsubscribe = onSnapshot(q, (snapshot) => {
    // 지금까지 화살표함수로 만들었음. 모양은 다르지만 함수가
    // 튀어나온다. 그러니까 여기에 있는 걸 실행시킨다. 클린업함수
    const resultData = snapshot.docs.map((doc) => doc.data());
    setData(resultData);
    // console.log(snapshot);
    //  snapshot.forEach(doc => {
    //   console.log(doc.data());
    //  });
  });
  return unsubscribe;
}

function getQuery(collectionName, qeuryOption) {
  const { conditions = [], orderBys = [], limits } = qeuryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);
  // 이것만으로도 데이터 가져올 수 있음

  const condition = [{ field: "text" }];
  // where 조건
  // field, 비교 연산자, 비교 연산자 세가지 요소가 필요함
  // 뭐가 들어갈 지 몰라 배열로 들어감
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
    // q = query(q, ) => 위의 쿼리 객체에 추가로 들어가는 거
    // orderBy 조건
    // 한가지만 정렬조건으로 삼는 게 아니라 몇가지 더 넣을 수 있음
  });
  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || "asc"));
  });

  // limit 조건
  q = query(q, limit(limits));

  return q;
}

export { db, getUserAuth, addDatas, getRealTimeMessages, getQuery };
