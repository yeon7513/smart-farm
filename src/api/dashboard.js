import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

// 비활성화
export async function deactivationData(collectionName, docId, fieldName) {
  try {
    const itemDoc = await doc(db, collectionName, docId);
    await updateDoc(itemDoc, {
      [fieldName]: 'Y',
    });

    const snapshot = await getDoc(itemDoc);
    const result = { docId: snapshot.id, ...snapshot.data() };

    return result;
  } catch (error) {
    console.error('Fail to Deactivation: ', error);
    throw error;
  }
}
