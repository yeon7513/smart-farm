import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { db, getCollection } from "./firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// board

export async function getBoardDatas(collectionName) {
  const collect = await getCollection(collectionName);
  const q = query(
    collect,
    orderBy("id", "desc") // Adjust field name based on your schema
  );
  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
    collection: collectionName,
  }));

  return resultData;
}

export async function uploadImage(path, imgFile) {
  try {
    const storage = getStorage();
    const imageRef = ref(storage, path);
    await uploadBytes(imageRef, imgFile);
    const url = await getDownloadURL(imageRef);
    console.log("업로드된 이미지 URL: ", url);
    return url;
  } catch (error) {
    console.error("이미지 업로드 실패: ", error);
    return "";
  }
}

export async function getLastNum(collectionName, field) {
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
    if (addObj.imgUrl) {
      const path = `/board/${Date.now()}_${addObj.imgUrl.name}`;
      addObj.imgUrl = await uploadImage(path, addObj.imgUrl);
    }

    const resultData = await runTransaction(db, async (tr) => {
      const lastId = (await getLastNum(collectionName, "id")) + 1;
      addObj.id = lastId;

      // 데이터베이스에 새 문서 추가
      const docRef = await addDoc(collection(db, collectionName), addObj);
      // 하위 컬렉션 "comment" 생성
      const commentRef = collection(docRef, "comment");
      await addDoc(commentRef, { initial: true }); // 초기값, 필요시 변경

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

// 조회수 증가 함수
export const incrementPostCount = async (category, docId) => {
  try {
    const postRef = doc(db, category, docId); // category는 컬렉션 이름, postId는 문서 ID
    await updateDoc(postRef, {
      count: increment(1), // count 필드 값에 +1 증가
    });
  } catch (error) {
    console.error("조회수 증가 중 오류 발생:", error); // 오류 로그
  }
};

export async function deletePost(category, docId) {
  try {
    const commentRef = doc(db, category, docId);
    await deleteDoc(commentRef);
    return true;
  } catch (error) {
    console.error("게시글 삭제 중 오류 발생: ", error);
    return false;
  }
}

export async function updatePost(category, docId, updatedId) {
  try {
    const postRef = doc(db, category, docId);
    await updateDoc(postRef, updatedId);
    return true;
  } catch (error) {
    console.error("게시글 수정 중 오류 발생: ", error);
    return false;
  }
}

export const getPostById = async (collection, docId) => {
  try {
    // Firestore에서 특정 문서 참조를 생성
    const docRef = doc(db, collection, docId);
    // 문서 데이터를 가져오기
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // 문서가 존재하면 데이터를 반환
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      // 문서가 존재하지 않는 경우 처리
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching post: ", error);
    throw error;
  }
};

export async function getComment(collectionName, docId) {
  try {
    const commentRef = collection(db, collectionName, docId, "comment");
    const q = query(commentRef, orderBy("createdAt", "asc"));
    const snapshot = await getDocs(q);

    const comment = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      collection: collectionName,
    }));
    return comment;
  } catch (error) {
    console.log("댓글 불러오기 중 오류: ", error);
    return false;
  }
}

export async function addComment(collectionName, docId, commentObj) {
  try {
    const commentRef = collection(db, collectionName, docId, "comment");

    const lastId = await getLastNum(
      `${collectionName}/${docId}/comment`,
      "commentId"
    );
    commentObj.commentId = lastId + 1;

    await addDoc(commentRef, {
      ...commentObj,
      createdAt: new Date().toLocaleString(),
    });
    return true;
  } catch (error) {
    console.log("댓글 추가 중 오류: ", error);
    return false;
  }
}

export async function deleteComment(collectionName, docId, commentId) {
  try {
    const commentRef = doc(db, collectionName, docId, "comment", commentId);
    await deleteDoc(commentRef, {
      collection: collectionName,
    });
    return true;
  } catch (error) {
    console.error("댓글 삭제 중 오류 발생: ", error);
    return false;
  }
}

export async function updateComment(
  category,
  docId,
  commentId,
  updatedComment
) {
  try {
    const commentRef = doc(db, category, docId, "comment", commentId);
    await updateDoc(commentRef, updatedComment);
    return true;
  } catch (error) {
    console.error("댓글 수정 중 오류 발생: ", error);
    return false;
  }
}
