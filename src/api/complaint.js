import { doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db, getCollection } from "./firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getLastNum } from "./board";

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
    const processedDate = new Date().toISOString().split("T")[0];

    const complaintRef = doc(db, "complain", complainId);
    await updateDoc(complaintRef, {
      processYn: "Y",
      processedAt: processedDate,
    });
  } catch (error) {
    console.log("신고 상태 변경 중 오류 발생:", error);
  }
};

export const updateCompleteProcess = async (postId) => {
  try {
    console.log("Post ID:", postId);
    if (!postId) {
      throw new Error("postId가 정의되지 않았습니다.");
    }

    const completeRef = doc(db, "as", postId);
    await updateDoc(completeRef, {
      completedYn: "Y",
    });
  } catch (error) {
    console.log("답변 상태 변경 중 오류 발생:", error);
  }
};

export const addSetDocDatas = async (collectionName, complainData) => {
  try {
    // 마지막 신고 번호 가져오기
    const lastNum = await getLastNum(collectionName, "docIdNum");
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
    console.error("setDoc 에러 발생: ", error);
  }
};
