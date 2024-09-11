import { getDocs } from 'firebase/firestore';
import { getCollection } from './firebase';

export async function getDatas(collectionName) {
  try {
    const collect = getCollection(collectionName);
    const snapshot = await getDocs(collect);
    const returnData = snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
    return returnData;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
}
