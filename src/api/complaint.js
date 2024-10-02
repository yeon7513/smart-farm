import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { getLastNum } from "./board";

// 신고 누적 횟수 +1
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

// 신고 누적 횟수 +5 (활동 정지)
export const suspendBoard = async (userId) => {
  try {
    const userRef = doc(db, "users", userId); // doc() 사용
    await updateDoc(userRef, {
      complaneNum: increment(5), // increment() 사용
    });
  } catch (error) {
    console.log("신고 누적 횟수 증가 중 오류 발생:", error);
  }
};

// 신고 승인 업데이트 함수
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

// 신고 거부
export const updateComplaintNotProcess = async (complainId) => {
  try {
    const processedDate = new Date().toISOString().split("T")[0];

    const complaintRef = doc(db, "complain", complainId);
    await updateDoc(complaintRef, {
      processYn: "y",
      processedAt: processedDate,
    });
  } catch (error) {
    console.log("신고 상태 변경 중 오류 발생:", error);
  }
};

// as 처리 완료
export const updateCompleteProcess = async (postId) => {
  try {
    console.log("Post ID:", postId);
    if (!postId) {
      throw new Error("postId가 정의되지 않았습니다.");
    }

    const completeRef = doc(db, "as", postId);
    await updateDoc(completeRef, {
      completeYn: "Y",
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

    // const reasonPrefix = complainData.selectedReason.value.slice(0, 2); // reasonCode의 앞 두 글자
    // const docId = `${reasonPrefix}_${newIdNumber}`; // 예: "Ps_1", "Pf_1" 등으로 생성
    let docId = `Cp_${newIdNumber}`;

    const complainWithId = { ...complainData, docIdNum: newIdNumber };
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, complainWithId);

    return true;
  } catch (error) {
    console.error("setDoc 에러 발생: ", error);
  }
};

// 중복 신고
// export const duplicateComplaint = async (userId, postDocId) => {
//   try {
//     const complaintsRef = collection(db, "complain");
//     const q = query(
//       complaintsRef,
//       where("complainantDocId", "==", userId),
//       where("postDocId", "==", postDocId)
//     );

//     const querySnapshot = await getDocs(q);

//     return querySnapshot.docs.length > 0;
//   } catch (error) {
//     console.log("중복 신고 확인 중 오류 발생:", error);
//     return false;
//   }
// };
export const duplicateComplaint = async (
  userId,
  postDocId,
  type,
  commentId = null
) => {
  try {
    const complaintsRef = collection(db, "complain");

    let q;

    if (type === "comment" && commentId) {
      q = query(
        complaintsRef,
        where("complainantDocId", "==", userId),
        where("postDocId", "==", postDocId),
        where("commentId", "==", commentId)
      );
    } else {
      q = query(
        complaintsRef,
        where("complainantDocId", "==", userId),
        where("postDocId", "==", postDocId),
        where("type", "==", type)
      );
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.length > 0;
  } catch (error) {
    console.log("중복 신고 확인 중 오류 발생:", error);
    return false;
  }
};
