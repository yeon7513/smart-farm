import { doc, increment, updateDoc } from "firebase/firestore";
import { db, getCollection } from "./firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// 신고 누적 횟수 증가 함수
// export const incrementComplainCount = async (userId) => {
//   try {
//     const userRef = db.collection("users").doc(userId);
//     await updateDoc(userRef, {
//       complaneNum: firebase.firestore.FieldValue.increment(1),
//     });
//   } catch (error) {
//     console.error("신고 누적 횟수 증가 중 오류 발생:", error); // 오류 로그
//   }
// };
export const incrementComplainCount = async (userId) => {
  try {
    const userRef = doc(db, "users", userId); // doc() 사용
    await updateDoc(userRef, {
      complaneNum: increment(1), // increment() 사용
    });
  } catch (error) {
    console.log("신고 누적 횟수 증가 중 오류 발생:", error);
  }
};

// 신고 상태 업데이트 함수
export const updateComplaintProcess = async (complainId) => {
  try {
    const complaintRef = doc(db, "complain", complainId);
    await updateDoc(complaintRef, {
      processYn: "Y",
    });
  } catch (error) {
    console.log("신고 상태 변경 중 오류 발생:", error);
  }
};
