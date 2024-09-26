import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, getCollection, getDatas } from "./firebase";

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
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
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

// 결제를 취소하는 함수입니다.
export const pointTableCancel = async (imp_uid) => {
  try {
    const paymentsQuery = query(
      collection(db, "payments"),
      where("imp_uid", "==", imp_uid)
    );
    const paymentsSnapshot = await getDocs(paymentsQuery);

    // 결제 문서가 있으면 삭제합니다.
    if (!paymentsSnapshot.empty) {
      const docRef = paymentsSnapshot.docs[0].ref;
      await deleteDoc(docRef);
      console.log("결제 정보가 삭제되었습니다.");
    } else {
      console.log("결제 정보를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("결제 정보 삭제 실패: ", error);
  }
};
